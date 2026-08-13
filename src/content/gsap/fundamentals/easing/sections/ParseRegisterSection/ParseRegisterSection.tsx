/** ease 문자열 parsing과 사용자 함수 이름 등록을 입력·출력 기준으로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ParseEaseExample } from '../../examples/ParseEaseExample/ParseEaseExample'
import { registeredEaseDescriptor } from '../../examples/ParseEaseExample/useParseEaseRuntime'

export function ParseRegisterSection() {
  // 표시 코드는 실제 registerEase에 전달한 동일 function의 source를 읽는다.
  const registeredFunctionSource = registeredEaseDescriptor.easingFunction.toString()

  return (
    <section className="easing-page__section" aria-labelledby="easing-parse">
      <SectionHeading number="03" id="easing-parse" title="문자열을 함수로 읽고 함수에 이름을 붙입니다" description="parseEase는 문자열에 해당하는 함수를 반환하고, registerEase는 함수를 이름으로 다시 찾을 수 있게 등록합니다." />
      <div className="easing-page__comparison">
        <article><h3><code>gsap.parseEase()</code></h3><p><code>'power1'</code>, <code>'steps(5)'</code>, <code>'elastic(1.2, 0.5)'</code>를 easing function으로 바꿔 원하는 progress를 직접 계산합니다.</p></article>
        <article><h3><code>gsap.registerEase()</code></h3><p><code>{registeredFunctionSource}</code> 같은 함수를 <code>{registeredEaseDescriptor.name}</code>이라는 이름으로 등록하면 모든 Tween에서 <code>ease: '{registeredEaseDescriptor.name}'</code>로 씁니다.</p></article>
      </div>
      <ParseEaseExample />
      <pre><code>{`const ${registeredEaseDescriptor.name} = ${registeredFunctionSource}
gsap.registerEase('${registeredEaseDescriptor.name}', ${registeredEaseDescriptor.name})
gsap.to('.box', { x: 160, ease: '${registeredEaseDescriptor.name}' })`}</code></pre>
      <p className="easing-page__boundary">CustomEase가 load·register된 경우 네 숫자의 cubic-bezier 문자열도 parse할 수 있습니다. 서로 다른 두 ease를 섞어야 한다면 공식 <a href="https://gsap.com/docs/v3/HelperFunctions/helpers/blendEases/">blendEases helper</a>에서 이어서 확인하세요.</p>
    </section>
  )
}
