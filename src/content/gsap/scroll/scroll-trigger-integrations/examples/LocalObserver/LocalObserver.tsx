/** discriminated integration modes와 safely isolated Observer runtime을 one learning frame에 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { useLocalObserverRuntime } from './useLocalObserverRuntime'
import './LocalObserver.css'

/** native-normalize·observer·proxy ownership을 architecture diagram으로 비교한다. */
export function LocalObserver() {
  // local runtime이 소유한 target, discrete direction과 reset action을 받는다
  const { scope, targetRef, readout, resetReadout } = useLocalObserverRuntime()
  // one discriminated descriptor list가 diagram과 code selection을 함께 공급한다
  const modes = [
    {
      kind: 'native-normalize',
      execution: 'static only',
      code: 'ScrollTrigger.normalizeScroll(true)\n// cleanup: ScrollTrigger.normalizeScroll(false)',
    },
    {
      kind: 'observer',
      execution: 'actual local target',
      code: "const observer = ScrollTrigger.observe({ target, type: 'wheel,touch' })\n// cleanup: observer.kill()",
    },
    {
      kind: 'proxy',
      execution: 'static only',
      code: "ScrollTrigger.scrollerProxy(scroller, {\n  scrollTop(value) { /* getter + setter */ },\n  getBoundingClientRect() { /* measurement */ },\n  pinType: 'transform',\n})",
    },
  ] as const
  // actual runtime config와 same Observer branch를 code panel에 보여 준다
  const code = modes[1].code

  return (
    <section id='local-observer'>
      <InteractiveExample
        title='integration architecture · only local Observer runs'
        description='global native normalization과 proxy registry는 이 page에서 실행하지 않습니다. local surface의 wheel/touch direction만 actual Observer로 읽고 browser keyboard scroll은 그대로 둡니다.'
        sourcePath='src/content/gsap/scroll/scroll-trigger-integrations/examples/LocalObserver/useLocalObserverRuntime.ts'
        controls='none — native keyboard scrolling remains browser-owned'
        preview={
          <div ref={scope} className='local-observer'>
            <div
              className='local-observer__diagram'
              aria-label='integration architecture'
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
              className='local-observer__surface'
              tabIndex={0}
            >
              <strong>local Observer target</strong>
              <p>
                wheel 또는 touch input을 여기서만 읽습니다. 마지막 direction:{' '}
                <output>{readout}</output>
              </p>
              <p>
                Arrow/Page keys are not prevented; browser-native keyboard
                scrolling is preserved.
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
          'native-normalize는 page scroll owner를 JS thread로 옮기므로 static boundary만 설명합니다.',
          'Observer mode는 local target에서 actual direction observer를 만들고 cleanup에서 kill합니다.',
          'proxy는 scroll getter/setter와 measurement/pin selection을 custom scroller integration에 위임합니다.',
        ]}
        watchFor={[
          'reduced motion에서는 normalization을 절대 force하지 않습니다.',
          'proxy registry는 local scroll/listener restoration contract 없이 실행하지 않습니다.',
          'continuous delta/live progress를 announce하지 않습니다.',
        ]}
        explanation={
          <p>
            세 mode는 interchangeability가 아닙니다. normalizeScroll은 browser
            page scroll interception, observe는 input sensing, scrollerProxy는
            ScrollTrigger의 scroll/measurement adapter입니다.
          </p>
        }
        onReplay={resetReadout}
        replayLabel='direction readout 초기화'
      />
    </section>
  )
}
