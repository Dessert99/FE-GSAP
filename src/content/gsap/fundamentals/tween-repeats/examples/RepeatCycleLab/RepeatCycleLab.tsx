/** 반복 시간표를 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import { useRepeatCycleAnimation } from './useRepeatCycleAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './RepeatCycleLab.css'

export function RepeatCycleLab() {
  // runtime이 소유한 controls·descriptor·시간표·관찰값을 그대로 받아 화면에만 쓴다
  const {
    scope,
    repeat,
    setRepeat,
    repeatDelay,
    setRepeatDelay,
    yoyo,
    setYoyo,
    totalProgress,
    setTotalProgress,
    descriptor,
    blocks,
    observation,
    reducedMotion,
  } = useRepeatCycleAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `gsap.set('${descriptor.selector}', { x: 0 })

const tween = gsap.to('${descriptor.selector}', {
  x: ${descriptor.distance},
  duration: ${descriptor.duration},
  repeat: ${descriptor.repeat},
  repeatDelay: ${descriptor.repeatDelay},
  yoyo: ${descriptor.yoyo},
  ease: 'none',
  paused: true,
})

// 재생 대신 반복까지 포함한 전체 시간 위에서 헤드를 옮깁니다.
tween.totalProgress(${descriptor.totalProgress})

tween.iteration()     // ${observation.iteration}
tween.duration()      // ${observation.duration}
tween.totalDuration() // ${observation.totalDuration}
tween.time()          // ${observation.time}
tween.totalTime()     // ${observation.totalTime}
tween.progress()      // ${observation.progress}
gsap.getProperty('${descriptor.selector}', 'x') // ${observation.x}`

  return (
    <section
      className={`repeat-cycle-lab${reducedMotion ? ' repeat-cycle-lab--static' : ''}`}
      aria-labelledby="repeat-cycle-lab-title"
    >
      <h3 id="repeat-cycle-lab-title">회차가 넘어가는 순간을 직접 짚어 보기</h3>
      <p className="repeat-cycle-lab__goal">
        아래 slider는 재생 버튼이 아니라 <strong>전체 시간표 위의 위치</strong>입니다. 천천히 옮기면서 회차 번호가 언제 바뀌는지,{' '}
        <code>repeatDelay</code>를 넣었을 때 상자가 언제 멈춰 있는지 확인하세요.
      </p>

      <div className="repeat-cycle-lab__body" ref={scope}>
        <div className="repeat-cycle-lab__stage">
          <div className="repeat-cycle-lab__track">
            <div className="repeat-cycle-lab__box" />
          </div>

          <div className="repeat-cycle-lab__strip">
            <ol className="repeat-cycle-lab__blocks" aria-label="반복 시간표">
              {blocks.map((block) => (
                <li
                  key={block.key}
                  className={`repeat-cycle-lab__block repeat-cycle-lab__block--${block.kind}${
                    block.kind === 'iteration' && block.iteration === observation.iteration
                      ? ' repeat-cycle-lab__block--active'
                      : ''
                  }`}
                  style={{ width: `${block.widthRatio * 100}%` }}
                >
                  {block.kind === 'iteration' ? (
                    <>
                      <strong>{block.iteration}회차</strong>
                      <small>{block.direction === 'backward' ? '역방향' : '정방향'}</small>
                    </>
                  ) : (
                    <small>틈</small>
                  )}
                </li>
              ))}
            </ol>
            <div className="repeat-cycle-lab__playhead" style={{ left: `${totalProgress * 100}%` }} aria-hidden="true" />
          </div>
        </div>

        <fieldset className="repeat-cycle-lab__controls">
          <legend>조절할 값</legend>

          <label htmlFor="repeat-cycle-total-progress">totalProgress</label>
          <output htmlFor="repeat-cycle-total-progress">{totalProgress}</output>
          <input
            id="repeat-cycle-total-progress"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={totalProgress}
            onChange={(event) => setTotalProgress(Number(event.target.value))}
          />

          <label htmlFor="repeat-cycle-repeat">repeat</label>
          <output htmlFor="repeat-cycle-repeat">
            {repeat} · 총 {repeat + 1}회 재생
          </output>
          <input
            id="repeat-cycle-repeat"
            type="range"
            min="0"
            max="3"
            step="1"
            value={repeat}
            onChange={(event) => setRepeat(Number(event.target.value))}
          />

          <label htmlFor="repeat-cycle-repeat-delay">repeatDelay</label>
          <output htmlFor="repeat-cycle-repeat-delay">{repeatDelay}초</output>
          <input
            id="repeat-cycle-repeat-delay"
            type="range"
            min="0"
            max="1"
            step="0.25"
            value={repeatDelay}
            onChange={(event) => setRepeatDelay(Number(event.target.value))}
          />

          <label className="repeat-cycle-lab__checkbox" htmlFor="repeat-cycle-yoyo">
            <input
              id="repeat-cycle-yoyo"
              type="checkbox"
              checked={yoyo}
              onChange={(event) => setYoyo(event.target.checked)}
            />
            yoyo (방향을 번갈아)
          </label>
        </fieldset>
      </div>

      <p className="repeat-cycle-lab__status">
        지금 {observation.iteration}회차이고, 전체 {observation.totalDuration}초 중 {observation.totalTime}초 지점입니다. 상자의 x는{' '}
        {observation.x}입니다.
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 장식 전환을 끕니다. 이 예제는 원래 자동 재생이 없습니다.)' : ''}
      </p>

      <dl className="repeat-cycle-lab__observation">
        <div>
          <dt>iteration()</dt>
          <dd>{observation.iteration}</dd>
        </div>
        <div>
          <dt>duration() · totalDuration()</dt>
          <dd>
            {observation.duration}초 · {observation.totalDuration}초
          </dd>
        </div>
        <div>
          <dt>time() · totalTime()</dt>
          <dd>
            {observation.time}초 · {observation.totalTime}초
          </dd>
        </div>
        <div>
          <dt>progress() · 상자의 x</dt>
          <dd>
            {observation.progress} · {observation.x}
          </dd>
        </div>
      </dl>

      <pre className="repeat-cycle-lab__code">
        <code>{code}</code>
      </pre>

      <div className="repeat-cycle-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>repeat</code>를 올리면 시간표의 칸 수가 늘고 <code>totalDuration()</code>이 커집니다. 하지만{' '}
            <code>duration()</code>은 항상 {descriptor.duration}초 그대로입니다. <strong>한 회차의 길이</strong>와{' '}
            <strong>전체 길이</strong>는 다른 값입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            slider를 움직이며 <code>iteration()</code>이 1부터 올라가는지 확인하세요. <code>repeatDelay</code>를 넣으면 다음 재생 전의
            기다리는 구간이 시간표에 생기고, <code>yoyo</code>를 켜면 반복할 때마다 진행 방향이 번갈아 바뀝니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서의 문장은 <strong>"repeat가 1이면 총 두 번 재생된다(최초 재생 + 1회 반복)"</strong>입니다. repeat는 총 횟수가 아니라{' '}
            <strong>추가 횟수</strong>입니다. 그래서 전체 길이는 회차 {descriptor.repeat + 1}개와 그 사이의 틈{' '}
            {descriptor.repeat}개를 더한 값이 됩니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            로딩 표시처럼 <strong>일정 횟수만 깜빡이는</strong> 신호, 버튼을 눌렀을 때 두어 번 흔들리는 피드백에 씁니다.{' '}
            <code>repeatDelay</code>는 심장박동처럼 <strong>쉬었다 다시</strong> 움직이는 리듬을 만들 때, <code>yoyo</code>는 왕복해서
            제자리로 돌아와야 할 때 씁니다.
          </p>
        </article>
      </div>

      <p className="repeat-cycle-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/tween-repeats/examples/RepeatCycleLab/useRepeatCycleAnimation.ts" />
      </p>
    </section>
  )
}
