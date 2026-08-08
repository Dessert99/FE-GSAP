/** 공식 다섯 문서에서 확인한 기술 item 63개와 실행으로만 확인한 15개를 로컬 섹션과 묶어 coverage 근거로 남긴다. */

/** 다섯 공식 페이지를 catalog 안에서 짧은 식별자로 구분한다. */
export type PlacementSource = 'parent' | 'smooth-child-timing' | 'add' | 'recent' | 'shift-children'

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: PlacementSource
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** Timeline child 배치에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const timelineChildPlacementSourceItems: SourceItem[] = [
  // 01 부모는 언제나 하나뿐이다 — parent 문서 전체
  { id: 'PA-01', officialItem: 'signature는 parent : Timeline이다. Parameters 절과 Returns 절이 없는 읽기 속성으로 게시돼 있다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-02', officialItem: '"The parent Timeline to which the animation is attached." — parent는 그 animation이 붙어 있는 부모 Timeline이다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-03', officialItem: '"Anything that\'s not inside a Timeline that you create is placed on the gsap.globalTimeline() by default." — 직접 만든 Timeline 안에 있지 않은 것은 기본적으로 gsap.globalTimeline에 놓인다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-04', officialItem: '"Each animation (Tweens and Timelines) can only exist in one parent." — Tween이든 Timeline이든 모든 animation은 오직 하나의 부모에만 존재할 수 있다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-05', officialItem: '"Think of it like a DOM element that can\'t have multiple parents." — 부모를 여럿 가질 수 없는 DOM element처럼 생각하라는 비유가 공식 문서의 멘탈 모델이다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-06', officialItem: '"If you add() an animation to a different Timeline, its parent will change to that Timeline." — add()로 다른 Timeline에 넣으면 parent가 그 Timeline으로 바뀐다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-07', officialItem: '"How do timelines work?" 절의 문장은 "See the Timeline docs for details. It\'s very helpful to understand how the mechanics work conceptually."이며 Timeline 문서의 mechanics 절로 연결한다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },
  { id: 'PA-08', officialItem: 'parent 페이지 본문이 연결하는 관련 문서는 Timeline, gsap.globalTimeline, Tween, add(), Timeline#mechanics 다섯 개다. 코드 예제 블록은 없다.', source: 'parent', origin: 'official', sectionId: 'parent-graph' },

  // 02 add()가 받는 것과 돌려주는 것 — signature와 기본 배치 규칙
  { id: 'AD-01', officialItem: 'signature는 add( child:[Tween | Timeline | Label | Callback | Array], position:[Number | String | Label] ) : self이다.', source: 'add', origin: 'official', sectionId: 'add-signature' },
  { id: 'AD-02', officialItem: '인자 child는 [Tween | Timeline | Label | Callback | Array]이며 "The tween, timeline, callback, or label (or array of them) to add"다. 기본값 표기가 없다.', source: 'add', origin: 'official', sectionId: 'add-signature' },
  { id: 'AD-03', officialItem: '인자 position은 [Number | String | Label]이고 기본값은 "+=0"이며 "controls the insertion point in the timeline"이다.', source: 'add', origin: 'official', sectionId: 'add-signature' },
  { id: 'AD-04', officialItem: 'Returns 절은 self이며 "makes chaining easier"라고 이유를 밝힌다.', source: 'add', origin: 'official', sectionId: 'add-signature' },
  { id: 'AD-05', officialItem: '"[override] Adds a tween, timeline, callback, or label (or an array of them) to the timeline." — add()는 네 종류와 그 배열을 모두 같은 메서드로 받는다.', source: 'add', origin: 'official', sectionId: 'add-signature' },
  { id: 'AD-06', officialItem: '"By default, animations are added to the end of the timeline so that they\'re sequenced one-after-the-other but you can use the position parameter to control precisely where things are placed."', source: 'add', origin: 'official', sectionId: 'add-signature' },
  { id: 'AD-07', officialItem: '"It uses a flexible syntax with the following options:" — position은 하나의 형식이 아니라 여러 표기법을 받는 유연한 문법이다.', source: 'add', origin: 'official', sectionId: 'add-signature' },

  // 03 position 표기 하나가 자리를 정한다 — 공식 position 표의 모든 행
  { id: 'AD-08', officialItem: '절대 시간(초). "Absolute time (in seconds) measured from the start of the timeline, as a number like 3". 예 tl.add(animation, 3) — timeline 시작에서 정확히 3초 지점에 삽입한다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-09', officialItem: 'Label. "Label, like \\"someLabel\\". If the label doesn\'t exist, it\'ll be added to the end of the timeline." 예 tl.add(animation, "someLabel").', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-10', officialItem: '"<" 는 이전 animation의 시작이다. "Think of < as a pointer back to the start of the previous animation." 예 tl.add(animation, "<").', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-11', officialItem: '">" 는 이전 animation의 끝이다. "Think of > as a pointer to the end of the previous animation." 예 tl.add(animation, ">").', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-12', officialItem: '"A complex string where \\"+=\\" and \\"-=\\" prefixes indicate relative values." — "+="와 "-=" 접두사는 상대값을 뜻한다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-13', officialItem: '"+=1" — timeline의 끝에서 1초 뒤. 간격(gap)이 생긴다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-14', officialItem: '"-=1" — timeline의 끝에서 1초 앞. 기존 내용과 겹친다(overlap).', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-15', officialItem: '"myLabel+=2" — "myLabel" label에서 2초 뒤.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-16', officialItem: '"<+=3" — 이전 animation의 시작에서 3초 뒤.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-17', officialItem: '"<3" 는 "<+=3"과 같다. "When a number follows \\"<\\" or \\">\\", it is interpreted as relative so \\"<2\\" is the same as \\"<+=2\\"."', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-18', officialItem: '">-0.5" — 이전 animation의 끝에서 0.5초 앞.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-19', officialItem: '"A complex string based on a percentage." — 퍼센트를 쓰는 복합 문자열도 받는다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-20', officialItem: '"When immediately following a \\"+=\\" or \\"-=\\" prefix, the percentage is based on total duration of the animation being inserted." — "+="·"-=" 바로 뒤의 퍼센트는 삽입되는 animation의 total duration 기준이다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-21', officialItem: '"When immediately following \\"<\\" or \\">\\", it\'s based on the total duration of the previous animation." — "<"·">" 바로 뒤의 퍼센트는 이전 animation의 total duration 기준이다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-22', officialItem: '"-=25%" — 삽입되는 animation의 total duration의 25%만큼 timeline 끝과 겹친다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-23', officialItem: '"+=50%" — 삽입되는 animation의 total duration의 50%만큼 timeline 끝에서 떨어져 간격을 만든다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-24', officialItem: '"<25%" — 이전 animation의 시작에서 그 animation 안으로 25% 들어간 지점이다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-25', officialItem: '"<+=25%" — 이전 animation의 시작에서 삽입되는 animation의 total duration의 25%만큼 뒤다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-26', officialItem: '"myLabel+=30%" — "myLabel"에서 삽입되는 animation의 total duration의 30%만큼 뒤다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-27', officialItem: '"Note: total duration includes repeats/yoyos" — 퍼센트의 기준이 되는 total duration에는 repeat과 yoyo가 포함된다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-28', officialItem: '"*Percentage-based values were added in GSAP 3.7.0" — 퍼센트 기반 position은 GSAP 3.7.0에서 추가됐다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-29', officialItem: '"*The \\"previous animation\\" refers to the most recently-inserted animation, not necessarily the animation that is closest to the end of the timeline." — "<"와 ">"가 가리키는 이전 animation은 가장 최근에 삽입된 것이지 끝에 가장 가까운 것이 아니다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },
  { id: 'AD-30', officialItem: 'add() 페이지에는 실행 가능한 코드 예제 블록이 없고, position 표기의 상세는 Position Parameter 문서와 Position Parameter Interactive Demo로 연결한다.', source: 'add', origin: 'official', sectionId: 'position-syntax' },

  // 04 방금 넣은 child를 가리키기 — recent()
  { id: 'RC-01', officialItem: 'signature는 recent( ) : [Tween | Timeline | Callback]이다. Parameters 절이 없어 인자를 받지 않는다.', source: 'recent', origin: 'official', sectionId: 'recent-pointer' },
  { id: 'RC-02', officialItem: '반환 타입은 [Tween | Timeline | Callback]이다.', source: 'recent', origin: 'official', sectionId: 'recent-pointer' },
  { id: 'RC-03', officialItem: '"Returns the most recently added child tween/timeline/callback regardless of its position in the timeline." — timeline 안의 위치와 무관하게 가장 최근에 추가된 child를 돌려준다.', source: 'recent', origin: 'official', sectionId: 'recent-pointer' },
  { id: 'RC-04', officialItem: '공식 코드 예제는 tl.to(e1, { duration: 999, x: 100, repeat: 5 }) → tl.to(e2, { duration: 1, y: 200 }, 0.5) → tl.to(e3, { duration: 1, scaleX: 2 }, tl.recent().endTime() + 3) 세 줄과 주석 //very long tween, //insert this tween at 0.5 seconds (toward the beginning of the timeline), //inserts the new tween 3 seconds after the e2 tween which was added most recently. 다.', source: 'recent', origin: 'official', sectionId: 'recent-pointer' },
  { id: 'RC-05', officialItem: '공식 예제가 드러내는 동작 — e1이 duration 999로 훨씬 늦게 끝나는데도 recent()는 가장 최근에 추가된 e2를 돌려주며, 반환값에 endTime()을 이어 호출해 다음 삽입 위치를 계산한다.', source: 'recent', origin: 'official', sectionId: 'recent-pointer' },

  // 05 이미 놓인 child를 통째로 밀기 — shiftChildren()
  { id: 'SH-01', officialItem: 'signature는 shiftChildren( amount:Number, adjustLabels:Boolean, ignoreBeforeTime:Number ) : self이다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-02', officialItem: '인자 amount는 Number이며 "Number of seconds (or frames for frames-based timelines) to move each child"다. 기본값 표기가 없다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-03', officialItem: '인자 adjustLabels는 Boolean이고 기본값은 false이며 "If true, the timing of all labels will be adjusted as well"이다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-04', officialItem: '인자 ignoreBeforeTime은 Number이고 기본값은 0이며 "All children that begin at or after the startAtTime will be affected by the shift (the default is 0, causing all children to be affected)"이다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-05', officialItem: 'ignoreBeforeTime은 "This provides an easy way to splice children into a certain spot on the timeline, pushing only the children after that point back to make room."라고 용도가 설명돼 있다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-06', officialItem: 'Returns 절은 self이며 "makes chaining easier"다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-07', officialItem: '"Shifts the startTime of the timeline\'s children by a certain amount and optionally adjusts labels too." — 옮기는 대상은 child의 startTime이다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },
  { id: 'SH-08', officialItem: '"This can be useful when you want to prepend children or splice them into a certain spot, moving existing ones back to make room for the new ones." — 앞에 붙이거나 중간에 끼워 넣을 자리를 만들 때 쓴다. 공식 페이지에 코드 예제 블록은 없다.', source: 'shift-children', origin: 'official', sectionId: 'shift-children' },

  // 06 값이 바뀌면 좌표가 따라 움직일까 — smoothChildTiming
  { id: 'SC-01', officialItem: 'signature는 smoothChildTiming : Boolean이다. Parameters 절과 Returns 절이 없는 읽고 쓰는 속성으로 게시돼 있다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-02', officialItem: '"Controls whether or not child tweens and timelines are repositioned automatically (changing their startTime) in order to maintain smooth playback when properties are changed on-the-fly."', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-03', officialItem: '공식 상황 설정 — "imagine that the timeline\'s playhead is on a child tween that is 75% complete, moving obj.x from 0 to 100 and then that tween\'s reverse() method is called."', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-04', officialItem: '"If smoothChildTiming is false (the default except for the root timelines), the tween would flip in place, keeping its startTime consistent." — false면 tween이 제자리에서 뒤집히고 startTime이 유지된다. 괄호에 루트 timeline만 예외라고 적혀 있다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-05', officialItem: '"Therefore the playhead of the timeline would now be at the tween\'s 25% completion point instead of 75%."', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-06', officialItem: '"Remember, the timeline\'s playhead position and direction are unaffected by child tween/timeline changes." — 부모의 재생 헤드 위치와 방향은 자식의 변경에 영향받지 않는다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-07', officialItem: '"obj.x would jump from 75 to 25, but the tween\'s position in the timeline would remain consistent." — false일 때 값은 튀지만 배치는 그대로다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-08', officialItem: '"However, if smoothChildTiming is true, that child tween\'s startTime would be adjusted so that the timeline\'s playhead intersects with the same spot on the tween (75% complete) as it had immediately before reverse() was called, thus playback appears perfectly smooth."', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-09', officialItem: '"obj.x would still be 75 and it would continue from there as the playhead moves on, but since the tween is reversed now obj.x will travel back towards 0 instead of 100." — true일 때 값은 이어지고 방향만 바뀐다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-10', officialItem: '"Ultimately it\'s a decision between prioritizing smooth on-the-fly playback (true) or consistent position(s) of child tweens and timelines (false)." — 매끄러운 재생과 일관된 배치 중 무엇을 우선할지의 선택이다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-11', officialItem: 'true일 때 실행 중 변경이 startTime에 영향을 줄 수 있는 속성·메서드로 reversed, timeScale, progress, totalProgress, time, totalTime, delay, pause, resume, duration, totalDuration 열한 개가 열거돼 있다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },
  { id: 'SC-12', officialItem: '"The gsap.globalTimeline has smoothChildTiming set to true." — 전역 timeline은 true로 설정돼 있다.', source: 'smooth-child-timing', origin: 'official', sectionId: 'smooth-child-timing' },

  // 공식 문서에 없어 GSAP 3.15.0을 직접 실행해 확인한 항목
  { id: 'PR-01', officialItem: 'gsap.timeline()으로 만든 timeline의 smoothChildTiming 기본값은 false이고 gsap.globalTimeline만 true다. 다른 timeline 안에 중첩한 timeline도 false다. 공식은 "the default except for the root timelines"라고만 적어 반대로 읽히기 쉽다.', source: 'smooth-child-timing', origin: 'implementation', sectionId: 'smooth-child-timing' },
  { id: 'PR-02', officialItem: '공식이 열거한 열한 항목 중 이 측정 조건에서 실제로 startTime을 옮긴 것은 아홉 개이고 pause와 resume은 옮기지 않았다. 공식 문장도 "could affect"라는 가능성 표현을 쓴다.', source: 'smooth-child-timing', origin: 'implementation', sectionId: 'smooth-child-timing' },
  { id: 'PR-03', officialItem: 'child의 startTime = 부모에 넣은 position + child 자신의 delay다. 공식 add() 문서는 delay와의 합산을 언급하지 않는다.', source: 'add', origin: 'implementation', sectionId: 'position-syntax' },
  { id: 'PR-04', officialItem: '공식 position 표의 열다섯 표기를 같은 fixture에 넣어 startTime을 실측했고 열다섯 개 모두 공식 설명과 일치했다.', source: 'add', origin: 'implementation', sectionId: 'position-syntax' },
  { id: 'PR-05', officialItem: '"<3"은 "<+=3"과 같지만 "<25%"는 "<+=25%"와 같지 않다. 앞은 이전 animation의 total duration을, 뒤는 삽입되는 animation의 total duration을 기준으로 삼기 때문이다. 공식은 두 규칙을 따로 적을 뿐 이 비대칭을 명시하지 않는다.', source: 'add', origin: 'implementation', sectionId: 'position-syntax' },
  { id: 'PR-06', officialItem: 'position 인자를 아예 생략하면 기본값 "+=0"과 같아 timeline의 끝에 놓인다. 공식은 기본값만 적고 생략했을 때의 결과를 따로 보이지 않는다.', source: 'add', origin: 'implementation', sectionId: 'add-signature' },
  { id: 'PR-07', officialItem: '존재하지 않는 label을 position으로 주면 child가 timeline 끝에 놓일 뿐 아니라 그 label이 timeline의 labels 맵에 실제로 추가된다. 공식은 label이 추가된다고만 적고 위치를 밝히지 않는다.', source: 'add', origin: 'implementation', sectionId: 'position-syntax' },
  { id: 'PR-08', officialItem: 'add([a, b], position)은 배열의 모든 항목을 같은 position에 겹쳐 놓는다. 차례로 이어 붙이지 않는다. 공식은 배열을 받는다고만 적는다.', source: 'add', origin: 'implementation', sectionId: 'add-signature' },
  { id: 'PR-09', officialItem: 'add(function, position)은 duration이 0인 Tween child를 만들어 넣고, add("label", position)은 child를 만들지 않고 labels 맵만 바꾼다. 공식은 둘을 같은 child 목록으로 묶어 적는다.', source: 'add', origin: 'implementation', sectionId: 'add-signature' },
  { id: 'PR-10', officialItem: '아직 아무것도 넣지 않은 timeline에서 recent()는 undefined를 돌려준다. 공식은 반환 타입만 적고 비어 있을 때를 말하지 않는다.', source: 'recent', origin: 'implementation', sectionId: 'recent-pointer' },
  { id: 'PR-11', officialItem: 'addLabel()로 label을 추가해도, shiftChildren()으로 child를 옮겨도 recent()가 가리키는 대상은 바뀌지 않는다. add("label")도 마찬가지다. 공식은 "most recently added child"의 child에 label이 포함되는지 밝히지 않는다.', source: 'recent', origin: 'implementation', sectionId: 'recent-pointer' },
  { id: 'PR-12', officialItem: '다른 timeline에 add()하면 이전 부모의 children 목록에서 실제로 빠진다. remove() 뒤에는 parent가 null이 되고 gsap.globalTimeline.parent도 null이다. 공식은 "하나의 부모에만 존재한다"고만 적고 제거 시점의 값을 밝히지 않는다.', source: 'parent', origin: 'implementation', sectionId: 'parent-graph' },
  { id: 'PR-13', officialItem: 'ignoreBeforeTime의 경계는 "at or after"라는 공식 문장 그대로 포함이다. 정확히 그 값에서 시작하는 child도 함께 움직이며, adjustLabels가 true일 때 label도 같은 경계를 따른다.', source: 'shift-children', origin: 'implementation', sectionId: 'shift-children' },
  { id: 'PR-14', officialItem: 'amount에 음수를 주어 child의 startTime이 0보다 작아지면, 기본값 0인 ignoreBeforeTime 때문에 다음 양수 shift에서 그 child만 제외되어 원래 자리로 돌아오지 않는다. ignoreBeforeTime에 음수를 주면 다시 포함된다.', source: 'shift-children', origin: 'implementation', sectionId: 'shift-children' },
  { id: 'PR-15', officialItem: 'child의 startTime이 음수가 되면 timeline의 duration()이 마지막 child의 endTime과 어긋난다. 음수·양수 범위를 섞은 다섯 경우 모두 duration()이 "max(0, 가장 늦은 endTime) − min(0, 가장 이른 startTime)"과 일치했다. 모든 child가 0초 전에 끝나도 0까지의 폭을 센다.', source: 'shift-children', origin: 'implementation', sectionId: 'shift-children' },
]
