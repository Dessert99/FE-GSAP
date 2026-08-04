/** 공식 여섯 문서에서 확인한 기술 item 39개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 이 페이지가 담당하는 공식 문서 여섯 개의 식별자다. */
export type SourceKey = 'get-by-id' | 'get-tweens-of' | 'is-tweening' | 'kill-tweens-of' | 'tween-kill' | 'tween-revert'

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: SourceKey
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 조회와 중단에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const findStopAnimationsSourceItems: SourceItem[] = [
  { id: 'GID-01', officialItem: 'tween이나 timeline을 만들 때 id를 부여하면 나중에 그것을 참조할 수 있다.', source: 'get-by-id', origin: 'official', sectionId: 'lost-reference' },
  { id: 'GID-02', officialItem: 'React 같은 framework와 build tool에서 변수를 계속 추적하기 어려울 때 도움이 된다.', source: 'get-by-id', origin: 'official', sectionId: 'lost-reference' },
  { id: 'GID-07', officialItem: 'animation이 완료된 뒤에도 참조를 유지해야 한다면 변수를 쓰라고 공식 문서가 권한다 — let myTween = gsap.to(obj, {duration: 1, x: 100}) 뒤 나중에 myTween.pause().', source: 'get-by-id', origin: 'official', sectionId: 'lost-reference' },

  { id: 'GID-03', officialItem: '반환값은 해당 ID에 연결된 tween 또는 timeline이며, 그 ID를 가진 것이 없으면 undefined를 돌려준다.', source: 'get-by-id', origin: 'official', sectionId: 'find-by-id' },
  { id: 'GID-04', officialItem: '공식 예제는 gsap.to(obj, { id: "myTween", duration: 1, x: 100 }) 로 만든 뒤 let tween = gsap.getById("myTween")으로 찾아 tween.pause()를 호출한다.', source: 'get-by-id', origin: 'official', sectionId: 'find-by-id' },
  { id: 'GID-05', officialItem: 'GSAP은 animation이 완료된 직후 garbage collection으로 넘기므로, getById()는 active이거나 아직 시작하지 않은 animation만 찾는다.', source: 'get-by-id', origin: 'official', sectionId: 'find-by-id' },
  { id: 'GID-06', officialItem: 'getById()로 찾을지 모른다는 이유로 모든 animation을 붙잡고 있으면 시스템이 금세 막히고 memory leak으로 이어질 수 있다.', source: 'get-by-id', origin: 'official', sectionId: 'find-by-id' },

  { id: 'GTO-01', officialItem: '특정 target(또는 target 그룹)의 tween을 모두 담은 array를 돌려준다.', source: 'get-tweens-of', origin: 'official', sectionId: 'find-by-target' },
  { id: 'GTO-02', officialItem: '아직 garbage collection으로 넘어가지 않은 tween만 포함하며, 그 시점은 보통 tween이 완료될 때다.', source: 'get-tweens-of', origin: 'official', sectionId: 'find-by-target' },
  { id: 'GTO-03', officialItem: 'gsap.getTweensOf(".myClass")처럼 selector text를 넘기면 그 class를 가진 element들의 tween 배열을 돌려주고, 실제 element·target·object를 그대로 넘겨도 된다.', source: 'get-tweens-of', origin: 'official', sectionId: 'find-by-target' },
  { id: 'GTO-04', officialItem: 'tween을 만들고 끝나게 둔 뒤 한참 있다 찾으면 engine이 이미 garbage collection으로 넘겨서 못 찾을 수 있다.', source: 'get-tweens-of', origin: 'official', sectionId: 'find-by-target' },
  { id: 'GTO-05', officialItem: 'GSAP이 garbage collection을 대신 처리해 주기 때문에 tween을 하나씩 수동으로 폐기하지 않아도 된다.', source: 'get-tweens-of', origin: 'official', sectionId: 'find-by-target' },
  { id: 'GTO-06', officialItem: '공식 예제는 obj1 tween, obj2 tween, [obj1,obj2] tween 세 개를 만든 뒤 getTweensOf(obj1)이 2개를, getTweensOf([obj1,obj2])가 3개를 찾는다고 밝힌다.', source: 'get-tweens-of', origin: 'official', sectionId: 'find-by-target' },

  { id: 'IST-01', officialItem: '특정 object가 지금 실제로 animate 중인지 여부를 Boolean으로 알려준다.', source: 'is-tweening', origin: 'official', sectionId: 'find-by-target' },
  { id: 'IST-02', officialItem: 'tween이 paused이거나 completed이거나 아직 시작하지 않았으면 active로 치지 않는다.', source: 'is-tweening', origin: 'official', sectionId: 'find-by-target' },
  { id: 'IST-03', officialItem: 'target에는 selector text나 object/element를 줄 수 있다.', source: 'is-tweening', origin: 'official', sectionId: 'find-by-target' },
  { id: 'IST-04', officialItem: '공식 예제는 if (!gsap.isTweening("#id")) { ... } 처럼 조건문의 가드로 쓴다.', source: 'is-tweening', origin: 'official', sectionId: 'find-by-target' },

  { id: 'KTO-01', officialItem: '특정 object의 모든 tween(또는 특정 tweening property)이나 특정 함수의 delayedCall을 kill한다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-scope' },
  { id: 'KTO-02', officialItem: '두 번째 parameter로 property만 좁혀 kill한다 — myObject.opacity와 myObject.x만 멈추려면 gsap.killTweensOf(myObject, "opacity,x").', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-scope' },
  { id: 'KTO-03', officialItem: 'delayedCall은 target과 onComplete가 같은 함수인 tween이므로, gsap.killTweensOf(myFunction)으로 그 함수의 delayedCall을 모두 kill한다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-scope' },
  { id: 'KTO-04', officialItem: 'selector text를 넘길 수 있다 — ".myClass"나 "#myID"는 해당 element의 tween을, "*"는 DOM target을 가진 모든 tween을 kill한다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-scope' },
  { id: 'KTO-05', officialItem: 'target 배열도 넘길 수 있다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-scope' },
  { id: 'KTO-06', officialItem: '아직 시작하지 않은 tween에도 작용한다 — delay가 5초인 tween을 만든 지 2초 뒤에 kill해도 시작 전인 채로 kill된다.', source: 'kill-tweens-of', origin: 'official', sectionId: 'kill-scope' },

  { id: 'TKL-01', officialItem: 'signature는 kill( target:Object, propertiesList:String ) : self 이다.', source: 'tween-kill', origin: 'official', sectionId: 'kill-scope' },
  { id: 'TKL-02', officialItem: 'target은 Object이고 기본값은 null이며, 특정 target(들)에 관한 부분만 kill할 때 지정한다. target을 주지 않으면 모든 target이 영향을 받는다.', source: 'tween-kill', origin: 'official', sectionId: 'kill-scope' },
  { id: 'TKL-03', officialItem: 'propertiesList는 String이고 기본값은 "all"이며, 이 Tween이 더 이상 animate하지 않을 property 이름을 콤마로 나열한다. 값을 주지 않거나 null·"all"이면 모든 property가 kill된다.', source: 'tween-kill', origin: 'official', sectionId: 'kill-scope' },
  { id: 'TKL-04', officialItem: '반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'tween-kill', origin: 'official', sectionId: 'kill-scope' },
  { id: 'TKL-05', officialItem: 'parameter에 따라 animation을 전부 kill하거나 일부만 kill한다.', source: 'tween-kill', origin: 'official', sectionId: 'kill-scope' },
  { id: 'TKL-08', officialItem: '공식 예제는 animation.kill(myObject), animation.kill(null, "x,y"), animation.kill(myObject, "x,y"), animation.kill([myObject1, myObject2], "opacity")를 나열하며 마지막 줄에는 selector text(".class1, .class2")도 쓸 수 있다고 적는다.', source: 'tween-kill', origin: 'official', sectionId: 'kill-scope' },

  { id: 'TKL-06', officialItem: 'kill한다는 것은 animation을 즉시 멈추고, 부모 timeline에서 제거하고, garbage collection으로 넘긴다는 뜻이다.', source: 'tween-kill', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TKL-07', officialItem: 'parameter 없이 kill()만 부르면 즉시 멈춤 + 부모 timeline에서 제거 + property tween 전부 제거 + garbage collection이 한 번에 일어난다. 공식 예제는 animation.kill() 뒤에 animation = null로 참조까지 지운다.', source: 'tween-kill', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TKL-09', officialItem: '나중에 다시 쓸 animation은 kill()하지 말라고 경고한다. 재사용하려면 pause()를 쓰면 된다.', source: 'tween-kill', origin: 'official', sectionId: 'stop-vs-restore' },

  { id: 'TRV-01', officialItem: 'signature는 revert( ) : Self 이며 parameter가 없다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TRV-02', officialItem: 'animation을 revert하고 kill하며, target을 animation 이전 상태로 되돌린다. 여기에는 animation이 추가한 inline style의 제거도 포함된다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TRV-03', officialItem: '반환값은 Tween 자신이며 chaining을 쉽게 하기 위한 것이다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TRV-04', officialItem: 'progress(0)도 GSAP이 computed style에서 읽어 둔 시작값으로 되돌리기는 하지만, 그 결과가 inline style로 남는다. 공식 예제는 inline style이 전혀 없던 <div class="box">가 progress(0).pause() 뒤 style="opacity: 1"을 갖게 되는 것을 보여준다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TRV-05', officialItem: '남아 있는 inline style은 대개 문제가 없지만, 예를 들어 media query CSS rule이 opacity를 0.5로 정해 두면 inline style이 그 class rule을 덮어써 버린다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TRV-06', officialItem: 'progress(0)은 그 지점의 상태를 보장하기 위해 inline style을 쓰는 것이 당연하므로, 원래 inline style을 기억해 두고 자기가 추가한 것만 제거하는 별도 메서드가 필요했다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },
  { id: 'TRV-07', officialItem: 'GSAP 3.11에서 모든 Tween과 Timeline에 .revert()가 추가됐다.', source: 'tween-revert', origin: 'official', sectionId: 'stop-vs-restore' },

  { id: 'FS-P1', officialItem: 'progress(0.5)에서 kill()하면 대상 값이 그 자리(50)에 남고, 같은 조건에서 revert()하면 tween이 기록한 시작값(0)으로 되돌아간다. 공식 문서는 두 결과를 나란히 비교하지 않는다.', source: 'tween-revert', origin: 'implementation', sectionId: 'stop-vs-restore' },
  { id: 'FS-P2', officialItem: 'revert()도 kill()과 마찬가지로 registry에서 사라진다 — 호출 뒤 getById()는 undefined, getTweensOf()는 0개다. 공식 문서에는 revert 뒤의 조회 결과가 없다.', source: 'tween-revert', origin: 'implementation', sectionId: 'stop-vs-restore' },
  { id: 'FS-P3', officialItem: 'pause()한 Tween은 getById()와 getTweensOf()로는 그대로 찾히지만 isTweening()은 false다. 공식 문서는 두 조회의 관계를 함께 설명하지 않는다.', source: 'is-tweening', origin: 'implementation', sectionId: 'find-by-target' },
  { id: 'FS-P4', officialItem: 'kill()한 Tween은 progress()나 restart()를 다시 불러도 대상 값을 더 이상 쓰지 않는다. 공식 문서는 재사용하지 말라고만 경고하고 결과를 보여주지 않는다.', source: 'tween-kill', origin: 'implementation', sectionId: 'stop-vs-restore' },
  { id: 'FS-P5', officialItem: 'id에 숫자를 넣으면 getById(7)로는 찾히지만 getById("7")로는 찾히지 않는다. 공식 문서는 id의 허용 타입을 밝히지 않는다.', source: 'get-by-id', origin: 'implementation', sectionId: 'find-by-id' },
  { id: 'FS-P6', officialItem: 'property를 좁혀 kill하면 Tween 자체는 살아남아 getTweensOf()에 1개로 계속 잡히고, 범위를 좁히지 않으면 0개가 된다. 공식 문서는 kill 뒤의 조회 결과를 밝히지 않는다.', source: 'tween-kill', origin: 'implementation', sectionId: 'kill-scope' },
]
