/** defaults 상속을 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { DefaultsEase } from './useDefaultsInheritanceAnimation'
import { useDefaultsInheritanceAnimation } from './useDefaultsInheritanceAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './DefaultsInheritanceExample.css'

// select에 노출할 ease 후보와 읽기 쉬운 이름이다.
const easeOptions: { value: DefaultsEase; label: string }[] = [
  { value: 'power1.out', label: 'power1.out (GSAP 기본)' },
  { value: 'power2.in', label: 'power2.in (공식 예제)' },
  { value: 'back.out(1.7)', label: 'back.out(1.7)' },
  { value: 'none', label: 'none (등속)' },
]

export function DefaultsInheritanceExample() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다.
  const { scope, duration, setDuration, ease, setEase, inherit, setInherit, descriptor, observation, status, reducedMotion, run } =
    useDefaultsInheritanceAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다.
  const varsLines = Object.entries(descriptor.tweenVars)
    .map(([key, value]) => `  ${key}: ${typeof value === 'string' ? `'${value}'` : value},`)
    .join('\n')

  // runtime과 같은 네 단계를 보여주되 descriptor의 값만 코드 문법으로 직렬화한다.
  const code = `// 1. 되돌릴 수 있도록 현재 defaults를 복사해 둡니다.
const snapshot = { ...gsap.defaults() }

let tween
try {
  // 2. 전역 기본값을 바꿉니다.
  gsap.defaults({
    duration: ${descriptor.defaultsPatch.duration},
    ease: '${descriptor.defaultsPatch.ease}',
  })

  // 3. duration도 ease도 넘기지 않았습니다.
  tween = gsap.to('${descriptor.selector}', {
${varsLines
  .split('\n')
  .map((line) => `  ${line}`)
  .join('\n')}
  })
} finally {
  // 4. 상속은 이미 끝났으므로 바로 되돌립니다.
  //    예외가 나도 전역이 바뀐 채 남지 않도록 finally에 둡니다.
  gsap.defaults(snapshot)
}

tween.duration() // ${observation.appliedDuration}`

  return (
    <section className="defaults-inheritance-example" aria-labelledby="defaults-inheritance-example-title">
      <h3 id="defaults-inheritance-example-title">defaults를 바꾸고 Tween을 만들어 보기</h3>
      <p className="defaults-inheritance-example__goal">
        아래 Tween은 <code>duration</code>과 <code>ease</code>를 직접 받지 않습니다. 두 값이 어디서 오는지 확인해 보세요.
      </p>

      <div className="defaults-inheritance-example__body" ref={scope}>
        <div className="defaults-inheritance-example__stage">
          <div className={descriptor.selector.slice(1)} />
        </div>

        <fieldset className="defaults-inheritance-example__controls">
          <legend>defaults로 지정할 값</legend>

          <label htmlFor="defaults-duration">duration</label>
          <output htmlFor="defaults-duration">{duration}초</output>
          <input
            id="defaults-duration"
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={duration}
            onChange={(event) => setDuration(Number(event.target.value))}
          />

          <label htmlFor="defaults-ease">ease</label>
          <select id="defaults-ease" value={ease} onChange={(event) => setEase(event.target.value as DefaultsEase)}>
            {easeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="defaults-inheritance-example__checkbox" htmlFor="defaults-inherit">
            <input
              id="defaults-inherit"
              type="checkbox"
              checked={inherit}
              onChange={(event) => setInherit(event.target.checked)}
            />
            defaults를 상속한다 (<code>inherit</code>)
          </label>

          <button type="button" onClick={run}>
            실행
          </button>
        </fieldset>
      </div>

      <p className="defaults-inheritance-example__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <dl className="defaults-inheritance-example__observation">
        <div>
          <dt id="obs-snapshot-keys">바꾸기 전 defaults key</dt>
          <dd>
            <output aria-labelledby="obs-snapshot-keys">{observation.snapshotKeys.join(', ') || '읽는 중'}</output>
          </dd>
        </div>
        <div>
          <dt id="obs-snapshot-duration">바꾸기 전 duration</dt>
          <dd>
            <output aria-labelledby="obs-snapshot-duration">{observation.snapshotDuration}초</output>
          </dd>
        </div>
        <div>
          <dt id="obs-applied-duration">Tween이 실제로 가진 duration</dt>
          <dd>
            <output aria-labelledby="obs-applied-duration" htmlFor="defaults-duration defaults-inherit">
              {observation.appliedDuration}초
            </output>
          </dd>
        </div>
        <div>
          <dt id="obs-applied-ease">Tween이 실제로 물려받은 ease</dt>
          <dd>
            <output aria-labelledby="obs-applied-ease" htmlFor="defaults-ease defaults-inherit">
              {observation.appliedEase}
            </output>
          </dd>
        </div>
        <div>
          <dt id="obs-restored">복원 후 전역 duration·ease</dt>
          <dd>
            <output aria-labelledby="obs-restored">
              {observation.restoredDuration}초 {observation.restored ? '· 복원됨' : '· 복원되지 않음'}
            </output>
          </dd>
        </div>
      </dl>

      <pre className="defaults-inheritance-example__code">
        <code>{code}</code>
      </pre>

      <div className="defaults-inheritance-example__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            slider와 select를 바꾸면 Tween에 아무것도 넘기지 않았는데도 이동 시간과 속도 곡선이 달라집니다. 값이 <code>gsap.to()</code>가
            아니라 <code>gsap.defaults()</code>에서 왔기 때문입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>상속을 끈 경우</strong> duration이 <code>0</code>이 됩니다. <code>inherit: false</code>는 내가 지정한 default만
            끊는 게 아니라 GSAP이 원래 갖고 있던 기본 duration까지 끊기 때문입니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            상속은 <strong>Tween을 만드는 순간</strong>에 확정됩니다. 그래서 코드 4단계처럼 만든 직후 전역을 되돌려도 이미 만들어진
            Tween은 값을 유지합니다. 관찰 패널의 마지막 줄이 전역이 원래대로 돌아왔음을 보여줍니다. 이 시점 규칙은 공식 문서가 아니라
            GSAP 3.15.0 구현과 실행으로 확인한 내용입니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            프로젝트 전체의 기본 속도감을 한 줄로 맞출 때 씁니다. 다만 전역이므로 라이브러리 코드나 다른 화면의 Tween에도 영향을 줍니다.
            바꾼다면 앱 시작 지점에서 한 번만 바꾸는 편이 안전합니다.
          </p>
        </article>
      </div>

      <p className="defaults-inheritance-example__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/tween-configuration/examples/DefaultsInheritanceExample/useDefaultsInheritanceAnimation.ts" />
      </p>
    </section>
  )
}
