import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { DurationExample } from './examples/DurationExample'
import durationSource from './examples/DurationExample.tsx?raw'
import { DelayExample } from './examples/DelayExample'
import delaySource from './examples/DelayExample.tsx?raw'
import { RepeatExample } from './examples/RepeatExample'
import repeatSource from './examples/RepeatExample.tsx?raw'
import { YoyoExample } from './examples/YoyoExample'
import yoyoSource from './examples/YoyoExample.tsx?raw'
import { RepeatDelayExample } from './examples/RepeatDelayExample'
import repeatDelaySource from './examples/RepeatDelayExample.tsx?raw'
import { OverwriteExample } from './examples/OverwriteExample'
import overwriteSource from './examples/OverwriteExample.tsx?raw'
import { ImmediateRenderExample } from './examples/ImmediateRenderExample'
import immediateRenderSource from './examples/ImmediateRenderExample.tsx?raw'

export function TweenPropertiesPage() {
  return (
    <LessonLayout
      title="트윈 핵심 속성"
      description="트윈의 시간, 반복, 충돌 처리, 초기 렌더링을 제어하는 기본 옵션을 다룬다."
    >
      <ExamplePanel
        title="duration"
        description="트윈이 시작해서 끝까지 가는 데 걸리는 시간(초)이다. 같은 변화량이라도 duration 값에 따라 속도감이 달라진다."
        code={durationSource}
      >
        <DurationExample />
      </ExamplePanel>
      <ExamplePanel
        title="delay"
        description="트윈 시작을 지정한 시간만큼 늦춘다. 여러 요소를 순차적으로 등장시키거나 타이밍을 맞출 때 쓴다."
        code={delaySource}
      >
        <DelayExample />
      </ExamplePanel>
      <ExamplePanel
        title="repeat"
        description="첫 실행이 끝난 뒤 같은 트윈을 몇 번 더 실행할지 정한다. 총 실행 횟수는 기본 1회에 repeat 값을 더한 횟수다."
        code={repeatSource}
      >
        <RepeatExample />
      </ExamplePanel>
      <ExamplePanel
        title="yoyo"
        description="반복할 때 진행 방향을 뒤집어 시작점과 끝점 사이를 왕복하게 한다. 보통 repeat와 함께 써서 왕복 애니메이션을 만든다."
        code={yoyoSource}
      >
        <YoyoExample />
      </ExamplePanel>
      <ExamplePanel
        title="repeatDelay"
        description="반복과 반복 사이에 쉬는 시간을 넣는다. 반복 애니메이션의 리듬을 조절할 때 쓴다."
        code={repeatDelaySource}
      >
        <RepeatDelayExample />
      </ExamplePanel>
      <ExamplePanel
        title="overwrite"
        description="같은 대상의 같은 속성을 여러 트윈이 동시에 제어할 때 기존 트윈을 정리할지 정한다. 인터랙션 중 충돌을 줄이는 데 중요하다."
        code={overwriteSource}
      >
        <OverwriteExample />
      </ExamplePanel>
      <ExamplePanel
        title="immediateRender"
        description="from/fromTo 계열 트윈이 생성되는 순간 시작값을 즉시 적용할지 정한다. delay가 있는 등장 애니메이션에서 특히 차이가 크다."
        code={immediateRenderSource}
      >
        <ImmediateRenderExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
