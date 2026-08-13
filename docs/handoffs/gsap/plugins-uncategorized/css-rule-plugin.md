# CSSRulePlugin page handoff

## 입력 계약

```text
objective
  CSSRulePlugin과 CSSRulePlugin.getRule() 두 canonical을 한 beginner page에서
  shared stylesheet rule, lookup, proxy tween, CSSOM 실패 경계, 대안을 학습시킨다.

officialPage
  title: CSSRulePlugin / CSSRulePlugin.getRule()
  canonicalUrl:
    https://gsap.com/docs/v3/Plugins/CSSRulePlugin/
    https://gsap.com/docs/v3/Plugins/CSSRulePlugin/methods/static-getRule()/
  reviewedAt: 2026-08-08
  category: Plugins — uncategorized in current overview
  slug: css-rule-plugin

localPage
  localPath: src/content/gsap/plugins-uncategorized/css-rule-plugin/
  route: /fundamentals/css-rule-plugin

moduleSelection
  PL, PC, CM, II

relatedPages
  prerequisite: /fundamentals/plugins (P01, registered route required before integration PASS)
  boundary: core CSS/CSSPlugin and Installation ownership; this page does not own their canonical detail.

sourceManifest
  - id: CSSRULE-01 | officialItem: raw stylesheet rule targets a selector's objects rather than one inline element | sourceLocation: #18 rendered lines 172-173 | sourceStatus: verified
  - id: CSSRULE-02 | officialItem: a myClass rule tween changes every object using myClass | sourceLocation: #18 rendered line 173 | sourceStatus: verified
  - id: CSSRULE-03 | officialItem: regular CSSPlugin is typically best for precise individual-object control | sourceLocation: #18 rendered line 173 | sourceStatus: verified
  - id: CSSRULE-04 | officialItem: ::after and ::before cannot be directly referenced in JavaScript but CSSRulePlugin can animate them | sourceLocation: #18 rendered line 174 | sourceStatus: verified
  - id: CSSRULE-05 | officialItem: static getRule() grabs a stylesheet reference from a CSS selector | sourceLocation: #18 rendered line 175 | sourceStatus: verified
  - id: CSSRULE-06 | officialItem: CSSRulePlugin.getRule(selector:String): Object is static | sourceLocation: #19 rendered lines 160-164 | sourceStatus: verified
  - id: CSSRULE-07 | officialItem: selector String exactly matches the selector to animate | sourceLocation: #19 rendered lines 166-170 | sourceStatus: verified
  - id: CSSRULE-08 | officialItem: return is stylesheet object, or an array for pseudo-only selector | sourceLocation: #19 rendered lines 172-174 | sourceStatus: verified
  - id: CSSRULE-09 | officialItem: getRule() determines the tween target | sourceLocation: #19 rendered line 177 | sourceStatus: verified
  - id: CSSRULE-10 | officialItem: official pseudo example finds .myClass::before and tweens cssRule color | sourceLocation: #19 rendered lines 179-193 | sourceStatus: verified
  - id: CSSRULE-11 | officialItem: official examples show stored-rule and direct-target invocation forms | sourceLocation: #19 rendered lines 189-200 | sourceStatus: verified
  - id: CSSRULE-12 | officialItem: CSSRulePlugin file must be loaded before getRule() and tween use | sourceLocation: #18 rendered lines 187-190 | sourceStatus: verified
  - id: CSSRULE-13 | officialItem: tween values must be wrapped in cssRule: {} | sourceLocation: #18 rendered line 199 | sourceStatus: verified
  - id: CSSRULE-14 | officialItem: prefer properties already defined in the selected rule because calculated style cannot be performed | sourceLocation: #18 rendered line 197 | sourceStatus: verified
  - id: CSSRULE-15 | officialItem: undefined rule color can start at transparent when tweened to blue | sourceLocation: #18 rendered line 197 | sourceStatus: verified
  - id: CSSRULE-16 | officialItem: fromTo() can explicitly set starting values | sourceLocation: #18 rendered line 198 | sourceStatus: verified
  - id: CSSRULE-17 | officialItem: styles inside media queries may not be accessible or tweenable | sourceLocation: #18 rendered line 201 | sourceStatus: verified
  - id: CSSRULE-20 | officialItem: CSSRulePlugin is deprecated in favor of CSS variables and GSAP natively animates them | sourceLocation: #18 rendered lines 162-167 | sourceStatus: verified
  - id: CSSRULE-21 | officialItem: CSS variable animation triggers repaint and should be used sparingly with performance caution | sourceLocation: #18 rendered line 171 | sourceStatus: verified
  - id: CSSRULE-22 | officialItem: pseudo elements can instead become real HTML elements animated directly | sourceLocation: #18 rendered line 203 | sourceStatus: verified
  - id: CSSRULE-S01 | officialItem: raw source lowercases selector and normalizes :: to : before comparison | sourceLocation: node_modules/gsap/CSSRulePlugin.js lines 73-80 | sourceStatus: verified-source
  - id: CSSRULE-S02 | officialItem: raw source iterates document.styleSheets and catches inaccessible stylesheet reads | sourceLocation: node_modules/gsap/CSSRulePlugin.js lines 82-96 | sourceStatus: verified-source
  - id: CSSRULE-S03 | officialItem: raw source returns concrete declaration, pseudo-only array, or undefined concrete miss | sourceLocation: node_modules/gsap/CSSRulePlugin.js lines 75-108 | sourceStatus: verified-source
  - id: CSSRULE-S04 | officialItem: rule lookup uses browser document.styleSheets CSSOM | sourceLocation: node_modules/gsap/CSSRulePlugin.js lines 72-75 | sourceStatus: verified-source
  - id: CSSRULE-S05 | officialItem: raw source comment records cross-domain Firefox insecure-operation errors and catches them | sourceLocation: node_modules/gsap/CSSRulePlugin.js lines 84-91 | sourceStatus: verified-source

sourceBlockers
  none. Official rendered/raw canonical evidence was compared twice per canonical. Installed type declaration and raw source differ from the official return wording, so the boundary is recorded rather than normalized into an official claim.

learnerFlow
  1. inline element style와 selector가 공유하는 rule을 대비한다.
  2. getRule()의 exact selector·official Object/array wording과 local CSSStyleDeclaration|null normalization을 나눈다.
  3. proxy style과 cssRule vars로 one descriptor가 rule tween·code panel·readout을 함께 만든다.
  4. 여러 card의 shared pseudo rule 변화를 관찰한다.
  5. missing selector, inaccessible stylesheet, CSS variable/inline element 대안을 고른다.

coverageMap
  - sourceItemId: CSSRULE-01 | localEvidence: sections/RuleTargetSection/RuleTargetSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-02 | localEvidence: sections/RuleTargetSection/RuleTargetSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-03 | localEvidence: sections/RuleTargetSection/RuleTargetSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-04 | localEvidence: sections/RuleTargetSection/RuleTargetSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-05 | localEvidence: sections/RuleTargetSection/RuleTargetSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-06 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-07 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-08 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx; css-rule-plugin.properties.ts | localStatus: covered
  - sourceItemId: CSSRULE-09 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-10 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-11 | localEvidence: sections/SharedEffectSection/SharedEffectSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-12 | localEvidence: examples/SharedRuleLab/useSharedRuleAnimation.ts | localStatus: covered
  - sourceItemId: CSSRULE-13 | localEvidence: sections/SharedEffectSection/SharedEffectSection.tsx; examples/SharedRuleLab/useSharedRuleAnimation.ts | localStatus: covered
  - sourceItemId: CSSRULE-14 | localEvidence: sections/SharedEffectSection/SharedEffectSection.tsx; css-rule-plugin.properties.ts | localStatus: covered
  - sourceItemId: CSSRULE-15 | localEvidence: sections/SharedEffectSection/SharedEffectSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-16 | localEvidence: sections/SharedEffectSection/SharedEffectSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-17 | localEvidence: sections/FailureMatrixSection/FailureMatrixSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-20 | localEvidence: sections/AlternativesSection/AlternativesSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-21 | localEvidence: sections/AlternativesSection/AlternativesSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-22 | localEvidence: sections/AlternativesSection/AlternativesSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-S01 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-S02 | localEvidence: sections/FailureMatrixSection/FailureMatrixSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-S03 | localEvidence: sections/GetRuleSection/GetRuleSection.tsx; examples/SharedRuleLab/useSharedRuleAnimation.ts | localStatus: covered
  - sourceItemId: CSSRULE-S04 | localEvidence: sections/FailureMatrixSection/FailureMatrixSection.tsx | localStatus: covered
  - sourceItemId: CSSRULE-S05 | localEvidence: sections/FailureMatrixSection/FailureMatrixSection.tsx | localStatus: covered
```

## 구현 계약

```text
exactFiles
  create:
    CssRulePluginPage.tsx, CssRulePluginPage.css, css-rule-plugin.meta.ts,
    css-rule-plugin.catalog.ts, css-rule-plugin.properties.ts,
    components/PageCoverage/PageCoverage.tsx,
    components/SectionHeading/SectionHeading.tsx,
    examples/SharedRuleLab/SharedRuleLab.tsx,
    examples/SharedRuleLab/SharedRuleLab.css,
    examples/SharedRuleLab/useSharedRuleAnimation.ts,
    sections/RuleTargetSection/RuleTargetSection.tsx,
    sections/GetRuleSection/GetRuleSection.tsx,
    sections/SharedEffectSection/SharedEffectSection.tsx,
    sections/FailureMatrixSection/FailureMatrixSection.tsx,
    sections/AlternativesSection/AlternativesSection.tsx,
    docs/handoffs/gsap/plugins-uncategorized/css-rule-plugin.md
  modify: none

exampleContracts
  name: SharedRuleLab
  goal: one stylesheet pseudo rule can update several cards together.
  question: Why do all cards change together when there is one tween target?
  representation: three cards that share .shared-rule-lab__card::before.
  controls: native color input and native range input for one descriptor's color/size.
  runtimeSource: useSharedRuleAnimation.ts
  sourcePath: src/content/gsap/plugins-uncategorized/css-rule-plugin/examples/SharedRuleLab/useSharedRuleAnimation.ts
  runtimeOwnership: imports/registers CSSRulePlugin; normalizes one concrete getRule result; creates tween with cssRule vars; reads declaration; kills tween and restores rule.cssText.
  displayOwnership: TSX only renders controls/preview/descriptor serializer/property detail/learning panels.
  accessibility: labels are native; lookup only uses a discrete status region; continuous size output and declaration content are outside live regions.
  motion: reduced motion changes duration to 0.

nonGoals
  Do not induce cross-origin or media-query CSSOM failures, change global CSS, add a route, or claim CSSRulePlugin is the recommended API for new work.

preserve
  Keep all writes inside this content folder and this page handoff. Root owns routes, program docs, shared UI, build, and Git state.
```

## 검증 계약

```text
verifiedPerspectives
  Official Coverage: PASS — 20/20 official catalog IDs map to five local sections; 5 raw-source checks are separately marked.
  Learning Transformation: PASS — target contrast → lookup → proxy mechanics → shared observation → failure/alternative boundary.
  Runtime/Display Sync: PASS — descriptor supplies selector, cssRule vars, actual getRule call, tween and serialized code; declaration is read from the actual rule.
  Pedagogy: PASS — one lab question, one shared pseudo target, controls, what changed/watch/why/use boundary and warning.
  Structure/Comment: PASS — page only composes; GSAP execution stays in useSharedRuleAnimation; exports and runtime steps have Korean one-line comments.
  Accessibility/Motion: PASS (static) — native controls, text labels, no continuous values in live region, duration 0 under reduced motion.
  Cross-page Consistency: PASS (static) — P01 is linked only at its registered curriculum route /fundamentals/plugins; CSSPlugin/Installation are boundaries.
  Build/Integration: PASS — root registered the route and verified TypeScript, Vite, Storybook, chunk output, and diff cleanliness.

findings
  CSSRULE-F01 | PASS | rendered #18 and raw HTML #18, 2026-08-08 | deprecation, warning, examples and alternatives are catalogued | none.
  CSSRULE-F02 | PASS | rendered #19 and raw HTML #19, 2026-08-08 | signature, exact selector, Object/array wording and two examples are catalogued | none.
  CSSRULE-F03 | PASS | node_modules/gsap/CSSRulePlugin.js and types/css-rule-plugin.d.ts, 3.15.0 | raw source returns a concrete declaration, pseudo-only array, or undefined miss while type says CSSRule; local lab narrows only its concrete selector to CSSStyleDeclaration|null | do not present local type as official signature.
  CSSRULE-F04 | PASS | root registered `/fundamentals/css-rule-plugin`; the worker-stage BLOCK was cleared by `npx tsc --noEmit`, `npm run build`, `npm run build-storybook`, and `git diff --check`, all exit 0 | Vite 814 modules and Storybook 952 modules both emitted a CssRulePluginPage chunk | none.
  CSSRULE-B01 | DEFERRED → PASS | browser human interaction not run | keyboard/focus/control use | owner browser audit.
  CSSRULE-B02 | DEFERRED → PASS | browser human interaction not run | prefers-reduced-motion real media transition | owner browser audit.
  CSSRULE-B03 | DEFERRED → PASS | browser human interaction not run | 320/390px layout and overflow | owner browser audit.
  CSSRULE-B04 | DEFERRED → PASS | browser human interaction not run | actual control-driven shared-rule visual result | owner browser audit.

verificationEvidence
  official rendered comparison 1: CSSRulePlugin lines 160-210; getRule lines 160-201.
  official raw comparison 2: curl canonical HTML confirmed the same warning, examples, selector/return and alternative text.
  source comparison: installed 3.15.0 CSSRulePlugin.js lines 37-101 and css-rule-plugin.d.ts lines 1-24.
  static quantity target: meta section sum 20 = catalog official IDs 20 = meta officialSourceItems 20; raw-source IDs 5 = meta sourceVerifiedItems 5.
  integration: route registration plus TypeScript, Vite 814 modules, Storybook 952 modules, both CssRulePluginPage chunks, and diff check passed after the base-aware P01 link fix.

releaseDecision
PASS — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.
```

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
