# GSAP master page inventory

- Inventory authority: official core and plugin source catalogs reviewed 2026-08-02 (Asia/Seoul)
- Canonical technical sources: **364** = core 159 + plugin-only 205; 15 core/plugin catalog overlaps are one canonical source each
- Visible learning pages: **86** = core 40 + plugin 46
- Initial revision: every source starts at sourceRevision 1
- Ownership invariant: every source has one ownerLearningPageId; every learning page has exactly one primary, and all other owned sources are related

## Authority and identity rules

This file is the program ownership authority. sourcePageId is immutable even if title, category, canonical URL alias, owner, or route later changes. ownerLearningPageId identifies the only handoff allowed to claim the source as primary or related. A catalog overlap is preserved in catalogReferences but never creates another source or another owner.

The source set is frozen from official-core-source-catalog.md and official-plugin-source-catalog.md. The owner composition and route come from core-learning-curriculum.md and plugin-learning-curriculum.md. The two upstream non-page defects—missing standalone Animation docs and the broken CustomEasee alias—remain outside the 364 denominator and do not receive IDs.

## Learning-page ownership summary

| Curriculum | Learning page ID | Route | Title | Primary sourcePageId | Owned sources |
| --- | --- | --- | --- | --- | ---: |
| core:01 | gsap-core-map | /fundamentals/gsap-core-map | GSAP Core는 무엇을 만들고 어디서 찾나요? | source:docs-home | 3 |
| core:02 | installation | /fundamentals/installation | 어떤 환경에서 어떻게 가져오고 등록하나요? | source:installation | 2 |
| core:03 | gsap-to | /fundamentals/gsap-to | 현재값에서 목표값으로 어떻게 움직이나요? | source:gsap-to | 1 |
| core:04 | tween-start-end-values | /fundamentals/tween-start-end-values | to, from, fromTo, set 중 무엇을 쓰나요? | source:gsap-from | 3 |
| core:05 | tween-configuration | /fundamentals/tween-configuration | 옵션은 어디서 오고 어느 범위까지 적용되나요? | source:gsap-config | 3 |
| core:06 | css-animation | /fundamentals/css-animation | CSS 값과 transform은 GSAP에서 어떻게 표현되나요? | source:css | 1 |
| core:07 | non-css-target-values | /fundamentals/non-css-target-values | CSS가 아닌 값도 어떻게 보간하나요? | source:attributes | 2 |
| core:08 | easing | /fundamentals/easing | 같은 거리와 시간인데 왜 움직임이 다르게 느껴지나요? | source:easing | 4 |
| core:09 | custom-ease | /fundamentals/custom-ease | 원하는 속도 곡선을 직접 어떻게 만들까요? | source:custom-ease | 1 |
| core:10 | custom-bounce-wiggle | /fundamentals/custom-bounce-wiggle | 물리감 있는 튕김과 흔들림을 ease로 어떻게 설계하나요? | source:custom-bounce | 2 |
| core:11 | ease-pack | /fundamentals/ease-pack | scale, roughness, slow middle 구간에는 어떤 특수 ease가 맞나요? | source:expo-scale-ease | 3 |
| core:12 | tween-instance | /fundamentals/tween-instance | 만들어진 Tween에는 무엇이 남나요? | source:tween | 4 |
| core:13 | tween-playback-controls | /fundamentals/tween-playback-controls | 같은 Tween을 어떻게 재생·정지·재시작·역재생하나요? | source:tween-is-active | 8 |
| core:14 | tween-playhead | /fundamentals/tween-playhead | 초, progress, totalProgress, ratio는 어떻게 다른가요? | source:tween-ratio | 6 |
| core:15 | tween-timing-math | /fundamentals/tween-timing-math | delay, duration, totalDuration, start/end/global time은 어떻게 계산되나요? | source:tween-delay | 7 |
| core:16 | tween-repeats | /fundamentals/tween-repeats | 반복 회차와 값 재계산은 언제 일어나나요? | source:tween-invalidate | 5 |
| core:17 | tween-callbacks-promise | /fundamentals/tween-callbacks-promise | 만든 뒤 콜백을 바꾸거나 완료를 기다리려면? | source:tween-event-callback | 2 |
| core:18 | find-stop-animations | /fundamentals/find-stop-animations | 참조를 잃은 Tween을 어떻게 찾고 안전하게 중단하나요? | source:gsap-get-by-id | 6 |
| core:19 | high-frequency-updates | /fundamentals/high-frequency-updates | 포인터·스크롤 입력마다 새 Tween을 만들지 않고 어떻게 갱신하나요? | source:gsap-get-property | 3 |
| core:20 | reusable-effects | /fundamentals/reusable-effects | 반복되는 animation recipe를 이름 있는 효과로 어떻게 만들까요? | source:gsap-effects | 2 |
| core:21 | gsap-context | /fundamentals/gsap-context | 한 UI 영역의 GSAP 작업을 어떻게 함께 되돌리나요? | source:gsap-context | 2 |
| core:22 | responsive-motion | /fundamentals/responsive-motion | breakpoint와 reduced-motion 조건별 animation을 어떻게 만들고 정리하나요? | source:gsap-match-media | 2 |
| core:23 | react-use-gsap | /fundamentals/react-use-gsap | React render lifecycle 안에서 GSAP을 어떻게 만들고 정리하나요? | source:react-use-gsap | 1 |
| core:24 | gsap-root-clock | /fundamentals/gsap-root-clock | GSAP의 모든 animation은 누가 매 frame 진행시키나요? | source:gsap-global-timeline | 4 |
| core:25 | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | animation 사이에 함수와 멈춤 지점을 어떻게 예약하나요? | source:gsap-delayed-call | 6 |
| core:26 | timeline-basics | /fundamentals/timeline-basics | 여러 Tween을 하나의 조절 가능한 순서로 어떻게 묶나요? | source:gsap-timeline | 7 |
| core:27 | timeline-child-placement | /fundamentals/timeline-child-placement | child는 부모 시간축의 어디에 놓이고 변경 시 어떻게 따라가나요? | source:timeline-parent | 5 |
| core:28 | timeline-labels | /fundamentals/timeline-labels | 숫자 대신 의미 있는 이름으로 시간 위치를 어떻게 다루나요? | source:timeline-labels | 7 |
| core:29 | timeline-inspection | /fundamentals/timeline-inspection | 중첩된 Timeline 안에서 원하는 child를 어떻게 찾나요? | source:timeline-data | 5 |
| core:30 | timeline-cleanup | /fundamentals/timeline-cleanup | 무엇을 보존하면서 Timeline 내용을 제거하나요? | source:timeline-auto-remove-children | 6 |
| core:31 | timeline-playback-controls | /fundamentals/timeline-playback-controls | 전체 sequence를 하나의 animation처럼 어떻게 제어하나요? | source:timeline-is-active | 8 |
| core:32 | timeline-playhead | /fundamentals/timeline-playhead | Timeline 위치를 즉시 바꾸거나 부드럽게 이동하려면? | source:timeline-progress | 6 |
| core:33 | timeline-timing-math | /fundamentals/timeline-timing-math | children이 바뀌면 Timeline의 duration과 위치는 어떻게 계산되나요? | source:timeline-delay | 7 |
| core:34 | timeline-repeats | /fundamentals/timeline-repeats | sequence 전체를 반복·왕복하고 children 값을 다시 계산하려면? | source:timeline-invalidate | 5 |
| core:35 | gsap-utils | /fundamentals/gsap-utils | animation 밖의 값 계산을 왜 utility 함수로 분리하나요? | source:gsap-utils | 2 |
| core:36 | range-interpolation | /fundamentals/range-interpolation | 입력 범위를 animation 값과 색으로 어떻게 바꾸나요? | source:utils-clamp | 5 |
| core:37 | utility-pipelines-units | /fundamentals/utility-pipelines-units | 계산 함수들을 연결하고 CSS 단위를 안전하게 유지하려면? | source:utils-check-prefix | 4 |
| core:38 | utility-collections-random | /fundamentals/utility-collections-random | 여러 후보를 배열로 만들고 무작위 순서를 어떻게 정하나요? | source:utils-random | 3 |
| core:39 | utility-distribute | /fundamentals/utility-distribute | index와 grid 위치에 따라 서로 다른 값을 어떻게 배분하나요? | source:utils-distribute | 1 |
| core:40 | modifiers-snap-wrap | /fundamentals/modifiers-snap-wrap | 계산된 값을 매 render마다 순환·왕복·간격 고정하려면? | source:modifiers | 5 |
| plugin:P01 | plugins | /fundamentals/plugins | Plugins: loading, registration, and ownership | source:plugins-overview | 1 |
| plugin:P02 | css-rule-plugin | /fundamentals/css-rule-plugin | CSSRulePlugin: animate a stylesheet rule | source:css-rule-plugin | 2 |
| plugin:P03 | draggable-create | /fundamentals/draggable-create | Draggable: create and find an instance | source:draggable | 5 |
| plugin:P04 | draggable-coordinates | /fundamentals/draggable-coordinates | Draggable coordinates: start, delta, pointer, and end | source:draggable-delta-x | 14 |
| plugin:P05 | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | Draggable constraints, axis lock, auto-scroll, and resync | source:draggable-apply-bounds | 12 |
| plugin:P06 | draggable-lifecycle | /fundamentals/draggable-lifecycle | Draggable lifecycle: enable, drive, disable, and kill | source:draggable-disable | 6 |
| plugin:P07 | draggable-events | /fundamentals/draggable-events | Draggable gesture events and recent-drag state | source:draggable-add-event-listener | 3 |
| plugin:P08 | draggable-collision-momentum | /fundamentals/draggable-collision-momentum | Draggable collision and throw state | source:draggable-is-throwing | 3 |
| plugin:P09 | draw-svg | /fundamentals/draw-svg | DrawSVG: reveal and measure an SVG stroke | source:draw-svg | 3 |
| plugin:P10 | easel-plugin | /fundamentals/easel-plugin | EaselPlugin: tween CreateJS display objects | source:easel | 1 |
| plugin:P11 | flip-first-last | /fundamentals/flip-first-last | Flip fundamentals: capture first, change layout, animate last | source:flip | 4 |
| plugin:P12 | flip-fit-absolute | /fundamentals/flip-fit-absolute | Flip layout tools: fit and temporary absolute positioning | source:flip-static-fit | 2 |
| plugin:P13 | flip-batch-interrupt | /fundamentals/flip-batch-interrupt | Flip batches and interruption control | source:flip-static-batch | 3 |
| plugin:P14 | gsdevtools | /fundamentals/gsdevtools | GSDevTools: inspect and control animation time | source:gs-dev-tools | 2 |
| plugin:P15 | inertia | /fundamentals/inertia | InertiaPlugin: continue motion from measured velocity | source:inertia | 5 |
| plugin:P16 | velocity-tracker-lifecycle | /fundamentals/velocity-tracker-lifecycle | VelocityTracker: choose properties and manage tracking | source:velocity-tracker | 5 |
| plugin:P17 | velocity-tracker-read | /fundamentals/velocity-tracker-read | VelocityTracker: read velocity and find trackers | source:velocity-tracker-get | 5 |
| plugin:P18 | morph-svg | /fundamentals/morph-svg | MorphSVG fundamentals: make two shapes compatible | source:morph-svg | 4 |
| plugin:P19 | morph-svg-path-data | /fundamentals/morph-svg-path-data | MorphSVG path conversion and raw-path data | source:morph-svg-static-convert-to-path | 3 |
| plugin:P20 | motion-path-helper | /fundamentals/motion-path-helper | MotionPathHelper: edit a path and dispose the editor | source:motion-path-helper | 3 |
| plugin:P21 | motion-path | /fundamentals/motion-path | MotionPath fundamentals: move and orient along a path | source:motion-path | 1 |
| plugin:P22 | motion-path-data | /fundamentals/motion-path-data | MotionPath raw-path conversion pipeline | source:motion-path-static-points-to-segment | 6 |
| plugin:P23 | motion-path-coordinates | /fundamentals/motion-path-coordinates | MotionPath coordinate conversion and alignment matrices | source:motion-path-static-convert-coordinates | 4 |
| plugin:P24 | motion-path-measure | /fundamentals/motion-path-measure | MotionPath length, sampling, and slicing | source:motion-path-static-get-length | 3 |
| plugin:P25 | observer-create | /fundamentals/observer-create | Observer: create, configure, and find observers | source:observer | 6 |
| plugin:P26 | observer-signals | /fundamentals/observer-signals | Observer signals: delta, position, velocity, and event source | source:observer-delta-x | 10 |
| plugin:P27 | observer-gesture-state | /fundamentals/observer-gesture-state | Observer press and drag state | source:observer-is-dragging | 2 |
| plugin:P28 | observer-lifecycle | /fundamentals/observer-lifecycle | Observer lifecycle: enable, disable, and kill | source:observer-disable | 4 |
| plugin:P29 | physics-motion | /fundamentals/physics-motion | Physics2D and PhysicsProps: velocity-driven tweening | source:physics2-d | 2 |
| plugin:P30 | pixi-plugin | /fundamentals/pixi-plugin | PixiPlugin: tween PixiJS display objects | source:pixi | 2 |
| plugin:P31 | scramble-text | /fundamentals/scramble-text | ScrambleText: replace text through readable intermediate characters | source:scramble-text | 1 |
| plugin:P32 | split-text-create | /fundamentals/split-text-create | SplitText: split text into usable parts | source:split-text | 7 |
| plugin:P33 | split-text-lifecycle | /fundamentals/split-text-lifecycle | SplitText re-splitting, revert, and disposal | source:split-text-is-split | 4 |
| plugin:P34 | text-plugin | /fundamentals/text-plugin | TextPlugin: interpolate element text | source:text-replacement | 1 |
| plugin:P35 | react-gsap-patterns | /fundamentals/react-gsap-patterns | React and GSAP: useful and advanced patterns | source:react-advanced-techniques | 2 |
| plugin:P36 | scroll-smoother-create | /fundamentals/scroll-smoother-create | ScrollSmoother: wrapper, content, and instance setup | source:scroll-smoother | 7 |
| plugin:P37 | scroll-smoother-effects | /fundamentals/scroll-smoother-effects | ScrollSmoother smoothness, effects, and progress | source:scroll-smoother-effects | 3 |
| plugin:P38 | scroll-smoother-control | /fundamentals/scroll-smoother-control | ScrollSmoother navigation, position, pause, and cleanup | source:scroll-smoother-get-velocity | 6 |
| plugin:P39 | scroll-to | /fundamentals/scroll-to | ScrollToPlugin: tween window or element scroll | source:scroll-to | 2 |
| plugin:P40 | scroll-trigger-create | /fundamentals/scroll-trigger-create | ScrollTrigger: create and configure a trigger | source:scroll-trigger | 5 |
| plugin:P41 | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | ScrollTrigger geometry and progress | source:scroll-trigger-animation | 14 |
| plugin:P42 | scroll-trigger-motion | /fundamentals/scroll-trigger-motion | ScrollTrigger scrub, velocity, batching, and directional snap | source:scroll-trigger-get-tween | 4 |
| plugin:P43 | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | ScrollTrigger refresh, update, events, and disposal | source:scroll-trigger-disable | 9 |
| plugin:P44 | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | ScrollTrigger registry, neighbors, and global state | source:scroll-trigger-next | 7 |
| plugin:P45 | scroll-trigger-responsive | /fundamentals/scroll-trigger-responsive | ScrollTrigger responsive styles and scroll memory | source:scroll-trigger-static-clear-match-media | 4 |
| plugin:P46 | scroll-trigger-integrations | /fundamentals/scroll-trigger-integrations | ScrollTrigger custom scrollers and normalized input | source:scroll-trigger-static-normalize-scroll | 3 |

## Canonical source ownership records

| sourcePageId | Official title | Canonical URL | Official category | ownerLearningPageId | Learning route | Role | sourceRevision | Catalog references |
| --- | --- | --- | --- | --- | --- | --- | ---: | --- |
| source:docs-home | docsHome | https://gsap.com/docs/v3/ | Docs home > Docs home | gsap-core-map | /fundamentals/gsap-core-map | primary | 1 | core:S001 |
| source:installation | Installation | https://gsap.com/docs/v3/Installation | Quick Start > Installation | installation | /fundamentals/installation | primary | 1 | core:S002, plugin:#14 |
| source:gsap | GSAP | https://gsap.com/docs/v3/GSAP/ | Fundamentals > GSAP | gsap-core-map | /fundamentals/gsap-core-map | related | 1 | core:S003 |
| source:gsap-effects | gsap.effects | https://gsap.com/docs/v3/GSAP/gsap.effects | Fundamentals > GSAP | reusable-effects | /fundamentals/reusable-effects | primary | 1 | core:S004 |
| source:gsap-global-timeline | gsap.globalTimeline | https://gsap.com/docs/v3/GSAP/gsap.globalTimeline | Fundamentals > GSAP | gsap-root-clock | /fundamentals/gsap-root-clock | primary | 1 | core:S005 |
| source:gsap-ticker | gsap.ticker | https://gsap.com/docs/v3/GSAP/gsap.ticker | Fundamentals > GSAP | gsap-root-clock | /fundamentals/gsap-root-clock | related | 1 | core:S006 |
| source:gsap-utils | gsap.utils | https://gsap.com/docs/v3/GSAP/gsap.utils | Fundamentals > GSAP | gsap-utils | /fundamentals/gsap-utils | primary | 1 | core:S007 |
| source:gsap-version | gsap.version | https://gsap.com/docs/v3/GSAP/gsap.version | Fundamentals > GSAP | gsap-core-map | /fundamentals/gsap-core-map | related | 1 | core:S008 |
| source:gsap-config | gsap.config() | https://gsap.com/docs/v3/GSAP/gsap.config() | Fundamentals > GSAP | tween-configuration | /fundamentals/tween-configuration | primary | 1 | core:S009 |
| source:gsap-context | gsap.context() | https://gsap.com/docs/v3/GSAP/gsap.context() | Fundamentals > GSAP | gsap-context | /fundamentals/gsap-context | primary | 1 | core:S010 |
| source:gsap-defaults | gsap.defaults() | https://gsap.com/docs/v3/GSAP/gsap.defaults() | Fundamentals > GSAP | tween-configuration | /fundamentals/tween-configuration | related | 1 | core:S011 |
| source:gsap-delayed-call | gsap.delayedCall() | https://gsap.com/docs/v3/GSAP/gsap.delayedCall() | Fundamentals > GSAP | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | primary | 1 | core:S012 |
| source:gsap-export-root | gsap.exportRoot() | https://gsap.com/docs/v3/GSAP/gsap.exportRoot() | Fundamentals > GSAP | gsap-root-clock | /fundamentals/gsap-root-clock | related | 1 | core:S013 |
| source:gsap-from | gsap.from() | https://gsap.com/docs/v3/GSAP/gsap.from() | Fundamentals > GSAP | tween-start-end-values | /fundamentals/tween-start-end-values | primary | 1 | core:S014 |
| source:gsap-from-to | gsap.fromTo() | https://gsap.com/docs/v3/GSAP/gsap.fromTo() | Fundamentals > GSAP | tween-start-end-values | /fundamentals/tween-start-end-values | related | 1 | core:S015 |
| source:gsap-get-by-id | gsap.getById() | https://gsap.com/docs/v3/GSAP/gsap.getById() | Fundamentals > GSAP | find-stop-animations | /fundamentals/find-stop-animations | primary | 1 | core:S016 |
| source:gsap-get-property | gsap.getProperty() | https://gsap.com/docs/v3/GSAP/gsap.getProperty() | Fundamentals > GSAP | high-frequency-updates | /fundamentals/high-frequency-updates | primary | 1 | core:S017 |
| source:gsap-get-tweens-of | gsap.getTweensOf() | https://gsap.com/docs/v3/GSAP/gsap.getTweensOf() | Fundamentals > GSAP | find-stop-animations | /fundamentals/find-stop-animations | related | 1 | core:S018 |
| source:gsap-is-tweening | gsap.isTweening() | https://gsap.com/docs/v3/GSAP/gsap.isTweening() | Fundamentals > GSAP | find-stop-animations | /fundamentals/find-stop-animations | related | 1 | core:S019 |
| source:gsap-kill-tweens-of | gsap.killTweensOf() | https://gsap.com/docs/v3/GSAP/gsap.killTweensOf() | Fundamentals > GSAP | find-stop-animations | /fundamentals/find-stop-animations | related | 1 | core:S020 |
| source:gsap-match-media | gsap.matchMedia() | https://gsap.com/docs/v3/GSAP/gsap.matchMedia() | Fundamentals > GSAP | responsive-motion | /fundamentals/responsive-motion | primary | 1 | core:S021 |
| source:gsap-match-media-refresh | gsap.matchMediaRefresh() | https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh() | Fundamentals > GSAP | responsive-motion | /fundamentals/responsive-motion | related | 1 | core:S022 |
| source:gsap-parse-ease | gsap.parseEase() | https://gsap.com/docs/v3/GSAP/gsap.parseEase() | Fundamentals > GSAP | easing | /fundamentals/easing | related | 1 | core:S023 |
| source:gsap-quick-setter | gsap.quickSetter() | https://gsap.com/docs/v3/GSAP/gsap.quickSetter() | Fundamentals > GSAP | high-frequency-updates | /fundamentals/high-frequency-updates | related | 1 | core:S024 |
| source:gsap-quick-to | gsap.quickTo() | https://gsap.com/docs/v3/GSAP/gsap.quickTo() | Fundamentals > GSAP | high-frequency-updates | /fundamentals/high-frequency-updates | related | 1 | core:S025 |
| source:gsap-register-ease | gsap.registerEase() | https://gsap.com/docs/v3/GSAP/gsap.registerEase() | Fundamentals > GSAP | easing | /fundamentals/easing | related | 1 | core:S026 |
| source:gsap-register-effect | gsap.registerEffect() | https://gsap.com/docs/v3/GSAP/gsap.registerEffect() | Fundamentals > GSAP | reusable-effects | /fundamentals/reusable-effects | related | 1 | core:S027 |
| source:gsap-register-plugin | gsap.registerPlugin() | https://gsap.com/docs/v3/GSAP/gsap.registerPlugin() | Fundamentals > GSAP | installation | /fundamentals/installation | related | 1 | core:S028 |
| source:gsap-set | gsap.set() | https://gsap.com/docs/v3/GSAP/gsap.set() | Fundamentals > GSAP | tween-start-end-values | /fundamentals/tween-start-end-values | related | 1 | core:S029 |
| source:gsap-timeline | gsap.timeline() | https://gsap.com/docs/v3/GSAP/gsap.timeline() | Fundamentals > GSAP | timeline-basics | /fundamentals/timeline-basics | primary | 1 | core:S030 |
| source:gsap-to | gsap.to() | https://gsap.com/docs/v3/GSAP/gsap.to() | Fundamentals > GSAP | gsap-to | /fundamentals/gsap-to | primary | 1 | core:S031 |
| source:gsap-update-root | gsap.updateRoot() | https://gsap.com/docs/v3/GSAP/gsap.updateRoot() | Fundamentals > GSAP | gsap-root-clock | /fundamentals/gsap-root-clock | related | 1 | core:S032 |
| source:css | CSS | https://gsap.com/docs/v3/GSAP/CorePlugins/CSS | Fundamentals > CSS | css-animation | /fundamentals/css-animation | primary | 1 | core:S033, plugin:#10 |
| source:attributes | Attributes | https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes | GSAP > Internal Plugins | non-css-target-values | /fundamentals/non-css-target-values | primary | 1 | core:S034, plugin:#9 |
| source:end-array | EndArray | https://gsap.com/docs/v3/GSAP/CorePlugins/EndArray | GSAP > Internal Plugins | non-css-target-values | /fundamentals/non-css-target-values | related | 1 | core:S035, plugin:#11 |
| source:modifiers | Modifiers | https://gsap.com/docs/v3/GSAP/CorePlugins/Modifiers | GSAP > Internal Plugins | modifiers-snap-wrap | /fundamentals/modifiers-snap-wrap | primary | 1 | core:S036, plugin:#12 |
| source:snap-plugin | Snap | https://gsap.com/docs/v3/GSAP/CorePlugins/Snap | GSAP > Internal Plugins | modifiers-snap-wrap | /fundamentals/modifiers-snap-wrap | related | 1 | core:S037, plugin:#13 |
| source:tween | Tween | https://gsap.com/docs/v3/GSAP/Tween | Fundamentals > Tween | tween-instance | /fundamentals/tween-instance | primary | 1 | core:S038 |
| source:tween-data | data | https://gsap.com/docs/v3/GSAP/Tween/data | Fundamentals > Tween | tween-instance | /fundamentals/tween-instance | related | 1 | core:S039 |
| source:tween-ratio | ratio | https://gsap.com/docs/v3/GSAP/Tween/ratio | Fundamentals > Tween | tween-playhead | /fundamentals/tween-playhead | primary | 1 | core:S040 |
| source:tween-scroll-trigger | scrollTrigger | https://gsap.com/docs/v3/GSAP/Tween/scrollTrigger | Fundamentals > Tween | tween-instance | /fundamentals/tween-instance | related | 1 | core:S041 |
| source:tween-vars | vars | https://gsap.com/docs/v3/GSAP/Tween/vars | Fundamentals > Tween | tween-configuration | /fundamentals/tween-configuration | related | 1 | core:S042 |
| source:tween-delay | delay | https://gsap.com/docs/v3/GSAP/Tween/delay() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | primary | 1 | core:S043 |
| source:tween-duration | duration | https://gsap.com/docs/v3/GSAP/Tween/duration() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | related | 1 | core:S044 |
| source:tween-end-time | endTime | https://gsap.com/docs/v3/GSAP/Tween/endTime() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | related | 1 | core:S045 |
| source:tween-event-callback | eventCallback | https://gsap.com/docs/v3/GSAP/Tween/eventCallback() | Fundamentals > Tween | tween-callbacks-promise | /fundamentals/tween-callbacks-promise | primary | 1 | core:S046 |
| source:tween-global-time | globalTime | https://gsap.com/docs/v3/GSAP/Tween/globalTime() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | related | 1 | core:S047 |
| source:tween-invalidate | invalidate | https://gsap.com/docs/v3/GSAP/Tween/invalidate() | Fundamentals > Tween | tween-repeats | /fundamentals/tween-repeats | primary | 1 | core:S048 |
| source:tween-is-active | isActive | https://gsap.com/docs/v3/GSAP/Tween/isActive() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | primary | 1 | core:S049 |
| source:tween-iteration | iteration | https://gsap.com/docs/v3/GSAP/Tween/iteration() | Fundamentals > Tween | tween-repeats | /fundamentals/tween-repeats | related | 1 | core:S050 |
| source:tween-kill | kill | https://gsap.com/docs/v3/GSAP/Tween/kill() | Fundamentals > Tween | find-stop-animations | /fundamentals/find-stop-animations | related | 1 | core:S051 |
| source:tween-pause | pause | https://gsap.com/docs/v3/GSAP/Tween/pause() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S052 |
| source:tween-paused | paused | https://gsap.com/docs/v3/GSAP/Tween/paused() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S053 |
| source:tween-play | play | https://gsap.com/docs/v3/GSAP/Tween/play() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S054 |
| source:tween-progress | progress | https://gsap.com/docs/v3/GSAP/Tween/progress() | Fundamentals > Tween | tween-playhead | /fundamentals/tween-playhead | related | 1 | core:S055 |
| source:tween-repeat | repeat | https://gsap.com/docs/v3/GSAP/Tween/repeat() | Fundamentals > Tween | tween-repeats | /fundamentals/tween-repeats | related | 1 | core:S056 |
| source:tween-repeat-delay | repeatDelay | https://gsap.com/docs/v3/GSAP/Tween/repeatDelay() | Fundamentals > Tween | tween-repeats | /fundamentals/tween-repeats | related | 1 | core:S057 |
| source:tween-restart | restart | https://gsap.com/docs/v3/GSAP/Tween/restart() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S058 |
| source:tween-resume | resume | https://gsap.com/docs/v3/GSAP/Tween/resume() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S059 |
| source:tween-reverse | reverse | https://gsap.com/docs/v3/GSAP/Tween/reverse() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S060 |
| source:tween-reversed | reversed | https://gsap.com/docs/v3/GSAP/Tween/reversed() | Fundamentals > Tween | tween-playback-controls | /fundamentals/tween-playback-controls | related | 1 | core:S061 |
| source:tween-revert | revert | https://gsap.com/docs/v3/GSAP/Tween/revert() | Fundamentals > Tween | find-stop-animations | /fundamentals/find-stop-animations | related | 1 | core:S062 |
| source:tween-seek | seek | https://gsap.com/docs/v3/GSAP/Tween/seek() | Fundamentals > Tween | tween-playhead | /fundamentals/tween-playhead | related | 1 | core:S063 |
| source:tween-start-time | startTime | https://gsap.com/docs/v3/GSAP/Tween/startTime() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | related | 1 | core:S064 |
| source:tween-targets | targets | https://gsap.com/docs/v3/GSAP/Tween/targets() | Fundamentals > Tween | tween-instance | /fundamentals/tween-instance | related | 1 | core:S065 |
| source:tween-then | then | https://gsap.com/docs/v3/GSAP/Tween/then() | Fundamentals > Tween | tween-callbacks-promise | /fundamentals/tween-callbacks-promise | related | 1 | core:S066 |
| source:tween-time | time | https://gsap.com/docs/v3/GSAP/Tween/time() | Fundamentals > Tween | tween-playhead | /fundamentals/tween-playhead | related | 1 | core:S067 |
| source:tween-time-scale | timeScale | https://gsap.com/docs/v3/GSAP/Tween/timeScale() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | related | 1 | core:S068 |
| source:tween-total-duration | totalDuration | https://gsap.com/docs/v3/GSAP/Tween/totalDuration() | Fundamentals > Tween | tween-timing-math | /fundamentals/tween-timing-math | related | 1 | core:S069 |
| source:tween-total-progress | totalProgress | https://gsap.com/docs/v3/GSAP/Tween/totalProgress() | Fundamentals > Tween | tween-playhead | /fundamentals/tween-playhead | related | 1 | core:S070 |
| source:tween-total-time | totalTime | https://gsap.com/docs/v3/GSAP/Tween/totalTime() | Fundamentals > Tween | tween-playhead | /fundamentals/tween-playhead | related | 1 | core:S071 |
| source:tween-yoyo | yoyo | https://gsap.com/docs/v3/GSAP/Tween/yoyo() | Fundamentals > Tween | tween-repeats | /fundamentals/tween-repeats | related | 1 | core:S072 |
| source:timeline | Timeline | https://gsap.com/docs/v3/GSAP/Timeline | Fundamentals > Timeline | timeline-basics | /fundamentals/timeline-basics | related | 1 | core:S073 |
| source:timeline-auto-remove-children | autoRemoveChildren | https://gsap.com/docs/v3/GSAP/Timeline/autoRemoveChildren | Fundamentals > Timeline | timeline-cleanup | /fundamentals/timeline-cleanup | primary | 1 | core:S074 |
| source:timeline-data | data | https://gsap.com/docs/v3/GSAP/Timeline/data | Fundamentals > Timeline | timeline-inspection | /fundamentals/timeline-inspection | primary | 1 | core:S075 |
| source:timeline-labels | labels | https://gsap.com/docs/v3/GSAP/Timeline/labels | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | primary | 1 | core:S076 |
| source:timeline-parent | parent | https://gsap.com/docs/v3/GSAP/Timeline/parent | Fundamentals > Timeline | timeline-child-placement | /fundamentals/timeline-child-placement | primary | 1 | core:S077 |
| source:timeline-scroll-trigger | scrollTrigger | https://gsap.com/docs/v3/GSAP/Timeline/scrollTrigger | Fundamentals > Timeline | timeline-inspection | /fundamentals/timeline-inspection | related | 1 | core:S078 |
| source:timeline-smooth-child-timing | smoothChildTiming | https://gsap.com/docs/v3/GSAP/Timeline/smoothChildTiming | Fundamentals > Timeline | timeline-child-placement | /fundamentals/timeline-child-placement | related | 1 | core:S079 |
| source:timeline-vars | vars | https://gsap.com/docs/v3/GSAP/Timeline/vars | Fundamentals > Timeline | timeline-basics | /fundamentals/timeline-basics | related | 1 | core:S080 |
| source:timeline-add | add | https://gsap.com/docs/v3/GSAP/Timeline/add() | Fundamentals > Timeline | timeline-child-placement | /fundamentals/timeline-child-placement | related | 1 | core:S081 |
| source:timeline-add-label | addLabel | https://gsap.com/docs/v3/GSAP/Timeline/addLabel() | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | related | 1 | core:S082 |
| source:timeline-add-pause | addPause | https://gsap.com/docs/v3/GSAP/Timeline/addPause() | Fundamentals > Timeline | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | related | 1 | core:S083 |
| source:timeline-call | call | https://gsap.com/docs/v3/GSAP/Timeline/call() | Fundamentals > Timeline | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | related | 1 | core:S084 |
| source:timeline-clear | clear | https://gsap.com/docs/v3/GSAP/Timeline/clear() | Fundamentals > Timeline | timeline-cleanup | /fundamentals/timeline-cleanup | related | 1 | core:S085 |
| source:timeline-current-label | currentLabel | https://gsap.com/docs/v3/GSAP/Timeline/currentLabel() | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | related | 1 | core:S086 |
| source:timeline-delay | delay | https://gsap.com/docs/v3/GSAP/Timeline/delay() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | primary | 1 | core:S087 |
| source:timeline-duration | duration | https://gsap.com/docs/v3/GSAP/Timeline/duration() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | related | 1 | core:S088 |
| source:timeline-end-time | endTime | https://gsap.com/docs/v3/GSAP/Timeline/endTime() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | related | 1 | core:S089 |
| source:timeline-event-callback | eventCallback | https://gsap.com/docs/v3/GSAP/Timeline/eventCallback() | Fundamentals > Timeline | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | related | 1 | core:S090 |
| source:timeline-from | from | https://gsap.com/docs/v3/GSAP/Timeline/from() | Fundamentals > Timeline | timeline-basics | /fundamentals/timeline-basics | related | 1 | core:S091 |
| source:timeline-from-to | fromTo | https://gsap.com/docs/v3/GSAP/Timeline/fromTo() | Fundamentals > Timeline | timeline-basics | /fundamentals/timeline-basics | related | 1 | core:S092 |
| source:timeline-get-by-id | getById | https://gsap.com/docs/v3/GSAP/Timeline/getById() | Fundamentals > Timeline | timeline-inspection | /fundamentals/timeline-inspection | related | 1 | core:S093 |
| source:timeline-get-children | getChildren | https://gsap.com/docs/v3/GSAP/Timeline/getChildren() | Fundamentals > Timeline | timeline-inspection | /fundamentals/timeline-inspection | related | 1 | core:S094 |
| source:timeline-get-tweens-of | getTweensOf | https://gsap.com/docs/v3/GSAP/Timeline/getTweensOf() | Fundamentals > Timeline | timeline-inspection | /fundamentals/timeline-inspection | related | 1 | core:S095 |
| source:timeline-global-time | globalTime | https://gsap.com/docs/v3/GSAP/Timeline/globalTime() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | related | 1 | core:S096 |
| source:timeline-invalidate | invalidate | https://gsap.com/docs/v3/GSAP/Timeline/invalidate() | Fundamentals > Timeline | timeline-repeats | /fundamentals/timeline-repeats | primary | 1 | core:S097 |
| source:timeline-is-active | isActive | https://gsap.com/docs/v3/GSAP/Timeline/isActive() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | primary | 1 | core:S098 |
| source:timeline-iteration | iteration | https://gsap.com/docs/v3/GSAP/Timeline/iteration() | Fundamentals > Timeline | timeline-repeats | /fundamentals/timeline-repeats | related | 1 | core:S099 |
| source:timeline-kill | kill | https://gsap.com/docs/v3/GSAP/Timeline/kill() | Fundamentals > Timeline | timeline-cleanup | /fundamentals/timeline-cleanup | related | 1 | core:S100 |
| source:timeline-kill-tweens-of | killTweensOf | https://gsap.com/docs/v3/GSAP/Timeline/killTweensOf() | Fundamentals > Timeline | timeline-cleanup | /fundamentals/timeline-cleanup | related | 1 | core:S101 |
| source:timeline-next-label | nextLabel | https://gsap.com/docs/v3/GSAP/Timeline/nextLabel() | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | related | 1 | core:S102 |
| source:timeline-pause | pause | https://gsap.com/docs/v3/GSAP/Timeline/pause() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S103 |
| source:timeline-paused | paused | https://gsap.com/docs/v3/GSAP/Timeline/paused() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S104 |
| source:timeline-play | play | https://gsap.com/docs/v3/GSAP/Timeline/play() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S105 |
| source:timeline-previous-label | previousLabel | https://gsap.com/docs/v3/GSAP/Timeline/previousLabel() | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | related | 1 | core:S106 |
| source:timeline-progress | progress | https://gsap.com/docs/v3/GSAP/Timeline/progress() | Fundamentals > Timeline | timeline-playhead | /fundamentals/timeline-playhead | primary | 1 | core:S107 |
| source:timeline-recent | recent | https://gsap.com/docs/v3/GSAP/Timeline/recent() | Fundamentals > Timeline | timeline-child-placement | /fundamentals/timeline-child-placement | related | 1 | core:S108 |
| source:timeline-remove | remove | https://gsap.com/docs/v3/GSAP/Timeline/remove() | Fundamentals > Timeline | timeline-cleanup | /fundamentals/timeline-cleanup | related | 1 | core:S109 |
| source:timeline-remove-label | removeLabel | https://gsap.com/docs/v3/GSAP/Timeline/removeLabel() | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | related | 1 | core:S110 |
| source:timeline-remove-pause | removePause | https://gsap.com/docs/v3/GSAP/Timeline/removePause() | Fundamentals > Timeline | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | related | 1 | core:S111 |
| source:timeline-repeat | repeat | https://gsap.com/docs/v3/GSAP/Timeline/repeat() | Fundamentals > Timeline | timeline-repeats | /fundamentals/timeline-repeats | related | 1 | core:S112 |
| source:timeline-repeat-delay | repeatDelay | https://gsap.com/docs/v3/GSAP/Timeline/repeatDelay() | Fundamentals > Timeline | timeline-repeats | /fundamentals/timeline-repeats | related | 1 | core:S113 |
| source:timeline-restart | restart | https://gsap.com/docs/v3/GSAP/Timeline/restart() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S114 |
| source:timeline-resume | resume | https://gsap.com/docs/v3/GSAP/Timeline/resume() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S115 |
| source:timeline-reverse | reverse | https://gsap.com/docs/v3/GSAP/Timeline/reverse() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S116 |
| source:timeline-reversed | reversed | https://gsap.com/docs/v3/GSAP/Timeline/reversed() | Fundamentals > Timeline | timeline-playback-controls | /fundamentals/timeline-playback-controls | related | 1 | core:S117 |
| source:timeline-revert | revert | https://gsap.com/docs/v3/GSAP/Timeline/revert() | Fundamentals > Timeline | timeline-cleanup | /fundamentals/timeline-cleanup | related | 1 | core:S118 |
| source:timeline-seek | seek | https://gsap.com/docs/v3/GSAP/Timeline/seek() | Fundamentals > Timeline | timeline-labels | /fundamentals/timeline-labels | related | 1 | core:S119 |
| source:timeline-set | set | https://gsap.com/docs/v3/GSAP/Timeline/set() | Fundamentals > Timeline | timeline-basics | /fundamentals/timeline-basics | related | 1 | core:S120 |
| source:timeline-shift-children | shiftChildren | https://gsap.com/docs/v3/GSAP/Timeline/shiftChildren() | Fundamentals > Timeline | timeline-child-placement | /fundamentals/timeline-child-placement | related | 1 | core:S121 |
| source:timeline-start-time | startTime | https://gsap.com/docs/v3/GSAP/Timeline/startTime() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | related | 1 | core:S122 |
| source:timeline-then | then | https://gsap.com/docs/v3/GSAP/Timeline/then() | Fundamentals > Timeline | timeline-callbacks-pauses | /fundamentals/timeline-callbacks-pauses | related | 1 | core:S123 |
| source:timeline-time | time | https://gsap.com/docs/v3/GSAP/Timeline/time() | Fundamentals > Timeline | timeline-playhead | /fundamentals/timeline-playhead | related | 1 | core:S124 |
| source:timeline-time-scale | timeScale | https://gsap.com/docs/v3/GSAP/Timeline/timeScale() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | related | 1 | core:S125 |
| source:timeline-to | to | https://gsap.com/docs/v3/GSAP/Timeline/to() | Fundamentals > Timeline | timeline-basics | /fundamentals/timeline-basics | related | 1 | core:S126 |
| source:timeline-total-duration | totalDuration | https://gsap.com/docs/v3/GSAP/Timeline/totalDuration() | Fundamentals > Timeline | timeline-timing-math | /fundamentals/timeline-timing-math | related | 1 | core:S127 |
| source:timeline-total-progress | totalProgress | https://gsap.com/docs/v3/GSAP/Timeline/totalProgress() | Fundamentals > Timeline | timeline-playhead | /fundamentals/timeline-playhead | related | 1 | core:S128 |
| source:timeline-total-time | totalTime | https://gsap.com/docs/v3/GSAP/Timeline/totalTime() | Fundamentals > Timeline | timeline-playhead | /fundamentals/timeline-playhead | related | 1 | core:S129 |
| source:timeline-tween-from-to | tweenFromTo | https://gsap.com/docs/v3/GSAP/Timeline/tweenFromTo() | Fundamentals > Timeline | timeline-playhead | /fundamentals/timeline-playhead | related | 1 | core:S130 |
| source:timeline-tween-to | tweenTo | https://gsap.com/docs/v3/GSAP/Timeline/tweenTo() | Fundamentals > Timeline | timeline-playhead | /fundamentals/timeline-playhead | related | 1 | core:S131 |
| source:timeline-yoyo | yoyo | https://gsap.com/docs/v3/GSAP/Timeline/yoyo() | Fundamentals > Timeline | timeline-repeats | /fundamentals/timeline-repeats | related | 1 | core:S132 |
| source:utility-methods | Utility Methods | https://gsap.com/docs/v3/GSAP/UtilityMethods | Useful features & tools > Utility Methods | gsap-utils | /fundamentals/gsap-utils | related | 1 | core:S133 |
| source:utils-check-prefix | checkPrefix | https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix() | Useful features & tools > Utility Methods | utility-pipelines-units | /fundamentals/utility-pipelines-units | primary | 1 | core:S134 |
| source:utils-clamp | clamp | https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp() | Useful features & tools > Utility Methods | range-interpolation | /fundamentals/range-interpolation | primary | 1 | core:S135 |
| source:utils-distribute | distribute | https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute() | Useful features & tools > Utility Methods | utility-distribute | /fundamentals/utility-distribute | primary | 1 | core:S136 |
| source:utils-get-unit | getUnit | https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit() | Useful features & tools > Utility Methods | utility-pipelines-units | /fundamentals/utility-pipelines-units | related | 1 | core:S137 |
| source:utils-interpolate | interpolate | https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate() | Useful features & tools > Utility Methods | range-interpolation | /fundamentals/range-interpolation | related | 1 | core:S138 |
| source:utils-map-range | mapRange | https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange() | Useful features & tools > Utility Methods | range-interpolation | /fundamentals/range-interpolation | related | 1 | core:S139 |
| source:utils-normalize | normalize | https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize() | Useful features & tools > Utility Methods | range-interpolation | /fundamentals/range-interpolation | related | 1 | core:S140 |
| source:utils-pipe | pipe | https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe() | Useful features & tools > Utility Methods | utility-pipelines-units | /fundamentals/utility-pipelines-units | related | 1 | core:S141 |
| source:utils-random | random | https://gsap.com/docs/v3/GSAP/UtilityMethods/random() | Useful features & tools > Utility Methods | utility-collections-random | /fundamentals/utility-collections-random | primary | 1 | core:S142 |
| source:utils-selector | selector | https://gsap.com/docs/v3/GSAP/UtilityMethods/selector() | Useful features & tools > Utility Methods | gsap-context | /fundamentals/gsap-context | related | 1 | core:S143 |
| source:utils-shuffle | shuffle | https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle() | Useful features & tools > Utility Methods | utility-collections-random | /fundamentals/utility-collections-random | related | 1 | core:S144 |
| source:utils-snap | snap | https://gsap.com/docs/v3/GSAP/UtilityMethods/snap() | Useful features & tools > Utility Methods | modifiers-snap-wrap | /fundamentals/modifiers-snap-wrap | related | 1 | core:S145 |
| source:utils-split-color | splitColor | https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor() | Useful features & tools > Utility Methods | range-interpolation | /fundamentals/range-interpolation | related | 1 | core:S146 |
| source:utils-to-array | toArray | https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray() | Useful features & tools > Utility Methods | utility-collections-random | /fundamentals/utility-collections-random | related | 1 | core:S147 |
| source:utils-unitize | unitize | https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize() | Useful features & tools > Utility Methods | utility-pipelines-units | /fundamentals/utility-pipelines-units | related | 1 | core:S148 |
| source:utils-wrap | wrap | https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap() | Useful features & tools > Utility Methods | modifiers-snap-wrap | /fundamentals/modifiers-snap-wrap | related | 1 | core:S149 |
| source:utils-wrap-yoyo | wrapYoyo | https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo() | Useful features & tools > Utility Methods | modifiers-snap-wrap | /fundamentals/modifiers-snap-wrap | related | 1 | core:S150 |
| source:easing | Easing | https://gsap.com/docs/v3/Eases | Fundamentals > Easing | easing | /fundamentals/easing | primary | 1 | core:S151, plugin:#1 |
| source:custom-bounce | CustomBounce | https://gsap.com/docs/v3/Eases/CustomBounce | Fundamentals > Easing | custom-bounce-wiggle | /fundamentals/custom-bounce-wiggle | primary | 1 | core:S152, plugin:#2 |
| source:custom-ease | CustomEase | https://gsap.com/docs/v3/Eases/CustomEase | Fundamentals > Easing | custom-ease | /fundamentals/custom-ease | primary | 1 | core:S153, plugin:#3 |
| source:custom-wiggle | CustomWiggle | https://gsap.com/docs/v3/Eases/CustomWiggle | Fundamentals > Easing | custom-bounce-wiggle | /fundamentals/custom-bounce-wiggle | related | 1 | core:S154, plugin:#4 |
| source:expo-scale-ease | ExpoScaleEase | https://gsap.com/docs/v3/Eases/ExpoScaleEase | Fundamentals > Easing | ease-pack | /fundamentals/ease-pack | primary | 1 | core:S155, plugin:#5 |
| source:rough-ease | RoughEase | https://gsap.com/docs/v3/Eases/RoughEase | Fundamentals > Easing | ease-pack | /fundamentals/ease-pack | related | 1 | core:S156, plugin:#6 |
| source:slow-mo | SlowMo | https://gsap.com/docs/v3/Eases/SlowMo | Fundamentals > Easing | ease-pack | /fundamentals/ease-pack | related | 1 | core:S157, plugin:#7 |
| source:stepped-ease | SteppedEase | https://gsap.com/docs/v3/Eases/SteppedEase | Fundamentals > Easing | easing | /fundamentals/easing | related | 1 | core:S158, plugin:#8 |
| source:react-use-gsap | React | https://gsap.com/resources/React | Useful features & tools > React - useGSAP() | react-use-gsap | /fundamentals/react-use-gsap | primary | 1 | core:S159, plugin:#218 |
| source:motion-path-helper-kill | MotionPathHelper.kill() | https://gsap.com/docs/v3/MotionPathHelper/kill()/ | SVG | motion-path-helper | /fundamentals/motion-path-helper | related | 1 | plugin:#15 |
| source:motion-path-helper-static-edit-path | MotionPathHelper.editPath() | https://gsap.com/docs/v3/MotionPathHelper/static.editPath()/ | SVG | motion-path-helper | /fundamentals/motion-path-helper | related | 1 | plugin:#16 |
| source:plugins-overview | Plugins overview | https://gsap.com/docs/v3/Plugins/ | Plugins | plugins | /fundamentals/plugins | primary | 1 | plugin:#17 |
| source:css-rule-plugin | CSSRulePlugin | https://gsap.com/docs/v3/Plugins/CSSRulePlugin/ | Plugins — uncategorized in current overview | css-rule-plugin | /fundamentals/css-rule-plugin | primary | 1 | plugin:#18 |
| source:css-rule-plugin-static-get-rule | CSSRulePlugin.getRule() | https://gsap.com/docs/v3/Plugins/CSSRulePlugin/methods/static-getRule()/ | Plugins — uncategorized in current overview | css-rule-plugin | /fundamentals/css-rule-plugin | related | 1 | plugin:#19 |
| source:draggable | Draggable | https://gsap.com/docs/v3/Plugins/Draggable/ | UI | draggable-create | /fundamentals/draggable-create | primary | 1 | plugin:#20 |
| source:draggable-add-event-listener | Draggable.addEventListener() | https://gsap.com/docs/v3/Plugins/Draggable/addEventListener()/ | UI | draggable-events | /fundamentals/draggable-events | primary | 1 | plugin:#21 |
| source:draggable-apply-bounds | Draggable.applyBounds() | https://gsap.com/docs/v3/Plugins/Draggable/applyBounds()/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | primary | 1 | plugin:#22 |
| source:draggable-auto-scroll | Draggable.autoScroll | https://gsap.com/docs/v3/Plugins/Draggable/autoScroll/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#23 |
| source:draggable-delta-x | Draggable.deltaX | https://gsap.com/docs/v3/Plugins/Draggable/deltaX/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | primary | 1 | plugin:#24 |
| source:draggable-delta-y | Draggable.deltaY | https://gsap.com/docs/v3/Plugins/Draggable/deltaY/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#25 |
| source:draggable-disable | Draggable.disable() | https://gsap.com/docs/v3/Plugins/Draggable/disable()/ | UI | draggable-lifecycle | /fundamentals/draggable-lifecycle | primary | 1 | plugin:#26 |
| source:draggable-enable | Draggable.enable() | https://gsap.com/docs/v3/Plugins/Draggable/enable()/ | UI | draggable-lifecycle | /fundamentals/draggable-lifecycle | related | 1 | plugin:#27 |
| source:draggable-enabled | Draggable.enabled() | https://gsap.com/docs/v3/Plugins/Draggable/enabled()/ | UI | draggable-lifecycle | /fundamentals/draggable-lifecycle | related | 1 | plugin:#28 |
| source:draggable-end-drag | Draggable.endDrag() | https://gsap.com/docs/v3/Plugins/Draggable/endDrag()/ | UI | draggable-lifecycle | /fundamentals/draggable-lifecycle | related | 1 | plugin:#29 |
| source:draggable-end-rotation | Draggable.endRotation | https://gsap.com/docs/v3/Plugins/Draggable/endRotation/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#30 |
| source:draggable-end-x | Draggable.endX | https://gsap.com/docs/v3/Plugins/Draggable/endX/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#31 |
| source:draggable-end-y | Draggable.endY | https://gsap.com/docs/v3/Plugins/Draggable/endY/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#32 |
| source:draggable-get-direction | Draggable.getDirection() | https://gsap.com/docs/v3/Plugins/Draggable/getDirection()/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#33 |
| source:draggable-is-pressed | Draggable.isPressed | https://gsap.com/docs/v3/Plugins/Draggable/isPressed/ | UI | draggable-events | /fundamentals/draggable-events | related | 1 | plugin:#34 |
| source:draggable-is-throwing | Draggable.isThrowing | https://gsap.com/docs/v3/Plugins/Draggable/isThrowing/ | UI | draggable-collision-momentum | /fundamentals/draggable-collision-momentum | primary | 1 | plugin:#35 |
| source:draggable-kill | Draggable.kill() | https://gsap.com/docs/v3/Plugins/Draggable/kill()/ | UI | draggable-lifecycle | /fundamentals/draggable-lifecycle | related | 1 | plugin:#36 |
| source:draggable-lock-axis | Draggable.lockAxis | https://gsap.com/docs/v3/Plugins/Draggable/lockAxis/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#37 |
| source:draggable-locked-axis | Draggable.lockedAxis | https://gsap.com/docs/v3/Plugins/Draggable/lockedAxis/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#38 |
| source:draggable-max-rotation | Draggable.maxRotation | https://gsap.com/docs/v3/Plugins/Draggable/maxRotation/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#39 |
| source:draggable-max-x | Draggable.maxX | https://gsap.com/docs/v3/Plugins/Draggable/maxX/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#40 |
| source:draggable-max-y | Draggable.maxY | https://gsap.com/docs/v3/Plugins/Draggable/maxY/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#41 |
| source:draggable-min-rotation | Draggable.minRotation | https://gsap.com/docs/v3/Plugins/Draggable/minRotation/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#42 |
| source:draggable-min-x | Draggable.minX | https://gsap.com/docs/v3/Plugins/Draggable/minX/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#43 |
| source:draggable-min-y | Draggable.minY | https://gsap.com/docs/v3/Plugins/Draggable/minY/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#44 |
| source:draggable-pointer-event | Draggable.pointerEvent | https://gsap.com/docs/v3/Plugins/Draggable/pointerEvent/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#45 |
| source:draggable-pointer-x | Draggable.pointerX | https://gsap.com/docs/v3/Plugins/Draggable/pointerX/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#46 |
| source:draggable-pointer-y | Draggable.pointerY | https://gsap.com/docs/v3/Plugins/Draggable/pointerY/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#47 |
| source:draggable-rotation | Draggable.rotation | https://gsap.com/docs/v3/Plugins/Draggable/rotation/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#48 |
| source:draggable-start-drag | Draggable.startDrag() | https://gsap.com/docs/v3/Plugins/Draggable/startDrag()/ | UI | draggable-lifecycle | /fundamentals/draggable-lifecycle | related | 1 | plugin:#49 |
| source:draggable-start-x | Draggable.startX | https://gsap.com/docs/v3/Plugins/Draggable/startX/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#50 |
| source:draggable-start-y | Draggable.startY | https://gsap.com/docs/v3/Plugins/Draggable/startY/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#51 |
| source:draggable-static-create | Draggable.create() | https://gsap.com/docs/v3/Plugins/Draggable/static.create()/ | UI | draggable-create | /fundamentals/draggable-create | related | 1 | plugin:#52 |
| source:draggable-static-get | Draggable.get() | https://gsap.com/docs/v3/Plugins/Draggable/static.get()/ | UI | draggable-create | /fundamentals/draggable-create | related | 1 | plugin:#53 |
| source:draggable-static-hit-test | Draggable.hitTest() | https://gsap.com/docs/v3/Plugins/Draggable/static.hitTest()/ | UI | draggable-collision-momentum | /fundamentals/draggable-collision-momentum | related | 1 | plugin:#54 |
| source:draggable-static-time-since-drag | Draggable.timeSinceDrag() | https://gsap.com/docs/v3/Plugins/Draggable/static.timeSinceDrag()/ | UI | draggable-events | /fundamentals/draggable-events | related | 1 | plugin:#55 |
| source:draggable-target | Draggable.target | https://gsap.com/docs/v3/Plugins/Draggable/target/ | UI | draggable-create | /fundamentals/draggable-create | related | 1 | plugin:#56 |
| source:draggable-tween | Draggable.tween | https://gsap.com/docs/v3/Plugins/Draggable/tween/ | UI | draggable-collision-momentum | /fundamentals/draggable-collision-momentum | related | 1 | plugin:#57 |
| source:draggable-update | Draggable.update() | https://gsap.com/docs/v3/Plugins/Draggable/update()/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#58 |
| source:draggable-vars | Draggable.vars | https://gsap.com/docs/v3/Plugins/Draggable/vars/ | UI | draggable-create | /fundamentals/draggable-create | related | 1 | plugin:#59 |
| source:draggable-x | Draggable.x | https://gsap.com/docs/v3/Plugins/Draggable/x/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#60 |
| source:draggable-y | Draggable.y | https://gsap.com/docs/v3/Plugins/Draggable/y/ | UI | draggable-coordinates | /fundamentals/draggable-coordinates | related | 1 | plugin:#61 |
| source:draggable-z-index | Draggable.zIndex | https://gsap.com/docs/v3/Plugins/Draggable/zIndex/ | UI | draggable-bounds-axis | /fundamentals/draggable-bounds-axis | related | 1 | plugin:#62 |
| source:draw-svg | DrawSVG | https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/ | SVG | draw-svg | /fundamentals/draw-svg | primary | 1 | plugin:#63 |
| source:draw-svg-static-get-length | DrawSVG.getLength() | https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/static.getLength()/ | SVG | draw-svg | /fundamentals/draw-svg | related | 1 | plugin:#64 |
| source:draw-svg-static-get-position | DrawSVG.getPosition() | https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/static.getPosition()/ | SVG | draw-svg | /fundamentals/draw-svg | related | 1 | plugin:#65 |
| source:easel | Easel | https://gsap.com/docs/v3/Plugins/EaselPlugin/ | Other | easel-plugin | /fundamentals/easel-plugin | primary | 1 | plugin:#66 |
| source:flip | Flip | https://gsap.com/docs/v3/Plugins/Flip/ | UI | flip-first-last | /fundamentals/flip-first-last | primary | 1 | plugin:#67 |
| source:flip-static-batch | Flip.batch() | https://gsap.com/docs/v3/Plugins/Flip/static.batch()/ | UI | flip-batch-interrupt | /fundamentals/flip-batch-interrupt | primary | 1 | plugin:#68 |
| source:flip-static-fit | Flip.fit() | https://gsap.com/docs/v3/Plugins/Flip/static.fit()/ | UI | flip-fit-absolute | /fundamentals/flip-fit-absolute | primary | 1 | plugin:#69 |
| source:flip-static-from | Flip.from() | https://gsap.com/docs/v3/Plugins/Flip/static.from()/ | UI | flip-first-last | /fundamentals/flip-first-last | related | 1 | plugin:#70 |
| source:flip-static-get-state | Flip.getState() | https://gsap.com/docs/v3/Plugins/Flip/static.getState()/ | UI | flip-first-last | /fundamentals/flip-first-last | related | 1 | plugin:#71 |
| source:flip-static-is-flipping | Flip.isFlipping() | https://gsap.com/docs/v3/Plugins/Flip/static.isFlipping()/ | UI | flip-batch-interrupt | /fundamentals/flip-batch-interrupt | related | 1 | plugin:#72 |
| source:flip-static-kill-flips-of | Flip.killFlipsOf() | https://gsap.com/docs/v3/Plugins/Flip/static.killFlipsOf()/ | UI | flip-batch-interrupt | /fundamentals/flip-batch-interrupt | related | 1 | plugin:#73 |
| source:flip-static-make-absolute | Flip.makeAbsolute() | https://gsap.com/docs/v3/Plugins/Flip/static.makeAbsolute()/ | UI | flip-fit-absolute | /fundamentals/flip-fit-absolute | related | 1 | plugin:#74 |
| source:flip-static-to | Flip.to() | https://gsap.com/docs/v3/Plugins/Flip/static.to()/ | UI | flip-first-last | /fundamentals/flip-first-last | related | 1 | plugin:#75 |
| source:gs-dev-tools | GSDevTools | https://gsap.com/docs/v3/Plugins/GSDevTools/ | Other | gsdevtools | /fundamentals/gsdevtools | primary | 1 | plugin:#76 |
| source:gs-dev-tools-static-create | GSDevTools.create() | https://gsap.com/docs/v3/Plugins/GSDevTools/static.create()/ | Other | gsdevtools | /fundamentals/gsdevtools | related | 1 | plugin:#77 |
| source:inertia | Inertia | https://gsap.com/docs/v3/Plugins/InertiaPlugin/ | UI | inertia | /fundamentals/inertia | primary | 1 | plugin:#78 |
| source:velocity-tracker | VelocityTracker | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/ | UI | velocity-tracker-lifecycle | /fundamentals/velocity-tracker-lifecycle | primary | 1 | plugin:#79 |
| source:velocity-tracker-add-prop | VelocityTracker.addProp() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.addProp()/ | UI | velocity-tracker-lifecycle | /fundamentals/velocity-tracker-lifecycle | related | 1 | plugin:#80 |
| source:velocity-tracker-get | VelocityTracker.get() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.get()/ | UI | velocity-tracker-read | /fundamentals/velocity-tracker-read | primary | 1 | plugin:#81 |
| source:velocity-tracker-get-by-target | VelocityTracker.getByTarget() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.getByTarget()/ | UI | velocity-tracker-read | /fundamentals/velocity-tracker-read | related | 1 | plugin:#82 |
| source:velocity-tracker-is-tracking | VelocityTracker.isTracking() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.isTracking()/ | UI | velocity-tracker-read | /fundamentals/velocity-tracker-read | related | 1 | plugin:#83 |
| source:velocity-tracker-is-tracking-prop | VelocityTracker.isTrackingProp() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.isTrackingProp()/ | UI | velocity-tracker-read | /fundamentals/velocity-tracker-read | related | 1 | plugin:#84 |
| source:velocity-tracker-remove-prop | VelocityTracker.removeProp() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.removeProp()/ | UI | velocity-tracker-lifecycle | /fundamentals/velocity-tracker-lifecycle | related | 1 | plugin:#85 |
| source:velocity-tracker-target | VelocityTracker.target | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.target/ | UI | velocity-tracker-read | /fundamentals/velocity-tracker-read | related | 1 | plugin:#86 |
| source:velocity-tracker-track | VelocityTracker.track | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.track/ | UI | velocity-tracker-lifecycle | /fundamentals/velocity-tracker-lifecycle | related | 1 | plugin:#87 |
| source:velocity-tracker-untrack | VelocityTracker.untrack() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/VelocityTracker/.untrack()/ | UI | velocity-tracker-lifecycle | /fundamentals/velocity-tracker-lifecycle | related | 1 | plugin:#88 |
| source:inertia-static-get-velocity | Inertia.getVelocity() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.getVelocity()/ | UI | inertia | /fundamentals/inertia | related | 1 | plugin:#89 |
| source:inertia-static-is-tracking | Inertia.isTracking() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.isTracking()/ | UI | inertia | /fundamentals/inertia | related | 1 | plugin:#90 |
| source:inertia-static-track | Inertia.track() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.track()/ | UI | inertia | /fundamentals/inertia | related | 1 | plugin:#91 |
| source:inertia-static-untrack | Inertia.untrack() | https://gsap.com/docs/v3/Plugins/InertiaPlugin/static.untrack()/ | UI | inertia | /fundamentals/inertia | related | 1 | plugin:#92 |
| source:morph-svg | MorphSVG | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/ | SVG | morph-svg | /fundamentals/morph-svg | primary | 1 | plugin:#93 |
| source:morph-svg-static-convert-to-path | MorphSVG.convertToPath | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.convertToPath/ | SVG | morph-svg-path-data | /fundamentals/morph-svg-path-data | primary | 1 | plugin:#94 |
| source:morph-svg-static-default-render | MorphSVG.defaultRender | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.defaultRender/ | SVG | morph-svg | /fundamentals/morph-svg | related | 1 | plugin:#95 |
| source:morph-svg-static-default-type | MorphSVG.defaultType | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.defaultType/ | SVG | morph-svg | /fundamentals/morph-svg | related | 1 | plugin:#96 |
| source:morph-svg-static-default-update-target | MorphSVG.defaultUpdateTarget | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.defaultUpdateTarget/ | SVG | morph-svg | /fundamentals/morph-svg | related | 1 | plugin:#97 |
| source:morph-svg-static-raw-path-to-string | MorphSVG.rawPathToString | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.rawPathToString/ | SVG | morph-svg-path-data | /fundamentals/morph-svg-path-data | related | 1 | plugin:#98 |
| source:morph-svg-static-string-to-raw-path | MorphSVG.stringToRawPath | https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/static.stringToRawPath/ | SVG | morph-svg-path-data | /fundamentals/morph-svg-path-data | related | 1 | plugin:#99 |
| source:motion-path-helper | MotionPathHelper | https://gsap.com/docs/v3/Plugins/MotionPathHelper/ | SVG | motion-path-helper | /fundamentals/motion-path-helper | primary | 1 | plugin:#100 |
| source:motion-path | MotionPath | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/ | SVG | motion-path | /fundamentals/motion-path | primary | 1 | plugin:#101 |
| source:motion-path-static-points-to-segment | MotionPath.pointsToSegment | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/methods/static-pointsToSegment/ | SVG | motion-path-data | /fundamentals/motion-path-data | primary | 1 | plugin:#102 |
| source:motion-path-static-array-to-raw-path | MotionPath.arrayToRawPath() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.arrayToRawPath()/ | SVG | motion-path-data | /fundamentals/motion-path-data | related | 1 | plugin:#103 |
| source:motion-path-static-convert-coordinates | MotionPath.convertCoordinates() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.convertCoordinates()/ | SVG | motion-path-coordinates | /fundamentals/motion-path-coordinates | primary | 1 | plugin:#104 |
| source:motion-path-static-convert-to-path | MotionPath.convertToPath() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.convertToPath()/ | SVG | motion-path-data | /fundamentals/motion-path-data | related | 1 | plugin:#105 |
| source:motion-path-static-get-align-matrix | MotionPath.getAlignMatrix() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getAlignMatrix()/ | SVG | motion-path-coordinates | /fundamentals/motion-path-coordinates | related | 1 | plugin:#106 |
| source:motion-path-static-get-global-matrix | MotionPath.getGlobalMatrix() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getGlobalMatrix()/ | SVG | motion-path-coordinates | /fundamentals/motion-path-coordinates | related | 1 | plugin:#107 |
| source:motion-path-static-get-length | MotionPath.getLength() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getLength()/ | SVG | motion-path-measure | /fundamentals/motion-path-measure | primary | 1 | plugin:#108 |
| source:motion-path-static-get-position-on-path | MotionPath.getPositionOnPath() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getPositionOnPath()/ | SVG | motion-path-measure | /fundamentals/motion-path-measure | related | 1 | plugin:#109 |
| source:motion-path-static-get-raw-path | MotionPath.getRawPath() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getRawPath()/ | SVG | motion-path-data | /fundamentals/motion-path-data | related | 1 | plugin:#110 |
| source:motion-path-static-get-relative-position | MotionPath.getRelativePosition() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.getRelativePosition()/ | SVG | motion-path-coordinates | /fundamentals/motion-path-coordinates | related | 1 | plugin:#111 |
| source:motion-path-static-raw-path-to-string | MotionPath.rawPathToString() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.rawPathToString()/ | SVG | motion-path-data | /fundamentals/motion-path-data | related | 1 | plugin:#112 |
| source:motion-path-static-slice-raw-path | MotionPath.sliceRawPath() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.sliceRawPath()/ | SVG | motion-path-measure | /fundamentals/motion-path-measure | related | 1 | plugin:#113 |
| source:motion-path-static-string-to-raw-path | MotionPath.stringToRawPath() | https://gsap.com/docs/v3/Plugins/MotionPathPlugin/static.stringToRawPath()/ | SVG | motion-path-data | /fundamentals/motion-path-data | related | 1 | plugin:#114 |
| source:observer | Observer | https://gsap.com/docs/v3/Plugins/Observer/ | UI | observer-create | /fundamentals/observer-create | primary | 1 | plugin:#115 |
| source:observer-delta-x | Observer.deltaX | https://gsap.com/docs/v3/Plugins/Observer/deltaX/ | UI | observer-signals | /fundamentals/observer-signals | primary | 1 | plugin:#116 |
| source:observer-delta-y | Observer.deltaY | https://gsap.com/docs/v3/Plugins/Observer/deltaY/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#117 |
| source:observer-disable | Observer.disable() | https://gsap.com/docs/v3/Plugins/Observer/disable()/ | UI | observer-lifecycle | /fundamentals/observer-lifecycle | primary | 1 | plugin:#118 |
| source:observer-enable | Observer.enable() | https://gsap.com/docs/v3/Plugins/Observer/enable()/ | UI | observer-lifecycle | /fundamentals/observer-lifecycle | related | 1 | plugin:#119 |
| source:observer-event | Observer.event | https://gsap.com/docs/v3/Plugins/Observer/event/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#120 |
| source:observer-is-dragging | Observer.isDragging | https://gsap.com/docs/v3/Plugins/Observer/isDragging/ | UI | observer-gesture-state | /fundamentals/observer-gesture-state | primary | 1 | plugin:#121 |
| source:observer-is-enabled | Observer.isEnabled | https://gsap.com/docs/v3/Plugins/Observer/isEnabled/ | UI | observer-lifecycle | /fundamentals/observer-lifecycle | related | 1 | plugin:#122 |
| source:observer-is-pressed | Observer.isPressed | https://gsap.com/docs/v3/Plugins/Observer/isPressed/ | UI | observer-gesture-state | /fundamentals/observer-gesture-state | related | 1 | plugin:#123 |
| source:observer-kill | Observer.kill() | https://gsap.com/docs/v3/Plugins/Observer/kill()/ | UI | observer-lifecycle | /fundamentals/observer-lifecycle | related | 1 | plugin:#124 |
| source:observer-start-x | Observer.startX | https://gsap.com/docs/v3/Plugins/Observer/startX/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#125 |
| source:observer-start-y | Observer.startY | https://gsap.com/docs/v3/Plugins/Observer/startY/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#126 |
| source:observer-static-create | Observer.create() | https://gsap.com/docs/v3/Plugins/Observer/static.create()/ | UI | observer-create | /fundamentals/observer-create | related | 1 | plugin:#127 |
| source:observer-static-get-all | Observer.getAll() | https://gsap.com/docs/v3/Plugins/Observer/static.getAll()/ | UI | observer-create | /fundamentals/observer-create | related | 1 | plugin:#128 |
| source:observer-static-get-by-id | Observer.getById() | https://gsap.com/docs/v3/Plugins/Observer/static.getById()/ | UI | observer-create | /fundamentals/observer-create | related | 1 | plugin:#129 |
| source:observer-static-is-touch | Observer.isTouch | https://gsap.com/docs/v3/Plugins/Observer/static.isTouch/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#130 |
| source:observer-target | Observer.target | https://gsap.com/docs/v3/Plugins/Observer/target/ | UI | observer-create | /fundamentals/observer-create | related | 1 | plugin:#131 |
| source:observer-vars | Observer.vars | https://gsap.com/docs/v3/Plugins/Observer/vars/ | UI | observer-create | /fundamentals/observer-create | related | 1 | plugin:#132 |
| source:observer-velocity-x | Observer.velocityX | https://gsap.com/docs/v3/Plugins/Observer/velocityX/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#133 |
| source:observer-velocity-y | Observer.velocityY | https://gsap.com/docs/v3/Plugins/Observer/velocityY/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#134 |
| source:observer-x | Observer.x | https://gsap.com/docs/v3/Plugins/Observer/x/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#135 |
| source:observer-y | Observer.y | https://gsap.com/docs/v3/Plugins/Observer/y/ | UI | observer-signals | /fundamentals/observer-signals | related | 1 | plugin:#136 |
| source:physics2-d | Physics2D | https://gsap.com/docs/v3/Plugins/Physics2DPlugin/ | Other | physics-motion | /fundamentals/physics-motion | primary | 1 | plugin:#137 |
| source:physics-props | PhysicsProps | https://gsap.com/docs/v3/Plugins/PhysicsPropsPlugin/ | Other | physics-motion | /fundamentals/physics-motion | related | 1 | plugin:#138 |
| source:pixi | Pixi | https://gsap.com/docs/v3/Plugins/PixiPlugin/ | Other | pixi-plugin | /fundamentals/pixi-plugin | primary | 1 | plugin:#139 |
| source:pixi-static-register-pixi | Pixi.registerPIXI() | https://gsap.com/docs/v3/Plugins/PixiPlugin/static.registerPIXI()/ | Other | pixi-plugin | /fundamentals/pixi-plugin | related | 1 | plugin:#140 |
| source:scramble-text | ScrambleText | https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/ | Text | scramble-text | /fundamentals/scramble-text | primary | 1 | plugin:#141 |
| source:scroll-smoother | ScrollSmoother | https://gsap.com/docs/v3/Plugins/ScrollSmoother/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | primary | 1 | plugin:#142 |
| source:scroll-smoother-content | ScrollSmoother.content() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/content()/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | related | 1 | plugin:#143 |
| source:scroll-smoother-effects | ScrollSmoother.effects() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/effects()/ | Scroll | scroll-smoother-effects | /fundamentals/scroll-smoother-effects | primary | 1 | plugin:#144 |
| source:scroll-smoother-get-velocity | ScrollSmoother.getVelocity() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/getVelocity()/ | Scroll | scroll-smoother-control | /fundamentals/scroll-smoother-control | primary | 1 | plugin:#145 |
| source:scroll-smoother-kill | ScrollSmoother.kill() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/kill()/ | Scroll | scroll-smoother-control | /fundamentals/scroll-smoother-control | related | 1 | plugin:#146 |
| source:scroll-smoother-offset | ScrollSmoother.offset() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/offset()/ | Scroll | scroll-smoother-control | /fundamentals/scroll-smoother-control | related | 1 | plugin:#147 |
| source:scroll-smoother-paused | ScrollSmoother.paused() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/paused()/ | Scroll | scroll-smoother-control | /fundamentals/scroll-smoother-control | related | 1 | plugin:#148 |
| source:scroll-smoother-progress | ScrollSmoother.progress | https://gsap.com/docs/v3/Plugins/ScrollSmoother/progress/ | Scroll | scroll-smoother-effects | /fundamentals/scroll-smoother-effects | related | 1 | plugin:#149 |
| source:scroll-smoother-scroll-to | ScrollSmoother.scrollTo() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTo()/ | Scroll | scroll-smoother-control | /fundamentals/scroll-smoother-control | related | 1 | plugin:#150 |
| source:scroll-smoother-scroll-top | ScrollSmoother.scrollTop() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTop()/ | Scroll | scroll-smoother-control | /fundamentals/scroll-smoother-control | related | 1 | plugin:#151 |
| source:scroll-smoother-scroll-trigger | ScrollSmoother.scrollTrigger | https://gsap.com/docs/v3/Plugins/ScrollSmoother/scrollTrigger/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | related | 1 | plugin:#152 |
| source:scroll-smoother-smooth | ScrollSmoother.smooth() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/smooth()/ | Scroll | scroll-smoother-effects | /fundamentals/scroll-smoother-effects | related | 1 | plugin:#153 |
| source:scroll-smoother-static-create | ScrollSmoother.create() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.create()/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | related | 1 | plugin:#154 |
| source:scroll-smoother-static-get | ScrollSmoother.get() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/static.get()/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | related | 1 | plugin:#155 |
| source:scroll-smoother-vars | ScrollSmoother.vars | https://gsap.com/docs/v3/Plugins/ScrollSmoother/vars/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | related | 1 | plugin:#156 |
| source:scroll-smoother-wrapper | ScrollSmoother.wrapper() | https://gsap.com/docs/v3/Plugins/ScrollSmoother/wrapper()/ | Scroll | scroll-smoother-create | /fundamentals/scroll-smoother-create | related | 1 | plugin:#157 |
| source:scroll-to | ScrollTo | https://gsap.com/docs/v3/Plugins/ScrollToPlugin/ | Scroll | scroll-to | /fundamentals/scroll-to | primary | 1 | plugin:#158 |
| source:scroll-to-config | ScrollTo.config() | https://gsap.com/docs/v3/Plugins/ScrollToPlugin/config()/ | Scroll | scroll-to | /fundamentals/scroll-to | related | 1 | plugin:#159 |
| source:scroll-trigger | ScrollTrigger | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | Scroll | scroll-trigger-create | /fundamentals/scroll-trigger-create | primary | 1 | plugin:#160 |
| source:scroll-trigger-animation | ScrollTrigger.animation | https://gsap.com/docs/v3/Plugins/ScrollTrigger/animation/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | primary | 1 | plugin:#161 |
| source:scroll-trigger-direction | ScrollTrigger.direction | https://gsap.com/docs/v3/Plugins/ScrollTrigger/direction/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#162 |
| source:scroll-trigger-disable | ScrollTrigger.disable() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/disable()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | primary | 1 | plugin:#163 |
| source:scroll-trigger-enable | ScrollTrigger.enable() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/enable()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#164 |
| source:scroll-trigger-end | ScrollTrigger.end | https://gsap.com/docs/v3/Plugins/ScrollTrigger/end/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#165 |
| source:scroll-trigger-get-tween | ScrollTrigger.getTween() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/getTween()/ | Scroll | scroll-trigger-motion | /fundamentals/scroll-trigger-motion | primary | 1 | plugin:#166 |
| source:scroll-trigger-get-velocity | ScrollTrigger.getVelocity() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/getVelocity()/ | Scroll | scroll-trigger-motion | /fundamentals/scroll-trigger-motion | related | 1 | plugin:#167 |
| source:scroll-trigger-is-active | ScrollTrigger.isActive | https://gsap.com/docs/v3/Plugins/ScrollTrigger/isActive/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#168 |
| source:scroll-trigger-kill | ScrollTrigger.kill() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/kill()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#169 |
| source:scroll-trigger-label-to-scroll | ScrollTrigger.labelToScroll() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/labelToScroll()/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#170 |
| source:scroll-trigger-next | ScrollTrigger.next() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/next()/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | primary | 1 | plugin:#171 |
| source:scroll-trigger-pin | ScrollTrigger.pin | https://gsap.com/docs/v3/Plugins/ScrollTrigger/pin/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#172 |
| source:scroll-trigger-previous | ScrollTrigger.previous() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/previous()/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | related | 1 | plugin:#173 |
| source:scroll-trigger-progress | ScrollTrigger.progress | https://gsap.com/docs/v3/Plugins/ScrollTrigger/progress/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#174 |
| source:scroll-trigger-refresh | ScrollTrigger.refresh() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#175 |
| source:scroll-trigger-scroll | ScrollTrigger.scroll() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/scroll()/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#176 |
| source:scroll-trigger-scroller | ScrollTrigger.scroller | https://gsap.com/docs/v3/Plugins/ScrollTrigger/scroller/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#177 |
| source:scroll-trigger-start | ScrollTrigger.start | https://gsap.com/docs/v3/Plugins/ScrollTrigger/start/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#178 |
| source:scroll-trigger-static-add-event-listener | ScrollTrigger.addEventListener() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.addEventListener()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#179 |
| source:scroll-trigger-static-batch | ScrollTrigger.batch() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.batch()/ | Scroll | scroll-trigger-motion | /fundamentals/scroll-trigger-motion | related | 1 | plugin:#180 |
| source:scroll-trigger-static-clear-match-media | ScrollTrigger.clearMatchMedia() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.clearMatchMedia()/ | Scroll | scroll-trigger-responsive | /fundamentals/scroll-trigger-responsive | primary | 1 | plugin:#181 |
| source:scroll-trigger-static-clear-scroll-memory | ScrollTrigger.clearScrollMemory() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.clearScrollMemory()/ | Scroll | scroll-trigger-responsive | /fundamentals/scroll-trigger-responsive | related | 1 | plugin:#182 |
| source:scroll-trigger-static-config | ScrollTrigger.config() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config()/ | Scroll | scroll-trigger-create | /fundamentals/scroll-trigger-create | related | 1 | plugin:#183 |
| source:scroll-trigger-static-create | ScrollTrigger.create() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.create()/ | Scroll | scroll-trigger-create | /fundamentals/scroll-trigger-create | related | 1 | plugin:#184 |
| source:scroll-trigger-static-defaults | ScrollTrigger.defaults() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.defaults()/ | Scroll | scroll-trigger-create | /fundamentals/scroll-trigger-create | related | 1 | plugin:#185 |
| source:scroll-trigger-static-get-all | ScrollTrigger.getAll() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.getAll()/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | related | 1 | plugin:#186 |
| source:scroll-trigger-static-get-by-id | ScrollTrigger.getById() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.getById()/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | related | 1 | plugin:#187 |
| source:scroll-trigger-static-is-in-viewport | ScrollTrigger.isInViewport() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isInViewport()/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#188 |
| source:scroll-trigger-static-is-scrolling | ScrollTrigger.isScrolling() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isScrolling()/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | related | 1 | plugin:#189 |
| source:scroll-trigger-static-is-touch | ScrollTrigger.isTouch | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.isTouch/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | related | 1 | plugin:#190 |
| source:scroll-trigger-static-kill-all | ScrollTrigger.killAll() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.killAll()/ | Scroll | scroll-trigger-registry | /fundamentals/scroll-trigger-registry | related | 1 | plugin:#191 |
| source:scroll-trigger-static-match-media | ScrollTrigger.matchMedia() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.matchMedia()/ | Scroll | scroll-trigger-responsive | /fundamentals/scroll-trigger-responsive | related | 1 | plugin:#192 |
| source:scroll-trigger-static-max-scroll | ScrollTrigger.maxScroll() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.maxScroll()/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#193 |
| source:scroll-trigger-static-normalize-scroll | ScrollTrigger.normalizeScroll() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/ | Scroll | scroll-trigger-integrations | /fundamentals/scroll-trigger-integrations | primary | 1 | plugin:#194 |
| source:scroll-trigger-static-observe | ScrollTrigger.observe() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.observe()/ | Scroll | scroll-trigger-integrations | /fundamentals/scroll-trigger-integrations | related | 1 | plugin:#195 |
| source:scroll-trigger-static-position-in-viewport | ScrollTrigger.positionInViewport() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.positionInViewport()/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#196 |
| source:scroll-trigger-static-refresh | ScrollTrigger.refresh() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#197 |
| source:scroll-trigger-static-remove-event-listener | ScrollTrigger.removeEventListener() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.removeEventListener()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#198 |
| source:scroll-trigger-static-save-styles | ScrollTrigger.saveStyles() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.saveStyles()/ | Scroll | scroll-trigger-responsive | /fundamentals/scroll-trigger-responsive | related | 1 | plugin:#199 |
| source:scroll-trigger-static-scroller-proxy | ScrollTrigger.scrollerProxy() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()/ | Scroll | scroll-trigger-integrations | /fundamentals/scroll-trigger-integrations | related | 1 | plugin:#200 |
| source:scroll-trigger-static-snap-directional | ScrollTrigger.snapDirectional() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.snapDirectional()/ | Scroll | scroll-trigger-motion | /fundamentals/scroll-trigger-motion | related | 1 | plugin:#201 |
| source:scroll-trigger-static-sort | ScrollTrigger.sort() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.sort()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#202 |
| source:scroll-trigger-static-update | ScrollTrigger.update() | https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.update()/ | Scroll | scroll-trigger-lifecycle | /fundamentals/scroll-trigger-lifecycle | related | 1 | plugin:#203 |
| source:scroll-trigger-trigger | ScrollTrigger.trigger | https://gsap.com/docs/v3/Plugins/ScrollTrigger/trigger/ | Scroll | scroll-trigger-geometry | /fundamentals/scroll-trigger-geometry | related | 1 | plugin:#204 |
| source:scroll-trigger-vars | ScrollTrigger.vars | https://gsap.com/docs/v3/Plugins/ScrollTrigger/vars/ | Scroll | scroll-trigger-create | /fundamentals/scroll-trigger-create | related | 1 | plugin:#205 |
| source:split-text | SplitText | https://gsap.com/docs/v3/Plugins/SplitText/ | Text | split-text-create | /fundamentals/split-text-create | primary | 1 | plugin:#206 |
| source:split-text-chars | SplitText.chars | https://gsap.com/docs/v3/Plugins/SplitText/chars/ | Text | split-text-create | /fundamentals/split-text-create | related | 1 | plugin:#207 |
| source:split-text-is-split | SplitText.isSplit | https://gsap.com/docs/v3/Plugins/SplitText/isSplit/ | Text | split-text-lifecycle | /fundamentals/split-text-lifecycle | primary | 1 | plugin:#208 |
| source:split-text-kill | SplitText.kill() | https://gsap.com/docs/v3/Plugins/SplitText/kill()/ | Text | split-text-lifecycle | /fundamentals/split-text-lifecycle | related | 1 | plugin:#209 |
| source:split-text-lines | SplitText.lines | https://gsap.com/docs/v3/Plugins/SplitText/lines/ | Text | split-text-create | /fundamentals/split-text-create | related | 1 | plugin:#210 |
| source:split-text-masks | SplitText.masks | https://gsap.com/docs/v3/Plugins/SplitText/masks/ | Text | split-text-create | /fundamentals/split-text-create | related | 1 | plugin:#211 |
| source:split-text-revert | SplitText.revert() | https://gsap.com/docs/v3/Plugins/SplitText/revert()/ | Text | split-text-lifecycle | /fundamentals/split-text-lifecycle | related | 1 | plugin:#212 |
| source:split-text-split | SplitText.split() | https://gsap.com/docs/v3/Plugins/SplitText/split()/ | Text | split-text-lifecycle | /fundamentals/split-text-lifecycle | related | 1 | plugin:#213 |
| source:split-text-static-create | SplitText.create() | https://gsap.com/docs/v3/Plugins/SplitText/static.create()/ | Text | split-text-create | /fundamentals/split-text-create | related | 1 | plugin:#214 |
| source:split-text-vars | SplitText.vars | https://gsap.com/docs/v3/Plugins/SplitText/vars/ | Text | split-text-create | /fundamentals/split-text-create | related | 1 | plugin:#215 |
| source:split-text-words | SplitText.words | https://gsap.com/docs/v3/Plugins/SplitText/words/ | Text | split-text-create | /fundamentals/split-text-create | related | 1 | plugin:#216 |
| source:text-replacement | Text Replacement | https://gsap.com/docs/v3/Plugins/TextPlugin/ | Text | text-plugin | /fundamentals/text-plugin | primary | 1 | plugin:#217 |
| source:react-advanced-techniques | React & GSAP — Advanced Techniques | https://gsap.com/resources/react-advanced/ | React | react-gsap-patterns | /fundamentals/react-gsap-patterns | primary | 1 | plugin:#219 |
| source:react-useful-patterns | React & GSAP — Useful Patterns | https://gsap.com/resources/react-basics/ | React | react-gsap-patterns | /fundamentals/react-gsap-patterns | related | 1 | plugin:#220 |

## Frozen baseline audit

| Check | Result |
| --- | ---: |
| Core catalog rows | 159 |
| Plugin catalog rows | 220 |
| Canonical core/plugin overlaps | 15 |
| Unique canonical source records | 364 |
| Core learning pages | 40 |
| Plugin learning pages | 46 |
| Total learning pages | 86 |
| Sources without owner | 0 |
| Sources with duplicate owner | 0 |
| Learning pages without exactly one primary | 0 |
| Duplicate sourcePageId | 0 |
| Duplicate canonical URL after overlap normalization | 0 |

This audit establishes identity, initial revision, and ownership only. It does not claim source-item manifest completion, local coverage, specialist review, or release PASS for any learning page.
