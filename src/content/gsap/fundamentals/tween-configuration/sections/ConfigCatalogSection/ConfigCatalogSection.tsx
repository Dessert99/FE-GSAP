/** gsap.config()가 받는 설정 전체를 타입·기본값·허용값과 함께 명세로 남긴다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 표와 본문에서 확인한 config 속성 전체 — 설명이 게시되지 않은 항목은 그대로 표시한다
const configProperties = [
  {
    name: 'autoSleep',
    type: 'number',
    defaultValue: '120',
    allowed: '프레임 수',
    role: 'GSAP이 power-down해도 되는지 확인하는 frame 간격입니다. 기본값 120은 대략 2초에 한 번 확인한다는 뜻이며, 쓰지 않는 동안 시스템 자원과 모바일 배터리를 아끼기 위한 장치입니다.',
    use: 'ticker의 휴면 전환 비용을 측정하며 검사 간격을 조절할 때',
  },
  {
    name: 'force3D',
    type: 'boolean | string',
    defaultValue: '"auto"',
    allowed: '"auto" · true · false',
    role: 'GPU 가속을 위해 3D transform을 쓸지 정합니다. "auto"는 animation 동안 3D를 적용하고 끝나면 가능한 경우 2D로 되돌려 GPU 메모리를 아낍니다. true는 3D를 계속 유지하고, false는 이 동작을 끕니다.',
    use: '성능과 GPU 메모리를 측정하며 3D transform 유지 여부를 비교할 때',
  },
  {
    name: 'nullTargetWarn',
    type: 'boolean',
    defaultValue: 'true',
    allowed: 'true · false',
    role: '존재하지 않는 대상을 tween하려 하면 경고를 띄웁니다. false로 두면 그 경고가 나오지 않습니다.',
    use: '대상이 조건부로 없을 수 있는 화면에서 의도된 경고를 끌 때',
  },
  {
    name: 'trialWarn',
    type: '공식 미게시',
    defaultValue: '공식 미게시',
    allowed: '공식 예제에 false로 등장',
    role: '공식 예제 코드에는 나오지만 설명이 게시돼 있지 않습니다. 역할을 추측하지 않고 등장 사실만 기록합니다.',
    use: '공식 설명이 게시되면 이 자리에 채웁니다.',
  },
  {
    name: 'units',
    type: 'object',
    defaultValue: '대부분 "px", 회전 계열 "deg"',
    allowed: 'property 이름 → 단위 문자열',
    role: '단위 없이 숫자만 넘겼을 때 붙일 기본 CSS 단위를 정합니다. 여기에 적은 property만 바뀌고 나머지는 그대로입니다.',
    use: '레이아웃을 퍼센트 기준으로 다루거나 회전을 radian으로 계산할 때',
  },
]

const officialExample = `gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
  units: { left: '%', top: '%', rotation: 'rad' },
})`

const getterExample = `// 인자 없이 부르면 현재 설정 객체를 돌려줍니다.
gsap.config()
// { autoSleep: 120, force3D: 'auto', nullTargetWarn: 1, units: { ... } }`

export function ConfigCatalogSection() {
  return (
    <section id="config-catalog" className="tween-config-page__section" aria-labelledby="config-catalog-title">
      <SectionHeading
        number="02"
        id="config-catalog"
        title="엔진 설정 전체 보기"
        description="gsap.config()가 받는 항목은 많지 않습니다. 각각이 무엇을 바꾸고 언제 건드리게 되는지 한 번에 확인합니다."
      />

      <div className="tween-config-page__property-list">
        {configProperties.map((property) => (
          <article key={property.name}>
            <h3>
              <code>{property.name}</code>
            </h3>
            <dl>
              <div>
                <dt>타입</dt>
                <dd>{property.type}</dd>
              </div>
              <div>
                <dt>기본값</dt>
                <dd>{property.defaultValue}</dd>
              </div>
              <div>
                <dt>허용값</dt>
                <dd>{property.allowed}</dd>
              </div>
            </dl>
            <p>{property.role}</p>
            <p className="tween-config-page__use-case">쓰는 상황 · {property.use}</p>
          </article>
        ))}
      </div>

      <div className="tween-config-page__subheading">
        <h3>공식 예제와 현재 값 읽기</h3>
        <p>왼쪽은 공식 문서가 보여주는 전체 예제이고, 오른쪽은 지금 설정을 확인하는 방법입니다.</p>
      </div>

      <div className="tween-config-page__split">
        <pre className="tween-config-page__code">
          <code>{officialExample}</code>
        </pre>
        <pre className="tween-config-page__code">
          <code>{getterExample}</code>
        </pre>
      </div>

      <div className="tween-config-page__warning">
        <p>
          <strong>getter 동작은 공식 문서에 게시돼 있지 않습니다.</strong> 위 반환값은 설치된 GSAP 3.15.0의 구현(
          <code>gsap-core.js</code>)과 실제 실행으로 확인한 내용입니다. 공식 문서에 적힌 계약이 아니므로 버전이 바뀌면 다시 확인해야
          합니다.
        </p>
      </div>
    </section>
  )
}
