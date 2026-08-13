/** local condition simulator의 style snapshot과 media listener cleanup을 소유한다. */
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'
import { responsiveRestorationDescriptor } from '../../scroll-trigger-responsive.descriptor'

/** simulator가 보여 줄 조건을 실제 reduced-motion 우선순위와 분리해 선언한다. */
export type SimulatedCondition = 'large' | 'small'

/** one local panel의 inline style snapshot과 native media listener를 안전하게 복원한다. */
export function useResponsiveRestorationRuntime() {
  // simulator가 직접 style을 바꾸고 cleanup에서 원상 복구할 local DOM만 보관한다
  const panelRef = useRef<HTMLDivElement>(null)
  // learner가 큰 화면과 작은 화면의 setup boundary를 비교하도록 선택값을 둔다
  const [selectedCondition, setSelectedCondition] =
    useState<SimulatedCondition>('large')
  // 같은 condition도 다시 snapshot/apply하도록 replay identity를 별도로 둔다
  const [replayKey, setReplayKey] = useState(0)
  // OS motion preference는 항상 simulated large condition보다 우선한다
  const reducedMotion = useReducedMotion()
  // saved inline style과 listener teardown이 있었음을 visible simulator state로 남긴다
  const [lifecycle, setLifecycle] = useState('snapshot 대기')
  // reduced motion은 no-animation condition이고 나머지는 선택한 responsive condition이다
  const condition = reducedMotion ? 'reduced motion' : selectedCondition

  useEffect(() => {
    // local panel이 mount된 뒤에만 native media listener와 style snapshot을 소유한다
    const panel = panelRef.current
    if (!panel) return undefined
    // saveStyles가 보관하는 inline CSS snapshot의 local, non-global simulator 표현이다
    const savedStyle = panel.getAttribute('style')
    // browser query listener는 component scope에서만 만들고 cleanup에서 같은 callback을 제거한다
    const media = window.matchMedia(responsiveRestorationDescriptor.legacyQuery)
    // media query 변화는 연속 값 대신 한 번의 상태 문장만 남긴다
    const onChange = () =>
      setLifecycle('native media listener가 조건 변화를 관찰 중')
    media.addEventListener('change', onChange)
    // large condition만 non-animated inline style을 적용해 snapshot restore를 눈으로 비교한다
    if (condition === 'large') {
      panel.style.outline = '3px solid var(--color-accent)'
      panel.style.backgroundColor =
        'color-mix(in srgb, var(--color-accent) 12%, transparent)'
      setLifecycle('saved style 뒤 large condition style 적용')
    } else {
      setLifecycle(
        condition === 'reduced motion'
          ? 'reduced motion · animation 없는 condition'
          : 'small condition · saved style 유지',
      )
    }

    // condition change 또는 unmount는 listener와 local inline style을 capture한 값으로 되돌린다
    return () => {
      media.removeEventListener('change', onChange)
      if (savedStyle === null) panel.removeAttribute('style')
      else panel.setAttribute('style', savedStyle)
    }
  }, [condition, replayKey])

  // current condition을 바꾸지 않고 simulator setup/cleanup 순서만 다시 실행한다
  function reapplyCondition() {
    setReplayKey((value) => value + 1)
  }

  // TSX는 one descriptor와 local ref, effective condition, lifecycle만 표시한다
  return {
    panelRef,
    selectedCondition,
    setSelectedCondition,
    reapplyCondition,
    reducedMotion,
    condition,
    lifecycle,
    descriptor: responsiveRestorationDescriptor,
  }
}
