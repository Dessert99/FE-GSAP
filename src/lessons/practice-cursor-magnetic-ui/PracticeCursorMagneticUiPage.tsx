import { PracticePanel } from '../../components/learning/PracticePanel'
import { CursorMagneticUiExample } from './examples/CursorMagneticUiExample'
import cursorMagneticUiSource from './examples/CursorMagneticUiExample.tsx?raw'

export function PracticeCursorMagneticUiPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Cursor / Magnetic UI</h2>
        <p className="practice__desc">
          `quickTo`, `Observer`, hover interaction을 조합해 커서 추적과 magnetic button을 성능 부담 없이 구현한다.
        </p>
      </header>
      <PracticePanel
        title="quickTo와 Observer로 hover 인터랙션 만들기"
        description="pointer move마다 tween을 새로 만들지 않고 quickTo 함수를 재사용한다. Observer는 포인터 진입/이탈 흐름을 하나의 입력 계층으로 묶는다."
        code={cursorMagneticUiSource}
      >
        <CursorMagneticUiExample />
      </PracticePanel>
    </article>
  )
}
