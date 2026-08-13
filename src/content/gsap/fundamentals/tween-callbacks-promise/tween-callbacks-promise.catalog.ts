/** 공식 두 문서에서 확인한 기술 item 17개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'event-callback' | 'then'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 콜백 교체와 완료 대기에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const tweenCallbacksPromiseSourceItems: SourceItem[] = [
  { id: 'EC-06', officialItem: 'eventCallback()은 onComplete·onUpdate·onStart·onReverseComplete·onInterrupt·onRepeat 같은 event callback과 거기에 넘길 parameter를 가져오거나 설정한다.', source: 'event-callback', origin: 'official', sectionId: 'after-creation' },
  { id: 'EC-07', officialItem: 'eventCallback() 설정은 생성자의 vars에 직접 적는 것과 기능적으로 동일하다. 공식 문서가 두 줄을 나란히 놓고 equivalent라고 밝힌다.', source: 'event-callback', origin: 'official', sectionId: 'after-creation' },
  { id: 'EC-08', officialItem: 'eventCallback()의 이점은 animation instance가 만들어진 뒤에도 콜백을 설정할 수 있고, 콜백 참조를 조회하거나 즉시 삭제할 수 있다는 것이다.', source: 'event-callback', origin: 'official', sectionId: 'after-creation' },
  { id: 'EC-12', officialItem: 'eventCallback()으로 다루는 callback과 parameter 값은 vars 객체에도 들어가며, vars는 configuration data의 저장소 역할을 한다.', source: 'event-callback', origin: 'official', sectionId: 'after-creation' },

  { id: 'EC-01', officialItem: 'signature는 eventCallback( type:String, callback:Function, params:Array ) : [Function | self] 이다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-form' },
  { id: 'EC-05', officialItem: '첫 인자만 넘기면 현재 값을 돌려주는 getter이고, 두 번째 인자부터 넘기면 값을 설정하는 setter이며 chaining을 위해 instance 자신을 돌려준다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-form' },
  { id: 'EC-09', officialItem: 'event callback을 지울 때는 null을 넘긴다. 공식 예제는 myAnimation.eventCallback("onUpdate", null) 이다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-form' },
  { id: 'EC-11', officialItem: 'event type 하나에는 콜백을 하나만 걸 수 있어서, 새 값을 설정하면 이전 콜백을 덮어쓴다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-form' },

  { id: 'EC-02', officialItem: 'type은 String이며 "onComplete", "onUpdate", "onStart", "onRepeat" 같은 event callback 종류다. 대소문자를 구분한다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-args' },
  { id: 'EC-03', officialItem: 'callback은 Function이고 기본값은 null이며, 해당 event가 일어날 때 호출될 함수다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-args' },
  { id: 'EC-04', officialItem: 'params는 Array이고 기본값은 null이며, callback에 넘길 parameter 배열이다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-args' },
  { id: 'EC-10', officialItem: '공식 예제는 myAnimation에서 eventCallback을 두 번 이어 부르고 마지막에 play(1)까지 연결한 chaining 형태를 보여준다.', source: 'event-callback', origin: 'official', sectionId: 'event-callback-args' },

  { id: 'TH-01', officialItem: 'signature는 then( callback:Function ) : Promise 이다.', source: 'then', origin: 'official', sectionId: 'then-promise' },
  { id: 'TH-02', officialItem: 'callback은 Function이며 생성된 Tween의 promise를 처리할 함수다.', source: 'then', origin: 'official', sectionId: 'then-promise' },
  { id: 'TH-03', officialItem: 'Promise를 돌려주므로 tween이나 timeline이 완료되는 시점을 promise로 추적할 수 있다.', source: 'then', origin: 'official', sectionId: 'then-promise' },
  { id: 'TH-04', officialItem: 'onComplete 대신 Promise를 선호하는 사람들을 위한 것이며, animation이 완료될 때 resolve되는 Promise를 돌려준다.', source: 'then', origin: 'official', sectionId: 'then-promise' },
  { id: 'TH-05', officialItem: '공식 예제는 gsap.to(".class", {duration: 1, x: 100}).then(yourFunction).then(...) 처럼 then을 이어 붙인다.', source: 'then', origin: 'official', sectionId: 'then-promise' },

  { id: 'EC-P1', officialItem: '설정되지 않은 type의 getter는 undefined를 돌려주고, vars에 적어 둔 콜백도 같은 getter로 읽힌다. null로 지운 뒤에도 undefined다. 공식 문서에는 getter의 반환 형태가 없다.', source: 'event-callback', origin: 'implementation', sectionId: 'event-callback-form' },
  { id: 'TH-P1', officialItem: 'handler 없이 then()을 부르면 Promise가 Tween 자신으로 resolve된다. await tween도 같은 방식으로 동작한다. 공식 문서에는 resolve 값이 없다.', source: 'then', origin: 'implementation', sectionId: 'then-promise' },
  { id: 'TH-P2', officialItem: '이미 완료된 Tween에 then()을 다시 호출해도 Tween 자신으로 resolve된다. 공식 문서에는 완료 후 재호출 동작이 없다.', source: 'then', origin: 'implementation', sectionId: 'then-promise' },
]
