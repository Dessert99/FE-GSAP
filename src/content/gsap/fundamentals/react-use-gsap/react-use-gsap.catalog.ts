/** 공식 React 자료에서 확인한 기술 item 19개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 공식 자료의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'react-use-gsap'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** React 통합에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const reactUseGsapSourceItems: SourceItem[] = [
  { id: 'RG-01', officialItem: 'useGSAP()은 useEffect()나 useLayoutEffect()를 대체하는 drop-in replacement이며 gsap.context()를 써서 정리를 자동으로 처리한다.', source: 'react-use-gsap', origin: 'official', sectionId: 'why-cleanup' },
  { id: 'RG-02', officialItem: 'React 18은 로컬에서 기본적으로 strict mode로 실행되어 Effect가 두 번 호출된다.', source: 'react-use-gsap', origin: 'official', sectionId: 'why-cleanup' },
  { id: 'RG-03', officialItem: '그래서 중복되고 충돌하는 animation이나 논리 문제가 생길 수 있다.', source: 'react-use-gsap', origin: 'official', sectionId: 'why-cleanup' },

  { id: 'RG-04', officialItem: "import { useGSAP } from '@gsap/react' 로 가져온다.", source: 'react-use-gsap', origin: 'official', sectionId: 'hook-basics' },
  { id: 'RG-05', officialItem: '공식 예제는 gsap.registerPlugin(useGSAP)을 함께 보여준다.', source: 'react-use-gsap', origin: 'official', sectionId: 'hook-basics' },
  { id: 'RG-06', officialItem: 'useGSAP() 훅이 실행될 때 만들어진 모든 GSAP animation, ScrollTrigger, Draggable, SplitText instance는 컴포넌트가 unmount되고 훅이 해제될 때 자동으로 revert된다.', source: 'react-use-gsap', origin: 'official', sectionId: 'hook-basics' },
  { id: 'RG-07', officialItem: '기본 예제는 container ref를 만들고 useGSAP(() => { gsap.to(".box", { x: 360 }) }, { scope: container }) 형태로 쓴다.', source: 'react-use-gsap', origin: 'official', sectionId: 'hook-basics' },

  { id: 'RG-08', officialItem: 'dependencies는 Array 또는 null이고 기본값은 []이며, 내부 useEffect에 그대로 전달되는 의존성 배열이다.', source: 'react-use-gsap', origin: 'official', sectionId: 'config-object' },
  { id: 'RG-09', officialItem: 'scope는 React ref다. config에 container를 scope로 지정하면 훅 안의 모든 GSAP selector text가 그 container의 자손으로 한정된다.', source: 'react-use-gsap', origin: 'official', sectionId: 'config-object' },
  { id: 'RG-10', officialItem: 'revertOnUpdate는 Boolean이고 기본값 false다. 기본값에서는 의존성 배열을 정의하고 값이 바뀌어도 GSAP 객체들이 revert되지 않고 반환한 cleanup 함수도 실행되지 않는다.', source: 'react-use-gsap', origin: 'official', sectionId: 'config-object' },

  { id: 'RG-11', officialItem: '훅이 실행된 뒤에 만들어지는 animation(클릭 핸들러, setTimeout 등)은 context-safe하지 않다.', source: 'react-use-gsap', origin: 'official', sectionId: 'context-safe' },
  { id: 'RG-12', officialItem: 'contextSafe()로 함수를 감싸면 그 안에서 만들어진 animation이 context에 기록되어 제대로 revert된다.', source: 'react-use-gsap', origin: 'official', sectionId: 'context-safe' },
  { id: 'RG-13', officialItem: '첫 번째 방법은 훅이 돌려주는 객체에서 contextSafe를 꺼내는 것이며 훅 바깥에서 쓸 때 쓴다. const { contextSafe } = useGSAP({ scope: container }) 형태다.', source: 'react-use-gsap', origin: 'official', sectionId: 'context-safe' },
  { id: 'RG-14', officialItem: '두 번째 방법은 훅 콜백의 두 번째 인자로 받는 것이며 훅 안에서 쓸 때 쓴다. useGSAP((context, contextSafe) => { ... }) 형태다.', source: 'react-use-gsap', origin: 'official', sectionId: 'context-safe' },
  { id: 'RG-15', officialItem: 'context-safe 함수 안의 selector text도 Context의 scope를 사용한다.', source: 'react-use-gsap', origin: 'official', sectionId: 'context-safe' },
  { id: 'RG-16', officialItem: '공식 예제는 addEventListener로 붙인 핸들러를 훅에서 반환한 cleanup 함수에서 removeEventListener로 해제한다.', source: 'react-use-gsap', origin: 'official', sectionId: 'context-safe' },

  { id: 'RG-17', officialItem: 'client-side component에서 쓰는 한 Next 등 server-side rendering 환경에서 안전하다.', source: 'react-use-gsap', origin: 'official', sectionId: 'ssr' },
  { id: 'RG-18', officialItem: 'useIsomorphicLayoutEffect 기법을 구현해 React의 useLayoutEffect()를 우선 쓰되 window가 정의되지 않았으면 useEffect()로 대체한다.', source: 'react-use-gsap', origin: 'official', sectionId: 'ssr' },
  { id: 'RG-19', officialItem: 'app router나 react server components를 쓰면 useGSAP()이 동작하도록 파일 맨 위에 "use client"를 넣어야 한다.', source: 'react-use-gsap', origin: 'official', sectionId: 'ssr' },

  { id: 'RG-P1', officialItem: 'useGSAP은 함수이면서 register 속성을 가진 plugin 형태라 gsap.registerPlugin()이 받아들인다. 공식 자료는 예제에서 등록을 보여줄 뿐 필수라고 명시하지 않는다.', source: 'react-use-gsap', origin: 'implementation', sectionId: 'hook-basics' },
]
