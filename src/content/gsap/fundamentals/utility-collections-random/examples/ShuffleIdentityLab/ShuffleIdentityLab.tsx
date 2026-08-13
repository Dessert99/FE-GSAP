/** shuffle()의 in-place mutation과 동일 Array identity를 실제 반환값으로 보여주는 패널이다. */
import { useShuffleIdentityRuntime } from './useShuffleIdentityRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './ShuffleIdentityLab.css'

/** shuffle 전후 순서와 반환 참조 비교를 한 번에 보여준다. */
export function ShuffleIdentityLab() {
  // runtime이 보관한 같은 Array의 before·after snapshot과 action만 화면에 연결한다
  const { snapshot, shuffle, reset } = useShuffleIdentityRuntime()
  // runtime이 실행한 정확한 target 이름과 === 관찰값을 코드 문법으로만 표시한다
  const code = `const items = [${snapshot.before.map((item) => `'${item}'`).join(', ')}]\nconst returned = gsap.utils.shuffle(items)\n\nreturned === items // ${snapshot.sameIdentity}\nitems // [${snapshot.after.map((item) => `'${item}'`).join(', ')}]`

  return (
    <section className="shuffle-identity-lab" aria-labelledby="shuffle-identity-lab-title">
      <h3 id="shuffle-identity-lab-title">반환값이 원본 Array와 같은지 확인하기</h3><p className="shuffle-identity-lab__goal">섞기를 누르면 runtime이 Array 하나를 <code>shuffle()</code>에 전달합니다. 순서와 <code>===</code> badge를 함께 보세요.</p>
      <div className="shuffle-identity-lab__orders"><div><h4>호출 전 복사 snapshot</h4><ol>{snapshot.before.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ol></div><div><h4>같은 Array의 현재 순서</h4><ol>{snapshot.after.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ol></div></div>
      <div className="shuffle-identity-lab__actions"><button type="button" onClick={shuffle}>같은 Array 섞기</button><button type="button" onClick={reset}>처음 순서로 되돌리기</button><output aria-label="shuffle 반환 identity">returned === items · <strong>{String(snapshot.sameIdentity)}</strong></output></div>
      <pre className="shuffle-identity-lab__code"><code>{code}</code></pre>
      <div className="shuffle-identity-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>오른쪽 현재 순서가 바뀝니다. 왼쪽은 호출 직전의 표시용 snapshot이므로, mutation 때문에 함께 바뀌지 않습니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>순서가 달라도 badge는 <code>true</code>입니다. 반환값과 전달값이 같은 Array reference라는 실제 <code>===</code> 비교입니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p>공식 문서는 새 Array를 만들지 않고 target을 in place로 섞는다고 명시합니다. 3.15.0 probe도 그 반환 identity를 확인했습니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>재생 순서처럼 원래 Array를 바꿔도 되는 local data에는 직접 쓸 수 있습니다. state 원본을 보존해야 하면 먼저 복사본을 만드세요.</p></article></div>
      <p className="shuffle-identity-lab__source">실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/utility-collections-random/examples/ShuffleIdentityLab/useShuffleIdentityRuntime.ts" /></p>
    </section>
  )
}
