# AGENTS.md — Cuatro Ruedas Client

> This document is for AI agents and LLMs. Follow these conventions when generating, refactoring, or reviewing code in this project.

---

## Stack

| Layer             | Technology                                    | Version |
| ----------------- | --------------------------------------------- | ------- |
| Framework         | Next.js (App Router)                          | 16.x    |
| UI                | React                                         | 19.x    |
| Component Library | MUI (Material UI)                             | 9.x     |
| Styling           | Emotion (`@emotion/react`, `@emotion/styled`) | 11.x    |
| State Management  | Zustand                                       | 5.x     |
| Validation        | Zod                                           | 4.x     |
| Forms             | react-hook-form + @hookform/resolvers         | 7.x     |
| HTTP              | Custom `fetchService` (native fetch wrapper)  | —       |
| Notifications     | SweetAlert2                                   | 11.x    |
| Package Manager   | pnpm                                          | 10.x    |

---

## Architecture — Directory Responsibilities

```
src/
├── app/              # Next.js App Router — pages, layouts, route segments
├── modules/          # Feature modules (domain components, self-contained features)
│   ├── components/   # Shared domain components (header, footer, hero, forms)
│   └── checkout/     # Feature-specific components (empty, placeholder)
├── services/         # API service modules — one file per domain (auth, category, product)
├── store/            # Zustand stores — global client state
├── lib/              # Low-level utilities — fetch wrapper, error handler
└── theme/            # MUI theme config — tokens, extendTheme
```

### `src/app/` — Pages & Layouts

- Next.js App Router file conventions (`page.js`, `layout.js`, `loading.js`, `error.js`).
- Pages are thin — they compose components from `modules/` and read from `store/`.
- Server Components by default. Add `'use client'` only when the component needs hooks, browser APIs, or event handlers.
- Keep `'use client'` boundaries as leaf-level as possible. Push interactivity into `modules/components/`.
- Minimize data serialized across the RSC/Client boundary — pass only the fields the client actually uses.

### `src/modules/` — Feature Modules

- Each feature gets its own directory (e.g., `checkout/`, `catalog/`, `profile/`).
- A feature module contains: its components, its local hooks, its types/schemas.
- Shared domain components that span multiple features live in `modules/components/`.
- Components here are `'use client'` when they need interactivity.

### `src/services/` — API Services

- One file per domain: `auth.service.js`, `category.service.js`, `product.service.js`.
- Services are the ONLY layer that calls `fetchService`. Components and stores never call `fetchService` directly.
- Each service exports a plain object with methods that return promises.
- Services handle endpoint paths and request shape. They do NOT handle errors, redirects, or UI state.
- Naming: `{domain}.service.js` exporting `{domain}Service`.

```js
// services/product.service.js
import { fetchService } from "../lib/fetcher";

export const productService = {
  getProducts(params) {
    return fetchService.get("/client/products", params);
  },
  getProductById(id) {
    return fetchService.get(`/client/products/${id}`);
  },
};
```

### `src/store/` — Zustand Stores

- One store per domain concern: `authStore.js`, `cartStore.js`, `uiStore.js`.
- Stores are `'use client'` — always.
- Use Zustand's `persist` middleware only for state that must survive page reloads (session, cart).
- Use `partialize` to persist only the minimum needed fields.
- Stores call services for API operations. They manage loading/error state.
- Selectors: prefer selecting specific slices over the entire store to minimize re-renders.

```js
// Prefer this:
const user = useAuthStore((s) => s.session?.user);

// Over this:
const { session } = useAuthStore();
```

### `src/lib/` — Low-Level Utilities

- `fetcher.js` — HTTP wrapper around native `fetch`. Handles base URL, headers, credentials, error parsing, and the 403 forbidden handler.
- `errorHandler.js` — SweetAlert2 wrappers (`showError`, `showSuccess`, `showWarning`, `showConfirmation`, `handleApiError`).
- Add pure utility functions here (formatters, validators, constants). Keep them simple and side-effect free.

### `src/theme/` — MUI Theme

- `tokens.js` — design tokens (colors, spacing, typography, breakpoints).
- `theme.js` — `extendTheme()` configuration using tokens. CSS variables enabled (`cssVarPrefix: 'ps'`).
- Use CSS variables (`var(--ps-palette-*)`) in Emotion styled components instead of hardcoding values.
- Component overrides go in `theme.js` under `components`, not in individual files.

---

## Patterns & Conventions

### Data Fetching

- **Server Components**: use native `fetch` or `async` components for initial page data. Parallelize with `Promise.all()`.
- **Client Components**: call service methods inside hooks or event handlers. Never call `fetchService` directly from components.
- **Parallelize independent fetches** — never await sequentially when operations are independent.
- **Use Suspense boundaries** to stream content and avoid blocking the entire page on slow data.

### Forms (react-hook-form + Zod)

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers";
import { z } from "zod";

const loginSchema = z.object({
  rut: z.string().min(1, "RUT requerido"),
  password: z.string().min(1, "Contraseña requerida"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    /* call store action */
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("rut")}
        error={!!errors.rut}
        helperText={errors.rut?.message}
      />
      <TextField
        {...register("password")}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit">Iniciar Sesión</Button>
    </form>
  );
}
```

- Define Zod schemas in the same file as the form or in the feature module.
- Use `zodResolver` from `@hookform/resolvers/zod`.
- Map validation errors to MUI `TextField` `error` and `helperText` props.

### Styling

- **MUI components** for standard UI (Button, TextField, Card, Dialog, etc.).
- **Emotion `styled`** for custom styled wrappers when MUI components don't fit.
- **CSS variables** from the theme (`var(--ps-palette-*)`) — never hardcode colors or spacing.
- **`sx` prop** for one-off MUI style overrides. Prefer theme-level overrides for repeated patterns.
- Import MUI components from the package root (Next.js optimizes barrel imports automatically):

```jsx
import { Button, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
```

### Error Handling

- API errors from `fetchService` include `error.status` and `error.payload`.
- Use `handleApiError(error)` from `lib/errorHandler.js` for standard error display.
- Use `showError()`, `showSuccess()`, `showConfirmation()` from the same module for UI feedback.
- Never `console.error` and swallow — always surface errors to the user or propagate them.

### State Management

- **Zustand** for global cross-component state (auth, cart, UI preferences).
- **React state (`useState`)** for local component state.
- **Derived state** — compute from props/existing state during render. Do NOT mirror props into state or use effects to sync state.
- **Functional `setState`** when the new value depends on the previous one.
- **Lazy initialization** — pass a function to `useState` for expensive initial values.

---

## React Performance Rules (from Vercel, 2026)

These are mandatory. Violations will be flagged in review.

### CRITICAL — Waterfalls & Bundle

1. **No sequential awaits for independent operations.** Use `Promise.all()`.
2. **Defer `await` into the branch where it's actually needed.** Don't block paths that don't use the result.
3. **Use Suspense boundaries** to stream non-critical content.
4. **No barrel file imports in non-Next.js contexts.** Import directly from subpaths when outside Next.js optimization.
5. **Use `next/dynamic`** for heavy components not needed on initial render (editors, charts, maps).
6. **Prefer statically analyzable import paths.** No dynamic string concatenation in `import()`.

### HIGH — Server-Side

7. **Authenticate Server Actions** inside the action itself — never trust middleware alone.
8. **No mutable module-level state** for request data in RSC/SSR. Pass data through props.
9. **Use `React.cache()`** for per-request deduplication of DB queries and auth checks.
10. **Minimize RSC→Client serialization** — pass only the fields the client needs.
11. **Parallel data fetching with component composition** — sibling components fetch in parallel, not sequentially through a parent.
12. **Use `after()`** for non-blocking post-response work (analytics, audit logs).

### MEDIUM — Re-renders & Rendering

13. **Derive state during render** — no `useEffect` to sync state from props.
14. **Don't define components inside components** — causes full unmount/remount.
15. **Hoist static JSX** outside components when it doesn't depend on props/state.
16. **Use functional `setState`** for stable callbacks that reference previous state.
17. **Use `useTransition`** for non-urgent updates instead of manual loading states.
18. **Use explicit conditional rendering** — ternary, not `&&` (avoids rendering `0` or `""`).
19. **Narrow effect dependencies** — subscribe to derived primitives, not objects.
20. **Put interaction logic in event handlers**, not effects.

### LOW — JavaScript

21. **Early return** from functions — guard clauses first.
22. **Use `Set`/`Map`** for O(1) lookups instead of `Array.find()`.
23. **Hoist RegExp** creation outside loops.
24. **Use `toSorted()`** instead of `sort()` for immutability.
25. **Use `flatMap`** to map and filter in one pass.

---

## File Naming

| Type       | Convention                | Example                           |
| ---------- | ------------------------- | --------------------------------- |
| Pages      | `page.js`                 | `app/catalogo/page.js`            |
| Layouts    | `layout.js`               | `app/dashboard/layout.js`         |
| Components | PascalCase                | `LoginForm.jsx`, `SiteHeader.jsx` |
| Services   | camelCase + `.service.js` | `auth.service.js`                 |
| Stores     | camelCase + `Store.js`    | `authStore.js`                    |
| Utilities  | camelCase                 | `fetcher.js`, `errorHandler.js`   |
| Theme      | camelCase                 | `theme.js`, `tokens.js`           |

---

## Language

- UI copy, labels, error messages, and user-facing strings: **Spanish (Chile)**.
- Code, comments, identifiers, variable names: **English**.
- Commit messages: **English**, conventional commits format.

---

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint (next lint)
```

---

## Key Gotchas

- `fetchService` uses `credentials: 'include'` — cookies are always sent. Do not add auth headers manually.
- The 403 handler is wired through `setForbiddenHandler()` in `authStore.js` — it auto-logs out and redirects to `/login`.
- Zustand stores with `persist` use `localStorage` key `cuatro-ruedas-auth`. Version this key if the schema changes.
- MUI theme uses CSS variables with prefix `ps` — reference as `var(--ps-palette-*)` in custom styles.
- `providers.jsx` wraps the app in `AppRouterCacheProvider` + `CssVarsProvider`. Do not add another theme provider.
- The app uses `'use client'` in `providers.jsx` and `layout-client.js` — these are the client boundary entry points.
