/** 콜백 조작부터 완료 대기까지 이어지는 다섯 학습 단계의 바로가기를 제공한다. */
import { tweenCallbacksPromiseSections } from '../../tween-callbacks-promise.meta'

export function PageCoverage() {
  return (
    <nav className="callbacks-coverage" aria-label="학습 순서">
      <div className="callbacks-coverage__summary">
        <div>
          <strong>{tweenCallbacksPromiseSections.length}단계</strong>
          <span>학습 순서</span>
        </div>
        <p>
          이미 만든 Tween의 콜백을 읽고 바꾸는 방법부터, 완료를 Promise로 기다리는 방법까지 순서대로 살펴봅니다.
        </p>
      </div>
      <ol>
        {tweenCallbacksPromiseSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>이 단계로 이동</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
