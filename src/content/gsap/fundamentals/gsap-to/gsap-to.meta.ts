/** gsap.to() 공식 source identity와 55개 기술 item의 로컬 대응 상태를 관리한다. */

/** 공식 source item의 검증 상태와 로컬 학습 근거를 함께 보존한다. */
export type OfficialCoverageItem = {
  sourcePageId: 'source:gsap-to'
  sourceItemId: `source:gsap-to#${string}`
  officialItem: string
  sourceLocation: string
  sourceStatus: 'verified'
  localEvidence: string[]
  localStatus: 'covered' | 'planned'
}

/** gsap.to() 페이지의 공식 출처와 로컬 위치를 한곳에서 관리한다. */
export const gsapToPageMeta = {
  sourcePageId: 'source:gsap-to',
  sourceRevision: 2,
  title: 'gsap.to()',
  category: 'GSAP · Methods',
  officialUrl: 'https://gsap.com/docs/v3/GSAP/gsap.to%28%29/',
  sourcePath: 'src/content/gsap/fundamentals/gsap-to/',
  summary: '대상이 지금 있는 모습에서 내가 정한 위치나 모습까지 자연스럽게 바뀌게 합니다.',
  reviewedAt: '2026-08-13',
} as const

/** 공식 목차와 로컬 학습 섹션의 이동 경로를 대응시킨다. */
export const officialPageSections = [
  { title: '개요 · 반환값', anchor: 'overview', localTitle: '현재값에서 목표값으로 · Tween 제어' },
  { title: 'Parameters', anchor: 'parameters', localTitle: 'targets와 vars' },
  { title: 'Special Properties', anchor: 'special-properties', localTitle: '34개 특수 속성 전체 참조' },
  { title: 'Plugins', anchor: 'plugins', localTitle: '플러그인이 vars를 확장하는 방식' },
  { title: 'Function-based values', anchor: 'value-modes', localTitle: '함수 기반 값' },
  { title: 'Random values', anchor: 'value-modes', localTitle: '랜덤 값' },
  { title: 'Relative values', anchor: 'value-modes', localTitle: '상대값' },
  { title: 'Staggers', anchor: 'staggers', localTitle: '여러 targets의 시작 순서' },
  { title: 'Sequencing', anchor: 'sequencing', localTitle: 'delay와 Timeline의 경계' },
  { title: 'Keyframes', anchor: 'keyframes', localTitle: '여러 상태를 한 Tween에 연결' },
  { title: 'Callbacks', anchor: 'callbacks', localTitle: 'Tween 생명주기 관찰' },
] as const

/** 공식 문서의 기술 item을 안정적인 semantic ID와 구체적인 로컬 근거에 일대일로 연결한다. */
export const officialCoverageItems: OfficialCoverageItem[] = [
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#return-tween', officialItem: '반환값 Tween', sourceLocation: 'L164-165 · Returns', sourceStatus: 'verified', localEvidence: ['OverviewSection · 반환값 설명'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#destination-values-basic-example', officialItem: '목표값과 기본 예제', sourceLocation: 'L167-172 · Returns', sourceStatus: 'verified', localEvidence: ['DestinationValuesExample · x/rotation/duration 예제'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#current-value-reading-any-object', officialItem: '현재값 자동 읽기와 일반 객체', sourceLocation: 'L173 · Returns', sourceStatus: 'verified', localEvidence: ['MethodAnatomySection · target 계약'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#returned-tween-controls', officialItem: '반환 Tween 제어', sourceLocation: 'L174-183 · control example', sourceStatus: 'verified', localEvidence: ['TweenControlsExample · pause/seek/progress/play'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#auto-play-delay-paused-disposal', officialItem: '자동 재생·지연·정리', sourceLocation: 'L184 · Returns', sourceStatus: 'verified', localEvidence: ['OverviewSection · 기본 생명주기'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#from-fromto-contrast', officialItem: 'from/fromTo 대비', sourceLocation: 'L186-188 · Returns', sourceStatus: 'verified', localEvidence: ['OverviewSection · 시작값 선택 경계'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#targets-contract', officialItem: 'targets 계약', sourceLocation: 'L189-192 · Parameters', sourceStatus: 'verified', localEvidence: ['MethodAnatomySection · selector/element/object/array'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#vars-contract', officialItem: 'vars 계약', sourceLocation: 'L192 · Parameters', sourceStatus: 'verified', localEvidence: ['MethodAnatomySection · 목표값과 특수 속성'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#callback-scope', officialItem: 'callbackScope', sourceLocation: 'L200-202 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-callbackScope', 'CallbacksExample · callbackScope'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#data', officialItem: 'data', sourceLocation: 'L204-206 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-data', 'TweenControlsExample · tween.data'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#delay', officialItem: 'delay', sourceLocation: 'L208-210 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-delay', 'PlaybackOptionsExample · delay'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#duration', officialItem: 'duration', sourceLocation: 'L212-214 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-duration', 'DestinationValuesExample · duration'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#ease', officialItem: 'ease', sourceLocation: 'L216-217 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-ease · 입력 진행률과 overshoot 출력 경계', 'DestinationValuesExample · ease'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#ease-reverse', officialItem: 'easeReverse', sourceLocation: 'L219-221 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-easeReverse', 'PlaybackOptionsExample · easeReverse'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#id', officialItem: 'id', sourceLocation: 'L222-224 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-id', 'TweenControlsExample · id'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#immediate-render', officialItem: 'immediateRender', sourceLocation: 'L226-227 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-immediateRender'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#inherit', officialItem: 'inherit', sourceLocation: 'L229-230 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-inherit'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#lazy', officialItem: 'lazy', sourceLocation: 'L232-233 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-lazy'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-complete', officialItem: 'onComplete', sourceLocation: 'L234-236 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onComplete', 'CallbacksExample · 완료 이벤트'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-complete-params', officialItem: 'onCompleteParams', sourceLocation: 'L238-240 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onCompleteParams', 'CallbacksExample · 완료 인자'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-interrupt', officialItem: 'onInterrupt', sourceLocation: 'L242-244 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onInterrupt', 'CallbacksExample · 중단 이벤트'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-interrupt-params', officialItem: 'onInterruptParams', sourceLocation: 'L246-247 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onInterruptParams', 'CallbacksExample · 중단 인자'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-repeat', officialItem: 'onRepeat', sourceLocation: 'L249-251 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onRepeat', 'CallbacksExample · 반복 이벤트'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-repeat-params', officialItem: 'onRepeatParams', sourceLocation: 'L253-255 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onRepeatParams', 'CallbacksExample · 반복 인자'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-reverse-complete', officialItem: 'onReverseComplete', sourceLocation: 'L257-258 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onReverseComplete', 'CallbacksExample · 역재생 완료'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-reverse-complete-params', officialItem: 'onReverseCompleteParams', sourceLocation: 'L260-262 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onReverseCompleteParams', 'CallbacksExample · 역재생 완료 인자'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-start', officialItem: 'onStart', sourceLocation: 'L264-266 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onStart', 'CallbacksExample · 시작 이벤트'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-start-params', officialItem: 'onStartParams', sourceLocation: 'L268-270 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onStartParams', 'CallbacksExample · 시작 인자'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-update', officialItem: 'onUpdate', sourceLocation: 'L272-273 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onUpdate', 'CallbacksExample · 갱신 이벤트'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#on-update-params', officialItem: 'onUpdateParams', sourceLocation: 'L275-277 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-onUpdateParams', 'CallbacksExample · 갱신 인자'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#overwrite', officialItem: 'overwrite', sourceLocation: 'L279-280 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-overwrite', 'OverwriteExample · 충돌 처리'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#paused', officialItem: 'paused', sourceLocation: 'L282-283 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-paused', 'TweenControlsExample · paused'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#repeat', officialItem: 'repeat', sourceLocation: 'L285-287 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-repeat', 'RepeatYoyoExample · repeat'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#repeat-delay', officialItem: 'repeatDelay', sourceLocation: 'L289-291 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-repeatDelay', 'RepeatYoyoExample · repeatDelay'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#repeat-refresh', officialItem: 'repeatRefresh', sourceLocation: 'L293-294 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-repeatRefresh · 재계산 제외 항목', 'RepeatRefreshExample · 정방향 전체 회차'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#reversed', officialItem: 'reversed', sourceLocation: 'L296-297 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-reversed', 'PlaybackOptionsExample · reversed'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#run-backwards', officialItem: 'runBackwards', sourceLocation: 'L299-300 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-runBackwards · ease 비반전 경계', 'PlaybackOptionsExample · runBackwards'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#stagger-property', officialItem: 'stagger', sourceLocation: 'L302-303 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-stagger', 'MultipleTargetsExample · stagger'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#start-at', officialItem: 'startAt', sourceLocation: 'L305-307 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-startAt', 'PlaybackOptionsExample · startAt'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#yoyo', officialItem: 'yoyo', sourceLocation: 'L309-310 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-yoyo · reversed 독립 경계', 'RepeatYoyoExample · 반복 순서'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#yoyo-ease', officialItem: 'yoyoEase', sourceLocation: 'L312-313 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-yoyoEase · true/지정 ease/자동 yoyo', 'RepeatYoyoExample · yoyoEase'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#keyframes-property', officialItem: 'keyframes', sourceLocation: 'L315-316 · Special Properties', sourceStatus: 'verified', localEvidence: ['property-keyframes', 'KeyframesExample · 배열형 keyframes'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#plugin-extension-boundary', officialItem: '플러그인 확장 경계', sourceLocation: 'L317-319 · Plugins', sourceStatus: 'verified', localEvidence: ['PluginsSection · 렌더링 연결/도형 변형/드래그 예시와 작은 코어 경계'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#function-value-evaluation', officialItem: '함수 기반 값 평가', sourceLocation: 'L320-331 · Function-based values', sourceStatus: 'verified', localEvidence: ['ValueModesExample · target별 첫 render 평가'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#function-value-arguments', officialItem: '함수 기반 값 인자', sourceLocation: 'L332-336 · Function-based values', sourceStatus: 'verified', localEvidence: ['ValueModesExample · index/target/targets'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#random-range-string', officialItem: 'random 범위 문자열', sourceLocation: 'L337-345 · Random values', sourceStatus: 'verified', localEvidence: ['ValueModesExample · random 범위'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#random-array-string', officialItem: 'random 배열 문자열', sourceLocation: 'L346-350 · Random values', sourceStatus: 'verified', localEvidence: ['ValueModesExample · random 배열'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#random-utility-alternative', officialItem: 'gsap.utils.random 대안', sourceLocation: 'L352-353 · Random values', sourceStatus: 'verified', localEvidence: ['ValueModesExample · utility 대안'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#relative-value', officialItem: '상대값', sourceLocation: 'L354-356 · Relative values', sourceStatus: 'verified', localEvidence: ["ValueModesExample · '+=' + 변수/템플릿 표현과 Tween 시작 시점 기준"], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#stagger-guide', officialItem: 'Staggers', sourceLocation: 'L357-359 · Staggers', sourceStatus: 'verified', localEvidence: ['StaggersSection', 'MultipleTargetsExample · 숫자/객체 stagger'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#sequencing-delay-timeline-selection', officialItem: 'delay와 Timeline 선택', sourceLocation: 'L360-361 · Sequencing', sourceStatus: 'verified', localEvidence: ['SequencingSection · 선택 기준'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#timeline-overlap-nesting-chaining', officialItem: 'Timeline 겹침·중첩·체이닝', sourceLocation: 'L362-369 · Sequencing', sourceStatus: 'verified', localEvidence: ['SequencingSection · to/from/fromTo 체이닝과 Tween 겹침/Timeline 중첩 경계'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#keyframes-guide-purpose', officialItem: 'Keyframes 사용 목적', sourceLocation: 'L370-374 · Keyframes', sourceStatus: 'verified', localEvidence: ['KeyframesSection · 반복 호출 축약과 CSS animation 이식', 'KeyframesExample · vars 배열과 백분율 객체 형식 분리'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#callback-events', officialItem: '콜백 이벤트', sourceLocation: 'L375-379 · Callbacks', sourceStatus: 'verified', localEvidence: ['CallbacksSection', 'CallbacksExample · 생명주기 이벤트'], localStatus: 'covered' },
  { sourcePageId: 'source:gsap-to', sourceItemId: 'source:gsap-to#callback-use-cases', officialItem: '콜백 사용처', sourceLocation: 'L377-382 · Callbacks', sourceStatus: 'verified', localEvidence: ['CallbacksExample · 디버깅과 동기화'], localStatus: 'covered' },
]

/** 현재 페이지에서 경계를 설명한 뒤 이어서 읽을 공식 문서를 모은다. */
export const officialLinks = {
  plugins: 'https://gsap.com/docs/v3/Plugins/',
  timeline: 'https://gsap.com/docs/v3/GSAP/Timeline/',
  keyframes: 'https://gsap.com/resources/keyframes/',
  callbacks: 'https://gsap.com/docs/v3/GSAP/Tween/eventCallback%28%29/',
  stagger: 'https://gsap.com/resources/getting-started/Staggers/',
  easing: 'https://gsap.com/docs/v3/Eases/',
} as const
