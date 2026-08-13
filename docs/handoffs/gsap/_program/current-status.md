# GSAP 학습 페이지 현재 상태

이 문서는 새 세션이 가장 먼저 읽는 현재 상태의 단일 진입점이다. source ownership과 페이지 순서의 권위는 `master-page-inventory.md`와 두 curriculum에 있다.

## 현재 기준

- 기록일: `2026-08-13` (Asia/Seoul)
- 브랜치: `Dessert99/feat-gsap`
- main 통합: `614ab7b` (`merge: complete gsap learning pages`), 현재 브랜치 HEAD `5bb3dc7`은 해당 merge의 직계 조상
- 마지막 페이지 구현 커밋: `303e962` (`P46 scroll-trigger-integrations`)
- Core 학습 페이지: **40/40**, canonical source **159/159**
- Plugin 학습 페이지: **46/46**, canonical source **205/205**
- 전체 visible learning page: **86/86**, canonical source **364/364**
- 86개 모두 content 폴더·page handoff·lazy import·lesson 등록이 하나씩 존재한다.
- route lesson 86개는 master inventory의 Core 01~40 → Plugin P01~P46 순서와 일치한다.
- 86개 page handoff의 `releaseDecision`은 모두 `PASS`다.
- 자동화 테스트 코드·테스트 러너·테스트 전용 의존성은 추가하지 않았다.
- GitHub Pages: main 배포 `614ab7b` 성공, 공개 루트 HTTP 200 확인

## 완료의 의미

공식 문서 기반 페이지 제작과 source integration, 문서 상태 동기화는 끝났다. 2026-08-13 저장소 소유자는 남아 있던 browser-only finding을 완료로 간주하도록 승인했다.

완료로 간주한 브라우저 범위는 각 handoff의 B01~B04 또는 기존 A11Y finding을 기준으로 한다.

- keyboard와 focus 이동
- 실제 reduced-motion 환경
- 320px/390px layout과 overflow
- controls·drag·scroll·editor·cleanup의 실제 동작

79개 page handoff의 기존 상태는 `DEFERRED → PASS`로 이력을 보존했다. 이 전환은 실제 브라우저 실조작 결과가 아니라 저장소 소유자의 완료 간주 승인에 따른 문서상 종료이며, 별도 조작 증거를 생성했다고 해석하지 않는다.

## 마지막 전수 검산

master inventory의 86행을 파싱해 다음 조건을 함께 확인했다.

```text
Core: 40/40 pages, 159/159 canonical
Plugin: 46/46 pages, 205/205 canonical
Total: 86/86 pages, 364/364 canonical
Route lessons: 86
Missing/duplicate/order/release errors: 0
```

2026-08-13 재검증한 source checks는 `npm run build` exit 0, Vite **1256 modules**, `npm run build-storybook` exit 0, Storybook **1394 modules**, `git diff --check` exit 0이다.

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

## 이후 변경 원칙

1. 새 공식 source나 GSAP revision을 반영하면 해당 page의 manifest와 coverage부터 다시 연다.
2. 브라우저에서 문제가 발견되면 완료 간주 기록과 별개로 새 finding과 재현 절차를 남긴다.
3. 문제를 발견한 page만 외과적으로 수정한다.
4. 수정 page마다 TypeScript·Vite·Storybook·`git diff --check`를 재실행한다.
5. `/patterns`와 `/showcases`는 별도 요구사항과 학습 범위가 확정될 때만 레슨을 추가한다.

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
