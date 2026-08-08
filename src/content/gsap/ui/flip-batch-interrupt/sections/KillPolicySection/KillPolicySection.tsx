/** 새 action 전 충돌 target만 완료/kill하는 정책을 설명한다. */
export function KillPolicySection() {
  return (
    <section>
      <h2>04 · kill policy</h2>
      <p>
        새 action 전 active target에만 <code>Flip.killFlipsOf(target)</code>를
        적용합니다.
      </p>
    </section>
  )
}
