# ScrollSmoother create handoff

## 입력 계약

```text
objective
  P36에서 host document scroll을 실행하지 않고, native vertical model과 root-owned ScrollSmoother singleton create/get/kill lifecycle을 구조와 descriptor로 학습한다.
officialPage
  title: ScrollSmoother / content() / scrollTrigger / create() / get() / vars / wrapper()
  canonicalUrl: https://gsap.com/docs/v3/Plugins/ScrollSmoother/ ; https://gsap.com/docs/v3/Plugins/ScrollSmoother/content()/ ; https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTrigger/ ; https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.create()/ ; https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.get()/ ; https://gsap.com/docs/v3/Plugins/ScrollSmoother/vars/ ; https://gsap.com/docs/v3/Plugins/ScrollSmoother/wrapper()/
  reviewedAt: 2026-08-09
  category: Scroll
  slug: scroll-smoother-create
localPage
  localPath: src/content/gsap/scroll/scroll-smoother-create/
  route: /fundamentals/scroll-smoother-create
moduleSelection
  plugin/class instance, root integration, structural schematic, singleton lifecycle, property catalog
sourceManifest
  - id: SMOOTHER-01 | officialItem: ScrollSmoother uses native vertical body scroll with a wrapper viewport and one content element that is transformed to catch up; register ScrollTrigger and ScrollSmoother, create before page ScrollTriggers; fixed UI belongs outside transformed content | sourceLocation: #142 rendered pass 1 lines 168-205 and 314-331, pass 2 lines 149-179; official raw ScrollSmoother.js pass 1 lines 44-57 and 435-456, pass 2 lines 369-391; installed ScrollSmoother.js pass 1/2 same 3.15.0 locations; scroll-smoother.d.ts pass 1/2 create and Vars declarations | sourceStatus: verified
  - id: SMOOTHER-02 | officialItem: content(element: String | Element): Element | self gets or sets the content element; getter returns the element and setter returns the ScrollSmoother instance | sourceLocation: #143 rendered pass 1/2 lines 148-176; official raw ScrollSmoother.js pass 1/2 lines 369-382; installed ScrollSmoother.js pass 1/2 lines 369-382; scroll-smoother.d.ts pass 1/2 lines 65-88 | sourceStatus: verified
  - id: SMOOTHER-03 | officialItem: scrollTrigger: ScrollTrigger is the instance ScrollSmoother creates internally to manage the page smoothing effect | sourceLocation: #152 rendered pass 1/2 lines 148-160; official raw ScrollSmoother.js pass 1 lines 451-554 and pass 2 lines 451-554; installed ScrollSmoother.js pass 1/2 lines 451-554; scroll-smoother.d.ts pass 1/2 line 5 | sourceStatus: verified
  - id: SMOOTHER-04 | officialItem: ScrollSmoother.create() creates and returns a new root-page instance; only one exists and create kills an existing instance first | sourceLocation: #154 rendered pass 1/2 lines 148-164; official raw ScrollSmoother.js pass 1 lines 48-50 and 677, pass 2 lines 48-50 and 677; installed ScrollSmoother.js pass 1/2 same locations; scroll-smoother.d.ts pass 1/2 lines 17-34 | sourceStatus: verified
  - id: SMOOTHER-05 | officialItem: ScrollSmoother.get(): ScrollSmoother returns an existing singleton when one has been created; the installed declaration allows undefined before creation | sourceLocation: #155 rendered pass 1/2 lines 148-160; official raw ScrollSmoother.js pass 1/2 line 678; installed ScrollSmoother.js pass 1/2 line 678; scroll-smoother.d.ts pass 1/2 lines 37-48 | sourceStatus: verified
  - id: SMOOTHER-06 | officialItem: vars: Object is the configuration object initially passed to ScrollSmoother.create() | sourceLocation: #156 rendered pass 1/2 lines 148-158; official raw ScrollSmoother.js pass 1/2 lines 44-57; installed ScrollSmoother.js pass 1/2 lines 44-57; scroll-smoother.d.ts pass 1/2 Vars declaration | sourceStatus: verified
  - id: SMOOTHER-07 | officialItem: wrapper(element: String | Element): Element | self gets or sets the wrapper element; getter returns the element and setter returns the ScrollSmoother instance | sourceLocation: #157 rendered pass 1/2 lines 148-176; official raw ScrollSmoother.js pass 1/2 lines 383-391; installed ScrollSmoother.js pass 1/2 lines 383-391; scroll-smoother.d.ts pass 1/2 lines 304-327 | sourceStatus: verified
sourceBlockers
  none. All seven rendered canonicals were opened and reopened. Official raw ScrollSmoother.js plus installed 3.15.0 source and declaration were each compared twice. The rendered get() signature omits the missing-instance case while installed source returns the singleton variable and the installed declaration types get() as ScrollSmoother | undefined; local code treats get() as a reference to an already created instance and does not claim a different official return.
learnerFlow
  1. Define the native-scroll mental model: body owns the scrollbar, wrapper is the viewport, content is transformed.
  2. Read the one descriptor-derived root bootstrap in which both plugins register before create.
  3. Distinguish root owner create/kill from consumer get and inspect content(), wrapper(), scrollTrigger, and vars.
  4. Stop at the P40 native-scroll/layout text-only prerequisite instead of trying global setup in a lesson card.
coverageMap
  - sourceItemId: SMOOTHER-01 | localEvidence: SetupSection native model, exact structure checklist, native unsmoothed fallback, SmootherStructureDiagram body/wrapper/content steps, fixed-position warning | localStatus: covered
  - sourceItemId: SMOOTHER-02 | localEvidence: SmootherStructureDiagram descriptor-derived code and getter/setter paragraph | localStatus: covered
  - sourceItemId: SMOOTHER-03 | localEvidence: SmootherStructureDiagram main ScrollTrigger step and descriptor-derived code | localStatus: covered
  - sourceItemId: SMOOTHER-04 | localEvidence: SmootherStructureDiagram create code and ScrollSmootherCreatePage singleton warning | localStatus: covered
  - sourceItemId: SMOOTHER-05 | localEvidence: SmootherStructureDiagram get code and ScrollSmootherCreatePage consumer boundary | localStatus: covered
  - sourceItemId: SMOOTHER-06 | localEvidence: SmootherStructureDiagram initialVars code and getter/setter paragraph | localStatus: covered
  - sourceItemId: SMOOTHER-07 | localEvidence: SmootherStructureDiagram wrapper structure step, code, and getter/setter paragraph | localStatus: covered
relatedPages
  P40 native scroll/layout is a text-only prerequisite because it is not integrated. ScrollTrigger is a required plugin dependency, not a page-local replacement for P36.
```

## 구현 계약

```text
exactFiles
  create: ScrollSmootherCreatePage TSX/CSS, meta/catalog/descriptor, SmootherStructureDiagram TSX/CSS, SetupSection TSX, this handoff
  modify: none
exampleContracts
  name: SmootherStructureDiagram
  goal: one descriptor supplies the root creation code, wrapper/content schematic, native model, and singleton cleanup boundary.
  question: Which node retains native scrolling, which node moves, and who may create or kill the singleton?
  representation: semantic figure, ordered structural list, static descriptor-derived code, and warning text.
  controls: none — unsafe global host scroll is deliberately not exposed as a lesson control.
  runtimeSource: none — running ScrollSmoother would mutate this host document's root scroll, body, wrapper/content styles, and global ScrollTrigger defaults.
  sourcePath: components/SmootherStructureDiagram/SmootherStructureDiagram.tsx — static code owns the descriptor serialization.
  runtimeOwnership: none — application bootstrap owns actual registration, create, and kill.
  displayOwnership: diagram owns the structure, descriptor-derived code, method/property explanation, and isolation warning.
  accessibility: semantic figure, ordered list, headings, and selectable preformatted code; no custom controls or motion.
  motion: none — no runtime animation or autoplay is rendered.
nonGoals
  host-document takeover, a fake scrollable card, parallax/effects API teaching, nested smoothers, child-owned cleanup, and P40 implementation.
preserve
  routes, program docs, shared UI, global CSS, packages, tests, full builds, and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — seven canonical source items each have an explicit catalog, manifest, and coverage row.
  Learning Transformation: PASS — native scrolling, DOM structure, singleton ownership, and failure boundary progress from one root mental model.
  Runtime/Display Sync: PASS (static) — one immutable creation descriptor supplies every displayed config value; runtime is intentionally none.
  Pedagogy: PASS — learner sees body/wrapper/content roles before create/get/kill, native unsmoothed fallback, and the P40 prerequisite boundary.
  Structure/Comment: PASS — page/section/component separation and one-line Korean export/explanation comments are present.
  Accessibility/Motion: PASS (static) — semantic static content has no custom interaction or autonomous motion.
  Build/Integration: PASS — root route and full TypeScript/Vite/Storybook integration verified.
findings
  P36-OC-001 | PASS | exact seven-row catalog/manifest/coverage audit | no canonical is grouped or omitted | none
  P36-RDS-001 | PASS (static) | descriptor values are serialized in SmootherStructureDiagram | no disconnected fake runtime | none
  P36-BOUNDARY-001 | PASS | runtimeSource none records host scroll/body/global ScrollTrigger mutation risk | no host document takeover | none
  P36-GET-001 | ADVISORY | rendered get() says ScrollSmoother while installed 3.15.0 d.ts is ScrollSmoother | undefined | local text avoids claiming the missing-instance return | retain source boundary
  P36-INT-001 | PASS | route and full TypeScript/Vite/Storybook integration | page chunk and route verified | none
  P36-B01 | DEFERRED → PASS | static code selection and any future focus order | browser audit | owner
  P36-B02 | DEFERRED → PASS | no-runtime reduced-motion confirmation | browser audit | owner
  P36-B03 | DEFERRED → PASS | 320/390 static code and schematic layout | browser audit | owner
  P36-B04 | DEFERRED → PASS | intentionally absent host-document create behavior | browser audit must occur in an application-owned integration environment | owner
verificationEvidence
  task-16-report.md records two rendered/raw/installed comparison passes, page-local TypeScript, exact seven-row audit, no-config Prettier, assigned-path diff, and static self-review.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: ScrollSmoother main/content/scrollTrigger/create/get/vars/wrapper 공식 문서를 다시 대조했다. native body scroll, 단일 wrapper/content, singleton, page ScrollTrigger보다 먼저 생성, fixed UI 외부 배치 조건을 확인했다.
- findings:
  - SSC-A01 `BLOCK → ADDRESSED` — 학습 화면의 sourcePath·검토일·P번호·runtimeSource/production/ownership 제작 표현을 실제 적용 조건으로 바꿨다.
  - SSC-A02 `PASS (static)` — 하나의 descriptor가 wrapper·content·smooth·effects 표시 코드를 만들며 이 페이지는 document 전역 runtime 결과를 주장하지 않는다.
  - SSC-A03 `PASS` — create/get/kill 및 content/wrapper getter 경계와 singleton 설명이 공식 문서와 일치한다.
  - SSC-A04 `DEFERRED` — 실제 root document setup, fixed UI, 작은 viewport의 code/diagram 확인은 사용자 승인에 따라 수행하지 않았다.
  - SSC-A05 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.

### 2026-08-13 최종 교차검토 수정

- `SSC-RDS-20260813-02 | BLOCK → PASS` — singleton 표시 코드가 생성 직후 `kill()`하는 연속 흐름으로 읽혔다. `setupScrollSmoother()`가 instance 조회값을 확인한 뒤 cleanup을 반환하고, app teardown에서 그 cleanup을 호출하도록 수명을 분리했다.
- 재검증: create/get/getter/반환 cleanup/app teardown의 순서를 정적 재독했고, `npx tsc --noEmit --pretty false`와 Batch C 범위 `git diff --check`는 exit 0이다.
- Browser: `DEFERRED`, Storybook: `N/A`; overall/releaseDecision은 `NOT VERIFIED`를 유지한다.
