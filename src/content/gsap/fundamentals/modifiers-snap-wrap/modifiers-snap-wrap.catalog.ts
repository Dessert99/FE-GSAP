/** 공식 다섯 문서에서 확인한 기술 item 31개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'modifiers' | 'snap-plugin' | 'utils-snap' | 'utils-wrap' | 'utils-wrap-yoyo'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 값 가공에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const modifiersSnapWrapSourceItems: SourceItem[] = [
  { id: 'MOD-01', officialItem: 'ModifiersPlugin은 internal plugin이라 GSAP core에 자동 포함되며 registerPlugin()으로 불러올 필요가 없다.', source: 'modifiers', origin: 'official', sectionId: 'intercept' },
  { id: 'MOD-02', officialItem: 'modifier는 GSAP이 매 update tick에 적용하려던 값을 가로채 함수에 통과시키고, 돌려받은 값을 대신 적용한다.', source: 'modifiers', origin: 'official', sectionId: 'intercept' },
  { id: 'MOD-03', officialItem: 'modifier 함수는 인자 두 개를 받는다. 첫째는 적용 직전의 값(number 또는 string), 둘째는 target 객체 자신이다.', source: 'modifiers', origin: 'official', sectionId: 'intercept' },
  { id: 'MOD-04', officialItem: '거의 모든 property에 modifier 함수를 정의할 수 있다.', source: 'modifiers', origin: 'official', sectionId: 'intercept' },
  { id: 'MOD-05', officialItem: '공식 페이지는 rotation snap, modulus를 이용한 clamp, carousel wrap을 사용 예로 제시한다.', source: 'modifiers', origin: 'official', sectionId: 'intercept' },
  { id: 'MOD-06', officialItem: 'RoundPropsPlugin과 SnapPlugin은 modifier와 같은 내부 메커니즘을 쓴다.', source: 'modifiers', origin: 'official', sectionId: 'intercept' },

  { id: 'MOD-07', officialItem: 'CSS transform의 scale에는 modifier를 쓰지 말고 scaleX와 scaleY를 써야 한다.', source: 'modifiers', origin: 'official', sectionId: 'modifier-caveats' },
  { id: 'MOD-08', officialItem: 'rotationZ가 아니라 rotation을 써야 한다.', source: 'modifiers', origin: 'official', sectionId: 'modifier-caveats' },
  { id: 'MOD-09', officialItem: '같은 property에 roundProps와 modifier를 함께 쓸 수 없다.', source: 'modifiers', origin: 'official', sectionId: 'modifier-caveats' },
  { id: 'MOD-10', officialItem: '공식 페이지는 modifier 함수의 반환값 타입이나 잘못된 반환에 대한 처리를 별도로 규정하지 않는다.', source: 'modifiers', origin: 'official', sectionId: 'modifier-caveats' },

  { id: 'SNP-01', officialItem: 'SnapPlugin은 internal plugin이라 GSAP core에 자동 포함되며 registerPlugin()으로 불러올 필요가 없다.', source: 'snap-plugin', origin: 'official', sectionId: 'snap-plugin' },
  { id: 'SNP-02', officialItem: 'SnapPlugin은 tween이 배열의 가장 가까운 값이나 increment로 snap하게 하며, 끝값만이 아니라 tween 진행 중 값에 영향을 주는 modifier를 구현한다.', source: 'snap-plugin', origin: 'official', sectionId: 'snap-plugin' },
  { id: 'SNP-03', officialItem: 'snap에 쉼표로 구분한 property 이름 문자열("x,y")을 주면 그 property들을 가장 가까운 정수로 snap한다.', source: 'snap-plugin', origin: 'official', sectionId: 'snap-plugin' },
  { id: 'SNP-04', officialItem: 'snap: { x: 20 }처럼 숫자를 주면 그 increment로 snap한다.', source: 'snap-plugin', origin: 'official', sectionId: 'snap-plugin' },
  { id: 'SNP-05', officialItem: 'snap: { x: [0, 50, 150, 500] }처럼 배열을 주면 배열에서 가장 가까운 값으로 snap한다.', source: 'snap-plugin', origin: 'official', sectionId: 'snap-plugin' },
  { id: 'SNP-06', officialItem: 'snap: { x: { values: [...], radius: 20 } }처럼 주면 그 거리 안에 있을 때만 snap한다.', source: 'snap-plugin', origin: 'official', sectionId: 'snap-plugin' },

  { id: 'USN-01', officialItem: 'utils.snap()은 일정 increment로 snap하거나 Array에서 가장 가까운 값으로 snap한다. radius로 제한할 수 있고 2D point도 지원한다.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-02', officialItem: '형태 1 — snap(snapIncrement:Number, valueToSnap:Number)은 snap된 값을 돌려준다. 공식 예: snap(10, 23.5)는 20.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-03', officialItem: '형태 2 — snap(snapIncrement:Number)는 재사용할 함수를 돌려준다.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-04', officialItem: '형태 3 — snap(array:Array, valueToSnap:Number)은 배열에서 가장 가까운 값을 돌려준다. 공식 예: snap([100, 50, 500], 65)는 50.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-05', officialItem: '형태 4 — snap(array:Array)는 재사용할 함수를 돌려준다.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-06', officialItem: '형태 5 — snap(objectWithRadius:Object, valueToSnap:Number|Object). object는 radius property와 함께 values 배열 또는 increment를 갖는다.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-07', officialItem: '형태 6 — snap(objectWithRadius:Object)는 재사용할 함수를 돌려준다.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },
  { id: 'USN-08', officialItem: '공식 페이지는 재사용 가능한 utility 함수들을 조합해 데이터를 변환하는 방법을 팁으로 제시한다.', source: 'utils-snap', origin: 'official', sectionId: 'snap-utility' },

  { id: 'UWR-01', officialItem: 'wrap(value1, value2, index) — value1은 Array 또는 범위의 최솟값, value2는 범위의 최댓값 또는 (Array를 준 경우) index, index는 선택적이다.', source: 'utils-wrap', origin: 'official', sectionId: 'wrap-family' },
  { id: 'UWR-02', officialItem: '숫자(또는 Array의 index)를 지정한 범위에 넣어, 최댓값을 넘으면 처음으로 되돌아가고 최솟값보다 작으면 끝으로 감싼다.', source: 'utils-wrap', origin: 'official', sectionId: 'wrap-family' },
  { id: 'UWR-03', officialItem: 'index를 주지 않으면 wrapping을 수행할 함수를 돌려준다.', source: 'utils-wrap', origin: 'official', sectionId: 'wrap-family' },
  { id: 'UWR-04', officialItem: '공식 예: wrap(["red","green","yellow"], 5)는 "yellow", wrap(5, 10, 12)는 7, wrap(배열)로 얻은 함수에 5를 넣으면 "yellow".', source: 'utils-wrap', origin: 'official', sectionId: 'wrap-family' },
  { id: 'UWY-01', officialItem: 'wrapYoyo(value1, value2, index) — 인자 구성은 wrap과 같다.', source: 'utils-wrap-yoyo', origin: 'official', sectionId: 'wrap-family' },
  { id: 'UWY-02', officialItem: '숫자를 범위에 넣되, 최댓값을 넘으면 시작 쪽으로 yoyo하며 되돌아오고 최솟값보다 작으면 끝 쪽으로 yoyo한다.', source: 'utils-wrap-yoyo', origin: 'official', sectionId: 'wrap-family' },
  { id: 'UWY-03', officialItem: 'index를 주지 않으면 재사용할 함수를 돌려준다. 공식 예: wrapYoyo(5, 10, 12)는 8.', source: 'utils-wrap-yoyo', origin: 'official', sectionId: 'wrap-family' },

  { id: 'MSW-P1', officialItem: '공식 wrapYoyo 페이지가 같은 호출을 두 곳에서 다르게 적었다. wrapYoyo(["red","green","yellow"], 5)를 첫 예제는 "red", 세 번째 예제는 "green"이라고 주석했는데 실제 반환은 "green"이다.', source: 'utils-wrap-yoyo', origin: 'implementation', sectionId: 'wrap-family' },
  { id: 'MSW-P2', officialItem: 'wrap의 범위는 최댓값을 포함하지 않고 wrapYoyo는 포함한다. index 0~6에서 wrap(0,3,i)는 0 1 2 0 1 2 0이고 wrapYoyo(0,3,i)는 0 1 2 3 2 1 0이다. 공식 문서에 이 비대칭이 없다.', source: 'utils-wrap-yoyo', origin: 'implementation', sectionId: 'wrap-family' },
  { id: 'MSW-P3', officialItem: 'utils.snap의 radius 밖 값은 snap되지 않고 원래 값이 그대로 돌아온다. values [0,100,300]에 radius 20일 때 105는 100이 되지만 150은 150 그대로다.', source: 'utils-snap', origin: 'implementation', sectionId: 'snap-utility' },
  { id: 'MSW-P4', officialItem: 'radius를 increment와 함께 쓰면 increment 눈금에서 radius 밖인 값도 그대로 남는다. {increment:10, radius:2}에 23을 주면 20이 아니라 23이다.', source: 'utils-snap', origin: 'implementation', sectionId: 'snap-utility' },
  { id: 'MSW-P5', officialItem: '2D point snap은 x·y를 가진 객체를 돌려준다. values에 {x,y} 객체 배열과 radius 30을 주고 {x:10,y:10}을 넣으면 {x:0,y:0}이 나온다.', source: 'utils-snap', origin: 'implementation', sectionId: 'snap-utility' },
  { id: 'MSW-P6', officialItem: 'wrap은 음수 index도 감싼다. wrap(["a","b","c"], -1)은 "c"이고, 범위에서도 wrap(5,10,3)은 8이다.', source: 'utils-wrap', origin: 'implementation', sectionId: 'wrap-family' },
]
