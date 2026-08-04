# GSAP core/fundamentals official source catalog

- Reviewed at: 2026-08-02 (Asia/Seoul)
- Authority: current official `https://gsap.com` pages only
- Release status: `BLOCK` for the two source/alias defects listed below; all 159 cataloged pages themselves are reachable
- Inventory total: **159 pages = 6 hubs + 153 standalone/leaf technical pages**
- Excluded: marketing, account, community, showcase, demos, YouTube, cheat sheet, AI Skills, generic learning articles, and plugin families outside the requested core/fundamentals boundary

## Counting and ownership

| Official category | Hub | Leaf/standalone | Total |
| --- | ---: | ---: | ---: |
| Docs home | 1 | 0 | 1 |
| Quick Start > Installation | 0 | 1 | 1 |
| Fundamentals > GSAP | 1 | 29 | 30 |
| Fundamentals > CSS / GSAP > Internal Plugins | 0 | 5 | 5 |
| Fundamentals > Tween | 1 | 34 | 35 |
| Fundamentals > Timeline | 1 | 59 | 60 |
| Useful features & tools > Utility Methods | 1 | 17 | 18 |
| Fundamentals > Easing | 1 | 7 | 8 |
| Useful features & tools > React - useGSAP() | 0 | 1 | 1 |
| **Total** | **6** | **153** | **159** |

Overlap ownership rules:

- Tween and Timeline both publish separate canonical pages for API inherited from the undocumented `Animation` superclass. Preserve both official 1:1 pages; do not deduplicate them into a guessed Animation page.
- `gsap.utils` is the GSAP namespace property page; `Utility Methods` is the callable catalog hub. Preserve both.
- CSS has a `CorePlugins/CSS` URL but the live sidebar classifies it as top-level `Fundamentals > CSS`. Attributes, EndArray, Modifiers, and Snap are `GSAP > Internal Plugins`.
- Easing child pages include extra ease plugins but the live fundamentals sidebar owns them under `Easing`; preserve that classification.
- React lives at `/resources/React`, not `/docs/v3`, but the current docs sidebar explicitly includes `React - useGSAP()` under `Useful features & tools`, so it is in scope.

## Mapping and module conventions

- A mapping cell is `slug · path suffix · route`; prepend `src/content/gsap/` to every path suffix.
- All routes use the repository's current flat lesson shape `/fundamentals/<slug>`.
- Module codes: `CG` concept/guide, `CM` callable method, `CI` class/instance, `PL` plugin, `PC` property catalog, `UT` utility/overload, `EV` ease/visualizer, `II` installation/integration.
- Evidence codes: `SM` official `https://gsap.com/sitemap-docs.xml`; `SB-H` docs-home sidebar; `SB-G` GSAP sidebar; `SB-IP` Internal Plugins sidebar; `SB-TW` Tween sidebar; `SB-TL` Timeline sidebar; `SB-U` Utility Methods sidebar; `SB-E` Easing sidebar; `SB-R` docs sidebar React link plus React resource page; `PG` requested URL returned HTTP 200 and exposed the matching canonical page.
- Discovery verification: `sitemap-docs.xml` cross-check on 2026-08-02 returned 158 in-scope URLs, all 158 returned HTTP 200; docs home separately returned HTTP 200. Sitemap header `Last-Modified` was 2026-07-31.

## 1. Docs home (official category: Docs home) — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| docsHome · https://gsap.com/docs/v3/ | `docs-home` · `overview/docs-home` · `/fundamentals/docs-home` | CG | Owns platform/core overview and navigation boundary; links Installation, GSAP, Tween, Timeline, CSS, Easing, utilities, core features, plugins, React | SB-H+PG |

## 2. Quick Start > Installation — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| Installation · https://gsap.com/docs/v3/Installation | `installation` · `installation/installation` · `/fundamentals/installation` | II | Owns npm/yarn/CDN/download, ESM/UMD, plugin import/registration, legacy private-repo migration; relates `gsap.registerPlugin()`, React and every plugin/ease | SM+SB-H+PG |

## 3. Fundamentals > GSAP — 30

### Hub — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| GSAP · https://gsap.com/docs/v3/GSAP/ | `gsap` · `gsap/gsap` · `/fundamentals/gsap` | CG+CI | Owns `gsap` access-object mental model, Tween/Timeline relationship, sequencing/position/control overview; delegates member details to the 29 pages below | SM+SB-G+PG |

### Properties — 5

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| gsap.effects · https://gsap.com/docs/v3/GSAP/gsap.effects | `gsap-effects` · `properties/gsap-effects` · `/fundamentals/gsap-effects` | PC | Registry populated by `gsap.registerEffect()`; effect functions may extend timelines | SM+SB-G+PG |
| gsap.globalTimeline · https://gsap.com/docs/v3/GSAP/gsap.globalTimeline | `gsap-global-timeline` · `properties/gsap-global-timeline` · `/fundamentals/gsap-global-timeline` | CI+PC | Root Timeline for unparented animations; relates `exportRoot()`, `updateRoot()`, ticker and Timeline parent | SM+SB-G+PG |
| gsap.ticker · https://gsap.com/docs/v3/GSAP/gsap.ticker | `gsap-ticker` · `properties/gsap-ticker` · `/fundamentals/gsap-ticker` | CI+PC | Frame dispatcher; owns add/remove/fps/lagSmoothing/deltaRatio/time/frame; relates `updateRoot()` | SM+SB-G+PG |
| gsap.utils · https://gsap.com/docs/v3/GSAP/gsap.utils | `gsap-utils` · `properties/gsap-utils` · `/fundamentals/gsap-utils` | CG+PC | Namespace boundary only; callable details belong to Utility Methods hub and 17 utility pages | SM+SB-G+PG |
| gsap.version · https://gsap.com/docs/v3/GSAP/gsap.version | `gsap-version` · `properties/gsap-version` · `/fundamentals/gsap-version` | PC | Runtime version string; relates Installation compatibility/migration | SM+SB-G+PG |

### Methods — 24

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| gsap.config() · https://gsap.com/docs/v3/GSAP/gsap.config() | `gsap-config` · `methods/gsap-config` · `/fundamentals/gsap-config` | CM+PC | Global configuration; relates CSS force3D/units and ticker auto-sleep | SM+SB-G+PG |
| gsap.context() · https://gsap.com/docs/v3/GSAP/gsap.context() | `gsap-context` · `methods/gsap-context` · `/fundamentals/gsap-context` | CM+CI | Scoped recording/revert cleanup; prerequisite for React `useGSAP()` and related `matchMedia()` | SM+SB-G+PG |
| gsap.defaults() · https://gsap.com/docs/v3/GSAP/gsap.defaults() | `gsap-defaults` · `methods/gsap-defaults` · `/fundamentals/gsap-defaults` | CM+PC | Global Tween defaults; contrast Timeline child `defaults` in Timeline vars | SM+SB-G+PG |
| gsap.delayedCall() · https://gsap.com/docs/v3/GSAP/gsap.delayedCall() | `gsap-delayed-call` · `methods/gsap-delayed-call` · `/fundamentals/gsap-delayed-call` | CM | Creates callback Tween; cancellable via returned Tween or `killTweensOf(callback)` | SM+SB-G+PG |
| gsap.exportRoot() · https://gsap.com/docs/v3/GSAP/gsap.exportRoot() | `gsap-export-root` · `methods/gsap-export-root` · `/fundamentals/gsap-export-root` | CM | Reparents globalTimeline children into a Timeline; relates globalTimeline and Timeline nesting | SM+SB-G+PG |
| gsap.from() · https://gsap.com/docs/v3/GSAP/gsap.from() | `gsap-from` · `methods/gsap-from` · `/fundamentals/gsap-from` | CM+PC | Creates Tween from supplied values; depends Tween vars/CSS/Easing, contrasts `to()` and `fromTo()` | SM+SB-G+PG |
| gsap.fromTo() · https://gsap.com/docs/v3/GSAP/gsap.fromTo() | `gsap-from-to` · `methods/gsap-from-to` · `/fundamentals/gsap-from-to` | CM+PC | Creates Tween with explicit start/end vars; depends Tween/CSS/Easing | SM+SB-G+PG |
| gsap.getById() · https://gsap.com/docs/v3/GSAP/gsap.getById() | `gsap-get-by-id` · `methods/gsap-get-by-id` · `/fundamentals/gsap-get-by-id` | CM | Finds Tween/Timeline by `vars.id`; relates both instance types | SM+SB-G+PG |
| gsap.getProperty() · https://gsap.com/docs/v3/GSAP/gsap.getProperty() | `gsap-get-property` · `methods/gsap-get-property` · `/fundamentals/gsap-get-property` | CM+UT | Reads target properties/units through plugins; relates CSS and `quickSetter()` | SM+SB-G+PG |
| gsap.getTweensOf() · https://gsap.com/docs/v3/GSAP/gsap.getTweensOf() | `gsap-get-tweens-of` · `methods/gsap-get-tweens-of` · `/fundamentals/gsap-get-tweens-of` | CM | Queries Tweens by target/active state; relates `isTweening()` and `killTweensOf()` | SM+SB-G+PG |
| gsap.isTweening() · https://gsap.com/docs/v3/GSAP/gsap.isTweening() | `gsap-is-tweening` · `methods/gsap-is-tweening` · `/fundamentals/gsap-is-tweening` | CM | Boolean target activity query; boundary is `getTweensOf()` for instances | SM+SB-G+PG |
| gsap.killTweensOf() · https://gsap.com/docs/v3/GSAP/gsap.killTweensOf() | `gsap-kill-tweens-of` · `methods/gsap-kill-tweens-of` · `/fundamentals/gsap-kill-tweens-of` | CM | Kills target/property Tweens and delayedCalls; relates Tween `kill()` | SM+SB-G+PG |
| gsap.matchMedia() · https://gsap.com/docs/v3/GSAP/gsap.matchMedia() | `gsap-match-media` · `methods/gsap-match-media` · `/fundamentals/gsap-match-media` | CM+CI | Responsive/accessibility conditions with context-style cleanup; relates `matchMediaRefresh()` and React | SM+SB-G+PG |
| gsap.matchMediaRefresh() · https://gsap.com/docs/v3/GSAP/gsap.matchMediaRefresh() | `gsap-match-media-refresh` · `methods/gsap-match-media-refresh` · `/fundamentals/gsap-match-media-refresh` | CM | Forces active matchMedia conditions to rerun/revert; depends `matchMedia()` | SM+SB-G+PG |
| gsap.parseEase() · https://gsap.com/docs/v3/GSAP/gsap.parseEase() | `gsap-parse-ease` · `methods/gsap-parse-ease` · `/fundamentals/gsap-parse-ease` | CM+EV | Resolves ease string/function; relates Easing and `registerEase()` | SM+SB-G+PG |
| gsap.quickSetter() · https://gsap.com/docs/v3/GSAP/gsap.quickSetter() | `gsap-quick-setter` · `methods/gsap-quick-setter` · `/fundamentals/gsap-quick-setter` | CM | Cached high-frequency setter; relates CSS, ticker, `getProperty()` and `quickTo()` | SM+SB-G+PG |
| gsap.quickTo() · https://gsap.com/docs/v3/GSAP/gsap.quickTo() | `gsap-quick-to` · `methods/gsap-quick-to` · `/fundamentals/gsap-quick-to` | CM | Reusable retargetable Tween for one property; relates `quickSetter()`, Tween/CSS/Easing | SM+SB-G+PG |
| gsap.registerEase() · https://gsap.com/docs/v3/GSAP/gsap.registerEase() | `gsap-register-ease` · `methods/gsap-register-ease` · `/fundamentals/gsap-register-ease` | CM+EV | Names an ease function; relates `parseEase()` and Easing | SM+SB-G+PG |
| gsap.registerEffect() · https://gsap.com/docs/v3/GSAP/gsap.registerEffect() | `gsap-register-effect` · `methods/gsap-register-effect` · `/fundamentals/gsap-register-effect` | CM | Populates `gsap.effects`; optionally extends Timeline; depends Tween/Timeline | SM+SB-G+PG |
| gsap.registerPlugin() · https://gsap.com/docs/v3/GSAP/gsap.registerPlugin() | `gsap-register-plugin` · `methods/gsap-register-plugin` · `/fundamentals/gsap-register-plugin` | CM+PL | Registration/tree-shaking boundary; relates Installation, CSS/internal plugins, ease plugins, React | SM+SB-G+PG |
| gsap.set() · https://gsap.com/docs/v3/GSAP/gsap.set() | `gsap-set` · `methods/gsap-set` · `/fundamentals/gsap-set` | CM+PC | Zero-duration Tween/setter; depends Tween vars and CSS, contrasts `to()` | SM+SB-G+PG |
| gsap.timeline() · https://gsap.com/docs/v3/GSAP/gsap.timeline() | `gsap-timeline` · `methods/gsap-timeline` · `/fundamentals/gsap-timeline` | CM+CI | Constructs Timeline; Timeline hub owns instance vars/methods/properties | SM+SB-G+PG |
| gsap.to() · https://gsap.com/docs/v3/GSAP/gsap.to() | `gsap-to` · `methods/gsap-to` · `/fundamentals/gsap-to` | CM+PC | Creates destination Tween; Tween hub/vars, CSS and Easing own shared contracts | SM+SB-G+PG |
| gsap.updateRoot() · https://gsap.com/docs/v3/GSAP/gsap.updateRoot() | `gsap-update-root` · `methods/gsap-update-root` · `/fundamentals/gsap-update-root` | CM | Manually advances root timeline; relates ticker/globalTimeline and external render loops | SM+SB-G+PG |

## 4. Fundamentals > CSS / GSAP > Internal Plugins — 5

| Official title · canonical URL | Official category | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- | --- |
| CSS · https://gsap.com/docs/v3/GSAP/CorePlugins/CSS | Fundamentals > CSS | `css` · `core-plugins/css` · `/fundamentals/css` | PL+PC+CG | Auto-included CSSPlugin behavior: properties, transforms, units, 3D/SVG origins, special properties; consumed by Tween creation methods | SM+SB-H+PG |
| Attributes · https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes | GSAP > Internal Plugins | `attributes` · `core-plugins/attributes` · `/fundamentals/attributes` | PL+PC | Auto-included AttrPlugin; SVG/DOM numeric attributes and no unit conversion; contrast CSS transforms | SM+SB-IP+PG |
| EndArray · https://gsap.com/docs/v3/GSAP/CorePlugins/EndArray | GSAP > Internal Plugins | `end-array` · `core-plugins/end-array` · `/fundamentals/end-array` | PL+PC | Auto-included EndArrayPlugin; animates numeric array elements; depends Tween | SM+SB-IP+PG |
| Modifiers · https://gsap.com/docs/v3/GSAP/CorePlugins/Modifiers | GSAP > Internal Plugins | `modifiers` · `core-plugins/modifiers` · `/fundamentals/modifiers` | PL+PC | Auto-included ModifiersPlugin; per-render value transform; relates utilities `wrap()`, `unitize()` and Snap plugin | SM+SB-IP+PG |
| Snap · https://gsap.com/docs/v3/GSAP/CorePlugins/Snap | GSAP > Internal Plugins | `snap-plugin` · `core-plugins/snap` · `/fundamentals/snap-plugin` | PL+PC | Auto-included SnapPlugin special property; distinct from but related to `gsap.utils.snap()` and Modifiers | SM+SB-IP+PG |

## 5. Fundamentals > Tween — 35

### Hub — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| Tween · https://gsap.com/docs/v3/GSAP/Tween | `tween` · `tween/tween` · `/fundamentals/tween` | CG+CI+PC | Owns Tween lifecycle, targets/vars, special properties, value modes, stagger/keyframes, methods/properties catalog; creation methods live under GSAP/Timeline | SM+SB-TW+PG |

### Properties — 4

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| data · https://gsap.com/docs/v3/GSAP/Tween/data | `tween-data` · `tween/tween-data` · `/fundamentals/tween-data` | PC | Arbitrary instance metadata from `vars.data`; shared Animation concept, Timeline has separate canonical page | SM+SB-TW+PG |
| ratio · https://gsap.com/docs/v3/GSAP/Tween/ratio | `tween-ratio` · `tween/tween-ratio` · `/fundamentals/tween-ratio` | PC+EV | Read-only eased progress; depends Tween ease and Easing; Tween-specific | SM+SB-TW+PG |
| scrollTrigger · https://gsap.com/docs/v3/GSAP/Tween/scrollTrigger | `tween-scroll-trigger` · `tween/tween-scroll-trigger` · `/fundamentals/tween-scroll-trigger` | PC | Optional associated ScrollTrigger; dependency is external ScrollTrigger plugin page, outside this inventory | SM+SB-TW+PG |
| vars · https://gsap.com/docs/v3/GSAP/Tween/vars | `tween-vars` · `tween/tween-vars` · `/fundamentals/tween-vars` | PC | Full Tween configuration/special-property contract; shared by `gsap.to/from/fromTo/set/quickTo`, CSS and Easing | SM+SB-TW+PG |

### Methods — 30

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| delay · https://gsap.com/docs/v3/GSAP/Tween/delay() | `tween-delay` · `tween/tween-delay` · `/fundamentals/tween-delay` | CM | Animation-shared getter/setter; Timeline has separate canonical page; relates startTime/timeScale | SM+SB-TW+PG |
| duration · https://gsap.com/docs/v3/GSAP/Tween/duration() | `tween-duration` · `tween/tween-duration` · `/fundamentals/tween-duration` | CM | Animation-shared getter/setter excluding repeats; relates totalDuration/timeScale | SM+SB-TW+PG |
| endTime · https://gsap.com/docs/v3/GSAP/Tween/endTime() | `tween-end-time` · `tween/tween-end-time` · `/fundamentals/tween-end-time` | CM | Animation-shared parent-local end calculation; relates startTime, totalDuration, Timeline parent | SM+SB-TW+PG |
| eventCallback · https://gsap.com/docs/v3/GSAP/Tween/eventCallback() | `tween-event-callback` · `tween/tween-event-callback` · `/fundamentals/tween-event-callback` | CM | Animation-shared callback getter/setter; callback types/params originate in Tween vars | SM+SB-TW+PG |
| globalTime · https://gsap.com/docs/v3/GSAP/Tween/globalTime() | `tween-global-time` · `tween/tween-global-time` · `/fundamentals/tween-global-time` | CM | Converts nested local time to globalTimeline time; Timeline has separate page | SM+SB-TW+PG |
| invalidate · https://gsap.com/docs/v3/GSAP/Tween/invalidate() | `tween-invalidate` · `tween/tween-invalidate` · `/fundamentals/tween-invalidate` | CM | Tween override flushes recorded start/end values; relates restart and repeatRefresh | SM+SB-TW+PG |
| isActive · https://gsap.com/docs/v3/GSAP/Tween/isActive() | `tween-is-active` · `tween/tween-is-active` · `/fundamentals/tween-is-active` | CM | Animation-shared active-state query including ancestor state; relates paused/reversed | SM+SB-TW+PG |
| iteration · https://gsap.com/docs/v3/GSAP/Tween/iteration() | `tween-iteration` · `tween/tween-iteration` · `/fundamentals/tween-iteration` | CM | Animation-shared repeat-cycle getter/setter; relates repeat/repeatDelay/yoyo | SM+SB-TW+PG |
| kill · https://gsap.com/docs/v3/GSAP/Tween/kill() | `tween-kill` · `tween/tween-kill` · `/fundamentals/tween-kill` | CM | Tween can kill whole animation or target/property subset; relates `gsap.killTweensOf()` and revert | SM+SB-TW+PG |
| pause · https://gsap.com/docs/v3/GSAP/Tween/pause() | `tween-pause` · `tween/tween-pause` · `/fundamentals/tween-pause` | CM | Animation-shared playback control; relates paused/play/resume | SM+SB-TW+PG |
| paused · https://gsap.com/docs/v3/GSAP/Tween/paused() | `tween-paused` · `tween/tween-paused` · `/fundamentals/tween-paused` | CM | Animation-shared paused-state getter/setter; relates pause/resume | SM+SB-TW+PG |
| play · https://gsap.com/docs/v3/GSAP/Tween/play() | `tween-play` · `tween/tween-play` · `/fundamentals/tween-play` | CM | Animation-shared forward playback; relates pause/resume/reverse | SM+SB-TW+PG |
| progress · https://gsap.com/docs/v3/GSAP/Tween/progress() | `tween-progress` · `tween/tween-progress` · `/fundamentals/tween-progress` | CM | Tween override excludes repeats; relates ratio, totalProgress and time | SM+SB-TW+PG |
| repeat · https://gsap.com/docs/v3/GSAP/Tween/repeat() | `tween-repeat` · `tween/tween-repeat` · `/fundamentals/tween-repeat` | CM | Animation-shared repeat-count getter/setter; relates iteration/repeatDelay/yoyo | SM+SB-TW+PG |
| repeatDelay · https://gsap.com/docs/v3/GSAP/Tween/repeatDelay() | `tween-repeat-delay` · `tween/tween-repeat-delay` · `/fundamentals/tween-repeat-delay` | CM | Animation-shared inter-repeat delay; relates repeat/totalDuration | SM+SB-TW+PG |
| restart · https://gsap.com/docs/v3/GSAP/Tween/restart() | `tween-restart` · `tween/tween-restart` · `/fundamentals/tween-restart` | CM | Animation-shared reset-and-play; relates invalidate and delay inclusion | SM+SB-TW+PG |
| resume · https://gsap.com/docs/v3/GSAP/Tween/resume() | `tween-resume` · `tween/tween-resume` · `/fundamentals/tween-resume` | CM | Animation-shared playback continuation preserving direction; relates pause/play/reverse | SM+SB-TW+PG |
| reverse · https://gsap.com/docs/v3/GSAP/Tween/reverse() | `tween-reverse` · `tween/tween-reverse` · `/fundamentals/tween-reverse` | CM | Animation-shared backward playback; relates reversed/ease direction/easeReverse | SM+SB-TW+PG |
| reversed · https://gsap.com/docs/v3/GSAP/Tween/reversed() | `tween-reversed` · `tween/tween-reversed` · `/fundamentals/tween-reversed` | CM | Animation-shared direction-state getter/setter; relates reverse/play | SM+SB-TW+PG |
| revert · https://gsap.com/docs/v3/GSAP/Tween/revert() | `tween-revert` · `tween/tween-revert` · `/fundamentals/tween-revert` | CM | Restores pre-animation target state then kills; relates context/useGSAP cleanup and kill | SM+SB-TW+PG |
| seek · https://gsap.com/docs/v3/GSAP/Tween/seek() | `tween-seek` · `tween/tween-seek` · `/fundamentals/tween-seek` | CM | Animation-shared playhead jump; Tween accepts time; relates time/progress | SM+SB-TW+PG |
| startTime · https://gsap.com/docs/v3/GSAP/Tween/startTime() | `tween-start-time` · `tween/tween-start-time` · `/fundamentals/tween-start-time` | CM | Animation-shared parent-local placement; relates delay/endTime and Timeline child timing | SM+SB-TW+PG |
| targets · https://gsap.com/docs/v3/GSAP/Tween/targets() | `tween-targets` · `tween/tween-targets` · `/fundamentals/tween-targets` | CM | Tween-specific target array; relates function-based values and `gsap.utils.toArray()` | SM+SB-TW+PG |
| then · https://gsap.com/docs/v3/GSAP/Tween/then() | `tween-then` · `tween/tween-then` · `/fundamentals/tween-then` | CM | Animation completion Promise bridge; Timeline has separate canonical page | SM+SB-TW+PG |
| time · https://gsap.com/docs/v3/GSAP/Tween/time() | `tween-time` · `tween/tween-time` · `/fundamentals/tween-time` | CM | Tween local time excluding repeats; relates totalTime/progress | SM+SB-TW+PG |
| timeScale · https://gsap.com/docs/v3/GSAP/Tween/timeScale() | `tween-time-scale` · `tween/tween-time-scale` · `/fundamentals/tween-time-scale` | CM | Animation-shared playback-rate getter/setter; relates duration/delay | SM+SB-TW+PG |
| totalDuration · https://gsap.com/docs/v3/GSAP/Tween/totalDuration() | `tween-total-duration` · `tween/tween-total-duration` · `/fundamentals/tween-total-duration` | CM | Tween override includes repeats/repeatDelay; relates duration | SM+SB-TW+PG |
| totalProgress · https://gsap.com/docs/v3/GSAP/Tween/totalProgress() | `tween-total-progress` · `tween/tween-total-progress` · `/fundamentals/tween-total-progress` | CM | Tween override includes repeats; relates progress/totalTime | SM+SB-TW+PG |
| totalTime · https://gsap.com/docs/v3/GSAP/Tween/totalTime() | `tween-total-time` · `tween/tween-total-time` · `/fundamentals/tween-total-time` | CM | Animation-shared playhead including repeats; relates time/totalDuration | SM+SB-TW+PG |
| yoyo · https://gsap.com/docs/v3/GSAP/Tween/yoyo() | `tween-yoyo` · `tween/tween-yoyo` · `/fundamentals/tween-yoyo` | CM | Animation-shared alternating repeat direction; requires repeat; relates easeReverse | SM+SB-TW+PG |

## 6. Fundamentals > Timeline — 60

### Hub — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| Timeline · https://gsap.com/docs/v3/GSAP/Timeline | `timeline` · `timeline/timeline` · `/fundamentals/timeline` | CG+CI+PC | Owns sequencing container mental model, position parameter, labels, defaults, nesting, vars/method/property catalog; Tweens own target mutation | SM+SB-TL+PG |

### Properties — 7

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| autoRemoveChildren · https://gsap.com/docs/v3/GSAP/Timeline/autoRemoveChildren | `timeline-auto-remove-children` · `timeline/timeline-auto-remove-children` · `/fundamentals/timeline-auto-remove-children` | PC | Child disposal policy; globalTimeline uses it; affects reverse/seek availability | SM+SB-TL+PG |
| data · https://gsap.com/docs/v3/GSAP/Timeline/data | `timeline-data` · `timeline/timeline-data` · `/fundamentals/timeline-data` | PC | Arbitrary instance metadata from vars; shared Animation concept, Tween has separate page | SM+SB-TL+PG |
| labels · https://gsap.com/docs/v3/GSAP/Timeline/labels | `timeline-labels` · `timeline/timeline-labels` · `/fundamentals/timeline-labels` | PC | Label-name/time map; relates addLabel/removeLabel/currentLabel/nextLabel/previousLabel | SM+SB-TL+PG |
| parent · https://gsap.com/docs/v3/GSAP/Timeline/parent | `timeline-parent` · `timeline/timeline-parent` · `/fundamentals/timeline-parent` | PC+CI | One parent Timeline per animation; defaults to globalTimeline; relates add/remove/nesting | SM+SB-TL+PG |
| scrollTrigger · https://gsap.com/docs/v3/GSAP/Timeline/scrollTrigger | `timeline-scroll-trigger` · `timeline/timeline-scroll-trigger` · `/fundamentals/timeline-scroll-trigger` | PC | Optional associated ScrollTrigger; dependency is external plugin page, outside inventory | SM+SB-TL+PG |
| smoothChildTiming · https://gsap.com/docs/v3/GSAP/Timeline/smoothChildTiming | `timeline-smooth-child-timing` · `timeline/timeline-smooth-child-timing` · `/fundamentals/timeline-smooth-child-timing` | PC | Repositions child startTime when timeScale/reverse/startTime changes; relates Timeline mechanics | SM+SB-TL+PG |
| vars · https://gsap.com/docs/v3/GSAP/Timeline/vars | `timeline-vars` · `timeline/timeline-vars` · `/fundamentals/timeline-vars` | PC | Constructor configuration including defaults/repeats/callbacks/smooth timing; used by `gsap.timeline()` | SM+SB-TL+PG |

### Methods — 52

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| add · https://gsap.com/docs/v3/GSAP/Timeline/add() | `timeline-add` · `timeline/timeline-add` · `/fundamentals/timeline-add` | CM | Adds Tween/Timeline/callback/label at position; owns generic insertion boundary | SM+SB-TL+PG |
| addLabel · https://gsap.com/docs/v3/GSAP/Timeline/addLabel() | `timeline-add-label` · `timeline/timeline-add-label` · `/fundamentals/timeline-add-label` | CM | Adds named time marker; relates labels/seek/removeLabel | SM+SB-TL+PG |
| addPause · https://gsap.com/docs/v3/GSAP/Timeline/addPause() | `timeline-add-pause` · `timeline/timeline-add-pause` · `/fundamentals/timeline-add-pause` | CM | Inserts pause callback at position; relates removePause and play/resume | SM+SB-TL+PG |
| call · https://gsap.com/docs/v3/GSAP/Timeline/call() | `timeline-call` · `timeline/timeline-call` · `/fundamentals/timeline-call` | CM | Inserts callback via delayedCall semantics; relates add and `gsap.delayedCall()` | SM+SB-TL+PG |
| clear · https://gsap.com/docs/v3/GSAP/Timeline/clear() | `timeline-clear` · `timeline/timeline-clear` · `/fundamentals/timeline-clear` | CM | Removes children and optionally labels without killing Timeline; relates remove/kill | SM+SB-TL+PG |
| currentLabel · https://gsap.com/docs/v3/GSAP/Timeline/currentLabel() | `timeline-current-label` · `timeline/timeline-current-label` · `/fundamentals/timeline-current-label` | CM | Gets/sets label at current playhead; relates labels/seek/nextLabel | SM+SB-TL+PG |
| delay · https://gsap.com/docs/v3/GSAP/Timeline/delay() | `timeline-delay` · `timeline/timeline-delay` · `/fundamentals/timeline-delay` | CM | Animation-shared initial delay; Tween has separate page; relates startTime | SM+SB-TL+PG |
| duration · https://gsap.com/docs/v3/GSAP/Timeline/duration() | `timeline-duration` · `timeline/timeline-duration` · `/fundamentals/timeline-duration` | CM | Timeline duration from children excluding repeats; setting scales children; relates totalDuration | SM+SB-TL+PG |
| endTime · https://gsap.com/docs/v3/GSAP/Timeline/endTime() | `timeline-end-time` · `timeline/timeline-end-time` · `/fundamentals/timeline-end-time` | CM | Animation-shared parent-local end calculation; relates startTime/totalDuration | SM+SB-TL+PG |
| eventCallback · https://gsap.com/docs/v3/GSAP/Timeline/eventCallback() | `timeline-event-callback` · `timeline/timeline-event-callback` · `/fundamentals/timeline-event-callback` | CM | Animation-shared callback getter/setter; callback config originates in Timeline vars | SM+SB-TL+PG |
| from · https://gsap.com/docs/v3/GSAP/Timeline/from() | `timeline-from` · `timeline/timeline-from` · `/fundamentals/timeline-from` | CM+PC | Creates and inserts from-Tween at position; delegates Tween vars/CSS/Easing | SM+SB-TL+PG |
| fromTo · https://gsap.com/docs/v3/GSAP/Timeline/fromTo() | `timeline-from-to` · `timeline/timeline-from-to` · `/fundamentals/timeline-from-to` | CM+PC | Creates/inserts explicit-start/end Tween; delegates Tween/CSS/Easing | SM+SB-TL+PG |
| getById · https://gsap.com/docs/v3/GSAP/Timeline/getById() | `timeline-get-by-id` · `timeline/timeline-get-by-id` · `/fundamentals/timeline-get-by-id` | CM | Searches descendant animations by id; local scope counterpart to `gsap.getById()` | SM+SB-TL+PG |
| getChildren · https://gsap.com/docs/v3/GSAP/Timeline/getChildren() | `timeline-get-children` · `timeline/timeline-get-children` · `/fundamentals/timeline-get-children` | CM | Enumerates nested tweens/timelines by filters/time; relates recent/getTweensOf | SM+SB-TL+PG |
| getTweensOf · https://gsap.com/docs/v3/GSAP/Timeline/getTweensOf() | `timeline-get-tweens-of` · `timeline/timeline-get-tweens-of` · `/fundamentals/timeline-get-tweens-of` | CM | Queries descendant Tweens by target; scoped counterpart to GSAP method | SM+SB-TL+PG |
| globalTime · https://gsap.com/docs/v3/GSAP/Timeline/globalTime() | `timeline-global-time` · `timeline/timeline-global-time` · `/fundamentals/timeline-global-time` | CM | Converts nested local time to globalTimeline time; Tween has separate page | SM+SB-TL+PG |
| invalidate · https://gsap.com/docs/v3/GSAP/Timeline/invalidate() | `timeline-invalidate` · `timeline/timeline-invalidate` · `/fundamentals/timeline-invalidate` | CM | Invalidates Timeline and children; relates restart/repeatRefresh | SM+SB-TL+PG |
| isActive · https://gsap.com/docs/v3/GSAP/Timeline/isActive() | `timeline-is-active` · `timeline/timeline-is-active` · `/fundamentals/timeline-is-active` | CM | Animation-shared activity including ancestors; relates paused/reversed/parent | SM+SB-TL+PG |
| iteration · https://gsap.com/docs/v3/GSAP/Timeline/iteration() | `timeline-iteration` · `timeline/timeline-iteration` · `/fundamentals/timeline-iteration` | CM | Animation-shared repeat-cycle getter/setter; relates repeat/yoyo | SM+SB-TL+PG |
| kill · https://gsap.com/docs/v3/GSAP/Timeline/kill() | `timeline-kill` · `timeline/timeline-kill` · `/fundamentals/timeline-kill` | CM | Stops/removes Timeline for GC; contrast clear/remove/revert | SM+SB-TL+PG |
| killTweensOf · https://gsap.com/docs/v3/GSAP/Timeline/killTweensOf() | `timeline-kill-tweens-of` · `timeline/timeline-kill-tweens-of` · `/fundamentals/timeline-kill-tweens-of` | CM | Kills descendant Tweens of targets/properties; scoped GSAP counterpart | SM+SB-TL+PG |
| nextLabel · https://gsap.com/docs/v3/GSAP/Timeline/nextLabel() | `timeline-next-label` · `timeline/timeline-next-label` · `/fundamentals/timeline-next-label` | CM | Finds label after a time; relates previousLabel/currentLabel/labels | SM+SB-TL+PG |
| pause · https://gsap.com/docs/v3/GSAP/Timeline/pause() | `timeline-pause` · `timeline/timeline-pause` · `/fundamentals/timeline-pause` | CM | Animation-shared playback control; relates paused/play/resume/addPause | SM+SB-TL+PG |
| paused · https://gsap.com/docs/v3/GSAP/Timeline/paused() | `timeline-paused` · `timeline/timeline-paused` · `/fundamentals/timeline-paused` | CM | Animation-shared paused-state getter/setter; relates pause/resume | SM+SB-TL+PG |
| play · https://gsap.com/docs/v3/GSAP/Timeline/play() | `timeline-play` · `timeline/timeline-play` · `/fundamentals/timeline-play` | CM | Animation-shared forward playback from time/label; relates reverse/seek | SM+SB-TL+PG |
| previousLabel · https://gsap.com/docs/v3/GSAP/Timeline/previousLabel() | `timeline-previous-label` · `timeline/timeline-previous-label` · `/fundamentals/timeline-previous-label` | CM | Finds label before a time; relates nextLabel/currentLabel/labels | SM+SB-TL+PG |
| progress · https://gsap.com/docs/v3/GSAP/Timeline/progress() | `timeline-progress` · `timeline/timeline-progress` · `/fundamentals/timeline-progress` | CM | Timeline progress excluding repeats; relates totalProgress/time/duration | SM+SB-TL+PG |
| recent · https://gsap.com/docs/v3/GSAP/Timeline/recent() | `timeline-recent` · `timeline/timeline-recent` · `/fundamentals/timeline-recent` | CM | Returns most recently added child; relates add/to/from/fromTo | SM+SB-TL+PG |
| remove · https://gsap.com/docs/v3/GSAP/Timeline/remove() | `timeline-remove` · `timeline/timeline-remove` · `/fundamentals/timeline-remove` | CM | Removes child/callback/label without generic Timeline destruction; relates add/clear | SM+SB-TL+PG |
| removeLabel · https://gsap.com/docs/v3/GSAP/Timeline/removeLabel() | `timeline-remove-label` · `timeline/timeline-remove-label` · `/fundamentals/timeline-remove-label` | CM | Removes named marker and returns its time; relates addLabel/labels | SM+SB-TL+PG |
| removePause · https://gsap.com/docs/v3/GSAP/Timeline/removePause() | `timeline-remove-pause` · `timeline/timeline-remove-pause` · `/fundamentals/timeline-remove-pause` | CM | Removes pause callback at position; relates addPause | SM+SB-TL+PG |
| repeat · https://gsap.com/docs/v3/GSAP/Timeline/repeat() | `timeline-repeat` · `timeline/timeline-repeat` · `/fundamentals/timeline-repeat` | CM | Animation-shared repeat count; relates iteration/repeatDelay/yoyo | SM+SB-TL+PG |
| repeatDelay · https://gsap.com/docs/v3/GSAP/Timeline/repeatDelay() | `timeline-repeat-delay` · `timeline/timeline-repeat-delay` · `/fundamentals/timeline-repeat-delay` | CM | Animation-shared inter-repeat delay; relates totalDuration | SM+SB-TL+PG |
| restart · https://gsap.com/docs/v3/GSAP/Timeline/restart() | `timeline-restart` · `timeline/timeline-restart` · `/fundamentals/timeline-restart` | CM | Animation-shared reset-and-play; relates invalidate and delay inclusion | SM+SB-TL+PG |
| resume · https://gsap.com/docs/v3/GSAP/Timeline/resume() | `timeline-resume` · `timeline/timeline-resume` · `/fundamentals/timeline-resume` | CM | Animation-shared continuation preserving direction; relates pause/play/reverse | SM+SB-TL+PG |
| reverse · https://gsap.com/docs/v3/GSAP/Timeline/reverse() | `timeline-reverse` · `timeline/timeline-reverse` · `/fundamentals/timeline-reverse` | CM | Animation-shared backward playback from time/label; relates reversed | SM+SB-TL+PG |
| reversed · https://gsap.com/docs/v3/GSAP/Timeline/reversed() | `timeline-reversed` · `timeline/timeline-reversed` · `/fundamentals/timeline-reversed` | CM | Animation-shared direction-state getter/setter; relates reverse/play | SM+SB-TL+PG |
| revert · https://gsap.com/docs/v3/GSAP/Timeline/revert() | `timeline-revert` · `timeline/timeline-revert` · `/fundamentals/timeline-revert` | CM | Reverts child animations and kills Timeline; relates context/useGSAP cleanup | SM+SB-TL+PG |
| seek · https://gsap.com/docs/v3/GSAP/Timeline/seek() | `timeline-seek` · `timeline/timeline-seek` · `/fundamentals/timeline-seek` | CM | Jumps to numeric time or label; relates labels/time/progress | SM+SB-TL+PG |
| set · https://gsap.com/docs/v3/GSAP/Timeline/set() | `timeline-set` · `timeline/timeline-set` · `/fundamentals/timeline-set` | CM+PC | Creates/inserts zero-duration Tween at position; delegates Tween vars/CSS | SM+SB-TL+PG |
| shiftChildren · https://gsap.com/docs/v3/GSAP/Timeline/shiftChildren() | `timeline-shift-children` · `timeline/timeline-shift-children` · `/fundamentals/timeline-shift-children` | CM | Offsets child start times and optionally labels; relates startTime/labels | SM+SB-TL+PG |
| startTime · https://gsap.com/docs/v3/GSAP/Timeline/startTime() | `timeline-start-time` · `timeline/timeline-start-time` · `/fundamentals/timeline-start-time` | CM | Animation-shared parent-local placement; interacts with smoothChildTiming/delay | SM+SB-TL+PG |
| then · https://gsap.com/docs/v3/GSAP/Timeline/then() | `timeline-then` · `timeline/timeline-then` · `/fundamentals/timeline-then` | CM | Animation completion Promise bridge; Tween has separate page | SM+SB-TL+PG |
| time · https://gsap.com/docs/v3/GSAP/Timeline/time() | `timeline-time` · `timeline/timeline-time` · `/fundamentals/timeline-time` | CM | Timeline local playhead excluding repeats; accepts labels; relates totalTime | SM+SB-TL+PG |
| timeScale · https://gsap.com/docs/v3/GSAP/Timeline/timeScale() | `timeline-time-scale` · `timeline/timeline-time-scale` · `/fundamentals/timeline-time-scale` | CM | Animation-shared playback rate cascading to children; relates smoothChildTiming | SM+SB-TL+PG |
| to · https://gsap.com/docs/v3/GSAP/Timeline/to() | `timeline-to` · `timeline/timeline-to` · `/fundamentals/timeline-to` | CM+PC | Creates/inserts destination Tween; delegates Tween vars/CSS/Easing and position | SM+SB-TL+PG |
| totalDuration · https://gsap.com/docs/v3/GSAP/Timeline/totalDuration() | `timeline-total-duration` · `timeline/timeline-total-duration` · `/fundamentals/timeline-total-duration` | CM | Timeline total duration including repeats; setting scales child timings | SM+SB-TL+PG |
| totalProgress · https://gsap.com/docs/v3/GSAP/Timeline/totalProgress() | `timeline-total-progress` · `timeline/timeline-total-progress` · `/fundamentals/timeline-total-progress` | CM | Progress including repeats; relates progress/totalTime | SM+SB-TL+PG |
| totalTime · https://gsap.com/docs/v3/GSAP/Timeline/totalTime() | `timeline-total-time` · `timeline/timeline-total-time` · `/fundamentals/timeline-total-time` | CM | Playhead including repeats/repeatDelay; relates time/totalDuration | SM+SB-TL+PG |
| tweenFromTo · https://gsap.com/docs/v3/GSAP/Timeline/tweenFromTo() | `timeline-tween-from-to` · `timeline/timeline-tween-from-to` · `/fundamentals/timeline-tween-from-to` | CM | Creates control Tween between Timeline times/labels; depends labels and Tween lifecycle | SM+SB-TL+PG |
| tweenTo · https://gsap.com/docs/v3/GSAP/Timeline/tweenTo() | `timeline-tween-to` · `timeline/timeline-tween-to` · `/fundamentals/timeline-tween-to` | CM | Creates control Tween to Timeline time/label; relates tweenFromTo/labels | SM+SB-TL+PG |
| yoyo · https://gsap.com/docs/v3/GSAP/Timeline/yoyo() | `timeline-yoyo` · `timeline/timeline-yoyo` · `/fundamentals/timeline-yoyo` | CM | Animation-shared alternating repeat direction; requires repeat; affects children sequence | SM+SB-TL+PG |

## 7. Useful features & tools > Utility Methods — 18

### Hub — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| Utility Methods · https://gsap.com/docs/v3/GSAP/UtilityMethods | `utility-methods` · `utilities/utility-methods` · `/fundamentals/utility-methods` | CG+UT | Owns utility overview, composability, function-return mode and 17-member catalog; `gsap.utils` owns namespace property | SM+SB-U+PG |

### Methods — 17

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| checkPrefix · https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix() | `utils-check-prefix` · `utilities/utils-check-prefix` · `/fundamentals/utils-check-prefix` | UT | CSS vendor-prefix lookup; relates CSS plugin and getProperty | SM+SB-U+PG |
| clamp · https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp() | `utils-clamp` · `utilities/utils-clamp` · `/fundamentals/utils-clamp` | UT | Numeric range limiting; direct or reusable-function overload; composes with pipe/unitize | SM+SB-U+PG |
| distribute · https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute() | `utils-distribute` · `utilities/utils-distribute` · `/fundamentals/utils-distribute` | UT+EV | Calculates index/grid distribution with ease; underlies advanced stagger concepts | SM+SB-U+PG |
| getUnit · https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit() | `utils-get-unit` · `utilities/utils-get-unit` · `/fundamentals/utils-get-unit` | UT | Extracts unit suffix; relates CSS units and unitize | SM+SB-U+PG |
| interpolate · https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate() | `utils-interpolate` · `utilities/utils-interpolate` · `/fundamentals/utils-interpolate` | UT | Interpolates numbers/colors/strings/arrays/objects; direct or reusable function; relates splitColor | SM+SB-U+PG |
| mapRange · https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange() | `utils-map-range` · `utilities/utils-map-range` · `/fundamentals/utils-map-range` | UT | Maps one numeric range to another; direct/function overload; relates normalize/clamp | SM+SB-U+PG |
| normalize · https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize() | `utils-normalize` · `utilities/utils-normalize` · `/fundamentals/utils-normalize` | UT | Maps range to 0–1 progress; direct/function overload; relates mapRange/interpolate | SM+SB-U+PG |
| pipe · https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe() | `utils-pipe` · `utilities/utils-pipe` · `/fundamentals/utils-pipe` | UT | Left-to-right function composition; depends compatible input/output contracts of other utilities | SM+SB-U+PG |
| random · https://gsap.com/docs/v3/GSAP/UtilityMethods/random() | `utils-random` · `utilities/utils-random` · `/fundamentals/utils-random` | UT | Number/increment or array-choice overloads; direct/function mode; relates Tween random() strings/repeatRefresh | SM+SB-U+PG |
| selector · https://gsap.com/docs/v3/GSAP/UtilityMethods/selector() | `utils-selector` · `utilities/utils-selector` · `/fundamentals/utils-selector` | UT+II | Returns scoped query function; accepts Element/React ref/Angular ElementRef; relates context/useGSAP | SM+SB-U+PG |
| shuffle · https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle() | `utils-shuffle` · `utilities/utils-shuffle` · `/fundamentals/utils-shuffle` | UT | In-place array shuffle; mutability is the key boundary; relates random | SM+SB-U+PG |
| snap · https://gsap.com/docs/v3/GSAP/UtilityMethods/snap() | `utils-snap` · `utilities/utils-snap` · `/fundamentals/utils-snap` | UT | Increment/value/radius/2D overloads and reusable-function mode; distinct from internal Snap plugin | SM+SB-U+PG |
| splitColor · https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor() | `utils-split-color` · `utilities/utils-split-color` · `/fundamentals/utils-split-color` | UT | Converts color formats to RGB(A) or HSL(A) components; relates CSS colors/interpolate | SM+SB-U+PG |
| toArray · https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray() | `utils-to-array` · `utilities/utils-to-array` · `/fundamentals/utils-to-array` | UT | Normalizes selector/array-like/value to array with optional scope; relates Tween targets/selector | SM+SB-U+PG |
| unitize · https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize() | `utils-unitize` · `utilities/utils-unitize` · `/fundamentals/utils-unitize` | UT | Wraps numeric functions to preserve/force units; composes with clamp/mapRange/wrap | SM+SB-U+PG |
| wrap · https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap() | `utils-wrap` · `utilities/utils-wrap` · `/fundamentals/utils-wrap` | UT | Numeric-range or array cyclic wrapping; direct/function overload; relates Modifiers | SM+SB-U+PG |
| wrapYoyo · https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo() | `utils-wrap-yoyo` · `utilities/utils-wrap-yoyo` · `/fundamentals/utils-wrap-yoyo` | UT | Ping-pong numeric/array wrapping; direct/function overload; contrasts wrap and animation yoyo | SM+SB-U+PG |

## 8. Fundamentals > Easing — 8

### Hub — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| Easing · https://gsap.com/docs/v3/Eases | `easing` · `eases/easing` · `/fundamentals/easing` | CG+EV+PC | Owns core ease visualizer, curve/direction syntax, built-ins and links to seven dedicated ease pages; consumed by Tween vars/parseEase | SM+SB-E+PG |

### Dedicated ease pages — 7

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| CustomBounce · https://gsap.com/docs/v3/Eases/CustomBounce | `custom-bounce` · `eases/custom-bounce` · `/fundamentals/custom-bounce` | PL+EV | Extra ease plugin; requires CustomEase and registration; may generate squash companion ease | SM+SB-E+PG |
| CustomEase · https://gsap.com/docs/v3/Eases/CustomEase | `custom-ease` · `eases/custom-ease` · `/fundamentals/custom-ease` | PL+EV | Extra ease plugin for SVG path/coordinate curves; dependency for CustomBounce/CustomWiggle | SM+SB-E+PG |
| CustomWiggle · https://gsap.com/docs/v3/Eases/CustomWiggle | `custom-wiggle` · `eases/custom-wiggle` · `/fundamentals/custom-wiggle` | PL+EV | Extra ease plugin; requires CustomEase and registration; owns wiggle types/count | SM+SB-E+PG |
| ExpoScaleEase · https://gsap.com/docs/v3/Eases/ExpoScaleEase | `expo-scale-ease` · `eases/expo-scale-ease` · `/fundamentals/expo-scale-ease` | PL+EV | EasePack member for exponential scaling; requires EasePack import/registration; relates Easing | SM+SB-E+PG |
| RoughEase · https://gsap.com/docs/v3/Eases/RoughEase | `rough-ease` · `eases/rough-ease` · `/fundamentals/rough-ease` | PL+EV | EasePack member for randomized rough curves; requires EasePack; configurable points/strength/taper | SM+SB-E+PG |
| SlowMo · https://gsap.com/docs/v3/Eases/SlowMo | `slow-mo` · `eases/slow-mo` · `/fundamentals/slow-mo` | PL+EV | EasePack member for slow middle region; requires EasePack; configurable linear ratio/power/yoyo mode | SM+SB-E+PG |
| SteppedEase · https://gsap.com/docs/v3/Eases/SteppedEase | `stepped-ease` · `eases/stepped-ease` · `/fundamentals/stepped-ease` | EV | Stepped core ease/legacy API; relates current `steps(n)` string in Easing hub | SM+SB-E+PG |

## 9. Useful features & tools > React - useGSAP() — 1

| Official title · canonical URL | Proposed slug · local path · route | Modules | Dependencies / related-page boundary | Evidence |
| --- | --- | --- | --- | --- |
| React · https://gsap.com/resources/React | `react-use-gsap` · `react/react-use-gsap` · `/fundamentals/react-use-gsap` | II+CM | Owns React integration and `useGSAP()` hook: `@gsap/react`, registration, scope, cleanup, dependencies/revertOnUpdate/contextSafe; depends React, GSAP, `gsap.context()` and selector | SM+SB-R+PG |

## Blocked-source and alias defects — 2

### B1 — standalone Animation documentation is unavailable

- Status: `blocked-source`; **not counted as a page** and no local slug/path/route is proposed.
- Evidence: the GSAP hub states that Tween and Timeline extend an `Animation` class, but the current GSAP sidebar and `sitemap-docs.xml` expose no Animation hub/member URLs. `https://gsap.com/docs/v3/GSAP/Animation/` returned HTTP 404 on 2026-08-02.
- Required ownership decision: retain all inherited method/property pages under their official Tween and Timeline canonicals above. Do not invent an Animation page or move shared coverage until GSAP publishes an official canonical source.

### B2 — broken `CustomEasee` link in official docs home

- Status: `blocked-source` alias/link defect; **not counted as a page** and no local page should be created.
- Evidence: the docs-home Extra Eases block links the CustomBounce dependency to `/docs/v3/Eases/CustomEasee` (double `e`); that URL returned HTTP 404 and is absent from `sitemap-docs.xml`.
- Verified replacement: the real page is `https://gsap.com/docs/v3/Eases/CustomEase`, present in the Easing sidebar/sitemap and HTTP 200. Local related links should point to the verified `custom-ease` page while preserving this source defect in the handoff.

## Source-curation release note

- All 159 counted pages have a verified official canonical and discovery evidence.
- The inventory itself is exhaustive against both the current live sidebars and official docs sitemap for the requested boundary.
- Downstream page releases remain `BLOCK` wherever they rely on a standalone Animation source or the broken `CustomEasee` alias without applying the ownership decisions above.
