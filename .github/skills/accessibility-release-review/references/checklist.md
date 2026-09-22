# Accessibility Checklist

Use this during an [accessibility release review](../SKILL.md). Check each item against the in-scope component; record only deviations as findings.

## Keyboard access

- [ ] Every interactive element (button, link, card acting as a control) is reachable and operable via `Tab`/`Enter`/`Space` — no `@click`-only handlers on non-interactive elements (`div`, `span`) without a matching keyboard handler and `tabindex`/role.
- [ ] Tab order follows visual/reading order; no `tabindex` greater than `0`.
- [ ] Modals/dialogs close on `Escape` and clicking the backdrop does not trap keyboard users.
- [ ] Custom controls (e.g. filter chips, toggles) support the keyboard interaction pattern expected for their role.

## Labels and names

- [ ] Every form input, select, and textarea has a visible `<label>` associated via `for`/`id` or by wrapping the control.
- [ ] `aria-label` is used only when a visible label would be redundant or isn't appropriate (e.g. icon-only buttons, search inputs with a placeholder), not as a substitute for a visible label on primary form fields.
- [ ] Icon-only buttons (edit, delete, close) have an accessible name via `aria-label` that includes enough context (e.g. `Delete {name}` rather than just `Delete`).
- [ ] Images have meaningful `alt` text (or `alt=""` if purely decorative).

## Focus behavior

- [ ] Opening a modal/dialog moves focus into it; closing it returns focus to the triggering element.
- [ ] Focus is visibly indicated (no `outline: none` without a replacement focus style).
- [ ] Dynamically shown content (e.g. validation errors, loaded lists) doesn't strand focus on a removed element.

## Status and error messaging

- [ ] Loading, empty, and error states are represented in the DOM (not purely visual/color) with appropriate `role="status"` or `role="alert"` and readable text.
- [ ] Validation errors are associated with their field and announced, not conveyed by color alone.
- [ ] Destructive actions (delete) have a confirmation step and a clear, specific message.

## Structure

- [ ] Headings are used in a logical, non-skipping order within the component/page.
- [ ] Lists/repeated content use stable, unique `:key` values and `v-if`/`v-show` appropriately rather than hiding disabled controls with CSS alone.
