# Copilot Instructions for TangyAi / TangyWebAi

## Project context

- This repo is a Vue 3 + TypeScript + Vite restaurant application for a public menu and admin management UI backed by Firebase Firestore.
- Work primarily in the TangyWebAi folder unless a task clearly requires changes elsewhere.
- Prefer small, maintainable changes that follow the existing project structure and conventions.

## General implementation rules

- Use shared utility functions and typed models rather than duplicating logic.
- Keep the UI custom to the restaurant brand; do not add a heavy UI framework unless it is required by a blocker.
- Follow the applicable scoped instruction file for Firebase changes, Vue components, and unit tests.

## Data model and business rules

- Treat categories and products as Firestore collections with typed TypeScript models.
- Store product category references by categoryId, not by copying category names.
- Validate required fields, positive pricing, valid image URLs, and category existence before writes.
- Trim category names and reject duplicates case-insensitively.
- Prevent deleting a category that is still referenced by any product and explain the reason in the UI.
- Keep public reads allowed, while production unauthenticated writes remain blocked until authentication is implemented.

## UX and quality expectations

- Do not show blank screens when a dependency fails; provide actionable feedback and an appropriate retry flow.

## Testing and validation

- Add or update tests when changing validation, filtering/search, category-reference protection, service error handling, or UI state logic.
- Run the relevant validation commands before declaring work complete.
- Keep code type-safe and ensure the project still passes npm test and npm run build.

## Repository hygiene

- Follow the project requirement that Firebase Storage uploads and auth are out of scope for this phase unless explicitly requested.

## Response expectations for this session

- When answering the user, include a brief summary using this exact format: Summary: [Your summary here].
- Keep explanations concise, actionable, and project-specific.
- Favor root-cause fixes over speculative patches and validate before claiming completion.
