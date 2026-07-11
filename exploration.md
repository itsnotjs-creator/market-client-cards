## Exploration: Frontend Restructure — Authenticated Catalog → Open Sales Platform

### Current State

**Routing (App Router):**
- `/` — Home page (Hero + FeaturesSection + BrandsSection + InfoSection)
- `/catalogo` — Auth-guarded category browser (redirects to `/login` if anonymous)
- `/productos` — Public product listing with search, pagination, sidebar
- `/productos/[slug]` — (not yet built, but linked from ProductCard)
- `/login` — Login page
- `/perfil` — Authenticated user profile
- `/dashboard` — Dashboard page
- `/hazte-cliente` — Registration form

**Layout structure:**
- `layout.js` → `Providers` (MUI CssVarsProvider + SessionInitializer) → `LayoutClient` (SiteHeader + ConditionalFooter)
- `layout-client.js` hides SiteHeader/Footer on `/catalogo*` paths
- `SessionInitializer` calls `initializeSession()` on mount (always checks auth)

**Existing components (18 total in `modules/components/`):**
| Component | Type | Auth-dependent | Reusable? |
|-----------|------|----------------|-----------|
| SiteHeader | Navigation | Partially (shows login/profile) | Yes, needs enhancement |
| Hero | Landing section | No (but embeds LoginForm) | Needs refactor |
| CategoryCards | Category grid | No | ✅ Fully reusable |
| ProductCard | Product display | No | ✅ Fully reusable |
| RelevantBanner | Featured products | No | ✅ Fully reusable |
| ProductSidebar | Category filter | No | ✅ Fully reusable |
| CatalogoSidebar | Category filter | No | Duplicate of ProductSidebar |
| CatalogoHeader | Auth header | Yes | Replace with enhanced SiteHeader |
| LoginForm | Auth form | Yes | Keep for /login route |
| FeaturesSection | Static content | No | ✅ Reusable |
| BrandsSection | Static content | No | ✅ Reusable |
| InfoSection | Static content | No | ✅ Reusable |
| SiteFooter | Footer | No | ✅ Reusable |
| ConditionalFooter | Footer wrapper | No | ✅ Reusable |
| SessionInitializer | Auth bootstrap | Yes | Keep as-is |

**Services:**
- `productService.getProducts(params)` — paginated product listing
- `productService.getRelevantProducts()` — featured/relevant products
- `categoryService.getMenuCategories()` — category tree for navigation
- `authService.signInWithRut()`, `getSession()`, `signOut()`

**State:**
- `authStore` (Zustand + persist) — session management, 403 handler
- **No cart store exists**

**Styling:**
- 860-line `globals.css` with CSS custom properties
- Per-route CSS files (`catalogo.css`, `productos.css`)
- MUI 9 installed and configured (theme, tokens, CSS variables with `ps` prefix)
- MUI used sparingly: Skeleton, Pagination, CircularProgress, icons

---

### Affected Areas

- `src/app/catalogo/page.js` — Remove auth guard, repurpose as open browsing
- `src/app/page.js` — Redesign home page with product-focused layout
- `src/app/layout-client.js` — Remove `/catalogo` exclusion from global layout
- `src/modules/components/SiteHeader.jsx` — Add cart icon with badge, restructure actions area
- `src/modules/components/Hero.jsx` — Remove embedded LoginForm, add product carousel/banner
- `src/store/` — New `cartStore.js` required
- `src/services/` — May need cart/order services
- `src/app/globals.css` — Significant additions for new layout patterns

---

### Approaches

#### 1. **Incremental Evolution (Recommended)**
Keep the existing structure, remove auth gates, add cart layer on top.

- **Pros:**
  - Minimal disruption to working code
  - CategoryCards, ProductCard, RelevantBanner, ProductSidebar are already built and working
  - Services already exist for the data we need
  - Can ship value in phases
- **Cons:**
  - Some legacy patterns (duplicate CatalogoSidebar vs ProductSidebar) persist
  - CSS architecture may need refactoring as complexity grows
- **Effort:** Medium (4 phases, each shippable)

#### 2. **Full Rewrite with MUI**
Tear down CSS-based styling, rebuild everything with MUI components.

- **Pros:**
  - Consistent component library
  - Better accessibility out of the box
  - Easier to maintain long-term
- **Cons:**
  - Massive effort, high risk of regression
  - 860 lines of working CSS to replace
  - Team needs MUI expertise
  - Delays value delivery
- **Effort:** High

#### 3. **Hybrid: Keep CSS Layout + MUI Interactive**
CSS for page structure/layout, MUI for interactive components (Drawer, Badge, Button, TextField).

- **Pros:**
  - Best of both worlds
  - Keeps existing visual design
  - MUI handles complex interactive pieces (cart drawer, search autocomplete)
  - Pragmatic migration path
- **Cons:**
  - Two styling systems to maintain
  - Need clear boundaries (which uses what)
- **Effort:** Medium

---

### Component Inventory

#### Existing — Reuse As-Is
- `ProductCard` — Works perfectly for product grids
- `CategoryCards` — Works for category grid on landing
- `RelevantBanner` — Already fetches from `/products/relevant/list`
- `ProductSidebar` — Category filter for product listing
- `SiteFooter` / `ConditionalFooter` — Keep
- `FeaturesSection`, `BrandsSection`, `InfoSection` — Keep for home page

#### Existing — Needs Modification
- **`SiteHeader`** — Add: cart icon with item count badge, restructure actions area (cart + login button side by side), make search functional
- **`Hero`** — Remove `LoginForm` embed, replace with product carousel or promotional banner using RelevantBanner data
- **`CatalogoSidebar`** — Delete (duplicate of `ProductSidebar`)
- **`CatalogoHeader`** — Delete (replaced by enhanced `SiteHeader`)

#### New — Must Create
- **`cartStore.js`** — Zustand store with persist middleware
  - `items[]` (product, quantity, sku selection)
  - `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`
  - `totalItems`, `totalPrice` computed
- **`CartDrawer.jsx`** — Slide-out cart panel (MUI Drawer)
- **`CartIcon.jsx`** — Header cart button with MUI Badge
- **`SearchBar.jsx`** — Extracted from SiteHeader, with autocomplete (MUI Autocomplete)
- **`ProductDetailPage`** — At `/productos/[slug]/page.js`
- **`AddToCartButton.jsx`** — Product page + card integration
- **`cart.service.js`** / **`order.service.js`** — When backend endpoints are ready

#### New — Phase 3+
- **Checkout flow** — Multi-step form
- **Order confirmation page**
- **User order history** (authenticated)

---

### Proposed Routing Structure

```
/                          → Home (landing): Hero banner + Category cards + Relevant products
/productos                 → Product listing (public, with search + filters)
/productos/[slug]          → Product detail page (NEW)
/carrito                   → Cart page (full view)
/login                     → Login (keep for authenticated features)
/perfil                    → User profile (keep, authenticated)
/perfil/pedidos            → Order history (NEW, authenticated)
/hazte-cliente             → Registration (keep)
/checkout                  → Checkout flow (NEW, authenticated)
```

**Key changes:**
- `/catalogo` → **REMOVED** (merged into `/` and `/productos`)
- `/` becomes the open landing with categories + featured products
- `/productos` becomes the main browsing route (already public, no changes needed)
- Auth is only required for: checkout, order history, profile

---

### Component Hierarchy

```
RootLayout
├── Providers (MUI + SessionInitializer)
└── LayoutClient
    ├── SiteHeader (enhanced)
    │   ├── TopBar (contact links)
    │   ├── LogoSection
    │   ├── SearchBar (extracted, with autocomplete)
    │   └── ActionsArea
    │       ├── CartIcon → CartDrawer (slide-out)
    │       └── AuthButton (Login | Profile + Logout)
    │
    ├── [PAGE CONTENT]
    │   ├── Home (/)
    │   │   ├── HeroBanner (promotional, no login form)
    │   │   ├── CategoryCards (grid)
    │   │   ├── RelevantBanner (featured products)
    │   │   ├── FeaturesSection
    │   │   ├── BrandsSection
    │   │   └── InfoSection
    │   │
    │   ├── Productos (/productos)
    │   │   ├── ProductSidebar (category filter)
    │   │   ├── SearchBar (page-level)
    │   │   ├── ProductGrid
    │   │   │   └── ProductCard[] (with AddToCartButton)
    │   │   └── Pagination
    │   │
    │   ├── ProductDetail (/productos/[slug])
    │   │   ├── ProductGallery
    │   │   ├── ProductInfo
    │   │   ├── AddToCartButton
    │   │   └── RelatedProducts
    │   │
    │   └── Cart (/carrito)
    │       ├── CartItemList
    │       │   └── CartItem[] (quantity controls)
    │       └── CartSummary → CheckoutButton
    │
    └── ConditionalFooter
        └── SiteFooter
```

---

### Cart State Design

```js
// store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],  // { product, sku, quantity, price }

      addItem: (product, sku, quantity = 1) => { /* ... */ },
      removeItem: (productId, skuId) => { /* ... */ },
      updateQuantity: (productId, skuId, quantity) => { /* ... */ },
      clearCart: () => set({ items: [] }),

      // Computed
      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
      get totalPrice() {
        return get().items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      },
    }),
    {
      name: 'cuatro-ruedas-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
```

---

### Styling Strategy

**Recommendation: Hybrid (Approach 3)**

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Page layout, grid, spacing | CSS (globals.css + custom properties) | Already working, team knows it, fast |
| Interactive components | MUI | Drawer, Badge, Button, Autocomplete, Dialog |
| Product cards, category cards | CSS | Custom design, no MUI equivalent that fits |
| Forms (login, checkout) | MUI TextField + CSS layout | Accessibility + validation |
| Icons | MUI Icons (already in use) | Consistent, tree-shakeable |

**Clear boundary rule:** If it needs state/interaction → MUI. If it's layout/visual → CSS.

---

### Migration Strategy

#### Phase 1: Open the Platform (1-2 days)
- Remove auth guard from `/catalogo` → redirect `/catalogo` to `/productos`
- Remove `/catalogo` exclusion in `layout-client.js`
- Delete `CatalogoSidebar` and `CatalogoHeader` (duplicates)
- Update `LoginForm` redirect: `/catalogo` → `/productos`

#### Phase 2: Cart Foundation (2-3 days)
- Create `cartStore.js` with persist
- Create `CartIcon.jsx` with MUI Badge
- Enhance `SiteHeader` — add cart icon, restructure actions area
- Create `CartDrawer.jsx` (MUI Drawer, slide from right)
- Add `AddToCartButton` to `ProductCard`

#### Phase 3: Landing Redesign (2-3 days)
- Refactor `Hero` — remove LoginForm, add promotional banner/carousel
- Restructure home page: HeroBanner → CategoryCards → RelevantBanner → Features → Brands → Info
- Make `SearchBar` a standalone component with autocomplete

#### Phase 4: Product Detail + Polish (3-4 days)
- Build `/productos/[slug]/page.js`
- Add `AddToCartButton` on product detail
- Build `/carrito` full page view
- Responsive design pass
- Performance optimization (Suspense, dynamic imports)

---

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing authenticated workflow | High | Keep `/perfil`, `/login`, auth store untouched. Only remove guard from `/catalogo` |
| Cart persistence across devices | Medium | Start with localStorage (persist middleware), add server-side cart later |
| SEO impact from route changes | Medium | Add redirects from `/catalogo` → `/productos`, update sitemap |
| MUI + CSS conflicts | Low | Clear boundary rule, test themed components early |
| Backend endpoints not ready (cart, orders) | Medium | Build UI with mock data, integrate when API is ready |
| Performance regression from larger bundle | Low | MUI is tree-shakeable, use `next/dynamic` for heavy components |

---

### Ready for Proposal

**Yes.** The exploration is complete. The orchestrator should tell the user:

> "We have a clear picture of the current codebase and a solid plan to evolve it into an open sales platform. The recommended approach is **incremental evolution** in 4 phases, reusing 6 existing components, enhancing 2, creating 5-7 new ones, and removing 2 duplicates. The biggest win is that `ProductCard`, `CategoryCards`, `RelevantBanner`, and `ProductSidebar` are already built and just need to be rearranged. The cart layer is the main new work. Ready to proceed to proposal when you are."
