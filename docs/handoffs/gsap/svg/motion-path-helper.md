# MotionPathHelper page handoff

## 입력 계약

```text
objective
  P20에서 one editable SVG path를 MotionPathHelper로 편집하고, updated path data와 temporary editor DOM의 kill/recreate lifecycle을 확인한다.
officialPage
  title: MotionPathHelper / MotionPathHelper.kill() / MotionPathHelper.editPath()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/MotionPathHelper/ ; https://gsap.com/docs/v3/MotionPathHelper/kill()/ ; https://gsap.com/docs/v3/MotionPathHelper/static.editPath()/
  reviewedAt: 2026-08-08
  category: SVG
  slug: motion-path-helper
localPage
  localPath: src/content/gsap/svg/motion-path-helper/
  route: /fundamentals/motion-path-helper
moduleSelection
  plugin/class instance, static editing method, callable lifecycle method, browser SVG editor
sourceManifest
  - id: MPH-01 | officialItem: MotionPathHelper creates an interactive browser path editor with path editing and Copy Motion Path output; create accepts a tween or target and requires MotionPathPlugin registration | sourceLocation: #100 rendered plugin page details/keyboard guide; installed MotionPathHelper.js 107-249 | sourceStatus: verified
  - id: MPH-02 | officialItem: kill() removes path editing elements and the Copy Motion Path button from the DOM | sourceLocation: #15 rendered kill details; installed MotionPathHelper.js 239-244 and PathEditor.js 1195-1198 | sourceStatus: verified
  - id: MPH-03 | officialItem: editPath(path, config) makes an SVG path editable in the browser and returns PathEditor | sourceLocation: #16 rendered signature/parameters/returns; installed MotionPathHelper.js 255 and motion-path-helper.d.ts 32-49 | sourceStatus: verified
sourceBlockers
  none. #15, #16 and #100 rendered pages plus their raw/source evidence were opened and reopened twice on 2026-08-08. Installed MotionPathHelper.js, PathEditor.js and motion-path-helper.d.ts were compared twice. Official #16 and runtime return PathEditor/PathEditor.create(...), while d.ts declares editPath as MotionPathHelper; the properties table retains official PathEditor and records the installed declaration as a boundary. Runtime helper.animation is also source-observed and narrowly cast only for reduced-motion pause.
learnerFlow
  1. One existing SVG d string is the editable path input and output.
  2. Register MotionPathPlugin and MotionPathHelper before create.
  3. Use editor pointer/keyboard operations, then read updated d data.
  4. Kill and recreate to prove temporary path-editor group and Copy button disposal.
coverageMap
  - sourceItemId: MPH-01 | localEvidence: MotionPathHelperLab descriptor/create/onUpdate, code panel and editing/dependency section | localStatus: covered
  - sourceItemId: MPH-02 | localEvidence: useMotionPathHelperAnimation killEditor/effect cleanup and actual .copy-motion-path/.path-editor-g readout | localStatus: covered
  - sourceItemId: MPH-03 | localEvidence: editing-boundary section and motion-path-helper.properties.ts edit lifecycle surface | localStatus: covered
relatedPages
  P19 MorphSVG path-data is linked as the registered prerequisite. P21 MotionPath fundamentals remains a text-only next boundary.
```

## 구현 계약

```text
exactFiles
  create: MotionPathHelperPage TSX/CSS, meta/catalog/properties, MotionPathHelperLab TSX/CSS/runtime, this handoff
  modify: none
exampleContracts
  name: MotionPathHelperLab
  goal: one descriptor supplies the editable d string, helper create configuration, live d readout and displayed code.
  question: How do I edit a browser SVG path, preserve its output and dispose every helper-added control?
  representation: focusable SVG path, follower preview, editor kill/recreate controls, temporary DOM status and updated d output.
  controls: native editor pointer/keyboard operations, editor kill button, editor recreate button.
  runtimeSource: examples/MotionPathHelperLab/useMotionPathHelperAnimation.ts
  runtimeOwnership: plugin registration, helper create, onUpdate path read, actual temporary DOM lookup, kill/recreate and effect cleanup.
  displayOwnership: SVG/follower markup, native buttons, status, explanation and code serializer only.
  accessibility: native buttons; focusable SVG path/follower; official keyboard instructions remain visible in page text; status reports only discrete helper marker lookup while live path data stays outside the live region.
  motion: actual useReducedMotion pauses the helper follower preview at position 0; editor operations remain user driven.
nonGoals
  P19 path conversion/normalization, P21 motion-path fundamentals, production editor UI, undocumented editPath runtime return claims.
preserve
  routes, program docs, shared UI, global CSS, packages, tests and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — 3/3 canonical items map individually to catalog, manifest and coverage rows.
  Learning Transformation: PASS — path data → register/create → edit/read output → kill/recreate disposal.
  Runtime/Display Sync: PASS — one descriptor feeds path d, create vars, output and code panel.
  Pedagogy: PASS — temporary DOM status separates real editor lifetime from static SVG markup.
  Structure/Comment: PASS — page-local runtime and display boundaries use Korean one-line learning comments.
  Accessibility/Motion: PASS (static) — native controls, focusable path, keyboard instructions and actual reduced-motion settle are present.
  Cross-page Consistency: PASS — P19 is linked as the registered prerequisite and P21 remains a text-only boundary.
  Build/Integration: PASS — root route, TypeScript, Vite 1042 modules and Storybook 1180 modules passed with page chunks emitted.
findings
  P20-OC-001 | PASS | exact 3 canonical / 3 catalog / 3 manifest / 3 coverage audit | item-level mapping complete | none
  P20-RDS-001 | PASS | descriptor -> SVG d/create vars/onUpdate output/code | no separate demo configuration | none
  P20-DOM-001 | PASS (static) | installed Copy button and PathEditor group selectors are queried after create/kill | temporary DOM readout reflects helper lifecycle | browser confirmation pending
  P20-INT-001 | PASS | route/full TypeScript/Vite/Storybook | 1042/1180 modules and page chunks emitted | none
  P20-B01 | DEFERRED → PASS | keyboard focus and anchor/handle editing | browser audit | owner
  P20-B02 | DEFERRED → PASS | reduced-motion follower initial settle | browser audit | owner
  P20-B03 | DEFERRED → PASS | 320/390 SVG/status layout | browser audit | owner
  P20-B04 | DEFERRED → PASS | create/kill/recreate temporary DOM and output lifecycle | browser audit | owner
verificationEvidence
  page-local checks are recorded in task-14-report.md; root synchronized reduced-motion duration, separated continuous path data from the live region, and reran TypeScript, Vite, Storybook and diff checks after route registration.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 Batch B 재감사

- `MPH-OC-20260813` | PASS | 현재 공식 `MotionPathHelper`, `kill()`, `editPath()` 문서와 대조 | editor 생성, PathEditor 반환 경계, 임시 DOM 정리를 유지했다.
- `MPH-RDS-20260813` | BLOCK → PASS | serializer가 실제 path `d` 적용, `ease`, `onUpdate`, reduced-motion pause 경로를 생략했다 | runtime create 전후 순서와 조건부 `helper.animation?.pause(0)`를 표시했다.
- `MPH-WRITE-20260813` | BLOCK → PASS | learner-facing P19/P21·text-only 제작 상태가 노출됐다 | 선행 path data와 후속 MotionPath 개념으로 직접 설명했다.
- `MPH-BROWSER-20260813` | DEFERRED | 키보드/포커스, reduced motion, 320/390px, editor 생성·편집·kill·recreate | 이번 배치에서는 브라우저를 조작하지 않았다.
- `MPH-STORYBOOK-20260813` | N/A | Storybook은 c309e13에서 의도적으로 삭제됨 | 실행하지 않았다.

currentReleaseDecision
  PASS — runtime/display와 문장 BLOCK을 해소했고 browser-only 4건은 DEFERRED다. 과거 빌드와 browser closure는 현재 근거가 아니다.

### 2026-08-13 self cross-review

- `MPH-RDS-20260813-02 | BLOCK → PASS` — serializer의 path/follower/container와 `setPathData`가 정의되지 않았고 생성 직후 `kill()`을 호출했다. 실제 selectors, path read callback, 별도 `cleanup()`을 표시한 뒤 재독해 PASS.
- 통합 검증: `npx tsc --noEmit --pretty false` exit 0, Batch B 21 page dir + handoff 범위 `git diff --check` exit 0.

### 2026-08-13 최종 교차검토 판정

- Storybook: `N/A` — c309e13에서 의도적으로 삭제되어 실행하지 않았다.
- Browser: `DEFERRED` — 승인된 브라우저 실조작 관점을 수행하지 않았다.
- overallDecision: `NOT VERIFIED` — 정적 BLOCK은 없지만 Browser 실조작이 `DEFERRED`다.
- releaseDecision: `NOT VERIFIED` — 브라우저 관점을 현재 증거로 확인하지 않았다.
