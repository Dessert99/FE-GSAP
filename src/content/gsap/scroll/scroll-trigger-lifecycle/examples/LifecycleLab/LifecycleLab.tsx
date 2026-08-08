/** P43의 actual lifecycle controls, target, discrete log, reference를 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { scrollTriggerLifecycleProperties } from '../../scroll-trigger-lifecycle.properties'
import { useLifecycleRuntime } from './useLifecycleRuntime'
import './LifecycleLab.css'

/** resizable target에서 update와 refresh, disable과 kill의 차이를 조작한다. */
export function LifecycleLab() {
  // runtime이 소유한 refs, layout, bounded log와 descriptor-driven command를 받는다
  const { scope, targetRef, tall, log, commands, runCommand, toggleHeight } =
    useLifecycleRuntime()
  // actual command descriptor의 code만 실행 순서로 직렬화한다
  const code = commands.map((command) => command.code).join('\n')
  // 최근 command/event만 status에 전달하고 전체 bounded history는 list에 둔다
  const latestStatus = log.at(-1) ?? 'layout을 바꾸거나 command를 실행하세요.'

  return (
    <section id='lifecycle-lab'>
      <InteractiveExample
        title='resizable target · lifecycle command log'
        description='높이를 바꾼 뒤 update와 refresh를 비교하고, disable·enable·kill이 instance lifetime을 어떻게 나누는지 확인하세요.'
        sourcePath='src/content/gsap/scroll/scroll-trigger-lifecycle/examples/LifecycleLab/useLifecycleRuntime.ts'
        controls={
          <div className='lifecycle-lab__controls'>
            <button type='button' onClick={toggleHeight}>
              content 높이 변경
            </button>
            {commands.map((command) => (
              <button
                key={command.id}
                type='button'
                onClick={() => runCommand(command.id)}
              >
                {command.label}
              </button>
            ))}
          </div>
        }
        preview={
          <div ref={scope} className='lifecycle-lab'>
            <div
              ref={targetRef}
              className={`lifecycle-lab__target ${tall ? 'lifecycle-lab__target--tall' : ''}`}
            >
              local target · {tall ? '220px' : '80px'}
            </div>
            <p role='status'>{latestStatus}</p>
            <ol aria-label='최근 lifecycle command와 refresh event'>
              {log.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ol>
          </div>
        }
        code={code}
        propertyDetails={scrollTriggerLifecycleProperties.map(
          ([name, type, acceptedValues]) => ({
            name,
            type,
            defaultValue: 'see signature',
            acceptedValues,
          }),
        )}
        changes={[
          'update는 current scroll state만 반영하고 start/end를 다시 측정하지 않습니다.',
          'instance refresh는 owned trigger 하나, static refresh는 global registry 전체를 측정합니다.',
          'disable은 다시 enable할 instance를 보존하고 kill은 owner lifetime을 끝냅니다.',
        ]}
        watchFor={[
          'global refresh log는 refreshInit 뒤 refresh 순서로 기록됩니다.',
          'removeEventListener는 add에 사용한 same callback을 cleanup에서 제거합니다.',
          'scroll progress처럼 연속 값은 status나 log에 announce하지 않습니다.',
        ]}
        explanation={
          <p>
            layout measurement와 current scroll update는 비용과 범위가 다릅니다.
            가장 작은 owner부터 refresh하고, registry 전체 순서가 달라질 때만
            sort와 global refresh를 사용합니다.
          </p>
        }
        onReplay={() => runCommand('instanceRefresh')}
        replayLabel='owned trigger 다시 측정'
      />
    </section>
  )
}
