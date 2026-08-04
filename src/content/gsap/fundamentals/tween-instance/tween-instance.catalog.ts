/** 공식 네 문서에서 확인한 기술 item 39개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'tween' | 'tween-data' | 'tween-scroll-trigger' | 'tween-targets'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 만들어진 Tween instance에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const tweenInstanceSourceItems: SourceItem[] = [
  { id: 'TW-01', officialItem: 'Tween은 애니메이션 작업을 실제로 수행하는 것이며, high-performance property setter로 생각하라고 안내한다.', source: 'tween', origin: 'official', sectionId: 'tween-identity' },
  { id: 'TW-02', officialItem: 'targets·duration·animate할 property를 넣으면, playhead가 새 위치로 갈 때마다 그 시점의 property 값을 계산해 적용한다.', source: 'tween', origin: 'official', sectionId: 'tween-identity' },
  { id: 'TW-03', officialItem: 'Tween을 만드는 method는 gsap.to(), gsap.from(), gsap.fromTo() 세 개이며 모두 Tween instance를 반환한다.', source: 'tween', origin: 'official', sectionId: 'tween-identity' },
  { id: 'TW-04', officialItem: '간단한 애니메이션에는 그 method들만으로 충분하다. 최소 예제는 gsap.to(".box", { rotation: 27, x: 100, duration: 1 })이고 x는 translateX() transform의 단축이다.', source: 'tween', origin: 'official', sectionId: 'tween-identity' },
  { id: 'TW-05', officialItem: 'GSAP은 어떤 객체의 어떤 property든 animate할 수 있어 CSS property나 DOM object에 한정되지 않는다.', source: 'tween', origin: 'official', sectionId: 'tween-identity' },

  { id: 'TW-07', officialItem: 'Tween instance를 나중에 제어하려면 변수에 할당한다. 공식 예제는 tween.pause() · tween.seek(2) · tween.progress(0.5) · tween.play() 순으로 같은 변수를 조작한다.', source: 'tween', origin: 'official', sectionId: 'instance-lifecycle' },
  { id: 'TW-08', officialItem: '그냥 실행만 시킬 때는 변수가 필요 없다. Tween은 기본적으로 즉시 재생되고(delay나 paused를 지정할 수 있다) 끝나면 스스로 폐기하므로 cleanup 걱정 없이 gsap.to()를 불러도 된다.', source: 'tween', origin: 'official', sectionId: 'instance-lifecycle' },

  { id: 'TW-09', officialItem: 'targets 인자는 selector text(".class", "#id" — 내부적으로 document.querySelectorAll() 사용), element 직접 참조, generic object, object 배열을 받는다.', source: 'tween', origin: 'official', sectionId: 'instance-surface' },
  { id: 'TW-10', officialItem: 'vars 인자는 animate할 property·value 전부와 ease·duration·delay·onComplete 같은 special property를 담은 객체다.', source: 'tween', origin: 'official', sectionId: 'instance-surface' },
  { id: 'TW-25', officialItem: 'Methods 표에는 30개 method가 있고 각 행이 인자와 반환 타입을 밝힌다. targets( ) : Array 행은 설명 칸이 비어 있다.', source: 'tween', origin: 'official', sectionId: 'instance-surface' },
  { id: 'TW-26', officialItem: 'Properties 표에는 data, ratio, scrollTrigger, vars 네 개만 있다.', source: 'tween', origin: 'official', sectionId: 'instance-surface' },
  { id: 'TW-27', officialItem: 'ratio는 [read-only]이며 ease를 통과한 뒤의 progress다. ease "back"이나 "elastic"에서는 0–1 범위를 넘을 수 있고 onUpdate에서 자체 보간의 배수로 쓸 수 있다.', source: 'tween', origin: 'official', sectionId: 'instance-surface' },
  { id: 'TW-28', officialItem: 'vars : Object는 constructor에 넘긴 설정 객체이며 animate할 property·value와 optional special property를 담고 있다.', source: 'tween', origin: 'official', sectionId: 'instance-surface' },

  { id: 'TG-01', officialItem: 'signature는 targets( ) : Array 이며 인자가 없다.', source: 'tween-targets', origin: 'official', sectionId: 'targets-method' },
  { id: 'TG-02', officialItem: 'Tween이 property를 animate하는 target object들의 배열이다.', source: 'tween-targets', origin: 'official', sectionId: 'targets-method' },
  { id: 'TG-03', officialItem: 'Tween을 만들 때 selector text를 썼다면 이 배열에는 그 query string에 매치된 DOM element들이 들어 있다.', source: 'tween-targets', origin: 'official', sectionId: 'targets-method' },
  { id: 'TW-16', officialItem: 'function-based value가 받는 세 인자는 index, target, targets이고 세 번째 targets는 tween.targets()와 같다.', source: 'tween', origin: 'official', sectionId: 'targets-method' },

  { id: 'TW-12', officialItem: 'data special property에 임의의 데이터(문자열, 객체 참조 등)를 지정하면 tween instance 자체에 붙어 나중에 yourTween.data로 참조할 수 있다.', source: 'tween', origin: 'official', sectionId: 'data-and-id' },
  { id: 'TW-13', officialItem: 'id special property로 tween instance에 고유 식별자를 붙이면 gsap.getById()로 찾을 수 있고 GSDevTools에 그 id로 표시된다.', source: 'tween', origin: 'official', sectionId: 'data-and-id' },
  { id: 'DA-01', officialItem: '전용 페이지가 밝힌 signature는 data : * 이며 타입을 제한하지 않는다.', source: 'tween-data', origin: 'official', sectionId: 'data-and-id' },
  { id: 'DA-02', officialItem: '원하는 어떤 데이터든 저장해 두는 자리다.', source: 'tween-data', origin: 'official', sectionId: 'data-and-id' },
  { id: 'DA-03', officialItem: 'vars.data가 있으면 그 값으로 초기에 채워진다.', source: 'tween-data', origin: 'official', sectionId: 'data-and-id' },

  { id: 'ST-01', officialItem: 'signature는 scrollTrigger: ScrollTrigger | undefined 이다.', source: 'tween-scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-02', officialItem: 'tween에 연결된 ScrollTrigger에 접근하는 편리한 방법이다.', source: 'tween-scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-03', officialItem: 'tween이 ScrollTrigger를 가지고 있을 때만 접근할 수 있다.', source: 'tween-scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-04', officialItem: 'warning — scrollTrigger property는 Timeline이나 Tween이 ScrollTrigger를 가지고 있을 때만 추가된다.', source: 'tween-scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },
  { id: 'ST-05', officialItem: '공식 예제는 vars 안에 scrollTrigger를 적어 만든 뒤 tl.scrollTrigger.refresh()와 tl.scrollTrigger.kill()을 호출하고, 자세한 내용은 ScrollTrigger 문서로 넘긴다.', source: 'tween-scroll-trigger', origin: 'official', sectionId: 'scroll-trigger' },

  { id: 'TW-06', officialItem: 'delay special property로 기본 sequencing이 가능하지만 Timeline이 훨씬 쉽다. Timeline은 여러 Tween instance(그리고/또는 다른 Timeline)의 컨테이너로 시간 위에 배치하고 전체를 하나로 제어한다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-11', officialItem: 'Special Properties 표에는 32개 항목이 있다: callbackScope, data, delay, duration, ease, easeReverse, id, immediateRender, inherit, lazy, onComplete, onCompleteParams, onRepeat, onRepeatParams, onReverseComplete, onReverseCompleteParams, onStart, onStartParams, onUpdate, onUpdateParams, overwrite, paused, repeat, repeatDelay, repeatRefresh, reversed, runBackwards, stagger, startAt, yoyo, yoyoEase, keyframes.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-14', officialItem: 'plugin은 GSAP core에 추가 기능을 더한다. 덕분에 core가 작게 유지되고 필요할 때만 기능을 추가한다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-15', officialItem: 'function-based value는 tween이 처음 render될 때 target마다 한 번씩 호출되고 반환값이 그 값으로 쓰인다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-17', officialItem: 'random value는 "random(-100, 100)" 범위 형태와 "random([red, blue, green])" 배열 선택 형태가 있고, 세 번째 인자로 가까운 증분에 반올림한다. gsap.utils.random()도 직접 쓸 수 있다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-18', officialItem: 'relative value는 "+=" 또는 "-=" 접두사로 지정한다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-19', officialItem: 'target이 여럿이면 stagger: 0.1처럼 시작 시각을 어긋나게 할 수 있고 stagger 객체로 더 정교하게 지정한다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-20', officialItem: 'tween마다 delay를 주는 기본 sequencing보다 Timeline을 강력히 권장한다. 공식 예제는 tl.to()를 점으로 이어 붙인다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-21', officialItem: '같은 target을 반복해 animate한다면 keyframes가 코드를 훨씬 간결하게 하고 CSS animation을 옮기기도 쉽게 한다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-22', officialItem: 'Notes / Tips — 기본 ease는 gsap.defaults({ease: ...})로 바꿀 수 있고 기본값은 "power1.out"이다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-23', officialItem: 'Notes / Tips — gsap.killTweensOf(yourObject)로 특정 객체의 모든 tween을 언제든 kill할 수 있고 gsap.killTweensOf("#someID")처럼 selector text도 쓸 수 있다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },
  { id: 'TW-24', officialItem: 'Notes / Tips — gsap.killTweensOf(myFunction)으로 특정 함수를 향한 delayedCall을 모두 kill할 수 있다.', source: 'tween', origin: 'official', sectionId: 'boundaries' },

  { id: 'INS-P1', officialItem: '완료된 Tween도 targets()·data·vars를 그대로 돌려주고 gsap.getById()로도 계속 찾힌다. kill() 뒤에는 세 값이 남지만 gsap.getById()는 undefined를 돌려준다. 공식 문서는 "스스로 폐기한다"고만 적고 무엇이 남는지 밝히지 않는다.', source: 'tween', origin: 'implementation', sectionId: 'instance-lifecycle' },
  { id: 'INS-P2', officialItem: 'tween.vars는 생성자에 넘긴 바로 그 객체이며(=== 참) GSAP이 그 객체에 duration·overwrite·delay·ease 키를 직접 추가한다. from()·fromTo()는 parent·immediateRender 등도 추가한다. 공식 문서는 복사본인지 원본인지 밝히지 않는다.', source: 'tween', origin: 'implementation', sectionId: 'instance-surface' },
  { id: 'INS-P3', officialItem: 'targets()는 호출할 때마다 같은 배열 참조를 돌려주므로 그 배열을 수정하면 다음 호출 결과도 바뀐다. 공식 문서는 반환 배열이 복사본인지 밝히지 않는다.', source: 'tween-targets', origin: 'implementation', sectionId: 'targets-method' },
  { id: 'INS-P4', officialItem: 'id는 instance의 top-level 속성이 아니다("id" in tween이 false). tween.vars.id로만 남고 조회는 gsap.getById()가 담당한다. 공식 문서는 id를 어디서 읽는지 밝히지 않는다.', source: 'tween', origin: 'implementation', sectionId: 'data-and-id' },
  { id: 'INS-P5', officialItem: 'vars.data 없이 만들어도 "data" in tween은 true이고 값만 undefined다. 나중에 tween.data에 대입해도 vars.data는 따라 바뀌지 않는다. 공식 문서는 vars.data가 없을 때를 밝히지 않는다.', source: 'tween-data', origin: 'implementation', sectionId: 'data-and-id' },
  { id: 'INS-P6', officialItem: 'ScrollTrigger가 없으면 "scrollTrigger" in tween이 false다. 값이 undefined인 것이 아니라 속성 자체가 없다. 공식 signature는 undefined를 함께 적어 두어 두 경우가 구분되지 않는다.', source: 'tween-scroll-trigger', origin: 'implementation', sectionId: 'scroll-trigger' },
]
