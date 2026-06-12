import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { RoughEaseExample } from './examples/RoughEaseExample'
import roughEaseSource from './examples/RoughEaseExample.tsx?raw'
import { SlowMoExample } from './examples/SlowMoExample'
import slowMoSource from './examples/SlowMoExample.tsx?raw'
import { ExpoScaleEaseExample } from './examples/ExpoScaleEaseExample'
import expoScaleEaseSource from './examples/ExpoScaleEaseExample.tsx?raw'

export function EasePackPage() {
  return (
    <LessonLayout
      title="EasePack"
      description="EasePack은 기본 ease보다 특수한 속도 곡선이 필요할 때 쓰는 공식 ease 묶음이다. RoughEase, SlowMo, ExpoScaleEase의 역할과 설정값을 비교한다."
    >
      <ExamplePanel
        title="RoughEase"
        description="RoughEase는 진행 값을 흔들어서 불규칙한 움직임을 만든다. 오류 상태, 손떨림 효과, 거친 강조처럼 매끈하지 않은 움직임이 필요할 때 제한적으로 쓴다."
        code={roughEaseSource}
      >
        <RoughEaseExample />
      </ExamplePanel>
      <ExamplePanel
        title="SlowMo"
        description="SlowMo는 시작과 끝은 빠르게 지나가고 중간 구간을 길게 보여준다. 중요한 상태 변화를 잠깐 붙잡아 보여줄 때 쓴다."
        code={slowMoSource}
      >
        <SlowMoExample />
      </ExamplePanel>
      <ExamplePanel
        title="ExpoScaleEase"
        description="ExpoScaleEase는 scale 값처럼 배수 변화가 큰 속성을 자연스럽게 보정한다. 작은 요소가 크게 커질 때 선형 scale보다 덜 어색하다."
        code={expoScaleEaseSource}
      >
        <ExpoScaleEaseExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
