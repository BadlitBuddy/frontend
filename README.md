# Badlit Buddy Frontend

Frontend web application for Badlit Buddy.

Architecturally, the frontend is divided into two distinct surfaces:

- **Authenticated App (`src/app/(main)`):** Mantine UI v9, grayscale-first design system, TanStack Query, and client-side audio/transcription processing.
- **Public Marketing (`src/app/(marketing)`):** DaisyUI (Tailwind CSS 4) landing and product overview pages.

---

## 1. Project Overview & Ownership

- **Service Context:** Frontend client consuming the Badlit Buddy Core Backend API (`NEXT_PUBLIC_API_URL`) and edge services (`NEXT_PUBLIC_EDGE_API_URL`). Supports client-side WebAssembly audio extraction via `@ffmpeg/ffmpeg`.

---

## 2. Prerequisites & System Requirements

Ensure your local development environment meets the required toolchain versions before installing dependencies:

- **Node.js:** `v24.x` (recommended, aligned with CI and deployment targets) or `>=20.9.0`
- **Package Manager:** `pnpm@11.18.0` (strictly enforced via `packageManager` field; do not use `npm` or `yarn`)
- **Browser Requirements:** Modern Chromium, Firefox, or Safari supporting `SharedArrayBuffer` and WebAssembly (required for `@ffmpeg/ffmpeg`). Note that Next.js dev headers include `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` to enable WASM threading.

---

## 3. Environment Variables (`.env`)

Configuration is validated using Next.js typed environment variables. To configure your local environment:

```bash
cp .env.example .env.local
```

### Environment Variable Reference

| Variable                   | Required | Default / Example            | Purpose                                                            |
| :------------------------- | :------- | :--------------------------- | :----------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`      | Yes      | `https://localhost:7168/api` | Base URL for the core REST API (auth, user profiles, transcripts). |
| `NEXT_PUBLIC_EDGE_API_URL` | No       | `http://localhost:50000`     | edge service endpoint.                                             |

---

## 4. Getting Started / Local Development

1. **Install dependencies:**

   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Configure environment:**
   Verify `.env.local` contains valid backend API URLs.

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **Access the application:**
   - Marketing Landing: [http://localhost:3000](http://localhost:3000)
   - Login: [http://localhost:3000/login](http://localhost:3000/login)
   - App Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

> **HTTPS Development:** If testing cross-origin cookies or secure context features requiring valid certificates, run:
>
> ```bash
> pnpm dev-https
> ```

---

## 5. Available Scripts

The following commands are defined in `package.json`:

| Script                | Command                         | Purpose                                                                |
| :-------------------- | :------------------------------ | :--------------------------------------------------------------------- |
| `pnpm dev`            | `next dev`                      | Starts local Next.js development server on port `3000`.                |
| `pnpm dev-https`      | `next dev --experimental-https` | Starts local dev server using experimental HTTPS certificates.         |
| `pnpm build`          | `next build`                    | Creates an optimized production build in `.next`.                      |
| `pnpm start`          | `next start`                    | Runs the Next.js production server locally (requires prior build).     |
| `pnpm lint`           | `eslint`                        | Executes ESLint across TypeScript and TSX source files.                |
| `pnpm typecheck`      | `tsc --noEmit`                  | Validates TypeScript types across the project without emitting files.  |
| `pnpm create-feature` | `tsx scripts/create-feature.ts` | Scaffolds a bulletproof-react feature directory and route boilerplate. |

---

## 6. Architecture & Directory Layout

The codebase follows the **bulletproof-react** architecture pattern. Code is isolated by domain feature under `src/features/` rather than split strictly by file type.

```text
frontend/
├── .ai/                    # Design system docs, agent skills, and workflow references
├── .github/workflows/      # GitHub Actions CI and CD deployment workflows
├── public/                 # Static assets (fonts, icons, media)
├── scripts/                # Development CLI utilities (e.g., create-feature generator)
└── src/
    ├── app/                # Next.js App Router root
    │   ├── (auth)/         # Unauthenticated routes (login, register)
    │   ├── (main)/         # Authenticated app routes (dashboard, transcripts, settings)
    │   └── (marketing)/    # Public landing and marketing routes
    ├── components/         # Cross-feature UI primitives (notifications, layouts, shared modals)
    ├── config/             # Canonical application paths, route constants, and app settings
    ├── features/           # Domain feature modules (bulletproof-react structure)
    │   ├── dashboard/      # User workspace overview and summary stats
    │   ├── marketing/      # Landing page sections, hero, feature overview
    │   ├── settings/       # User profile and account preferences
    │   ├── transcript-details/ # Transcript editor, audio player, word-level editing
    │   └── transcripts/    # Transcript list, upload workflow, and status tracking
    ├── hooks/              # Global shared React hooks
    ├── lib/                # Shared clients and core utilities (api-client, react-query)
    ├── types/              # Global shared TypeScript definitions and entity models
    └── utils/              # Generic utility functions
```

### Feature Module Structure

Each directory inside `src/features/{feature}/` maintains a strict public API boundary:

```text
src/features/{feature}/
├── api/          # TanStack Query query/mutation hooks & Axios requests
├── components/   # UI components specific to this feature
├── hooks/        # React hooks scoped strictly to this feature
├── types/        # Feature-specific DTOs and interfaces
├── utils/        # Feature helper functions
```

- **Surface Separation:** Use Mantine UI components inside `(main)` features; use DaisyUI/Tailwind 4 inside `(marketing)`.

---

## 8. Deployment & CI/CD Workflow

Deployment and continuous integration are managed through GitHub Actions:

- **CI Pipeline (`.github/workflows/ci.yml`):**
  - Runs on all pull requests and pushes to `main` and `dev`.
  - Executes three parallel/dependent verification stages:
    1. `lint`: ESLint verification (`pnpm run lint`).
    2. `typecheck`: TypeScript type check (`pnpm exec tsc --noEmit`).
    3. `build`: Next.js production compile with cache layer (`pnpm run build`).
- **Deployment Pipeline (`.github/workflows/deploy-dev.yml`):**
  - Automatic deployment triggered on merge or push to the `dev` branch.
  - Uses the Vercel CLI to pull environment settings, generate production build artifacts, and deploy prebuilt releases.
  - Can also be manually triggered via `workflow_dispatch`.
