Changelog
=========

**Unreleased**
---------
**New Features**
- New `truncate-text` mixin is now available. Previous `.truncate-text` class
  now references this mixin.
- New `text-rotator` mixin.

**Changes**
- `event-header` has been heavily refactored due to design changes. Previous
  versions are still supported but deprecated. Please update existing usages to
  match new pattern.
- Apply `min-height: 1px` to `event-header__supportive`. The `&nbsp;` is no
  longer needed.
- Dialog text is now `$brand-gray2`
- Caution dialog is now `$brand-gray` instead of `$brand-caution`
- Add a centered variant of modal dialog via new class `modal-dialog--center`

**Bug Fixes**
- Revert `@mixin form-label` back to use `@include responsive-font('xs');`
- Clean up typo for the fixed font extra small copy. Should size of 10px.

**0.5.1**
---------
**Bug Fixes**
- Add title and description text to SVGs for accessibility purposes

**0.5.0**
---------
**New Features**
- Add icons: `icon-chevron--top`, `icon-chevron--right`, `icon-chevron--left`,
  `icon-ticket`, `icon-verified`
- Clean-up styleguide documentation

**v0.4.0**
---------
**Changes**
- `responsive-font('xs')` has been brought back.
- `xs` font size can be used for `fixed-font` and `responsive-font` again.
- `xs` responsive font size is as follows
  - small mobile / mobile = 10px
  - tablet / desktop = 12px
- `polling-refresh` component animation is now set as a configurable value.
- `$polling-refresh-animation` is the new variable that defines the polling
   refresh animation.
- Remove `icon--chevron`.

**v0.3.1**
---------
**Bug Fixes**
- Update version number in styleguide.

**v0.3.0**
---------
**New Features**
- Add `button-outlined--static` that mirrors `button--static` for outlined
  buttons.
- Add new component `polling-refresh` for polling animations on the ISM.
- Add two new SVG's for this polling animations `icon-polling-fill.svg`
  and `icon-polling-outline.svg`.

**Changes**
- `btn()` mixin can now accept an optional height parameter.

**v0.2.0**
---------
**New Features**
- Add MIT License to project.
- Add `modal-dialog__footer` and `modal-dialog__button` for modals that will
  have a button at the bottom of the modal.

**Changes**
- `responsive-font('xs')` is no longer a responsive font.
- `xs` font size will only be used for `fixed-font` mixin.
- Remove `spriterite` function. This was a remnant from tmol-web-spring and is
  not used within Nucleus.
- For modals that do not have a footer button, bottom corner radius will be
  applied via new `modal-dialog__content--informational` modifier.

**Bug Fixes**
- Add svg4everybody as polyfill for external SVG support in IE.

**v0.1.0**
---------
**New Features**
- Switch to semantic version numbering (see: http://semver.org/).
- Add new `form-label()` mixin. Update `.input-group__label` classes to refer to
  said mixin.
- Add General Admission version of SRS.

**Changes**
- Rename `event-footer` to `cart`.
- Add `$overlay-color` to palette.scss.
- Add success-dialog, warning-dialog, alert-dialog, and modal-dialog.
- Rename icon-warning to icon-caution.
- Remove `$icon-container-plus-minus` variable.
- Remove `.icon--container-plus` and `.icon--container-minus` classes.

**Bug Fixes**
- Add missing `@import legal-copy` to `components/_all.scss`.

**Known Issues**
- External SVG sprite fallback for IE via svg4everybody needs to be implemented.
