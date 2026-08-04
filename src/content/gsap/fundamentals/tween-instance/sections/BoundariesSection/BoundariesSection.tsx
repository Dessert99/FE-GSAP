/** 공식 Tween 페이지가 함께 싣고 있지만 이 페이지가 소유하지 않는 12개 주제를 사실과 소유처로 함께 남긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Special Properties 표의 32개 이름 전부 — 개수를 줄이지 않고 그대로 남긴다
const specialProperties = [
  'callbackScope', 'data', 'delay', 'duration', 'ease', 'easeReverse', 'id', 'immediateRender',
  'inherit', 'lazy', 'onComplete', 'onCompleteParams', 'onRepeat', 'onRepeatParams',
  'onReverseComplete', 'onReverseCompleteParams', 'onStart', 'onStartParams', 'onUpdate',
  'onUpdateParams', 'overwrite', 'paused', 'repeat', 'repeatDelay', 'repeatRefresh', 'reversed',
  'runBackwards', 'stagger', 'startAt', 'yoyo', 'yoyoEase', 'keyframes',
]

// 공식 Tween 페이지가 싣고 있는 나머지 주제 — 사실을 한 줄로 남기고 소유 페이지를 밝힌다
const delegated = [
  {
    id: 'timeline',
    topic: 'Timeline',
    fact: 'delay special property로 기본 sequencing이 가능하지만 Timeline이 훨씬 쉽습니다. Timeline은 여러 Tween instance(그리고/또는 다른 Timeline)를 담는 컨테이너로, 시간 위에 배치하고 전체를 하나로 제어합니다.',
    owner: 'Timeline 학습 페이지',
    href: null,
  },
  {
    id: 'sequencing',
    topic: 'Sequencing',
    fact: 'tween마다 delay를 주는 방식보다 Timeline을 강력히 권장합니다. 특히 타이밍을 실험할 때 유연합니다. 공식 예제는 tl.to()를 점으로 이어 붙입니다.',
    owner: 'gsap.to() 페이지의 Sequencing 절',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'special-properties',
    topic: 'Special Properties 32개',
    fact: 'vars 안에 적는 설정 전체 목록입니다. 이 페이지는 그중 data와 id만 다뤘습니다.',
    owner: 'gsap.to() 페이지와 설정 페이지',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'plugins',
    topic: 'Plugins',
    fact: 'plugin은 GSAP core에 추가 기능을 더합니다. 덕분에 core가 비교적 작게 유지되고, 필요할 때만 기능을 더할 수 있습니다.',
    owner: '설치·등록 페이지',
    href: '/fundamentals/installation',
  },
  {
    id: 'function-values',
    topic: 'Function-based values',
    fact: '값 자리에 함수를 쓰면 tween이 처음 render될 때 target마다 한 번씩 호출되고, 반환값이 그 target의 값으로 쓰입니다.',
    owner: 'gsap.to() 페이지의 값 표현 절',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'random',
    topic: 'Random values',
    fact: '"random(-100, 100)"은 범위에서, "random([red, blue, green])"은 배열에서 고릅니다. 세 번째 인자를 주면 가장 가까운 증분으로 반올림합니다. gsap.utils.random()도 직접 쓸 수 있습니다.',
    owner: 'gsap.to() 페이지의 값 표현 절',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'relative',
    topic: 'Relative values',
    fact: '"+=" 또는 "-=" 접두사로 상대값을 지정합니다. {x:"-=20"}은 tween이 시작할 때의 x보다 20 작은 값으로 갑니다.',
    owner: 'gsap.to() 페이지의 값 표현 절',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'stagger',
    topic: 'Staggers',
    fact: 'target이 여럿이면 stagger: 0.1처럼 시작 시각을 0.1초씩 어긋나게 할 수 있고, stagger 객체로 더 정교하게 지정합니다.',
    owner: 'gsap.to() 페이지의 Staggers 절',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'keyframes',
    topic: 'Keyframes',
    fact: '같은 target을 여러 번 animate한다면 keyframes가 코드를 훨씬 간결하게 만들고, CSS animation을 옮겨 오기도 쉽게 합니다.',
    owner: 'gsap.to() 페이지의 Keyframes 절',
    href: '/fundamentals/gsap-to',
  },
  {
    id: 'default-ease',
    topic: '기본 ease',
    fact: '기본 ease는 gsap.defaults({ease: ...})로 바꿀 수 있고, 기본값은 "power1.out"입니다.',
    owner: '설정 페이지와 Easing 페이지',
    href: '/fundamentals/tween-configuration',
  },
  {
    id: 'kill-object',
    topic: 'gsap.killTweensOf(object)',
    fact: '특정 객체의 모든 tween을 언제든 kill할 수 있습니다. gsap.killTweensOf("#someID")처럼 selector text도 씁니다.',
    owner: '애니메이션 찾기·정지 레슨',
    href: null,
  },
  {
    id: 'kill-function',
    topic: 'gsap.killTweensOf(function)',
    fact: '특정 함수를 향한 delayedCall을 모두 kill할 수 있습니다.',
    owner: '애니메이션 찾기·정지 레슨',
    href: null,
  },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="instance-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 Tween 페이지는 이 클래스의 목차 역할도 합니다. 그래서 인스턴스와 직접 상관없는 주제도 함께 실려 있습니다. 빠뜨렸다는 오해가 없도록 전부 적고 소유처를 밝힙니다."
      />

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>공식 Tween 페이지에 함께 실려 있지만 이 페이지가 소유하지 않는 {delegated.length}개 주제</caption>
          <thead>
            <tr>
              <th scope="col">주제</th>
              <th scope="col">공식 문서가 말하는 것</th>
              <th scope="col">어디서 배우나</th>
            </tr>
          </thead>
          <tbody>
            {delegated.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.topic}</th>
                <td>{item.fact}</td>
                <td>{item.href ? <a href={toHref(item.href)}>{item.owner}</a> : item.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="instance-page__subheading">
        <h3>Special Properties {specialProperties.length}개의 이름만 남겨 둡니다</h3>
        <p>
          공식 표에 실린 이름을 하나도 빼지 않고 적습니다. 각 값이 무엇을 하는지는{' '}
          <a href={toHref('/fundamentals/gsap-to')}>gsap.to() 페이지</a>와{' '}
          <a href={toHref('/fundamentals/tween-configuration')}>설정 페이지</a>가 소유합니다.
        </p>
      </div>

      <p className="instance-page__chips">
        {specialProperties.map((name) => (
          <code key={name}>{name}</code>
        ))}
      </p>

      <div className="instance-page__split">
        <div>
          <div className="instance-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>담당한 네 문서 어디에도 없어서 이 페이지가 답을 주지 않는 항목입니다.</p>
          </div>
          <ul className="instance-page__list">
            <li>targets()가 돌려주는 배열이 복사본인지 원본인지</li>
            <li>vars가 넘긴 객체 자체인지 복사본인지</li>
            <li>data에 값을 넣지 않았을 때 무엇이 들어 있는지</li>
            <li>id를 인스턴스에서 직접 읽는 방법이 있는지</li>
            <li>"스스로 폐기한다" 뒤에 인스턴스에서 무엇을 계속 읽을 수 있는지</li>
            <li>targets()·data·scrollTrigger 페이지의 기본값 절 — 세 페이지 모두 없습니다</li>
          </ul>
        </div>

        <div>
          <div className="instance-page__subheading">
            <h3>이 페이지가 전제로만 쓴 개념</h3>
            <p>설명 소유권은 아래 페이지들에 있습니다.</p>
          </div>
          <ul className="instance-page__list">
            <li>
              <a href={toHref('/fundamentals/gsap-to')}>gsap.to()의 target과 vars 전체 계약</a>
            </li>
            <li>
              <a href={toHref('/fundamentals/tween-start-end-values')}>시작값과 끝값을 정하는 방법</a>
            </li>
            <li>
              <a href={toHref('/fundamentals/tween-playhead')}>progress·time·ratio를 읽고 옮기는 방법</a>
            </li>
            <li>
              <a href={toHref('/fundamentals/easing')}>ease 곡선의 의미</a>
            </li>
            <li>
              <a href={toHref('/fundamentals/tween-configuration')}>설정이 어디서 와서 어디까지 적용되는지</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="instance-page__note">
        <p>
          위 여섯 항목 중 다섯 개는 <strong>틀리게 짐작하면 실제로 버그가 나는 것</strong>이라, 공식 문서 대신 GSAP 3.15.0을 직접 실행해
          확인하고 각 단계의 점선 상자에 <strong>실행으로 확인한 내용</strong>이라고 밝혀 두었습니다. 나머지 하나(기본값 절 부재)는 문서에
          없다는 사실 자체가 답입니다.
        </p>
      </div>
    </section>
  )
}
