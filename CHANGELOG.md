Changelog
=========

**Unreleased**
---------
**New Features**
- Add MIT License to project.
- Add `modal-dialog__footer` and `modal-dialog__button` for modals that will
  have a button at the bottom of the modal.
- Add svg4everybody as polyfill for external SVG support in IE.

**Changes**
- `responsive-font('xs')` is no longer a responsive font.
- `xs` font size will only be used for `fixed-font` mixin.
- Remove `spriterite` function. This was a remnant from tmol-web-spring and is
  not used within Nucleus.
- For modals that do not have a footer button, bottom corner radius will be
  applied via new `modal-dialog__content--informational` modifier.

**v0.1.0**
---------
**New Features**
- Switch to semantic version numbering (see: http://semver.org/)
- Add new `form-label()` mixin. Update `.input-group__label` classes to refer to
  said mixin.
- Add General Admission version of SRS.

**Changes**
- Rename `event-footer` to `cart`
- Add `$overlay-color` to palette.scss
- Add success-dialog, warning-dialog, alert-dialog, and modal-dialog
- Rename icon-warning to icon-caution

**Fixes**
- Remove `$icon-container-plus-minus` variable
- Remove `.icon--container-plus` and `.icon--container-minus` classes
- Add missing `@import legal-copy` to `components/_all.scss`

**Known Issues**
- External SVG sprite fallback for IE via svg4everybody needs to be implemented
