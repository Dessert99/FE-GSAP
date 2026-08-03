# GSAP Core Map Implementation Plan

> **For agentic workers:** Follow the repository GSAP learning-page workflow. Automated test code is prohibited; verify with TypeScript/Vite, Storybook, and browser behavior.

**Goal:** `/fundamentals/gsap-core-map`에서 GSAP Core의 관계와 목적별 다음 API를 설명하고 34개 공식 기술 item을 모두 로컬 근거에 연결한다.

**Architecture:** page component는 header와 여섯 section만 조립한다. 정적 catalog data는 별도 file이 소유하고, animation/runtime Hook 없이 semantic HTML로 관계와 전체 index를 표시한다.

**Tech Stack:** React 19, TypeScript 6, Vite 8, GSAP 3, CSS

## Global Constraints

- `docs/handoffs/gsap/core/gsap-core-map.md`의 identity, learnerFlow, exactFiles, nonGoals, preserve를 따른다.
- source manifest 34개는 모두 `covered` localEvidence를 가져야 한다.
- 자동화 테스트 코드와 테스트 환경을 추가하지 않는다.
- page는 motion과 controls를 만들지 않는다.
- 파일 맨 위와 export 위의 한 줄 한국어 주석 규칙을 지킨다.
- 기존 `gsap-to`와 공용 컴포넌트는 수정하지 않는다.

---

### Task 1: Metadata and static catalog

**Files:**
- Create: `src/content/gsap/fundamentals/gsap-core-map/gsap-core-map.meta.ts`
- Create: `src/content/gsap/fundamentals/gsap-core-map/gsap-core-map.catalog.ts`

**Produces:** page header source identity, six section anchors, exhaustive Core/plugin catalog data and dependency labels.

- [ ] 공식 URL·대조일·sourcePath와 여섯 학습 section을 meta에 기록한다.
- [ ] target, ease, efficiency, utility, plugin family의 전체 명칭을 catalog에 기록한다.
- [ ] EasePack과 CustomEase dependency는 정상 URL만 사용하고 source defect는 handoff에 보존한다.
- [ ] `npx tsc --noEmit`으로 data와 type 오류가 없는지 확인한다.

### Task 2: Static learning sections

**Files:**
- Create: `src/content/gsap/fundamentals/gsap-core-map/sections/AccessPointSection/AccessPointSection.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/sections/AnimationModelSection/AnimationModelSection.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/sections/CoreBoundarySection/CoreBoundarySection.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/sections/ApiMapSection/ApiMapSection.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/sections/VersionCheckSection/VersionCheckSection.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/sections/NextStepsSection/NextStepsSection.tsx`

**Consumes:** Task 1 meta/catalog exports.

**Produces:** `#access-point` → `#animation-model` → `#core-boundary` → `#api-map` → `#version-check` → `#next-steps` learner flow.

- [ ] 처음 등장하는 `gsap`, Tween, playhead, Timeline, Core, plugin을 사용 전에 정의한다.
- [ ] Tween이 값을 쓰고 Timeline이 time/group을 조정한다는 경계를 standalone/child code와 함께 설명한다.
- [ ] position, label, shared controls와 instance reference는 지도 수준으로 보존한다.
- [ ] Core 전체 이름과 plugin family·dependency를 목적별 compact index로 표시한다.
- [ ] `gsap.version`의 type·현재 loaded version 의미와 문서 예시의 차이를 정적 snippet으로 설명한다.
- [ ] 미구현 route는 text roadmap으로, `/fundamentals/gsap-to`만 실제 local link로 표시한다.

### Task 3: Page composition and styling

**Files:**
- Create: `src/content/gsap/fundamentals/gsap-core-map/GsapCoreMapPage.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/GsapCoreMapPage.css`
- Create: `src/content/gsap/fundamentals/gsap-core-map/components/PageCoverage/PageCoverage.tsx`
- Create: `src/content/gsap/fundamentals/gsap-core-map/components/SectionHeading/SectionHeading.tsx`

**Consumes:** Task 1 meta and Task 2 sections.

**Produces:** lazy-loadable `GsapCoreMapPage` with official source links and responsive semantic layout.

- [ ] page TSX에는 header와 section 조립만 둔다.
- [ ] three canonical official links, sourcePath, reviewedAt을 header에 표시한다.
- [ ] 공식 source 3개·source item 34개와 여섯 local section의 대응표를 page 전용 coverage nav로 표시한다.
- [ ] desktop 관계 카드와 compact index를 작은 화면에서 한 column으로 바꾼다.
- [ ] code block은 overflow-x, 모든 실제 link는 focus-visible, 색 외 텍스트 label을 제공한다.

### Task 4: Route integration

**Files:**
- Modify: `src/app/routes.ts`
- Modify: `src/app/App.tsx`

**Consumes:** `GsapCoreMapPage` export.

**Produces:** `/fundamentals/gsap-core-map`, fundamentals 첫 lesson, brand home synchronization.

- [ ] page를 lazy import하고 fundamentals의 `시작하기` 첫 lesson으로 등록한다.
- [ ] brand href/navigation을 새 first lesson으로 맞추되 popstate·focus·fallback 동작을 보존한다.
- [ ] 기존 `/fundamentals/gsap-to`가 두 번째 lesson으로 계속 해석되는지 확인한다.

### Task 5: Verification and handoff closure

**Files:**
- Modify: `docs/handoffs/gsap/core/gsap-core-map.md`

**Produces:** covered coverage map, verification evidence, role findings, release decision.

- [ ] `npm run build`를 실행하고 exit 0을 기록한다.
- [ ] `npm run build-storybook`을 실행하고 exit 0을 기록한다.
- [ ] browser에서 desktop, 390px, keyboard focus, route/TOC, 외부 link, horizontal overflow absence를 확인한다.
- [ ] 독립 reviewer가 Official Coverage, Learning Transformation, Structure/Comment, Accessibility/Motion, Build/Integration을 finding 형식으로 판정한다.
- [ ] BLOCK이 있으면 Integrator가 수정하고 영향받은 관점의 재검수를 받는다.
- [ ] 별도 Release Reviewer가 모든 evidence와 미해결 BLOCK 부재를 확인한 뒤 PASS/BLOCK을 기록한다.
