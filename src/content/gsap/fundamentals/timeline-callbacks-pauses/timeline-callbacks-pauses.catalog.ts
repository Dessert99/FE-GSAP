/** 공식 여섯 문서에서 확인한 기술 item 60개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'delayed-call' | 'call' | 'add-pause' | 'remove-pause' | 'event-callback' | 'then'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 예약·배치·멈춤·완료에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const timelineCallbacksPausesSourceItems: SourceItem[] = [
  // --- 01 scheduling-basics ---
  { id: 'DC-02', officialItem: 'gsap.delayedCall()은 정해진 시간이 지난 뒤 함수를 부르는 간단한 방법을 제공한다.', source: 'delayed-call', origin: 'official', sectionId: 'scheduling-basics' },
  { id: 'DC-03', officialItem: '호출이 전체 rendering loop와 완전히 동기화된다. setTimeout()은 브라우저의 화면 갱신 주기 밖에서 실행될 수 있다는 점이 다르다.', source: 'delayed-call', origin: 'official', sectionId: 'scheduling-basics' },

  // --- 02 delayed-call ---
  { id: 'DC-01', officialItem: 'gsap.delayedCall()의 Returns는 Tween이다.', source: 'delayed-call', origin: 'official', sectionId: 'delayed-call' },
  { id: 'DC-04', officialItem: '함수에 원하는 개수의 parameter를 함께 넘길 수 있다.', source: 'delayed-call', origin: 'official', sectionId: 'delayed-call' },
  { id: 'DC-05', officialItem: '공식 예제는 gsap.delayedCall(1, myFunction, ["param1", "param2"])로 1초 뒤 myFunction을 부르며 parameter 2개를 넘긴다.', source: 'delayed-call', origin: 'official', sectionId: 'delayed-call' },
  { id: 'DC-06', officialItem: 'delayed call을 취소·kill하려면 참조를 저장해 두었다가 필요할 때 .kill()을 부른다. 공식 예제는 var delayedCall = gsap.delayedCall(1, myFunction); delayedCall.kill(); 이다.', source: 'delayed-call', origin: 'official', sectionId: 'delayed-call' },
  { id: 'DC-07', officialItem: '참조를 들고 있고 싶지 않으면 gsap.killTweensOf()를 쓸 수 있다. delayedCall()은 onComplete를 가진 Tween일 뿐이고 함수 자체가 그 Tween의 "target"이기 때문이다. 공식 예제는 gsap.killTweensOf(myFunction) 이다.', source: 'delayed-call', origin: 'official', sectionId: 'delayed-call' },

  // --- 03 timeline-call ---
  { id: 'CL-01', officialItem: 'signature는 call( callback:Function, params:Array, position:* ) : self 이다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-02', officialItem: 'Returns는 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-03', officialItem: 'callback은 Function이며 부를 함수다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-04', officialItem: 'params는 Array이고 기본값은 null이며, 함수에 넘길 parameter의 Array다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-06', officialItem: 'timeline의 끝(또는 position으로 다른 곳)에 callback을 추가하는 편의 메서드이며, add( gsap.delayedCall(...) )와 정확히 같은 일을 더 적은 코드로 한다. 공식은 tl.add(gsap.delayedCall(0, myFunction, ["param1","param2"]))와 tl.call(myFunction, ["param1","param2"])가 identical results를 낸다고 밝힌다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-07', officialItem: 'timeline 자체의 onComplete special property를 쓰는 것과 다르다. 한 번 붙인 callback은 그 자리에 머무는 반면 onComplete는 항상 timeline의 맨 끝에서 불린다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-08', officialItem: '공식 예: 1초 tween이 담긴 timeline에 call(myFunction)을 하면 1초 지점에 놓인다. 그 뒤 1초 tween을 더 붙이면 timeline duration은 2초가 되지만 myFunction은 여전히 1초 지점에서 불리고, onComplete라면 끝(2초)에서 불린다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },
  { id: 'CL-09', officialItem: '공식 예제는 to(), set(), call()을 이어 붙여 sequence를 빠르게 만드는 chaining 형태를 보여주며, timeline 생성자에 onComplete: myFunction을 함께 준다.', source: 'call', origin: 'official', sectionId: 'timeline-call' },

  // --- 04 position-parameter ---
  { id: 'CL-05', officialItem: 'position은 *이고 기본값은 "+=0"이며 timeline 안 삽입 지점을 정한다. 기본은 timeline의 끝이다. 아직 없는 label을 지정하면 자동으로 timeline 끝에 추가된다.', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-10', officialItem: '기본적으로 call은 timeline의 끝에 추가되며, position parameter로 놓이는 위치를 정확히 제어한다.', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-11', officialItem: 'position 옵션 — 절대 시간(초)을 timeline 시작 기준 number로 준다. 예 3, 공식 예제 tl.call(myFunction, null, 3).', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-12', officialItem: 'position 옵션 — Label, 예 "someLabel". label이 없으면 timeline 끝에 추가된다. 공식 예제 tl.call(myFunction, null, "someLabel").', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-13', officialItem: 'position 옵션 — "<"는 이전 animation의 시작이다. <를 이전 animation 시작을 가리키는 포인터로 생각하면 된다. 공식 예제 tl.call(myFunction, null, "<").', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-14', officialItem: 'position 옵션 — ">"는 이전 animation의 끝이다. >를 이전 animation 끝을 가리키는 포인터로 생각하면 된다. 공식 예제 tl.call(myFunction, null, ">").', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-15', officialItem: 'position 옵션 — "+="와 "-=" 접두사가 relative 값을 뜻하는 복합 문자열. "<"나 ">" 뒤에 숫자가 오면 relative로 해석되어 "<2"는 "<+=2"와 같다. 공식 예시는 "+=1"(끝에서 1초 뒤, 빈 구간 생김), "-=1"(끝에서 1초 앞, 겹침), "myLabel+=2", "<+=3", "<3", ">-0.5"다.', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-16', officialItem: 'position 옵션 — percentage 기반 복합 문자열. "+="나 "-=" 바로 뒤에 오면 삽입되는 animation의 total duration 기준이고, "<"나 ">" 바로 뒤에 오면 이전 animation의 total duration 기준이다. total duration은 repeat/yoyo를 포함한다. 공식 예시는 "-=25%", "+=50%", "<25%"(= ">-75%"), "<+=25%", "myLabel+=30%"다.', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-17', officialItem: 'percentage 기반 값은 GSAP 3.7.0에서 추가됐다.', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'CL-18', officialItem: '"previous animation"은 가장 최근에 삽입된 animation을 뜻하며, 반드시 timeline 끝에 가장 가까운 animation은 아니다.', source: 'call', origin: 'official', sectionId: 'position-parameter' },
  { id: 'AP-12', officialItem: 'addPause() 페이지도 "Positioning a pause in a timeline"에서 call()과 동일한 position 옵션 전체(절대 시간 number, Label, "<", ">", "+="·"-=" relative 문자열, percentage 문자열, 3.7.0에 추가됐다는 각주, "previous animation" 정의)를 그대로 게시한다.', source: 'add-pause', origin: 'official', sectionId: 'position-parameter' },
  { id: 'AP-13', officialItem: 'addPause() 페이지의 position 전용 예제는 tl.addPause(3), tl.addPause("someLabel"), tl.addPause("<"), tl.addPause(">") 네 줄이다.', source: 'add-pause', origin: 'official', sectionId: 'position-parameter' },

  // --- 05 pause-points ---
  { id: 'AP-01', officialItem: 'signature는 addPause( position:[String | Number | Label], callback:Function, params:Array ) : self 이다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-02', officialItem: 'Returns는 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-03', officialItem: 'position은 [String | Number | Label]이고 기본값은 "+=0"이며 삽입 지점을 정한다. 기본은 timeline의 끝이고, 아직 없는 label을 지정하면 자동으로 timeline 끝에 추가된다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-04', officialItem: 'callback은 Function이고 기본값은 null이며, timeline이 pause된 직후에 불려야 하는 선택적 callback이다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-05', officialItem: 'params는 Array이고 기본값은 null이며, callback에 넘길 선택적 parameter 배열이다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-06', officialItem: '특정 시간이나 label에서 timeline의 재생을 멈추는 특수 callback을 삽입한다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-07', officialItem: '직접 만든 단순 callback을 쓰는 것보다 정확하다. virtual playhead가 pause 위치를 조금 지나쳤더라도 정확히 옳은 위치로 되돌려 놓기 때문이다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-08', officialItem: 'virtual playhead는 core timing mechanism의 매 tick(frame)마다 새 위치로 이동한다. 예컨대 0.99에 있다가 다음 render가 1.01에서 일어날 수 있어, callback이 정확히 1초에 있었다면 playhead가 멈추려던 지점을 조금 지나친다. 그 뒤 reverse()하면 같은 callback을 다시 만나 거의 즉시 멈추게 된다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-09', officialItem: 'addPause()를 쓰면 callback을 만났을 때 playhead를 정확히(EXACTLY) 있어야 할 자리로 되돌리도록 보정한다. 따라서 reverse()해도 같은 callback을 다시 만나지 않는다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-10', officialItem: '이 특수 callback은 onComplete를 이용하는 zero-duration tween일 뿐이라 기술적으로 다른 callback과 똑같고 timeline의 child로 취급된다. addPause()로 넣은 pause를 제거하려면 timeline.removePause()를 쓴다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'AP-11', officialItem: '공식 예제 네 줄 — timeline.addPause(2)는 2초 지점에, timeline.addPause("yourLabel")은 해당 label에, timeline.addPause("yourLabel+=3", yourFunction)은 label 3초 뒤에 넣고 그때 yourFunction을 부르며, timeline.addPause(4, yourFunction, ["param1","param2"])는 4초 지점에서 parameter 2개와 함께 부른다.', source: 'add-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'RP-01', officialItem: 'signature는 removePause( position:[Number | Label] ) : self 이다.', source: 'remove-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'RP-02', officialItem: 'Returns는 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'remove-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'RP-03', officialItem: 'position은 [Number | Label]이며 pause를 제거할 시간 또는 label이다. 공식 페이지에 기본값 표기가 없다.', source: 'remove-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'RP-04', officialItem: 'timeline의 .addPause() 메서드로 추가했던 pause들을 제거한다.', source: 'remove-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'RP-05', officialItem: 'addPause()로 timeline에 추가된, 특정 position에 있는 pause를 제거한다.', source: 'remove-pause', origin: 'official', sectionId: 'pause-points' },
  { id: 'RP-06', officialItem: '공식 예제는 1초짜리 tween 뒤에 인자 없는 tl.addPause()를 부르면 그것이 "time of 1"에 추가되고, 나중에 tl.removePause(1)로 제거한다는 것을 보여준다.', source: 'remove-pause', origin: 'official', sectionId: 'pause-points' },

  // --- 06 lifecycle-callbacks ---
  { id: 'EC-01', officialItem: 'signature는 eventCallback( type:String, callback:Function, params:Array ) : [Function | self] 이다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-02', officialItem: 'Returns는 [Function | self]다. parameter를 생략하면 현재 값을 돌려주는 getter이고, parameter를 정의하면 값을 설정하는 setter이며 chaining을 쉽게 하도록 instance 자신을 돌려준다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-03', officialItem: 'type은 String이며 onComplete, onUpdate, onStart, onRepeat 같은 event callback의 종류다. 대소문자를 구분한다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-04', officialItem: 'callback은 Function이고 기본값은 null이며, 해당 event가 일어날 때 불려야 하는 함수다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-05', officialItem: 'params는 Array이고 기본값은 null이며, callback에 넘길 parameter 배열이다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-06', officialItem: 'onComplete, onUpdate, onStart, onReverseComplete, onRepeat 같은 event callback과 거기에 넘길 parameter를 가져오거나 설정한다. Details 문단은 같은 목록에 "onInterrupt"를 더해 여섯 종류를 문자열로 나열한다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-07', officialItem: '이 설정은 생성자의 vars parameter에 값을 처음부터 직접 적는 것과 같다. 공식은 gsap.to(obj, {duration: 1, x: 100, onComplete: myFunction, onCompleteParams: ["param1","param2"]})와 myAnimation.eventCallback("onComplete", myFunction, ["param1","param2"])를 나란히 놓고 functionally equivalent라고 밝힌다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-08', officialItem: 'eventCallback()의 이점은 animation instance가 만들어진 뒤에도 callback을 설정할 수 있고, callback 참조를 조회하거나 즉시 삭제할 수 있다는 것이다. 삭제에는 null을 쓴다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-09', officialItem: '삭제 공식 예제는 myAnimation.eventCallback("onUpdate", null) 이다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-10', officialItem: '(warning) animation instance는 event type마다 callback을 하나씩만 가질 수 있어서(onComplete 하나, onUpdate 하나, onStart 하나 등) 새 값을 설정하면 이전 값을 덮어쓴다. 모든 값은 생성자에 넘겼던 vars 객체에도 채워지며, 그 객체를 설정 데이터의 보관 장소로 생각하면 된다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },
  { id: 'EC-11', officialItem: '이 메서드는 getter이자 setter다. 첫 parameter만 남기고 생략하면 현재 값을 돌려주고, 첫 parameter보다 많이 정의하면 값을 설정하고 instance 자신을 돌려줘 chaining이 쉬워진다. 공식 예제는 myAnimation.eventCallback("onComplete", completeHandler).eventCallback("onUpdate", updateHandler, ["param1"]).play(1) 이다.', source: 'event-callback', origin: 'official', sectionId: 'lifecycle-callbacks' },

  // --- 07 completion-promise ---
  { id: 'TH-01', officialItem: 'signature는 then( callback:Function ) : Promise 이다.', source: 'then', origin: 'official', sectionId: 'completion-promise' },
  { id: 'TH-02', officialItem: 'Returns는 Promise이며, tween이나 timeline이 완료되는 시점을 promise로 추적할 수 있도록 promise를 돌려준다.', source: 'then', origin: 'official', sectionId: 'completion-promise' },
  { id: 'TH-03', officialItem: 'callback은 Function이며 생성된 Timeline의 promise를 처리할 함수다.', source: 'then', origin: 'official', sectionId: 'completion-promise' },
  { id: 'TH-04', officialItem: 'onComplete callback 대신 Promise를 선호하는 사람들을 위한 것이 then()이며, animation이 완료될 때 resolve되는 Promise를 돌려준다.', source: 'then', origin: 'official', sectionId: 'completion-promise' },
  { id: 'TH-05', officialItem: '공식 예제는 gsap.timeline().to(".class", {duration: 1, x: 100}).then(yourFunction).then(...) 처럼 then을 이어 붙인다.', source: 'then', origin: 'official', sectionId: 'completion-promise' },

  // --- 공식 문서가 침묵해 설치본 실행으로 확인한 항목 ---
  { id: 'DC-P1', officialItem: 'gsap.delayedCall()이 돌려주는 Tween은 duration()이 0이고 delay()가 넘긴 시간이며, targets()[0]이 넘긴 함수 자신이고 vars.onComplete도 그 함수다. 공식 페이지에는 signature도 Parameters 절도 없다.', source: 'delayed-call', origin: 'implementation', sectionId: 'delayed-call' },
  { id: 'DC-P2', officialItem: 'gsap.killTweensOf(fn)을 부르면 그 함수로 만든 delayedCall Tween의 parent가 null이 되어 더 이상 예약이 남지 않는다.', source: 'delayed-call', origin: 'implementation', sectionId: 'delayed-call' },
  { id: 'CL-P1', officialItem: 'tl.call()은 timeline 자신을 돌려주고, duration이 0인 Tween child 하나를 지정한 position에 추가한다. position을 생략하면 그 child의 startTime이 timeline의 끝과 같아진다.', source: 'call', origin: 'implementation', sectionId: 'timeline-call' },
  { id: 'AP-P1', officialItem: 'tl.addPause()는 timeline 자신을 돌려주지만 tl.removePause()는 아무것도 돌려주지 않는다(undefined). 공식 signature와 TypeScript 타입 선언은 둘 다 self라고 적혀 있어 실제 반환값과 다르다.', source: 'remove-pause', origin: 'implementation', sectionId: 'pause-points' },
  { id: 'AP-P2', officialItem: '재생 중 addPause 지점에 도달하면 timeline이 실제로 멈춘다. paused()가 true가 되고 time()이 pause를 넣은 위치와 정확히 같은 값이 된다.', source: 'add-pause', origin: 'implementation', sectionId: 'pause-points' },
  { id: 'AP-P3', officialItem: '멈춘 뒤 play()로 이어서 재생하면 같은 pause에서 다시 멈추지 않지만, restart()로 처음부터 다시 그 지점을 지나가면 다시 멈춘다.', source: 'add-pause', origin: 'implementation', sectionId: 'pause-points' },
  { id: 'RP-P1', officialItem: 'removePause(position)은 그 위치의 pause만 제거하고 같은 위치에 있는 call() callback은 그대로 남긴다. 그 위치에 pause가 없으면 아무것도 제거하지 않고 오류도 내지 않으며, label로도 제거된다.', source: 'remove-pause', origin: 'implementation', sectionId: 'pause-points' },
  { id: 'EC-P1', officialItem: '설정되지 않은 type의 getter는 undefined를 돌려준다. 대소문자가 틀린 type이나 없는 type도 undefined다. setter는 timeline 자신을 돌려주고, 생성자 vars에 적어 둔 callback도 같은 getter로 읽히며, null로 지운 뒤에는 다시 undefined가 된다.', source: 'event-callback', origin: 'implementation', sectionId: 'lifecycle-callbacks' },
  { id: 'TH-P1', officialItem: 'handler 없이 then()을 부르면 Promise가 timeline 자신으로 resolve된다. await timeline도 같은 값을 돌려주고, 이미 완료된 timeline에 then()을 다시 부르면 곧바로 resolve된다.', source: 'then', origin: 'implementation', sectionId: 'completion-promise' },
]
