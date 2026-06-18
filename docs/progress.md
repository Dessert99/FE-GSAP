# 진행 현황 (Progress)

이 문서는 GSAP 학습 코드북의 **진행 상태**를 추적한다. 학습 원칙과 커리큘럼 정의는 `project-plan.md`를 따른다. 이 문서는 그 위에 "어디까지 했는가"만 얹는다.

**갱신 규칙**

- 작업을 마치면 해당 항목 `[ ]` → `[x]`로 바꾸고, 아래 "현재 상태"를 갱신한다.
- 세션을 시작할 때 이 문서를 먼저 읽어 진행률을 파악한다.
- 큰 항목(예: ScrollTrigger)은 하위 항목이 모두 끝나야 단계 전체를 완료로 본다.

## 현재 상태

- 마지막 업데이트: 2026-06-18
- 완료: 앱 스캐폴딩(Vite + React + TS), 학습용 공통 컴포넌트, `/lessons/:slug` 레슨별 경로와 열고 닫는 사이드바 내비게이션, 코드 문법 하이라이트(prism-react-renderer), 예제 전체 주석화, 0단계 React 통합(`registerPlugin`/`useGSAP`), 트윈 기초 4종(`to`/`from`/`fromTo`/`set`), 트윈 핵심 속성(속성별 개별 예제), 트윈 값 표현(상대값·transform 단축속성), 2단계 이징(내장 ease, `EasePack`, Custom ease 계열), 3단계 타임라인, 4단계 콜백과 키프레임, 5단계 stagger, 6단계 유틸리티와 헬퍼, 7단계 ScrollTrigger 전체(기본 트리거, `toggleActions`, `start` / `end`, `markers`, `scrub`, `pin`, `snap`, 콜백, `batch`, 반응형, `ScrollToPlugin`, `ScrollSmoother`), 8단계 인터랙션 플러그인(`Draggable`, `Observer`, `Flip`), 9단계 SVG와 텍스트 플러그인(`DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin`, `SplitText`, `TextPlugin`, `ScrambleTextPlugin`), 10단계 고급과 디버깅(`Physics2DPlugin`, `PhysicsPropsPlugin`, `GSDevTools`, `prefers-reduced-motion`), 기존 레슨 설명 컨벤션 반영, API/실습 헤더 탭 분리, 실습 태그 내비게이션, route 단위 lazy loading, 실습 상하 레이아웃, 실무 실습 트랙 계획, Hero Intro Sequence, Scroll Product Story, Interactive Gallery, SVG / Text Motion Section, Navigation / Modal Microinteractions, Performance & Debugging Clinic, Page / Route Transition, Image Sequence / Canvas Scroll, Video Sync, Cursor / Magnetic UI, Form Validation Motion, Toast / Notification Queue, List Reorder / Filtering, Accessibility Audit
- 진행 중: 없음
- 다음 후보: README (앱 실행 방법)

## 인프라 (레슨 외 골격)

- [x] Vite + React + TS 스캐폴딩, `gsap` · `@gsap/react` 설치
- [x] API 레슨 경로(`/lessons/:slug`) + 실습 경로(`/practices/:slug`) + 열고 닫는 API 사이드바 내비게이션 (`lessons/index.ts` 레지스트리)
- [x] route 단위 lazy loading — 첫 번들에 모든 레슨 페이지와 `?raw` 코드가 한꺼번에 들어가지 않게 분리
- [x] 공통 컴포넌트 — `LessonLayout` / `ExamplePanel` / `CodeBlock` / `Sidebar`
- [x] `?raw` 코드 표시 + 문법 하이라이트(prism-react-renderer) (화면 코드 = 실제 실행 소스)
- [x] 다시 재생 + 레슨 전환 시 초기화 (key remount)
- [ ] README (앱 실행 방법)

## 커리큘럼

### 0단계 · 셋업과 React 통합

- [x] `gsap.registerPlugin()` — 플러그인 등록
- [x] `useGSAP()` — 적용 지점, cleanup, `contextSafe`, `scope`, 의존성 배열

### 1단계 · 트윈 기초

- [x] `gsap.to()`
- [x] `gsap.from()`
- [x] `gsap.fromTo()`
- [x] `gsap.set()`
- [x] 핵심 속성 — `duration`, `delay`, `repeat`, `yoyo`, `repeatDelay`, `overwrite`, `immediateRender`
- [x] 값 표현 — 상대값(`"+=100"`), transform 단축속성(`x`, `y`, `rotation`, `scale`, `skew`, `transformOrigin`)

### 2단계 · 이징

- [x] 내장 ease 전종류 (`power`, `back`, `elastic`, `bounce`, `steps`, `circ`, `expo`, `sine` 등)
- [x] `EasePack` — `RoughEase`, `SlowMo`, `ExpoScaleEase`
- [x] `CustomEase` / `CustomBounce` / `CustomWiggle`

### 3단계 · 타임라인

- [x] `gsap.timeline()` — 생성, position parameter, 라벨, `defaults`, 중첩
- [x] 제어 — `play()` / `pause()` / `reverse()` / `restart()` / `seek()` / `timeScale()` / `progress()`

### 4단계 · 콜백과 키프레임

- [x] 콜백 — `onStart` / `onUpdate` / `onComplete` / `onRepeat` / `onReverseComplete`, 파라미터, `callbackScope`
- [x] `keyframes` — 배열 문법과 객체 문법

### 5단계 · stagger

- [x] 기본 stagger
- [x] 고급 객체 — `amount` / `each`, `from`, `grid`, `axis`, `ease`

### 6단계 · 유틸리티와 헬퍼

- [x] `gsap.utils` — `toArray`, `selector`, `snap`, `clamp`, `mapRange`, `interpolate`, `wrap` / `wrapYoyo`, `distribute`, `random`, `pipe`, `unitize`, `normalize`
- [x] `gsap.getProperty()` / `gsap.quickTo()` / `gsap.quickSetter()` / `gsap.delayedCall()` / `gsap.ticker`
- [x] `gsap.matchMedia()` — 반응형 분기
- [x] `gsap.registerEffect()` — 재사용 효과
- [x] `ModifiersPlugin` — 값 가공

### 7단계 · ScrollTrigger

- [x] 기본 트리거와 `toggleActions`
- [x] `start` / `end`, `markers`
- [x] `scrub`
- [x] `pin`
- [x] `snap`
- [x] 콜백 — `onEnter` / `onLeave` / `onEnterBack` / `onLeaveBack`
- [x] `ScrollTrigger.batch()`
- [x] 반응형 (`matchMedia`)
- [x] `ScrollToPlugin`
- [x] `ScrollSmoother`

### 8단계 · 인터랙션 플러그인

- [x] `Draggable` (+ `InertiaPlugin`)
- [x] `Observer`
- [x] `Flip`

### 9단계 · SVG와 텍스트

- [x] `DrawSVGPlugin`
- [x] `MorphSVGPlugin`
- [x] `MotionPathPlugin` (+ `MotionPathHelper`)
- [x] `SplitText`
- [x] `TextPlugin`
- [x] `ScrambleTextPlugin`

### 10단계 · 고급과 디버깅

- [x] `Physics2DPlugin` / `PhysicsPropsPlugin`
- [x] `GSDevTools` — 타임라인 디버깅
- [x] `prefers-reduced-motion` 대응 — 접근성 실무 패턴

## 실무 실습 트랙

- [x] `docs/practice-plan.md` — API 학습 이후 실무 조합 실습 계획
- [x] API/실습 화면 분리 — 헤더 탭, API 전용 사이드바, 실습 태그 내비게이션, 실습 전용 상하 패널
- [x] Hero Intro Sequence — `timeline`, `defaults`, position parameter, reduced motion 대응 조합
- [x] Scroll Product Story — `ScrollTrigger`, `pin`, `scrub`, `batch`, `matchMedia` 조합
- [x] Interactive Gallery — `Flip`, `Draggable`, `Observer` 조합
- [x] SVG / Text Motion Section — SVG·텍스트 플러그인 조합
- [x] Navigation / Modal Microinteractions — enter/exit, 상태 연타, focus 흐름
- [x] Performance & Debugging Clinic — 고빈도 업데이트와 timeline 디버깅
- [x] Page / Route Transition — 페이지 전환, 이전 애니메이션 cleanup
- [x] Image Sequence / Canvas Scroll — 스크롤 기반 제품 회전, 프레임 시퀀스
- [x] Video Sync — 스크롤이나 timeline으로 영상 진행 제어
- [x] Cursor / Magnetic UI — `quickTo`, `Observer`, hover interaction 조합
- [x] Form Validation Motion — 오류 메시지, shake, focus 이동
- [x] Toast / Notification Queue — 여러 알림이 쌓이고 사라지는 흐름
- [x] List Reorder / Filtering — 데이터 필터링 + `Flip`
- [x] Accessibility Audit — `prefers-reduced-motion`, focus, keyboard 조작 검증
