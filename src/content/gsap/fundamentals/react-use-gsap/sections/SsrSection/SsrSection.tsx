/** 서버 렌더링 환경에서 이 훅이 안전한 조건과 app router에서 필요한 한 줄을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const useClientCode = `'use client'

import { useGSAP } from '@gsap/react'
// ...`

export function SsrSection() {
  return (
    <section id="ssr" className="react-gsap-page__section" aria-labelledby="ssr-title">
      <SectionHeading
        number="05"
        id="ssr"
        title="서버에서 렌더링할 때"
        description="Next.js처럼 서버에서 HTML을 먼저 만드는 환경에서는 브라우저에만 있는 것을 건드리면 터집니다. 이 훅은 그 상황을 어떻게 다룰까요."
      />

      <div className="react-gsap-page__split">
        <div className="react-gsap-page__prose">
          <p>
            먼저 용어. <strong>서버 사이드 렌더링(SSR)</strong>은 브라우저가 아니라 서버에서 컴포넌트를 먼저 실행해 HTML을 만들어 보내는
            방식입니다. 이때 서버에는 <code>window</code>가 없습니다.
          </p>
          <p>
            공식 문서는 <strong>client-side component에서 쓰는 한 Next 등 SSR 환경에서 안전하다</strong>고 밝힙니다. 안전한 이유도
            적어 두었습니다. <strong><code>useIsomorphicLayoutEffect</code> 기법</strong>을 구현해서, React의{' '}
            <code>useLayoutEffect()</code>를 우선 쓰되 <strong><code>window</code>가 정의되지 않았으면 <code>useEffect()</code>로
            대체</strong>합니다.
          </p>
          <p>
            다만 조건이 하나 붙습니다. <strong>app router나 react server components를 쓰면</strong> 파일 맨 위에{' '}
            <code>"use client"</code>를 넣어야 <code>useGSAP()</code>이 동작합니다.
          </p>
        </div>
        <pre className="react-gsap-page__code">
          <code>{useClientCode}</code>
        </pre>
      </div>

      <div className="react-gsap-page__note">
        <p>
          이 학습 사이트는 Vite로 만든 순수 client-side 앱이라 <code>"use client"</code>가 필요 없습니다. 하지만 같은 코드를 Next.js
          app router로 옮긴다면 그 한 줄이 없어서 동작하지 않는 일이 흔합니다.
        </p>
      </div>
    </section>
  )
}
