/** exclusive ScrollTrigger motion modes를 실제 runtime과 같은 descriptor로 표시한다. */
import { useState } from 'react'
import { type MotionMode, useMotionModeRuntime } from './useMotionModeRuntime'
import './MotionModeLab.css'

/** 한 mode만 실행해 scrub·batch·snap의 cleanup 경계를 비교한다. */
export function MotionModeLab() {
  // scrub·batch·snap 중 actual runtime에 넘길 하나의 mode만 보존한다
  const [mode, setMode] = useState<MotionMode>('scrub')
  // runtime과 code가 공유할 scope, 결과, motion branch, descriptor를 받는다
  const { scope, result, reducedMotion, descriptor } =
    useMotionModeRuntime(mode)
  // reduced-motion branch도 actual reveal call을 그대로 직렬화한다
  const code = reducedMotion
    ? `gsap.set(items, { autoAlpha: 1, x: 0, y: 0 })`
    : mode === 'scrub'
      ? `const trigger = gsap.to(item, { x: 48, scrollTrigger: { scrub: ${descriptor.scrub.scrub} } }).scrollTrigger\ntrigger.getTween(); trigger.getVelocity()`
      : mode === 'batch'
        ? `ScrollTrigger.batch(items, { interval: ${descriptor.batch.interval}, batchMax: ${descriptor.batch.batchMax} })`
        : `const snap = ScrollTrigger.snapDirectional(${descriptor.snap.increment})\nScrollTrigger.create({ trigger: section, snap: { snapTo: (value, self) => snap(value, self.direction) } })`
  return (
    <section
      ref={scope}
      className='motion-mode-lab'
      aria-labelledby='motion-mode-title'
    >
      <h2 id='motion-mode-title'>하나의 motion mode만 실행합니다</h2>
      <label>
        mode{' '}
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as MotionMode)}
        >
          <option value='scrub'>scrub</option>
          <option value='batch'>batch</option>
          <option value='snap'>snap</option>
        </select>
      </label>
      <div className='motion-mode-lab__items'>
        {['one', 'two', 'three'].map((item) => (
          <p key={item} className='motion-mode-lab__item'>
            {item}
          </p>
        ))}
      </div>
      <p role='status'>{result}</p>
      {reducedMotion && (
        <p>
          모션 감소에서는 scroll animation을 만들지 않고 content를 reveal합니다.
        </p>
      )}
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  )
}
