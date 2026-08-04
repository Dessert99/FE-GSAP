/** 넣은 두 인자가 인스턴스의 어디에 남는지 보이고, 공식이 게시한 속성 4개와 메서드 30개 전체를 지도로 펼친다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Parameters 절이 밝힌 두 인자 — 이 둘이 인스턴스에 남는 모든 것의 출발점이다
const parameters = [
  {
    name: 'targets',
    detail:
      '움직일 대상입니다. 공식 문서가 나열한 형태는 ".class"·"#id" 같은 selector text(내부적으로 document.querySelectorAll()을 씁니다), element 직접 참조, 일반 object, 그리고 object 배열입니다.',
    stored: 'targets()로 읽습니다',
  },
  {
    name: 'vars',
    detail:
      '움직일 property와 값 전부, 그리고 ease·duration·delay·onComplete 같은 special property를 담은 객체입니다.',
    stored: 'vars로 읽습니다',
  },
]

// 공식 Properties 표 4행 전체 — 인스턴스에 "남는 것"의 공식 목록이자 이 페이지의 뼈대다
const properties = [
  {
    name: 'targets()',
    signature: 'targets( ) : Array',
    kind: '메서드',
    meaning: '움직일 대상들의 배열입니다.',
    owner: '04번 단계',
    ownerHref: '#targets-method',
  },
  {
    name: 'vars',
    signature: 'vars : Object',
    kind: '속성',
    meaning: '생성자에 넘긴 설정 객체 그대로입니다.',
    owner: '이 단계',
    ownerHref: null,
  },
  {
    name: 'data',
    signature: 'data : *',
    kind: '속성',
    meaning: '내가 원하는 값을 저장해 두는 빈 자리입니다.',
    owner: '05번 단계',
    ownerHref: '#data-and-id',
  },
  {
    name: 'ratio',
    signature: 'ratio',
    kind: '속성',
    meaning: 'ease를 통과한 뒤의 progress입니다. 읽기 전용입니다.',
    owner: 'Tween playhead 페이지',
    ownerHref: null,
  },
  {
    name: 'scrollTrigger',
    signature: 'scrollTrigger: ScrollTrigger | undefined',
    kind: '속성',
    meaning: '연결된 ScrollTrigger입니다. 있을 때만 생깁니다.',
    owner: '06번 단계',
    ownerHref: '#scroll-trigger',
  },
]

// 공식 Methods 표의 30개를 하는 일로 묶은 지도 — 개수를 줄이지 않고 소유 페이지만 표시한다
const methodGroups = [
  {
    id: 'playback',
    label: '재생을 바꾼다',
    methods: ['play()', 'pause()', 'paused()', 'resume()', 'restart()', 'reverse()', 'reversed()'],
    owner: '이후 레슨 · 재생 제어',
    href: null,
  },
  {
    id: 'playhead',
    label: '지금 위치를 읽고 옮긴다',
    methods: ['progress()', 'totalProgress()', 'time()', 'totalTime()', 'seek()', 'iteration()'],
    owner: 'Tween playhead 페이지',
    href: '/fundamentals/tween-playhead',
  },
  {
    id: 'clock',
    label: '시간을 계산한다',
    methods: ['delay()', 'duration()', 'totalDuration()', 'startTime()', 'endTime()', 'globalTime()'],
    owner: '이후 레슨 · 시간 계산',
    href: null,
  },
  {
    id: 'repeat',
    label: '반복을 정한다',
    methods: ['repeat()', 'repeatDelay()', 'yoyo()'],
    owner: '이후 레슨 · 반복',
    href: null,
  },
  {
    id: 'speed',
    label: '속도를 바꾼다',
    methods: ['timeScale()'],
    owner: '이후 레슨 · 시간 계산',
    href: null,
  },
  {
    id: 'cleanup',
    label: '치우거나 다시 계산한다',
    methods: ['kill()', 'revert()', 'invalidate()'],
    owner: '이후 레슨 · 정리',
    href: null,
  },
  {
    id: 'inspect',
    label: '상태와 대상을 묻는다',
    methods: ['isActive()', 'targets()'],
    owner: '04번 단계와 이후 레슨',
    href: null,
  },
  {
    id: 'callback',
    label: '콜백과 완료를 다룬다',
    methods: ['eventCallback()', 'then()'],
    owner: '콜백·완료 레슨',
    href: null,
  },
]

// 지도가 공식 개수를 그대로 담고 있는지 화면에서도 셀 수 있게 한다
const mappedMethodCount = methodGroups.reduce((total, group) => total + group.methods.length, 0)

export function InstanceSurfaceSection() {
  return (
    <section id="instance-surface" className="instance-page__section" aria-labelledby="instance-surface-title">
      <SectionHeading
        number="03"
        id="instance-surface"
        title="남는 것은 속성 4개와 메서드 30개"
        description="인스턴스가 무한히 많은 것을 기억하지는 않습니다. 공식 문서가 게시한 목록은 정확히 속성 네 개와 메서드 서른 개입니다. 그 전체를 한 번에 펼쳐 봅니다."
      />

      <div className="instance-page__subheading">
        <h3>넣은 것은 둘뿐입니다</h3>
        <p>
          공식 Parameters 절은 <code>gsap.to()</code>가 받는 인자를 둘로 정리합니다. 인스턴스에 남는 모든 것은 이 둘에서 나옵니다.
        </p>
      </div>

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>공식 Parameters 절이 밝힌 두 인자</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">무엇을 받나</th>
              <th scope="col">만든 뒤 어디서 읽나</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((parameter) => (
              <tr key={parameter.name}>
                <th scope="row">
                  <code>{parameter.name}</code>
                </th>
                <td>{parameter.detail}</td>
                <td>
                  <code>{parameter.stored}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="instance-page__subheading">
        <h3>공식이 게시한 인스턴스 표면 전체</h3>
        <p>
          공식 Tween 페이지 맨 아래 <strong>Properties</strong> 표에는 네 행뿐입니다: <code>data</code>, <code>ratio</code>,{' '}
          <code>scrollTrigger</code>, <code>vars</code>. 여기에 대상 명단을 돌려주는 메서드 <code>targets()</code>를 나란히 두면 "인스턴스에
          무엇이 남는가"라는 질문의 답이 완성됩니다.
        </p>
      </div>

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>인스턴스에서 바로 읽을 수 있는 것</caption>
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">공식 표기</th>
              <th scope="col">종류</th>
              <th scope="col">무엇인가</th>
              <th scope="col">어디서 자세히</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.name}>
                <th scope="row">
                  <code>{property.name}</code>
                </th>
                <td>
                  <code>{property.signature}</code>
                </td>
                <td>{property.kind}</td>
                <td>{property.meaning}</td>
                <td>{property.ownerHref ? <a href={property.ownerHref}>{property.owner}</a> : property.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="instance-page__note">
        <h3>vars는 "적어 둔 설정 그대로"입니다</h3>
        <p>
          공식 설명은 <strong>"constructor에 넘긴 설정 객체이며, animate할 property·value 전부와 onComplete·onUpdate 같은 optional
          special property를 담고 있다"</strong>입니다. 즉 인스턴스는 <strong>무엇을 시켰는지에 대한 기록</strong>을 통째로 들고
          있습니다. 어떤 설정으로 만들어졌는지 나중에 확인할 수 있다는 뜻입니다.
        </p>
      </div>

      <div className="instance-page__note">
        <h3>ratio는 여기서 이름만 소개합니다</h3>
        <p>
          공식 설명은 <strong>"[읽기 전용] ease를 통과한 뒤의 Tween progress(0과 1 사이, 0.5가 중간)"</strong>이고,{' '}
          <strong>"그래서 ease가 back이나 elastic이면 0–1 범위를 넘을 수 있다"</strong>고 덧붙입니다. 또{' '}
          <strong>"onUpdate 콜백에서 자기만의 보간을 할 때 배수로 쓰면 유용하다"</strong>고 안내합니다.
        </p>
        <p>
          이 값이 progress·time과 어떻게 다른지는 <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead 페이지</a>가 전부
          다룹니다. 여기서는 <strong>인스턴스에 남는 네 속성 중 하나</strong>라는 자리만 잡아 둡니다.
        </p>
      </div>

      <div className="instance-page__subheading">
        <h3>메서드 {mappedMethodCount}개는 하는 일로 묶입니다</h3>
        <p>
          공식 Methods 표는 {mappedMethodCount}개를 알파벳 순으로 늘어놓습니다. 외울 목록이 아니라 <strong>어디를 찾아가야 하는지 아는
          지도</strong>로 쓰면 충분합니다. 아래는 같은 {mappedMethodCount}개를 하는 일로 다시 묶은 것입니다.
        </p>
      </div>

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>공식 Methods 표 {mappedMethodCount}개 전체를 역할로 묶은 지도</caption>
          <thead>
            <tr>
              <th scope="col">하는 일</th>
              <th scope="col">메서드</th>
              <th scope="col">어디서 배우나</th>
            </tr>
          </thead>
          <tbody>
            {methodGroups.map((group) => (
              <tr key={group.id}>
                <th scope="row">
                  {group.label}
                  <small>{group.methods.length}개</small>
                </th>
                <td>
                  <code>{group.methods.join(', ')}</code>
                </td>
                <td>{group.href ? <a href={toHref(group.href)}>{group.owner}</a> : group.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="instance-page__note">
        <p>
          공식 표에서 <code>targets( ) : Array</code> 행만 설명 칸이 비어 있습니다. 그래서 이 메서드는{' '}
          <a href="https://gsap.com/docs/v3/GSAP/Tween/targets()">전용 페이지</a>를 따로 읽어야 하고, 04번 단계가 그 내용을 담당합니다.
        </p>
      </div>

      <div className="instance-page__note instance-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p className="instance-page__provenance">
          아래는 공식 문서에 적혀 있지 않습니다. GSAP 3.15.0을 Node에서 직접 실행해 확인한 결과입니다.
        </p>
        <p>
          <code>tween.vars</code>는 우리가 넘긴 객체의 <strong>복사본이 아니라 바로 그 객체</strong>입니다. 동일성 비교가{' '}
          <code>true</code>로 나옵니다. 게다가 GSAP이 그 객체에 <code>duration</code>, <code>overwrite</code>, <code>delay</code>,{' '}
          <code>ease</code> 키를 <strong>직접 채워 넣습니다</strong>. <code>gsap.from()</code>과 <code>gsap.fromTo()</code>는{' '}
          <code>parent</code>, <code>immediateRender</code> 같은 키도 추가합니다.
        </p>
        <p>
          그래서 <strong>같은 vars 객체를 여러 Tween에 재사용하면 앞선 Tween이 남긴 키가 함께 딸려갑니다.</strong> 설정 객체는 매번 새로
          만드는 편이 안전합니다.
        </p>
      </div>
    </section>
  )
}
