import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { ShapeMorphExample } from './examples/ShapeMorphExample'
import shapeMorphSource from './examples/ShapeMorphExample.tsx?raw'

export function MorphSvgPluginPage() {
  return (
    <LessonLayout
      title="MorphSVGPlugin"
      description="MorphSVGPlugin은 SVG path 데이터를 다른 shape로 보간한다. 아이콘 상태 전환이나 브랜드 심볼 변형처럼 같은 그래픽 대상이 형태를 바꿀 때 쓴다."
    >
      <ExamplePanel
        title="path shape 전환"
        description="morphSVG.shape에 목표 path 데이터를 넘기면 현재 path가 그 형태로 변한다. yoyo와 repeat을 더하면 양방향 shape 전환을 비교하기 쉽다."
        code={shapeMorphSource}
      >
        <ShapeMorphExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
