/** scope가 선택자 범위를 어떻게 좁히는지 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import { useScopeRuntime } from './useScopeRuntime'
import './ScopeLab.css'

export function ScopeLab() {
  // runtime이 소유한 관찰값과 실행 action을 그대로 받아 화면에만 쓴다
  const { scope, boxSelector, observation, status, reducedMotion, run } = useScopeRuntime()

  // 실행에 쓰인 선택자와 옵션을 코드 문법으로만 포맷한다
  const code = `const container = useRef(null)

useGSAP(() => {
  // 문서 전체에 ${observation.matchedInDocument}개가 있지만
  gsap.to('${boxSelector}', { x: 150 })
  // 실제로 잡히는 건 container 안의 ${observation.targetedByTween}개입니다.
}, { scope: container })

return <div ref={container}>...</div>`

  return (
    <section className="react-scope-lab" aria-labelledby="react-scope-lab-title">
      <h3 id="react-scope-lab-title">같은 class인데 하나만 움직이기</h3>
      <p className="react-scope-lab__goal">
        아래 두 상자는 <strong>완전히 같은 class</strong>를 씁니다. 그런데 하나만 움직입니다. 위쪽 상자만 <code>scope</code>로 지정한
        container 안에 있기 때문입니다.
      </p>

      <div className="react-scope-lab__stages">
        <div className="react-scope-lab__stage react-scope-lab__stage--scoped" ref={scope}>
          <p className="react-scope-lab__stage-label">
            <code>scope</code>로 지정한 container <strong>안</strong>
          </p>
          <div className={boxSelector.slice(1)} data-label="scope 안 상자" />
        </div>

        <div className="react-scope-lab__stage">
          <p className="react-scope-lab__stage-label">
            같은 페이지지만 container <strong>밖</strong>
          </p>
          <div className={boxSelector.slice(1)} data-label="scope 밖 상자" />
        </div>
      </div>

      <button type="button" className="react-scope-lab__run" onClick={run}>
        실행
      </button>

      <p className="react-scope-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <dl className="react-scope-lab__observation">
        <div>
          <dt id="scope-obs-doc">문서 전체에서 이 선택자에 맞는 element</dt>
          <dd>
            <output aria-labelledby="scope-obs-doc">{observation.matchedInDocument}개</output>
          </dd>
        </div>
        <div>
          <dt id="scope-obs-tween">Tween이 실제로 잡은 element</dt>
          <dd>
            <output aria-labelledby="scope-obs-tween">{observation.targetedByTween}개</output>
          </dd>
        </div>
        <div>
          <dt id="scope-obs-labels">잡힌 element</dt>
          <dd>
            <output aria-labelledby="scope-obs-labels">{observation.targetedLabels.join(', ') || '읽는 중'}</output>
          </dd>
        </div>
      </dl>

      <pre className="react-scope-lab__code">
        <code>{code}</code>
      </pre>

      <div className="react-scope-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            선택자는 <code>{boxSelector}</code> 하나뿐인데 아래 상자는 가만히 있습니다. 코드에는 두 상자를 구분하는 조건이 전혀
            없습니다. 구분한 것은 <code>scope</code>입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            관찰 패널의 두 숫자를 비교하세요. 문서 전체에는 {observation.matchedInDocument}개가 맞지만 Tween이 잡은 것은{' '}
            {observation.targetedByTween}개입니다. <code>scope</code>가 없었다면 두 숫자가 같았을 것입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서 표현으로 <code>scope</code>는 훅 안의 모든 GSAP <strong>selector text</strong>를 그 container의{' '}
            <strong>자손으로 한정</strong>합니다. GSAP이 문서 전체가 아니라 container 안에서만 찾습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            같은 컴포넌트를 화면에 여러 번 놓을 때 반드시 필요합니다. <code>scope</code>가 없으면 첫 번째 카드의 애니메이션이 두 번째,
            세 번째 카드까지 함께 움직입니다. 이 학습 사이트의 예제들도 전부 <code>scope</code>를 씁니다.
          </p>
        </article>
      </div>

      <p className="react-scope-lab__source">
        실행 코드 위치 · <code>examples/ScopeLab/useScopeRuntime.ts</code>
      </p>
    </section>
  )
}
