---
name: auditing-gsap-learning-pages
description: Use when reviewing or correcting existing GSAP official-document learning pages for factual accuracy, learning efficiency, unnatural or AI-like prose, runtime/display synchronization, or real browser behavior.
---

# Auditing GSAP Learning Pages

## 핵심 원칙

공식 문서 기반 학습 페이지를 네 관점에서 각각 검수하고, finding과 직접 연결된 부분만 수정한 뒤 같은 관점을 다시 검증한다. 기존 handoff의 `PASS`, 빌드 성공, 정적 코드 검토를 현재 브라우저 동작의 증거로 재사용하지 않는다.

**REQUIRED SUB-SKILL:** 공식 source coverage와 페이지 구조 계약에는 `creating-gsap-learning-pages`를 사용한다.

## 시작 전에 읽을 것

1. `AGENTS.md`
2. `docs/project-structure.md`
3. `docs/workflows/README.md`
4. README가 연결한 현재 workflow 문서
5. 대상 페이지의 meta, handoff, section, example, runtime source

작업 전 `git status --short`로 사용자 변경을 확인하고 보존한다. 대상 route, 로컬 경로, 공식 URL, 대조일, 예제 목록, 실행 source를 먼저 고정한다.

## 판정 계약

| 상태 | 의미 |
| --- | --- |
| `PASS` | 현재 근거로 해당 관점의 요구를 모두 확인함 |
| `BLOCK` | 오개념, 학습 방해, 코드 결함처럼 수정이 필요한 문제 |
| `ADVISORY` | 이해를 막지는 않지만 개선 가치가 있는 문제 |
| `NOT VERIFIED` | 필요한 공식 source나 실제 브라우저 환경이 없어 확인하지 못함 |

전체 상태의 우선순위는 `BLOCK` > `NOT VERIFIED` > `PASS`이다. `ADVISORY`만 남으면 `PASS`할 수 있지만 함께 기록한다. 수정 직후에는 `ADDRESSED`로 기록하고 재검증이 끝난 뒤에만 `PASS`로 바꾼다.

## 1. 사실 정확성 검수

학습자에게 보이는 설명, 표, 코드, 주석에서 검증 가능한 기술 주장을 문장 단위로 찾는다. 각 주장을 canonical 공식 페이지, 연결된 공식 페이지, 설치된 타입, 최소 runtime probe 중 적절한 근거에 연결한다. 변경될 수 있는 공식 문서는 검수 당일 다시 열어 확인하고 URL과 대조일을 기록한다.

공식 페이지는 그 페이지가 실제로 말하는 범위의 기준으로 사용한다. 설치된 타입은 현재 프로젝트가 허용하는 입력 형태의 근거로 사용하되 공식 의미를 대신하게 하지 않는다. runtime probe는 공식 문서가 침묵하는 계산 시점, 기본값, 부작용을 확인할 때만 사용한다.

DOM과 CSS 렌더링에 의존하는 주장을 Node probe만으로 확정하지 않는다. 기억이나 일반적인 GSAP 지식만으로 사실을 확정하지 않는다.

기본값, 값 범위, 평가 시점, callback 순서, 상속, cleanup, 반환 타입을 우선 점검한다.

사실과 학습을 위한 단순화를 구분하고, 단순화가 예외를 거짓으로 만들면 `BLOCK`한다.

## 2. 학습 효율 검수

페이지가 초보자의 실제 질문 순서로 진행되고 용어를 사용 전에 정의하는지 확인한다. 각 section이 무엇인지, 왜 필요한지, 무엇을 조작하고 무엇을 관찰할지 알려주는지 확인한다.

한 예제는 하나의 핵심 질문에 답하게 하고, 개념상 필요하지 않은 옵션과 대상을 함께 가르치지 않는다.

앞선 설명 없이 등장하는 API, 설정, 수학 표현, 내부 구현 용어를 찾는다.

같은 설명의 반복, 지나치게 긴 속성 나열, 예제보다 늦게 나오는 핵심 전제를 찾는다.

학습 흐름을 바꿀 때도 공식 item을 삭제하지 말고 더 적절한 section, reference, example, warning으로 이동한다.

예제 실행 전 목표와 관찰점을, 실행 후 원리와 실제 사용 경계를 설명한다.

## 3. 비유와 문체 검수

비유는 target, 상태, 시간, 변화 중 무엇과 대응하는지 분명하고 실제 동작을 더 빨리 이해시킬 때만 남긴다. 비유 뒤에는 반드시 GSAP 용어로 된 문자 그대로의 설명을 둔다.

“마법처럼”, “알아서 기억한다”, “춤춘다”처럼 계산 시점이나 상태 소유권을 가리는 의인화를 수정한다.

어디에나 붙일 수 있는 홍보 문장, 반복적인 “마치 …처럼”, 과도한 감탄과 장식어를 수정한다.

canonical, coverage, source ownership, mapping, release 같은 제작 workflow 용어를 학습자 본문에서 제거한다.

비유를 다른 비유로 치환하지 말고 가능하면 target의 현재값, 목표값, 평가 시점, playhead로 직접 설명한다.

짧고 자연스럽다는 이유만으로 정확한 용어를 흐리거나 중요한 경계를 삭제하지 않는다.

## 4. 예제 코드와 브라우저 검수

모든 예제를 목록화하고 대표 예제만 골라 검사하지 않는다. 먼저 control state → config/descriptor → 실제 GSAP 호출 → 표시 코드가 같은 값에서 파생되는지 정적으로 추적한다.

`sourcePath`, scope, dependency, replay baseline, `revertOnUpdate`, unmount cleanup, callback과 Tween ref를 확인한다. 표시 코드는 runtime이 실행한 값과 문법만 다르고 의미는 같아야 한다.

그다음 실제 브라우저에서 route를 열고 console error와 초기 렌더를 확인한다. 각 예제에서 모든 control, 재생·정지·재시작, replay를 조작하고 화면 변화와 표시 코드 동기화를 확인한다.

빠르게 반복 조작해 이전 Tween, listener, timer, callback이 남지 않는지 확인한다.

route 이탈 후 복귀해 cleanup과 초기 상태 복원을 확인한다.

키보드 순서와 focus, reduced motion, 320px·390px overflow를 확인한다.

브라우저가 없으면 정적 검수와 빌드는 계속하되 이 관점을 `NOT VERIFIED`로 남긴다.

빌드 성공과 코드가 그럴듯함을 실브라우저 증거로 대체하지 않는다.

## 수정 순환

1. 수정 전 finding에 ID, 관점, 상태, 위치, 근거, 학습 영향, 필요한 조치를 기록한다.
2. `BLOCK`부터 원인을 수정하고 관련 없는 문장, 스타일, 구조는 건드리지 않는다.
3. 공식 source가 바뀐 경우 manifest, coverage map, 대조일, handoff를 함께 갱신한다.
4. 예제 수정은 runtime과 표시 코드의 단일 source를 유지하고 프로젝트 주석 규칙을 따른다.
5. 자동화 테스트나 테스트 환경을 추가하지 않는다.
6. `npm run build`를 실행한다.
7. 영향받은 네 관점을 다시 검수하고 finding 이력을 남긴다.
8. 코드 변경이 있으면 영향받은 모든 브라우저 조작을 다시 수행한다.

## Finding 예시

`FACT-01 | 사실 정확성 | BLOCK | ease 결과를 0~1로 한정한 문장 | back.out probe가 중간에 1을 넘음 | overshoot 계열 예외를 포함해 수정 | 수정 후 공식 근거와 probe 재확인`

좋은 수정은 비유를 보강하는 것이 아니라 “입력 진행률은 0~1이지만 ease의 출력은 overshoot 때문에 범위를 벗어날 수 있다”처럼 경계를 직접 밝힌다.

## 최종 출력

다음을 순서대로 남긴다.

1. `auditTarget`: route, commit, 공식 URL, 대조일, 브라우저 환경과 증거 경계
2. `findings`: ID, 관점, 상태, `file:line` 또는 공식 근거, 영향, 조치
3. `changesApplied`: finding ID별 수정 파일, 수정 내용, 재검증 근거
4. `verification`: coverage, probe, build, 예제별 브라우저 matrix
5. `unresolved`: `BLOCK`, `ADVISORY`, `NOT VERIFIED`를 섞지 않고 분리
6. `overallDecision`: `PASS`, `BLOCK`, `NOT VERIFIED`와 한 문장 이유

## 흔한 실패

| 실패 | 바로잡기 |
| --- | --- |
| 기존 handoff가 `PASS`라서 생략 | 현재 source와 실행 환경에서 다시 판정한다 |
| 타입 선언만으로 공식 의미 확정 | canonical 근거와 타입 근거를 분리한다 |
| 대표 예제 하나만 조작 | 예제별 browser matrix를 채운다 |
| 빌드 성공을 브라우저 성공으로 기록 | 실제 조작이 없으면 `NOT VERIFIED`로 둔다 |
| 전면 재작성으로 문체를 정리 | finding과 연결된 최소 범위만 수정한다 |
| 수정했으니 곧바로 `PASS` | 같은 관점을 재검증한 증거를 남긴다 |

## 완료 전 Red Flags

- 네 관점 중 하나가 보고서에 없음
- 사실 주장에 공식 근거, 타입 근거, probe 구분이 없음
- 브라우저 증거 없이 “예제가 정상 동작한다”고 씀
- 원래 finding을 지우고 수정 결과만 남김
- 미해결 `BLOCK` 또는 `NOT VERIFIED`가 있는데 전체 `PASS`

하나라도 해당하면 완료 선언을 멈추고 판정 또는 검증을 바로잡는다.
