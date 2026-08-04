# gsap.to() handoff

## 입력 계약

### objective

`gsap.to()` 공식 페이지의 기술 item 55개를 빠짐없이 로컬 근거에 연결하고, callable method + property catalog 페이지로 재구성한다. 이 페이지는 target·vars·반환 Tween의 생성 계약을 소유하며, 다른 학습 페이지들이 전제로 삼는 기준 페이지다.

### officialPage

- title: `gsap.to()`
- canonicalUrl: `https://gsap.com/docs/v3/GSAP/gsap.to%28%29/`
- reviewedAt: `2026-08-02`
- category: `Fundamentals > GSAP`
- slug: `gsap-to`
- sourcePageIds: primary `source:gsap-to` (유일)

canonical 페이지가 사실의 authority다. 링크된 다른 공식 페이지는 소유권 경계를 확인하려고만 열었고, canonical의 주장을 대체하거나 보강하는 근거로 쓰지 않았다.

### localPage

- localPath: `src/content/gsap/fundamentals/gsap-to/`
- route: `/fundamentals/gsap-to`

이 페이지는 원래 `src/content/gsap/methods/gsap-to/`에 있어 나머지 학습 페이지의 `fundamentals/` 규약과 어긋나 있었다. 2026-08-04에 `fundamentals/`로 옮겨 정리했다. route는 처음부터 inventory와 같은 `/fundamentals/gsap-to`였고 이동으로 바뀌지 않았다.

### sourceManifest

**이 페이지의 manifest와 coverage map은 `src/content/gsap/fundamentals/gsap-to/gsap-to.meta.ts`의 `officialCoverageItems` 배열이 authority다.** 55개 item 각각이 `sourceItemId`, `officialItem`, `sourceLocation`, `sourceStatus`, `localEvidence[]`, `localStatus`를 갖는다.

markdown에 55행을 복제하지 않는 이유는 두 곳이 어긋날 수 있기 때문이다. TS 배열은 페이지가 실제로 렌더링하는 값이라 화면과 문서가 분리되지 않는다. 다른 페이지는 markdown manifest를 쓰지만, 이 페이지는 구현 시점에 coverage map을 코드로 소유하도록 만들어졌고 그 구조를 유지한다.

집계(2026-08-04 기계 대조):

| 항목 | 값 |
| --- | ---: |
| 총 source item | 55 |
| `sourceStatus: verified` | 55 |
| `localStatus: covered` | 55 |
| `localStatus: planned` | 0 |
| 중복 sourceItemId | 0 |
| localEvidence가 빈 item | 0 |

### sourceBlockers

`none`. 초기 audit(2026-08-02)은 9개 item이 `planned`여서 `BLOCK`이었다. 이후 `945c3a6 fix: complete gsap.to official coverage`와 `baa40bb docs: repair gsap.to evidence traceability`가 9개를 모두 로컬 근거에 연결해 해소했다.

### moduleSelection

| module | 목적 |
| --- | --- |
| callable method | 시그니처, `targets`·`vars` 인자, 반환 Tween, 호출 시점 |
| property catalog | special property 34개의 타입·기본값·허용값 전체 명세 |
| concept/guide subset | 값 표현 방식(함수 기반·랜덤·상대값), stagger, sequencing 경계 |

### learnerFlow

공식 목차 11개를 로컬 학습 섹션에 대응시킨 표가 `gsap-to.meta.ts`의 `officialPageSections`에 있고, 페이지의 `PageCoverageSection`이 이를 그대로 렌더링한다.

| 공식 목차 | 로컬 섹션 |
| --- | --- |
| 개요 · 반환값 | 현재값에서 목표값으로 · Tween 제어 |
| Parameters | targets와 vars |
| Special Properties | 34개 특수 속성 전체 참조 |
| Plugins | 플러그인이 vars를 확장하는 방식 |
| Function-based values | 함수 기반 값 |
| Random values | 랜덤 값 |
| Relative values | 상대값 |
| Staggers | 여러 targets의 시작 순서 |
| Sequencing | delay와 Timeline의 경계 |
| Keyframes | 여러 상태를 한 Tween에 연결 |
| Callbacks | Tween 생명주기 관찰 |

### coverageMap

`gsap-to.meta.ts`의 `officialCoverageItems`가 authority다. 각 item의 `localEvidence[]`가 섹션·예제 이름을 직접 지목하며, `PageCoverageSection`이 55개 전체를 화면 부록으로 공개한다.

### relatedPages

- `tween-start-end-values` — `from`/`fromTo`/`set`의 선택 기준을 소유한다. 이 페이지는 대비만 보여준다.
- `tween-configuration` — `gsap.defaults()`·`gsap.config()`·`Tween.vars`의 설정 출처를 소유한다.
- `easing` — ease 문법과 곡선 의미를 소유한다.
- `css-animation` — CSS 값·transform·단위 계약을 소유한다.
- `non-css-target-values` — `attr`·`endArray` 채널을 소유한다.
- `timeline-basics` — sequencing이 Timeline으로 넘어가는 경계를 소유한다.

## 구현 계약

### exactFiles

11개 섹션과 10개 예제로 구성된다. 전체 목록은 `src/content/gsap/fundamentals/gsap-to/` 아래 파일 트리가 authority다.

sections: `OverviewSection`, `MethodAnatomySection`, `SpecialPropertiesSection`, `PluginsSection`, `ValueModesSection`, `StaggersSection`, `SequencingSection`, `KeyframesSection`, `CallbacksSection`, `PropertyExamplesSection`, `PageCoverageSection`

examples: `DestinationValuesExample`, `TweenControlsExample`, `ValueModesExample`, `MultipleTargetsExample`, `PlaybackOptionsExample`, `RepeatYoyoExample`, `RepeatRefreshExample`, `OverwriteExample`, `KeyframesExample`, `CallbacksExample`

`gsap-to.properties.ts`가 special property 34개의 전체 명세를 소유한다.

### exampleContracts

10개 예제 각각이 `use<이름>Animation.ts` hook을 소유하고, TSX는 controls·preview·코드 직렬화·학습 패널만 소유한다. 어느 TSX도 `gsap`을 import하지 않는다.

### nonGoals

- Timeline의 전체 계약을 이 페이지에서 다루지 않는다.
- plugin별 vars 확장의 상세를 각 plugin 페이지 대신 소유하지 않는다.
- ease 곡선 자체의 명세를 소유하지 않는다.

### preserve

- `officialCoverageItems` 55개 배열과 `sourceItemId` 값 — 다른 페이지가 참조하는 안정 ID다.
- `gsap-to.properties.ts`의 special property 34개 명세.

## 검증 계약

### verifiedPerspectives

Official Coverage, Learning Transformation, Runtime/Display Sync, Structure/Comment, Build/Integration — 구현 컨텍스트가 판정했다. `docs/workflows/quality-gates.md` 2026-08-04 개정에 따라 독립 검수자를 두지 않는다.

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-GSAPTO-001 | PASS | 2026-08-02 canonical 직접 대조로 55개 item 확정 | 구현 범위 고정 | none |
| OC-GSAPTO-001 | BLOCK → ADDRESSED → PASS | 초기 audit에서 9개 item이 `planned` / `945c3a6`·`baa40bb`가 9개를 모두 로컬 근거에 연결 | Official Coverage 미완 | none |
| RECOVER-GSAPTO-001 | ADDRESSED | 위 두 커밋을 포함한 gsap-to 개선(28개 파일, +766/-246)이 `feat/gsap-docs-complete`에만 있었고 현재 브랜치는 분기 이후 이 폴더를 한 번도 수정하지 않았다. 2026-08-04에 회수했다. | 배포 중인 페이지가 완료된 coverage 작업을 반영하지 못하고 있었다 | none |
| STATUS-GSAPTO-001 | ADDRESSED | 회수한 `gsapToReviewStatus`가 `독립 검수`와 `releaseDecision: BLOCK`을 화면에 표시했다. 독립 검수는 계약에서 제거됐고 브라우저 게이트는 유예 대상이므로 `자기 검증`·`DEFERRED`·`PASS`로 교체했다. | 화면 표기가 현재 계약과 어긋났다 | none |
| OC-GSAPTO-002 | PASS | 2026-08-04 기계 대조: 55개 item, `covered` 55, `planned` 0, 중복 ID 0 | Official Coverage 통과 | none |
| BUILD-GSAPTO-001 | PASS | `npx tsc --noEmit` exit 0 (2026-08-04) | 타입 통과 | none |
| A11Y-GSAPTO-001 | DEFERRED | 키보드 이동, `prefers-reduced-motion` 실제 전환, 320/390px 실제 레이아웃, 10개 예제 control 실제 조작 | 소유자 일괄 브라우저 검수 대상 | 전체 페이지 완성 후 일괄 확인 |
| STRUCT-GSAPTO-001 | ADVISORY → ADDRESSED | `localPath`가 `src/content/gsap/methods/`여서 나머지 9개 페이지의 `fundamentals/` 규약과 어긋났다 / 2026-08-04에 `git mv`로 이동하고 route import·`sourcePath` 표시 문자열·문서 참조를 모두 갱신했다. 상위 폴더 깊이가 같아 상대 import는 변경되지 않았다. | 폴더 규약 불일치 | none |

이 페이지는 2026-08-04 소유자 브라우저 일괄 검수 대상 6개(`a710460`)에 **포함되지 않았다**. 브라우저 실조작을 했다고 주장하지 않는다.

### verificationEvidence

- 공식 대조 — 2026-08-02, canonical 직접 조회로 55개 item 확정.
- coverage 기계 대조 — 2026-08-04, `officialCoverageItems` 배열에서 status·중복·evidence 공백 집계.
- 브랜치 회수 대조 — 2026-08-04, merge-base 대비 현재 브랜치의 `gsap-to` 변경 0건 확인 후 옛 브랜치 버전 회수.
- 타입 — `npx tsc --noEmit` exit 0.

### releaseDecision

`PASS` (미해결 `DEFERRED` 1건: A11Y-GSAPTO-001 — 소유자 브라우저 일괄 검수 대상)
