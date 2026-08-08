/** Timeline playhead 공식 문서 6개의 기술 item과 GSAP 3.15.0 probe를 로컬 섹션에 연결한다. */

/** 이 페이지가 소유하는 공식 Timeline playhead source 식별자다. */
export type TimelinePlayheadSourceKey =
  | 'progress'
  | 'time'
  | 'total-progress'
  | 'total-time'
  | 'tween-from-to'
  | 'tween-to'

/** 공식 주장과 실행 확인을 서로 다른 분모로 세는 coverage 행이다. */
export type TimelinePlayheadSourceItem = {
  id: string
  officialItem: string
  source: TimelinePlayheadSourceKey
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 좌표 setter와 control Tween을 선택하는 데 필요한 공식·실행 사실 전체다. */
export const timelinePlayheadSourceItems: TimelinePlayheadSourceItem[] = [
  { id: 'PR-04', officialItem: 'progress는 repeat를 제외한 가상 playhead 위치를 0~1로 나타내며 0은 시작, 0.5는 절반, 1은 완료다.', source: 'progress', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'PR-05', officialItem: 'repeat가 있으면 progress는 repeat와 repeatDelay를 포함하지 않아 totalProgress와 달라진다.', source: 'progress', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'PR-06', officialItem: 'repeat 1이면 첫 cycle 끝의 progress는 1, totalProgress는 0.5이며 progress는 전체 동안 0→1을 두 번 돈다.', source: 'progress', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TM-02', officialItem: 'time은 repeat와 repeatDelay를 제외한 local playhead 위치를 초로 가져오거나 설정한다.', source: 'time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TM-06', officialItem: 'repeat가 있으면 time은 0으로 돌아가지만 totalTime은 계속 증가하며 yoyo에서는 local time 방향이 번갈아 바뀐다.', source: 'time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TM-07', officialItem: 'time은 duration을 넘지 않지만 totalTime은 repeat와 repeatDelay를 포함한 전체 시간을 반영한다.', source: 'time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TM-08', officialItem: 'duration 2, repeat 3인 Timeline은 totalTime 0~8 동안 time 0~2를 네 번 돈다.', source: 'time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TGP-02', officialItem: 'totalProgress는 repeat와 repeatDelay를 포함한 전체 playhead 위치를 0~1로 나타낸다.', source: 'total-progress', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TGP-06', officialItem: 'repeat가 있으면 progress는 현재 cycle만, totalProgress는 전체 repeat 구간을 한 번의 0~1로 읽는다.', source: 'total-progress', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TGP-07', officialItem: 'repeat 1이면 첫 cycle 끝의 totalProgress는 0.5이고 progress는 1이다.', source: 'total-progress', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TT-02', officialItem: 'totalTime은 repeat와 repeatDelay를 포함하는 totalDuration 기준 playhead 위치다.', source: 'total-time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TT-06', officialItem: '공식 Timeline 문서는 duration 2, repeat 3 예제 대상을 “tween”이라고 부르며 totalTime 0~8과 time 0~2 네 번을 설명한다.', source: 'total-time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TT-07', officialItem: '위 예제에 repeatDelay 1을 더하면 totalTime 범위는 0~11이다.', source: 'total-time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TT-08', officialItem: 'totalTime은 0보다 작거나 totalDuration보다 클 수 없고 범위 밖 값은 잘린다.', source: 'total-time', origin: 'official', sectionId: 'playhead-coordinates' },
  { id: 'TT-09', officialItem: '음수 totalTime은 전체 끝 기준이며 totalDuration 6에서 totalTime(-2)는 4로 이동한다.', source: 'total-time', origin: 'official', sectionId: 'playhead-coordinates' },

  { id: 'PR-01', officialItem: 'signature는 progress(value:Number, suppressEvents:Boolean) : [Number | self]다.', source: 'progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'PR-02', officialItem: 'value는 Number, 기본값 NaN이며 생략하면 getter, 제공하면 setter가 되어 self를 반환한다.', source: 'progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'PR-03', officialItem: 'suppressEvents는 Boolean, 기본값 false이며 true면 새 위치로 이동하는 동안 event와 callback을 실행하지 않는다.', source: 'progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'PR-07', officialItem: 'setter는 self를 반환해 tl.progress(0.5).play()처럼 chaining할 수 있다.', source: 'progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'PR-08', officialItem: '공식 예제는 progress() getter와 progress(0.25) setter를 보여 준다.', source: 'progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TM-01', officialItem: 'signature는 time(value:Number, suppressEvents:Boolean) : [Number | self]다.', source: 'time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TM-03', officialItem: 'value는 Number, 기본값 NaN이며 생략은 getter, 제공은 self를 돌려주는 setter이고 음수는 animation 끝 기준이다.', source: 'time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TM-04', officialItem: 'suppressEvents는 Boolean, 기본값 false이며 true면 이동 구간 event와 callback을 실행하지 않는다.', source: 'time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TM-05', officialItem: 'getter는 Number, setter는 chaining 가능한 self를 반환한다.', source: 'time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TM-09', officialItem: '공식 예제는 time() getter와 seek처럼 즉시 점프하는 time(2) setter를 보여 주며 코드 뒤에 불필요한 마침표가 있다.', source: 'time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TGP-01', officialItem: 'signature는 totalProgress(value:Number, suppressEvents:Boolean) : [Number | self]다.', source: 'total-progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TGP-03', officialItem: 'value는 Number, 기본값 NaN이며 생략은 getter, 제공은 self를 반환하는 setter다.', source: 'total-progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TGP-05', officialItem: 'getter는 Number, setter는 chaining 가능한 self를 반환한다.', source: 'total-progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TGP-08', officialItem: '공식 예제는 totalProgress() getter와 totalProgress(0.25) setter, totalProgress(0.5).play() chaining을 보여 준다.', source: 'total-progress', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TT-01', officialItem: 'signature는 totalTime(time:Number, suppressEvents:Boolean) : [Number | self]다.', source: 'total-time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TT-03', officialItem: 'time은 Number, 기본값 NaN이며 생략은 getter, 제공은 self를 반환하는 setter이고 음수는 전체 끝 기준이다.', source: 'total-time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TT-04', officialItem: 'suppressEvents는 Boolean, 기본값 false이며 true면 이동 구간 event와 callback을 실행하지 않는다.', source: 'total-time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TT-05', officialItem: 'getter는 Number, setter는 chaining 가능한 self를 반환한다.', source: 'total-time', origin: 'official', sectionId: 'direct-setters' },
  { id: 'TT-10', officialItem: '공식 예제는 totalTime() getter와 seek처럼 즉시 점프하는 totalTime(2) setter를 보여 주며 코드 뒤에 불필요한 마침표가 있다.', source: 'total-time', origin: 'official', sectionId: 'direct-setters' },

  { id: 'TO-01', officialItem: 'signature는 tweenTo(position:[Number | Label], vars:Object) : Tween이다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-02', officialItem: '특정 time 또는 label까지 playhead를 선형으로 scrub하고 멈추는 Tween을 만든다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-03', officialItem: 'position은 도착할 초 숫자 또는 label이다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-04', officialItem: 'vars는 Object, 기본값 null이며 onComplete, ease, delay 등 Tween special property를 control Tween에 전달한다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-05', officialItem: '원하는 time 또는 label 사이를 제어하는 Tween instance를 반환한다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-06', officialItem: '공식 첫 예제는 tl.tweenTo("myLabel2")로 label까지 이동한다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-07', officialItem: '공식 advanced 예제는 5초까지 이동하며 onComplete, onCompleteParams:[tl], ease:"strong"을 전달한다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-08', officialItem: 'control Tween은 Timeline을 pause하고 time()을 tween하며 참조를 저장해 언제든 kill()할 수 있다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-09', officialItem: '앞선 위치로 이동해 겉으로 역방향이어도 Timeline의 reversed 상태는 true로 바뀌지 않는다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-10', officialItem: 'Timeline은 이동 전에 즉시 pause되고 완료 뒤 자동 resume되지 않으며 필요하면 onComplete에서 resume()한다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },
  { id: 'TO-11', officialItem: 'control Tween 여러 개를 순서대로 배치할 때는 시작과 끝을 명시해 duration을 즉시 정확히 정하는 tweenFromTo가 보통 낫다.', source: 'tween-to', origin: 'official', sectionId: 'navigation-tween' },

  { id: 'FT-01', officialItem: 'signature는 tweenFromTo(fromPosition:[Number | Label], toPosition:[Number | Label], vars:Object) : Tween이다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-02', officialItem: '특정 time 또는 label부터 다른 time 또는 label까지 playhead를 선형으로 scrub하고 멈추는 Tween을 만든다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-03', officialItem: 'fromPosition은 Timeline이 출발할 초 숫자 또는 label이다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-04', officialItem: 'toPosition은 Timeline이 도착할 초 숫자 또는 label이다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-05', officialItem: 'vars는 Object, 기본값 null이며 onComplete, ease, delay 등 Tween special property를 control Tween에 전달한다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-06', officialItem: '원하는 time 또는 label 사이를 제어하는 Tween instance를 반환한다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-07', officialItem: '여러 control Tween을 이어 붙일 때 시작·끝이 명시되어 duration이 즉시 정해지므로 tweenTo보다 적합하다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-08', officialItem: '공식 첫 예제는 master Timeline에 myLabel1→myLabel2와 myLabel2→0 control Tween을 차례로 add한다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-09', officialItem: '공식 advanced 예제는 0→5초 이동에 onComplete, onCompleteParams:[tl], ease:"strong"을 전달한다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-10', officialItem: 'control Tween은 Timeline의 time()을 tween하며 참조를 저장해 언제든 kill()할 수 있다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-11', officialItem: '현재보다 앞선 from/to 구간이어도 Timeline의 reversed property는 바뀌지 않는다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-12', officialItem: 'Timeline은 이동 전에 즉시 pause되고 완료 뒤 자동 resume되지 않으며 필요하면 onComplete에서 resume()한다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },
  { id: 'FT-14', officialItem: '공식 예제는 immediateRender:false를 넣은 tweenFromTo(1, 5, ...) 호출을 제시한다.', source: 'tween-from-to', origin: 'official', sectionId: 'range-tween' },

  { id: 'TGP-04', officialItem: 'totalProgress Parameters 표는 suppressEvents 기본값을 true라고 적고 true면 이동 구간 event와 callback을 억제한다고 설명한다.', source: 'total-progress', origin: 'official', sectionId: 'official-differences' },
  { id: 'FT-13', officialItem: '공식 문서는 모든 from 계열처럼 immediateRender 기본값이 true라 즉시 from 위치로 점프하며 false로 끌 수 있다고 적는다.', source: 'tween-from-to', origin: 'official', sectionId: 'official-differences' },

  { id: 'TLPH-P1', officialItem: 'GSAP 3.15.0에서 totalProgress()의 두 번째 인자 생략은 false와 같은 callback 실행 결과였고 true만 callback을 억제했다.', source: 'total-progress', origin: 'implementation', sectionId: 'official-differences' },
  { id: 'TLPH-P2', officialItem: 'GSAP 3.15.0에서 tweenFromTo(..., {})와 vars 생략은 생성 직후 현재 time을 유지했고 immediateRender:true만 동기적으로 from 위치로 옮겼다.', source: 'tween-from-to', origin: 'implementation', sectionId: 'official-differences' },
  { id: 'TLPH-P3', officialItem: 'time 0.25에서 1초 label로 만든 tweenTo()는 duration 0.75, ease none이었고 완료 뒤 Timeline을 paused 상태로 남겼다.', source: 'tween-to', origin: 'implementation', sectionId: 'navigation-tween' },
  { id: 'TLPH-P4', officialItem: '새 control Tween 전에 저장한 이전 control Tween을 kill하면 하나의 playhead를 두 Tween이 동시에 쓰는 경쟁을 막을 수 있다.', source: 'tween-to', origin: 'implementation', sectionId: 'boundaries' },
]
