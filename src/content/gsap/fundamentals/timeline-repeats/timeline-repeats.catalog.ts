/** Timeline 반복 공식 item 42개와 GSAP 3.15.0 실행 probe 8개를 로컬 섹션에 고정한다. */

/** 다섯 공식 문서를 짧은 source key로 구분한다. */
export type TimelineRepeatSource = 'invalidate' | 'iteration' | 'repeat' | 'repeat-delay' | 'yoyo'

/** 공식 주장과 실행 확인을 같은 형식으로 저장하되 provenance는 origin으로 분리한다. */
export type TimelineRepeatSourceItem = {
  id: string
  officialItem: string
  source: TimelineRepeatSource
  origin: 'official' | 'implementation'
  sectionId: string
}

/** Timeline repeat cycle과 child invalidation에 관한 전체 기술 주장 목록이다. */
export const timelineRepeatsSourceItems: TimelineRepeatSourceItem[] = [
  { id: 'REP-04', officialItem: 'repeat은 최초 iteration 뒤 Timeline이 추가로 반복할 횟수를 읽고 쓴다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-05', officialItem: 'repeat 1이면 최초 재생 1회와 반복 1회로 총 두 번 재생한다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-06', officialItem: '무한 반복은 repeat -1을 쓴다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-07', officialItem: 'repeat에는 항상 정수를 써야 한다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-08', officialItem: '방향을 번갈아 반복하려면 yoyo, 반복 사이의 시간 간격은 repeatDelay를 쓰라고 안내한다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-09', officialItem: 'vars repeat 예와 getter/setter 코드, myTimeline.repeat(2).yoyo(true).play() chaining 예를 제공한다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },

  { id: 'RPD-04', officialItem: 'repeatDelay는 반복 사이의 초 단위 시간을 읽고 쓴다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },
  { id: 'RPD-05', officialItem: 'repeat 2와 repeatDelay 1이면 최초 재생, 1초 대기, 재생, 1초 대기, 마지막 반복 순서다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },
  { id: 'RPD-06', officialItem: '초기 repeatDelay는 Timeline vars에 repeatDelay 값으로 지정할 수 있다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },
  { id: 'RPD-07', officialItem: 'getter/setter 코드와 myTimeline.repeat(2).yoyo(true).play() chaining 예를 제공한다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },

  { id: 'YOY-04', officialItem: 'yoyo true는 각 repeat에서 Timeline 전체를 정방향과 역방향으로 번갈아 재생한다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-05', officialItem: 'yoyo는 repeat와 함께 쓰며 왕복하려면 repeat가 0이 아니어야 한다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-06', officialItem: 'yoyo 동작은 Timeline의 reversed property에 영향을 주지 않는다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-07', officialItem: 'repeat 2에서 yoyo false는 1-2-3을 세 번, true는 1-2-3-3-2-1-1-2-3 순서로 흐른다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-08', officialItem: 'vars yoyo 예와 getter/setter 코드, myTimeline.yoyo(true).repeat(3).timeScale(2).play(0.5) chaining 예를 제공한다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },

  { id: 'ITR-04', officialItem: 'iteration은 반복 Timeline의 현재 회차를 읽고 쓴다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },
  { id: 'ITR-05', officialItem: '최초 재생은 iteration 1이고 첫 repeat는 2, 다음은 3으로 센다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },
  { id: 'ITR-06', officialItem: 'iteration setter는 지정한 회차로 옮긴다. repeat 4인 Timeline의 세 번째 repeat에서 iteration(2)는 두 번째 회차로 점프한다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },
  { id: 'ITR-07', officialItem: 'var progress = tl.iteration() getter와 tl.iteration(2) setter 코드를 제공한다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },

  { id: 'INV-03', officialItem: 'override 요약은 animation을 restart할 때 이전 시작값으로 되돌리지 않도록 내부 기록 시작·끝 값을 비운다고 설명한다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-04', officialItem: '모든 child tween의 시작·끝 값 같은 initialization data를 지운다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-05', officialItem: 'invalidate 뒤 다음 render에서 다시 초기화되고 vars object를 다시 해석한다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-06', officialItem: 'duration, startTime, delay 같은 timing은 영향을 받지 않는다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-07', officialItem: '공식 예는 x 0에서 +=100인 child를 restart해도 기록한 0→100을 다시 쓴다고 설명한다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-08', officialItem: 'Timeline에 invalidate를 부르면 다음 render에서 값을 다시 해석해 x 100→200으로 움직인다고 설명한다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-09', officialItem: 'Timeline을 invalidate하면 모든 children도 자동 invalidate된다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },
  { id: 'INV-10', officialItem: '매 repeat마다 Tween 하나를 invalidate하려면 repeatRefresh: true special property를 쓸 수 있다는 Note가 있다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-children' },

  { id: 'REP-01', officialItem: 'signature는 repeat(value:Number) : [Number | self]이다.', source: 'repeat', origin: 'official', sectionId: 'call-forms' },
  { id: 'REP-02', officialItem: 'value는 Number이고 기본값은 0이며 생략하면 getter, 지정하면 setter다.', source: 'repeat', origin: 'official', sectionId: 'call-forms' },
  { id: 'REP-03', officialItem: 'Returns는 Number 또는 self이며 setter는 chaining을 위해 instance 자신을 돌려준다.', source: 'repeat', origin: 'official', sectionId: 'call-forms' },
  { id: 'RPD-01', officialItem: 'signature는 repeatDelay(value:Number) : [Number | self]이다.', source: 'repeat-delay', origin: 'official', sectionId: 'call-forms' },
  { id: 'RPD-02', officialItem: 'value는 Number이고 기본값은 0이며 생략하면 getter, 지정하면 setter다.', source: 'repeat-delay', origin: 'official', sectionId: 'call-forms' },
  { id: 'RPD-03', officialItem: 'Returns는 Number 또는 self이며 setter는 chaining을 위해 instance 자신을 돌려준다.', source: 'repeat-delay', origin: 'official', sectionId: 'call-forms' },
  { id: 'YOY-01', officialItem: 'signature는 yoyo(value:Boolean) : [Boolean | self]이다.', source: 'yoyo', origin: 'official', sectionId: 'call-forms' },
  { id: 'YOY-02', officialItem: 'value는 Boolean이고 기본값은 false이며 생략하면 getter, 지정하면 setter다.', source: 'yoyo', origin: 'official', sectionId: 'call-forms' },
  { id: 'YOY-03', officialItem: 'Returns는 Boolean 또는 self이며 setter는 chaining을 위해 instance 자신을 돌려준다.', source: 'yoyo', origin: 'official', sectionId: 'call-forms' },
  { id: 'ITR-01', officialItem: 'signature는 iteration(value:Number) : [Number | self]이다.', source: 'iteration', origin: 'official', sectionId: 'call-forms' },
  { id: 'ITR-02', officialItem: 'value는 Number이며 이동할 repeat 회차다. 공식 Parameters에 기본값은 게시하지 않았다.', source: 'iteration', origin: 'official', sectionId: 'call-forms' },
  { id: 'ITR-03', officialItem: '생략하면 current value getter, 지정하면 setter이며 instance 자신을 돌려준다.', source: 'iteration', origin: 'official', sectionId: 'call-forms' },
  { id: 'INV-01', officialItem: 'signature는 invalidate() : self이며 Parameters 절은 없다.', source: 'invalidate', origin: 'official', sectionId: 'call-forms' },
  { id: 'INV-02', officialItem: 'Returns는 chaining을 위한 self다.', source: 'invalidate', origin: 'official', sectionId: 'call-forms' },

  { id: 'INV-11', officialItem: '마지막 문장은 single Tween에서 invalidate가 동작하는 비공식 video가 아래에 있다고 안내한다.', source: 'invalidate', origin: 'official', sectionId: 'boundaries' },

  { id: 'TR-P1', officialItem: '새 Timeline getter 기본값은 repeat 0, repeatDelay 0, yoyo false, iteration 1이다.', source: 'repeat', origin: 'implementation', sectionId: 'repeat-count' },
  { id: 'TR-P2', officialItem: 'totalDuration = duration × (repeat + 1) + repeatDelay × repeat이며 repeat -1은 10000000000을 돌려준다.', source: 'repeat', origin: 'implementation', sectionId: 'repeat-count' },
  { id: 'TR-P3', officialItem: '회차 끝 경계와 repeatDelay 구간은 끝난 회차 iteration에 속하며 target 값도 끝값에서 멈춘다.', source: 'iteration', origin: 'implementation', sectionId: 'iteration-number' },
  { id: 'TR-P4', officialItem: '두 child sequence의 yoyo 역회차에서는 뒤 child가 먼저 되감기고 Timeline reversed()는 false로 유지된다.', source: 'yoyo', origin: 'implementation', sectionId: 'yoyo-direction' },
  { id: 'TR-P5', officialItem: 'iteration(value) setter는 Timeline 자신을 돌려주고 해당 cycle 위치로 이동한다.', source: 'iteration', origin: 'implementation', sectionId: 'iteration-number' },
  { id: 'TR-P6', officialItem: 'function value child 두 개는 첫 초기화에 counter 2를 쓰고 restart만 하면 counter가 늘지 않는다.', source: 'invalidate', origin: 'implementation', sectionId: 'invalidate-children' },
  { id: 'TR-P7', officialItem: '부모 Timeline invalidate 뒤 같은 children을 render하면 function value counter가 4로 늘어 child 둘 모두 재해석됐음을 확인할 수 있다.', source: 'invalidate', origin: 'implementation', sectionId: 'invalidate-children' },
  { id: 'TR-P8', officialItem: 'invalidate는 Timeline 자신을 돌려주며 전후 duration, startTime, delay가 그대로다.', source: 'invalidate', origin: 'implementation', sectionId: 'invalidate-children' },
]
