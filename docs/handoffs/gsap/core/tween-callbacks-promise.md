# Tween callbacks and promise handoff

## 입력 계약

### objective

이미 만들어진 Tween의 콜백을 나중에 읽고 바꾸고 지우는 방법(`eventCallback()`)과, 완료 시점을 Promise로 기다리는 방법(`then()`)을 가르친다. 개별 콜백이 언제 불리는지는 `gsap-to`가 소유하므로, 이 페이지는 **생성 이후의 조작**에만 집중한다.

### officialPage

- title: `Tween.eventCallback()` + `Tween.then()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween/eventCallback()`
  - `https://gsap.com/docs/v3/GSAP/Tween/then()`
- reviewedAt: `2026-08-13`
- category: `Fundamentals > Tween`
- slug: `tween-callbacks-promise`
- sourcePageIds: primary `source:tween-event-callback`; related `source:tween-then`

### localPage

- localPath: `src/content/gsap/fundamentals/tween-callbacks-promise/`
- route: `/fundamentals/tween-callbacks-promise`

### sourceManifest

`tween-callbacks-promise.catalog.ts`의 `tweenCallbacksPromiseSourceItems` 배열이 authority다. 공식 item 17개와 실행 확인 항목 3개(`EC-P1`, `TH-P1`, `TH-P2`)를 `origin`으로 구분한다.

| 섹션 | 공식 item |
| --- | ---: |
| `after-creation` | 4 |
| `event-callback-form` | 4 |
| `event-callback-args` | 4 |
| `then-promise` | 5 |
| `boundaries` | 0 |
| 합계 | 17 |

공식 signature:

- `eventCallback( type:String, callback:Function, params:Array ) : [Function | self]`
- `then( callback:Function ) : Promise`

### sourceBlockers

`none`. 17개 공식 item 전부 canonical 원문으로 확인했다. 이번 대조에서 callback·parameter 값도 `vars` 객체에 들어가며 `vars`가 configuration data 저장소 역할을 한다는 항목(`EC-12`)을 보강했다.

공식 페이지가 게시하지 않은 것: getter가 미설정 시 무엇을 돌려주는지, `then()`의 Promise가 무엇으로 resolve되는지와 완료 후 재호출 결과, `eventCallback()`이 받는 type의 전체 목록(예시만 나열).

### moduleSelection

| module | 목적 |
| --- | --- |
| callable method | 두 메서드의 signature·인자·반환값 |
| concept/guide | 생성 시점 vs 생성 이후라는 경계, 콜백 대신 Promise를 쓰는 선택 기준 |

### learnerFlow

생성 시 `vars`와 생성 뒤 메서드 호출의 차이 → 같은 메서드가 읽기·쓰기·지우기를 겸하는 형태 → 세 인자가 정하는 것 → 완료를 Promise로 기다리기 → 관련 학습 페이지.

### coverageMap

catalog의 각 행이 `sectionId`로 근거 섹션을 지목한다. `PageCoverage`는 검수 수치를 노출하지 않고 다섯 학습 단계의 바로가기만 제공한다.

### relatedPages

- `gsap-to` — 개별 콜백이 언제 불리는지와 `vars` 전체 명세를 소유한다.
- `tween-playback-controls` — 재생·정지·재시작을 다룬다.
- `tween-configuration` — 설정의 출처와 적용 범위를 소유한다.

## 구현 계약

### exactFiles

create: `TweenCallbacksPromisePage.tsx` / `.css`, `tween-callbacks-promise.meta.ts`, `tween-callbacks-promise.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 5개(`AfterCreationSection`, `EventCallbackFormSection`, `EventCallbackArgsSection`, `ThenPromiseSection`, `BoundariesSection`), `examples/EventCallbackLab`

modify: `src/app/routes.ts`

### exampleContracts

- `EventCallbackLab` — runtimeSource `useEventCallbackRuntime.ts`. 하나의 paused Tween에 `onComplete`를 걸고 덮어쓰고 지우면서 **getter 반환값**과 **실제 호출 횟수**를 함께 관찰한다. 애니메이션 자체가 아니라 콜백 등록 상태가 관찰 대상이라 `Runtime` 접미사를 쓴다.
- TSX에서 `gsap`을 import하지 않는다. getter 결과는 추측하지 않고 매 조작 후 실제로 다시 호출해 읽으며, runtime의 `lastAction`을 TSX가 같은 호출 문법으로 직렬화한다.

`then()`은 실행 예제를 만들지 않았다. Promise resolve는 화면에서 관찰할 것이 한 번뿐이라 정적 코드 비교가 더 직접적이고, `docs/workflows/learning-design.md`가 그 경우 정적 표현을 택하도록 한다.

### nonGoals

- 콜백 이름별 호출 시점 명세를 이 페이지에서 다시 만들지 않는다.
- Timeline의 동명 메서드를 다루지 않는다. Timeline 학습 페이지가 소유한다.
- `onCompleteParams` 등 vars 형태의 전체 명세를 소유하지 않는다.

### preserve

- 공식 signature 문자열 원문과 `[Function | self]` 표기.
- 공용 컴포넌트와 다른 페이지 파일.

## 검증 계약

### verifiedPerspectives

- Official Coverage: `PASS` — 2026-08-13 두 canonical과 공식 item 17개를 다시 대조했다.
- Learning Transformation / Pedagogy: `PASS` — 제작용 coverage·source ownership UI와 잘못된 `vars` 멘탈 모델을 제거했다.
- Runtime/Display Sync: 정적 `PASS` — 단일 예제의 control → runtime call → getter observation → 표시 코드가 `lastAction`과 runtime state에서 파생된다.
- Structure/Comment: `PASS` — 예제 선언과 실행 단계 주석을 정적 확인했다.
- Accessibility/Motion: 정적 `PASS`, 실제 브라우저 `NOT VERIFIED` — 중복 live region을 제거했고 시각 animation이 없는 object Tween임을 확인했다.
- Build/Integration: TypeScript·Vite·Storybook `PASS` — 2026-08-13 메인 통합 실행이 모두 exit 0이다.
- Cross-page Consistency: `PASS` — 잘못된 `/fundamentals/tween-playhead` 링크를 `/fundamentals/tween-playback-controls`로 고쳤다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CB-001 | PASS | 2026-08-04에 이어 2026-08-13 두 canonical 직접 조회. signature, Parameters의 타입·기본값, 반환 설명, 코드 예제를 다시 확인 | 구현 범위 고정 | none |
| OC-CB-001 | BLOCK → ADDRESSED → PASS | 공식 `eventCallback()` 문서의 "You can only have one callback associated with each event type… So setting a new value will overwrite the old one." 주장이 catalog에 없었다 / `EC-11`을 신설해 `event-callback-form` 섹션에 연결하고 `EventCallbackFormSection.tsx`에 경고 블록을 추가했다. meta의 섹션 수를 3→4, 분모를 15→16으로 갱신했다 | 공식 기술 item 누락 | none |
| IMPL-CB-001 | BLOCK → ADDRESSED → PASS | 페이지 TSX가 섹션 4개(`EventCallbackFormSection`, `EventCallbackArgsSection`, `ThenPromiseSection`, `BoundariesSection`)를 import하는데 파일이 없어 타입 검사가 실패했다 / 네 섹션을 작성해 해소했다 | 페이지가 빌드되지 않는 상태 | none |
| IMPL-CB-002 | ADDRESSED | 실행 예제가 하나도 없어 다른 페이지 대비 관찰 경험이 비었다 / `EventCallbackLab`을 추가해 getter 반환·덮어쓰기·삭제·실제 호출 횟수를 관찰하게 했다 | 학습 경험 결손 | none |
| PROBE-CB-001 | PASS | 미설정 type의 getter는 `undefined`. `vars`에 준 콜백도 같은 getter로 `function`으로 읽힘. `null`로 지운 뒤 다시 `undefined`. setter는 instance 자신을 반환(`=== tween` true) | `EC-P1` 근거 | none |
| PROBE-CB-002 | PASS | 같은 type에 두 함수를 차례로 걸면 getter가 나중 함수를 돌려줌 — 공식의 덮어쓰기 주장 실행 확인 | `EC-11` 뒷받침 | none |
| PROBE-CB-003 | PASS | GSAP 3.15.0에서 handler 없는 `then()`과 `await tween`이 Tween 자신으로 resolve되고, 완료된 Tween의 재호출도 resolve됨을 재현 | `TH-P1`·`TH-P2` 근거 | none |
| OC-CB-002 | PASS | meta 섹션 합계 17 = catalog 공식 행 17, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-CB-001 | PASS | 2026-08-13 메인 통합 `npm run build`·`npm run build-storybook` 모두 exit 0 | 현재 수정본의 integration 확인 | none |
| TYPE-CB-001 | PASS | `npx tsc --noEmit` exit 0 (2026-08-13) | 대상 변경의 TypeScript 정합성 확인 | none |
| A11Y-CB-001 | 과거 승인 PASS → 현재 NOT VERIFIED | 키보드 이동, 320/390px 레이아웃, lab 버튼 실제 조작을 이번 검수에서 실행하지 않음 | 실제 브라우저 동작 미확인 | 메인 에이전트가 통합 브라우저 검수 |
| FACT-CB-001 | BLOCK → ADDRESSED → PASS | `vars`를 생성 순간에만 유효하고 이후 수정은 무효라고 설명했지만, 공식 문서는 callback·parameter가 `vars`에도 저장된다고 명시하며 GSAP 3.15.0 probe에서도 `tween.vars.onComplete` 변경이 getter와 실제 완료 호출에 반영됨 | 잘못된 상태 소유권 멘탈 모델 | `AfterCreationSection`을 생성 시 설정과 생성 뒤 문서화된 메서드 호출의 차이로 수정하고 `EC-12` 추가 |
| CONTENT-CB-001 | BLOCK → ADDRESSED → PASS | 첫 화면의 공식 source/item 개수, 코드 경로, boundaries의 unpublished/ownership 목록, 예제 source 경로가 학습 대신 제작 workflow를 노출 | 핵심 질문 진입 방해 | 학습 순서·관련 학습 링크로 바꾸고 코드 위치 UI 제거 |
| FACT-CB-002 | BLOCK → ADDRESSED → PASS | 무한 반복·중도 kill Promise가 "영원히 resolve/reject되지 않는다"고 유한 probe로 확정하고 타임아웃·onInterrupt 처방까지 제시 | 검증 불가능한 부정 사실을 API 보장처럼 학습 | 해당 단정과 처방을 제거하고 실제로 재현한 resolve 값·완료 후 재호출만 유지 |
| SYNC-CB-001 | BLOCK → ADDRESSED → PASS | lab 표시 코드는 모든 setter/getter/clear를 고정 출력해 마지막 버튼의 실제 호출과 달랐고 `myFunction`도 runtime 식별자가 아니었음 | 조작과 코드의 인과관계 학습 방해 | named callback과 `lastAction`을 runtime이 소유하고 TSX가 실제 마지막 호출을 직렬화 |
| A11Y-CB-002 | BLOCK → ADDRESSED → 정적 PASS | 네 관찰값 각각의 `output`과 별도 `role=status`가 한 조작을 여러 live region에 중복 알림 | screen reader 과다 안내 | 관찰값을 일반 `dd`로 바꾸고 상태 문장만 live region으로 유지 |
| CROSS-CB-001 | BLOCK → ADDRESSED → PASS | 재생·정지·재시작 링크가 존재 목적과 다른 `/fundamentals/tween-playhead`를 가리킴 | 관련 학습 이동 오류 | `/fundamentals/tween-playback-controls`로 수정 |

### verificationEvidence

- audit target — route `/fundamentals/tween-callbacks-promise`, commit `07c8558`, 대조일 2026-08-13.
- 공식 원문 대조 — `https://gsap.com/docs/v3/GSAP/Tween/eventCallback()`, `https://gsap.com/docs/v3/GSAP/Tween/then()` 직접 조회.
- runtime probe — GSAP 3.15.0에서 `vars` 변경, getter/setter/clear, handler 없는 `then()`, `await tween`, 완료 후 `then()` 재호출 확인.
- 정적 검증 — 공식 item/section count, runtime/display data flow, 주석, 내부 제작 용어와 잘못된 관련 링크 재검색.
- TypeScript — `npx tsc --noEmit` exit 0.
- 메인 통합 — 2026-08-13 `npm run build` exit 0, `npm run build-storybook` exit 0; 브라우저는 `NOT VERIFIED`.

### releaseDecision

`NOT VERIFIED` — 현재 정적 BLOCK은 모두 수정했고 메인 통합 build·Storybook도 통과했지만 브라우저 실조작은 `NOT VERIFIED`다.

### browserReviewClosure

- status: `NOT VERIFIED`
- requiredMatrix: 초기 렌더와 console, 네 버튼 순차·반복 조작, 빠른 재생 반복, route 이탈·복귀, 키보드 focus, reduced motion, 320px·390px overflow.
- evidenceBoundary: 전역 build·Storybook은 메인 통합에서 통과했고, 브라우저 조작은 아직 실행하지 않았다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
