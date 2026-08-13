---
name: creating-gsap-learning-pages
description: Use when adding, modifying, auditing, or handing off GSAP official-document learning pages, including coverage, beginner explanations, examples, and runtime-to-code synchronization.
---

# Creating GSAP Learning Pages

공식 기술 페이지의 모든 내용을 보존하고, 초보자가 이해할 수 있는 단계형 학습 경험으로 다시 설계한다.

## 최상위 완료 조건

다음 두 조건을 서로 독립적으로 통과시킨다.
1. **Official Coverage** — 선택한 공식 기술 페이지의 모든 내용을 빠짐없이 로컬 근거에 연결한다.
2. **Learning Transformation** — 연결한 모든 내용을 단순 번역이 아닌 직관적이고 단계적인 설명으로 재구성한다.
둘 중 하나라도 실패하면 페이지를 완료로 표시하지 않는다.

공식 문서는 정확성의 기준이지 설명 난이도나 로컬 목차 순서의 기준이 아니다.

## 반드시 읽을 문서

작업 전에 아래 문서를 모두 읽는다.

1. `AGENTS.md`
2. `docs/project-structure.md`
3. `docs/workflows/README.md`
4. `docs/workflows/source-coverage.md`
5. `docs/workflows/learning-design.md`
6. `docs/workflows/page-format.md`
7. `docs/workflows/context-handoff.md`
8. `docs/workflows/quality-gates.md`

## 전체 workflow

1. 공식 URL·대조일·분류·slug와 로컬 경로·route를 확정한다.
2. 공식 페이지의 전체 기술 내용을 source manifest로 분해한다.
3. 각 source item에 고유 ID를 부여한다.
4. 페이지 성격에 맞는 학습 모듈을 선택한다.
5. source item마다 학습자가 막힐 지점과 로컬 설명 방식을 정한다.
6. coverage map의 모든 기술 항목을 로컬 근거에 연결한다.
7. 컨텍스트 handoff를 고정한 뒤 구현한다.
8. 관점별 자기 검증을 실행하고, 공식 문서가 침묵하는 동작은 runtime probe로 확인한다.
9. 모든 `BLOCK`을 수정하고 영향받은 관점을 다시 판정한다.
10. 두 최상위 조건과 실행 증거를 대조해 release를 판정한다.

## Official Coverage 계약

source manifest에는 공식 페이지에서 확인한 다음 내용을 모두 기록한다.
- 제목, URL, 대조일, 공식 기술 목차
- 본문의 기술 주장과 동작 원리
- 시그니처, 오버로드, 인자, 반환값
- 속성, 메서드, 타입, 기본값, 허용값, 특수값
- note, tip, warning, caveat, edge case, 제약 조건
- 공식 코드 예제가 새로 보여주는 동작
- 전제 지식, 플러그인, 브라우저, 프레임워크 의존성
- 관련 공식 페이지 링크와 현재 페이지가 설명할 경계

기술 내용은 어렵거나 드물거나 다른 페이지와 겹친다는 이유로 제외하지 않는다.
제외할 수 있는 것은 광고, 계정, 커뮤니티, 마케팅, 중복 내비게이션 같은 비기술 영역뿐이다.

로컬 목차는 학습을 위해 재배열하거나 여러 source item을 묶을 수 있다. 단, 모든 item은 `section`, `reference`, `example`, `warning` 중 하나 이상의 로컬 근거를 가져야 한다.

공식 사실을 확인하지 못했으면 추측하지 말고 해당 item과 release를 `BLOCK`한다.

세부 스키마와 판정은 `docs/workflows/source-coverage.md`를 따른다.

## Learning Transformation 계약

공식 문장을 번역하거나 요약한 것만으로 완료하지 않는다.
각 기술 item을 설명할 때 필요한 항목을 선택해 다음 순서로 재구성한다.

1. 무엇인지
2. 왜 필요한지
3. 먼저 알아야 할 개념
4. 가장 단순한 상태 또는 동작
5. 값을 바꾸면 달라지는 부분
6. 그렇게 동작하는 이유와 계산 시점
7. 다른 옵션·개념과의 관계
8. 실제 사용처
9. 흔한 오해, 경계, 주의점

처음 등장하는 용어는 사용 전에 정의한다.

예제는 학습자가 조작할 값, 관찰할 변화, 확인할 이유를 실행 전에 알려준다.

한 예제는 하나의 핵심 질문에 답한다. 여러 대상이나 여러 상태가 개념 자체일 때만 함께 보여준다.

인터랙션이 이해를 실제로 높일 때 사용하고, 정적 표·타임라인·다이어그램이 더 직접적이면 그것을 선택한다.

세부 설명 계약은 `docs/workflows/learning-design.md`를 따른다.

## 페이지 형식 선택

공식 페이지 성격에 따라 다음 모듈을 하나 이상 결합한다.
| 페이지 성격 | 중심 설명 |
| --- | --- |
| 개념·가이드 | 문제, 멘탈 모델, 관계, 적용 경계 |
| callable method | 시그니처, 인자, 반환값, 호출 시점 |
| class·instance | 생성, 상태, 수명, 메서드, 정리 |
| plugin | 등록, 의존성, 환경 제약, API, cleanup |
| property catalog | 모든 속성의 값 계약, 조합, 경계 |
| utility·overload | 입력·출력, 오버로드, 경계값, 선택 기준 |
| ease·visualizer | 곡선, 속도 변화, 조절값, 표현식 |
| installation·integration | 설치, 등록, SSR, 번들, cleanup |

`gsap.to()`의 속성 카탈로그와 animation Hook 구성을 다른 유형에 복제하지 않는다.

세부 모듈 계약은 `docs/workflows/page-format.md`를 따른다.

## 실행 파일 선택

페이지 TSX는 조립하고, `sections/`는 학습 단위, `examples/`는 독립 실행 단위를 소유한다.
| 예제 성격 | 실행 source |
| --- | --- |
| Tween·Timeline·Plugin animation 생명주기 | `use<ExampleName>Animation.ts` |
| 상태를 조절하는 비애니메이션 GSAP utility | `use<ExampleName>Runtime.ts` |
| 상태가 없는 순수 호출·계산 | `<ExampleName>.example.ts` |
| 실행 코드가 없는 개념·설치 설명 | `runtimeSource: none`; 별도 runtime 파일을 만들지 않음 |

`sourcePath`는 고정적으로 Hook을 가리키지 않는다. 실행 source가 없으면 정적 코드를 소유한 TSX를 가리키거나 `none`으로 둔다.

runtime 파일은 실제 GSAP 호출, 입력 state, 정규화 config·descriptor, 결과·관찰 상태와 필요한 생명주기만 소유한다.

TSX는 controls, preview, serializer, 속성·인자 정보, 변화, 관찰점, 설명을 소유한다.

표시 코드는 runtime이 사용한 동일 config·descriptor를 문법으로만 직렬화한다.

실행 의미를 TSX에서 다시 조립하거나 여러 예제를 generic runtime Hook으로 합치지 않는다.

## 컨텍스트 분리와 handoff

페이지마다 `docs/workflows/context-handoff.md`의 동일한 입력·출력 필드를 사용한다.

handoff에는 최소한 다음을 남긴다.
- objective와 공식 page identity, 로컬 경로·route
- source manifest와 미확인 source blocker
- 선택한 모듈과 학습 순서
- coverage map과 모든 item 상태
- 정확한 생성·수정 파일
- 예제별 실행 source와 `sourcePath`; 해당하지 않는 필드는 `none`과 이유
- 비목표와 변경 금지 범위
- 검수 배정, finding, 검증 증거, release 판정

다른 컨텍스트는 기억이나 대화 요약 대신 이 handoff와 저장소 파일을 기준으로 이어서 작업한다.

## 검증 orchestration

독립 검수자를 두지 않는다. 구현한 컨텍스트가 아래 순서를 직접 수행한다.

구현 전에 확정할 것:

- **Source Curator** — 전체 source manifest와 기술 제외 여부를 확정한다.
- **Content Architect** — 페이지 모듈, 학습 순서, 초보자 질문을 확정한다.

구현 후에 관점마다 따로 판정할 것:

- **Official Coverage**
- **Learning Transformation**
- **Runtime/Display Sync** — 실행 예제가 있을 때만 판정한다.
- **Pedagogy**
- **Structure/Comment**
- **Accessibility/Motion** — 인터랙티브 UI가 있을 때 판정한다.
- **Build/Integration**
- **Cross-page Consistency** — 둘 이상의 공식 페이지를 연속 작업할 때 판정한다.

여러 관점을 한 판정으로 뭉치지 않는다. 관점마다 근거를 따로 남긴다.

공식 문서가 명시하지 않은 기본값·상속 범위·부작용은 추측하지 말고 runtime probe로 확인한다.

세부 판정과 finding 형식은 `docs/workflows/quality-gates.md`를 따른다.

## 즉시 `BLOCK`할 항목

- 공식 기술 item 누락 또는 근거 없는 제외
- 공식 문서의 단순 번역·요약으로 끝난 설명
- 공식 사실을 기억, 로컬 추측, 실행 결과만으로 확정
- 페이지 성격과 맞지 않는 `gsap.to()` 형식 복제
- 비애니메이션 예제에 animation Hook·Tween을 장식으로 추가
- runtime config와 표시 code의 별도 조립
- 제목·설명·속성 표를 runtime 파일에 혼합
- 미확인 source item이나 미해결 finding이 있는데 완료 선언
- 다른 컨텍스트가 재현할 수 없는 자유 형식 handoff

## Release 증거

다음을 모두 남긴다.

- source manifest와 100% 기술 coverage map
- Learning Transformation finding
- 해당 페이지 유형에 필요한 관점별 finding
- 공식 문서가 침묵한 항목의 runtime probe 결과
- TypeScript·Vite build 결과
- 인터랙티브 페이지의 브라우저·키보드·작은 화면·reduced-motion 결과
- Cross-page finding 또는 단일 페이지라는 근거
- 미해결 `BLOCK`이 없다는 release 판정

자동화 테스트 코드와 테스트 실행 환경은 추가하지 않는다.
