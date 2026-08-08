/** one path descriptor로 helper create, DOM lifecycle, follower settle을 실행한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { MotionPathHelper } from 'gsap/MotionPathHelper'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// installed declaration보다 runtime helper의 animation property를 좁은 경계로 표현한다.
type HelperInstance = {
  kill: () => void
  animation?: gsap.core.Animation
}

// Copy button과 PathEditor group은 installed helper가 temporary로 더하는 DOM marker다.
const hasHelperEditorDom = (container: HTMLDivElement) =>
  Boolean(
    container.querySelector('.copy-motion-path') ||
    container.querySelector('.path-editor-g'),
  )

/** editable path의 temporary editor DOM을 create/kill/recreate로 정리한다. */
export function useMotionPathHelperAnimation() {
  // helper가 editor anchor를 붙일 original SVG path다.
  const pathRef = useRef<SVGPathElement>(null)
  // helper Copy button을 page 밖이 아닌 lab 안에 제한하는 container다.
  const editorContainerRef = useRef<HTMLDivElement>(null)
  // helper가 motionPath preview를 적용할 DOM follower다.
  const followerRef = useRef<HTMLDivElement>(null)
  // cleanup과 recreate 전에 actual helper instance를 kill한다.
  const helperRef = useRef<HelperInstance | null>(null)
  // create/kill 결과에서 실제 Copy button 또는 editor group presence를 readout으로 전달한다.
  const [editorDomPresent, setEditorDomPresent] = useState(false)
  // editor가 바꾼 current SVG d string을 output panel에 보관한다.
  const [pathData, setPathData] = useState('M20,130 C70,15 160,15 220,130')
  // kill/recreate control이 same descriptor로 fresh helper를 만들게 한다.
  const [runKey, setRunKey] = useState(0)
  // user preference에서 follower looping preview를 즉시 final state로 바꾼다.
  const reducedMotion = useReducedMotion()
  // helper creation, path output, code가 공유하는 one editable path descriptor다.
  const descriptor = {
    pathData,
    pathColor: '#0ae448',
    pathWidth: 3,
    selected: true,
    duration: reducedMotion ? 0.001 : 2.4,
    ease: 'power1.inOut',
  }

  useGSAP(
    () => {
      // helper가 편집할 original SVG path element를 안정 ref에서 읽는다.
      const path = pathRef.current
      // helper motion tween이 움직일 standalone HTML follower를 읽는다.
      const follower = followerRef.current
      // helper가 추가할 temporary controls를 lab 안에 보관할 host를 읽는다.
      const container = editorContainerRef.current
      if (!path || !follower || !container) return
      // MotionPathHelper는 MotionPathPlugin dependency를 포함해 함께 register해야 한다.
      gsap.registerPlugin(MotionPathPlugin, MotionPathHelper)
      // recreate 전 helper를 kill해 old anchors, handles, Copy button을 먼저 제거한다.
      helperRef.current?.kill()
      helperRef.current = null
      // descriptor path data를 original SVG path에 적용해 helper input과 output을 같은 값으로 시작한다.
      path.setAttribute('d', descriptor.pathData)
      // create는 follower, editable path, UI options, update callback을 one descriptor에서 받는다.
      const helper = MotionPathHelper.create(follower, {
        path,
        container,
        pathColor: descriptor.pathColor,
        pathWidth: descriptor.pathWidth,
        selected: descriptor.selected,
        duration: descriptor.duration,
        ease: descriptor.ease,
        onUpdate: () => setPathData(path.getAttribute('d') || ''),
      }) as HelperInstance
      helperRef.current = helper
      // reduced motion은 helper preview animation을 initial path position에 멈춘다.
      if (reducedMotion) helper.animation?.pause(0)
      setEditorDomPresent(hasHelperEditorDom(container))

      return () => {
        // kill documented lifecycle removes editor elements and Copy button before React removes lab DOM.
        helper.kill()
        helperRef.current = null
      }
      // path data 변경은 helper를 새로 만들지 않고 existing editor의 onUpdate output만 갱신한다.
    },
    { dependencies: [runKey, reducedMotion], revertOnUpdate: true },
  )

  // explicit kill verifies temporary editor DOM is gone before a later recreate.
  const killEditor = () => {
    helperRef.current?.kill()
    helperRef.current = null
    // kill 뒤 host에서 actual helper marker가 남았는지 다시 조회한다.
    const container = editorContainerRef.current
    setEditorDomPresent(container ? hasHelperEditorDom(container) : false)
  }
  // recreate changes only lifecycle key so the same descriptor makes a fresh helper.
  const recreateEditor = () => setRunKey((key) => key + 1)
  // native focus를 original path에 돌려 keyboard editor operation의 시작점을 명시한다.
  const focusEditorPath = () => pathRef.current?.focus()

  // lab은 live refs, one descriptor, lifecycle controls를 함께 받아 runtime과 code를 동기화한다.
  return {
    pathRef,
    editorContainerRef,
    followerRef,
    descriptor,
    pathData,
    editorDomPresent,
    reducedMotion,
    killEditor,
    recreateEditor,
    focusEditorPath,
  }
}
