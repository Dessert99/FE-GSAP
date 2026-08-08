/** modifier를 직접 쓰지 않고 눈금 맞춤만 짧게 적는 snap vars 문법을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Snap 페이지의 코드 예제 원문 네 가지
const snapForms = [
  {
    title: '가장 가까운 정수로',
    code: `// snap all of the properties in the comma-delimited list ("x,y" in this case) to the closest whole number:
gsap.to(".class", {
  x: 1000,
  y: 250,
  snap: "x,y",
});`,
  },
  {
    title: '일정 간격으로',
    code: `// snap to an increment:
gsap.to(".class", {
  x: 1000,
  snap: {
    x: 20,
  },
});`,
  },
  {
    title: '정해 둔 값 중 가장 가까운 것으로',
    code: `// snap to the closest value in an array:
gsap.to(".class", {
  x: 1000,
  snap: {
    x: [0, 50, 150, 500],
  },
});`,
  },
  {
    title: '가까울 때만',
    code: `// snap to a value in an array, but only when it's within a certain distance/radius:
gsap.to(".class", {
  x: 1000,
  snap: {
    x: { values: [0, 50, 150, 500], radius: 20 },
  },
});`,
  },
]

export function SnapPluginSection() {
  return (
    <section id="snap-plugin" className="msw-page__section" aria-labelledby="snap-plugin-title">
      <SectionHeading
        number="03"
        id="snap-plugin"
        title="snap vars — 눈금에 맞추는 지름길"
        description="값을 눈금에 맞추는 일은 워낙 자주 필요해서 GSAP이 짧은 문법을 따로 뒀습니다. 안에서 하는 일은 앞 단계의 modifier와 같습니다."
      />

      <div className="msw-page__prose">
        <p>
          <strong>SnapPlugin</strong>도 <em>internal plugin</em>이라 GSAP core에 자동 포함되어 있고{' '}
          <code>gsap.registerPlugin()</code>이 필요 없습니다.
        </p>
        <p>
          공식 설명이 중요한 지점을 짚습니다. SnapPlugin은 tween이 배열의 가장 가까운 값이나 increment로 snap하도록{' '}
          <strong>modifier를 구현</strong>하며, <strong>끝값만이 아니라 tween이 진행되는 동안의 값에도 영향을 줍니다.</strong> 도착점만
          반올림하는 게 아니라 <strong>가는 내내</strong> 눈금 위를 지나갑니다.
        </p>
      </div>

      <div className="msw-page__subheading">
        <h3>네 가지 형태</h3>
        <p>공식 Snap 페이지의 예제를 주석까지 그대로 옮깁니다.</p>
      </div>

      {snapForms.map((form) => (
        <div key={form.title}>
          <p className="msw-page__note">{form.title}</p>
          <pre className="msw-page__code">
            <code>{form.code}</code>
          </pre>
        </div>
      ))}

      <div className="msw-page__note">
        <p>
          문자열 형태(<code>snap: "x,y"</code>)와 객체 형태(<code>snap: {'{ x: 20 }'}</code>)의 차이를 눈여겨보세요. 문자열은{' '}
          <strong>"이 property들을 정수로"</strong>라는 뜻이고, 객체는 <strong>property마다 규칙을 따로</strong> 정합니다.
        </p>
      </div>
    </section>
  )
}
