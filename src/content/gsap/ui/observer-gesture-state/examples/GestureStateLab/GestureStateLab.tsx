/** keyboard simulation과 Observer callback snapshot을 표시한다. */
import {
  gestureDescriptor,
  useGestureStateRuntime,
} from './useGestureStateRuntime'
import './GestureStateLab.css'

/** 하나의 target에서 pressed와 dragging을 차례로 관찰한다. */
export function GestureStateLab() {
  // runtime이 만든 stable target ref와 discrete snapshot을 받는다
  const { scope, targetRef, state, simulate } = useGestureStateRuntime()
  // 실제 Observer vars와 callback에서 읽는 상태를 실행 가능한 code panel로 직렬화한다
  const code = `import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(Observer)

const setup = () => {
  const target = document.querySelector('.gesture-state-lab__target')
  if (!target) throw new Error('gesture target이 필요합니다.')

  const publishState = (self, phase) => {
    console.log({
      phase,
      isPressed: self.isPressed,
      isDragging: self.isDragging,
    })
  }
  const observer = Observer.create({
    target,
    type: '${gestureDescriptor.type}',
    dragMinimum: ${gestureDescriptor.dragMinimum},
    onPress: (self) => publishState(self, 'pressed'),
    onDrag: (self) => publishState(self, 'dragging'),
    onRelease: (self) => publishState(self, 'released'),
  })
  return () => observer.kill()
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`

  return (
    <section
      className="gesture-state-lab"
      aria-labelledby="gesture-state-lab-title"
    >
      <h2 id="gesture-state-lab-title">press → drag → release</h2>
      <p>
        목표: press는 눌린 상태만, drag는 dragMinimum을 넘은 뒤의 상태까지 보여
        준다는 점을 확인합니다.
      </p>
      <div ref={scope}>
        <button
          ref={targetRef}
          type="button"
          className="gesture-state-lab__target"
        >
          gesture target
        </button>
      </div>
      <div
        className="gesture-state-lab__controls"
        aria-label="gesture simulation"
      >
        <button type="button" onClick={() => simulate('press')}>
          1. press
        </button>
        <button type="button" onClick={() => simulate('drag')}>
          2. drag {gestureDescriptor.dragMinimum + 4}px
        </button>
        <button type="button" onClick={() => simulate('release')}>
          3. release
        </button>
      </div>
      <p role="status">phase: {state.phase}</p>
      <dl>
        <div>
          <dt>isPressed</dt>
          <dd>{String(state.pressed)}</dd>
        </div>
        <div>
          <dt>isDragging</dt>
          <dd>{String(state.dragging)}</dd>
        </div>
      </dl>
      <p>
        무엇이 달라졌나요? drag는 {gestureDescriptor.dragMinimum}px보다 큰 이동
        뒤에만 true입니다. 무엇을 봐야 하나요? release 뒤 두 값은 false입니다.
      </p>
      <p>
        왜 이렇게 동작하나요? Observer는 press 좌표와 현재 좌표를 비교해 drag
        threshold를 판단합니다. 실제 사용처에서는 click과 drag를 구분할 때 이
        순서를 사용합니다.
      </p>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  )
}
