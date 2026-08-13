/** Observer state 전환과 다음 학습 경계를 설명한다. */
import { toHref } from '../../../../../../app/routes'

/** press, tolerance, release의 상태 경계를 먼저 정의한다. */
export function TransitionSection() {
  return (
    <section aria-labelledby="observer-transition-title">
      <h2 id="observer-transition-title">tolerance와 release boundary</h2>
      <p>
        <code>isPressed</code>는 pointer/touch press부터 release까지 true입니다.
        press 직후
        <code>isDragging</code>은 false이고, 이동 거리가{' '}
        <code>dragMinimum</code>을 넘을 때 true가 됩니다.
      </p>
      <p>
        drag가 시작된 뒤에는 target 밖의 이동도 release까지 이어집니다. 이
        페이지에서는 상태가 바뀌는 시점에 집중합니다. listener 생성과 callback
        option은{' '}
        <a href={toHref('/fundamentals/observer-create')}>
          Observer 만들기와 찾기
        </a>
        에서, 실제 signal 값은{' '}
        <a href={toHref('/fundamentals/observer-signals')}>Observer 신호 읽기</a>
        에서 다룹니다.
      </p>
    </section>
  )
}
