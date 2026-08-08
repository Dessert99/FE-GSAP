/** 공식 Timeline vars 표 22행을 타입·기본값·역할까지 그대로 보존한 명세다. */

/** vars 한 항목이 학습 화면에서 필요한 모든 칸을 고정한다. */
export type TimelineVar = {
  name: string
  /** 공식 표의 config-type 칸 원문. 비어 있으면 공식이 타입을 적지 않은 것이다. */
  officialType: string | null
  /** 이 값을 무엇에 쓰는지 한 문장으로 다시 쓴 설명이다. */
  role: string
  /** 공식이 문장 안에 밝힌 기본값·특수값. 없으면 명시가 없다는 뜻이다. */
  defaultOrSpecial: string | null
  /** 같은 성격끼리 묶어 22개를 한 번에 훑을 수 있게 한다. */
  group: 'structure' | 'timing' | 'repeat' | 'callback'
  /** 이 페이지가 계약을 소유하는지, 다른 페이지로 넘기는지 밝힌다. */
  ownedHere: boolean
}

/** 공식 vars 표 22행 전체 — 화면의 표와 개수 문장이 모두 이 배열을 센다. */
export const timelineVars: TimelineVar[] = [
  {
    name: 'defaults',
    officialType: 'Object',
    role: '자식 animation이 생성될 때 물려받을 기본값을 한 번만 적어 둡니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'structure',
    ownedHere: true,
  },
  {
    name: 'paused',
    officialType: 'Boolean',
    role: 'true면 만들자마자 스스로 멈춘 상태로 시작합니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음 (true의 효과만 기술)',
    group: 'timing',
    ownedHere: true,
  },
  {
    name: 'delay',
    officialType: 'Number',
    role: 'timeline이 시작하기 전에 기다릴 시간(초)입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'timing',
    ownedHere: true,
  },
  {
    name: 'smoothChildTiming',
    officialType: 'Boolean',
    role: '실행 중 타이밍이 바뀔 때 자식의 startTime을 자동으로 다시 놓을지 정합니다.',
    defaultOrSpecial: 'false — globalTimeline만 예외라고 공식이 밝힘',
    group: 'structure',
    ownedHere: false,
  },
  {
    name: 'autoRemoveChildren',
    officialType: 'Boolean',
    role: '완료된 자식을 즉시 없앨지 정합니다. 되감기를 막는 대신 속도와 메모리에 유리합니다.',
    defaultOrSpecial: 'root timeline들은 true를 쓴다고 공식이 밝힘',
    group: 'structure',
    ownedHere: false,
  },
  {
    name: 'repeat',
    officialType: 'Number',
    role: '첫 재생 이후 몇 번 더 반복할지 정합니다.',
    defaultOrSpecial: '-1은 무한 반복. 항상 정수여야 함',
    group: 'repeat',
    ownedHere: false,
  },
  {
    name: 'repeatDelay',
    officialType: 'Number',
    role: '반복과 반복 사이에 쉴 시간(초)입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'repeat',
    ownedHere: false,
  },
  {
    name: 'repeatRefresh',
    officialType: null,
    role: '반복할 때마다 자식 tween을 invalidate()해서 시작·끝 값을 다시 기록합니다.',
    defaultOrSpecial: 'yoyo 구간은 제외. duration·delay·stagger는 refresh되지 않음',
    group: 'repeat',
    ownedHere: false,
  },
  {
    name: 'yoyo',
    officialType: 'Boolean',
    role: '반복 주기마다 방향을 뒤집어 앞뒤로 오가는 것처럼 보이게 합니다.',
    defaultOrSpecial: 'reversed property에는 영향을 주지 않음',
    group: 'repeat',
    ownedHere: false,
  },
  {
    name: 'callbackScope',
    officialType: 'Object',
    role: '모든 callback 안에서 this가 가리킬 대상입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onStart',
    officialType: 'Function',
    role: 'time이 0에서 다른 값으로 바뀌며 시작할 때 불립니다.',
    defaultOrSpecial: 'restart하면 여러 번 불릴 수 있음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onStartParams',
    officialType: 'Array',
    role: 'onStart에 넘길 인자 목록입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onUpdate',
    officialType: 'Function',
    role: '활성 상태인 매 frame마다 불립니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onUpdateParams',
    officialType: 'Array',
    role: 'onUpdate에 넘길 인자 목록입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onComplete',
    officialType: 'Function',
    role: 'animation이 완료됐을 때 불립니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onCompleteParams',
    officialType: 'Array',
    role: 'onComplete에 넘길 인자 목록입니다.',
    defaultOrSpecial: '공식 예제 ["param1", "param2"]',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onRepeat',
    officialType: 'Function',
    role: '반복이 일어날 때마다 불립니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onRepeatParams',
    officialType: 'Array',
    role: 'onRepeat에 넘길 인자 목록입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onReverseComplete',
    officialType: 'Function',
    role: '역방향으로 되감겨 time이 0에 닿았을 때 불립니다.',
    defaultOrSpecial: '이 animation을 담은 timeline이 reverse될 때도 일어남',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onReverseCompleteParams',
    officialType: 'Array',
    role: 'onReverseComplete에 넘길 인자 목록입니다.',
    defaultOrSpecial: '공식 페이지에 기본값 명시 없음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onInterrupt',
    officialType: null,
    role: 'animation이 중간에 끊겼을 때 불립니다.',
    defaultOrSpecial: '정상 완료 시에는 불리지 않음',
    group: 'callback',
    ownedHere: false,
  },
  {
    name: 'onInterruptParams',
    officialType: null,
    role: 'onInterrupt에 넘길 인자 목록입니다.',
    defaultOrSpecial: '공식 설명문이 Array라고 밝히지만 타입 칸은 비어 있음',
    group: 'callback',
    ownedHere: false,
  },
]

/** 공식이 타입 칸을 비워 둔 항목 수를 화면에서 세어 "명시 없음"을 추측으로 채우지 않았음을 보인다. */
export const untypedVarCount = timelineVars.filter((item) => item.officialType === null).length
