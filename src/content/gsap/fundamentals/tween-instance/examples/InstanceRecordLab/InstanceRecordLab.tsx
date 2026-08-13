/** id와 data가 instance의 어느 자리에 남는지를 조작·읽기·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { DataChoice } from './useInstanceRecordRuntime'
import { useInstanceRecordRuntime } from './useInstanceRecordRuntime'
import './InstanceRecordLab.css'

// radio에 노출할 data 값 종류와 읽기 쉬운 이름이다
const dataOptions: { value: DataChoice; label: string }[] = [
  { value: 'none', label: 'data를 적지 않음' },
  { value: 'string', label: "문자열 'step-2'" },
  { value: 'object', label: '객체 { step: 2 }' },
]

export function InstanceRecordLab() {
  // runtime이 소유한 controls·descriptor·읽기 결과를 그대로 받아 화면에만 쓴다
  const { scope, id, setId, dataChoice, setDataChoice, descriptor, readings, status, overwriteData } =
    useInstanceRecordRuntime()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const tween = gsap.to({ v: 0 }, {
  v: 1,
  duration: 0.6,
  paused: true,
  id: ${descriptor.idLiteral},${descriptor.dataChoice === 'none' ? '' : `\n  data: ${descriptor.dataLiteral},`}
})

// 재생하지 않고 곧바로 물어봅니다.
tween.vars.id
'id' in tween
gsap.getById(${descriptor.idLiteral}) === tween
tween.data
'data' in tween
tween.vars.data
'scrollTrigger' in tween

// 버튼을 누르면 이 대입을 실행한 뒤 같은 식을 다시 읽습니다.
tween.data = '나중에 넣은 값'`

  return (
    <section className="instance-record-lab" aria-labelledby="instance-record-lab-title">
      <h3 id="instance-record-lab-title">id와 data는 어디에 남나</h3>
      <p className="instance-record-lab__goal">
        이 예제는 <strong>화면을 전혀 움직이지 않습니다.</strong> <code>paused: true</code>로 만든 Tween 하나에 무엇이 기록됐는지 읽기만
        합니다. 값을 바꾸면 아래 표의 결과가 어떻게 달라지는지 보세요.
      </p>

      <div className="instance-record-lab__body" ref={scope}>
        <div className="instance-record-lab__table-wrap">
          <table className="instance-record-lab__table">
            <caption>지금 이 instance에서 각 식을 그대로 읽은 결과</caption>
            <thead>
              <tr>
                <th scope="col">읽은 식</th>
                <th scope="col">결과</th>
                <th scope="col">무엇을 뜻하나</th>
              </tr>
            </thead>
            <tbody>
              {readings.map((reading) => (
                <tr key={reading.expression}>
                  <th scope="row">
                    <code>{reading.expression}</code>
                  </th>
                  <td>{reading.result}</td>
                  <td>{reading.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <fieldset className="instance-record-lab__controls">
          <legend>vars에 적을 값</legend>

          <label htmlFor="instance-record-id">id</label>
          <input
            id="instance-record-id"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
            autoComplete="off"
            spellCheck={false}
          />

          <div className="instance-record-lab__radio-group" role="radiogroup" aria-labelledby="instance-record-data-label">
            <p id="instance-record-data-label">data</p>
            {dataOptions.map((option) => (
              <label key={option.value} htmlFor={`instance-record-data-${option.value}`}>
                <input
                  id={`instance-record-data-${option.value}`}
                  type="radio"
                  name="instance-record-data"
                  value={option.value}
                  checked={dataChoice === option.value}
                  onChange={() => setDataChoice(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <button type="button" onClick={overwriteData}>
            만든 뒤에 tween.data 덮어쓰기
          </button>
        </fieldset>
      </div>

      <p className="instance-record-lab__status" role="status">
        {status}
      </p>

      <pre className="instance-record-lab__code">
        <code>{code}</code>
      </pre>

      <div className="instance-record-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <code>id</code> 입력칸을 고치면 <code>tween.vars.id</code> 줄과 <code>gsap.getById(...)</code> 줄이 함께 바뀝니다.{' '}
            <code>data</code>를 <strong>적지 않음</strong>으로 바꾸면 <code>tween.data</code>는 <code>undefined</code>가 되지만{' '}
            <code>&apos;data&apos; in tween</code>은 여전히 <code>true</code>입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            두 값이 <strong>서로 다른 자리에 산다는 것</strong>입니다. <code>data</code>는 instance에 직접 붙고, <code>id</code>는{' '}
            <code>vars</code> 안에만 남습니다. 그래서 <code>&apos;id&apos; in tween</code>은 <code>false</code>입니다. 마지막 버튼을 눌러{' '}
            <code>tween.data</code>만 바꾸면 <code>tween.vars.data</code>는 그대로인 것도 확인하세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 <code>data</code> 문서는 이 자리를 <strong>"원하는 어떤 데이터든 저장하는 곳(초기값은 vars.data가 있으면 그 값)"</strong>
            이라고 정의합니다. 생성 뒤 <code>tween.data</code>를 새 값으로 다시 대입해도 <code>tween.vars.data</code>는 바뀌지 않습니다.
            다만 객체를 넣으면 최초에는 같은 객체 참조를 가리키므로 깊은 복사가 일어나는 것은 아닙니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            <code>data</code>는 애니메이션과 함께 메타데이터를 보관하고 나중에 <code>tween.data</code>로 확인할 때 씁니다. <code>id</code>는
            화면 어딘가에서 만든 애니메이션을 변수 참조 없이 다시 찾아야 할 때, 그리고 GSDevTools에서 이름으로 골라 볼 때 씁니다.
          </p>
        </article>
      </div>

      <p className="instance-record-lab__source">
        실행 코드 위치 · <code>examples/InstanceRecordLab/useInstanceRecordRuntime.ts</code>
      </p>
    </section>
  )
}
