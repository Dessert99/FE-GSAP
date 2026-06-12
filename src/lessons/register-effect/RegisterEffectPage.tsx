import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { EffectsCallExample } from './examples/EffectsCallExample'
import effectsCallSource from './examples/EffectsCallExample.tsx?raw'
import { TimelineEffectExample } from './examples/TimelineEffectExample'
import timelineEffectSource from './examples/TimelineEffectExample.tsx?raw'

export function RegisterEffectPage() {
  return (
    <LessonLayout
      title="gsap.registerEffect()"
      description="gsap.registerEffect()는 자주 쓰는 트윈 조합을 이름 있는 effect로 등록한다. 앱 시작 시 한 번 등록하고 여러 컴포넌트나 timeline에서 재사용하는 패턴이다."
    >
      <ExamplePanel
        title="gsap.effects로 호출"
        description="등록한 effect는 gsap.effects.name(targets, config) 형태로 호출한다. defaults와 호출 시 config가 합쳐져 반복 애니메이션 설정을 줄인다."
        code={effectsCallSource}
      >
        <EffectsCallExample />
      </ExamplePanel>
      <ExamplePanel
        title="timeline 확장"
        description="extendTimeline을 켜면 timeline 메서드처럼 effect를 호출할 수 있다. 반복되는 진입 애니메이션을 시퀀스 안에 자연스럽게 끼워 넣을 때 쓴다."
        code={timelineEffectSource}
      >
        <TimelineEffectExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
