# GSAP Plugin P21~P46 Delivery Design

## 목표와 완료 기준

남은 Plugin P21~P46 26개 페이지와 119개 canonical source를 구현해 GSAP 학습 프로그램을 page 86/86, canonical 364/364로 만든다. 각 페이지는 curriculum의 learner question과 ownership을 그대로 사용하며 Official Coverage와 Learning Transformation을 독립적으로 통과한다.

완료는 content 생성만 뜻하지 않는다. 각 페이지마다 item-level source manifest/coverage, page-local 구현, route 등록, TypeScript, Vite, Storybook, handoff `releaseDecision: PASS`, 페이지 커밋이 필요하다. 브라우저에서만 확인할 수 있는 네 항목은 승인된 `DEFERRED`로 남기고 마지막 프로그램 검수에서 일괄 처리한다.

## 권위 문서와 범위

- 페이지 identity, canonical ownership, learner question과 예제 경계: `plugin-learning-curriculum.md`와 `master-page-inventory.md`
- source/learning/page/handoff/quality 계약: `docs/workflows/`
- 구현 구조와 주석: `AGENTS.md`, `docs/project-structure.md`
- 현재 완료 기준: `current-status.md`, P01~P20 handoff

새 dependency, 공용 UI, 전역 스타일, package 설정은 추가하지 않는다. PixiJS가 설치되지 않았으므로 P30은 P10 EaselPlugin과 같은 static executable-boundary page로 만든다. 가짜 Pixi runtime이나 새 Pixi dependency를 만들지 않는다.

## 실행 구조

서로 다른 slug 세 개를 한 wave로 병렬 준비한다. Worker는 자기 content folder, page handoff와 report만 쓰며 root는 route, 프로그램 문서, 전체 build, handoff release 갱신과 Git을 소유한다. 모든 worker가 compile-ready에서 멈춘 뒤 root가 curriculum 순서로 한 페이지씩 검수·등록·검증·커밋한다.

| wave | pages | 핵심 경계 |
| --- | --- | --- |
| A | P21~P23 | MotionPath 실행, raw conversion, coordinate matrix |
| B | P24~P26 | path measurement, Observer identity, continuous signals |
| C | P27~P29 | Observer state/lifecycle, physics mode selection |
| D | P30~P32 | static Pixi boundary, ScrambleText, SplitText creation |
| E | P33~P35 | SplitText lifecycle, TextPlugin, React patterns |
| F | P36~P38 | ScrollSmoother structure/effects/commands |
| G | P39~P41 | ScrollTo, ScrollTrigger construction/geometry |
| H | P42~P44 | ScrollTrigger motion/lifecycle/registry |
| I | P45~P46 | responsive restoration, custom-scroller integration |

P22~P24는 P21을, P33은 P32를, P37~P38은 P36을, P41~P46은 P40을 선행 지식으로 사용한다. 병렬 worker 단계에서는 아직 등록되지 않은 prerequisite를 text-only boundary로 두고 root가 순차 통합할 때 실제 링크로 바꾼다.

## runtime과 안전 경계

- controls, descriptor, 실제 GSAP call, snapshot과 code panel은 한 source에서 파생한다.
- continuous scroll, pointer, velocity, progress, text intermediate 값은 live region 밖에 둔다. 요청 결과와 lifecycle command 같은 이산 상태만 알린다.
- plugin이 React-owned DOM을 교체하지 않게 한다. SplitText나 conversion처럼 DOM을 바꾸는 plugin은 instance가 소유한 revert/kill과 stable host boundary를 사용한다.
- 전역 singleton과 document scroll을 바꾸는 API는 학습 앱을 오염시키지 않는다. ScrollSmoother P36~P38은 host-wide scroll hijack을 실제로 자동 실행하지 않고, source-backed structure/config/lifecycle representation을 중심으로 가르친다.
- ScrollTrigger의 `killAll`, global refresh/listeners, scroll memory, normalizer, proxy는 demo가 만든 대상만 다루고 cleanup에서 전역 상태를 원복한다. 안전하게 격리할 수 없는 호출은 실제 실행하지 않고 경계와 정확한 code contract를 정적으로 제시한다.
- reduced motion은 animation을 0-duration final state로 전환하거나 motion-free representation을 유지한다. 사용자 입력 자체와 측정 결과는 숨기지 않는다.

## 검증과 Git

자동화 테스트 파일이나 runner는 추가하지 않는다. Worker는 canonical/manifest/coverage exact-ID audit, page-local TypeScript, scoped formatting, diff check와 관점별 self-review를 수행한다. Root는 page route를 하나만 추가한 상태에서 `npx tsc --noEmit`, Vite, Storybook, `git diff --check`를 실행하고 page handoff의 integration/release를 갱신한 뒤 한 페이지를 한 커밋으로 남긴다.

전체 P46 완료 뒤 P01~P46 route 순서, page folder/handoff/lazy import/lesson 등록, 205/205 plugin canonical ownership, releaseDecision 46/46과 실제 browser-DEFERRED 집합을 재검산한다. 마지막 프로그램 handoff는 다음 단계를 “browser 일괄 검수와 발견 수정”으로 바꾼다.

## Self-review

- Placeholder: 없음.
- Scope: P21~P46 page delivery와 최종 프로그램 handoff에 한정한다.
- Ambiguity resolution: PixiJS 부재와 ScrollSmoother host-wide side effect는 static executable boundary로 처리하고 dependency나 전역 app 구조를 바꾸지 않는다.
- Consistency: curriculum ownership 119개를 변경하지 않으며 route integration은 P21→P46 순서를 유지한다.
