/** Tween이 시작·끝 값을 기억하는 시점과 invalidate()가 그 기억을 지우는 방식을 예제와 함께 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { InvalidateLab } from '../../examples/InvalidateLab/InvalidateLab'

// 공식 문서가 설명에 사용한 Tween 원문
const officialTween = `gsap.to(element, {duration: 2, x: "+=100"})`

// 기억 → 재사용 → 지우기라는 세 단계를 순서대로 보여주는 흐름
const memorySteps = [
  {
    step: '1',
    title: '처음 render될 때 값을 적어 둔다',
    body: 'element.x가 0인 상태에서 위 Tween이 처음 그려지는 순간, GSAP은 "+=100"을 풀어서 시작 0, 끝 100이라는 구체적인 숫자로 내부에 적어 둡니다.',
  },
  {
    step: '2',
    title: '다시 재생해도 적어 둔 값을 쓴다',
    body: '공식 문서의 문장입니다 — "그 tween을 restart()하면 정확히 같은 일을 한다(0에서 100으로)." 목적지 문자열을 다시 읽지 않기 때문에 결과가 똑같습니다.',
  },
  {
    step: '3',
    title: 'invalidate()가 적어 둔 값을 지운다',
    body: 'invalidate()를 부르면 다음 render에서 vars를 다시 읽습니다. 그래서 지금 x가 100이라면 "+=100"이 100에서 200으로 다시 풀립니다.',
  },
]

export function InvalidateRecomputeSection() {
  return (
    <section id="invalidate-recompute" className="repeats-page__section" aria-labelledby="invalidate-recompute-title">
      <SectionHeading
        number="05"
        id="invalidate-recompute"
        title="기억해 둔 시작값을 지운다"
        description="여기서부터는 반복과 다른 질문입니다. 몇 번 재생하느냐가 아니라, 재생할 때마다 어떤 숫자를 쓰느냐입니다."
      />

      <div className="repeats-page__prose">
        <p>
          앞의 네 섹션은 <strong>언제 몇 번 재생되는가</strong>를 다뤘습니다. 이번 섹션의 질문은 다릅니다.{' '}
          <strong>재생될 때마다 어떤 시작값과 끝값을 쓰는가</strong>입니다. 둘은 서로 독립적입니다.
        </p>
        <p>
          핵심 사실 하나부터 짚겠습니다. <strong>Tween은 기본적으로 값을 매번 다시 계산하지 않습니다.</strong> 처음 화면에 그려질 때 한 번
          계산해서 내부에 적어 두고, 그 뒤로는 적어 둔 숫자를 다시 씁니다.
        </p>
      </div>

      <pre className="repeats-page__code">
        <code>{officialTween}</code>
      </pre>

      <div className="repeats-page__prose">
        <p>
          공식 문서가 든 예입니다. <code>"+=100"</code>은 <strong>"지금 위치에서 100만큼 더"</strong>라는 뜻입니다. 그런데 "지금"이란 게
          언제일까요? 이 질문의 답이 이 섹션 전체입니다.
        </p>
      </div>

      <ol className="repeats-page__steps">
        {memorySteps.map((item) => (
          <li key={item.step}>
            <span>{item.step}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="repeats-page__prose">
        <p>
          공식 문서가 <code>invalidate()</code>를 설명하는 문장은 이것입니다.{' '}
          <strong>"내부에 기록된 시작·끝 값 같은 초기화 데이터를 지운다. 이전에 기록된 시작값으로 되돌아가지 않고 tween을 restart하고 싶을
          때 유용하다."</strong>
        </p>
        <p>
          그리고 언제 다시 읽는지도 밝혀 둡니다. <strong>"animation을 invalidate()하면 다음에 render될 때 다시 초기화되고 vars 객체가 다시
          parsing된다."</strong> <code>invalidate()</code>를 부르는 순간이 아니라 <strong>다음에 그려질 때</strong> 다시 읽는다는 점이
          중요합니다.
        </p>
      </div>

      <div className="repeats-page__note">
        <h3>시간 설정은 건드리지 않습니다</h3>
        <p>
          공식 문서의 문장입니다. <strong>"animation의 timing(duration, startTime, delay)은 영향을 받지 않는다."</strong>{' '}
          <code>invalidate()</code>가 지우는 것은 <strong>값에 관한 기억</strong>뿐입니다. 언제 얼마나 오래 재생될지는 그대로 남습니다.
        </p>
      </div>

      <InvalidateLab />

      <div className="repeats-page__subheading">
        <h3>반복할 때마다 다시 읽고 싶다면</h3>
        <p>버튼을 손으로 누르는 대신 GSAP에게 맡기는 방법이 있습니다.</p>
      </div>

      <div className="repeats-page__note">
        <p>
          공식 <code>invalidate()</code> 문서의 Note입니다.{' '}
          <strong>
            "tween이 반복할 때마다 invalidate()하고 싶을 뿐이라면 <code>repeatRefresh: true</code> 특수 property를 쓸 수 있다."
          </strong>{' '}
          이 페이지에서는 이 관계만 짚습니다. <code>repeatRefresh</code>의 값과 예제는{' '}
          <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>에서 이어서 확인할 수 있습니다.
        </p>
      </div>

      <div className="repeats-page__note">
        <h3>Timeline이면 children까지 함께</h3>
        <p>
          공식 문서의 문장입니다. <strong>"timeline을 invalidate하면 그 children이 자동으로 모두 invalidate된다."</strong> 하나씩 돌면서
          부를 필요가 없습니다. Timeline 자체는 이 페이지의 범위 밖이며, 여기서는 이 경계만 기록합니다.
        </p>
      </div>

    </section>
  )
}
