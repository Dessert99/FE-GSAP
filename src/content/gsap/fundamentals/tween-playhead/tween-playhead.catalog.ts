/** Tween playhead 공식 항목 45개를 section별 coverage 묶음으로 보존한다. */
export const tweenPlayheadCoverage = [
  {
    title: 'raw progress와 eased ratio',
    ids: ['TP-RATIO-READONLY', 'TP-RATIO-EASED-PROGRESS', 'TP-RATIO-OVERSHOOT', 'TP-RATIO-INTERPOLATION', 'TP-RATIO-EQUALITY', 'TP-RATIO-POWER2-EXAMPLE'],
  },
  {
    title: 'current-cycle progress',
    ids: ['TP-PROGRESS-SIGNATURE', 'TP-PROGRESS-RANGE', 'TP-PROGRESS-GETSET', 'TP-PROGRESS-SUPPRESS', 'TP-PROGRESS-REPEAT-EXCLUSION', 'TP-PROGRESS-REPEAT-EXAMPLE', 'TP-PROGRESS-CHAINING', 'TP-PROGRESS-RATIO-BOUNDARY'],
  },
  {
    title: 'seek와 callback traversal',
    ids: ['TP-SEEK-SIGNATURE', 'TP-SEEK-STATE-PRESERVE', 'TP-SEEK-TIME-INPUT', 'TP-SEEK-SUPPRESS', 'TP-SEEK-RETURN', 'TP-SEEK-CALLBACK-TRAVERSAL', 'TP-SEEK-EXAMPLE'],
  },
  {
    title: 'local seconds',
    ids: ['TP-TIME-SIGNATURE', 'TP-TIME-LOCAL', 'TP-TIME-GETSET', 'TP-TIME-NEGATIVE', 'TP-TIME-SUPPRESS', 'TP-TIME-REPEAT-RESET', 'TP-TIME-YOYO', 'TP-TIME-DURATION-BOUND', 'TP-TIME-REPEAT-EXAMPLE'],
  },
  {
    title: 'total progress',
    ids: ['TP-TOTAL-PROGRESS-SIGNATURE', 'TP-TOTAL-PROGRESS-RANGE', 'TP-TOTAL-PROGRESS-GETSET', 'TP-TOTAL-PROGRESS-SUPPRESS', 'TP-TOTAL-PROGRESS-REPEAT-INCLUSION', 'TP-TOTAL-PROGRESS-EXAMPLE'],
  },
  {
    title: 'total seconds',
    ids: ['TP-TOTAL-TIME-SIGNATURE', 'TP-TOTAL-TIME-OVERALL', 'TP-TOTAL-TIME-GETSET', 'TP-TOTAL-TIME-NEGATIVE', 'TP-TOTAL-TIME-SUPPRESS', 'TP-TOTAL-TIME-REPEAT-CALC', 'TP-TOTAL-TIME-REPEAT-DELAY', 'TP-TOTAL-TIME-CLAMP', 'TP-TOTAL-TIME-EXAMPLE'],
  },
] as const

/** 네 playhead setter의 단위·반복 포함 여부·event 기본값을 비교한다. */
export const playheadMethodRows = [
  { method: 'progress()', unit: '0–1', scope: 'current cycle', suppressEvents: 'false' },
  { method: 'time()', unit: 'seconds', scope: 'current cycle', suppressEvents: 'false' },
  { method: 'totalProgress()', unit: '0–1', scope: 'all repeats', suppressEvents: 'false' },
  { method: 'totalTime()', unit: 'seconds', scope: 'all repeats + repeatDelay', suppressEvents: 'false' },
  { method: 'seek()', unit: 'seconds', scope: 'Tween local time', suppressEvents: 'true' },
] as const
