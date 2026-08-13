# Custom ease handoff

## 입력 계약

### objective

준비된 ease 목록으로는 표현할 수 없는 속도 곡선을 직접 만드는 방법을 가르친다. CustomEase가 받는 세 가지 입력(SVG path data, 표준 cubic-bezier 숫자 넷, Ease Visualizer가 만들어 준 문자열)과, 만든 ease를 ID로 재사용하는 방식이 학습의 축이다.

### officialPage

- title: `CustomEase`
- canonicalUrl: `https://gsap.com/docs/v3/Eases/CustomEase`
- reviewedAt: `2026-08-04`
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

`none`. 29개 공식 item 전부 2026-08-04에 canonical 원문으로 확인했다.

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

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며, `PageCoverage`가 같은 배열을 세어 화면에 공개한다.

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

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, canonical 3회 조회(요약 1회 + 정밀 인용 2회).
- runtime probe — `node`로 `gsap` + `CustomEase` 실행, 위 PROBE-CE-001~005.
- build — `npm run build`, `npm run build-storybook`.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
