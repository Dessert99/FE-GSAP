/** seek의 suppressEvents가 callback만 바꾸고 paused 상태는 보존함을 비교한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './SeekEventsExample.css'
import { useSeekEventsAnimation } from './useSeekEventsAnimation'

export function SeekEventsExample() {
  // 훅이 제공한 descriptor·control·관찰 action을 표시 계층에서 받는다.
  const { scope, targetClassName, descriptor, suppressEvents, setSuppressEvents, callbackCount, status, jumpToEnd, reset } = useSeekEventsAnimation()
  // 실제 seek action과 같은 boolean·duration을 직렬화한 학습 코드다.
  const code = `const tween = gsap.to('.${targetClassName}', {
  x: ${descriptor.x}, duration: ${descriptor.duration}, paused: true,
  onComplete: () => setCallbackCount((count) => count + 1)
})

tween.seek(0, true).pause()
setCallbackCount(0)
tween.seek(${descriptor.duration}, ${suppressEvents})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="seek 위치 이동과 callback 실행"
        description="항상 0초에서 같은 끝 위치로 이동하면서 suppressEvents가 callback 실행만 바꾸는지 확인합니다."
        sourcePath="src/content/gsap/fundamentals/tween-playhead/examples/SeekEventsExample/useSeekEventsAnimation.ts"
        controls={<div className="interactive-example__control-list"><label className="seek-events-example__checkbox"><input type="checkbox" checked={suppressEvents} onChange={(event) => setSuppressEvents(event.target.checked)} /><span>suppressEvents</span></label><button type="button" onClick={jumpToEnd}>끝으로 seek</button></div>}
        preview={<div className="seek-events-example"><div className="seek-events-example__track"><div className={targetClassName}>Tween</div></div><p role="status">{status}</p><p>onComplete 호출 · <strong>{callbackCount}</strong>회</p></div>}
        code={code}
        propertyDetails={[
          { name: 'time', type: 'number', defaultValue: '필수', acceptedValues: 'Tween의 local seconds' },
          { name: 'suppressEvents', type: 'boolean', defaultValue: 'true', acceptedValues: 'true면 이동 구간 event/callback 억제' },
        ]}
        changes={[`seek(0, true)로 먼저 초기화한 뒤 seek(${descriptor.duration}, ${suppressEvents})로 이동합니다.`, `paused 상태는 그대로이고 onComplete 호출은 ${callbackCount}회입니다.`]}
        watchFor={['suppressEvents를 끄면 끝으로 통과할 때 onComplete가 호출되는지 확인합니다.', '어느 선택에서도 status의 paused가 true로 남는지 확인합니다.']}
        explanation={<p><code>seek()</code>의 두 번째 인자는 이동 구간의 event와 callback을 실행할지만 정합니다. Tween을 play하거나 방향을 뒤집는 option이 아니며 self를 반환해 chaining할 수 있습니다.</p>}
        onReplay={reset}
        replayLabel="처음으로 초기화"
      />
    </div>
  )
}
