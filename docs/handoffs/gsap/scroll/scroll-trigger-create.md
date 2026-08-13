# ScrollTrigger create handoff

## 입력 계약

```text
objective
  P40에서 ScrollTrigger가 local scroller의 trigger/start/end를 refresh 시점에 측정하고, standalone instance와 vars를 만드는 과정을 한 descriptor로 학습한다.
officialPage
  title: ScrollTrigger / ScrollTrigger.config() / ScrollTrigger.create() / ScrollTrigger.defaults() / ScrollTrigger.vars
  canonicalUrl: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config()/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.create()/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.defaults()/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/vars/
  reviewedAt: 2026-08-09
  category: Scroll
  slug: scroll-trigger-create
localPage
  localPath: src/content/gsap/scroll/scroll-trigger-create/
  route: /fundamentals/scroll-trigger-create
moduleSelection
  plugin/class instance, standalone create, local scroller measurement, markers/vars inspector, global ownership boundary
sourceManifest
  - id: STC-160 | officialItem: ScrollTrigger supports trigger/scroller/start/end/toggleActions/scrub/pin/snap; custom element scrollers are supported, start/end are created and refreshed from normal-flow geometry, and pinning must not animate the pinned element itself | sourceLocation: #160 rendered pass 1 lines 188-198, 213-228, 255-272, 299-310, 396-402 and pass 2 lines 188-198, 213-228; official raw ScrollTrigger.js pass 1 lines 607-645 and pass 2 lines 607-645; installed 3.15.0 ScrollTrigger.js pass 1/2 lines 607-645; scroll-trigger.d.ts pass 1/2 Vars lines 717-763 | sourceStatus: verified
  - id: STC-183 | officialItem: ScrollTrigger.config(vars) configures global behavior such as limitCallbacks; rendered docs specify limitCallbacks default false | sourceLocation: #183 rendered pass 1 lines 178-207 and pass 2 lines 178-197; official raw ScrollTrigger.js pass 1 lines 1434-1445 and pass 2 lines 1434-1445; installed 3.15.0 ScrollTrigger.js pass 1/2 lines 1434-1445; scroll-trigger.d.ts pass 1/2 lines 114 and 795-800 | sourceStatus: verified
  - id: STC-184 | officialItem: ScrollTrigger.create(vars:Object): ScrollTrigger creates a standalone ScrollTrigger and returns the new instance | sourceLocation: #184 rendered pass 1 lines 178-195 and pass 2 lines 178-195; official raw ScrollTrigger.js pass 1 line 1495 and pass 2 line 1495; installed 3.15.0 ScrollTrigger.js pass 1/2 line 1495; scroll-trigger.d.ts pass 1/2 lines 133-151 | sourceStatus: verified
  - id: STC-185 | officialItem: ScrollTrigger.defaults(config) supplies defaults only when a corresponding vars value is omitted | sourceLocation: #185 rendered pass 1 lines 178-202 and pass 2 lines 178-202; official raw ScrollTrigger.js pass 1 lines 1307-1313 and pass 2 lines 1307-1313; installed 3.15.0 ScrollTrigger.js pass 1/2 lines 1307-1313; scroll-trigger.d.ts pass 1/2 lines 151-152 | sourceStatus: verified
  - id: STC-205 | officialItem: instance.vars is the read-only configuration object used to create that ScrollTrigger; arbitrary vars may be stored and ignored if not recognized | sourceLocation: #205 rendered pass 1 lines 178-202 and pass 2 lines 178-202; official raw ScrollTrigger.js pass 1 lines 612-645 and pass 2 lines 612-645; installed 3.15.0 ScrollTrigger.js pass 1/2 lines 612-645; scroll-trigger.d.ts pass 1/2 line 23 | sourceStatus: verified
sourceBlockers
  none. All five rendered canonicals were opened and reopened. Official raw ScrollTrigger.js plus installed 3.15.0 source and declaration were each compared twice. The rendered defaults() heading says null while installed source returns the mutable defaults object and installed d.ts types ScrollTrigger.StaticVars; the page makes no return-value claim. config() has no public getter in the rendered docs, installed source, or installed d.ts, so the isolated runtime deliberately does not mutate unknown host config; an application owner must retain prior values for any config it changes.
learnerFlow
  1. Register ScrollTrigger and use an explicit local scroller rather than host document scrolling.
  2. Read the normalized descriptor that supplies start/end/actions/markers and the reduced-motion scrub/pin branch.
  3. Create the standalone instance, call refresh, and compare marker positions with the frozen instance.vars inspector.
  4. Distinguish defaults creation values from config's global behaviors, then inspect exact cleanup ownership.
coverageMap
  - sourceItemId: STC-160 | localEvidence: LocalScrollTriggerLab descriptor, actual create vars, local scroller preview, property table, measurement explanation, and reduced-motion branch | localStatus: covered
  - sourceItemId: STC-183 | localEvidence: LocalScrollTriggerLab descriptor-derived config boundary and ScrollTriggerCreatePage global ownership section | localStatus: covered
  - sourceItemId: STC-184 | localEvidence: useLocalScrollTriggerRuntime ScrollTrigger.create call, LocalScrollTriggerLab code panel, and returned instance inspector | localStatus: covered
  - sourceItemId: STC-185 | localEvidence: useLocalScrollTriggerRuntime defaults snapshot/key restoration, code panel, and ScrollTriggerCreatePage defaults boundary | localStatus: covered
  - sourceItemId: STC-205 | localEvidence: LocalScrollTriggerLab frozen instance.vars inspector and descriptor-derived code panel | localStatus: covered
relatedPages
  P36 ScrollSmoother create is a text-only follow-on boundary here: its root document structure is intentionally not combined with P40's local scroller. P41–P46 are text-only later ScrollTrigger boundaries.
```

## 구현 계약

```text
exactFiles
  create: ScrollTriggerCreatePage TSX/CSS, meta/catalog/properties/descriptor, LocalScrollTriggerLab TSX/CSS/runtime, this handoff
  modify: none
exampleContracts
  name: LocalScrollTriggerLab
  goal: one normalized descriptor supplies actual standalone create vars, local scroller/pin preview, markers, frozen vars inspector, and displayed code.
  question: Before a scroll-driven animation runs, which elements and positions does a ScrollTrigger create and measure?
  representation: focusable native local scroller, trigger/pinned follower, development markers, sparse table, descriptor-derived code, and property table.
  controls: shared replay button refreshes the owned instance and freezes its measured vars/start/end; the scroller remains native keyboard/pointer scrollable.
  runtimeSource: useLocalScrollTriggerRuntime.ts registers ScrollTrigger, snapshots the one defaults key it changes, creates one local standalone instance and tween, refreshes, and kills/restores owned effects.
  sourcePath: src/content/gsap/scroll/scroll-trigger-create/examples/LocalScrollTriggerLab/useLocalScrollTriggerRuntime.ts
  runtimeOwnership: example owns only its local scroller instance, follower tween, pin effects, and temporary defaults toggleActions value; it does not alter host document scroll or unknown global config.
  displayOwnership: descriptor supplies the preview labels, actual create vars, code panel, markers state, reduced-motion branch, and inspector meaning.
  accessibility: local scroller is focusable and labelled; table uses row headers; snapshot is not a live region; native scroll remains available when pin/scrub are disabled.
  motion: user scroll drives the paused follower only when motion is allowed; reduced motion sets scrub/pin false and tween distance/duration to zero.
nonGoals
  host-document scrolling, config mutation without a public snapshot reader, production marker UI, nested pinning, snap behavior teaching, global trigger registry operations, and P41 geometry APIs.
preserve
  routes, program docs, shared UI, global CSS, packages, tests, full builds, and Git remain root-owned.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — five canonical IDs have individual catalog, sourceManifest, and coverageMap rows.
  Learning Transformation: PASS — creation config becomes one local scroller, marker, measured boundary, and vars inspection flow.
  Runtime/Display Sync: PASS — one descriptor supplies actual create values, preview labels, code, marker status, and reduced-motion branch; inspector reads the returned instance.
  Pedagogy: PASS — defaults/config global-scope distinction and create-time refresh measurement are explicit before later geometry pages.
  Structure/Comment: PASS — page/runtime/example separation and Korean instructional comments are scoped to new files.
  Accessibility/Motion: PASS (static) — focusable native scroller, semantic table, no continuous live region, and reduced-motion scrub/pin off branch.
  Build/Integration: PASS — root route, full TypeScript, Vite, Storybook, and diff checks passed.
findings
  P40-OC-001 | PASS | exact five-row catalog/manifest/coverage audit | no canonical is grouped or omitted | none
  P40-RDS-001 | PASS | actual create uses the descriptor and inspector reads instance.vars/start/end after refresh | code cannot drift from runtime values | none
  P40-GLB-001 | PASS | defaults() key snapshot/restore and no unknown config mutation | host global config is preserved | application config owner retains/restores values it changes
  P40-RET-001 | ADVISORY | rendered defaults() title says null; installed runtime/d.ts return defaults object | local page avoids a defaults return claim | retain installed/rendered boundary
  P40-INT-001 | PASS | route and full TypeScript/Vite/Storybook integration | page chunk and lesson registration verified | none
  P40-B01 | DEFERRED → PASS | keyboard focus and native local scroll with marker DOM | browser audit after route integration | root
  P40-B02 | DEFERRED → PASS | reduced-motion scrub/pin-off final state | browser audit after route integration | root
  P40-B03 | DEFERRED → PASS | 320/390 layout of code/table/markers | browser audit after route integration | root
  P40-B04 | DEFERRED → PASS | unmount/rebuild pin, tween, defaults restoration | browser audit after route integration | root
verificationEvidence
  task-20-report.md records rendered/raw/installed two-pass evidence, page-local TypeScript, exact five-row audit, no-config Prettier, assigned-path diff, and self-review.
releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: ScrollTrigger main/config/create/defaults/vars 공식 문서를 다시 대조했다. local scroller, start/end refresh 측정, standalone create 반환, defaults 적용 조건, readonly vars와 config 전역 범위를 확인했다.
- findings:
  - STC-A01 `BLOCK → ADDRESSED` — 표시 tween에서 실제 runtime의 `ease: 'none'`이 빠진 runtime/display 차이를 수정했다.
  - STC-A02 `BLOCK → ADDRESSED` — 학습 화면의 sourcePath·검토일·P번호·GLOBAL OWNERSHIP/production UI 제작 표현을 실제 설정 경계로 바꿨다.
  - STC-A03 `PASS` — descriptor가 실제 create vars·marker·preview·code를 함께 만들고, 표시 setup은 세 element guard·plugin 등록·trigger/tween/transform/defaults cleanup을 포함한다.
  - STC-A04 `ADVISORY` — 공식 defaults() 반환 표기와 설치 runtime/type이 다르므로 예제는 반환 타입을 가르치지 않는다.
  - STC-A05 `DEFERRED` — local scroll·pin·marker·defaults 복원, keyboard, reduced-motion, 좁은 viewport 확인은 사용자 승인에 따라 수행하지 않았다.
  - STC-A06 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.
