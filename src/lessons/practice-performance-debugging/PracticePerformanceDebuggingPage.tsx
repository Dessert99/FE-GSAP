import { PracticePanel } from '../../components/learning/PracticePanel'
import { PerformanceDebuggingExample } from './examples/PerformanceDebuggingExample'
import performanceDebuggingSource from './examples/PerformanceDebuggingExample.tsx?raw'

export function PracticePerformanceDebuggingPage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Performance & Debugging Clinic</h2>
        <p className="practice__desc">
          고빈도 pointer 업데이트와 디버깅용 timeline을 한 화면에 두고, 불필요한 tween 생성을 피하는 패턴과 cleanup을 같이 확인한다.
        </p>
      </header>
      <PracticePanel
        title="quickSetter, quickTo, ticker, GSDevTools로 성능과 디버깅 확인하기"
        description="pointer-follow는 quickSetter/quickTo로 매 이벤트마다 새 tween을 만들지 않는다. ticker는 프레임 상태를 읽고, GSDevTools는 별도 디버그 timeline을 안전하게 scrub한다."
        code={performanceDebuggingSource}
      >
        <PerformanceDebuggingExample />
      </PracticePanel>
    </article>
  )
}
