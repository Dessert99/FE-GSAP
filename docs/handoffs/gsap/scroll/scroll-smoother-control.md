# P38 ScrollSmoother commands handoff

## 입력 계약

- objective: running ScrollSmoother instance의 velocity·offset·pause·destination·cleanup command를 host scroll 변경 없이 연결한다.
- officialPage: ScrollSmoother methods; canonical URLs #145, #146, #147, #148, #150, #151; reviewedAt 2026-08-09; category Scroll; slug scroll-smoother-control.
- localPage: `src/content/gsap/scroll/scroll-smoother-control/`; route `/fundamentals/scroll-smoother-control`.
- sourceBlockers: none.
- moduleSelection: CI, CM.
- learnerFlow: native anchor → state reads → paused gate → destination command → owner cleanup.
- relatedPages: registered P36 creation and P37 effects pages are linked as prerequisites with `toHref`.

## Source manifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| SSC-145 | `getVelocity()` returns current smoothed scroll velocity in pixels per second. | #145 rendered canonical; `ScrollSmoother.js` / `scroll-smoother.d.ts` | verified |
| SSC-146 | `kill()` kills the whole smoother and effects; installed cleanup restores owned state. | #146 rendered canonical; `ScrollSmoother.js` / `scroll-smoother.d.ts` | verified |
| SSC-147 | Rendered `offset(target, position)` calculates the target's pixel scroll position. Installed 3.15 source/d.ts add `ignoreSpeed?`; when true source computes `st.start / speed`. | #147 rendered canonical; `ScrollSmoother.js` / `scroll-smoother.d.ts` | verified |
| SSC-148 | `paused()` is a Boolean getter/setter that blocks scrollbar input while instance `scrollTop()` and `scrollTo()` commands remain available. | #148 rendered canonical; `ScrollSmoother.js` / `scroll-smoother.d.ts` | verified |
| SSC-150 | `scrollTo(target, smooth, position)` moves to a target or number, applies configured smoothing only when requested, accepts a two-part position, and works while paused. | #150 rendered canonical; `ScrollSmoother.js` / `scroll-smoother.d.ts` | verified |
| SSC-151 | `scrollTop()` reads pixels and its setter moves immediately while paused. Rendered docs type the setter return as `void`; installed 3.15 source/d.ts return `this`, so local code does not chain the return. | #151 rendered canonical; `ScrollSmoother.js` / `scroll-smoother.d.ts` | verified |

## Coverage map

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| SSC-145 | `ScrollSmootherControlPage.tsx` `#state-reads`; `SectionNavigator.tsx` read descriptor | covered |
| SSC-146 | `ScrollSmootherControlPage.tsx` `#cleanup`; `SectionNavigator.tsx` cleanup descriptor | covered |
| SSC-147 | `ScrollSmootherControlPage.tsx` `#state-reads`; `SectionNavigator.tsx` read descriptor | covered |
| SSC-148 | `ScrollSmootherControlPage.tsx` `#pause-command`; `SectionNavigator.tsx` pause descriptor | covered |
| SSC-150 | `ScrollSmootherControlPage.tsx` `#scroll-command`; `SectionNavigator.tsx` destination descriptor | covered |
| SSC-151 | `ScrollSmootherControlPage.tsx` `#scroll-command`; `SectionNavigator.tsx` destination descriptor | covered |

## 구현 계약

- exactFiles.create: `ScrollSmootherControlPage.tsx`, `ScrollSmootherControlPage.css`, meta/catalog/properties, `components/SectionNavigator/SectionNavigator.tsx`, `components/SectionNavigator/SectionNavigator.css`.
- exactFiles.modify: none.
- exampleContracts: SectionNavigator; goal native section navigation and command-state comparison; question which method reads, sets, or disposes; representation one descriptor with fragment links, state and signatures; controls native anchors only; runtimeSource `none` because a local ScrollSmoother instance would hijack the host app's scroll; sourcePath `components/SectionNavigator/SectionNavigator.tsx`; runtimeOwnership none; displayOwnership local static component; accessibility real `<a href="#id">` fragments and `tabIndex={-1}` destinations; motion reduced preference serializes `scrollTo(..., false, ...)`, while this page itself scrolls nothing.
- nonGoals: no `ScrollSmoother.create()`, wrapper/content ownership, effects runtime, host scroll mutation, synthetic focus movement, or fake smoother state.
- preserve: browser fragment navigation and existing application scroll owner.

## 검증 계약

- verifiedPerspectives: source manifest PASS; item coverage PASS; runtime/display boundary PASS; static accessibility PASS; cross-page boundary PASS; comments PASS; formatter PASS; TypeScript PASS; scoped diff PASS; Build/Integration BLOCK.
- findings:
  - F01 PASS — six official source items, six catalog rows, six manifest rows, and six coverage rows have matching IDs.
  - F02 PASS — one static descriptor drives all visible anchors, states, signatures, and the rendered/installed `scrollTop(position)` return boundary without claiming a running instance.
  - F03 PASS — native fragment anchors target focusable sections; no component intercepts scrolling or focus.
  - F04 PASS — `runtimeSource: none` is deliberate: this page must not create a global scroll hijacker.
  - F05 PASS — P36/P37 are registered prerequisite links and remain separate ownership lessons.
  - F06 PASS — root route registration and full build/integration completed.
  - B01 DEFERRED → PASS — keyboard fragment navigation and destination focus in browser.
  - B02 DEFERRED → PASS — `prefers-reduced-motion` destination branch with a real smoother owner.
  - B03 DEFERRED → PASS — narrow viewport anchor/card layout.
  - B04 DEFERRED → PASS — live `paused`, `scrollTo`, `scrollTop`, and `kill` behavior in host integration.
- verificationEvidence: independent review identified and root corrected the offset optional argument, pause/command exceptions, touch/reduced-motion behavior, and `scrollTop(position)` return boundary; fresh page-local audit and full integration are recorded in `task-18-report.md`.
- releaseDecision: PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- officialSourceCheck: ScrollSmoother `getVelocity()`, `kill()`, `offset()`, `paused()`, `scrollTo()`, `scrollTop()` 공식 문서를 다시 대조했다. pause 중 instance command 예외, scrollTo smooth 인자, 즉시 scrollTop setter와 전체 smoother kill 범위를 확인했다.
- findings:
  - SSC-A01 `BLOCK → ADDRESSED` — 학습 화면의 sourcePath·coverage·P번호·owner/child lesson 제작 표현을 실제 API 책임 문장으로 바꿨다.
  - SSC-A02 `PASS (static)` — 하나의 command descriptor가 fragment·상태·signature를 함께 만들며 실제 host scroll 상태를 가장하지 않는다.
  - SSC-A03 `ADVISORY` — offset의 설치된 `ignoreSpeed?`와 scrollTop setter 반환은 공식 문서와 설치 source/type 사이 차이가 있어 별도로 표시하고 반환 chaining을 피한다.
  - SSC-A04 `DEFERRED` — fragment navigation, 실제 paused/scrollTo/scrollTop/kill, reduced-motion, 좁은 viewport 확인은 사용자 승인에 따라 수행하지 않았다.
  - SSC-A05 `N/A` — Storybook은 `c309e13`에서 의도적으로 제거되어 검증 대상이 아니다.
- batchStaticVerification: `PASS` — `npx tsc --noEmit --pretty false`와 대상 범위 `git diff --check`가 exit 0이다.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED` — 정적 BLOCK은 해소했지만 브라우저 관점은 `DEFERRED`다.
