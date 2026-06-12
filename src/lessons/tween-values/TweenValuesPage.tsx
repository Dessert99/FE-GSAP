import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { RelativeValueExample } from './examples/RelativeValueExample'
import relativeValueSource from './examples/RelativeValueExample.tsx?raw'
import { XyShortcutExample } from './examples/XyShortcutExample'
import xyShortcutSource from './examples/XyShortcutExample.tsx?raw'
import { RotationShortcutExample } from './examples/RotationShortcutExample'
import rotationShortcutSource from './examples/RotationShortcutExample.tsx?raw'
import { ScaleShortcutExample } from './examples/ScaleShortcutExample'
import scaleShortcutSource from './examples/ScaleShortcutExample.tsx?raw'
import { SkewShortcutExample } from './examples/SkewShortcutExample'
import skewShortcutSource from './examples/SkewShortcutExample.tsx?raw'
import { TransformOriginExample } from './examples/TransformOriginExample'
import transformOriginSource from './examples/TransformOriginExample.tsx?raw'

export function TweenValuesPage() {
  return (
    <LessonLayout
      title="트윈 값 표현"
      description="GSAP에서 자주 쓰는 상대값과 transform 단축속성을 다룬다. CSS transform 문자열 대신 숫자 중심의 속성으로 움직임을 분리해 제어한다."
    >
      <ExamplePanel
        title="상대값"
        description="상대값은 현재 값에서 더하거나 빼는 방식으로 목표값을 만든다. 현재 위치를 기준으로 누적 이동이 필요한 인터랙션에 쓴다."
        code={relativeValueSource}
      >
        <RelativeValueExample />
      </ExamplePanel>
      <ExamplePanel
        title="x / y"
        description="x와 y는 translateX/translateY의 GSAP 단축속성이다. 레이아웃 위치가 아니라 transform 기반 위치를 움직인다."
        code={xyShortcutSource}
      >
        <XyShortcutExample />
      </ExamplePanel>
      <ExamplePanel
        title="rotation"
        description="rotation은 rotate()의 단축속성이다. 각도 단위는 숫자만 쓰면 degree로 해석된다."
        code={rotationShortcutSource}
      >
        <RotationShortcutExample />
      </ExamplePanel>
      <ExamplePanel
        title="scale"
        description="scale은 scale()의 단축속성이다. 요소의 실제 레이아웃 크기는 유지하고 transform으로 시각적 크기만 바꾼다."
        code={scaleShortcutSource}
      >
        <ScaleShortcutExample />
      </ExamplePanel>
      <ExamplePanel
        title="skew"
        description="skewX와 skewY는 기울임 변형을 만든다. 카드나 배지의 짧은 강조 모션처럼 형태 변화를 보여줄 때 쓴다."
        code={skewShortcutSource}
      >
        <SkewShortcutExample />
      </ExamplePanel>
      <ExamplePanel
        title="transformOrigin"
        description="transformOrigin은 회전·스케일의 기준점을 정한다. 같은 rotation도 기준점에 따라 움직임의 축이 달라진다."
        code={transformOriginSource}
      >
        <TransformOriginExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
