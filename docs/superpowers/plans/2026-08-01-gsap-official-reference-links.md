# GSAP Official Reference Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `gsap.to()` 페이지와 각 데모에서 관련 GSAP 공식 문서를 새 탭으로 열 수 있게 한다.

**Architecture:** 링크 마크업과 새 탭 동작은 공용 `OfficialDocsLink`가 맡고, 정확한 URL은 `gsap.to()` 레슨 폴더의 정적 참조 데이터가 맡는다. `DemoPanel`은 선택적인 링크 배열을 받아 기존 다시 재생 동작 옆에 표시한다.

**Tech Stack:** React 19, TypeScript 6, CSS, Vitest, React Testing Library

## Global Constraints

- 화면에 소스 코드나 코드 하이라이터를 다시 추가하지 않는다.
- 링크는 GSAP 공식 도메인의 확인된 문서만 사용한다.
- 새 런타임 또는 아이콘 의존성을 추가하지 않는다.
- 기존 데모와 주석은 변경하지 않는다.
- 링크가 없는 `DemoPanel`의 기존 사용 방식은 그대로 유지한다.

---

### Task 1: 공용 공식 문서 링크

**Files:**
- Create: `src/components/learning/OfficialDocsLink.tsx`
- Create: `src/components/learning/OfficialDocsLink.css`
- Create: `src/components/learning/OfficialDocsLink.test.tsx`

**Interfaces:**
- Produces: `OfficialReference = { label: string; href: string }`
- Produces: `OfficialDocsLink({ label, href }: OfficialReference): JSX.Element`

- [ ] **Step 1: 새 탭 링크 동작을 정의하는 실패 테스트 작성**

```tsx
render(
  <OfficialDocsLink
    label="상대값"
    href="https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values"
  />,
)

expect(screen.getByRole('link', { name: '상대값 공식 문서 새 탭에서 열기' })).toHaveAttribute(
  'target',
  '_blank',
)
expect(screen.getByRole('link', { name: '상대값 공식 문서 새 탭에서 열기' })).toHaveAttribute(
  'rel',
  'noopener noreferrer',
)
```

- [ ] **Step 2: 테스트가 컴포넌트 부재 때문에 실패하는지 확인**

Run: `npm test -- src/components/learning/OfficialDocsLink.test.tsx`
Expected: FAIL because `OfficialDocsLink` cannot be imported.

- [ ] **Step 3: 최소 링크 컴포넌트와 스타일 구현**

```tsx
export type OfficialReference = {
  label: string
  href: string
}

export function OfficialDocsLink({ label, href }: OfficialReference) {
  return (
    <a
      className="official-docs-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} 공식 문서 새 탭에서 열기`}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}
```

스타일은 기존 `--color-border`, `--color-text`, `--color-accent` 토큰으로 작은 pill과 `focus-visible` 상태만 정의한다.

- [ ] **Step 4: 컴포넌트 테스트 통과 확인**

Run: `npm test -- src/components/learning/OfficialDocsLink.test.tsx`
Expected: 1 test passed.

- [ ] **Step 5: 공용 링크 단위 커밋**

```bash
git add src/components/learning/OfficialDocsLink.tsx src/components/learning/OfficialDocsLink.css src/components/learning/OfficialDocsLink.test.tsx
git commit -m "feat: 공식 문서 링크 컴포넌트 추가"
```

### Task 2: DemoPanel 공식 자료 영역

**Files:**
- Modify: `src/components/demo/DemoPanel.tsx`
- Modify: `src/components/demo/DemoPanel.css`
- Modify: `src/components/demo/DemoPanel.test.tsx`

**Interfaces:**
- Consumes: `OfficialReference`, `OfficialDocsLink`
- Produces: `DemoPanel` prop `references?: OfficialReference[]`

- [ ] **Step 1: 복수 링크와 링크 없는 상태의 실패 테스트 작성**

```tsx
render(
  <DemoPanel
    title="상대값"
    description="설명"
    references={[
      { label: '상대값', href: 'https://gsap.com/docs/relative' },
      { label: 'Tween', href: 'https://gsap.com/docs/tween' },
    ]}
  >
    <div>데모</div>
  </DemoPanel>,
)

expect(screen.getAllByRole('link')).toHaveLength(2)
```

기존 재생 테스트에서는 링크 영역이 렌더링되지 않는 것도 확인한다.

- [ ] **Step 2: 새 prop 부재로 테스트가 실패하는지 확인**

Run: `npm test -- src/components/demo/DemoPanel.test.tsx`
Expected: FAIL because `references` is not part of `DemoPanel` props and links are absent.

- [ ] **Step 3: 링크 배열 렌더링과 반응형 동작 그룹 구현**

`DemoPanel` 헤더에 `.demo-panel__actions`를 만들고, `references`가 있을 때만 `OfficialDocsLink` 목록을 렌더링한 뒤 기존 다시 재생 버튼을 유지한다. 모바일에서는 action 그룹이 줄바꿈되도록 한다.

- [ ] **Step 4: DemoPanel 테스트 통과 확인**

Run: `npm test -- src/components/demo/DemoPanel.test.tsx`
Expected: all DemoPanel tests passed.

- [ ] **Step 5: DemoPanel 통합 단위 커밋**

```bash
git add src/components/demo/DemoPanel.tsx src/components/demo/DemoPanel.css src/components/demo/DemoPanel.test.tsx
git commit -m "feat: 데모 패널에 공식 자료 연결"
```

### Task 3: `gsap.to()` 레슨 링크 매핑

**Files:**
- Create: `src/fundamentals/gsap-to/gsap-to.references.ts`
- Modify: `src/fundamentals/gsap-to/GsapToPage.tsx`
- Modify: `src/fundamentals/gsap-to/GsapToPage.test.tsx`
- Modify: `src/fundamentals/gsap-to/gsap-to.css`

**Interfaces:**
- Consumes: `OfficialReference`, `OfficialDocsLink`, `DemoPanel.references`
- Produces: `gsapToReferences` with `method`, `basicMovement`, `multipleProperties`, `relativeValue`, `functionValue`, `multipleTargets`, `cardFeedback`

- [ ] **Step 1: 페이지와 여섯 데모의 정확한 공식 URL을 요구하는 실패 테스트 작성**

```tsx
expect(screen.getByRole('link', { name: 'gsap.to() 공식 문서 새 탭에서 열기' })).toHaveAttribute(
  'href',
  'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/',
)
expect(screen.getByRole('link', { name: '상대값 공식 문서 새 탭에서 열기' })).toHaveAttribute(
  'href',
  'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values',
)
```

나머지 데모도 설계 문서의 매핑과 정확히 일치하는지 확인한다.

- [ ] **Step 2: 레슨 링크가 없어 테스트가 실패하는지 확인**

Run: `npm test -- src/fundamentals/gsap-to/GsapToPage.test.tsx`
Expected: FAIL because official links are absent.

- [ ] **Step 3: 레슨별 참조 데이터와 페이지 연결 구현**

정적 `gsapToReferences`를 만들고 페이지 제목에는 `OfficialDocsLink`를 직접 사용한다. 각 `DemoPanel`에는 해당 배열을 `references`로 전달한다. 제목 링크는 `.gsap-to-page__title-row` 안에서 제목과 함께 배치하고 모바일에서도 자연스럽게 줄바꿈한다.

- [ ] **Step 4: 레슨 테스트와 관련 컴포넌트 테스트 통과 확인**

Run: `npm test -- src/fundamentals/gsap-to/GsapToPage.test.tsx src/components/demo/DemoPanel.test.tsx src/components/learning/OfficialDocsLink.test.tsx`
Expected: all related tests passed.

- [ ] **Step 5: 레슨 연결 단위 커밋**

```bash
git add src/fundamentals/gsap-to/gsap-to.references.ts src/fundamentals/gsap-to/GsapToPage.tsx src/fundamentals/gsap-to/GsapToPage.test.tsx src/fundamentals/gsap-to/gsap-to.css
git commit -m "feat: gsap.to 예제에 공식 문서 링크 추가"
```

### Task 4: 프로젝트 문서와 전체 검증

**Files:**
- Modify: `docs/project-plan.md`
- Modify: `docs/progress.md`

**Interfaces:**
- Consumes: 완료된 공식 문서 링크 기능과 검증 결과
- Produces: 새 레슨에서 따라야 할 링크 관리 원칙과 최신 진행률

- [ ] **Step 1: 프로젝트 운영 원칙 갱신**

`docs/project-plan.md`에 공식 자료 링크 UI는 공용 컴포넌트를 사용하고 실제 URL은 레슨 폴더에서 관리한다는 규칙을 추가한다. `docs/progress.md`에 `gsap.to()` 공식 링크 연결 완료와 최신 테스트 개수를 기록한다.

- [ ] **Step 2: 전체 테스트 실행**

Run: `npm test`
Expected: all test files and tests pass without warnings.

- [ ] **Step 3: 프로덕션 빌드 실행**

Run: `npm run build`
Expected: TypeScript and Vite build succeed.

- [ ] **Step 4: 변경 품질과 금지 의존성 확인**

Run: `git diff --check`
Expected: no output.

Run: `rg -n "prism-react-renderer|\\?raw|CodeBlock" src package.json`
Expected: no output.

- [ ] **Step 5: 문서 및 최종 검증 단위 커밋**

```bash
git add docs/project-plan.md docs/progress.md
git commit -m "docs: 공식 문서 링크 운영 원칙 반영"
```

- [ ] **Step 6: 원격 저장소로 푸시 후 동기화 확인**

Run: `git push origin main`
Expected: push succeeds.

Run: `git rev-parse HEAD && git rev-parse origin/main`
Expected: both hashes are identical.
