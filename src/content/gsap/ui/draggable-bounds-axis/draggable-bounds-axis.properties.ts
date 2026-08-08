/** P05가 소유한 bounds·axis·layer property의 공식 표현과 local 표시 경계를 표로 정리한다. */
export const draggableBoundsAxisProperties = [
  { name: 'applyBounds(bounds)', type: 'Element | String | Object', defaultValue: '없음', acceptedValues: 'element·selector·rectangle·min/max·rotation object', timing: 'bounds를 바꾸거나 다시 계산할 때', caveat: '공식 signature는 반환을 표기하지 않는다; installed d.ts는 void다.' },
  { name: 'minX / maxX / minY / maxY', type: 'Number', defaultValue: 'bounds 적용 전 공식 페이지에 명시 없음', acceptedValues: 'translation mode legal minimum/maximum', timing: 'bounds 계산 뒤', caveat: 'rotation mode에는 minRotation/maxRotation을 읽는다.' },
  { name: 'minRotation / maxRotation', type: 'Number', defaultValue: 'bounds 적용 전 공식 페이지에 명시 없음', acceptedValues: 'rotation mode legal minimum/maximum', timing: 'bounds 계산 뒤', caveat: 'x/y drag의 min/max field와 같은 의미로 섞지 않는다.' },
  { name: 'lockAxis', type: 'Boolean', defaultValue: '공식 property 페이지에 명시 없음', acceptedValues: 'true | false', timing: 'initial drag direction이 2px를 넘은 뒤', caveat: 'x,y·top,left·scroll type에서만 적용된다.' },
  { name: 'lockedAxis', type: '공식: String', defaultValue: 'press 직후 미설정', acceptedValues: '"x" | "y"', timing: '초기 direction이 결정된 뒤', caveat: '움직이는 축이 아니라 막힌 축이다; installed top-level d.ts에는 누락됐다.' },
  { name: 'autoScroll', type: 'Number', defaultValue: '0', acceptedValues: 'non-zero; 1 normal, 2 double speed 등', timing: 'scrollable container edge 40px 안 drag 중', caveat: 'pointer가 edge에 가까울수록 빠르다.' },
  { name: 'zIndex', type: 'Number', defaultValue: '공식 페이지에 명시 없음', acceptedValues: 'current z-index', timing: 'Draggable layer state를 읽을 때', caveat: 'zIndexBoost 설정 detail은 P03 creation vars owner다.' },
  { name: 'update(applyBounds, sticky)', type: 'Boolean, Boolean → Draggable (installed d.ts)', defaultValue: '공식 property page에 명시 없음', acceptedValues: 'applyBounds true로 recalculation', timing: 'external transform/layout change 뒤', caveat: '이 페이지는 external layout resync만 소유하고 P06 lifecycle API detail은 소유하지 않는다.' },
] as const
