/** 재생 상태 제어가 소유하지 않는 playhead 좌표·label 생성·child 구성의 경계를 밝힌다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 현재 routes에 등록된 선행 페이지만 연결해 모르는 slug의 첫 레슨 fallback을 피한다
const relatedPages = [
  { label: 'Timeline을 만들고 child를 순서대로 놓는 법', href: '/fundamentals/timeline-basics' },
  { label: 'label을 만들고 이름으로 위치를 찾는 법', href: '/fundamentals/timeline-labels' },
  { label: '같은 메서드가 Tween 하나를 제어할 때의 계약', href: '/fundamentals/tween-playback-controls' },
  { label: '초·progress·totalProgress의 Tween 좌표계', href: '/fundamentals/tween-playhead' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="timeline-playback-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="05" id="boundaries" title="playback과 playhead의 경계" description="이 페이지는 재생 상태와 명령을 소유합니다. Timeline의 구성과 좌표 이동 전체 계약까지 한 페이지에 섞지 않습니다." />
      <div className="timeline-playback-page__split">
        <div className="timeline-playback-page__prose">
          <p><strong>여기서 소유하는 것</strong> — pause·play·resume·restart·reverse 명령, paused·reversed 상태, isActive 계산, 그리고 이 명령의 label 인자입니다.</p>
          <p><strong>다음 페이지가 소유할 것</strong> — <code>time()</code>, <code>progress()</code>, <code>totalProgress()</code>, <code>totalTime()</code>, <code>tweenTo()</code>, <code>tweenFromTo()</code>처럼 playhead 위치를 직접 또는 부드럽게 옮기는 API입니다.</p>
        </div>
        <ul className="timeline-playback-page__list">
          {relatedPages.map((page) => <li key={page.href}><a href={toHref(page.href)}>{page.label}</a></li>)}
        </ul>
      </div>

      <div className="timeline-playback-page__note">
        <h3>여덟 canonical이 게시하지 않은 내용</h3>
        <p><code>paused(false)</code>와 <code>resume()</code>의 내부 차이, restart 뒤 두 스위치, isActive에 인자를 잘못 넣은 결과, timeScale 0의 실제 동작, reverse 음수의 실제 환산은 공식 문서만으로 확정하지 않았습니다. 필요한 것은 GSAP 3.15.0 probe로 분리했고 공식 분모 65에는 넣지 않았습니다.</p>
      </div>
    </section>
  )
}
