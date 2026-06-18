import { PracticePanel } from '../../components/learning/PracticePanel'
import { ToastNotificationQueueExample } from './examples/ToastNotificationQueueExample'
import toastNotificationQueueSource from './examples/ToastNotificationQueueExample.tsx?raw'

export function PracticeToastNotificationQueuePage() {
  return (
    <article className="practice">
      <header className="practice__header">
        <h2 className="practice__title">실무 실습: Toast / Notification Queue</h2>
        <p className="practice__desc">
          여러 알림이 들어오고, 쌓이고, 사라지는 흐름에서 React queue와 GSAP enter/exit 모션을 충돌 없이 연결한다.
        </p>
      </header>
      <PracticePanel
        title="알림 queue와 enter/exit 모션"
        description="알림은 데이터 배열이 source of truth다. GSAP은 새 항목의 등장과 제거 직전 exit만 담당하고, 타이머 cleanup으로 route 이동 후 setState를 막는다."
        code={toastNotificationQueueSource}
      >
        <ToastNotificationQueueExample />
      </PracticePanel>
    </article>
  )
}
