/** tracking property와 Inertia consumer의 cleanup 경계를 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
/** unmount에서 property remove와 whole-target untrack을 남기지 않게 한다. */
export function CleanupSection() {
  return (
    <section>
      <SectionHeading number="05" title="cleanup" />
      <p>
        unmount에서는 남아 있는 <code>x</code>와 <code>rotation</code>을
        instance remove하고 static <code>untrack(target)</code>으로 whole-target
        lifecycle을 끝냅니다. tracker가 읽은 velocity로 inertia tween을 만드는
        다음 소비자는{' '}
        <a href={toHref('/fundamentals/inertia')}>InertiaPlugin 페이지</a>에서
        다룹니다.
      </p>
    </section>
  )
}
