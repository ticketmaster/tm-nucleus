Changelog
=========

**0.31.0**
---------
**New Features**
- Add new happy-tickets.svg.

**0.30.0**
---------
**New Features**
- Add new `tab-selection` pattern.
- Add new `radio` input style and `radio-list` pattern.

**0.29.2**
---------
**Bug Fixes**
- Adjust positioning of cobranded header in latest Chrome v52+.

**0.29.1**
---------
**Bug Fixes**
- Adjust slider active color for LN.

**0.29.0**
---------
**New Features**
- Add new Price Slider component.

**0.28.1**
---------
**Bug Fixes**
- Tweak `toggle-switch` pattern.

**0.28.0**
---------
**New Features**
- Add new `toggle-switch` pattern.

**0.27.3**
---------
**Bug Fixes**
- Correct spacing in dialog headers.

**0.27.2**
---------
**Bug Fixes**
- Remove SVG fill.

**0.27.1**
---------
**Bug Fixes**
- Add missing normalize.css dependency to package.json.

**0.27.0**
---------
**New Features**
- Add new `target-ie-edge` mixin for targeting IE Edge browser.

**Bug Fixes**
- Fix alignment issue with MLB cobranded header.

**0.26.0**
---------
**New Features**
- Add breadcrumbs pattern.
- Add new `icon-chevron-alt` icon. These should be used for paginationa and
  left/right controls. Previous chevron is now used only show/hide controls in
  the up and down directions.
- Add new `npm run app` Gulp task to start up server and run the `dev` in a
  single command.
  **NOTE**: For those upgrading from a previous version of Nucleus, you may need to
  delete your `node_modules` directory if you experience any difficulties with
  the new task. Doing a fresh `npm install` should resolve any issues.

**0.25.1**
---------
**Bug Fixes**
- Fix logo height of cobrand header to 3.4rem.

**0.25.0**
---------
**Changes**
- Update all button heights for all breakpoints.

**0.24.0**
---------
**New Features**
- Create new treatment for MLB cobranded headers.

**0.23.0**
---------
**New Features**
- Disabled IE specific dropdown arrow on native `<select>` tags. Should use nucleus dropdown.

**0.22.0**
---------
**New Features**
- Added a new icon: `icon-search`. It is a magnifying glass
- Disable IE specific close button on input field. This seems to happen on IE10+

**Changes**
- Turn off outline color on buttons and anchor tags

**0.21.0**
---------
**New Features**
- Created a new component called `chkbox`. This allows checkboxes to now be focusable. Please do not use the component `checkbox` anymore. This will be deprecated.

**Changes**
- Update `.modal-dialog__footer` to use this font size: `@include responsive-font('md')`
- Updated the page markup to use the new `chkbox` component.

**0.20.1**
---------
**Bug Fixes**
- Define sass variable definitions outside of if statements to fix scope issues on newer versions of node-sass.


**0.20.0**
---------
**New Features**
- Add back arrow button for modals.

**Bug Fixes**
- Remove rounded borders showing up in iOS.

**0.19.1**
---------
**Bug Fixes**
- Set color of anchor tag text to color parameter when styled as button on all
  breakpoints.

**0.19.0**
---------
**New Features**
- Add new `dead-center()` mixin.
- Add new `polling-refresh()` mixin.
- Add new `fullscreen` variant for `modal-dialog` and `modal-dialog__content`.
- Add sad-ticket.svg.

**Changes**
- `btn()` mixin now will apply same styling to anchor tags.

**v0.18.0**
---------
**New Features**
- Add `$nowrap` param to `unbutton()` mixin. The mixin can now accept an
  optional third parameter to allow text to wrap. By default, it will set
  `white-space: nowrap` so that existing usage is unaffected.
- `increase-spacing` function can now accept `auto` as a parameter. This means
  that the `outer-spacing()` mixin can also have `auto` passed in for any side.
- Polling icon animation size is now configurable via `$polling-size` and
  `$polling-border-size`.

**Changes**
- Allow modals to scroll when content runs long. `.modal-dialog__content` now
  has a max height.

**0.17.0**
---------
- Add error svg.

**0.16.0**
---------
**New Features**
- Add `_all-custom.scss` for custom palette configurations.
- Live Nation version of styleguide with LN palette (WIP).

**Changes**
- Abstract color assignments to allow custom user configurations.
- Deprecated event header support has been removed.
- The following variables are no longer available:
  - `$timer-container`
  - `$timer-container-lg`
  - `$logo-container`
  - `$event-header-menu`
  - `$event-header-menu-container`
  - `$event-header-datestamp-width`
  - `$event-header-info-checkout-width`
  - `$event-image-size`
- Update styleguide CSS to conform to BEM standards

**0.15.0**
---------
**Changes**
- Default button font size is now `md` instead of `lg`.
- Font size for `button-aux--minor` is now `sm` instead of `md`.
- Apply certain colors via abstract variable names to facilitate custom client
  colors. Introduce new `_customizable.scss` file to hold/assign abstract names.

**Bug Fixes**
- Change `timer` background color from transparent to `$brand-primary`

**v0.14.0**
---------
**New Features**
- New `vertically-center()` mixin.
- Added `tooltip__legal` for legal footer treatment

**Changes**
- Change size of timer (reduced by 5px from previous sizes).
- Make `timer-base` mixin be able to receive a specified color for border.
- Remove `$timer-border-on` and `$timer-border-off` variables.
- Remove `white-space: nowrap;` from `srs.scss`. Sometimes section names need to break to another line.
- Remove bottom margin when `tooltip__content` follows a `.tooltip__delimited-list + .tooltip__content` list

**Bug Fixes**
- Correct cobrand-header HTML example to include default Ticketmaster logo when
  brand logo is not present.
- iOS/safari has an issue with the `drop-shadow` mixin(). Content will flicker so we need to use
  `backface-visibility: hidden;`. Solution was from this link. http://stackoverflow.com/a/13020881

**v0.13.0**
---------
**New Features**
- Add new animated polling icon.

**v0.12.0**
---------
**Changes**
- Change how cobranded header is implemented.
- Change SVG for Ticketmaster logo.

**Bug Fixes**
- Fix off-center Date/Venue information for cobranded header.

**v0.11.0**
---------
- Add new lock and unlock icons.

**v0.10.0**
---------
**New Features**
- Add new `.ada-text` class for screen reader speific text.
- Add new `target-device()` mixin for device targeting via media queries.
  (Currently only supports targeting for iPad.)
- Add box-shadow to event header

**v0.9.0**
---------
**New Features**
- Refactor event header to match new design.
- Add support for cobranding to event header.
- Add new responsive TM logo.
- Add menu icon (hamburger).
- Add more icon (three dots).
- Add gulp task to copy /src/main/img files to /public.

**Changes**
- Update alert and checkmark icons.
- Remove unused `.page__content-header` class.

**v0.8.0**
---------
**New Features**
- Added a selected class to delimited list. `.delimited-list__item--selected`

**Changes**
- `qty-picker` no longer uses a `disabled` attribute. This is due to accessibility reasons
  We can not emit events on a disabled button. We have now changed it so it is disabled via css
- Buttons on mobile / tablet no longer have a hover color. Changed to an active color. We don't
  want the hover color to stay on these devices

**v0.7.4**
---------
- Update package.json to specifically grab `v2.0.4` of gulp-sass. Later
  versions have updated to node-sass v3.4.0, which has compilation errors for
  our sass.

**v0.7.3**
---------
**Bug Fixes**
- Update package.json to specifically grab `v3.3.0` of node-sass due to
  compiling issue that appears to have been introduced with `v3.4.0`.
- Fix modal dialog text color to sierra.

**v0.7.2**
---------
**Bug Fixes**
- Set modal dialog widths for different breakpoints.

**v0.7.1**
---------
**Bug Fixes**
- Modal dialog footer button style should carry auxiliary style. Updated to
  reflect this.

**v0.7.0**
---------
**New Features**
- Custom checkboxes are now available.

**Changes**
- `$base-icon-size` is now 20x20 (previously 16x16).
- Tweak `dropdown` styling in light of icon size change.
- Tweak text-rotation animation settings.
- `$brand-caution` hex value update.
- Remove `$text-enter` and `$text-leave` variables as they are unused.
- Remove following unused classes: `.input-group__text-field-cin`,
  `.input-group__text-field-box`, `.input-group__dropdown-wrapper`

**Bug Fixes**
- Sample code for `dropdown` updated to show that `input-group` should also
  be applied to the same element as `dropdown`.
- Prevent `dropdown` text from running into the chevron icon.

**v0.6.0**
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
