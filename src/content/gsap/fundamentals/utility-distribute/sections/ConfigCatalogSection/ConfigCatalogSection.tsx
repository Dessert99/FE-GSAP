/** 일곱 config field의 타입·기본값·허용값·역할을 한 표로 보존한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Parameters 절의 일곱 property를 빠짐없이 옮긴 표 데이터다
const configRows = [
  { name: 'base', type: 'Number', defaultValue: '0', allowed: '숫자', role: '배분이 시작되는 기준값' },
  { name: 'amount', type: 'Number', defaultValue: '게시 안 됨', allowed: '숫자', role: '전체 target에 나눌 총량, base에 더함' },
  { name: 'each', type: 'Number', defaultValue: '게시 안 됨', allowed: '숫자', role: '거리 단계마다 더할 간격, base에 더함' },
  { name: 'from', type: 'Number | String | Array', defaultValue: '0', allowed: 'index · start · center · edges · random · end · [x, y] 비율', role: '배분을 시작할 targets 위치' },
  { name: 'grid', type: 'String | Array', defaultValue: '게시 안 됨', allowed: 'auto · [rows, columns]', role: 'flat 대신 grid 위치를 사용' },
  { name: 'axis', type: 'String', defaultValue: '게시 안 됨', allowed: 'x · y', role: 'grid 거리 측정을 한 축으로 제한' },
  { name: 'ease', type: 'Ease', defaultValue: 'none', allowed: 'GSAP Ease', role: '거리 비율에 ease 곡선을 적용' },
]

export function ConfigCatalogSection() {
  return (
    <section id="config-catalog" className="utility-distribute-page__section" aria-labelledby="config-catalog-title">
      <SectionHeading number="04" id="config-catalog" title="config 일곱 칸을 빠짐없이 읽는다" description="공식 Parameters 절은 config 자체와 일곱 property를 설명합니다. 모든 property는 선택 사항입니다." />
      <div className="utility-distribute-page__table-wrap">
        <table className="utility-distribute-page__table"><caption>distribute config property catalog</caption><thead><tr><th scope="col">property</th><th scope="col">공식 타입</th><th scope="col">공식 기본값</th><th scope="col">허용값·special value</th><th scope="col">역할</th></tr></thead><tbody>{configRows.map((row) => <tr key={row.name}><th scope="row"><code>{row.name}</code></th><td>{row.type}</td><td>{row.defaultValue}</td><td>{row.allowed}</td><td>{row.role}</td></tr>)}</tbody></table>
      </div>
      <p className="utility-distribute-page__note">공식 종합 예제는 <code>base: 50</code>, <code>amount: 100</code>, <code>from: 'center'</code>, <code>grid: 'auto'</code>, <code>axis: 'y'</code>, <code>ease: 'power1.inOut'</code>을 함께 보여 줍니다.</p>
      <aside className="utility-distribute-page__probe"><h3>GSAP 3.15.0 probe · 빈 config</h3><p><code>distribute({})</code>의 반환 함수를 네 target에 호출하자 모두 숫자 0이었습니다. 이는 게시된 개별 기본값과 일치하는 실행 관찰이며 공식 조합 예시는 아닙니다.</p></aside>
    </section>
  )
}
