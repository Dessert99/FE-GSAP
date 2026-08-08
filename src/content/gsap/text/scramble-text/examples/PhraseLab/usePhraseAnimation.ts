/** 하나의 normalized descriptor로 ScrambleText tween과 direct-final fallback을 실행한다. */
import { useGSAP } from '@gsap/react'
import { useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** chars selector가 허용하는 rendered canonical character set을 제한한다. */
export type CharacterSet = 'upperCase' | 'lowerCase' | 'XO'

/** phrase lab의 normalized plugin vars와 tween duration을 한데 둔다. */
export type PhraseDescriptor = {
  text: string
  chars: CharacterSet
  speed: number
  delimiter: ''
  revealDelay: number
  rightToLeft: boolean
  tweenLength: true
  newClass: string
  oldClass: string
  duration: number
}

// ScrambleText tween property가 gsap.to에서 인식되도록 plugin을 등록한다
gsap.registerPlugin(ScrambleTextPlugin)

/** phrase target의 tween·original markup·reduced-motion final text를 소유한다. */
export function usePhraseAnimation() {
  // useGSAP cleanup 범위와 target selector를 local lab DOM으로 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // plugin이 replace할 단 하나의 plain-text DOM node를 가리킨다
  const phraseRef = useRef<HTMLSpanElement>(null)
  // chars option을 descriptor와 code panel이 함께 읽도록 보관한다
  const [chars, setChars] = useState<CharacterSet>('upperCase')
  // reveal direction을 descriptor와 static phase strip이 함께 읽도록 보관한다
  const [rightToLeft, setRightToLeft] = useState(false)
  // replay 요청마다 같은 normalized config의 tween을 새로 만든다
  const [runKey, setRunKey] = useState(0)
  // OS motion preference를 actual direct-final branch로 읽는다
  const reducedMotion = useReducedMotion()
  // controls와 fixed option을 one ScrambleText config object로 정규화한다
  const descriptor = useMemo<PhraseDescriptor>(
    () => ({
      text: 'ACCESSIBLE FINAL MESSAGE',
      chars,
      speed: 0.4,
      delimiter: '',
      revealDelay: 0.35,
      rightToLeft,
      tweenLength: true,
      newClass: 'phrase-lab__new-text',
      oldClass: 'phrase-lab__old-text',
      duration: 1.4,
    }),
    [chars, rightToLeft],
  )

  // descriptor와 motion setting이 바뀔 때 original markup을 복원한 뒤 same phrase tween을 다시 만든다
  useGSAP(
    () => {
      // mounted target가 없으면 DOM content나 tween을 바꾸지 않는다
      const phrase = phraseRef.current
      if (!phrase) return undefined
      // cleanup이 class span까지 정확히 되돌릴 original markup을 보관한다
      const originalHtml = phrase.innerHTML

      // reduced-motion에서는 scramble intermediate 없이 final plain text를 바로 쓴다
      if (reducedMotion) {
        phrase.textContent = descriptor.text
        return () => {
          phrase.innerHTML = originalHtml
        }
      }

      // one descriptor의 plugin vars로 only this phrase target을 scramble한다
      const tween = gsap.to(phrase, {
        duration: descriptor.duration,
        scrambleText: {
          text: descriptor.text,
          chars: descriptor.chars,
          speed: descriptor.speed,
          delimiter: descriptor.delimiter,
          revealDelay: descriptor.revealDelay,
          rightToLeft: descriptor.rightToLeft,
          tweenLength: descriptor.tweenLength,
          newClass: descriptor.newClass,
          oldClass: descriptor.oldClass,
        },
      })

      // rerun 또는 unmount에서는 tween을 stop하고 original text/class markup을 복원한다
      return () => {
        tween.kill()
        phrase.innerHTML = originalHtml
      }
    },
    // descriptor·motion preference·replay가 바뀔 때 prior text mutation을 복원하고 다시 실행한다
    {
      scope,
      dependencies: [descriptor, reducedMotion, runKey],
      revertOnUpdate: true,
    },
  )

  // native replay button이 current descriptor의 tween을 처음부터 재생하게 한다
  const replay = () => setRunKey((key) => key + 1)

  // lab은 one target ref, controls, descriptor, actual motion preference와 replay action을 받는다
  return {
    scope,
    phraseRef,
    chars,
    setChars,
    rightToLeft,
    setRightToLeft,
    descriptor,
    reducedMotion,
    replay,
  }
}
