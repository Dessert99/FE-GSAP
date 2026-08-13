/** 반복 설정에서 값 재계산까지 이어지는 학습 순서를 첫 화면에서 안내한다. */
import { tweenRepeatsSections } from '../../tween-repeats.meta'

export function PageCoverage() {
  return (
    <nav className="repeats-coverage" aria-label="학습 순서">
      <div className="repeats-coverage__summary">
        <strong>학습 순서</strong>
        <p>
          먼저 반복 횟수·간격·방향과 현재 회차를 익히고, 그다음 같은 Tween이 시작값과 끝값을 언제 다시 읽는지 확인합니다.
        </p>
      </div>
      <ol>
        {tweenRepeatsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
