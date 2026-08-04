# GSAP Core N:1 beginner-first learning curriculum

- Designed from: `docs/handoffs/gsap/_program/official-core-source-catalog.md`
- Catalog authority/review date: current official GSAP pages, reviewed 2026-08-02 (Asia/Seoul)
- Inventory: 159 verified canonical pages (6 hubs + 153 leaf/standalone pages)
- Proposed visible learning pages: **40**
- Assignment result: **159 unique sources assigned / 0 unassigned / 0 overlaps**
- Benchmark: the existing `/fundamentals/gsap-to` learning page, interpreted as a depth and beginner-clarity floor, not as a template to clone for every page type

## Decision and architecture boundary

The curriculum follows the user's N:1 decision: every official source remains a first-class source-manifest item, but several related canonicals may be taught through one visible learning page. A canonical has exactly one owning page below. Other pages may link to or briefly recap it, but those recaps are explicitly non-owning and may not satisfy its coverage status.

This curriculum follows the approved N:1 contract in `docs/project-structure.md`: a visible lesson folder owns `ownedSourcePages[]`, and each canonical retains its own identity, item-level manifest, review date, coverage rows, and source blockers inside that lesson. The curriculum does **not** merge official facts into an anonymous combined source.

The two catalog defects are not counted as sources or invented as lessons:

- Missing standalone `Animation` canonical: inherited Tween and Timeline canonicals stay under their published URLs and are separately owned below.
- Broken `CustomEasee` alias: local links use the verified `CustomEase` canonical while the source defect remains in the program handoff.

## What “match gsap.to() depth” means

Every proposed page must provide the same learning depth as the benchmark while choosing modules appropriate to its source type:

1. An item-level source manifest and truthful coverage appendix; counts alone never prove coverage.
2. One beginner question, prerequisite language, a mental model, smallest case, changed-value observation, calculation/lifecycle explanation, real use, and cautions.
3. Signature/overload/argument/return contracts for callables; type/default/accepted/special values and provenance for properties.
4. Examples that state goal, controls, what changes, what to watch, why it happens, use cases, boundary, and `sourcePath` before execution.
5. Runtime input, normalized config/descriptor, GSAP call, observation state, and displayed code derived from the same state.
6. The representation that makes the relation clearest: interactive motion only when time/motion matters; otherwise a table, annotated call, curve, timeline, state diagram, or pure calculation lab.
7. Keyboard/small-screen/reduced-motion contracts for interactive examples. Reduced motion must retain the concept as a stable state or diagram.
8. Clear ownership links: shared concepts can be summarized, but their canonical source is covered only by its owner.

The existing `gsap.to()` audit currently reports 46/55 source items covered and 9 planned plus factual/traceability/comment blockers. Therefore “benchmark” here means its strong beginner structure, property grouping, examples, observation prompts, and runtime/display pattern **after those blockers are resolved**; its current self-certified coverage and disputed claims must not be copied.

## Module legend

- `CG` — concept/guide
- `CM` — callable method
- `CI` — class/instance
- `PL` — plugin
- `PC` — property catalog
- `UT` — utility/overload
- `EV` — ease/visualizer
- `II` — installation/integration

Catalog IDs `S001`–`S159` are the 159 table rows in catalog order. They exist only to make this curriculum mechanically auditable; each row below also gives the exact canonical URL.

## Phase A — orient, install, and make the first motion

## 01 — GSAP Core map

- **Route / title:** `/fundamentals/gsap-core-map` — “GSAP Core는 무엇을 만들고 어디서 찾나요?”
- **Order / prerequisites:** 01; JavaScript objects, functions, and DOM selectors only.
- **Core learner question:** “GSAP, Tween, Timeline, plugins, ease, utilities는 서로 어떤 관계인가요?”
- **Selected modules:** `CG + CI` — platform map, `gsap` access-object mental model, object relationship diagram, next-step chooser.
- **Owned canonicals (3):**
  - `S001` docsHome — `https://gsap.com/docs/v3/`
  - `S003` GSAP — `https://gsap.com/docs/v3/GSAP/`
  - `S008` gsap.version — `https://gsap.com/docs/v3/GSAP/gsap.version`
- **Concepts/attributes/methods:** core versus optional capability; `gsap` namespace/access object; Tween changes values; Timeline arranges animations; plugins extend understood properties; eases reshape progress; utilities calculate values; runtime version string and compatibility boundary; navigation from hub to member pages.
- **Examples / representation:** (1) static “one call becomes Tween, several Tweens become Timeline” object map; (2) a no-motion namespace explorer that reveals `gsap.version` and routes each capability to the owner lesson; (3) “choose the next page” scenario cards. Static diagram is clearer than decorative animation.
- **Why this is not too broad:** it owns orientation and navigation facts only. Installation, signatures, Tween/Timeline APIs, CSS properties, and plugins are delegated to their dedicated lessons.

## 02 — Install and register GSAP

- **Route / title:** `/fundamentals/installation` — “어떤 환경에서 어떻게 가져오고 등록하나요?”
- **Order / prerequisites:** 02; page 01, basic npm/script-tag knowledge.
- **Core learner question:** “npm, CDN, ESM/UMD 중 무엇을 선택하고 플러그인은 왜 등록하나요?”
- **Selected modules:** `II + CM + PL` — environment decision tree, import/registration call anatomy, bundling/legacy migration warnings.
- **Owned canonicals (2):**
  - `S002` Installation — `https://gsap.com/docs/v3/Installation`
  - `S028` gsap.registerPlugin() — `https://gsap.com/docs/v3/GSAP/gsap.registerPlugin()`
- **Concepts/attributes/methods:** npm/yarn/CDN/download; ESM and UMD entry points; core versus plugin imports; registration timing; tree-shaking boundary; private-repository migration; version check handoff to page 01; framework/SSR boundary without teaching React yet.
- **Examples / representation:** (1) environment selector producing the exact import snippet; (2) annotated `gsap.registerPlugin(Plugin)` call showing import, registration, then use; (3) failure matrix for “imported but not registered”, wrong build, and browser-global order. These are static/config examples; `runtimeSource: none` unless a live registration state is genuinely observable.
- **Why this is not too broad:** both sources answer one setup question. Individual plugin APIs and React cleanup stay out of scope.

## 03 — `gsap.to()`: current value to destination

- **Route / title:** `/fundamentals/gsap-to` — “현재값에서 목표값으로 어떻게 움직이나요?”
- **Order / prerequisites:** 03; pages 01–02.
- **Core learner question:** “`targets`와 `vars`를 읽으면 화면의 무엇이 어디까지 어떻게 변하나요?”
- **Selected modules:** `CM + PC` — callable anatomy, destination-value mental model, canonical special-property catalog, bounded related concepts.
- **Owned canonicals (1):**
  - `S031` gsap.to() — `https://gsap.com/docs/v3/GSAP/gsap.to()`
- **Concepts/attributes/methods:** signature, targets, vars, returned Tween, immediate playback/disposal; all canonical `gsap.to()` special properties and their provenance; function/random/relative values; stagger, simple sequencing boundary, keyframes, callbacks, plugin extension boundary.
- **Examples / representation:** retain the benchmark’s focused examples—destination/timing, stored Tween control, playback direction, repeat/yoyo, repeatRefresh, overwrite, value modes, stagger, keyframes, callback log—after closing the audit blockers. Each uses one core question and one runtime hook/config.
- **Why this is not too broad:** it owns only claims published on the `gsap.to()` canonical. Full Tween vars/instance APIs, ease catalog, Timeline mechanics, utilities, and plugin APIs are links, not hidden coverage substitutes.

## 04 — Choose start and end values

- **Route / title:** `/fundamentals/tween-start-end-values` — “to, from, fromTo, set 중 무엇을 쓰나요?”
- **Order / prerequisites:** 04; page 03.
- **Core learner question:** “현재 상태를 기준으로 할지, 시작·끝을 직접 적을지, 즉시 바꿀지 어떻게 결정하나요?”
- **Selected modules:** `CM + PC` — four-call comparison, argument/return table, first-render timing cautions.
- **Owned canonicals (3):**
  - `S014` gsap.from() — `https://gsap.com/docs/v3/GSAP/gsap.from()`
  - `S015` gsap.fromTo() — `https://gsap.com/docs/v3/GSAP/gsap.fromTo()`
  - `S029` gsap.set() — `https://gsap.com/docs/v3/GSAP/gsap.set()`
- **Concepts/attributes/methods:** supplied start versus destination values; explicit `fromVars`/`toVars`; zero-duration set; return values; current-value sampling; immediate-render and startup-state cautions; choosing readability over clever reversal.
- **Examples / representation:** one card shown in four resettable steps with the same normalized start/end descriptor; a value-pair diagram updates before the motion; a static decision table covers flashes and initial CSS. Multiple targets are avoided.
- **Why this is not too broad:** the three owned calls are one decision family. General vars, Tween controls, and Timeline insertion variants are delegated.

## 05 — Tween configuration and defaults

- **Route / title:** `/fundamentals/tween-configuration` — “옵션은 어디서 오고 어느 범위까지 적용되나요?”
- **Order / prerequisites:** 05; pages 03–04.
- **Core learner question:** “한 Tween의 vars, 전역 defaults, 전역 config는 어떻게 다르고 언제 상속되나요?”
- **Selected modules:** `CG + PC + CM` — scope layers, complete vars catalog, getter/setter call anatomy, precedence diagram.
- **Owned canonicals (3):**
  - `S009` gsap.config() — `https://gsap.com/docs/v3/GSAP/gsap.config()`
  - `S011` gsap.defaults() — `https://gsap.com/docs/v3/GSAP/gsap.defaults()`
  - `S042` Tween.vars — `https://gsap.com/docs/v3/GSAP/Tween/vars`
- **Concepts/attributes/methods:** full Tween vars contract; animation properties versus special properties; global Tween defaults; global engine configuration; local vars override and Timeline child-default boundary; getter/setter forms, defaults/config lifetime, units/force3D/auto-sleep relationships where stated.
- **Examples / representation:** (1) three-layer “engine → default Tween → one Tween” precedence inspector; (2) two sequential Tweens showing a local override without simultaneous comparison; (3) searchable property catalog with source provenance and usage clusters. The catalog is primary; animation is limited to precedence questions.
- **Why this is not too broad:** all three sources answer configuration scope and precedence. It does not reteach each creation method or every instance control.

## 06 — Animate CSS and transforms

- **Route / title:** `/fundamentals/css-animation` — “CSS 값과 transform은 GSAP에서 어떻게 표현되나요?”
- **Order / prerequisites:** 06; pages 03 and 05; basic CSS.
- **Core learner question:** “어떤 CSS 이름·단위·transform 값을 vars에 적고 브라우저에는 무엇이 쓰이나요?”
- **Selected modules:** `PL + PC + CG` — auto-included CSSPlugin mental model, complete property/special-property catalog, transform/unit diagrams.
- **Owned canonicals (1):**
  - `S033` CSS — `https://gsap.com/docs/v3/GSAP/CorePlugins/CSS`
- **Concepts/attributes/methods:** automatic CSSPlugin inclusion; camelCase properties; numeric units and conversion boundaries; aliases; 2D/3D transforms; transform/SVG origins; complex values, colors, CSS variables and canonical special properties; performance/force3D cautions where sourced.
- **Examples / representation:** focused labs for translate/rotate/scale, unit change, transform origin, SVG origin, and complex/color value; each lab changes one relationship and exposes computed/end state. A property catalog carries exhaustive coverage; a transform-axis diagram handles geometry better than extra animation.
- **Why this is not too broad:** CSS is itself a large canonical and earns a dedicated deep page. Attributes, arrays, modifiers, easing, and Tween lifecycle remain separate.

## 07 — Animate attributes and numeric arrays

- **Route / title:** `/fundamentals/non-css-target-values` — “CSS가 아닌 값도 어떻게 보간하나요?”
- **Order / prerequisites:** 07; pages 03 and 06.
- **Core learner question:** “DOM/SVG attributes와 배열 원소는 CSS와 무엇이 다르나요?”
- **Selected modules:** `PL + PC` — two auto-included plugin contracts, target/value-shape comparison.
- **Owned canonicals (2):**
  - `S034` Attributes — `https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes`
  - `S035` EndArray — `https://gsap.com/docs/v3/GSAP/CorePlugins/EndArray`
- **Concepts/attributes/methods:** `attr` value object, SVG/DOM numeric attributes, lack of CSS unit conversion; `endArray`, equal-index numeric interpolation, mutation/shape expectations; automatic inclusion and Tween dependency.
- **Examples / representation:** (1) one SVG circle whose numeric attribute changes while its CSS transform stays fixed; (2) one numeric array with a per-index table and progress scrubber; (3) a static “CSS property vs attribute vs array element” chooser.
- **Why this is not too broad:** both plugins teach the same extension point—non-CSS numeric value channels—while remaining small canonicals. Object-property animation is only a prerequisite recap.

## Phase B — shape motion and understand Tween instances

## 08 — Read, choose, and name an ease

- **Route / title:** `/fundamentals/easing` — “같은 거리와 시간인데 왜 움직임이 다르게 느껴지나요?”
- **Order / prerequisites:** 08; pages 03 and 06.
- **Core learner question:** “ease 곡선의 입력 progress가 출력 progress와 속도로 어떻게 보이나요?”
- **Selected modules:** `CG + CM + EV + PC` — curve mental model, built-in catalog, parser/registration signatures, stepped visualization.
- **Owned canonicals (4):**
  - `S023` gsap.parseEase() — `https://gsap.com/docs/v3/GSAP/gsap.parseEase()`
  - `S026` gsap.registerEase() — `https://gsap.com/docs/v3/GSAP/gsap.registerEase()`
  - `S151` Easing — `https://gsap.com/docs/v3/Eases`
  - `S158` SteppedEase — `https://gsap.com/docs/v3/Eases/SteppedEase`
- **Concepts/attributes/methods:** normalized progress; curve versus velocity; in/out/inOut syntax and configurable built-ins; default ease boundary; ease string/function; parsing and named registration; stepped/`steps(n)` behavior and legacy API boundary.
- **Examples / representation:** synchronized single-target track plus curve/velocity cursor; built-in selector; `parseEase()` value sampler table; register-then-use annotated code; step-count lab with frame-like discrete states. Curve is primary because motion alone hides the math.
- **Why this is not too broad:** all sources answer the core ease language. Custom curve authoring and specialized plugin families follow in separate pages.

## 09 — Draw a custom ease

- **Route / title:** `/fundamentals/custom-ease` — “원하는 속도 곡선을 직접 어떻게 만들까요?”
- **Order / prerequisites:** 09; pages 02 and 08.
- **Core learner question:** “SVG path나 좌표를 재사용 가능한 ease로 어떻게 바꾸나요?”
- **Selected modules:** `PL + EV` — import/register contract, curve authoring, data conversion and inspection.
- **Owned canonicals (1):**
  - `S153` CustomEase — `https://gsap.com/docs/v3/Eases/CustomEase`
- **Concepts/attributes/methods:** plugin registration; `CustomEase.create()` and canonical inputs/outputs; SVG path/coordinate curve meaning; naming; curve data retrieval/conversion APIs where canonical; normalization, precision and invalid-shape cautions.
- **Examples / representation:** editable control points/path paired with one target and a sampled progress table; preset/import snippet; invalid/non-normalized input warning. The visualizer and numeric samples share one descriptor.
- **Why this is not too broad:** one plugin owns custom curve construction. Bounce and wiggle generation depend on it but have different learner questions.

## 10 — Build bounce and wiggle curves

- **Route / title:** `/fundamentals/custom-bounce-wiggle` — “물리감 있는 튕김과 흔들림을 ease로 어떻게 설계하나요?”
- **Order / prerequisites:** 10; pages 02, 08, and 09.
- **Core learner question:** “bounce와 wiggle의 조절값이 곡선의 어느 부분을 바꾸나요?”
- **Selected modules:** `PL + EV` — shared CustomEase dependency, two focused plugin visualizers, output reuse.
- **Owned canonicals (2):**
  - `S152` CustomBounce — `https://gsap.com/docs/v3/Eases/CustomBounce`
  - `S154` CustomWiggle — `https://gsap.com/docs/v3/Eases/CustomWiggle`
- **Concepts/attributes/methods:** import/register/dependency order; CustomBounce options and optional squash companion; CustomWiggle type/count/options; generated named ease; when oscillation is an ease rather than a multi-property keyframe.
- **Examples / representation:** separate tabs, never simultaneous moving targets: a ball with bounce/squash curve and a pointer with wiggle curve; controls update curve, observation sentences, and serialized creation call from one config. A static chooser distinguishes bounce, wiggle, and keyframes.
- **Why this is not too broad:** the plugins share the same CustomEase-generated-curve mental model and small dependency story. Each still gets its own catalog and example within the page.

## 11 — Use EasePack’s special curves

- **Route / title:** `/fundamentals/ease-pack` — “scale, roughness, slow middle 구간에는 어떤 특수 ease가 맞나요?”
- **Order / prerequisites:** 11; pages 02 and 08.
- **Core learner question:** “ExpoScaleEase, RoughEase, SlowMo가 해결하는 서로 다른 속도 문제는 무엇인가요?”
- **Selected modules:** `PL + EV` — EasePack registration, three bounded curve labs, selection table.
- **Owned canonicals (3):**
  - `S155` ExpoScaleEase — `https://gsap.com/docs/v3/Eases/ExpoScaleEase`
  - `S156` RoughEase — `https://gsap.com/docs/v3/Eases/RoughEase`
  - `S157` SlowMo — `https://gsap.com/docs/v3/Eases/SlowMo`
- **Concepts/attributes/methods:** EasePack import/registration; exponential scaling across large ratios; randomized rough points/strength/taper; SlowMo linear middle/power/yoyo mode; string/create forms and configuration contracts as published.
- **Examples / representation:** three scenario tabs with one target each—scale ratio, jittered progress, slow middle passage—plus curve and option table. The page starts with a decision matrix so the trio is not presented as arbitrary presets.
- **Why this is not too broad:** one package and one selection question connect three compact canonicals; custom curve authoring and core built-ins remain owned elsewhere.

## 12 — Keep and identify a Tween instance

- **Route / title:** `/fundamentals/tween-instance` — “만들어진 Tween에는 무엇이 남나요?”
- **Order / prerequisites:** 12; pages 03–05.
- **Core learner question:** “반환된 Tween은 대상, 설정, 사용자 데이터, 연결된 외부 제어기를 어떻게 기억하나요?”
- **Selected modules:** `CG + CI + PC + CM` — instance lifecycle, identity/inspection properties, target method, external-plugin boundary.
- **Owned canonicals (4):**
  - `S038` Tween — `https://gsap.com/docs/v3/GSAP/Tween`
  - `S039` Tween.data — `https://gsap.com/docs/v3/GSAP/Tween/data`
  - `S041` Tween.scrollTrigger — `https://gsap.com/docs/v3/GSAP/Tween/scrollTrigger`
  - `S065` Tween.targets() — `https://gsap.com/docs/v3/GSAP/Tween/targets()`
- **Concepts/attributes/methods:** Tween as one target/value/time relationship; creation and default lifecycle; saved `vars`, arbitrary `data`, target array, optional ScrollTrigger association; instance methods/properties map and delegation to following lessons; plugin-out-of-inventory warning.
- **Examples / representation:** one stored Tween with an inspector for `targets()`, `data`, `vars.id`, and optional-property state; an instance lifecycle diagram; no ScrollTrigger behavior demo because its plugin page is outside this inventory.
- **Why this is not too broad:** this is the identity/index page for the class. Control, playhead math, repeats, callbacks, and cleanup are delegated to pages 13–18.

## 13 — Play, pause, and change Tween direction

- **Route / title:** `/fundamentals/tween-playback-controls` — “같은 Tween을 어떻게 재생·정지·재시작·역재생하나요?”
- **Order / prerequisites:** 13; page 12.
- **Core learner question:** “명령 메서드와 boolean 상태 getter/setter는 무엇이 다른가요?”
- **Selected modules:** `CI + CM` — playback state machine, method signatures/returns, chained control lab.
- **Owned canonicals (8):**
  - `S049` Tween.isActive() — `https://gsap.com/docs/v3/GSAP/Tween/isActive()`
  - `S052` Tween.pause() — `https://gsap.com/docs/v3/GSAP/Tween/pause()`
  - `S053` Tween.paused() — `https://gsap.com/docs/v3/GSAP/Tween/paused()`
  - `S054` Tween.play() — `https://gsap.com/docs/v3/GSAP/Tween/play()`
  - `S058` Tween.restart() — `https://gsap.com/docs/v3/GSAP/Tween/restart()`
  - `S059` Tween.resume() — `https://gsap.com/docs/v3/GSAP/Tween/resume()`
  - `S060` Tween.reverse() — `https://gsap.com/docs/v3/GSAP/Tween/reverse()`
  - `S061` Tween.reversed() — `https://gsap.com/docs/v3/GSAP/Tween/reversed()`
- **Concepts/attributes/methods:** forward/backward direction; pause versus paused state; play versus resume; restart and delay option boundary; reverse versus reversed state; ancestor-aware activity; parameters, return chaining and start-position caveats.
- **Examples / representation:** one target with a visible state machine and buttons; event/status output shows playhead direction, paused, reversed, active; each action has an annotated before/after state. One target avoids false synchronization lessons.
- **Why this is not too broad:** all eight APIs mutate or report the same playback state machine. Numeric playhead position and duration math are separate.

## 14 — Read and move the Tween playhead

- **Route / title:** `/fundamentals/tween-playhead` — “초, progress, totalProgress, ratio는 어떻게 다른가요?”
- **Order / prerequisites:** 14; pages 08, 12, and 13.
- **Core learner question:** “반복과 ease가 있을 때 현재 위치를 어떤 좌표계로 읽고 바꾸나요?”
- **Selected modules:** `CI + CM + EV` — synchronized playhead ruler, eased-ratio curve, getter/setter contracts.
- **Owned canonicals (6):**
  - `S040` Tween.ratio — `https://gsap.com/docs/v3/GSAP/Tween/ratio`
  - `S055` Tween.progress() — `https://gsap.com/docs/v3/GSAP/Tween/progress()`
  - `S063` Tween.seek() — `https://gsap.com/docs/v3/GSAP/Tween/seek()`
  - `S067` Tween.time() — `https://gsap.com/docs/v3/GSAP/Tween/time()`
  - `S070` Tween.totalProgress() — `https://gsap.com/docs/v3/GSAP/Tween/totalProgress()`
  - `S071` Tween.totalTime() — `https://gsap.com/docs/v3/GSAP/Tween/totalTime()`
- **Concepts/attributes/methods:** local time/progress exclude repeats; total time/progress include repeats and repeatDelay; `seek()` in seconds; read-only eased `ratio`; suppress-events arguments where canonical; getter/setter returns.
- **Examples / representation:** one scrubber with aligned rulers for time/progress/totalProgress and a curve cursor for ratio; repeat toggles change ruler length; numeric entry invokes the exact selected method. Reduced motion uses manual scrubbing only.
- **Why this is not too broad:** every source names the current playhead position in one of four coordinate systems. Duration calculation and repeat configuration are prerequisites/next links.

## 15 — Understand Tween clock math

- **Route / title:** `/fundamentals/tween-timing-math` — “delay, duration, totalDuration, start/end/global time은 어떻게 계산되나요?”
- **Order / prerequisites:** 15; pages 12 and 14; Timeline parent concept is introduced locally before use.
- **Core learner question:** “Tween의 자체 시계와 부모 Timeline의 시계는 어떻게 연결되나요?”
- **Selected modules:** `CI + CM` — nested clock diagram, getter/setter signatures, timeScale calculator.
- **Owned canonicals (7):**
  - `S043` Tween.delay() — `https://gsap.com/docs/v3/GSAP/Tween/delay()`
  - `S044` Tween.duration() — `https://gsap.com/docs/v3/GSAP/Tween/duration()`
  - `S045` Tween.endTime() — `https://gsap.com/docs/v3/GSAP/Tween/endTime()`
  - `S047` Tween.globalTime() — `https://gsap.com/docs/v3/GSAP/Tween/globalTime()`
  - `S064` Tween.startTime() — `https://gsap.com/docs/v3/GSAP/Tween/startTime()`
  - `S068` Tween.timeScale() — `https://gsap.com/docs/v3/GSAP/Tween/timeScale()`
  - `S069` Tween.totalDuration() — `https://gsap.com/docs/v3/GSAP/Tween/totalDuration()`
- **Concepts/attributes/methods:** initial delay; base duration versus repeat-inclusive total; parent-local start/end; nested-to-global conversion; playback rate; setter side effects and smooth-child-timing boundary; exact time formulas.
- **Examples / representation:** adjustable timeline ruler with a single child Tween; fields for delay/duration/repeat/timeScale update start/end/total labels; a nested diagram demonstrates `globalTime()` without decorative movement.
- **Why this is not too broad:** all seven APIs answer placement and duration in the clock model. Playhead control and Timeline mechanics are separately owned.

## 16 — Repeat and recompute a Tween

- **Route / title:** `/fundamentals/tween-repeats` — “반복 회차와 값 재계산은 언제 일어나나요?”
- **Order / prerequisites:** 16; pages 05, 14, and 15.
- **Core learner question:** “repeat, repeatDelay, yoyo, iteration, invalidate가 저장된 값을 어떻게 바꾸나요?”
- **Selected modules:** `CI + CM` — cycle model, getter/setter catalog, invalidation/value-sampling lab.
- **Owned canonicals (5):**
  - `S048` Tween.invalidate() — `https://gsap.com/docs/v3/GSAP/Tween/invalidate()`
  - `S050` Tween.iteration() — `https://gsap.com/docs/v3/GSAP/Tween/iteration()`
  - `S056` Tween.repeat() — `https://gsap.com/docs/v3/GSAP/Tween/repeat()`
  - `S057` Tween.repeatDelay() — `https://gsap.com/docs/v3/GSAP/Tween/repeatDelay()`
  - `S072` Tween.yoyo() — `https://gsap.com/docs/v3/GSAP/Tween/yoyo()`
- **Concepts/attributes/methods:** additional-repeat counting and `-1`; inter-cycle delay; current iteration; alternating direction; invalidation of recorded start/end values; relation to `repeatRefresh` vars without re-owning page 03’s canonical claim.
- **Examples / representation:** one target and cycle strip; controls change repeat/delay/yoyo; a deterministic function-value counter shows values before and after `invalidate().restart()`; iteration output makes zero/one-based semantics explicit from source.
- **Why this is not too broad:** the five APIs operate on one cycle cache. Playback buttons and overall time math stay linked, not repeated.

## 17 — Change Tween callbacks and await completion

- **Route / title:** `/fundamentals/tween-callbacks-promise` — “만든 뒤 콜백을 바꾸거나 완료를 기다리려면?”
- **Order / prerequisites:** 17; pages 12–16; Promise basics.
- **Core learner question:** “vars 콜백, `eventCallback()`, `then()`은 각각 언제 필요한가요?”
- **Selected modules:** `CI + CM` — dynamic callback getter/setter, completion Promise bridge, event log.
- **Owned canonicals (2):**
  - `S046` Tween.eventCallback() — `https://gsap.com/docs/v3/GSAP/Tween/eventCallback()`
  - `S066` Tween.then() — `https://gsap.com/docs/v3/GSAP/Tween/then()`
- **Concepts/attributes/methods:** callback types, get/set/remove forms, parameters and scope boundary, callback timing; Promise-like completion, resolution value/return contract and interruption/restart cautions as canonical.
- **Examples / representation:** a single event log that first runs a vars callback, then replaces it through `eventCallback()`; an async step waits for `then()` and updates a status region. Displayed code and callback descriptors come from the runtime state.
- **Why this is not too broad:** two APIs bridge a Tween lifecycle to application code. Timeline scheduling has a separate lesson.

## 18 — Find and stop animations

- **Route / title:** `/fundamentals/find-stop-animations` — “참조를 잃은 Tween을 어떻게 찾고 안전하게 중단하나요?”
- **Order / prerequisites:** 18; pages 12–17.
- **Core learner question:** “ID·target 조회와 global kill, instance kill, revert는 어떤 범위에 작용하나요?”
- **Selected modules:** `CM + CI` — query scope matrix, kill/revert lifecycle, partial-property conflict lab.
- **Owned canonicals (6):**
  - `S016` gsap.getById() — `https://gsap.com/docs/v3/GSAP/gsap.getById()`
  - `S018` gsap.getTweensOf() — `https://gsap.com/docs/v3/GSAP/gsap.getTweensOf()`
  - `S019` gsap.isTweening() — `https://gsap.com/docs/v3/GSAP/gsap.isTweening()`
  - `S020` gsap.killTweensOf() — `https://gsap.com/docs/v3/GSAP/gsap.killTweensOf()`
  - `S051` Tween.kill() — `https://gsap.com/docs/v3/GSAP/Tween/kill()`
  - `S062` Tween.revert() — `https://gsap.com/docs/v3/GSAP/Tween/revert()`
- **Concepts/attributes/methods:** global ID lookup; target/active Tween queries; boolean activity; target/property/delayed-call kill scopes; whole or partial instance kill; revert restores pre-animation state then kills; reference/GC and cleanup boundaries.
- **Examples / representation:** two named Tweens in a registry inspector; query buttons reveal returned instances; stop actions show affected target/property rows; a revert before/after style snapshot distinguishes “stop here” from “restore then stop”.
- **Why this is not too broad:** every API answers discovery or termination scope. Timeline descendant cleanup and React/context cleanup remain separate owners.

## 19 — Update a property at input speed

- **Route / title:** `/fundamentals/high-frequency-updates` — “포인터·스크롤 입력마다 새 Tween을 만들지 않고 어떻게 갱신하나요?”
- **Order / prerequisites:** 19; pages 03, 06, 08, and 12.
- **Core learner question:** “read, direct set, eased retarget 중 어떤 fast-path를 선택하나요?”
- **Selected modules:** `CM + UT` — callable anatomy, cache/reuse model, performance-oriented chooser.
- **Owned canonicals (3):**
  - `S017` gsap.getProperty() — `https://gsap.com/docs/v3/GSAP/gsap.getProperty()`
  - `S024` gsap.quickSetter() — `https://gsap.com/docs/v3/GSAP/gsap.quickSetter()`
  - `S025` gsap.quickTo() — `https://gsap.com/docs/v3/GSAP/gsap.quickTo()`
- **Concepts/attributes/methods:** property/unit reads through plugins; cached setter creation and unit argument; reusable one-property Tween retargeting, allowed vars and returned function/Tween access where canonical; when ordinary `set()`/`to()` is sufficient.
- **Examples / representation:** one pointer-driven dot with three modes—readout only, direct quickSetter, eased quickTo—never three simultaneous dots; event input, normalized coordinate, setter call, and displayed code share one descriptor. Reduced motion defaults to direct stable positioning.
- **Why this is not too broad:** these are one high-frequency read/write decision family. Ticker ownership and general Tween configuration are linked.

## 20 — Register reusable effects

- **Route / title:** `/fundamentals/reusable-effects` — “반복되는 animation recipe를 이름 있는 효과로 어떻게 만들까요?”
- **Order / prerequisites:** 20; pages 03–05 and Timeline basics concept.
- **Core learner question:** “effect registry, defaults, optional Timeline extension은 어떤 계약을 만드나요?”
- **Selected modules:** `CM + CI` — registration signature, registry property, recipe boundary and composition example.
- **Owned canonicals (2):**
  - `S004` gsap.effects — `https://gsap.com/docs/v3/GSAP/gsap.effects`
  - `S027` gsap.registerEffect() — `https://gsap.com/docs/v3/GSAP/gsap.registerEffect()`
- **Concepts/attributes/methods:** effect name/function/defaults; config extension; registry lookup/call; returned animation contract; optional `extendTimeline`; naming/collision and registration timing cautions.
- **Examples / representation:** register a small “reveal” effect, inspect its generated config, call from `gsap.effects`, then optionally from one Timeline; a call-flow diagram prevents confusing effects with plugins.
- **Why this is not too broad:** property and registration method are two halves of one registry. It does not become an abstraction-design guide or own Timeline sequencing.

## Phase C — lifecycle, responsive integration, and the global clock

## 21 — Scope selectors and clean up with context

- **Route / title:** `/fundamentals/gsap-context` — “한 UI 영역의 GSAP 작업을 어떻게 함께 되돌리나요?”
- **Order / prerequisites:** 21; pages 03, 12, and 18.
- **Core learner question:** “scope 안에서 만든 animation과 event-time animation을 어떻게 기록하고 revert하나요?”
- **Selected modules:** `CM + CI + UT` — Context lifetime, scoped selector utility, add/ignore/revert patterns.
- **Owned canonicals (2):**
  - `S010` gsap.context() — `https://gsap.com/docs/v3/GSAP/gsap.context()`
  - `S143` gsap.utils.selector() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/selector()`
- **Concepts/attributes/methods:** callback/scope/returned Context; selector text constrained to an element/ref-like scope; Context recording, `add`, `ignore`, `revert`, cleanup and reuse boundaries as canonical; framework references as accepted inputs without yet teaching the React hook.
- **Examples / representation:** mount/unmount simulator with one scoped container; selector results list; create/revert buttons show style snapshots and recorded items; event handler is registered through Context-safe ownership rather than an untracked call.
- **Why this is not too broad:** both sources solve local DOM ownership. Media conditions and React hook lifecycle are next lessons.

## 22 — Rebuild animations for media conditions

- **Route / title:** `/fundamentals/responsive-motion` — “breakpoint와 reduced-motion 조건별 animation을 어떻게 만들고 정리하나요?”
- **Order / prerequisites:** 22; page 21; CSS media query basics.
- **Core learner question:** “조건이 바뀔 때 어떤 작업이 revert되고 언제 다시 실행되나요?”
- **Selected modules:** `CM + CI` — MatchMedia lifecycle, condition object, refresh behavior and accessibility boundary.
- **Owned canonicals (2):**
  - `S021` gsap.matchMedia() — `https://gsap.com/docs/v3/GSAP/gsap.matchMedia()`
  - `S022` gsap.matchMediaRefresh() — `https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh()`
- **Concepts/attributes/methods:** create/add conditions; strings and condition objects; callback context/conditions; automatic revert and manual lifecycle methods as canonical; forced refresh; reduced-motion query and stable alternative state.
- **Examples / representation:** a viewport/condition simulator using one card and explicit state table; condition changes rebuild one animation and log cleanup order; manual refresh shows revert/rerun. Browser media state and displayed condition config share one descriptor.
- **Why this is not too broad:** two APIs are one responsive lifecycle. React component lifecycle and general Context API are prerequisites, not duplicated.

## 23 — Use GSAP safely in React

- **Route / title:** `/fundamentals/react-use-gsap` — “React render lifecycle 안에서 GSAP을 어떻게 만들고 정리하나요?”
- **Order / prerequisites:** 23; pages 02, 21, and 22; React refs/effects.
- **Core learner question:** “`useGSAP()`의 scope, dependencies, revertOnUpdate, contextSafe는 각각 어떤 누수를 막나요?”
- **Selected modules:** `II + CM` — package registration, hook overloads/config, lifecycle/cleanup scenarios.
- **Owned canonicals (1):**
  - `S159` React — `https://gsap.com/resources/React`
- **Concepts/attributes/methods:** `@gsap/react` install/import/register; `useGSAP()` signatures; `useLayoutEffect`/SSR-safe behavior; scope; dependency array and `revertOnUpdate`; returned Context/contextSafe; event-time creation and cleanup; common misuse.
- **Examples / representation:** (1) one scoped component animation; (2) dependency change showing keep-versus-revert; (3) click handler before/after `contextSafe`; lifecycle sequence diagram and cleanup log. Each runtime hook is the displayed source.
- **Why this is not too broad:** the single official resource is already a focused integration guide. Core Context and media APIs are linked prerequisites.

## 24 — Understand GSAP’s root clock and ticker

- **Route / title:** `/fundamentals/gsap-root-clock` — “GSAP의 모든 animation은 누가 매 frame 진행시키나요?”
- **Order / prerequisites:** 24; pages 12, 15, and Timeline mental model from page 01.
- **Core learner question:** “ticker, globalTimeline, updateRoot, exportRoot는 render loop에서 어떻게 연결되나요?”
- **Selected modules:** `CI + CM + PC` — root graph, ticker property/method catalog, external-loop integration.
- **Owned canonicals (4):**
  - `S005` gsap.globalTimeline — `https://gsap.com/docs/v3/GSAP/gsap.globalTimeline`
  - `S006` gsap.ticker — `https://gsap.com/docs/v3/GSAP/gsap.ticker`
  - `S013` gsap.exportRoot() — `https://gsap.com/docs/v3/GSAP/gsap.exportRoot()`
  - `S032` gsap.updateRoot() — `https://gsap.com/docs/v3/GSAP/gsap.updateRoot()`
- **Concepts/attributes/methods:** unparented animations under root; ticker listeners/time/frame; add/remove/fps/lagSmoothing/deltaRatio and exact property contracts; GSAP root update; external renderer handoff; exporting/reparenting root children and delayed-call inclusion boundary.
- **Examples / representation:** animated clock diagram plus a pauseable tick log; delta/fps calculator; external-render-loop pseudocode with manual stepping; exportRoot child-tree before/after diagram. A diagram is primary because multiple invisible clocks are the concept.
- **Why this is not too broad:** four low-level sources describe one root scheduling system. Ordinary playback and Timeline authoring remain separate.

## Phase D — build and control Timelines

## 25 — Schedule callbacks and pauses on a Timeline

- **Route / title:** `/fundamentals/timeline-callbacks-pauses` — “animation 사이에 함수와 멈춤 지점을 어떻게 예약하나요?”
- **Order / prerequisites:** 25; pages 17 and 24; page 26’s minimal Timeline constructor is previewed in one sentence.
- **Core learner question:** “시간에 배치한 callback, pause, lifecycle callback, completion Promise는 어떻게 다르나요?”
- **Selected modules:** `CM` — scheduling signatures, callback taxonomy, pause/removal and completion flow.
- **Owned canonicals (6):**
  - `S012` gsap.delayedCall() — `https://gsap.com/docs/v3/GSAP/gsap.delayedCall()`
  - `S083` Timeline.addPause() — `https://gsap.com/docs/v3/GSAP/Timeline/addPause()`
  - `S084` Timeline.call() — `https://gsap.com/docs/v3/GSAP/Timeline/call()`
  - `S090` Timeline.eventCallback() — `https://gsap.com/docs/v3/GSAP/Timeline/eventCallback()`
  - `S111` Timeline.removePause() — `https://gsap.com/docs/v3/GSAP/Timeline/removePause()`
  - `S123` Timeline.then() — `https://gsap.com/docs/v3/GSAP/Timeline/then()`
- **Concepts/attributes/methods:** callback Tween returned by delayedCall and cancel boundary; insert callback at a position; insert/remove pause callback; lifecycle callback get/set; Promise completion; position parameter introduced only enough to place events.
- **Examples / representation:** a single horizontal event track with animation blocks, callback pins, and a removable pause pin; live log shows playhead crossing; separate delayedCall countdown and cancellation; async status for `then()`.
- **Why this is not too broad:** every source bridges time to application code. General child insertion, labels, and playback commands are owned by following Timeline lessons.

## 26 — Build a Timeline sequence

- **Route / title:** `/fundamentals/timeline-basics` — “여러 Tween을 하나의 조절 가능한 순서로 어떻게 묶나요?”
- **Order / prerequisites:** 26; pages 03–05, 12–13.
- **Core learner question:** “Timeline을 만들고 to/from/fromTo/set Tween을 어떤 순서로 추가하나요?”
- **Selected modules:** `CG + CM + CI + PC` — container mental model, constructor vars, fluent creation methods, position introduction.
- **Owned canonicals (7):**
  - `S030` gsap.timeline() — `https://gsap.com/docs/v3/GSAP/gsap.timeline()`
  - `S073` Timeline — `https://gsap.com/docs/v3/GSAP/Timeline`
  - `S080` Timeline.vars — `https://gsap.com/docs/v3/GSAP/Timeline/vars`
  - `S091` Timeline.from() — `https://gsap.com/docs/v3/GSAP/Timeline/from()`
  - `S092` Timeline.fromTo() — `https://gsap.com/docs/v3/GSAP/Timeline/fromTo()`
  - `S120` Timeline.set() — `https://gsap.com/docs/v3/GSAP/Timeline/set()`
  - `S126` Timeline.to() — `https://gsap.com/docs/v3/GSAP/Timeline/to()`
- **Concepts/attributes/methods:** Timeline as child-animation container/playhead; constructor and full vars catalog; defaults and inheritance boundary; insertion return chaining; destination/start/explicit/zero-duration child creation; basic position parameter; nesting capability; returned Timeline lifecycle.
- **Examples / representation:** build one three-step UI sequence incrementally; controls add one step at a time and the block timeline/code update from one sequence descriptor; a second static annotated call contrasts four creation variants; reduced motion presents final stages without autoplay.
- **Why this is not too broad:** it owns only construction and the most common child creators. Precise placement, labels, tree mutation, clocks, repeats, and controls each have focused pages.

## 27 — Place and shift Timeline children

- **Route / title:** `/fundamentals/timeline-child-placement` — “child는 부모 시간축의 어디에 놓이고 변경 시 어떻게 따라가나요?”
- **Order / prerequisites:** 27; pages 15, 24, and 26.
- **Core learner question:** “add, parent, recent, shiftChildren, smoothChildTiming은 배치를 어떻게 결정하나요?”
- **Selected modules:** `CG + CM + CI + PC` — parent/child graph, generic insertion, placement policy, shift visualizer.
- **Owned canonicals (5):**
  - `S077` Timeline.parent — `https://gsap.com/docs/v3/GSAP/Timeline/parent`
  - `S079` Timeline.smoothChildTiming — `https://gsap.com/docs/v3/GSAP/Timeline/smoothChildTiming`
  - `S081` Timeline.add() — `https://gsap.com/docs/v3/GSAP/Timeline/add()`
  - `S108` Timeline.recent() — `https://gsap.com/docs/v3/GSAP/Timeline/recent()`
  - `S121` Timeline.shiftChildren() — `https://gsap.com/docs/v3/GSAP/Timeline/shiftChildren()`
- **Concepts/attributes/methods:** one parent per animation and root default; generic accepted child/callback/label inputs; most recently added child; shifting child start times and optional labels; smooth timing when start/timeScale/reverse changes; nested coordinate boundary.
- **Examples / representation:** draggable block timeline where `add()` positions items; `recent()` highlights the last insertion; shift amount moves children/optional labels; toggle demonstrates smoothChildTiming with numeric start-time readouts. Diagram and scrubber share a child descriptor array.
- **Why this is not too broad:** the five APIs/properties all govern structural placement. Finding/removing children and semantic labels are separate.

## 28 — Name and navigate Timeline moments

- **Route / title:** `/fundamentals/timeline-labels` — “숫자 대신 의미 있는 이름으로 시간 위치를 어떻게 다루나요?”
- **Order / prerequisites:** 28; pages 26–27.
- **Core learner question:** “label을 만들고 현재·앞·뒤 label을 찾고 그 위치로 이동하려면?”
- **Selected modules:** `CM + PC` — label map catalog, navigation signatures, labeled ruler.
- **Owned canonicals (7):**
  - `S076` Timeline.labels — `https://gsap.com/docs/v3/GSAP/Timeline/labels`
  - `S082` Timeline.addLabel() — `https://gsap.com/docs/v3/GSAP/Timeline/addLabel()`
  - `S086` Timeline.currentLabel() — `https://gsap.com/docs/v3/GSAP/Timeline/currentLabel()`
  - `S102` Timeline.nextLabel() — `https://gsap.com/docs/v3/GSAP/Timeline/nextLabel()`
  - `S106` Timeline.previousLabel() — `https://gsap.com/docs/v3/GSAP/Timeline/previousLabel()`
  - `S110` Timeline.removeLabel() — `https://gsap.com/docs/v3/GSAP/Timeline/removeLabel()`
  - `S119` Timeline.seek() — `https://gsap.com/docs/v3/GSAP/Timeline/seek()`
- **Concepts/attributes/methods:** name-to-time map; add/remove and returned time; current label get/set; next/previous search relative to time; seek by numeric time or label; missing-label/boundary behavior as canonical; labels versus callbacks.
- **Examples / representation:** labeled chapter ruler with one scrubber; buttons compute current/next/previous and seek; editing a label updates the map, call, and displayed code; a warning demonstrates names as stable semantic anchors.
- **Why this is not too broad:** all seven sources operate on the label map. General position syntax and control Tweens are linked.

## 29 — Inspect a Timeline’s children and metadata

- **Route / title:** `/fundamentals/timeline-inspection` — “중첩된 Timeline 안에서 원하는 child를 어떻게 찾나요?”
- **Order / prerequisites:** 29; pages 12, 26–28.
- **Core learner question:** “ID, target, child type, nesting 범위로 Timeline 내부를 어떻게 조회하나요?”
- **Selected modules:** `CM + CI + PC` — tree inspector, query/filter matrix, metadata/external-driver properties.
- **Owned canonicals (5):**
  - `S075` Timeline.data — `https://gsap.com/docs/v3/GSAP/Timeline/data`
  - `S078` Timeline.scrollTrigger — `https://gsap.com/docs/v3/GSAP/Timeline/scrollTrigger`
  - `S093` Timeline.getById() — `https://gsap.com/docs/v3/GSAP/Timeline/getById()`
  - `S094` Timeline.getChildren() — `https://gsap.com/docs/v3/GSAP/Timeline/getChildren()`
  - `S095` Timeline.getTweensOf() — `https://gsap.com/docs/v3/GSAP/Timeline/getTweensOf()`
- **Concepts/attributes/methods:** arbitrary `data`; optional associated ScrollTrigger boundary; descendant ID lookup; child enumeration filters/type/nesting/time; target-specific descendant Tween query; local Timeline scope versus global GSAP query.
- **Examples / representation:** a small nested tree with IDs, target chips, and data; query controls highlight returned nodes and show array contents; scrollTrigger stays an optional property row/link because plugin behavior is outside scope.
- **Why this is not too broad:** every source helps inspect one Timeline object graph. Mutation and destruction are page 30.

## 30 — Remove, clear, kill, or revert Timeline content

- **Route / title:** `/fundamentals/timeline-cleanup` — “무엇을 보존하면서 Timeline 내용을 제거하나요?”
- **Order / prerequisites:** 30; pages 18, 26–29.
- **Core learner question:** “remove, clear, killTweensOf, kill, revert, autoRemoveChildren의 보존 범위는?”
- **Selected modules:** `CM + CI + PC` — lifecycle decision table, object-tree/state snapshots, cleanup methods.
- **Owned canonicals (6):**
  - `S074` Timeline.autoRemoveChildren — `https://gsap.com/docs/v3/GSAP/Timeline/autoRemoveChildren`
  - `S085` Timeline.clear() — `https://gsap.com/docs/v3/GSAP/Timeline/clear()`
  - `S100` Timeline.kill() — `https://gsap.com/docs/v3/GSAP/Timeline/kill()`
  - `S101` Timeline.killTweensOf() — `https://gsap.com/docs/v3/GSAP/Timeline/killTweensOf()`
  - `S109` Timeline.remove() — `https://gsap.com/docs/v3/GSAP/Timeline/remove()`
  - `S118` Timeline.revert() — `https://gsap.com/docs/v3/GSAP/Timeline/revert()`
- **Concepts/attributes/methods:** automatic completed-child disposal and reverse/seek consequence; remove one child/callback/label; clear children and optional labels while retaining Timeline; scoped target/property kills; kill Timeline for GC; revert child state then kill; method return/lifecycle cautions.
- **Examples / representation:** one reusable tree/state fixture; each action produces before/after rows for Timeline existence, children, labels, target style, and reversibility; no simultaneous animations are needed.
- **Why this is not too broad:** all six choices answer cleanup scope on the same object graph. Context/React cleanup is linked because its owner is lifecycle integration, not Timeline mutation.

## 31 — Control Timeline playback

- **Route / title:** `/fundamentals/timeline-playback-controls` — “전체 sequence를 하나의 animation처럼 어떻게 제어하나요?”
- **Order / prerequisites:** 31; pages 13 and 26.
- **Core learner question:** “Tween과 같은 control API가 child sequence에 어떤 효과를 주나요?”
- **Selected modules:** `CM + CI` — Timeline playback state machine, label-aware method parameters, status lab.
- **Owned canonicals (8):**
  - `S098` Timeline.isActive() — `https://gsap.com/docs/v3/GSAP/Timeline/isActive()`
  - `S103` Timeline.pause() — `https://gsap.com/docs/v3/GSAP/Timeline/pause()`
  - `S104` Timeline.paused() — `https://gsap.com/docs/v3/GSAP/Timeline/paused()`
  - `S105` Timeline.play() — `https://gsap.com/docs/v3/GSAP/Timeline/play()`
  - `S114` Timeline.restart() — `https://gsap.com/docs/v3/GSAP/Timeline/restart()`
  - `S115` Timeline.resume() — `https://gsap.com/docs/v3/GSAP/Timeline/resume()`
  - `S116` Timeline.reverse() — `https://gsap.com/docs/v3/GSAP/Timeline/reverse()`
  - `S117` Timeline.reversed() — `https://gsap.com/docs/v3/GSAP/Timeline/reversed()`
- **Concepts/attributes/methods:** shared Animation-style state contracts retained under official Timeline canonicals; play/reverse from time or label where accepted; pause/paused, resume, restart, reversed, ancestor-aware active state; cascading effect on children.
- **Examples / representation:** one three-child Timeline and a state machine; buttons control the container, while child block highlights show cascade; starting from a label demonstrates Timeline-specific parameter value without re-owning labels.
- **Why this is not too broad:** these eight methods are the complete playback-command cluster. Numeric playhead/control-Tween methods are next.

## 32 — Scrub or tween a Timeline playhead

- **Route / title:** `/fundamentals/timeline-playhead` — “Timeline 위치를 즉시 바꾸거나 부드럽게 이동하려면?”
- **Order / prerequisites:** 32; pages 14, 28, and 31.
- **Core learner question:** “time/progress setters와 tweenTo/tweenFromTo는 어떤 사용자 경험 차이를 만들까요?”
- **Selected modules:** `CM + CI` — playhead coordinate ruler, direct-versus-animated control, returned control Tween.
- **Owned canonicals (6):**
  - `S107` Timeline.progress() — `https://gsap.com/docs/v3/GSAP/Timeline/progress()`
  - `S124` Timeline.time() — `https://gsap.com/docs/v3/GSAP/Timeline/time()`
  - `S128` Timeline.totalProgress() — `https://gsap.com/docs/v3/GSAP/Timeline/totalProgress()`
  - `S129` Timeline.totalTime() — `https://gsap.com/docs/v3/GSAP/Timeline/totalTime()`
  - `S130` Timeline.tweenFromTo() — `https://gsap.com/docs/v3/GSAP/Timeline/tweenFromTo()`
  - `S131` Timeline.tweenTo() — `https://gsap.com/docs/v3/GSAP/Timeline/tweenTo()`
- **Concepts/attributes/methods:** local versus repeat-inclusive coordinates; label acceptance where canonical; direct setter jumps; control Tween animates Timeline playhead; start/end/vars semantics, immediate rendering and returned Tween controls; interruption/overwrite boundary.
- **Examples / representation:** one chapter Timeline with direct scrub mode and smooth navigation mode; the same destination descriptor produces `time/progress` or `tweenTo`; a two-handle range produces `tweenFromTo`. Ruler and child preview stay synchronized.
- **Why this is not too broad:** all six APIs position the playhead. Playback state and clock-length calculation are separate.

## 33 — Understand Timeline clock math

- **Route / title:** `/fundamentals/timeline-timing-math` — “children이 바뀌면 Timeline의 duration과 위치는 어떻게 계산되나요?”
- **Order / prerequisites:** 33; pages 15, 26–27, and 32.
- **Core learner question:** “Timeline 자체의 delay/start/end/timeScale과 child-derived duration은 어떻게 연결되나요?”
- **Selected modules:** `CM + CI + PC` — nested duration model, scaling calculator, local/global rulers.
- **Owned canonicals (7):**
  - `S087` Timeline.delay() — `https://gsap.com/docs/v3/GSAP/Timeline/delay()`
  - `S088` Timeline.duration() — `https://gsap.com/docs/v3/GSAP/Timeline/duration()`
  - `S089` Timeline.endTime() — `https://gsap.com/docs/v3/GSAP/Timeline/endTime()`
  - `S096` Timeline.globalTime() — `https://gsap.com/docs/v3/GSAP/Timeline/globalTime()`
  - `S122` Timeline.startTime() — `https://gsap.com/docs/v3/GSAP/Timeline/startTime()`
  - `S125` Timeline.timeScale() — `https://gsap.com/docs/v3/GSAP/Timeline/timeScale()`
  - `S127` Timeline.totalDuration() — `https://gsap.com/docs/v3/GSAP/Timeline/totalDuration()`
- **Concepts/attributes/methods:** base duration derived from children; setting duration scales child timing; repeat-inclusive totalDuration; parent-local start/end and global conversion; initial delay; timeScale cascading; smoothChildTiming relationship.
- **Examples / representation:** block ruler with adjustable child lengths/gaps and repeat count; computed Timeline duration/end/total/global values; setting duration visibly rescales child blocks; formulas and canonical caveats appear next to the diagram.
- **Why this is not too broad:** these seven are the Timeline clock cluster. Playhead navigation and structural placement have their own lessons.

## 34 — Repeat and invalidate a Timeline

- **Route / title:** `/fundamentals/timeline-repeats` — “sequence 전체를 반복·왕복하고 children 값을 다시 계산하려면?”
- **Order / prerequisites:** 34; pages 16, 26, and 33.
- **Core learner question:** “Timeline repeat cycle은 child 순서와 invalidation에 어떤 영향을 주나요?”
- **Selected modules:** `CM + CI` — cycle strip for a sequence, getter/setter contracts, child invalidation propagation.
- **Owned canonicals (5):**
  - `S097` Timeline.invalidate() — `https://gsap.com/docs/v3/GSAP/Timeline/invalidate()`
  - `S099` Timeline.iteration() — `https://gsap.com/docs/v3/GSAP/Timeline/iteration()`
  - `S112` Timeline.repeat() — `https://gsap.com/docs/v3/GSAP/Timeline/repeat()`
  - `S113` Timeline.repeatDelay() — `https://gsap.com/docs/v3/GSAP/Timeline/repeatDelay()`
  - `S132` Timeline.yoyo() — `https://gsap.com/docs/v3/GSAP/Timeline/yoyo()`
- **Concepts/attributes/methods:** whole-sequence extra iteration count, gaps, current iteration, reversed child order under yoyo, invalidation cascading to children, restart/repeatRefresh relationship as canonical.
- **Examples / representation:** two-child sequence displayed as forward/reverse cycle blocks; controls change repeat/delay/yoyo; deterministic function-value counters on children demonstrate invalidate propagation; reduced motion uses cycle diagrams and manual step controls.
- **Why this is not too broad:** the five APIs share one sequence-cycle mental model. Tween repeat behavior is a prerequisite comparison, not duplicate ownership.

## Phase E — calculate reusable values and modify rendered output

## 35 — Meet `gsap.utils`

- **Route / title:** `/fundamentals/gsap-utils` — “animation 밖의 값 계산을 왜 utility 함수로 분리하나요?”
- **Order / prerequisites:** 35; pages 01, 03, and basic functions.
- **Core learner question:** “`gsap.utils` namespace, callable catalog, direct mode, reusable-function mode는 어떻게 연결되나요?”
- **Selected modules:** `CG + UT + PC` — namespace/hub boundary, member chooser, composition/overload mental model.
- **Owned canonicals (2):**
  - `S007` gsap.utils — `https://gsap.com/docs/v3/GSAP/gsap.utils`
  - `S133` Utility Methods — `https://gsap.com/docs/v3/GSAP/UtilityMethods`
- **Concepts/attributes/methods:** namespace property versus utility-method hub; pure/stateful/mutating distinctions; direct value and returned-function modes; composability; 17-member map and routing by problem; use inside function-based values/modifiers without owning those pages.
- **Examples / representation:** no decorative Tween. A value-in/value-out workbench chooses a utility family, previews return shape, and links to its owning lesson; a pipeline diagram shows reusable functions; mutation badges flag array-changing utilities.
- **Why this is not too broad:** it is an index and mental-model page only. Every callable’s full overloads and edge cases belong to pages 36–40 or page 21 (`selector`).

## 36 — Map, normalize, interpolate, and split values

- **Route / title:** `/fundamentals/range-interpolation` — “입력 범위를 animation 값과 색으로 어떻게 바꾸나요?”
- **Order / prerequisites:** 36; pages 08 and 35.
- **Core learner question:** “clamp, normalize, mapRange, interpolate는 값 변환 pipeline의 어느 단계인가요?”
- **Selected modules:** `UT + EV` — overload contracts, number-line mapping, generalized interpolation/color boundary.
- **Owned canonicals (5):**
  - `S135` gsap.utils.clamp() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp()`
  - `S138` gsap.utils.interpolate() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate()`
  - `S139` gsap.utils.mapRange() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange()`
  - `S140` gsap.utils.normalize() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize()`
  - `S146` gsap.utils.splitColor() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor()`
- **Concepts/attributes/methods:** direct and curried overloads; limiting versus remapping; 0–1 normalized progress; interpolation across numbers/colors/strings/arrays/objects as canonical; color format component conversion and HSL/RGB/alpha options; extrapolation/clamping/mutation boundaries.
- **Examples / representation:** a single input slider flows across aligned number lines—clamp → normalize → mapRange → interpolate; mode switches use number, color, array, object; splitColor presents a component table. Pure calculation runtime (`use...Runtime` or `.example.ts`) is used, not an animation hook.
- **Why this is not too broad:** five utilities form one value-conversion pipeline. Units/composition and cyclic/quantized values are separate.

## 37 — Build CSS-ready utility pipelines

- **Route / title:** `/fundamentals/utility-pipelines-units` — “계산 함수들을 연결하고 CSS 단위를 안전하게 유지하려면?”
- **Order / prerequisites:** 37; pages 06, 35, and 36.
- **Core learner question:** “pipe, unitize, getUnit, checkPrefix가 raw 값과 CSS property를 어떻게 연결하나요?”
- **Selected modules:** `UT + II` — input/output contract composition, unit extraction/reattachment, browser-property lookup.
- **Owned canonicals (4):**
  - `S134` gsap.utils.checkPrefix() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix()`
  - `S137` gsap.utils.getUnit() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit()`
  - `S141` gsap.utils.pipe() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe()`
  - `S148` gsap.utils.unitize() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize()`
- **Concepts/attributes/methods:** left-to-right function compatibility; unit parsing; preserve/force unit wrapper; vendor-prefix lookup and returned property; direct versus reusable function forms; numeric parsing and incompatible pipeline cautions.
- **Examples / representation:** typed pipeline builder shows each intermediate value and exact input/output; unitize lab wraps a clamp/map function; checkPrefix is a static browser result with fallback warning. This remains a calculation lab.
- **Why this is not too broad:** these utilities solve the boundary from raw calculation to CSS-ready output. Range math is a prerequisite and modifier rendering is page 40.

## 38 — Normalize and randomize target collections

- **Route / title:** `/fundamentals/utility-collections-random` — “여러 후보를 배열로 만들고 무작위 순서를 어떻게 정하나요?”
- **Order / prerequisites:** 38; pages 03 and 35.
- **Core learner question:** “toArray, random, shuffle의 반환값·함수 모드·mutation은 어떻게 다른가요?”
- **Selected modules:** `UT` — input-shape normalization, random overloads, mutation contract.
- **Owned canonicals (3):**
  - `S142` gsap.utils.random() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/random()`
  - `S144` gsap.utils.shuffle() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle()`
  - `S147` gsap.utils.toArray() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray()`
- **Concepts/attributes/methods:** selector/array-like/single-value normalization and optional scope; number range/increment and array-choice overloads; immediate and reusable random function; in-place shuffle mutation; deterministic-testing disclaimer without adding test code; relationship to Tween targets/function values.
- **Examples / representation:** a visible collection input becomes a normalized array; random selects one value or number; shuffle shows same array identity with changed order; before/after reference badge makes mutation observable. Static calculation runtime is clearer than motion.
- **Why this is not too broad:** the three utilities operate on candidate collections and choice/order. Scoped selector has lifecycle ownership on page 21.

## 39 — Distribute values across a group

- **Route / title:** `/fundamentals/utility-distribute` — “index와 grid 위치에 따라 서로 다른 값을 어떻게 배분하나요?”
- **Order / prerequisites:** 39; pages 08, 35, 36, and multi-target concept from page 03.
- **Core learner question:** “base, amount/each, from, grid, axis, ease가 각 index의 결과를 어떻게 계산하나요?”
- **Selected modules:** `UT + EV` — complete configuration catalog, grid/value heatmap, stagger relationship boundary.
- **Owned canonicals (1):**
  - `S136` gsap.utils.distribute() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute()`
- **Concepts/attributes/methods:** returned index-based function; config fields, accepted origins/grid/axis/ease and defaults/special values exactly as sourced; amount versus each; index/target/array inputs; relationship to advanced stagger without claiming stagger source ownership.
- **Examples / representation:** a 1D row then 2D grid heatmap; controls update numeric result on every cell and the serialized config; optional one-step application to x/opacity shows use after the calculation is understood. Heatmap is primary.
- **Why this is not too broad:** one dense utility deserves a dedicated page because grid geometry and easing form their own mental model.

## 40 — Wrap, snap, and modify every rendered value

- **Route / title:** `/fundamentals/modifiers-snap-wrap` — “계산된 값을 매 render마다 순환·왕복·간격 고정하려면?”
- **Order / prerequisites:** 40; pages 06, 35–37, and 39.
- **Core learner question:** “utility로 함수를 만들고 Modifiers/Snap plugin에 연결하면 최종 값이 언제 바뀌나요?”
- **Selected modules:** `PL + PC + UT` — per-render modifier pipeline, cyclic/quantized utility overloads, plugin-versus-utility boundary.
- **Owned canonicals (5):**
  - `S036` Modifiers — `https://gsap.com/docs/v3/GSAP/CorePlugins/Modifiers`
  - `S037` Snap — `https://gsap.com/docs/v3/GSAP/CorePlugins/Snap`
  - `S145` gsap.utils.snap() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/snap()`
  - `S149` gsap.utils.wrap() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()`
  - `S150` gsap.utils.wrapYoyo() — `https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo()`
- **Concepts/attributes/methods:** auto-included Modifiers and Snap special properties; modifier called per render with value transformation; snap increments/value lists/radius/2D and returned-function overloads; numeric/array cyclic wrap; ping-pong wrapYoyo; unit preservation relation; Snap plugin versus `utils.snap()` ownership boundary.
- **Examples / representation:** one continuously increasing raw value passes through selectable modifier stages; raw → wrapped/snapped → rendered readouts stay visible; a number line shows wrap discontinuity and wrapYoyo reflection; a 2D snap plot handles point/radius overload. Reduced motion uses manual scrubbing.
- **Why this is not too broad:** all five sources implement one final-value transformation pipeline. General range math, grid distribution, and CSS property semantics are prerequisites.

## Explicit cross-page ownership boundaries

1. **Inherited Tween/Timeline APIs:** identically named official canonicals are not deduplicated. Tween contracts are owned by pages 13–18; Timeline canonicals are owned by pages 25 and 29–34. A shared “Animation-style API” note is non-owning because no standalone official Animation page exists.
2. **`gsap.to()` versus Tween vars:** page 03 owns every claim on the `gsap.to()` canonical. Page 05 owns the separate `Tween/vars` canonical. Shared options can be summarized in both, but each source item needs evidence under its one canonical owner.
3. **GSAP/Timeline creation variants:** page 04 owns global `gsap.from/fromTo/set`; page 26 owns Timeline instance `from/fromTo/set/to`. The former creates a Tween on the default root; the latter creates and inserts a child at a position.
4. **Namespace versus utility catalog:** page 35 owns both official hub boundaries. Callable facts live only on pages 21 and 36–40.
5. **Snap names:** page 40 explicitly owns both `CorePlugins/Snap` and `UtilityMethods/snap()` and must teach that the special property applies snapping during animation while the utility returns/calculates snapped values.
6. **Selector/context/React:** scoped selector’s callable contract is page 21; React refs are only an accepted-input example there. Full hook lifecycle is page 23.
7. **Ticker/high-frequency input:** page 19 owns cached property setters/Tweens; page 24 owns the frame dispatcher. Each links to the other without merging performance claims.
8. **Effects versus plugins:** page 20 owns reusable animation recipes. Page 02 owns plugin registration; plugin-specific pages own their APIs. An effect is not taught as a plugin.
9. **ScrollTrigger properties:** pages 12 and 29 own only the published Tween/Timeline `scrollTrigger` property canonicals. ScrollTrigger behavior is outside this 159-source inventory and remains an explicit dependency/blocker for any deeper demo.
10. **Eases:** page 08 owns built-ins, parse/register, and SteppedEase; pages 09–11 own their plugin canonicals. A plugin page may recap normalized progress but may not claim coverage of the Easing hub.

## Mechanical ownership matrix

| Page | Catalog IDs owned | Count |
| --- | --- | ---: |
| 01 | S001, S003, S008 | 3 |
| 02 | S002, S028 | 2 |
| 03 | S031 | 1 |
| 04 | S014, S015, S029 | 3 |
| 05 | S009, S011, S042 | 3 |
| 06 | S033 | 1 |
| 07 | S034, S035 | 2 |
| 08 | S023, S026, S151, S158 | 4 |
| 09 | S153 | 1 |
| 10 | S152, S154 | 2 |
| 11 | S155, S156, S157 | 3 |
| 12 | S038, S039, S041, S065 | 4 |
| 13 | S049, S052, S053, S054, S058, S059, S060, S061 | 8 |
| 14 | S040, S055, S063, S067, S070, S071 | 6 |
| 15 | S043, S044, S045, S047, S064, S068, S069 | 7 |
| 16 | S048, S050, S056, S057, S072 | 5 |
| 17 | S046, S066 | 2 |
| 18 | S016, S018, S019, S020, S051, S062 | 6 |
| 19 | S017, S024, S025 | 3 |
| 20 | S004, S027 | 2 |
| 21 | S010, S143 | 2 |
| 22 | S021, S022 | 2 |
| 23 | S159 | 1 |
| 24 | S005, S006, S013, S032 | 4 |
| 25 | S012, S083, S084, S090, S111, S123 | 6 |
| 26 | S030, S073, S080, S091, S092, S120, S126 | 7 |
| 27 | S077, S079, S081, S108, S121 | 5 |
| 28 | S076, S082, S086, S102, S106, S110, S119 | 7 |
| 29 | S075, S078, S093, S094, S095 | 5 |
| 30 | S074, S085, S100, S101, S109, S118 | 6 |
| 31 | S098, S103, S104, S105, S114, S115, S116, S117 | 8 |
| 32 | S107, S124, S128, S129, S130, S131 | 6 |
| 33 | S087, S088, S089, S096, S122, S125, S127 | 7 |
| 34 | S097, S099, S112, S113, S132 | 5 |
| 35 | S007, S133 | 2 |
| 36 | S135, S138, S139, S140, S146 | 5 |
| 37 | S134, S137, S141, S148 | 4 |
| 38 | S142, S144, S147 | 3 |
| 39 | S136 | 1 |
| 40 | S036, S037, S145, S149, S150 | 5 |
| **Total** | **S001–S159 exactly once** | **159** |

## Implementation and release gates

Each page should enter implementation only after a Source Curator expands every owned canonical into item-level claims and a Content Architect freezes that page’s learner flow, module selection, examples, source boundaries, and exact files. Grouping canonicals never permits a combined “covered” flag: release evidence remains per source item.

Recommended implementation slices follow the prerequisite phases rather than attempting all 40 pages at once:

1. Phase A, pages 01–07: setup and first motion.
2. Phase B, pages 08–20: easing and Tween mental models.
3. Phase C, pages 21–24: lifecycle/integration/root clock.
4. Phase D, pages 25–34: Timeline construction and control.
5. Phase E, pages 35–40: pure utilities and rendered-value modification.

For each slice, run independent Official Coverage, Learning Transformation/Pedagogy, Runtime/Display Sync (when executable), Structure/Comment, Accessibility/Motion (when interactive), Build/Integration, and Cross-page Consistency reviews. A separate Release Reviewer must see 0 planned/blocked source items, no unresolved `BLOCK`, TypeScript/Vite and applicable browser/keyboard/small-screen/reduced-motion evidence before any page is labeled complete. Creating or modifying a shared `src/components` UI additionally requires its Storybook story and `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`; otherwise record `none: shared component unchanged`.

## Final audit result

- Proposed learning pages: **40**
- Catalog sources: **159**
- Unique assigned sources: **159**
- Unassigned sources: **0**
- Multiply owned sources: **0**
- Non-counted source defects preserved: **2** (`Animation` missing canonical, broken `CustomEasee` alias)
