# P19 MorphSVG path-data handoff — Phase 1

## Input contract

- objective: shape input → DOM path conversion → RawPath numeric form → serialization → round-trip/boundaries.
- officialPage: catalog #94/#98/#99; category `SVG`; slug `morph-svg-path-data`; reviewedAt `2026-08-08`.
- localPage: localPath `src/content/gsap/svg/morph-svg-path-data/`; route `/fundamentals/morph-svg-path-data`.
- prerequisite: P18 is registered and linked as the preceding MorphSVG lesson.
- moduleSelection: static utility/overload, DOM mutation/restoration, accessible RawPath data table; motion `none`.
- learnerFlow: shape input → conversion → raw numeric form → serialization → round-trip/boundaries.
- sourceBlockers: none.

## Source manifest

Rendered #94/#98/#99 were opened twice on 2026-08-08. Official raw MorphSVG source and installed `MorphSVGPlugin.js`/`morph-svg-plugin.d.ts` were compared twice; types confirm `convertToPath(shape, swap?): SVGPathElement[]`, `rawPathToString(RawPath): string`, `stringToRawPath(string): RawPath`.

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| MORPHPATH-01 | convert inputs, default DOM swap/false opt-out, return paths, retained attributes and rx/ry caveat | #94 signature/Details/Notes | verified |
| MORPHPATH-02 | RawPath-to-cubic-d serialization, segment/M and alternating coordinate representation | #98 signature/Details | verified |
| MORPHPATH-03 | d-to-RawPath parse, cubic conversion, segment representation and counterpart round trip | #99 signature/Details | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| MORPHPATH-01 | GeometryConverter `convert`, DOM source/converted d, clone restoration | covered |
| MORPHPATH-02 | GeometryConverter RawPath accessible segment table and serialized d | covered |
| MORPHPATH-03 | descriptor `sourceD`, actual parse/serialize calls and documented boundary | covered |

## Phase 1 finding

- P19-P1 PASS — exact 3-row catalog/meta/manifest/coverage draft written; no implementation files created.
- P19-P2 ADVISORY — rendered docs describe cubic normalization but do not specify malformed-string behavior; implementation must display it as a boundary rather than claim a result.

## Implementation contract

- exactFiles.create: `MorphSvgPathDataPage.tsx`, `MorphSvgPathDataPage.css`, meta/catalog, `examples/GeometryConverter/*`.
- exactFiles.modify: none.
- exampleContracts: static geometry converter; descriptor supplies source tag and swap, while each actual utility return feeds the next call plus DOM/raw/string views and code; runtime source `useGeometryConverter.ts`; accessible raw segment table; motion `none` because this is representation, not animation.
- cleanup: React owns only a stable `<g>` host. Hook-owned baseline/current nodes are replaced inside it; rerun restores a fresh baseline clone first and unmount empties host plus refs. No tween is created.
- preserve: root owns routes, Git and program docs; shared UI, package and tests remain untouched.

## Verification contract

- verifiedPerspectives: Source Curator PASS; Content Architect PASS; Official Coverage PASS; Learning Transformation PASS; Runtime/Display Sync PASS; Pedagogy PASS; Structure/Comment PASS; static Accessibility/Motion PASS; Cross-page boundary PASS.
- findings: P19-F01 PASS — `convert` calls all three utilities in sequence, passing converted path d into RawPath parsing and its result into serialization. P19-F02 PASS — the stable host replaces hook-owned children with a baseline clone before rerun and empties them on unmount, so no generated node or stale ref remains. P19-F03 ADVISORY — malformed d input has no documented outcome and is correctly presented only as a boundary. P19-F04 PASS — root route, TypeScript, Vite 1032 modules and Storybook 1170 modules passed with page chunks. P19-F05 DEFERRED — approved browser control/focus and narrow-layout checks only; reduced motion is not applicable (motion none).
- verificationEvidence: task-13-report.md Phase 3 commands; root fixed Fiber ownership, utility chaining, restore snapshot and a stale CSS import, then reran TypeScript, Vite, Storybook and diff checks.
- releaseDecision: PASS with P19-F05 as the approved browser DEFERRED checks.

## Fiber ownership fix

- P19-F06 ADDRESSED — `convertToPath(..., true)` no longer replaces a React-owned rect. React renders only `<g ref={hostRef}>`; hook creates baseline rect, tracks current `SVGElement`, replaces host children with a fresh baseline clone, and clears host/refs at cleanup. Path is never cast as `SVGRectElement`.
