/** delayedCall의 공식 범위와 Tween으로서의 취소 경계를 실행 예제 전에 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { DelayedCallLab } from '../../examples/DelayedCallLab/DelayedCallLab'

// 공식 페이지의 params 전달 예제를 문장과 함께 보존한다
const officialParamsExample = `// 1초 뒤 myFunction을 부르고 parameter 두 개를 넘깁니다.
gsap.delayedCall(1, myFunction, ['param1', 'param2'])`

// 공식 페이지가 제시한 두 취소 경로를 그대로 대비한다
const officialCancelExample = `const delayedCall = gsap.delayedCall(1, myFunction)
delayedCall.kill()

gsap.delayedCall(1, myFunction)
gsap.killTweensOf(myFunction)`

export function DelayedCallSection() {
  return (
    <section id="delayed-call" className="schedule-page__section" aria-labelledby="delayed-call-title">
      <SectionHeading number="02" id="delayed-call" title="Timeline 없이 한 번만 예약하기" description="sequence가 필요 없고 몇 초 뒤 함수 하나만 부르면 delayedCall이 가장 작은 도구입니다." />

      <div className="schedule-page__prose">
        <p>공식 페이지는 형식 signature나 Parameters 절을 게시하지 않습니다. 확정할 수 있는 반환은 <strong>Tween</strong>이며, 기다린 뒤 함수를 부르고 원하는 개수의 parameter를 전달할 수 있다는 것입니다.</p>
      </div>
      <pre className="schedule-page__code"><code>{officialParamsExample}</code></pre>

      <div className="schedule-page__subheading"><h3>예약을 취소하는 두 방법</h3><p>참조가 있으면 Tween을 직접 죽이고, 참조를 보관하지 않았다면 호출할 함수가 target이라는 점을 이용합니다.</p></div>
      <pre className="schedule-page__code"><code>{officialCancelExample}</code></pre>

      <div className="schedule-page__note schedule-page__note--probe">
        <h3>공식 문서에 없는 내부 모양</h3>
        <p>GSAP 3.15.0에서 <code>duration() = 0</code>, <code>delay() = 넘긴 시간</code>, <code>targets()[0] = 넘긴 함수</code>, <code>vars.onComplete = 넘긴 함수</code>였습니다. <code>killTweensOf(fn)</code> 뒤에는 parent가 <code>null</code>이 됐습니다.</p>
        <p className="schedule-page__provenance">Node 22에서 plain function을 target으로 직접 실행해 getter를 읽은 probe 결과이며 공식 signature를 대신하지 않습니다.</p>
      </div>

      <DelayedCallLab />
    </section>
  )
}
