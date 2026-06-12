import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { RegisterPluginExample } from './examples/RegisterPluginExample'
import registerPluginSource from './examples/RegisterPluginExample.tsx?raw'
import { ScopeExample } from './examples/ScopeExample'
import scopeSource from './examples/ScopeExample.tsx?raw'
import { ContextSafeExample } from './examples/ContextSafeExample'
import contextSafeSource from './examples/ContextSafeExample.tsx?raw'
import { DependenciesExample } from './examples/DependenciesExample'
import dependenciesSource from './examples/DependenciesExample.tsx?raw'

export function ReactIntegrationPage() {
  return (
    <LessonLayout
      title="React 통합"
      description="@gsap/react의 useGSAP()을 기준으로 플러그인 등록, scope, cleanup, contextSafe, dependencies를 React 컴포넌트 안에서 안전하게 쓰는 패턴을 다룬다."
    >
      <ExamplePanel
        title="gsap.registerPlugin()"
        description="GSAP 플러그인은 사용 전에 registerPlugin()으로 등록한다. React 프로젝트에서는 useGSAP도 앱 시작 시 한 번 등록해 두는 패턴이 기본이다."
        code={registerPluginSource}
      >
        <RegisterPluginExample />
      </ExamplePanel>
      <ExamplePanel
        title="scope와 자동 cleanup"
        description="scope를 넘기면 셀렉터 검색 범위가 컴포넌트 내부로 제한되고, useGSAP이 만든 애니메이션은 언마운트 때 정리된다."
        code={scopeSource}
      >
        <ScopeExample />
      </ExamplePanel>
      <ExamplePanel
        title="contextSafe"
        description="이벤트 핸들러처럼 useGSAP 콜백 밖에서 만드는 애니메이션은 contextSafe로 감싸야 같은 GSAP context에 묶여 cleanup된다."
        code={contextSafeSource}
      >
        <ContextSafeExample />
      </ExamplePanel>
      <ExamplePanel
        title="dependencies와 revertOnUpdate"
        description="React 상태에 따라 애니메이션을 다시 만들 때 dependencies를 넘긴다. revertOnUpdate는 새 실행 전에 이전 GSAP 상태를 되돌린다."
        code={dependenciesSource}
      >
        <DependenciesExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
