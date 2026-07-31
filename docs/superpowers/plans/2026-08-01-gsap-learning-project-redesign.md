# GSAP Learning Project Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing code-panel-oriented codebook with a focused three-track GSAP learning app that shows only interactive demos in the browser and keeps readable, commented source beside each lesson in the repository.

**Architecture:** A small custom route catalog is the single source for the top-level tracks and lesson navigation. `App` renders a persistent track header, a fixed circular table-of-contents control, and a lazy-loaded route page; lessons own their GSAP examples and plain CSS, while shared learning components contain only navigation and replay behavior.

**Tech Stack:** Vite 8, React 19, TypeScript 6, GSAP 3, `@gsap/react`, Vitest, React Testing Library, jsdom

## Global Constraints

- The browser renders GSAP behavior, navigation, descriptions, and controls, but never lesson source code.
- The three tracks are `기본`, `패턴`, and `실무` and map to `fundamentals`, `patterns`, and `showcases`.
- The floating table-of-contents control uses `position: fixed`, is about 40px on desktop and at least 44px on touch widths, and expands downward.
- Selecting a table-of-contents item navigates to that lesson and automatically collapses the menu.
- The menu also closes from its circular close button, outside click, and `Escape`, and exposes correct ARIA state.
- `styles/global.css` contains only reset, design tokens, and document defaults; app shell styles live in `app/app.css`; lesson CSS stays beside its lesson.
- CSS Modules are not used.
- GSAP and React lifecycle code stays explicit in each example and includes nearby Korean learning comments.
- CSS comments explain only motion-critical initial state and layout decisions.
- No `?raw` imports, `CodeBlock`, or `prism-react-renderer` remain after migration.
- Preserve user-owned changes in `AGENTS.md`; do not stage it as part of implementation commits.

---

## Planned File Structure

```text
src/
  app/
    App.tsx                 # pathname state, route resolution, lazy page rendering
    App.test.tsx            # track and navigation integration behavior
    routes.ts               # track catalog and pure route resolution helpers
    routes.test.ts          # route fallback and path tests
    app.css                 # header, fixed TOC, responsive content shell
  components/
    demo/
      DemoPanel.tsx         # title, description, replay remount boundary
      DemoPanel.test.tsx
    learning/
      FloatingToc.tsx       # accessible fixed curriculum popover
      FloatingToc.test.tsx
      TrackTabs.tsx         # top-level track links
  fundamentals/
    gsap-to/
      GsapToPage.tsx        # first fundamentals lesson and example grouping
      GsapToPage.test.tsx
      gsap-to.css
      examples/
        BasicMovementExample.tsx
        MultiplePropertiesExample.tsx
        RelativeValueExample.tsx
        FunctionValueExample.tsx
        MultipleTargetsExample.tsx
        CardFeedbackExample.tsx
  pages/
    TrackOverviewPage.tsx   # real overview for tracks without lessons yet
  styles/
    global.css              # reset, tokens, document defaults only
  test/
    setup.ts                # jest-dom matchers and test cleanup
  main.tsx
vitest.config.ts
```

Delete after the new app builds:

```text
src/lessons/
scripts/check-routes.mjs
scripts/check-practices.mjs
docs/practice-plan.md
```

The old files under `src/components/learning/` are replaced in place by the new `FloatingToc.tsx` and `TrackTabs.tsx`; obsolete `CodeBlock`, panel, sidebar, and practice navigation files are deleted.

---

### Task 1: Test Harness and Route Catalog

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Replace: `src/app/routes.ts`
- Create: `src/app/routes.test.ts`

**Interfaces:**
- Produces: `TrackId = 'fundamentals' | 'patterns' | 'showcases'`
- Produces: `LessonDefinition`, `TrackDefinition`, `ResolvedRoute`
- Produces: `tracks`, `getTrackHref(track)`, `resolveRoute(pathname)`
- Consumes: no new application interfaces

- [ ] **Step 1: Replace the syntax-highlighter dependency with the test harness**

Run:

```bash
npm uninstall prism-react-renderer
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest run",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Configure Vitest**

Create `vitest.config.ts`:

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Write the failing route tests**

Create `src/app/routes.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { getTrackHref, resolveRoute, tracks } from './routes'

describe('learning routes', () => {
  it('resolves the first fundamentals lesson from the root path', () => {
    expect(resolveRoute('/')).toMatchObject({
      trackId: 'fundamentals',
      lessonSlug: 'gsap-to',
      canonicalPath: '/fundamentals/gsap-to',
    })
  })

  it('keeps overview routes for tracks without a lesson', () => {
    expect(resolveRoute('/patterns')).toMatchObject({
      trackId: 'patterns',
      lessonSlug: null,
      canonicalPath: '/patterns',
    })
  })

  it('falls back to the first lesson when a fundamentals slug is unknown', () => {
    expect(resolveRoute('/fundamentals/not-found').canonicalPath).toBe('/fundamentals/gsap-to')
  })

  it('uses a track first lesson as its tab destination', () => {
    expect(getTrackHref(tracks[0])).toBe('/fundamentals/gsap-to')
    expect(getTrackHref(tracks[1])).toBe('/patterns')
  })
})
```

- [ ] **Step 4: Run the route tests and verify they fail**

Run:

```bash
npm test -- src/app/routes.test.ts
```

Expected: FAIL because the new `tracks`, `getTrackHref`, and `resolveRoute` interfaces do not exist.

- [ ] **Step 5: Implement the route catalog**

Replace `src/app/routes.ts` with the following model:

```ts
import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export type TrackId = 'fundamentals' | 'patterns' | 'showcases'

export type LessonDefinition = {
  slug: string
  title: string
  group: string
  Page: LazyExoticComponent<ComponentType>
}

export type TrackDefinition = {
  id: TrackId
  label: string
  description: string
  lessons: LessonDefinition[]
}

export type ResolvedRoute = {
  track: TrackDefinition
  trackId: TrackId
  lesson: LessonDefinition | null
  lessonSlug: string | null
  canonicalPath: string
}

const GsapToPage = lazy(() =>
  import('../fundamentals/gsap-to/GsapToPage').then(({ GsapToPage }) => ({ default: GsapToPage })),
)

export const tracks: TrackDefinition[] = [
  {
    id: 'fundamentals',
    label: '기본',
    description: '공식 API와 자주 만나는 상황을 작은 예제로 깊게 확인합니다.',
    lessons: [{ slug: 'gsap-to', title: 'gsap.to()', group: '트윈 기초', Page: GsapToPage }],
  },
  {
    id: 'patterns',
    label: '패턴',
    description: '여러 GSAP 기능을 특정 디자인에 종속되지 않는 조합 패턴으로 익힙니다.',
    lessons: [],
  },
  {
    id: 'showcases',
    label: '실무',
    description: '페이지와 컴포넌트 단위의 완성된 디자인으로 실무 활용법을 익힙니다.',
    lessons: [],
  },
]

export function getTrackHref(track: TrackDefinition) {
  const firstLesson = track.lessons[0]
  return firstLesson ? `/${track.id}/${firstLesson.slug}` : `/${track.id}`
}

export function resolveRoute(pathname: string): ResolvedRoute {
  const [trackSegment, lessonSegment] = pathname.split('/').filter(Boolean)
  const track = tracks.find(({ id }) => id === trackSegment) ?? tracks[0]
  const lesson = track.lessons.find(({ slug }) => slug === lessonSegment) ?? track.lessons[0] ?? null

  return {
    track,
    trackId: track.id,
    lesson,
    lessonSlug: lesson?.slug ?? null,
    canonicalPath: lesson ? `/${track.id}/${lesson.slug}` : `/${track.id}`,
  }
}
```

The import target is created in Task 3. Until then, create a temporary `src/fundamentals/gsap-to/GsapToPage.tsx` exporting a heading-only `GsapToPage` so TypeScript and Vite can resolve the lazy module:

```tsx
export function GsapToPage() {
  return <h1>gsap.to()</h1>
}
```

- [ ] **Step 6: Run focused and full tests**

Run:

```bash
npm test -- src/app/routes.test.ts
npm test
```

Expected: all route tests PASS.

- [ ] **Step 7: Commit the route foundation**

```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.ts src/app/routes.ts src/app/routes.test.ts src/fundamentals/gsap-to/GsapToPage.tsx
git commit -m "test: add learning route foundation"
```

---

### Task 2: Focused Application Shell and Floating Table of Contents

**Files:**
- Replace: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `src/app/app.css`
- Create: `src/components/learning/TrackTabs.tsx`
- Create: `src/components/learning/FloatingToc.tsx`
- Create: `src/components/learning/FloatingToc.test.tsx`
- Create: `src/pages/TrackOverviewPage.tsx`
- Replace: `src/styles/global.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: `tracks`, `getTrackHref`, `resolveRoute`, `TrackDefinition`, `LessonDefinition`
- Produces: `navigate(path: string): void` inside `App`
- Produces: `TrackTabs({ tracks, activeTrackId, onNavigate })`
- Produces: `FloatingToc({ track, activeLessonSlug, onNavigate })`
- Produces: `TrackOverviewPage({ label, description })`

- [ ] **Step 1: Write failing table-of-contents interaction tests**

Create `src/components/learning/FloatingToc.test.tsx` with a two-lesson fixture and these cases:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { lazy } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { TrackDefinition } from '../../app/routes'
import { FloatingToc } from './FloatingToc'

const Page = lazy(async () => ({ default: () => null }))
const track: TrackDefinition = {
  id: 'fundamentals',
  label: '기본',
  description: '기본 문법',
  lessons: [
    { slug: 'gsap-to', title: 'gsap.to()', group: '트윈 기초', Page },
    { slug: 'gsap-from', title: 'gsap.from()', group: '트윈 기초', Page },
  ],
}

describe('FloatingToc', () => {
  it('opens and closes with the circular trigger', async () => {
    const user = userEvent.setup()
    render(<FloatingToc track={track} activeLessonSlug="gsap-to" onNavigate={vi.fn()} />)

    const trigger = screen.getByRole('button', { name: '목차 열기' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: '기본 목차' })).toBeVisible()

    await user.click(screen.getByRole('button', { name: '목차 닫기' }))
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('navigates and collapses after selecting a lesson', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(<FloatingToc track={track} activeLessonSlug="gsap-to" onNavigate={onNavigate} />)

    await user.click(screen.getByRole('button', { name: '목차 열기' }))
    await user.click(screen.getByRole('button', { name: 'gsap.from()' }))

    expect(onNavigate).toHaveBeenCalledWith('/fundamentals/gsap-from')
    expect(screen.getByRole('button', { name: '목차 열기' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes from Escape and outside click', async () => {
    const user = userEvent.setup()
    render(<FloatingToc track={track} activeLessonSlug="gsap-to" onNavigate={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: '목차 열기' }))
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: '목차 열기' })).toHaveAttribute('aria-expanded', 'false')

    await user.click(screen.getByRole('button', { name: '목차 열기' }))
    await user.click(document.body)
    expect(screen.getByRole('button', { name: '목차 열기' })).toHaveAttribute('aria-expanded', 'false')
  })
})
```

- [ ] **Step 2: Run the table-of-contents tests and verify they fail**

Run:

```bash
npm test -- src/components/learning/FloatingToc.test.tsx
```

Expected: FAIL because `FloatingToc.tsx` does not exist.

- [ ] **Step 3: Implement `FloatingToc` minimally**

Create a native-button implementation with this state and event structure:

```tsx
export function FloatingToc({ track, activeLessonSlug, onNavigate }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setIsOpen(false)
    }
    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromEscape)
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromEscape)
    }
  }, [])

  const groups = track.lessons.reduce<Map<string, LessonDefinition[]>>((result, lesson) => {
    const lessons = result.get(lesson.group) ?? []
    lessons.push(lesson)
    result.set(lesson.group, lessons)
    return result
  }, new Map())

  return (
    <div ref={rootRef} className="floating-toc">
      <button
        ref={triggerRef}
        type="button"
        className="floating-toc__trigger"
        aria-label={isOpen ? '목차 닫기' : '목차 열기'}
        aria-expanded={isOpen}
        aria-controls="track-table-of-contents"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="floating-toc__icon" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <nav
        id="track-table-of-contents"
        className="floating-toc__panel"
        aria-label={`${track.label} 목차`}
        hidden={!isOpen}
      >
        {[...groups].map(([group, lessons]) => (
          <section key={group} className="floating-toc__group">
            <h2>{group}</h2>
            {lessons.map((lesson) => (
              <button
                key={lesson.slug}
                type="button"
                className="floating-toc__item"
                aria-current={lesson.slug === activeLessonSlug ? 'page' : undefined}
                onClick={() => {
                  setIsOpen(false)
                  onNavigate(`/${track.id}/${lesson.slug}`)
                }}
              >
                {lesson.title}
              </button>
            ))}
          </section>
        ))}
      </nav>
    </div>
  )
}
```

- [ ] **Step 4: Run the focused test and make it pass**

Run:

```bash
npm test -- src/components/learning/FloatingToc.test.tsx
```

Expected: all three interaction tests PASS.

- [ ] **Step 5: Write failing application-shell tests**

Create `src/app/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'

describe('App learning shell', () => {
  beforeEach(() => window.history.replaceState(null, '', '/fundamentals/gsap-to'))

  it('shows all three learning tracks without a code panel', async () => {
    render(<App />)
    expect(screen.getByRole('link', { name: '기본' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: '패턴' })).toBeVisible()
    expect(screen.getByRole('link', { name: '실무' })).toBeVisible()
    expect(screen.queryByLabelText(/코드/)).not.toBeInTheDocument()
  })

  it('changes tracks without a page reload', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: '패턴' }))
    expect(window.location.pathname).toBe('/patterns')
    expect(await screen.findByRole('heading', { name: '패턴' })).toBeVisible()
  })
})
```

- [ ] **Step 6: Run the app tests and verify they fail**

Run:

```bash
npm test -- src/app/App.test.tsx
```

Expected: FAIL because the old two-section shell is still rendered.

- [ ] **Step 7: Implement `TrackTabs`, `TrackOverviewPage`, and the new `App`**

Use anchor elements in `TrackTabs` and intercept only unmodified primary-button clicks in `App`, preserving normal open-in-new-tab behavior. `navigate(path)` must call `history.pushState`, update pathname state, and resolve the new route. Listen for `popstate` and clean up the listener.

Assign `const ActivePage = route.lesson?.Page` before returning JSX, then render this hierarchy:

```tsx
<div className="learning-app" data-track={route.trackId}>
  <header className="learning-header">
    <a className="learning-header__brand" href="/fundamentals/gsap-to">GSAP Study</a>
    <TrackTabs tracks={tracks} activeTrackId={route.trackId} onNavigate={navigate} />
    <span className="learning-header__progress">{progressLabel}</span>
  </header>
  <FloatingToc track={route.track} activeLessonSlug={route.lessonSlug} onNavigate={navigate} />
  <main ref={mainRef} className={`learning-content learning-content--${route.trackId}`} tabIndex={-1}>
    <Suspense fallback={<p className="route-loading">페이지를 불러오는 중입니다.</p>}>
      {ActivePage ? (
        <ActivePage key={`${route.trackId}-${route.lessonSlug}`} />
      ) : (
        <TrackOverviewPage label={route.track.label} description={route.track.description} />
      )}
    </Suspense>
  </main>
</div>
```

After route changes, replace non-canonical paths and focus the main region without scrolling it unexpectedly. Keep brand navigation using the same client-side `navigate` behavior.

- [ ] **Step 8: Replace global and shell CSS with the approved visual direction**

`src/styles/global.css` must contain only:

- `box-sizing` reset and zero body margin
- theme tokens for warm near-black background, elevated surfaces, text, muted text, border, and a restrained lime accent
- default `body`, `button`, `a`, and `#root` behavior
- `prefers-reduced-motion` rule that removes nonessential transitions

`src/app/app.css` must implement:

- a 58px top header with centered track tabs
- a centered fundamentals content column with a maximum width near 860px
- `position: fixed` floating navigation at `top: 86px; left: 20px`
- a 40px circular trigger on desktop and a 44px trigger at `max-width: 720px`
- a downward-opening panel capped with `max-height: calc(100dvh - 150px); overflow-y: auto`
- active lesson and focus-visible styling
- a wider content mode for `patterns` and full-width mode for `showcases`
- mobile spacing that prevents the header, trigger, menu, and content from overlapping

Do not add lesson-specific selectors to either file.

Import `./app/app.css` from `src/main.tsx` after `./styles/global.css`, and keep `gsap.registerPlugin(useGSAP)`.

- [ ] **Step 9: Run tests and build**

Run:

```bash
npm test
npm run build
```

Expected: all tests PASS and Vite creates `dist` successfully.

- [ ] **Step 10: Commit the learning shell**

```bash
git add src/app/App.tsx src/app/App.test.tsx src/app/app.css src/components/learning/FloatingToc.tsx src/components/learning/FloatingToc.test.tsx src/components/learning/TrackTabs.tsx src/pages/TrackOverviewPage.tsx src/styles/global.css src/main.tsx
git commit -m "feat: build focused GSAP learning shell"
```

---

### Task 3: First `gsap.to()` Fundamentals Vertical Slice

**Files:**
- Create: `src/components/demo/DemoPanel.tsx`
- Create: `src/components/demo/DemoPanel.test.tsx`
- Replace: `src/fundamentals/gsap-to/GsapToPage.tsx`
- Create: `src/fundamentals/gsap-to/GsapToPage.test.tsx`
- Create: `src/fundamentals/gsap-to/gsap-to.css`
- Create: `src/fundamentals/gsap-to/examples/BasicMovementExample.tsx`
- Create: `src/fundamentals/gsap-to/examples/MultiplePropertiesExample.tsx`
- Create: `src/fundamentals/gsap-to/examples/RelativeValueExample.tsx`
- Create: `src/fundamentals/gsap-to/examples/FunctionValueExample.tsx`
- Create: `src/fundamentals/gsap-to/examples/MultipleTargetsExample.tsx`
- Create: `src/fundamentals/gsap-to/examples/CardFeedbackExample.tsx`

**Interfaces:**
- Produces: `DemoPanel({ title, description, children }: { title: string; description: string; children: ReactNode })`
- Consumes: `useGSAP`, `gsap`, React refs, route registration from Task 1
- Produces: named export `GsapToPage`

- [ ] **Step 1: Write the failing replay-boundary test**

Create `src/components/demo/DemoPanel.test.tsx`:

```tsx
import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DemoPanel } from './DemoPanel'

describe('DemoPanel', () => {
  it('remounts only the demo when replay is requested', async () => {
    const user = userEvent.setup()
    const onMount = vi.fn()
    function Demo() {
      useEffect(() => onMount(), [])
      return <div>움직이는 대상</div>
    }

    render(
      <DemoPanel title="기본 이동" description="현재 값에서 목표 값으로 이동합니다.">
        <Demo />
      </DemoPanel>,
    )

    expect(onMount).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: '기본 이동 다시 재생' }))
    expect(onMount).toHaveBeenCalledTimes(2)
  })
})
```

- [ ] **Step 2: Run the replay test and verify it fails**

Run:

```bash
npm test -- src/components/demo/DemoPanel.test.tsx
```

Expected: FAIL because `DemoPanel.tsx` does not exist.

- [ ] **Step 3: Implement `DemoPanel`**

Use local `runKey` state and put the key only on `.demo-panel__stage`:

```tsx
export function DemoPanel({ title, description, children }: Props) {
  const [runKey, setRunKey] = useState(0)

  return (
    <section className="demo-panel">
      <header className="demo-panel__header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button type="button" onClick={() => setRunKey((key) => key + 1)} aria-label={`${title} 다시 재생`}>
          다시 재생
        </button>
      </header>
      <div key={runKey} className="demo-panel__stage">{children}</div>
    </section>
  )
}
```

- [ ] **Step 4: Run the replay test and verify it passes**

Run:

```bash
npm test -- src/components/demo/DemoPanel.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Write the failing lesson-coverage test**

Create `src/fundamentals/gsap-to/GsapToPage.test.tsx` and mock the six example modules so the test stays focused on curriculum structure:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GsapToPage } from './GsapToPage'

vi.mock('./examples/BasicMovementExample', () => ({ BasicMovementExample: () => <div /> }))
vi.mock('./examples/MultiplePropertiesExample', () => ({ MultiplePropertiesExample: () => <div /> }))
vi.mock('./examples/RelativeValueExample', () => ({ RelativeValueExample: () => <div /> }))
vi.mock('./examples/FunctionValueExample', () => ({ FunctionValueExample: () => <div /> }))
vi.mock('./examples/MultipleTargetsExample', () => ({ MultipleTargetsExample: () => <div /> }))
vi.mock('./examples/CardFeedbackExample', () => ({ CardFeedbackExample: () => <div /> }))

describe('GsapToPage', () => {
  it('separates API value forms from situation examples', () => {
    render(<GsapToPage />)
    expect(screen.getByRole('heading', { name: '공식 API 항목' })).toBeVisible()
    expect(screen.getByRole('heading', { name: '상황별 예제' })).toBeVisible()
    for (const title of ['기본 이동', '여러 속성', '상대값', '함수 기반 값', '여러 타깃', '카드 상태 피드백']) {
      expect(screen.getByRole('heading', { name: title })).toBeVisible()
    }
  })
})
```

- [ ] **Step 6: Run the lesson test and verify it fails**

Run:

```bash
npm test -- src/fundamentals/gsap-to/GsapToPage.test.tsx
```

Expected: FAIL because the temporary page does not contain the agreed sections and examples.

- [ ] **Step 7: Implement the six explicit GSAP examples**

Every example uses a local scope ref and calls `useGSAP(callback, { scope })`. Keep these exact learning differences:

| Example | Targets | `gsap.to()` values | Learning purpose |
|---|---|---|---|
| `BasicMovementExample` | one box | `x: 220`, `duration: 1`, `ease: 'power2.out'` | current state to one destination |
| `MultiplePropertiesExample` | one square | `x: 180`, `rotation: 180`, `scale: 1.2`, `borderRadius: '50%'`, `duration: 1.2` | multiple visual properties in one tween |
| `RelativeValueExample` | one marker with nonzero CSS start | `x: '+=160'`, `duration: 1` | calculate from the current value rather than replace it |
| `FunctionValueExample` | four bars | `x: (index) => 50 + index * 45`, `duration: 0.8`, `ease: 'power1.out'` | compute a destination per target index |
| `MultipleTargetsExample` | five dots | `y: -32`, `stagger: 0.1`, `duration: 0.45`, `ease: 'back.out(1.7)'` | one tween configuration over multiple targets |
| `CardFeedbackExample` | card content and status | timeline containing `scale: 0.97` then `scale: 1`, plus status `autoAlpha: 1`, `y: 0` | a small reusable UI feedback situation |

For `CardFeedbackExample`, create the timeline inside a `contextSafe` click handler returned by `useGSAP`; do not start it on mount. Explain in Korean comments why `contextSafe` connects later event-driven GSAP work to the component scope.

For the other examples, comments must identify:

- why the scope ref limits selector reach
- what `useGSAP` cleans up on remount and route change
- what makes the featured value form different from the neighboring examples
- why the chosen ease helps reveal the behavior

Do not add explanatory comments for decorative colors, borders, or spacing.

- [ ] **Step 8: Build the `GsapToPage` curriculum structure**

Import `./gsap-to.css`, render a page heading and concise introduction, then render:

```tsx
<section className="fundamentals-section" aria-labelledby="api-items-title">
  <h2 id="api-items-title">공식 API 항목</h2>
  <DemoPanel title="기본 이동" description="현재 위치에서 하나의 목표값으로 이동하는 가장 기본적인 tween 흐름을 확인합니다.">
    <BasicMovementExample />
  </DemoPanel>
  <DemoPanel title="여러 속성" description="이동과 회전, 크기, 모양 변화를 하나의 tween으로 묶어 같은 시간축에서 실행합니다.">
    <MultiplePropertiesExample />
  </DemoPanel>
  <DemoPanel title="상대값" description="고정된 목적지 대신 현재 값에 거리를 더해 시작 상태가 달라도 같은 양만큼 움직입니다.">
    <RelativeValueExample />
  </DemoPanel>
  <DemoPanel title="함수 기반 값" description="타깃 인덱스로 각 요소의 목적지를 계산해 하나의 설정에서 서로 다른 결과를 만듭니다.">
    <FunctionValueExample />
  </DemoPanel>
</section>
<section className="fundamentals-section" aria-labelledby="situation-examples-title">
  <h2 id="situation-examples-title">상황별 예제</h2>
  <DemoPanel title="여러 타깃" description="여러 요소에 같은 변화와 시작 간격을 적용해 순차적인 그룹 모션을 만듭니다.">
    <MultipleTargetsExample />
  </DemoPanel>
  <DemoPanel title="카드 상태 피드백" description="사용자 입력 뒤에 눌림과 완료 상태를 이어 붙여 즉각적인 인터랙션 피드백을 제공합니다.">
    <CardFeedbackExample />
  </DemoPanel>
</section>
```

- [ ] **Step 9: Add lesson-scoped CSS**

Create `gsap-to.css` with only selectors prefixed by `.gsap-to-`, `.fundamentals-`, or `.demo-panel`. It must provide:

- readable vertical spacing between the page header, section headings, and six demo panels
- a neutral stage at least 180px high
- visible tracks for distance comparisons
- lesson-specific box, bars, dots, and card visuals
- motion-critical comments beside initial `autoAlpha`/opacity, transform origin, and positioning values
- responsive stage padding at `max-width: 720px`

Do not place these selectors in `global.css` or `app.css`.

- [ ] **Step 10: Run lesson tests, all tests, and build**

Run:

```bash
npm test -- src/components/demo/DemoPanel.test.tsx src/fundamentals/gsap-to/GsapToPage.test.tsx
npm test
npm run build
```

Expected: all tests PASS and the production build succeeds.

- [ ] **Step 11: Commit the first vertical slice**

```bash
git add src/components/demo src/fundamentals/gsap-to
git commit -m "feat: add gsap to fundamentals lesson"
```

---

### Task 4: Remove Legacy Code and Align Project Documentation

**Files:**
- Delete: old files under `src/lessons/`
- Delete: obsolete files under `src/components/learning/` except `FloatingToc.tsx`, `FloatingToc.test.tsx`, and `TrackTabs.tsx`
- Delete: `scripts/check-routes.mjs`
- Delete: `scripts/check-practices.mjs`
- Delete: `docs/practice-plan.md`
- Modify: `.gitignore`
- Replace: `docs/project-plan.md`
- Replace: `docs/progress.md`

**Interfaces:**
- Consumes: completed new route catalog and learning shell
- Produces: repository with no legacy code-display path and accurate project status

- [ ] **Step 1: Record the legacy-reference checks before deletion**

Run:

```bash
rg -n "\\?raw|CodeBlock|prism-react-renderer|apiLessons|practiceLessons|PracticePanel|ExamplePanel" src package.json package-lock.json
```

Expected: matches still exist in unreachable legacy files, proving the cleanup check can detect them.

- [ ] **Step 2: Delete only the superseded implementation**

Remove the exact legacy targets listed in this task. Preserve:

- `src/app/App.tsx`, `src/app/routes.ts`, their new tests, and `src/app/app.css`
- the new `FloatingToc`, `TrackTabs`, and demo components
- `src/fundamentals/`
- `src/styles/global.css`, `src/main.tsx`, `src/vite-env.d.ts`
- Vite, TypeScript, GSAP, React configuration
- the user-modified `AGENTS.md`

- [ ] **Step 3: Keep Visual Companion artifacts out of git**

Append this entry to `.gitignore`:

```gitignore
# Superpowers 브레인스토밍 화면
.superpowers/
```

Do not delete the active companion directory while its browser session is still useful.

- [ ] **Step 4: Rewrite the project plan**

Replace `docs/project-plan.md` with the concise operational version of the approved design:

- project purpose and browser/editor responsibility split
- three learning tracks
- fundamentals completeness rule: official API coverage plus situation examples
- source comment and CSS rules
- top tabs and fixed circular table of contents behavior
- file structure and route registration rules
- first milestone and verification commands

Link to `docs/superpowers/specs/2026-08-01-gsap-learning-project-redesign-design.md` for the complete decision record instead of copying all rationale.

- [ ] **Step 5: Reset progress to actual implementation state**

Replace `docs/progress.md` so it records:

- update date `2026-08-01`
- completed: redesigned shell, three tracks, fixed circular table of contents, CSS split, test harness, first `gsap.to()` vertical slice
- in progress: expanding fundamentals coverage
- next: complete the remaining `gsap.to()` official API and situation matrix before starting `gsap.from()`
- a checklist for the three tracks with only implemented items checked

- [ ] **Step 6: Verify removal, tests, formatting, and build**

Run:

```bash
test -z "$(rg -l "\\?raw|CodeBlock|prism-react-renderer|apiLessons|practiceLessons|PracticePanel|ExamplePanel" src package.json package-lock.json || true)"
npm test
npm run build
git diff --check
git status --short
```

Expected:

- the legacy-reference check exits successfully with no paths
- every Vitest test passes
- TypeScript and Vite production build succeeds
- `git diff --check` prints nothing
- `AGENTS.md` remains an unstaged user change
- `.superpowers/` is ignored

- [ ] **Step 7: Perform responsive browser verification**

Run the Vite app and inspect `/fundamentals/gsap-to` at desktop and mobile widths. Verify:

- track tabs remain readable
- fixed trigger does not overlap the header or lesson title
- menu opens downward and scrolls internally when constrained
- lesson selection, outside click, circular close, and `Escape` collapse it
- all six demo stages remain visible without horizontal clipping
- replay remounts each demo without affecting neighboring demos
- no source code panel appears

- [ ] **Step 8: Commit cleanup and documentation**

Stage only implementation-owned files; do not stage `AGENTS.md`:

```bash
git add .gitignore src docs/project-plan.md docs/progress.md docs/practice-plan.md scripts package.json package-lock.json
git commit -m "chore: remove legacy GSAP codebook"
```

---

## Final Verification

Run from `/Users/limjaejoon/codding/fe-gsap`:

```bash
npm test
npm run build
test -z "$(rg -l "\\?raw|CodeBlock|prism-react-renderer|apiLessons|practiceLessons|PracticePanel|ExamplePanel" src package.json package-lock.json || true)"
git diff --check
git status --short
```

The work is complete when tests and build pass, no legacy code-display reference remains, the browser interaction matches the approved fixed circular menu, the first lesson demonstrates the new source/CSS conventions, and only the user's pre-existing `AGENTS.md` modification remains outside implementation commits.
