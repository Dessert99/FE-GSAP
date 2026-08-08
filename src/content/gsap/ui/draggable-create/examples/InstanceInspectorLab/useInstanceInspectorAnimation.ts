/** 한 creation descriptor로 Draggable instance·lookup·inspector snapshot을 함께 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useRef, useState } from 'react'

/** selector가 제공하는 공식 Draggable type 문자열이다. */
export type DraggableType = 'x,y' | 'top,left' | 'left,top' | 'rotation' | 'x' | 'y' | 'top' | 'left'

/** create 호출과 code panel이 공유하는 최소 configuration이다. */
export type CreationDescriptor = { type: DraggableType; dragClickables: false }

/** instance에서 한 번 읽어 화면이 과장하지 않는 inspection 결과다. */
export type InstanceSnapshot = { createdCount: number; lookupMatches: boolean; target: string; vars: { type: DraggableType; dragClickables: boolean } }

// import한 plugin을 GSAP에 한 번 등록해 create 호출을 준비한다
gsap.registerPlugin(Draggable)

/** type control 변화마다 instance를 재생성하고 cleanup하는 runtime을 제공한다. */
export function useInstanceInspectorAnimation() {
  // Draggable의 selector와 cleanup 범위를 lab DOM 안으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // create와 get에 넘길 실제 DOM target이다
  const targetRef = useRef<HTMLDivElement>(null)
  // 한 instance가 사용할 drag type을 고른다
  const [type, setType] = useState<DraggableType>('x,y')
  // 명시적 reset도 같은 descriptor로 instance를 다시 만드는 신호다
  const [resetKey, setResetKey] = useState(0)
  // 생성·조회 뒤 instance에서 읽은 값만 화면에 보관한다
  const [snapshot, setSnapshot] = useState<InstanceSnapshot>({ createdCount: 0, lookupMatches: false, target: '아직 생성 전', vars: { type: 'x,y', dragClickables: false } })
  // GSAP 호출과 code serializer가 공유하는 유일한 create 입력이다
  const descriptor: CreationDescriptor = { type, dragClickables: false }
  // transform을 tween 없이 즉시 초기화해 reduced motion에서도 같은 reset 결과를 만든다
  const reset = () => setResetKey((key) => key + 1)

  useGSAP(
    () => {
      // ref가 연결된 뒤에만 DOM target을 Draggable instance로 만든다
      const target = targetRef.current
      if (!target) return undefined
      // 이전 drag가 남긴 transform과 positional style을 reset 전에 지운다
      gsap.set(target, { clearProps: 'transform,left,top' })
      // descriptor의 type과 click policy로 target 하나의 instance를 만든다
      const instances = Draggable.create(target, descriptor)
      // create가 반환한 첫 instance와 같은 target lookup 결과를 비교한다
      const instance = instances[0]
      const lookup = Draggable.get(target)
      // target과 vars는 만들어진 instance에서 읽어 inspector snapshot으로 고정한다
      setSnapshot({ createdCount: instances.length, lookupMatches: lookup === instance, target: `${instance.target.tagName.toLowerCase()}#${instance.target.id}`, vars: { type: String(instance.vars.type) as DraggableType, dragClickables: instance.vars.dragClickables === false } })

      return () => {
        // descriptor가 바뀌거나 React가 unmount할 때 listener와 instance를 정리한다
        instance.kill()
        // 다음 instance가 이전 drag 위치를 물려받지 않도록 즉시 원상태로 둔다
        gsap.set(target, { clearProps: 'transform,left,top' })
      }
    },
    // type 또는 reset만 바뀌면 이전 instance를 kill하고 동일 생성 경로를 다시 밟는다
    { scope, dependencies: [descriptor.type, resetKey], revertOnUpdate: true },
  )

  // controls·preview·code panel은 이 descriptor와 instance snapshot만 소비한다
  return { scope, targetRef, type, setType, descriptor, snapshot, reset }
}
