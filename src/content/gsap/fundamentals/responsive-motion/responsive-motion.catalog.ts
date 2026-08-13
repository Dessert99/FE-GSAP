/** 공식 두 문서에서 확인한 기술 item 33개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'match-media' | 'match-media-refresh'
  origin: 'official'
  sectionId: string
}

/** 조건별 animation 생성과 정리에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const responsiveMotionSourceItems: SourceItem[] = [
  { id: 'MM-01', officialItem: 'gsap.matchMedia()는 특정 media query가 맞을 때만 실행되는 함수 안에 setup 코드를 넣게 해 주고, 더 이상 맞지 않게 되면 그 함수가 실행되는 동안 만들어진 모든 GSAP animation과 ScrollTrigger가 자동으로 revert된다.', source: 'match-media', origin: 'official', sectionId: 'auto-revert' },
  { id: 'MM-02', officialItem: '반응형·접근성 animation과 ScrollTrigger를 위한 것이며, mobile/desktop 대응이나 prefers-reduced-motion 접근성 대응을 아주 단순하게 만든다.', source: 'match-media', origin: 'official', sectionId: 'auto-revert' },
  { id: 'MM-03', officialItem: 'Returns : MatchMedia — gsap.matchMedia()는 MatchMedia를 돌려준다.', source: 'match-media', origin: 'official', sectionId: 'auto-revert' },
  { id: 'MM-28', officialItem: 'gsap.matchMedia()는 GSAP 3.11.0에서 추가됐다.', source: 'match-media', origin: 'official', sectionId: 'auto-revert' },

  { id: 'MM-04', officialItem: '각 media query 문자열은 브라우저의 native window.matchMedia()에 넘기는 것과 정확히 같다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-05', officialItem: 'mm 변수 하나에 원하는 만큼 add()로 media query를 더할 수 있고, 그 하나의 객체에 revert()를 부르면 연결된 모든 MatchMedia 함수에서 만들어진 animation·ScrollTrigger가 즉시 revert된다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-06', officialItem: '함수는 활성(매치) 상태가 될 때마다 호출된다. 사용자가 breakpoint를 넘나들며 여러 번 크기를 바꾸면 함수도 여러 번 호출된다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-07', officialItem: 'add()의 첫 인자 query/conditions — "(min-width: 800px)" 같은 media query 문자열이거나, 원하는 만큼 임의 이름의 query 문자열을 담은 conditions 객체이며 각각의 매치 상태를 boolean으로 확인할 수 있다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-08', officialItem: 'add()의 둘째 인자 handler function — 매치가 있을 때 호출할 함수다. 이 함수가 실행되는 동안 만들어진 모든 GSAP animation과 ScrollTrigger는 context에 수집돼, MatchMedia가 revert될 때(조건이 더 이상 맞지 않을 때처럼) 함께 revert된다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-09', officialItem: 'add()의 셋째 인자 scope [optional] — handler 함수 안의 모든 GSAP 관련 선택자 텍스트가 이 Element나 React Ref나 Angular ElementRef로 scoped된다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-10', officialItem: '구조는 mm.add("(min-width: 800px)", () => {...}, myElementOrRef); 형태다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-12', officialItem: '공식 desktop/mobile 예제는 하나의 mm에 "(min-width: 800px)"와 "(max-width: 799px)"를 각각 add()해 setup 코드를 나눈다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },
  { id: 'MM-27', officialItem: 'mobile 기기에서 동작하지 않는 것 같다면 <head></head>에 <meta name="viewport" content="width=device-width, initial-scale=1" />를 넣어 본다.', source: 'match-media', origin: 'official', sectionId: 'add-parameters' },

  { id: 'MM-13', officialItem: 'media query마다 따로 add()하면 거의 같은 코드가 중복될 수 있다. 첫 인자에 문자열 대신 임의 이름의 conditions 객체를 넘기면 그중 하나라도 매치될 때 함수가 호출되고 각 조건을 boolean으로 확인할 수 있다.', source: 'match-media', origin: 'official', sectionId: 'conditions-object' },
  { id: 'MM-14', officialItem: 'conditions 객체 예시는 { isDesktop: "(min-width: 800px)", isMobile: "(max-width: 799px)", reduceMotion: "(prefers-reduced-motion: reduce)" }이며 조건 이름은 원하는 대로 지어도 된다.', source: 'match-media', origin: 'official', sectionId: 'conditions-object' },
  { id: 'MM-15', officialItem: 'context.conditions는 위에서 정의한 각 조건마다 매치 여부를 나타내는 boolean property를 갖는다. 공식 예제는 let { isDesktop, isMobile, reduceMotion } = context.conditions로 분해한다.', source: 'match-media', origin: 'official', sectionId: 'conditions-object' },
  { id: 'MM-16', officialItem: '공식 conditions 예제는 breakPoint 800을 기준으로 rotation: isDesktop ? 360 : 180(desktop이면 더 돈다)과 duration: reduceMotion ? 0 : 2(모션 감소면 끝으로 건너뛴다)를 쓴다.', source: 'match-media', origin: 'official', sectionId: 'conditions-object' },
  { id: 'MM-18', officialItem: '조건 중 하나라도 토글되면 revert하고 handler를 다시 실행한다(하나도 매치되지 않으면 다시 실행하지 않는다). 조건 셋 중 둘이 매치되면 실행되고, 매치되던 query 하나가 false로 토글되면 revert 후 갱신된 조건 값으로 함수를 다시 실행한다.', source: 'match-media', origin: 'official', sectionId: 'conditions-object' },

  { id: 'MM-11', officialItem: 'handler는 선택적으로 cleanup 함수를 반환할 수 있고, 그 함수는 조건이 더 이상 매치되지 않게 될 때(매치된 적이 있는 뒤에) 실행된다.', source: 'match-media', origin: 'official', sectionId: 'cleanup-order' },
  { id: 'MM-17', officialItem: 'cleanup 함수는 자동으로 context.revert()를 호출하므로 거기서 직접 revert하지 말고 custom cleanup 코드만 넣어야 한다.', source: 'match-media', origin: 'official', sectionId: 'cleanup-order' },
  { id: 'MM-19', officialItem: 'Context가 만들어져 handler의 유일한 parameter로 전달된다. MatchMedia에 revert()가 불릴 때 함께 revert돼야 하는 animation·ScrollTrigger를 나중에 만드는 event handler나 코드를 작성할 때 유용하다.', source: 'match-media', origin: 'official', sectionId: 'cleanup-order' },
  { id: 'MM-20', officialItem: 'MatchMedia 함수가 끝난 뒤 실행되는 "click" 같은 event listener 안의 animation을 기록하려면 context 객체 자체에 이름 붙인 함수를 add()한다. 공식 예제는 context.add("onClick", ...) 뒤 myButton.addEventListener("click", context.onClick)를 걸고, cleanup 함수에서 event listener를 반드시 제거한다.', source: 'match-media', origin: 'official', sectionId: 'cleanup-order' },
  { id: 'MM-26', officialItem: 'gsap.context()를 따로 쓸 필요는 없다. gsap.matchMedia()가 내부적으로 gsap.context()를 만들기 때문에 둘을 함께 쓰는 것은 불필요하다. gsap.matchMedia()는 gsap.context()의 특수화된 wrapper이며, matchMedia 객체에 revert()를 부르는 것은 gsap.context()에 부르는 것과 같다.', source: 'match-media', origin: 'official', sectionId: 'cleanup-order' },

  { id: 'MM-21', officialItem: '셋째 parameter로 Element나 React Ref나 Angular ElementRef를 넘기면 그 함수 안의 모든 선택자 텍스트가 해당 Element/Ref로 scoped된다. 그 Element/Ref에 querySelectorAll()을 부르는 것과 같다.', source: 'match-media', origin: 'official', sectionId: 'scope-selector' },
  { id: 'MM-22', officialItem: 'scope는 ".myClass" 같은 선택자 텍스트 자체일 수도 있고 Element, React Ref, Angular ElementRef일 수도 있다.', source: 'match-media', origin: 'official', sectionId: 'scope-selector' },
  { id: 'MM-23', officialItem: 'MatchMedia를 만들 때 유일한 parameter로 넘기면 기본 scope가 된다. 개별 add()의 scope 인자는 그 기본 scope를 덮어쓴다.', source: 'match-media', origin: 'official', sectionId: 'scope-selector' },

  { id: 'MM-24', officialItem: 'gsap.matchMediaRefresh()를 쓰면 활성·매치 중인 모든 MatchMedia 객체를 즉시 revert하고 현재 매치되는 것을 실행한다. 모션 감소 설정을 토글하는 UI 체크박스를 다룰 때 매우 유용하다.', source: 'match-media', origin: 'official', sectionId: 'reduced-motion-refresh' },
  { id: 'MM-25', officialItem: 'animation은 전정기관 장애가 있는 사용자에게 메스꺼움을 유발할 수 있으므로 최소한의 animation이나 아예 없는 animation을 제공해 선호를 존중해야 하며, 이를 위해 prefers reduced motion media query를 쓸 수 있다. 공식 페이지는 CSS-Tricks의 empathetic animation 글을 함께 링크한다.', source: 'match-media', origin: 'official', sectionId: 'reduced-motion-refresh' },
  { id: 'MMR-01', officialItem: '활성·매치 중인 모든 MatchMedia 객체를 즉시 revert한 다음, 현재 매치되는 것을 실행한다.', source: 'match-media-refresh', origin: 'official', sectionId: 'reduced-motion-refresh' },
  { id: 'MMR-02', officialItem: '"reduce motion" 같은 것을 토글하는 UI 체크박스를 다뤄야 할 때 특히 유용하다.', source: 'match-media-refresh', origin: 'official', sectionId: 'reduced-motion-refresh' },
  { id: 'MMR-03', officialItem: 'gsap.matchMedia() 인스턴스를 destroy하지는 않는다. 현재 매치 중인 것을 revert하고, 매치되는 것을 다시 실행할 뿐이다.', source: 'match-media-refresh', origin: 'official', sectionId: 'reduced-motion-refresh' },
  { id: 'MMR-04', officialItem: '창을 완전히 리사이즈해서 매치되던 것이 모두 매치되지 않게 만든 다음, 다시 원래 크기로 되돌려 다시 매치되게 한 것과 거의 같다고 생각하면 된다.', source: 'match-media-refresh', origin: 'official', sectionId: 'reduced-motion-refresh' },

  { id: 'MM-29', officialItem: '공식 페이지의 데모 셋(Demo using conditional syntax, simple demo, checkbox toggle)과 Examples는 CodePen 임베드라 본문에 코드가 없고, Examples는 CodePen Collection 링크만 제공한다.', source: 'match-media', origin: 'official', sectionId: 'boundaries' },

]
