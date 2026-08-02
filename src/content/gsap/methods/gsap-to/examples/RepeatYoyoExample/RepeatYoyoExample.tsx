/** repeat·yoyo와 deprecated yoyoEase의 반복 흐름을 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './RepeatYoyoExample.css'
import { useRepeatYoyoAnimation } from './useRepeatYoyoAnimation'

const yoyoEases = ['false', 'true', 'power2.in', 'back.out(1.7)'] as const

export function RepeatYoyoExample() {
  const { scope, targetClassName, duration, setDuration, repeat, setRepeat, repeatDelay, setRepeatDelay, yoyo, setYoyo, yoyoEase, setYoyoEase, animationConfig, reducedMotion, replay } = useRepeatYoyoAnimation()
  const repeatsForever = animationConfig.repeat === -1
  const runSummary = repeatsForever
    ? 'repeat가 -1이므로 중지하거나 컴포넌트를 벗어날 때까지 계속 반복합니다.'
    : `처음 실행을 포함해 총 ${animationConfig.repeat + 1}번 움직이고, 전체 시간은 약 ${(animationConfig.duration * (animationConfig.repeat + 1) + animationConfig.repeatDelay * animationConfig.repeat).toFixed(1)}초입니다.`
  const code = `gsap.to('.box', {
  x: 190,
  duration: ${animationConfig.duration.toFixed(1)},
  repeat: ${animationConfig.repeat},
  repeatDelay: ${animationConfig.repeatDelay.toFixed(1)},
  yoyo: ${animationConfig.yoyo},
  yoyoEase: ${typeof animationConfig.yoyoEase === 'string' ? `'${animationConfig.yoyoEase}'` : animationConfig.yoyoEase},
  ease: '${animationConfig.ease}'
})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="repeat와 yoyo의 반복 방향"
        description="반복 횟수, 반복 사이의 대기 시간, 왕복 여부를 한 번에 비교합니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/RepeatYoyoExample/useRepeatYoyoAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>duration</span>
                <output>{duration.toFixed(1)}s</output>
              </span>
              <input type="range" min="0.3" max="1.5" step="0.1" value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>repeat</span>
              </span>
              <select value={repeat} onChange={(event) => setRepeat(Number(event.target.value))}>
                <option value="-1">-1 · 무한 반복</option>
                <option value="0">0 · 반복 없음</option>
                <option value="1">1 · 한 번 추가</option>
                <option value="2">2 · 두 번 추가</option>
                <option value="3">3 · 세 번 추가</option>
              </select>
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>repeatDelay</span>
                <output>{repeatDelay.toFixed(1)}s</output>
              </span>
              <input type="range" min="0" max="1" step="0.1" value={repeatDelay} onChange={(event) => setRepeatDelay(Number(event.target.value))} />
            </label>
            <label className="interactive-example__check">
              <input type="checkbox" checked={yoyo} onChange={(event) => setYoyo(event.target.checked)} />
              yoyo로 반복 방향 바꾸기
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>yoyoEase</span></span>
              <select value={yoyoEase} disabled={!yoyo} onChange={(event) => setYoyoEase(event.target.value as (typeof yoyoEases)[number])}>
                {yoyoEases.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
          </div>
        }
        preview={
          <div className="repeat-yoyo-example">
            <div className="repeat-yoyo-example__track">
              <span>START</span>
              <span>END</span>
              <div className={targetClassName} />
            </div>
          </div>
        }
        code={code}
        propertyDetails={[
          { name: 'x', type: 'number | string | function', defaultValue: '현재 x', acceptedValues: '숫자는 px, 단위 문자열, 상대값, 함수' },
          { name: 'duration', type: 'number | string | function', defaultValue: '0.5초', acceptedValues: '0 이상의 초 단위 값' },
          { name: 'repeat', type: 'number', defaultValue: '0', acceptedValues: '0은 반복 없음, 양의 정수는 추가 횟수, -1은 무한 반복' },
          { name: 'repeatDelay', type: 'number', defaultValue: '0초', acceptedValues: '각 반복 사이의 0 이상 초 단위 값' },
          { name: 'yoyo', type: 'boolean', defaultValue: 'false', acceptedValues: 'true면 반복 회차마다 진행 방향 반전' },
          { name: 'yoyoEase', type: 'boolean | string | function', defaultValue: 'false', acceptedValues: 'deprecated · true 또는 복귀 회차 전용 ease; easeReverse 사용 권장' },
          { name: 'ease', type: 'string | function', defaultValue: 'power1.out', acceptedValues: '정방향 ease; 역방향은 easeReverse로 설정' },
        ]}
        changes={[
          runSummary,
          yoyo ? '반복할 때 도착점에서 시작점으로 방향을 바꿉니다.' : '반복할 때 시작점으로 즉시 돌아간 뒤 같은 방향으로 움직입니다.',
        ]}
        watchFor={[
          'repeat는 전체 실행 횟수가 아니라 첫 실행 이후 추가되는 횟수이고, -1만 무한 반복을 뜻합니다.',
          'repeatDelay 동안 대상이 도착점에 머무는지, yoyo를 끄면 어디서 다시 시작하는지 봅니다.',
          'deprecated yoyoEase를 바꾸면 복귀 구간의 속도감이 달라지고, truthy 값이 yoyo도 내부적으로 켜는지 봅니다.',
        ]}
        explanation={
          <p>
            <code>repeat</code>의 기본값은 0입니다. 양의 정수는 최초 실행 뒤 추가할 횟수이고, <code>-1</code>은 무한 반복입니다.{' '}
            <code>yoyo</code>는 반복 회차의 진행 방향만 뒤집고, <code>repeatDelay</code>는 각 회차 사이에 정지 구간을 추가합니다.
            {' '}<code>yoyoEase</code>는 deprecated되었으며 truthy 값은 복귀 ease와 yoyo를 내부적으로 함께 켭니다. GSAP 3.15부터는 정방향 <code>ease</code>와 역방향 <code>easeReverse</code>를 사용하는 방식이 대체입니다.
          </p>
        }
        onReplay={replay}
      />
    </div>
  )
}
