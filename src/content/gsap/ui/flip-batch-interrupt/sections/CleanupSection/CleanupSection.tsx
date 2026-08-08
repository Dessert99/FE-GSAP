/** batch cleanup과 등록된 prerequisite 링크를 분리한다. */
import { toHref } from '../../../../../../app/routes'
export function CleanupSection() {
  return (
    <section>
      <h2>05 · cleanup</h2>
      <p>
        unmount 때 batch와 active flips를 kill합니다.{' '}
        <a href={toHref('/fundamentals/flip-first-last')}>
          P11 Flip fundamentals
        </a>
        와{' '}
        <a href={toHref('/fundamentals/flip-fit-absolute')}>
          P12 Flip layout tools
        </a>
        를 먼저 복습하고 P14 이후 API는 text-only입니다.
      </p>
    </section>
  )
}
