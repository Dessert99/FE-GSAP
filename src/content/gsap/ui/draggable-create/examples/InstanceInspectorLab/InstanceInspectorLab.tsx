/** 한 draggable card의 create input과 instance inspector를 같은 descriptor에서 보여 준다. */
import { draggableCreateProperties } from '../../draggable-create.properties'
import type { DraggableType } from './useInstanceInspectorAnimation'
import { useInstanceInspectorAnimation } from './useInstanceInspectorAnimation'
import './InstanceInspectorLab.css'

// selector에서 제공할 공식 type 문자열과 한국어 관찰 이름이다
const dragTypes: { value: DraggableType; label: string }[] = [
  { value: 'x,y', label: 'x,y · 두 transform 축' },
  { value: 'top,left', label: 'top,left · 위치 속성' },
  { value: 'left,top', label: 'left,top · Config Object 표기' },
  { value: 'rotation', label: 'rotation · 회전' },
  { value: 'x', label: 'x · 가로 transform' },
  { value: 'y', label: 'y · 세로 transform' },
  { value: 'top', label: 'top · 세로 위치' },
  { value: 'left', label: 'left · 가로 위치' },
]

/** type을 바꿔도 create·get·target·vars 관계가 유지됨을 관찰하는 lab이다. */
export function InstanceInspectorLab() {
  // runtime이 만든 descriptor와 snapshot을 화면과 serializer가 그대로 소비한다
  const { scope, targetRef, type, setType, descriptor, snapshot, reset } = useInstanceInspectorAnimation()
  // 실제 create 입력만 문법으로 바꿔 code panel을 만든다
  const code = `gsap.registerPlugin(Draggable)

const [draggable] = Draggable.create('#instance-card', {
  type: '${descriptor.type}',
  dragClickables: ${descriptor.dragClickables},
})

const sameInstance = Draggable.get('#instance-card') === draggable`

  return (
    <section className="instance-inspector-lab" aria-labelledby="instance-inspector-title">
      <h3 id="instance-inspector-title">같은 card를 만들고 다시 찾으면 같은 instance일까?</h3>
      <p className="instance-inspector-lab__goal">type을 고른 뒤 card의 빈 공간을 drag하세요. 생성 입력, <code>get()</code> 결과, <code>target</code>과 <code>vars</code>가 한 번 만든 instance를 가리키는지 확인합니다.</p>
      <div className="instance-inspector-lab__body" ref={scope}>
        <div className="instance-inspector-lab__stage">
          <div ref={targetRef} id="instance-card" className="instance-inspector-lab__card" tabIndex={0} aria-describedby="instance-inspector-card-help">
            <strong>drag target</strong>
            <span>빈 공간을 끌어 보세요</span>
            <button type="button" onClick={() => undefined}>native button</button>
          </div>
          <p id="instance-inspector-card-help">card는 keyboard focus를 받고, 안의 button은 <code>dragClickables: false</code> 덕분에 click과 focus를 그대로 사용합니다.</p>
        </div>
        <div className="instance-inspector-lab__controls">
          <label htmlFor="draggable-type"><span>Draggable type</span><select id="draggable-type" value={type} onChange={(event) => setType(event.target.value as DraggableType)}>{dragTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          <button type="button" onClick={reset}>즉시 처음 위치로 reset</button>
          <p>reset은 animation을 만들지 않는 <code>gsap.set()</code>이므로 <code>prefers-reduced-motion</code>에서도 즉시 적용됩니다.</p>
        </div>
      </div>
      <dl className="instance-inspector-lab__snapshot">
        <div><dt>create() array</dt><dd>{snapshot.createdCount} instance</dd></div>
        <div><dt>get() identity</dt><dd>{snapshot.lookupMatches ? '같은 instance' : '확인 중'}</dd></div>
        <div><dt>target</dt><dd><code>{snapshot.target}</code></dd></div>
        <div><dt>vars.type</dt><dd><code>{snapshot.vars.type}</code></dd></div>
        <div><dt>vars.dragClickables</dt><dd><code>{String(snapshot.vars.dragClickables)}</code></dd></div>
      </dl>
      <pre className="instance-inspector-lab__code"><code>{code}</code></pre>
      <div className="instance-inspector-lab__panels"><article><h4>무엇이 달라졌나요?</h4><p>type을 바꾸면 이전 instance를 정리하고 같은 target에 새 instance를 만듭니다. inspector의 vars.type도 그 입력을 다시 읽습니다.</p></article><article><h4>무엇을 봐야 하나요?</h4><p>create()는 target 하나여도 배열을 반환합니다. get() identity가 “같은 instance”면 target 기반 lookup이 정확히 그 배열의 첫 instance를 찾은 것입니다.</p></article><article><h4>왜 이렇게 동작하나요?</h4><p>한 Draggable instance는 한 target만 책임집니다. selector나 array가 여러 target을 가리킬 수 있으므로 create()의 반환 모양은 항상 array입니다.</p></article><article><h4>실제로 언제 쓰나요?</h4><p>초기 설정을 만든 컴포넌트와 나중에 instance를 읽어야 하는 컴포넌트가 나뉠 때, 안정적인 target을 알고 있으면 get()으로 그 instance를 찾습니다.</p></article></div>
      <div className="instance-inspector-lab__table-wrap"><table><caption>이 lab이 실제로 소유하는 surface</caption><thead><tr><th scope="col">이름</th><th scope="col">타입</th><th scope="col">기본값</th><th scope="col">이 페이지에서</th></tr></thead><tbody>{draggableCreateProperties.map((property) => <tr key={property.name}><th scope="row"><code>{property.name}</code></th><td>{property.type}</td><td>{property.defaultValue}</td><td>{property.use}</td></tr>)}</tbody></table></div>
      <p className="instance-inspector-lab__source">실행 코드 위치 · <code>examples/InstanceInspectorLab/useInstanceInspectorAnimation.ts</code></p>
    </section>
  )
}
