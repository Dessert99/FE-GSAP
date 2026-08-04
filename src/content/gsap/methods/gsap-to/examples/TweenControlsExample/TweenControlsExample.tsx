/** 반환된 Tween의 재생 위치와 방향을 제어하는 메서드를 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './TweenControlsExample.css'
import { useTweenControlsAnimation } from './useTweenControlsAnimation'

/** 저장한 Tween 인스턴스의 playhead 제어를 조작 가능한 학습 패널로 보여준다. */
export function TweenControlsExample() {
  // Hook이 만든 Tween 설정과 제어 메서드를 그대로 받아 실행 결과와 코드를 맞춘다.
  const { scope, targetClassName, meter, duration, setDuration, reducedMotion, animationConfig, play, pause, reverse, restart, seekToHalfDuration, showHalfProgress, replay } = useTweenControlsAnimation()

  // 실제 Tween 설정과 호출 가능한 인스턴스 메서드를 GSAP 문법으로 직렬화한다.
  const code = `const tween = gsap.to('.box', {
  x: ${animationConfig.x},
  rotation: ${animationConfig.rotation},
  duration: ${animationConfig.duration.toFixed(1)},
  paused: ${animationConfig.paused},
  id: '${animationConfig.id}',
  data: { lesson: '${animationConfig.data.lesson}' },
  ease: '${animationConfig.ease}',
  onUpdate: syncProgress
})

tween.play()      // 재생
tween.pause()     // 일시정지
tween.seek(${(animationConfig.duration / 2).toFixed(1)}) // 중간 시간 위치로 이동
tween.progress(.5).pause() // 50% 위치에서 일시정지
tween.reverse()   // 현재 위치에서 역재생
tween.restart()   // 0초로 돌아가 재생`

  return (
    <div ref={scope} id="tween-controls">
      <InteractiveExample
        title="반환된 Tween을 나중에 제어하기"
        description="gsap.to()의 반환값을 저장하면 재생 위치와 방향을 버튼으로 바꿀 수 있습니다. 그냥 실행할 때는 변수에 담지 않아도 됩니다."
        sourcePath="src/content/gsap/methods/gsap-to/examples/TweenControlsExample/useTweenControlsAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading"><span>duration</span><output>{duration.toFixed(1)}s</output></span>
              <input type="range" min="1" max="5" step="0.5" value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
            </label>
            <div className="tween-controls-example__buttons">
              <button type="button" onClick={play}>play()</button>
              <button type="button" onClick={pause}>pause()</button>
              <button type="button" onClick={reverse}>reverse()</button>
              <button type="button" onClick={restart}>restart()</button>
              <button type="button" onClick={seekToHalfDuration}>seek({(animationConfig.duration / 2).toFixed(1)})</button>
              <button type="button" onClick={showHalfProgress}>progress(.5)</button>
            </div>
          </div>
        }
        preview={
          <div className="tween-controls-example">
            <div className="tween-controls-example__lane"><div className={targetClassName}>Tween</div></div>
            <p>현재 progress <output ref={meter}>0%</output></p>
          </div>
        }
        code={code}
        propertyDetails={[
          { name: 'paused', type: '공식 gsap.to(): boolean', defaultValue: '공식 gsap.to(): false', acceptedValues: '공식 gsap.to(): true면 생성 직후 0초에서 대기' },
          { name: 'id', type: '공식 페이지에 명시 없음', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '공식 gsap.to(): gsap.getById()로 찾을 식별자' },
          { name: 'data', type: '공식 페이지에 명시 없음', defaultValue: '공식 페이지에 명시 없음', acceptedValues: '공식 gsap.to(): Tween에 붙일 임의의 데이터' },
        ]}
        changes={['paused: true라서 페이지가 열려도 자동 재생되지 않습니다.', '버튼은 새 애니메이션을 만들지 않고 같은 Tween의 playhead를 제어합니다.']}
        watchFor={['seek()는 초 단위, progress()는 0~1 비율을 사용합니다.', 'reverse()를 누른 위치에서 바로 방향이 바뀌는지 확인합니다.']}
        explanation={<p><code>gsap.to()</code>는 Tween 인스턴스를 반환합니다. <code>id</code>와 <code>data</code>도 이 인스턴스에 붙고, 재생 메서드는 인스턴스의 시간축을 움직입니다.</p>}
        onReplay={replay}
      />
    </div>
  )
}
