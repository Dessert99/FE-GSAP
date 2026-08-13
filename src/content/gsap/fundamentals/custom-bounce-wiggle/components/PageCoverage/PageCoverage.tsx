/** 두 plugin의 학습 순서와 각 섹션 바로가기를 첫 화면에서 안내한다. */
import { customBounceWiggleMeta, customBounceWiggleSections } from '../../custom-bounce-wiggle.meta'

export function PageCoverage() {
  return (
    <nav className="bounce-wiggle-coverage" aria-label="CustomBounce와 CustomWiggle 학습 순서">
      <div className="bounce-wiggle-coverage__summary">
        <div>
          <strong>{customBounceWiggleMeta.officialSources.length}개</strong>
          <span>ease generator</span>
        </div>
        <div>
          <strong>{customBounceWiggleSections.length}단계</strong>
          <span>학습 순서</span>
        </div>
        <p>
          CustomBounce와 CustomWiggle 모두 설정으로 곡선을 만들고, 그 이름을 Tween의 <code>ease</code>에 넣습니다. 아래 순서대로
          두 plugin의 공통점과 차이를 확인해 보세요.
        </p>
      </div>
      <ol>
        {customBounceWiggleSections.map((section) => (
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
