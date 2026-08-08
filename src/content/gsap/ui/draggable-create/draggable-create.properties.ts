/** P03가 소유한 instance surface와 생성 vars만 작은 속성 표로 고정한다. */

/** 이 페이지에서 실제로 읽거나 만드는 Draggable surface의 값 계약이다. */
export const draggableCreateProperties = [
  { name: 'target', kind: 'instance property', type: 'Object', defaultValue: '공식 페이지에 기본값 명시 없음', values: '현재 draggable 중인 object', use: '같은 DOM target인지 검사한다.' },
  { name: 'vars', kind: 'instance property', type: 'Object', defaultValue: '공식 페이지에 기본값 명시 없음', values: '생성 때 전달한 configuration variables', use: '만든 instance가 어떤 설정을 받았는지 읽는다.' },
  { name: 'type', kind: 'create vars', type: 'String', defaultValue: '"x,y"', values: '"x,y" | "top,left" | "left,top" | "rotation" | "x" | "y" | "top" | "left"', use: 'drag가 바꿀 방식의 출발점을 고른다.' },
  { name: 'dragClickables', kind: 'create vars', type: 'Boolean', defaultValue: '공식 overview에 기본값 명시 없음', values: 'false를 주면 clickable child의 native interaction을 drag보다 우선한다.', use: 'card 안 button의 click과 focus를 보존한다.' },
] as const
