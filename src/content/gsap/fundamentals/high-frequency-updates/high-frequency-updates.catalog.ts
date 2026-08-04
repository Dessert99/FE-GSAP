/** 공식 세 문서에서 확인한 기술 item 46개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'get-property' | 'quick-setter' | 'quick-to'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 고빈도 갱신 세 API에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const highFrequencyUpdatesSourceItems: SourceItem[] = [
  { id: 'QS-02', officialItem: '같은 객체(또는 객체 집합)에 gsap.set()을 여러 번 호출하게 되면 — "mousemove" 이벤트 안처럼 — quickSetter 함수를 만들어 대신 쓰는 것으로 성능을 50% - 250% 높일 수 있다.', source: 'quick-setter', origin: 'official', sectionId: 'input-storm' },
  { id: 'QT-02', officialItem: '같은 target의 같은 numeric property에 gsap.to()를 여러 번 호출하게 되면 — "mousemove" 이벤트 안처럼 — quickTo() 함수를 만들어 성능을 높일 수 있다.', source: 'quick-to', origin: 'official', sectionId: 'input-storm' },

  { id: 'GP-01', officialItem: '공식 반환 표기는 `Returns : *`이며 고정된 한 가지 타입이 아니다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-02', officialItem: '요청한 property의 값을 가능하면 number로 돌려주고, unit을 지정하면 그 unit이 숫자에 붙어 string이 된다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-03', officialItem: '값이 존재하지 않으면 null을 돌려준다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-04', officialItem: '문서 첫 코드 블록이 반환 형식 세 가지를 보여준다: gsap.getProperty("#id", "x")는 20, gsap.getProperty("#id", "x", "px")는 "20px", gsap.getProperty("#id", "backgroundColor")는 "rgb(255, 128, 0)".', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-05', officialItem: 'getProperty()는 아무 property의 현재 값이나 쉽게 가져오는 방법이며, target이 DOM element라면 특정 unit으로 변환까지 시킬 수 있다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-06', officialItem: 'DOM element에서는 inline CSS → .getComputedStyle() CSS → element 자체의 property → element의 attribute 순으로 확인하고, 먼저 찾는 즉시 그 값을 돌려준다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-07', officialItem: 'unit 파라미터를 생략하면 NUMBER를 돌려준다(parseFloat()이 숫자를 주는 단순한 값에 한해). "top"·"left"·"x"가 기술적으로 "20px"이어도 단위 없는 20으로 돌아온다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-08', officialItem: '숫자로 돌려주는 이유는 애니메이션에서 숫자를 다루는 일이 아주 흔하고, 실무에서 "20px" 같은 값을 받아 매번 parseFloat()으로 감싸는 것이 번거롭기 때문이다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-09', officialItem: 'unit을 포함하고 싶으면 gsap.getProperty("#element", "x", "px")처럼 그 unit을 넘기면 되고, 그러면 그에 맞는 string을 돌려준다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-10', officialItem: 'Examples 절은 target에 selector text와 element를 모두 넘길 수 있고 "em" 같은 특정 unit으로 변환할 수 있음을 보여준다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },
  { id: 'GP-11', officialItem: 'property 파라미터를 생략하면 그 target의 property를 반복해 가져올 수 있는 getter 함수를 돌려준다. 공식 예제는 let getter = gsap.getProperty("#id"); var x = getter("x"), y = getter("y", "em"); 이다.', source: 'get-property', origin: 'official', sectionId: 'read-current-value' },

  { id: 'QS-01', officialItem: 'gsap.quickSetter()의 공식 반환 표기는 `Returns : Function`이다.', source: 'quick-setter', origin: 'official', sectionId: 'three-fast-paths' },
  { id: 'QS-03', officialItem: 'quickSetter는 특정 target(들)의 특정 property에 묶인 최적화 함수이며, 데이터를 그 property로 직접 흘려보내고 일반 gsap.set() 호출의 편의 작업을 건너뛴다.', source: 'quick-setter', origin: 'official', sectionId: 'three-fast-paths' },
  { id: 'QS-10', officialItem: 'note — gsap.set()을 쓰기를 두려워하지 마라. 대부분의 경우 quickSetter로 바꿔도 실제 성능 차이를 느끼지 못하고 gsap.set()은 가치 있는 편의를 많이 준다. quickSetter는 갱신이 아주 많은 성능 임계 상황을 위한 hyper-optimized 도구다.', source: 'quick-setter', origin: 'official', sectionId: 'three-fast-paths' },
  { id: 'QS-13', officialItem: 'quickSetter는 값을 즉시 설정하는 것이 목적이므로, 새 값으로 animate하고 싶다면 gsap.quickTo() 쪽을 보라고 안내한다.', source: 'quick-setter', origin: 'official', sectionId: 'three-fast-paths' },
  { id: 'QT-01', officialItem: 'gsap.quickTo()의 공식 반환 표기는 `Returns : Function`이다.', source: 'quick-to', origin: 'official', sectionId: 'three-fast-paths' },
  { id: 'QT-03', officialItem: 'quickTo는 하나의 특정 numeric property에 묶인 최적화 함수이며, 새 숫자를 그 property로 직접 흘려보내고 일반 gsap.to() 호출의 편의 작업을 건너뛴다.', source: 'quick-to', origin: 'official', sectionId: 'three-fast-paths' },
  { id: 'QT-12', officialItem: '선택적인 3번째 파라미터는 tween vars 객체이며 duration, ease 같은 tween 관련 설정을 지정하는 자리다.', source: 'quick-to', origin: 'official', sectionId: 'three-fast-paths' },

  { id: 'QS-04', officialItem: 'quickSetter가 건너뛰는 것 — 단위 변환과 단위 자동 부착. 다만 quickSetter에 unit을 지정하면 넣는 숫자에 그 단위가 항상 붙는다.', source: 'quick-setter', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QS-05', officialItem: 'quickSetter가 건너뛰는 것 — 상대값(Relative values).', source: 'quick-setter', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QS-06', officialItem: 'quickSetter가 건너뛰는 것 — 함수 기반 값(Function-based values).', source: 'quick-setter', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QS-07', officialItem: 'quickSetter가 건너뛰는 것 — "random()" 파싱.', source: 'quick-setter', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QS-08', officialItem: 'quickSetter가 건너뛰는 것 — SVG element의 transformOrigin처럼 property별 브라우저 불일치를 메우는 특수 우회. 그래서 transformOrigin용 quickSetter를 만드는 것은 권장되지 않는다.', source: 'quick-setter', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QS-09', officialItem: 'quickSetter가 건너뛰는 것 — property 이름 alias 변환. transform에서 "x"는 동작하지만 "translateX"는 동작하지 않는다.', source: 'quick-setter', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QT-04', officialItem: 'quickTo가 건너뛰는 것 — 단위 변환과 단위 자동 부착.', source: 'quick-to', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QT-05', officialItem: 'quickTo가 건너뛰는 것 — 상대값(Relative values).', source: 'quick-to', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QT-06', officialItem: 'quickTo가 건너뛰는 것 — 함수 기반 값(Function-based values).', source: 'quick-to', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QT-07', officialItem: 'quickTo가 건너뛰는 것 — "random()" 파싱.', source: 'quick-to', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QT-08', officialItem: 'quickTo가 건너뛰는 것 — 플러그인 파싱. target의 직접 property나 CSS 관련 property에만 쓸 수 있고, 예를 들어 attr: 값이나 morphSVG 등은 쓸 수 없다.', source: 'quick-to', origin: 'official', sectionId: 'skipped-conveniences' },
  { id: 'QT-09', officialItem: 'quickTo가 건너뛰는 것 — property 이름 alias 변환. transform에서 "x"는 동작하지만 "translateX"는 동작하지 않는다.', source: 'quick-to', origin: 'official', sectionId: 'skipped-conveniences' },

  { id: 'QT-10', officialItem: '함수에 새 숫자를 넘길 때마다 사실상 애니메이션을 다시 시작해 그 새 값으로 방향을 바꾼다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-11', officialItem: '(재사용되는) Tween 인스턴스를 돌려준다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-13', officialItem: '공식 Example은 xTo·yTo를 duration 0.4, ease "power3"로 만들어 두고 #container의 "mousemove"에서 xTo(e.pageX), yTo(e.pageY)만 호출한다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-15', officialItem: 'quickTo 문서는 Mouse Follower Demo를 게시한다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-16', officialItem: '기본적으로 tween 안에서 현재 progress 시점의 현재 값에서 출발한다. 성능을 최대화하려는 의도이므로 target의 현재 값을 실제로 확인하지는 않는다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-17', officialItem: '2번째 파라미터로 숫자 시작값을 넘겨 그 기본 동작을 덮어쓸 수 있다. xTo(100)은 tween 내부 현재 값에서, xTo(100, 500)은 500에서 출발한다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-18', officialItem: 'tween에 접근해야 하면 결과 함수의 .tween property를 쓴다. 공식 예제는 xTo.tween.pause()로 일시정지한다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QT-19', officialItem: '그것은 일반 Tween 인스턴스이므로 delay()를 제외한 어떤 메서드·property든 활용할 수 있다.', source: 'quick-to', origin: 'official', sectionId: 'follow-the-input' },
  { id: 'QS-12', officialItem: 'quickSetter 문서는 Mouse Follower Demo를 게시하고, 이어서 quickTo를 쓴 mouse follower demo도 함께 게시한다.', source: 'quick-setter', origin: 'official', sectionId: 'follow-the-input' },

  { id: 'QS-11', officialItem: '값을 하나만 받으므로 pipe() 끝에 quickSetter를 붙여 clamp·snap 같은 utility 뒤에 둘 수 있다. 공식 예제는 clamp(0, 100) → snap(5) → quickSetter("#id", "x", "px")이고, xSetter(150)은 translateX(100px), xSetter(3)은 5px가 된다.', source: 'quick-setter', origin: 'official', sectionId: 'pipe-and-multi-value' },
  { id: 'QT-14', officialItem: '값을 하나만 받으므로 pipe() 끝에 quickTo를 붙일 수 있다. 공식 예제는 clamp(0, 100) → snap(5) → quickTo("#id", "x", {duration: 0.8, ease: "power3"})이고, xTo(150)은 translateX(100px)로, xTo(3)은 5px로 animate한다.', source: 'quick-to', origin: 'official', sectionId: 'pipe-and-multi-value' },
  { id: 'QS-14', officialItem: 'property를 "css"로 두고 값에 객체를 넘기면 CSSPlugin의 이점(상대값, "random()" 파싱 등)과 여러 property 동시 적용을 얻는다. 공식 예제는 var boxSet = gsap.quickSetter("#box", "css"); boxSet({ x: "+=100", y: "random(-100, 100)" }); 이다.', source: 'quick-setter', origin: 'official', sectionId: 'pipe-and-multi-value' },
  { id: 'QS-15', officialItem: '같은 기법이 attribute에도 통한다("attr" 사용). 공식 예제는 var circleSet = gsap.quickSetter("#circle", "attr"); circleSet({ cx: "+=100", cy: "random(-100, 100)" }); 이다.', source: 'quick-setter', origin: 'official', sectionId: 'pipe-and-multi-value' },
  { id: 'QS-16', officialItem: '다만 이 방식은 gsap.quickSetter("#box", "x", "px")처럼 특정 property를 지정할 때만큼의 성능 향상을 주지는 못한다. 그래도 표준 gsap.set()보다는 빠르다.', source: 'quick-setter', origin: 'official', sectionId: 'pipe-and-multi-value' },

  { id: 'HFU-P1', officialItem: '같은 값을 50번 갱신하면 globalTimeline에 gsap.to()는 Tween 50개, quickTo 함수는 1개, quickSetter 함수는 0개를 남긴다. 공식 문서는 "성능이 좋아진다"까지만 적고 남는 Tween 수를 밝히지 않는다.', source: 'quick-to', origin: 'implementation', sectionId: 'input-storm' },
  { id: 'HFU-P4', officialItem: 'target이 DOM element가 아닌 일반 객체면 getProperty의 unit 인자가 무시되어 숫자가 그대로 돌아오고, 없는 property는 null이 아니라 undefined다. 반면 quickSetter의 unit은 일반 객체에도 붙어 문자열이 된다.', source: 'get-property', origin: 'implementation', sectionId: 'read-current-value' },
  { id: 'HFU-P2', officialItem: 'quickSetter가 돌려준 함수는 인자를 1개 받으며, target이 하나면 넣은 값을 그대로 돌려주고 target이 여럿이면 undefined를 돌려준다. 공식 페이지에 반환값 명시 없음.', source: 'quick-setter', origin: 'implementation', sectionId: 'follow-the-input' },
  { id: 'HFU-P3', officialItem: 'quickTo가 돌려준 함수는 인자를 3개 받는다. TypeScript 선언의 3번째 인자 startIsRelative는 공식 페이지에 없으며, true면 넘긴 시작값을 현재 값에 더한 지점에서 출발한다.', source: 'quick-to', origin: 'implementation', sectionId: 'follow-the-input' },
  { id: 'HFU-P5', officialItem: 'quickTo의 vars에 duration: 0을 주면 값이 목표에 도달하지 못하고 내부 초기값에 머문다. duration: 0.001은 정상 동작한다. 공식 페이지에 duration 하한 언급 없음.', source: 'quick-to', origin: 'implementation', sectionId: 'follow-the-input' },
  { id: 'HFU-P6', officialItem: '.tween.pause()로 멈춘 뒤 quickTo 함수에 새 값을 넘기면 일시정지가 풀리고 다시 움직인다. 공식 페이지는 pause() 예제만 싣고 이후 호출과의 관계를 밝히지 않는다.', source: 'quick-to', origin: 'implementation', sectionId: 'follow-the-input' },
]
