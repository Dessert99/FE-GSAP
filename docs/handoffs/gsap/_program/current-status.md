# GSAP 학습 페이지 현재 상태

이 문서는 새 세션이 가장 먼저 읽는 현재 상태의 단일 진입점이다. source ownership과 페이지 순서의 권위는 `master-page-inventory.md`와 두 curriculum에 있다.

## 현재 기준

- 기록일: `2026-08-09` (Asia/Seoul)
- 브랜치: `Dessert99/feat-gsap`
- 마지막 페이지 구현 커밋: `303e962` (`P46 scroll-trigger-integrations`)
- Core 학습 페이지: **40/40**, canonical source **159/159**
- Plugin 학습 페이지: **46/46**, canonical source **205/205**
- 전체 visible learning page: **86/86**, canonical source **364/364**
- 86개 모두 content 폴더·page handoff·lazy import·lesson 등록이 하나씩 존재한다.
- route lesson 86개는 master inventory의 Core 01~40 → Plugin P01~P46 순서와 일치한다.
- 86개 page handoff의 `releaseDecision`은 모두 `PASS`다.
- 자동화 테스트 코드·테스트 러너·테스트 전용 의존성은 추가하지 않았다.
- 이 세션은 원격에 push하지 않았다.

## 완료의 의미

공식 문서 기반 페이지 제작과 source integration은 끝났다. 남은 일은 새 페이지 구현이 아니라 승인된 browser-only `DEFERRED`를 실제 브라우저에서 일괄 검수하는 것이다.

브라우저 검수 범위는 각 handoff의 B01~B04를 기준으로 한다.

- keyboard와 focus 이동
- 실제 reduced-motion 환경
- 320px/390px layout과 overflow
- controls·drag·scroll·editor·cleanup의 실제 동작

브라우저 검수에서 문제가 발견되면 해당 page handoff finding을 재현 절차와 함께 갱신하고, 그 페이지에만 외과적으로 수정한 뒤 TypeScript·Vite·Storybook을 다시 통과시킨다. 기존 `PASS`를 추측으로 유지하거나 browser `DEFERRED`를 실행하지 않고 해소하지 않는다.

## 마지막 전수 검산

master inventory의 86행을 파싱해 다음 조건을 함께 확인했다.

```text
Core: 40/40 pages, 159/159 canonical
Plugin: 46/46 pages, 205/205 canonical
Total: 86/86 pages, 364/364 canonical
Route lessons: 86
Missing/duplicate/order/release errors: 0
```

최종 source checks는 `npx tsc --noEmit` exit 0, Vite **1256 modules**, Storybook **1394 modules**, `git diff --check` exit 0이다.

각 행마다 아래 조건을 독립적으로 검사했다.

1. `src/content/gsap/**/<slug>/`가 정확히 하나 존재한다.
2. `docs/handoffs/gsap/**/<slug>.md`가 정확히 하나 존재한다.
3. `src/app/routes.ts`에 lazy import와 lesson slug가 존재한다.
4. lesson 순서가 master inventory와 일치한다.
5. handoff의 마지막 `releaseDecision`이 `PASS`다.

이 과정에서 기존 Core `gsap-root-clock` lesson이 inventory의 Core 24보다 앞에 있던 순서 drift를 발견해 콘텐츠 변경 없이 등록 위치만 바로잡았다.

## 반드시 읽을 순서

1. `AGENTS.md`
2. `docs/project-structure.md`
3. `docs/workflows/README.md`와 연결된 계약 문서
4. 이 문서 `current-status.md`
5. `session-handoff-2026-08-09-plugin-complete.md`
6. `master-page-inventory.md`
7. 검수할 page handoff
8. `session-handoff-2026-08-08.md`의 “이 작업에서 실제로 사고가 났던 지점”과 “공식 문서 자체의 오류”

과거 날짜 handoff의 진행률은 역사 기록이다. 공식 문서와 설치본의 차이, runtime/display ownership, cleanup 안전 규칙은 계속 유효하다.

## 다음 실행 순서

1. browser batch 대상 handoff의 B01~B04를 page 순서로 모은다.
2. 대표 위험도가 아니라 각 page가 기록한 실제 control과 cleanup을 검수한다.
3. 발견된 문제는 해당 handoff에 finding으로 남기고 그 page만 수정한다.
4. 수정 page마다 TypeScript·Vite·Storybook·`git diff --check`를 재실행한다.
5. browser 검수가 끝난 handoff만 `DEFERRED`에서 실제 결과로 바꾼다.

## 상태 재현 명령

```bash
git status -sb
git rev-list --left-right --count origin/main...HEAD
git log -5 --oneline
npx tsc --noEmit
npx vite build
npx storybook build
git diff --check
```

`current-status.md`는 source ownership·route·release blocker 또는 browser 검수 상태가 바뀔 때 갱신한다. 날짜가 붙은 session handoff는 역사적 체크포인트로 보존한다.
