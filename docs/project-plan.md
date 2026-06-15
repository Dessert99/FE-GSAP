# GSAP 학습 프로젝트 계획

## 프로젝트 목적

이 프로젝트는 GSAP을 단계적으로 학습하기 위한 코드북이다. 목표는 GSAP 고유 기능 전체(코어 + 공식 플러그인)를 빠짐없이 다루는 것이며, 기초 문법부터 고급 플러그인까지 실행 화면과 코드로 함께 보면서 익힌다. 외부 라이브러리 전용 어댑터(PixiPlugin, EaselPlugin, CSSRulePlugin)는 범위에서 제외한다.

## 예제 작성 원칙

- GSAP 공식 API는 빈도와 무관하게 전부 다룬다. 단, 문법은 공식 문서를 기준으로 정확하게 쓴다.
- "전부 다룬다"는 커버 범위의 기준이지 예제 분량의 기준이 아니다. 각 API는 그 동작을 명확히 보여주는 최소 예제로 보여준다.
- 같은 기능을 부풀린 장식성 애니메이션, 과한 추상화, 불필요한 설정 가능성은 추가하지 않는다.
- 하나의 예제는 하나의 핵심 문법이나 실무 패턴을 보여주는 데 집중한다.
- 옵션이나 속성은 기본적으로 하나씩 분리해서 예제를 만든다. `yoyo`처럼 `repeat`가 있어야 의미가 드러나는 경우에만 필요한 보조 옵션을 함께 쓰고, 주석에서 어떤 옵션이 주제인지 명확히 밝힌다.
- 한 옵션 안에서도 값에 따라 동작이 달라지는 경우, 대표 값 2~3개를 같은 예제 안에 나란히 배치해 차이를 비교할 수 있게 한다.
- 각 예제 패널에는 해당 메서드·옵션·속성이 무엇을 하는지와 실무에서 어떤 역할로 쓰이는지 짧게 설명한다.
- React 예제에서는 GSAP 적용 지점, DOM 참조, cleanup 흐름이 명확하게 보이도록 작성한다.

## 페이지 구성 원칙

- 하나의 메서드나 개념을 하나의 학습 페이지에서 다룬다.
- 한 페이지에는 같은 개념을 다른 상황에서 쓰는 여러 예제를 배치한다.
- 각 예제는 실행되는 애니메이션과 실제 코드가 함께 보이도록 구성한다.
- 화면은 기본적으로 왼쪽에 데모, 오른쪽에 코드와 주석을 배치한다.
- 각 예제에는 애니메이션을 다시 볼 수 있는 "다시 재생" 컨트롤을 둔다. 마운트 시 한 번 재생되고 끝나면 반복 학습이 어렵다.
- 다른 레슨으로 이동하면 이전 데모의 애니메이션은 정리(cleanup)되고 새 데모는 초기 상태에서 시작한다.

## 코드 표시 방식

- 화면에 보여주는 코드는 예제 컴포넌트의 소스 파일 자체를 Vite의 `?raw` import로 불러와 표시한다.
- 이렇게 하면 실행되는 코드와 화면의 코드가 항상 같은 단일 소스이며, 코드 문자열을 따로 복제하지 않아 어긋날 일이 없다.
- 예: `import source from './examples/BasicToExample.tsx?raw'`를 `CodeBlock`에 넘긴다.
- `?raw`는 파일 전체(import 문 포함)를 문자열로 준다. 예제 파일은 학습 초점이 흐려지지 않게 한 개념만 담아 짧게 유지한다.
- `?raw` 모듈 타입은 `vite/client`에 포함된다. 타입 에러가 나면 `vite-env.d.ts`에 `/// <reference types="vite/client" />`를 둔다.
- 코드 패널은 `prism-react-renderer`로 TSX 문법을 하이라이트한다. 테마가 JS 객체라 전역 CSS를 오염시키지 않는다.

## 폴더 구조 원칙

앱 구조는 학습 단위가 바로 보이도록 단순하게 유지한다.

```txt
src/
  app/
    App.tsx                 # /lessons/:slug 경로와 선택된 레슨 렌더링
  components/
    learning/
      Sidebar.tsx           # lessons/index.ts 목록으로 레슨 링크 표시
      LessonLayout.tsx
      ExamplePanel.tsx      # 데모 + 코드 + 다시 재생 컨트롤
      CodeBlock.tsx         # ?raw로 받은 소스 문자열 표시
  lessons/
    index.ts                # 레슨 등록(슬러그·제목·페이지 컴포넌트)
    gsap-to/
      GsapToPage.tsx
      examples/
        BasicToExample.tsx
        MultiplePropertiesExample.tsx
  styles/
    global.css
```

- `lessons/index.ts`는 사이드바와 레슨 라우트의 단일 소스다. 레슨 슬러그·제목·페이지 컴포넌트를 한 배열로 등록한다.
- `lessons/<lesson-slug>/`는 하나의 GSAP 메서드나 개념을 다루는 단위다.
- `examples/`에는 해당 학습 페이지에서 실제로 렌더링되는 예제 컴포넌트만 둔다.
- `components/learning/`에는 여러 학습 페이지에서 반복해서 쓰는 화면 구성 컴포넌트만 둔다.
- 공통화할 이유가 분명하지 않으면 `shared`, `utils`, `hooks` 같은 범용 폴더를 미리 만들지 않는다.
- 예제에서 한 번만 쓰는 코드는 해당 lesson 폴더 안에 둔다.

## 주석 원칙

- 화면에 보이는 예제 코드는 학습 자료다. 모든 import·변수·설정 값·JSX 요소가 각각 어떤 역할을 하는지 주석으로 정의한다.
- 주석은 해당 코드 바로 옆이나 위에 한 줄로 짧게 단다. 파일 상단에 설명을 몰아서 쓰지 않는다.
- 코드를 그대로 옮긴 주석(`x: 200, // x를 200으로`)은 쓰지 않는다. 그 값·호출이 무슨 역할을 하고 왜 쓰는지를 적는다.
- GSAP 메서드와 옵션 키의 의미를 우선 설명하고, 실무에서 주의할 점이 있으면 해당 코드 가까이에 덧붙인다.

## 기술 기본값

- 앱 골격은 `Vite + React + TypeScript`를 기본값으로 둔다.
- GSAP React 예제는 `@gsap/react`의 `useGSAP()` 사용을 우선한다.
- 단순 GSAP 문법과 React에서 안전하게 쓰는 패턴을 구분해서 보여준다.
- 문법 기준은 GSAP 공식 문서를 우선하고, 예제 구성은 실무에서 자주 쓰이는 방식에 맞춘다.
- 레슨 간 이동은 `/lessons/:slug` 경로를 사용한다. 별도 라우터 의존성 없이 `lessons/index.ts` 등록 목록이 사이드바 링크와 경로 매칭을 모두 구동한다.

## 커리큘럼 (GSAP 전체)

GSAP 고유 기능 전체를 기초 → 고급 순서로 단계화한다. 각 단계는 앞 단계를 전제로 한다. 한 단계 안의 항목은 보통 항목당 한 학습 페이지가 되며, ScrollTrigger처럼 큰 항목은 여러 페이지로 쪼갠다. 진행하면서 항목이 추가·세분화될 수 있다.

### 0단계 · 셋업과 React 통합

- 설치와 `gsap.registerPlugin()`
- `@gsap/react`의 `useGSAP()` — 적용 지점, cleanup, `contextSafe`, `scope`, 의존성 배열

### 1단계 · 트윈 기초

- `gsap.to()` / `gsap.from()` / `gsap.fromTo()` / `gsap.set()`
- 핵심 속성 — `duration`, `delay`, `repeat`, `yoyo`, `repeatDelay`, `overwrite`, `immediateRender`
- 값 표현 — 상대값(`"+=100"`), 변형 단축속성(`x`, `y`, `rotation`, `scale`, `skew`, `transformOrigin`)

### 2단계 · 이징

- 내장 ease 전종류 — `power`, `back`, `elastic`, `bounce`, `steps`, `circ`, `expo`, `sine` 등
- `EasePack` — `RoughEase`, `SlowMo`, `ExpoScaleEase`
- `CustomEase` / `CustomBounce` / `CustomWiggle`

### 3단계 · 타임라인

- `gsap.timeline()` — 생성, position parameter, 라벨, `defaults`, 중첩
- 제어 — `play()` / `pause()` / `reverse()` / `restart()` / `seek()` / `timeScale()` / `progress()`

### 4단계 · 콜백과 키프레임

- 콜백 — `onStart` / `onUpdate` / `onComplete` / `onRepeat` / `onReverseComplete`, 파라미터, `callbackScope`
- `keyframes` — 배열 문법과 객체 문법

### 5단계 · stagger

- 기본 stagger
- 고급 객체 — `amount` / `each`, `from`, `grid`, `axis`, `ease`

### 6단계 · 유틸리티와 헬퍼

- `gsap.utils` — `toArray`, `selector`, `snap`, `clamp`, `mapRange`, `interpolate`, `wrap` / `wrapYoyo`, `distribute`, `random`, `pipe`, `unitize`, `normalize`
- `gsap.getProperty()` / `gsap.quickTo()` / `gsap.quickSetter()` / `gsap.delayedCall()` / `gsap.ticker`
- `gsap.matchMedia()` — 반응형 분기
- `gsap.registerEffect()` — 재사용 효과
- `ModifiersPlugin` — 값 가공

### 7단계 · ScrollTrigger

- 기본 트리거와 `toggleActions`
- `start` / `end`, `markers`
- `scrub`
- `pin`
- `snap`
- 콜백 — `onEnter` / `onLeave` / `onEnterBack` / `onLeaveBack`
- `ScrollTrigger.batch()`
- 반응형(`matchMedia`)
- `ScrollToPlugin`
- `ScrollSmoother`

### 8단계 · 인터랙션 플러그인

- `Draggable` (+ `InertiaPlugin`)
- `Observer`
- `Flip`

### 9단계 · SVG와 텍스트

- `DrawSVGPlugin`
- `MorphSVGPlugin`
- `MotionPathPlugin` (+ `MotionPathHelper`)
- `SplitText`
- `TextPlugin`
- `ScrambleTextPlugin`

### 10단계 · 고급과 디버깅

- `Physics2DPlugin` / `PhysicsPropsPlugin`
- `GSDevTools` — 타임라인 디버깅
- `prefers-reduced-motion` 대응 — 접근성을 지키는 실무 표준 패턴

## 첫 마일스톤

기능을 넓히기 전에 "한 레슨이 끝까지 도는" 수직 슬라이스를 먼저 완성한다.

1. Vite + React + TS 앱을 스캐폴딩하고 `gsap`, `@gsap/react`를 설치한다. → 검증: 빈 화면이 뜬다.
2. `gsap-to` 레슨 하나를 데모 + `?raw` 코드 표시 + 다시 재생까지 완성한다. → 검증: 애니메이션이 보이고, 옆 코드가 실제 소스와 일치하며, 다시 재생이 동작한다.
3. 사이드바에 레슨을 1개 이상 등록하고 전환을 확인한다. → 검증: 레슨을 바꾸면 데모가 초기화되어 새로 재생된다.

이 슬라이스가 검증되면 나머지 레슨은 같은 틀을 복제해 채운다.

## 작업 기준

- 새 학습 페이지를 만들기 전에 이 문서를 먼저 확인한다.
- 사용 빈도가 낮은 API도 GSAP 고유 기능이면 다룬다. 빠뜨리지 않는 것이 목표다.
- 다만 한 API를 장식적으로 부풀린 보여주기식 예제는 만들지 않는다. 커버 범위는 넓게, 예제는 짧게.
- 더 단순한 코드로 같은 학습 목표를 달성할 수 있으면 단순한 쪽을 선택한다.
- 예제 작성 컨벤션이 바뀌면 이미 완료한 레슨에도 같은 기준을 적용할 수 있는지 확인하고 필요한 범위만 보정한다.
- README는 앱 실행 방법이 생긴 뒤에 작성한다.
