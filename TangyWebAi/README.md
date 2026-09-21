# Tangy Restaurant Website

A Vue 3 restaurant menu and management workspace using Firebase Firestore.

## Stack

- Vue 3, TypeScript, Vite, and Vue Router
- Tailwind CSS with custom restaurant styling
- Firebase Firestore
- Lucide Vue icons
- Vitest and Vue Test Utils

## Setup

```sh
npm install
copy .env.example .env.local
npm run dev
```

Fill `.env.local` with a Firebase web app configuration. Set `VITE_USE_FIREBASE_EMULATOR=true` to connect Firestore to the local emulator on port `8080`.

The public menu is available at `/`. The management page is available at `/admin` and is intentionally unprotected during this phase.

## Firebase Emulator

Install the Firebase CLI separately, then run:

```sh
firebase emulators:start --only firestore
```

With the emulator running in another terminal, seed the local collections with:

```sh
npm run seed:emulator
```

The checked-in `firestore.rules` file allows public reads and requires an authenticated user for writes. Production unauthenticated writes must never be enabled. Add authentication and authorization in a later phase before enabling deployed admin writes.

The repeatable local seed data is at `scripts/seed-data.json`. The seed script uses the Admin SDK only against the local emulator; it is not a production seed command and does not contain credentials.

## Commands

```sh
npm run dev
npm run type-check
npm test
npm run build
npm run format
```

## Data model

`categories` stores `name`, a normalized name key for duplicate detection, and timestamps. `products` stores `name`, `description`, `price`, `imageUrl`, `categoryId`, `isAvailable`, and timestamps. Products reference categories by ID rather than copying category names.

Image validation accepts HTTPS URLs only. Firebase Storage uploads are outside the current scope.
