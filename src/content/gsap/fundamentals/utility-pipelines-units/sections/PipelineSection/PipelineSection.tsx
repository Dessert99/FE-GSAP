/** pipe가 함수 생성과 왼쪽→오른쪽 값 전달을 분리한다는 멘탈 모델을 lab 앞에 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { PipelineLab } from '../../examples/PipelineLab/PipelineLab'

export function PipelineSection() {
  return (
    <section className="pipeline-units-page__section" id="pipeline" aria-labelledby="pipeline-title">
      <SectionHeading
        number="01"
        id="pipeline"
        title="출력과 입력이 맞아야 이어진다"
        description="pipeline은 함수 목록이 아니라 값이 흐르는 통로입니다. 앞 함수의 반환값이 다음 함수의 유일한 입력이 되므로, 순서와 입출력 형태를 먼저 맞춰야 합니다."
      />

      <div className="pipeline-units-page__concept-grid">
        <article><h3>만들 때는 실행하지 않습니다</h3><p><code>pipe(func1, func2, func3)</code>의 반환은 <strong>Function</strong>입니다. 들어올 값을 아직 주지 않고 순서만 저장해 둔 재사용 함수입니다.</p></article>
        <article><h3>부를 때 왼쪽부터 흐릅니다</h3><p>완성된 함수에 값을 넣으면 <code>func1</code>의 결과가 <code>func2</code>로, 그 결과가 <code>func3</code>로 넘어갑니다. 공식 Parameters도 “주어진 순서”를 명시합니다.</p></article>
      </div>

      <pre className="pipeline-units-page__flow"><code>raw input → clamp() → mapRange() → snap() → CSS에 쓸 숫자</code></pre>

      <div className="pipeline-units-page__reference-grid">
        <article>
          <h3>공식이 먼저 보여 준 수동 전달</h3>
          <pre><code>{`const value1 = func1(input)\nconst value2 = func2(value1)\nconst output = func3(value2)`}</code></pre>
          <p>중간 변수 세 개로 반환값을 직접 옮길 수 있지만, 같은 순서를 재사용할 때마다 이 연결을 반복해야 합니다.</p>
        </article>
        <article>
          <h3>공식이 awkward라고 부른 중첩</h3>
          <pre><code>{`const output = func1(func2(func3(input)))`}</code></pre>
          <p>괄호 안쪽부터 실행되어 시선이 오른쪽에서 왼쪽으로 움직입니다. <code>pipe(func1, func2, func3)</code>는 읽는 방향과 실행 방향을 맞춥니다.</p>
        </article>
      </div>

      <PipelineLab />

      <aside className="pipeline-units-page__note">
        <h3>공식 예제의 의도</h3>
        <p>공식 tip은 clamp·mapRange·snap·interpolate 같은 재사용 함수 조합을 권하고, 0~100 제한 → 0~<code>window.innerWidth</code> 변환 → 20 간격 고정 순서와 입력 <code>25.874</code>를 사용합니다. lab은 viewport에 따라 결과가 바뀌지 않도록 출력 범위를 0~360으로 고정했습니다. 같은 페이지의 <strong>Video demo: combining utility methods</strong>도 이 조합을 보충합니다.</p>
      </aside>
    </section>
  )
}
