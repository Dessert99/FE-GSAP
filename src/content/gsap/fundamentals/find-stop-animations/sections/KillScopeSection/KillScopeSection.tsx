/** 전역 kill과 instance kill의 인자 명세를 대조하고 범위를 좁히는 방법을 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { KillScopeLab } from '../../examples/KillScopeLab/KillScopeLab'

// 공식 killTweensOf 페이지의 예제 세 줄 — 각 줄이 서로 다른 target 형태를 보여준다
const globalCalls = `gsap.killTweensOf(".myClass");
gsap.killTweensOf(myObject, "opacity,x");
gsap.killTweensOf(myFunction);`

// 공식 Tween.kill() 페이지의 예제 원문 — 주석까지 그대로 옮겼다
const instanceCalls = `// kill all parts of the animation related to the target "myObject"
// (if the tween has multiple targets, the others will not be affected):
animation.kill(myObject);

// kill only the "x" and "y" properties of the animation (all targets):
animation.kill(null, "x,y");

// kill only the "x" and "y" properties of animations of the target "myObject":
animation.kill(myObject, "x,y");

// kill only the "opacity" properties of animations of the targets
// "myObject1" and "myObject2":
animation.kill([myObject1, myObject2], "opacity");
//you could use selector text instead, like ".class1, .class2"`

// Tween.kill()은 이 페이지의 여섯 source 중 유일하게 Parameters 절이 게시된 문서다
const paramRows = [
  {
    name: 'target',
    type: 'Object',
    fallback: 'null',
    detail:
      '특정 target(또는 target들)에 관한 부분만 kill할 때 지정합니다. 공식 문서는 target을 주지 않으면 모든 target이 영향을 받는다고 밝힙니다.',
  },
  {
    name: 'propertiesList',
    type: 'String',
    fallback: '"all"',
    detail:
      '이 Tween이 더 이상 animate하지 않을 property 이름을 콤마로 나열합니다. 값을 주지 않거나 null 또는 "all"이면 모든 property가 kill됩니다.',
  },
]

// 전역 호출과 instance 호출이 각각 무엇을 단서로 삼는지 대조한다
const scopeRows = [
  {
    call: 'gsap.killTweensOf(target, props)',
    handle: 'target (element · object · selector text · 배열 · 함수)',
    reach: '그 target을 건드리는 모든 Tween',
    note: '아직 시작하지 않은 tween에도 작용합니다.',
  },
  {
    call: 'tween.kill(target, propertiesList)',
    handle: '이미 참조하고 있는 Tween instance 하나',
    reach: '그 Tween 안에서 고른 target과 property만',
    note: '반환값은 self라서 이어서 다른 메서드를 부를 수 있습니다.',
  },
]

export function KillScopeSection() {
  return (
    <section id="kill-scope" className="find-stop-page__section" aria-labelledby="kill-scope-title">
      <SectionHeading
        number="04"
        id="kill-scope"
        title="어디까지 멈출지 범위를 고른다"
        description="멈추는 방법은 하나가 아닙니다. target으로 조회할지 Tween instance를 직접 참조할지, 그리고 전부 멈출지 property 하나만 멈출지에 따라 호출이 달라집니다."
      />

      <div className="find-stop-page__split">
        <div className="find-stop-page__prose">
          <p>
            <code>gsap.killTweensOf()</code>는 앞 단계의 <code>getTweensOf()</code>와 같은 단서를 씁니다. 공식 문서의 표현으로{' '}
            <strong>"특정 object의 모든 tween(또는 특정 tweening property)이나 특정 함수의 delayedCall을 kill"</strong>합니다.
          </p>
          <p>
            오른쪽 세 줄이 공식 예제입니다. 첫 줄은 <strong>selector text</strong>, 둘째 줄은{' '}
            <strong>두 번째 인자로 property를 좁힌 형태</strong>, 셋째 줄은 <strong>함수</strong>입니다.
          </p>
          <p>
            셋째 줄에는 설명이 붙어 있습니다. <code>gsap.delayedCall(5, myFunction)</code>로 만든 것도{' '}
            <strong>target과 onComplete가 같은 함수인 tween</strong>이라서, 함수 참조만 넘기면 그 함수의 delayedCall이 전부 정리됩니다.
          </p>
        </div>
        <pre className="find-stop-page__code">
          <code>{globalCalls}</code>
        </pre>
      </div>

      <div className="find-stop-page__note">
        <h3>selector text와 배열도 그대로 받습니다</h3>
        <p>
          공식 문서의 문장입니다. <code>&quot;.myClass&quot;</code>나 <code>&quot;#myID&quot;</code>는 해당 element의 tween을,{' '}
          <code>&quot;*&quot;</code>는 <strong>DOM target을 가진 모든 tween</strong>을 kill합니다. <strong>target 배열</strong>도
          넘길 수 있습니다.
        </p>
      </div>

      <div className="find-stop-page__warning">
        <h3>아직 시작하지 않은 tween도 함께 정리됩니다</h3>
        <p>
          공식 문서가 예까지 들어 밝힌 내용입니다. <strong>"delay가 5초인 tween을 만든 지 2초 뒤에 kill해도, 아직 시작하지 않은 채로
          kill된다."</strong> <code>delay</code>를 기다리는 중인 tween은 <code>isTweening</code>으로는 잡히지 않지만{' '}
          <code>killTweensOf</code>는 놓치지 않습니다.
        </p>
      </div>

      <div className="find-stop-page__subheading">
        <h3>이미 Tween instance를 참조하고 있다면</h3>
        <p>
          공식 <code>Tween.kill()</code> 페이지는 이 페이지가 담당하는 여섯 문서 중 <strong>유일하게 signature와 Parameters 절을
          게시</strong>합니다. 아래는 그 원문입니다.
        </p>
      </div>

      <pre className="find-stop-page__signature">
        <code>kill( target:Object, propertiesList:String ) : self</code>
      </pre>

      <div className="find-stop-page__table-wrap">
        <table className="find-stop-page__params-table">
          <caption>공식 Parameters 절 — 타입과 기본값이 함께 적혀 있습니다</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">역할</th>
            </tr>
          </thead>
          <tbody>
            {paramRows.map((row) => (
              <tr key={row.name}>
                <th scope="row">
                  <code>{row.name}</code>
                </th>
                <td>
                  <code>{row.type}</code>
                </td>
                <td>
                  <code>{row.fallback}</code>
                </td>
                <td>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="find-stop-page__prose">
        <p>
          두 인자를 조합하면 <strong>"어느 target의 어느 property를"</strong>까지 좁힐 수 있습니다. 공식 문서는{' '}
          <strong>"parameter에 따라 animation을 전부 kill하거나 일부만 kill한다"</strong>고 요약하고, 반환값은{' '}
          <strong>self이며 chaining을 쉽게 하기 위한 것</strong>이라고 밝힙니다.
        </p>
      </div>

      <pre className="find-stop-page__code">
        <code>{instanceCalls}</code>
      </pre>

      <div className="find-stop-page__table-wrap">
        <table className="find-stop-page__scope-table">
          <caption>같은 &quot;멈춤&quot;인데 조회 기준이 다릅니다</caption>
          <thead>
            <tr>
              <th scope="col">호출</th>
              <th scope="col">단서로 쓰는 것</th>
              <th scope="col">닿는 범위</th>
              <th scope="col">공식이 덧붙인 것</th>
            </tr>
          </thead>
          <tbody>
            {scopeRows.map((row) => (
              <tr key={row.call}>
                <th scope="row">
                  <code>{row.call}</code>
                </th>
                <td>{row.handle}</td>
                <td>{row.reach}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="find-stop-page__note">
        <h3>killTweensOf에는 인자 명세가 없습니다</h3>
        <p>
          <code>gsap.killTweensOf()</code> 공식 페이지에는 <strong>signature 줄도 Parameters 절도 없습니다.</strong> 인자의 타입과
          기본값은 <strong>공식 페이지에 명시 없음</strong>으로 둡니다. 본문이 "두 번째 parameter로 property를 좁힌다"고 설명하고 예제가
          그 형태를 보여주는 것까지가 게시된 내용입니다.
        </p>
      </div>

      <div className="find-stop-page__note find-stop-page__note--probe">
        <h3>공식 문서에 없는 동작 하나 — 범위를 좁히면 Tween은 살아남습니다</h3>
        <p>
          공식 문서는 kill 뒤에 조회가 어떻게 되는지 밝히지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 결과,{' '}
          <strong>property 하나만 kill하면 Tween 자체는 살아남아</strong> <code>getTweensOf()</code>에 <strong>1개</strong>로 계속
          잡히고, 범위를 좁히지 않으면 <strong>0개</strong>가 됩니다.
        </p>
        <p className="find-stop-page__provenance">
          측정 방법 · <code>{"gsap.to(o, { x: 240, opacity: 0.25, duration: 1, ease: 'none', paused: true })"}</code>를{' '}
          <code>progress(0.5)</code>로 옮긴 뒤 네 가지 중단을 각각 실행하고 <code>getTweensOf(o).length</code>를 읽었습니다. 결과는{' '}
          <code>killTweensOf(o)</code> 0개 · <code>killTweensOf(o, &apos;x&apos;)</code> 1개 · <code>kill()</code> 0개 ·{' '}
          <code>kill(o, &apos;x&apos;)</code> 1개였고, 이어서 <code>progress(1)</code>을 부르면 1개로 남은 두 경우만{' '}
          <code>opacity</code>가 0.25까지 계속 갔습니다.
        </p>
      </div>

      <KillScopeLab />
    </section>
  )
}
