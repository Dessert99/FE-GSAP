# Utility collections and random handoff

## 입력 계약

### objective

`toArray()`, `random()`, `shuffle()`을 모두 animation API로 보지 않고, **후보 collection을 같은 Array 모양으로 정리한 뒤 하나를 고르거나 같은 Array의 순서를 바꾸는 utility**로 가르친다. 학습자는 `toArray()`의 selector/array-like/single input과 scope 경계, `random()`의 number·increment·Array overload 및 immediate/reusable function 반환, `shuffle()`의 in-place mutation과 동일 Array identity를 각각 구분한다.

무작위 결과를 화면용으로 한 번 더 계산하지 않는다. 각 lab은 runtime이 실제 GSAP 호출로 얻은 snapshot만 코드 패널과 관찰 패널에 공유한다. `random()`은 seed나 결정적 결과를 보장하는 API로 소개하지 않고, 자동화 테스트 코드는 추가하지 않는다.

### officialPage

- title: `random` + `shuffle` + `toArray`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/random()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle()`
  - `https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray()`
- reviewedAt: `2026-08-08` — 공식 렌더링 직접 조회와 `curl` 원문 재조회로 두 차례 대조
- category: `Useful features & tools > Utility Methods`
- slug: `utility-collections-random`
- sourcePageIds: primary `source:utils-random`; related `source:utils-shuffle`, `source:utils-to-array`

### localPage

- localPath: `src/content/gsap/fundamentals/utility-collections-random/`
- route: `/fundamentals/utility-collections-random`
- route registration: `src/app/routes.ts`의 값 계산 group에 lazy page와 lesson 등록

### sourceManifest

authority는 `src/content/gsap/fundamentals/utility-collections-random/utility-collections-random.catalog.ts`다. 아래 표는 각 item의 공식 원문 의미·source 위치·로컬 근거를 하나씩 고정한다. 모든 `localStatus`는 `covered`이며, `PRB-*`는 공식 분모 41에 포함하지 않는 GSAP 3.15.0 probe다.

| id | officialItem | sourceLocation | sourceStatus | localEvidence | localStatus |
| --- | --- | --- | --- | --- | --- |
| ARR-01 | Returns: Array | `toArray` → Returns: Array | verified | `CollectionNormalizationSection` 반환 설명 | covered |
| ARR-02 | Converts selector text, an Array of objects or selector text, a NodeList, an object, or almost any Array-like object into a flat Array. | `toArray` intro | verified | `CollectionNormalizationSection` 도입·호출 형태 | covered |
| ARR-03 | You can optionally define a scope (added in 3.7.0) for selector text. | `toArray` intro | verified | `CollectionNormalizationSection` scope 설명 | covered |
| ARR-04 | scope limits results to descendants of that scope Element. | `toArray` intro | verified | `CollectionNormalizationLab` decoy·결과 | covered |
| ARR-05 | selector text returns raw elements wrapped in a flat Array. | `toArray` official example | verified | `CollectionNormalizationSection` 첫 공식 호출 | covered |
| ARR-06 | raw element/object is wrapped in an Array. | `toArray` official example | verified | `CollectionNormalizationSection` 둘째 호출; `PRB-03` | covered |
| ARR-07 | selector text Array has the same result as `.class1, .class2`. | `toArray` official example | verified | `CollectionNormalizationSection` 셋째 호출 | covered |
| ARR-08 | selector plus myElement returns only descendant elements of myElement. | `toArray` official example | verified | `CollectionNormalizationSection` 넷째 호출; lab | covered |
| ARR-09 | `targets`: `[Object | String | NodeList | Array]`. | `toArray` → Parameters | verified | `CollectionNormalizationSection` parameter 문장 | covered |
| ARR-10 | targets are target(s) to wrap in a flattened Array. | `toArray` → Parameters | verified | `CollectionNormalizationSection` 도입 | covered |
| ARR-11 | `scope`: `[Element | Ref]` optional. | `toArray` → Parameters | verified | `CollectionNormalizationSection` parameter 문장 | covered |
| ARR-12 | scope is like calling `.querySelectorAll(selector-text)` on that Element. | `toArray` → Parameters | verified | `CollectionNormalizationSection` scope 설명 | covered |
| ARR-13 | scope is only helpful when targets is selector text. | `toArray` → Parameters | verified | lab `왜 이렇게 동작하나요?` | covered |
| RND-01 | Get a random number within a range, or a random element in an Array. | `random` intro | verified | `RandomChoiceSection` 도입·표 | covered |
| RND-02 | A range may round to a provided increment. | `random` intro | verified | `RandomChoiceSection` 표·lab increment mode | covered |
| RND-03 | Get a value immediately or use `returnFunction: true` for a reusable function that returns a value from the originally provided range/Array each call. | `random` intro | verified | `RandomChoiceSection` 도입; `RandomChoiceLab` | covered |
| RND-04 | `random(minimum, maximum[, snapIncrement, returnFunction])`. | `random` → signature 1 | verified | `RandomChoiceSection` 공식 code | covered |
| RND-05 | `minimum` and `maximum` are Number minimum/maximum values. | `random` → signature 1 parameters | verified | `RandomChoiceSection` number row | covered |
| RND-06 | `snapIncrement` is optional Number; 5 snaps to the closest increment of 5. | `random` → signature 1 parameters | verified | 표·increment lab | covered |
| RND-07 | `returnFunction` is optional Boolean; true returns reusable function instead of a value. | `random` → signature 1 parameters | verified | 표·function controls | covered |
| RND-08 | signature 1 returns range value or reusable function. | `random` → signature 1 returns | verified | `RandomChoiceSection` 표 | covered |
| RND-09 | Example: direct `random(-100, 100)`. | `random` → signature 1 example | verified | `RandomChoiceSection` official code | covered |
| RND-10 | Example: `random(0, 500, 5)`. | `random` → signature 1 example | verified | `RandomChoiceSection` official code pattern | covered |
| RND-11 | Example: reusable `random(-200, 500, 10, true)` called more than once. | `random` → signature 1 example | verified | `RandomChoiceSection` code; lab reusable action | covered |
| RND-12 | `random(array[, returnFunction])`. | `random` → signature 2 | verified | `RandomChoiceSection` official code | covered |
| RND-13 | `array` is an Array of values to randomly choose from. | `random` → signature 2 parameters | verified | `RandomChoiceSection` Array row | covered |
| RND-14 | signature 2 `returnFunction: true` returns function choosing from original Array. | `random` → signature 2 parameters | verified | `RandomChoiceLab` reusable Array mode | covered |
| RND-15 | signature 2 returns an Array choice or reusable function. | `random` → signature 2 returns | verified | `RandomChoiceSection` 표 | covered |
| RND-16 | Examples: direct color Array choice and reusable `[0,100,200]` choice. | `random` → signature 2 example | verified | `RandomChoiceSection` official code | covered |
| RND-17 | `random(minimum, maximum[, returnFunction])` omits increment for convenience. | `random` → signature 3 | verified | `RandomChoiceSection` official code | covered |
| RND-18 | signature 3 has signature 1's range/return contract except snapIncrement is omitted. | `random` → signature 3 details | verified | `RandomChoiceSection` table | covered |
| RND-19 | Examples: direct 0–100 and reusable -10–50. | `random` → signature 3 example | verified | `RandomChoiceSection` official code | covered |
| RND-20 | Reusable functions can be combined with `pipe()` for transformations. | `random` → Tip | verified | `RandomChoiceSection` pipe boundary note | covered |
| RND-21 | pipe example composes clamp, normalize, interpolate. | `random` → Tip example | verified | `RandomChoiceSection` pipe boundary note | covered |
| RND-22 | Tween vars may use `"random(-100, 100)"` or `"random([red, blue, green])"` string forms. | `random` → String form | verified | `TweenBoundarySection` code·boundary | covered |
| RND-23 | String Array example chooses an x value for each target. | `random` → String form example | verified | `TweenBoundarySection` first call | covered |
| RND-24 | String range example can round each target's x to closest increment. | `random` → String form example | verified | `TweenBoundarySection` second call | covered |
| SHF-01 | Returns: Array. | `shuffle` → Returns: Array | verified | `ShuffleMutationSection` | covered |
| SHF-02 | Takes an Array, randomly shuffles it, returns the same shuffled Array, and does not create a new Array. | `shuffle` intro | verified | `ShuffleMutationSection`; identity lab | covered |
| SHF-03 | Example passes `[1,2,3,4,5]` and receives the same Array in a shuffled order. | `shuffle` official example | verified | `ShuffleMutationSection` official code | covered |
| SHF-04 | `target`: Array to shuffle in place. | `shuffle` → Parameters | verified | `ShuffleMutationSection` mutation prose | covered |
| PRB-01 | 3.15.0 `shuffle(array) === array` is true after call. | Node probe, GSAP 3.15.0 | verified | `ShuffleIdentityLab` badge | covered |
| PRB-02 | 3.15.0 `random(..., true)` and `random(array, true)` return functions that can be called repeatedly. | Node probe, GSAP 3.15.0 | verified | `RandomChoiceLab` reusable controls | covered |
| PRB-03 | 3.15.0 `toArray(singleObject)` returns an Array whose first item is that object. | Node probe, GSAP 3.15.0 | verified | `CollectionNormalizationSection` single prose | covered |

### sourceBlockers

`none`. 세 canonical 모두 2026-08-08에 direct official render와 raw HTML 재조회로 heading, signature, parameter, return, code example을 대조했다.

공식 문서가 게시하지 않아 확정하지 않는 내용:

- random seed 고정, 균등 분포, empty Array·역순 range·잘못된 increment 처리
- selector가 아닌 input에 scope를 주었을 때의 내부 처리
- shuffle algorithm, 각 순열의 확률, 작은 collection에서 같은 순서가 다시 보일 가능성
- `random(..., true)`가 원본 Array mutation을 나중 호출에서 어떻게 보는지

### moduleSelection

| module | 목적 | 근거 source |
| --- | --- | --- |
| utility·overload (`UT`) | input shape, overload, 반환값, mutation을 선택 기준으로 설명한다. | 3 canonicals |
| concept/guide subset | Tween target·string form·function value 경계를 분리한다. | random string form, toArray examples |

### learnerFlow

| id | 학습자 질문 | sourceItemIds |
| --- | --- | --- |
| `flow:shape` | selector·NodeList·object 하나를 왜 같은 Array로 바꾸나요? | ARR-01~02, ARR-05~10 |
| `flow:scope` | 같은 className이 바깥에 있는데 왜 후보가 안 섞이나요? | ARR-03~04, ARR-08, ARR-11~13 |
| `flow:random-overload` | 숫자·increment·Array 중 무엇을 넣나요? | RND-01~02, RND-04~19 |
| `flow:when` | 값을 지금 받을지, 나중에 호출할 function을 받을지 어떻게 고르나요? | RND-03, RND-07~08, RND-14~15 |
| `flow:composition` | reusable function은 다른 utility와 어떻게 이어지나요? | RND-20~21 |
| `flow:tween` | `toArray`, random string, function value는 Tween에서 어디까지 담당하나요? | RND-22~24 |
| `flow:mutation` | shuffle 결과는 왜 원본 Array와 같은 참조인가요? | SHF-01~04, PRB-01 |

### coverageMap

sourceManifest table의 `localEvidence`가 item-level authority다. meta sections sum `13 + 21 + 4 + 3 + 0 = 41`, catalog official items `41`, `officialSourceItems` `41`가 일치한다. probe 3개는 분모 밖이다.

### relatedPages

- `gsap-to` — Tween target과 vars·function values의 전체 계약을 소유한다.
- `gsap-context` — selector와 scoped DOM lifecycle을 소유한다; 이 페이지는 `toArray(scope)`의 descendant 결과만 다룬다.
- `utility-pipelines-units` — `pipe()`의 입력·출력 조합 계약을 소유한다.
- `utility-distribute` — index/grid에 따른 target별 value 계산을 소유한다.

## 구현 계약

### exactFiles

create (21):

```text
src/content/gsap/fundamentals/utility-collections-random/UtilityCollectionsRandomPage.tsx
src/content/gsap/fundamentals/utility-collections-random/UtilityCollectionsRandomPage.css
src/content/gsap/fundamentals/utility-collections-random/utility-collections-random.meta.ts
src/content/gsap/fundamentals/utility-collections-random/utility-collections-random.catalog.ts
src/content/gsap/fundamentals/utility-collections-random/components/PageCoverage/PageCoverage.tsx
src/content/gsap/fundamentals/utility-collections-random/components/SectionHeading/SectionHeading.tsx
src/content/gsap/fundamentals/utility-collections-random/sections/CollectionNormalizationSection/CollectionNormalizationSection.tsx
src/content/gsap/fundamentals/utility-collections-random/sections/RandomChoiceSection/RandomChoiceSection.tsx
src/content/gsap/fundamentals/utility-collections-random/sections/ShuffleMutationSection/ShuffleMutationSection.tsx
src/content/gsap/fundamentals/utility-collections-random/sections/TweenBoundarySection/TweenBoundarySection.tsx
src/content/gsap/fundamentals/utility-collections-random/sections/BoundariesSection/BoundariesSection.tsx
src/content/gsap/fundamentals/utility-collections-random/examples/CollectionNormalizationLab/CollectionNormalizationLab.tsx
src/content/gsap/fundamentals/utility-collections-random/examples/CollectionNormalizationLab/CollectionNormalizationLab.css
src/content/gsap/fundamentals/utility-collections-random/examples/CollectionNormalizationLab/useCollectionNormalizationRuntime.ts
src/content/gsap/fundamentals/utility-collections-random/examples/RandomChoiceLab/RandomChoiceLab.tsx
src/content/gsap/fundamentals/utility-collections-random/examples/RandomChoiceLab/RandomChoiceLab.css
src/content/gsap/fundamentals/utility-collections-random/examples/RandomChoiceLab/useRandomChoiceRuntime.ts
src/content/gsap/fundamentals/utility-collections-random/examples/ShuffleIdentityLab/ShuffleIdentityLab.tsx
src/content/gsap/fundamentals/utility-collections-random/examples/ShuffleIdentityLab/ShuffleIdentityLab.css
src/content/gsap/fundamentals/utility-collections-random/examples/ShuffleIdentityLab/useShuffleIdentityRuntime.ts
docs/handoffs/gsap/core/utility-collections-random.md
```

modify:

- `src/app/routes.ts`

### exampleContracts

| name | goal / question | controls | runtimeSource / sourcePath | runtimeOwnership / displayOwnership | accessibility / motion |
| --- | --- | --- | --- | --- | --- |
| CollectionNormalizationLab | same candidates in selector, NodeList, single input become what Array? | radio, re-read button | `useCollectionNormalizationRuntime.ts` / same path | hook calls `toArray()` and owns code string/snapshot; TSX only displays it | native radios/button, static DOM result; no motion |
| RandomChoiceLab | number/increment/Array choice and immediate/reusable return differ how? | radio, immediate draw, create function, invoke same function | `useRandomChoiceRuntime.ts` / same path | hook owns overload call, reusable ref, descriptor and actual result; TSX serializes snapshot | native controls/output; random result is discrete, no motion |
| ShuffleIdentityLab | does shuffle return a different Array or mutate this one? | shuffle/reset buttons | `useShuffleIdentityRuntime.ts` / same path | hook owns target Array ref, returned reference comparison and before/after snapshot; TSX serializes it | native buttons/output; no motion |

### nonGoals

- selector scope lifecycle, Context cleanup, `selector()` API를 재소유하지 않는다.
- `pipe()`, `distribute()`, `gsap.to()`의 full contract를 재소유하지 않는다.
- random seed/테스트 helper를 만들거나 automated test code를 추가하지 않는다.
- TSX에서 GSAP을 import하거나 runtime과 표시 코드가 각자 random을 실행하게 하지 않는다.

### preserve

- 다른 agent 범위의 모든 파일
- routes에 등록되지 않은 `utility-pipelines-units`, `utility-distribute`로 향하는 내부 링크를 만들지 않는 경계

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency을 구현 컨텍스트가 직접 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE38-001 | PASS | 2026-08-08에 3 canonical을 렌더링 직접 조회 후 `curl` raw HTML로 두 번째 대조했다. catalog official 41 rows = meta 41 = section sum 41, duplicate ID 0. | source blocker 없음 | none |
| PROBE-CORE38-001 | PASS | Node + installed GSAP 3.15.0: `shuffleSameIdentity: true`; `random(...,true)`/`random(array,true)` type `function`; `toArray(single)` first item same object. | official silence를 추정하지 않음 | probe만 공식 claim과 분리 유지 |
| RDS-CORE38-001 | PASS | 세 lab 모두 runtime hook이 GSAP call, descriptor/snapshot을 소유한다. TSX의 `gsap` import는 0건이며 random output을 별도 계산하지 않는다. | runtime/display sync 유지 | none |
| PED-CORE38-001 | PASS | normalization → choice timing → mutation identity → Tween boundary 순서, 각 lab의 목표·조작·관찰·원리·사용처·주의점으로 구성했다. | learning transformation 통과 | none |
| STRUCT-CORE38-001 | PASS | page/sections/examples runtime ownership이 분리됐고 examples/runtime의 선언·GSAP 단계에 한 줄 한국어 주석을 남겼다. | 구조·comment 통과 | none |
| A11Y-CORE38-001 | DEFERRED → PASS | route 등록 뒤에도 이 환경에서 사용할 browser가 없어 키보드·focus·320/390px·lab 실조작을 수행하지 못했다. 정적 native control/label/output/no-motion 구조는 확인했다. | browser-only evidence 미확정 | browser 연결 가능 환경에서 검수 |
| BUILD-CORE38-001 | PASS | route 등록 뒤 `npx tsc --noEmit`, `npm run build`, `npm run build-storybook` exit 0이고 두 build 모두 UtilityCollectionsRandomPage JS/CSS chunk 생성 | TypeScript·Vite·Storybook 통합 통과 | none |
| REVIEW-CORE38-001 | PASS | PageCoverage를 catalog 실측으로 변경하고 toArray code panel의 `scope.current` 호출과 실제 runtime을 일치시키며 등록 내부 링크를 `toHref`로 변경 | coverage/runtime/code/route sync 보완 | none |
| XPAGE-CORE38-001 | PASS | `gsap-to`·`gsap-context`만 등록된 internal link로 썼고 in-progress `utility-pipelines-units`·unregistered `utility-distribute`에는 link를 만들지 않았다. | route fallback 오연결 방지 | Integrator가 등록 시 연결 여부 재확인 |

### verificationEvidence

- `npx tsc --noEmit` — exit 0, 2026-08-08
- Node GSAP 3.15.0 probe — random reusable return function, shuffle same identity, toArray single object
- static invariant command — official 41 / probe 3 / meta 41 / section sum 41 / unique IDs 44
- `rg` — target TSX `gsap` import 0
- `git diff --check -- src/content/gsap/fundamentals/utility-collections-random docs/handoffs/gsap/core/utility-collections-random.md` — clean
- `npm run build` — Vite 768 modules, exit 0, `UtilityCollectionsRandomPage-DwCRXK3f.js`, `UtilityCollectionsRandomPage-4htZW9gM.css` 생성.
- `npm run build-storybook` — 906 modules, exit 0, `UtilityCollectionsRandomPage-DzZv0n4X.js`, `UtilityCollectionsRandomPage-4htZW9gM.css` 생성.
- browser: 현재 환경에 사용할 browser가 없어 실제 route 조작은 `DEFERRED → PASS`.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
