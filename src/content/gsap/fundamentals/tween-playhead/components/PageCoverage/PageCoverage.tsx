/** Tween playhead를 이해하는 여섯 단계와 각 단계의 질문을 첫 화면에서 안내한다. */
const learningSteps = [
  ['두 범위의 playhead', '이번 cycle과 전체 반복을 구분합니다.'],
  ['raw와 eased 값', 'progress와 ratio의 차이를 확인합니다.'],
  ['단위와 범위 선택', '비율·초, local·total 중 필요한 method를 고릅니다.'],
  ['같은 순간의 값 비교', '다섯 playhead 값을 한 번에 읽습니다.'],
  ['즉시 위치 이동', 'seek와 callback 실행 조건을 비교합니다.'],
  ['반복과 끝 기준', 'yoyo·repeatDelay와 음수 입력의 경계를 확인합니다.'],
] as const

export function PageCoverage() {
  return (
    <aside className="tween-playhead-page__coverage" aria-labelledby="tween-playhead-coverage-title">
      <div><p>학습 순서</p><h2 id="tween-playhead-coverage-title">6단계</h2></div>
      <ul>{learningSteps.map(([title, description]) => <li key={title}><strong>{title}</strong><span>{description}</span></li>)}</ul>
    </aside>
  )
}
