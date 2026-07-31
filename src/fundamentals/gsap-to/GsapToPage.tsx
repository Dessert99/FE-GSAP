import { DemoPanel } from '../../components/demo/DemoPanel'
import { BasicMovementExample } from './examples/BasicMovementExample'
import { CardFeedbackExample } from './examples/CardFeedbackExample'
import { FunctionValueExample } from './examples/FunctionValueExample'
import { MultiplePropertiesExample } from './examples/MultiplePropertiesExample'
import { MultipleTargetsExample } from './examples/MultipleTargetsExample'
import { RelativeValueExample } from './examples/RelativeValueExample'
import './gsap-to.css'

export function GsapToPage() {
  return (
    <article className="gsap-to-page">
      <header className="gsap-to-page__header">
        <p className="gsap-to-page__eyebrow">FUNDAMENTALS · TWEEN</p>
        <h1>gsap.to()</h1>
        <p>
          요소의 현재 상태에서 목표값으로 움직이는 기본 tween입니다. 값의 형태를 먼저 분리해서 확인한 뒤,
          여러 타깃과 사용자 피드백에 적용합니다.
        </p>
      </header>

      <section className="fundamentals-section" aria-labelledby="api-items-title">
        <div className="fundamentals-section__heading">
          <span>01</span>
          <div>
            <h2 id="api-items-title">공식 API 항목</h2>
            <p>같은 to() 호출에서도 목표값을 표현하는 방식에 따라 결과가 어떻게 달라지는지 비교합니다.</p>
          </div>
        </div>

        <div className="fundamentals-section__examples">
          <DemoPanel
            title="기본 이동"
            description="현재 위치에서 하나의 목표값으로 이동하는 가장 기본적인 tween 흐름을 확인합니다."
          >
            <BasicMovementExample />
          </DemoPanel>
          <DemoPanel
            title="여러 속성"
            description="이동과 회전, 크기, 모양 변화를 하나의 tween으로 묶어 같은 시간축에서 실행합니다."
          >
            <MultiplePropertiesExample />
          </DemoPanel>
          <DemoPanel
            title="상대값"
            description="고정된 목적지 대신 현재 값에 거리를 더해 시작 상태가 달라도 같은 양만큼 움직입니다."
          >
            <RelativeValueExample />
          </DemoPanel>
          <DemoPanel
            title="함수 기반 값"
            description="타깃 인덱스로 각 요소의 목적지를 계산해 하나의 설정에서 서로 다른 결과를 만듭니다."
          >
            <FunctionValueExample />
          </DemoPanel>
        </div>
      </section>

      <section className="fundamentals-section" aria-labelledby="situation-examples-title">
        <div className="fundamentals-section__heading">
          <span>02</span>
          <div>
            <h2 id="situation-examples-title">상황별 예제</h2>
            <p>기본 문법을 실제 인터페이스에서 자주 필요한 그룹 모션과 상태 피드백에 연결합니다.</p>
          </div>
        </div>

        <div className="fundamentals-section__examples">
          <DemoPanel
            title="여러 타깃"
            description="여러 요소에 같은 변화와 시작 간격을 적용해 순차적인 그룹 모션을 만듭니다."
          >
            <MultipleTargetsExample />
          </DemoPanel>
          <DemoPanel
            title="카드 상태 피드백"
            description="사용자 입력 뒤에 눌림과 완료 상태를 이어 붙여 즉각적인 인터랙션 피드백을 제공합니다."
          >
            <CardFeedbackExample />
          </DemoPanel>
        </div>
      </section>
    </article>
  )
}
