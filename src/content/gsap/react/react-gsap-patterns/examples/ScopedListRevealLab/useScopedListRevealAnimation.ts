/** component-owned scope 안에서만 list reveal tween을 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** stable item selector와 motion branch를 같은 descriptor로 고정한다. */
export const scopedListDescriptor = {
  itemClassName: 'scoped-list-reveal__item',
  duration: 0.45,
  stagger: 0.08,
}

/** list component가 own scope에서 reveal tween을 만들고 cleanup하게 한다. */
export function useScopedListRevealAnimation() {
  // selector와 Context cleanup이 이 one example subtree만 보게 하는 ref다.
  const scope = useRef<HTMLDivElement>(null)
  // OS preference가 list reveal의 temporal 값을 즉시 상태로 바꾼다.
  const reducedMotion = useReducedMotion()
  // semantic replay button이 same list resource를 다시 만들 revision이다.
  const [runKey, setRunKey] = useState(0)
  // descriptor와 motion preference가 actual call과 code에 공유하는 config다.
  const config = {
    duration: reducedMotion ? 0 : scopedListDescriptor.duration,
    stagger: reducedMotion ? 0 : scopedListDescriptor.stagger,
  }

  useGSAP(
    () => {
      // scoped selector로 this list의 item만 origin 아래에서 reveal한다.
      gsap.from(`.${scopedListDescriptor.itemClassName}`, {
        y: reducedMotion ? 0 : 20,
        autoAlpha: reducedMotion ? 1 : 0,
        ...config,
      })
      // config가 바뀌면 Context revert로 previous list tween을 먼저 되돌린다.
    },
    {
      scope,
      dependencies: [config.duration, config.stagger, reducedMotion, runKey],
      revertOnUpdate: true,
    },
  )

  // replay는 local Context를 revert한 뒤 같은 scoped list tween을 다시 만든다.
  const replay = () => setRunKey((value) => value + 1)

  // display는 same scope와 descriptor-derived low-motion config를 받는다.
  return { scope, reducedMotion, config, replay }
}
