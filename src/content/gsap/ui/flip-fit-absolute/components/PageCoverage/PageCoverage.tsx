/** fit과 absolute 배치의 차이를 익히는 다섯 학습 단계를 안내한다. */
import { flipFitAbsoluteSections } from '../../flip-fit-absolute.meta'
export function PageCoverage() {
  return (
    <aside className="flip-fit-absolute-page__coverage">
      <strong>학습 순서</strong>
      <span>좌표 공간, fit 방식, absolute 전환과 복구</span>
      <ol>
        {flipFitAbsoluteSections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>
              {s.number} · {s.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
