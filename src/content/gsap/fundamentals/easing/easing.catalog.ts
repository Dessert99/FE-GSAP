/** 공식 Easing source 항목을 학습 섹션별 compact coverage 목록으로 보존한다. */
export const easingCoverageGroups = [
  {
    title: 'progress와 family',
    ids: ['EASE-S001', 'EASE-S002', 'EASE-S003', 'EASE-S004', 'EASE-S005', 'EASE-S006', 'EASE-S007', 'EASE-S008'],
  },
  {
    title: 'default와 외부 ease 경계',
    ids: ['EASE-S009', 'EASE-S010', 'EASE-S011', 'EASE-S012', 'EASE-S013', 'EASE-EX001'],
  },
  {
    title: '문자열 parsing과 이름 등록',
    ids: ['PARSE-S001', 'PARSE-S002', 'PARSE-S003', 'PARSE-S004', 'REGISTER-S001', 'REGISTER-S002', 'REGISTER-EX001'],
  },
  {
    title: '불연속 steps',
    ids: ['STEPS-S001', 'STEPS-S002', 'STEPS-S003', 'STEPS-S004', 'STEPS-EX001'],
  },
] as const

/** Core에서 바로 선택할 수 있는 공식 ease family를 빠짐없이 제공한다. */
export const coreEaseFamilies = ['none', 'power1', 'power2', 'power3', 'power4', 'back', 'bounce', 'circ', 'elastic', 'expo', 'sine', 'steps'] as const

/** 외부 package가 소유하는 ease를 Core 선택지와 섞지 않고 경계로 표시한다. */
export const externalEaseFamilies = ['EasePack: rough · slow · expoScale', 'CustomEase', 'CustomBounce', 'CustomWiggle'] as const
