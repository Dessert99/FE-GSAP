/** start/end marker와 follower를 같은 descriptor로 보이는 MotionPath lab이다. */
import {
  motionPathDescriptor,
  useMotionPathAnimation,
} from './useMotionPathAnimation'
import './MotionPathLab.css'
/** keyboard range와 checkbox로 interval과 orientation을 조절하게 한다. */
export function MotionPathLab() {
  // runtime hook의 config state와 actual target refs를 display에 연결한다
  const {
    scope,
    pathRef,
    followerRef,
    start,
    end,
    autoRotate,
    reducedMotion,
    status,
    setStart,
    setEnd,
    setAutoRotate,
  } = useMotionPathAnimation()
  // descriptor와 controls가 실행한 same motionPath object를 문법으로만 직렬화한다
  const code = `gsap.to(follower, {\n  motionPath: {\n    path: '${motionPathDescriptor.path}',\n    align: '${motionPathDescriptor.path}',\n    alignOrigin: [${motionPathDescriptor.alignOrigin.join(', ')}],\n    autoRotate: ${autoRotate},\n    start: ${start},\n    end: ${end},\n  },\n  duration: ${reducedMotion ? 0 : motionPathDescriptor.duration},\n})`
  return (
    <section
      className="motion-path-lab"
      aria-labelledby="motion-path-lab-title"
    >
      <h2 id="motion-path-lab-title">
        한 curve에서 follower의 interval을 고르기
      </h2>
      <p>
        0·0.5·1 marker는 path progress입니다. range input은 Arrow key로,
        autoRotate는 Space로 조절할 수 있습니다.
      </p>
      <div ref={scope} className="motion-path-lab__stage">
        <svg viewBox="0 0 320 180" aria-label="visible motion path">
          <path
            ref={pathRef}
            id="motion-path-lab-curve"
            d="M30 130 C90 20 210 20 290 130"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle cx="30" cy="130" r="5" />
          <circle cx="160" cy="47" r="5" />
          <circle cx="290" cy="130" r="5" />
        </svg>
        <button
          ref={followerRef}
          type="button"
          className="motion-path-lab__follower"
          aria-describedby="motion-path-lab-status"
        >
          ▲
        </button>
      </div>
      <div className="motion-path-lab__controls">
        <label>
          start {start}
          <input
            type="range"
            min="0"
            max="1"
            step=".25"
            value={start}
            onChange={(event) => setStart(Number(event.target.value))}
          />
        </label>
        <label>
          end {end}
          <input
            type="range"
            min="0"
            max="1"
            step=".25"
            value={end}
            onChange={(event) => setEnd(Number(event.target.value))}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(event) => setAutoRotate(event.target.checked)}
          />{' '}
          autoRotate
        </label>
      </div>
      <p>
        시스템 reduced motion:{' '}
        {reducedMotion
          ? '켜짐 · selected end에 즉시 배치'
          : '꺼짐 · 1.2초 tween'}
      </p>
      <p id="motion-path-lab-status" role="status">
        {status}
      </p>
      <pre>
        <code>{code}</code>
      </pre>
      <div className="motion-path-lab__panels">
        <article>
          <h3>무엇이 달라졌나요?</h3>
          <p>
            start/end가 0–1 interval을 자르고 autoRotate가 tangent 방향을
            더합니다.
          </p>
        </article>
        <article>
          <h3>무엇을 봐야 하나요?</h3>
          <p>
            follower와 SVG path는 stable ref이며 marker가 선택한 progress를
            해석하게 돕습니다.
          </p>
        </article>
        <article>
          <h3>왜 align인가요?</h3>
          <p>
            visible path의 좌표 공간을 follower transform에 맞춰 첫 위치 jump를
            줄입니다.
          </p>
        </article>
      </div>
    </section>
  )
}
