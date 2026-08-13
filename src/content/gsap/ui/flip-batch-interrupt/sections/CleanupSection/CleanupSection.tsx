/** batch cleanup과 등록된 prerequisite 링크를 분리한다. */
import { toHref } from '../../../../../../app/routes'
export function CleanupSection() {
  return (
    <section>
      <h2>05 · cleanup</h2>
      <p>
        unmount 때 batch와 active flips를 kill합니다.{' '}
        <a href={toHref('/fundamentals/flip-first-last')}>
          Flip의 First/Last 기본 순서
        </a>
        와{' '}
        <a href={toHref('/fundamentals/flip-fit-absolute')}>
          fit·absolute 레이아웃 도구
        </a>
        를 먼저 복습하면 batch의 측정·변경·재생 순서를 이해하기 쉽습니다.
      </p>
    </section>
  )
}
