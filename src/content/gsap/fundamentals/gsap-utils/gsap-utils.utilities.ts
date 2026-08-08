/** 두 공식 hub가 각각 나열한 utility 17개를 이름·설명·예제·소유 레슨으로 고정한다. */

/** 지금 풀려는 문제로 utility를 찾게 해 주는 네 갈래다 — 공식 분류가 아니라 이 페이지의 학습용 묶음이다. */
export type UtilityFamily = 'range' | 'compose' | 'collection' | 'spread'

/** utility 한 개에 대해 두 공식 페이지가 각각 말한 것과, 전체 계약을 소유한 레슨을 한 행에 담는다. */
export type UtilityEntry = {
  name: string
  href: string
  family: UtilityFamily
  /** gsap.utils 표의 Description 칸을 옮긴 한 줄이다. */
  gsapUtilsSummary: string
  /** Utility Methods 쪽 Available Utils 항목을 옮긴 한 줄 — 같은 함수라도 문장이 다르다. */
  utilityMethodsSummary: string
  /** gsap.utils 표가 함께 실은 예제 — 없는 행은 null로 두고 없다고 표시한다. */
  officialExample: string | null
  /** 전체 overload와 경계값을 소유한 학습 페이지의 이름이다. */
  owner: string
  /** routes.ts에 등록된 레슨만 링크한다. 아직 없는 레슨은 null로 두고 이름만 밝힌다. */
  ownerRoute: string | null
}

/** 네 갈래가 각각 어떤 문제를 푸는지 — 목록을 외우지 않고 문제에서 찾아 들어가게 한다. */
export const utilityFamilies: { id: UtilityFamily; label: string; question: string }[] = [
  { id: 'range', label: '범위와 보간', question: '숫자를 어떤 범위 안으로 넣거나 다른 범위로 옮기고 싶다' },
  { id: 'compose', label: '조합과 단위', question: '계산 함수 여러 개를 잇거나 "px" 같은 단위를 지키고 싶다' },
  { id: 'collection', label: '대상 모으기와 고르기', question: '무엇을 움직일지 배열로 모으거나 그중 하나를 고르고 싶다' },
  { id: 'spread', label: '나눠 주기와 되돌리기', question: '여러 개에 값을 나눠 주거나 값을 범위 안으로 되돌리고 싶다' },
]

/** 두 공식 hub가 나열한 17개 전부 — 표 순서(알파벳)를 그대로 지켜 빠짐을 눈으로 세게 한다. */
export const utilityEntries: UtilityEntry[] = [
  {
    name: 'checkPrefix()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix()',
    family: 'compose',
    gsapUtilsSummary: '필요하면 넘긴 CSS property에 vendor 접두사를 붙여 돌려줍니다. 예로 IE9에서 checkPrefix("transform")은 "msTransform"이 되고, 아예 지원하지 않는 property면 null을 돌려줍니다.',
    utilityMethodsSummary: '"필요하면 넘긴 CSS property에 접두사를 붙인다" 한 문장뿐입니다. 원문은 provided를 proved로 잘못 적었고, 예제와 null 반환 문장도 없습니다.',
    officialExample: 'checkPrefix("transform") --> "msTransform" (IE9)',
    owner: 'pipeline·단위 레슨 (utility-pipelines-units)',
    ownerRoute: null,
  },
  {
    name: 'clamp()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp()',
    family: 'range',
    gsapUtilsSummary: '값이 특정 범위 안에 들어오도록 잘라 냅니다.',
    utilityMethodsSummary: '같은 문장이지만 예제를 ex 표기 없이 "clamp(0, 100, -12) -> 0"으로 적었습니다.',
    officialExample: 'clamp(0, 100, -12) --> 0',
    owner: '범위·보간 레슨 (range-interpolation)',
    ownerRoute: null,
  },
  {
    name: 'distribute()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute()',
    family: 'spread',
    gsapUtilsSummary: '객체 배열에 값을 나눠 줍니다. 일직선으로 나누거나 grid 안의 위치에 따라 나누며, 원하면 easing을 적용합니다.',
    utilityMethodsSummary: '문장이 gsap.utils 표와 완전히 같습니다. 17개 중 두 페이지의 설명이 글자까지 일치하는 유일한 항목입니다.',
    officialExample: null,
    owner: 'distribute 레슨 (utility-distribute)',
    ownerRoute: null,
  },
  {
    name: 'getUnit()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit()',
    family: 'compose',
    gsapUtilsSummary: '문자열에서 단위만 뽑아냅니다.',
    utilityMethodsSummary: '같은 문장을 ex 표기 없이 적었습니다.',
    officialExample: 'getUnit("30px") --> "px"',
    owner: 'pipeline·단위 레슨 (utility-pipelines-units)',
    ownerRoute: null,
  },
  {
    name: 'interpolate()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate()',
    family: 'range',
    gsapUtilsSummary: '거의 모든 두 값 사이를 보간합니다. 숫자, 색, 문자열, 배열, 복합 문자열은 물론 여러 property를 가진 객체까지 포함합니다.',
    utilityMethodsSummary: '괄호 표기만 다르고 문장은 같습니다.',
    officialExample: 'interpolate("red", "blue", 0.5) --> "rgba(128,0,128,1)"',
    owner: '범위·보간 레슨 (range-interpolation)',
    ownerRoute: null,
  },
  {
    name: 'mapRange()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange()',
    family: 'range',
    gsapUtilsSummary: '한 범위를 다른 범위로 옮깁니다.',
    utilityMethodsSummary: '이름이 "mapRange : Number"로 적혀 있습니다. 17개 중 반환 타입을 이름 옆에 밝힌 유일한 항목입니다.',
    officialExample: 'mapRange(-10, 10, 0, 100, 5) --> 75',
    owner: '범위·보간 레슨 (range-interpolation)',
    ownerRoute: null,
  },
  {
    name: 'normalize()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize()',
    family: 'range',
    gsapUtilsSummary: '범위 안의 숫자를 0과 1 사이의 진행도로 옮깁니다.',
    utilityMethodsSummary: '같은 문장을 ex 표기 없이 적었습니다.',
    officialExample: 'normalize(100, 200, 150) --> 0.5',
    owner: '범위·보간 레슨 (range-interpolation)',
    ownerRoute: null,
  },
  {
    name: 'pipe()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe()',
    family: 'compose',
    gsapUtilsSummary: '함수 호출 여러 개를 순서대로 잇고, 앞 함수의 결과를 뒤 함수의 입력으로 넘깁니다.',
    utilityMethodsSummary: '같은 문장을 ex 표기 없이 적었습니다.',
    officialExample: 'pipe(clamp(0, 100), snap(5))(8) --> 10',
    owner: 'pipeline·단위 레슨 (utility-pipelines-units)',
    ownerRoute: null,
  },
  {
    name: 'random()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/random()',
    family: 'collection',
    gsapUtilsSummary: '인자에 따라 무작위 숫자를 만들거나, 넘긴 배열에서 원소 하나를 무작위로 고릅니다.',
    utilityMethodsSummary: '괄호 표기만 다르고 문장은 같습니다.',
    officialExample: 'random(0, 100, 5) --> 65 · random(["red", "green", "blue"]) --> "red"',
    owner: '모음·무작위 레슨 (utility-collections-random)',
    ownerRoute: null,
  },
  {
    name: 'selector()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/selector()',
    family: 'collection',
    gsapUtilsSummary: '특정 Element(또는 React ref, Angular ElementRef)로 범위가 좁혀진 selector 함수를 돌려줍니다. 표에서 function만 굵게 강조돼 있습니다.',
    utilityMethodsSummary: '같은 문장을 ex 표기 없이 적었고 function 강조도 없습니다.',
    officialExample: 'selector(myElement)',
    owner: '한 영역을 함께 되돌리기 레슨 (gsap-context)',
    ownerRoute: '/fundamentals/gsap-context',
  },
  {
    name: 'shuffle()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle()',
    family: 'collection',
    gsapUtilsSummary: '배열의 내용을 제자리에서(in-place) 섞습니다. 17개 중 원본을 바꾼다고 밝힌 유일한 항목입니다.',
    utilityMethodsSummary: '괄호 표기만 다르고 문장은 같습니다. in-place라는 말도 그대로입니다.',
    officialExample: 'shuffle([1, 2, 3, 4, 5]) --> [4, 2, 1, 5, 3]',
    owner: '모음·무작위 레슨 (utility-collections-random)',
    ownerRoute: null,
  },
  {
    name: 'snap()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/snap()',
    family: 'spread',
    gsapUtilsSummary: '값을 일정한 증분에 맞추거나, 배열에서 가장 가까운 값으로 붙입니다.',
    utilityMethodsSummary: '같은 문장을 ex 표기 없이 적었습니다.',
    officialExample: 'snap(5, 13) --> 15 · snap([0, 5, 10], 7) --> 5',
    owner: 'modifier·snap·wrap 레슨 (modifiers-snap-wrap)',
    ownerRoute: '/fundamentals/modifiers-snap-wrap',
  },
  {
    name: 'splitColor()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor()',
    family: 'range',
    gsapUtilsSummary: '색을 red·green·blue(원하면 alpha까지) 성분으로 쪼갭니다. 또는 hue·saturation·brightness로 쪼갭니다.',
    utilityMethodsSummary: '괄호 표기만 다르고 문장은 같습니다.',
    officialExample: 'splitColor("red") --> [255, 0, 0]',
    owner: '범위·보간 레슨 (range-interpolation)',
    ownerRoute: null,
  },
  {
    name: 'toArray()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray()',
    family: 'collection',
    gsapUtilsSummary: '배열 비슷한 것 거의 전부를 진짜 배열로 바꿉니다. selector 문자열도 포함합니다.',
    utilityMethodsSummary: '같은 문장을 "ex -" 표기로 적었습니다.',
    officialExample: 'toArray(".class") --> [element1, element2]',
    owner: '모음·무작위 레슨 (utility-collections-random)',
    ownerRoute: null,
  },
  {
    name: 'unitize()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize()',
    family: 'compose',
    gsapUtilsSummary: '다른 utility 함수를 감싸서 "20px"이나 "50%"처럼 단위가 붙은 값을 받게 합니다. 안쪽 함수에 넣기 전에 단위를 떼고, 결과에 다시 붙입니다. 특정 단위를 강제할 수도 있습니다.',
    utilityMethodsSummary: '내용은 같지만 예제의 세미콜론 위치가 달라 그대로 복사하면 문법이 맞지 않습니다.',
    officialExample: 'unitize(wrap(0, 100))("150px") --> "50px"',
    owner: 'pipeline·단위 레슨 (utility-pipelines-units)',
    ownerRoute: null,
  },
  {
    name: 'wrap()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()',
    family: 'spread',
    gsapUtilsSummary: '숫자를 정한 범위 안에 놓습니다. 최대를 넘으면 처음으로 돌아가고 최소보다 작으면 끝으로 갑니다. 배열이면 index가 길이를 넘을 때 처음으로 돌아가며 순환합니다.',
    utilityMethodsSummary: '문장이 완전히 다릅니다. "주어진 index 다음 항목이나 범위 안 숫자를 돌려주고, index를 주지 않으면 그 값을 돌려주는 함수를 돌려준다"고 적혀 있습니다.',
    officialExample: 'wrap(5, 10, 12) --> 7 · wrap([0, 10, 20], 4) --> 10',
    owner: 'modifier·snap·wrap 레슨 (modifiers-snap-wrap)',
    ownerRoute: '/fundamentals/modifiers-snap-wrap',
  },
  {
    name: 'wrapYoyo()',
    href: 'https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo()',
    family: 'spread',
    gsapUtilsSummary: 'wrap과 같지만 되돌아오는 방식이 다릅니다. 최대를 넘으면 처음으로 점프하지 않고 왔던 길을 되짚어 갑니다. 배열 예제의 함수 이름이 wrapYoyo가 아니라 wrap으로 잘못 적혀 있습니다.',
    utilityMethodsSummary: '문장이 완전히 다릅니다. "마지막 index에 닿으면 거꾸로 돌아가며(yoyo-ing) 항목이나 숫자를 돌려주고, 값을 주지 않으면 재사용 가능한 함수를 돌려준다"고 적혀 있습니다.',
    officialExample: 'wrapYoyo(5, 10, 12) --> 8 · wrapYoyo([0, 10, 20, 30], 4) --> 20',
    owner: 'modifier·snap·wrap 레슨 (modifiers-snap-wrap)',
    ownerRoute: '/fundamentals/modifiers-snap-wrap',
  },
]
