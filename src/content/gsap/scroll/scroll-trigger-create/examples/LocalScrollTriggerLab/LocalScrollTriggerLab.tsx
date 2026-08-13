/** 하나의 local ScrollTrigger 생성과 vars inspector를 shared learning frame에 조립한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { scrollTriggerCreateProperties } from '../../scroll-trigger-create.properties'
import {
  getConfigBoundary,
  useLocalScrollTriggerRuntime,
} from './useLocalScrollTriggerRuntime'
import './LocalScrollTriggerLab.css'

/** local scroller를 native scroll하며 create config와 measured instance를 함께 읽는다. */
export function LocalScrollTriggerLab() {
  // runtime이 actual create와 code/preview를 공유하는 descriptor와 local owner refs를 제공한다
  const {
    scope,
    scrollerRef,
    triggerRef,
    followerRef,
    descriptor,
    snapshot,
    reducedMotion,
    refreshSnapshot,
  } = useLocalScrollTriggerRuntime()
  // 표시 code는 현재 descriptor와 runtime이 실제 호출하는 API만 직렬화한다
  const code = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const setup = () => {
  const localScroller = document.querySelector('.local-scroll-trigger-lab__scroller')
  const triggerElement = document.querySelector('.local-scroll-trigger-lab__trigger')
  const follower = document.querySelector('.local-scroll-trigger-lab__follower')
  if (!localScroller || !triggerElement || !follower) {
    throw new Error('local scroller, trigger, follower가 필요합니다.')
  }
  const previousDefaults = { ...ScrollTrigger.defaults({}) }
  ScrollTrigger.defaults({ toggleActions: '${descriptor.defaults.toggleActions}' })

  const tween = gsap.to(follower, { x: ${reducedMotion ? 0 : 96}, duration: ${reducedMotion ? 0 : 0.5}, ease: 'none', paused: true })
  const trigger = ScrollTrigger.create({
    trigger: triggerElement,
    scroller: localScroller,
    start: '${descriptor.start}',
    end: '${descriptor.end}',
    toggleActions: '${descriptor.toggleActions}',
    scrub: ${descriptor.scrub},
    pin: ${descriptor.pin ? 'triggerElement' : 'false'},
    markers: ${descriptor.markers},
    animation: tween,
  })

  trigger.refresh()
  console.log(trigger.vars)
  return () => {
    trigger.kill(true)
    tween.kill()
    gsap.set(follower, { clearProps: 'transform' })
    ScrollTrigger.defaults({ toggleActions: previousDefaults.toggleActions })
  }
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.

// snap은 생략하며 현재 설정 값은 ${descriptor.snap}다.

${getConfigBoundary(descriptor)}`
  // inspector row는 descriptor만 다시 쓰지 않고 actual instance에서 읽는다
  const rows = Object.entries(snapshot)

  return (
    <InteractiveExample
      title='local scroller · create then measure'
      description='이 container만 native scroll하세요. create 뒤 refresh가 start/end를 px로 계산하고 marker와 vars가 그 instance를 드러냅니다.'
      sourcePath='src/content/gsap/scroll/scroll-trigger-create/examples/LocalScrollTriggerLab/useLocalScrollTriggerRuntime.ts'
      reducedMotion={reducedMotion}
      onReplay={refreshSnapshot}
      replayLabel='측정 다시 하기'
      controls={
        <p>
          <code>markers: true</code>는 development marker를,{' '}
          <code>trigger.vars</code>는 create config를 보여 줍니다.
        </p>
      }
      preview={
        <div ref={scope} className='local-scroll-trigger-lab'>
          <div
            ref={scrollerRef}
            className='local-scroll-trigger-lab__scroller'
            tabIndex={0}
            aria-label='ScrollTrigger local scroller'
          >
            <div className='local-scroll-trigger-lab__spacer'>
              native local scroll 시작
            </div>
            <div ref={triggerRef} className='local-scroll-trigger-lab__trigger'>
              <p>
                trigger · {descriptor.start} → {descriptor.end}
              </p>
              <div
                ref={followerRef}
                className='local-scroll-trigger-lab__follower'
              >
                {reducedMotion
                  ? 'reduced motion · scrub / pin off'
                  : '이 예제의 follower · scrub / pin on'}
              </div>
            </div>
            <div className='local-scroll-trigger-lab__spacer'>
              native local scroll 끝
            </div>
          </div>
          <div className='local-scroll-trigger-lab__inspector'>
            <h4>frozen instance.vars inspector</h4>
            <table>
              <tbody>
                {rows.map(([name, value]) => (
                  <tr key={name}>
                    <th scope='row'>{name}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      code={code}
      propertyDetails={scrollTriggerCreateProperties.map(
        ([name, type, defaultValue, acceptedValues]) => ({
          name,
          type,
          defaultValue,
          acceptedValues,
        }),
      )}
      changes={[
        'create()는 animation에 직접 붙이지 않은 standalone instance를 반환합니다.',
        'start/end string은 creation과 refresh에서 local scroller의 numeric position으로 계산됩니다.',
        'reduced motion에서는 native local scroll을 유지하고 scrub·pin 이동만 끕니다.',
      ]}
      watchFor={[
        'marker는 start/end를 점검할 때만 켜고 실제 화면에서는 끕니다.',
        'pinned trigger 자체가 아니라 안쪽 follower만 tween합니다.',
        'unmount/rebuild는 이 예제가 만든 trigger·tween을 kill하고 pin style과 defaults key를 복원합니다.',
      ]}
      explanation={
        <p>
          <code>defaults()</code>는 vars에 없는 creation value만 채우고,{' '}
          <code>config()</code>는 global behavior를 바꿉니다. public config
          getter가 없으므로 이 local 예제는 config를 바꾸지 않습니다. application은
          자신이 설정한 이전 값을 보관해 복원해야 합니다.
        </p>
      }
    />
  )
}
