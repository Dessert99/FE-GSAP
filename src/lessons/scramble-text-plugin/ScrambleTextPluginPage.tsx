import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ScrambleRevealExample } from './examples/ScrambleRevealExample'
import scrambleRevealSource from './examples/ScrambleRevealExample.tsx?raw'

export function ScrambleTextPluginPage() {
  return (
    <LessonLayout
      title="ScrambleTextPlugin"
      description="ScrambleTextPlugin은 임시 문자로 텍스트를 섞다가 목표 문장을 드러낸다. 보안 코드, 시스템 로그, 캠페인 카피처럼 디지털 느낌의 텍스트 전환에 쓴다."
    >
      <ExamplePanel
        title="문자 섞기 후 reveal"
        description="scrambleText.text에 목표 문자열을 넘기고 chars로 섞일 문자 집합을 제한한다. revealDelay는 목표 텍스트가 드러나기 전 섞이는 시간을 만든다."
        code={scrambleRevealSource}
      >
        <ScrambleRevealExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
