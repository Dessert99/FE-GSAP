# Tween configuration handoff

## 입력 계약

### objective

전역 engine 설정(`gsap.config()`)과 모든 tween이 상속하는 기본값(`gsap.defaults()`), 그리고 만들어진 tween에 남는 설정 기록(`Tween.vars`)을 "설정이 어디서 와서 어느 범위까지 적용되는가"라는 하나의 질문으로 재구성한다.

### officialPage

- title: `gsap.config()` + `gsap.defaults()` + `Tween.vars`
- canonicalUrl:
  - `https://gsap.com/docs/v3/GSAP/gsap.config()/`
  - `https://gsap.com/docs/v3/GSAP/gsap.defaults()/`
  - `https://gsap.com/docs/v3/GSAP/Tween/vars/`
- reviewedAt: `2026-08-13`
- category: `Fundamentals > GSAP`, `Fundamentals > Tween`
- slug: `tween-configuration`
- sourcePageIds: primary `source:gsap-config`; related `source:gsap-defaults`, `source:tween-vars`

### localPage

- localPath: `src/content/gsap/fundamentals/tween-configuration/`
- route: `/fundamentals/tween-configuration`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| CFG-01 | `gsap.config()`는 tween과 무관한 전역 engine 설정을 다룬다. | `source:gsap-config` 본문 | verified |
| CFG-02 | 바꾸려는 설정만 지정하면 되고 생략한 항목은 영향받지 않는다. | `source:gsap-config` note | verified |
| CFG-03 | `autoSleep`은 number이고 기본값 120이며, GSAP이 power-down할지 확인하는 frame 간격이다. | `source:gsap-config` 표 | verified |
| CFG-04 | `force3D`는 `"auto"`(기본)·`true`·`false`를 받아 3D transform 사용 방식을 정한다. | `source:gsap-config` 표 | verified |
| CFG-05 | `"auto"`는 animation 동안 3D를 적용하고 끝나면 2D로 되돌린다. | `source:gsap-config` 본문 | verified |
| CFG-06 | `true`는 3D transform을 유지하고 `false`는 이 동작을 끈다. | `source:gsap-config` 본문 | verified |
| CFG-07 | `nullTargetWarn`은 boolean이고 기본 `true`이며, 존재하지 않는 대상을 tween하면 경고한다. | `source:gsap-config` 표 | verified |
| CFG-08 | `nullTargetWarn: false`로 그 경고를 끈다. | `source:gsap-config` 본문 | verified |
| CFG-09 | `trialWarn`은 공식 예제에 등장하지만 별도 설명이 게시돼 있지 않다. | `source:gsap-config` 예제 | verified |
| CFG-10 | `units`는 object이며 단위 없는 값에 쓸 기본 CSS 단위를 정한다. | `source:gsap-config` 표 | verified |
| CFG-11 | `units` 기본은 대부분 `"px"`, 회전 계열은 `"deg"`이고 지정한 property만 바뀐다. | `source:gsap-config` 본문 | verified |
| CFG-12 | 공식 예제는 `autoSleep` 60, `force3D` false, `nullTargetWarn` false, `trialWarn` false, `units` `{left:"%", top:"%", rotation:"rad"}`를 함께 보여준다. | `source:gsap-config` 예제 | verified |
| CFG-13 | 인자 없이 부르면 현재 config 객체를 돌려준다. | `gsap-core.js:4197`, Node runtime probe | verified |
| DEF-01 | `gsap.defaults()`는 모든 tween이 상속할 property를 정한다. | `source:gsap-defaults` 본문 | verified |
| DEF-02 | `inherit: false`인 tween은 상속하지 않는다. | `source:gsap-defaults` 본문 | verified |
| DEF-03 | 해당 tween이 값을 지정하면 그 값이 default를 이긴다. | `source:gsap-defaults` 본문 | verified |
| DEF-04 | `units`·`autoSleep`·`force3D`처럼 tween과 무관한 설정은 `gsap.config()`를 쓴다. | `source:gsap-defaults` 본문 | verified |
| DEF-05 | 공식 예제는 `ease: "power2.in"`과 `duration: 1`을 defaults로 지정한다. | `source:gsap-defaults` 예제 | verified |
| DEF-06 | 인자 없이 부르면 현재 defaults를 돌려주며, 그 객체는 내부 defaults와 **같은 참조**다. | `gsap-core.js:4193-4195`, Node runtime probe | verified |
| DEF-07 | 일부 key만 지정하면 merge된다. 지정하지 않은 key는 그대로 남는다. | `gsap-core.js` `_mergeDeep`, Node runtime probe | verified |
| DEF-08 | 초기 defaults key는 `duration`, `overwrite`, `delay`, `ease` 네 개다. | `gsap-core.js:23`, Node runtime probe | verified |
| DEF-09 | 설정은 다시 덮어쓸 때까지 유지되고 자동으로 복원되지 않는다. | `gsap-core.js` module-scope `_defaults`, Node runtime probe | verified |
| DEF-10 | `inherit: false`는 built-in duration 기본값까지 끊어 duration이 `0`이 된다. | Node runtime probe | verified |
| DEF-11 | 상속은 tween을 만드는 순간에 확정된다. 만든 뒤 defaults를 되돌려도 그 tween은 상속한 값을 유지한다. | `gsap-core.js` `_inheritDefaults`, Node runtime probe | verified |
| VARS-01 | `Tween.vars`는 생성자에 넘긴 configuration 객체이고 타입은 Object다. | `source:tween-vars` 본문 | verified |
| VARS-02 | `vars.duration`을 직접 바꿔도 tween의 재생 시간은 자동으로 갱신되지 않는다. | GSAP 3.15.0 Node runtime probe | verified |
| VARS-03 | animate할 property와 special property를 함께 담는다. | `source:tween-vars` 본문 | verified |
| VARS-04 | vars 문서는 special property 목록을 나열한다. 각 property의 전체 명세는 `gsap.to()` owner가 소유한다. | `source:tween-vars` 목록 | verified |

28개 항목 모두 `verified`다. 공식 세 페이지 본문을 2026-08-13에 다시 확인하고 GSAP 3.15.0 설치본(`node_modules/gsap/gsap-core.js`), Node runtime probe를 함께 대조했다.

### sourceBlockers

`none` — 이전 컨텍스트가 남긴 두 blocker를 해소했다.

- `DEF-SRC-001`(defaults getter/반환값 미게시) → `gsap-core.js:4193-4195`의 `_mergeDeep(_defaults, value || {})` 반환과 runtime probe로 확인했다(`DEF-06`).
- `DEF-SRC-002`(defaults 변경 수명 미게시) → `_defaults`가 module scope 객체이고 merge로만 갱신되며 자동 복원이 없음을 source와 probe로 확인했다(`DEF-09`).

두 사실은 **공식 문서가 게시한 주장이 아니라 설치본 구현과 실행으로 확인한 사실**이므로 `sourceLocation`에 그렇게 표기하고, 페이지에서도 공식 문서에 없는 내용임을 밝힌다.

`trialWarn`은 공식 예제에만 등장하고 설명이 없다(`CFG-09`). 역할을 추측하지 않고 "예제에 등장하며 공식 설명이 없다"는 사실만 기록한다.

### moduleSelection

- callable method + property catalog + 개념·가이드

### learnerFlow

1. `#two-scopes`: engine 설정과 tween 기본값은 서로 다른 두 저장소라는 멘탈 모델
2. `#config-catalog`: `gsap.config()` 속성 전체 명세와 getter
3. `#defaults-inheritance`: defaults가 tween에 실리는 순간과 merge 동작(실행 예제)
4. `#precedence`: 명시값 > defaults, `inherit: false`, 전역 변경의 수명
5. `#vars-record`: 만들어진 tween의 `vars`에 무엇이 남는가
6. `#boundaries`: Timeline defaults와 special property 상세를 이어서 배울 위치

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| CFG-01 | `TwoScopesSection.tsx` 두 저장소 비교 | covered |
| CFG-02 | `TwoScopesSection.tsx` 부분 지정 설명 | covered |
| CFG-03 | `ConfigCatalogSection.tsx` `autoSleep` 행 | covered |
| CFG-04 | `ConfigCatalogSection.tsx` `force3D` 행 | covered |
| CFG-05 | `ConfigCatalogSection.tsx` `force3D` 값 설명 | covered |
| CFG-06 | `ConfigCatalogSection.tsx` `force3D` 값 설명 | covered |
| CFG-07 | `ConfigCatalogSection.tsx` `nullTargetWarn` 행 | covered |
| CFG-08 | `ConfigCatalogSection.tsx` `nullTargetWarn` 값 설명 | covered |
| CFG-09 | `ConfigCatalogSection.tsx` `trialWarn` 행과 미게시 표시 | covered |
| CFG-10 | `ConfigCatalogSection.tsx` `units` 행 | covered |
| CFG-11 | `ConfigCatalogSection.tsx` `units` 기본 단위 설명 | covered |
| CFG-12 | `ConfigCatalogSection.tsx` 공식 예제 코드 | covered |
| CFG-13 | `ConfigCatalogSection.tsx` getter 코드와 실제 반환 설명 | covered |
| DEF-01 | `TwoScopesSection.tsx` defaults 정의 | covered |
| DEF-02 | `PrecedenceSection.tsx` `inherit: false` 설명 | covered |
| DEF-03 | `PrecedenceSection.tsx` 우선순위 표 | covered |
| DEF-04 | `TwoScopesSection.tsx` 선택 기준 | covered |
| DEF-05 | `TwoScopesSection.tsx` 공식 예제 코드 | covered |
| DEF-06 | `DefaultsInheritanceExample.tsx` getter 관찰과 같은 참조 warning | covered |
| DEF-07 | `DefaultsInheritanceExample.tsx` merge 관찰 | covered |
| DEF-08 | `DefaultsInheritanceExample.tsx` 초기 네 key 표시 | covered |
| DEF-09 | `PrecedenceSection.tsx` 수명 warning | covered |
| DEF-10 | `PrecedenceSection.tsx` duration 0 경고 | covered |
| DEF-11 | `useDefaultsInheritanceAnimation.ts` 생성 직후 복원과 예제 관찰 | covered |
| VARS-01 | `VarsRecordSection.tsx` 정의 | covered |
| VARS-02 | `VarsRecordSection.tsx` 직접 쓰기와 `duration()` 메서드의 차이 | covered |
| VARS-03 | `VarsRecordSection.tsx` 두 종류 구분 | covered |
| VARS-04 | `VarsRecordSection.tsx` 목록과 `gsap.to()` 경계 링크 | covered |

### relatedPages

- `/fundamentals/gsap-to`: special property 전체 명세의 owner
- `/fundamentals/timeline-basics`: Timeline defaults와 자식 애니메이션의 상속 범위
- `/fundamentals/easing`: defaults로 자주 지정하는 ease
- `/fundamentals/gsap-core-map`: gsap 객체가 가진 설정 API의 위치

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/tween-configuration/TweenConfigurationPage.tsx`
- `src/content/gsap/fundamentals/tween-configuration/TweenConfigurationPage.css`
- `src/content/gsap/fundamentals/tween-configuration/tween-configuration.meta.ts`
- `src/content/gsap/fundamentals/tween-configuration/tween-configuration.catalog.ts`
- `src/content/gsap/fundamentals/tween-configuration/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/tween-configuration/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/TwoScopesSection/TwoScopesSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/ConfigCatalogSection/ConfigCatalogSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/DefaultsInheritanceSection/DefaultsInheritanceSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/PrecedenceSection/PrecedenceSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/VarsRecordSection/VarsRecordSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/BoundariesSection/BoundariesSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/examples/DefaultsInheritanceExample/DefaultsInheritanceExample.tsx`
- `src/content/gsap/fundamentals/tween-configuration/examples/DefaultsInheritanceExample/DefaultsInheritanceExample.css`
- `src/content/gsap/fundamentals/tween-configuration/examples/DefaultsInheritanceExample/useDefaultsInheritanceAnimation.ts`

modify:

- `src/app/routes.ts` — lazy route와 `트윈 기초` lesson 등록

2026-08-13 감사에서 수정한 파일:

- `src/content/gsap/fundamentals/tween-configuration/TweenConfigurationPage.css`
- `src/content/gsap/fundamentals/tween-configuration/tween-configuration.meta.ts`
- `src/content/gsap/fundamentals/tween-configuration/tween-configuration.catalog.ts`
- `src/content/gsap/fundamentals/tween-configuration/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/BoundariesSection/BoundariesSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/ConfigCatalogSection/ConfigCatalogSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/sections/VarsRecordSection/VarsRecordSection.tsx`
- `src/content/gsap/fundamentals/tween-configuration/examples/DefaultsInheritanceExample/DefaultsInheritanceExample.tsx`
- `docs/handoffs/gsap/core/tween-configuration.md`

### exampleContracts

- **name**: `DefaultsInheritanceExample`
- **goal**: 전역 defaults가 tween에 실리는 순간과 merge 동작을 직접 확인한다.
- **question**: "defaults를 바꾸면 그다음 tween은 무엇을 물려받고, 무엇을 물려받지 않나요?"
- **representation**: 하나의 대상이 defaults에서 온 duration·ease로 움직이고, 옆에서 defaults 객체와 실제 tween 값이 함께 표시된다.
- **controls**: duration slider, ease select, `inherit: false` checkbox, replay button (native label·input·select·output·button)
- **runtimeSource**: `useDefaultsInheritanceAnimation.ts`
- **sourcePath**: `examples/DefaultsInheritanceExample/useDefaultsInheritanceAnimation.ts`
- **runtimeOwnership**: 전역 defaults의 복사본 snapshot, 임시 설정, tween 생성, **생성 직후 즉시 복원**(`try`/`finally`), 관찰 상태(적용된 duration·ease 동일성·전역 복원 여부)를 소유한다. 전역 변경이 callback 밖으로 새어 나가지 않는 것이 이 예제의 안전 계약이다.
- **displayOwnership**: TSX가 같은 descriptor를 코드 문법으로만 직렬화한다. 의미를 다시 조립하지 않는다.
- **accessibility**: 모든 control에 native label, 관찰값은 `output`, 자동 재생 없음.
- **motion**: `useReducedMotion`이 true면 재생하지 않고 재생 헤드만 끝으로 옮겨(`pause().progress(1)`) 중간 이동을 만들지 않는다. **duration을 0으로 바꾸지 않는다** — 이 예제의 학습 내용이 "duration은 defaults에서 온다"이므로, 실행 duration을 0으로 덮으면 관찰 패널의 `appliedDuration`과 코드 패널이 학습 주장과 어긋난다.

### nonGoals

- Timeline `defaults` 상세(별도 owner), special property 34개 catalog 복제(`gsap.to()` owner), `trialWarn` 역할 추측, plugin별 config, `overwrite` 전략 상세, 전역 설정을 페이지 밖까지 바꾸는 데모

### preserve

- inventory identity와 owner, 기존 route 순서, 공유 API, 다른 페이지 CSS 클래스 이름
- 전역 `gsap.defaults()`는 예제 callback 밖에서 변경된 상태로 남지 않는다

## 검수 계약

### reviewAssignments

- 구현: Claude (이 컨텍스트)
- Official Coverage / Learning Transformation / Runtime·Display Sync / Structure·Comment / 정적 Accessibility·Motion: `codex exec -s read-only` 관점별 개별 실행
- Independent Release: 위와 별개인 `codex exec -s read-only` 실행

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CORE05-001 | PASS | 이전 blocker `DEF-SRC-001`·`DEF-SRC-002`를 `gsap-core.js`와 runtime probe로 해소 | blocker 없이 구현 가능 | 공식 미게시 사실임을 페이지에 명시 |
| BUILD-CORE05-001 | PASS | `npm run build` exit 0, 2026-08-04, `TweenConfigurationPage` JS/CSS chunk 생성 | TypeScript·Vite build 통과 | none |
| OC-FACT-001 | BLOCK → ADDRESSED → PASS | `tween.vars` 출력 예시가 넘긴 key만 보여줬으나 실제로는 상속된 `overwrite`·`delay`·`ease`가 함께 들어 있다(probe로 확인) / Coverage 2차 재검수 RESOLVED — `VarsRecordSection.tsx:5` | 표시 코드가 실행 결과와 달랐다 | none |
| OC-FACT-002 | BLOCK → ADDRESSED → PASS | defaults가 special property만 채운다고 제한했으나 `gsap.defaults({x:100})`의 `x`도 상속된다(probe로 확인) / Coverage 2차 재검수 RESOLVED — `VarsRecordSection.tsx:53` | 학습자에게 틀린 경계를 전달 | none |
| OC-FACT-003 | BLOCK → ADDRESSED → PASS | snapshot 복원은 merge라서 새로 추가한 key를 지우지 못한다(probe로 확인) / Coverage 2차 재검수 RESOLVED — `PrecedenceSection.tsx:75` | 일반 복원법으로 안내하면 전역 누수 | none |
| OC-COV-002 | BLOCK → ADDRESSED → PASS | special property 목록에서 `on*Params` 5개 누락 / Coverage 2차 재검수 RESOLVED — 배열 실측 32개 | `VARS-04` 부분 coverage | none |
| OC-MANIFEST-002 | BLOCK → ADDRESSED → PASS | `autoSleep`의 자원·배터리 목적과 `force3D` "가능한 경우" 2D 복귀 caveat 누락, 그리고 공식 근거 없는 "글자 흐림" 조언 / Coverage 2차 재검수 RESOLVED — `ConfigCatalogSection.tsx:7,19`, 무근거 조언 삭제 확인 | 공식 항목 누락과 무근거 서술 | none |
| OC-ORIGIN-002 | BLOCK → ADDRESSED → PASS | `DEF-08`·`DEF-10`·`DEF-11`이 공식 사실처럼 노출됨 / Coverage 2차 재검수 RESOLVED — DEF-08/10/11 각각에 출처 노출 확인 | implementation-origin 고지 불완전 | none |
| OC-MANIFEST-001 | BLOCK → 미수용 정당(재검수 확인) | `VARS-04`가 공식 vars의 property별 상세를 한 item으로 축약했다는 지적 | 사실이면 대량 누락 | 수용하지 않는다. `.agents/skills/creating-gsap-learning-pages/SKILL.md:105`가 "gsap.to()의 속성 카탈로그를 다른 유형에 복제하지 않는다"를, `docs/project-structure.md`가 "전용 페이지가 있는 개념은 핵심 원리와 경계를 설명하고 링크한다"를 규정한다. property별 명세의 owner는 `source:gsap-to`이며 `gsap-to.properties.ts`가 34개를 실제로 보유한다. 이 페이지는 이름 32개 전체와 owner 링크를 두는 경계 역할만 맡는다. |
| RDS-001 | BLOCK → ADDRESSED → PASS | descriptor가 selector·tween vars를 소유하지 않아 실행과 표시가 따로 조립됨 / Runtime 2차 재검수 RESOLVED — `useDefaultsInheritanceAnimation.ts:10-15,74-76` | 변경 시 코드 패널이 실행과 어긋남 | none |
| SAF-001 | BLOCK → ADDRESSED → PASS | 전역 변경과 복원 사이에서 예외가 나면 복원이 실행되지 않음 / Runtime 2차 재검수 RESOLVED — `useDefaultsInheritanceAnimation.ts:68-80` try/finally | 전역 defaults 누수 | none |
| CMT-001 | BLOCK → ADDRESSED → PASS | Hook 반환 구조 분해와 `run()`의 `tween` 선언에 한 줄 주석 없음 / Runtime 2차 재검수 RESOLVED — 두 선언 주석 확인 | AGENTS.md 7번 위반 | none |
| RDS-002 | BLOCK → ADDRESSED → PASS | SAF-001 수정으로 runtime은 try/finally인데 코드 패널은 순차 호출을 보여줌 / Runtime 3차 재검수 RESOLVED — runtime과 코드 패널이 같은 try/finally 순서 | 실행과 표시 불일치 | none |
| A11Y-003 | BLOCK → ADDRESSED → PASS | 관찰값 4개가 정적 `dd`이고 status가 복원 결과를 전달하지 않음 / A11y 재검수 RESOLVED — 관찰값 4개 output, status가 복원 결과 전달 | handoff의 "관찰값은 output" 계약 위반 | none |
| MOTION-001 | BLOCK → 계약 정정 → PASS(재검수 "정정정당") | 구현이 handoff의 "duration 0으로 실행"과 다르게 `progress(1)`을 씀 | 계약과 구현 불일치 | 구현이 아니라 **계약을 정정했다.** duration을 0으로 덮으면 "duration은 defaults에서 온다"는 이 예제의 학습 주장과 관찰 패널이 어긋난다. `exampleContracts.motion`을 `pause().progress(1)`로 다시 고정하고, 재생 후 헤드를 옮기던 코드를 재생 없이 옮기도록 고쳐 중간 프레임도 없앴다. |
| RDS-003 | BLOCK → ADDRESSED → PASS | 적용된 ease 관찰값이 없고 복원 판정이 duration만 대조함 / Runtime 4차 재검수 RESOLVED — `useDefaultsInheritanceAnimation.ts:75-98` | handoff의 관찰 계약 미충족과 부정확한 복원 판정 | none |
| BROWSER-CORE05-001 | DEFERRED → PASS | 브라우저 실조작 미실행 | 키보드·작은 화면·control 실제 조작 확인 없음 | 저장소 소유자의 일괄 검수 |
| AUD-WRITE-001 | BLOCK → ADDRESSED → PASS | 학습 순서에 `3/3`·`source item`·coverage 수치·owner/담당 페이지 같은 제작 용어가 노출됨 / `PageCoverage.tsx`, `BoundariesSection.tsx`를 학습 순서와 다음 학습 링크로 교체 | 학습 흐름보다 제작 현황이 앞에 보임 | none |
| AUD-FACT-001 | BLOCK → ADDRESSED → PASS | 공식 vars 문서는 객체를 설명할 뿐 읽기 전용이라고 하지 않음. GSAP 3.15.0 probe에서 `tween.vars.duration = 2` 뒤 `tween.duration()`은 기존 1을 유지하고 `tween.duration(3)`에서만 3으로 변경됨 | 공식 근거를 넘는 단정과 변경 방법 누락 | `vars` 직접 쓰기와 전용 메서드 차이를 설명하고 origin을 implementation으로 정정 |
| AUD-CMT-001 | BLOCK → ADDRESSED → PASS | `DefaultsInheritanceExample.tsx`의 표시 코드 선언에 단계 주석이 없었음 / `const code` 위 한 줄 주석 추가 | `examples/` 단계별 주석 계약 위반 | none |
| AUD-LEARN-001 | ADVISORY → ADDRESSED → PASS | `autoSleep`·`force3D`의 사용 상황이 측정 없이 값을 바꾸도록 읽힘 / 성능·휴면 전환 비용을 측정하며 비교하는 조건으로 수정 | 성능 설정의 성급한 변경 유도 | none |
| AUD-RDS-001 | PASS | duration/ease/inherit controls → `descriptor` → `gsap.defaults()`·`gsap.to()` → 직렬화 코드와 관찰값을 정적 추적했고 selector·vars·try/finally 순서가 일치함 | 실행·표시 drift 없음 | none |
| AUD-BUILD-001 | PASS | 2026-08-13 메인 통합 `npm run build`, `npm run build-storybook` 모두 exit 0 | 변경 후 compile·bundle 통과 | none |
| AUD-BROWSER-001 | NOT VERIFIED | 현재 변경 뒤 브라우저 실조작 미실행 | controls·focus·reduced-motion·320/390px 실제 동작 미확인 | 메인 통합 검증에서 실행 |

### verificationEvidence

- Source verification — 공식 세 페이지 본문, `node_modules/gsap/gsap-core.js`, Node runtime probe를 대조했다.
- Codex 독립 검수 — Official Coverage, Runtime/Display Sync + Structure/Comment, Learning Transformation + 정적 Accessibility/Motion을 각각 별도 `codex exec -s read-only` 실행으로 받았다. `BLOCK` 12건 중 12건을 수정 후 재검수로 해소했고, `OC-MANIFEST-001`은 경계 위임으로 미수용(재검수에서 정당 확인), `MOTION-001`은 계약을 정정(재검수에서 정당 확인)했다.
- Storybook — `npm run build-storybook` exit 0.
- Runtime probe(2026-08-04) — getter 반환 key `duration/overwrite/delay/ease`, 초기 duration `0.5`, 부분 지정 merge 유지, 반환 객체가 내부와 같은 참조, `inherit:false` duration `0`, 명시값 `0.25` 우선, 생성 직후 복원해도 tween이 `2.5` 유지, 복원 후 다음 tween `0.5`.
- Source verification(2026-08-13) — 공식 `gsap.config()`·`gsap.defaults()`·`Tween.vars` 본문을 현재 웹에서 다시 대조했다. `autoSleep`·`force3D`·`nullTargetWarn`·`units`, defaults 상속/명시값 우선, 32개 special property와 `easeReverse`/deprecated `yoyoEase`가 기존 manifest와 일치했다.
- Runtime probe(2026-08-13) — GSAP 3.15.0, config/defaults getter, defaults 객체 동일성, 명시값/defaults/`inherit:false` duration `0.25/0.5/0`, 상속된 `vars`, `vars.duration` 직접 쓰기와 `duration()` setter의 차이를 확인했다.
- Static verification(2026-08-13) — 모든 예제 control 상태에서 `descriptor`·실행 호출·표시 코드의 값을 대조했고 `git diff --check`를 통과했다.
- Main integration(2026-08-13) — `npm run build`, `npm run build-storybook` 모두 exit 0.

### releaseDecision

`NOT VERIFIED` — 2026-08-13 감사의 사실성·학습 변환·runtime/display 정적 동기화·구조/주석과 메인 통합 build·Storybook에는 미해결 `BLOCK`이 없다. 브라우저 증거만 아직 닫지 않았다.

현재 `NOT VERIFIED` 항목(메인 에이전트의 일괄 검수 대상):

- `AUD-BROWSER-001` — 키보드 이동·포커스 표시·control 조작, `prefers-reduced-motion` 실제 전환, 320/390px 레이아웃·overflow, 실행 예제 control의 실제 조작 결과

### browserReviewClosure

- status: `NOT VERIFIED`
- reviewedAt: `2026-08-13` (Asia/Seoul)
- historicalStatus: 기존 `BROWSER-CORE05-001`은 소유자 승인으로 문서상 `PASS` 처리됐지만 실제 조작 증거는 생성되지 않았다.
- evidenceBoundary: 이번 감사의 코드 변경 뒤 브라우저 증거는 재사용하지 않으며, 메인 에이전트의 통합 검증이 필요하다.

## 2026-08-13 검증 기록 정정

- `npm run build`: `PASS` — 커밋된 HEAD에서 exit 0.
- Storybook: `NOT APPLICABLE` — `c309e13 chore: remove storybook`에서 설정·스크립트·의존성을 의도적으로 제거했다.
- 앞서 적힌 2026-08-13 `npm run build-storybook` 성공 주장은 현재 저장소와 맞지 않아 이 절로 정정한다.
- Browser: 저장소 소유자 승인으로 이번 완료 범위에서 제외했으며, 실제 브라우저 `PASS`를 주장하지 않는다.
