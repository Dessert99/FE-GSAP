/** repeat·yoyo·yoyoEase가 만드는 반복 흐름을 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './RepeatYoyoExample.css'
import { useRepeatYoyoAnimation } from './useRepeatYoyoAnimation'

// select가 비활성·자동 반전·특정 복귀 ease를 모두 비교하게 한다.
const yoyoEases = ['false', 'true', 'power2.in', 'back.out(1.7)'] as const

/** 실제 반복 설정에서 학습 설명과 표시 코드를 조립한다. */
export function RepeatYoyoExample() {
  // Hook이 실행한 반복 설정과 조작 함수를 그대로 받아 UI와 표시 코드를 맞춘다.
  const { scope, targetClassName, duration, setDuration, repeat, setRepeat, repeatDelay, setRepeatDelay, yoyo, setYoyo, yoyoEase, setYoyoEase, animationConfig, effectiveYoyo, hasReturnCycle, reducedMotion, replay } = useRepeatYoyoAnimation()
  // repeat -1을 유한 반복 계산과 분리해 무한 실행으로 설명한다.
  const repeatsForever = animationConfig.repeat === -1
  // 실제 duration·repeat·repeatDelay로 총 회차와 예상 시간을 설명한다.
  const runSummary = repeatsForever
    ? 'repeat가 -1이므로 중지하거나 컴포넌트를 벗어날 때까지 계속 반복합니다.'
    : `처음 실행을 포함해 총 ${animationConfig.repeat + 1}번 움직이고, 전체 시간은 약 ${(animationConfig.duration * (animationConfig.repeat + 1) + animationConfig.repeatDelay * animationConfig.repeat).toFixed(1)}초입니다.`
  // 실제 실행된 반복 설정을 GSAP 문법으로만 직렬화한다.
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
        sourcePath="src/content/gsap/fundamentals/gsap-to/examples/RepeatYoyoExample/useRepeatYoyoAnimation.ts"
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
              <select value={yoyoEase} onChange={(event) => setYoyoEase(event.target.value as (typeof yoyoEases)[number])}>
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
          { name: 'x', type: '연결된 CSSPlugin: number | string | function', defaultValue: '공식 gsap.to(): 현재값 자동 읽기', acceptedValues: '연결된 CSSPlugin: translateX 단축 속성, 숫자는 px·단위 문자열·상대값·함수' },
          { name: 'duration', type: '공식 gsap.to(): 초 단위 숫자', defaultValue: '공식 gsap.to(): 0.5초', acceptedValues: '공식 gsap.to(): 재생 시간(초)' },
          { name: 'repeat', type: '공식 gsap.to(): number', defaultValue: '공식 gsap.to(): 0', acceptedValues: '공식 gsap.to(): 추가 반복 횟수·-1(무한)' },
          { name: 'repeatDelay', type: '공식 gsap.to(): 초 단위 숫자', defaultValue: '공식 gsap.to(): 0', acceptedValues: '공식 gsap.to(): 반복 사이에 기다릴 초' },
          { name: 'yoyo', type: '공식 gsap.to(): boolean', defaultValue: '공식 gsap.to(): false', acceptedValues: '공식 gsap.to(): true | false' },
          { name: 'yoyoEase', type: '공식 gsap.to(): true | 특정 ease', defaultValue: '공식 gsap.to(): false', acceptedValues: '공식 gsap.to(): true 또는 복귀 회차에 적용할 ease' },
          { name: 'ease', type: '공식 gsap.to(): 문자열 | 정규화 함수', defaultValue: '공식 gsap.to(): power1.out', acceptedValues: '공식 gsap.to(): ease 이름 또는 정규화 함수' },
        ]}
        changes={[
          runSummary,
          animationConfig.repeat === 0
            ? `실제 repeat가 ${animationConfig.repeat}이므로 복귀 회차 없이 도착 상태에서 끝납니다.`
            : hasReturnCycle
              ? `왕복이 활성화됩니다${!yoyo ? ' — yoyoEase의 truthy 값이 yoyo를 자동으로 켰습니다.' : '.'}`
              : '반복할 때 시작점으로 즉시 돌아간 뒤 같은 방향으로 움직입니다.',
        ]}
        watchFor={[
          'repeat는 전체 실행 횟수가 아니라 첫 실행 이후 추가되는 횟수이고, -1만 무한 반복을 뜻합니다.',
          animationConfig.repeat === 0
            ? '모션 감소 설정에서는 실제 repeat가 0이므로 복귀 움직임 없이 한 번의 안정된 도착 상태만 남는지 봅니다.'
            : 'repeatDelay 동안 대상이 도착점에 머무는지, yoyo를 끄면 어디서 다시 시작하는지 봅니다.',
          animationConfig.repeat === 0
            ? `yoyo 설정은 ${effectiveYoyo ? '활성' : '비활성'}이지만 반복 회차가 없어 복귀 속도감은 재생되지 않습니다.`
            : 'yoyo를 끈 채 yoyoEase를 true 또는 특정 ease로 바꿔도 왕복이 자동 활성화되고 복귀 속도감이 달라지는지 봅니다.',
          'yoyo는 반복 회차의 값 진행 방향만 바꾸며 Tween의 reversed 상태는 바꾸지 않습니다.',
        ]}
        explanation={
          <p>
            <code>repeat</code>의 기본값은 0입니다. 양의 정수는 최초 실행 뒤 추가할 횟수이고, <code>-1</code>은 무한 반복입니다.{' '}
            <code>yoyo</code>는 반복 회차의 값 진행 방향만 뒤집을 뿐 Tween의 <code>reversed</code> 상태에는 영향을 주지 않고, <code>repeatDelay</code>는 각 회차 사이에 정지 구간을 추가합니다.
            {' '}<code>yoyoEase: true</code>는 첫 회차의 ease를 반전해 복귀에 사용하고, 문자열이나 함수는 복귀 회차 전용 ease가 됩니다. truthy <code>yoyoEase</code>는 <code>yoyo: false</code>여도 왕복을 자동 활성화합니다.
          </p>
        }
        onReplay={replay}
      />
    </div>
  )
}
