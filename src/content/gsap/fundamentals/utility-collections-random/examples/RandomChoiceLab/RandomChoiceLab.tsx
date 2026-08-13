/** random()의 세 overload와 즉시값·reusable function을 실행값으로 비교하는 패널이다. */
import type { RandomMode } from './useRandomChoiceRuntime'
import { useRandomChoiceRuntime } from './useRandomChoiceRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './RandomChoiceLab.css'

// radio에 표시할 overload와 반환 규칙의 요약이다
const randomOptions: { value: RandomMode; label: string }[] = [
  { value: 'range', label: '0~100 number' },
  { value: 'increment', label: '0~100, 10 단위' },
  { value: 'array', label: "['red', 'blue', 'green']" },
]

/** 선택한 overload가 실제로 반환한 값 또는 function 준비 상태를 보여준다. */
export function RandomChoiceLab() {
  // runtime이 만든 실제 GSAP call snapshot과 세 action만 화면 control에 연결한다
  const { mode, setMode, snapshot, drawImmediately, createReusable, drawReusable } = useRandomChoiceRuntime()
  // runtime descriptor가 고정한 call을 코드 문법으로만 보여준다
  const code = snapshot?.returnFunction ? `const pick = ${snapshot.call}\n\n${snapshot.value === null ? '// pick()는 아직 호출하지 않았습니다.' : `const value = pick()\n\nvalue // ${snapshot.value}`}` : `const value = ${snapshot?.call ?? 'gsap.utils.random(0, 100, 10)'}\n\nvalue // ${snapshot?.value ?? '아직 실행하지 않음'}`

  return (
    <section className="random-choice-lab" aria-labelledby="random-choice-lab-title">
      <h3 id="random-choice-lab-title">반환값을 지금 받을지, 함수로 받을지 고르기</h3><p className="random-choice-lab__goal">overload를 고른 뒤 즉시 뽑기 또는 reusable function 만들기를 누르세요. 같은 화면 코드와 결과가 한 번의 GSAP 실행 snapshot에서 나옵니다.</p>
      <fieldset className="random-choice-lab__controls"><legend>random() input</legend><div className="random-choice-lab__radios">{randomOptions.map((option) => <label key={option.value} htmlFor={`random-mode-${option.value}`}><input id={`random-mode-${option.value}`} type="radio" name="random-mode" checked={mode === option.value} onChange={() => setMode(option.value)} />{option.label}</label>)}</div><div className="random-choice-lab__buttons"><button type="button" onClick={drawImmediately}>즉시 값 하나 뽑기</button><button type="button" onClick={createReusable}>reusable function 만들기</button><button type="button" onClick={drawReusable}>같은 function 호출하기</button></div></fieldset>
      <pre className="random-choice-lab__code"><code>{code}</code></pre>
      <output className="random-choice-lab__result" aria-label="마지막 random 결과">마지막 runtime 결과 · <strong>{snapshot?.value ?? (snapshot?.returnFunction ? 'function 준비됨 · 아직 호출하지 않음' : '아직 없음')}</strong></output>
      <div className="random-choice-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>즉시 mode는 random value를 바로 반환합니다. function mode는 먼저 function 하나를 받고, 이후 버튼이 같은 function을 호출할 때마다 한 값을 받습니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>increment mode의 출력은 10 단위입니다. Array mode의 출력은 후보 셋 중 하나이며, 결과 자체는 고정하지 않습니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p>마지막 <code>true</code>는 value 대신 original range 또는 original Array를 기억한 reusable function을 달라는 overload입니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>즉시값은 한 번 정할 위치나 색에, reusable function은 click·repeat·각 target의 function value처럼 호출 시점이 여러 개인 곳에 맞습니다.</p></article></div>
      <p className="random-choice-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/utility-collections-random/examples/RandomChoiceLab/useRandomChoiceRuntime.ts" /></p>
    </section>
  )
}
