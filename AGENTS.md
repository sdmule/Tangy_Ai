# TangyAi

TangyAi contains TangyWebAi, a Vue 3, TypeScript, Vite, and Firebase Firestore restaurant application with a public menu and an administrative management interface. Most implementation work belongs in `TangyWebAi`; project-wide conventions and path-specific guidance are maintained separately under `.github/`.

## Development

Run these commands from `TangyWebAi`:

```powershell
npm install
npm run dev
```

## Tests

Run the unit test suite from `TangyWebAi`:

```powershell
npm test
```

## Architecture constraints

- Product and banner images are URL strings only. Do not add file uploads or Firebase Storage integration.
- Keep Firebase logic in the service layer; Vue components must use typed service functions rather than call Firebase SDK APIs directly.
