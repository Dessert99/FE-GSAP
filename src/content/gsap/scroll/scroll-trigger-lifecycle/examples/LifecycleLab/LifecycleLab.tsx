/** 수명 주기 명령, target, 로그와 공식 항목을 함께 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { scrollTriggerLifecycleProperties } from '../../scroll-trigger-lifecycle.properties'
import { useLifecycleRuntime } from './useLifecycleRuntime'
import './LifecycleLab.css'

/** resizable target에서 update와 refresh, disable과 kill의 차이를 조작한다. */
export function LifecycleLab() {
  // runtime이 소유한 refs, layout, bounded log와 descriptor-driven command를 받는다
  const { scope, targetRef, tall, log, commands, runCommand, toggleHeight } =
    useLifecycleRuntime()
  // 같은 descriptor의 명령을 실행 전 함수로 보존해 필요한 하나만 선택하게 한다
  const commandEntries = commands
    .map((command) => `  ${command.id}: () => ${command.code},`)
    .join('\n')
  // 재현에 필요한 plugin 등록·target·instance·명령 함수를 한 코드 패널로 직렬화한다
  const code = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const setup = () => {
  const target = document.querySelector('.lifecycle-target')
  if (!target) throw new Error('target이 필요합니다.')
  const trigger = ScrollTrigger.create({
    trigger: target,
    start: 'top 80%',
    end: 'bottom 20%',
  })

  const commands = {
${commandEntries}
  }
  return { commands, cleanup: () => trigger.kill(true) }
}

const { commands, cleanup } = setup()
commands.instanceRefresh()
// component unmount에서 cleanup()을 호출합니다.`
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
              className={`lifecycle-target lifecycle-lab__target ${tall ? 'lifecycle-lab__target--tall' : ''}`}
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
          'instance refresh는 이 trigger 하나, static refresh는 등록된 trigger 전체를 측정합니다.',
          'disable은 다시 enable할 instance를 보존하고 kill은 수명을 끝냅니다.',
          '앱 전체 update·refresh·sort는 공유 페이지에 영향을 주므로 호출 형태만 보여 줍니다.',
        ]}
        watchFor={[
          '다른 곳에서 global refresh가 실행되면 refreshInit 뒤 refresh 순서로 기록됩니다.',
          'removeEventListener는 add에 사용한 same callback을 cleanup에서 제거합니다.',
          'scroll progress처럼 연속 값은 status나 log에 announce하지 않습니다.',
        ]}
        explanation={
          <p>
            layout measurement와 current scroll update는 비용과 범위가 다릅니다.
            필요한 instance부터 refresh하고, 등록된 전체 순서가 달라질 때만 앱
            초기화 지점에서 sort와 global refresh를 사용합니다.
          </p>
        }
        onReplay={() => runCommand('instanceRefresh')}
        replayLabel='이 trigger 다시 측정'
      />
    </section>
  )
}
