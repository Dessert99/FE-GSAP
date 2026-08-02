/** 시작값·목표값·playhead 방향을 한 상태에서 파생해 실행과 설명을 맞춘다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './PlaybackOptionsExample.css'
import { type ReverseEase, usePlaybackOptionsAnimation } from './usePlaybackOptionsAnimation'

const reverseEases = ['false', 'true', 'power3.out', 'back.out(1.7)'] as const

function createPlaybackCode(config: ReturnType<typeof usePlaybackOptionsAnimation>['animationConfig'], manuallyReversed: boolean) {
  const easeReverse = typeof config.easeReverse === 'string' ? `'${config.easeReverse}'` : String(config.easeReverse)
  const startAt = config.startAt ? `{ x: ${config.startAt.x}, opacity: ${config.startAt.opacity} }` : 'undefined'
  const followUpCalls = [
    config.reversed ? 'tween.progress(1).resume() // 끝에서 시작점 쪽으로 재생' : '',
    manuallyReversed ? 'tween.reverse() // 현재 위치에서 시작점 쪽으로 전환' : '',
  ].filter(Boolean)

  return `const tween = gsap.to('.box', {
  x: ${config.x},
  duration: ${config.duration},
  delay: ${config.delay.toFixed(1)},
  ease: '${config.ease}',
  easeReverse: ${easeReverse},
  startAt: ${startAt},
  runBackwards: ${config.runBackwards},
  reversed: ${config.reversed}
})${followUpCalls.length > 0 ? `\n\n${followUpCalls.join('\n')}` : ''}`
}

/** 비슷해 보이는 값의 역전과 재생 방향의 역전을 화면 상태와 함께 구분한다. */
export function PlaybackOptionsExample() {
  const { scope, targetClassName, options, updateOption, manuallyReversed, reducedMotion, animationConfig, replay, reverseFromCurrentPosition } = usePlaybackOptionsAnimation()

  const valueDirection = options.runBackwards ? 'to 목표값 → 시작값' : '시작값 → to 목표값'
  const playheadDirection = manuallyReversed || options.reversed ? '끝점 → 시작점' : '시작점 → 끝점'
  const visibleDirection = options.runBackwards === (manuallyReversed || options.reversed)
    ? '화면에서는 오른쪽으로 이동'
    : '화면에서는 왼쪽으로 이동'

  return (
    <div ref={scope} id="playback-options">
      <InteractiveExample
        title="시작값과 재생 방향은 서로 다른 설정입니다"
        description="runBackwards는 어떤 값을 출발점으로 쓸지 바꾸고, reversed는 Tween의 재생 순서를 바꿉니다. 아래 상태 안내와 공의 움직임을 함께 확인합니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/PlaybackOptionsExample/usePlaybackOptionsAnimation.ts"
        reducedMotion={reducedMotion}
        controls={(
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>delay</span><output>{options.delay.toFixed(1)}s</output></span>
              <input type="range" min="0" max="1" step="0.1" value={options.delay} onChange={(event) => updateOption('delay', Number(event.target.value))} />
            </label>
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>easeReverse</span></span>
              <select value={options.easeReverse} onChange={(event) => updateOption('easeReverse', event.target.value as ReverseEase)}>
                {reverseEases.map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <label className="interactive-example__check"><input type="checkbox" checked={options.startAt} onChange={(event) => updateOption('startAt', event.target.checked)} />startAt 적용</label>
            <label className="interactive-example__check"><input type="checkbox" checked={options.runBackwards} onChange={(event) => updateOption('runBackwards', event.target.checked)} />runBackwards</label>
            <label className="interactive-example__check"><input type="checkbox" checked={options.reversed} onChange={(event) => updateOption('reversed', event.target.checked)} />reversed</label>
            <button className="playback-options-example__reverse" type="button" onClick={reverseFromCurrentPosition}>현재 위치에서 reverse()</button>
          </div>
        )}
        preview={(
          <div className="playback-options-example">
            <div className="playback-options-example__lane">
              <span>시작 영역</span>
              <span>to 목표 x: 210</span>
              <div className={targetClassName} />
            </div>
            <dl className="playback-options-example__status">
              <div><dt>시작값</dt><dd>{options.startAt ? 'startAt x: -55' : 'DOM 현재값 x: 0'}</dd></div>
              <div><dt>값의 배치</dt><dd>{valueDirection}</dd></div>
              <div><dt>playhead</dt><dd>{playheadDirection}</dd></div>
              <div><dt>겹친 결과</dt><dd>{visibleDirection}</dd></div>
            </dl>
          </div>
        )}
        code={createPlaybackCode(animationConfig, manuallyReversed)}
        propertyDetails={[
          { name: 'delay', type: 'number', defaultValue: '0초', acceptedValues: '0 이상의 초' },
          { name: 'startAt', type: 'object', defaultValue: '지정 안 함', acceptedValues: '시작 직전 적용할 vars' },
          { name: 'runBackwards', type: 'boolean', defaultValue: 'false', acceptedValues: 'true면 시작값과 목표값의 배치를 교환' },
          { name: 'reversed', type: 'boolean', defaultValue: 'false', acceptedValues: 'true면 playhead를 역방향으로 설정' },
          { name: 'easeReverse', type: 'boolean | string | function', defaultValue: 'false', acceptedValues: 'true 또는 역방향에서 사용할 ease' },
        ]}
        changes={[
          options.startAt ? 'Tween이 출발하기 직전에 공을 x -55, opacity 0.35 상태로 놓습니다.' : '공의 현재 DOM 상태인 x 0에서 출발합니다.',
          options.runBackwards ? 'runBackwards가 to 목표값을 출발값으로 바꿨습니다.' : '값은 시작값에서 to 목표값 순서로 놓입니다.',
          manuallyReversed || options.reversed ? 'playhead가 끝점에서 시작점 쪽으로 흐릅니다.' : 'playhead가 시작점에서 끝점 쪽으로 흐릅니다.',
        ]}
        watchFor={[
          '상태 안내의 값 배치와 playhead 방향이 공의 실제 이동 방향을 어떻게 함께 결정하는지 봅니다.',
          'runBackwards와 reversed를 모두 켜면 두 번 뒤집혀 화면 이동이 다시 정방향처럼 보이는지 확인합니다.',
          'reverse()를 누른 뒤 easeReverse를 바꾸면 방향 전환 직후의 속도감이 어떻게 달라지는지 봅니다.',
        ]}
        explanation={<p><code>runBackwards</code>는 시작값과 목표값의 자리를 바꾸고, <code>reversed</code>와 <code>reverse()</code>는 시간축을 읽는 방향을 바꿉니다. 두 종류의 역전이 겹치면 눈에 보이는 이동 방향은 다시 원래 방향처럼 보일 수 있습니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
