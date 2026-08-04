/** 훅을 가져오고 등록하는 법과 무엇이 자동으로 revert되는지를 공식 목록 그대로 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const setupCode = `import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)`

const basicExample = `const container = useRef()

useGSAP(() => {
  gsap.to('.box', { x: 360 })
}, { scope: container })`

// 공식 문서가 자동 revert 대상으로 명시한 네 가지
const revertedTypes = ['GSAP animation', 'ScrollTrigger', 'Draggable', 'SplitText instance']

export function HookBasicsSection() {
  return (
    <section id="hook-basics" className="react-gsap-page__section" aria-labelledby="hook-basics-title">
      <SectionHeading
        number="02"
        id="hook-basics"
        title="useGSAP()이 대신해 주는 것"
        description="가져오고, 등록하고, 훅 안에서 만들면 끝입니다. 무엇이 저절로 치워지는지는 공식이 명확히 나열해 두었습니다."
      />

      <div className="react-gsap-page__split">
        <div>
          <div className="react-gsap-page__subheading">
            <h3>가져오기와 등록</h3>
            <p>공식 예제가 함께 보여주는 두 줄입니다.</p>
          </div>
          <pre className="react-gsap-page__code">
            <code>{setupCode}</code>
          </pre>
        </div>
        <div>
          <div className="react-gsap-page__subheading">
            <h3>가장 단순한 형태</h3>
            <p>container ref를 만들고 훅 안에서 GSAP을 호출합니다.</p>
          </div>
          <pre className="react-gsap-page__code">
            <code>{basicExample}</code>
          </pre>
        </div>
      </div>

      <div className="react-gsap-page__note">
        <h3>무엇이 저절로 되돌려지나</h3>
        <p>
          공식 문장입니다. <strong>훅이 실행될 때 만들어진</strong> 아래 네 가지는 컴포넌트가 unmount되고 훅이 해제될 때{' '}
          <strong>자동으로 revert</strong>됩니다.
        </p>
      </div>

      <ul className="react-gsap-page__token-list">
        {revertedTypes.map((type) => (
          <li key={type}>
            <code>{type}</code>
          </li>
        ))}
      </ul>

      <p className="react-gsap-page__note">
        여기서 <strong>"훅이 실행될 때"</strong>라는 조건이 중요합니다. 훅 콜백이 도는 그 순간에 만들어진 것만 해당합니다. 나중에 버튼을
        눌러 만든 애니메이션은 포함되지 않습니다. 그 경우는 04단계에서 다룹니다.
      </p>

      <div className="react-gsap-page__note react-gsap-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          공식 자료는 예제에서 <code>gsap.registerPlugin(useGSAP)</code>을 보여줄 뿐 <strong>필수라고 명시하지는 않습니다.</strong>{' '}
          확인해 보니 <code>useGSAP</code>은 함수이면서 <code>register</code> 속성을 가진 plugin 형태라 <code>registerPlugin()</code>이
          받아들입니다.
        </p>
        <p className="react-gsap-page__provenance">
          이 항목은 공식 자료에 게시돼 있지 않습니다. GSAP 3.15.0과 @gsap/react 2.1.2 설치본에서 <code>typeof useGSAP</code>이{' '}
          <code>function</code>, <code>typeof useGSAP.register</code>가 <code>function</code>임을 확인했습니다. 이 학습 사이트도{' '}
          <code>src/main.tsx</code>에서 한 번 등록하고 있습니다.
        </p>
      </div>
    </section>
  )
}
