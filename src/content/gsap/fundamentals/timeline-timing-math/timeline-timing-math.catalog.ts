/** 공식 일곱 문서에서 확인한 기술 item 47개와 실행으로만 확인한 17개를 로컬 섹션과 묶어 coverage 근거로 남긴다. */

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

/** Timeline 시간 계산에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const timelineTimingMathSourceItems: SourceItem[] = [
  // 01 길이를 정하는 건 children이다 — timeline 자신의 delay가 시간축의 어디에 놓이는지
  { id: 'DL-01', officialItem: 'signature는 delay( value:Number ) : [Number | self]이다.', source: 'delay', origin: 'official', sectionId: 'children-clock' },
  { id: 'DL-04', officialItem: 'delay는 애니메이션이 시작하기 전까지 기다리는 초 단위 시간이며, 읽고 쓰는 값이다.', source: 'delay', origin: 'official', sectionId: 'children-clock' },
  { id: 'DL-05', officialItem: 'tween의 시작값은 delay가 끝나기 전에는 기록되지 않는다. 단 from() tween은 기본적으로 즉시 렌더되며 vars에 immediateRender: false를 주면 막을 수 있다.', source: 'delay', origin: 'official', sectionId: 'children-clock' },
  { id: 'DL-06', officialItem: 'delay는 timeScale의 영향을 받지 않는다. timeScale을 1에서 10으로 바꿔도 delay가 열 배로 늘어나지 않는다.', source: 'delay', origin: 'official', sectionId: 'children-clock' },
  { id: 'DL-07', officialItem: '공식 예제는 //gets current delay / var currentDelay = myAnimation.delay(); 와 //sets delay / myAnimation.delay(2); 이다.', source: 'delay', origin: 'official', sectionId: 'children-clock' },

  // 02 다섯 개가 전부 같은 모양이다 — 다섯 메서드가 공유하는 인자·반환 계약
  { id: 'DL-02', officialItem: 'delay의 인자 value는 Number이고 기본값은 NaN이다.', source: 'delay', origin: 'official', sectionId: 'getter-setter' },
  { id: 'DL-03', officialItem: 'delay는 인자를 생략하면 현재 값을 돌려주고(getter), 인자를 주면 값을 설정한 뒤(setter) 체이닝을 위해 인스턴스 자신을 돌려준다. 예: myAnimation.delay(2).timeScale(0.5).play(1);', source: 'delay', origin: 'official', sectionId: 'getter-setter' },
  { id: 'DU-02', officialItem: 'duration의 인자 value는 Number이고 기본값은 NaN이다.', source: 'duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'DU-03', officialItem: 'duration은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다. 예: myAnimation.duration(2).play(1);', source: 'duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TD-02', officialItem: 'totalDuration의 인자 value는 Number이고 기본값은 NaN이다.', source: 'total-duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TD-03', officialItem: 'totalDuration은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다.', source: 'total-duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TD-04', officialItem: 'totalDuration의 인자 설명에는 "음수 값은 애니메이션의 END에서부터 해석된다"는 문장이 붙어 있다. 다른 네 메서드에는 이 문장이 없다.', source: 'total-duration', origin: 'official', sectionId: 'getter-setter' },
  { id: 'ST-02', officialItem: 'startTime의 인자 value는 Number이고 기본값은 NaN이다.', source: 'start-time', origin: 'official', sectionId: 'getter-setter' },
  { id: 'ST-03', officialItem: 'startTime은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다.', source: 'start-time', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TS-02', officialItem: 'timeScale의 인자 value는 Number이고 기본값은 NaN이다.', source: 'time-scale', origin: 'official', sectionId: 'getter-setter' },
  { id: 'TS-03', officialItem: 'timeScale은 인자를 생략하면 getter, 주면 setter이며 인스턴스 자신을 돌려준다. 예: myAnimation.timeScale(2).play(1);', source: 'time-scale', origin: 'official', sectionId: 'getter-setter' },

  // 03 duration과 totalDuration이 갈리는 곳 — 반복을 세는가 세지 않는가
  { id: 'DU-01', officialItem: 'signature는 duration( value:Number ) : [Number | self]이다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'DU-05', officialItem: 'duration()은 totalDuration()과 동일하되, repeat이 0이 아닌 timeline에서만 갈린다. 그 경우 totalDuration은 repeat과 repeatDelay를 포함하고 duration은 포함하지 않는다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'DU-06', officialItem: '공식 예: timeline의 duration이 2이고 repeat이 3이면 totalDuration은 8이다. 기본 재생 한 번에 반복 3회를 더해 총 4 cycle이기 때문이다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'DU-09', officialItem: '공식 예제는 //gets current duration / var currentDuration = tl.duration(); 과 //adjusts the timeScale of myAnimation so that it fits into exactly 10 seconds on its parent timeline / tl.duration(10); 이다.', source: 'duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-01', officialItem: 'signature는 totalDuration( value:Number ) : [Number | self]이다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-05', officialItem: 'totalDuration은 repeat과 repeatDelay를 포함한 timeline의 총 길이를 초 단위로 읽고 쓴다. duration은 반대로 repeat과 repeatDelay를 포함하지 않는다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-06', officialItem: '공식 예: duration이 10, repeat이 1, repeatDelay가 2이면 totalDuration은 22다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },
  { id: 'TD-08', officialItem: '공식 예제는 //gets total duration / var total = tl.totalDuration(); 과 //adjusts the timeScale of the timeline so that it fits into exactly 10 seconds on its parent timeline / tl.totalDuration(10); 이다.', source: 'total-duration', origin: 'official', sectionId: 'duration-total' },

  // 04 setter는 길이가 아니라 배속을 바꾼다 — Timeline이 Tween과 가장 크게 갈리는 지점
  { id: 'DU-04', officialItem: 'duration()은 timeline의 duration을 읽거나, setter로 쓰면 그 duration 안에 들어맞도록 timeline의 timeScale을 조정한다.', source: 'duration', origin: 'official', sectionId: 'setter-scales' },
  { id: 'DU-07', officialItem: 'timeline의 duration은 그 내용물이 결정하기 때문에, 이 메서드를 setter로 쓰면 현재 내용물을 지정한 duration에 맞추도록 timeScale이 조정될 뿐이고 duration 값 자체는 변하지 않는다.', source: 'duration', origin: 'official', sectionId: 'setter-scales' },
  { id: 'DU-08', officialItem: '공식 예: timeline 안에 20초치 tween이 있을 때 myTimeline.duration(10)을 하면 timeScale이 2로 바뀐다. 직후에 duration을 다시 확인하면 여전히 20을 돌려주는데, 자식 tween과 timeline이 실제로 그만큼 길기 때문이다. 다만 재생할 때는 timeScale 때문에 속도가 두 배가 된다.', source: 'duration', origin: 'official', sectionId: 'setter-scales' },
  { id: 'TD-07', officialItem: 'timeline의 duration은 그 내용물이 결정하기 때문에, totalDuration을 setter로 쓰면 현재 내용물을 지정한 totalDuration에 맞추도록 timeScale이 조정될 뿐이고 totalDuration(과 duration) 값 자체는 변하지 않는다.', source: 'total-duration', origin: 'official', sectionId: 'setter-scales' },

  // 05 부모 시간축 위의 시작점과 끝점 — startTime과 endTime
  { id: 'ST-01', officialItem: 'signature는 startTime( value:Number ) : [Number | self]이다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ST-04', officialItem: 'startTime은 애니메이션이 부모 timeline 위에서 시작하는 시각을 읽고 쓴다. 정의된 delay가 반영된 뒤의 값이다. 예를 들어 tween이 timeline의 정확히 3초 지점에서 시작하면 startTime은 3이다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ST-05', officialItem: '부모 timeline의 smoothChildTiming이 true이고 reverse() 호출이나 timeScale() 변경 같은 타이밍 의존 변화가 실행 중에 일어나면, 타이밍이 매끄러워 보이도록 startTime이 자동으로 조정될 수 있다. 공식 문서는 Timeline의 smoothChildTiming 속성 페이지를 함께 안내한다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ST-06', officialItem: '공식 예제는 //gets current start time / var start = tl.startTime(); 과 //set / tl.startTime(2); 이다.', source: 'start-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-01', officialItem: '공식 화면의 signature 표기는 endTime( includeRepeats:Boolean ) : [Number | self]이다. 인자가 값이 아니라 Boolean이라는 점에서 다른 다섯과 다르다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-02', officialItem: '인자 includeRepeats는 Boolean이고 기본값은 true다. 기본적으로 repeat이 종료 시각 계산에 포함되며 false를 넘기면 포함하지 않는다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-03', officialItem: 'Returns 절의 설명은 "부모 timeline 기준으로 본 timeline의 종료 시각"이다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-04', officialItem: 'Details 절의 정의는 "부모 timeline의 local time 기준으로 애니메이션이 끝나는 시각을 돌려준다"이다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-05', officialItem: 'endTime은 timeScale을 계산에 반영한다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },
  { id: 'ET-06', officialItem: '공식 예제는 1초짜리 tween을 timeline의 0.5초 지점에 넣어 endTime이 1.5임을 보이고, timeScale(2)로 속도를 두 배로 올린 뒤 endTime이 1이 됨을 보인다.', source: 'end-time', origin: 'official', sectionId: 'start-end' },

  // 06 timeScale은 길이가 아니라 속도를 바꾼다
  { id: 'TS-01', officialItem: 'signature는 timeScale( value:Number ) : [Number | self]이다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },
  { id: 'TS-04', officialItem: 'timeScale은 애니메이션의 시간을 배율로 조절하는 계수다. 1이 기본이자 정상 속도, 0.5는 절반 속도, 2는 두 배 속도, -1은 정상 속도로 거꾸로 재생이다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },
  { id: 'TS-05', officialItem: '공식 예: duration이 2인데 timeScale이 0.5면 끝나는 데 4초가 걸린다. 그 애니메이션을 timeScale이 0.5인 timeline 안에 중첩하면 8초가 걸린다. timeScale 자체를 tween해서 서서히 느리게 하거나 빠르게 할 수도 있다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },
  { id: 'TS-06', officialItem: '공식 예제는 //gets current timeScale / var currentTimeScale = tl.timeScale(); 과 //sets timeScale to half-speed / tl.timeScale(0.5); 이다.', source: 'time-scale', origin: 'official', sectionId: 'time-scale' },

  // 07 중첩을 다 풀어 전역 시계로
  { id: 'GT-01', officialItem: 'signature는 globalTime( localTime:Number ) : Number이다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-02', officialItem: '인자 localTime은 Number이며 global timeline 위의 대응 시각으로 변환할 local time이다. 공식 페이지에 기본값 표기가 없다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-03', officialItem: 'Returns 절은 Number이며 설명은 "global timeline 위의 대응하는 시각"이다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-04', officialItem: 'local time을 gsap.globalTimeline의 대응 시각으로 변환하며 모든 중첩과 timeScale 등을 반영한다. 다른 timeline 안의 timeline에 중첩된 timeline의 시작 시각 0이 전역 timeline의 어디에 놓이는지 알려면 yourTimeline.globalTime(0)을 부른다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },
  { id: 'GT-05', officialItem: '기본적으로 애니메이션의 totalTime을 사용하므로 yourTimeline.globalTime()은 yourTimeline.globalTime(tween.totalTime())과 같다.', source: 'global-time', origin: 'official', sectionId: 'global-time' },

  // 공식 문서에 없어 GSAP 3.15.0을 직접 실행해 확인한 항목
  { id: 'PR-01', officialItem: '빈 timeline의 duration()은 0이고, child를 넣거나 빼면 duration이 따라 변한다. 길이의 출처가 children뿐이라는 뜻이다.', source: 'duration', origin: 'implementation', sectionId: 'children-clock' },
  { id: 'PR-02', officialItem: 'child의 delay와 배치 위치도 timeline의 duration에 그대로 더해진다. 같은 위치에 겹쳐 넣은 child는 duration을 늘리지 않는다.', source: 'duration', origin: 'implementation', sectionId: 'children-clock' },
  { id: 'PR-03', officialItem: 'timeline 자신의 delay는 duration과 totalDuration에 포함되지 않고 startTime에만 들어간다.', source: 'delay', origin: 'implementation', sectionId: 'children-clock' },
  { id: 'PR-04', officialItem: 'totalDuration = duration × (repeat + 1) + repeatDelay × repeat. 공식은 두 개의 예시 숫자만 보여 주고 식을 적지 않는다.', source: 'total-duration', origin: 'implementation', sectionId: 'duration-total' },
  { id: 'PR-05', officialItem: 'repeat이 -1이면 totalDuration()이 10000000000을 돌려준다. 공식 문서는 무한 반복 시의 반환값을 말하지 않는다.', source: 'total-duration', origin: 'implementation', sectionId: 'duration-total' },
  { id: 'PR-06', officialItem: 'duration() setter는 children을 전혀 건드리지 않는다. 각 child의 duration·startTime·timeScale·endTime이 호출 전후로 완전히 같고, 바뀌는 것은 timeline 자신의 timeScale뿐이다.', source: 'duration', origin: 'implementation', sectionId: 'setter-scales' },
  { id: 'PR-07', officialItem: 'duration(v)의 새 timeScale = totalDuration ÷ (v × (repeat + 1) + repeatDelay × repeat), totalDuration(v)의 새 timeScale = totalDuration ÷ v다. 둘 다 이전 timeScale을 무시하고 절대값으로 다시 계산한다.', source: 'duration', origin: 'implementation', sectionId: 'setter-scales' },
  { id: 'PR-08', officialItem: 'setter가 실제로 바꾸는 것은 부모가 이 timeline에 배정하는 시간이다. 부모의 duration()과 이 timeline의 endTime()이 지정한 값으로 줄어든다.', source: 'duration', origin: 'implementation', sectionId: 'setter-scales' },
  { id: 'PR-09', officialItem: 'setter로 맞춰 둔 길이는 children이 바뀌면 깨진다. child를 더하거나 빼도 timeScale은 그대로 남고, 빈 timeline에 부르면 timeScale이 0이 된다.', source: 'duration', origin: 'implementation', sectionId: 'setter-scales' },
  { id: 'PR-10', officialItem: 'endTime은 includeRepeats 여부만 받는 getter이며 실행과 설치 타입 모두 Number만 반환한다. true면 startTime + totalDuration ÷ |timeScale|, false면 startTime + duration ÷ |timeScale|이다. 공식의 [Number | self] 표기는 실행과 다르다.', source: 'end-time', origin: 'implementation', sectionId: 'start-end' },
  { id: 'PR-11', officialItem: 'startTime = 부모에 넣은 배치 위치 + delay다. 공식은 "정의된 delay가 반영된 뒤"라고만 적는다.', source: 'start-time', origin: 'implementation', sectionId: 'start-end' },
  { id: 'PR-12', officialItem: 'gsap.timeline()으로 만든 timeline의 smoothChildTiming 기본값은 false이고 gsap.globalTimeline만 true다. 그래서 ST-05의 자동 조정은 기본 설정에서 일어나지 않는다.', source: 'start-time', origin: 'implementation', sectionId: 'start-end' },
  { id: 'PR-13', officialItem: 'timeScale을 바꿔도 duration()과 totalDuration()의 반환값은 그대로다. 바뀌는 것은 endTime뿐이다.', source: 'time-scale', origin: 'implementation', sectionId: 'time-scale' },
  { id: 'PR-14', officialItem: 'paused 상태의 timeline은 endTime()이 timeScale을 반영하지 않고 1인 것처럼 계산한다.', source: 'time-scale', origin: 'implementation', sectionId: 'time-scale' },
  { id: 'PR-15', officialItem: 'child에 timeScale을 걸면 부모의 duration()이 줄어든다. duration() setter가 자기 timeScale을 바꿔 부모가 본 길이를 바꾸는 것과 같은 메커니즘이다.', source: 'time-scale', origin: 'implementation', sectionId: 'time-scale' },
  { id: 'PR-16', officialItem: 'globalTime은 자기 자신부터 부모를 따라 올라가며 time = startTime + time ÷ |timeScale|을 반복해 계산한다.', source: 'global-time', origin: 'implementation', sectionId: 'global-time' },
  { id: 'PR-17', officialItem: '인자 없는 globalTime()은 totalTime()이 아니라 재생 헤드 기준 rawTime을 쓴다. 부모 재생 헤드가 이 timeline 위에 있지 않으면 GT-05의 등식이 성립하지 않는다.', source: 'global-time', origin: 'implementation', sectionId: 'global-time' },
]
