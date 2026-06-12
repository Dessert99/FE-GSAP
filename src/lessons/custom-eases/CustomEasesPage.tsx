import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { CustomEaseExample } from './examples/CustomEaseExample'
import customEaseSource from './examples/CustomEaseExample.tsx?raw'
import { CustomBounceExample } from './examples/CustomBounceExample'
import customBounceSource from './examples/CustomBounceExample.tsx?raw'
import { CustomWiggleExample } from './examples/CustomWiggleExample'
import customWiggleSource from './examples/CustomWiggleExample.tsx?raw'

export function CustomEasesPage() {
  return (
    <LessonLayout
      title="Custom Eases"
      description="CustomEase, CustomBounce, CustomWiggle은 기본 ease와 EasePack으로 부족할 때 곡선 자체를 만들거나 특수 움직임을 생성하는 공식 ease 도구다."
    >
      <ExamplePanel
        title="CustomEase"
        description="CustomEase는 cubic-bezier 값이나 SVG path로 직접 ease를 만든 뒤 이름으로 재사용한다. 브랜드 모션처럼 정해진 곡선을 반복 적용할 때 쓴다."
        code={customEaseSource}
      >
        <CustomEaseExample />
      </ExamplePanel>
      <ExamplePanel
        title="CustomBounce"
        description="CustomBounce는 bounce 강도와 squash/stretch용 ease를 함께 만든다. 위치 이동과 scale 변형을 같은 타이밍으로 맞출 때 유용하다."
        code={customBounceSource}
      >
        <CustomBounceExample />
      </ExamplePanel>
      <ExamplePanel
        title="CustomWiggle"
        description="CustomWiggle은 지정한 횟수와 타입으로 흔들림 곡선을 만든다. 회전, 위치, 투명도 등 어떤 속성에도 wiggle 느낌을 적용할 수 있다."
        code={customWiggleSource}
      >
        <CustomWiggleExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
