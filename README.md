# StudyFlow

A small React and TypeScript study-tracking interface built with Vite.

The current app lets you add subjects, view them on a dashboard, and remove them again. Subjects are saved in this browser with `localStorage`, so they remain after a reload without requiring an account or backend.

## Current features

- Add a subject
- Display all added subjects
- Show the current subject count
- Remove a subject
- Restore the subject list after a page reload using browser-local storage
- Handle unavailable or malformed browser storage without crashing
- Responsive card-based layout

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS / utility libraries from the project template

## Run locally

```bash
npm install
npm run dev
```

The Vite development server uses port 8080 in the current configuration.

## Production build

```bash
npm run build
```

Preview a production build with:

```bash
npm run preview
```

Run the automated storage tests with:

```bash
npm test
```

Run the linter with:

```bash
npm run lint
```

## GitHub Pages

The Vite configuration uses the repository base path:

```text
/chetan.github.io/
```

The repository contains a GitHub Pages deployment workflow.

## Project structure

```text
chetan.github.io/
├── src/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── style.css
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

## Current scope

This repository is a small frontend experiment. The subject list is stored only in the current browser profile; it is not synced across devices and is not backed by a server. If browser storage is blocked or unavailable, subjects remain available only for the current page session. The app does not currently include authentication, a backend, a database, or AI API integration.
