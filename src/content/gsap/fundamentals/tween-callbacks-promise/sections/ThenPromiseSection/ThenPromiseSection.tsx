/** then()이 완료를 Promise로 바꿔 주는 방식과, resolve되지 않는 경우의 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서에 실린 예제 원문
const officialExample = `gsap.to(".class", {duration: 1, x: 100}).then(yourFunction).then(...);`

// 같은 완료 지점을 콜백과 await로 각각 표현해 선택 기준을 보여준다
const awaitExample = `// onComplete로 쓰면
gsap.to(box, {x: 100, onComplete: () => {
  gsap.to(box, {y: 100, onComplete: () => {
    done()
  }})
}})

// then()으로 쓰면
await gsap.to(box, {x: 100})
await gsap.to(box, {y: 100})
done()`

export function ThenPromiseSection() {
  return (
    <section id="then-promise" className="callbacks-page__section" aria-labelledby="then-promise-title">
      <SectionHeading
        number="04"
        id="then-promise"
        title="완료를 Promise로 기다린다"
        description="끝났을 때 할 일을 함수로 맡기는 대신, 끝날 때까지 기다렸다가 다음 줄을 실행하고 싶을 때가 있습니다."
      />

      <div className="callbacks-page__prose">
        <p>
          <strong>Promise</strong>는 "지금은 결과가 없지만 나중에 생길 것"을 담아 두는 JavaScript의 표준 객체입니다.{' '}
          <code>await</code>를 붙이면 그 결과가 생길 때까지 다음 줄을 미룰 수 있습니다.
        </p>
        <p>
          공식 문서의 설명은 간결합니다 — <strong>onComplete 콜백 대신 Promise를 쓰고 싶은 사람들을 위한 것</strong>이고, animation이
          완료될 때 resolve되는 Promise를 돌려줍니다.
        </p>
      </div>

      <pre className="callbacks-page__signature">
        <code>then( callback:Function ) : Promise</code>
      </pre>

      <div className="callbacks-page__prose">
        <p>
          인자 <code>callback</code>은 공식 문서 표현으로 <strong>"생성된 Tween의 promise를 처리할 함수"</strong>입니다. 반환값이
          Promise라서 <code>.then()</code>을 이어 붙일 수 있습니다.
        </p>
      </div>

      <pre className="callbacks-page__code">
        <code>{officialExample}</code>
      </pre>

      <div className="callbacks-page__subheading">
        <h3>언제 이게 더 읽기 쉬운가</h3>
        <p>animation을 순서대로 이어야 할 때 콜백은 오른쪽으로 계단처럼 깊어지지만 await는 위에서 아래로 읽힙니다.</p>
      </div>

      <pre className="callbacks-page__code">
        <code>{awaitExample}</code>
      </pre>

      <div className="callbacks-page__note callbacks-page__note--probe">
        <h3>공식 문서에 없는 동작 셋</h3>
        <p>
          공식 문서는 <strong>언제</strong> resolve되는지는 밝히지만 <strong>무엇으로</strong> resolve되는지, 그리고 완료되지 않는
          경우 어떻게 되는지는 적어 두지 않았습니다. 실행해 확인한 결과입니다.
        </p>
        <p>
          첫째, handler 없이 <code>then()</code>만 부르면 Promise가 <strong>Tween 자신으로</strong> resolve됩니다.{' '}
          <code>await tween</code>도 같습니다. 둘째, <strong>이미 완료된 Tween</strong>에 <code>then()</code>을 다시 부르면 곧바로
          resolve됩니다. 셋째, <code>repeat: -1</code>로 무한 반복하는 Tween과 완료 전에 <code>kill()</code>된 Tween의 Promise는{' '}
          <strong>영원히 resolve되지 않고 reject도 되지 않습니다.</strong>
        </p>
        <p className="callbacks-page__provenance">
          이 세 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 세 번째가 특히 위험합니다 —{' '}
          <code>await</code>한 코드가 조용히 멈춘 채로 남습니다. 중간에 끊길 수 있는 animation을 <code>await</code>할 때는 타임아웃이나{' '}
          <code>onInterrupt</code>를 함께 두는 편이 안전합니다.
        </p>
      </div>
    </section>
  )
}
