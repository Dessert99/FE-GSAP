# P31 ScrambleText handoff

## Input contract

- objective: scrambled intermediate characters를 보이게 하되 final phrase와 접근 가능한 의미를 stable하게 유지한다.
- officialPage: title `ScrambleText`; canonicalUrl `https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/`; reviewedAt `2026-08-08`; category `Text`; slug `scramble-text`.
- localPage: `src/content/gsap/text/scramble-text/`; route `/fundamentals/scramble-text`.
- sourceBlockers: none; #141 rendered canonical was read twice, official raw `src/ScrambleTextPlugin.js` twice, and installed source/types twice. The source-backed content boundary is identified separately from rendered API claims. Rendered `text` permits omission/original fallback while installed `Vars.text` is required, so local code always supplies `text` and teaches the rendered fallback separately.
- moduleSelection: plugin setup, property catalog, static phase strip, one actual phrase tween, content/accessibility boundary.
- learnerFlow: register plugin → string shorthand/object config → randomized intermediate and reveal timing → one descriptor-driven phrase → stable final text and cleanup boundary.
- relatedPages: `gsap.to()` and DOM/accessibility basics are prerequisite concepts; no page-local route link is needed. P32+ text splitting/replacement pages remain outside this plugin’s ownership.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| SCRAMBLE-141-01 | Register `ScrambleTextPlugin` before using `scrambleText`. | #141 Quick Start rendered; raw registration; installed source/types | verified |
| SCRAMBLE-141-02 | String `scrambleText` uses default reveal settings in `gsap.to`. | #141 minimal usage rendered; raw non-object normalization; installed types | verified |
| SCRAMBLE-141-03 | Random characters refresh while new or original text is gradually revealed left-to-right by default. | #141 Description rendered; raw render direction/refresh; installed source | verified |
| SCRAMBLE-141-04 | `text` replaces target text; omitted or `{original}` uses original text. | #141 text property rendered; raw original sentinel; installed `Vars.text` | verified |
| SCRAMBLE-141-05 | `chars` accepts named or custom sets; default is `upperCase`. | #141 chars property rendered; raw character lookup; installed `Vars.chars` | verified |
| SCRAMBLE-141-06 | `tweenLength` gradually changes differing length; false jumps; default true. | #141 tweenLength property rendered; raw length position; installed `Vars.tweenLength` | verified |
| SCRAMBLE-141-07 | `revealDelay` delays reveal for a tween-time portion; default 0. | #141 revealDelay property rendered; raw reveal ratio; installed `Vars.revealDelay` | verified |
| SCRAMBLE-141-08 | `newClass` wraps new text in a span; default null. | #141 newClass property rendered; raw class markup; installed `Vars.newClass` | verified |
| SCRAMBLE-141-09 | `oldClass` wraps original text in a span; default null. | #141 oldClass property rendered; raw class markup; installed `Vars.oldClass` | verified |
| SCRAMBLE-141-10 | `speed` controls randomized character refresh frequency; default 1. | #141 speed property rendered; raw refresh threshold; installed `Vars.speed` | verified |
| SCRAMBLE-141-11 | `delimiter` changes reveal unit; default is empty string. | #141 delimiter property rendered; raw split/join; installed `Vars.delimiter` | verified |
| SCRAMBLE-141-12 | `rightToLeft: true` reverses reveal direction; default false. | #141 rightToLeft property rendered; raw ratio inversion; installed `Vars.rightToLeft` | verified |
| SCRAMBLE-141-13 | Official usage combines text, chars, revealDelay, speed, and newClass in one config object. | #141 Usage rendered; raw config fields; installed `Vars` | verified |
| SCRAMBLE-141-14 | Source writes `innerHTML` when available and class options create span markup. | official raw and installed source target/property/render paths | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| SCRAMBLE-141-01 | `SetupSection` registration snippet; `usePhraseAnimation` actual registration | covered |
| SCRAMBLE-141-02 | `SetupSection` string shorthand snippet | covered |
| SCRAMBLE-141-03 | `MentalModelSection`; `PhraseLab` static phase strip | covered |
| SCRAMBLE-141-04 | `PhraseLab` normalized `text` descriptor and property table | covered |
| SCRAMBLE-141-05 | `PhraseLab` chars control, actual tween, phase strip, code, property table | covered |
| SCRAMBLE-141-06 | `MentalModelSection`; `PhraseLab` actual `tweenLength: true` and property table | covered |
| SCRAMBLE-141-07 | `PhraseLab` actual descriptor/phase strip/code/property table | covered |
| SCRAMBLE-141-08 | `ContentBoundarySection`; actual descriptor/code/local class style | covered |
| SCRAMBLE-141-09 | `ContentBoundarySection`; actual descriptor/code/local class style | covered |
| SCRAMBLE-141-10 | `PhraseLab` actual descriptor/code/property table | covered |
| SCRAMBLE-141-11 | `MentalModelSection`; actual descriptor/code/property table | covered |
| SCRAMBLE-141-12 | `PhraseLab` direction control, actual tween, phase strip, code, property table | covered |
| SCRAMBLE-141-13 | `PhraseLab` one normalized object provides all example fields and code | covered |
| SCRAMBLE-141-14 | `ContentBoundarySection`; runtime original `innerHTML` capture and cleanup restore | covered |

## Implementation contract

- exactFiles.create: `ScrambleTextPage.tsx/.css`, meta/catalog/properties, `SetupSection`, `MentalModelSection`, `ContentBoundarySection`, `examples/PhraseLab/PhraseLab.tsx/.css/usePhraseAnimation.ts`, this handoff.
- exactFiles.modify: none.
- exampleContracts: `PhraseLab`; goal one status phrase shows temporary scramble without losing final meaning; question `How do text, chars, timing, direction, classes, and content ownership combine?`; representation one `aria-hidden` phrase target, descriptor-derived static phase strip and code, visible stable final sibling; controls native chars select, direction checkbox, replay button; runtimeSource `examples/PhraseLab/usePhraseAnimation.ts`; sourcePath same; runtimeOwnership register plugin, normalized descriptor, actual tween/direct-final branch, tween kill, original HTML restore; displayOwnership controls, phase strip, property table, code, accessible final phrase; accessibility intermediate is not live/readable and final sibling is stable; motion reduced motion directly writes final text, otherwise only user/replay-driven tween.
- nonGoals: arbitrary HTML sanitization, screen-reader announcement of random intermediate characters, SplitText segmentation, TextPlugin replacement, and unrelated text pages.
- preserve: routes, program docs, shared UI, packages, tests, Git, and full builds remain untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; Accessibility/Motion PASS (static); Cross-page Consistency PASS; Build/Integration BLOCK.
- findings:
  - SCRAMBLE-F01 PASS — catalog/sourceManifest/coverageMap share all 14 exact IDs in order with no duplicate.
  - SCRAMBLE-F02 PASS — one normalized descriptor supplies static phase strip, actual `scrambleText` vars, and code; reduced motion accurately displays direct-final code instead of a tween.
  - SCRAMBLE-F03 PASS — animation target is `aria-hidden`; final phrase is a stable sibling; no continuous live region exists.
  - SCRAMBLE-F04 PASS — cleanup kills the tween and restores captured original `innerHTML`, including plugin-created class span mutation.
  - SCRAMBLE-F05 PASS — examples use Korean one-line comments for types, refs, state, descriptor, useGSAP stages, options, cleanup, and return contract.
  - SCRAMBLE-F06 PASS — root route and full TypeScript/Vite/Storybook integration verified.
  - SCRAMBLE-B01 DEFERRED — browser keyboard/focus/select/checkbox/replay operation.
  - SCRAMBLE-B02 DEFERRED — browser reduced-motion direct-final behavior.
  - SCRAMBLE-B03 DEFERRED — browser 320/390px phase/code overflow layout.
  - SCRAMBLE-B04 DEFERRED — browser actual scramble/class restoration result.
- verificationEvidence: task-11 report records source passes, exact audit, page-local TypeScript, scoped Prettier fallback, comment audit, and assigned-path diff check.
- releaseDecision: PASS — root integration complete; SCRAMBLE-B01–B04 are the four approved browser DEFERRED checks.
