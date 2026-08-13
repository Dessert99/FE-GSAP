/** amplitudeEase·timingEase가 무엇을 나눠 맡고 왜 type을 덮어쓰는지 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const overrideCode = `// type만 쓰면 preset 조합이 적용됩니다.
CustomWiggle.create('a', { wiggles: 6, type: 'uniform' })

// amplitudeEase를 함께 주면 type은 무시됩니다.
CustomWiggle.create('b', { wiggles: 6, type: 'uniform', amplitudeEase: 'power4.in' })`

/** 공식 Config Object 표의 고급 항목 두 개를 축 기준으로 나눠 옮긴다. */
const advancedOptions = [
  {
    name: 'amplitudeEase',
    axis: '세로(y축) · 얼마나 크게',
    detail:
      'ease visualizer의 y축, 즉 진폭의 모양을 고급 제어합니다. tween 전체에서 진폭이 1에서 0으로 진행하는 방식을 직접 정의합니다.',
  },
  {
    name: 'timingEase',
    axis: '가로(x축) · 언제',
    detail: 'ease visualizer의 x축, 즉 파형이 시간에 따라 어떻게 그려지는지를 고급 제어합니다.',
  },
]

export function WiggleAdvancedSection() {
  return (
    <section id="wiggle-advanced" className="bounce-wiggle-page__section" aria-labelledby="wiggle-advanced-title">
      <SectionHeading
        number="07"
        id="wiggle-advanced"
        title="amplitudeEase와 timingEase는 type을 덮어쓴다"
        description="다섯 개 type은 사실 두 개의 ease를 조합해 둔 preset입니다. 그래서 둘 중 하나라도 직접 주면 type은 무시됩니다."
      />

      <div className="bounce-wiggle-page__table-wrap">
        <table className="bounce-wiggle-page__options-table">
          <caption>CustomWiggle 설정 객체 · 고급 항목 두 개</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">어느 축을 맡나</th>
              <th scope="col">무엇을 바꾸나</th>
            </tr>
          </thead>
          <tbody>
            {advancedOptions.map((option) => (
              <tr key={option.name}>
                <th scope="row">
                  <code>{option.name}</code>
                </th>
                <td>Ease</td>
                <td>공식 페이지에 명시 없음</td>
                <td>{option.axis}</td>
                <td>{option.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            앞 섹션의 예제에서 <code>type</code>을 바꿔 보면 진동 횟수는 그대로인데 <strong>어느 시점이 가장 크게 흔들리는지</strong>{' '}
            달라졌습니다. 그 "얼마나 크게"를 시간에 따라 정하는 것이 <code>amplitudeEase</code>이고, "언제"를 정하는 것이{' '}
            <code>timingEase</code>입니다.
          </p>
          <p>
            공식 문서는 이 관계를 분명히 밝힙니다. <strong>"amplitudeEase(또는 timingEase)를 정의하면 type을 override한다. 5개
            type은 두 ease 조합의 편의 preset이라고 생각하면 된다."</strong>
          </p>
          <p>
            그러니까 <strong>type과 두 ease는 함께 적용되는 것이 아닙니다.</strong> 둘 중 하나라도 적는 순간 type은 무시됩니다.
            이 점만 착각하지 않으면 됩니다.
          </p>
        </div>
        <pre className="bounce-wiggle-page__code">
          <code>{overrideCode}</code>
        </pre>
      </div>

      <div className="bounce-wiggle-page__warning">
        <h3>공식 문서가 밝히지 않은 것</h3>
        <p>
          두 항목의 타입은 <code>Ease</code>라고만 적혀 있습니다. <strong>기본값도, 어떤 ease 문자열이 허용되는지도, 둘을 동시에
          줬을 때의 우선순위도 게시돼 있지 않습니다.</strong> 이 페이지는 없는 명세를 채우지 않고 그대로 비워 둡니다.
        </p>
        <p>
          그래서 앞 예제의 조작 항목에도 두 ease를 넣지 않았습니다. 실제로 쓸 일이 생기면 공식 CustomWiggle 문서가 연결한 시각화
          CodePen에서 직접 확인하는 것이 맞습니다.
        </p>
      </div>
    </section>
  )
}
