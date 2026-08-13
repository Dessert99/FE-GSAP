/** physics tween의 unit, ease, collision 경계를 분명히 남긴다. */
/** physics plugin을 물리 엔진으로 오해하지 않게 하는 경계다. */
export function BoundariesSection() {
  return (
    <section aria-labelledby="physics-boundaries-title">
      <h2 id="physics-boundaries-title">시간 단위와 물리 엔진의 경계</h2>
      <ul>
        <li>
          Physics2D의 velocity는 pixels per time unit이고 gravity/acceleration은
          pixels per second입니다.
        </li>
        <li>
          PhysicsProps의 velocity와 acceleration은 대상 property의 unit per
          second입니다.
        </li>
        <li>
          두 physics property는 tween의 ease를 무시하고 physics parameter가
          움직임을 결정합니다.
        </li>
        <li>
          friction은 0–1의 편의 효과이고 계산 비용이 더 들며, 이 plugin들은
          collision detection을 제공하지 않습니다.
        </li>
        <li>
          physics parameter는 tween 중 동적으로 바꾸지 않습니다. 새 tween을
          만들거나 timeline을 reverse해 같은 경로를 되짚습니다.
        </li>
      </ul>
    </section>
  )
}
