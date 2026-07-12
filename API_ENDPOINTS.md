# Endpoints del cliente

Lista de endpoints que consume el cliente desde la API.

La URL base se configura en `NEXT_PUBLIC_API_URL` y tiene como fallback `http://localhost:3000`. Todas las peticiones se envían con `credentials: "include"`.

---

## Auth

| Servicio | Método | Endpoint | Parámetros / Body |
|---|---|---|---|
| `authService.signInWithRut` | `POST` | `/api/auth/sign-in/rut` | `{ rut, password }` |
| `authService.getSession` | `GET` | `/api/auth/get-session` | — |
| `authService.signOut` | `POST` | `/api/auth/sign-out` | — |

## Categorías

| Servicio | Método | Endpoint | Parámetros / Body |
|---|---|---|---|
| `categoryService.getMenuCategories` | `GET` | `/client/categories/menu` | `?take=&offset=` |

## Productos

| Servicio | Método | Endpoint | Parámetros / Body |
|---|---|---|---|
| `productService.getProducts` | `GET` | `/products` | `?offset=&take=&name=&categoryId=` |
| `productService.getProductBySlug` | `GET` | `/products/:slug` | `slug` en el path |
| `productService.getRelevantProducts` | `GET` | `/products/relevant/list` | `?take=&offset=` |

## Configuración

| Servicio | Método | Endpoint | Parámetros / Body |
|---|---|---|---|
| `configService.getClientConfig` | `GET` | `/client-config` | — |

## Stock

| Servicio | Método | Endpoint | Parámetros / Body |
|---|---|---|---|
| `stockService.checkAvailability` | `POST` | `/stock/availability` | `{ productSkuIds }` |
