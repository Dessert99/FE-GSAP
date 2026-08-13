/** 세 integration 방식과 local Observer 실행 결과를 한 화면에 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { useLocalObserverRuntime } from './useLocalObserverRuntime'
import './LocalObserver.css'

/** native normalization·observer·proxy의 역할과 실행 범위를 비교한다. */
export function LocalObserver() {
  // local runtime이 소유한 target, discrete direction과 reset action을 받는다
  const { scope, targetRef, readout, resetReadout } = useLocalObserverRuntime()
  // one discriminated descriptor list가 diagram과 code selection을 함께 공급한다
  const modes = [
    {
      kind: 'native-normalize',
      execution: '호출 형태만 표시',
      code: "import gsap from 'gsap'\nimport { ScrollTrigger } from 'gsap/ScrollTrigger'\n\ngsap.registerPlugin(ScrollTrigger)\nScrollTrigger.normalizeScroll(true)\n// 페이지를 떠날 때 호출\nconst restoreNativeScroll = () => ScrollTrigger.normalizeScroll(false)",
    },
    {
      kind: 'observer',
      execution: 'local target에서 실행',
      code: `import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const target = document.querySelector('.local-observer-surface')
if (!target) throw new Error('target이 필요합니다.')
const reportDirection = (direction) => console.log(direction)

const observer = ScrollTrigger.observe({
  target,
  type: 'wheel,touch',
  preventDefault: false,
  onUp: () => reportDirection('up'),
  onDown: () => reportDirection('down'),
})

// component cleanup
const cleanup = () => observer.kill()`,
    },
    {
      kind: 'proxy',
      execution: '호출 형태만 표시',
      code: `import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const scroller = document.querySelector('.custom-scroller')
if (!scroller) throw new Error('scroller가 필요합니다.')

ScrollTrigger.scrollerProxy(scroller, {
  scrollTop(value) {
    if (arguments.length) scroller.scrollTop = value
    return scroller.scrollTop
  },
  getBoundingClientRect: () => ({ top: 0, left: 0, width: innerWidth, height: innerHeight }),
  pinType: 'transform',
})`,
    },
  ] as const
  // actual runtime config와 same Observer branch를 code panel에 보여 준다
  const code = modes[1].code

  return (
    <section id='local-observer'>
      <InteractiveExample
        title='integration 비교 · local Observer만 실행'
        description='native normalization과 proxy registry는 이 페이지에서 실행하지 않습니다. local surface의 wheel/touch direction만 Observer로 읽고 키보드 scroll은 그대로 둡니다.'
        sourcePath='src/content/gsap/scroll/scroll-trigger-integrations/examples/LocalObserver/useLocalObserverRuntime.ts'
        controls='별도 control 없음 — 키보드 scrolling은 browser 기본 동작을 유지합니다.'
        preview={
          <div ref={scope} className='local-observer'>
            <div
              className='local-observer__diagram'
              aria-label='integration 방식 비교'
            >
              {modes.map((mode) => (
                <article key={mode.kind}>
                  <h3>{mode.kind}</h3>
                  <p>{mode.execution}</p>
                  <pre>
                    <code>{mode.code}</code>
                  </pre>
                </article>
              ))}
            </div>
            <div
              ref={targetRef}
              className='local-observer-surface local-observer__surface'
              tabIndex={0}
            >
              <strong>local Observer target</strong>
              <p>
                wheel 또는 touch input을 여기서만 읽습니다. 마지막 direction:{' '}
                <output>{readout}</output>
              </p>
              <p>
                Arrow/Page 키를 막지 않으므로 browser 기본 keyboard scrolling을
                유지합니다.
              </p>
            </div>
          </div>
        }
        code={code}
        propertyDetails={[
          {
            name: 'normalizeScroll',
            type: 'Boolean | Object | Observer',
            defaultValue: 'native scrolling by default',
            acceptedValues:
              'true enable · false disable · object observer options',
          },
          {
            name: 'observe',
            type: 'ObserverVars → Observer',
            defaultValue: 'not applicable',
            acceptedValues: 'target · type · directional callbacks',
          },
          {
            name: 'scrollerProxy',
            type: 'scroller, vars',
            defaultValue: 'not applicable',
            acceptedValues:
              'scrollTop or scrollLeft required; rect/size/pinType optional',
          },
        ]}
        changes={[
          'native-normalize는 page scroll 처리를 JS thread로 옮기므로 호출 형태만 설명합니다.',
          'Observer mode는 local target에서 direction observer를 만들고 cleanup에서 kill합니다.',
          'proxy는 scroll getter/setter와 measurement/pin selection을 custom scroller integration에 위임합니다.',
        ]}
        watchFor={[
          'reduced motion에서는 normalization을 절대 force하지 않습니다.',
          'proxy는 custom scroller의 getter/setter와 cleanup 방식을 정한 뒤 적용합니다.',
          'continuous delta/live progress를 announce하지 않습니다.',
        ]}
        explanation={
          <p>
            세 방식은 서로 바꿔 쓸 수 없습니다. normalizeScroll은 browser page
            scroll을 JS thread에서 처리하고, observe는 input을 감지하며,
            scrollerProxy는 ScrollTrigger에 scroll/measurement 방식을 제공합니다.
          </p>
        }
        onReplay={resetReadout}
        replayLabel='direction readout 초기화'
      />
    </section>
  )
}
