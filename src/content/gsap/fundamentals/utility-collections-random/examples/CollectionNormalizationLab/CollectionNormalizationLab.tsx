/** toArray()의 selector scope와 세 input 모양을 실제 DOM 후보로 관찰하는 패널이다. */
import type { CollectionInputMode } from './useCollectionNormalizationRuntime'
import { useCollectionNormalizationRuntime } from './useCollectionNormalizationRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './CollectionNormalizationLab.css'

// radio에 보일 input 모양과 GSAP 호출에서 맡는 역할이다
const modeOptions: { value: CollectionInputMode; label: string }[] = [
  { value: 'selector', label: 'selector + scope' },
  { value: 'array-like', label: 'NodeList (array-like)' },
  { value: 'single', label: 'element 하나' },
]

/** 현재 input 형태가 어떤 후보를 Array로 만들었는지 보여준다. */
export function CollectionNormalizationLab() {
  // runtime이 만든 scope·input 선택·GSAP 결과 snapshot만 화면에 연결한다
  const { scope, mode, setMode, snapshot, inspect } = useCollectionNormalizationRuntime()

  return (
    <section className="collection-normalization-lab" aria-labelledby="collection-normalization-lab-title">
      <h3 id="collection-normalization-lab-title">같은 후보를 세 가지 input으로 넣어 보기</h3>
      <p className="collection-normalization-lab__goal">radio를 바꾸면 runtime이 실제 <code>toArray()</code> 호출을 다시 합니다. selector 모드에서는 아래 회색 decoy가 아니라 scope 안의 세 후보만 반환되는지 보세요.</p>
      <div className="collection-normalization-lab__decoy collection-normalization-lab__candidate" data-label="바깥 decoy">바깥 decoy · 같은 className</div>
      <div className="collection-normalization-lab__workspace" ref={scope}>
        <div className="collection-normalization-lab__candidate" data-label="봄">봄</div>
        <div className="collection-normalization-lab__candidate" data-label="여름">여름</div>
        <div className="collection-normalization-lab__candidate" data-label="가을">가을</div>
      </div>
      <fieldset className="collection-normalization-lab__controls"><legend>toArray()에 넣을 input</legend>{modeOptions.map((option) => <label key={option.value} htmlFor={`collection-input-${option.value}`}><input id={`collection-input-${option.value}`} type="radio" name="collection-input" checked={mode === option.value} onChange={() => setMode(option.value)} />{option.label}</label>)}<button type="button" onClick={inspect}>같은 input 다시 읽기</button></fieldset>
      <pre className="collection-normalization-lab__code"><code>{snapshot?.code ?? 'DOM을 준비하는 중입니다.'}</code></pre>
      <div className="collection-normalization-lab__result"><p><strong>반환 Array</strong> · [{snapshot?.labels.map((label) => `'${label}'`).join(', ') ?? ''}]</p><p>{snapshot?.scopeDescription}</p></div>
      <div className="collection-normalization-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>세 input은 서로 다른 모양이지만 출력은 모두 Array입니다. single 모드에서는 첫 후보 하나만 Array의 한 칸이 됩니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>selector + scope를 고르면 바깥 decoy는 결과에 없습니다. scope가 document 전체 검색을 local descendant 검색으로 좁혔기 때문입니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p><code>scope</code>는 selector text에서만 유용합니다. NodeList나 element를 이미 넘겼다면 무엇을 검색할지 정해져 있어 scope를 더할 일이 없습니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>component 안의 card, ref로 얻은 element, selector 목록을 한 번에 Tween target 후보로 정리할 때 씁니다.</p></article></div>
      <p className="collection-normalization-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/utility-collections-random/examples/CollectionNormalizationLab/useCollectionNormalizationRuntime.ts" /></p>
    </section>
  )
}
