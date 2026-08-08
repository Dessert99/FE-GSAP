/** 공식 여섯 문서에서 확인한 기술 item 39개와 실행으로만 확인한 6개를 로컬 섹션에 연결한다. */

/** 이 페이지가 소유하는 공식 Timeline cleanup 문서의 식별자다. */
export type TimelineCleanupSourceKey =
  | 'auto-remove-children'
  | 'clear'
  | 'kill'
  | 'kill-tweens-of'
  | 'remove'
  | 'revert'

/** 공식 주장과 실행 probe를 서로 다른 분모로 세기 위한 coverage 행이다. */
export type TimelineCleanupSourceItem = {
  id: string
  officialItem: string
  source: TimelineCleanupSourceKey
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 무엇을 지우고 무엇을 남기는지 판단하는 데 필요한 공식·실행 사실 전체다. */
export const timelineCleanupSourceItems: TimelineCleanupSourceItem[] = [
  { id: 'RM-01', officialItem: 'signature는 remove(value:[Tween | Timeline | Callback | Label]) : self다.', source: 'remove', origin: 'official', sectionId: 'remove-clear' },
  { id: 'RM-02', officialItem: 'Tween, Timeline, callback, label 또는 그 배열을 Timeline에서 제거한다.', source: 'remove', origin: 'official', sectionId: 'remove-clear' },
  { id: 'RM-03', officialItem: 'value 인자는 제거할 Tween, Timeline, callback, label 또는 그 배열이다.', source: 'remove', origin: 'official', sectionId: 'remove-clear' },
  { id: 'RM-04', officialItem: 'self를 반환해 chaining할 수 있다.', source: 'remove', origin: 'official', sectionId: 'remove-clear' },
  { id: 'RM-05', officialItem: '공식 단일 예제는 tl.remove(myTween)이다.', source: 'remove', origin: 'official', sectionId: 'remove-clear' },
  { id: 'RM-06', officialItem: '공식 배열 예제는 myTween, mySubTimeline, "myLabel"을 한 번에 제거한다.', source: 'remove', origin: 'official', sectionId: 'remove-clear' },
  { id: 'CL-01', officialItem: 'signature는 clear(labels:Boolean) : self다.', source: 'clear', origin: 'official', sectionId: 'remove-clear' },
  { id: 'CL-02', officialItem: '모든 Tween, Timeline, callback과 선택적으로 label까지 비운다.', source: 'clear', origin: 'official', sectionId: 'remove-clear' },
  { id: 'CL-03', officialItem: 'labels는 Boolean이며 기본값 true라서 기본 호출은 label도 지운다.', source: 'clear', origin: 'official', sectionId: 'remove-clear' },
  { id: 'CL-04', officialItem: 'self를 반환해 chaining할 수 있다.', source: 'clear', origin: 'official', sectionId: 'remove-clear' },
  { id: 'CL-05', officialItem: 'onComplete, onUpdate, onStart 같은 Timeline event callback은 clear()로 제거되지 않는다.', source: 'clear', origin: 'official', sectionId: 'remove-clear' },
  { id: 'CL-06', officialItem: 'event callback을 없애려면 eventCallback("onComplete", null)처럼 null을 지정한다.', source: 'clear', origin: 'official', sectionId: 'remove-clear' },
  { id: 'TC-P1', officialItem: 'remove(child)는 child만 부모에서 떼고 Timeline, label, event callback, 현재 target 값을 남긴다. clear()도 target 값을 되돌리지 않으며 labels 인자와 무관하게 event callback을 남긴다.', source: 'clear', origin: 'implementation', sectionId: 'remove-clear' },

  { id: 'KT-01', officialItem: 'signature는 killTweensOf(targets:Selector text | Array | Object, props:String, onlyActive:Boolean) : Timeline이다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-02', officialItem: '이 Timeline 안에서 제공한 target에 영향을 주는 모든 Tween을 kill하며 특정 property만 고를 수 있다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-03', officialItem: 'targets는 Selector text, Array, Object이며 kill할 Tween의 target object다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-04', officialItem: 'props는 선택적인 쉼표 구분 property 문자열이며 null이면 모든 property를 kill한다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-05', officialItem: 'onlyActive가 true면 진행 중인 active Tween만 영향을 받는다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-06', officialItem: 'Timeline self를 반환해 chaining할 수 있다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-07', officialItem: '공식 예제 tl.killTweensOf(".box")는 .box의 모든 Tween을 kill한다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'KT-08', officialItem: '공식 예제 tl.killTweensOf(".box", "x,y")는 x와 y animation만 kill한다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-tweens' },
  { id: 'TC-P2', officialItem: 'x와 opacity를 가진 같은 Tween에서 x만 kill하면 Tween은 남고, 시간을 더 옮겼을 때 x는 멈춘 값에 고정되지만 opacity는 계속 변한다.', source: 'kill-tweens-of', origin: 'implementation', sectionId: 'kill-tweens' },
  { id: 'TC-P3', officialItem: 'paused Timeline의 아직 시작하지 않은 Tween은 onlyActive:true에서 남고 onlyActive:false에서 제거된다.', source: 'kill-tweens-of', origin: 'implementation', sectionId: 'kill-tweens' },

  { id: 'KL-01', officialItem: '공식 signature는 kill() : Timeline이다.', source: 'kill', origin: 'official', sectionId: 'kill-revert' },
  { id: 'KL-02', officialItem: 'Timeline을 즉시 kill하고 부모 Timeline에서 제거해 animation을 멈춘다.', source: 'kill', origin: 'official', sectionId: 'kill-revert' },
  { id: 'KL-03', officialItem: '공식 Returns는 Timeline Self라서 chaining할 수 있다고 적는다.', source: 'kill', origin: 'official', sectionId: 'kill-revert' },
  { id: 'KL-04', officialItem: '즉시 멈추고 부모에서 제거하며 garbage collection 대상으로 푼다.', source: 'kill', origin: 'official', sectionId: 'kill-revert' },
  { id: 'KL-05', officialItem: '나중에 다시 쓸 animation에는 kill() 대신 pause()를 사용하라고 경고한다.', source: 'kill', origin: 'official', sectionId: 'kill-revert' },
  { id: 'KL-06', officialItem: '공식 예제는 tl.kill() 뒤 참조를 tl = null로 지운다.', source: 'kill', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-01', officialItem: '공식 페이지는 revert()가 GSAP 3.11.0에 추가됐다고 표시한다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-02', officialItem: 'signature는 revert() : Self다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-03', officialItem: 'Timeline을 revert하고 kill하며 target을 animation 이전 상태로 돌리고 Timeline이 추가한 inline style을 제거한다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-04', officialItem: 'Timeline 자신을 반환해 chaining할 수 있다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-05', officialItem: '문제 예시는 inline style이 없고 기본 opacity가 1인 box에서 시작한다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-06', officialItem: '문제 예시는 Timeline으로 .box opacity를 0까지 낮춘다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-07', officialItem: 'progress(0).pause()는 computed style에서 읽은 시작값으로 돌리지만 opacity:1 inline style은 남긴다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-08', officialItem: '남은 inline style은 media query class rule의 opacity 0.5를 덮을 수 있으므로 animation이 추가한 style을 제거할 방법이 필요하다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-09', officialItem: 'progress(0)은 animation의 0 지점을 보장하려고 inline style을 설정해야 하므로 별도 revert 메서드가 필요하다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'RV-10', officialItem: 'GSAP 3.11부터 모든 Tween과 Timeline에 revert()가 있고 공식 예제는 tl.revert()로 animation이 추가한 inline style을 제거한다.', source: 'revert', origin: 'official', sectionId: 'kill-revert' },
  { id: 'TC-P4', officialItem: 'GSAP 3.15.0에서 Timeline.kill()의 실제 반환값은 undefined라서 공식 Timeline/self 반환 설명 및 설치본 this 타입과 다르다.', source: 'kill', origin: 'implementation', sectionId: 'kill-revert' },
  { id: 'TC-P5', officialItem: 'kill()은 현재 target 값과 held Timeline 내부 child·label을 남기지만 부모에서 떼고, revert()는 기록한 시작값으로 복원한 뒤 부모에서 떼며 self를 반환한다.', source: 'revert', origin: 'implementation', sectionId: 'kill-revert' },

  { id: 'AR-01', officialItem: 'autoRemoveChildren의 타입 signature는 Boolean이다.', source: 'auto-remove-children', origin: 'official', sectionId: 'auto-remove' },
  { id: 'AR-02', officialItem: 'true면 child Tween과 Timeline이 완료되는 즉시 제거된다.', source: 'auto-remove-children', origin: 'official', sectionId: 'auto-remove' },
  { id: 'AR-03', officialItem: '기본값은 false지만 globalTimeline에서는 예외적으로 true다.', source: 'auto-remove-children', origin: 'official', sectionId: 'auto-remove' },
  { id: 'TC-P6', officialItem: 'autoRemoveChildren:true에서 완료된 child는 목록에서 빠지고 parent Timeline을 0으로 seek해도 다시 적용되지 않는다. label과 Timeline event callback은 남는다.', source: 'auto-remove-children', origin: 'implementation', sectionId: 'auto-remove' },
]
