/** one Observer descriptor로 input pad callbacks와 registry inspection을 실행한다. */
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
import { useEffect, useMemo, useRef, useState } from 'react'

// runtime descriptor가 create vars와 code serializer의 common configuration이다.
export type ObserverDescriptor = {
  id: string
  type: 'pointer,wheel'
  tolerance: number
  debounce: true
  preventDefault: true
  lockAxis: true
}

gsap.registerPlugin(Observer)

/** one owned Observer만 create/kill하고 registry state를 read한다. */
export function useObserverInputPadRuntime() {
  // Observer target이 되는 stable input pad element다.
  const padRef = useRef<HTMLDivElement>(null)
  // cleanup에서 only this page instance를 kill하기 위한 ref다.
  const observerRef = useRef<Observer | null>(null)
  // direction callbacks와 keyboard buttons의 discrete result만 status로 보관한다.
  const [direction, setDirection] = useState('input 대기')
  // continuous delta 숫자는 live region 없이 visual output으로만 표시한다.
  const [delta, setDelta] = useState({ x: 0, y: 0 })
  // actual getAll/getById result를 registry inspector에 보관한다.
  const [registry, setRegistry] = useState({
    count: 0,
    found: false,
    targetMatches: false,
    varsId: '',
  })
  // create vars와 code가 같은 literal values를 참조하도록 descriptor를 한 번 만든다.
  const descriptor = useMemo<ObserverDescriptor>(
    () => ({
      id: 'p25-owned-observer',
      type: 'pointer,wheel',
      tolerance: 24,
      debounce: true,
      preventDefault: true,
      lockAxis: true,
    }),
    []
  )

  useEffect(() => {
    // actual target element가 mount된 뒤 Observer plugin을 registered core에서 준비한다.
    const target = padRef.current
    if (!target) return
    // direction callback은 observer instance가 준 latest delta를 non-live display에 기록한다.
    const record = (nextDirection: string, self: Observer) => {
      setDirection(nextDirection)
      setDelta({ x: self.deltaX, y: self.deltaY })
    }
    // one descriptor가 target/options/callbacks를 모두 supplied create call에 전달한다.
    const observer = Observer.create({
      target,
      id: descriptor.id,
      type: descriptor.type,
      tolerance: descriptor.tolerance,
      debounce: descriptor.debounce,
      preventDefault: descriptor.preventDefault,
      lockAxis: descriptor.lockAxis,
      onUp: (self) => record('up', self),
      onDown: (self) => record('down', self),
      onLeft: (self) => record('left', self),
      onRight: (self) => record('right', self),
      onLockAxis: (self) => record(`axis ${self.axis || 'pending'}`, self),
    })
    observerRef.current = observer
    // registry calls inspect the created instance without killing unrelated observers.
    const all = Observer.getAll()
    const found = Observer.getById(descriptor.id)
    setRegistry({
      count: all.length,
      found: found === observer,
      targetMatches: observer.target === target,
      varsId: String(observer.vars.id || ''),
    })

    return () => {
      // only the Observer instance this hook created is permanently removed on cleanup.
      observerRef.current?.kill()
      observerRef.current = null
    }
  }, [descriptor])

  // keyboard direction buttons provide a non-pointer way to practice callback vocabulary.
  const sendKeyboardDirection = (
    nextDirection: 'up' | 'down' | 'left' | 'right'
  ) => setDirection(`keyboard ${nextDirection}`)

  // display receives target ref, descriptor, discrete callbacks and registry evidence.
  return {
    padRef,
    descriptor,
    direction,
    delta,
    registry,
    sendKeyboardDirection,
  }
}
