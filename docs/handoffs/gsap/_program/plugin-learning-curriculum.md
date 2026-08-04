# GSAP plugin-side N:1 beginner learning curriculum

Reviewed against the local official-source catalogs dated 2026-08-02. This is a curriculum and ownership design, not an implementation handoff. Repository files remain untouched.

## Decision summary

- Official plugin-side inventory: **220 canonical technical sources**.
- Canonical overlaps owned by the core/fundamentals curriculum: **15**.
- Unique plugin-owned sources assigned here: **205**.
- Proposed visible learning pages: **46**.
- Assignment model: many official API pages may feed one visible learning page, but every canonical source has exactly one owner.
- Unassigned sources: **0**. Ambiguous owners: **0**.

## Non-negotiable page contract

Every page below must reach the explanatory depth of the current `gsap.to()` page rather than imitate its exact layout. Each page must include:

1. a coverage header showing owned canonical sources and local evidence status;
2. terms defined before use, a beginner mental model, call/config anatomy, and a clear “when would I use this?” boundary;
3. complete API reference data for every owned property/method: signature, input/return type, default, accepted/special values, timing, caveats, and relation to neighboring APIs;
4. one-example/one-question learning units with goal, controls, preview or better representation, synchronized displayed code, property/method details, “what changed,” “what to watch,” “why,” use cases, and warnings;
5. runtime/display synchronization from one normalized config or discriminated descriptor: plugin calls and lifecycle in `use<Example>Animation.ts` (or `Runtime.ts`/pure example when appropriate), serializer only formats the same values in TSX;
6. plugin registration/dependency, browser/framework constraints, cleanup/revert behavior, keyboard/screen-reader implications, small-screen behavior, and `prefers-reduced-motion` behavior;
7. explicit links to core-owned Installation, `gsap.registerPlugin()`, `gsap.context()`, `gsap.matchMedia()`, Tween/Timeline/CSS/Easing pages instead of duplicating their canonical ownership.

Module abbreviations: **CG** concept/guide, **CM** callable method, **CI** class/instance, **PL** plugin, **PC** property catalog, **UT** utility/overload, **II** installation/integration.

Official source references use the immutable row numbers and exact titles from `official-plugin-source-catalog.md`; the row is the canonical URL identity, not a loose topic tag.

## 0. Plugin model and legacy CSS integration

### P01 — `/fundamentals/plugins` — Plugins: loading, registration, and ownership

- **Learner question:** What changes when I add a plugin, and why must it be loaded and registered before a vars property works?
- **Prerequisites:** `gsap.to()`, JavaScript imports; core-owned Installation and `gsap.registerPlugin()` are companion prerequisites.
- **Modules:** CG, PL, II.
- **Exact canonical sources owned:** **#17 Plugins overview**.
- **API/content scope:** core-included versus separately loaded plugins; import/script-tag availability; one-time registration; bundler tree-shaking; plugin values extending `vars`; harmless re-registration; navigation to all plugin families. Installation details remain core-owned.
- **Example/representation:** static import/register flow diagram plus an interactive “unregistered → registered” diagnostic that uses one actual plugin; displayed import, registration, and tween code derive from the chosen plugin descriptor. A decision table compares core-included, standalone, dependent, and third-party integrations.
- **Dependency/environment/cleanup/motion:** no new dependency beyond GSAP for the static lesson; the executable comparison uses a small browser-only plugin and disposes its instance. Motion is opt-in/replayable and becomes an immediate end-state under reduced motion.
- **Breadth justification:** this single official overview asks one foundational question and should remain a short front door, not be mixed with any plugin’s API catalog.

### P02 — `/fundamentals/css-rule-plugin` — CSSRulePlugin: animate a stylesheet rule

- **Learner question:** How can a tween change a CSS rule shared by many elements, and why can stylesheet access fail?
- **Prerequisites:** CSS selectors/rules, CSSPlugin, plugin registration.
- **Modules:** PL, PC, CM, II.
- **Exact canonical sources owned:** **#18 CSSRulePlugin; #19 CSSRulePlugin.getRule()**.
- **API/content scope:** rule lookup signature/return/null behavior, proxy style object, pseudo-element selector form, tween vars, shared-rule effects, browser stylesheet and cross-origin/CORS constraints.
- **Example/representation:** one same-origin stylesheet rule controlling several cards; selector control and color/size control feed a normalized rule descriptor used by `getRule()` and the serializer. A static failure matrix covers missing selector, inaccessible stylesheet, and inline-style alternative.
- **Dependency/environment/cleanup/motion:** load/register CSSRulePlugin; browser CSSOM only; kill/revert tween and restore rule declaration; announce shared visual change and keep content readable; duration zero under reduced motion.
- **Breadth justification:** the getter exists only to obtain the plugin’s tween target, so separating two pages would repeat the same mental model and example.

## 1. Draggable

### P03 — `/fundamentals/draggable-create` — Draggable: create and find an instance

- **Learner question:** What object does Draggable create, what does it remember, and how do I retrieve it later?
- **Prerequisites:** DOM targets, transforms, plugin registration.
- **Modules:** PL, CI, CM, PC.
- **Exact canonical sources owned:** **#20 Draggable; #52 Draggable.create(); #53 Draggable.get(); #56 Draggable.target; #59 Draggable.vars**.
- **API/content scope:** create signature/array return, target normalization, `type` and core vars anatomy, instance identity, `get()` lookup, `target`, original normalized `vars`, basic drag lifecycle and coordinate model.
- **Example/representation:** single draggable card with type selector; instance inspector displays target, vars, and lookup identity. Controls, `Draggable.create()` input, inspector, and displayed code share one creation descriptor.
- **Dependency/environment/cleanup/motion:** register Draggable; pointer/touch/mouse browser environment; `kill()` instance on React cleanup; preserve native click/focus behavior; dragging is user-driven, and any reset animation is instant under reduced motion.
- **Breadth justification:** these five canonicals are the minimum instance-construction mental model; movement, constraints, events, and lifecycle are deferred.

### P04 — `/fundamentals/draggable-coordinates` — Draggable coordinates: start, delta, pointer, and end

- **Learner question:** Which coordinate tells me where the target, pointer, or gesture is at each drag stage?
- **Prerequisites:** P03; Cartesian coordinates and rotation degrees.
- **Modules:** CI, PC, CM.
- **Exact canonical sources owned:** **#24 Draggable.deltaX; #25 Draggable.deltaY; #30 Draggable.endRotation; #31 Draggable.endX; #32 Draggable.endY; #33 Draggable.getDirection(); #45 Draggable.pointerEvent; #46 Draggable.pointerX; #47 Draggable.pointerY; #48 Draggable.rotation; #50 Draggable.startX; #51 Draggable.startY; #60 Draggable.x; #61 Draggable.y**.
- **API/content scope:** target versus pointer coordinates, initial/current/delta/end snapshots, translation versus rotation mode, direction calculation target/time modes, underlying pointer event, update timing and read-only/stateful boundaries.
- **Example/representation:** a coordinate lab with one draggable puck and a phase timeline (`press → drag → release`); live readouts color-code pointer and target values. A translation/rotation descriptor drives creation, labels, readouts, and displayed code; a static diagram explains coordinate frames.
- **Dependency/environment/cleanup/motion:** Draggable and browser pointer events; unsubscribe/kill at cleanup; readouts use throttled DOM output with a textual release summary; no automatic motion, and reset is immediate for reduced motion.
- **Breadth justification:** fourteen small references all answer one otherwise confusing question—“which coordinate do I read?”—and are clearer in one synchronized inspector than fourteen near-empty pages.

### P05 — `/fundamentals/draggable-bounds-axis` — Draggable constraints, axis lock, auto-scroll, and resync

- **Learner question:** How do I keep a dragged target inside a useful area and keep its geometry correct when layout changes?
- **Prerequisites:** P03–P04; element boxes and scrolling containers.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#22 Draggable.applyBounds(); #23 Draggable.autoScroll; #37 Draggable.lockAxis; #38 Draggable.lockedAxis; #39 Draggable.maxRotation; #40 Draggable.maxX; #41 Draggable.maxY; #42 Draggable.minRotation; #43 Draggable.minX; #44 Draggable.minY; #58 Draggable.update(); #62 Draggable.zIndex**.
- **API/content scope:** bounds inputs/recalculation, min/max fields by mode, lock request versus resolved axis, edge auto-scroll intensity, z-index promotion, `update()` after external transforms/layout, and when constraints are measured.
- **Example/representation:** resizable bounded tray with axis-lock and auto-scroll controls; a bounds overlay and min/max inspector use the same normalized constraint descriptor passed to Draggable. A step example externally moves the target then contrasts stale state with `update()`.
- **Dependency/environment/cleanup/motion:** DOM layout measurement and overflow container; resize/scroll cleanup plus `kill()`; keyboard buttons provide equivalent position changes and report bounds; user drag remains, automatic corrections become immediate under reduced motion.
- **Breadth justification:** every source concerns spatial constraint or geometry synchronization; splitting fields from the operation that computes them would hide their causal relationship.

### P06 — `/fundamentals/draggable-lifecycle` — Draggable lifecycle: enable, drive, disable, and kill

- **Learner question:** When should I temporarily stop dragging, simulate a drag, or permanently dispose the instance?
- **Prerequisites:** P03; component lifecycle.
- **Modules:** CI, CM.
- **Exact canonical sources owned:** **#26 Draggable.disable(); #27 Draggable.enable(); #28 Draggable.enabled(); #29 Draggable.endDrag(); #36 Draggable.kill(); #49 Draggable.startDrag()**.
- **API/content scope:** enabled state getter, listener attachment, programmatic start/end semantics and event argument, disable versus kill, return chaining, idempotence and framework unmount.
- **Example/representation:** one card with enable/disable, programmatic start/end, and recreate controls; a state machine shows `enabled`, `pressed`, and disposed. The command descriptor generates both invoked method and code panel.
- **Dependency/environment/cleanup/motion:** pointer event needed for realistic `startDrag`; kill on unmount and detach any added listeners; controls are keyboard-operable with live status; no autonomous animation.
- **Breadth justification:** six methods are transitions of one instance state machine and become much easier to understand together.

### P07 — `/fundamentals/draggable-events` — Draggable gesture events and recent-drag state

- **Learner question:** How do I react once per gesture without polling every frame or treating a click as a drag?
- **Prerequisites:** P03–P04; event listeners/callbacks.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#21 Draggable.addEventListener(); #34 Draggable.isPressed; #55 Draggable.timeSinceDrag()**.
- **API/content scope:** event names/listener lifecycle, `isPressed` timing, recent-drag elapsed-time threshold use, click-versus-drag decisions, listener context and removal boundary from parent docs.
- **Example/representation:** gesture log for press/drag/release/click with live `isPressed` and elapsed time; listener names and displayed registration code come from one event descriptor. A timeline representation explains why release and “recent drag” are distinct.
- **Dependency/environment/cleanup/motion:** remove listeners and kill instance; accessible buttons simulate the decision logic without requiring precise dragging; no automatic motion.
- **Breadth justification:** these references jointly answer event-driven gesture classification, not geometry or lifecycle ownership.

### P08 — `/fundamentals/draggable-collision-momentum` — Draggable collision and throw state

- **Learner question:** How do I detect overlap and understand the momentum tween after release?
- **Prerequisites:** P03–P05; Tween basics; Inertia lesson recommended.
- **Modules:** CI, CM, PC, II.
- **Exact canonical sources owned:** **#35 Draggable.isThrowing; #54 Draggable.hitTest(); #57 Draggable.tween**.
- **API/content scope:** hit-test target/threshold forms and return, inertia throw state, generated tween reference, polling boundary, and relationship to InertiaPlugin.
- **Example/representation:** drag one puck toward one drop zone; threshold control drives `hitTest()` and an optional inertia toggle exposes `isThrowing`/`tween`. Collision result, active tween inspector, and code serialize the same descriptor.
- **Dependency/environment/cleanup/motion:** Draggable always; InertiaPlugin only for throw branch and registered explicitly; kill Draggable and throw tween; visual overlap has text status; disable inertia and settle immediately under reduced motion.
- **Breadth justification:** collision and momentum are advanced post-drag observations, small enough for one focused capstone and too dependent on basics for P03.

## 2. SVG drawing, morphing, and paths

### P09 — `/fundamentals/draw-svg` — DrawSVG: reveal and measure an SVG stroke

- **Learner question:** How do stroke length and visible start/end positions turn a path into a drawing animation?
- **Prerequisites:** SVG path/stroke basics, `gsap.to()`.
- **Modules:** PL, PC, CM.
- **Exact canonical sources owned:** **#63 DrawSVG; #64 DrawSVG.getLength(); #65 DrawSVG.getPosition()**.
- **API/content scope:** `drawSVG` value forms, percentages/lengths/ranges/live suffix, stroke geometry, static length/position signatures and results, supported SVG elements, zero/hidden geometry caveats.
- **Example/representation:** one path with range sliders and a stroke ruler; measurement buttons compare total length and current visible interval. A normalized range descriptor supplies plugin vars and serialized code; a static SVG diagram explains dash offset.
- **Dependency/environment/cleanup/motion:** register DrawSVGPlugin; rendered stroke-capable SVG required; revert tween/style; path remains fully understandable without animation, and reduced motion immediately applies selected reveal state.
- **Breadth justification:** measurement methods explain the numbers used by the single plugin property, so all three canonicals form one complete beginner question.

### P10 — `/fundamentals/easel-plugin` — EaselPlugin: tween CreateJS display objects

- **Learner question:** How does GSAP write CSS-like values to an EaselJS canvas object that is not a DOM element?
- **Prerequisites:** `gsap.to()`, basic CreateJS/EaselJS stage and ticker concepts.
- **Modules:** PL, PC, II.
- **Exact canonical sources owned:** **#66 Easel**.
- **API/content scope:** CreateJS target model, supported display/color/filter properties, `easel` vars, stage render/update responsibility, plugin versus DOM CSS boundary.
- **Example/representation:** one canvas shape with x/rotation/color controls; runtime descriptor drives the EaselPlugin tween and displayed code, while an execution diagram separates GSAP value updates from stage drawing.
- **Dependency/environment/cleanup/motion:** load EaselJS/CreateJS and register EaselPlugin; browser canvas only; remove ticker/update callback and kill tween/stage references; canvas has adjacent text status; duration zero under reduced motion.
- **Breadth justification:** one official source describes one integration boundary; further splitting would only duplicate setup.

### P11 — `/fundamentals/flip-first-last` — Flip fundamentals: capture first, change layout, animate last

- **Learner question:** How can I animate a DOM layout change when I only know the layout before and after it happens?
- **Prerequisites:** DOM layout, transforms, `gsap.to()`.
- **Modules:** PL, CG, CI, CM, PC.
- **Exact canonical sources owned:** **#67 Flip; #70 Flip.from(); #71 Flip.getState(); #75 Flip.to()**.
- **API/content scope:** FLIP mental model, capture timing, DOM mutation boundary, state targets/props, `from()` versus `to()`, returned timeline, key vars/callbacks and nested/simple layout caveats.
- **Example/representation:** one card moves between two containers; a three-step `getState → mutate → Flip.from` mode and a `Flip.to` comparison share a state/mode descriptor. A first/last/invert/play diagram accompanies synchronized code.
- **Dependency/environment/cleanup/motion:** register Flip; browser layout measurement after fonts/layout settle; interrupt/kill active flips and restore intended DOM state; focus order stays DOM-logical; reduced motion performs layout change with no transition.
- **Breadth justification:** these four canonicals are the irreducible FLIP cycle; learners need to see them together before advanced layout tools.

### P12 — `/fundamentals/flip-fit-absolute` — Flip layout tools: fit and temporary absolute positioning

- **Learner question:** How do I align one element to another or remove an element from flow without losing visual continuity?
- **Prerequisites:** P11; CSS containing blocks and absolute positioning.
- **Modules:** CM, UT, PC.
- **Exact canonical sources owned:** **#69 Flip.fit(); #74 Flip.makeAbsolute()**.
- **API/content scope:** `fit()` target/state forms, apply/getVars modes, scale/fitChild, absolute conversion return, containing-block/nesting effects, when these tools mutate versus only calculate.
- **Example/representation:** source and destination boxes with “calculate vars / apply / animate” steps, plus before/after flow outline for `makeAbsolute()`. One fit descriptor owns inputs, actual call, returned values, and code.
- **Dependency/environment/cleanup/motion:** Flip registered; DOM measurement; restore inline styles/flow and kill tween; keep reading/focus order stable; apply final alignment immediately under reduced motion.
- **Breadth justification:** both APIs solve the same intermediate problem—preserving visual coordinates while layout ownership changes.

### P13 — `/fundamentals/flip-batch-interrupt` — Flip batches and interruption control

- **Learner question:** How do I coordinate several related layout changes and prevent an old flip from fighting a new one?
- **Prerequisites:** P11–P12; callbacks and timeline basics.
- **Modules:** CM, CI.
- **Exact canonical sources owned:** **#68 Flip.batch(); #72 Flip.isFlipping(); #73 Flip.killFlipsOf()**.
- **API/content scope:** batch creation/actions lifecycle, state/action hooks, active-flip query, target-scoped interruption, concurrent UI updates and cleanup ordering.
- **Example/representation:** sortable/filterable three-card batch with rapid-toggle control; batch phase log and target status derive from one action descriptor. A race timeline contrasts unchecked overlap with `isFlipping`/`killFlipsOf` policy.
- **Dependency/environment/cleanup/motion:** register Flip; browser DOM; kill batch/active flips and revert scoped work; controls keyboard-operable and focus preserved; reduced motion mutates final order immediately without batch animation.
- **Breadth justification:** these three canonicals answer the advanced concurrency question and would overload the first FLIP lesson.

### P14 — `/fundamentals/gsdevtools` — GSDevTools: inspect and control animation time

- **Learner question:** How can I scrub, slow, and isolate an animation while developing it?
- **Prerequisites:** Tween/Timeline controls.
- **Modules:** PL, CI, CM, II.
- **Exact canonical sources owned:** **#76 GSDevTools; #77 GSDevTools.create()**.
- **API/content scope:** create signature/instance, animation/global selection, paused/timeScale/visibility and UI configuration, development-only workflow and relation to IDs/global timeline.
- **Example/representation:** a short labelled timeline and a GSDevTools instance; config controls feed one descriptor and synchronized setup code. A static production-boundary checklist explains conditional loading.
- **Dependency/environment/cleanup/motion:** register GSDevTools; browser DOM and development environment; destroy/kill instance and avoid shipping UI by default; keyboard-accessible native controls remain available; example starts paused and reduced motion avoids autoplay.
- **Breadth justification:** the static creator is simply the entry point for the tool described by its parent source.

### P15 — `/fundamentals/inertia` — InertiaPlugin: continue motion from measured velocity

- **Learner question:** How does release velocity become a predicted destination that still respects bounds and snapping?
- **Prerequisites:** Tween properties; Draggable basics helpful.
- **Modules:** PL, PC, CM, II.
- **Exact canonical sources owned:** **#78 Inertia; #89 Inertia.getVelocity(); #90 Inertia.isTracking(); #91 Inertia.track(); #92 Inertia.untrack()**.
- **API/content scope:** inertia property config, velocity forms (`auto`, number), resistance/duration/end/bounds concepts, static tracking lifecycle, get/query signatures, numeric/property contracts and distinction from physics/collision engines.
- **Example/representation:** user flicks one slider/puck; tracking, measured velocity, predicted end, bounds, and snap-end appear on one number line. A discriminated inertia descriptor drives tracking/tween/config/code.
- **Dependency/environment/cleanup/motion:** register InertiaPlugin; high-frequency browser input; untrack every property and kill tween at cleanup; keyboard velocity samples and textual prediction provided; reduced motion disables throw and snaps immediately.
- **Breadth justification:** the four static methods supply the measurement lifecycle required by the parent property, so one end-to-end question prevents fragmented setup.

### P16 — `/fundamentals/velocity-tracker-lifecycle` — VelocityTracker: choose properties and manage tracking

- **Learner question:** How do I start and stop tracking the exact properties whose velocity I will need later?
- **Prerequisites:** P15; object properties and units.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#79 VelocityTracker; #80 VelocityTracker.addProp(); #85 VelocityTracker.removeProp(); #87 VelocityTracker.track; #88 VelocityTracker.untrack()**.
- **API/content scope:** tracker ownership, static/instance tracking entry points, property/comma-list forms, type/unit handling, add/remove versus whole-target untrack, returned trackers and memory/listener lifetime.
- **Example/representation:** move one object on x and rotation; toggle tracked properties and inspect tracker membership. One tracking-set descriptor drives calls, membership UI, and serialized code.
- **Dependency/environment/cleanup/motion:** InertiaPlugin owns VelocityTracker; untrack/remove properties at cleanup; inputs have keyboard equivalents and explicit units; no autonomous animation is required.
- **Breadth justification:** these methods are all mutations of the tracker’s property set and form one lifecycle lesson.

### P17 — `/fundamentals/velocity-tracker-read` — VelocityTracker: read velocity and find trackers

- **Learner question:** Once tracking is active, how do I obtain the correct tracker, target, and property velocity?
- **Prerequisites:** P16.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#81 VelocityTracker.get(); #82 VelocityTracker.getByTarget(); #83 VelocityTracker.isTracking(); #84 VelocityTracker.isTrackingProp(); #86 VelocityTracker.target**.
- **API/content scope:** per-property velocity return and unit, target-to-tracker lookup, target/property boolean queries, target identity, missing/untracked behavior, sampling timing.
- **Example/representation:** live velocity gauge with x/rotation selector and lookup/query matrix; the selected target/property descriptor supplies actual queries and code. A sampling timeline explains why instantaneous reads vary.
- **Dependency/environment/cleanup/motion:** tracking initialized via P16 pattern and untracked on cleanup; live values are rate-limited and announced only on demand; user-driven input, no required automatic motion.
- **Breadth justification:** all five canonicals are read/query operations over one established tracker and belong after, not inside, setup.

### P18 — `/fundamentals/morph-svg` — MorphSVG fundamentals: make two shapes compatible

- **Learner question:** How does GSAP match two different SVG shapes and decide what path data to render?
- **Prerequisites:** SVG path basics, `gsap.to()`.
- **Modules:** PL, PC, CG.
- **Exact canonical sources owned:** **#93 MorphSVG; #95 MorphSVG.defaultRender; #96 MorphSVG.defaultType; #97 MorphSVG.defaultUpdateTarget**.
- **API/content scope:** `morphSVG` target/value/config forms, shape matching/index/winding/origin/type, render/update hooks, default global behaviors, target replacement and compatible geometry caveats.
- **Example/representation:** one icon morphs between two paths; type/origin/shape-index controls feed a normalized morph descriptor and code. Corresponding point markers and a winding diagram explain matching before motion.
- **Dependency/environment/cleanup/motion:** register MorphSVGPlugin; rendered SVG paths/shapes; restore original `d` and defaults after demo, kill tween; meaningful final SVG/label always present; reduced motion switches immediately between shapes.
- **Breadth justification:** defaults only make sense as changes to the parent morph pipeline; keeping them here establishes the rendering mental model.

### P19 — `/fundamentals/morph-svg-path-data` — MorphSVG path conversion and raw-path data

- **Learner question:** How can I convert shapes to paths and inspect or serialize the raw geometry used for morphing?
- **Prerequisites:** P18; SVG path command basics.
- **Modules:** CM, UT.
- **Exact canonical sources owned:** **#94 MorphSVG.convertToPath; #98 MorphSVG.rawPathToString; #99 MorphSVG.stringToRawPath**.
- **API/content scope:** accepted element/selector/path inputs, conversion mutation/return, string↔raw-path structures, precision/output, reuse with MotionPath, unsupported/malformed input caveats.
- **Example/representation:** static geometry converter with rectangle/path input and three sequential views: DOM shape, raw numeric structure, serialized path string. One conversion descriptor powers calls and displayed code; no decorative tween.
- **Dependency/environment/cleanup/motion:** register MorphSVGPlugin; SVG DOM for conversion but raw string utilities are calculation-focused; remove converted demo nodes/restore originals; accessible data table; motion `none` because the question is representation.
- **Breadth justification:** these three utilities form a reversible data pipeline distinct from visual morph configuration.

### P20 — `/fundamentals/motion-path-helper` — MotionPathHelper: edit a path and dispose the editor

- **Learner question:** How can I visually edit a motion path, reuse the resulting data, and remove the editing UI cleanly?
- **Prerequisites:** MotionPath basics (P21), SVG path data.
- **Modules:** PL, CI, CM, II.
- **Exact canonical sources owned:** **#15 MotionPathHelper.kill(); #16 MotionPathHelper.editPath(); #100 MotionPathHelper**.
- **API/content scope:** helper creation/options, static `editPath()` versus instance use, selection/handles/keyboard behavior, path updates, callback/output boundary, `kill()` and temporary editor DOM.
- **Example/representation:** editable single path with mode controls and a synchronized path-data code panel; one editor descriptor drives helper creation and code. A lifecycle panel shows editor DOM before/after kill and recreate.
- **Dependency/environment/cleanup/motion:** load/register MotionPathPlugin and MotionPathHelper; browser DOM/SVG and pointer/keyboard; call `kill()` and remove temporary controls; keyboard path editing and focus management are mandatory; path editing is user-driven, follower preview is disabled or instant under reduced motion.
- **Breadth justification:** the two member canonicals are the creation and disposal edges of the parent editor and cannot teach a useful workflow separately.

### P21 — `/fundamentals/motion-path` — MotionPath fundamentals: move and orient along a path

- **Learner question:** How does a normal tween use path progress, alignment, and auto-rotation to move one target?
- **Prerequisites:** `gsap.to()`, SVG/coordinate basics, plugin registration.
- **Modules:** PL, PC, CG.
- **Exact canonical sources owned:** **#101 MotionPath**.
- **API/content scope:** path inputs (selector/string/points), start/end progress, curviness/type, align/alignOrigin, autoRotate, property mapping, coordinate-space boundary and relationship to helper/raw utilities.
- **Example/representation:** one follower on one visible path with start/end, align-origin, and autoRotate controls; one normalized config feeds runtime and serializer. Path progress markers explain what 0–1 means before playback.
- **Dependency/environment/cleanup/motion:** register MotionPathPlugin; browser DOM/SVG for visual example; revert transforms and kill tween; alternative position summary; reduced motion shows selected end point immediately.
- **Breadth justification:** the parent source is broad enough for a full beginner page; utilities move to three question-specific pages to avoid a giant catalog.

### P22 — `/fundamentals/motion-path-data` — MotionPath raw-path conversion pipeline

- **Learner question:** How do points, arrays, SVG shapes, strings, and raw paths convert into one reusable geometry format?
- **Prerequisites:** P21; arrays and SVG paths.
- **Modules:** UT, CM.
- **Exact canonical sources owned:** **#102 MotionPath.pointsToSegment; #103 MotionPath.arrayToRawPath(); #105 MotionPath.convertToPath(); #110 MotionPath.getRawPath(); #112 MotionPath.rawPathToString(); #114 MotionPath.stringToRawPath()**.
- **API/content scope:** each accepted input/output shape, mutation/return behavior, resolution/curviness options, DOM conversion versus pure conversion, raw-path structure and round-trip precision.
- **Example/representation:** no animation; a selectable conversion pipeline displays points/array/SVG/string/raw path at every stage and verifies round-trip output. One discriminated conversion descriptor supplies the actual utility call and code.
- **Dependency/environment/cleanup/motion:** register MotionPathPlugin; SVG DOM only for `convertToPath`, other steps calculation-oriented; restore DOM shape/remove conversions; semantic tables; motion `none`.
- **Breadth justification:** all six APIs transform geometry representation and naturally compose into one inspectable pipeline.

### P23 — `/fundamentals/motion-path-coordinates` — MotionPath coordinate conversion and alignment matrices

- **Learner question:** Why does a point move when elements use different coordinate spaces, and which matrix converts it correctly?
- **Prerequisites:** P21–P22; local/global coordinates and transforms.
- **Modules:** UT, CM, CG.
- **Exact canonical sources owned:** **#104 MotionPath.convertCoordinates(); #106 MotionPath.getAlignMatrix(); #107 MotionPath.getGlobalMatrix(); #111 MotionPath.getRelativePosition()**.
- **API/content scope:** from/to elements, point conversion, global matrix options, alignment matrix inputs/origin, relative-position calculation, nested transforms and SVG/HTML coordinate differences.
- **Example/representation:** nested transformed containers with one point shown simultaneously in local/global/relative coordinates; matrix values and point result derive from one coordinate descriptor. A static axes overlay is primary; optional short alignment replay is secondary.
- **Dependency/environment/cleanup/motion:** MotionPathPlugin, browser layout and transforms; remove overlay and revert transforms; values available in table/text; reduced motion keeps static axes/result and skips travel.
- **Breadth justification:** these four utilities all answer cross-space conversion; mixing them with raw serialization would obscure the matrix mental model.

### P24 — `/fundamentals/motion-path-measure` — MotionPath length, sampling, and slicing

- **Learner question:** How do I ask where a path is, how long it is, or extract only one progress interval?
- **Prerequisites:** P21–P22; normalized progress.
- **Modules:** UT, CM.
- **Exact canonical sources owned:** **#108 MotionPath.getLength(); #109 MotionPath.getPositionOnPath(); #113 MotionPath.sliceRawPath()**.
- **API/content scope:** length return/units, sampled position/angle at progress, slicing start/end/wrap behavior and returned raw path, edge values and closed-path caveats.
- **Example/representation:** one path ruler with progress/start/end controls; static marker, tangent arrow, reported length, and sliced highlight all use the same raw path descriptor. Displayed calls serialize exact control values.
- **Dependency/environment/cleanup/motion:** register MotionPathPlugin; rendered SVG optional when raw path supplied; remove overlays; output values labelled; motion `none` by default because measurement is clearest statically, with optional replay disabled under reduced motion.
- **Breadth justification:** length, point sampling, and interval slicing are three views of the same measured progress domain.

## 3. Observer and physics

### P25 — `/fundamentals/observer-create` — Observer: create, configure, and find observers

- **Learner question:** How do wheel, touch, pointer, and scroll inputs become one Observer instance?
- **Prerequisites:** browser events, plugin registration.
- **Modules:** PL, CI, CM, PC.
- **Exact canonical sources owned:** **#115 Observer; #127 Observer.create(); #128 Observer.getAll(); #129 Observer.getById(); #131 Observer.target; #132 Observer.vars**.
- **API/content scope:** input `type`, target/tolerance/debounce/preventDefault/lockAxis vars, create return, id/all lookup, target and normalized vars, Observer standalone versus `ScrollTrigger.observe()` equivalence.
- **Example/representation:** one input pad with selectable event types and tolerance; an observer registry/instance inspector and code panel derive from the same descriptor.
- **Dependency/environment/cleanup/motion:** register standalone Observer unless ScrollTrigger provides it; browser input listeners; kill on cleanup; keyboard buttons emit equivalent logical directions and status; no autonomous motion.
- **Breadth justification:** these six sources establish creation and identity; signal values and state transitions need separate questions.

### P26 — `/fundamentals/observer-signals` — Observer signals: delta, position, velocity, and event source

- **Learner question:** Which value tells me how far, how fast, and from what event the latest input moved?
- **Prerequisites:** P25; coordinate and velocity basics.
- **Modules:** CI, PC.
- **Exact canonical sources owned:** **#116 Observer.deltaX; #117 Observer.deltaY; #120 Observer.event; #125 Observer.startX; #126 Observer.startY; #130 Observer.isTouch; #133 Observer.velocityX; #134 Observer.velocityY; #135 Observer.x; #136 Observer.y**.
- **API/content scope:** start/current/delta/velocity semantics and update timing, dominant event source, static touch capability classification, units/sign, wheel versus pointer differences.
- **Example/representation:** one signal oscilloscope with x/y vectors and a phase table; the same observer descriptor drives capture, readouts, and code. Static arrows remain useful without movement.
- **Dependency/environment/cleanup/motion:** browser wheel/touch/pointer/scroll; kill observer; rate-limit live announcements and offer freeze/read button; user-driven only.
- **Breadth justification:** ten small fields jointly explain one input sample; separate pages would repeat the same gesture.

### P27 — `/fundamentals/observer-gesture-state` — Observer press and drag state

- **Learner question:** When is input merely pressed, and when has it crossed into dragging?
- **Prerequisites:** P25–P26; tolerance.
- **Modules:** CI, PC, CG.
- **Exact canonical sources owned:** **#121 Observer.isDragging; #123 Observer.isPressed**.
- **API/content scope:** press/drag transition timing, tolerance relationship, release boundary, pointer/touch applicability and callback selection.
- **Example/representation:** a two-state/three-phase press→drag→release lab with adjustable tolerance; state badges and callback code share one descriptor.
- **Dependency/environment/cleanup/motion:** Observer browser listeners; kill on cleanup; keyboard press/drag simulation; no automatic motion.
- **Breadth justification:** both booleans are meaningful only in direct comparison.

### P28 — `/fundamentals/observer-lifecycle` — Observer lifecycle: enable, disable, and kill

- **Learner question:** How do I pause observation, check its status, or dispose it permanently?
- **Prerequisites:** P25.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#118 Observer.disable(); #119 Observer.enable(); #122 Observer.isEnabled; #124 Observer.kill()**.
- **API/content scope:** listener attachment/state, disable versus kill, re-enable boundary, chaining/return, unmount cleanup.
- **Example/representation:** lifecycle state machine with enable/disable/kill/recreate commands; one command descriptor invokes and serializes the selected method.
- **Dependency/environment/cleanup/motion:** kill on component cleanup; buttons and status fully keyboard/screen-reader accessible; motion `none`.
- **Breadth justification:** four sources are transitions and inspection of one lifecycle.

### P29 — `/fundamentals/physics-motion` — Physics2D and PhysicsProps: velocity-driven tweening

- **Learner question:** When should I describe motion as a 2D launch, and when should each property have independent velocity and acceleration?
- **Prerequisites:** `gsap.to()`, velocity/acceleration/friction.
- **Modules:** PL, PC, CG.
- **Exact canonical sources owned:** **#137 Physics2D; #138 PhysicsProps**.
- **API/content scope:** Physics2D velocity/angle/gravity/friction model; PhysicsProps per-property velocity/acceleration/friction; time-based tween integration, units, ease boundary, and explicit non-goals such as collisions.
- **Example/representation:** same dot/config goal shown in exclusive 2D-launch and independent x/y-property modes; a discriminated physics descriptor drives plugin vars, vectors, and code.
- **Dependency/environment/cleanup/motion:** register selected plugin; kill/revert tween; vector/result text provided; reduced motion shows calculated final sample immediately and disables continuous launch.
- **Breadth justification:** two one-page sibling plugins answer a direct selection question and benefit from one controlled comparison.

## 4. Rendering, text, and React integration

### P30 — `/fundamentals/pixi-plugin` — PixiPlugin: tween PixiJS display objects

- **Learner question:** How does GSAP understand PixiJS transforms, colors, and renderer-specific properties?
- **Prerequisites:** PixiJS application/stage basics, `gsap.to()`.
- **Modules:** PL, PC, CM, II.
- **Exact canonical sources owned:** **#139 Pixi; #140 Pixi.registerPIXI()**.
- **API/content scope:** active PIXI namespace registration, plugin vars and supported properties, color/blur/skew/scale/anchor/pivot behavior, Pixi/GSAP version boundary and renderer update model.
- **Example/representation:** one Pixi sprite with transform/color mode controls; namespace/setup and tween config serialize from one integration descriptor.
- **Dependency/environment/cleanup/motion:** load PixiJS, register PixiPlugin and namespace; destroy app/canvas/tween; adjacent text describes state; duration zero and no ticker-driven decoration under reduced motion.
- **Breadth justification:** `registerPIXI()` is the prerequisite entry point for the parent integration, not an independent learning goal.

### P31 — `/fundamentals/scramble-text` — ScrambleText: replace text through readable intermediate characters

- **Learner question:** How can text look scrambled during transition while its final and accessible meaning stays clear?
- **Prerequisites:** `gsap.to()`, DOM text and accessibility basics.
- **Modules:** PL, PC.
- **Exact canonical sources owned:** **#141 ScrambleText**.
- **API/content scope:** text/chars/speed/delimiter/revealDelay/rightToLeft/tweenLength/class options, character sets, intermediate/final content, HTML/text boundary.
- **Example/representation:** one status phrase with character-set and reveal controls; normalized config drives tween and code, while a static phase strip shows initial/intermediate/final values.
- **Dependency/environment/cleanup/motion:** register ScrambleTextPlugin; preserve an accessible final string and avoid noisy live-region updates; revert text/class on cleanup; reduced motion swaps directly to final text.
- **Breadth justification:** one focused plugin source supports one complete page.

### P32 — `/fundamentals/split-text-create` — SplitText: split text into usable parts

- **Learner question:** What DOM and arrays does SplitText create for characters, words, lines, and masks?
- **Prerequisites:** DOM text, CSS layout, plugin registration.
- **Modules:** PL, CI, CM, PC.
- **Exact canonical sources owned:** **#206 SplitText; #207 SplitText.chars; #210 SplitText.lines; #211 SplitText.masks; #214 SplitText.create(); #215 SplitText.vars; #216 SplitText.words**.
- **API/content scope:** constructor/static create, type/classes/mask/aria/autoSplit vars, generated wrapper structure, chars/words/lines/masks arrays, fonts/layout measurement and animation handoff.
- **Example/representation:** one sentence with split-type/mask controls; DOM tree inspector and array counts use the exact created instance, and code serializes the same descriptor.
- **Dependency/environment/cleanup/motion:** register SplitText; browser DOM/fonts must settle; revert instance on cleanup; preserve semantic accessible text and avoid character-by-character reading; reduced motion keeps split inspection but skips staggered animation.
- **Breadth justification:** seven sources define creation output as one object; lifecycle changes are deferred.

### P33 — `/fundamentals/split-text-lifecycle` — SplitText re-splitting, revert, and disposal

- **Learner question:** What should happen when fonts or width change, and how do I restore the original DOM?
- **Prerequisites:** P32; responsive layout and component cleanup.
- **Modules:** CI, CM, PC, II.
- **Exact canonical sources owned:** **#208 SplitText.isSplit; #209 SplitText.kill(); #212 SplitText.revert(); #213 SplitText.split()**.
- **API/content scope:** split-state inspection, re-split inputs/result, `revert()` restoration, `kill()` disposal distinction, responsive/auto-split ordering and animation cleanup.
- **Example/representation:** resizable text box with split/re-split/revert/kill commands and before/after DOM snapshots; command descriptor powers call and code.
- **Dependency/environment/cleanup/motion:** wait for fonts, observe resize only when needed, stop animation before re-split, revert/kill at unmount; focus/selection and accessible text preserved; no animation required.
- **Breadth justification:** all four sources are transitions of one split instance after creation.

### P34 — `/fundamentals/text-plugin` — TextPlugin: interpolate element text

- **Learner question:** How does GSAP replace text over time, and when do delimiter, padding, or classes change the result?
- **Prerequisites:** `gsap.to()`, DOM text.
- **Modules:** PL, PC.
- **Exact canonical sources owned:** **#217 Text Replacement**.
- **API/content scope:** string/config forms, `value`, `newClass`, `oldClass`, `delimiter`, `padSpace`, element content target, final/intermediate behavior and contrast with ScrambleText/SplitText.
- **Example/representation:** one phrase with delimiter/padding/class controls; config descriptor drives runtime and code, plus a static token alignment representation.
- **Dependency/environment/cleanup/motion:** register TextPlugin; restore original content/classes; accessible final text available without announcing every frame; reduced motion applies final value immediately.
- **Breadth justification:** one official source is a focused property catalog.

### P35 — `/fundamentals/react-gsap-patterns` — React and GSAP: useful and advanced patterns

- **Learner question:** After learning core `useGSAP()`, how should components structure refs, reusable animation logic, interactions, and advanced composition?
- **Prerequisites:** core-owned React/useGSAP page, `gsap.context()`, React hooks.
- **Modules:** CG, II.
- **Exact canonical sources owned:** **#219 React & GSAP — Advanced Techniques; #220 React & GSAP — Useful Patterns**.
- **API/content scope:** patterns unique to the two resource pages, component/ref organization, `contextSafe`, reusable animation/component approaches, imperative versus declarative boundaries, advanced sequencing/integration; hook API ownership stays on core page.
- **Example/representation:** paired small component patterns rather than one generic hook: scoped list reveal and context-safe late event; each uses its own runtime source and synchronized displayed code. A decision table selects pattern by lifecycle question.
- **Dependency/environment/cleanup/motion:** React, `gsap`, `@gsap/react`; client-component boundary, Context cleanup, stable dependencies; semantic controls; every animation branches to immediate/low-motion state.
- **Breadth justification:** the two official resources are successive answers to one post-hook architecture question; separating them would repeat the same React setup.

## 5. Smooth and directed scrolling

### P36 — `/fundamentals/scroll-smoother-create` — ScrollSmoother: wrapper, content, and instance setup

- **Learner question:** What DOM structure does smooth scrolling require, and what instance/ScrollTrigger does it create?
- **Prerequisites:** ScrollTrigger fundamentals (P40), native scrolling and layout.
- **Modules:** PL, CI, CM, PC, II.
- **Exact canonical sources owned:** **#142 ScrollSmoother; #143 ScrollSmoother.content(); #152 ScrollSmoother.scrollTrigger; #154 ScrollSmoother.create(); #155 ScrollSmoother.get(); #156 ScrollSmoother.vars; #157 ScrollSmoother.wrapper()**.
- **API/content scope:** singleton/create/get behavior, required wrapper/content, setter/getter forms, vars, owned main ScrollTrigger, vertical/native scroll model and setup failures.
- **Example/representation:** labelled wrapper/content DOM schematic plus one short native-scrolling demo; creation descriptor drives markup labels, runtime config, instance inspector, and code.
- **Dependency/environment/cleanup/motion:** register ScrollTrigger and ScrollSmoother; browser-only vertical layout; kill smoother/main trigger and restore structure/styles; retain native focus/anchors; use native unsmoothed scrolling when reduced motion is requested.
- **Breadth justification:** these seven sources form the structural identity of the smoother; effects and navigation are separate learner tasks.

### P37 — `/fundamentals/scroll-smoother-effects` — ScrollSmoother smoothness, effects, and progress

- **Learner question:** How do smooth duration and data-driven effects change apparent scroll without replacing native scroll position?
- **Prerequisites:** P36; ScrollTrigger progress.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#144 ScrollSmoother.effects(); #149 ScrollSmoother.progress; #153 ScrollSmoother.smooth()**.
- **API/content scope:** smooth getter/setter, progress meaning, effects discovery/refresh and speed/lag behavior, data attributes/config, visual versus native position boundary.
- **Example/representation:** one foreground card over a track with smooth/effect controls and native-vs-rendered position readout; one descriptor drives setter/effects and code.
- **Dependency/environment/cleanup/motion:** P36 dependencies; remove effects and kill smoother; content remains readable and DOM order unchanged; smooth duration/effects disabled under reduced motion.
- **Breadth justification:** all three sources explain rendered scroll transformation rather than structure or navigation.

### P38 — `/fundamentals/scroll-smoother-control` — ScrollSmoother navigation, position, pause, and cleanup

- **Learner question:** How do I read or change smooth scroll position, jump to content, pause input, and dispose the smoother?
- **Prerequisites:** P36–P37.
- **Modules:** CI, CM.
- **Exact canonical sources owned:** **#145 ScrollSmoother.getVelocity(); #146 ScrollSmoother.kill(); #147 ScrollSmoother.offset(); #148 ScrollSmoother.paused(); #150 ScrollSmoother.scrollTo(); #151 ScrollSmoother.scrollTop()**.
- **API/content scope:** velocity and scrollTop getter/setter, target offset calculation, scrollTo target/smooth/position, paused state, kill semantics and native-position restoration.
- **Example/representation:** section navigator with method selector and readout; normalized command descriptor invokes and serializes exact target/position/smooth values.
- **Dependency/environment/cleanup/motion:** ScrollSmoother/ScrollTrigger; kill on unmount; real anchors and focus movement retained; force non-smooth jumps under reduced motion.
- **Breadth justification:** six methods are the command/query lifecycle for one running smoother.

### P39 — `/fundamentals/scroll-to` — ScrollToPlugin: tween window or element scroll

- **Learner question:** How do I tween to an exact scroll destination without fighting user input?
- **Prerequisites:** `gsap.to()`, scroll containers.
- **Modules:** PL, PC, CM.
- **Exact canonical sources owned:** **#158 ScrollTo; #159 ScrollTo.config()**.
- **API/content scope:** x/y target forms, element/number/string/max/offset, autoKill and threshold configuration, window versus element, interaction with proxies/smoothers and user interruption.
- **Example/representation:** one small scroll container with destination/offset/autoKill controls; config and destination descriptor drive tween and code; a static auto-kill timeline explains user takeover.
- **Dependency/environment/cleanup/motion:** register ScrollToPlugin; browser scrolling; kill tween on interruption/unmount and avoid stealing focus; target buttons are real controls; use immediate native scroll under reduced motion.
- **Breadth justification:** global config directly tunes the parent plugin’s auto-kill behavior.

## 6. ScrollTrigger

### P40 — `/fundamentals/scroll-trigger-create` — ScrollTrigger: create and configure a trigger

- **Learner question:** What does ScrollTrigger measure and create before any scroll-driven animation can happen?
- **Prerequisites:** `gsap.to()`, DOM layout, plugin registration.
- **Modules:** PL, CI, CM, PC.
- **Exact canonical sources owned:** **#160 ScrollTrigger; #183 ScrollTrigger.config(); #184 ScrollTrigger.create(); #185 ScrollTrigger.defaults(); #205 ScrollTrigger.vars**.
- **API/content scope:** trigger/scroller/start/end/toggle/actions/scrub/pin/snap vars overview, static create, defaults versus global config, returned instance and stored vars, creation-time measurement.
- **Example/representation:** one trigger line and target with minimal create config, then progressive controls; normalized trigger descriptor drives markers, runtime, vars inspector, and code.
- **Dependency/environment/cleanup/motion:** register ScrollTrigger; browser layout; kill instance/context and refresh after relevant layout; content accessible without pinning; reduced motion disables scrub/pin animation or applies final state by media condition.
- **Breadth justification:** these five sources form the construction/configuration contract; 41 other members are split by learner question.

### P41 — `/fundamentals/scroll-trigger-geometry` — ScrollTrigger geometry and progress

- **Learner question:** Where are the start/end boundaries, which elements define them, and what does the current progress mean?
- **Prerequisites:** P40; viewport and element boxes.
- **Modules:** CI, CM, PC, UT.
- **Exact canonical sources owned:** **#161 ScrollTrigger.animation; #162 ScrollTrigger.direction; #165 ScrollTrigger.end; #168 ScrollTrigger.isActive; #170 ScrollTrigger.labelToScroll(); #172 ScrollTrigger.pin; #174 ScrollTrigger.progress; #176 ScrollTrigger.scroll(); #177 ScrollTrigger.scroller; #178 ScrollTrigger.start; #188 ScrollTrigger.isInViewport(); #193 ScrollTrigger.maxScroll(); #196 ScrollTrigger.positionInViewport(); #204 ScrollTrigger.trigger**.
- **API/content scope:** measured numeric boundaries and owning elements, active/progress/direction, attached animation/pin, scroll getter/setter, timeline label conversion, viewport tests/position/max-scroll signatures and refresh timing.
- **Example/representation:** scroll ruler with trigger/scroller/start/end/pin overlays and live progress; static utility probes use the same selected elements. Geometry descriptor supplies actual calls and displayed code.
- **Dependency/environment/cleanup/motion:** ScrollTrigger browser layout; kill/revert pin spacer and listener work; all values visible textually and focus not trapped; reduced motion keeps ruler/measurements but removes scrubbed movement.
- **Breadth justification:** fourteen fields/utilities are complementary answers to “where am I in the measured scroll space?”

### P42 — `/fundamentals/scroll-trigger-motion` — ScrollTrigger scrub, velocity, batching, and directional snap

- **Learner question:** How can scroll speed/progress drive animation smoothly, group many entrances, and snap in the user’s direction?
- **Prerequisites:** P40–P41; Tween progress and arrays.
- **Modules:** CI, CM, UT.
- **Exact canonical sources owned:** **#166 ScrollTrigger.getTween(); #167 ScrollTrigger.getVelocity(); #180 ScrollTrigger.batch(); #201 ScrollTrigger.snapDirectional()**.
- **API/content scope:** scrub tween retrieval, velocity units/sign, batch callback grouping/interval/batchMax, directional snap function creation and boundary values.
- **Example/representation:** one mode at a time: scrub inspector, batched cards, directional snap number line; discriminated mode descriptor ensures runtime/code sync.
- **Dependency/environment/cleanup/motion:** kill trigger/scrub tween/batches; preserve content order; reduced motion removes scrub/snap and reveals batch content immediately.
- **Breadth justification:** these APIs interpret dynamic scroll motion, distinct from static geometry and lifecycle.

### P43 — `/fundamentals/scroll-trigger-lifecycle` — ScrollTrigger refresh, update, events, and disposal

- **Learner question:** When layout or runtime state changes, which trigger or global lifecycle operation should run?
- **Prerequisites:** P40–P41; component lifecycle.
- **Modules:** CI, CM.
- **Exact canonical sources owned:** **#163 ScrollTrigger.disable(); #164 ScrollTrigger.enable(); #169 ScrollTrigger.kill(); #175 ScrollTrigger.refresh() [instance]; #179 ScrollTrigger.addEventListener(); #197 ScrollTrigger.refresh() [static]; #198 ScrollTrigger.removeEventListener(); #202 ScrollTrigger.sort(); #203 ScrollTrigger.update()**.
- **API/content scope:** enable/disable/kill, instance versus global refresh, update without remeasurement, refresh event ordering/listeners, sort priority/order and layout-change decision matrix.
- **Example/representation:** resizable content changes boundaries; command buttons expose update vs instance/global refresh and state transitions, with an event log. One command descriptor powers calls/code.
- **Dependency/environment/cleanup/motion:** remove global listeners and kill triggers/context; status announced on demand; no extra motion beyond optional target, disabled under reduced motion.
- **Breadth justification:** nine sources are lifecycle reactions to change and should be learned as a decision tree.

### P44 — `/fundamentals/scroll-trigger-registry` — ScrollTrigger registry, neighbors, and global state

- **Learner question:** How do I find triggers, move among their ordered neighbors, inspect environment state, or clear them deliberately?
- **Prerequisites:** P40; IDs and collections.
- **Modules:** CI, CM, PC.
- **Exact canonical sources owned:** **#171 ScrollTrigger.next(); #173 ScrollTrigger.previous(); #186 ScrollTrigger.getAll(); #187 ScrollTrigger.getById(); #189 ScrollTrigger.isScrolling(); #190 ScrollTrigger.isTouch; #191 ScrollTrigger.killAll()**.
- **API/content scope:** registry lookup/collection, next/previous ordering, global scrolling state, touch capability classification, killAll scope/exclusions and per-component cleanup preference.
- **Example/representation:** three labelled triggers and registry navigator; selected query descriptor drives actual lookup and code. KillAll is demonstrated in an isolated sandbox with recreate.
- **Dependency/environment/cleanup/motion:** isolate registry demo and kill only owned triggers at normal cleanup; keyboard navigation and text list; motion not required.
- **Breadth justification:** these seven sources inspect or mutate the global/ordered trigger collection.

### P45 — `/fundamentals/scroll-trigger-responsive` — ScrollTrigger responsive styles and scroll memory

- **Learner question:** How do responsive trigger setups restore styles and browser scroll state when conditions or pages change?
- **Prerequisites:** P40, core-owned `gsap.matchMedia()`.
- **Modules:** CM, II.
- **Exact canonical sources owned:** **#181 ScrollTrigger.clearMatchMedia(); #182 ScrollTrigger.clearScrollMemory(); #192 ScrollTrigger.matchMedia(); #199 ScrollTrigger.saveStyles()**.
- **API/content scope:** legacy plugin matchMedia relationship to core API, saved inline-style restoration, condition cleanup, scroll-memory clearing/config boundary and navigation/refresh timing.
- **Example/representation:** viewport-condition simulator with style snapshot and cleanup log; condition descriptor drives setup/code. Scroll-memory behavior is a static navigation timeline to avoid disrupting the page.
- **Dependency/environment/cleanup/motion:** ScrollTrigger plus media queries; revert conditions/listeners/styles; preserve focus/reading order; include reduced-motion as a first-class condition with no animated branch.
- **Breadth justification:** these four APIs share restoration across responsive/navigation boundaries.

### P46 — `/fundamentals/scroll-trigger-integrations` — ScrollTrigger custom scrollers and normalized input

- **Learner question:** When should ScrollTrigger adapt input, expose Observer, or proxy a non-native scroller?
- **Prerequisites:** P40–P43, Observer fundamentals.
- **Modules:** CM, II, CG.
- **Exact canonical sources owned:** **#194 ScrollTrigger.normalizeScroll(); #195 ScrollTrigger.observe(); #200 ScrollTrigger.scrollerProxy()**.
- **API/content scope:** normalizeScroll observer/config/disable behavior, observe equivalence, scrollerProxy required/optional methods and pin/measurement boundaries, selection guide and warning against unnecessary proxies.
- **Example/representation:** three isolated modes: normalized native input, Observer callback, mock custom scroller proxy; discriminated integration descriptor drives runtime and code. Architecture diagrams are primary for proxy flow.
- **Dependency/environment/cleanup/motion:** ScrollTrigger/embedded Observer, browser events and custom scroller contract; disable/kill normalizer/observer, restore proxy/scroll state, remove listeners; native keyboard scrolling preserved; reduced motion never forces normalization/smoothing.
- **Breadth justification:** all three canonicals are advanced adapters between input/scroller systems and ScrollTrigger; separating them loses the selection boundary.

## Core-owned canonical overlap exclusions (15)

These remain visible in navigation and are linked as prerequisites/related pages, but **must not** be assigned to plugin-owned pages:

1. **#1 Easing** — core Easing hub owner.
2. **#2 CustomBounce** — core Easing child owner.
3. **#3 CustomEase** — core Easing child owner.
4. **#4 CustomWiggle** — core Easing child owner.
5. **#5 ExpoScaleEase** — core Easing child owner.
6. **#6 RoughEase** — core Easing child owner.
7. **#7 SlowMo** — core Easing child owner.
8. **#8 SteppedEase** — core Easing child owner.
9. **#9 Attributes** — core/internal-plugin owner.
10. **#10 CSS** — core Fundamentals CSS owner.
11. **#11 EndArray** — core/internal-plugin owner.
12. **#12 Modifiers** — core/internal-plugin owner.
13. **#13 Snap** — core/internal-plugin owner.
14. **#14 Installation** — core Quick Start/Installation owner.
15. **#218 React / useGSAP** — core Useful features & tools owner.

## Exhaustiveness audit

Assignment sets, written as exact plugin-catalog row IDs:

- P01 `17`; P02 `18,19`
- P03 `20,52,53,56,59`; P04 `24,25,30,31,32,33,45,46,47,48,50,51,60,61`; P05 `22,23,37,38,39,40,41,42,43,44,58,62`; P06 `26,27,28,29,36,49`; P07 `21,34,55`; P08 `35,54,57`
- P09 `63,64,65`; P10 `66`; P11 `67,70,71,75`; P12 `69,74`; P13 `68,72,73`; P14 `76,77`; P15 `78,89,90,91,92`; P16 `79,80,85,87,88`; P17 `81,82,83,84,86`
- P18 `93,95,96,97`; P19 `94,98,99`; P20 `15,16,100`; P21 `101`; P22 `102,103,105,110,112,114`; P23 `104,106,107,111`; P24 `108,109,113`
- P25 `115,127,128,129,131,132`; P26 `116,117,120,125,126,130,133,134,135,136`; P27 `121,123`; P28 `118,119,122,124`; P29 `137,138`
- P30 `139,140`; P31 `141`; P32 `206,207,210,211,214,215,216`; P33 `208,209,212,213`; P34 `217`; P35 `219,220`
- P36 `142,143,152,154,155,156,157`; P37 `144,149,153`; P38 `145,146,147,148,150,151`; P39 `158,159`
- P40 `160,183,184,185,205`; P41 `161,162,165,168,170,172,174,176,177,178,188,193,196,204`; P42 `166,167,180,201`; P43 `163,164,169,175,179,197,198,202,203`; P44 `171,173,186,187,189,190,191`; P45 `181,182,192,199`; P46 `194,195,200`

Expected arithmetic:

- Catalog rows `1..220`: 220.
- Core-owned exclusion set: 15.
- Plugin-owned assignment set: 205.
- Intersection between exclusion and assignment sets: 0.
- Duplicate plugin-owned assignments: 0.
- Missing catalog rows after union of both sets: 0.
- Ambiguous owners: 0.

## Implementation sequencing recommendation

Implement by dependency, not catalog order: P01 → core prerequisites → P03/P25/P40 → their advanced pages; P21 before P20/P22–P24; P40 before P36–P39 and P41–P46; P32 before P33. Each visible page gets its own page-level manifest containing all owned canonical identities and source items, so N:1 presentation never weakens canonical coverage auditing.
