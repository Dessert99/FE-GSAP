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
| BROWSER-P12-001     | DEFERRED → PASS | keyboard, reduced motion, 320/390px, live fit/absolute/restore outcome | approved four only          | root batch              |

releaseDecision
PASS — route/build integration is complete; BROWSER-P12-001’s four approved checks remain deferred for the final browser batch.

rootIntegrationEvidence
  `npx tsc --noEmit`, Vite 956 modules, Storybook 1094 modules and `git diff --check` exited 0; both builds emitted `FlipFitAbsolutePage` JS/CSS chunks.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- `FLIPFIT-OC-20260813` | PASS | 현재 공식 `Flip.fit()`·`Flip.makeAbsolute()` 문서와 대조 | `getVars`, `scale`, `absolute`, duration에 따른 반환 경계를 유지했다.
- `FLIPFIT-RDS-20260813` | BLOCK → PASS | 코드 패널이 runtime vars의 `absolute`·`duration`·`ease`와 apply 모드의 `duration: 0`을 일부 생략했다 | 세 fit 분기의 실제 호출 객체를 그대로 직렬화했다.
- `FLIPFIT-WRITE-20260813` | BLOCK → PASS | learner-facing P11 번호가 노출됐다 | 선행 Flip 개념과 실행 순서로 바꿨다.
- `FLIPFIT-BROWSER-20260813` | DEFERRED | 키보드, reduced motion, 320/390px 레이아웃, fit/makeAbsolute/restore 결과 | 이번 배치에서는 브라우저를 조작하지 않았다.
- `FLIPFIT-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하거나 현재 성공 근거로 기록하지 않았다.

currentReleaseDecision
  PASS — 정적 BLOCK을 해소했고, 허용된 browser-only 검증 4건은 DEFERRED다. 이전 빌드·browser closure는 이력이며 현재 판정 근거가 아니다.

### 2026-08-13 Batch B 통합 검증

- `npx tsc --noEmit --pretty false` exit 0.
- Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토

- `FLIPFIT-RDS-20260813-02 | BLOCK → PASS` — serializer에 source/destination query와 null guard, Flip 등록, 원본 style baseline, 반환 Tween 보관, 세 fit 분기와 `makeAbsolute()`·`restore()`·별도 cleanup을 포함하고 runtime control 의미와 재대조했다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 키보드·focus, reduced-motion, 320/390px, 실제 fit·makeAbsolute·restore 결과를 실조작하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
