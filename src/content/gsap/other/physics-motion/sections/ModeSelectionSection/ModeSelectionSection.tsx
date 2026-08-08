/** 두 plugin이 해결하는 입력 모양을 먼저 구분한다. */
/** Physics2D와 PhysicsProps의 선택 기준을 설명한다. */
export function ModeSelectionSection() {
  return (
    <section aria-labelledby="physics-mode-title">
      <h2 id="physics-mode-title">한 발사 벡터인가, property별 값인가?</h2>
      <p>
        <code>physics2D</code>는 velocity와 angle을 x/y 벡터로 바꾸고 gravity
        또는 acceleration을 더합니다. 포물선처럼 한 대상의 두 좌표를 함께 시작할
        때 고릅니다.
      </p>
      <p>
        <code>physicsProps</code>는 <code>x</code>, <code>y</code>처럼 각
        numeric property에 velocity·acceleration·friction을 따로 둡니다. 방향
        각도가 아니라 property마다 다른 값을 정해야 할 때 고릅니다.
      </p>
    </section>
  )
}
