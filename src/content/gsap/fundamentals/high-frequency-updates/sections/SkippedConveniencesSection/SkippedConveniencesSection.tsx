/** 두 fast path가 건너뛰는 편의 기능 여섯 가지를 나란히 놓아 실수 지점을 미리 알린다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 두 문서의 건너뛰기 목록 — 순서와 항목 수가 같아서 다섯 번째만 갈린다
const skipped = [
  {
    id: 'unit',
    label: '단위 변환과 자동 부착',
    broken: "setX('50%')",
    quickSetter: '건너뜁니다. 단, quickSetter를 만들 때 unit을 지정하면 넣는 숫자에 그 단위가 항상 붙습니다.',
    quickTo: '건너뜁니다. quickTo에는 unit 인자 자체가 없습니다.',
    same: true,
  },
  {
    id: 'relative',
    label: '상대값',
    broken: "setX('+=100')",
    quickSetter: '건너뜁니다.',
    quickTo: '건너뜁니다.',
    same: true,
  },
  {
    id: 'function',
    label: '함수 기반 값',
    broken: 'setX((i) => i * 10)',
    quickSetter: '건너뜁니다.',
    quickTo: '건너뜁니다.',
    same: true,
  },
  {
    id: 'random',
    label: '"random()" 파싱',
    broken: "setX('random(0, 100)')",
    quickSetter: '건너뜁니다.',
    quickTo: '건너뜁니다.',
    same: true,
  },
  {
    id: 'special',
    label: '여기만 다릅니다',
    broken: "gsap.quickSetter(svg, 'transformOrigin') / xTo에 attr: 값",
    quickSetter:
      'property별 브라우저 불일치를 메우는 특수 우회를 건너뜁니다. SVG element의 transformOrigin 같은 것이라, transformOrigin용 quickSetter를 만드는 것은 권장되지 않습니다.',
    quickTo:
      '플러그인 파싱을 건너뜁니다. target의 직접 property나 CSS 관련 property에만 쓸 수 있고, 예를 들어 attr: 값이나 morphSVG 등은 쓸 수 없습니다.',
    same: false,
  },
  {
    id: 'alias',
    label: 'property 이름 alias 변환',
    broken: "gsap.quickTo(el, 'translateX', { duration: 0.4 })",
    quickSetter: '건너뜁니다. transform에서 "x"는 동작하지만 "translateX"는 동작하지 않습니다.',
    quickTo: '건너뜁니다. transform에서 "x"는 동작하지만 "translateX"는 동작하지 않습니다.',
    same: true,
  },
]

export function SkippedConveniencesSection() {
  return (
    <section id="skipped-conveniences" className="hfu-page__section" aria-labelledby="skipped-conveniences-title">
      <SectionHeading
        number="04"
        id="skipped-conveniences"
        title="빨라지는 대신 포기하는 것"
        description="두 fast path가 빠른 이유는 계산을 잘해서가 아니라 평소에 해 주던 해석 작업을 하지 않기 때문입니다. 무엇을 하지 않는지 알아야 조용히 틀린 코드를 피할 수 있습니다."
      />

      <div className="hfu-page__prose">
        <p>
          평소에 <code>gsap.to(el, {'{ x: "+=100" }'})</code>가 동작하는 이유는, GSAP이 그 문자열을 읽고 "지금 값에 100을 더하라"로
          해석해 주기 때문입니다. 이런 해석 작업은 편리하지만 <strong>호출할 때마다 비용이 듭니다.</strong> fast path는 바로 이
          해석층을 걷어내고 숫자를 곧장 흘려보냅니다.
        </p>
        <p>
          공식 문서 두 곳은 각자 <strong>여섯 개</strong>의 목록을 같은 순서로 적어 두었습니다. 그중 다섯 개는 완전히 같고,{' '}
          <strong>다섯 번째만 서로 다릅니다.</strong> 이 표를 한 번 읽어 두면 나중에 "왜 안 되지?" 하는 시간을 아낍니다.
        </p>
      </div>

      <div className="hfu-page__table-wrap">
        <table className="hfu-page__rules-table">
          <caption>공식 문서가 밝힌 건너뛰기 목록 — 왼쪽이 quickSetter, 오른쪽이 quickTo</caption>
          <thead>
            <tr>
              <th scope="col">건너뛰는 편의</th>
              <th scope="col">이렇게 쓰면 안 됩니다</th>
              <th scope="col">gsap.quickSetter()</th>
              <th scope="col">gsap.quickTo()</th>
            </tr>
          </thead>
          <tbody>
            {skipped.map((row) => (
              <tr key={row.id}>
                <th scope="row">
                  {row.label}
                  <small>{row.same ? '두 API 동일' : '두 API 다름'}</small>
                </th>
                <td>
                  <code>{row.broken}</code>
                </td>
                <td>{row.quickSetter}</td>
                <td>{row.quickTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hfu-page__warning">
        <h3>가장 자주 걸리는 함정</h3>
        <p>
          <strong>alias가 없다는 것</strong>이 실무에서 제일 자주 사람을 잡습니다. 평소 <code>gsap.to()</code>에서는{' '}
          <code>translateX</code>를 적어도 GSAP이 <code>x</code>로 바꿔 주지만, fast path에서는 그 변환을 하지 않습니다. 에러가 나지
          않고 <strong>그냥 아무 일도 일어나지 않기 때문에</strong> 원인을 찾기 어렵습니다. transform은 항상 <code>x</code>,{' '}
          <code>y</code>, <code>rotation</code>, <code>scale</code>처럼 GSAP의 이름으로 적으세요. transform 이름 규칙은{' '}
          <a href={toHref('/fundamentals/css-animation')}>CSS animation 페이지</a>에서 이어서 확인할 수 있습니다.
        </p>
        <p>
          그리고 <code>quickTo</code>는 <strong>numeric property 하나</strong>만 다룹니다. attribute를 움직이고 싶다면{' '}
          <code>attr:</code>는 쓸 수 없습니다. attribute 채널은{' '}
          <a href={toHref('/fundamentals/non-css-target-values')}>CSS가 아닌 값 페이지</a>를 보세요. 다만 quickSetter에는{' '}
          <strong>이 제약을 우회하는 트릭</strong>이 있고, 06단계에서 다룹니다.
        </p>
      </div>
    </section>
  )
}
