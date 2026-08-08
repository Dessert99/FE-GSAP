/** descriptor에서 파생한 정적 setup code와 native-scroll 구조를 보여 준다. */
import { scrollSmootherCreationDescriptor } from '../../scroll-smoother-create.descriptor'
import './SmootherStructureDiagram.css'

// 전역 bootstrap과 component consumer의 ownership 차이를 코드로 보여 준다.
const smootherCreationCode = `import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// root owner가 ScrollTriggers보다 먼저 한 번만 생성합니다.
const smoother = ScrollSmoother.create({
  wrapper: '${scrollSmootherCreationDescriptor.wrapper}',
  content: '${scrollSmootherCreationDescriptor.content}',
  smooth: ${scrollSmootherCreationDescriptor.smooth},
  effects: ${scrollSmootherCreationDescriptor.effects},
})

// 다른 module은 새 instance 대신 이미 생성된 singleton을 읽습니다.
const sameSmoother = ScrollSmoother.get()
const content = smoother.content()
const wrapper = smoother.wrapper()
const mainScrollTrigger = smoother.scrollTrigger
const initialVars = smoother.vars

// root owner가 만든 instance만 unmount 때 정리합니다.
smoother.kill()`

/** body scrollbar와 wrapper/content가 맡는 서로 다른 역할을 연결한다. */
export function SmootherStructureDiagram() {
  return (
    <figure className="smoother-structure-diagram">
      <figcaption>
        body의 native scrollbar는 남고, ScrollTrigger가 그 위치를 읽어 content의
        변환을 따라가게 합니다.
      </figcaption>
      <ol>
        <li>
          <strong>body</strong>
          <span>
            실제 vertical scrollbar와 native scroll position을 유지합니다.
          </span>
        </li>
        <li>
          <strong>#smooth-wrapper</strong>
          <span>viewport 역할을 하는 가장 바깥 wrapper입니다.</span>
        </li>
        <li>
          <strong>#smooth-content</strong>
          <span>
            모든 page content를 담고 smoothing 중 transform이 적용됩니다.
          </span>
        </li>
        <li>
          <strong>main ScrollTrigger</strong>
          <span>
            <code>smoother.scrollTrigger</code>는 smoother가 내부에서 만든
            ScrollTrigger instance입니다.
          </span>
        </li>
      </ol>
      <pre>
        <code>{smootherCreationCode}</code>
      </pre>
      <p>
        <code>content()</code>와 <code>wrapper()</code>는 인수 없이 element를
        읽고, selector 또는 element를 넘기면 instance 자신을 돌려주는
        getter/setter 입니다. <code>vars</code>는 처음 <code>create()</code>에
        넘긴 object입니다.
      </p>
    </figure>
  )
}
