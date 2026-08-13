/** 세 특수 ease가 각각 어떤 문제를 푸는지 먼저 세워 선택 기준을 만든다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 겪는 문제 → Core ease로 안 되는 이유 → 쓸 ease를 한 행으로 묶은 정적 표의 데이터
const problems = [
  {
    id: 'scale',
    symptom: '크기를 키우는데, 등속 ease인데도 뒤로 갈수록 느려 보인다',
    reason: '같은 scale 증가량이어도 구간별 배율은 달라진다',
    ease: 'ExpoScaleEase',
    expression: "ease: 'expoScale(1, 2)'",
    owner: 'ExpoScaleEase 문서',
  },
  {
    id: 'rough',
    symptom: '부드러우면 안 된다. 일부러 거칠게 떨거나 규칙적으로 왕복해야 한다',
    reason: '무작위 point나 고른 지그재그의 빈도·세기를 설정해야 한다',
    ease: 'RoughEase',
    expression: "ease: 'rough({strength: 3})'",
    owner: 'RoughEase 문서',
  },
  {
    id: 'slow',
    symptom: '들어오고 나가는 사이에 사람이 읽을 수 있는 등속 구간이 필요하다',
    reason: 'out·none·in tween 세 개를 붙이면 이음매에서 속도가 튄다',
    ease: 'SlowMo',
    expression: "ease: 'slow(0.7, 0.7)'",
    owner: 'SlowMo 문서',
  },
]

export function EaseChoiceSection() {
  return (
    <section id="ease-choice" className="ease-pack-page__section" aria-labelledby="ease-choice-title">
      <SectionHeading
        number="01"
        id="ease-choice"
        title="세 ease는 서로 다른 문제를 푼다"
        description="EasePack은 ease 세 개를 담은 하나의 파일입니다. 이름이 한 묶음일 뿐 서로 관련이 없습니다. 어떤 상황에서 어떤 ease가 필요한지부터 갈라 둡니다."
      />

      <div className="ease-pack-page__prose">
        <p>
          먼저 용어 하나만 짚겠습니다. <strong>ease</strong>는 "시간이 얼마나 흘렀는지"(progress 0→1)를 "값이 얼마나 갔는지"(0→1)로
          바꾸는 함수입니다. 같은 1초, 같은 거리라도 ease가 다르면 중간 값이 전부 달라집니다. ease의 기본 개념과 Core ease 목록은{' '}
          <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>에서 먼저 확인할 수 있습니다.
        </p>
        <p>
          공식 RoughEase 문서는 <strong>"대부분의 easing 방정식은 시작값과 끝값 사이를 부드럽고 점진적으로 전환한다"</strong>고
          적었습니다. RoughEase는 그와 달리 무작위 point나 고른 지그재그를 설정해 거친 효과를 만듭니다. ExpoScaleEase와 SlowMo는
          각각 아래 표의 다른 문제를 해결합니다.
        </p>
      </div>

      <div className="ease-pack-page__table-wrap">
        <table className="ease-pack-page__problem-table">
          <caption>겪는 문제로 ease 고르기</caption>
          <thead>
            <tr>
              <th scope="col">겪는 문제</th>
              <th scope="col">별도 ease가 필요한 이유</th>
              <th scope="col">쓸 ease</th>
              <th scope="col">가장 짧은 형태</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <th scope="row">
                  {problem.symptom}
                  <small>{problem.owner}</small>
                </th>
                <td>{problem.reason}</td>
                <td>
                  <strong>{problem.ease}</strong>
                </td>
                <td>
                  <code>{problem.expression}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ease-pack-page__note">
        <h3>공식 문서가 각 ease를 소개한 문장</h3>
        <p>
          <strong>ExpoScaleEase</strong> — "object의 scale을 animate하면 linear ease를 써도 속도가 변하는 것처럼 보이는 흥미로운
          현상이 있다. ExpoScaleEase는 그에 맞게 easing curve를 구부려 이 효과를 보정한다. 매끄러운 zoom·scale 애니메이션의 비결이다."
        </p>
        <p>
          <strong>RoughEase</strong> — "RoughEase는 그 대신 거칠고 들쭉날쭉한 효과를 쉽게 얻는 방법을 제공한다. 원하면 균등 간격의 앞뒤
          왕복 움직임도 얻을 수 있다."
        </p>
        <p>
          <strong>SlowMo</strong> — "처음에 감속하고, 고를 수 있는 일정 구간 동안 선형으로 움직인 뒤, 끝에서 다시 가속하는 슬로모션
          효과를 만드는 설정 가능한 ease다. 텍스트를 화면으로 zoom해 들여오고, 사람들이 읽을 만큼 부드럽게 움직인 뒤, 다시 zoom해
          내보내는 효과에 좋다."
        </p>
      </div>
    </section>
  )
}
