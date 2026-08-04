/** 숫자 배열을 목적지 배열로 보간하는 문법과 길이 불일치 규칙을 예제와 함께 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { NumericArrayLab } from '../../examples/NumericArrayLab/NumericArrayLab'

const officialCall = `const arr = [1, 2, 3];
gsap.to(arr, {
  endArray: [5, 6, 7],
  onUpdate() {
    console.log(arr);
  },
});`

export function EndArraySection() {
  return (
    <section id="end-array" className="non-css-page__section" aria-labelledby="end-array-title">
      <SectionHeading
        number="04"
        id="end-array"
        title="숫자 배열을 배열로 보간한다"
        description="움직이려는 값이 화면에 없을 수도 있습니다. 그냥 JavaScript 배열 안의 숫자들이라면, 배열 자체를 target으로 넘깁니다."
      />

      <div className="non-css-page__split">
        <div className="non-css-page__prose">
          <p>
            지금까지의 target은 전부 화면의 element였습니다. 하지만 <code>gsap.to()</code>의 첫 번째 인자에{' '}
            <strong>숫자 배열을 그대로 넘길 수도</strong> 있습니다.
          </p>
          <p>
            이때 목적지는 <code>endArray</code>에 적습니다. GSAP은 두 배열을 index끼리 짝지어 보간하며,{' '}
            <strong>easing도 적용됩니다.</strong>
          </p>
          <p>
            중요한 점은 <strong>새 배열을 만들어 돌려주지 않는다</strong>는 것입니다. 넘긴 배열 자체의 값이 제자리에서 바뀝니다. 그래서
            공식 예제도 <code>onUpdate</code>에서 같은 <code>arr</code>을 그대로 출력합니다.
          </p>
        </div>
        <pre className="non-css-page__code">
          <code>{officialCall}</code>
        </pre>
      </div>

      <div className="non-css-page__warning">
        <h3>길이가 다르면 짝이 있는 칸만 움직입니다</h3>
        <p>
          공식 문서의 문장입니다. <strong>두 배열의 길이가 다르면 양쪽 모두에 존재하는 index만 animate됩니다.</strong> 짝이 없는 칸은
          계산에서 빠질 뿐, 사라지거나 0이 되지 않습니다.
        </p>
      </div>

      <div className="non-css-page__note non-css-page__note--probe">
        <h3>공식 문서에 없는 동작 하나</h3>
        <p>
          위 문장은 <strong>시작 배열이 더 길 때</strong>를 설명합니다. 반대로 <strong>목적지 배열이 더 길면</strong> 공식 문서가
          말하지 않는 일이 벌어집니다. target 배열이 목적지 길이만큼 <strong>늘어나고</strong>, 새로 생긴 칸은 <code>0</code>에서부터
          보간됩니다.
        </p>
        <p>
          예를 들어 <code>[10, 20]</code>을 <code>endArray: [0, 0, 99, 99]</code>로 보내면 progress 0.25에서 배열은{' '}
          <code>[7.5, 15, 24.75, 24.75]</code>가 되고 길이는 4가 됩니다. 되감아도 길이는 2로 돌아오지 않습니다.
        </p>
        <p className="non-css-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 길이가 늘어나는 것에 기대는 코드는
          쓰지 않는 편이 안전합니다.
        </p>
      </div>

      <NumericArrayLab />

      <p className="non-css-page__note">
        예제의 <code>ease</code>와 <code>progress</code>는 이 페이지가 소유하지 않습니다. ease 곡선의 의미는{' '}
        <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>가, <code>progress()</code>의 정확한 동작은{' '}
        <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead 페이지</a>가 다룹니다.
      </p>
    </section>
  )
}
