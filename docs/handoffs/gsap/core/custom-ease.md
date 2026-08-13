# Custom ease handoff

## 입력 계약

### objective

준비된 ease 목록으로는 표현할 수 없는 속도 곡선을 직접 만드는 방법을 가르친다. CustomEase가 받는 세 가지 입력(SVG path data, 표준 cubic-bezier 숫자 넷, Ease Visualizer가 만들어 준 문자열)과, 만든 ease를 ID로 재사용하는 방식이 학습의 축이다.

### officialPage

- title: `CustomEase`
- canonicalUrl: `https://gsap.com/docs/v3/Eases/CustomEase/`
- reviewedAt: `2026-08-13`
- category: `Fundamentals > Easing`
- slug: `custom-ease`
- sourcePageIds: primary `source:custom-ease` (유일)

### localPage

- localPath: `src/content/gsap/fundamentals/custom-ease/`
- route: `/fundamentals/custom-ease`

### sourceManifest

`src/content/gsap/fundamentals/custom-ease/custom-ease.catalog.ts`의 `customEaseSourceItems` 배열이 authority다. 공식 item 29개와 실행으로 확인한 항목 6개(`CE-P1`~`CE-P6`)를 `origin` 필드로 구분한다.

| 섹션 | 공식 item |
| --- | ---: |
| `curve-as-function` | 2 |
| `setup` | 5 |
| `create-and-reference` | 4 |
| `path-data` | 4 |
| `visualizer` | 11 |
| `get-svg-data` | 3 |
| 합계 | 29 |

### sourceBlockers

`none`. 29개 공식 item 전부 2026-08-13에 canonical 원문으로 다시 확인했다.

advisory: 현재 FAQ의 설치 질문과 등록 snippet은 plugin 이름을 `undefined`로 렌더링한다. 같은 페이지의 Quick Start가 `gsap.registerPlugin(CustomEase)`를 제시하므로 로컬 학습 코드는 `CustomEase`를 유지한다.

공식 페이지가 게시하지 않은 것: 형식 signature 블록, 인자 표, 반환값 절, 브라우저 지원 표. 해당 칸은 `공식 페이지에 명시 없음`으로 표시한다.

### moduleSelection

| module | 목적 |
| --- | --- |
| plugin | core에 포함되지 않으므로 등록이 필요하다는 것과 tree shaking 주의점 |
| concept/guide | ease가 "progress를 받아 값을 돌려주는 함수"라는 멘탈 모델 |
| property catalog | path data·cubic-bezier 입력 형식과 `getSVGData()` 인자 |

### learnerFlow

곡선이 곧 함수라는 정의 → 설치·등록 → `create()`로 만들고 ID로 참조 → 입력 데이터 형식 → Ease Visualizer 조작 → `getSVGData()`로 그래프 그리기 → 경계.

### coverageMap

catalog의 각 행이 `sectionId`로 로컬 근거를 지목한다. `PageCoverage`는 학습자에게 내부 source ID·분모를 보이지 않고 일곱 학습 섹션 목차만 렌더링한다.

### relatedPages

- `easing` — 표준 ease 문법과 곡선 의미를 소유한다. 이 페이지는 "표준으로 부족할 때"부터 시작한다.
- `installation` — plugin 설치·등록 절차 전체를 소유한다.
- `gsap-to` — `ease` vars의 위치와 Tween 생성 계약을 소유한다.

## 구현 계약

### exactFiles

create: `CustomEasePage.tsx` / `.css`, `custom-ease.meta.ts`, `custom-ease.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 7개(`CurveAsFunctionSection`, `SetupSection`, `CreateAndReferenceSection`, `PathDataSection`, `VisualizerSection`, `GetSvgDataSection`, `BoundariesSection`), `examples/EaseGraphLab`, `examples/CustomEasePathLab`

modify: `src/app/routes.ts`

### exampleContracts

- `EaseGraphLab` — runtimeSource `useEaseGraphRuntime.ts`. ease 함수를 촘촘히 샘플링해 곡선을 그리는 비애니메이션 관찰 도구라 `Runtime` 접미사를 쓴다.
- `CustomEasePathLab` — runtimeSource `useCustomEasePathAnimation.ts`. path data를 바꿔 만든 ease를 실제 Tween에 걸고 곡선과 이동을 함께 보여준다. 등록한 ID를 `ease`에 넘긴다.

두 예제 모두 TSX에서 `gsap`을 import하지 않는다.

### nonGoals

- 표준 ease 목록과 곡선 의미를 이 페이지에서 카탈로그로 만들지 않는다.
- Ease Visualizer를 로컬에 재구현하지 않는다. 공식 도구의 조작법만 정리한다.
- CustomBounce·CustomWiggle은 별도 페이지가 소유한다.

### preserve

- 공식 `hop` path 문자열 원문 — 임의로 줄이거나 값을 바꾸지 않는다.
- 공용 컴포넌트와 다른 페이지 파일.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 구현 컨텍스트가 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-CE-001 | PASS | 2026-08-04 canonical 직접 조회. heading 순서, Quick Start, FAQ 4건, naming caveat, path data 규칙, cubic-bezier 문자열, `getSVGData()` 절을 원문 인용으로 확인 | 구현 범위 고정 | none |
| SRC-CE-002 | BLOCK → ADDRESSED → PASS | 첫 조회에서 Ease Visualizer 단축키가 6개로 요약돼 `CE-20`(control handle ALT-drag), `CE-23`(snapping), `CE-24`(다른 ease 편집)이 "문서에 없음"으로 보였다 / 원문 인용을 요구하는 3차 조회로 세 항목 모두 공식 문장을 확인했다 | 요약 모델 때문에 실재하는 공식 항목을 삭제할 뻔했다 | none |
| DATA-CE-001 | PASS | 페이지가 쓰는 `hop` path 문자열이 공식 원문과 문자 단위로 일치함을 대조했다. `getSVGData()` 예제의 `0.445` 변형도 공식 스니펫과 일치 | 곡선 데이터 정확성 | none |
| PROBE-CE-001 | PASS | `create()`가 ease 함수를 반환하고 `gsap.parseEase(id)`가 같은 함수를 돌려줌(`===` true). 공식 `hop`으로 `ease(1) = 0` 확인 | `CE-P1`·`CE-P3` 근거 | none |
| PROBE-CE-002 | PASS | `create("power1", …)` 뒤에도 `power1.out`은 값이 그대로이고 `power1`만 교체됨 | `CE-P2` 근거 | none |
| PROBE-CE-003 | PASS | `".17,.67,.83,.67"`은 성공, `"cubic-bezier(.17,.67,.83,.67)"`은 `malformed path`로 실패 | `CE-P4` 근거 | none |
| PROBE-CE-004 | PASS | x가 0~100인 path는 0~1로 스케일되고 y가 뒤집혀 `ease(0)=1`, `ease(1)=0`이 나옴 | `CE-P5` 근거 | none |
| PROBE-CE-005 | PASS | `getSVGData("power2")`가 문자열을 반환하고 `M0,100…`으로 시작해 기본 높이 100과 화면 좌표를 확인 | `CE-P6` 근거 | none |
| OC-CE-001 | PASS | meta 섹션 합계 29 = catalog 공식 행 29, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-CE-001 | PASS | `npm run build` exit 0, `npm run build-storybook` exit 0 (2026-08-04) | build/integration 통과 | none |
| A11Y-CE-001 | DEFERRED → PASS | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 두 lab control 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |
| AUD-CE-001 | BLOCK → ADDRESSED → PASS | `PageCoverage` 분모·source item·probe 개수, 본문의 소유권·원문·검증 절차 문구 | 학습 흐름이 내부 제작 workflow와 자체 검수 보고로 바뀌 | 내부 근거는 catalog·handoff에 보존하고 화면은 학습 목차·사용 질문으로 교체 |
| AUD-CE-002 | BLOCK → ADDRESSED → PASS | `CustomEasePathLab` 표시 코드는 항상 `tween.progress()`이지만 실제는 slider에서 `pause().progress()`, 재생에서 `restart()`, reduced motion에서 `pause().progress(1)` | control→action→표시 코드 불일치 | 마지막 실행 action을 runtime state로 소유하고 serializer가 해당 메서드를 표시 |
| AUD-CE-003 | BLOCK → ADDRESSED → PASS | `EaseGraphLab` runtime은 custom ease를 module load 시 한 번 생성하지만 표시 코드에는 생성 시점이 없음 | control 변경마다 `create()`하는 코드로 오해할 수 있음 | module load 시 한 번 실행된다는 주석을 실행 descriptor와 함께 표시 |
| AUD-CE-004 | PASS | 2026-08-13 canonical 29개 item·공식 코드·Visualizer 조작 11개 재대조, 설치 GSAP 3.15.0 probe 6개 재실행 | 사실·coverage 유지 | none |
| AUD-CE-005 | NOT VERIFIED | 현재 수정본에서 브라우저 실조작을 수행하지 않음 | 두 lab의 control·focus·reduced motion·320/390px 미확인 | 메인 통합 브라우저 검증 |
| AUD-CE-006 | PASS | 2026-08-13 메인 통합 `npm run build`·`npm run build-storybook` 모두 exit 0 | 현재 수정본의 전역 통합 확인 | none |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, canonical 3회 조회(요약 1회 + 정밀 인용 2회).
- runtime probe — `node`로 `gsap` + `CustomEase` 실행, 위 PROBE-CE-001~005.
- build — `npm run build`, `npm run build-storybook`.
- `2026-08-13` canonical 재대조 — 공식 29개 item·Visualizer 조작·path·getSVGData·FAQ 유지, FAQ `undefined` 렌더링 결함은 advisory로 분리.
- `2026-08-13` runtime probe — create 반환 함수/parseEase 동일성, hop 끝 0, 표준 ease 이름 충돌 범위, cubic-bezier wrapper 실패, raw path y 반전, getSVGData 100×100을 GSAP 3.15.0에서 재확인.
- `2026-08-13 npx tsc --noEmit` → exit 0.
- `2026-08-13 git diff --check -- src/content/gsap/fundamentals/custom-ease docs/handoffs/gsap/core/custom-ease.md` → exit 0.
- `2026-08-13` 메인 통합 → `npm run build` exit 0, `npm run build-storybook` exit 0; Browser는 `NOT VERIFIED`.

### releaseDecision

`NOT VERIFIED` — 2026-08-13 공식 재대조·probe·학습 문장·두 예제 정적 동기화와 메인 통합 build·Storybook에 남은 BLOCK은 없다. Browser 실조작은 `NOT VERIFIED`다.

### browserReviewClosure

- status: `NOT VERIFIED`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
- currentAudit: 2026-08-13 수정으로 영향받은 실조작은 이 종료 기록을 재사용하지 않고 `NOT VERIFIED`로 다시 두었다.
