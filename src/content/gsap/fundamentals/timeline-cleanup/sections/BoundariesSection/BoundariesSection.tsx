/** Timeline 내부 mutation과 UI 영역 전체 lifecycle cleanup의 소유권 경계를 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="tl-cleanup-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="06" id="boundaries" title="UI 생명주기 cleanup과 경계를 긋는다" description="이 페이지는 한 Timeline object graph을 직접 바꾸는 API만 소유합니다. React component나 반응형 조건 전체의 정리는 더 큰 lifecycle 도구가 맡습니다." />
      <ul className="tl-cleanup-page__link-list">
        <li><a href={toHref('/fundamentals/timeline-inspection')}>Timeline inspection</a> — 정리 전후 <code>getChildren()</code>·<code>getTweensOf()</code>로 object graph을 읽는 방법을 소유합니다.</li>
        <li><a href={toHref('/fundamentals/find-stop-animations')}>find &amp; stop animations</a> — Timeline 참조가 없을 때 전역 registry에서 Tween을 찾고 멈추는 방법을 소유합니다.</li>
        <li><a href={toHref('/fundamentals/gsap-context')}>gsap.context()</a> — 한 UI 영역에서 만든 여러 GSAP 작업과 inline style을 한 번에 되돌리는 경계를 소유합니다.</li>
        <li><a href={toHref('/fundamentals/react-use-gsap')}>React useGSAP()</a> — component mount·update·unmount에 맞춘 자동 cleanup을 소유합니다.</li>
      </ul>
      <p className="tl-cleanup-page__note">등록되지 않은 경로는 연결하지 않았습니다. Timeline을 계속 쓸지, Timeline은 버리되 화면은 남길지, UI 전체를 원상복구할지를 먼저 정하면 가장 작은 cleanup 도구를 고를 수 있습니다.</p>
    </section>
  )
}
