/** 한 stable card의 First capture와 class layout mutation을 from/to 순서대로 실행한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

gsap.registerPlugin(Flip)

/** from과 to의 opposite animation direction을 고르는 control 값이다. */
export type FlipMode = 'from' | 'to'

// card의 실제 stage layout과 status label이 공유하는 두 위치다.
type CardLocation = 'left' | 'right'

/** React가 소유한 한 button node를 유지하면서 FLIP 순서만 비교하는 lab runtime이다. */
export function useFlipCardAnimation() {
  // useGSAP cleanup이 plugin timeline을 page-local DOM으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // First/Last geometry를 capture하는 하나의 stable button node다.
  const cardRef = useRef<HTMLButtonElement>(null)
  // direct class mutation으로 card의 visual lane을 바꾸는 stage다.
  const stageRef = useRef<HTMLDivElement>(null)
  // 새 action 전에 interrupted Flip을 끝내는 timeline reference다.
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // React rerender와 무관하게 stage의 실제 class layout을 기억한다.
  const locationRef = useRef<CardLocation>('left')
  // from과 to comparison을 하나만 고른다.
  const [mode, setMode] = useState<FlipMode>('from')
  // 실행을 설명하는 status와 diagram label을 실제 final layout으로 갱신한다.
  const [location, setLocation] = useState<CardLocation>('left')
  // user preference에서 layout transition duration을 결정한다.
  const reducedMotion = useReducedMotion()
  // capture/mutate/execute/code가 모두 소비하는 single mode descriptor다.
  const descriptor = {
    mode,
    method: mode === 'from' ? 'Flip.from' : 'Flip.to',
    duration: reducedMotion ? 0 : 0.7,
    ease: 'power1.inOut',
    props: 'backgroundColor',
    diagram:
      mode === 'from'
        ? [
            'First: current card layout을 getState로 capture',
            'Last: next lane class를 적용해 final layout 생성',
            'Invert/Play: Flip.from(state)로 First에서 Last까지 재생',
          ]
        : [
            'Destination: next lane class를 임시 적용하고 getState로 capture',
            'Restore: current lane class로 되돌린 뒤 Flip.to(state) 실행',
            'Commit: next lane class를 적용해 captured destination을 final로 확정',
          ],
  }

  // React tree를 바꾸지 않고 stable button의 visual lane만 직접 바꾼다.
  const applyLayout = (nextLocation: CardLocation) => {
    const stage = stageRef.current
    if (!stage) return
    stage.classList.toggle('flip-card-lab__stage--left', nextLocation === 'left')
    stage.classList.toggle('flip-card-lab__stage--right', nextLocation === 'right')
    locationRef.current = nextLocation
  }

  useGSAP(
    () => () => {
      timelineRef.current?.kill()
      if (cardRef.current) Flip.killFlipsOf(cardRef.current)
      applyLayout('left')
      timelineRef.current = null
    },
    { scope },
  )

  // selected mode의 truthful capture/mutation order로 same card node를 다음 lane에 정착시킨다.
  const runFlip = () => {
    const card = cardRef.current
    if (!card) return
    timelineRef.current?.kill()
    Flip.killFlipsOf(card)
    const currentLocation = locationRef.current
    const destination = currentLocation === 'left' ? 'right' : 'left'

    if (descriptor.mode === 'from') {
      // First layout을 capture한 뒤 final destination class를 적용한다.
      const state = Flip.getState(card, { props: descriptor.props })
      applyLayout(destination)
      // Flip.from은 captured First에서 current Last까지 inverse transform을 재생한다.
      timelineRef.current = Flip.from(state, {
        duration: descriptor.duration,
        ease: descriptor.ease,
      })
    } else {
      // Flip.to가 향할 destination layout을 temporary class mutation으로 capture한다.
      applyLayout(destination)
      const destinationState = Flip.getState(card, { props: descriptor.props })
      // capture 뒤 current layout으로 복구해 Flip.to의 visual start를 만든다.
      applyLayout(currentLocation)
      // Flip.to가 captured destination으로 이동할 transform을 만든다.
      timelineRef.current = Flip.to(destinationState, {
        duration: descriptor.duration,
        ease: descriptor.ease,
      })
      // timeline 생성 뒤 destination class를 commit해 final DOM layout을 truthfully 보존한다.
      applyLayout(destination)
    }

    setLocation(destination)
  }

  // display layer에는 runtime descriptor·refs·actions만 돌려준다.
  return {
    scope,
    cardRef,
    stageRef,
    mode,
    setMode,
    location,
    descriptor,
    reducedMotion,
    runFlip,
  }
}
