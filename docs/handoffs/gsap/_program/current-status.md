# GSAP 학습 페이지 현재 상태

이 문서는 새 세션이 가장 먼저 읽는 **현재 상태의 단일 진입점**이다. 계획·source ownership의 권위는 `master-page-inventory.md`와 두 curriculum에 있고, 이 문서는 구현 진행률·검증 상태·다음 실행 순서만 기록한다.

## 현재 기준

- 기록일: `2026-08-08` (Asia/Seoul)
- 브랜치: `Dessert99/feat-gsap`
- Core 구현 기준 커밋: `4e26141` (`utility-distribute`까지 완료)
- Plugin 첫 wave 구현 기준 커밋: `3073618` (`P01`~`P03` 완료)
- 원격 반영: 이 세션은 push하지 않았다. 같은 workspace의 새 세션은 바로 이어갈 수 있지만, 다른 clone/worktree에서 시작하려면 먼저 이 브랜치를 원격에 반영한다.
- Core 학습 페이지: **40/40 전달 완료**
- Core canonical source: **159/159 소유 페이지 구현 완료**
- Plugin 학습 페이지: **3/46**, canonical source **8/205**
- 전체 visible learning page: **43/86**, canonical source **167/364**
- Core 40개 모두 content 폴더·page handoff·lazy import·lesson 등록이 존재한다.
- Core 40개와 Plugin P01~P03 page handoff의 `releaseDecision`은 모두 `PASS`다.
- 현재 route lesson 순서는 Core 40개 뒤에 `plugins` → `css-rule-plugin` → `draggable-create`다.
- 이 handoff 갱신 중 현재 HEAD에서 `npx tsc --noEmit`, `npm run build`(831 modules), `npm run build-storybook`(969 modules)을 다시 실행해 모두 exit 0을 확인했다.
- 새 세션은 정적 숫자를 믿기 전에 `git status -sb`, `git rev-list --left-right --count origin/main...HEAD`, `git log -5 --oneline`과 아래 재현 스크립트를 다시 실행한다.

## 완료와 미완료를 구분하는 법

Core의 **페이지 단위 delivery는 끝났다.** 다만 프로그램 전체가 끝난 것은 아니다.

- Plugin P04~P46이 남아 있다.
- Core handoff 34개에 실제 브라우저에서만 확인할 수 있는 `DEFERRED`가 있다. `quality-gates.md`의 승인된 유예라 page release를 막지 않으며, 전체 페이지 제작 뒤 소유자가 일괄 검수한다.
- Plugin P01~P03 handoff 3개도 같은 네 종류의 browser-only `DEFERRED`를 남겼다. page handoff 기준 유예 파일은 총 37개다.
- Core 25~40의 handoff finding은 `PASS 153`, `PASS-STATIC 1`, `DEFERRED 19`, `ADVISORY 5`, `BLOCK 0`이다.
- `src/app/routes.ts`의 `reusable-effects`/`gsap-root-clock` 순서 drift는 `ba2cc7b`에서 curriculum 순서로 해소됐다.
- `timeline-callbacks-pauses.md`와 `timeline-child-placement.md`에 finding ID `A11Y-TCP-001`이 중복된다. page-local 의미는 분명하고 release blocker는 아니지만, 다음 문서 정리 때 서로 다른 prefix로 정규화할 수 있다.

## 반드시 읽을 순서

1. `AGENTS.md`
2. `docs/project-structure.md`
3. `docs/workflows/README.md`와 연결된 5개 계약 문서
4. 이 문서 `docs/handoffs/gsap/_program/current-status.md`
5. `docs/handoffs/gsap/_program/session-handoff-2026-08-08-plugin-wave-01.md`
6. `docs/handoffs/gsap/_program/session-handoff-2026-08-08-core-complete.md`
7. `docs/handoffs/gsap/_program/master-page-inventory.md`
8. `docs/handoffs/gsap/_program/plugin-learning-curriculum.md`
9. `docs/handoffs/gsap/_program/official-plugin-source-catalog.md`
10. `docs/handoffs/gsap/_program/content-architecture.md`
11. `docs/handoffs/gsap/_program/session-handoff-2026-08-08.md`의 **“이 작업에서 실제로 사고가 났던 지점”**과 **“공식 문서 자체의 오류”**

과거 handoff의 진행률·미커밋 폴더 표는 역사 기록이다. 사고 9개와 공식/실행 차이만 현재도 강제되는 안전 규칙이다.

## 다음 페이지

master inventory와 plugin curriculum이 고정한 다음 페이지는 다음과 같다.

| field | value |
| --- | --- |
| learningPageId | `plugin:P04` |
| slug | `draggable-coordinates` |
| route | `/fundamentals/draggable-coordinates` |
| title | `Draggable coordinates: start, delta, pointer, and end` |
| primary source | `source:draggable-delta-x` |
| owned canonical count | `14` |
| prerequisites | P01 plugin registration, P03 Draggable instance 생성·조회 |
| local path decision | `src/content/gsap/ui/draggable-coordinates/` |
| handoff decision | `docs/handoffs/gsap/ui/draggable-coordinates.md` |

다음 병렬 wave는 `P04 draggable-coordinates`(14 canonicals), `P05 draggable-bounds-axis`(12), `P06 draggable-lifecycle`(6)이다. page-local 조사는 병렬로 진행할 수 있지만 route·build·commit은 P04→P05→P06 순서로 통합한다.

## 페이지 하나의 release 절차

1. master inventory와 curriculum에서 source ownership·route·선행 학습을 고정한다.
2. 공식 canonical을 rendered/raw에서 최소 두 번 대조하고 heading·signature·parameter·return·예제를 직접 센다.
3. 공식이 침묵하며 틀리면 학습 오류가 되는 동작은 설치본 GSAP으로 probe한다.
4. page handoff에 item-level `sourceManifest`와 `coverageMap`, 모듈·learner flow·example contract를 먼저 고정한다.
5. page 전용 폴더만 구현하고 공식 item·probe·meta 분모·section 합계·중복 ID를 검산한다.
6. runtime config, 실제 GSAP 호출, 관찰 상태와 표시 code를 하나의 descriptor/snapshot에서 파생한다.
7. 구현 컨텍스트가 Official Coverage, Learning Transformation, Runtime/Display, Pedagogy, Structure/Comment, Accessibility/Motion, Build/Integration, Cross-page를 각각 판정한다.
8. 루트 에이전트가 route를 등록하고 `npx tsc --noEmit`, `npm run build`, `npm run build-storybook`을 모두 실행한다.
9. handoff의 build·integration·release를 실제 chunk 증거로 갱신하고 페이지 단위로 커밋한다.

자동화 테스트 코드, 테스트 러너와 테스트 전용 의존성은 추가하지 않는다.

## 병렬 작업 운영 규칙

동시 슬롯이 4개라면 루트 1개와 page worker 최대 3개로 운영한다.

### 병렬화해도 되는 것

- 서로 다른 canonical의 rendered/raw source 조사와 item inventory
- 서로 다른 slug의 page handoff 초안
- 서로 다른 page 전용 content 폴더 구현
- 구현자가 자기 페이지에 수행하는 정적 수량·주석·runtime/display 검산
- 서로 다른 페이지에 대한 읽기 전용 교차 감사

### 루트 에이전트만 순차 소유하는 것

- `src/app/routes.ts`
- 프로그램 inventory·curriculum·`current-status.md`
- `src/components/`, 전역 CSS와 공유 Storybook 변경
- 페이지 route 통합 뒤 전체 TypeScript·Vite·Storybook 실행
- handoff의 최종 integration/release 증거 갱신
- Git staging과 페이지 단위 commit

### worker 쓰기 범위

각 worker에게 아래 두 경로만 지정한다.

```text
src/content/gsap/<category>/<assigned-slug>/
docs/handoffs/gsap/<category>/<assigned-slug>.md
```

worker는 다른 페이지, `src/app/routes.ts`, 프로그램 문서, 공유 UI, 전역 CSS를 수정하거나 commit하지 않는다. handoff는 route 미등록·두 build 미실행 상태를 허용된 finding 값인 `BLOCK`과 pending 사유로 정직하게 남긴다.

### 안전한 통합 순서

1. 완료된 route 순서와 P01~P03 prerequisite를 먼저 재현한다.
2. 다음 wave는 P04·P05·P06의 source 조사와 page-local 구현을 최대 3개 worker에 배정할 수 있다.
3. worker는 중간에 전체 build를 요청하지 않고, 모든 import가 존재하며 대상 TypeScript가 통과하는 체크포인트에서 source 쓰기를 멈춘다.
4. 루트는 curriculum 순서대로 P04 하나만 검수·route 등록·두 build·handoff PASS·commit한다.
5. P04 commit 뒤 P05, 그다음 P06을 같은 절차로 하나씩 수용한다.
6. P04~P06은 등록된 P01/P03만 prerequisite로 링크하고 아직 등록되지 않은 P07/P08은 text boundary로 남긴다.
7. 한 worker가 같은 파일을 동시에 고치지 않으며, root build 중에는 모든 worker가 source 쓰기를 멈춘다.

## 새 세션 시작 프롬프트

아래를 새 세션에 그대로 붙여 넣는다.

```text
GSAP 공식 문서 기반 학습 페이지 제작을 이어받아 진행해줘.

먼저 docs/handoffs/gsap/_program/current-status.md 를 읽고, 거기에 적힌
필수 문서를 순서대로 전부 읽어. 특히 과거
session-handoff-2026-08-08.md 의 “이 작업에서 실제로 사고가 났던 지점”
9개와 “공식 문서 자체의 오류”는 계속 강제되는 규칙이야. 공식 문서와 다르게
적힌 실행 확인 결과를 공식 문구로 되돌리면 안 돼.

현재 Core page delivery는 40/40, Plugin은 3/46이야. P01 plugins, P02
css-rule-plugin, P03 draggable-create는 route·두 build·handoff PASS·페이지
커밋까지 끝났고, reusable-effects/core route 순서 drift도 ba2cc7b에서 해소됐어.
시작 전에 route가 P01→P02→P03인지와 세 handoff releaseDecision PASS를 재검산해.

다음 병렬 wave는 plugin:P04 draggable-coordinates(14 canonicals), P05
draggable-bounds-axis(12), P06 draggable-lifecycle(6)이야. master inventory와
plugin curriculum의 source ownership을 우선하고, P03가 이미 소유한 create/get/
target/vars와 각 페이지 사이의 coordinate·constraint·lifecycle 경계를 중복하지 마.

작업 단위는 학습 페이지 하나야. 페이지마다 item-level sourceManifest와
coverageMap이 있는 handoff를 먼저 고정하고, page-local 구현, route 등록,
npx tsc --noEmit, npm run build, npm run build-storybook, handoff PASS 갱신,
페이지 단위 커밋까지 끝낸 뒤 다음 페이지로 넘어가.

서브 에이전트를 병렬 활용해. 동시 작업은 서로 다른 slug의 공식 source 조사,
page handoff와 page 전용 content 폴더로만 나눠. 각 worker의 쓰기 범위를
src/content/gsap/<category>/<assigned-slug>/ 와 해당 handoff 하나로 제한하고,
routes.ts·프로그램 문서·공유 UI·전역 CSS·build·commit은 root만 소유해.
worker는 컴파일 가능한 체크포인트에서 source 쓰기를 멈추고 보고해야 해.
root는 P04, P05, P06 순서로 하나씩 검수·통합·두 build·commit해서 동시 수정과
라우트 fallback 사고를 막아.

공식 문서는 rendered/raw 최소 2회 대조하고, 문서가 침묵하는 중요한 동작만
설치본 GSAP으로 probe해. TSX가 GSAP 실행을 소유하지 않게 하고, controls·실제
호출·화면 상태·코드 패널은 하나의 runtime descriptor/snapshot에서 파생해.
자동화 테스트 코드는 만들지 마.

진행 중에는 60초 안으로 짧게 상태를 알려주고, 추측이나 미해결 BLOCK을 PASS로
바꾸지 마. 먼저 current-status의 재현 명령, branch ahead/behind와 git status를
실행한 결과부터 보고한 뒤 작업을 시작해. 다른 clone에서 시작한다면 이 handoff
commit이 원격에 존재하는지도 확인해.
```

## 상태 재현 명령

```bash
git status -sb
git rev-list --left-right --count origin/main...HEAD
git log -5 --oneline
rg -l DEFERRED docs/handoffs/gsap/core docs/handoffs/gsap/plugins docs/handoffs/gsap/plugins-uncategorized docs/handoffs/gsap/ui | sort
npx tsc --noEmit
npm run build
npm run build-storybook
```

Core 40 대응은 master inventory의 `core:*` 행을 파싱해 아래 네 조건을 함께 확인한다.

```text
src/content/gsap/fundamentals/<slug>/ 존재
docs/handoffs/gsap/core/<slug>.md 존재
src/app/routes.ts lazy import 존재
src/app/routes.ts lesson slug 등록 존재
```

## 이 문서를 갱신하는 시점

- page wave를 완료했을 때
- source ownership·route·local path가 바뀌었을 때
- 새 공식/실행 차이 또는 실제 사고가 확인됐을 때
- browser `DEFERRED`를 사람이 검수했을 때
- build·release blocker가 생기거나 해소됐을 때

`current-status.md`는 최신 상태로 덮어쓰되, 날짜가 붙은 session handoff는 역사적 체크포인트로 보존한다.
