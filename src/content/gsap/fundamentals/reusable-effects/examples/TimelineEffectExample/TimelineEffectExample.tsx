/** Timeline extension의 position·callback context·parent chaining을 같은 runtime에서 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './TimelineEffectExample.css'
import { timelineEffectRegistration, useTimelineEffectAnimation } from './useTimelineEffectAnimation'

export function TimelineEffectExample() {
  // controls·extended method·관찰값·serializer가 공유하는 runtime 상태다.
  const { scope, targetClassName, position, setPosition, descriptor, observation, status, reducedMotion, run } = useTimelineEffectAnimation()
  // 실제 position의 number와 relative string 문법을 구분해 직렬화한다.
  const positionCode = typeof descriptor.position === 'number' ? String(descriptor.position) : `'${descriptor.position}'`
  // registration descriptor와 실제 parent sequence를 코드 문법으로만 표시한다.
  const code = `gsap.registerEffect({
  name: '${timelineEffectRegistration.name}',
  effect: (targets, config, timeline) =>
    gsap.fromTo(
      targets,
      { autoAlpha: 0, x: -48 },
      {
        autoAlpha: 1,
        x: 0,
        duration: config.duration,
        ease: config.ease,
        immediateRender: false
      }
    ),
  plugins: '${timelineEffectRegistration.plugins}',
  defaults: {
    duration: ${timelineEffectRegistration.defaults.duration},
    ease: '${timelineEffectRegistration.defaults.ease}'
  },
  extendTimeline: ${timelineEffectRegistration.extendTimeline}
})

const parent = gsap.timeline({ paused: true })

parent.set('.card', { autoAlpha: 0, x: -48, scale: 1 }, 0)

parent.${timelineEffectRegistration.name}(
  '.card',
  {
    duration: ${descriptor.effectConfig.duration},
    ease: '${descriptor.effectConfig.ease}'
  },
  ${positionCode}
).to('.card', {
  scale: ${descriptor.followUp.scale},
  duration: ${descriptor.followUp.duration},
  repeat: ${descriptor.followUp.repeat},
  yoyo: ${descriptor.followUp.yoyo}
})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="effect를 parent sequence에 삽입하기"
        description="position을 바꿔 effect child가 parent 시작점 또는 현재 끝에서 0.25초 뒤에 들어가는지 확인합니다. select를 바꿔도 Timeline은 자동 재생되지 않습니다."
        sourcePath="src/content/gsap/fundamentals/reusable-effects/examples/TimelineEffectExample/useTimelineEffectAnimation.ts"
        controls={<div className="interactive-example__control-list"><label className="interactive-example__control"><span className="interactive-example__control-heading"><span>effect position</span><output>{position}</output></span><select value={String(position)} onChange={(event) => setPosition(event.target.value === '0' ? 0 : '+=0.25')}><option value="0">0 · parent 시작</option><option value="+=0.25">+=0.25 · 현재 끝 뒤</option></select></label></div>}
        preview={<div className="timeline-effect-example"><div className="timeline-effect-example__track"><span>0</span><span className={position === 0 ? 'timeline-effect-example__marker' : ''}>effect · 0</span><span className={position === '+=0.25' ? 'timeline-effect-example__marker' : ''}>effect · +=0.25</span><span>follow-up</span></div><div className={targetClassName}><span>CARD</span><strong>parent Timeline child</strong></div><dl><div><dt>third Timeline</dt><dd>{observation.receivedTimeline ? 'parent 전달됨' : '준비 중'}</dd></div><div><dt>method 반환</dt><dd>{observation.returnedParent ? 'parent Timeline' : '준비 중'}</dd></div><div><dt>normalized targets</dt><dd>{observation.targetCount}개</dd></div></dl><p role="status">{status}</p></div>}
        code={code}
        propertyDetails={[
          { name: 'extendTimeline', type: 'boolean', defaultValue: 'false', acceptedValues: 'true면 name과 같은 prototype method 추가' },
          { name: 'position', type: 'number | string', defaultValue: 'parent 끝', acceptedValues: '0 · +=0.25 · 일반 GSAP position' },
          { name: 'effect return', type: 'Tween | Timeline', defaultValue: '필수', acceptedValues: 'parent.add()에 삽입할 animation' },
          { name: 'extension return', type: 'Timeline', defaultValue: '호출한 parent', acceptedValues: '후속 Tween chaining' },
        ]}
        changes={[`effect 반환 Tween은 parent의 ${position} position에 삽입됩니다.`, `확장 method는 parent를 반환하므로 후속 scale Tween까지 총 ${observation.parentDuration.toFixed(2)}초 sequence로 chaining됩니다.`]}
        watchFor={['+=0.25를 고르면 실행 직후 0.25초의 빈 구간이 생기는지 봅니다.', '관찰 패널에서 callback의 third Timeline과 method 반환값이 모두 parent를 가리키는지 확인합니다.']}
        explanation={<p><code>extendTimeline: true</code>는 wrapper method를 Timeline prototype에 추가합니다. wrapper는 callback에 parent를 세 번째 인자로 전달하고, callback이 반환한 Tween을 <code>parent.add(animation, position)</code>으로 넣은 뒤 parent 자체를 반환합니다.</p>}
        onReplay={run}
        reducedMotion={reducedMotion}
      />
    </div>
  )
}
