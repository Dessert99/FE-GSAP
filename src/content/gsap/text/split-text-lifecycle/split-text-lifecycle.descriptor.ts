/** 실제 SplitText lifecycle call과 code panel을 같은 command descriptor로 묶는다. */
export type SplitTextLifecycleCommand = 'split' | 'resplit' | 'revert' | 'kill'

/** lines를 포함해 font·resize autoSplit 경계를 관찰할 config를 고정한다. */
export const splitTextLifecycleConfig = {
  type: 'lines,words,chars',
  aria: 'auto',
  autoSplit: true,
} as const

/** 선택한 command가 실제 instance call과 표시 code를 함께 결정한다. */
export const splitTextLifecycleCommands = {
  split: {
    label: 'split',
    action: 'create',
    code: 'const split = SplitText.create(target, splitConfig)',
  },
  resplit: {
    label: 're-split',
    action: 'resplit',
    code: 'split.split(splitConfig)',
  },
  revert: {
    label: 'revert',
    action: 'revert',
    code: 'split.revert()',
  },
  kill: {
    label: 'kill',
    action: 'kill',
    code: 'split.kill()',
  },
} as const satisfies Record<
  SplitTextLifecycleCommand,
  {
    label: string
    action: 'create' | 'resplit' | 'revert' | 'kill'
    code: string
  }
>
