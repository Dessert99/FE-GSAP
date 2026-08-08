/** wrap과 wrapYoyo의 문법을 정리하고 공식 예제의 모순과 최댓값 처리 차이를 드러낸다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { WrapCompareLab } from '../../examples/WrapCompareLab/WrapCompareLab'

const officialWrap = `let color = gsap.utils.wrap(["red", "green", "yellow"], 5); // "yellow"
let num = gsap.utils.wrap(5, 10, 12); // 7

let wrapper = gsap.utils.wrap(["red", "green", "yellow"]);
let color = wrapper(5) // "yellow"`

const officialWrapYoyo = `let color = gsap.utils.wrapYoyo(["red", "green", "yellow"], 5); // "red"
let num = gsap.utils.wrapYoyo(5, 10, 12); // 8

let wrap = gsap.utils.wrapYoyo(["red", "green", "yellow"]);
let color = wrap(5) // "green"`

export function WrapFamilySection() {
  return (
    <section id="wrap-family" className="msw-page__section" aria-labelledby="wrap-family-title">
      <SectionHeading
        number="05"
        id="wrap-family"
        title="끝에 닿으면 처음으로, 또는 되돌아서"
        description="값이 범위를 넘어갈 때 무엇을 할지 정하는 두 함수입니다. 인자 모양은 같은데 넘어간 뒤의 행동이 다릅니다."
      />

      <div className="msw-page__prose">
        <p>
          두 함수는 인자 구성이 똑같습니다. <strong>첫째는 Array 또는 범위의 최솟값</strong>, <strong>둘째는 범위의 최댓값 또는
          (Array를 준 경우) index</strong>, <strong>셋째는 선택적인 index</strong>입니다. 그리고 둘 다{' '}
          <strong>index를 주지 않으면 나중에 쓸 함수를 돌려줍니다.</strong>
        </p>
        <p>
          다른 것은 <strong>범위를 벗어났을 때</strong>입니다. <code>wrap</code>은 최댓값을 넘으면 <strong>처음으로 되돌아가고</strong>{' '}
          최솟값보다 작으면 <strong>끝으로 감쌉니다.</strong> <code>wrapYoyo</code>는 최댓값을 넘으면{' '}
          <strong>시작 쪽으로 되돌아오고</strong> 최솟값보다 작으면 <strong>끝 쪽으로 갑니다.</strong>
        </p>
      </div>

      <div className="msw-page__split">
        <div>
          <div className="msw-page__subheading">
            <h3>공식 wrap 예제</h3>
          </div>
          <pre className="msw-page__code">
            <code>{officialWrap}</code>
          </pre>
        </div>
        <div>
          <div className="msw-page__subheading">
            <h3>공식 wrapYoyo 예제</h3>
          </div>
          <pre className="msw-page__code">
            <code>{officialWrapYoyo}</code>
          </pre>
        </div>
      </div>

      <div className="msw-page__warning">
        <h3>공식 wrapYoyo 예제의 주석 하나가 틀렸습니다</h3>
        <p>
          위 오른쪽 코드를 자세히 보세요. 첫 줄과 마지막 줄은 <strong>사실상 같은 호출</strong>입니다 — 같은 배열의 index 5를 묻고
          있습니다. 그런데 주석이 하나는 <code>"red"</code>, 하나는 <code>"green"</code>입니다.
        </p>
        <p>
          직접 실행해 확인한 결과 <strong>둘 다 <code>"green"</code></strong>입니다. 첫 줄의 <code>// "red"</code>가 잘못된 주석입니다.
          가운데 줄의 <code>wrapYoyo(5, 10, 12)</code>가 <code>8</code>이라는 것은 맞습니다.
        </p>
        <p className="msw-page__provenance">
          GSAP 3.15.0을 Node에서 실행해 확인했습니다. 공식 문서의 주석을 그대로 믿고 코드를 짜면 어긋나는 지점이라 여기 남깁니다.
        </p>
      </div>

      <div className="msw-page__note msw-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용 · 최댓값을 다루는 방식이 다르다</h3>
        <p>
          두 함수를 숫자 범위 <code>0 ~ 3</code>에 대해 index 0부터 차례로 넣어 보면 이렇게 갈립니다.
        </p>
        <p>
          <code>wrap(0, 3, i)</code> → <code>0 1 2 0 1 2 0</code> — <strong>최댓값 3이 한 번도 나오지 않습니다.</strong>
          <br />
          <code>wrapYoyo(0, 3, i)</code> → <code>0 1 2 3 2 1 0</code> — <strong>최댓값 3이 나옵니다.</strong>
        </p>
        <p>
          <code>wrap</code>은 주기가 도는 것이라 최댓값 자리가 곧 다음 주기의 시작이어서 나타나지 않고, <code>wrapYoyo</code>는 방향을
          뒤집는 것이라 최댓값에서 한 번 멈췄다 돌아옵니다. <strong>공식 문서 어디에도 이 비대칭이 적혀 있지 않습니다.</strong> 범위를
          정할 때 최댓값이 나오길 기대한다면 <code>wrap</code>에서는 최댓값을 하나 크게 잡아야 합니다.
        </p>
        <p>
          음수 index도 확인했습니다. <code>wrap(["a","b","c"], -1)</code>은 <code>"c"</code>이고, 범위에서도{' '}
          <code>wrap(5, 10, 3)</code>은 <code>8</code>입니다. 최솟값보다 작으면 끝으로 감싼다는 공식 설명대로입니다.
        </p>
        <p className="msw-page__provenance">
          GSAP 3.15.0을 Node에서 실행해 확인했습니다. index 0~6을 두 함수에 각각 넣어 출력을 그대로 비교했습니다.
        </p>
      </div>

      <WrapCompareLab />
    </section>
  )
}
