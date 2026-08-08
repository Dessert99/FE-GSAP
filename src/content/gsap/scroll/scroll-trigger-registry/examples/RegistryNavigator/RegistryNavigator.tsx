/** P44의 keyboard-accessible registry navigator와 isolated reset을 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { useRegistryNavigatorRuntime } from './useRegistryNavigatorRuntime'
import './RegistryNavigator.css'

/** 세 owned trigger의 refresh order와 global registry boundary를 조작한다. */
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
  // descriptor의 같은 id/start/end를 source code panel에 직렬화한다
  const code = `const owned = descriptors.map(({ id, start, end }) =>\n  ScrollTrigger.create({ id, trigger: target, scroller, start, end }))\n\nconst current = ScrollTrigger.getById(selectedId)\nconst all = ScrollTrigger.getAll()\nconst previous = current?.previous()\nconst next = current?.next()\nconst reading = { isScrolling: ScrollTrigger.isScrolling(), isTouch: ScrollTrigger.isTouch }\n\nif (all.length === owned.length && all.every((trigger) => owned.includes(trigger))) {\n  ScrollTrigger.killAll(true)\n  recreateOwned()\n}`

  return (
    <section id='registry-lab'>
      <InteractiveExample
        title='three owned triggers · registry navigator'
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
              isolated killAll 뒤 recreate
            </button>
          </div>
        }
        preview={
          <div ref={scope} className='registry-navigator'>
            <div
              ref={scrollerRef}
              className='registry-navigator__scroller'
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
          'killAll은 global API이므로 이 lab은 foreign trigger가 하나라도 있으면 호출하지 않습니다.',
        ]}
        watchFor={[
          'Alpha와 Gamma는 각각 previous 또는 next가 없을 수 있습니다.',
          'isTouch의 0/1/2는 현재 입력 환경의 capability readout입니다.',
          'unmount 정상 cleanup은 killAll이 아니라 세 owned instance의 kill()입니다.',
        ]}
        explanation={
          <p>
            registry는 application-wide입니다. 따라서 목록을 읽는 것과 모든
            trigger를 폐기하는 것은 범위가 다릅니다. global reset은 독립된
            registry임을 확인할 수 있을 때만 실행하고, route나 component
            cleanup은 반드시 자신이 만든 instance만 정리합니다.
          </p>
        }
        onReplay={resetIsolatedRegistry}
        replayLabel='isolated reset 다시 시도'
      />
    </section>
  )
}
