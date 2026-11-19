# Stacks Library Catalog Client

Stacks is a React single-page application for browsing a library catalog. Visitors can search for books by title or author, filter by genre, sort results, and open a detail page for each book.

## Features

- Search books by title or author
- Filter the catalog by genre
- Sort results by title or author
- View book details, including description, ISBN, publication year, and availability
- Loading, empty, and error states for catalog requests

## Requirements

- Node.js compatible with Vite 8 (Node.js 20.19+ or 22.12+)
- pnpm
- A running library catalog API

## Getting started

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

Vite prints the local URL when the server starts.

### Configure the API

The client uses `http://localhost:3000` by default. To use a different API URL, create a local `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

The `.env` pattern is listed in `.gitignore`, but Git continues tracking files already committed until they are explicitly untracked. `VITE_` variables are included in browser code, so set only public configuration here—never API keys or other secrets.

## API expectations

The API base URL is configured with `VITE_API_URL`. The client makes these requests:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/genres` | Load genre options. Each genre includes `id` and `name`. |
| `GET` | `/books` | Load books. Supports the optional `genreId` and `search` query parameters. Returns an array. |
| `GET` | `/books/:id` | Load one book by ID. Returns a book object. |

Book objects use `id`, `title`, and `author`; the detail view also supports `genre` (`id` and `name`), `description`, `isbn`, `publishedAt`, and `totalCopies`. The API should allow requests from the client’s development or deployed origin.

## Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Vite development server |
| `pnpm typecheck` | Check the TypeScript source without emitting files |
| `pnpm build` | Type-check the source and create a production build in `dist/` |
| `pnpm preview` | Preview the production build locally |

## Tech stack

- React
- React Router
- TypeScript
- Vite
