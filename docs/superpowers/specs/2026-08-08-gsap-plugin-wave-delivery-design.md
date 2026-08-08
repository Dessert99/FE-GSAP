# GSAP Plugin 병렬 wave 제작 설계

## 목표

Plugin curriculum의 46개 학습 페이지를 세 페이지 단위의 작은 wave로 병렬 제작한다. 각 페이지는 독립적인 공식 source coverage, 학습형 재구성, 실행 경계, 검증 증거와 커밋을 가지며, 공유 파일 충돌과 미등록 route 링크를 막기 위해 루트 에이전트가 통합을 순차 소유한다.

첫 실행 범위는 Core navigation 순서 drift를 먼저 바로잡은 뒤 Plugin P01~P03을 각각 release 가능한 페이지로 완료하는 것이다. 같은 운영 규칙을 이후 P04~P46에 반복한다.

## 선택한 접근

### 채택: 세 페이지 단위 병렬 제작과 순차 통합

- 페이지 worker 최대 3명이 서로 다른 slug의 공식 source 조사, page handoff와 page-local 구현을 병렬 수행한다.
- 루트 에이전트는 공유 route, 프로그램 상태, 전체 build, Git staging과 commit을 단독 소유한다.
- 한 wave의 페이지를 curriculum 순서대로 하나씩 검수·통합·커밋한 뒤 다음 wave를 시작한다.
- source blocker가 있는 페이지는 억지로 완료하지 않고 wave에서 분리하며, 나머지 페이지는 독립적으로 통합한다.

이 방식은 전체 조사를 먼저 끝내는 방식보다 source와 구현 사이의 시간차가 짧고, 완전 순차 방식보다 page-local 작업의 처리량이 높다.

### 제외한 접근

- Plugin 46페이지의 조사를 먼저 모두 끝내는 방식은 handoff가 구현 전에 낡고 대량의 미통합 결과가 쌓일 위험이 있어 채택하지 않는다.
- 한 페이지씩 완전 순차로 만드는 방식은 충돌 위험은 낮지만 서로 독립적인 source 조사와 page-local 구현을 병렬화하지 못해 채택하지 않는다.

## 기준 문서와 소유권

- 페이지 identity와 순서는 `master-page-inventory.md`와 `plugin-learning-curriculum.md`를 따른다.
- canonical URL과 source 번호는 `official-plugin-source-catalog.md`를 따른다.
- 페이지 구조와 실행 source 선택은 `AGENTS.md`, `docs/project-structure.md`, `docs/workflows/` 계약을 따른다.
- 현재 진행률과 다음 wave는 `docs/handoffs/gsap/_program/current-status.md`에 기록한다.
- 공식 문서와 실행 결과가 다른 기존 probe 사실은 과거 handoff의 안전 규칙대로 보존한다.

## 선행 체크포인트

Plugin 구현 전에 `src/app/routes.ts`에서 curriculum상 core:20인 `reusable-effects`가 core:24인 `gsap-root-clock`보다 앞에 오도록 lesson entry 두 개의 순서만 고친다.

변경은 별도 커밋으로 남기며 다음을 통과해야 한다.

- 순서 검산
- `npx tsc --noEmit`
- `npm run build`
- `npm run build-storybook`
- `git diff --check`

## 첫 wave 범위

### P01 — `plugins`

- route: `/fundamentals/plugins`
- local path: `src/content/gsap/plugins/plugins/`
- handoff: `docs/handoffs/gsap/plugins/plugins.md`
- owned canonical: `source:plugins-overview`, catalog #17
- 중심 질문: plugin을 load·register해야 vars 확장이 동작하는 이유와 plugin family 선택 경계
- 페이지 유형: concept/guide, plugin, installation/integration
- 실행 표현: import/register 흐름과 등록 여부 진단을 같은 plugin descriptor에서 파생한다.

P01은 설치 상세나 개별 plugin API를 소유하지 않는다. 구체 plugin은 등록 전후 차이를 보여주는 데만 사용하고, 해당 plugin의 API 설명은 소유 페이지로 연결한다.

### P02 — `css-rule-plugin`

- route: `/fundamentals/css-rule-plugin`
- local path: `src/content/gsap/plugins-uncategorized/css-rule-plugin/`
- handoff: `docs/handoffs/gsap/plugins-uncategorized/css-rule-plugin.md`
- owned canonical: catalog #18 CSSRulePlugin, #19 CSSRulePlugin.getRule()
- 중심 질문: 하나의 stylesheet rule을 tween target으로 얻어 여러 요소의 공통 표현을 바꾸는 방법과 CSSOM 접근 실패 경계
- 페이지 유형: plugin, property catalog, callable method, installation/integration
- 실행 표현: selector와 시각 속성으로 만든 하나의 rule descriptor를 `getRule()`, tween과 code serializer가 함께 사용한다.

### P03 — `draggable-create`

- route: `/fundamentals/draggable-create`
- local path: `src/content/gsap/ui/draggable-create/`
- handoff: `docs/handoffs/gsap/ui/draggable-create.md`
- owned canonical: catalog #20, #52, #53, #56, #59
- 중심 질문: `Draggable.create()`가 만드는 instance, 배열 반환, target·vars·`get()` identity를 한 번에 이해하는 방법
- 페이지 유형: plugin, class/instance, callable method, property catalog
- 실행 표현: 단일 draggable card의 creation descriptor를 instance 생성, inspector와 code serializer가 함께 사용한다.

## worker 경계

각 page worker는 다음 두 경로만 수정한다.

```text
src/content/gsap/<assigned-category>/<assigned-slug>/
docs/handoffs/gsap/<assigned-category>/<assigned-slug>.md
```

worker는 다음을 수정하지 않는다.

- `src/app/routes.ts`
- `docs/handoffs/gsap/_program/`
- 다른 page folder와 handoff
- `src/components/`와 전역 CSS
- Git staging, commit과 push

worker는 공식 rendered/raw source를 최소 두 번 대조하고 item-level `sourceManifest`와 `coverageMap`을 먼저 고정한다. 공식 문서가 침묵하며 학습 정확성에 영향을 주는 동작만 설치본 GSAP으로 probe한다.

페이지 구현은 page TSX, sections, components, examples와 실행 source의 책임을 분리한다. controls, 실제 plugin 호출, 관찰 상태와 표시 코드는 같은 descriptor나 runtime snapshot에서 파생한다.

## 루트 통합 순서

1. 모든 worker가 자기 파일 쓰기를 멈추고 page-local 정적 검산 결과를 보고한다.
2. 루트가 P01의 source item 수, coverage, import, 주석, runtime/display, 정적 accessibility/motion을 재검산한다.
3. P01만 route에 등록하고 TypeScript·Vite·Storybook을 실행한다.
4. 실제 결과로 P01 handoff의 Build/Integration과 release evidence를 갱신하고 P01만 커밋한다.
5. P02와 P03을 같은 방식으로 curriculum 순서대로 각각 통합·커밋한다.
6. 세 페이지가 모두 통합되면 cross-page 링크와 용어 소유권을 다시 확인한다.
7. 프로그램 진행률과 다음 P04~P06 wave를 `current-status.md`에 갱신해 별도 handoff 커밋으로 남긴다.

worker가 작성 중일 때 루트는 전체 build를 실행하지 않는다. 루트가 build 중일 때 worker는 source 쓰기를 멈춘다.

## release 기준

페이지마다 다음 조건을 독립적으로 충족해야 한다.

- 모든 owned canonical item이 `verified`이고 로컬 근거가 `covered`다.
- Official Coverage와 Learning Transformation 판정이 각각 근거를 가진다.
- 실행 예제가 있으면 runtime/display가 하나의 descriptor나 snapshot에서 파생된다.
- 페이지 유형에 필요한 plugin 등록, dependency, environment, cleanup과 motion 경계를 설명한다.
- 정적 접근성, 구조와 한 줄 한국어 주석 규칙에 미해결 `BLOCK`이 없다.
- TypeScript, Vite와 Storybook build가 실제 route chunk를 포함해 성공한다.
- 다른 페이지의 아직 미등록 route를 링크하지 않는다.

브라우저에서 사람이 직접 확인해야 하는 키보드 조작, reduced-motion 전환, 320/390px layout, control 실조작은 기존 승인 정책대로 `DEFERRED`로 남긴다. 이 네 항목 밖의 문제에는 `DEFERRED`를 사용하지 않는다.

## 실패와 중단 조건

- 공식 item을 확인하지 못하면 source와 release를 `BLOCK`하고 추측으로 채우지 않는다.
- page-local TypeScript 오류나 존재하지 않는 import가 있으면 route 통합을 시작하지 않는다.
- 한 페이지가 막혀도 다른 페이지의 source ownership과 선행 학습이 독립적이면 나머지는 순서대로 통합한다.
- P02나 P03이 P01 route에 의존하면 P01이 먼저 등록된 뒤에만 integration을 `PASS`로 판정한다.
- 공유 UI가 필요해 보여도 두 페이지가 같은 semantic contract를 실제로 요구하기 전에는 승격하지 않는다.

## 이후 wave 반복

P01~P03 완료 뒤 master inventory 순서대로 P04~P06, P07~P09처럼 세 페이지씩 반복한다. 마지막 wave는 남은 페이지 수만큼만 배정한다.

각 wave 시작 전에는 선행 페이지의 route와 관련 링크가 실제로 등록되었는지 확인한다. wave 종료 시에는 완료 페이지 수, owned canonical 수, `DEFERRED`, advisory, blocker와 다음 page identity를 프로그램 handoff에 기록한다.

## 비목표

- 자동화 테스트 파일, 테스트 러너와 테스트 전용 의존성을 추가하지 않는다.
- Plugin 46페이지를 한꺼번에 미완성 상태로 생성하지 않는다.
- 자동 route discovery, generic plugin runtime, universal page template을 도입하지 않는다.
- 첫 wave를 이유로 기존 Core 페이지나 공용 UI를 재설계하지 않는다.
- 브라우저 실조작 유예 정책을 이번 wave에서 변경하지 않는다.
