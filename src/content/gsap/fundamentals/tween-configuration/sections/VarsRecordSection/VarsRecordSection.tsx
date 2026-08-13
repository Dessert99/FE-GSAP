/** 만들어진 Tween의 vars에 무엇이 남고 무엇을 읽을 수 있는지 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const varsCode = `const tween = gsap.to('.box', {
  x: 100,
  opacity: 0,
  duration: 1,
})

tween.vars
// 넘긴 값 + defaults에서 상속된 값이 함께 들어 있습니다.
// { x, opacity, duration, overwrite, delay, ease }`

// 공식 vars 문서가 나열하는 special property — 각 항목의 자세한 동작은 gsap.to()에서 이어서 다룬다
const specialProperties = [
  'callbackScope', 'data', 'delay', 'duration', 'ease', 'easeReverse', 'id', 'immediateRender',
  'inherit', 'keyframes', 'lazy', 'onComplete', 'onCompleteParams', 'onRepeat', 'onRepeatParams',
  'onReverseComplete', 'onReverseCompleteParams', 'onStart', 'onStartParams', 'onUpdate',
  'onUpdateParams', 'overwrite', 'paused', 'repeat', 'repeatDelay', 'repeatRefresh', 'reversed',
  'runBackwards', 'stagger', 'startAt', 'yoyo', 'yoyoEase',
]

export function VarsRecordSection() {
  return (
    <section id="vars-record" className="tween-config-page__section" aria-labelledby="vars-record-title">
      <SectionHeading
        number="05"
        id="vars-record"
        title="Tween에 남는 설정 기록"
        description="설정을 넘기고 나면 그 값은 어디로 갈까요. 만들어진 Tween은 자기가 무엇을 받았는지 그대로 들고 있습니다."
      />

      <div className="tween-config-page__split">
        <div className="tween-config-page__prose">
          <p>
            <code>Tween.vars</code>는 <strong>생성할 때 넘긴 설정 객체</strong>입니다. 타입은 Object이고, 만들어진 뒤에도 읽을 수 있습니다.
          </p>
          <p>
            <strong>현재 동작을 바꿀 때는 전용 메서드를 사용하세요.</strong> <code>tween.vars.duration</code>을 직접 바꿔도 이미 만들어진
            Tween의 재생 시간은 자동으로 바뀌지 않습니다. 확인에는 <code>vars</code>를, 변경에는 <code>tween.duration(2)</code> 같은
            메서드를 쓰면 의도가 분명합니다.
          </p>
          <p>
            읽어 보면 <strong>내가 넘기지 않은 key도 들어 있습니다.</strong> defaults에서 상속된 값이 같은 객체에 채워지기 때문입니다.
            그래서 <code>vars</code>는 "내가 적은 것"이 아니라 "이 Tween이 최종적으로 받은 것"에 가깝습니다.
          </p>
        </div>
        <pre className="tween-config-page__code">
          <code>{varsCode}</code>
        </pre>
      </div>

      <div className="tween-config-page__note">
        <p>
          <code>vars</code>에는 두 종류가 섞여 있습니다. <strong>움직일 값</strong>(<code>x</code>, <code>opacity</code>)과{' '}
          <strong>동작을 정하는 special property</strong>(<code>duration</code>, <code>onComplete</code>)입니다. defaults는 이 둘을 가리지
          않습니다. <code>gsap.defaults({'{ x: 100 }'})</code>처럼 움직일 값도 기본값으로 지정할 수 있습니다.
        </p>
      </div>

      <div className="tween-config-page__subheading">
        <h3>공식 vars 문서가 나열하는 special property</h3>
        <p>이름만 옮겨 둡니다. 각 property가 받는 값과 동작은 아래 링크의 페이지가 전부 다룹니다.</p>
      </div>

      <ul className="tween-config-page__token-list">
        {specialProperties.map((name) => (
          <li key={name}>
            <code>{name}</code>
          </li>
        ))}
      </ul>

      <p className="tween-config-page__note">
        <code>yoyoEase</code>는 공식 문서에서 더 이상 권장하지 않으며 <code>easeReverse</code>를 쓰라고 안내합니다.{' '}
        <code>easeReverse</code>는 v3.15.0부터 추가됐습니다.
      </p>

      <a className="tween-config-page__related-link" href={toHref('/fundamentals/gsap-to')}>
        각 special property의 값과 동작 전체 보기
      </a>
    </section>
  )
}
