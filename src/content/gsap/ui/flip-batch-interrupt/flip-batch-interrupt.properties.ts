/** P13 lab이 나중에 보여 줄 batch/action/query/kill 표면을 선언한다. */
export const flipBatchInterruptProperties = [
  {
    name: 'Flip.batch(id)',
    type: 'FlipBatch',
    timing: 'coordinated lifecycle',
  },
  {
    name: 'Flip.isFlipping(target)',
    type: 'Boolean',
    timing: 'before next action',
  },
  {
    name: 'Flip.killFlipsOf(target, complete?)',
    type: 'void',
    timing: 'target-scoped interruption',
  },
] as const
