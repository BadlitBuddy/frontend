---
name: api-hooks
description: Generate React Query API hooks (queries and mutations) for this Next.js project, following its bulletproof-react-style conventions — feature-scoped folders, a shared axios `api` client, zod-validated mutation payloads, and typed `QueryConfig`/`MutationConfig` wrappers. Use this whenever the user asks to add an endpoint, wire up an API call, create a "get/list/update/delete X" hook, add a new feature's data layer, or says things like "add a hook for", "call this endpoint", or "add an API for X". Also use when reviewing or refactoring existing API hooks so they match project conventions.
---

# API Hooks Pattern

This project is a Next.js app using **bulletproof-react** feature folders, **TanStack Query**, **axios**, and **zod**. Every network call goes through one shared `api` axios instance and follows one of two shapes: a **query hook** (GET, read) or a **mutation hook** (POST/PUT/DELETE, write). Read this whole file before writing a new hook — the templates below are meant to be copied almost verbatim.

## File location

Hooks live inside the owning feature, not in a global `api/` folder:

```
src/features/{feature}/
  api/
    get-{resource}.ts        # single GET, or list GET
    get-{resource}-{sub}.ts  # nested GET, e.g. get-transcript-download-url.ts
    update-{resource}.ts     # PUT/PATCH mutation
    upload-{resource}.ts     # POST mutation
  types/
    api.ts                   # feature-scoped Dto/Request/Response types
  types.ts                   # feature-scoped enums/unions (e.g. status enums)
```

One file = one endpoint. File names are kebab-case and start with the verb (`get-`, `update-`, `upload-`, `delete-`).

Global, cross-feature primitives live in `@/types/api` (`BaseEntity`, `Entity<T>`, `PaginatedList<T>`, shared enums like `JobStatus`) and `@/lib/react-query` (`QueryConfig`, `MutationConfig`, `queryConfig`). Don't redefine these per feature — import them.

## The shared plumbing (already exists — do not recreate)

- `@/lib/api-client` exports `api`, an axios instance with `withCredentials: true`. Its response interceptor **already unwraps `response.data`**, so every API function's return type is the _body type directly_ (e.g. `Promise<TranscriptDto>`), never `Promise<AxiosResponse<TranscriptDto>>`.
- The same interceptor handles 401 → refresh-token retry, and pushes a global error notification via the `useNotifications` zustand store on failure. **Hooks never need their own try/catch or error-toast logic.**
- `@/lib/react-query` exports:
  - `QueryConfig<typeof getXQueryOptions>` — the options object minus `queryKey`/`queryFn`, so callers can pass `enabled`, `staleTime`, etc. but can't clobber the key or fetcher.
  - `MutationConfig<typeof xMutationFn>` — `UseMutationOptions` with the return/variables types inferred from the mutation function.

If a task needs a new cross-cutting primitive (new global Dto shape, new config type), put it in these shared files, not in a feature file.

## Query hook template (GET)

```ts
import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";

export type {Resource}Dto = {
  id: string;
  // ...fields as returned by the API
};

export type Get{Resource}Params = {
  // path/query params, if any
};

export const get{Resource} = (
  params: Get{Resource}Params,
): Promise<{Resource}Dto> => {
  return api.get(`/{Resource}/${encodeURIComponent(params.id)}`);
};

export const get{Resource}QueryOptions = (params?: Get{Resource}Params) => {
  return queryOptions({
    queryKey: ["{resource}", params],
    queryFn: () => {
      if (!params) throw new Error("{Resource} params are required");
      return get{Resource}(params);
    },
    enabled: !!params,
  });
};

type UseGet{Resource}Options = {
  params: Get{Resource}Params;
  queryConfig?: QueryConfig<typeof get{Resource}QueryOptions>;
};

export const useGet{Resource} = ({
  params,
  queryConfig,
}: UseGet{Resource}Options) => {
  return useQuery({
    ...get{Resource}QueryOptions(params),
    ...queryConfig,
  });
};
```

Rules for queries:

- Always export the bare async function (`get{Resource}`) separately from the hook — it's reused by `queryOptions` and is directly testable/prefetchable.
- Always export `get{Resource}QueryOptions` as its own function (not inlined into the hook) — this is what `queryClient.prefetchQuery` / `ensureQueryData` calls elsewhere in the app use.
- `queryKey` is an array: a string literal for the resource, then params. For lists, pass the whole params object as one array element (`["transcripts", { page, limit }]`); for a single nested resource, spell out the path (`["transcripts", id, "download-url"]`).
- `staleTime` is opt-in per endpoint (omit for defaults from global `queryConfig`; set explicitly like `1000 * 60 * 4` when a resource is known to be slow-changing, e.g. presigned URLs).
- List responses use the shared `PaginatedList<T>` return type, not a bespoke shape.

## Mutation hook template (POST/PUT/DELETE)

```ts
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

export const {Action}RequestSchema = z.object({
  // fields, validated
});

export type {Action}Request = z.infer<typeof {Action}RequestSchema>;

export const {action} = ({
  data,
}: {
  data: {Action}Request;
}): Promise<{Response}Type> => {
  return api.post("/{Resource}", data);
};

type Use{Action}Options = {
  mutationConfig?: MutationConfig<typeof {action}>;
};

export const use{Action} = ({
  mutationConfig,
}: Use{Action}Options = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: {action},
  });
};
```

Rules for mutations:

- Every mutation **request body gets a zod schema** even if the backend also validates — it's the single source of truth for the request type via `z.infer`. GET params do not get zod schemas.
- The hook always destructures `onSuccess` out of `mutationConfig` first, wraps it in a new inline callback, spreads the rest of `restConfig`, and puts `mutationFn` **last** so it can never be overridden by a spread.
- `mutationConfig` (and its `Use{Action}Options` wrapper type) defaults to `{}` so the hook is callable with no args.
- If a mutation needs to expose extra live state beyond what `useMutation` gives (progress, streamed partial data), wrap it exactly as in `upload-to-s3.ts`: keep the same `onSuccess`/`onMutate`/`onSettled` passthrough shape, add local `useState`, and return `{ ...mutation, extraState }`.

## Non-REST patterns

Two endpoint shapes don't fit the query/mutation templates because they don't go through the shared `api` axios instance:

**Server-Sent Events (streaming).** Follow `useEventSource.ts` + `get-file-events.ts`: a generic `useEventSource<TData, TBody>()` hook wraps `fetchEventSource` from `@microsoft/fetch-event-source`, manages its own `data`/`isStreaming`/`error` state and an `AbortController` ref, and exposes `start(url, body)` / `stop()`. Feature-specific hooks (`useGetFileEvents`) wrap the generic one, build the URL by hand off `process.env.NEXT_PUBLIC_API_URL`, and only add the endpoint path — they don't reimplement streaming logic.

**Direct-to-storage uploads (presigned URLs).** Follow `upload-to-s3.ts`: the backend mutation (`upload-file.ts`) returns a presigned URL via the normal mutation template; a _second_, separate hook (`useUploadFileToPresignedUrl`) does the actual `axios.put(presignedUrl, file, ...)` using a bare `axios` instance (not the `api` client — no auth/interceptors needed against S3), tracks upload `%` via `onUploadProgress` into local state, and returns `{ ...mutation, progress }`. Keep these two steps as two hooks, not one.

## Type conventions

- Response shapes from the backend are suffixed `Dto` (`TranscriptDto`, `UploadUrlDto`). Types the frontend builds for a request are suffixed `Request` (`FileUploadRequest`). One-off wrapper responses are suffixed `Response` (`UpdateFileStatusResponse`).
- Reuse `Entity<T>` (adds `publicId`/`createdAt`/`modifiedAt`) instead of repeating those fields.
- Status/enum unions used in Dtos come from the feature's `types.ts`, not re-declared inline in the api file.

## Worked example

Given "add a hook to fetch a single transcript by id," the output should look like the existing sibling hooks, e.g. `get-transcripts.ts` scaled down to a single-item GET:

```ts
import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { TranscriptionJobStatus } from "@/features/dashboard/types";

export type TranscriptDto = {
  id: string;
  fileName: string;
  jobStatus: TranscriptionJobStatus;
  jobStatusDesc: string;
  createdAt: string;
  duration: string;
};

export const getTranscript = (id: string): Promise<TranscriptDto> => {
  return api.get(`/Transcripts/${encodeURIComponent(id)}`);
};

export const getTranscriptQueryOptions = (id?: string) => {
  return queryOptions({
    queryKey: ["transcripts", id],
    queryFn: () => {
      if (!id) throw new Error("Transcript ID is required");
      return getTranscript(id);
    },
    enabled: !!id,
  });
};

type UseGetTranscriptOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getTranscriptQueryOptions>;
};

export const useGetTranscript = ({
  id,
  queryConfig,
}: UseGetTranscriptOptions) => {
  return useQuery({
    ...getTranscriptQueryOptions(id),
    ...queryConfig,
  });
};
```

Note the query key `["transcripts", id]` deliberately nests under the same `"transcripts"` root as `getTranscriptsQueryOptions` (`["transcripts", { page, limit }]`) and `getTranscriptDownloadUrlQueryOptions` (`["transcripts", id, "download-url"]`) — this is what lets a single `invalidateQueries({ queryKey: ["transcripts"] })` after a mutation clear the whole family at once.

## Cache invalidation lives at the call site, not in the hook file

None of the api-hook files above call `queryClient.invalidateQueries` themselves. That's intentional: the hook stays a thin, reusable wrapper, and the component using the mutation supplies invalidation through `mutationConfig.onSuccess`:

```ts
const { mutate } = useUpdateFileStatus({
  mutationConfig: {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transcripts"] });
    },
  },
});
```

Don't bake `queryClient` calls into the `use{Action}` hook definition itself — that's what the `onSuccess` passthrough in the mutation template exists to enable.

## Common mistakes to avoid

- Returning `Promise<AxiosResponse<T>>` from an API function instead of `Promise<T>` — the interceptor already unwraps `.data`, so typing it as an axios response makes every caller do `.data.data` or mistype the shape.
- Inlining `queryOptions({...})` directly inside the `useQuery` call instead of exporting a standalone `get{Resource}QueryOptions` function — breaks prefetching elsewhere in the app.
- Forgetting `enabled: !!id` (or equivalent) on queries whose param is optional/derived from route state — causes a fetch with `undefined` in the URL on first render.
- Skipping the zod schema on a mutation body and just writing an inline TS type — loses runtime validation and the `z.infer` convention the rest of the codebase relies on.
- Destructuring `mutationConfig` fields _after_ `mutationFn` in the `useMutation({...})` call, or spreading `restConfig` after `mutationFn` — both let a caller-supplied config silently override the fetcher. Keep `mutationFn` (and `queryFn`/`queryKey` for queries) as the last, un-spreadable keys.
- Adding a `.catch()` or a manual notification call inside an API function — duplicates what `api-client.ts`'s response interceptor already does globally.

## Naming & import checklist before finishing a hook

1. File name: `{verb}-{resource}.ts`, kebab-case.
2. Exports, in order: schema (mutations only) → inferred/Dto types → bare API function → `...QueryOptions` (queries only) → options type → the `use...` hook.
3. Function/hook names: `get{Resource}` / `useGet{Resource}` / `get{Resource}QueryOptions` for reads; `{verb}{Resource}` / `use{Verb}{Resource}` for writes.
4. Import order: external packages first (`@tanstack/react-query`, `zod`, `axios`), blank line, then `@/` absolute imports (`@/lib/api-client`, `@/lib/react-query`), blank line, then relative feature imports (`../types`, `../types/api`).
5. Never construct a raw `fetch`/`axios.get` outside of `api-client.ts`'s instance unless it's a non-REST case above — always call through `api`.
6. Never add a `try/catch` or manual error notification inside a hook or API function — the interceptor owns that.
7. Confirm the query key hierarchy matches sibling hooks for the same resource (e.g. all transcript queries key off `"transcripts"` first) so cache invalidation (`queryClient.invalidateQueries({ queryKey: ["transcripts"] })`) still catches the new hook.
