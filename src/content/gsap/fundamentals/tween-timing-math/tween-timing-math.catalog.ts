/** 공식 일곱 문서에서 확인한 기술 item 41개와 실행으로만 확인한 10개를 로컬 섹션과 묶어 coverage 근거로 남긴다. */

/** 일곱 공식 페이지를 catalog 안에서 짧은 식별자로 구분한다. */
export type TimingSource =
  | 'delay'
  | 'duration'
  | 'total-duration'
  | 'start-time'
  | 'end-time'
  | 'time-scale'
  | 'global-time'

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: TimingSource
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** Tween 시간 계산에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const tweenTimingMathSourceItems: SourceItem[] = [
  // 01 시간축 하나로 전부 보기 — delay가 시간축의 어디에 놓이는지
  { id: 'DL-01', officialItem: 'signature는 delay( value:Number ) : [Number | self]이다.', source: 'delay', origin: 'official', sectionId: 'time-axis' },
  { id: 'DL-04', officialItem: 'delay는 애니메이션이 시작하기 전까지 기다리는 초 단위 시간이며, getter이자 setter다.', source: 'delay', origin: 'official', sectionId: 'time-axis' },
  { id: 'DL-05', officialItem: 'tween의 시작값은 delay가 끝나기 전에는 기록되지 않는다. 단 from() tween은 기본적으로 즉시 렌더되며 vars에 immediateRender: false를 주면 막을 수 있다.', source: 'delay', origin: 'official', sectionId: 'time-axis' },
  { id: 'DL-06', officialItem: 'delay는 timeScale의 영향을 받지 않는다. timeScale을 1에서 10으로 바꿔도 delay가 열 배로 늘어나지 않는다.', source: 'delay', origin: 'official', sectionId: 'time-axis' },
  { id: 'DL-07', officialItem: '공식 예제는 var currentDelay = myAnimation.delay(); //gets current delay 와 myAnimation.delay(2); //sets delay 두 줄이다.', source: 'delay', origin: 'official', sectionId: 'time-axis' },

  // 02 일곱 개가 전부 같은 모양이다 — 다섯 메서드가 공유하는 인자·반환 계약
  { id: 'DL-02', officialItem: 'delay의 인자 value는 Number이고 기본값은 NaN이다.', source: 'delay', origin: 'official', sectionId: 'getter-setter' },
  { id: 'DL-03', officialItem: 'delay는 인자를 생략하면 현재 값을 돌려주고(getter), 인자를 주면 값을 설정한 뒤(setter) 체이닝을 위해 인스턴스 자신을 돌려준다. 예: myAnimation.delay(2).timeScale(0.5).restart(true);', source: 'delay', origin: 'official', sectionId: 'getter-setter' },
  { id: 'DU-02', officialItem: 'duration의 인자 value는 Number이고 기본값은 NaN이다.', source: 'duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'DU-03', officialItem: 'duration은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다. 예: myAnimation.duration(2).delay(0.5).play(1);', source: 'duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TD-02', officialItem: 'totalDuration의 인자 value는 Number이고 기본값은 NaN이다.', source: 'total-duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TD-03', officialItem: 'totalDuration은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다.', source: 'total-duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'ST-02', officialItem: 'startTime의 인자 value는 Number이고 기본값은 NaN이다.', source: 'start-time', origin: 'official', sectionId: 'getter-setter' },
  { id: 'ST-03', officialItem: 'startTime은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다.', source: 'start-time', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TS-02', officialItem: 'timeScale의 인자 value는 Number이고 기본값은 NaN이다.', source: 'time-scale', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TS-03', officialItem: 'timeScale은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다.', source: 'time-scale', origin: 'official', sectionId: 'getter-setter' },

  // 03 duration과 totalDuration이 갈리는 곳 — 반복을 세는가 세지 않는가
  { id: 'DU-01', officialItem: 'signature는 duration( value:Number ) : [Number | self]이다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'DU-04', officialItem: 'duration은 애니메이션의 길이를 초 단위로 읽고 쓰며, repeat과 repeatDelay를 포함하지 않는다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'DU-05', officialItem: '공식 예: tween의 duration이 2이고 repeat이 3이면 totalDuration은 8이다. 기본 재생 한 번에 반복 3회를 더해 총 4 cycle이기 때문이다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'DU-06', officialItem: '공식 예제는 var currentDuration = myAnimation.duration(); //gets current duration 과 myAnimation.duration(2); //sets duration 두 줄이다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-01', officialItem: 'signature는 totalDuration( value:Number ) : [Number | self]이다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-04', officialItem: 'totalDuration은 repeat과 repeatDelay를 포함한 tween의 총 길이를 초 단위로 읽고 쓴다. duration은 반대로 repeat과 repeatDelay를 포함하지 않는다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-05', officialItem: '공식 예: tween의 duration이 10, repeat이 1, repeatDelay가 2이면 totalDuration은 22다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-06', officialItem: '공식 예제는 var total = myTween.totalDuration(); //gets total duration 과 myTween.totalDuration(10); //sets the total duration 두 줄이다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },

  // 04 부모 시간축 위의 시작점과 끝점 — startTime과 endTime
  { id: 'ST-01', officialItem: 'signature는 startTime( value:Number ) : [Number | self]이다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ST-04', officialItem: 'startTime은 애니메이션이 부모 timeline 위에서 시작하는 시각을 읽고 쓴다. 정의된 delay가 반영된 뒤의 값이다. 예를 들어 tween이 timeline의 정확히 3초 지점에서 시작하면 startTime은 3이다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ST-05', officialItem: '부모 timeline의 smoothChildTiming이 true이고 reverse() 호출이나 timeScale() 변경 같은 타이밍 의존 변화가 실행 중에 일어나면, 타이밍이 매끄러워 보이도록 startTime이 자동으로 조정될 수 있다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ST-06', officialItem: '공식 예제는 //gets current start time / var start = myAnimation.startTime(); 과 //sets the start time / myAnimation.startTime(2); 이다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-01', officialItem: 'signature는 endTime( includeRepeats:Boolean ) : Number이다. 다른 여섯과 달리 setter가 없다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-02', officialItem: '인자 includeRepeats는 Boolean이고 기본값은 true다. 기본적으로 repeat이 종료 시각 계산에 포함되며 false를 넘기면 포함하지 않는다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-03', officialItem: '반환값은 Number이며, 부모 timeline의 local time 기준으로 애니메이션이 끝나는 시각이다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-04', officialItem: 'endTime은 timeScale을 계산에 반영한다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-05', officialItem: '공식 예제는 1초짜리 tween을 timeline의 0.5초 지점에 넣어 endTime이 1.5임을 보이고, timeScale(2)로 속도를 두 배로 올린 뒤 endTime이 1이 됨을 보인다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },

  // 05 timeScale은 길이가 아니라 속도를 바꾼다
  { id: 'TS-01', officialItem: 'signature는 timeScale( value:Number ) : [Number | self]이다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },
  { id: 'TS-04', officialItem: 'timeScale은 애니메이션의 시간을 배율로 조절하는 계수다. 1이 기본이자 정상 속도, 0.5는 절반 속도, 2는 두 배 속도, -1은 정상 속도로 거꾸로 재생이다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },
  { id: 'TS-05', officialItem: '공식 예: duration이 2인데 timeScale이 0.5면 끝나는 데 4초가 걸린다. 그 애니메이션을 timeScale이 0.5인 timeline 안에 중첩하면 8초가 걸린다. timeScale 자체를 tween해서 서서히 느리게 하거나 빠르게 할 수도 있다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },
  { id: 'TS-06', officialItem: '공식 예제는 //gets current timeScale / var currentTimeScale = myAnimation.timeScale(); 과 //sets timeScale to half-speed / myAnimation.timeScale(0.5); 이다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },

  // 06 중첩을 다 풀어 전역 시계로
  { id: 'GT-01', officialItem: 'signature는 globalTime( localTime:Number ) : Number이다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-02', officialItem: '인자 localTime은 Number이며 global time으로 변환할 local time이다. 공식 페이지에 기본값 표기가 없다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-03', officialItem: '반환값은 Number이며 gsap.globalTimeline 위의 대응하는 시각이다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-04', officialItem: 'local time을 gsap.globalTimeline의 대응 시각으로 변환하며 모든 중첩과 timeScale 등을 반영한다. 다른 timeline 안의 timeline에 중첩된 tween의 시작 시각 0이 전역 timeline의 어디에 놓이는지 알려면 tween.globalTime(0)을 부른다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-05', officialItem: '기본적으로 tween의 totalTime을 사용하므로 tween.globalTime()은 tween.globalTime(tween.totalTime())과 같다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },

  // 공식 문서에 없어 GSAP 3.15.0을 직접 실행해 확인한 항목
  { id: 'PR-01', officialItem: 'totalDuration = duration × (repeat + 1) + repeatDelay × repeat. 공식은 두 개의 예시 숫자만 보여 주고 식을 적지 않는다.', source: 'total-duration', origin: 'implementation', sectionId: 'duration-total' },
  { id: 'PR-02', officialItem: 'duration(v)과 totalDuration(v) setter는 서로를 다시 계산하며 timeScale은 건드리지 않는다. 공식 문서에 이 부작용이 없다.', source: 'total-duration', origin: 'implementation', sectionId: 'duration-total' },
  { id: 'PR-03', officialItem: 'repeat이 -1이면 totalDuration()이 10000000000을 돌려준다. 공식 문서는 무한 반복 시의 반환값을 말하지 않는다.', source: 'total-duration', origin: 'implementation', sectionId: 'duration-total' },
  { id: 'PR-04', officialItem: 'endTime(true) = startTime + totalDuration ÷ |timeScale|, endTime(false) = startTime + duration ÷ |timeScale|. 공식은 timeScale을 반영한다고만 적고 식을 적지 않는다.', source: 'end-time', origin: 'implementation', sectionId: 'start-end' },
  { id: 'PR-05', officialItem: 'timeline 안에서 startTime = 배치 위치 + delay다. 공식은 "정의된 delay가 반영된 뒤"라고만 적는다.', source: 'start-time', origin: 'implementation', sectionId: 'start-end' },
  { id: 'PR-06', officialItem: 'gsap.timeline()으로 만든 timeline의 smoothChildTiming 기본값은 false이고 gsap.globalTimeline만 true다. 그래서 ST-05의 자동 조정은 기본 설정에서 일어나지 않는다.', source: 'start-time', origin: 'implementation', sectionId: 'start-end' },
  { id: 'PR-07', officialItem: 'timeScale을 바꿔도 duration()과 totalDuration()의 반환값은 그대로다. 바뀌는 것은 endTime뿐이다.', source: 'time-scale', origin: 'implementation', sectionId: 'time-scale' },
  { id: 'PR-08', officialItem: 'paused 상태의 animation은 endTime()이 timeScale을 반영하지 않고 1인 것처럼 계산한다.', source: 'time-scale', origin: 'implementation', sectionId: 'time-scale' },
  { id: 'PR-09', officialItem: 'globalTime은 자기 자신부터 부모를 따라 올라가며 time = startTime + time ÷ |timeScale|을 반복해 계산한다.', source: 'global-time', origin: 'implementation', sectionId: 'global-time' },
  { id: 'PR-10', officialItem: '인자 없는 globalTime()은 totalTime()이 아니라 재생 헤드 기준 rawTime을 쓴다. 부모 재생 헤드가 tween 위에 있지 않으면 GT-05의 등식이 성립하지 않는다.', source: 'global-time', origin: 'implementation', sectionId: 'global-time' },
]
