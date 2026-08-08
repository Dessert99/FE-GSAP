/** puck·drop zone의 hitTest와 release throw snapshot을 같은 descriptor로 실행한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

gsap.registerPlugin(Draggable, InertiaPlugin)

export type CollisionThreshold = 0 | 20 | '50%'

type MomentumDraggable = Omit<Draggable, 'tween'> & { tween?: gsap.core.Tween | null }
type Snapshot = {
  overlap: string
  isThrowing: boolean
  tween: string
  duration: string
  release: string
}

const initialSnapshot: Snapshot = {
  overlap: '아직 검사하지 않음',
  isThrowing: false,
  tween: '없음',
  duration: '—',
  release: 'puck을 끌어 drop zone과 겹치게 해 보세요.',
}

/** 실제 Draggable vars·threshold·code panel을 함께 파생할 lab runtime이다. */
export function useCollisionMomentumAnimation() {
  // useGSAP이 plugin instance와 tween cleanup을 함께 묶을 DOM 범위다.
  const scope = useRef<HTMLDivElement>(null)
  // Draggable target과 static hitTest 첫 번째 인자로 쓰는 puck이다.
  const puckRef = useRef<HTMLButtonElement>(null)
  // puck의 release momentum을 화면 안에 머물게 하는 page-local stage다.
  const stageRef = useRef<HTMLDivElement>(null)
  // static hitTest 두 번째 인자이자 drop destination 사각형이다.
  const dropZoneRef = useRef<HTMLDivElement>(null)
  // cleanup에서 instance kill 전에 generated throw tween을 명시적으로 종료한다.
  const throwTweenRef = useRef<gsap.core.Tween | null>(null)
  // control이 새 instance를 만들지 않고 현재 collision snapshot만 다시 읽게 한다.
  const collisionReaderRef = useRef<() => void>(() => undefined)
  // threshold의 pixel·percentage form을 하나만 선택한다.
  const [threshold, setThreshold] = useState<CollisionThreshold>(20)
  // InertiaPlugin이 실제 release tween을 만들도록 요청하는 control state다.
  const [inertiaRequested, setInertiaRequested] = useState(true)
  // reset은 새 instance를 만들고 puck transform을 처음 위치로 되돌린다.
  const [runKey, setRunKey] = useState(0)
  // pointer drag와 release 뒤 읽은 collision·momentum snapshot을 화면에 전달한다.
  const [snapshot, setSnapshot] = useState<Snapshot>(initialSnapshot)
  // 사용자 환경에서 release motion을 허용할지 결정한다.
  const reducedMotion = useReducedMotion()
  // threshold·Draggable vars·display code가 공유하는 단일 descriptor다.
  const descriptor = {
    type: 'x,y' as const,
    boundsLabel: 'stageRef.current',
    threshold,
    inertia: inertiaRequested && !reducedMotion,
  }

  useGSAP(
    () => {
      // 새 실행마다 이전 target 위치를 지워 collision geometry를 예측 가능하게 만든다.
      gsap.set(puckRef.current, { x: 0, y: 0 })
      // 현재 threshold와 두 DOM rect로 overlap Boolean을 읽어 text snapshot으로만 남긴다.
      const readCollision = () => {
        const puck = puckRef.current
        const zone = dropZoneRef.current
        return puck && zone ? Draggable.hitTest(puck, zone, descriptor.threshold) : false
      }
      // instance의 throw fields는 callback 순간마다 읽고 tween reference를 cleanup에 보관한다.
      const inspectMomentum = (instance: MomentumDraggable, release?: string) => {
        const tween = instance.tween ?? null
        throwTweenRef.current = tween
        setSnapshot((previous) => ({
          overlap: readCollision() ? '겹침 감지: true' : '겹침 감지: false',
          isThrowing: instance.isThrowing,
          tween: tween ? '생성됨' : '없음',
          duration: tween ? `${tween.duration().toFixed(2)}s` : '—',
          release: release ?? previous.release,
        }))
      }
      // descriptor의 inertia 값으로 Draggable과 InertiaPlugin throw branch를 함께 만든다.
      const instance = Draggable.create(puckRef.current!, {
        type: descriptor.type,
        bounds: stageRef.current,
        inertia: descriptor.inertia,
        onDrag: () => inspectMomentum(instance as MomentumDraggable),
        onDragEnd() {
          inspectMomentum(
            this as MomentumDraggable,
            descriptor.inertia
              ? 'release 뒤 this.tween을 읽음'
              : 'reduced motion 또는 inertia off: 즉시 정착',
          )
        },
        onThrowComplete() {
          inspectMomentum(this as MomentumDraggable, 'throw complete: isThrowing false')
        },
      })[0] as MomentumDraggable
      // button control은 target geometry를 바꾸지 않고 이 instance의 current snapshot만 갱신한다.
      collisionReaderRef.current = () => inspectMomentum(instance)
      // 초기 화면은 collision과 tween이 아직 발생하지 않은 snapshot으로 시작한다.
      inspectMomentum(
        instance,
        descriptor.inertia
          ? 'drag 뒤 release하면 throw tween을 검사합니다.'
          : '모션 감소 또는 inertia off라 release tween을 만들지 않습니다.',
      )
      // cleanup은 생성된 tween과 Draggable instance를 모두 종료한다.
      return () => {
        collisionReaderRef.current = () => undefined
        throwTweenRef.current?.kill()
        throwTweenRef.current = null
        instance.kill()
      }
    },
    // threshold와 inertia·motion·reset이 바뀌면 descriptor 그대로 새 runtime을 만든다.
    {
      scope,
      dependencies: [descriptor.threshold, descriptor.inertia, runKey],
      revertOnUpdate: true,
    },
  )

  // control은 현재 puck·drop zone geometry를 새 runtime 없이 다시 검사한다.
  const recheck = () => collisionReaderRef.current()
  // reset은 active tween을 멈추고 static snapshot과 puck position을 동시에 초기화한다.
  const reset = () => {
    throwTweenRef.current?.kill()
    throwTweenRef.current = null
    setSnapshot(initialSnapshot)
    setRunKey((value) => value + 1)
  }

  // TSX에는 동일 descriptor와 snapshot, page-local control action만 전달한다.
  return {
    scope,
    stageRef,
    puckRef,
    dropZoneRef,
    threshold,
    setThreshold,
    inertiaRequested,
    setInertiaRequested,
    descriptor,
    snapshot,
    reducedMotion,
    recheck,
    reset,
  }
}
