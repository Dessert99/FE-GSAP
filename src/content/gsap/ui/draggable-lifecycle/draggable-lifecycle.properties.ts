/** P06가 실제로 호출하거나 읽는 Draggable lifecycle surface를 작은 표로 고정한다. */

/** lifecycle lab이 설명하는 method의 호출·반환 계약이다. */
export const draggableLifecycleProperties = [
  { name: 'disable()', signature: 'disable(): Draggable', returnValue: '같은 instance', use: 'pointer drag를 잠시 막는다.' },
  { name: 'enable()', signature: 'enable(): Draggable', returnValue: '같은 instance', use: 'pointer drag를 다시 허용한다.' },
  { name: 'enabled()', signature: 'enabled(): Boolean', returnValue: '현재 enabled state', use: 'control 뒤 실제 state를 읽는다.' },
  { name: 'startDrag(event, align)', signature: 'startDrag(event:Object, align:Boolean): void', returnValue: 'void', use: 'captured pointer event가 있을 때만 시작한다.' },
  { name: 'endDrag(event)', signature: 'endDrag(event:Object): void', returnValue: 'void', use: '같은 captured event로 종료를 요청한다.' },
  { name: 'kill()', signature: 'kill(): Draggable', returnValue: '같은 instance', use: 'listener와 lookup을 폐기한다.' },
] as const
