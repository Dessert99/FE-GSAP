/** 세 공식 utility 문서의 기술 item과 실행 probe를 section 단위로 고정한다. */

/** 공식 사실과 설치본 probe를 분리해 coverage 분모가 흔들리지 않게 한다. */
export type UtilityCollectionSourceItem = {
  id: string
  officialItem: string
  source: 'random' | 'shuffle' | 'to-array'
  origin: 'official' | 'probe'
  sectionId: string
}

/** 공식 문서에서 직접 확인한 모든 기술 주장과 문서가 침묵한 probe를 모은다. */
export const utilityCollectionsRandomSourceItems: UtilityCollectionSourceItem[] = [
  { id: 'ARR-01', officialItem: 'toArray()는 Array를 반환한다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-02', officialItem: 'selector text, object 또는 selector text의 Array, NodeList, object, 거의 모든 Array-like object를 flat Array로 바꾼다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-03', officialItem: 'scope는 3.7.0에 추가됐고 selector text에 선택적으로 줄 수 있다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-04', officialItem: 'scope를 주면 selector 결과는 그 scope Element의 descendant로 제한된다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-05', officialItem: 'selector text 예제는 raw element를 flat Array로 감싼다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-06', officialItem: 'raw element 또는 object 예제도 Array로 감싼다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-07', officialItem: 'selector text Array 예제는 ".class1, .class2"와 같은 결과다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-08', officialItem: 'scope 예제는 myElement의 descendant만 반환한다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-09', officialItem: 'targets parameter의 타입은 Object | String | NodeList | Array다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-10', officialItem: 'targets는 flatten할 target이며 selector text, object, NodeList 등을 받을 수 있다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-11', officialItem: 'scope parameter의 타입은 Element | Ref이며 optional이다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-12', officialItem: 'scope는 scope Element에서 querySelectorAll(selector text)를 호출하는 것처럼 동작한다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },
  { id: 'ARR-13', officialItem: 'scope는 targets가 selector text일 때만 유용하다.', source: 'to-array', origin: 'official', sectionId: 'collection-normalization' },

  { id: 'RND-01', officialItem: 'random()은 range 안의 random number 또는 Array의 random element를 얻는다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-02', officialItem: 'number range에는 optional snapIncrement로 increment에 가장 가깝게 round할 수 있다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-03', officialItem: '즉시 값을 얻거나 returnFunction: true로 원래 range 또는 Array에서 매 호출 random value를 내는 reusable function을 얻는다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-04', officialItem: 'number overload 1은 random(minimum, maximum[, snapIncrement, returnFunction])이다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-05', officialItem: 'number overload 1의 minimum과 maximum은 Number이며 각각 최소·최대값이다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-06', officialItem: 'snapIncrement는 optional Number이고 예를 들어 5이면 가장 가까운 5 단위에 snap한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-07', officialItem: 'returnFunction은 optional Boolean이며 true면 random value 대신 reusable function을 반환한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-08', officialItem: 'number overload 1은 random value 또는 reusable function을 반환한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-09', officialItem: '공식 number 예제는 -100~100 직접 호출을 보인다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-10', officialItem: '공식 number 예제는 0~500을 5 단위로 snap하는 호출을 보인다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-11', officialItem: '공식 number 예제는 -200~500을 10 단위로 snap하는 reusable function과 여러 호출을 보인다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-12', officialItem: 'array overload는 random(array[, returnFunction])이다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-13', officialItem: 'array parameter는 random choice 후보가 되는 values Array다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-14', officialItem: 'array overload의 returnFunction true도 원래 Array에서 다시 뽑는 reusable function을 반환한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-15', officialItem: 'array overload는 Array에서 고른 value 또는 reusable function을 반환한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-16', officialItem: '공식 array 예제는 색 Array의 직접 선택과 [0,100,200] reusable function의 여러 호출을 보인다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-17', officialItem: 'increment를 생략하는 number overload는 random(minimum, maximum[, returnFunction])이다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-18', officialItem: 'increment 없는 overload의 minimum·maximum·returnFunction 계약과 반환은 overload 1과 같고 snapIncrement만 생략한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-19', officialItem: '공식 increment 없는 예제는 0~100 직접 호출과 -10~50 reusable function을 보인다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-20', officialItem: 'reusable function은 pipe()와 조합해 incoming value에 여러 변환을 적용할 수 있다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-21', officialItem: '공식 pipe 예제는 clamp, normalize, interpolate를 순서대로 연결한다.', source: 'random', origin: 'official', sectionId: 'random-choice' },
  { id: 'RND-22', officialItem: 'Tween vars 안에는 "random(-100, 100)" 또는 "random([red, blue, green])" string form을 쓸 수 있다.', source: 'random', origin: 'official', sectionId: 'tween-boundary' },
  { id: 'RND-23', officialItem: '공식 string form 예제는 x에 후보 Array string을 주어 각 target에서 하나를 선택한다.', source: 'random', origin: 'official', sectionId: 'tween-boundary' },
  { id: 'RND-24', officialItem: '공식 string form 예제는 x에 range와 increment string을 주어 각 target에서 가장 가까운 increment로 round한다.', source: 'random', origin: 'official', sectionId: 'tween-boundary' },

  { id: 'SHF-01', officialItem: 'shuffle()은 Array를 반환한다.', source: 'shuffle', origin: 'official', sectionId: 'shuffle-mutation' },
  { id: 'SHF-02', officialItem: 'shuffle()은 Array를 random shuffle하고 같은 shuffled Array를 반환하며 새 Array를 만들지 않는다.', source: 'shuffle', origin: 'official', sectionId: 'shuffle-mutation' },
  { id: 'SHF-03', officialItem: '공식 예제는 [1,2,3,4,5]를 호출하고 같은 Array가 섞여 반환되는 모습을 보인다.', source: 'shuffle', origin: 'official', sectionId: 'shuffle-mutation' },
  { id: 'SHF-04', officialItem: 'target parameter는 in place로 shuffle할 Array다.', source: 'shuffle', origin: 'official', sectionId: 'shuffle-mutation' },

  { id: 'PRB-01', officialItem: 'GSAP 3.15.0에서 shuffle(array)의 반환 참조는 전달한 array와 === 비교로 같다.', source: 'shuffle', origin: 'probe', sectionId: 'shuffle-mutation' },
  { id: 'PRB-02', officialItem: 'GSAP 3.15.0에서 random(..., true)와 random(array, true)는 function을 반환하고 호출할 때마다 한 값을 낸다.', source: 'random', origin: 'probe', sectionId: 'random-choice' },
  { id: 'PRB-03', officialItem: 'GSAP 3.15.0에서 toArray(singleObject)는 singleObject를 첫 항목으로 갖는 Array를 반환한다.', source: 'to-array', origin: 'probe', sectionId: 'collection-normalization' },
]
