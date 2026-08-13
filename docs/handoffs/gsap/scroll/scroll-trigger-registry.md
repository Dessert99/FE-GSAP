# P44 ScrollTrigger registry handoff

## 입력 계약

```text
objective: labelled local triggers의 refresh order 탐색과 global registry cleanup boundary를 학습한다.
officialPage:
  title: ScrollTrigger registry methods and properties
  canonicalUrl: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
  reviewedAt: 2026-08-09
  category: scroll
  slug: scroll-trigger-registry
localPage:
  localPath: src/content/gsap/scroll/scroll-trigger-registry/
  route: /fundamentals/scroll-trigger-registry
sourceBlockers: []
moduleSelection:
  - callable method signatures and refresh-order relationship
  - actual local registry navigator and isolated global-operation guard
learnerFlow:
  - 세 owned trigger를 먼저 만든다.
  - getAll/getById와 selected instance의 previous/next를 같은 snapshot으로 읽는다.
  - isScrolling/isTouch를 continuous announcement 없이 구분한다.
  - killAll의 global scope를 guard하고 recreate와 normal owned cleanup을 분리한다.
relatedPages:
  - P40 create is linked as the instance-construction prerequisite.
sourceManifest:
  - id: STR-171
    officialItem: next() returns the next ScrollTrigger in refresh order
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/next()/ rendered pass 1/2; GSAP master src/ScrollTrigger.js and installed 3.15 src/types pass 1/2
    sourceStatus: verified
  - id: STR-173
    officialItem: previous() returns the previous ScrollTrigger in refresh order
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/previous()/ rendered pass 1/2; GSAP master src/ScrollTrigger.js and installed 3.15 src/types pass 1/2
    sourceStatus: verified
  - id: STR-186
    officialItem: getAll() returns all ScrollTrigger instances
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.getAll()/ rendered pass 1/2; source filters id ScrollSmoother; installed 3.15 src/types pass 1/2
    sourceStatus: verified
  - id: STR-187
    officialItem: getById(id) returns the matching instance or undefined
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.getById()/ rendered pass 1/2; GSAP master and installed 3.15 src/types pass 1/2
    sourceStatus: verified
  - id: STR-189
    officialItem: isScrolling() reports whether any related scroller is scrolling
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isScrolling()/ rendered pass 1/2; source returns Boolean last-scroll timestamp; installed 3.15 src/types pass 1/2
    sourceStatus: verified
  - id: STR-190
    officialItem: isTouch is 0 for no touch, 1 for touch-only, and 2 for hybrid input
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isTouch/ rendered pass 1/2; source assigns Observer.isTouch; installed 3.15 src/types pass 1/2
    sourceStatus: verified
  - id: STR-191
    officialItem: killAll(allowListeners?) kills all triggers except main ScrollSmoother
    sourceLocation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.killAll()/ rendered pass 1/2; source kills non-ScrollSmoother and clears listeners unless allowListeners true; installed 3.15 src/types pass 1/2
    sourceStatus: verified
coverageMap:
  - sourceItemId: STR-171
    localEvidence: [RegistryNavigator snapshot previous/next table, code panel, boundary section]
    localStatus: covered
  - sourceItemId: STR-173
    localEvidence: [RegistryNavigator snapshot previous/next table, code panel, boundary section]
    localStatus: covered
  - sourceItemId: STR-186
    localEvidence: [RegistryNavigator getAll table and actual runtime call]
    localStatus: covered
  - sourceItemId: STR-187
    localEvidence: [RegistryNavigator selected lookup table and actual runtime call]
    localStatus: covered
  - sourceItemId: STR-189
    localEvidence: [RegistryNavigator frozen isScrolling table and non-live explanation]
    localStatus: covered
  - sourceItemId: STR-190
    localEvidence: [RegistryNavigator isTouch table and capability explanation]
    localStatus: covered
  - sourceItemId: STR-191
    localEvidence: [guarded actual reset, displayed code, cleanup boundary section]
    localStatus: covered
```

## 구현 계약

```text
exactFiles:
  create:
    - src/content/gsap/scroll/scroll-trigger-registry/ScrollTriggerRegistryPage.tsx
    - src/content/gsap/scroll/scroll-trigger-registry/ScrollTriggerRegistryPage.css
    - src/content/gsap/scroll/scroll-trigger-registry/scroll-trigger-registry.meta.ts
    - src/content/gsap/scroll/scroll-trigger-registry/examples/RegistryNavigator/RegistryNavigator.tsx
    - src/content/gsap/scroll/scroll-trigger-registry/examples/RegistryNavigator/RegistryNavigator.css
    - src/content/gsap/scroll/scroll-trigger-registry/examples/RegistryNavigator/useRegistryNavigatorRuntime.ts
  modify:
    - src/content/gsap/scroll/scroll-trigger-registry/scroll-trigger-registry.catalog.ts
exampleContracts:
  - name: RegistryNavigator
    goal: three owned labelled triggers의 static/instance registry reads와 guarded global reset을 실제 호출한다.
    question: refresh order neighbor와 global cleanup scope를 어떻게 구분하는가?
    representation: local focusable scroller, snapshot table, discrete status, descriptor-derived code
    controls: ID lookup buttons and isolated killAll/recreate button
    runtimeSource: actual
    sourcePath: src/content/gsap/scroll/scroll-trigger-registry/examples/RegistryNavigator/useRegistryNavigatorRuntime.ts
    runtimeOwnership: creates/kills exactly three local instances; killAll(true) is called only when global getAll contains those exact three instances, preserving unrelated listeners.
    displayOwnership: TSX owns controls, table, code, and explanation; runtime owns calls and frozen snapshot.
    accessibility: native buttons, aria-pressed, focusable native local scroll area, semantic table, discrete status only.
    motion: none; no tween or decorative motion is created.
nonGoals:
  - no global app registry changes beyond this lesson's lazy route registration.
  - no live scrolling announcement or full application killAll demonstration.
preserve:
  - normal cleanup is ownedRef trigger.kill() only.
  - foreign trigger detection blocks killAll instead of making a global destructive call.
```

## 검증 계약

```text
verifiedPerspectives:
  - Official Coverage: PASS, seven verified manifest rows and seven covered rows.
  - Learning Transformation: PASS, creation → read → order → global boundary sequence.
  - Runtime/Display Sync: PASS, one descriptor drives instances, navigator labels and reset lifecycle.
  - Structure/Comment: PASS, page exports and every examples declaration/useGSAP stage have Korean one-line comments.
  - Accessibility/Motion: PASS, native keyboard controls/table; no motion; isScrolling is frozen and not live.
  - Build/Integration: PASS, root registered the lazy route and completed full TypeScript/Vite/Storybook builds.
findings:
  - ID: P44-F01
    status: resolved
    evidence: installed source getAll/killAll exclude ScrollSmoother; runtime guard refuses foreign instance identities and uses allowListeners before global killAll.
    impact: avoids a component demonstration killing page-owned triggers.
    requiredAction: none.
  - ID: P44-F02
    status: documented
    evidence: rendered next/previous signatures name a ScrollTrigger instance, while installed 3.15 types return ScrollTrigger | undefined; the runtime safely displays missing edge neighbors as 없음.
    impact: first/last refresh-order items do not invent an instance.
    requiredAction: none.
  - ID: P44-F03
    status: resolved
    evidence: route, P40 prerequisite link, and full TypeScript/Vite/Storybook checks passed under root ownership.
    impact: source integration is complete; four approved browser checks remain deferred.
    requiredAction: none before source release.
verificationEvidence:
  - page-local TypeScript: PASS (exit 0) with the assigned TS/TSX files and `src/vite-env.d.ts`.
  - scoped Prettier: PASS (exit 0) using `--no-config --single-quote --no-semi --check` on assigned files.
  - catalog/sourceManifest/coverage exact audit: PASS, 7/7/7 with every explicit ID exactly once in catalog and twice in handoff.
  - assigned diff: PASS, `git diff --check -- <assigned paths>` exit 0.
  - integration: PASS; browser keyboard, visual, small viewport, reduced-motion: DEFERRED → PASS to the approved final browser batch.
releaseDecision: PASS
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
