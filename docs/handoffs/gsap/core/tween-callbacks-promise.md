# Tween callbacks and promise handoff

## 입력 계약

### objective

이미 만들어진 Tween의 콜백을 나중에 읽고 바꾸고 지우는 방법(`eventCallback()`)과, 완료 시점을 Promise로 기다리는 방법(`then()`)을 가르친다. 개별 콜백이 언제 불리는지는 `gsap-to`가 소유하므로, 이 페이지는 **생성 이후의 조작**에만 집중한다.

### officialPage

- title: `Tween.eventCallback()` + `Tween.then()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/Tween/eventCallback()`
  - `https://gsap.com/docs/v3/GSAP/Tween/then()`
- reviewedAt: `2026-08-04`
- category: `Fundamentals > Tween`
- slug: `tween-callbacks-promise`
- sourcePageIds: primary `source:tween-event-callback`; related `source:tween-then`

### localPage

- localPath: `src/content/gsap/fundamentals/tween-callbacks-promise/`
- route: `/fundamentals/tween-callbacks-promise`

### sourceManifest

`tween-callbacks-promise.catalog.ts`의 `tweenCallbacksPromiseSourceItems` 배열이 authority다. 공식 item 16개와 실행 확인 항목 3개(`EC-P1`, `TH-P1`, `TH-P2`)를 `origin`으로 구분한다.

| 섹션 | 공식 item |
| --- | ---: |
| `after-creation` | 3 |
| `event-callback-form` | 4 |
| `event-callback-args` | 4 |
| `then-promise` | 5 |
| `boundaries` | 0 |
| 합계 | 16 |

공식 signature:

- `eventCallback( type:String, callback:Function, params:Array ) : [Function | self]`
- `then( callback:Function ) : Promise`

### sourceBlockers

`none`. 16개 공식 item 전부 canonical 원문으로 확인했다.

공식 페이지가 게시하지 않은 것: getter가 미설정 시 무엇을 돌려주는지, `then()`의 Promise가 무엇으로 resolve되는지, 완료되지 않는 Tween의 Promise가 어떻게 되는지, `eventCallback()`이 받는 type의 전체 목록(예시만 나열).

### moduleSelection

| module | 목적 |
| --- | --- |
| callable method | 두 메서드의 signature·인자·반환값 |
| concept/guide | 생성 시점 vs 생성 이후라는 경계, 콜백 대신 Promise를 쓰는 선택 기준 |

### learnerFlow

vars의 한계 → 같은 메서드가 읽기·쓰기·지우기를 겸하는 형태 → 세 인자가 정하는 것 → 완료를 Promise로 기다리기 → 경계.

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며 `PageCoverage`가 같은 배열을 센다.

### relatedPages

- `gsap-to` — 개별 콜백이 언제 불리는지와 `vars` 전체 명세를 소유한다.
- `tween-playhead` — 재생·정지·seek을 소유한다.
- `tween-configuration` — 설정의 출처와 적용 범위를 소유한다.

## 구현 계약

### exactFiles

create: `TweenCallbacksPromisePage.tsx` / `.css`, `tween-callbacks-promise.meta.ts`, `tween-callbacks-promise.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 5개(`AfterCreationSection`, `EventCallbackFormSection`, `EventCallbackArgsSection`, `ThenPromiseSection`, `BoundariesSection`), `examples/EventCallbackLab`

modify: `src/app/routes.ts`

### exampleContracts

- `EventCallbackLab` — runtimeSource `useEventCallbackRuntime.ts`. 하나의 paused Tween에 `onComplete`를 걸고 덮어쓰고 지우면서 **getter 반환값**과 **실제 호출 횟수**를 함께 관찰한다. 애니메이션 자체가 아니라 콜백 등록 상태가 관찰 대상이라 `Runtime` 접미사를 쓴다.
- TSX에서 `gsap`을 import하지 않는다. getter 결과는 추측하지 않고 매 조작 후 실제로 다시 호출해 읽는다.

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

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 구현 컨텍스트가 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CB-001 | PASS | 2026-08-04 두 canonical 직접 조회. heading 순서, signature, Parameters의 타입·기본값, Returns 문장, 코드 예제를 원문 인용으로 확인 | 구현 범위 고정 | none |
| OC-CB-001 | BLOCK → ADDRESSED → PASS | 공식 `eventCallback()` 문서의 "You can only have one callback associated with each event type… So setting a new value will overwrite the old one." 주장이 catalog에 없었다 / `EC-11`을 신설해 `event-callback-form` 섹션에 연결하고 `EventCallbackFormSection.tsx`에 경고 블록을 추가했다. meta의 섹션 수를 3→4, 분모를 15→16으로 갱신했다 | 공식 기술 item 누락 | none |
| IMPL-CB-001 | BLOCK → ADDRESSED → PASS | 페이지 TSX가 섹션 4개(`EventCallbackFormSection`, `EventCallbackArgsSection`, `ThenPromiseSection`, `BoundariesSection`)를 import하는데 파일이 없어 타입 검사가 실패했다 / 네 섹션을 작성해 해소했다 | 페이지가 빌드되지 않는 상태 | none |
| IMPL-CB-002 | ADDRESSED | 실행 예제가 하나도 없어 다른 페이지 대비 관찰 경험이 비었다 / `EventCallbackLab`을 추가해 getter 반환·덮어쓰기·삭제·실제 호출 횟수를 관찰하게 했다 | 학습 경험 결손 | none |
| PROBE-CB-001 | PASS | 미설정 type의 getter는 `undefined`. `vars`에 준 콜백도 같은 getter로 `function`으로 읽힘. `null`로 지운 뒤 다시 `undefined`. setter는 instance 자신을 반환(`=== tween` true) | `EC-P1` 근거 | none |
| PROBE-CB-002 | PASS | 같은 type에 두 함수를 차례로 걸면 getter가 나중 함수를 돌려줌 — 공식의 덮어쓰기 주장 실행 확인 | `EC-11` 뒷받침 | none |
| PROBE-CB-003 | PASS | handler 없이 `then()`을 부르면 Promise가 Tween 자신으로 resolve됨. 이미 완료된 Tween에 `then()`을 다시 부르면 즉시 resolve됨 | `TH-P1`·`TH-P2` 근거 | none |
| OC-CB-002 | PASS | meta 섹션 합계 16 = catalog 공식 행 16, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-CB-001 | PASS | `npm run build` exit 0, `npm run build-storybook` exit 0 (2026-08-04) | build/integration 통과 | none |
| A11Y-CB-001 | DEFERRED → PASS | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, lab 버튼 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

`TH-P2`의 "무한 반복·중도 kill된 Tween의 Promise는 resolve도 reject도 되지 않는다"는 부정 사실이라 유한 시간 실행으로 증명할 수 없다. 관측한 것은 정상 완료와 완료 후 재호출뿐이며, 나머지는 그 성질상 관측되지 않았다는 사실로만 적었다.

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, 두 canonical 직접 조회.
- runtime probe — `node`로 `gsap` 실행, 위 PROBE-CB-001~003.
- build — `npm run build`, `npm run build-storybook`.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
