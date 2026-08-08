/** one command descriptor가 owned Observer lifecycle을 actual method로 전이한다. */
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { useEffect, useRef, useState } from 'react'

/** lifecycle control이 허용하는 actual Observer command를 제한한다. */
export type LifecycleCommand = 'disable' | 'enable' | 'kill' | 'recreate'
// lifecycle methods가 실제 Observer instance를 사용하도록 plugin을 등록한다.
gsap.registerPlugin(Observer)

/** killed instance를 re-enable하지 않고 explicit recreate하는 lifecycle state machine이다. */
export function useObserverLifecycleRuntime() {
  // observer가 listen할 stable pad element다.
  const targetRef = useRef<HTMLDivElement>(null)
  // cleanup이 page-owned instances만 kill하도록 목록을 보관한다.
  const ownedRef = useRef<Observer[]>([])
  // current observer는 kill 뒤 null로 만들어 re-enable transition을 막는다.
  const currentRef = useRef<Observer | null>(null)
  // command descriptor가 actual method와 code text를 함께 결정한다.
  const [command, setCommand] = useState<LifecycleCommand>('disable')
  // instance lifecycle을 explicit UI state로 전달한다.
  const [state, setState] = useState<'enabled' | 'disabled' | 'killed'>(
    'enabled',
  )
  // UI가 derived state가 아닌 Observer의 실제 isEnabled 값을 표시한다.
  const [isEnabled, setIsEnabled] = useState(true)
  // 새 instance를 만들기 전에 이전 page-owned instance의 listener를 정리한다.
  const createOwned = () => {
    // recreate는 이전 instance를 dispose한 뒤에만 새 instance를 만든다.
    currentRef.current?.kill()
    // Observer.create가 listen할 React-owned pad를 읽는다.
    const target = targetRef.current
    if (!target) return
    // stable pad에서 pointer listener를 실제로 생성한다.
    const observer = Observer.create({
      target,
      type: 'pointer',
      id: 'p28-owned-observer',
    })
    // unmount 때 모든 page-owned instance를 kill할 목록에 추가한다.
    ownedRef.current.push(observer)
    // 현재 instance만 lifecycle command가 조작하도록 보관한다.
    currentRef.current = observer
    // 생성 직후 Observer가 보고하는 enabled 값을 UI로 복사한다.
    setIsEnabled(observer.isEnabled)
    // isEnabled 값에 맞는 시작 lifecycle label을 표시한다.
    setState(observer.isEnabled ? 'enabled' : 'disabled')
  }
  // mount에서 하나를 만들고 unmount에서 이 페이지가 만든 instance만 정리한다.
  useEffect(() => {
    createOwned()
    // 모든 owned instance를 kill해 listener와 registry entry를 남기지 않는다.
    return () => ownedRef.current.forEach((observer) => observer.kill())
  }, [])
  // descriptor command를 현재 instance의 공식 lifecycle method에 연결한다.
  const runCommand = () => {
    // recreate와 method call이 같은 current instance를 공유하게 읽는다.
    const observer = currentRef.current
    // recreate는 killed instance를 되살리지 않고 새 instance를 만든다.
    if (command === 'recreate') return createOwned()
    // kill 뒤에는 재활성화할 instance가 없으므로 명령을 멈춘다.
    if (!observer || state === 'killed') return
    // disable은 listener를 떼고 instance는 보존한다.
    if (command === 'disable') observer.disable()
    // enable은 disabled instance의 listener를 다시 붙인다.
    if (command === 'enable') observer.enable()
    // kill은 permanent disposal이므로 current ref를 비운다.
    if (command === 'kill') {
      observer.kill()
      currentRef.current = null
    }
    // method 뒤 Observer가 보고하는 isEnabled 값을 그대로 표시한다.
    setIsEnabled(command === 'kill' ? false : observer.isEnabled)
    // kill과 enable/disable의 상태 차이를 UI에서 명시한다.
    setState(
      command === 'kill'
        ? 'killed'
        : observer.isEnabled
          ? 'enabled'
          : 'disabled',
    )
  }
  // lab가 DOM target, descriptor, actual state, command handler를 함께 받는다.
  return { targetRef, command, setCommand, state, isEnabled, runCommand }
}
