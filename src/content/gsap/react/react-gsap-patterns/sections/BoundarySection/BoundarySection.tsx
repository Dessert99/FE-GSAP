/** React render state와 imperative GSAP work의 경계를 정리한다. */
/** late event와 declarative rendering이 만나는 지점을 설명한다. */
export function BoundarySection() {
  return (
    <section aria-labelledby="react-pattern-boundary-title">
      <h2 id="react-pattern-boundary-title">
        React는 무엇을 그리고, GSAP은 무엇을 하나요?
      </h2>
      <p>
        React state는 button label과 list item처럼 semantic structure를
        결정합니다. GSAP은 이미 존재하는 scoped DOM의 transform/opacity와
        late-event effect를 맡습니다. exiting element를 제거하거나 layout
        shift를 부드럽게 하는 orchestration은 이 focused page의 범위 밖입니다.
      </p>
      <p>
        반복되는 resource logic은 custom hook이나 reusable component로 추출할 수
        있지만, 다른 component의 selector를 전역으로 선택하지 않습니다. late
        callback이 새 tween을 만들면 <code>contextSafe</code>로 Context
        cleanup에 기록해야 합니다.
      </p>
    </section>
  )
}
