/** 공식 두 문서에서 확인한 기술 항목 33개와 실행으로만 확인한 7개를 로컬 섹션과 1:1로 묶어 대조 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'context' | 'selector'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** context 수집·범위 지정과 scoped selector에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const gsapContextSourceItems: SourceItem[] = [
  { id: 'CTX-01', officialItem: 'gsap.context()의 첫 번째 이점은 supplied function 안에서 만들어진 모든 GSAP animation과 ScrollTrigger를 모아 두어 한 번에 revert()하거나 kill()할 수 있게 하는 것이다. 변수나 Array를 따로 추적할 필요가 없다.', source: 'context', origin: 'official', sectionId: 'collect-and-revert' },
  { id: 'CTX-02', officialItem: 'React module처럼 element를 원래 상태로 되돌려 "clean up" 해야 하는 곳에서 특히 유용하다. 공식은 "여러 애니메이션을 만드는 big block of GSAP code를 전부 revert()해야 하는 상황"을 동기로 든다.', source: 'context', origin: 'official', sectionId: 'collect-and-revert' },
  { id: 'CTX-03', officialItem: '최소 사용 예제는 let ctx = gsap.context(() => { gsap.to(...); gsap.from(...); gsap.timeline().to(...).to(...); ...}); 뒤에 ctx.revert(); 이며, 주석은 "BOOM! Every GSAP animation created in that function gets reverted!" 이다.', source: 'context', origin: 'official', sectionId: 'collect-and-revert' },
  { id: 'CTX-04', officialItem: 'gsap.context()는 version 3.11.0에 추가됐다.', source: 'context', origin: 'official', sectionId: 'collect-and-revert' },

  { id: 'CTX-05', officialItem: '두 번째 이점은 [optionally] 모든 selector text를 특정 Element나 Ref로 scope하는 것이다. 코드를 상당히 단순화하고 React/Angular에서 Ref를 많이 만들지 않아도 되게 한다. 함수 안의 GSAP 관련 selector text는 그 Element/Ref의 descendant에만 적용된다.', source: 'context', origin: 'official', sectionId: 'scoped-selector' },
  { id: 'CTX-06', officialItem: 'Element나 React Ref나 Angular ElementRef를 선택적으로 넘기면 supplied function 안의 모든 selector text가 그 Element/Ref로 scope된다. "No more creating a Ref for every element you want to animate!"', source: 'context', origin: 'official', sectionId: 'scoped-selector' },
  { id: 'CTX-07', officialItem: '공식 예제는 gsap.context(() => { gsap.to(".box", {...}); gsap.from(".circle", {...}); }, myRefOrElement); 이며 두 번째 인자에 "<- scope!!!" 주석을, 선택자에 "normal selector text, automatically scoped to myRefOrElement" 주석을 달았다.', source: 'context', origin: 'official', sectionId: 'scoped-selector' },
  { id: 'CTX-08', officialItem: 'scope는 ".myClass" 같은 selector text 자체일 수도 있고 Element, React Ref, Angular ElementRef일 수도 있다.', source: 'context', origin: 'official', sectionId: 'scoped-selector' },
  { id: 'CTX-09', officialItem: 'Vue 3 Composition API note — ref를 쓸 때는 ref 객체 자체가 아니라 onMounted() 이후의 DOM element(container.value)를 넘긴다.', source: 'context', origin: 'official', sectionId: 'scoped-selector' },

  { id: 'SEL-01', officialItem: 'gsap.utils.selector()는 특정 Element에 scope된 selector function을 돌려주며, 그 함수는 해당 Element의 descendant만 찾는다. Returns 표기는 Function이다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-02', officialItem: 'parameter scope는 [Element | String | Object] 이고 optional이다. selector text scope를 제한할 Element(또는 selector text, React Ref, Angular ElementRef)이며, document.querySelectorAll()이 아니라 scopeElement.querySelectorAll([selector-text])를 부르는 것과 같다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-03', officialItem: '"Remember, gsap.utils.selector() returns a reusable selector function, not the results of the selection." — 돌려받는 것은 선택 결과가 아니라 재사용 가능한 함수다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-04', officialItem: 'component에 좋은 이유는 그 component의 main container element에 scoped selector를 만들어 descendant를 고를 수 있기 때문이다. document가 아니라 그 element에 .querySelectorAll()을 부르는 것과 비슷하되 몇 가지 이점이 더해진다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-05', officialItem: 'NodeList가 아니라 Array를 돌려주므로 .filter()와 .map() 같은 편리한 array method를 쓸 수 있다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-06', officialItem: 'React ref나 Angular ElementRef를 gsap.utils.selector()에 넘길 수 있다. 결과 함수를 사용할 때 생성 이후 re-render됐을 경우를 대비해 .current/.nativeElement를 자동으로 확인한다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-07', officialItem: 'Vanilla 예제는 let q = gsap.utils.selector(myElement); let boxes = q(".box"); gsap.to(q(".circle"), { x: 100 }); 이며 scope 자리에 ".class" 같은 selector text도 쓸 수 있다고 주석에 적었다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-08', officialItem: 'React 예제는 useRef로 만든 el을 gsap.utils.selector(el)에 넘기고 useEffect 안에서 gsap.to(q(".box"), { x: 100 })을 호출하며, 주석으로 "uses el.current.querySelectorAll() internally"라고 밝힌다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-09', officialItem: 'Angular 예제는 constructor에서 ElementRef를 받아 gsap.utils.selector(el)을 만들고 ngOnInit에서 사용하며, 주석으로 "uses this.el.nativeElement.querySelectorAll() internally"라고 밝힌다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-10', officialItem: 'Vue 예제는 mounted에서 $nextTick 이후 gsap.utils.selector(this.$el)을 만들며, 주석으로 "uses this.$el.querySelectorAll() internally"라고 밝힌다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-11', officialItem: 'React의 흔한 패턴은 animate할 element마다 ref를 선언하는 것인데 코드가 매우 장황해지고 읽기 어려워진다. scoped selector를 쓰면 ref 하나만 있으면 되고 descendant를 고르기만 하면 된다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-12', officialItem: '"Why not just use document.querySelectorAll(\'.class\')?" — 같은 component를 한 페이지에서 세 번 쓰면 gsap.to(".my-component .box", { x: 100, stagger: 0.1 })이 그 component 안의 box가 아니라 페이지 전체의 모든 box를 움직인다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },
  { id: 'SEL-13', officialItem: 'tween의 target으로 myComponentRef.current.querySelectorAll(".box")를 쓸 수도 있지만, 이미 scope된 selector()를 만들어 class 이름으로 반복해서 고르는 편이 더 깔끔하다.', source: 'selector', origin: 'official', sectionId: 'selector-utility' },

  { id: 'CTX-10', officialItem: 'mouse click 같은 event handler가 만드는 새 animation도 Context에 모아야 할 수 있는데, 그 event는 Context의 함수가 이미 실행된 뒤에 일어난다. 이를 위해 Context 객체에 자기 메서드를 추가할 수 있다.', source: 'context', origin: 'official', sectionId: 'add-and-ignore' },
  { id: 'CTX-11', officialItem: '공식 예제는 self.add("onClick", (e) => { gsap.to(...); })로 임의의 문자열을 이름으로 등록하고, myButton.addEventListener("click", (e) => ctx.onClick(e))로 부른다. 그 함수 안의 animation은 Context에 추가된다.', source: 'context', origin: 'official', sectionId: 'add-and-ignore' },
  { id: 'CTX-12', officialItem: '함수를 첫 parameter로 주는 ctx.add(() => { gsap.to(...); gsap.from(...); }) 형태로 Context에 즉시(immediately) 추가할 수도 있다.', source: 'context', origin: 'official', sectionId: 'add-and-ignore' },
  { id: 'CTX-13', officialItem: 'Context 객체 자신이 함수에 넘어오므로 gsap.context((self) => { ... self.add(...); }); 처럼 쉽게 참조할 수 있다.', source: 'context', origin: 'official', sectionId: 'add-and-ignore' },
  { id: 'CTX-14', officialItem: '아주 드문 상황에서 함수 안에 만들지만 Context에서 제외해야 하는(Context가 revert/kill될 때 revert/kill되지 않아야 하는) animation이나 ScrollTrigger가 있으면 ignore()를 쓴다.', source: 'context', origin: 'official', sectionId: 'add-and-ignore' },
  { id: 'CTX-15', officialItem: '공식 ignore() 예제의 주석은 self.ignore() 안의 animation에 대해 "will NOT get reverted when ctx.revert() is called. Ignored, not recorded in the Context." 이고, 밖의 animation에는 "will get reverted when ctx.revert() is called" 이다.', source: 'context', origin: 'official', sectionId: 'add-and-ignore' },

  { id: 'CTX-16', officialItem: 'context가 revert될 때 불려야 할 "cleanup function"을 선택적으로 return할 수 있고, 거기에 직접 만든 정리 코드를 담을 수 있다. 공식 예제 주석은 "Called when ctx.revert() is triggered." 이다.', source: 'context', origin: 'official', sectionId: 'revert-lifetime' },
  { id: 'CTX-17', officialItem: '어떤 .add() 함수에서도 cleanup function을 return할 수 있으며, Context의 revert()가 호출될 때 그것들이 모두 불린다.', source: 'context', origin: 'official', sectionId: 'revert-lifetime' },
  { id: 'CTX-18', officialItem: 'Context에 revert()를 부르면 그 안에 있던 animation/ScrollTrigger에 대해서는 permanent하다. 그것들은 revert되고 kill되며 Context는 자신을 비워 garbage collection 대상이 되게 한다. 다만 그 뒤에도 animation을 더 추가할 수 있고 같은 Context에 revert()를 다시 불러 그것들을 revert/kill할 수 있다.', source: 'context', origin: 'official', sectionId: 'revert-lifetime' },
  { id: 'CTX-19', officialItem: 'Context는 animation을 제어하는 수단이 아니다. 그것은 Timeline이 할 일이다. Context는 단지 revert/kill과 [선택적] selector text scope 정의를 위한 것이다.', source: 'context', origin: 'official', sectionId: 'revert-lifetime' },

  { id: 'CTX-20', officialItem: 'React를 쓴다면 gsap.context()를 추상화하고 animation cleanup을 대신 처리해 주는 hook이 따로 있으며, 공식은 React guide로 연결한다.', source: 'context', origin: 'official', sectionId: 'boundaries' },

  { id: 'CTX-P1', officialItem: 'gsap.context()가 돌려주는 것은 생성자 이름이 Context인 instance이고 prototype에 add·ignore·getTweens·clear·kill·revert가, 자신에 selector·data·isReverted·id·last가 있다. 넘긴 함수는 gsap.context() 호출 시점에 즉시 실행되어 그 안의 animation이 곧바로 data에 쌓인다. 공식 페이지에는 signature·Parameters·Returns 절 자체가 없다.', source: 'context', origin: 'implementation', sectionId: 'collect-and-revert' },
  { id: 'CTX-P2', officialItem: 'getTweens()는 data에 기록된 것 중 Tween만 골라 Array로 돌려준다. Timeline을 만들면 data에는 Timeline과 그 자식 Tween이 함께 들어가서 data.length가 만든 animation 수보다 커질 수 있다. 공식 페이지에 getTweens()는 등장하지 않는다.', source: 'context', origin: 'implementation', sectionId: 'collect-and-revert' },
  { id: 'SEL-P1', officialItem: 'scope 문자열은 document가 있어야 해석된다. document가 없는 Node에서 gsap.context(fn, ".my-scope")를 부르면 querySelectorAll을 읽지 못해 TypeError가 난다. 공식 페이지는 DOM 필요 여부를 적어 두지 않았다.', source: 'selector', origin: 'implementation', sectionId: 'selector-utility' },
  { id: 'CTX-P3', officialItem: 'add(name, fn)은 fn을 즉시 실행하지 않고 Context에 name 메서드를 만들며 그 wrapper 함수를 반환한다. 반환 함수는 Context에 추가된 name 메서드와 같다. 그 메서드를 부를 때 비로소 animation이 data에 들어간다. 반면 add(fn)은 fn을 그 자리에서 실행하고 그 함수의 반환값을 돌려준다. void 함수라면 실행값은 undefined다.', source: 'context', origin: 'implementation', sectionId: 'add-and-ignore' },
  { id: 'CTX-P6', officialItem: 'ignore()는 Context 함수가 이미 끝난 뒤 ctx.ignore(fn)으로 불러도 그 안에서 만든 animation을 data에 넣지 않는다. 공식 예제는 함수 안에서 self.ignore()를 부르는 형태만 보여 준다.', source: 'context', origin: 'implementation', sectionId: 'add-and-ignore' },
  { id: 'CTX-P4', officialItem: 'revert()는 대상 값을 애니메이션 시작 전 상태로 되돌리고 isReverted를 true로 만들며 data를 비운다. kill()은 값을 현재 자리에 그대로 둔 채 animation만 없애고 isReverted는 false로 남는다. kill(true)는 revert()처럼 값까지 되돌린다. 공식 페이지는 두 메서드를 함께 언급할 뿐 차이를 적어 두지 않았다.', source: 'context', origin: 'implementation', sectionId: 'revert-lifetime' },
  { id: 'CTX-P5', officialItem: '함수가 return한 cleanup function과 각 add()가 return한 cleanup function은 revert() 한 번에 모두 불리고, 같은 cleanup function이 두 번째 revert()에서 다시 불리지는 않는다. kill()은 cleanup function을 부르지 않고 kill(true)는 부른다. 공식 페이지는 호출 여부만 밝히고 횟수나 kill()과의 관계는 적어 두지 않았다.', source: 'context', origin: 'implementation', sectionId: 'revert-lifetime' },
]
