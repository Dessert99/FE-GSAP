import { PracticePanel } from '../../components/learning/PracticePanel'
import { ImageSequenceCanvasExample } from './examples/ImageSequenceCanvasExample'
import imageSequenceCanvasSource from './examples/ImageSequenceCanvasExample.tsx?raw'

export function PracticeImageSequenceCanvasPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Image Sequence / Canvas Scroll</h2>
        <p className="practice__desc">
          제품 회전이나 프레임 시퀀스처럼 스크롤 진행률을 canvas frame으로 연결하는 패턴을 작은 제품 카드로 연습한다.
        </p>
      </header>
      <PracticePanel
        title="스크롤 진행률로 canvas 프레임 갱신하기"
        description="실제 서비스에서는 이미지를 미리 로드해 drawImage로 그린다. 이 실습은 외부 에셋 없이 같은 구조를 익히도록 canvas에 프레임을 직접 그려 ScrollTrigger와 cleanup 흐름을 확인한다."
        code={imageSequenceCanvasSource}
      >
        <ImageSequenceCanvasExample />
      </PracticePanel>
    </article>
  )
}
