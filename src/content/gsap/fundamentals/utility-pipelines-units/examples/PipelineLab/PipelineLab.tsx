/** 같은 pipe 호출에서 기록한 중간값을 조작·표·코드로 읽는 계산 lab이다. */
import { usePipelineLabRuntime } from './usePipelineLabRuntime'
import './PipelineLab.css'

export function PipelineLab() {
  // runtime이 소유한 입력과 한 번 실행 snapshot만 받아 화면을 조립한다
  const { rawValue, setRawValue, snapshot } = usePipelineLabRuntime()

  return (
    <section className="utility-lab" aria-labelledby="pipeline-lab-title">
      <div className="utility-lab__intro">
        <div>
          <p className="utility-lab__eyebrow">PIPELINE LAB</p>
          <h3 id="pipeline-lab-title">값 하나가 세 함수를 어떤 순서로 지나가나요?</h3>
          <p><code>pipe</code>는 함수를 바로 실행하지 않고 재사용 함수를 돌려줍니다. 입력을 바꾸고 각 행의 <strong>받은 값</strong>이 바로 윗행의 <strong>보낸 값</strong>과 같은지 확인하세요.</p>
        </div>
        <label htmlFor="pipeline-input">pipeline에 넣을 숫자
          <input id="pipeline-input" type="number" value={rawValue} onChange={(event) => setRawValue(event.target.value)} inputMode="decimal" />
          <small>{rawValue.trim() === '' ? '빈칸은 공식 예제 입력 25.874로 계산합니다.' : `실제 입력도 ${snapshot.input}입니다.`}</small>
        </label>
      </div>

      <ol className="pipeline-track" aria-label="pipe 중간값">
        <li><span>입력</span><strong>{snapshot.input}</strong></li>
        {snapshot.readings.map((reading) => (
          <li key={reading.name}><code>{reading.name}</code><span>{reading.input} →</span><strong>{reading.output}</strong></li>
        ))}
      </ol>

      <p className="utility-lab__status" role="status">현재 최종 출력은 {snapshot.output}입니다.</p>
      <pre className="utility-lab__code"><code>{snapshot.code}</code></pre>

      <div className="utility-lab__explanation">
        <article><h4>무엇이 달라졌나요?</h4><p>입력을 바꾸면 첫째 단계부터 다시 흐르지만 0보다 작은 값과 100보다 큰 값은 clamp에서 먼저 잘립니다.</p></article>
        <article><h4>무엇을 봐야 하나요?</h4><p>각 단계는 하나의 숫자를 받고 하나의 숫자를 돌려줍니다. 그래서 반환값을 별도 변수로 옮기지 않아도 다음 단계가 바로 받을 수 있습니다.</p></article>
        <article><h4>왜 이렇게 동작하나요?</h4><p>공식 설명대로 함수는 넘긴 순서로 호출됩니다. 순서를 바꾸면 계산의 뜻도 달라지므로, 입력 타입과 출력 타입뿐 아니라 단계 순서도 pipeline 계약입니다.</p></article>
        <article><h4>실제로 언제 쓰나요?</h4><p>포인터 비율을 화면 좌표나 각도로 바꾸고 허용 간격에 맞추는 것처럼, 같은 변환을 여러 입력에 반복할 때 재사용합니다.</p></article>
      </div>
      <p className="utility-lab__source">실행 코드 위치 · <code>examples/PipelineLab/usePipelineLabRuntime.ts</code></p>
    </section>
  )
}
