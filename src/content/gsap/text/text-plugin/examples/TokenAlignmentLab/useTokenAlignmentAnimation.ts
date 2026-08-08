/** 하나의 normalized descriptor로 TextPlugin tween과 direct-final fallback을 실행한다. */
import { useGSAP } from '@gsap/react'
import { useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** token alignment control이 선택하는 delimiter mode를 제한한다. */
export type DelimiterMode = 'characters' | 'words'

/** actual TextPlugin vars와 code serializer가 공유하는 one phrase descriptor다. */
export type TokenDescriptor = {
  value: string
  delimiter: '' | ' '
  padSpace: boolean
  newClass: string
  oldClass: string
  preserveSpaces: false
  rtl: false
  speed: number
  type: 'diff'
  duration: number
}

// TextPlugin text property가 gsap.to에서 인식되도록 plugin을 등록한다
gsap.registerPlugin(TextPlugin)

/** one content target의 original markup, TextPlugin tween, reduced-motion final text를 소유한다. */
export function useTokenAlignmentAnimation() {
  // useGSAP context와 local target selector를 one lab DOM에 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // plugin이 intermediate HTML을 써도 되는 one phrase element를 가리킨다
  const phraseRef = useRef<HTMLSpanElement>(null)
  // character/word token split을 descriptor와 alignment strip이 함께 읽는다
  const [delimiterMode, setDelimiterMode] = useState<DelimiterMode>('words')
  // trailing non-breaking padding 요청을 descriptor와 code가 함께 읽는다
  const [padSpace, setPadSpace] = useState(true)
  // replay마다 same descriptor의 text replacement tween을 새로 만든다
  const [runKey, setRunKey] = useState(0)
  // OS preference를 actual direct-final branch에 반영한다
  const reducedMotion = useReducedMotion()
  // controls와 complete fixed config를 one TextPlugin object로 정규화한다
  const descriptor = useMemo<TokenDescriptor>(
    () => ({
      value: 'FINAL TOKEN ALIGNMENT',
      delimiter: delimiterMode === 'words' ? ' ' : '',
      padSpace,
      newClass: 'token-alignment-lab__new-text',
      oldClass: 'token-alignment-lab__old-text',
      preserveSpaces: false,
      rtl: false,
      speed: 1,
      type: 'diff',
      duration: 1.2,
    }),
    [delimiterMode, padSpace],
  )

  // descriptor와 motion preference가 바뀌면 original markup을 복원한 뒤 one tween을 다시 만든다
  useGSAP(
    () => {
      // mounted target가 없으면 content mutation이나 tween을 만들지 않는다
      const phrase = phraseRef.current
      if (!phrase) return undefined
      // cleanup에서 plugin-created class span까지 되돌릴 original markup을 저장한다
      const originalHtml = phrase.innerHTML

      // reduced motion은 per-token intermediate 없이 final text를 즉시 쓴다
      if (reducedMotion) {
        phrase.textContent = descriptor.value
        // reduced-motion rerun 또는 unmount에서도 target의 original markup을 되돌린다
        return () => {
          phrase.innerHTML = originalHtml
        }
      }

      // one descriptor의 config form을 actual TextPlugin tween에 전달한다
      const tween = gsap.to(phrase, {
        duration: descriptor.duration,
        text: {
          value: descriptor.value,
          delimiter: descriptor.delimiter,
          padSpace: descriptor.padSpace,
          newClass: descriptor.newClass,
          oldClass: descriptor.oldClass,
          preserveSpaces: descriptor.preserveSpaces,
          rtl: descriptor.rtl,
          speed: descriptor.speed,
          type: descriptor.type,
        },
      })

      // rerun 또는 unmount에서 tween을 kill하고 exact original content/classes를 복원한다
      return () => {
        tween.kill()
        phrase.innerHTML = originalHtml
      }
    },
    // descriptor·reduced motion·replay 중 하나가 바뀔 때 context cleanup을 먼저 실행한다
    {
      scope,
      dependencies: [descriptor, reducedMotion, runKey],
      revertOnUpdate: true,
    },
  )

  // native replay button이 current descriptor의 replacement tween을 처음부터 실행한다
  const replay = () => setRunKey((key) => key + 1)

  // lab은 one target ref, controls, normalized descriptor, motion state와 replay action을 받는다
  return {
    scope,
    phraseRef,
    delimiterMode,
    setDelimiterMode,
    padSpace,
    setPadSpace,
    descriptor,
    reducedMotion,
    replay,
  }
}
