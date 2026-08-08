/** label select와 앞뒤 탐색 결과를 실제 Timeline getter·target 값·호출 코드로 함께 보여 준다. */
import { labelMarkers, useLabelNavigatorRuntime } from './useLabelNavigatorRuntime'
import './LabelNavigatorLab.css'

export function LabelNavigatorLab() {
  // runtime이 소유한 controls·getter·callback·action을 화면의 단일 관찰 패널에 연결한다
  const { scope, selectedLabel, setSelectedLabel, suppressEvents, setSuppressEvents, callbackCount, readout, action, reducedMotion, seekSelected, seekNext, seekPrevious, reset, timelineDuration, callbackTime } = useLabelNavigatorRuntime()

  return (
    <section className="label-lab" aria-labelledby="label-lab-title" ref={scope} data-reduced-motion={reducedMotion}>
      <header><p>실행 예제</p><h3 id="label-lab-title">숫자 없이 label 사이를 이동하기</h3><span>버튼은 paused Timeline을 재생하지 않고 실제 getter가 돌려준 label로 seek합니다.</span></header>

      <div className="label-lab__controls">
        <label><span>이동할 label</span><select value={selectedLabel} onChange={(event) => setSelectedLabel(event.target.value)}>{labelMarkers.map((marker) => <option key={marker.name} value={marker.name}>{marker.name} · {marker.time}s</option>)}</select></label>
        <label className="label-lab__check"><input type="checkbox" checked={suppressEvents} onChange={(event) => setSuppressEvents(event.target.checked)} /><span><code>suppressEvents</code> 사용</span></label>
        <button type="button" onClick={seekSelected}>선택 label로 seek</button>
        <button type="button" onClick={seekPrevious}>이전 label</button>
        <button type="button" onClick={seekNext}>다음 label</button>
        <button type="button" onClick={reset}>초기화</button>
      </div>

      <p className="label-lab__status" role="status">{action.message} · 중간 callback {callbackCount}회</p>

      <div className="label-lab__ruler" aria-label={`현재 playhead ${readout.time}초`}>
        {labelMarkers.map((marker) => <div className="label-lab__marker" key={marker.name} style={{ left: `${(marker.time / timelineDuration) * 100}%` }}><strong>{marker.name}</strong><small>{marker.time}s</small></div>)}
        <div className="label-lab__callback" style={{ left: `${(callbackTime / timelineDuration) * 100}%` }}><span>callback</span><small>{callbackTime}s</small></div>
        <div className="label-lab__playhead" style={{ left: `${(readout.time / timelineDuration) * 100}%` }} />
      </div>

      <div className="label-lab__readouts">
        <div><span>time()</span><strong>{readout.time}s</strong></div>
        <div><span>currentLabel()</span><strong>{readout.current ?? 'undefined'}</strong></div>
        <div><span>previousLabel()</span><strong>{readout.previous ?? 'undefined'}</strong></div>
        <div><span>nextLabel()</span><strong>{readout.next ?? 'undefined'}</strong></div>
        <div><span>실제 target.value</span><strong>{readout.value}</strong></div>
      </div>

      <pre className="label-lab__code"><code>{action.code}</code></pre>
      <div className="label-lab__explanations">
        <article><h4>무엇이 달라졌나요?</h4><p>seek할 때 playhead와 target 값은 즉시 바뀌지만 paused·reversed 상태는 건드리지 않습니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p>정확히 label 위에서는 previous·next가 현재 label을 건너뛰며, 끝에서는 undefined가 됩니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>label getter는 추가 순서가 아니라 Timeline local time의 앞뒤를 찾기 때문입니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>챕터·장면·상태 이름으로 preview를 이동하고 중간 callback 실행 여부를 선택할 때 씁니다.</p></article>
      </div>
      <p className="label-lab__source">실행 코드 위치 · <code>examples/LabelNavigatorLab/useLabelNavigatorRuntime.ts</code></p>
    </section>
  )
}
