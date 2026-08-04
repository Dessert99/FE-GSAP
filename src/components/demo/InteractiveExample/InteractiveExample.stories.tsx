/** InteractiveExample에서 조절값과 코드가 함께 바뀌는 기본 흐름을 확인한다. */
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { InteractiveExample } from './InteractiveExample'

function ExampleStory() {
  const [x, setX] = useState(160)

  return (
    <InteractiveExample
      title="x 목표값"
      description="슬라이더 값과 코드가 함께 바뀌는 학습 예제 프레임입니다."
      sourcePath="src/content/gsap/fundamentals/gsap-to/examples/DestinationValuesExample/DestinationValuesExample.tsx"
      controls={
        <div className="interactive-example__control-list">
          <label className="interactive-example__control">
            <span className="interactive-example__control-heading">
              <span>x</span>
              <output>{x}px</output>
            </span>
            <input type="range" min="40" max="240" value={x} onChange={(event) => setX(Number(event.target.value))} />
          </label>
        </div>
      }
      preview={<div style={{ width: 54, height: 54, borderRadius: 12, background: 'var(--color-accent)' }} />}
      code={`gsap.to('.box', { x: ${x} })`}
      propertyDetails={[
        { name: 'x', type: 'number | string', defaultValue: '현재 transform 값', acceptedValues: '숫자는 px, 문자열은 px·%·상대값' },
      ]}
      changes={[`x의 목표값이 ${x}px로 변경됩니다.`]}
      watchFor={['시작점은 유지되고 도착점만 달라지는지 확인합니다.']}
      explanation={<p>gsap.to()는 현재 값을 읽고 지정한 목표값까지 보간합니다.</p>}
      onReplay={() => undefined}
    />
  )
}

const meta = {
  title: 'Components/Demo/InteractiveExample',
  component: ExampleStory,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ExampleStory>

/** InteractiveExample 스토리를 데모 컴포넌트 분류에 등록한다. */
export default meta
type Story = StoryObj<typeof meta>

/** 조절값과 표시 코드가 함께 바뀌는 기본 프레임을 보여준다. */
export const Default: Story = {}
