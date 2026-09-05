---
name: project
description: Badlit Buddy frontend project patterns, architecture, and feature structure skill. Covers bulletproof-react feature directory layout, routing conventions, shared lib utilities, state management, and sub-pattern guides (like api-hooks). Trigger when creating or modifying features, routes, shared utilities, components, or feature architecture.
---

# Project Architecture & Conventions

This skill defines the canonical project structure and architectural patterns for the **Badlit Buddy Frontend** Next.js application.

## Overview

Badlit Buddy Frontend is structured following **bulletproof-react** principles: code is organized by **feature** rather than by file type. Shared infrastructure and global primitives support these features without leaking implementation details across feature boundaries.

## Directory Structure

```
src/
├── app/                  # Next.js App Router (routes, pages, layouts)
├── components/           # Shared global components (notifications, layouts, ui)
├── config/               # App configuration, route paths, env variables
├── features/             # Feature-based domains (bulletproof-react layout)
│   └── {feature}/
│       ├── api/          # Feature-scoped API hooks & requests (see patterns/api-hooks)
│       ├── components/   # Feature-scoped React UI components
│       ├── hooks/        # Feature-scoped React hooks
│       ├── types/        # Feature-scoped DTOs & TypeScript definitions
│       ├── utils/        # Feature-scoped helper functions
│       └── index.ts      # Public API export surface for the feature
├── hooks/                # Global shared React hooks
├── lib/                  # Core shared infrastructure (api-client, react-query, auth)
├── types/                # Global DTOs & API primitives (BaseEntity, PaginatedList, etc.)
└── utils/                # Global utility functions
```

## Feature Encapsulation Rules

1. **Self-Contained Features**: Everything related to a single feature (components, state, API hooks, types) lives in `src/features/{feature}/`.
2. **Public Export Surface**: A feature MUST export its public API via `src/features/{feature}/index.ts`.
3. **Cross-Feature Imports**: Other features or pages MUST only import from `src/features/{feature}` (the root export surface), never deep internal paths like `src/features/{feature}/components/InternalChild.tsx`.
4. **Shared vs Feature Code**: If code is used by only one feature, keep it inside that feature directory. Move code to `src/components/`, `src/lib/`, `src/types/`, or `src/hooks/` only when strictly required by multiple features.

## Core Plumbing & Shared Libraries

- `@/lib/api-client`: Shared `axios` instance configured with `withCredentials: true`, automatic `401` token refresh, and global error notification interceptor.
- `@/lib/react-query`: Shared TanStack Query defaults (`queryConfig`), `QueryConfig<T>`, and `MutationConfig<T>` types.
- `@/lib/auth`: Authentication context provider and hooks.
- `@/config/paths`: Canonical route paths map (`paths.auth.login`, `paths.app.dashboard`, etc.).

## Sub-Guides & Pattern References

| Topic / Pattern               | Guide Location                                                   | Summary                                                            |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| **API Hooks & Data Fetching** | [`./patterns/api-hooks/SKILL.md`](./patterns/api-hooks/SKILL.md) | TanStack Query + axios + zod API query & mutation hook conventions |
