/** distribute() 공식 계약·오류 32개와 GSAP 3.15.0 실행 관찰 5개를 섹션 근거로 고정한다. */

/** 공식 문장과 구현 관찰을 섞지 않고 각 학습 섹션에 연결한다. */
export type UtilityDistributeSourceItem = {
  id: string
  officialItem: string
  source: 'distribute'
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 공식 문서의 서명·설정·예제·주의와 별도 probe 결과를 item 단위로 보존한다. */
export const utilityDistributeSourceItems: UtilityDistributeSourceItem[] = [
  { id: 'DIST-01', officialItem: 'distribute()의 반환 형식은 Function이다.', source: 'distribute', origin: 'official', sectionId: 'returned-function' },
  { id: 'DIST-02', officialItem: '입력으로 준 설정에 따라 값 배열을 배분하는 함수를 반환한다.', source: 'distribute', origin: 'official', sectionId: 'returned-function' },
  { id: 'DIST-03', officialItem: '반환 함수는 target의 배열 위치 또는 grid 위치를 기준으로 값을 할당한다.', source: 'distribute', origin: 'official', sectionId: 'returned-function' },
  { id: 'DIST-04', officialItem: '공식 예제는 반환 함수에 index, 해당 target, 전체 targets 배열을 순서대로 넘긴다.', source: 'distribute', origin: 'official', sectionId: 'returned-function' },
  { id: 'DIST-05', officialItem: 'config는 Object이고 그 안의 모든 property는 선택 사항이다.', source: 'distribute', origin: 'official', sectionId: 'config-catalog' },

  { id: 'DIST-06', officialItem: 'base는 Number이며 배분이 시작되는 기준값이고 기본값은 0이다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-07', officialItem: 'amount는 Number이며 전체 target에 나눌 총량이고 반환 시 base에 더해진다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-08', officialItem: '공식 설명은 amount 1과 target 100개일 때 반환값 사이 차이를 0.01이라고 적는다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-09', officialItem: 'target 사이 간격을 직접 정하려면 amount 대신 each를 사용한다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-10', officialItem: 'each는 Number이며 target마다 더할 간격이고 반환 시 base에 더해진다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-11', officialItem: '공식 설명은 each 1과 target 4개일 때 0, 1, 2, 3을 반환한다고 적는다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-12', officialItem: '전체에 걸친 총량을 정하려면 each 대신 amount를 사용한다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },

  { id: 'DIST-13', officialItem: 'from은 Number | String | Array이며 배분이 시작되는 targets 위치를 정한다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-14', officialItem: 'from의 문자열 special value는 start, center, edges, random, end이다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-15', officialItem: 'from은 [0.25, 0.75]처럼 x축·y축 비율 배열을 받을 수 있다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-16', officialItem: 'from 기본값은 숫자 0이다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-17', officialItem: 'grid는 String | Array이며 flat 배열 대신 [rows, columns] 위치를 기준으로 배분한다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-18', officialItem: 'grid 배열은 [5, 10]처럼 행·열 수를 직접 지정한다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-19', officialItem: 'grid의 "auto"는 DOM element의 column·row 수를 GSAP이 자동 감지하게 한다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-20', officialItem: 'axis는 String이며 grid 배분 측정을 "x" 또는 "y" 한 축으로 제한한다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },
  { id: 'DIST-21', officialItem: 'ease는 Ease이며 ease 곡선을 따라 배분하고 기본값은 "none"이다.', source: 'distribute', origin: 'official', sectionId: 'grid-geometry' },

  { id: 'DIST-22', officialItem: '공식 종합 예제는 base 50, amount 100, from center, grid auto, axis y, ease power1.inOut을 설정한다.', source: 'distribute', origin: 'official', sectionId: 'config-catalog' },
  { id: 'DIST-23', officialItem: '공식 종합 예제는 gsap.utils.toArray(".box")로 전체 target 배열을 만든다.', source: 'distribute', origin: 'official', sectionId: 'returned-function' },
  { id: 'DIST-24', officialItem: '공식 종합 예제는 distributor(2, targets[2], targets)로 한 target의 값을 계산한다.', source: 'distribute', origin: 'official', sectionId: 'returned-function' },
  { id: 'DIST-25', officialItem: '반환 함수는 tween의 function-based value로 직접 사용할 수 있다.', source: 'distribute', origin: 'official', sectionId: 'boundaries' },
  { id: 'DIST-26', officialItem: '공식 tween 예제는 scale에 base 0.5, amount 2.5, from center인 distribute() 함수를 넣는다.', source: 'distribute', origin: 'official', sectionId: 'boundaries' },
  { id: 'DIST-27', officialItem: 'advanced stagger는 내부적으로 distribute()를 사용하지만 이 함수는 어떤 값에도 적용할 수 있다.', source: 'distribute', origin: 'official', sectionId: 'boundaries' },
  { id: 'DIST-28', officialItem: 'amount 설명 원문은 “if amount is 1 and there 100 targets”로 be동사가 빠져 있다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-29', officialItem: 'each 설명 원문은 “If each is 1 and the there are 4 targets”로 불필요한 the가 들어 있다.', source: 'distribute', origin: 'official', sectionId: 'amount-each' },
  { id: 'DIST-30', officialItem: '영상 안내 원문은 “may help your understand”로 you 대신 your가 적혀 있다.', source: 'distribute', origin: 'official', sectionId: 'boundaries' },
  { id: 'DIST-31', officialItem: '공식 페이지는 SnorklTV의 GSAP 3: Beyond the Basics 과정 중 distribute 영상을 학습 자료로 안내한다.', source: 'distribute', origin: 'official', sectionId: 'boundaries' },
  { id: 'DIST-32', officialItem: '공식 페이지는 영상에 사용된 companion Pen도 안내한다.', source: 'distribute', origin: 'official', sectionId: 'boundaries' },

  { id: 'DIST-P1', officialItem: 'GSAP 3.15.0에서 빈 config는 네 target 모두에 숫자 0을 반환했다. 공식 문서는 조합 결과를 게시하지 않는다.', source: 'distribute', origin: 'implementation', sectionId: 'config-catalog' },
  { id: 'DIST-P2', officialItem: 'GSAP 3.15.0에서 amount 1과 target 100개의 첫 간격은 0.010101이고 마지막 값은 1이다. 공식 0.01 문구는 근삿값이다.', source: 'distribute', origin: 'implementation', sectionId: 'amount-each' },
  { id: 'DIST-P3', officialItem: 'GSAP 3.15.0에서 amount와 each를 함께 주면 amount가 우선했다. 공식 문서는 동시 지정 우선순위를 게시하지 않는다.', source: 'distribute', origin: 'implementation', sectionId: 'amount-each' },
  { id: 'DIST-P4', officialItem: 'GSAP 3.15.0에서 from random의 순서는 같은 반환 함수 인스턴스를 반복 호출할 때 유지됐다. 공식 문서는 안정성을 게시하지 않는다.', source: 'distribute', origin: 'implementation', sectionId: 'grid-geometry' },
  { id: 'DIST-P5', officialItem: 'GSAP 3.15.0의 [2,3] grid에서 axis x는 각 행을 0·5·10으로, axis y는 각 열을 0·10으로 계산했다. 공식 문서는 수치 예를 게시하지 않는다.', source: 'distribute', origin: 'implementation', sectionId: 'grid-geometry' },
]
