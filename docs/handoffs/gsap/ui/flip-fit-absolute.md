# Flip fit and absolute page handoff

## input contract

```text
objective
  Flip.fit의 calculate/apply/animate 분기와 Flip.makeAbsolute의 flow mutation을 source/destination box로 관찰한다.
officialPage
  title: Flip.fit() / Flip.makeAbsolute()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/Flip/static.fit()/ ; https://gsap.com/docs/v3/Plugins/Flip/static.makeAbsolute()/
  reviewedAt: 2026-08-08
  category: UI
  slug: flip-fit-absolute
localPage
  localPath: src/content/gsap/ui/flip-fit-absolute/
  route: /fundamentals/flip-fit-absolute (not registered; root integration required)
```

### sourceManifest

| id         | officialItem                                              | sourceLocation             | sourceStatus |
| ---------- | --------------------------------------------------------- | -------------------------- | ------------ |
| FLIPFIT-01 | fit signature and target/destination fitting              | #69 signature              | verified     |
| FLIPFIT-02 | selector/Element target and Element/FlipState destination | #69 Parameters             | verified     |
| FLIPFIT-03 | default transforms/dimensions versus scale                | #69 Details                | verified     |
| FLIPFIT-04 | fitChild scale calculation                                | #69 vars table             | verified     |
| FLIPFIT-05 | tween and special vars                                    | #69 Parameters             | verified     |
| FLIPFIT-06 | instant versus duration Tween return                      | #69 Details                | verified     |
| FLIPFIT-07 | recorded FlipState destination example                    | #69 Details                | verified     |
| FLIPFIT-08 | absolute true flex/grid use                               | #69 vars table             | verified     |
| FLIPFIT-09 | getVars calculation-only return                           | #69 vars table             | verified     |
| FLIPFIT-10 | props comma CSS properties                                | #69 vars table             | verified     |
| FLIPFIT-11 | simple calculation optimization                           | #69 vars table             | verified     |
| FLIPFIT-12 | makeAbsolute signature/current position                   | #74 signature              | verified     |
| FLIPFIT-13 | makeAbsolute targets forms                                | #74 Parameters             | verified     |
| FLIPFIT-14 | makeAbsolute affected Element Array return                | #74 Returns                | verified     |
| FLIPFIT-15 | independent conversion versus fit/from absolute           | #74 Details                | verified     |
| FLIPFIT-16 | broad star selector warning example                       | #74 Details                | verified     |
| FLIPFIT-17 | d.ts/raw fit return branching                             | installed/raw Flip + types | verified     |
| FLIPFIT-18 | raw inline-style flow mutation/restore basis              | installed/raw Flip         | verified     |

sourceBlockers

- none
  moduleSelection
- callable method
- utility/overload
- property catalog
  learnerFlow

1. coordinate ownership
2. calculate/apply/animate fit
3. absolute flow removal
4. containing-block boundary
5. restoration

````

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| FLIPFIT-01 | CoordinateOwnershipSection | covered |
| FLIPFIT-02 | CoordinateOwnershipSection | covered |
| FLIPFIT-03 | FitModesSection and FitAbsoluteLab | covered |
| FLIPFIT-04 | FitModesSection | covered |
| FLIPFIT-05 | FitModesSection | covered |
| FLIPFIT-06 | FitAbsoluteLab snapshot | covered |
| FLIPFIT-07 | FitModesSection text boundary | covered |
| FLIPFIT-08 | AbsoluteFlowSection and descriptor | covered |
| FLIPFIT-09 | FitAbsoluteLab calculate mode | covered |
| FLIPFIT-10 | FitModesSection | covered |
| FLIPFIT-11 | FitModesSection | covered |
| FLIPFIT-12 | AbsoluteFlowSection/lab | covered |
| FLIPFIT-13 | AbsoluteFlowSection | covered |
| FLIPFIT-14 | FitAbsoluteLab snapshot | covered |
| FLIPFIT-15 | AbsoluteFlowSection | covered |
| FLIPFIT-16 | ContainingBlockSection | covered |
| FLIPFIT-17 | catalog/lab return display | covered |
| FLIPFIT-18 | RestorationSection/hook cleanup | covered |

relatedPages
  - P11 `/fundamentals/flip-first-last` is the registered prerequisite; `RestorationSection` links it.

## implementation contract

```text
exactFiles
  create: src/content/gsap/ui/flip-fit-absolute/ all page-local files; docs/handoffs/gsap/ui/flip-fit-absolute.md
  modify: []
exampleContracts
  - name: FitAbsoluteLab
    goal: one descriptor로 fit calculation, application, animation, absolute conversion과 return을 관찰한다.
    question: coordinate alignment과 flow removal은 언제 calculate만 하고 언제 DOM을 mutate하는가?
    representation: source/destination boxes, flow follower, controls, return snapshot, code and property table
    controls: mode select, scale/absolute checkboxes, fit/makeAbsolute/restore buttons
    runtimeSource: useFitAbsoluteAnimation.ts
    sourcePath: examples/FitAbsoluteLab/useFitAbsoluteAnimation.ts
    runtimeOwnership: Flip registration, refs, descriptor, calls, tween kill, inline style restoration and unmount cleanup
    displayOwnership: controls, diagram, code serializer, snapshots and explanation
    accessibility: native controls, focusable source, DOM reading order unchanged, focus-visible outline
    motion: reduced motion duration zero; restore kills tweens and returns flow/styles
nonGoals
  - P11 complete getState/from/to cycle; P13 batch/interruption; later nesting/morph/motion APIs
preserve
  - routes.ts, program documents, shared components, global CSS, package files, Git state
````

## verification contract

### source evidence

- Rendered pass 1 and pass 2: #69/#74 signatures, parameters, returns, details, vars and examples reread on 2026-08-08.
- Raw pass 1 and pass 2: official raw and installed Flip.js plus flip.d.ts compared for fit return branching and absolute inline mutation.
- Runtime probe: 0 accepted; Node cannot establish browser layout/containing-block geometry without DOM measurement.

### findings

| ID                  | status   | evidence                                                               | impact                      | requiredAction          |
| ------------------- | -------- | ---------------------------------------------------------------------- | --------------------------- | ----------------------- |
| OC-P12-001          | PASS     | 16 official + 2 implementation rows; section sum 2+8+4+2+0=16          | Official Coverage           | none                    |
| LT-P12-001          | PASS     | coordinate → fit modes → flow → containing block → restoration         | Learning Transformation     | none                    |
| RDS-P12-001         | PASS     | one descriptor drives calls, returned values and code                  | Runtime/Display Sync        | none                    |
| PED-P12-001         | PASS     | one source/destination pair and explicit restoration                   | Pedagogy                    | none                    |
| STRUCT-P12-001      | PASS     | hook owns Flip lifecycle and page composes sections                    | Structure/Comment           | none                    |
| A11Y-P12-001        | PASS     | native controls and DOM/focus order preserved                          | static Accessibility/Motion | none                    |
| XPAGE-P12-001       | PASS     | registered P11 prerequisite link; P13 and later APIs remain text-only  | Cross-page Consistency      | none                    |
| ROUTE-BUILD-P12-001 | PASS     | `/fundamentals/flip-fit-absolute`, TypeScript exit 0, Vite 956 modules, Storybook 1094 modules, both page chunks and diff check | Integration                 | none                    |
| BROWSER-P12-001     | DEFERRED | keyboard, reduced motion, 320/390px, live fit/absolute/restore outcome | approved four only          | root batch              |

releaseDecision
PASS — route/build integration is complete; BROWSER-P12-001’s four approved checks remain deferred for the final browser batch.

rootIntegrationEvidence
  `npx tsc --noEmit`, Vite 956 modules, Storybook 1094 modules and `git diff --check` exited 0; both builds emitted `FlipFitAbsolutePage` JS/CSS chunks.
