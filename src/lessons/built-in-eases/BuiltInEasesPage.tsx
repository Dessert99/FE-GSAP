import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { PowerEaseExample } from './examples/PowerEaseExample'
import powerEaseSource from './examples/PowerEaseExample.tsx?raw'
import { EaseDirectionExample } from './examples/EaseDirectionExample'
import easeDirectionSource from './examples/EaseDirectionExample.tsx?raw'
import { MotionFamilyEaseExample } from './examples/MotionFamilyEaseExample'
import motionFamilyEaseSource from './examples/MotionFamilyEaseExample.tsx?raw'
import { OvershootEaseExample } from './examples/OvershootEaseExample'
import overshootEaseSource from './examples/OvershootEaseExample.tsx?raw'
import { StepsNoneEaseExample } from './examples/StepsNoneEaseExample'
import stepsNoneEaseSource from './examples/StepsNoneEaseExample.tsx?raw'

export function BuiltInEasesPage() {
  return (
    <LessonLayout
      title="내장 ease"
      description="GSAP 트윈의 속도 곡선을 정하는 내장 ease를 비교한다. 같은 거리와 duration이라도 ease가 바뀌면 출발·중간·도착 속도가 달라진다."
    >
      <ExamplePanel
        title="power 계열"
        description="power1부터 power4까지 숫자가 커질수록 가속·감속 차이가 강해진다. 일반 UI 모션에서는 power2.out이나 power3.out이 자주 쓰인다."
        code={powerEaseSource}
      >
        <PowerEaseExample />
      </ExamplePanel>
      <ExamplePanel
        title="in / out / inOut"
        description="같은 ease family라도 방향 suffix에 따라 힘이 걸리는 위치가 달라진다. in은 출발, out은 도착, inOut은 양쪽에 변화를 준다."
        code={easeDirectionSource}
      >
        <EaseDirectionExample />
      </ExamplePanel>
      <ExamplePanel
        title="sine / circ / expo"
        description="sine은 부드럽고, circ는 둥근 감속이 강하며, expo는 빠르게 치고 나가는 느낌이 크다. 화면 전환과 강조 모션의 감도를 조절할 때 비교한다."
        code={motionFamilyEaseSource}
      >
        <MotionFamilyEaseExample />
      </ExamplePanel>
      <ExamplePanel
        title="back / elastic / bounce"
        description="back은 목표를 살짝 넘겼다가 돌아오고, elastic은 탄성처럼 흔들리며, bounce는 튕기듯 멈춘다. 과하면 장식적이므로 짧은 피드백에 제한적으로 쓴다."
        code={overshootEaseSource}
      >
        <OvershootEaseExample />
      </ExamplePanel>
      <ExamplePanel
        title="none / steps"
        description="none은 일정한 속도로 움직이고, steps는 값을 계단처럼 끊어 바꾼다. 타이머, 프레임 전환, 숫자 단계 표현에 유용하다."
        code={stepsNoneEaseSource}
      >
        <StepsNoneEaseExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
