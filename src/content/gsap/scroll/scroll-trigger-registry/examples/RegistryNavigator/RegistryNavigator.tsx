/** 키보드로 조작할 수 있는 registry navigator와 안전한 reset을 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { useRegistryNavigatorRuntime } from './useRegistryNavigatorRuntime'
import './RegistryNavigator.css'

/** 세 trigger의 refresh 순서와 전역 registry 경계를 조작한다. */
export function RegistryNavigator() {
  // runtime이 만든 local scroller, descriptor, frozen readout과 commands를 받는다
  const {
    scope,
    scrollerRef,
    targetRefs,
    descriptor,
    snapshot,
    notice,
    select,
    resetIsolatedRegistry,
  } = useRegistryNavigatorRuntime()
  // 실제 descriptor를 포함한 생성·조회·정리 코드를 단독 실행 가능한 형태로 직렬화한다
  const serializedDescriptor = JSON.stringify(descriptor, null, 2)
  // plugin 등록과 정상 종료 cleanup까지 포함해 registry 예제를 독립 실행 가능하게 만든다
  const code = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const descriptors = ${serializedDescriptor}
const setup = () => {
  const scroller = document.querySelector('.registry-scroller')
  if (!scroller) throw new Error('scroller가 필요합니다.')
  const createTriggers = () => descriptors.map(({ id, start, end }) => {
    const target = scroller.querySelector('[data-registry-id="' + id + '"]')
    if (!target) throw new Error(id + ' target이 필요합니다.')
    return ScrollTrigger.create({ id, trigger: target, scroller, start, end })
  })

  let created = createTriggers()
  const selectedId = 'registry-alpha'
  const current = ScrollTrigger.getById(selectedId)
  const all = ScrollTrigger.getAll()
  const previous = current?.previous()
  const next = current?.next()
  const reading = { isScrolling: ScrollTrigger.isScrolling(), isTouch: ScrollTrigger.isTouch }
  console.log({ current, previous, next, reading })

  if (all.length === created.length && all.every((trigger) => created.includes(trigger))) {
    ScrollTrigger.killAll(true)
    created = createTriggers()
  }
  return () => created.forEach((trigger) => trigger.kill(true))
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`

  return (
    <section id='registry-lab'>
      <InteractiveExample
        title='세 trigger · registry navigator'
        description='목록에서 ID를 선택하면 getById와 refresh order의 previous/next를 같은 snapshot으로 읽습니다. local scroll area는 Tab 뒤 화살표·PageDown으로도 움직일 수 있습니다.'
        sourcePath='src/content/gsap/scroll/scroll-trigger-registry/examples/RegistryNavigator/useRegistryNavigatorRuntime.ts'
        controls={
          <div className='registry-navigator__controls'>
            {descriptor.map((item) => (
              <button
                key={item.id}
                type='button'
                aria-pressed={snapshot.selectedId === item.id}
                onClick={() => select(item.id)}
              >
                {item.label} lookup
              </button>
            ))}
            <button type='button' onClick={resetIsolatedRegistry}>
              이 페이지의 trigger만 있으면 killAll 뒤 재생성
            </button>
          </div>
        }
        preview={
          <div ref={scope} className='registry-navigator'>
            <div
              ref={scrollerRef}
              className='registry-scroller registry-navigator__scroller'
              tabIndex={0}
              aria-label='세 labelled trigger를 담은 local scroll area'
            >
              {descriptor.map((item) => (
                <div
                  key={item.id}
                  ref={(element) => {
                    targetRefs.current[item.id] = element
                  }}
                  className='registry-navigator__target'
                  data-registry-id={item.id}
                >
                  <strong>{item.label}</strong>
                  <span>{item.id}</span>
                </div>
              ))}
            </div>
            <table>
              <caption>선택한 trigger의 실제 registry snapshot</caption>
              <tbody>
                <tr>
                  <th scope='row'>getAll()</th>
                  <td>{snapshot.ids.join(', ') || '—'}</td>
                </tr>
                <tr>
                  <th scope='row'>getById()</th>
                  <td>{snapshot.found ? snapshot.selectedId : 'undefined'}</td>
                </tr>
                <tr>
                  <th scope='row'>previous() / next()</th>
                  <td>
                    {snapshot.previousId ?? '없음'} /{' '}
                    {snapshot.nextId ?? '없음'}
                  </td>
                </tr>
                <tr>
                  <th scope='row'>isScrolling() snapshot</th>
                  <td>{String(snapshot.isScrolling)}</td>
                </tr>
                <tr>
                  <th scope='row'>isTouch</th>
                  <td>{snapshot.isTouch}</td>
                </tr>
              </tbody>
            </table>
            <p role='status'>{notice}</p>
          </div>
        }
        code={code}
        propertyDetails={[
          {
            name: 'next() / previous()',
            type: 'instance method',
            defaultValue: '—',
            acceptedValues: 'refresh order neighbor or undefined',
          },
          {
            name: 'getAll() / getById(id)',
            type: 'static method',
            defaultValue: '—',
            acceptedValues: 'array / matching instance or undefined',
          },
          {
            name: 'isScrolling() / isTouch',
            type: 'static readout',
            defaultValue: '—',
            acceptedValues: 'boolean snapshot / 0, 1, or 2',
          },
          {
            name: 'killAll(allowListeners?)',
            type: 'static method',
            defaultValue: 'false',
            acceptedValues:
              'kills all except main ScrollSmoother; true preserves listeners',
          },
        ]}
        changes={[
          'next와 previous는 creation order가 아니라 refresh order의 이웃을 반환합니다.',
          'isScrolling은 읽은 순간만 표시하며 live region으로 연속 announce하지 않습니다.',
          'killAll은 global API이므로 이 예제 밖 trigger가 하나라도 있으면 호출하지 않습니다.',
        ]}
        watchFor={[
          'Alpha와 Gamma는 각각 previous 또는 next가 없을 수 있습니다.',
          'isTouch의 0/1/2는 현재 입력 환경의 capability readout입니다.',
          'unmount cleanup은 killAll이 아니라 이 예제가 만든 세 instance의 kill()입니다.',
        ]}
        explanation={
          <p>
            registry는 앱 전체에서 공유됩니다. 따라서 목록을 읽는 것과 모든
            trigger를 폐기하는 것은 범위가 다릅니다. global reset은 이 페이지의
            trigger만 등록되었음을 확인할 수 있을 때만 실행하고, component
            cleanup은 자신이 만든 instance만 정리합니다.
          </p>
        }
        onReplay={resetIsolatedRegistry}
        replayLabel='안전 조건을 확인하고 reset 다시 시도'
      />
    </section>
  )
}
