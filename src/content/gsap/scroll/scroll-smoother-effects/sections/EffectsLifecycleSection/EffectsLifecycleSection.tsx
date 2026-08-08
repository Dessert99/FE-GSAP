/** effects discovery·refresh·removal을 P38 instance lifecycle과 분리한다. */
export function EffectsLifecycleSection() {
  return (
    <section
      id="effects-lifecycle"
      aria-labelledby="scroll-smoother-effects-lifecycle-title"
    >
      <h2 id="scroll-smoother-effects-lifecycle-title">
        04 · effects는 target별 ScrollTrigger이고, 제거도 target effect
        단위입니다
      </h2>
      <p>
        <code>effects(targets, config)</code>의 targets는 selector, element,
        array가 될 수 있습니다. config에 speed/lag를 생략하면 target의
        <code>data-speed</code>과 <code>data-lag</code>를 찾고, function value는
        <code>ScrollTrigger.refresh()</code> 때 다시 계산됩니다.
      </p>
      <p>
        P36이 소유한 create config의 <code>effects: true</code>는 rendered
        docs에서
        <code>data-lag</code> element를 자동으로 찾는다고 설명합니다. current
        source의 auto selector는 <code>data-speed</code>과 <code>data-lag</code>{' '}
        모두를 포함합니다. 여기서는 auto scan을 실행하지 않고 discovery
        boundary만 보존합니다.
      </p>
      <p>
        speed는 parallax ratio이고 lag는 natural position에 따라잡는
        seconds입니다.
        <code>speed: 'auto'</code>는 parent 안에서 가장 큰 위·아래 gap 방향으로
        움직일 거리를 계산하므로 child가 parent보다 크고 parent가 overflow를
        clip하는 조건이 필요합니다. data-speed element의 natural position은
        viewport center에서 맞습니다.
      </p>
      <p>
        method는 만든 ScrollTrigger array를 반환하고 argument 없이 호출하면 모든
        effect trigger array를 읽습니다. defaults{' '}
        <code>{'{ speed: 1, lag: 0 }'}</code>로 target effect를 제거하거나
        getter array의 trigger를 kill할 수 있습니다. smoother 전체{' '}
        <code>kill()</code>은 P38의 instance disposal ownership입니다.
      </p>
      <p>
        reduced motion에서는 <code>smooth(0)</code>과 effect removal을
        outcome으로 정합니다. 이 static page는 실제 DOM transform을 만들지
        않으므로 readable content order와 native browser scrolling을 그대로
        둡니다.
      </p>
    </section>
  )
}
