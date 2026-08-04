/** 공식 다섯 문서에서 확인한 기술 item 38개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'invalidate' | 'iteration' | 'repeat' | 'repeat-delay' | 'yoyo'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 반복 회차와 값 재계산에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const tweenRepeatsSourceItems: SourceItem[] = [
  // 01 repeat-count — source:tween-repeat
  { id: 'REP-04', officialItem: 'repeat는 tween이 첫 iteration 이후 몇 번 반복할지를 가져오거나 설정한다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-05', officialItem: 'repeat가 1이면 tween은 총 두 번 재생된다(최초 재생 + 1회 반복).', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-06', officialItem: '무한히 반복하려면 -1을 쓴다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-07', officialItem: 'repeat는 항상 정수여야 한다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-08', officialItem: '반복이 정방향·역방향을 번갈아 가게 하려면 yoyo를 true로 두고, 반복 사이에 시간 간격을 넣으려면 repeatDelay를 쓴다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },
  { id: 'REP-09', officialItem: 'repeat 초기값은 vars로 설정할 수 있다: gsap.to(obj, {duration: 1, x: 100, repeat: 2}). 공식 코드 예제는 getter myTween.repeat()와 setter myTween.repeat(2)이고, chaining 예는 myTween.repeat(2).yoyo(true).play()이다.', source: 'repeat', origin: 'official', sectionId: 'repeat-count' },

  // 02 repeat-gap — source:tween-repeat-delay
  { id: 'RPD-04', officialItem: 'repeatDelay는 반복 사이의 시간을 초 단위로 가져오거나 설정한다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },
  { id: 'RPD-05', officialItem: 'repeat가 2이고 repeatDelay가 1이면 tween은 먼저 재생되고, 1초 기다렸다 반복하고, 다시 재생한 뒤, 또 1초 기다렸다 마지막 반복을 한다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },
  { id: 'RPD-06', officialItem: 'repeatDelay 초기값은 vars로 설정할 수 있다: gsap.to(obj, {duration: 1, x: 100, repeat: 2, repeatDelay: 1}). 공식 코드 예제는 getter myTween.repeatDelay()와 setter myTween.repeatDelay(2)이고, chaining 예는 myTween.repeat(2).yoyo(true).repeatDelay(0.5).play()이다.', source: 'repeat-delay', origin: 'official', sectionId: 'repeat-gap' },

  // 03 yoyo-direction — source:tween-yoyo
  { id: 'YOY-04', officialItem: 'yoyo가 true면 tween이 앞뒤로 오가며 매 repeat마다 정방향과 역방향을 번갈아 간다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-05', officialItem: 'yoyo는 repeat와 함께 동작한다. repeat가 몇 번 반복할지를, yoyo가 각 반복이 방향을 바꿀지를 정한다. 그래서 tween을 yoyo시키려면 repeat를 0이 아닌 값으로 두어야 한다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-06', officialItem: 'yoyo 동작은 tween의 reversed property에 영향을 주지 않는다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-07', officialItem: 'repeat가 2이고 yoyo가 false면 start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end로 보이고, yoyo가 true면 start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end로 보인다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },
  { id: 'YOY-08', officialItem: 'yoyo 초기값은 vars로 설정할 수 있다: gsap.to(obj, {duration: 1, x: 100, repeat: 1, yoyo: true}). 공식 코드 예제는 getter myAnimation.yoyo()와 setter myAnimation.yoyo(true)이고, chaining 예는 myAnimation.yoyo(true).repeat(3).timeScale(2).play(0.5)이다.', source: 'yoyo', origin: 'official', sectionId: 'yoyo-direction' },

  // 04 iteration-number — source:tween-iteration
  { id: 'ITR-03', officialItem: '반복하는 tween의 iteration(현재 몇 번째 회차인지)을 가져오거나 설정한다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },
  { id: 'ITR-04', officialItem: 'iteration은 맨 처음 지나갈 때 1이고, 첫 번째 repeat에서 2가 되고, 그다음 3이 되는 식이다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },
  { id: 'ITR-05', officialItem: 'iteration을 설정하면 tween이 그 iteration으로 이동한다. repeat가 4이고 playhead가 세 번째 repeat에 있을 때 .iteration(2)를 부르면 tween이 두 번째 iteration으로 되돌아간다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },
  { id: 'ITR-06', officialItem: '공식 코드 예제는 getter var progress = myTween.iteration()와 setter myTween.iteration(2)이다.', source: 'iteration', origin: 'official', sectionId: 'iteration-number' },

  // 05 invalidate-recompute — source:tween-invalidate
  { id: 'INV-03', officialItem: '내부에 기록된 시작·끝 값 같은 초기화 데이터를 지운다. 이전에 기록된 시작값으로 되돌아가지 않고 tween을 restart하고 싶을 때 유용하다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },
  { id: 'INV-04', officialItem: 'animation을 invalidate()하면 다음에 render될 때 다시 초기화되고 vars 객체가 다시 parsing된다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },
  { id: 'INV-05', officialItem: 'animation의 timing(duration, startTime, delay)은 영향을 받지 않는다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },
  { id: 'INV-06', officialItem: '공식 예제: element.x가 0일 때 gsap.to(element, {duration: 2, x: "+=100"})은 2초 동안 0에서 100으로 간다. 그 tween을 restart()하면 정확히 같은 일을 한다(0에서 100으로).', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },
  { id: 'INV-07', officialItem: '공식 예제 이어서: tween이 한 번 실행된 뒤 내부에 기록된 시작·끝 값을 비우면 x가 지금 위치(이 예에서는 100)보다 100 더 가게 된다. invalidate()를 부르면 다음 render에서 시작·끝 값을 다시 parsing해 x를 100에서 200으로 움직인다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },
  { id: 'INV-08', officialItem: 'timeline을 invalidate하면 그 children이 자동으로 모두 invalidate된다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },
  { id: 'INV-09', officialItem: 'Note: tween이 반복할 때마다 invalidate()하고 싶을 뿐이라면 repeatRefresh: true 특수 property를 쓸 수 있다.', source: 'invalidate', origin: 'official', sectionId: 'invalidate-recompute' },

  // 06 call-forms — 다섯 문서의 signature·parameter·return 계약
  { id: 'INV-01', officialItem: 'signature는 invalidate( ) : self 이고 Parameters 절이 없다.', source: 'invalidate', origin: 'official', sectionId: 'call-forms' },
  { id: 'INV-02', officialItem: '반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'invalidate', origin: 'official', sectionId: 'call-forms' },
  { id: 'ITR-01', officialItem: 'signature는 iteration( ) : [Number | self] 이고 Parameters 절이 없다. 괄호 안이 비어 있는데도 Details는 setter 사용법을 설명한다.', source: 'iteration', origin: 'official', sectionId: 'call-forms' },
  { id: 'ITR-02', officialItem: '인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter이며 chaining을 위해 instance 자신을 돌려준다.', source: 'iteration', origin: 'official', sectionId: 'call-forms' },
  { id: 'REP-01', officialItem: 'signature는 repeat( value:Number ) : [Number | self] 이다.', source: 'repeat', origin: 'official', sectionId: 'call-forms' },
  { id: 'REP-02', officialItem: 'parameter value는 Number이고 default = 0 이다.', source: 'repeat', origin: 'official', sectionId: 'call-forms' },
  { id: 'REP-03', officialItem: '인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter이며 chaining을 위해 instance 자신을 돌려준다.', source: 'repeat', origin: 'official', sectionId: 'call-forms' },
  { id: 'RPD-01', officialItem: 'signature는 repeatDelay( value:Number ) : [Number | self] 이다.', source: 'repeat-delay', origin: 'official', sectionId: 'call-forms' },
  { id: 'RPD-02', officialItem: 'parameter value는 Number이고 default = NaN 이다.', source: 'repeat-delay', origin: 'official', sectionId: 'call-forms' },
  { id: 'RPD-03', officialItem: '인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter이며 chaining을 위해 instance 자신을 돌려준다.', source: 'repeat-delay', origin: 'official', sectionId: 'call-forms' },
  { id: 'YOY-01', officialItem: 'signature는 yoyo( value:Boolean ) : [Boolean | self] 이다.', source: 'yoyo', origin: 'official', sectionId: 'call-forms' },
  { id: 'YOY-02', officialItem: 'parameter value는 Boolean이고 default = false 이다.', source: 'yoyo', origin: 'official', sectionId: 'call-forms' },
  { id: 'YOY-03', officialItem: '인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter이며 chaining을 위해 instance 자신을 돌려준다.', source: 'yoyo', origin: 'official', sectionId: 'call-forms' },

  // 공식 문서에 없고 GSAP 3.15.0 실행으로만 확인한 항목 — coverage 분모에 넣지 않는다
  { id: 'ITR-P1', officialItem: 'iteration()은 어떤 조합에서도 1부터 시작한다. repeat 0·1·2·-1 × yoyo × repeatDelay 조합과 duration 0, gsap.set()까지 totalTime 0에서 전부 1이었고 0인 경우가 없었다.', source: 'iteration', origin: 'implementation', sectionId: 'iteration-number' },
  { id: 'ITR-P2', officialItem: '회차 경계 시각은 끝난 회차에 속한다. duration 1·repeat 2에서 totalTime 1.0은 iteration 1이고 1.0001에서야 2가 되며, 마지막 끝(3.0)에서도 3에 머문다.', source: 'iteration', origin: 'implementation', sectionId: 'iteration-number' },
  { id: 'ITR-P3', officialItem: 'iteration() setter는 회차 안의 위치를 유지한 채 점프하고, 범위를 넘는 값은 마지막 회차 끝으로 잘린다. repeat 4에서 totalTime 2.5(3회차)에 iteration(2)를 부르면 totalTime 1.5가 되고, iteration(99)는 totalTime 5로 잘린다.', source: 'iteration', origin: 'implementation', sectionId: 'iteration-number' },
  { id: 'YOY-P1', officialItem: 'yoyo가 켜지면 홀수 회차가 정방향, 짝수 회차가 역방향이다. repeat 1~4와 repeatDelay 유무에 관계없이 같았다. 예외로 repeat가 0이면 yoyo: true를 넘겨도 yoyo() getter가 false를 돌려준다.', source: 'yoyo', origin: 'implementation', sectionId: 'yoyo-direction' },
  { id: 'REP-P1', officialItem: 'repeat: -1이면 totalDuration()이 Infinity가 아니라 10000000000이라는 고정 상수를 돌려준다. duration 0.5·1·2·5와 repeatDelay 0·1 조합 전부에서 같은 값이었다.', source: 'repeat', origin: 'implementation', sectionId: 'repeat-count' },
  { id: 'REP-P2', officialItem: 'repeat가 0 이상일 때 totalDuration은 duration × (repeat + 1) + repeatDelay × repeat이다. duration 0.5·1·2 × repeat 0~3 × repeatDelay 0·0.25·1의 36개 조합에서 어긋난 경우가 없었다.', source: 'repeat', origin: 'implementation', sectionId: 'repeat-count' },
  { id: 'RPD-P1', officialItem: 'repeatDelay 틈 동안에는 iteration()과 대상 값이 모두 멈춘다. duration 1·repeat 2·repeatDelay 0.5에서 totalTime 1.0~1.5 구간은 iteration 1과 값 1을 유지한다.', source: 'repeat-delay', origin: 'implementation', sectionId: 'repeat-gap' },
  { id: 'RPD-P2', officialItem: 'repeatDelay를 지정하지 않은 tween의 repeatDelay() getter는 숫자 0을 돌려준다. 공식 parameter 표의 default = NaN과 다르다.', source: 'repeat-delay', origin: 'implementation', sectionId: 'call-forms' },
  { id: 'INV-P1', officialItem: 'invalidate()는 repeat·yoyo·repeatDelay·totalDuration을 건드리지 않고, 목적지가 절대값이어도 시작값만 다시 읽는다. x: 100 tween을 끝낸 뒤 x를 500으로 바꾸고 invalidate()하면 500에서 100으로 간다. 첫 render 전에 부르면 아무 효과가 없다.', source: 'invalidate', origin: 'implementation', sectionId: 'invalidate-recompute' },
]
