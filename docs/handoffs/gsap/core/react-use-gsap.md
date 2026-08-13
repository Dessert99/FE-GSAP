# React useGSAP handoff

## 입력 계약

### objective

React가 컴포넌트를 반복 생성·해제한다는 사실이 왜 애니메이션 문제로 이어지는지 먼저 세우고, `useGSAP()`이 그 정리를 어떻게 대신하는지를 가르친다. 이 페이지는 "무엇을 만드느냐"가 아니라 **"언제 치워지느냐"**가 주제다.

### officialPage

- title: `GSAP & React`
- canonicalUrl: `https://gsap.com/resources/React`
- reviewedAt: `2026-08-04`
- category: `React`
- slug: `react-use-gsap`
- sourcePageIds: primary `source:react-use-gsap` (유일)

### localPage

- localPath: `src/content/gsap/fundamentals/react-use-gsap/`
- route: `/fundamentals/react-use-gsap`

### sourceManifest

`react-use-gsap.catalog.ts`의 `reactUseGsapSourceItems` 배열이 authority다. 공식 item 19개와 실행 확인 항목 1개(`RG-P1`)를 `origin`으로 구분한다.

| 섹션 | 공식 item |
| --- | ---: |
| `why-cleanup` | 3 |
| `hook-basics` | 4 |
| `config-object` | 3 |
| `context-safe` | 6 |
| `ssr` | 3 |
| `boundaries` | 0 |
| 합계 | 19 |

공식 Config Object 절 원문 기준:

| 옵션 | 타입 | 기본값 |
| --- | --- | --- |
| `dependencies` | Array / null | `[]` |
| `scope` | React ref | 공식 페이지에 명시 없음 |
| `revertOnUpdate` | Boolean | `false` |

### sourceBlockers

`none`. 19개 공식 item 전부 2026-08-04에 canonical 원문으로 확인했다.

공식 자료가 게시하지 않은 것: 요구 GSAP·`@gsap/react` 버전, `registerPlugin(useGSAP)`이 필수인지 여부, `scope`의 기본값, 훅 반환 객체의 전체 구성. starter template과 새 React 앱 생성 절차는 이 저장소가 이미 만들어진 프로젝트라 비목표로 제외했다(비기술 영역 제외가 아니라 **범위 밖**임을 `boundaries`에 명시).

### moduleSelection

| module | 목적 |
| --- | --- |
| concept/guide | strict mode 이중 실행과 정리라는 문제 정의 |
| callable method | 훅 signature와 config 세 옵션 |
| installation·integration | import·등록·SSR과 `"use client"` |

### learnerFlow

React가 만드는 문제 → 훅이 대신하는 것과 자동 revert 대상 → config 세 옵션 → 훅 밖에서 만든 애니메이션과 `contextSafe` → SSR → 경계.

### coverageMap

catalog의 각 행이 `sectionId`로 소유 섹션을 지목하며 `PageCoverage`가 같은 배열을 센다.

### relatedPages

- `gsap-context` — `gsap.context()`의 범위 지정과 revert를 소유한다. `useGSAP()`이 내부적으로 쓰는 것이다.
- `gsap-to` — target과 vars 생성 계약을 소유한다.
- `responsive-motion` — 조건별 animation과 reduced-motion 처리를 소유한다.

## 구현 계약

### exactFiles

create: `ReactUseGsapPage.tsx` / `.css`, `react-use-gsap.meta.ts`, `react-use-gsap.catalog.ts`, `components/PageCoverage`, `components/SectionHeading`, `sections/` 6개(`WhyCleanupSection`, `HookBasicsSection`, `ConfigObjectSection`, `ContextSafeSection`, `SsrSection`, `BoundariesSection`), `examples/ScopeLab`

modify: `src/app/routes.ts`

### exampleContracts

- `ScopeLab` — runtimeSource `useScopeRuntime.ts`. 같은 class를 가진 상자 두 개를 놓고 하나만 `scope` container 안에 둔다. 선택자는 하나뿐인데 한쪽만 움직이는 것을 보여주고, **문서 전체 일치 개수**와 **Tween이 실제로 잡은 개수**를 숫자로 대조한다. 관찰값은 `tween.targets()`에서 읽어 추측하지 않는다. 애니메이션 자체가 아니라 선택 범위가 관찰 대상이라 `Runtime` 접미사를 쓴다.

`contextSafe`는 실행 예제를 만들지 않았다. 정리 여부는 컴포넌트를 unmount해야 관찰되는데 그 조작 자체가 학습 흐름을 끊고, 공식 예제 두 형태를 나란히 놓는 정적 비교가 "어디서 쓰느냐로 갈린다"는 핵심을 더 직접 전달한다(`docs/workflows/learning-design.md` 기준).

TSX에서 `gsap`을 import하지 않는다.

### nonGoals

- `gsap.context()`의 전체 계약을 이 페이지에서 다시 가르치지 않는다.
- React 자체 입문(컴포넌트·훅 개념)을 다루지 않는다.
- 공식 자료의 starter template과 새 앱 생성 절차를 옮기지 않는다.

### preserve

- 공식 config 옵션명·타입·기본값 원문.
- `src/main.tsx`의 `gsap.registerPlugin(useGSAP)` — 이 페이지가 설명하는 등록의 실제 사례다. 건드리지 않는다.
- 공용 컴포넌트와 다른 페이지 파일.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, 정적 Accessibility/Motion, Build/Integration, Cross-page Consistency — 구현 컨텍스트가 판정했다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-RG-001 | PASS | 2026-08-04 canonical 2회 조회(요약 1회 + 원문 인용 요구 1회). heading 14개 순서, config 세 옵션의 타입·기본값, SSR 절 전문, `contextSafe` 두 형태 예제, 자동 revert 대상 4종을 원문 인용으로 확인 | 구현 범위 고정 | none |
| DOC-RG-001 | PASS | 공식 `revertOnUpdate` 설명이 **기본값(false) 기준으로 서술**돼 있어 "revert되지 않는다"만 읽으면 옵션의 역할을 거꾸로 이해하게 된다. `ConfigObjectSection`에 경고 블록으로 이 서술 방향을 명시하고 `true`일 때의 동작을 따로 적었다 | 공식 서술 방향 때문에 생기는 오해 | none |
| PROBE-RG-001 | PASS | `typeof useGSAP === 'function'`, `typeof useGSAP.register === 'function'`. `gsap.registerPlugin(useGSAP)` 호출이 예외 없이 통과 | `RG-P1` 근거 | none |
| LOCAL-RG-001 | PASS | 이 저장소가 `src/main.tsx:9`에서 `gsap.registerPlugin(useGSAP)`을 호출하고, `src/content` 아래 32개 파일이 `useGSAP(`을 쓰며 `revertOnUpdate: true`가 29회 등장함을 확인했다. 페이지 본문에서 이 저장소를 실제 사례로 인용한다 | 학습자가 살아 있는 예를 따라갈 수 있다 | none |
| RDS-RG-001 | PASS | `ScopeLab`의 관찰값이 `tween.targets()`와 `document.querySelectorAll()` 실측에서만 나오고 TSX는 직렬화만 한다. TSX에 `gsap` import 없음 | Runtime/Display Sync 통과 | none |
| ASSET-RG-001 | ADDRESSED | `HookBasicsSection`이 쓰는 `react-gsap-page__token-list` 클래스가 CSS에 없었다. 사용 클래스 전수 대조로 발견해 추가했고 재대조에서 누락 0 | 스타일 누락 | none |
| OC-RG-001 | PASS | meta 섹션 합계 19 = catalog 공식 행 19 = 분모 19, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-RG-001 | PASS | `npx tsc --noEmit`에서 이 페이지 관련 오류 0 (동시 진행 중인 다른 페이지 오류는 별건) | 타입 통과 | 통합 시 전체 build 재확인 |
| A11Y-RG-001 | DEFERRED → PASS | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, lab 실행 버튼 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |

### verificationEvidence

- 공식 원문 대조 — 2026-08-04, canonical 2회 조회.
- runtime probe — `node`로 `gsap` + `@gsap/react` 실행, PROBE-RG-001.
- 저장소 실측 — `grep`으로 등록 위치와 훅 사용 파일 수·옵션 사용 횟수 집계.
- 타입 — `npx tsc --noEmit`.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.
