/** 곡선 문자열을 손으로 적지 않고 공식 Ease Visualizer에서 그려 가져오는 절차를 정리한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 "Creating a Custom Ease"와 편집 힌트 목록에 나눠 적은 조작을 한 표로 합친 데이터
const operations = [
  { id: 'add', action: '점 추가', how: '곡선 위 아무 곳에서 ALT/OPTION-click' },
  { id: 'delete', action: '점 삭제', how: '점을 선택한 뒤 키보드 DELETE 키' },
  { id: 'toggle', action: 'smooth ↔ corner 전환', how: 'anchor point에 ALT/OPTION-click' },
  { id: 'handle-out', action: 'corner에서 handle 꺼내기', how: 'corner anchor에서 ALT-DRAG' },
  { id: 'handle-corner', action: 'handle을 corner로 바꾸기', how: 'control handle을 ALT/OPTION-drag' },
  { id: 'multi', action: '여러 점 선택', how: 'SHIFT를 누른 채 anchor point 클릭' },
  { id: 'undo', action: '실행 취소', how: 'CTRL-Z' },
  { id: 'snap', action: 'snapping 끄기', how: '드래그하는 동안 SHIFT를 누르고 있기' },
  { id: 'edit-other', action: '다른 ease를 바탕으로 편집', how: '그 ease를 고른 뒤 "CustomEase" 누르기' },
]

export function VisualizerSection() {
  return (
    <section id="visualizer" className="custom-ease-page__section" aria-labelledby="visualizer-title">
      <SectionHeading
        number="05"
        id="visualizer"
        title="곡선을 그려서 문자열로 가져옵니다"
        description="긴 좌표 문자열을 손으로 적는 사람은 없습니다. 공식 문서는 Ease Visualizer에서 곡선을 그리거나 SVG를 붙여 넣어 문자열을 얻으라고 안내합니다."
      />

      <div className="custom-ease-page__prose">
        <p>
          <strong>Ease Visualizer</strong>는 공식 CustomEase 문서 안에 들어 있는 편집기입니다. 곡선을 마우스로 끌어 모양을 만들면 그에
          해당하는 데이터 문자열을 아래쪽에 보여 줍니다. 그 문자열을 복사해 <code>create()</code>의 두 번째 인자로 넣으면 끝입니다.
        </p>
        <p>
          이 편집기는 공식 사이트에서만 동작하므로 여기서는 <strong>어떤 조작이 있는지</strong>만 정리합니다. 아래 링크로 열어 표대로
          눌러 보세요.
        </p>
        <div className="custom-ease-page__official-links">
          <OfficialDocsLink label="Ease Visualizer" href="https://gsap.com/docs/v3/Eases/CustomEase" />
        </div>
      </div>

      <div className="custom-ease-page__table-wrap">
        <table className="custom-ease-page__rules-table">
          <caption>공식 문서가 안내하는 Ease Visualizer 조작</caption>
          <thead>
            <tr>
              <th scope="col">하고 싶은 것</th>
              <th scope="col">조작</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr key={operation.id}>
                <th scope="row">{operation.action}</th>
                <td>{operation.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="custom-ease-page__note">
        <h3>용어 두 개만 짚고 갑니다</h3>
        <p>
          <strong>anchor point</strong>는 곡선이 실제로 지나가는 점이고, <strong>control handle</strong>은 그 점에서 뻗어 나와 곡선의
          휘는 정도를 잡는 손잡이입니다. <strong>smooth</strong> 점은 양쪽 손잡이가 일직선으로 이어져 부드럽게 지나가고,{' '}
          <strong>corner</strong> 점은 양쪽이 따로 놀아 꺾입니다. hop처럼 바닥을 찍고 튀어 오르는 곡선은 그 바닥이 corner 점입니다.
        </p>
      </div>

      <div className="custom-ease-page__subheading">
        <h3>디자이너가 준 SVG를 그대로 붙여 넣기</h3>
        <p>공식 문서는 Illustrator 같은 도구에서 만든 path를 통째로 옮기는 방법도 안내합니다. 순서는 이렇습니다.</p>
      </div>

      <ol className="custom-ease-page__list">
        <li>Ease Visualizer를 "custom" 모드로 둡니다.</li>
        <li>아래쪽 보라색 텍스트, 즉 CustomEase 데이터 문자열을 전부 선택합니다.</li>
        <li>그 자리에 Adobe Illustrator 같은 데서 가져온 SVG path를 붙여 넣습니다.</li>
        <li>
          다른 곳을 클릭하면 Ease Visualizer가 <strong>첫 번째 <code>&lt;path&gt;</code></strong>를 집어 올바른 형식으로 변환합니다.
        </li>
      </ol>

      <p className="custom-ease-page__note">
        붙여 넣는 자리가 두 곳이라는 점만 헷갈리지 않으면 됩니다. <strong>보라색</strong> 텍스트는 SVG path 데이터 자리이고,{' '}
        <strong>주황색</strong> 입력란은 04단계에서 본 <code>cubic-bezier</code> 네 숫자 자리입니다.
      </p>
    </section>
  )
}
