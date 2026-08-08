/** create 입력의 target 정규화와 array return을 하나의 생성 규칙으로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// create canonical의 모든 config 이름을 후속 상세 owner별로 압축해 보존한다
const configBoundaries = [
  { title: 'P03에서 직접 쓰는 생성 입력', items: 'type, dragClickables' },
  { title: 'pointer·native interaction 경계', items: 'activeCursor, allowContextMenu, allowEventDefault, allowNativeTouchScrolling, clickableTest, cursor, minimumMovement, trigger, zIndexBoost' },
  { title: 'P04–P05 spatial 경계', items: 'autoScroll, bounds, dragResistance, edgeResistance, force3D, liveSnap, lockAxis' },
  { title: 'P07 gesture callback 경계', items: 'callbackScope, onClick, onClickParams, onDrag, onDragParams, onDragEnd, onDragEndParams, onDragStart, onDragStartParams, onLockAxis, onMove, onPress, onPressInit, onPressParams, onRelease, onReleaseParams' },
  { title: 'P08 inertia 경계', items: 'inertia, snap, onThrowUpdate, onThrowComplete, throwResistance, maxDuration, minDuration, overshootTolerance' },
]

/** selector·element·array 입력이 같은 instance array로 이어짐을 설명한다. */
export function CreateSection() {
  return <section id="create" className="draggable-create-page__section" aria-labelledby="create-title"><SectionHeading number="02" id="create" title="create()는 입력을 넓게 받고 배열을 돌려준다" description="DOM element 하나만 만들더라도 반환값을 array로 받으면 selector와 여러 element 입력까지 같은 규칙으로 읽을 수 있습니다." /><pre className="draggable-create-page__code"><code>{`const cards = Draggable.create('.card', {
  type: 'x,y',
})

const firstCard = cards[0]`}</code></pre><div className="draggable-create-page__prose"><p><code>Draggable.create(target, vars)</code>의 target에는 DOM element, selector text, element array를 넣을 수 있습니다. 공식 example처럼 selector가 여러 element를 찾으면 target마다 한 instance가 만들어집니다.</p><p>그래서 반환값은 target이 하나인 경우에도 <code>Draggable[]</code>입니다. <code>const [draggable] = Draggable.create(...)</code>처럼 첫 instance를 꺼내면, “지금 이 target 하나만 만들었다”는 선택을 코드에 드러낼 수 있습니다.</p></div><div className="draggable-create-page__warning"><h3>Config Object 전체 목록과 깊이의 경계</h3><p>create canonical은 아래 모든 vars 이름을 제공하고 catalog는 각 항목의 공식 계약을 보존합니다. 이 페이지는 생성 input으로 type과 clickable child 정책만 실행하며, 나머지는 이후 owner가 동작·좌표·이벤트·momentum을 깊게 설명합니다.</p><ul className="draggable-create-page__config-boundaries">{configBoundaries.map((group) => <li key={group.title}><strong>{group.title}</strong><code>{group.items}</code></li>)}</ul></div></section>
}
