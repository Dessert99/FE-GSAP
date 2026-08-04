/** 공식 두 문서에서 확인한 기술 item 15개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'attributes' | 'end-array'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** CSS가 아닌 값에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const nonCssTargetValuesSourceItems: SourceItem[] = [
  { id: 'ATTR-01', officialItem: 'AttrPlugin은 internal plugin이라 core에 자동 포함되며 registerPlugin()이 필요 없다.', source: 'attributes', origin: 'official', sectionId: 'value-channel' },
  { id: 'ARR-01', officialItem: 'EndArrayPlugin은 internal plugin이라 core에 자동 포함되며 registerPlugin()이 필요 없다.', source: 'end-array', origin: 'official', sectionId: 'value-channel' },
  { id: 'ATTR-02', officialItem: 'GSAP은 DOM element의 numeric attribute를 tween할 수 있다.', source: 'attributes', origin: 'official', sectionId: 'value-channel' },
  { id: 'ARR-02', officialItem: 'numeric 값 Array를 다른 numeric 값 Array로 tween한다.', source: 'end-array', origin: 'official', sectionId: 'value-channel' },

  { id: 'ATTR-03', officialItem: 'attribute 이름과 목표값은 중첩된 attr: {} 객체 안에 property 이름으로 적는다.', source: 'attributes', origin: 'official', sectionId: 'attr-syntax' },
  { id: 'ATTR-04', officialItem: '동시에 tween할 수 있는 attribute 개수에 제한이 없다.', source: 'attributes', origin: 'official', sectionId: 'attr-syntax' },
  { id: 'ATTR-05', officialItem: '"%" 같은 suffix를 유지하므로 width="50%" 같은 값도 tween할 수 있다.', source: 'attributes', origin: 'official', sectionId: 'attr-syntax' },
  { id: 'ATTR-06', officialItem: 'attribute tween은 단위 변환을 하지 않는다(px→% 불가).', source: 'attributes', origin: 'official', sectionId: 'attr-syntax' },

  { id: 'ATTR-07', officialItem: '공식 rect 예제는 duration 1, attr {x,y,width,height}, ease "none", 그리고 attr 밖의 x: 200을 함께 지정한다.', source: 'attributes', origin: 'official', sectionId: 'attr-css-split' },
  { id: 'ATTR-08', officialItem: 'CSS 관련 property를 attr 객체 안에서 animate하려 하면 안 된다. GSAP이 CSS를 내부적으로 다르게 처리한다.', source: 'attributes', origin: 'official', sectionId: 'attr-css-split' },
  { id: 'ATTR-09', officialItem: 'attr 밖의 x는 CSS transform을, attr 안의 x는 rect element의 기하 좌표를 animate한다.', source: 'attributes', origin: 'official', sectionId: 'attr-css-split' },

  { id: 'ARR-03', officialItem: 'numeric Array 자체가 gsap.to()의 target이고 목적지 Array는 endArray property로 넘긴다.', source: 'end-array', origin: 'official', sectionId: 'end-array' },
  { id: 'ARR-04', officialItem: '값이 목적지 Array로 향하는 동안 easing이 적용된다.', source: 'end-array', origin: 'official', sectionId: 'end-array' },
  { id: 'ARR-05', officialItem: '공식 예제는 [1,2,3]에서 endArray [5,6,7]로 tween하며 onUpdate에서 같은 arr를 로그해 제자리 변형을 보여준다.', source: 'end-array', origin: 'official', sectionId: 'end-array' },
  { id: 'ARR-06', officialItem: '두 Array의 길이가 다르면 양쪽 모두에 존재하는 index만 animate된다.', source: 'end-array', origin: 'official', sectionId: 'end-array' },

  { id: 'ARR-P1', officialItem: '목적지 Array가 더 길면 target Array가 그 길이로 늘어나고 추가된 칸은 0에서부터 보간된다. 공식 문서에는 이 동작이 없다.', source: 'end-array', origin: 'implementation', sectionId: 'end-array' },
]
