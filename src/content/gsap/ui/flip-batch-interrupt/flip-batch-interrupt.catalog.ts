/** P13이 소유하는 batch·active query·target interruption 사실을 고정한다. */
export type FlipBatchInterruptItem = {
  id: string
  officialItem: string
  source: 'batch' | 'isFlipping' | 'killFlipsOf'
  sectionId: string
  origin: 'official' | 'implementation'
}

/** 세 canonical의 기술 item과 설치본 cleanup observation을 분리한다. */
export const flipBatchInterruptItems: FlipBatchInterruptItem[] = [
  {
    id: 'FLIPBI-68-01',
    officialItem:
      'Flip.batch(id)는 matching batch를 반환하거나 새 FlipBatch를 만들며 kill하면 id를 unregister한다.',
    source: 'batch',
    sectionId: 'batch-phases',
    origin: 'official',
  },
  {
    id: 'FLIPBI-68-02',
    officialItem:
      'batch는 모든 getState 뒤 state change, 마지막 animate 순서로 cross-contamination을 막는다.',
    source: 'batch',
    sectionId: 'batch-phases',
    origin: 'official',
  },
  {
    id: 'FLIPBI-68-03',
    officialItem:
      'action은 getState, setState/loadState, animate, enter/leave/start/complete hook과 once를 가질 수 있다.',
    source: 'batch',
    sectionId: 'batch-phases',
    origin: 'official',
  },
  {
    id: 'FLIPBI-68-04',
    officialItem: 'batch/action kill과 once action cleanup이 가능하다.',
    source: 'batch',
    sectionId: 'cleanup',
    origin: 'official',
  },
  {
    id: 'FLIPBI-72-01',
    officialItem:
      'Flip.isFlipping(target)는 selector 또는 Element target이 현재 Flipping이면 Boolean true를 반환한다.',
    source: 'isFlipping',
    sectionId: 'active-query',
    origin: 'official',
  },
  {
    id: 'FLIPBI-73-01',
    officialItem:
      'Flip.killFlipsOf(targets, complete?)는 target Flip을 즉시 kill하고 complete false가 아니면 완료한다.',
    source: 'killFlipsOf',
    sectionId: 'kill-policy',
    origin: 'official',
  },
  {
    id: 'FLIPBI-IMPL-01',
    officialItem:
      'installed batch는 state capture 뒤 conflicts를 처리하고 batch kill은 lookup에서 batch를 제거한다.',
    source: 'batch',
    sectionId: 'cleanup',
    origin: 'implementation',
  },
]
