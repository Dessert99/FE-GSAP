# DrawSVG page handoff

## input contract

```text
objective
  SVG stroke의 visible start/end range를 DrawSVG value로 정하고 getLength/getPosition으로 rendered geometry를 읽는다.

officialPage
  title: DrawSVG / DrawSVGPlugin.getLength() / DrawSVGPlugin.getPosition()
  canonicalUrl:
    https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/
    https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/static.getLength()/
    https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/static.getPosition()/
  reviewedAt: 2026-08-08
  category: SVG
  slug: draw-svg

localPage
  localPath: src/content/gsap/svg/draw-svg/
  route: /fundamentals/draw-svg (not registered; root integration required)
```

### sourceManifest

| id         | officialItem                                                 | sourceLocation                              | sourceStatus |
| ---------- | ------------------------------------------------------------ | ------------------------------------------- | ------------ |
| DRAWSVG-01 | six DrawSVG stroke target element types                      | #63 Description                             | verified     |
| DRAWSVG-02 | stroke-dashoffset/dasharray mechanism                        | #63 Description                             | verified     |
| DRAWSVG-03 | drawSVG is end/start visible portion, not tween interval     | #63 Description                             | verified     |
| DRAWSVG-04 | 20% 80% gaps and center-outward example                      | #63 Description                             | verified     |
| DRAWSVG-05 | start/end controlled moving fixed dash                       | #63 Description                             | verified     |
| DRAWSVG-06 | percentage and absolute length values                        | #63 Description                             | verified     |
| DRAWSVG-07 | single value implicit zero and true equivalence              | #63 Description                             | verified     |
| DRAWSVG-08 | stroke/stroke-width prerequisite                             | #63 Important note                          | verified     |
| DRAWSVG-09 | staggered many-stroke example                                | #63 Stagger section                         | verified     |
| DRAWSVG-10 | timeline pause/resume/reverse/seek/nesting                   | #63 Stagger section                         | verified     |
| DRAWSVG-11 | live suffix every-tick length recalculation                  | #63 live section                            | verified     |
| DRAWSVG-12 | multi-M path single-segment/splitting boundary               | #63 Splitting section                       | verified     |
| DRAWSVG-13 | fill is not animated                                         | #63 Caveats                                 | verified     |
| DRAWSVG-14 | Firefox path-length bug and 102% workaround                  | #63 Caveats                                 | verified     |
| DRAWSVG-15 | iOS Safari rect rendering workaround                         | #63 Caveats                                 | verified     |
| DRAWSVG-16 | use contents cannot visibly change                           | #63 Caveats                                 | verified     |
| DRAWSVG-17 | getLength signature                                          | #64 signature                               | verified     |
| DRAWSVG-18 | getLength Element/selector parameter                         | #64 Parameters                              | verified     |
| DRAWSVG-19 | getLength Number return                                      | #64 Returns                                 | verified     |
| DRAWSVG-20 | getLength seven supported element types                      | #64 Details                                 | verified     |
| DRAWSVG-21 | length + position percentage formula                         | #64 Details/example                         | verified     |
| DRAWSVG-22 | getPosition rendered signature                               | #65 signature                               | verified     |
| DRAWSVG-23 | getPosition Element/selector parameter                       | #65 Parameters                              | verified     |
| DRAWSVG-24 | getPosition rendered return wording                          | #65 Returns                                 | verified     |
| DRAWSVG-25 | getPosition seven supported element types                    | #65 Details                                 | verified     |
| DRAWSVG-26 | getPosition official example indexes [1]                     | #65 Details/example                         | verified     |
| DRAWSVG-27 | registerPlugin Quick Start                                   | #63 Quick Start                             | verified     |
| DRAWSVG-28 | drawSVG:0 minimal from usage                                 | #63 Minimal usage                           | verified     |
| DRAWSVG-29 | rendered Number versus d.ts/raw number[] mismatch            | #65 example + `types/draw-svg-plugin.d.ts`  | verified     |
| DRAWSVG-30 | missing/invisible/zero geometry raw fallback                 | official raw + installed `DrawSVGPlugin.js` | verified     |
| DRAWSVG-31 | live non-scaling-stroke and undocumented nowrap raw behavior | official raw + installed `DrawSVGPlugin.js` | verified     |

sourceBlockers

- none

moduleSelection

- plugin
- property catalog
- utility/overload

learnerFlow

1. dash mental model로 visible segment를 정의한다.
2. percentage, length, range, live grammar를 읽는다.
3. one-path lab에서 같은 descriptor로 range를 reveal한다.
4. getLength/getPosition 숫자를 직접 읽는다.
5. rendered/hidden geometry와 browser caveat을 분리한다.

````

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| DRAWSVG-01 | StrokeDashMentalModelSection | covered |
| DRAWSVG-02 | StrokeDashMentalModelSection static dash diagram | covered |
| DRAWSVG-03 | StrokeDashMentalModelSection end-state explanation | covered |
| DRAWSVG-04 | StrokeDashMentalModelSection range/gap explanation | covered |
| DRAWSVG-05 | ValueGrammarSection fixed-dash explanation | covered |
| DRAWSVG-06 | ValueGrammarSection grammar code | covered |
| DRAWSVG-07 | ValueGrammarSection full-stroke equivalence | covered |
| DRAWSVG-08 | ValueGrammarSection warning | covered |
| DRAWSVG-09 | ValueGrammarSection stagger boundary | covered |
| DRAWSVG-10 | ValueGrammarSection timeline boundary | covered |
| DRAWSVG-11 | ValueGrammarSection and live checkbox | covered |
| DRAWSVG-12 | ValueGrammarSection single-segment warning | covered |
| DRAWSVG-13 | StrokeRangeLab explanation panel | covered |
| DRAWSVG-14 | RenderedGeometryBoundariesSection | covered |
| DRAWSVG-15 | RenderedGeometryBoundariesSection | covered |
| DRAWSVG-16 | RenderedGeometryBoundariesSection | covered |
| DRAWSVG-17 | LengthPositionSection and property table | covered |
| DRAWSVG-18 | LengthPositionSection | covered |
| DRAWSVG-19 | LengthPositionSection and measurement panel | covered |
| DRAWSVG-20 | LengthPositionSection | covered |
| DRAWSVG-21 | LengthPositionSection code | covered |
| DRAWSVG-22 | LengthPositionSection mismatch explanation | covered |
| DRAWSVG-23 | LengthPositionSection | covered |
| DRAWSVG-24 | LengthPositionSection mismatch explanation | covered |
| DRAWSVG-25 | LengthPositionSection | covered |
| DRAWSVG-26 | LengthPositionSection code | covered |
| DRAWSVG-27 | draw-svg catalog and runtime registration | covered |
| DRAWSVG-28 | draw-svg catalog and ValueGrammarSection | covered |
| DRAWSVG-29 | catalog row and LengthPositionSection | covered |
| DRAWSVG-30 | catalog row and RenderedGeometryBoundariesSection | covered |
| DRAWSVG-31 | catalog row and ValueGrammarSection | covered |

relatedPages
  - P01 `/fundamentals/plugins`: registration prerequisite; link is deferred until route integration decision.
  - Later SVG morphing/motion-path pages are text-only ownership boundaries.

## implementation contract

```text
exactFiles
  create: src/content/gsap/svg/draw-svg/ all page-local files; docs/handoffs/gsap/svg/draw-svg.md
  modify: []

exampleContracts
  - name: StrokeRangeLab
    goal: one path의 visible start/end range와 actual DrawSVG measurements를 같은 descriptor에서 확인한다.
    question: percentage range는 stroke의 어느 부분을 남기며 getLength/getPosition은 그 상태를 어떻게 읽는가?
    representation: one SVG path, range sliders, live checkbox, static ruler, measurement definition list, descriptor-derived code
    controls: start/end native range inputs, live native checkbox, measure button
    runtimeSource: useStrokeRangeAnimation.ts
    sourcePath: examples/StrokeRangeLab/useStrokeRangeAnimation.ts
    runtimeOwnership: plugin registration, target ref, descriptor, tween, measurement utilities, reduced-motion duration, revert cleanup
    displayOwnership: controls, SVG/ruler, code serializer, table, observation panels
    accessibility: labelled native inputs/button, SVG text equivalent, focus-visible outline, non-frame measurement readout
    motion: selected reveal state is duration 0 under reduced motion; cleanup reverts tween/styles

nonGoals
  - SVG path morphing, motion path, coordinate conversion, arbitrary SVG transform teaching
preserve
  - routes.ts, program documents, shared components, global CSS, package files, Git state
````

## verification contract

### source evidence

- Rendered pass 1 and pass 2 (2026-08-08): all #63/#64/#65 canonical pages opened and reread. Captured DrawSVG grammar, live, supported elements, caveats, method signatures/parameters/returns and the position[1] example.
- Raw pass 1: official `src/DrawSVGPlugin.js` inspected for value parsing, geometry measurement, live behavior and utility return shapes.
- Raw pass 2: installed `node_modules/gsap/DrawSVGPlugin.js` and `types/draw-svg-plugin.d.ts` compared. d.ts/raw report getPosition number[] despite rendered Number wording.
- Runtime probe: 0 accepted. Node has no browser SVG `getBBox/getComputedStyle` geometry contract, so no DOM-free result is treated as evidence.

### findings

| ID                  | status   | evidence                                                                                          | impact                       | requiredAction                    |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------- |
| OC-P09-001          | PASS     | 28 official + 3 implementation catalog rows; section sum 4+8+4+7+5=28                             | Official Coverage            | none                              |
| LT-P09-001          | PASS     | mental model → grammar → one-path reveal → measurement → boundaries                               | Learning Transformation      | none                              |
| RDS-P09-001         | PASS     | hook owns descriptor, tween, utilities, snapshot and cleanup; TSX serializes descriptor only      | Runtime/Display Sync         | none                              |
| PED-P09-001         | PASS     | defines stroke/dash before controls; goal, observation, reason, use and caveat panels are present | Pedagogy                     | none                              |
| STRUCT-P09-001      | PASS     | page composes sections and hook owns DrawSVG lifecycle with Korean step comments                  | Structure/Comment            | none                              |
| A11Y-P09-001        | PASS     | labelled native controls, SVG label, static text measurements, no autonomous motion               | static Accessibility/Motion  | none                              |
| XPAGE-P09-001       | PASS     | no downstream SVG API links or duplicated morph/motion teaching                                   | Cross-page Consistency       | none                              |
| ROUTE-BUILD-P09-001 | PASS     | `/fundamentals/draw-svg`, TypeScript exit 0, Vite 924 modules, Storybook 1062 modules, both page chunks and diff check | Integration                  | none                              |
| BROWSER-P09-001     | DEFERRED | keyboard controls, reduced motion, 320/390px, actual slider/live/measurement outcome              | approved four browser checks | root browser batch                |

### root integration evidence

- `npx tsc --noEmit`, Vite 924 modules, Storybook 1062 modules and `git diff --check` exited 0.
- Vite and Storybook emitted `DrawSvgPage` JS/CSS chunks.

releaseDecision
PASS — route/build integration is complete. Only BROWSER-P09-001’s four approved browser checks remain deferred for the final browser batch.
