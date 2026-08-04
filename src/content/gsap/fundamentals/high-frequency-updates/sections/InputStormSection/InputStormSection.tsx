/** 고빈도 입력이라는 문제 상황을 먼저 세워 왜 다른 도구가 필요한지 납득시킨다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 50번 갱신했을 때 실제로 남는 Tween 수 — 공식 문서에 없어 설치본을 직접 실행해 센 값이다
const tweenCountRows = [
  {
    id: 'to',
    call: 'gsap.to(target, { x: value, duration: 0.3 })',
    label: '입력마다 새 Tween',
    tweens: '50개',
    note: '갱신할 때마다 인스턴스가 하나씩 더 생깁니다.',
  },
  {
    id: 'quick-to',
    call: 'xTo(value)',
    label: 'quickTo 함수 재사용',
    tweens: '1개',
    note: '함수를 만들 때 생긴 Tween 하나를 계속 다시 씁니다.',
  },
  {
    id: 'quick-setter',
    call: 'setX(value)',
    label: 'quickSetter 함수 재사용',
    tweens: '0개',
    note: '시간이 흐르지 않으므로 Tween이 아예 없습니다.',
  },
]

export function InputStormSection() {
  return (
    <section id="input-storm" className="hfu-page__section" aria-labelledby="input-storm-title">
      <SectionHeading
        number="01"
        id="input-storm"
        title="입력 한 번에 Tween 하나씩 만들면"
        description="이 페이지의 세 API는 모두 같은 문제에서 출발합니다. 그 문제를 먼저 정확히 세워야 세 도구의 차이가 보입니다."
      />

      <div className="hfu-page__prose">
        <p>
          용어 하나만 먼저 정하겠습니다. 이 페이지에서 <strong>고빈도 입력</strong>은 <code>pointermove</code>, <code>scroll</code>,
          <code>resize</code>처럼 <strong>1초에 수십 번 이상 발생하는 이벤트</strong>를 말합니다. 마우스가 화면을 한 번 가로지르는
          동안에도 <code>pointermove</code>는 보통 수십 번 발생합니다.
        </p>
        <p>
          <code>gsap.to()</code>는 호출할 때마다 <strong>Tween 인스턴스를 하나 새로 만듭니다.</strong> Tween은 "어떤 값을 어디서
          어디까지 몇 초 동안 옮길지"를 담은 객체이고, 만들어지는 순간 GSAP의 전역 타임라인에 등록되어 매 프레임 계산 대상이 됩니다.
          입력 하나에 <code>gsap.to()</code> 하나를 쓰면, 손을 한 번 움직이는 동안 이 객체가 수십 개 쌓입니다.
        </p>
        <p>
          공식 문서 두 곳이 정확히 이 상황을 지목합니다. <code>gsap.quickSetter()</code> 문서는 "같은 객체(또는 객체 집합)에{' '}
          <code>gsap.set()</code>을 여러 번 호출하게 되면 — <em>"mousemove" 이벤트 안처럼</em> — quickSetter 함수를 만들어 대신 쓰는
          것으로 <strong>성능을 50% - 250% 높일 수 있다</strong>"고 적습니다. <code>gsap.quickTo()</code> 문서도 같은 문장 구조로
          "같은 target의 <strong>같은 numeric property</strong>에 <code>gsap.to()</code>를 여러 번 호출하게 되면 quickTo() 함수를 만들어
          성능을 높일 수 있다"고 적습니다.
        </p>
      </div>

      <div className="hfu-page__note hfu-page__note--probe">
        <h3>공식 문서에 없는 숫자 — 직접 세어 본 결과</h3>
        <p>
          공식 문서는 "성능이 좋아진다"까지만 말하고 <strong>실제로 무엇이 몇 개 남는지</strong>는 밝히지 않습니다. 그래서 설치본
          GSAP 3.15.0을 Node에서 직접 실행해, 같은 값을 <strong>50번</strong> 갱신한 뒤 전역 타임라인에 남은 Tween 수를 세었습니다.
        </p>
        <div className="hfu-page__table-wrap">
          <table className="hfu-page__rules-table">
            <caption>같은 property를 50번 갱신한 뒤 남은 Tween 수 (실행 확인, GSAP 3.15.0)</caption>
            <thead>
              <tr>
                <th scope="col">갱신 방식</th>
                <th scope="col">50번 호출한 코드</th>
                <th scope="col">남은 Tween</th>
                <th scope="col">의미</th>
              </tr>
            </thead>
            <tbody>
              {tweenCountRows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.label}</th>
                  <td>
                    <code>{row.call}</code>
                  </td>
                  <td>{row.tweens}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="hfu-page__provenance">
          측정 방법 · 매 실행 전 <code>gsap.globalTimeline.clear()</code>로 비운 뒤, 50번 호출하고{' '}
          <code>gsap.globalTimeline.getChildren(true, true, true).length</code>를 읽었습니다. 재현 조건은 GSAP 3.15.0, Node v22.21.0,
          DOM 없는 일반 객체 target입니다. 브라우저의 실제 프레임 비용을 잰 값이 아니라 <strong>남는 인스턴스 개수</strong>를 센
          값입니다.
        </p>
      </div>

      <div className="hfu-page__prose">
        <p>
          그래서 GSAP은 갱신이 잦은 자리를 위해 길을 따로 열어 둡니다. 요령은 하나입니다. <strong>함수를 미리 한 번 만들어 두고,
          입력이 올 때마다 그 함수에 숫자만 흘려보냅니다.</strong> 만드는 비용과 해석 비용을 입력 바깥으로 빼는 것입니다.
        </p>
        <p>
          다음 단계부터 세 도구를 차례로 봅니다. 먼저 <strong>지금 값을 읽는</strong> <code>gsap.getProperty()</code>, 그다음{' '}
          <strong>즉시 쓰는</strong> <code>gsap.quickSetter()</code>, 마지막으로 <strong>부드럽게 따라가게 하는</strong>{' '}
          <code>gsap.quickTo()</code>입니다. Tween을 만드는 <code>gsap.to()</code> 자체의 계약은{' '}
          <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>가 소유합니다.
        </p>
      </div>
    </section>
  )
}
