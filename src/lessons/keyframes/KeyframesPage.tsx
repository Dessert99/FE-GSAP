import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ObjectKeyframesExample } from './examples/ObjectKeyframesExample'
import objectKeyframesSource from './examples/ObjectKeyframesExample.tsx?raw'
import { PercentageKeyframesExample } from './examples/PercentageKeyframesExample'
import percentageKeyframesSource from './examples/PercentageKeyframesExample.tsx?raw'
import { SimpleArrayKeyframesExample } from './examples/SimpleArrayKeyframesExample'
import simpleArrayKeyframesSource from './examples/SimpleArrayKeyframesExample.tsx?raw'

export function KeyframesPage() {
  return (
    <LessonLayout
      title="keyframes"
      description="keyframes는 같은 대상이 여러 상태를 거쳐야 할 때 여러 tween이나 timeline 없이 하나의 to() 안에 단계들을 담는 문법이다."
    >
      <ExamplePanel
        title="배열 문법"
        description="keyframes 배열은 각 항목을 순서대로 실행되는 to() vars처럼 다룬다. 단계별 duration, delay, ease를 세밀하게 조절할 수 있다."
        code={objectKeyframesSource}
      >
        <ObjectKeyframesExample />
      </ExamplePanel>
      <ExamplePanel
        title="퍼센트 객체 문법"
        description="퍼센트 객체 문법은 CSS keyframes처럼 전체 duration 안의 지점을 0%, 50%, 100%로 나눠 표현한다."
        code={percentageKeyframesSource}
      >
        <PercentageKeyframesExample />
      </ExamplePanel>
      <ExamplePanel
        title="단순 배열 객체 문법"
        description="속성별 값 배열을 넘기면 전체 duration에 균등 분배된다. 같은 단계 수로 x/y/rotation을 함께 움직일 때 간결하다."
        code={simpleArrayKeyframesSource}
      >
        <SimpleArrayKeyframesExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
