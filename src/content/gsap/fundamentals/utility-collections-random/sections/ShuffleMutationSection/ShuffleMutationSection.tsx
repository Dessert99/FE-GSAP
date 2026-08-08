/** shuffle()이 새 배열을 만드는 대신 전달받은 배열을 바꾸는 계약을 설명한다. */
import { ShuffleIdentityLab } from '../../examples/ShuffleIdentityLab/ShuffleIdentityLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 순서와 배열 identity를 분리해 in-place mutation을 설명한다. */
export function ShuffleMutationSection() {
  return (
    <section className="utility-collections-page__section" id="shuffle-mutation">
      <SectionHeading number="03" title="순서는 같은 배열 안에서 섞인다">
        <code>shuffle(array)</code>은 새 Array를 반환하는 것처럼 보여도 새 container를 만들지 않습니다. 전달한 그 Array의 순서를 in place로 바꾸고, 같은 참조를 반환합니다.
      </SectionHeading>
      <div className="utility-collections-page__split"><div className="utility-collections-page__prose"><h3>복사하고 싶다면 먼저 복사합니다</h3><p>원본 순서를 보존해야 하는 application state라면 <code>shuffle()</code>에 넘기기 전에 복사본을 만들어야 합니다. 공식 API의 parameter도 “in place”로 섞을 target Array입니다.</p></div><div className="utility-collections-page__prose"><h3>참조가 같다는 것은 무엇일까요?</h3><p>두 변수가 같은 Array를 가리키면 <code>===</code>가 true입니다. 이 lab의 badge는 추측한 문장이 아니라, 방금 runtime이 받은 반환값과 전달값의 비교 결과를 표시합니다.</p></div></div>
      <pre className="utility-collections-page__code"><code>{`const array = [1, 2, 3, 4, 5]
gsap.utils.shuffle(array) // 같은 array를 in place로 섞어 반환`}</code></pre>
      <ShuffleIdentityLab />
    </section>
  )
}
