---
description: "Use when creating or modifying Vue components, views, composables used by components, templates, forms, or component styles in TangyWebAi. Covers Vue 3 Composition API, TypeScript, Tailwind, accessibility, and UI state patterns."
applyTo: "TangyWebAi/src/**/*.vue"
---

# Vue component conventions

- Use Vue 3 single-file components with `<script setup lang=\"ts\">` and the Composition API. Keep props and emitted events typed with `defineProps` and `defineEmits`.
- Keep components focused on presentation and interaction. Extract reusable, non-UI logic into typed utilities or composables when it is shared or materially complex.
- Import data through typed service functions; do not import the Firebase SDK into components. Validate user input before calling a service and convert service failures into clear, actionable UI messages.
- Model loading, empty, success, validation, and error states explicitly. Disable duplicate submit actions while requests are in progress and preserve user input after a failed request.
- Use `ref` for independent reactive values and `reactive` for cohesive form objects. Avoid prop mutation; emit updates or work on a local copy instead.

# Templates and accessibility

- Use semantic elements and headings in order. Give each form control a visible `<label>` linked with `for` and `id`; use `aria-label` only when no visible label is appropriate.
- Use native buttons for actions, with `type=\"button\"` outside forms and `type=\"submit\"` for form submission. Provide accessible names for icon-only buttons and status or error announcements with appropriate ARIA roles.
- Implement keyboard-friendly dialogs: focus management, Escape close, close buttons, and backdrop behavior. Do not make click-only controls that exclude keyboard users.
- Render repeated content with stable, unique `:key` values and use `v-if` for conditional presence rather than hiding unavailable controls with CSS alone.

# Styling and layout

- Use the existing Tailwind tokens, shared utility classes, and Lucide Vue icons. Preserve the restaurant visual language; do not introduce a component library or inline SVG icons when Lucide provides one.
- Build mobile-first, responsive layouts with stable controls and readable text at narrow widths. Avoid fixed widths that cause overflow or text overlap.
- Keep component-scoped CSS minimal; prefer existing Tailwind utilities and shared theme classes. Do not use deeply nested selectors or `!important` to override component behavior.
