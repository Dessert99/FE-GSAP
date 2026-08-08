/** P43의 public signature와 호출 범위를 property table에 제공한다. */
export const scrollTriggerLifecycleProperties = [
  [
    'disable(revert?, allowAnimation?)',
    'void',
    'instance를 보존한 채 listener/pin을 비활성화',
  ],
  [
    'enable(reset?, refresh?)',
    'void',
    'disabled instance를 다시 활성화하고 필요하면 측정',
  ],
  ['kill(revert?, allowAnimation?)', 'void', 'owner가 instance를 영구 폐기'],
  ['instance.refresh()', 'void', '한 instance의 start/end를 다시 측정'],
  [
    'addEventListener(type, callback)',
    'void',
    'refreshInit 등 global lifecycle event 구독',
  ],
  [
    'ScrollTrigger.refresh(safe?)',
    'void',
    '모든 trigger를 즉시 또는 safe timing에 재측정',
  ],
  [
    'removeEventListener(type, callback)',
    'void',
    '등록할 때 쓴 같은 callback 제거',
  ],
  [
    'ScrollTrigger.sort(compare?)',
    'ScrollTrigger[]',
    'refresh 전 trigger update 순서를 재정렬',
  ],
  [
    'ScrollTrigger.update()',
    'void',
    'geometry 재측정 없이 current scroll state 반영',
  ],
] as const
