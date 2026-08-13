/** 목표값과 duration·ease가 결과와 움직임에 주는 차이를 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './DestinationValuesExample.css'
import { useDestinationValuesAnimation } from './useDestinationValuesAnimation'

// select와 Hook 타입이 같은 GSAP ease 목록을 사용하게 한다.
const eases = ['none', 'power1.out', 'power2.out', 'back.out(1.7)'] as const

/** 실제 Tween 설정에서 학습 패널과 표시 코드를 조립한다. */
export function DestinationValuesExample() {
  // Hook이 실행한 값과 조작 함수를 그대로 받아 표시 코드와 UI를 맞춘다.
  const { scope, targetClassName, x, setX, rotation, setRotation, duration, setDuration, animationDuration, ease, setEase, reducedMotion, replay } = useDestinationValuesAnimation()

  // 실제 실행된 도착값과 모션 설정을 GSAP 문법으로만 직렬화한다.
  const code = `gsap.to('.box', {
  x: ${x},
  rotation: ${rotation},
  duration: ${animationDuration.toFixed(1)},
  ease: '${ease}'
})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="도착값과 움직임의 느낌"
        description="x와 rotation은 도착 상태를, duration과 ease는 그곳까지 가는 과정을 결정합니다."
        sourcePath="src/content/gsap/fundamentals/gsap-to/examples/DestinationValuesExample/useDestinationValuesAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>x</span>
                <output>{x}px</output>
              </span>
              <input type="range" min="40" max="240" step="10" value={x} onChange={(event) => setX(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>rotation</span>
                <output>{rotation}°</output>
              </span>
              <input type="range" min="0" max="360" step="15" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>duration</span>
                <output>{duration.toFixed(1)}s</output>
              </span>
              <input type="range" min="0.2" max="2.4" step="0.1" value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>ease</span>
              </span>
              <select value={ease} onChange={(event) => setEase(event.target.value as (typeof eases)[number])}>
                {eases.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>
        }
        preview={
          <div className="destination-values-example">
            <div className="destination-values-example__track">
              <span>현재값</span>
              <span>목표값</span>
              <div className={targetClassName}>to</div>
            </div>
          </div>
        }
        code={code}
        propertyDetails={[
          { name: 'x', type: '연결된 CSSPlugin: number | string | function', defaultValue: '공식 gsap.to(): 현재값 자동 읽기', acceptedValues: '연결된 CSSPlugin: translateX 단축 속성, 숫자는 px·단위 문자열·상대값·함수' },
          { name: 'rotation', type: '연결된 CSSPlugin: number | string | function', defaultValue: '공식 gsap.to(): 현재값 자동 읽기', acceptedValues: '연결된 CSSPlugin: 숫자는 degree·deg/rad 문자열·함수' },
          { name: 'duration', type: '공식 gsap.to(): 초 단위 숫자', defaultValue: '공식 gsap.to(): 0.5초', acceptedValues: '공식 gsap.to(): 재생 시간(초)' },
          { name: 'ease', type: '공식 gsap.to(): 문자열 | 정규화 함수', defaultValue: '공식 gsap.to(): power1.out', acceptedValues: '공식 gsap.to(): ease 이름 또는 0~1 진행률을 받아 변환된 변화 비율을 반환하는 함수' },
        ]}
        changes={[
          `x가 0에서 ${x}px로, rotation이 0°에서 ${rotation}°로 바뀝니다.`,
          `같은 도착값도 ${duration.toFixed(1)}초와 ${ease} 조합에 따라 움직이는 느낌이 달라집니다.`,
        ]}
        watchFor={[
          'x를 바꿨을 때 시작점이 아니라 도착점만 이동하는지 확인합니다.',
          'ease를 none과 back.out으로 바꿔 일정한 속도와 도착점 초과 움직임을 비교합니다.',
          '사용자 ease 함수의 입력 0은 시작, 1은 끝 진행률이고 반환값은 그 순간 적용할 변화 비율입니다.',
        ]}
        explanation={
          <p>
            <code>gsap.to()</code>는 실행 순간의 현재값을 읽고 vars 객체에 적힌 목표값까지 보간합니다. <code>x</code>는 CSS <code>translateX</code>를 짧게 쓰는 GSAP 속성이고,{' '}
            <code>rotation</code>은 transform으로 적용되고, <code>duration</code>과 <code>ease</code>는 값 자체가 아니라 변화의 시간과 속도 곡선을 정합니다. 사용자 ease 함수는 정규화된 진행률 <code>0~1</code>을 받아 그 순간의 변화 비율을 반환하며, <code>back</code>처럼 목표값을 지나치는 ease는 중간 출력이 1을 넘을 수 있습니다.
          </p>
        }
        onReplay={replay}
      />
    </div>
  )
}
