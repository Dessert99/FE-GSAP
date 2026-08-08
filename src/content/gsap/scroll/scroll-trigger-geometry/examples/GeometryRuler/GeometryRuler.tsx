/** actual local ScrollTrigger calls와 frozen geometry table을 one ruler frame에 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { scrollTriggerGeometryProperties } from '../../scroll-trigger-geometry.properties'
import { useGeometryRulerRuntime } from './useGeometryRulerRuntime'
import './GeometryRuler.css'

/** local scroll ruler에서 start/end와 owner fields를 request snapshot으로 비교한다. */
export function GeometryRuler() {
  // runtime이 소유한 refs, one descriptor, sparse snapshot, motion state와 capture action을 받는다
  const {
    scope,
    scrollerRef,
    triggerRef,
    pinRef,
    descriptor,
    snapshot,
    reducedMotion,
    captureSnapshot,
  } = useGeometryRulerRuntime()
  // same descriptor와 actual API names를 code panel에 문법으로만 직렬화한다
  const code = `const timeline = gsap.timeline({ paused: true })
  .addLabel('${descriptor.markerLabel}')
  .to({}, { duration: 1 })
const trigger = ScrollTrigger.create({
  trigger: triggerElement,
  scroller: rulerElement,
  start: '${descriptor.start}',
  end: '${descriptor.end}',
  pin: ${reducedMotion ? 'false' : 'pinElement'},
  animation: ${reducedMotion ? 'undefined' : 'timeline'},
})

trigger.animation; trigger.direction; trigger.start; trigger.end; trigger.isActive
trigger.labelToScroll('${descriptor.markerLabel}'); trigger.pin; trigger.progress
const position = trigger.scroll(); trigger.scroll(position)
trigger.scroller; trigger.trigger
ScrollTrigger.isInViewport(triggerElement); ScrollTrigger.maxScroll(rulerElement)
ScrollTrigger.positionInViewport(triggerElement, 'center')`

  // sparse snapshot rows are calculated in the runtime and never use a live region
  const rows = Object.entries(snapshot)

  // controls, local scroll surface, frozen table, code, property reference를 shared learning shell로 묶는다
  return (
    <section id='geometry-ruler'>
      <InteractiveExample
        title='local scroll ruler · capture one geometry snapshot'
        description='ruler 안을 native scroll한 뒤 snapshot을 누르세요. table은 요청한 순간만 읽으므로 progress를 계속 announce하지 않습니다.'
        sourcePath='src/content/gsap/scroll/scroll-trigger-geometry/examples/GeometryRuler/useGeometryRulerRuntime.ts'
        reducedMotion={reducedMotion}
        controls={
          <button type='button' onClick={captureSnapshot}>
            현재 geometry 고정
          </button>
        }
        preview={
          <div ref={scope} className='geometry-ruler'>
            <div
              ref={scrollerRef}
              className='geometry-ruler__scroller'
              tabIndex={0}
              aria-label='local scroll ruler'
            >
              <div className='geometry-ruler__spacer'>scroll start</div>
              <div ref={triggerRef} className='geometry-ruler__trigger'>
                trigger · {descriptor.start} → {descriptor.end}
              </div>
              <div ref={pinRef} className='geometry-ruler__pin'>
                {reducedMotion
                  ? 'reduced motion · pin off'
                  : 'owned pin element'}
              </div>
              <div className='geometry-ruler__spacer'>scroll end</div>
            </div>
            <div className='geometry-ruler__snapshot'>
              <h3>frozen snapshot</h3>
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
        propertyDetails={scrollTriggerGeometryProperties.map(
          ([name, type, acceptedValues]) => ({
            name,
            type,
            defaultValue: 'not specified',
            acceptedValues,
          }),
        )}
        changes={[
          'start/end는 refresh 뒤 numeric px가 됩니다.',
          'snapshot은 click/refresh 시점의 state만 보여 줍니다.',
          'reduced motion은 pin/animation을 끄고 same measurements를 유지합니다.',
        ]}
        watchFor={[
          'progress와 direction은 table에서 live announce하지 않습니다.',
          'isInViewport/positionInViewport은 browser viewport utility라 local scroller ownership과 다릅니다.',
          'unmount/rebuild는 listener, pin, trigger, timeline을 cleanup합니다.',
        ]}
        explanation={
          <p>
            ScrollTrigger의 geometry는 config string이 아니라 refresh 후
            instance가 가진 number와 element owner입니다. local ruler는
            scroll()과 maxScroll()을, viewport utility는 browser viewport 기준을
            함께 비교합니다.
          </p>
        }
        onReplay={captureSnapshot}
        replayLabel='현재 geometry 다시 고정'
      />
    </section>
  )
}
