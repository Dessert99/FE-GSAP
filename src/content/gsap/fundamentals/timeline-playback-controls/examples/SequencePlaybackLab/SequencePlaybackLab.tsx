/** 세 child sequence를 container 명령 하나로 제어하고 단일 snapshot으로 관찰한다. */
import type { PlaybackCommand } from './useSequencePlaybackAnimation'
import { useSequencePlaybackAnimation } from './useSequencePlaybackAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './SequencePlaybackLab.css'

// 명령 버튼이 무엇을 바꾸는지 실행 전에 보여 주는 속성 계약이다
const propertyDetails = [
  { method: 'pause / play / reverse', value: 'position?: number | label, suppressEvents = true', use: '현재 위치 또는 chapter 이름에서 멈추고 재생합니다.' },
  { method: 'resume', value: '인자 없음', use: '역방향까지 포함한 현재 방향을 보존합니다.' },
  { method: 'restart', value: 'includeDelay = false, suppressEvents = true', use: 'sequence를 처음부터 정방향으로 다시 봅니다.' },
]

// learner가 버튼 비교에서 확인할 변화만 짧게 고정한다
const changes = ['play는 정방향, resume은 기존 방향을 유지합니다.', 'label 인자는 부모 playhead를 chapter 시작으로 옮깁니다.', '부모를 되감으면 C → B → A 순으로 child 값이 줄어듭니다.']
// 매 프레임 값보다 우선해서 볼 관찰 지점을 정한다
const watchFor = ['paused()와 reversed() 두 스위치', '현재 child가 A·B·C 중 어디인지', '세 child x 값이 한 번에 하나씩 바뀌는 순서']

/** command 객체를 실행과 무관한 의미 추가 없이 호출 문법으로만 직렬화한다. */
function serializeCommand(command: PlaybackCommand | null) {
  if (!command) return '// 아직 명령을 실행하지 않았습니다.'
  if (command.method === 'resume' || command.method === 'restart') return `tl.${command.method}()`
  if (command.method === 'reversed') return `tl.reversed(${command.value})`
  // 나머지 command만 position을 가질 수 있으므로 property 존재 여부로 overload를 가른다
  if (!('position' in command)) return `tl.${command.method}()`
  if (command.position === undefined) return `tl.${command.method}()`
  return `tl.${command.method}(${typeof command.position === 'string' ? `'${command.position}'` : command.position})`
}

export function SequencePlaybackLab() {
  // runtime이 만든 descriptor·snapshot·command를 화면에서 그대로 소비한다
  const { scope, descriptor, snapshot, lastCommand, reducedMotion, run } = useSequencePlaybackAnimation()
  // 실제 마지막 command descriptor만 코드 문법으로 포맷한다
  const lastCall = serializeCommand(lastCommand)
  // 실행 descriptor와 실제 getter snapshot을 한 코드 블록으로 직렬화한다
  const code = `import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

function SequencePlaybackExample() {
const scope = useRef(null)
const timelineRef = useRef(null)
const selectors = ['${descriptor.selectors[0]}', '${descriptor.selectors[1]}', '${descriptor.selectors[2]}']
const [, setSnapshot] = useState({})

function round(value) {
  return Math.round(value * 100) / 100
}

function getActiveChild(time, duration) {
  if (time <= 0) return '대기'
  if (time >= duration) return '완료'
  if (time < ${descriptor.childDuration}) return 'A'
  if (time < ${descriptor.childDuration * 2}) return 'B'
  return 'C'
}

function report() {
  const tl = timelineRef.current
  if (!tl) return
  const childX = selectors.map((selector) => {
    const target = scope.current?.querySelector(selector)
    return target ? Math.round(Number(gsap.getProperty(target, 'x'))) : 0
  })
  setSnapshot({
    time: round(tl.time()),
    progress: round(tl.progress()),
    paused: tl.paused(),
    reversed: tl.reversed(),
    active: tl.isActive(),
    activeChild: getActiveChild(tl.time(), tl.duration()),
    childX,
  })
}

useGSAP(() => {
  const root = scope.current
  const targets = root ? selectors.map((selector) => root.querySelector(selector)) : []
  if (targets.length !== selectors.length || targets.some((target) => !target)) return
  gsap.set(targets, { x: 0 })
  const tl = gsap.timeline({
    paused: true,
    defaults: { duration: ${descriptor.childDuration}, ease: 'none' },
    onUpdate: report,
    onComplete: report,
    onReverseComplete: report,
  })

  tl.addLabel('${descriptor.labels.intro}', 0)
    .to(targets[0], { x: ${descriptor.distance} })
    .addLabel('${descriptor.labels.middle}')
    .to(targets[1], { x: ${descriptor.distance} })
    .addLabel('${descriptor.labels.finish}')
    .to(targets[2], { x: ${descriptor.distance} })
  timelineRef.current = tl
  report()
  return () => {
    tl.kill()
    timelineRef.current = null
  }
}, { scope })

function run() {
  const tl = timelineRef.current
  if (!tl) return
  ${lastCall}
  report()
}

return <div ref={scope}>
  <span className="${descriptor.selectors[0].slice(1)}">A</span>
  <span className="${descriptor.selectors[1].slice(1)}">B</span>
  <span className="${descriptor.selectors[2].slice(1)}">C</span>
  <button onClick={run}>명령 실행</button>
</div>
}
// paused ${snapshot.paused} · reversed ${snapshot.reversed} · active ${snapshot.active}`

  return (
    <section className={`sequence-playback-lab${reducedMotion ? ' sequence-playback-lab--reduced' : ''}`} aria-labelledby="sequence-playback-lab-title">
      <h3 id="sequence-playback-lab-title">A → B → C sequence를 부모 버튼만으로 제어하기</h3>
      <p className="sequence-playback-lab__goal">먼저 <code>play()</code>로 진행하고 중간에 멈춰 보세요. 그다음 <code>reverse(0)</code>으로 끝에서 되감거나 label 버튼으로 chapter를 건너뜁니다. child를 직접 조작하는 버튼은 없습니다.</p>

      <div className="sequence-playback-lab__body" ref={scope}>
        <div className="sequence-playback-lab__stage" aria-label="A, B, C child의 순차 진행 상태">
          {(['A', 'B', 'C'] as const).map((label, index) => (
            <div className={`sequence-playback-lab__lane${snapshot.activeChild === label ? ' sequence-playback-lab__lane--active' : ''}`} key={label}>
              <strong>{label}</strong>
              <div className="sequence-playback-lab__track"><span className={`sequence-playback-lab__box sequence-playback-lab__box--${label.toLowerCase()}`}>{label}</span></div>
              <span>{snapshot.childX[index]}px</span>
            </div>
          ))}
          {reducedMotion && <p className="sequence-playback-lab__static">모션 감소 설정에서는 transform을 숨기고 위 숫자와 현재 child만 갱신합니다.</p>}
        </div>

        <div className="sequence-playback-lab__controls">
          <fieldset>
            <legend>현재 위치에서</legend>
            <button type="button" onClick={() => run({ method: 'play' })}>play()</button>
            <button type="button" onClick={() => run({ method: 'pause' })}>pause()</button>
            <button type="button" onClick={() => run({ method: 'resume' })}>resume()</button>
            <button type="button" onClick={() => run({ method: 'restart' })}>restart()</button>
            <button type="button" onClick={() => run({ method: 'reverse', position: 0 })}>reverse(0)</button>
            <button type="button" onClick={() => run({ method: 'reversed', value: !snapshot.reversed })}>reversed(!reversed())</button>
          </fieldset>
          <fieldset>
            <legend>label에서</legend>
            <button type="button" onClick={() => run({ method: 'play', position: descriptor.labels.middle })}>play('middle')</button>
            <button type="button" onClick={() => run({ method: 'pause', position: descriptor.labels.finish })}>pause('finish')</button>
            <button type="button" onClick={() => run({ method: 'reverse', position: descriptor.labels.finish })}>reverse('finish')</button>
          </fieldset>
        </div>
      </div>

      {/* 연속 time은 live region 밖에 두고 버튼과 두 스위치만 이산 상태로 알린다 */}
      <p className="sequence-playback-lab__status" role="status">{lastCall} 실행 · paused {String(snapshot.paused)} · reversed {String(snapshot.reversed)}</p>

      <dl className="sequence-playback-lab__snapshot">
        <div><dt>time / progress</dt><dd>{snapshot.time}초 / {snapshot.progress}</dd></div>
        <div><dt>paused()</dt><dd>{String(snapshot.paused)}</dd></div>
        <div><dt>reversed()</dt><dd>{String(snapshot.reversed)}</dd></div>
        <div><dt>isActive()</dt><dd>{String(snapshot.active)}</dd></div>
        <div><dt>현재 child</dt><dd>{snapshot.activeChild}</dd></div>
      </dl>

      <div className="sequence-playback-lab__details">
        {propertyDetails.map((detail) => <article key={detail.method}><h4><code>{detail.method}</code></h4><p>{detail.value}</p><p>{detail.use}</p></article>)}
      </div>

      <pre className="sequence-playback-lab__code"><code>{code}</code></pre>

      <div className="sequence-playback-lab__panels">
        <article><h4>무엇이 달라졌나요?</h4><ul>{changes.map((change) => <li key={change}>{change}</li>)}</ul></article>
        <article><h4>무엇을 봐야 하나요?</h4><ul>{watchFor.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>버튼은 child가 아니라 부모 Timeline의 playhead와 상태 스위치를 바꿉니다. children은 이미 부모 시간축에 놓여 있어 같은 상대 순서로 따라옵니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>온보딩 chapter, 제품 tour, 여러 장면이 이어지는 hero처럼 순서를 보존한 채 전체를 멈춤·재개·되감아야 할 때 container 하나만 제어합니다.</p></article>
      </div>

      <p className="sequence-playback-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-playback-controls/examples/SequencePlaybackLab/useSequencePlaybackAnimation.ts" /></p>
    </section>
  )
}
