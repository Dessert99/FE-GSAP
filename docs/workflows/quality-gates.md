# GSAP 학습 페이지 품질 게이트

독립 검수자를 두지 않는다. 구현한 컨텍스트가 같은 source manifest와 구현 diff를 기준으로 아래 관점을 순서대로 스스로 판정하고, 판정 근거를 handoff에 남긴다.

## 순서

1. **Source Curator** — 구현 전에 공식 페이지의 모든 기술 내용을 source manifest로 확정하고 비기술 영역만 제외한다.
2. **Content Architect** — 구현 전에 페이지 모듈, coverage mapping, 초보자 어휘·멘탈 모델과 예제 목표를 확정한다.
3. **구현**
4. **runtime probe** — 아래 [runtime probe 규칙](#runtime-probe-규칙)에 따라 공식 문서로 확정할 수 없는 동작을 실제 실행으로 확인한다.
5. **구현 후 자기 검증** — 아래 7개 관점을 각각 판정한다.
6. **수정 loop** — `BLOCK`을 고치고 영향받은 관점을 다시 판정한다. 미해결 `BLOCK`이 없을 때까지 반복한다.
7. **release 판정** — 두 최상위 조건(Official Coverage, Learning Transformation)과 검증 증거를 대조해 `PASS` 또는 `BLOCK`을 기록한다.

## 구현 후 자기 검증 관점

관점을 한 덩어리로 뭉쳐 판정하지 않는다. 하나씩 근거를 따로 남긴다.

- **Official Coverage** — manifest의 모든 기술 항목이 명세·섹션·예제·warning에 연결됐는지 확인한다.
- **Learning Transformation** — 단순 번역·요약이 아니라 전제 지식·단계·관찰·원리·사용처·주의점으로 재구성됐는지 확인한다.
- **Runtime/Display Sync** — 실행 예제가 있을 때 controls, 정규화 config, GSAP 호출, 관찰 상태, 표시 코드가 같은 runtime state에서 파생되는지 확인한다.
- **Pedagogy** — 용어 정의, 한 대상·한 변화, 목표·조작·관찰·원리·사용처·주의점의 학습 흐름을 확인한다.
- **Structure/Comment** — 페이지·섹션·컴포넌트·예제별 실행 source 경계와 한 줄 한국어 주석 규칙을 확인한다.
- **Accessibility/Motion** — 인터랙티브 UI가 있을 때 키보드·레이블·상태 전달, 작은 화면, `prefers-reduced-motion`과 대체 상태를 확인한다.
- **Build/Integration** — TypeScript·Vite 빌드, 라우팅·스타일을 확인한다.

둘 이상의 공식 페이지를 연속으로 작업할 때는 **Cross-page Consistency**를 추가로 판정한다. 용어, 관련 링크, 선행 학습, 중복 설명의 소유권을 확인한다.

## runtime probe 규칙

공식 문서 원문으로 확정할 수 없는 동작은 추측하지 말고 실제 GSAP을 실행해 확인한다. 검수자를 대신하는 장치가 아니라, 문서에 없는 사실을 지어내지 않기 위한 최소 안전장치다.

- 대상: 공식 문서가 명시하지 않은 기본값·상속 범위·부작용·반환 형태처럼 **틀리면 학습자에게 잘못된 GSAP 동작을 가르치게 되는 주장**.
- 방법: `node`로 `gsap`을 import해 해당 호출을 실행하고 결과를 직접 읽는다. 결과를 `sourceStatus`나 finding 근거에 `probe`로 표기한다.
- probe로도 확인되지 않으면 그 item과 release를 `BLOCK`한다. 기억이나 추정으로 채우지 않는다.
- probe는 공식 문서를 대체하지 않는다. 공식 문서에 적힌 사실은 원문 인용이 근거이고, probe는 문서가 침묵하는 지점에만 쓴다.

## Finding 계약

각 관점마다 `ID`, `상태`, `근거(파일·행 또는 실행 결과)`, `영향`, `필수 조치`를 기록한다.

- `PASS`: 담당 범위에 release를 막는 문제가 없으며 확인 근거가 있다.
- `BLOCK`: 공식 기술 내용 누락, 단순 번역·요약, runtime/display 불일치, 페이지 유형과 맞지 않는 실행 구조, 접근성·motion 결함, build 실패처럼 release 전에 반드시 고쳐야 한다.
- `ADVISORY`: 현재 계약과 release를 막지는 않지만 후속 개선 가치가 있다.
- `ADDRESSED`: 고쳤고 재판정을 기다리는 상태다. 원래 상태와 해결 근거를 함께 남기며, 재판정 전에는 `PASS`로 취급하지 않는다.
- `DEFERRED`: 아래 [Browser 실조작 검수 유예](#browser-실조작-검수-유예)가 열거한 항목에만 쓴다. 그 밖의 어떤 판정도 이 상태로 미루지 않는다.

미해결 `BLOCK`, 근거 없는 `PASS`, 검증하지 않은 변경이 하나라도 있으면 release는 `BLOCK`이다. 유일한 예외는 유예 규칙을 지킨 `DEFERRED` 항목이다.

`BLOCK`을 `PASS`로 바꾸려면 수정과 재확인 증거가 함께 있어야 한다. finding을 지우지 않고 원래 상태를 보존한 채 이력을 남긴다.

## Browser 실조작 검수 유예

저장소 소유자가 전체 학습 페이지를 만든 뒤 브라우저 실조작을 일괄 검수하고 피드백하기로 했다(2026-08-04 승인). 그래서 브라우저를 열 수 없다는 이유만으로 페이지를 `BLOCK`하지 않는다.

유예할 수 있는 항목은 다음 넷뿐이다. 실제 브라우저에서 사람이 조작해야만 확인되는 것들이다.

1. 키보드 이동·포커스 표시·control 조작
2. `prefers-reduced-motion` 실제 전환 동작
3. 작은 화면(320/390px)의 실제 레이아웃과 overflow
4. 실행 예제 control의 실제 조작 결과

나머지 규칙:

- 코드·CSS·마크업만 읽어도 판정할 수 있는 정적 Accessibility/Motion 판정은 유예 대상이 아니다. 평소대로 `PASS` 또는 `BLOCK`을 낸다.
- build 실패, coverage 누락, runtime/display 불일치, 구조 위반은 유예 대상이 아니다. 위 4개 밖의 항목에 `DEFERRED`를 쓰면 그 자체가 `BLOCK`이다.
- 위 항목이 전부 `DEFERRED`이고 다른 미해결 `BLOCK`이 없으면 release를 `PASS`로 판정할 수 있다.
- 이때 `releaseDecision`에 미해결 `DEFERRED` 항목을 반드시 나열한다. 판정값만 보고 완전 검수로 오해하지 않게 하기 위해서다. 소유자는 `grep -rl DEFERRED docs/handoffs/`로 일괄 검수 대상을 찾는다.
- 실조작을 하지 않았으면서 `PASS`로 적지 않는다. 확인한 사람과 날짜를 근거에 남긴다.

기술 item을 제외하거나 단순 번역으로 끝내면 각각 Official Coverage와 Learning Transformation에서 `BLOCK`한다. 페이지 유형과 무관하게 animation Hook을 강제하거나 실행 state·GSAP 호출·학습 패널을 TSX에 결합하면 Structure/Comment에서 `BLOCK`한다.
