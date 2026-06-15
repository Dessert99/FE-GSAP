import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { PathFollowerExample } from './examples/PathFollowerExample'
import pathFollowerSource from './examples/PathFollowerExample.tsx?raw'

export function MotionPathPluginPage() {
  return (
    <LessonLayout
      title="MotionPathPlugin"
      description="MotionPathPlugin은 요소를 SVG path나 좌표 배열을 따라 이동시킨다. MotionPathHelper는 브라우저에서 path를 편집하며 움직임을 맞출 때 쓰는 보조 도구다."
    >
      <ExamplePanel
        title="path를 따라 이동하고 helper로 path 확인"
        description="motionPath.path에 SVG path를 넘기고 align을 같은 path로 지정하면 요소 좌표가 path 좌표계와 맞는다. MotionPathHelper.create()는 편집 가능한 helper를 띄워 경로를 확인하게 해준다."
        code={pathFollowerSource}
      >
        <PathFollowerExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
