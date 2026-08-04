/** exportRoot()가 root의 자식들을 새 timeline으로 옮기는 방식과 export 이후 경계를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// export 전후로 root 아래 구조가 어떻게 바뀌는지 보여주는 두 그림
const beforeTree = {
  title: 'exportRoot() 전',
  root: 'gsap.globalTimeline',
  children: ['이미 돌고 있던 Tween A', '이미 돌고 있던 Timeline B', 'delayedCall C'],
}

const afterTree = {
  title: 'exportRoot() 후',
  root: 'gsap.globalTimeline',
  children: ['exportRoot()가 만든 새 Timeline (A와 B를 안에 담고 있다)', 'delayedCall C — 인자를 안 주면 여기 남는다', 'export 뒤에 만든 새 Tween D'],
}

// 공식 exportRoot 페이지에 실린 코드 예제 원문
const officialExample = `var tl = gsap.exportRoot();
gsap.to(tl, { duration: 0.5, timeScale: 0 });
//this tween isn't affected because it's created after the export.
gsap.fromTo(
  myWindow,
  { scaleX: 0, scaleY: 0 },
  { duration: 1, scaleX: 1, scaleY: 1 }
);`

export function ExportRootSection() {
  return (
    <section id="export-root" className="root-clock-page__section" aria-labelledby="export-root-title">
      <SectionHeading
        number="05"
        id="export-root"
        title="지금까지 만든 것만 따로 묶는다"
        description="globalTimeline에 거는 조작은 앞으로 만들 것까지 전부 잡습니다. '지금 이 순간까지 있던 것'만 묶어서 다루고 싶을 때 쓰는 것이 exportRoot()입니다."
      />

      <div className="root-clock-page__prose">
        <p>
          02단계 마지막의 문제를 이어받습니다. <code>globalTimeline.pause()</code>는 <strong>delayedCall까지</strong> 멈춥니다. 그리고
          더 큰 문제가 있습니다 — 멈춰 놓은 동안 <strong>새로 만드는 animation도 함께 멈춥니다.</strong> 게임 화면을 얼려 두고 그
          위에 popup을 띄우고 싶은데, popup의 등장 animation까지 얼어붙는 것입니다.
        </p>
        <p>
          공식 문서가 정의하는 <code>gsap.exportRoot()</code>는 root timeline에 있던 <strong>모든 tween과 timeline, 그리고
          [선택적으로] delayed call</strong>을 <strong>새 timeline으로 매끄럽게 옮기는</strong> 함수입니다. 그래서 export 뒤에 만드는
          것에는 영향을 주지 않으면서 <strong>전역인 것처럼 보이는 고급 작업</strong>을 할 수 있습니다.
        </p>
      </div>

      <pre className="root-clock-page__signature">
        <code>Returns : Timeline — root의 tween과 timeline을 담은 새 Timeline instance</code>
      </pre>

      <div className="root-clock-page__split">
        {[beforeTree, afterTree].map((tree) => (
          <div key={tree.title} className="root-clock-page__tree">
            <div className="root-clock-page__tree-root">
              <strong>{tree.root}</strong>
              <span>{tree.title}</span>
            </div>
            <ul>
              {tree.children.map((child) => (
                <li key={child}>
                  <span>{child}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="root-clock-page__subheading">
        <h3>공식이 든 사용 상황</h3>
        <p>
          GSAP으로 모든 animation을 처리하는 게임에서, 어느 시점에 <strong>전체를 timeScale로 서서히 멈추면서 동시에 새 popup 창을
          띄우는</strong> 상황입니다.
        </p>
      </div>

      <pre className="root-clock-page__code">
        <code>{officialExample}</code>
      </pre>

      <div className="root-clock-page__note">
        <p>
          세 번째 줄의 주석이 이 함수의 존재 이유를 그대로 말합니다 —{' '}
          <strong>"이 tween은 export 뒤에 만들어졌기 때문에 영향을 받지 않는다."</strong> 얼려 둔 것은{' '}
          <code>tl</code>이라는 <strong>새 timeline 하나</strong>이지, root 전체가 아닙니다.
        </p>
        <p>
          공식 문서는 되돌리는 방법도 함께 적습니다. 준비가 되면 <strong>timeScale을 다시 1로 tween</strong>해서 전체를 되살릴 수
          있고, 또는 export한 instance를 <code>pause()</code>했다가 <code>resume()</code>하거나 심지어 <code>reverse()</code>할 수도
          있습니다.
        </p>
      </div>

      <div className="root-clock-page__note">
        <h3>여러 번 불러도 된다 — 대신 겹겹이 쌓인다</h3>
        <p>
          공식 문서는 <code>exportRoot()</code>를 <strong>원하는 만큼 여러 번</strong> 부를 수 있다고 밝힙니다. 하는 일은 흩어져 있던
          tween·timeline·delayedCall을 <strong>하나의 timeline으로 감싸고 그 timeline 자신을 root에 올리는 것뿐</strong>이라, 다시
          부르면 <strong>그 timeline이 또 다른 timeline에 감싸입니다.</strong> 공식 표현으로 <strong>원하는 만큼 깊게 중첩</strong>할
          수 있습니다.
        </p>
      </div>

      <div className="root-clock-page__warning">
        <h3>이미 끝난 것은 포함되지 않는다</h3>
        <p>
          공식 문서의 경고입니다 — <strong>완료된 tween과 timeline은 자동 garbage collection을 위해 globalTimeline에서
          제거됩니다.</strong> 그래서 특정 tween이 <strong>끝난 뒤에</strong> <code>exportRoot()</code>를 하면{' '}
          <strong>그 tween은 export에 포함되지 않습니다.</strong>
        </p>
        <p>
          다시 말해 <code>exportRoot()</code>가 담는 것은 "지금까지 만든 전부"가 아니라{' '}
          <strong>"지금 이 순간 아직 root에 매달려 있는 것"</strong>입니다. 끝난 animation을 되감으려고 export 결과를{' '}
          <code>reverse()</code>해도 이미 사라진 것은 돌아오지 않습니다.
        </p>
      </div>

      <div className="root-clock-page__note root-clock-page__note--probe">
        <h3>공식 페이지에 시그니처가 없다</h3>
        <p>
          공식 <code>gsap.exportRoot()</code> 페이지에는 <strong>시그니처 줄도 Parameters 절도 없습니다.</strong> 본문에{' '}
          "[선택적으로] delayed call"이라는 표현만 있어서, 그 선택을 <strong>어떤 인자로 하는지가 공식에 적혀 있지 않습니다.</strong>
        </p>
        <p>
          설치본 GSAP 3.15.0의 타입 선언은 <code>exportRoot(vars?: TimelineVars, includeDelayedCalls?: boolean): Timeline</code>{' '}
          입니다. 실행해 보니 <strong>인자 없이 부른 exportRoot()는 delayedCall을 옮기지 않고 globalTimeline에 남겨 두었고</strong>,{' '}
          두 번째 인자에 <code>true</code>를 주면 delayedCall도 함께 옮겨 갔습니다. 이는 02단계에서 본 공식 안내 —{' '}
          <strong>delayedCall을 빼고 싶으면 exportRoot()를 보라</strong> — 와 일치합니다.
        </p>
        <p className="root-clock-page__provenance">
          측정 방법 · <code>gsap.delayedCall(5, fn)</code>을 만든 뒤 <code>gsap.exportRoot()</code>를 부르고{' '}
          <code>delayedCall.parent === gsap.globalTimeline</code>을 출력, 이어서 <code>gsap.exportRoot(&#123;&#125;, true)</code>로
          같은 값을 다시 출력. 재현 조건 · gsap 3.15.0, Node 단독 실행.
        </p>
      </div>

      <div className="root-clock-page__note">
        <h3>이 절에 실행 예제를 두지 않은 이유</h3>
        <p>
          <code>exportRoot()</code>는 <strong>페이지 전체의 root를 실제로 재배치합니다.</strong> 학습 페이지 안에서 이것을 실행하면 이
          페이지의 다른 예제와 앱의 다른 animation이 통째로 export된 timeline 안으로 들어가고, 그 상태를 <strong>원래대로 되돌릴
          공식 방법이 없습니다.</strong> 공식이 밝힌 대로 export는 <strong>겹겹이 쌓이기만</strong> 하기 때문입니다.
        </p>
        <p>
          되돌릴 수 없는 전역 조작을 학습용으로 실행하는 것은 위험이 학습 가치보다 큽니다. 그래서 이 절은{' '}
          <strong>공식 코드와 구조 그림</strong>으로만 설명합니다.
        </p>
      </div>
    </section>
  )
}
