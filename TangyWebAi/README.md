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

The repeatable seed data is at `scripts/seed-data.json`. It contains the categories `Entree`, `Appetizer`, and `Desert`, plus 12 products using the supplied Blob image URLs.

For the local emulator, run:

```powershell
$env:FIRESTORE_EMULATOR_HOST="127.0.0.1:8080"
$env:GCLOUD_PROJECT="tangyaidemo-a0c68"
npm run seed:emulator
```

For an explicitly requested remote seed, keep the service-account JSON outside the repository and run:

```powershell
$env:SEED_TARGET="remote"
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account.json"
$env:GCLOUD_PROJECT="your-firebase-project-id"
Remove-Item Env:FIRESTORE_EMULATOR_HOST -ErrorAction SilentlyContinue
npm run seed:firebase
```

The remote command uses the Admin SDK and bypasses Firestore client rules, so only run it intentionally with a protected service-account file. Never commit that JSON file or put it in the web app.

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
