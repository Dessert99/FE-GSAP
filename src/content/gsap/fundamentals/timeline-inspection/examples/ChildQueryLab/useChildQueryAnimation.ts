/** 중첩 Timeline 하나를 만들어 두고 getChildren의 네 인자를 바꿔 결과 배열이 어떻게 달라지는지 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 트리를 만드는 tween 한 줄의 설정 — GSAP 호출과 화면의 코드 패널이 이 값 하나를 함께 쓴다. */
export type LabStep = {
  id: string
  boxKey: string
  property: 'x' | 'y'
  to: number
  duration: number
}

/** getChildren에 그대로 넘길 네 인자다 — controls, GSAP 호출, 표시 코드가 이 하나에서 파생한다. */
export type ChildQueryArgs = {
  nested: boolean
  tweens: boolean
  timelines: boolean
  /** null이면 네 번째 인자를 아예 넘기지 않아 공식 기본값에 맡긴다. */
  ignoreBeforeTime: number | null
}

/** 트리 그림과 결과 목록이 같은 child를 가리키도록 평탄화 순서의 index를 열쇠로 쓴다. */
export type ChildNode = {
  index: number
  id: string
  kind: 'tween' | 'timeline'
  /** master의 직계 child면 0, 중첩 timeline 안의 child면 1이다. */
  depth: number
  /** 자기 부모 timeline을 기준으로 잰 시작 시각 — getChildren의 ignoreBeforeTime이 비교하는 값이다. */
  startTime: number
  /** master 전체를 기준으로 잰 시작 시각 — 화면에서 실제로 언제 움직이는지에 대응한다. */
  globalStart: number
}

/** 중첩 timeline에 붙인 이름표 — 트리에서 이 노드 하나만 timeline이다. */
export const nestedTimelineId = 'detail'

/** master timeline이 직접 담는 tween 세 개 — 공식 예제와 같은 "직계 tween 3개" 구성이다. */
export const masterSteps: LabStep[] = [
  { id: 'moveA', boxKey: 'a', property: 'x', to: 150, duration: 1 },
  { id: 'moveB', boxKey: 'b', property: 'x', to: 150, duration: 1 },
  { id: 'moveC', boxKey: 'c', property: 'x', to: 150, duration: 1 },
]

/** 중첩 timeline이 담는 tween 두 개 — 공식 예제와 같은 "중첩 tween 2개" 구성이다. */
export const detailSteps: LabStep[] = [
  { id: 'liftD', boxKey: 'd', property: 'y', to: 36, duration: 1 },
  { id: 'liftE', boxKey: 'e', property: 'y', to: 36, duration: 2 },
]

// 공식 기본 인자를 초기 화면과 첫 실제 조회가 함께 사용한다
const initialChildQueryArgs: ChildQueryArgs = { nested: true, tweens: true, timelines: true, ignoreBeforeTime: null }

/** 각 tween이 붙잡는 box의 className을 만든다 — 실행 선택자와 JSX가 같은 문자열을 쓴다. */
export function boxClassName(boxKey: string) {
  return `child-query-lab__box--${boxKey}`
}

/** 평탄화한 child 목록을 화면이 그대로 그릴 수 있는 노드 설명으로 바꾼다. */
function describeTree(master: gsap.core.Timeline): ChildNode[] {
  return master.getChildren(true, true, true).map((child, index) => {
    // 중첩 timeline만 getChildren을 가지고 있어 tween과 timeline을 이것으로 가른다
    const isTimeline = 'getChildren' in child
    // master의 직계가 아니면 중첩 timeline 안에 있는 child다
    const depth = child.parent === master ? 0 : 1
    // 부모가 master가 아니면 부모 timeline이 master 위에서 시작한 시각을 더해야 실제 시각이 된다
    const parentStart = depth === 0 ? 0 : (child.parent?.startTime() ?? 0)

    return {
      index,
      id: String(child.vars.id ?? '(id 없음)'),
      kind: isTimeline ? 'timeline' : 'tween',
      depth,
      startTime: child.startTime(),
      globalStart: parentStart + child.startTime(),
    }
  })
}

/** 실제 반환 instance를 고정된 평탄화 목록의 index로 바꿔 화면과 같은 snapshot을 만든다. */
function queryChildIndices(
  master: gsap.core.Timeline,
  args: ChildQueryArgs,
  flat: (gsap.core.Tween | gsap.core.Timeline)[],
) {
  // null인 네 번째 값은 undefined로 바꿔 GSAP의 실제 기본 인자를 사용한다
  const children = master.getChildren(args.nested, args.tweens, args.timelines, args.ignoreBeforeTime ?? undefined)

  return children.map((child) => flat.indexOf(child)).filter((index) => index >= 0)
}

/** getChildren 예제의 트리, 네 인자 controls, 조회 결과, 재생 헤드 조작을 제공한다. */
export function useChildQueryAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 조회 대상이 되는 master timeline — 화면에서는 이 참조 대신 조회 결과만 쓴다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 결과 instance를 트리의 몇 번째 노드인지로 바꾸기 위해 평탄화 순서를 그대로 보관한다
  const flatRef = useRef<(gsap.core.Tween | gsap.core.Timeline)[]>([])
  // 화면에 그릴 트리 노드 목록 — 조회 결과와 달리 인자와 무관하게 항상 전체다
  const [nodes, setNodes] = useState<ChildNode[]>([])
  // 사용자가 고른 네 인자 — 기본값은 공식 문서가 적은 기본값과 같게 둔다
  const [args, commitArgs] = useState<ChildQueryArgs>(initialChildQueryArgs)
  // 마지막 조회가 돌려준 child들의 트리 index — 트리 강조와 결과 목록이 이 하나를 본다
  const [resultIndices, setResultIndices] = useState<number[]>([])
  // 재생 헤드가 지금 어디인지 보여줘 startTime과 화면 움직임을 연결한다
  const [progress, setProgress] = useState(0)
  // 운영체제 모션 감소 설정이면 재생 버튼을 두지 않고 재생 헤드 slider만 남긴다
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      // 조회 대상이 될 부모 timeline — 자동 재생하지 않도록 처음부터 멈춘 상태로 만든다
      const master = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'none' } })
      // master와 따로 만들어 두었다가 통째로 집어넣을 중첩 timeline이다
      const detail = gsap.timeline({ id: nestedTimelineId })

      // 중첩 timeline 안에 tween 두 개를 순서대로 이어 붙인다
      detailSteps.forEach((step) => {
        detail.to(`.${boxClassName(step.boxKey)}`, {
          [step.property]: step.to,
          duration: step.duration,
          id: step.id,
        })
      })

      // master에 직계 tween 세 개를 먼저 이어 붙인다
      masterSteps.forEach((step) => {
        master.to(`.${boxClassName(step.boxKey)}`, {
          [step.property]: step.to,
          duration: step.duration,
          id: step.id,
        })
      })

      // 완성된 timeline을 통째로 child 하나로 집어넣는 순간 구조가 나무가 된다
      master.add(detail)

      // 재생 헤드를 움직일 때마다 화면 표시와 실제 timeline 위치를 같게 유지한다
      master.eventCallback('onUpdate', () => setProgress(Number(master.progress().toFixed(3))))

      timelineRef.current = master
      flatRef.current = master.getChildren(true, true, true)
      setNodes(describeTree(master))
      setProgress(0)
      // 첫 화면도 표시 코드와 같은 기본 인자로 실제 조회한 결과를 쓴다
      setResultIndices(queryChildIndices(master, initialChildQueryArgs, flatRef.current))

      // context 정리 뒤 handler가 사라진 timeline을 다시 조작하지 않게 참조를 비운다
      return () => {
        timelineRef.current = null
        flatRef.current = []
      }
    },
    // 트리 구조는 controls와 무관하므로 한 번만 만들고, 조회는 아래 effect가 따로 계산한다
    { scope, dependencies: [], revertOnUpdate: true },
  )

  // 인자와 실제 조회 결과를 같은 event batch에서 갱신해 한 render의 code/tree/status를 일치시킨다
  function setArgs(nextArgs: ChildQueryArgs) {
    commitArgs(nextArgs)
    // 생성된 master가 준비된 뒤에만 새 인자로 child를 조회한다
    const master = timelineRef.current
    if (!master) return
    setResultIndices(queryChildIndices(master, nextArgs, flatRef.current))
  }

  // 재생 중 모션 감소 설정이 켜지면 숨겨질 pause 버튼을 대신해 즉시 멈춘다
  useEffect(() => {
    if (!reducedMotion) return
    timelineRef.current?.pause()
  }, [reducedMotion])

  // 재생 헤드를 직접 옮긴다 — 모션 감소 설정에서도 쓸 수 있는 유일한 이동 수단이다
  function seek(value: number) {
    timelineRef.current?.progress(value)
  }

  // 멈춰 있는 timeline을 처음부터 한 번 재생한다 — 모션 감소 설정에서는 화면에 두지 않는다
  function play() {
    if (reducedMotion) return
    timelineRef.current?.restart()
  }

  // 재생 중인 timeline을 그 자리에 멈춘다
  function pause() {
    timelineRef.current?.pause()
  }

  // TSX가 트리·controls·결과 목록·코드 패널을 같은 조회 결과에서 그리도록 필요한 값만 전달한다
  return { scope, nodes, args, setArgs, resultIndices, progress, reducedMotion, seek, play, pause }
}
