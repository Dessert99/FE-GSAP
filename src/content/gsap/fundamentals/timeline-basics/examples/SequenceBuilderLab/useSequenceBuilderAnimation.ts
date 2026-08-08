/** 하나의 descriptor에서 Timeline child를 단계별로 만들고 실제 배치값을 다시 읽어 화면에 제공한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 세 단계가 조작할 UI 대상을 ref와 코드 selector 양쪽에서 같은 이름으로 찾게 한다. */
export type SequenceTarget = 'title' | 'bar' | 'badge'

/** 한 child creator 호출을 실행과 코드 패널이 공유하는 값으로 표현한다. */
export type SequenceCall =
  | { method: 'from'; target: SequenceTarget; targetSyntax: string; duration: number; y: number; autoAlpha: number }
  | { method: 'to'; target: SequenceTarget; targetSyntax: string; duration: number; scaleX: number; ease: string }
  | { method: 'set'; target: SequenceTarget; targetSyntax: string; autoAlpha: number }
  | { method: 'fromTo'; target: SequenceTarget; targetSyntax: string; duration: number; fromScale: number; toScale: number; ease: string }

/** 학습자가 한 번에 추가하는 UI 단계와 그 단계가 만드는 실제 GSAP 호출을 묶는다. */
export type SequenceStage = {
  id: string
  label: string
  calls: readonly SequenceCall[]
}

/** Timeline에서 직접 읽은 child의 시작·길이·메서드 표기다. */
export type SequenceBlock = {
  id: string
  method: SequenceCall['method']
  start: number
  duration: number
}

/** 3단계 UI sequence가 네 child creator를 모두 사용하도록 고정한 단일 descriptor다. */
export const sequenceStages: readonly SequenceStage[] = [
  {
    id: 'intro',
    label: '제목 등장',
    calls: [{ method: 'from', target: 'title', targetSyntax: "'.sequence-builder__title'", duration: 0.5, y: -24, autoAlpha: 0 }],
  },
  {
    id: 'progress',
    label: '진행 막대 채우기',
    calls: [{ method: 'to', target: 'bar', targetSyntax: "'.sequence-builder__bar-fill'", duration: 0.7, scaleX: 1, ease: 'power2.out' }],
  },
  {
    id: 'finish',
    label: '완료 badge 전환',
    calls: [
      { method: 'set', target: 'badge', targetSyntax: "'.sequence-builder__badge'", autoAlpha: 1 },
      { method: 'fromTo', target: 'badge', targetSyntax: "'.sequence-builder__badge'", duration: 0.45, fromScale: 0.7, toScale: 1, ease: 'back.out(1.7)' },
    ],
  },
]

/** 소수점 오차를 숨기지 않되 표에서 읽기 쉬운 두 자리로만 정리한다. */
function round(value: number) {
  return Math.round(value * 100) / 100
}

/** sequence builder의 DOM refs, 단계 상태, 실제 child 배치와 조작 action을 제공한다. */
export function useSequenceBuilderAnimation() {
  // useGSAP이 이 예제에서 만든 Timeline과 초기 set을 한꺼번에 되돌릴 범위다
  const scope = useRef<HTMLDivElement>(null)
  // from() child가 시작 상태를 쓸 제목 element다
  const titleRef = useRef<HTMLHeadingElement>(null)
  // to() child가 0에서 1까지 채울 진행 막대 element다
  const barRef = useRef<HTMLSpanElement>(null)
  // set()과 fromTo()가 차례로 표시하고 확대할 badge element다
  const badgeRef = useRef<HTMLSpanElement>(null)
  // 단계 추가·재생·초기화가 모두 같은 Timeline instance를 조작하도록 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // descriptor 앞에서 몇 단계를 Timeline에 넣었는지 코드와 버튼이 함께 읽는다
  const [stageCount, setStageCount] = useState(0)
  // Timeline children에서 직접 읽은 블록 위치를 정적 ruler에 그린다
  const [blocks, setBlocks] = useState<SequenceBlock[]>([])
  // 이산 조작 결과만 screen reader에 알리는 상태 문장이다
  const [status, setStatus] = useState('아직 child가 없습니다. 첫 단계를 추가하세요.')
  // 모션 감소 설정에서는 Timeline을 재생하지 않고 완성 상태로 즉시 이동한다
  const reducedMotion = useReducedMotion()

  // descriptor의 target 이름을 이 예제 안 실제 element 하나로 해석한다
  function getTarget(target: SequenceTarget) {
    if (target === 'title') return titleRef.current
    if (target === 'bar') return barRef.current
    return badgeRef.current
  }

  // 현재까지 추가한 call 순서와 GSAP child getter를 결합해 실제 block 배치를 만든다
  function readBlocks(timeline: gsap.core.Timeline, nextStageCount: number) {
    // 코드 descriptor가 선언한 call 순서를 실제 child 순서와 맞춘다
    const calls = sequenceStages.slice(0, nextStageCount).flatMap((stage) => stage.calls)
    // zero-duration set까지 포함한 Tween child 목록을 Timeline에서 직접 읽는다
    const children = timeline.getChildren(false, true, false)
    return children.map((child, index) => ({
      id: `${calls[index].method}-${index}`,
      method: calls[index].method,
      start: round(child.startTime()),
      duration: round(child.duration()),
    }))
  }

  useGSAP(
    () => {
      // 초기 화면에서 제목은 보이고 진행 막대는 비어 있으며 badge는 숨겨 둔다
      gsap.set(titleRef.current, { y: 0, autoAlpha: 1 })
      // scaleX를 쓰면 layout을 바꾸지 않고 진행 막대만 채울 수 있다
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
      // 마지막 set() child가 실행되기 전까지 완료 badge를 감춘다
      gsap.set(badgeRef.current, { autoAlpha: 0, scale: 1 })
      // 사용자가 단계를 넣을 때까지 비어 있고 멈춘 Timeline을 한 번만 만든다
      const timeline = gsap.timeline({ paused: true })
      // 모든 재생 회차가 끝나면 연속 시간값 대신 완료 사건만 알린다
      timeline.eventCallback('onComplete', () => setStatus('현재까지 추가한 sequence가 모두 끝났습니다.'))
      timelineRef.current = timeline
      return () => {
        timelineRef.current = null
      }
    },
    // refs 안 element와 Timeline의 생성·복원을 이 예제 scope에 한정한다
    { scope },
  )

  // descriptor의 다음 단계를 Timeline 끝에 추가하고 실제 child 위치를 다시 읽는다
  function addNextStage() {
    // 다음 child를 받을 Timeline과 아직 추가하지 않은 stage를 고른다
    const timeline = timelineRef.current
    // 현재 stageCount가 가리키는 descriptor 한 단계만 이번 클릭에 추가한다
    const stage = sequenceStages[stageCount]
    if (!timeline || !stage) return

    // 이미 재생했다면 새 child를 넣기 전에 전체 sequence를 0초에서 멈춘다
    timeline.pause(0)

    stage.calls.forEach((call) => {
      // 모든 creator가 같은 descriptor target 이름에서 실제 element를 찾는다
      const target = getTarget(call.target)
      if (!target) return

      if (call.method === 'from') {
        // 현재 값으로 끝나는 from child를 Timeline 끝에 추가한다
        timeline.from(target, { y: call.y, autoAlpha: call.autoAlpha, duration: call.duration })
      } else if (call.method === 'to') {
        // 현재 값에서 목적값으로 향하는 to child를 Timeline 끝에 추가한다
        timeline.to(target, { scaleX: call.scaleX, duration: call.duration, ease: call.ease })
      } else if (call.method === 'set') {
        // playhead가 닿는 순간 badge를 보이게 하는 zero-duration child를 추가한다
        timeline.set(target, { autoAlpha: call.autoAlpha })
      } else {
        // 시작과 끝을 둘 다 명시한 fromTo child를 Timeline 끝에 추가한다
        timeline.fromTo(target, { scale: call.fromScale }, { scale: call.toScale, duration: call.duration, ease: call.ease })
      }
    })

    // 방금 추가한 stage까지 포함한 개수를 UI와 다음 클릭 기준으로 고정한다
    const nextStageCount = stageCount + 1
    setStageCount(nextStageCount)
    setBlocks(readBlocks(timeline, nextStageCount))
    setStatus(`${stage.label} 단계를 추가했습니다. 재생하면 ${timeline.duration().toFixed(2)}초 sequence를 확인할 수 있습니다.`)
  }

  // 현재까지 만든 Timeline을 처음부터 재생하거나 모션 감소 설정에서는 끝으로 즉시 보낸다
  function play() {
    // 재생할 child가 들어 있는 동일한 Timeline instance를 읽는다
    const timeline = timelineRef.current
    if (!timeline || stageCount === 0) return

    if (reducedMotion) {
      // motion 없이 최종 stage를 보여 주도록 callback을 건너뛰며 끝으로 이동한다
      timeline.progress(1, true).pause()
      setStatus('모션 감소 설정에 따라 현재 sequence의 최종 상태를 즉시 표시했습니다.')
      return
    }

    // 기존 child 구성은 보존하고 0초부터 정방향으로 다시 재생한다
    timeline.restart()
    setStatus('현재까지 추가한 child를 처음부터 재생하고 있습니다.')
  }

  // Timeline children과 화면 값을 모두 최초의 비어 있는 상태로 되돌린다
  function reset() {
    // clear와 초기 set을 적용할 동일한 Timeline instance를 읽는다
    const timeline = timelineRef.current
    if (!timeline) return

    // 재생을 멈추고 child를 모두 제거하되 Timeline instance는 유지한다
    timeline.pause(0).clear()
    // from child가 생기기 전의 완성된 제목 상태를 복원한다
    gsap.set(titleRef.current, { y: 0, autoAlpha: 1 })
    // 새 sequence가 다시 0에서 채워지도록 진행 막대를 비운다
    gsap.set(barRef.current, { scaleX: 0 })
    // 마지막 stage가 다시 책임지도록 badge를 숨긴다
    gsap.set(badgeRef.current, { autoAlpha: 0, scale: 1 })
    setStageCount(0)
    setBlocks([])
    setStatus('Timeline을 비웠습니다. 첫 단계부터 다시 추가하세요.')
  }

  // TSX가 DOM·block ruler·코드 패널을 같은 descriptor와 runtime getter에서 그리도록 필요한 값만 전달한다
  return { scope, titleRef, barRef, badgeRef, stageCount, blocks, status, reducedMotion, addNextStage, play, reset }
}
