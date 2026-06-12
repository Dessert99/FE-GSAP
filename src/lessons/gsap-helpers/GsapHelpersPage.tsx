import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { GetPropertyDelayedCallExample } from './examples/GetPropertyDelayedCallExample'
import getPropertyDelayedCallSource from './examples/GetPropertyDelayedCallExample.tsx?raw'
import { QuickMethodsExample } from './examples/QuickMethodsExample'
import quickMethodsSource from './examples/QuickMethodsExample.tsx?raw'
import { TickerExample } from './examples/TickerExample'
import tickerSource from './examples/TickerExample.tsx?raw'

export function GsapHelpersPage() {
  return (
    <LessonLayout
      title="GSAP 헬퍼 메서드"
      description="GSAP 헬퍼 메서드는 애니메이션 값을 읽거나, 고빈도 업데이트를 빠르게 처리하거나, 시간 기반 작업을 예약할 때 쓴다."
    >
      <ExamplePanel
        title="getProperty와 delayedCall"
        description="getProperty는 GSAP이 관리하는 transform·style 값을 읽고, delayedCall은 일정 시간 뒤 콜백을 실행하는 예약 tween을 만든다."
        code={getPropertyDelayedCallSource}
      >
        <GetPropertyDelayedCallExample />
      </ExamplePanel>
      <ExamplePanel
        title="quickTo와 quickSetter"
        description="quickTo는 같은 속성으로 계속 향하는 tween을 재사용하고, quickSetter는 tween 없이 값을 즉시 쓰는 빠른 setter를 만든다."
        code={quickMethodsSource}
      >
        <QuickMethodsExample />
      </ExamplePanel>
      <ExamplePanel
        title="ticker"
        description="ticker는 GSAP의 requestAnimationFrame 루프에 콜백을 붙인다. 매 프레임 직접 계산해야 하는 값에 쓰고, 언마운트 때 remove한다."
        code={tickerSource}
      >
        <TickerExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
