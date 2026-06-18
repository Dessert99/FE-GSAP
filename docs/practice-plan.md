# GSAP 실무 실습 트랙

## 목적

기존 커리큘럼은 GSAP API를 하나씩 익히는 코드북이다. 이 실습 트랙은 API 학습 이후, 실제 UI 요구사항을 여러 GSAP 기능으로 조합하는 연습을 한다.

목표는 멋진 장식 애니메이션을 많이 만드는 것이 아니라, React 환경에서 깨지지 않는 모션 구현을 반복해서 익히는 것이다.

## 실습 작성 원칙

- 하나의 실습은 하나의 실무 UI 문제를 다룬다.
- 실습은 API 레슨과 다른 화면에서 본다. 상단 헤더의 `실습` 탭으로 이동하고, 왼쪽 사이드바는 API 탭에서만 사용한다.
- 실습 목록은 헤더 바로 아래에서 태그형 링크로 보여준다. 새 실습을 `practiceLessons`에 등록하면 `/practices/:slug` route와 태그 목록에 함께 반영된다.
- 실습 화면은 좌우 분할이 아니라 상하 분할을 사용한다. 위쪽에는 실제 렌더링 결과, 아래쪽에는 같은 예제의 코드 스니펫을 둔다.
- 예제 코드는 화면 결과, React 상태, cleanup에 어떤 영향을 주는지 주석으로 설명한다.
- 주석은 "이 코드는 무엇인가"보다 "이 코드 때문에 화면이나 동작이 어떻게 달라지는가"를 우선 설명한다.
- 실습은 최소 기능으로 끝까지 동작해야 한다. 설정 가능성, 장식 요소, 범용 추상화는 요구가 생기기 전까지 만들지 않는다.
- `prefers-reduced-motion`, 라우트 전환 cleanup, 모바일/데스크톱 차이를 실무 검증 기준에 포함한다.

## 실습 목록

### 1. Hero Intro Sequence

- 목표: `timeline`, `defaults`, position parameter, reduced motion 대응을 한 화면 진입 애니메이션으로 조합한다.
- 완료 기준:
  - 히어로 요소가 순차적으로 등장한다.
  - `prefers-reduced-motion` 사용자는 큰 이동 없이 최종 상태를 바로 본다.
  - 레슨 전환이나 다시 재생 시 이전 애니메이션이 남지 않는다.

### 2. Scroll Product Story

- 목표: `ScrollTrigger`, `pin`, `scrub`, `batch`, `matchMedia`를 제품 소개 스크롤 섹션으로 조합한다.
- 완료 기준:
  - 데스크톱은 pin/scrub을 사용한다. `[완료]`
  - 모바일은 pin 없이 순차 등장으로 단순화한다. `[완료]`
  - resize와 route change 후 ScrollTrigger가 중복되지 않는다. `[완료: useGSAP scope + matchMedia revert]`

### 3. Interactive Gallery

- 목표: `Flip`, `Draggable`, `Observer`를 카드 갤러리 조작 UI로 조합한다.
- 완료 기준:
  - 카드 정렬 전환이 자연스럽게 이어진다.
  - 드래그와 wheel/touch 입력이 React 상태와 충돌하지 않는다.
  - 빠르게 조작해도 애니메이션이 누적되지 않는다.

### 4. SVG / Text Motion Section

- 목표: `DrawSVGPlugin`, `MotionPathPlugin`, `SplitText`, `TextPlugin`을 브랜드 섹션 모션으로 조합한다.
- 완료 기준:
  - SVG path, 텍스트 분해, 텍스트 변경이 하나의 시퀀스로 이어진다.
  - 애니메이션이 없어도 텍스트 의미가 유지된다.
  - 접근성을 해치지 않는 DOM 구조를 유지한다.

### 5. Navigation / Modal Microinteractions

- 목표: 실무에서 자주 만나는 메뉴, 모달, 토스트의 enter/exit 모션을 구현한다.
- 완료 기준:
  - 열림/닫힘 연타에도 상태가 꼬이지 않는다.
  - ESC, focus 흐름, route change cleanup을 확인한다.
  - 작은 모션이 UI 사용성을 방해하지 않는다.

### 6. Performance & Debugging Clinic

- 목표: `quickSetter`, `quickTo`, `ticker`, `GSDevTools`로 성능과 디버깅 감각을 익힌다.
- 완료 기준:
  - pointer-follow 같은 고빈도 업데이트에서 불필요한 tween 생성을 피한다.
  - timeline을 `GSDevTools`로 확인할 수 있다.
  - cleanup 누락이나 animation overlap을 재현하고 고친다.

### 7. Page / Route Transition

- 목표: 페이지 전환, 이전 화면 exit, 새 화면 enter, 이전 애니메이션 cleanup을 route 변경 흐름으로 조합한다.
- 완료 기준:
  - 빠르게 route를 바꿔도 오래된 transition이 새 화면을 덮지 않는다.
  - 페이지 전환 후 새 화면은 항상 초기 상태에서 enter된다.
  - route change나 다시 재생 시 이전 timeline이 kill된다.

### 8. Image Sequence / Canvas Scroll

- 목표: 스크롤 진행률을 canvas frame index에 연결해 제품 회전이나 프레임 시퀀스 패턴을 익힌다.
- 완료 기준:
  - 내부 scroller 진행률이 frame index를 정수 단위로 갱신한다.
  - canvas는 빈 화면 없이 첫 프레임부터 그려진다.
  - route change 후 오래된 ScrollTrigger가 이전 canvas에 쓰지 않는다.

### 9. Video Sync

- 목표: timeline 진행률을 영상 시간, progress UI, 주변 상태와 동기화하는 구조를 익힌다.
- 완료 기준:
  - play, pause, seek가 같은 timeline progress를 기준으로 동작한다.
  - 실제 영상에서는 `video.currentTime`에 연결할 위치가 코드에 드러난다.
  - cleanup 시 timeline이 중복 실행되지 않는다.

### 10. Cursor / Magnetic UI

- 목표: `quickTo`, `Observer`, hover interaction을 고빈도 pointer UI로 조합한다.
- 완료 기준:
  - pointer move마다 새 tween을 만들지 않는다.
  - 커서와 magnetic target이 stage 안 입력에만 반응한다.
  - hover end 후 target transform이 원위치로 돌아간다.

### 11. Form Validation Motion

- 목표: 검증 실패 시 오류 메시지, shake, 첫 오류 focus 이동을 사용성 힌트로 연결한다.
- 완료 기준:
  - 잘못된 필드만 shake한다.
  - 오류 메시지는 `aria-describedby`와 함께 렌더링된다.
  - 첫 오류 필드로 focus가 이동한다.

### 12. Toast / Notification Queue

- 목표: 여러 알림이 쌓이고 사라지는 queue를 enter/exit 모션과 연결한다.
- 완료 기준:
  - 새 알림은 stack 맨 위에 등장한다.
  - 제거는 exit 애니메이션 이후 데이터 배열에서 반영된다.
  - 자동 제거 타이머는 언마운트 시 정리된다.

### 13. List Reorder / Filtering

- 목표: 데이터 필터링과 정렬로 바뀐 DOM 위치를 `Flip`으로 자연스럽게 이어준다.
- 완료 기준:
  - 상태 변경 전 `Flip.getState()`를 기록한다.
  - 상태 변경 후 `Flip.from()`으로 남은 항목 위치가 이어진다.
  - 필터로 들어오고 나가는 항목의 enter/leave가 분리된다.

### 14. Accessibility Audit

- 목표: `prefers-reduced-motion`, focus, keyboard 조작을 모션 완료 기준으로 같이 검증한다.
- 완료 기준:
  - reduced motion 사용자는 indicator 이동을 즉시 상태 변경으로 본다.
  - 좌우 방향키로 tab focus와 선택 상태를 이동할 수 있다.
  - `role`, `aria-selected`, `tabIndex`가 active state와 함께 갱신된다.
