---
description: "Use when creating or modifying Firebase configuration, Firestore security rules or indexes, Firebase-backed services, emulator or seed scripts, or Firebase environment settings. Covers Firestore security, typed data access, configuration, and deployment safety."
applyTo: "TangyWebAi/src/services/**/*.ts"
---

# Firebase conventions

- Initialize Firebase once in `src/firebase/config.ts`; export configured clients from that module and read all client configuration from `VITE_*` environment variables.
- Never commit secrets, service-account JSON, or real `.env` files. Keep required variable names documented in `.env.example` without values.
- Keep Firebase SDK calls in `src/services`; components and utilities consume typed service functions instead of importing Firebase SDK modules directly.
- Use Firestore converters or explicit mapping at service boundaries. Validate and normalize input before writes, and use `serverTimestamp()` for server-managed timestamps.
- Store relationships by document ID, not copied display values. Check referenced data exists before writes when the business rule requires it.
- Design reads and queries around Firestore indexes. Add required composite indexes to `firestore.indexes.json` instead of relying on production error links.

# Firestore security and operations

- Treat Firestore rules as the security boundary: validate authentication, document shape, permitted fields, data types, and ownership or role requirements in rules, not only in the client.
- Use least-privilege rules. Public read access must be explicit; production writes must require authenticated and authorized users. Never deploy catch-all `allow read, write: if true` rules.
- Keep collection-specific rules explicit. When rules rely on referenced documents, account for Firestore rule access-call limits and prevent privilege escalation through user-controlled fields.
- Test rules with the Firebase Emulator Suite before deployment whenever rules change. Develop and seed against the emulator unless a remote environment is explicitly intended.
- Make seed scripts idempotent, clearly target the intended project or emulator, and avoid destructive deletes unless the operation is deliberate and guarded.
- Surface Firebase failures as actionable, user-safe messages through the service layer; log diagnostic details without exposing credentials or internal configuration.
