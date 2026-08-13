/** GSAP이 채우는 값이 아니라 사용자가 직접 붙이는 두 표시 — data와 id — 의 계약과 저장 위치를 갈라 설명한다. */
import { InstanceRecordLab } from '../../examples/InstanceRecordLab/InstanceRecordLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 data 전용 페이지가 게시한 signature 한 줄
const dataSignature = 'data : *'

// 두 표시의 공식 명세를 같은 칸으로 대조한다 — 게시되지 않은 칸은 그렇다고 적는다
const marks = [
  {
    name: 'data',
    where: 'instance에 직접 붙습니다',
    type: '* (제한 없음)',
    defaultValue: '공식 페이지에 명시 없음',
    accepted: '문자열, 객체 참조, 무엇이든',
    read: 'yourTween.data',
    purpose: '나중에 이 애니메이션이 무엇이었는지 알아보기 위한 메모',
  },
  {
    name: 'id',
    where: 'vars 안에 남습니다',
    type: '공식 페이지에 명시 없음',
    defaultValue: '공식 페이지에 명시 없음 (선택 사항)',
    accepted: '고유 식별자',
    read: 'gsap.getById(id)',
    purpose: '참조를 들고 있지 않아도 그 애니메이션을 다시 찾기 위한 이름',
  },
]

export function DataAndIdSection() {
  return (
    <section id="data-and-id" className="instance-page__section" aria-labelledby="data-and-id-title">
      <SectionHeading
        number="05"
        id="data-and-id"
        title="내가 직접 붙이는 표시 · data와 id"
        description="지금까지 본 것은 GSAP이 채워 주는 값이었습니다. 이 둘은 반대입니다. 우리가 적어 넣고, 우리가 다시 꺼내 씁니다."
      />

      <div className="instance-page__split">
        <div className="instance-page__prose">
          <p>
            <code>data</code>부터 봅니다. Tween 본문의 special property 설명은 이렇습니다.{' '}
            <strong>
              "임의의 데이터(문자열, 객체 참조, 무엇이든)를 이 property에 지정하면 tween instance 자체에 붙어서 나중에 yourTween.data처럼
              참조할 수 있다."
            </strong>
          </p>
          <p>
            전용 페이지는 더 짧습니다. <strong>"원하는 어떤 데이터든 저장하는 자리(vars.data가 있으면 그 값으로 초기에 채워진다)"</strong>
            가 전부이고, signature는 <code>data : *</code>입니다. <code>*</code>는 <strong>타입을 제한하지 않는다</strong>는 표기입니다.
          </p>
          <p>
            핵심은 <strong>"초기에 채워진다"</strong>는 표현입니다. 생성 시 <code>vars.data</code>의 값을 <code>tween.data</code>의
            초기값으로 할당하지만, 이후 한쪽을 다시 대입해도 다른 쪽이 함께 바뀌지는 않습니다. 객체를 넣었다면 최초에는 같은 객체 참조를
            가리키므로 이를 값 복사로 이해하면 안 됩니다.
          </p>
        </div>
        <pre className="instance-page__signature">
          <code>{dataSignature}</code>
        </pre>
      </div>

      <div className="instance-page__note">
        <h3>id는 조회용 이름입니다</h3>
        <p>
          공식 special property 설명은 이렇습니다.{' '}
          <strong>
            "tween instance에 (선택적으로) 고유 식별자를 붙일 수 있게 해 주므로 나중에 gsap.getById()로 찾을 수 있고, GSDevTools에도 그
            id로 표시된다."
          </strong>
        </p>
        <p>
          <strong>GSDevTools</strong>는 GSAP이 제공하는 애니메이션 디버깅 도구입니다. 이 페이지에서는 이름만 알아 두면 충분합니다.{' '}
          <code>id</code>의 쓸모는 <strong>변수를 넘기지 않고도 애니메이션을 다시 찾는 것</strong>입니다.
        </p>
      </div>

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>공식 설명과 설치본 읽기 결과로 대조한 두 표시</caption>
          <thead>
            <tr>
              <th scope="col">표시</th>
              <th scope="col">남는 자리</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">허용값</th>
              <th scope="col">읽는 방법</th>
              <th scope="col">쓰는 이유</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((mark) => (
              <tr key={mark.name}>
                <th scope="row">
                  <code>{mark.name}</code>
                </th>
                <td>{mark.where}</td>
                <td>{mark.type}</td>
                <td>{mark.defaultValue}</td>
                <td>{mark.accepted}</td>
                <td>
                  <code>{mark.read}</code>
                </td>
                <td>{mark.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="instance-page__note">
        두 표시는 <strong>Properties 표에서의 대우가 다릅니다.</strong> <code>data</code>는 공식 Properties 표에 한 행으로 올라 있지만{' '}
        <code>id</code>는 없습니다. <code>id</code>는 <strong>vars에 적는 설정</strong>일 뿐이고, 인스턴스에 붙는 속성이 아니기
        때문입니다.
      </p>

      <InstanceRecordLab />

      <div className="instance-page__note instance-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p className="instance-page__provenance">
          아래는 공식 문서에 적혀 있지 않습니다. GSAP 3.15.0을 Node에서 직접 실행해 확인한 결과입니다.
        </p>
        <p>
          첫째, <code>id</code>는 인스턴스의 속성이 아닙니다. <code>&apos;id&apos; in tween</code>이 <code>false</code>로 나옵니다.
          읽으려면 <code>tween.vars.id</code>를 보거나 <code>gsap.getById()</code>로 찾아야 합니다.
        </p>
        <p>
          둘째, <code>vars.data</code>를 적지 않고 만들어도 <code>&apos;data&apos; in tween</code>은 <code>true</code>이고 값만{' '}
          <code>undefined</code>입니다. <strong>자리는 항상 있고 비어 있을 뿐</strong>입니다. 그리고 만든 뒤에{' '}
          <code>tween.data</code>에 새 값을 대입해도 <code>tween.vars.data</code>는 따라오지 않습니다. 공식 문서의 "초기에 채워진다"가
          정확히 이 뜻입니다.
        </p>
      </div>
    </section>
  )
}
