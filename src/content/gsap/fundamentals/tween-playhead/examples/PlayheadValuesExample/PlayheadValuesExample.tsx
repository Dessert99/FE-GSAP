/** 한 반복 Tween의 progress·ratio·time·total 값을 같은 순간에 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './PlayheadValuesExample.css'
import { usePlayheadValuesAnimation } from './usePlayheadValuesAnimation'

export function PlayheadValuesExample() {
  // runtime이 소유한 descriptor·control·관찰값을 표시 계층에서 받는다.
  const { scope, targetClassName, descriptor, selectedTotalProgress, setSelectedTotalProgress, snapshot, reset } = usePlayheadValuesAnimation()
  // 실제 Tween descriptor와 선택한 progress를 그대로 직렬화한 학습 코드다.
  const code = `const tween = gsap.to('.box', {
  x: ${descriptor.x}, duration: ${descriptor.duration}, repeat: ${descriptor.repeat},
  ease: '${descriptor.ease}', paused: true
})

tween.totalProgress(${selectedTotalProgress.toFixed(2)})`
  // 다섯 관찰값을 같은 precision으로 보여주는 table data다.
  const valueRows = [
    ['progress()', snapshot.progress],
    ['ratio', snapshot.ratio],
    ['time()', snapshot.time],
    ['totalProgress()', snapshot.totalProgress],
    ['totalTime()', snapshot.totalTime],
  ] as const

  return (
    <div ref={scope}>
      <InteractiveExample
        title="같은 순간의 local·total·eased 값"
        description="전체 progress를 직접 움직여 cycle 경계에서 local 값만 되돌아가는지 확인합니다."
        sourcePath="src/content/gsap/fundamentals/tween-playhead/examples/PlayheadValuesExample/usePlayheadValuesAnimation.ts"
        controls={<label className="interactive-example__control"><span className="interactive-example__control-heading"><span>totalProgress</span><output>{selectedTotalProgress.toFixed(2)}</output></span><input type="range" min="0" max="1" step="0.01" value={selectedTotalProgress} onChange={(event) => setSelectedTotalProgress(Number(event.target.value))} /></label>}
        preview={<div className="playhead-values-example"><div className="playhead-values-example__track"><div className={targetClassName}>Tween</div></div><table><caption>현재 playhead 값</caption><tbody>{valueRows.map(([name, value]) => <tr key={name}><th scope="row"><code>{name}</code></th><td><output>{value.toFixed(3)}</output></td></tr>)}</tbody></table></div>}
        code={code}
        propertyDetails={[
          { name: 'progress()', type: 'number | self', defaultValue: 'getter', acceptedValues: 'current cycle 0–1, repeatDelay 제외' },
          { name: 'ratio', type: 'number', defaultValue: 'read-only', acceptedValues: 'ease(progress), overshoot 가능' },
          { name: 'totalProgress()', type: 'number | self', defaultValue: 'getter', acceptedValues: '전체 repeats 0–1' },
        ]}
        changes={[`전체 위치 ${snapshot.totalProgress.toFixed(2)}에서 local progress는 ${snapshot.progress.toFixed(2)}입니다.`, `raw progress ${snapshot.progress.toFixed(2)}에 ${descriptor.ease}를 적용한 ratio는 ${snapshot.ratio.toFixed(3)}입니다.`]}
        watchFor={['totalProgress 0.5 근처에서 첫 cycle이 끝나 progress가 1이 되는지 봅니다.', '다음 cycle로 넘어가면 progress와 time은 다시 0부터 시작하지만 total 값은 계속 증가합니다.']}
        explanation={<p><code>progress()</code>와 <code>time()</code>은 이번 cycle, <code>totalProgress()</code>와 <code>totalTime()</code>은 전체 반복을 읽습니다. <code>ratio</code>만 ease까지 적용된 property 비율입니다.</p>}
        onReplay={reset}
        replayLabel="처음으로 초기화"
      />
    </div>
  )
}
