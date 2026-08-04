/** 명시값과 defaults의 우선순위, inherit:false의 범위, 전역 변경의 수명을 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 같은 duration을 두고 세 경우가 각각 어떤 값으로 끝나는지 비교한다
const cases = [
  {
    label: '값을 직접 넘긴 경우',
    code: `gsap.to('.box', { x: 100, duration: 0.25 })`,
    result: '0.25초',
    why: 'Tween이 지정한 값이 default를 이깁니다.',
  },
  {
    label: '값을 넘기지 않은 경우',
    code: `gsap.to('.box', { x: 100 })`,
    result: 'defaults의 duration',
    why: '빈 자리만 default에서 채워집니다.',
  },
  {
    label: '상속을 끈 경우',
    code: `gsap.to('.box', { x: 100, inherit: false })`,
    result: '0초',
    why: 'GSAP이 원래 갖고 있던 기본 duration까지 함께 끊깁니다.',
  },
]

export function PrecedenceSection() {
  return (
    <section id="precedence" className="tween-config-page__section" aria-labelledby="precedence-title">
      <SectionHeading
        number="04"
        id="precedence"
        title="누가 이기고, 어디까지 미치나"
        description="같은 duration이라도 어디에 적었느냐에 따라 결과가 달라집니다. 그리고 전역 설정은 내가 되돌리기 전까지 사라지지 않습니다."
      />

      <div className="tween-config-page__cases">
        {cases.map((item) => (
          <article key={item.label}>
            <h3>{item.label}</h3>
            <pre className="tween-config-page__code">
              <code>{item.code}</code>
            </pre>
            <p className="tween-config-page__case-result">
              결과 · <strong>{item.result}</strong>
            </p>
            <p>{item.why}</p>
          </article>
        ))}
      </div>

      <div className="tween-config-page__warning">
        <p>
          <strong>
            <code>inherit: false</code>는 생각보다 세게 끊습니다.
          </strong>{' '}
          내가 지정한 default만 무시하는 게 아니라 GSAP의 built-in 기본 duration까지 끊어서, duration을 따로 넘기지 않으면{' '}
          <code>0</code>초짜리 Tween이 됩니다. 화면에서는 움직이지 않고 즉시 끝난 것처럼 보입니다. 이 결과는 공식 문서에 게시된 내용이
          아니라 GSAP 3.15.0 실행에서 확인한 것입니다.
        </p>
      </div>

      <div className="tween-config-page__subheading">
        <h3>전역 변경은 언제까지 남나요</h3>
        <p>
          <code>gsap.defaults()</code>로 바꾼 값은 <strong>다시 덮어쓸 때까지 계속 유지됩니다.</strong> 시간이 지나거나 화면이 바뀐다고
          자동으로 원래대로 돌아가지 않습니다.
        </p>
      </div>

      <p className="tween-config-page__note">
        그래서 전역 기본값은 앱이 시작될 때 한 번만 정하는 편이 안전합니다. 특정 화면에서만 잠깐 바꿔야 한다면, 앞 단계 예제처럼 바꾸기 전
        값을 복사해 두었다가 Tween을 만든 직후 되돌리세요. 이 수명 규칙도 공식 문서가 아니라 구현과 실행으로 확인한 내용입니다.
      </p>

      <div className="tween-config-page__warning">
        <p>
          <strong>복사본으로 되돌리는 방법에는 한계가 있습니다.</strong> <code>gsap.defaults()</code>는 merge라서, 원래 없던 key를 새로
          추가했다면 복사본을 다시 넣어도 그 key는 지워지지 않습니다. 이 복원법은 <strong>이미 있던 key를 덮어쓴 경우</strong>에만
          완전합니다. 새 key를 추가했다면 따로 지워야 합니다.
        </p>
      </div>
    </section>
  )
}
