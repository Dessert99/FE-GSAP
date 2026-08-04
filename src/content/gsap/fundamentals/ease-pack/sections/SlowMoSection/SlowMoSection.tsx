/** SlowMo가 생긴 이유와 세 파라미터의 역할, yoyoMode companion tween을 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { SlowMoLab } from '../../examples/SlowMoLab/SlowMoLab'

// 공식 Example code 세 줄 원문
const officialExamples = `//use the default SlowMo ease (linearRatio of 0.7 and power of 0.7)
gsap.to(myText, {duration: 5, x: 600, ease: "slow"});

//this gives the exact same effect as the line above, but uses a different syntax
gsap.to(myText, {duration: 5, x: 600, ease: "slow(0.5, 0.8)"});

//now let's create an opacity tween that syncs with the above positional tween, fading it in at the beginning and out at the end
gsap.from(myText, {duration: 5, opacity: 0, ease: "slow(0.5, 0.8, true)"});`

// 공식 문서가 게시한 세 파라미터를 타입·기본값·허용값으로 정리한 정적 표의 데이터
const parameters = [
  {
    id: 'linear-ratio',
    name: '첫 번째 인자 · linearRatio',
    type: 'Number',
    fallback: '0.7',
    allowed: '0과 1 사이',
    role: '전체 중 변화율이 선형(일정한 속도)인 구간의 비율. 남는 비율은 앞뒤에 반씩 나뉜다',
  },
  {
    id: 'power',
    name: '두 번째 인자 · power',
    type: 'Number',
    fallback: '0.7',
    allowed: '공식 페이지에 범위 명시 없음. 1보다 크면 가운데 선형 구간이 뒤집힌다',
    role: '양 끝 ease의 강도',
  },
  {
    id: 'yoyo-mode',
    name: '세 번째 인자 · yoyoMode',
    type: 'Boolean',
    fallback: 'false',
    allowed: 'true | false',
    role: '일반 SlowMo tween과 동기화되는 companion tween을 쉽게 만든다',
  },
]

export function SlowMoSection() {
  return (
    <section id="slow-mo" className="ease-pack-page__section" aria-labelledby="slow-mo-title">
      <SectionHeading
        number="05"
        id="slow-mo"
        title="SlowMo · 가운데를 읽을 수 있게 붙잡아야 하는 문제"
        description="들어오고 → 등속으로 머물고 → 나가는 움직임입니다. 예전에는 tween 세 개로 만들었고 그게 이 ease가 생긴 이유입니다."
      />

      <div className="ease-pack-page__prose">
        <p>
          공식 문서는 SlowMo 이전의 방식을 이렇게 적었습니다. 애니메이터들은 <strong>ease <code>.out</code> tween, ease{' '}
          <code>"none"</code> tween, ease <code>.in</code> tween 세 개를 이어 붙여</strong> 같은 효과를 내려 했습니다.
        </p>
        <p>
          문제는 <strong>"ease들이 서로 부드럽게 이어지지 않아 이음매에서 속도가 갑자기 바뀌는 게 보였다"</strong>는 점이었습니다.
          SlowMo는 그 셋을 <strong>하나의 곡선</strong>으로 만들어 이 문제를 없애고, 양 끝 ease의 강도와 가운데 선형 구간의 비율을 완전히
          제어하게 해 줍니다.
        </p>
      </div>

      <div className="ease-pack-page__table-wrap">
        <table className="ease-pack-page__rules-table">
          <caption>slow 문자열이 받는 인자</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">허용값·특수값</th>
              <th scope="col">하는 일</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter.id}>
                <th scope="row">{parameter.name}</th>
                <td>{parameter.type}</td>
                <td>
                  <code>{parameter.fallback}</code>
                </td>
                <td>{parameter.allowed}</td>
                <td>{parameter.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ease-pack-page__note">
        <h3>linearRatio를 공식 문서가 계산한 방식</h3>
        <p>
          <strong>0.5</strong>를 넣으면 절반이 선형이므로, 앞 <strong>25%</strong>가 ease out(감속), 가운데 <strong>50%</strong>가 선형,
          마지막 <strong>25%</strong>가 ease in(가속)입니다. <strong>0.8</strong>이면 80%가 선형이고 양 끝에 <strong>10%</strong>씩
          남습니다. 남는 비율을 반으로 나눠 앞뒤에 붙이는 규칙입니다.
        </p>
      </div>

      <div className="ease-pack-page__subheading">
        <h3>yoyoMode는 짝이 되는 tween의 타이밍 계산을 대신해 줍니다</h3>
        <p>
          텍스트가 들어와서 머물다 나가는 동안 <strong>투명도도 같이</strong> 움직이고 싶을 때가 있습니다. 공식 문서가 든 예가 정확히
          그것입니다.
        </p>
      </div>

      <div className="ease-pack-page__prose">
        <p>
          <strong>보통이라면</strong> alpha tween을 두 개 만들어야 합니다. 하나는 시작의 fade in, 하나는 끝의 fade out입니다. 그리고{' '}
          <strong>선형 구간이 시작될 때 fade in이 끝나고, 선형 구간이 끝날 때 fade out이 시작되도록 duration을 직접 계산</strong>해야
          합니다. linearRatio를 바꿀 때마다 그 계산을 다시 해야 하는 것이 문제입니다.
        </p>
        <p>
          공식 문서의 해법은 이렇습니다. <strong>"alpha용 tween을 따로 만들고 같은 duration에 yoyoMode를 true로 설정한 SlowMo ease를
          쓰기만 하면 된다."</strong> 계산이 사라지고 <code>duration</code>만 맞추면 끝입니다.
        </p>
      </div>

      <pre className="ease-pack-page__code">
        <code>{officialExamples}</code>
      </pre>

      <div className="ease-pack-page__note ease-pack-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          <strong>공식 예제의 두 번째 주석은 사실과 다릅니다.</strong> 주석은 <code>"slow(0.5, 0.8)"</code>이 <code>"slow"</code>와
          "정확히 같은 효과"라고 적었지만, 기본값이 <code>0.7</code>·<code>0.7</code>이므로 두 곡선은 다릅니다. progress 0.1에서 각각{' '}
          <code>0.375</code>와 <code>0.366</code>이었습니다. 공식 문서의 다른 문장(기본값 0.7)이 맞고 이 주석이 틀렸습니다.
        </p>
        <p>
          <strong>linearRatio에 0을 넣으면 무시됩니다.</strong> 0을 넘기면 기본값 <code>0.7</code>이 그대로 쓰였습니다. "선형 구간을
          없애겠다"는 뜻으로 0을 쓰면 정반대 결과가 됩니다.
        </p>
        <p>
          <strong>yoyoMode 곡선은 0 → 1 → 0입니다.</strong> 값이 올라갔다가 다시 내려오기 때문에 같은 duration의{' '}
          <code>gsap.from(..., {'{'} opacity: 0 {'}'})</code>이 저절로 fade in 후 fade out이 됩니다.
        </p>
        <p className="ease-pack-page__provenance">세 항목 모두 GSAP 3.15.0 설치본을 직접 실행해 확인한 내용입니다.</p>
      </div>

      <SlowMoLab />
    </section>
  )
}
