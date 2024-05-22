# HOW TO DEVELOP

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)
- [SingleStore Database](https://www.singlestore.com)

## Getting Started

- Install the dependencies:

```bash
pnpm install
```

- Create a `.env.local` file similar to `.env.local.example` with your SingleStore Database credentials.

- Push the migrations to the database:

```bash
pnpm run db:push-migrations
```

- Seed the tables with some data:

```bash
bun run ./lib/seed.ts
```

- Run the development server:

```bash
pnpm run dev
```
