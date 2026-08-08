/** 공식 다섯 문서에서 확인한 기술 item 36개와 실행으로만 확인한 10개를 로컬 섹션과 묶어 coverage 근거로 남긴다. */

/** 이 페이지가 담당하는 공식 문서 다섯 개의 식별자다. */
export type SourceKey = 'data' | 'get-children' | 'get-by-id' | 'get-tweens-of' | 'scroll-trigger'

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: SourceKey
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 중첩 Timeline 조회에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const timelineInspectionSourceItems: SourceItem[] = [
  { id: 'GC-02', officialItem: 'getChildren()은 이 timeline에 nested된 모든 tween 그리고/또는 timeline을 담은 array를 돌려준다.', source: 'get-children', origin: 'official', sectionId: 'nested-tree' },
  { id: 'GC-09', officialItem: 'Callbacks(delayed calls)는 zero-duration tween으로 간주한다.', source: 'get-children', origin: 'official', sectionId: 'nested-tree' },
  { id: 'GC-10', officialItem: '공식 예제는 master timeline(defaults duration 1)에 tween 3개를 넣고, 별도 nested timeline에 tween 2개를 넣은 뒤 master.add(nested)로 중첩한다.', source: 'get-children', origin: 'official', sectionId: 'nested-tree' },
  { id: 'TI-P9', officialItem: 'getChildren()과 getTweensOf()가 돌려주는 배열은 호출할 때마다 새로 만든 배열이라 push해도 timeline 내부 구조가 오염되지 않는다. 공식 문서는 배열이 복사본인지 내부 배열인지 밝히지 않는다.', source: 'get-children', origin: 'implementation', sectionId: 'nested-tree' },

  { id: 'GC-01', officialItem: 'signature는 getChildren( nested:Boolean, tweens:Boolean, timelines:Boolean, ignoreBeforeTime:Number ) : Array 이다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-03', officialItem: 'nested는 Boolean이고 기본값은 true다. 중첩 timeline 안에 있는 tween 그리고/또는 timeline을 돌려줄지 결정한다. "top level"만 원하면 false로 둔다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-04', officialItem: 'tweens는 Boolean이고 기본값은 true다. 결과에 tween을 포함할지 결정한다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-05', officialItem: 'timelines는 Boolean이고 기본값은 true다. 결과에 timeline을 포함할지 결정한다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-06', officialItem: 'ignoreBeforeTime은 Number이고 기본값은 -Infinity다. start time이 이 값보다 작은 child는 모두 무시된다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-07', officialItem: '반환값은 Array이며 child tween과 timeline의 Array다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-08', officialItem: 'Details — 제공한 조건에 맞는, 이 timeline에 nested된 모든 tween 그리고/또는 timeline을 담은 array를 돌려준다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-11', officialItem: '공식 예제 주석 — master.getChildren(false, true, true)의 결과 개수를 "3" (2 tweens and 1 timeline)이라고 적는다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-12', officialItem: '공식 예제 주석 — master.getChildren(true, true, true, 0.5)의 결과 개수를 "5" (4 tweens and 1 timeline)이라고 적으며, 0.5초 이후에 일어나는 것을 모두 가져온다고 설명한다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'GC-13', officialItem: '공식 예제 주석 — master.getChildren(true, true, false)의 결과 개수를 "5" (5 tweens)라고 적으며, timeline은 빼고 중첩된 tween까지 가져온다고 설명한다.', source: 'get-children', origin: 'official', sectionId: 'get-children' },
  { id: 'TI-P1', officialItem: 'ignoreBeforeTime은 호출한 timeline의 직계 child에만 적용된다. 중첩 재귀 호출에는 이 값이 전달되지 않아 손자 이하 child는 시간 필터를 받지 않는다. 공식 문서는 적용 범위를 밝히지 않는다.', source: 'get-children', origin: 'implementation', sectionId: 'get-children' },
  { id: 'TI-P2', officialItem: 'timelines:false는 결과에서 timeline 객체만 제외할 뿐 재귀 탐색을 멈추지 않는다. nested:true면 중첩 timeline 안의 tween은 그대로 결과에 들어온다. 공식 문서는 두 인자의 상호작용을 밝히지 않는다.', source: 'get-children', origin: 'implementation', sectionId: 'get-children' },
  { id: 'TI-P3', officialItem: '공식 예제의 첫 번째 주석 "3"은 실제 실행 결과와 다르다. 예제 코드대로면 master의 직계 child는 tween 3개와 timeline 1개로 모두 4개다. 나머지 두 주석(5, 5)은 실행 결과와 일치한다.', source: 'get-children', origin: 'implementation', sectionId: 'get-children' },
  { id: 'TI-P10', officialItem: 'ignoreBeforeTime의 실제 기본값은 -1e8이며 공식 문서가 적은 -Infinity와 다르다. 실무 시간 범위에서는 차이가 드러나지 않는다.', source: 'get-children', origin: 'implementation', sectionId: 'get-children' },

  { id: 'GI-01', officialItem: 'signature는 getById( id:String ) : Animation 이다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'GI-02', officialItem: 'id는 String이며, Tween/Timeline을 만들 때 보통 vars object에 지정하는 animation의 id다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'GI-03', officialItem: '반환값은 Animation이며 제공한 ID에 연결된 Tween 또는 Timeline이다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'GI-04', officialItem: 'Details — timeline을 검색해 ID가 일치하는 첫 번째(first) descendant를 돌려준다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'GI-05', officialItem: 'tween이나 timeline을 만들 때 id를 부여해 두면 나중에 그 id로 찾을 수 있다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'GI-06', officialItem: 'React 같은 framework와 build tool에서 변수를 계속 추적하기 어려울 때 특히 도움이 된다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'GI-07', officialItem: '공식 예제는 var tl = gsap.timeline(); 뒤 tl.to(obj, { id: "myTween", duration: 1, x: 100 }); 로 만들고 var myTween = tl.getById("myTween"); 으로 되찾는다.', source: 'get-by-id', origin: 'official', sectionId: 'get-by-id' },
  { id: 'TI-P4', officialItem: 'getById()는 실제로는 평탄화한 descendant 목록을 뒤에서부터 검색해 마지막으로 일치하는 것을 돌려준다. 같은 id가 둘 이상이면 공식 Details의 "first descendant"와 반대 결과가 나온다.', source: 'get-by-id', origin: 'implementation', sectionId: 'get-by-id' },
  { id: 'TI-P5', officialItem: 'id 비교는 === 엄격 비교라서 getById(7)과 getById("7")은 서로 다른 조회다. 일치하는 것이 없으면 undefined를 돌려준다. 공식 문서는 id를 String으로만 적고 이 구분을 밝히지 않는다.', source: 'get-by-id', origin: 'implementation', sectionId: 'get-by-id' },

  { id: 'GT-01', officialItem: 'signature는 getTweensOf( target:[Object | Selector text | Array], nested:Boolean ) : Array 이다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-02', officialItem: '요약 문장 — 이 timeline 안에 있는 특정 object의 tween들을 돌려준다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-03', officialItem: 'target은 [Object | Selector text | Array] 이며 tween의 target object다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-04', officialItem: 'nested는 Boolean이고 기본값은 true다. 중첩 timeline 안에 있는 tween을 돌려줄지 결정하며 "top level"만 원하면 false로 두라고 적는다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-05', officialItem: '반환값은 Array이며 Tween instance의 Array다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-06', officialItem: 'Details — 이 timeline 안에 있는 특정 target의 tween을 돌려주며, 여러 target을 array나 selector text로 넘길 수 있다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-07', officialItem: '공식 예제 — tl.getTweensOf(".myClass") 는 target이 ".myClass"인 tween을 모두 가져온다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'GT-08', officialItem: '공식 예제 — tl.getTweensOf(myElem, true) 에 "including nested timelines"라는 주석을 달아 두 번째 인자를 중첩 포함 스위치로 제시한다.', source: 'get-tweens-of', origin: 'official', sectionId: 'get-tweens-of' },
  { id: 'TI-P6', officialItem: '두 번째 인자는 실제로 onlyActive로 동작한다. true면 isActive()인 tween만 남기고, 숫자면 그 global time에 걸쳐 있는 tween만 남긴다. 중첩 timeline 탐색은 인자와 무관하게 항상 일어나며 끌 수 없다.', source: 'get-tweens-of', origin: 'implementation', sectionId: 'get-tweens-of' },

  { id: 'TD-01', officialItem: '타입 시그니처는 data : * 이며 특정 타입으로 제한하지 않는다.', source: 'data', origin: 'official', sectionId: 'data' },
  { id: 'TD-02', officialItem: '원하는 어떤 데이터든 저장해 두는 자리다.', source: 'data', origin: 'official', sectionId: 'data' },
  { id: 'TD-03', officialItem: 'vars.data가 있으면 그 값으로 초기 채워진다.', source: 'data', origin: 'official', sectionId: 'data' },
  { id: 'TI-P7', officialItem: 'data를 주지 않아도 timeline은 data 자리를 갖는다 — 값은 undefined지만 "data" in timeline은 true다. 또 timeline.data에 새 값을 대입해도 vars.data는 처음 값 그대로 남는다. 공식 문서는 둘 다 밝히지 않는다.', source: 'data', origin: 'implementation', sectionId: 'data' },

  { id: 'ST-01', officialItem: '타입 시그니처는 scrollTrigger: ScrollTrigger | undefined 이다.', source: 'scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-02', officialItem: 'timeline에 연결된 ScrollTrigger에 접근하는 편리한 방법이며, timeline이 ScrollTrigger를 가지고 있을 때만 접근할 수 있다.', source: 'scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-03', officialItem: '공식 warning — scrollTrigger property는 Timeline이나 Tween이 ScrollTrigger를 가지고 있을 때만 추가된다(added).', source: 'scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-04', officialItem: '공식 예제 — gsap.timeline({scrollTrigger: {start: "top center"...}}) 로 만든 뒤 tl.scrollTrigger.refresh() 또는 tl.scrollTrigger.kill()을 부른다.', source: 'scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-05', officialItem: '자세한 내용은 ScrollTrigger 공식 문서를 보라고 넘긴다 — 이 페이지의 설명 경계다.', source: 'scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'TI-P8', officialItem: 'ScrollTrigger를 붙이지 않은 timeline에서 "scrollTrigger" in timeline은 false다. 값이 undefined인 것이 아니라 property 자체가 없으며, 항상 자리가 있는 data와 정확히 반대다.', source: 'scroll-trigger', origin: 'implementation', sectionId: 'scroll-trigger' },
]
