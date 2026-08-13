/** kill이 실제로 하는 일과 revert가 추가로 하는 일을 공식 서사와 실측값으로 갈라 보여준다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { RevertVsKillLab } from '../../examples/RevertVsKillLab/RevertVsKillLab'

// 공식 Tween.kill() 페이지의 첫 예제 — 참조까지 지우는 두 줄이 한 쌍이다
const killCall = `// kill the entire animation:
animation.kill();
// set to null so the reference is removed
animation = null;`

// 공식 Tween.revert() 페이지가 "문제"로 제시한 순서 — progress(0)만으로는 부족한 이유다
const problemCall = `<div class="box"></div>

// fade out
let tween = gsap.to(".box", { opacity: 0 });

tween.progress(0).pause();

<!-- inline style is still present -->
<div class="box" style="opacity: 1"></div>`

// 공식이 제시한 해법 한 줄 — 주석까지 원문이다
const solutionCall = `animation.revert(); // removes inline styles that were added by the animation`

// kill과 revert가 각각 어디까지 하는지 한 표에서 대조한다
const compareRows = [
  { aspect: '재생을 멈춘다', kill: '한다', revert: '한다' },
  { aspect: '부모 timeline에서 빠진다', kill: '한다', revert: '한다 (revert는 kill을 포함한다)' },
  { aspect: 'garbage collection으로 넘어간다', kill: '한다', revert: '한다' },
  { aspect: '대상의 현재 값', kill: '멈춘 그 값 그대로 남는다', revert: 'animation 이전 상태로 돌아간다' },
  { aspect: 'animation이 추가한 inline style', kill: '남는다', revert: '제거된다' },
]

export function StopVsRestoreSection() {
  return (
    <section id="stop-vs-restore" className="find-stop-page__section" aria-labelledby="stop-vs-restore-title">
      <SectionHeading
        number="05"
        id="stop-vs-restore"
        title="그 자리에 멈출까, 시작으로 되돌릴까"
        description="이 페이지에서 가장 헷갈리는 지점입니다. kill()은 '멈춤'이고 revert()는 '멈춤 + 원상복구'입니다. 되돌리는 일은 kill에 들어 있지 않습니다."
      />

      <div className="find-stop-page__split">
        <div className="find-stop-page__prose">
          <p>
            공식 문서는 <strong>kill</strong>을 이렇게 정의합니다. <strong>"animation을 즉시 멈추고, 부모 timeline에서 제거하고,
            garbage collection으로 넘긴다."</strong> 이 문장 어디에도 <strong>화면을 원래대로 돌린다</strong>는 말은 없습니다.
          </p>
          <p>
            인자 없이 <code>kill()</code>만 부르면 여기에 <strong>property tween을 전부 제거</strong>하는 일까지 한 번에 일어납니다.
            공식 예제는 <code>animation = null</code>을 한 줄 더 붙여 애플리케이션의 변수 참조도 제거합니다.
          </p>
          <p>
            그래서 경고도 함께 적혀 있습니다. <strong>"나중에 다시 쓸 animation은 kill()하지 마라. 재사용하려면 pause()를 쓰면
            된다."</strong> kill은 되돌릴 수 없는 정리이고, pause는 잠깐 멈춤입니다.
          </p>
        </div>
        <pre className="find-stop-page__code">
          <code>{killCall}</code>
        </pre>
      </div>

      <div className="find-stop-page__subheading">
        <h3>공식 revert 페이지가 든 &quot;문제&quot;</h3>
        <p>
          <code>revert()</code>는 새 기능이 아니라 <strong>기존 방법의 빈틈</strong>에서 출발합니다. 공식 문서는 이 순서를 그대로
          보여줍니다.
        </p>
      </div>

      <div className="find-stop-page__split">
        <pre className="find-stop-page__code">
          <code>{problemCall}</code>
        </pre>
        <div className="find-stop-page__prose">
          <p>
            처음 <code>&lt;div class=&quot;box&quot;&gt;</code>에는 <strong>inline style이 전혀 없습니다.</strong>{' '}
            <code>opacity</code>는 기본값 1입니다.
          </p>
          <p>
            <code>progress(0).pause()</code>는 값을 시작 지점으로 되돌리기는 합니다. 공식 표현으로{' '}
            <strong>"GSAP이 computed style에서 읽어 둔 시작값"</strong>으로 돌아갑니다. 그런데 그 결과가{' '}
            <strong><code>style=&quot;opacity: 1&quot;</code>이라는 inline style로 남습니다.</strong>
          </p>
          <p>
            공식 문서가 든 사고 사례는 이렇습니다. <strong>media query CSS rule이 그 element의 opacity를 0.5로 정해 두었다면, 남아 있는
            inline style이 그 class rule을 덮어써 버립니다.</strong>
          </p>
          <p>
            공식 문서는 <code>progress(0)</code>을 탓하지 않습니다. <strong>그 지점의 상태를 보장하려면 inline style을 쓰는 것이 당연한
            동작</strong>이라서, <strong>원래 inline style을 기억해 두고 자기가 추가한 것만 제거하는 별도 메서드</strong>가 필요했다고
            적습니다.
          </p>
        </div>
      </div>

      <div className="find-stop-page__prose">
        <p>
          그 해법이 <code>revert()</code>입니다. 공식 문서는 <strong>GSAP 3.11에서 모든 Tween과 Timeline에 추가됐다</strong>고 밝히고
          아래 한 줄을 제시합니다. signature는 <code>revert( ) : Self</code>로 <strong>인자가 없고</strong>, 반환값은{' '}
          <strong>Tween 자신이며 chaining을 쉽게 하기 위한 것</strong>입니다.
        </p>
      </div>

      <pre className="find-stop-page__code">
        <code>{solutionCall}</code>
      </pre>

      <div className="find-stop-page__warning">
        <h3>revert는 되돌린 다음 kill까지 합니다</h3>
        <p>
          공식 정의 문장은 한 줄입니다. <strong>"animation을 revert하고 kill하며, target을 animation 이전 상태로 되돌린다. 여기에는
          animation이 추가한 inline style의 제거도 포함된다."</strong>
        </p>
        <p>
          그래서 <code>revert()</code>는 <strong>일시적인 되감기가 아닙니다.</strong> 되돌린 뒤 그 Tween은 사라집니다. 되감았다가 다시
          쓰고 싶다면 <a href={toHref('/fundamentals/tween-playhead')}>재생 헤드를 옮기는 방법</a>이 따로 있습니다.
        </p>
      </div>

      <div className="find-stop-page__table-wrap">
        <table className="find-stop-page__scope-table">
          <caption>같은 지점에서 부르면 무엇이 같고 무엇이 다른가</caption>
          <thead>
            <tr>
              <th scope="col">일어나는 일</th>
              <th scope="col">
                <code>kill()</code>
              </th>
              <th scope="col">
                <code>revert()</code>
              </th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.aspect}>
                <th scope="row">{row.aspect}</th>
                <td>{row.kill}</td>
                <td>{row.revert}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="find-stop-page__note find-stop-page__note--probe">
        <h3>공식 문서에 없는 비교 — 같은 지점에서 실제로 재어 본 값</h3>
        <p>
          공식 문서는 두 메서드를 나란히 놓고 결과를 비교하지 않습니다. 아래는 GSAP 3.15.0을 직접 실행해 얻은 숫자입니다.
        </p>
        <p>
          <strong>값이 어디에 남는가</strong> · <code>progress(0.5)</code>에서 대상 값은 <code>50</code>이었고,{' '}
          <code>kill()</code> 뒤에도 <strong>50</strong>, 같은 조건에서 <code>revert()</code> 뒤에는 <strong>0</strong>이었습니다.
          되돌아가는 0은 <strong>Tween이 기록해 둔 시작값</strong>입니다. 시작 전에 <code>gsap.set(o, {'{ v: 30 }'})</code>으로 30을
          만들어 두면 <code>revert()</code>는 0이 아니라 <strong>30</strong>으로 돌아갔습니다.
        </p>
        <p>
          <strong>Tween은 어떻게 되는가</strong> · <code>revert()</code> 뒤에도 <code>getById()</code>는{' '}
          <code>undefined</code>, <code>getTweensOf()</code>는 <strong>0개</strong>였습니다. 되돌리기만 하고 남는 것이 아니라{' '}
          <strong>kill과 똑같이 사라집니다.</strong>
        </p>
        <p>
          <strong>다시 쓸 수 있는가</strong> · <code>kill()</code>한 Tween에 <code>progress(1)</code>과{' '}
          <code>restart()</code>를 이어 불러도 대상 값은 <strong>50에서 움직이지 않았습니다.</strong> 공식 경고("재사용하려면
          pause()")가 실제로 어떤 모습인지 보여 주는 결과입니다.
        </p>
        <p className="find-stop-page__provenance">
          측정 방법 · <code>{"const o = { v: 0 }; gsap.to(o, { v: 100, duration: 1, ease: 'none', paused: true })"}</code>를 만들어{' '}
          <code>tween.progress(0.5)</code>로 중간까지 옮긴 뒤 각각 <code>kill()</code>과 <code>revert()</code>를 호출하고{' '}
          <code>o.v</code>를 그대로 읽었습니다. registry 확인은 같은 config에 <code>{"id: 'rev'"}</code>를 붙여{' '}
          <code>getById</code>·<code>getTweensOf</code>를 호출 전후로 비교했습니다.
        </p>
      </div>

      <RevertVsKillLab />
    </section>
  )
}
