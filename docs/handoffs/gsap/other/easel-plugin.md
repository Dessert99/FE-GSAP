# P10 EaselPlugin handoff

## objective

CreateJS canvas display object의 special filter property를 EaselPlugin으로 tween하고 Stage draw까지 연결하는 static executable boundary를 제공한다.

## officialPage

- title: EaselPlugin
- canonicalUrl: `https://gsap.com/docs/v3/Plugins/EaselPlugin/`
- reviewedAt: 2026-08-08
- category/slug: Other / `easel-plugin`

## localPage

- localPath: `src/content/gsap/other/easel-plugin/`
- route: `/fundamentals/easel-plugin`

## sourceManifest

| id | officialItem | sourceStatus |
| --- | --- | --- |
| EASEL-01 | ColorFilter/ColorMatrixFilter special property list | verified |
| EASEL-02 | normal x/y numeric property에는 plugin 불필요 | verified |
| EASEL-03 | filter special property와 MovieClip frame만 처리 | verified |
| EASEL-04 | ColorFilter convenience properties | verified |
| EASEL-05 | ColorMatrixFilter convenience properties | verified |
| EASEL-06 | easel wrapper와 filter file load requirement | verified |
| EASEL-07 | cache requirement와 individual colorFilter properties | verified |
| EASEL-08 | exposure/brightness 0~2 meanings | verified |
| EASEL-09 | registration, renderStage ticker sequence, same-callback cleanup removal boundary | verified |

## sourceBlockers

CreateJS is not installed. This is an executable-environment blocker, not a source blocker: no package modification or fake runtime was added.

## moduleSelection

plugin/integration + property catalog + static sequence diagram. Learner flow: DOM과 canvas 차이 → display object target → easel vars → GSAP update/stage draw sequence → dependency/cleanup.

## coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| EASEL-01 | `TargetSection` | covered |
| EASEL-02 | `ConceptSection` | covered |
| EASEL-03 | `TargetSection` | covered |
| EASEL-04 | `VarsSection` | covered |
| EASEL-05 | `VarsSection` | covered |
| EASEL-06 | `VarsSection`, `BoundarySection` | covered |
| EASEL-07 | `VarsSection` | covered |
| EASEL-08 | `VarsSection` | covered |
| EASEL-09 | `SequenceSection`, `BoundaryDiagram`, `BoundarySection` | covered |

## exampleContracts

- name: BoundaryDiagram
- goal: load/register/update/draw/cleanup의 정확한 순서를 canvas 실행 없이 보인다.
- representation: accessible ordered textual diagram and descriptor-derived code.
- controls: none
- runtimeSource: none
- sourcePath: `components/BoundaryDiagram/BoundaryDiagram.tsx`
- runtimeOwnership: none — CreateJS dependency is absent and fake runtime is prohibited.
- displayOwnership: diagram, code, textual canvas state boundary.
- accessibility/motion: semantic figure/ordered list/code; no autonomous motion or browser interaction required.

## exactFiles

- create: all files under `src/content/gsap/other/easel-plugin/`; `docs/handoffs/gsap/other/easel-plugin.md`
- modify: none

## findings

- Official Coverage: PASS — 9 official items, 9 catalog/sourceManifest/coverageMap rows.
- Learning Transformation/Pedagogy: PASS — target model, vars, Stage draw reason and dependency boundary are separate.
- Structure/Comment/Accessibility: PASS-static — page composes five sections; static semantic diagram has textual canvas boundary.
- Cross-page: PASS — no unrelated route links or duplicated owner scope.
- Build/Integration: PASS — root registered P10; TypeScript, Vite 933 modules and Storybook 1071 modules passed with both page chunks emitted.
- Browser: no browser-only interaction exists; no DEFERRED item required.

## verificationEvidence

- Rendered canonical opened twice on 2026-08-08; Quick Start, minimal usage, Description, examples, ranges and note counted.
- Official raw `greensock/GSAP/src/EaselPlugin.js` inspected twice; installed `node_modules/gsap/EaselPlugin.js` and `types/easel-plugin.d.ts` compared for plugin name `easel`, `TweenVars.easel`, CreateJS/filter lookup, cache warning and registration.
- Static checks and isolated TypeScript are recorded in task-4 report.
- Root integration: `npx tsc --noEmit`, Vite 933 modules, Storybook 1071 modules and `git diff --check` exited 0; both builds emitted `EaselPluginPage` JS/CSS chunks.

## releaseDecision

PASS — the static-by-design page is registered and both builds pass. No browser-only DEFERRED checks apply.
