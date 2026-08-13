/** 조건 boolean이 뒤집힐 때 일어나는 정리와 재실행을 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import { breakpointRange, targetClassName, useConditionRebuildAnimation } from './useConditionRebuildAnimation'
import './ConditionRebuildLab.css'

// 조건 표에 쓸 이름·설명 — runtime이 만든 boolean과 같은 키로 묶는다
const conditionRows = [
  { key: 'isWide', label: 'isWide', meaning: '창이 breakpoint 이상으로 넓다' },
  { key: 'isNarrow', label: 'isNarrow', meaning: '창이 breakpoint보다 좁다' },
  { key: 'reduceMotion', label: 'reduceMotion', meaning: '운영체제에서 모션을 줄이라고 설정했다' },
] as const

export function ConditionRebuildLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, breakpoint, setBreakpoint, breakpointMax, viewportWidth, observation, play } = useConditionRebuildAnimation()
  const descriptor = observation.descriptor

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = descriptor
    ? `const mm = gsap.matchMedia(scope)
// 재생 버튼이 같은 Tween을 제어하도록 현재 instance를 보관합니다.
let tween

mm.add(
  {
    isWide: '${descriptor.queries.isWide}',
    isNarrow: '${descriptor.queries.isNarrow}',
    reduceMotion: '${descriptor.queries.reduceMotion}',
  },
  (context) => {
    const { isWide, isNarrow, reduceMotion } = context.conditions
    // 지금 실행에서는 isWide=${descriptor.conditions.isWide}, isNarrow=${descriptor.conditions.isNarrow}, reduceMotion=${descriptor.conditions.reduceMotion}

    gsap.set('.${targetClassName}', { x: ${descriptor.x}, rotation: 0 })
    tween = gsap.to('.${targetClassName}', {
      rotation: ${descriptor.rotation},
      duration: ${descriptor.duration},
      paused: true,
    })

    return () => {
      // 이 실행이 정리될 때 GSAP 밖의 사용자 정리만 여기에 둡니다
    }
  },
)

function play() {
  tween.restart()
}`
    : '// MatchMedia가 아직 조건을 평가하지 않았습니다.'

  return (
    <section className="condition-rebuild-lab" aria-labelledby="condition-rebuild-lab-title">
      <h3 id="condition-rebuild-lab-title">조건이 뒤집히면 이전 실행은 어떻게 되나</h3>
      <p className="condition-rebuild-lab__goal">
        breakpoint를 지금 창 폭 <strong>{viewportWidth}px</strong> 위아래로 끌어 보세요. 조건 boolean이 뒤집히는 순간{' '}
        <strong>실행 횟수</strong>가 늘고 <strong>직전 정리 기록</strong>이 채워집니다. 사각형의 위치도 새 조건 값으로 다시 잡힙니다.
      </p>

      <div className="condition-rebuild-lab__body" ref={scope}>
        <div className="condition-rebuild-lab__stage">
          <div className={targetClassName} />
        </div>

        <div className="condition-rebuild-lab__table-wrap">
          <table className="condition-rebuild-lab__table">
            <caption>지금 실행에 쓰인 조건</caption>
            <thead>
              <tr>
                <th scope="col">조건 이름</th>
                <th scope="col">media query</th>
                <th scope="col">값</th>
                <th scope="col">뜻</th>
              </tr>
            </thead>
            <tbody>
              {conditionRows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  <td>
                    <code>{descriptor ? descriptor.queries[row.key] : '—'}</code>
                  </td>
                  <td>{descriptor ? String(descriptor.conditions[row.key]) : '—'}</td>
                  <td>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <dl className="condition-rebuild-lab__observation">
          <div>
            <dt id="crl-run">handler 실행 횟수</dt>
            <dd>
              <output aria-labelledby="crl-run">{observation.runCount}회</output>
            </dd>
          </div>
          <div>
            <dt id="crl-cleanup">직전 정리 기록</dt>
            <dd>
              <output aria-labelledby="crl-cleanup">{observation.lastCleanup}</output>
            </dd>
          </div>
          <div>
            <dt id="crl-values">이번 실행이 쓴 값</dt>
            <dd>
              <output aria-labelledby="crl-values">
                {descriptor ? `x ${descriptor.x} · rotation ${descriptor.rotation} · duration ${descriptor.duration}` : '—'}
              </output>
            </dd>
          </div>
        </dl>

        <fieldset className="condition-rebuild-lab__controls">
          <legend>조절할 값</legend>

          <label htmlFor="condition-rebuild-breakpoint">breakpoint</label>
          <output htmlFor="condition-rebuild-breakpoint">{breakpoint}px</output>
          <input
            id="condition-rebuild-breakpoint"
            type="range"
            min={breakpointRange.min}
            max={breakpointMax}
            step={breakpointRange.step}
            value={breakpoint}
            onChange={(event) => setBreakpoint(Number(event.target.value))}
          />

          <button type="button" onClick={play}>
            이번 조건으로 재생
          </button>
        </fieldset>
      </div>

      <p className="condition-rebuild-lab__status">
        breakpoint {breakpoint}px · 창 폭 {viewportWidth}px · handler {observation.runCount}회 실행
      </p>

      <pre className="condition-rebuild-lab__code">
        <code>{code}</code>
      </pre>

      <div className="condition-rebuild-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            breakpoint가 창 폭을 넘어서는 순간 <code>isWide</code>와 <code>isNarrow</code>가 동시에 뒤집힙니다. 그러면 이전 실행이 걸어
            둔 위치와 Tween이 <strong>사라지고</strong>, 새 조건 값으로 만든 것이 그 자리에 들어옵니다. 실행 횟수는 늘고, 정리 기록은
            방금 무엇이 치워졌는지 알려 줍니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            정리 기록에 적히는 숫자가 <strong>새 실행 번호보다 항상 하나 작다</strong>는 점을 보세요. 정리가 먼저이고 재실행이
            나중입니다. 그리고 <strong>내가 직접 kill하거나 원래 위치로 되돌리는 코드를 한 줄도 쓰지 않았다</strong>는 점을 확인하세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문장 그대로입니다 — <strong>handler가 실행되는 동안 만들어진 모든 GSAP animation과 ScrollTrigger는 context에 수집돼,
            조건이 더 이상 맞지 않을 때 함께 revert된다.</strong> 우리가 부른 <code>gsap.set</code>과 <code>gsap.to</code>는 그 실행
            중에 만들어졌으므로 수집 대상입니다. 그래서 정리 목록을 우리가 들고 있지 않아도 됩니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            desktop에서만 도는 hero animation, mobile에서만 붙는 스크롤 효과처럼 <strong>화면 폭에 따라 존재 자체가 달라지는</strong>{' '}
            연출에 씁니다. 조건이 바뀔 때 이전 연출이 남긴 <code>transform</code>이 그대로 붙어 있으면 레이아웃이 깨지는데, 그 정리를
            GSAP에 맡기는 것이 이 API의 값어치입니다.
          </p>
        </article>
      </div>

      <div className="condition-rebuild-lab__note">
        <p>
          <strong>브라우저 창을 실제로 줄였다 늘려도 같은 일이 일어납니다.</strong> 그때는 GSAP이 스스로 조건 변화를 감지합니다. 여기서
          breakpoint slider를 둔 이유는, 창 크기를 바꾸지 않고도 조건이 뒤집히는 순간을 화면 안에서 보게 하기 위해서입니다. slider를
          움직이면 query 문자열 자체가 달라지므로 이 예제는 MatchMedia를 되돌리고 새로 만듭니다.
        </p>
      </div>

      <p className="condition-rebuild-lab__source">
        실행 코드 위치 · <code>examples/ConditionRebuildLab/useConditionRebuildAnimation.ts</code>
      </p>
    </section>
  )
}
