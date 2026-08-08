/** P16 setup 결과를 등록된 선행 학습 링크로 연결한다. */
import { toHref } from '../../../../../../app/routes'

export function EstablishedTrackerSection() {
  return (
    <section id="established-tracker">
      <p>01 · established tracker</p>
      <h2>읽기 전에 stable target을 tracking해야 합니다</h2>
      <p>
        velocity는 object 자체가 아니라{' '}
        <strong>그 object를 가리키는 tracker</strong>에서 나옵니다. 이 페이지는{' '}
        <a href={toHref('/fundamentals/velocity-tracker-lifecycle')}>
          P16 VelocityTracker lifecycle
        </a>
        의 <code>VelocityTracker.track(target, 'x,rotation')</code> setup이 이미
        끝났다고 가정합니다.
      </p>
      <div className="velocity-tracker-read-page__card">
        <h3>target은 reference identity입니다</h3>
        <p>
          <code>tracker.target</code>은 tracker와 associated target object를
          돌려줍니다. 같은 숫자를 새 object에 복사해도 같은 tracker가 되지는
          않으므로 stable reference로 <code>getByTarget()</code>을 호출합니다.
        </p>
      </div>
    </section>
  )
}
