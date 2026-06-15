import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { CharsStaggerExample } from './examples/CharsStaggerExample'
import charsStaggerSource from './examples/CharsStaggerExample.tsx?raw'

export function SplitTextPage() {
  return (
    <LessonLayout
      title="SplitText"
      description="SplitText는 텍스트를 lines, words, chars 단위의 DOM으로 나눈다. 헤드라인 등장, 문장 강조, 마스크 기반 텍스트 모션처럼 텍스트 단위 제어가 필요할 때 쓴다."
    >
      <ExamplePanel
        title="문자 단위 stagger"
        description="SplitText.create()로 chars 배열을 얻고, 그 배열에 stagger tween을 적용한다. cleanup에서는 revert()로 원래 DOM과 접근성 구조를 되돌린다."
        code={charsStaggerSource}
      >
        <CharsStaggerExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
