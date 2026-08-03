/** 공식 ease 문자열을 function으로 parse한 결과를 고정 sample 표로 보여준다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import './ParseEaseExample.css'
import { useParseEaseRuntime } from './useParseEaseRuntime'
import type { ParseExpression } from './useParseEaseRuntime'

// select와 runtime type이 공유하는 공식 parseEase preset이다.
const expressions: ParseExpression[] = ['power1', 'steps(5)', 'elastic(1.2, 0.5)']

export function ParseEaseExample() {
  // 문자열·function sample·replay가 공유하는 runtime 계산 결과다.
  const { expression, setExpression, sampleProgresses, samples, replay } = useParseEaseRuntime()
  // runtime이 실제 계산에 넣는 progress 배열을 표시 코드로 직렬화한다.
  const progressSource = sampleProgresses.join(', ')
  // 실제 parseEase 입력과 sample 계산을 코드 문법으로만 직렬화한다.
  const code = `const ease = gsap.parseEase('${expression}')
const values = [${progressSource}].map((progress) => ({
  progress,
  value: ease(progress)
}))`

  return (
    <InteractiveExample
      title="ease 문자열을 function으로 읽기"
      description="같은 다섯 progress를 넣어 family 이름·설정 문자열·steps 문자열이 어떤 value를 반환하는지 비교합니다."
      sourcePath="src/content/gsap/fundamentals/easing/examples/ParseEaseExample/useParseEaseRuntime.ts"
      controls={
        <label className="interactive-example__control">
          <span className="interactive-example__control-heading"><span>parse할 문자열</span></span>
          <select value={expression} onChange={(event) => setExpression(event.target.value as ParseExpression)}>
            {expressions.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
      }
      preview={
        <div className="parse-ease-example">
          <p><code>gsap.parseEase('{expression}')</code></p>
          <table><thead><tr><th scope="col">progress</th><th scope="col">returned value</th></tr></thead><tbody>{samples.map((sample) => <tr key={sample.progress}><td>{sample.progress.toFixed(2)}</td><td>{sample.value.toFixed(3)}</td></tr>)}</tbody></table>
        </div>
      }
      code={code}
      propertyDetails={[
        { name: 'parseEase()', type: '(ease: string) => EaseFunction', defaultValue: '없음', acceptedValues: '등록된 ease 이름과 공식 설정 문자열' },
        { name: 'EaseFunction', type: '(progress: number) => number', defaultValue: '없음', acceptedValues: '일반적으로 progress·value는 0~1이며 overshoot 가능' },
      ]}
      changes={[
        `${expression} 문자열이 호출 가능한 easing function으로 바뀝니다.`,
        '문자열 형식이 달라져도 반환 function은 같은 progress 입력 계약으로 비교할 수 있습니다.',
      ]}
      watchFor={[
        'steps(5)는 sample 사이 값이 부드럽게 이어지지 않고 정해진 계단 값으로 바뀝니다.',
        'elastic 설정 문자열은 1을 넘는 value를 반환할 수 있습니다.',
      ]}
      explanation={<p><code>gsap.parseEase()</code>는 Tween 밖에서도 동일한 easing 계산을 재사용하게 합니다. 이름과 괄호 안 설정을 GSAP이 해석하므로 직접 easing 공식을 복제할 필요가 없습니다.</p>}
      onReplay={replay}
    />
  )
}
