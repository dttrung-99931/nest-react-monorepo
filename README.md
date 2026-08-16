# NestJS ReactJS Monorepo Source Base

pnpm + Turborepo starter: NestJS HTTP API + Vite React web app, with shared types, UI, and Prisma.

## Monorepo structure

| Path                                           | Role                              |
| ---------------------------------------------- | --------------------------------- |
| `apps/api`                                     | NestJS HTTP API                   |
| `apps/web`                                     | Vite + React SPA                  |
| `packages/types`                               | Zod DTOs + exceptions (api + web) |
| `packages/database`                            | Prisma schema, client, sqlite     |
| `packages/ui`                                  | shadcn/Base UI atoms              |
| `packages/common`                              | shared zod re-export              |
| `packages/logger`                              | Nest exception filter             |
| `packages/typescript-config` / `eslint-config` | tooling                           |

## Tech stack

- **api:** Nest 11, nestjs-zod, Prisma 7, JWT, Swagger, Redis cache
- **web:** React 19, Vite, TanStack Router / Query / Form, axios, Tailwind 4, Zod
- **ui:** shadcn + `@base-ui/react`, `make add-comp <name>`

## Scripts

- `pnpm dev` — run api + web
- `pnpm build` — build the workspace
- API Swagger: `/swagger`
- Seed roles/permissions: `pnpm --filter @monorepo/api db:seed`

## apps/api — structure

- `src/modules/<feature>` — module, controller extends `BaseAuthController`, service extends `BaseService`
- `src/base` — shared controller/service helpers
- `src/decorators` — auth and permission guards

## apps/api — add a feature

1. Design tables
2. Update [`packages/database/prisma/schema.prisma`](packages/database/prisma/schema.prisma)
3. Migrate (`packages/database` script `db:migrate-name`)
4. Declare Zod DTOs in `packages/types` (shared with web)
5. Controller: `createZodDto(schema)` + `handleRequest`
6. Service: Prisma via `database` from `@monorepo/database`

## apps/web — structure

- `src/routes` — file routes
- `src/features/<name>/{pages,hooks,models,services,mappers,components}`
- `src/shared` — hooks/base, api, storage

## apps/web — add a feature

1. Create route under `src/routes`
2. Create page under `features/<name>/pages`
3. Feature models (`FooModel`; request `GetFoosModel`)
4. Service interface returns models (`BaseResponseModel<T>`); impl maps DTOs
5. Hooks `useGetX` / `useCreateX` via `useAppQuery` / `useAppMutation`
6. UI from models; reuse `packages/ui`; missing component → `make add-comp $(name)` (see [shadcn Base components](https://ui.shadcn.com/docs/components/base/button))

## DTO / model naming

- `FooResponseDto` → `FooModel`
- `GetFoosRequestDto` → `GetFoosModel`
- Hooks and UI must not import `*Dto` except form Zod schemas
