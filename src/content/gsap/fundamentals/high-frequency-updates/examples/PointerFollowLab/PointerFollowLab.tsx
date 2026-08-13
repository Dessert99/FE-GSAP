/** 두 쓰기 경로의 차이를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { FollowEase, WritePath } from './usePointerFollowAnimation'
import { inputMax, usePointerFollowAnimation } from './usePointerFollowAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './PointerFollowLab.css'

// radio에 노출할 쓰기 경로와 그 경로가 만드는 결과의 한 줄 요약이다
const pathOptions: { value: WritePath; label: string; hint: string }[] = [
  { value: 'quickSetter', label: 'quickSetter · 즉시', hint: '입력한 자리에 바로 붙습니다' },
  { value: 'quickTo', label: 'quickTo · 부드럽게', hint: '입력한 자리를 뒤따라옵니다' },
]

// radio에 노출할 ease 후보와 읽기 쉬운 이름이다
const easeOptions: { value: FollowEase; label: string }[] = [
  { value: 'power3', label: 'power3 (공식 예제 값)' },
  { value: 'none', label: 'none (등속)' },
]

export function PointerFollowLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const {
    scope,
    trackRef,
    path,
    setPath,
    duration,
    setDuration,
    ease,
    setEase,
    input,
    write,
    pointTo,
    descriptor,
    observation,
    tweenPaused,
    toggleTweenPaused,
    reducedMotion,
  } = usePointerFollowAnimation()

  // 아직 입력하지 않았다면 실제로 호출하지 않은 쓰기 함수를 코드 패널에서도 실행한 것처럼 보이지 않게 한다
  const setterCall = observation.writeCalls === 0 ? '// 아직 입력 전입니다.' : `setX(${observation.lastValue})`
  // quickTo 경로도 마지막 입력이 있을 때만 실제 호출값을 표시한다
  const quickToCall = observation.writeCalls === 0 ? '// 아직 입력 전입니다.' : `xTo(${observation.lastValue})`
  // 실행에 쓰인 descriptor와 마지막 호출값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code =
    descriptor.effectivePath === 'quickSetter'
      ? `// 1. 비교를 시작할 x를 같은 값으로 맞춥니다.
gsap.set('${descriptor.selector}', { x: ${descriptor.startX} })

// 2. 입력 바깥에서 함수를 딱 한 번 만듭니다.
const setX = gsap.quickSetter('${descriptor.selector}', 'x', '${descriptor.unit}')

// 3. 입력이 올 때마다 이 함수에 숫자만 흘려보냅니다.
${setterCall}

// 지금까지 호출한 횟수: ${observation.writeCalls}회 · 만들어진 Tween: ${observation.tweensSeen}개`
      : `// 1. 비교를 시작할 x를 같은 값으로 맞춥니다.
gsap.set('${descriptor.selector}', { x: ${descriptor.startX} })

// 2. 입력 바깥에서 함수를 딱 한 번 만듭니다. 이때 Tween 하나가 함께 생깁니다.
const xTo = gsap.quickTo('${descriptor.selector}', 'x', {
  duration: ${descriptor.duration},
  ease: '${descriptor.ease}',
  onUpdate: () => {
    // 매 프레임 실제 x를 다시 읽어 관찰 패널에 표시합니다.
    const appliedX = gsap.getProperty('${descriptor.selector}', 'x')
  },
})

// 3. 입력이 올 때마다 이 함수에 숫자만 흘려보냅니다.
${quickToCall}

// 버튼은 반환 함수가 가진 같은 Tween의 paused 상태를 뒤집습니다.
function togglePaused() {
  xTo.tween.paused(!xTo.tween.paused())
}

// 지금까지 호출한 횟수: ${observation.writeCalls}회 · 등장한 Tween 인스턴스: ${observation.tweensSeen}개`

  return (
    <section className="pointer-follow-lab" aria-labelledby="pointer-follow-lab-title">
      <h3 id="pointer-follow-lab-title">같은 입력을 두 경로로 흘려보내기</h3>
      <p className="pointer-follow-lab__goal">
        트랙 위에서 포인터를 움직이거나 아래 슬라이더를 조작하면 점이 그 위치로 갑니다. 두 방법 모두 <strong>같은 숫자</strong>를 같은
        함수에 넘깁니다. 쓰기 경로만 바꾸면서 <strong>점이 입력을 즉시 따라오는지, 뒤늦게 따라오는지</strong> 그리고{' '}
        <strong>Tween이 몇 개나 등장하는지</strong>를 보세요.
      </p>

      <div className="pointer-follow-lab__body" ref={scope}>
        <div className="pointer-follow-lab__stage">
          <div
            className="pointer-follow-lab__track"
            ref={trackRef}
            onPointerMove={(event) => pointTo(event.clientX)}
            aria-hidden="true"
          >
            <div className="pointer-follow-lab__dot" />
          </div>

          <label className="pointer-follow-lab__input-label" htmlFor="pointer-follow-input">
            입력 위치 (포인터 대신 키보드로도 같은 값을 넣습니다)
          </label>
          <input
            id="pointer-follow-input"
            type="range"
            min="0"
            max={inputMax}
            step="1"
            value={input}
            onChange={(event) => write(Number(event.target.value))}
          />
          <p className="pointer-follow-lab__input-value">
            입력 눈금 {input} / {inputMax} · GSAP에 넘긴 숫자 {observation.lastValue}
          </p>
        </div>

        <fieldset className="pointer-follow-lab__controls">
          <legend>쓰기 방법</legend>

          <div className="pointer-follow-lab__radio-group" role="radiogroup" aria-labelledby="pointer-follow-path-label">
            <p id="pointer-follow-path-label">쓰기 경로</p>
            {pathOptions.map((option) => (
              <label key={option.value} htmlFor={`pointer-follow-path-${option.value}`}>
                <input
                  id={`pointer-follow-path-${option.value}`}
                  type="radio"
                  name="pointer-follow-path"
                  value={option.value}
                  checked={path === option.value}
                  onChange={() => setPath(option.value)}
                />
                <span>
                  {option.label} <small>{option.hint}</small>
                </span>
              </label>
            ))}
          </div>

          <label htmlFor="pointer-follow-duration">duration (quickTo에만 있습니다)</label>
          <output htmlFor="pointer-follow-duration">{duration}</output>
          <input
            id="pointer-follow-duration"
            type="range"
            min="0.1"
            max="1.2"
            step="0.1"
            value={duration}
            disabled={descriptor.effectivePath !== 'quickTo'}
            onChange={(event) => setDuration(Number(event.target.value))}
          />

          <div className="pointer-follow-lab__radio-group" role="radiogroup" aria-labelledby="pointer-follow-ease-label">
            <p id="pointer-follow-ease-label">ease (quickTo에만 있습니다)</p>
            {easeOptions.map((option) => (
              <label key={option.value} htmlFor={`pointer-follow-ease-${option.value}`}>
                <input
                  id={`pointer-follow-ease-${option.value}`}
                  type="radio"
                  name="pointer-follow-ease"
                  value={option.value}
                  checked={ease === option.value}
                  disabled={descriptor.effectivePath !== 'quickTo'}
                  onChange={() => setEase(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            className="pointer-follow-lab__pause"
            disabled={descriptor.effectivePath !== 'quickTo'}
            onClick={toggleTweenPaused}
          >
            {tweenPaused ? 'xTo.tween.resume()' : 'xTo.tween.pause()'}
          </button>
        </fieldset>
      </div>

      <dl className="pointer-follow-lab__result">
        <div>
          <dt>실제로 지금 걸린 경로</dt>
          <dd>{descriptor.effectivePath}</dd>
        </div>
        <div>
          <dt>화면에 적용된 x</dt>
          <dd>{observation.appliedX}</dd>
        </div>
        <div>
          <dt>함수를 부른 횟수</dt>
          <dd>{observation.writeCalls}</dd>
        </div>
        <div>
          <dt>등장한 Tween 인스턴스</dt>
          <dd>{observation.tweensSeen}</dd>
        </div>
        <div>
          <dt>Tween 상태</dt>
          <dd>{descriptor.effectivePath === 'quickTo' ? (tweenPaused ? '멈춤' : '진행 가능') : '없음'}</dd>
        </div>
      </dl>

      {reducedMotion ? (
        <p className="pointer-follow-lab__motion-note" role="status">
          운영체제의 모션 감소 설정이 켜져 있어 <strong>따라오는 움직임 없이 즉시 쓰기</strong>로 바꿨습니다. 고른 경로는{' '}
          {descriptor.requestedPath}이지만 실제로는 {descriptor.effectivePath}로 실행됩니다. duration·ease 컨트롤도 이때는 쓰이지
          않습니다.
        </p>
      ) : null}

      <pre className="pointer-follow-lab__code">
        <code>{code}</code>
      </pre>

      <div className="pointer-follow-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>quickSetter</strong>에서는 <em>화면에 적용된 x</em>가 <em>GSAP에 넘긴 숫자</em>와 항상 같습니다. 넣은 값이 곧
            결과입니다. <strong>quickTo</strong>로 바꾸면 슬라이더를 놓은 뒤에도 두 숫자가 잠깐 다릅니다. 점이 아직 목표를 향해 가고
            있기 때문입니다. duration을 키우면 그 차이가 오래 남습니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>함수를 부른 횟수</strong>와 <strong>등장한 Tween 인스턴스</strong>를 나란히 보세요. 슬라이더를 한 번 쭉 끌면
            호출은 수십 번 늘어나지만, Tween은 quickTo에서 <strong>1개에서 멈춰 있고</strong> quickSetter에서는{' '}
            <strong>0개</strong>입니다. 만약 <code>gsap.to()</code>를 그 자리에 두었다면 이 숫자가 호출 횟수와 나란히 올라갔을
            것입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서의 문장은 <strong>"함수에 새 숫자를 넘길 때마다 사실상 애니메이션을 다시 시작해 그 새 값으로 방향을 바꾼다"</strong>
            이고, <strong>"(재사용되는) Tween 인스턴스를 돌려준다"</strong>입니다. 위의 Tween 개수는 그 반환값을 집합에 모아 실제로 센
            결과라서 늘 1입니다. 새로 만드는 대신 <strong>이미 있는 Tween의 목표만 바꾸는 것</strong>이 quickTo의 전부입니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            <strong>quickSetter</strong>는 드래그 중인 요소, 커서에 정확히 붙는 조준점, 스크롤 값에 1:1로 묶인 진행 표시처럼{' '}
            <strong>어긋나면 안 되는</strong> 자리에 씁니다. <strong>quickTo</strong>는 커서를 뒤따르는 장식 원, 시차를 두고 따라오는
            패널, 관성이 필요한 파랄랙스처럼 <strong>부드러움이 목적인</strong> 자리에 씁니다.
          </p>
        </article>
      </div>

      <p className="pointer-follow-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/high-frequency-updates/examples/PointerFollowLab/usePointerFollowAnimation.ts" />
      </p>
    </section>
  )
}
