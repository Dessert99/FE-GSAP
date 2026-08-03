/** gsap.effects와 registerEffect의 21개 공식 item을 로컬 section evidence에 연결한다. */
export const reusableEffectsCatalog = [
  { id: 'RE-EFFECTS-TYPE', item: 'gsap.effects는 등록된 effect를 보관하는 object다.', evidence: '#direct-call' },
  { id: 'RE-EFFECTS-NAMED-ACCESS', item: '등록 name으로 gsap.effects[name](targets, config?)를 호출한다.', evidence: '#direct-call' },
  { id: 'RE-EFFECTS-DIRECT-RETURN', item: 'direct 호출은 effect callback의 반환값을 그대로 돌려준다.', evidence: '#registered-example' },
  { id: 'RE-REGISTER-SHAPE', item: '등록 config는 name, effect, plugins, defaults, extendTimeline이며 반환은 void다.', evidence: '#register-contract' },
  { id: 'RE-REGISTER-NAME', item: 'name은 registry key이자 확장한 Timeline method 이름이다.', evidence: '#register-contract' },
  { id: 'RE-REGISTER-EFFECT', item: 'callback은 정규화 targets, defaults 적용 config, 호출 Timeline을 받는다.', evidence: '#register-contract' },
  { id: 'RE-REGISTER-TARGETS', item: 'selector, target, group은 callback 전에 target array로 정규화된다.', evidence: '#direct-call' },
  { id: 'RE-REGISTER-CONFIG', item: '호출할 때마다 config가 callback에 전달된다.', evidence: '#register-contract' },
  { id: 'RE-REGISTER-DEFAULTS', item: 'defaults는 빠진 key를 채우고 명시한 호출값이 우선한다.', evidence: '#registered-example' },
  { id: 'RE-REGISTER-PLUGINS', item: 'comma-separated plugins의 미등록 이름은 경고한다.', evidence: '#register-contract' },
  { id: 'RE-REGISTER-CENTRAL', item: 'effect는 중앙 registry에서 새 targets와 config로 재사용된다.', evidence: '#mental-model' },
  { id: 'RE-EXTEND-OPTION', item: 'extendTimeline true는 Timeline prototype에 동명 method를 추가한다.', evidence: '#timeline-extension' },
  { id: 'RE-TIMELINE-SIGNATURE', item: '확장 method는 targets, vars, position 순서로 호출한다.', evidence: '#timeline-extension' },
  { id: 'RE-TIMELINE-ADD', item: '확장 method는 반환 animation을 timeline.add로 position에 삽입한다.', evidence: '#timeline-extension' },
  { id: 'RE-TIMELINE-RETURN', item: '확장 호출은 parent Timeline을 반환해 chaining한다.', evidence: '#timeline-extension' },
  { id: 'RE-TIMELINE-CONTEXT', item: 'callback의 세 번째 인자는 호출한 parent Timeline이다.', evidence: '#timeline-extension' },
  { id: 'RE-TIMELINE-POSITION-SHORTHAND', item: '두 번째 인자가 object가 아니면 position으로 취급하고 defaults를 쓴다.', evidence: '#timeline-extension' },
  { id: 'RE-EXTEND-RETURN-WARNING', item: '확장 effect는 Timeline에 넣을 Tween이나 Timeline을 반환해야 한다.', evidence: '#timeline-extension' },
  { id: 'RE-NONEXTEND-ADD', item: '확장 없이도 direct effect 결과를 tl.add로 삽입할 수 있다.', evidence: '#boundaries' },
  { id: 'RE-OFFICIAL-FADE', item: '공식 fade recipe는 duration 기본값 2, override, Timeline chaining과 position을 보여준다.', evidence: '#direct-call' },
  { id: 'RE-EFFECTS-PORTABLE', item: '등록 recipe는 targets와 config를 바꿔 프로젝트 안팎에서 재사용할 수 있다.', evidence: '#mental-model' },
] as const

/** coverage UI가 source family별 ID를 빠르게 대조하도록 묶는다. */
export const reusableEffectsCoverage = [
  { title: 'gsap.effects', ids: reusableEffectsCatalog.filter((item) => item.id.startsWith('RE-EFFECTS-')).map((item) => item.id) },
  { title: 'registerEffect', ids: reusableEffectsCatalog.filter((item) => item.id.startsWith('RE-REGISTER-')).map((item) => item.id) },
  { title: 'Timeline extension', ids: reusableEffectsCatalog.filter((item) => item.id.startsWith('RE-EXTEND-') || item.id.startsWith('RE-TIMELINE-')).map((item) => item.id) },
  { title: '호출과 경계', ids: reusableEffectsCatalog.filter((item) => ['RE-NONEXTEND-ADD', 'RE-OFFICIAL-FADE'].includes(item.id)).map((item) => item.id) },
] as const
