/** GestureEventLab이 실제로 보여 주는 event·state·decision surface다. */

/** 공식 surface의 타입·시점·관찰 질문을 한 줄로 표현한다. */
export type DraggableEventProperty = {
  name: string
  type: string
  timing: string
  use: string
}

/** learner가 event와 상태를 같은 값으로 오해하지 않도록 표를 제공한다. */
export const draggableEventProperties: DraggableEventProperty[] = [
  {
    name: 'addEventListener(type, callback)',
    type: 'void',
    timing: '등록 시',
    use: 'event마다 callback 연결',
  },
  {
    name: 'isPressed',
    type: 'Boolean',
    timing: 'press → release',
    use: '현재 누름 상태 확인',
  },
  {
    name: 'Draggable.timeSinceDrag()',
    type: 'Number seconds',
    timing: 'drag end 뒤',
    use: '최근 drag면 click 건너뛰기',
  },
]
