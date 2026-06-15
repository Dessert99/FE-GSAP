import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { SentenceReplaceExample } from './examples/SentenceReplaceExample'
import sentenceReplaceSource from './examples/SentenceReplaceExample.tsx?raw'

export function TextPluginPage() {
  return (
    <LessonLayout
      title="TextPlugin"
      description="TextPlugin은 element의 textContent를 tween으로 바꾼다. 상태 메시지, 터미널식 문장 교체, 단계별 안내 문구처럼 텍스트 자체가 변하는 UI에 쓴다."
    >
      <ExamplePanel
        title="단어 단위 문장 교체"
        description="text.value에 새 문자열을 넘기면 기존 텍스트가 목표 문장으로 바뀐다. delimiter를 공백으로 두면 단어 단위로 교체되어 문장 변화가 읽기 쉽다."
        code={sentenceReplaceSource}
      >
        <SentenceReplaceExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
