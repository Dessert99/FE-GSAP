/** exclusive ScrollTrigger motion modes를 실제 runtime과 같은 descriptor로 표시한다. */
import { useState } from 'react'
import { type MotionMode, useMotionModeRuntime } from './useMotionModeRuntime'
import './MotionModeLab.css'

/** 한 mode만 실행해 scrub·batch·snap의 cleanup 경계를 비교한다. */
export function MotionModeLab() {
  // scrub·batch·snap 중 actual runtime에 넘길 하나의 mode만 보존한다
  const [mode, setMode] = useState<MotionMode>('scrub')
  // runtime과 code가 공유할 scope, 결과, motion branch, descriptor를 받는다
  const { scope, scrollerRef, result, reducedMotion, descriptor } =
    useMotionModeRuntime(mode)
  // reduced-motion branch와 선택 mode의 실제 호출만 setup 안에 넣는다
  const modeCode = reducedMotion
    ? `gsap.set(items, { autoAlpha: 1, x: 0, y: 0 })`
    : mode === 'scrub'
      ? `const trigger = gsap.to(items[0], { x: 48, scrollTrigger: { trigger: items[0], scroller, scrub: ${descriptor.scrub.scrub} } }).scrollTrigger
trigger?.getTween(); trigger?.getVelocity()`
      : mode === 'batch'
        ? `gsap.set(items, { autoAlpha: 0, y: 24 })
batchTriggers = ScrollTrigger.batch(items, {
  scroller,
  interval: ${descriptor.batch.interval},
  batchMax: ${descriptor.batch.batchMax},
  onEnter: (enteredItems) => gsap.to(enteredItems, { autoAlpha: 1, y: 0 }),
})`
        : `const snap = ScrollTrigger.snapDirectional(${descriptor.snap.increment})
ScrollTrigger.create({
  trigger: items[0],
  scroller,
  snap: { snapTo: (value, self) => snap(value, self?.direction ?? 1) },
})`
  // plugin 등록부터 scoped selector와 Context cleanup까지 독립 실행 흐름으로 표시한다
  const code = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const setup = () => {
  const scroller = document.querySelector('.motion-mode-lab__items')
  if (!scroller) throw new Error('motion scroller가 필요합니다.')
  const items = gsap.utils.toArray('.motion-mode-lab__item', scroller)
  if (!items.length) throw new Error('motion item이 필요합니다.')
  let batchTriggers = []
  const context = gsap.context(() => {
    ${modeCode.replaceAll('\n', '\n    ')}
  }, scroller)
  return () => {
    batchTriggers.forEach((trigger) => trigger.kill())
    gsap.killTweensOf(items)
    context.revert()
  }
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`
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
      <div
        ref={scrollerRef}
        className='motion-mode-lab__items'
        tabIndex={0}
        aria-label='ScrollTrigger motion local scroller'
      >
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
