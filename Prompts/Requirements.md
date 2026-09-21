# Tangy Restaurant Website - Build Requirements

Status: Draft for review. Implement only the scope below.

## 1. Goal

Build a responsive Vue 3 + TypeScript + Vite restaurant website backed by Firebase Firestore.

The application has:

1. A public menu page for browsing, searching, filtering, and viewing products.
2. An admin management page for CRUD operations on products and categories.

Authentication is intentionally deferred. The admin page may be reachable by URL during this phase, but production Firestore writes must not be open to unauthenticated users.

## 2. Frontend Styling

- Use **Tailwind CSS** as the styling and responsive layout framework.
- Use Tailwind utility classes and shared Vue components for buttons, forms, cards, tables, alerts, loading states, and modals.
- Use `lucide-vue-next` for interface icons where an icon is appropriate.
- Do not add a full UI component library unless required by an implementation blocker; keep the visual design custom to the restaurant brand.
- Ensure the public menu and admin page are responsive at mobile, tablet, and desktop widths.

## 3. Data Model

Create two Firestore collections.

### `categories`

- `id`: Firestore document ID
- `name`: required string; unique after trimming and case-insensitive comparison
- `createdAt`: Firestore server timestamp
- `updatedAt`: Firestore server timestamp

### `products`

- `id`: Firestore document ID
- `name`: required string
- `description`: required string
- `price`: required number greater than zero
- `imageUrl`: required string containing a valid image URL
- `categoryId`: required reference to a category document
- `isAvailable`: boolean, default `true`
- `createdAt`: Firestore server timestamp
- `updatedAt`: Firestore server timestamp

Products must store `categoryId`, not a copied category name. Resolve category names through loaded category data.

## 4. Firebase and Project Rules

- Read Firebase configuration from `VITE_*` environment variables. Never hardcode credentials or project configuration.
- Keep `.env` out of source control and add a committed `.env.example` with all required variable names.
- Initialize Firebase exactly once in a dedicated module.
- Put all Firestore access in typed product and category service modules. Vue components must not call the Firestore SDK directly.
- Services must support listing, creating, updating, and deleting products and categories.
- Catch and translate Firebase errors so the UI can display them; do not leave unhandled promise rejections.
- Add explicit Firestore rules. Public reads may be allowed; unauthenticated production writes must be denied.
- Configure Firebase Emulator support for local CRUD development and testing.
- Add/document Firestore indexes if required.
- Add shared TypeScript types for `Product` and `Category`.

## 5. Public Menu Page

- Load products and categories from Firestore on page load.
- Display product cards with image, name, price, short description, and category name.
- Display a loading spinner while data is loading.
- Display a clear error and retry action if either Firebase request fails.
- Display a clear empty state when no products match.
- Search must perform a case-insensitive partial match against both `name` and `description`.
- Provide a category dropdown populated from Firestore, with `All` selected by default.
- Combine search and category filtering with AND behavior.
- Clicking a product opens a details modal showing full description, price, category, image, and availability.
- The modal closes through its close button, backdrop click, and Escape key.
- Show unavailable products on the public menu with a clear unavailable label; they must not be presented as orderable.

## 6. Admin Management Page

Use the shared Firebase services. Include loading, error, success, and empty states.

### Products

- List all products with create, edit, and delete actions.
- Create/edit fields: name, description, price, image URL, category dropdown, and availability.
- Populate the category dropdown from the `categories` collection; do not hardcode categories.
- Validate required fields, positive price, valid image URL, and existing category before writing.
- Require confirmation before deleting a product.

### Categories

- List all categories with create, edit, and delete actions.
- Create/edit field: category name.
- Trim names and reject duplicate names case-insensitively.
- Require confirmation before deleting a category.
- Block deletion of a category referenced by any product and explain why it cannot be deleted.

### Write behavior

- Show success only after Firebase confirms the operation.
- Show actionable errors for validation, network, and permission failures.
- The UI may be fully implemented and tested against the Firebase Emulator, but production CRUD writes remain unavailable until authentication and authorization are added.

## 7. Quality Requirements

- Responsive at mobile, tablet, and desktop sizes.
- Use labels for all form controls, meaningful image `alt` text, keyboard-accessible controls, and Escape handling for the modal.
- Never show a blank screen for a Firebase failure.
- Add unit tests with Firebase mocked for search/filtering, validation, category-reference protection, UI states, and service error handling.
- Run the existing type-check and build commands successfully.

## 8. Out of Scope

Do not implement these in this phase:

- Authentication, authorization, or protected admin routing.
- Online ordering, cart, checkout, or payments.
- Firebase Storage image uploads.
- Reservations, customer accounts, reviews, analytics, or loyalty features.
- Sorting, pagination, dietary filters, or SEO enhancements unless requested later.

## 9. Required Deliverables

- Working public menu page.
- Working admin page and forms.
- Firestore data model, services, rules, and emulator configuration.
- `.env.example` and Firebase setup documentation.
- Seed data for local development.
- Automated tests for required behavior.
- No secrets committed to the repository.

## 10. Completion Checklist

The task is complete when:

- Products and categories load from Firestore and render correctly.
- Search matches product names and descriptions.
- The category filter is dynamic and includes `All`.
- Product details open in an accessible modal.
- Loading, empty, retry, validation, success, and error states work.
- Product and category CRUD works against the Firebase Emulator.
- Referenced categories cannot be deleted accidentally.
- Production rules reject unauthenticated writes.
- Tests, type-checking, and the production build pass.
