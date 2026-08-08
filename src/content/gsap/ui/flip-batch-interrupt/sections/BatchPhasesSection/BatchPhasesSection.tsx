/** batch가 state capture와 mutation을 분리하는 순서를 설명한다. */
export function BatchPhasesSection() {
  return (
    <section>
      <h2>02 · batch phases</h2>
      <p>
        모든 getState 뒤 setState, animate를 실행해 여러 component의 capture가
        오염되지 않습니다.
      </p>
    </section>
  )
}
