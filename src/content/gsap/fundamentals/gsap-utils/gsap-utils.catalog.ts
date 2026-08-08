/** 공식 두 hub 문서에서 확인한 기술 item 47개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'gsap-utils' | 'utility-methods'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** gsap.utils 관문에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const gsapUtilsSourceItems: SourceItem[] = [
  { id: 'GU-01', officialItem: 'gsap.utils는 공식 문서에서 GSAP > properties 분류에 놓인 페이지다. 즉 호출하는 method가 아니라 gsap 객체에 달린 속성 하나로 소개된다.', source: 'gsap-utils', origin: 'official', sectionId: 'why-utils' },
  { id: 'GU-02', officialItem: 'signature 자리에 Type : Object 라고만 적혀 있다. 인자도 반환값도 적혀 있지 않다.', source: 'gsap-utils', origin: 'official', sectionId: 'why-utils' },
  { id: 'GU-03', officialItem: '"gsap.utils provides access to some surprisingly helpful utility functions." — 놀랄 만큼 쓸모 있는 utility 함수들로 들어가는 입구라고 소개한다.', source: 'gsap-utils', origin: 'official', sectionId: 'why-utils' },
  { id: 'GU-06', officialItem: '본문 위에 "Combining utility Methods"라는 제목의 영상이 실려 있다. 즉 공식이 강조하는 주제는 함수 하나하나가 아니라 조합이다.', source: 'gsap-utils', origin: 'official', sectionId: 'why-utils' },
  { id: 'UM-01', officialItem: 'Utility Methods는 "Useful features & tools" 분류의 허브 페이지이며, 제목이 gsap.utils가 아니라 Utility Methods다.', source: 'utility-methods', origin: 'official', sectionId: 'why-utils' },
  { id: 'UM-02', officialItem: '"GSAP\'s utility methods can be surprisingly helpful." — 같은 대상을 namespace가 아니라 method 모음의 관점에서 소개한다.', source: 'utility-methods', origin: 'official', sectionId: 'why-utils' },
  { id: 'UM-05', officialItem: 'Video 절이 따로 있고 캡션이 "combining utility methods"다. 두 공식 페이지가 같은 영상을 조합이라는 같은 주제로 싣고 있다.', source: 'utility-methods', origin: 'official', sectionId: 'why-utils' },

  { id: 'GU-04', officialItem: '"Note that many of them can optionally return FUNCTIONS so that they can be plugged directly into tweens, leveraging GSAP\'s function-based capabilities." — 여러 utility가 값 대신 함수를 돌려주도록 선택할 수 있고, 그 함수를 tween에 바로 꽂을 수 있다.', source: 'gsap-utils', origin: 'official', sectionId: 'two-modes' },
  { id: 'GU-05', officialItem: '"In that case, they\'ll get called once for each target rather than just using the same end value for them all." — 함수를 돌려준 경우 모든 target에 같은 끝값을 쓰는 대신 target마다 한 번씩 호출된다.', source: 'gsap-utils', origin: 'official', sectionId: 'two-modes' },
  { id: 'UM-03', officialItem: 'Utility Methods 페이지도 같은 문장으로 "many of them can optionally return FUNCTIONS ... plugged directly into tweens"를 반복한다.', source: 'utility-methods', origin: 'official', sectionId: 'two-modes' },
  { id: 'UM-04', officialItem: 'Utility Methods 페이지도 "they\'ll get called once for each target rather than just using the same end value for them all"을 그대로 반복한다.', source: 'utility-methods', origin: 'official', sectionId: 'two-modes' },

  { id: 'GU-07', officialItem: '본문 전체가 Utility · Description 두 열짜리 표 하나이며 행이 17개다. 각 행의 이름이 그 함수의 전용 문서로 연결된다.', source: 'gsap-utils', origin: 'official', sectionId: 'catalog-map' },
  { id: 'UM-06', officialItem: '"Available Utils" 절이 사용할 수 있는 utility를 이름과 설명으로 나열하며 항목이 17개다. 이름은 gsap.utils 표와 같지만 뒤의 괄호가 없는 형태로 적혀 있다.', source: 'utility-methods', origin: 'official', sectionId: 'catalog-map' },

  { id: 'GU-09', officialItem: 'clamp() — "Clamp a value to fit within a specific range (ex: clamp(0, 100, -12) --> 0)."', source: 'gsap-utils', origin: 'official', sectionId: 'range-family' },
  { id: 'GU-14', officialItem: 'normalize() — "Map a number within a range to a progress between 0 to 1 (ex: normalize(100, 200, 150) --> 0.5)."', source: 'gsap-utils', origin: 'official', sectionId: 'range-family' },
  { id: 'GU-13', officialItem: 'mapRange() — "Map one range to another (ex: mapRange(-10, 10, 0, 100, 5) --> 75)."', source: 'gsap-utils', origin: 'official', sectionId: 'range-family' },
  { id: 'GU-12', officialItem: 'interpolate() — "Interpolate between almost any two values (numbers, colors, strings, arrays, complex strings, or even objects with multiple properties) (ex: interpolate("red", "blue", 0.5) --> "rgba(128,0,128,1)")."', source: 'gsap-utils', origin: 'official', sectionId: 'range-family' },
  { id: 'GU-20', officialItem: 'splitColor() — "Split any color into its red, green, blue (and optionally alpha) components. Or hue, saturation, and brightness. (ex: splitColor("red") --> [255, 0, 0])."', source: 'gsap-utils', origin: 'official', sectionId: 'range-family' },
  { id: 'UM-08', officialItem: 'clamp — "Clamp a value to fit within a specific range clamp(0, 100, -12) -> 0" (gsap.utils 표와 달리 ex 표기와 괄호가 없다).', source: 'utility-methods', origin: 'official', sectionId: 'range-family' },
  { id: 'UM-13', officialItem: 'normalize — "Map a number within a range to a progress between 0 to 1 ex normalize(100, 200, 150) --> 0.5)"', source: 'utility-methods', origin: 'official', sectionId: 'range-family' },
  { id: 'UM-12', officialItem: 'mapRange — 이름이 "mapRange : Number"로 적혀 있어 17개 중 유일하게 반환 타입을 이름 옆에 밝힌다. 설명은 "Map one range to another ex mapRange(-10, 10, 0, 100, 5) --> 75)"다.', source: 'utility-methods', origin: 'official', sectionId: 'range-family' },
  { id: 'UM-11', officialItem: 'interpolate — "Interpolate between almost any two values (numbers, colors, strings, arrays, complex strings, or even objects with multiple properties) ex interpolate("red", "blue", 0.5) --> "rgba(128,0,128,1)")."', source: 'utility-methods', origin: 'official', sectionId: 'range-family' },
  { id: 'UM-19', officialItem: 'splitColor — "Split any color into its red, green, blue (and optionally alpha) components. Or hue, saturation, and brightness. ex splitColor("red") --> [255, 0, 0])"', source: 'utility-methods', origin: 'official', sectionId: 'range-family' },

  { id: 'GU-15', officialItem: 'pipe() — "Sequence a number of function calls, passing the result of each into the next (ex: pipe(clamp(0, 100), snap(5))(8) --> 10)."', source: 'gsap-utils', origin: 'official', sectionId: 'compose-family' },
  { id: 'GU-22', officialItem: 'unitize() — "Wraps around another utility function, allowing it to accept values with units like "20px" or "50%", stripping off the unit when feeding into the wrapped utility function, and then adding it back to the result (ex. var wrap = gsap.utils.unitize( gsap.utils.wrap(0, 100) ); wrap("150px"); --> "50px"). Or force a specific unit (ex: unitize( gsap.utils.mapRange(-10, 10, 0, 100), "%"); --> always returns with "%")."', source: 'gsap-utils', origin: 'official', sectionId: 'compose-family' },
  { id: 'GU-11', officialItem: 'getUnit() — "Get the unit of a string (ex: getUnit("30px") --> "px")."', source: 'gsap-utils', origin: 'official', sectionId: 'compose-family' },
  { id: 'GU-08', officialItem: 'checkPrefix() — "Prefixes the provided CSS property if necessary (ex: checkPrefix("transform") --> "msTransform" when run in IE9; returns null if the property isn\'t supported at all)."', source: 'gsap-utils', origin: 'official', sectionId: 'compose-family' },
  { id: 'UM-14', officialItem: 'pipe — "Sequence a number of function calls, passing the result of each into the next ex pipe(clamp(0, 100), snap(5))(8) --> 10"', source: 'utility-methods', origin: 'official', sectionId: 'compose-family' },
  { id: 'UM-21', officialItem: 'unitize — gsap.utils 표와 같은 내용이지만 예제의 세미콜론 위치가 다르다: "var wrap = gsap.utils.unitize( gsap.utils.wrap(0, 100) ) wrap("150px"); --> "50px"."', source: 'utility-methods', origin: 'official', sectionId: 'compose-family' },
  { id: 'UM-10', officialItem: 'getUnit — "Get the unit of a string getUnit("30px") --> "px"."', source: 'utility-methods', origin: 'official', sectionId: 'compose-family' },
  { id: 'UM-07', officialItem: 'checkPrefix — "Prefixes the proved CSS property if necessary" 한 문장뿐이다. gsap.utils 표에 있는 IE9 예제와 "지원하지 않으면 null" 문장이 여기에는 없고, provided가 proved로 적혀 있다.', source: 'utility-methods', origin: 'official', sectionId: 'compose-family' },

  { id: 'GU-21', officialItem: 'toArray() — "Convert almost any array-like object to an array, including selector text! (ex: toArray(".class") --> [element1, element2])."', source: 'gsap-utils', origin: 'official', sectionId: 'collection-family' },
  { id: 'GU-17', officialItem: 'selector() — "Returns a selector function that is scoped to a particular Element (or React ref or Angular ElementRef). (ex: selector(myElement))" — 표에서 function만 굵게 강조돼 있다.', source: 'gsap-utils', origin: 'official', sectionId: 'collection-family' },
  { id: 'GU-16', officialItem: 'random() — "Generate a random number based on parameters (ex: random(0, 100, 5) --> 65) or randomly pick an element from in a supplied array (ex. random(["red", "green", "blue"]) --> "red")."', source: 'gsap-utils', origin: 'official', sectionId: 'collection-family' },
  { id: 'GU-18', officialItem: 'shuffle() — "Shuffles the contents of an array in-place. (ex: shuffle([1, 2, 3, 4, 5]) --> [4, 2, 1, 5, 3])" — 17개 중 유일하게 in-place라고 밝힌 항목이다.', source: 'gsap-utils', origin: 'official', sectionId: 'collection-family' },
  { id: 'UM-20', officialItem: 'toArray — "Convert almost any array-like object to an array, including selector text! ex - toArray(".class") --> [element1, element2]."', source: 'utility-methods', origin: 'official', sectionId: 'collection-family' },
  { id: 'UM-16', officialItem: 'selector — "Returns a selector function that is scoped to a particular Element (or React ref or Angular ElementRef). ex selector(myElement)"', source: 'utility-methods', origin: 'official', sectionId: 'collection-family' },
  { id: 'UM-15', officialItem: 'random — "Generate a random number based on parameters ex random(0, 100, 5) --> 65) or randomly pick an element from in a supplied array ex. random(["red", "green", "blue"]) --> "red""', source: 'utility-methods', origin: 'official', sectionId: 'collection-family' },
  { id: 'UM-17', officialItem: 'shuffle — "Shuffles the contents of an array in-place. ex shuffle([1, 2, 3, 4, 5]) --> [4, 2, 1, 5, 3])"', source: 'utility-methods', origin: 'official', sectionId: 'collection-family' },

  { id: 'GU-10', officialItem: 'distribute() — "Distribute a value among an array of objects either linearly or according to their position in a grid, optionally with easing applied." — 17개 중 유일하게 예제가 없는 행이다.', source: 'gsap-utils', origin: 'official', sectionId: 'spread-family' },
  { id: 'GU-19', officialItem: 'snap() — "Snap a value to either an increment (ex: snap(5, 13) --> 15) or to the closest value in an array (ex: snap([0, 5, 10], 7) --> 5)."', source: 'gsap-utils', origin: 'official', sectionId: 'spread-family' },
  { id: 'GU-23', officialItem: 'wrap() — "Place a number into a specified range such that when it exceeds the maximum, it wraps back to the start and if it is less than the minimum, it wraps to the end (ex. wrap(5, 10, 12) --> 7). Or cycle through an Array such that when the provided index is greater than the length of the array, it wraps back to the start (ex: wrap([0, 10, 20], 4) --> 10)."', source: 'gsap-utils', origin: 'official', sectionId: 'spread-family' },
  { id: 'GU-24', officialItem: 'wrapYoyo() — "Place a number into a specified range such that when it exceeds the maximum, it yoyos back toward the start and if it is less than the minimum, it yoyos forward to the end (ex. wrapYoyo(5, 10, 12) --> 8). Or cycle through an Array ... (ex: wrap([0, 10, 20, 30], 4) --> 20)" — 배열 예제의 함수 이름이 wrapYoyo가 아니라 wrap으로 적혀 있다.', source: 'gsap-utils', origin: 'official', sectionId: 'spread-family' },
  { id: 'UM-09', officialItem: 'distribute — "Distribute a value among an array of objects either linearly or according to their position in a grid, optionally with easing applied." (gsap.utils 표와 문장이 같다.)', source: 'utility-methods', origin: 'official', sectionId: 'spread-family' },
  { id: 'UM-18', officialItem: 'snap — "Snap a value to either an increment ex snap(5, 13) --> 15 or to the closest value in an array ex snap([0, 5, 10], 7) --> 5."', source: 'utility-methods', origin: 'official', sectionId: 'spread-family' },
  { id: 'UM-22', officialItem: 'wrap — "Returns the next item in an array or number in a range after the given index. Or returns a function that returns that object or value if no index is given." — gsap.utils 표의 "범위를 넘으면 되돌린다" 설명과 문장이 완전히 다르고, 예제 없이 함수 반환 모드를 함께 언급한다.', source: 'utility-methods', origin: 'official', sectionId: 'spread-family' },
  { id: 'UM-23', officialItem: 'wrapYoyo — "Returns the element in an Array associated with the provided index or a number in a provided range, going backwards once the last index is reached (yoyo-ing). Or if no value to wrap is provided, it returns a reusable function that will do the wrapping accordingly when it\'s fed a value." — 역시 gsap.utils 표와 문장이 완전히 다르다.', source: 'utility-methods', origin: 'official', sectionId: 'spread-family' },

  { id: 'UT-P1', officialItem: 'GSAP 3.15.0에서 Object.keys(gsap.utils)는 정확히 17개이고, 이름 집합이 두 공식 hub의 17개 목록과 완전히 같다. 문서에만 있고 없는 utility도, 문서에 없는데 존재하는 utility도 0개다. 두 공식 페이지 모두 "이게 전부인가"를 밝히지 않는다.', source: 'gsap-utils', origin: 'implementation', sectionId: 'catalog-map' },
  { id: 'UT-P2', officialItem: 'gsap.utils 자체는 typeof "object"이며 호출할 수 없다. 그 안의 17개는 모두 typeof "function"이다. 공식은 Type : Object라고만 적고 구성원의 타입을 밝히지 않는다.', source: 'gsap-utils', origin: 'implementation', sectionId: 'catalog-map' },
  { id: 'UT-P3', officialItem: 'gsap.utils 표 17행 중 DOM·무작위 없이 재현할 수 있는 11행의 예제 표현식 14개를 실행하면 문서에 적힌 결과가 하나도 어긋나지 않는다. 나머지 6행(checkPrefix·distribute·random·selector·shuffle·toArray)은 브라우저가 필요하거나 무작위이거나 예제가 없어 제외했다.', source: 'gsap-utils', origin: 'implementation', sectionId: 'catalog-map' },
  { id: 'UT-P5', officialItem: '인자를 모두 생략하고 호출하면 17개 중 11개(clamp·distribute·interpolate·mapRange·normalize·pipe·selector·snap·unitize·wrap·wrapYoyo)가 함수를 돌려주고, 4개(getUnit·random·splitColor·toArray)는 값을 돌려주며, 2개(checkPrefix·shuffle)는 TypeError를 던진다. 공식은 "many of them"이라고만 적고 개수도 이름도 밝히지 않는다.', source: 'gsap-utils', origin: 'implementation', sectionId: 'two-modes' },
  { id: 'UT-P4', officialItem: 'wrap·wrapYoyo의 두 공식 설명이 서로 다르지만 실행 결과는 gsap.utils 표의 숫자 예제와 일치한다: wrap(5, 10, 12) → 7, wrap([0, 10, 20], 4) → 10, wrapYoyo(5, 10, 12) → 8, wrapYoyo([0, 10, 20, 30], 4) → 20. 두 설명은 모순이 아니라 같은 동작을 값 관점과 index 관점에서 적은 것이다.', source: 'utility-methods', origin: 'implementation', sectionId: 'spread-family' },
]
