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

미해결 `BLOCK`, 근거 없는 `PASS`, 검증하지 않은 변경이 하나라도 있으면 release review는 `BLOCK`이다.

## 독립성 규칙

- Source Curator와 Content Architect는 구현 전에 계약을 고정하며 구현자가 누락 범위를 임의로 줄이지 못하게 한다.
- 구현 후 전문가는 구현을 수정하지 않고 배정된 관점의 finding만 독립적으로 작성한다. 다른 전문가의 결론을 대신하거나 합의로 판정을 합치지 않는다.
- Integrator는 finding을 수정하거나 삭제하지 않고 구현과 해결 근거만 추가한다.
- Independent Release Reviewer는 구현자, Integrator, 앞선 전문 검수자와 겸임하지 않는다.

기술 item을 제외하거나 단순 번역으로 끝내면 각각 Official Coverage와 Learning Transformation에서 `BLOCK`한다. 페이지 유형과 무관하게 animation Hook을 강제하거나 실행 state·GSAP 호출·학습 패널을 TSX에 결합하면 Structure/Comment에서 `BLOCK`한다.
