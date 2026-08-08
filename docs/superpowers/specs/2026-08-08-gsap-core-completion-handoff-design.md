# GSAP Core 완료 handoff 갱신 설계

## 목표

새 세션이 대화 기억 없이 저장소 문서만 읽고 Core 40페이지의 완료 상태를 신뢰할 수 있으며, Plugin 46페이지 제작을 `P01 / plugins`부터 페이지 단위로 병렬 진행할 수 있게 한다.

## 기록 구조

1. `docs/handoffs/gsap/_program/current-status.md`를 변하는 단일 진입점으로 만든다. 현재 브랜치와 기준 커밋, Core·Plugin 진행률, 검증 상태, 다음 작업, 필수 읽기 순서, 병렬 작업 규칙과 복사용 프롬프트를 둔다.
2. `docs/handoffs/gsap/_program/session-handoff-2026-08-08-core-complete.md`를 Core 완료 시점의 불변 체크포인트로 만든다. Core 40/40의 content·handoff·route 검산, core 25~40 커밋, 최신 TypeScript·Vite·Storybook 증거, browser `DEFERRED`, 다음 Plugin 단계의 경계를 기록한다.
3. 기존 `session-handoff-2026-08-08.md`는 당시 사고 기록과 공식 문서 오류를 보존한다. 문서 맨 위에 역사적 handoff라는 경고와 두 최신 문서 링크만 추가한다.
4. `master-page-inventory.md`와 두 curriculum은 계획·소유권 authority로 유지하고 진행 상태를 직접 섞지 않는다.

## 새 세션 프롬프트

프롬프트는 다음을 명시한다.

- `current-status.md`부터 읽고, 그 문서가 가리키는 계약·inventory·curriculum·과거 사고 기록을 순서대로 읽는다.
- Core는 완료된 기준 구현이며 공식 문서와 다른 의도된 probe 결과를 되돌리지 않는다.
- Plugin은 `P01 /fundamentals/plugins`부터 시작하고, 페이지마다 handoff·route·두 build·커밋을 완료한다.
- 서로 다른 페이지 조사·구현·정적 감사만 서브 에이전트로 병렬화한다.
- 공유 파일인 `src/app/routes.ts`, 프로그램 handoff, build와 commit은 루트 에이전트 한 명만 순차 처리한다.
- 한 에이전트가 같은 파일을 동시에 수정하지 않게 쓰기 범위를 명시하고, 각 페이지가 컴파일 가능한 체크포인트에 도달한 뒤 통합한다.

## 병렬 작업 안전 규칙

- 공식 source 조사와 페이지 구현은 slug별 전용 content 폴더·handoff 파일로 격리한다.
- 페이지 구현자는 `src/app/routes.ts`, 다른 페이지, 프로그램 문서와 Git commit을 수정하지 않는다.
- 루트 에이전트는 item-level coverage와 runtime/display를 재검산하고 route를 등록한 뒤 전체 TypeScript·Vite·Storybook을 실행한다.
- 여러 미등록 페이지가 동시에 작성 중일 때 전체 build를 실행하지 않는다. 각 구현자가 source 쓰기를 멈추고 대상 compile이 통과했다고 보고한 시점에 하나씩 통합한다.
- 품질 계약의 관점별 자기 검증은 구현 컨텍스트가 수행한다. 별도 에이전트의 읽기 전용 감사는 병렬 조율 보조이며 release 근거를 대신하지 않는다.

## 검증

- master inventory의 core 40행이 모두 content 폴더·core handoff·route lazy import·lesson 등록을 갖는지 스크립트로 확인한다.
- plugin 46행과 첫 페이지 identity·route·owned source를 curriculum에서 대조한다.
- core 25~40 handoff의 `releaseDecision`을 확인하고 `DEFERRED`를 집계한다.
- 문서의 커밋 ID·module 수·chunk 이름을 실제 Git과 마지막 build 로그에 맞춘다.
- Markdown 링크 대상, 금지 placeholder, 오래된 현재형 문구, `git diff --check`, 깨끗한 작업 트리를 확인한다.

## 비목표

- Plugin 페이지의 source manifest나 구현을 미리 작성하지 않는다.
- 기존 사고 기록, 공식 문서 오류, page-level handoff의 판정을 재서술하거나 삭제하지 않는다.
- master inventory와 curriculum의 ownership을 변경하지 않는다.
- 자동화 테스트 코드나 테스트 환경을 추가하지 않는다.
