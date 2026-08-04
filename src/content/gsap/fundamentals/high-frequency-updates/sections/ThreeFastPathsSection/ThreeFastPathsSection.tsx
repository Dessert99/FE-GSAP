/** 세 API가 각각 무엇을 돌려주고 언제 고르는지를 하나의 선택 표로 판단하게 한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 읽기·즉시 쓰기·부드럽게 따라가기 세 경로를 반환값·보간 여부·선택 기준으로 나란히 비교하는 정적 표의 데이터
const fastPaths = [
  {
    id: 'get',
    label: 'gsap.getProperty()',
    role: '읽기',
    returns: '요청한 값 (Returns : *)',
    interpolation: '없음 — 값을 바꾸지 않습니다',
    pick: '쓰기 전에 현재 값을 알아야 할 때, GSAP이 실제로 쓴 값을 확인할 때',
  },
  {
    id: 'set',
    label: 'gsap.quickSetter()',
    role: '즉시 쓰기',
    returns: 'Returns : Function',
    interpolation: '없음 — 넣은 숫자가 그 프레임에 그대로 적용됩니다',
    pick: '입력을 그대로 반영해야 할 때. 손가락에 딱 붙는 드래그, 커서에 정확히 붙는 좌표',
  },
  {
    id: 'to',
    label: 'gsap.quickTo()',
    role: '부드럽게 따라가기',
    returns: 'Returns : Function',
    interpolation: '있음 — duration·ease를 거쳐 목표값으로 흘러갑니다',
    pick: '입력을 뒤따라오게 만들 때. 관성이 있는 커서 추적, 부드러운 시차 이동',
  },
]

export function ThreeFastPathsSection() {
  return (
    <section id="three-fast-paths" className="hfu-page__section" aria-labelledby="three-fast-paths-title">
      <SectionHeading
        number="03"
        id="three-fast-paths"
        title="읽기·즉시 쓰기·부드럽게 따라가기"
        description="세 API의 차이는 딱 한 가지 질문으로 갈립니다. 넣은 값이 화면에 바로 나타나야 하나요, 아니면 시간을 두고 흘러가야 하나요?"
      />

      <div className="hfu-page__prose">
        <p>
          <code>quickSetter</code>와 <code>quickTo</code>는 이름도 비슷하고 만드는 방식도 비슷하지만, 하는 일이 다릅니다. 공식 문서가
          쓴 표현을 그대로 옮기면 이렇습니다.
        </p>
        <p>
          <code>quickSetter</code>는 <strong>"특정 target(들)의 특정 property에 묶인 최적화 함수"</strong>이고,{' '}
          <code>quickTo</code>는 <strong>"하나의 특정 numeric property에 묶인 최적화 함수"</strong>입니다. 둘 다 값을 그 property로{' '}
          <strong>직접 흘려보내고</strong> 일반 호출의 편의 작업을 건너뜁니다. 그리고 둘 다 반환 표기가{' '}
          <code>Returns : Function</code>입니다. <strong>값이 아니라 함수를 돌려받는다는 것</strong>이 이 페이지의 핵심입니다.
        </p>
        <p>
          결정적 차이는 <strong>보간(interpolation)</strong>입니다. 보간은 시작값과 목표값 사이의 중간값을 시간에 따라 채워 넣는
          일입니다. <code>quickSetter</code>에는 이게 없습니다. 넣은 숫자가 곧 결과입니다. <code>quickTo</code>에는 있습니다. 그래서{' '}
          <code>quickTo</code>에만 <strong>선택적인 3번째 파라미터인 tween vars 객체</strong>가 있고, 거기에{' '}
          <code>duration</code>, <code>ease</code> 같은 tween 관련 설정을 적습니다.
        </p>
      </div>

      <div className="hfu-page__table-wrap">
        <table className="hfu-page__channel-table">
          <caption>고빈도 갱신에서 무엇을 고를지</caption>
          <thead>
            <tr>
              <th scope="col">API</th>
              <th scope="col">하는 일</th>
              <th scope="col">돌려주는 것</th>
              <th scope="col">보간</th>
              <th scope="col">이럴 때 고릅니다</th>
            </tr>
          </thead>
          <tbody>
            {fastPaths.map((path) => (
              <tr key={path.id}>
                <th scope="row">
                  <code>{path.label}</code>
                  <small>{path.role}</small>
                </th>
                <td>{path.role}</td>
                <td>{path.returns}</td>
                <td>{path.interpolation}</td>
                <td>{path.pick}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="hfu-page__note">
        공식 <code>quickSetter</code> 문서도 이 갈림길을 직접 짚습니다. quickSetter는 <strong>값을 즉시 설정하는 것이 목적</strong>
        이므로, 새 값으로 <em>animate</em>하고 싶다면 <code>gsap.quickTo()</code> 쪽을 보라고 안내하고, quickTo를 쓴 mouse follower
        데모를 나란히 게시합니다.
      </p>

      <div className="hfu-page__warning">
        <h3>먼저 물어야 할 질문 — 정말 필요한가요?</h3>
        <p>
          공식 문서는 이 도구들을 소개하면서 <strong>note로 제동을 겁니다.</strong> "<code>gsap.set()</code>을 쓰기를 두려워하지 마라.
          대부분의 경우 quickSetter로 바꿔도 실제 성능 차이를 느끼지 못하고, <code>gsap.set()</code>은 가치 있는 편의를 많이 준다."
          quickSetter는 <strong>갱신이 아주 많은 성능 임계 상황</strong>을 위한 hyper-optimized 도구라고 못 박습니다.
        </p>
        <p>
          기준을 이렇게 잡으면 됩니다. <strong>클릭, hover, 화면 진입처럼 어쩌다 한 번 일어나는 일이라면</strong>{' '}
          <code>gsap.set()</code>과 <a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a>로 충분합니다. 다음 단계에서 볼 "포기해야
          하는 것"들을 감수할 이유가 없습니다.
        </p>
      </div>
    </section>
  )
}
