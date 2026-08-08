# P34 TextPlugin handoff

## Input contract

- objective: TextPlugin의 string/config form과 token replacement를 한 phrase의 실제 tween으로 보이고, intermediate markup과 stable accessible final text를 분리한다.
- officialPage: title `TextPlugin`; canonicalUrl `https://gsap.com/docs/v3/Plugins/TextPlugin/`; reviewedAt `2026-08-08`; category `Text`; slug `text-plugin`.
- localPage: `src/content/gsap/text/text-plugin/`; route `/fundamentals/text-plugin`.
- sourceBlockers: none; #217 rendered canonical, official raw `src/TextPlugin.js`, and installed source/types를 각각 두 번 대조했다. Rendered `value` requirement, option placement, delimiter, class, spacing, direction, speed, diff, and simple HTML-node claims agree with raw/type evidence. Source target mutation is separately labeled source-backed implementation evidence.
- moduleSelection: registration, string/object forms, token mental model, one descriptor-driven phrase tween, spacing/class/content ownership boundary.
- learnerFlow: register plugin → string shorthand/object placement → delimiter token units → one actual phrase tween/code → stable final meaning and original HTML cleanup.
- relatedPages: ScrambleText는 randomized intermediate를 다루는 별도 prerequisite이고, later text segmentation pages are text-only boundaries; no page-local prerequisite link is introduced.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| TEXT-217-01 | Register `TextPlugin` before using the `text` tween property. | #217 Quick Start rendered; raw plugin export; installed source/types | verified |
| TEXT-217-02 | A string `text` value replaces element text over a tween. | #217 minimal usage rendered; raw non-object normalization; installed `TweenVars.text` | verified |
| TEXT-217-03 | Text replaces character-by-character or delimiter units; final content is replaced and rewind/restart reverts it. | #217 Description rendered; raw render ratio; installed source | verified |
| TEXT-217-04 | Special TextPlugin options belong inside the `text` object form, not outer tween vars. | #217 Advanced Options rendered; raw value-object branch; installed `TextPlugin.Vars` | verified |
| TEXT-217-05 | `delimiter` splits text; default empty string isolates characters and a space supports words. | #217 delimiter rendered; raw split/join; installed `Vars.delimiter` | verified |
| TEXT-217-06 | `newClass` applies a class to new text through a span. | #217 newClass rendered; raw span markup; installed `Vars.newClass` | verified |
| TEXT-217-07 | `oldClass` applies a class to old text through a span. | #217 oldClass rendered; raw span markup; installed `Vars.oldClass` | verified |
| TEXT-217-08 | `padSpace: true` pads trailing space with non-breaking-space HTML when new text is shorter. | #217 padSpace rendered; raw padding branch; installed `Vars.padSpace` | verified |
| TEXT-217-09 | `preserveSpaces: true` maintains extra spaces with non-breaking-space HTML. | #217 preserveSpaces rendered; raw spacing branch; installed `Vars.preserveSpaces` | verified |
| TEXT-217-10 | `rtl: true` introduces text from right to left in reverse order. | #217 rtl rendered; raw ratio inversion; installed `Vars.rtl` | verified |
| TEXT-217-11 | `speed` adjusts tween duration from text changes with `0.05 / speed * text_changes`. | #217 speed rendered; raw speed duration calculation; installed `Vars.speed` | verified |
| TEXT-217-12 | `type: 'diff'` skips identical positions and animates only differences. | #217 type rendered; raw diff comparison; installed `Vars.type` | verified |
| TEXT-217-13 | `value` is the required replacement text string in object form. | #217 value rendered; raw `value.value`; installed required `Vars.value` | verified |
| TEXT-217-14 | TextPlugin recognizes and honors simple HTML nodes such as `br`. | #217 Usage note rendered; raw HTML handling; installed source | verified |
| TEXT-217-15 | Source accepts `innerHTML` targets or SVG text and writes intermediate content/class spans to that target. | official raw and installed target/render paths | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| TEXT-217-01 | `SetupSection` registration snippet; `useTokenAlignmentAnimation` actual registration | covered |
| TEXT-217-02 | `SetupSection` string shorthand snippet | covered |
| TEXT-217-03 | `MentalModelSection`; `TokenAlignmentLab` static token strip | covered |
| TEXT-217-04 | `SetupSection` config placement snippet; actual descriptor form | covered |
| TEXT-217-05 | `TokenAlignmentLab` delimiter control, actual vars, token strip, code, property table | covered |
| TEXT-217-06 | `TokenAlignmentLab` actual descriptor/code/local new-text style and property table | covered |
| TEXT-217-07 | `TokenAlignmentLab` actual descriptor/code/local old-text style and property table | covered |
| TEXT-217-08 | `TokenAlignmentLab` pad-space control, actual vars/code, property table | covered |
| TEXT-217-09 | `ContentBoundarySection`; descriptor/code/property table | covered |
| TEXT-217-10 | `MentalModelSection`; descriptor/code/property table | covered |
| TEXT-217-11 | `MentalModelSection`; descriptor/code/property table | covered |
| TEXT-217-12 | `MentalModelSection`; actual descriptor/code/property table | covered |
| TEXT-217-13 | `TokenAlignmentLab` normalized descriptor and actual object form | covered |
| TEXT-217-14 | `ContentBoundarySection` simple `br` boundary | covered |
| TEXT-217-15 | `ContentBoundarySection`; original `innerHTML` capture and cleanup restore | covered |

## Implementation contract

- exactFiles.create: `TextPluginPage.tsx/.css`, meta/catalog/properties, `SetupSection`, `MentalModelSection`, `ContentBoundarySection`, `examples/TokenAlignmentLab/TokenAlignmentLab.tsx/.css/useTokenAlignmentAnimation.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `TokenAlignmentLab`; goal one phrase exposes character-versus-word token units without turning intermediate markup into accessible status; representation one `aria-hidden` runtime target, descriptor-derived token alignment strip and code, stable final sibling; controls native delimiter select, pad-space checkbox, replay button; runtimeSource `examples/TokenAlignmentLab/useTokenAlignmentAnimation.ts`; runtimeOwnership plugin registration, normalized descriptor, actual `gsap.to(... { text: {...} })`, direct-final reduced-motion branch, tween kill, original HTML restore; displayOwnership token representation, properties, code, stable final phrase.
- accessibility: the mutating target is `aria-hidden`; a stable final-text sibling supplies meaning; no per-frame live region is used.
- motion: `useReducedMotion()` directly writes the final string; otherwise the tween is user/replay-driven.
- nonGoals: arbitrary HTML sanitization, intermediate screen-reader announcements, ScrambleText randomization, SplitText segmentation, and later text pages.
- preserve: routes, program docs, shared UI, packages, tests, Git, and full builds remain untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS (static); Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - TEXT-F01 PASS — catalog/sourceManifest/coverageMap share all 15 exact IDs in order with no duplicate.
  - TEXT-F02 PASS — one normalized descriptor supplies token strip, actual TextPlugin vars, property values, and code; reduced motion accurately displays direct-final code.
  - TEXT-F03 PASS — mutating target is `aria-hidden`; final phrase is a stable sibling and no continuous live region exists.
  - TEXT-F04 PASS — cleanup kills the tween and restores captured original `innerHTML`, including plugin-created class span mutation.
  - TEXT-F05 PASS — example types, refs, state, descriptor, `useGSAP` stages/options, callback, and return contract have Korean one-line comments.
  - TEXT-I01 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - TEXT-B01 DEFERRED — browser keyboard/focus/select/checkbox/replay operation.
  - TEXT-B02 DEFERRED — browser reduced-motion direct-final behavior.
  - TEXT-B03 DEFERRED — browser 320/390px token/code overflow layout.
  - TEXT-B04 DEFERRED — browser actual TextPlugin class/padding/content restoration result.
- verificationEvidence: task-14 report records source passes, exact audit, page-local TypeScript, scoped Prettier fallback, comment audit, and assigned-path diff check.
- releaseDecision: PASS — root integration complete; TEXT-B01–B04 are the four approved browser DEFERRED checks.
