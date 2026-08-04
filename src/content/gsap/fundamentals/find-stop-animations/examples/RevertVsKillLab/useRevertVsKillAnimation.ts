/** 같은 지점에서 kill()과 revert()를 각각 실행해 값과 inline style이 어디에 남는지를 관찰하게 한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'

/** 중단 방식 두 가지 — 그 자리에 멈출지, 시작 상태로 되돌릴지를 고른다. */
export type StopMode = 'kill' | 'revert'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type RevertVsKillDescriptor = {
  selector: string
  tweenId: string
  targetOpacity: number
  duration: number
  mode: StopMode
  progress: number
}

/** 중단 뒤 값·inline style·registry가 각각 어떻게 됐는지를 그대로 드러내는 관찰값이다. */
export type RevertVsKillObservation = {
  opacity: number
  inlineStyle: string
  foundById: boolean
  remainingTweens: number
}

/** gsap 선택자이자 box의 className — 실행과 표시가 같은 문자열을 쓴다. */
const targetSelector = '.revert-vs-kill-lab__box'

/** getById로 다시 찾을 수 있게 붙여 두는 이름표다. */
const tweenId = 'fadeIn'

/** CSS class가 정해 둔 시작 투명도에서 여기까지 올린다 — 시작값은 stylesheet가 소유한다. */
const targetOpacity = 1

/** 자동 재생 없이 사용자가 직접 옮기는 재생 헤드의 기준 길이다. */
const duration = 1

/** radio·slider 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(mode: StopMode, progress: number): RevertVsKillDescriptor {
  return { selector: targetSelector, tweenId, targetOpacity, duration, mode, progress }
}

/** style attribute가 없거나 비어 있으면 "(없음)"으로 읽어 revert 결과를 문장으로 확인하게 한다. */
function readInlineStyle(box: HTMLElement) {
  const raw = box.getAttribute('style')
  return raw && raw.trim() ? raw.trim() : '(없음)'
}

/** kill·revert 비교 예제의 controls, paused Tween, 관찰값, 중단·초기화 action을 제공한다. */
export function useRevertVsKillAnimation() {
  // 이 예제 밖의 같은 class를 선택하지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 중단 버튼이 조작할 Tween — 두 방식 모두 같은 instance에 걸어야 비교가 성립한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // 조회와 관찰이 같은 element를 가리키도록 풀어 둔 target이다
  const targetRef = useRef<HTMLElement | null>(null)
  // 그 자리에 멈출지 시작 상태로 되돌릴지 고르는 control이다
  const [mode, setMode] = useState<StopMode>('kill')
  // 자동 재생 대신 사용자가 직접 시간을 옮긴다 — 중단 지점을 스스로 정하게 하기 위해서다
  const [progress, setProgress] = useState(0)
  // 이미 중단을 실행했는지 구분해 안내 문구와 코드 패널을 다르게 그린다
  const [appliedMode, setAppliedMode] = useState<StopMode | null>(null)
  // 값·inline style·registry 상태를 색이 아닌 숫자와 문자로 보여준다
  const [observation, setObservation] = useState<RevertVsKillObservation>({
    opacity: 0,
    inlineStyle: '(없음)',
    foundById: false,
    remainingTweens: 0,
  })
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('재생 헤드를 중간까지 옮긴 뒤 두 방식을 번갈아 실행해 보세요.')
  // 초기화 버튼이 Tween을 처음부터 다시 만들게 하는 재실행 열쇠다
  const [runKey, setRunKey] = useState(0)
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(mode, progress), [mode, progress])

  useGSAP(
    () => {
      // 조회와 실행이 같은 element를 가리키도록 선택자를 한 번만 풀어 둔다
      const box = gsap.utils.toArray<HTMLElement>(targetSelector)[0]
      targetRef.current = box
      // 이전 실행이 남긴 inline style을 지워 stylesheet가 정한 시작 투명도에서 출발시킨다
      gsap.set(box, { clearProps: 'opacity' })
      // 시작값을 vars에 적지 않는다 — GSAP이 computed style에서 읽은 값이 곧 "animation 이전 상태"다
      tweenRef.current = gsap.to(box, {
        opacity: targetOpacity,
        duration,
        ease: 'none',
        id: tweenId,
        paused: true,
      })
      // 새 Tween을 준비했으므로 이전 중단 기록을 지우고 지금 상태를 한 번 읽어 둔다
      setProgress(0)
      setAppliedMode(null)
      setObservation({
        opacity: Number(Number.parseFloat(String(gsap.getProperty(box, 'opacity'))).toFixed(3)),
        inlineStyle: readInlineStyle(box),
        foundById: Boolean(gsap.getById<gsap.core.Tween>(tweenId)),
        remainingTweens: gsap.getTweensOf(box).length,
      })
      // context 정리 뒤 handler가 이전 Tween을 다시 조작하지 않게 참조를 비운다
      return () => {
        tweenRef.current = null
        targetRef.current = null
      }
    },
    // 초기화를 누를 때만 이전 Tween을 되돌리고 처음부터 다시 만든다
    { scope, dependencies: [runKey], revertOnUpdate: true },
  )

  // GSAP이 element에 실제로 쓴 결과와 registry 상태를 그대로 읽는다 — 추측한 값을 넣지 않는다
  function readObservation() {
    const box = targetRef.current
    if (!box) return

    setObservation({
      opacity: Number(Number.parseFloat(String(gsap.getProperty(box, 'opacity'))).toFixed(3)),
      inlineStyle: readInlineStyle(box),
      foundById: Boolean(gsap.getById<gsap.core.Tween>(tweenId)),
      remainingTweens: gsap.getTweensOf(box).length,
    })
  }

  // 사용자가 재생 헤드를 옮긴다 — 중단 뒤에도 옮겨 봐야 Tween이 죽었는지 알 수 있다
  function seek(value: number) {
    const tween = tweenRef.current
    if (!tween) return

    setProgress(value)
    tween.progress(value)
    readObservation()
  }

  // 고른 방식으로 실제 중단 호출을 실행한다 — 이 예제의 핵심 동작이다
  function applyStop() {
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    const tween = tweenRef.current
    if (!tween) return

    if (descriptor.mode === 'kill') {
      // 지금 값을 그대로 둔 채 Tween만 없앤다
      tween.kill()
    } else {
      // animation 이전 상태로 되돌리면서 Tween도 함께 없앤다
      tween.revert()
    }

    setAppliedMode(descriptor.mode)
    readObservation()
    setStatus(
      descriptor.mode === 'kill'
        ? '그 자리에서 멈췄습니다. inline style이 남아 있는지 확인하세요.'
        : '시작 상태로 되돌렸습니다. inline style이 어떻게 됐는지 확인하세요.',
    )
  }

  // Tween을 처음부터 다시 만들어 다른 방식으로 같은 실험을 반복하게 한다
  function reset() {
    setRunKey((key) => key + 1)
    setStatus('Tween을 새로 만들었습니다. 다른 방식을 골라 같은 지점에서 비교해 보세요.')
  }

  // TSX가 controls·관찰 패널·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return { scope, descriptor, mode, setMode, progress, appliedMode, observation, status, seek, applyStop, reset }
}
