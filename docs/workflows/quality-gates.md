# GSAP 학습 페이지 품질 게이트

검수는 같은 source manifest와 구현 diff를 기준으로 하되 역할을 분리한다.

## 역할과 순서

1. **Source Curator** — 구현 전에 공식 페이지의 모든 기술 내용을 source manifest로 확정하고 비기술 영역만 제외한다.
2. **Content Architect** — 구현 전에 페이지 모듈, coverage mapping, 초보자 어휘·멘탈 모델과 예제 목표를 승인한다.
3. **구현 후 독립 전문가**
   - **Official Coverage** — manifest의 모든 기술 항목이 명세·섹션·예제·warning에 연결됐는지 확인한다.
   - **Learning Transformation** — 단순 번역·요약이 아니라 전제 지식·단계·관찰·원리·사용처·주의점으로 재구성됐는지 확인한다.
   - **Runtime/Display Sync** — 실행 예제가 있을 때 controls, 정규화 config, GSAP 호출, 관찰 상태, 표시 코드가 같은 runtime state에서 파생되는지 확인한다.
   - **Pedagogy** — 용어 정의, 한 대상·한 변화, 목표·조작·관찰·원리·사용처·주의점의 학습 흐름을 확인한다.
   - **Structure/Comment** — 페이지·섹션·컴포넌트·예제별 실행 source 경계와 한 줄 한국어 주석 규칙을 확인한다.
   - **Accessibility/Motion** — 인터랙티브 UI가 있을 때 키보드·레이블·상태 전달, 작은 화면, `prefers-reduced-motion`과 대체 상태를 확인한다.
   - **Build/Integration** — TypeScript·Vite 빌드, Storybook 빌드, 라우팅·스타일·브라우저 동작을 확인한다.
4. **Cross-page Consistency** — 둘 이상의 공식 페이지를 작업할 때 용어, 관련 링크, 선행 학습, 중복 설명의 소유권을 확인한다.
5. **Integrator fix loop** — Integrator만 구현을 수정한다. `BLOCK`을 해결한 뒤 영향받은 독립 전문가에게 재검수를 요청하고, 해결 증거를 finding에 연결한다.
6. **Independent Release Reviewer** — 구현과 fix loop에 참여하지 않은 검수자가 두 최상위 조건, 모든 finding과 검증 증거를 대조해 최종 `PASS` 또는 `BLOCK`을 판정한다.

## Finding 계약

각 검수자는 역할별 판정과 함께 `ID`, `상태`, `근거(파일·행 또는 실행 결과)`, `영향`, `필수 조치`를 기록한다.

- `PASS`: 담당 범위에 release를 막는 문제가 없으며 확인 근거가 있다.
- `BLOCK`: 공식 기술 내용 누락, 단순 번역·요약, runtime/display 불일치, 페이지 유형과 맞지 않는 실행 구조, 접근성·motion 결함, build 실패처럼 release 전에 반드시 고쳐야 한다.
- `ADVISORY`: 현재 계약과 release를 막지는 않지만 후속 개선 가치가 있다. `BLOCK`을 advisory로 낮추려면 해당 전문 검수자의 재판정이 필요하다.
- `ADDRESSED`: Integrator가 고쳤고 해당 검수자의 재판정을 기다리는 상태다. 원래 상태와 해결 근거를 함께 남기며, 재검수 전에는 `PASS`로 취급하지 않는다.
- `DEFERRED`: 아래 [Browser 실조작 검수 유예](#browser-실조작-검수-유예)가 열거한 항목에만 쓴다. 그 밖의 어떤 검수도 이 상태로 미루지 않는다.

미해결 `BLOCK`, 근거 없는 `PASS`, 검증하지 않은 변경이 하나라도 있으면 release review는 `BLOCK`이다. 유일한 예외는 유예 규칙을 지킨 `DEFERRED` 항목이다.

`BLOCK`을 `PASS`로 바꾸는 것은 해당 검수자의 재검수 결과로만 가능하다. Integrator가 직접 바꾸지 않는다.

## Browser 실조작 검수 유예

저장소 소유자가 전체 학습 페이지를 만든 뒤 브라우저 실조작을 일괄 검수하고 피드백하기로 했다(2026-08-04 승인). 그래서 브라우저를 열 수 없다는 이유만으로 페이지를 `BLOCK`하지 않는다.

유예할 수 있는 항목은 다음 넷뿐이다. 실제 브라우저에서 사람이 조작해야만 확인되는 것들이다.

1. 키보드 이동·포커스 표시·control 조작
2. `prefers-reduced-motion` 실제 전환 동작
3. 작은 화면(320/390px)의 실제 레이아웃과 overflow
4. 실행 예제 control의 실제 조작 결과

나머지 규칙:

- 코드·CSS·마크업만 읽어도 판정할 수 있는 정적 Accessibility/Motion 검수는 유예 대상이 아니다. 평소대로 `PASS` 또는 `BLOCK`을 낸다.
- build 실패, coverage 누락, runtime/display 불일치, 구조 위반은 유예 대상이 아니다. 위 4개 밖의 항목에 `DEFERRED`를 쓰면 그 자체가 `BLOCK`이다.
- 위 항목이 전부 `DEFERRED`이고 다른 미해결 `BLOCK`이 없으면 Independent Release Reviewer는 `PASS`를 낼 수 있다.
- 이때 `releaseDecision`에 미해결 `DEFERRED` 항목을 반드시 나열한다. 판정값만 보고 완전 검수로 오해하지 않게 하기 위해서다. 소유자는 `grep -rl DEFERRED docs/handoffs/`로 일괄 검수 대상을 찾는다.
- 실조작을 하지 않았으면서 `PASS`로 적지 않는다. 확인한 사람과 날짜를 근거에 남긴다.

## Codex 독립 검수

구현자와 검수자가 같은 컨텍스트면 자기 코드를 자기가 통과시키게 되므로, 구현 후 전문 검수는 Codex CLI에 맡겨 실제로 다른 컨텍스트에서 판정하게 한다.

- **검수 단위는 학습 페이지 하나다.** handoff·coverage map·release 판정이 모두 페이지 단위이고, 여러 페이지를 묶으면 diff가 커져 검수 정확도가 떨어진다.
- 커밋 전에 작업 트리 상태로 검수를 요청한다. `-s read-only`로 검수자가 구현을 고칠 수 없게 막는다.

  ```bash
  handoff="docs/handoffs/gsap/core/easing.md"
  # 읽기에 실패하면 일반 코드 리뷰가 정상 검수처럼 기록되므로 여기서 즉시 중단한다
  handoffText=$(cat "$handoff") || { echo "handoff를 읽지 못했다: $handoff" >&2; exit 1; }

  # 경로만 주면 검수자가 실제로 읽었는지 보장할 수 없어 내용을 stdin으로 직접 주입한다
  printf '%s' "$handoffText" | codex exec -s read-only -o /tmp/review-coverage.md "당신은 이 레포의 독립 검수자다. 구현을 수정하지 말고 Official Coverage 관점만 판정한다.
  고정된 계약은 stdin으로 준 $handoff 의 전체 내용이다.
  읽을 계약 문서: AGENTS.md, docs/workflows/source-coverage.md, docs/workflows/quality-gates.md
  handoff의 sourceManifest 모든 항목이 coverageMap에서 로컬 근거에 연결됐는지 대조하고,
  각 finding을 [ID, 상태, 근거 파일:행, 영향, 필수조치] 형식으로 한국어로 쓴다.
  근거에는 handoff의 sourceItemId를 그대로 인용한다."
  ```

- 돌아온 finding이 handoff의 `sourceItemId`를 하나도 인용하지 않으면 검수자가 계약을 읽지 않은 것으로 보고 결과를 버린 뒤 다시 실행한다.

- **관점마다 별도 실행을 쓴다.** Official Coverage, Learning Transformation, Runtime/Display Sync, Structure/Comment, 정적 Accessibility/Motion을 한 번에 시키지 않는다. 한 실행이 여러 관점을 겸하면 독립성 규칙이 깨지고 관점별 판정 근거도 섞인다.
- **최종 release 검수는 또 다른 새 실행으로 한다.** 앞선 관점 검수와 같은 실행에서 release를 판정하지 않는다.
- 각 실행이 어떤 관점을 맡았는지 handoff의 `reviewAssignments`에 남긴다.
- 프롬프트에는 handoff 경로, 단일 검수 관점, 계약 문서 경로를 실제 문자열로 넣는다. 관점을 지정하지 않으면 일반 코드 리뷰가 돌아와 Official Coverage와 Learning Transformation을 판정하지 못한다.
- 받은 finding은 handoff의 `findings` 표에 `CDX-` 접두 ID로 기록한다. 고친 항목은 원래 상태를 보존한 채 `ADDRESSED`와 해결 근거를 남기고, 받아들이지 않은 항목은 이유를 남기고 그대로 둔다. finding을 지우지 않는다.
- 수정 후 해당 관점을 새 실행으로 재검수하고, 미해결 `BLOCK`이 없을 때 release를 판정한다.
- Codex가 프로젝트 계약이 아니라 일반 관행을 근거로 지적하면 그대로 따르지 않는다. `AGENTS.md`와 `docs/workflows/`가 우선이며, 판단 근거를 finding에 남긴다.

## 독립성 규칙

- Source Curator와 Content Architect는 구현 전에 계약을 고정하며 구현자가 누락 범위를 임의로 줄이지 못하게 한다.
- 구현 후 전문가는 구현을 수정하지 않고 배정된 관점의 finding만 독립적으로 작성한다. 다른 전문가의 결론을 대신하거나 합의로 판정을 합치지 않는다.
- Integrator는 finding을 수정하거나 삭제하지 않고 구현과 해결 근거만 추가한다.
- Independent Release Reviewer는 구현자, Integrator, 앞선 전문 검수자와 겸임하지 않는다.

기술 item을 제외하거나 단순 번역으로 끝내면 각각 Official Coverage와 Learning Transformation에서 `BLOCK`한다. 페이지 유형과 무관하게 animation Hook을 강제하거나 실행 state·GSAP 호출·학습 패널을 TSX에 결합하면 Structure/Comment에서 `BLOCK`한다.
