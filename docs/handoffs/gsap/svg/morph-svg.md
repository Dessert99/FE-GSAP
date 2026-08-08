# P18 MorphSVG handoff

## Input contract

- objective: shape compatibility → point matching/winding → config → defaults/hooks → target replacement → restoration.
- officialPage: title `MorphSVGPlugin`; canonicalUrl `https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/`; reviewedAt `2026-08-08`; category `SVG`; slug `morph-svg`.
- localPage: localPath `src/content/gsap/svg/morph-svg/`; route `/fundamentals/morph-svg`.
- sourceBlockers: none.
- moduleSelection: SVG plugin, config reference, compatible-shape warning, one descriptor-driven icon morph.
- learnerFlow: compatibility → matching/winding → config → defaults/hooks → replacement → restoration.
- relatedPages: P19 owns conversion/raw path data utilities.

## Source manifest

Rendered #93/#95/#96/#97 were reopened twice on 2026-08-08. Official raw MorphSVG source and installed `MorphSVGPlugin.js`/type declarations were compared twice.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- |
| MORPH-01 | target/value/config forms, compatible geometry, point matching/map/shapeIndex/winding/origin/type/hooks, original data and replacement caveats | #93 Description, Features, Configuration, Tips | verified |
| MORPH-02 | defaultRender global render callback/canvas hook | #95; #93 Rendering to canvas | verified |
| MORPH-03 | defaultType global linear/rotational default | #96; installed source defaultType linear | verified |
| MORPH-04 | defaultUpdateTarget global target-update default and conversion replacement caveat | #97; installed source defaultUpdateTarget true; #93 conversion | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| MORPH-01 | MorphSvgPage sections, IconMorphLab descriptor/code/diagram | covered |
| MORPH-02 | IconMorphLab defaults/hooks boundary | covered |
| MORPH-03 | descriptor type and defaults/hooks boundary | covered |
| MORPH-04 | target replacement boundary and original d restoration runtime | covered |

## Implementation contract

- exactFiles.create: `MorphSvgPage.tsx`, `MorphSvgPage.css`, meta/catalog, `examples/IconMorphLab/*`.
- exactFiles.modify: none.
- exampleContracts: one icon morph; runtime source `useIconMorphAnimation.ts`; descriptor owns vars/point marker/winding label/code; keyboard buttons/focus/live status; reduced motion direct final d; cleanup kills tween/restores exact mount d; globals intentionally never mutated.
- nonGoals: P19 conversion/raw path APIs; no routes, program docs, shared UI, package, Git, or tests.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; static Accessibility/Motion PASS; Cross-page consistency PASS.
- findings: P18-F01 PASS exact 4 source/catalog/coverage rows. P18-F02 PASS runtime registers plugin, restores original d, kills tween, does not mutate global defaults, and direct-switches reduced motion. P18-F03 PASS root route, TypeScript, Vite 1027 modules and Storybook 1165 modules with page chunks. P18-F04 DEFERRED browser keyboard/focus, reduced motion, 320/390 layout, and actual controls only.
- verificationEvidence: root removed one stale local CSS import after the full Vite build exposed it, then reran TypeScript, Vite, Storybook and diff checks successfully.
- releaseDecision: PASS with P18-F04 as the approved browser DEFERRED batch.
