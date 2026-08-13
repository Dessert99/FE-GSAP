/** local ScrollToPlugin destination과 config lifecycle을 조작 가능한 panel로 표시한다. */
import { useEffect } from 'react'
import { useLocalScrollRuntime } from './useLocalScrollRuntime'
import './LocalScrollLab.css'

/** 한 local scroll target의 tween·autoKill·reduced-motion 경계를 가르친다. */
export function LocalScrollLab() {
  // runtime의 동일 descriptor와 action 결과를 display가 소비한다
  const { containerRef, reducedMotion, status, scroll, cleanup, descriptor } =
    useLocalScrollRuntime()
  // unmount에서 owned tween과 변경한 global config를 항상 복원한다
  useEffect(() => cleanup, [])
  // 실제 runtime descriptor만 code 문법으로 직렬화한다
  const code = reducedMotion
    ? `const setup = () => {
  const container = document.querySelector('.local-scroll-lab__viewport')
  if (!container) throw new Error('local scroll container가 필요합니다.')
  container.scrollTop = container.scrollHeight - container.clientHeight - ${descriptor.offsetY}
  return () => undefined
}

const cleanup = setup()
// 이 분기는 listener나 tween을 만들지 않으므로 cleanup은 추가 작업이 없습니다.`
    : `import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const setup = () => {
  const container = document.querySelector('.local-scroll-lab__viewport')
  if (!container) throw new Error('local scroll container가 필요합니다.')
  const globalConfig = gsap.config()
  const previous = {
    autoKill: globalConfig.autoKill,
    autoKillThreshold: globalConfig.autoKillThreshold,
    hadAutoKill: Object.hasOwn(globalConfig, 'autoKill'),
    hadAutoKillThreshold: Object.hasOwn(globalConfig, 'autoKillThreshold'),
  }

  ScrollToPlugin.config({
    autoKill: ${descriptor.autoKill},
    autoKillThreshold: ${descriptor.autoKillThreshold},
  })
  const tween = gsap.to(container, {
    duration: ${descriptor.duration},
    scrollTo: {
      y: '${descriptor.target}',
      offsetY: ${descriptor.offsetY},
      autoKill: ${descriptor.autoKill},
      onAutoKill: () => console.log('사용자 scroll이 tween을 멈췄습니다.'),
    },
    onComplete: () => console.log('local max 목적지에 도착했습니다.'),
  })

  return () => {
    tween.kill()
    if (previous.hadAutoKill) globalConfig.autoKill = previous.autoKill
    else delete globalConfig.autoKill
    if (previous.hadAutoKillThreshold) globalConfig.autoKillThreshold = previous.autoKillThreshold
    else delete globalConfig.autoKillThreshold
  }
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`
  return (
    <section
      className='local-scroll-lab'
      aria-labelledby='local-scroll-lab-title'
    >
      <h2 id='local-scroll-lab-title'>local element를 max 목적지로 보냅니다</h2>
      <p>
        window 대신 이 작은 container만 target입니다. 버튼은 focus를 옮기지 않고
        scroll 위치만 바꿉니다.
      </p>
      <div
        ref={containerRef}
        className='local-scroll-lab__viewport'
        tabIndex={0}
      >
        <p>
          start · x/y는 number·element·string 또는 <code>'max'</code>를 받을 수
          있습니다.
        </p>
        <p>offsetY는 목적지에서 남길 pixel 간격입니다.</p>
        <p>
          사용자가 별도 scroll하면 autoKill과 threshold가 tween을 멈추게 합니다.
        </p>
        <p>destination · max</p>
      </div>
      <button type='button' onClick={scroll}>
        max로 이동
      </button>
      <p role='status'>{status}</p>
      <pre>
        <code>{code}</code>
      </pre>
      <p>
        무엇을 보나요? tween 중 local container를 직접 scroll해 autoKill 경계를
        확인하세요. reduced motion에서는 같은 계산의 native 즉시 scroll을
        사용합니다.
      </p>
    </section>
  )
}
