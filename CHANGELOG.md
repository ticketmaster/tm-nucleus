Changelog
=========

**v0.3.0**
---------
**New Features**
- Add `button-outlined--static` that mirrors `button--static` for outlined
  buttons.
- Add new component `.polling-refresh` for polling animations on the ISM.
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
