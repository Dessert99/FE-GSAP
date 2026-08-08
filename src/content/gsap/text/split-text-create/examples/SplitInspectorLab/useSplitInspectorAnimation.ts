/** SplitText instance-derived arrays와 optional stagger를 lifecycle 안에서 만든다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

// inspector가 실제 instance에서 읽어 표시할 DOM snapshot 형태다.
type SplitSnapshot = {
  chars: number
  words: number
  lines: number
  masks: number
  ariaLabel: string | null
  tree: string[]
}

/** mask만 바꿔도 create vars, DOM tree, code panel이 함께 달라지는 descriptor다. */
export function createSplitDescriptor(mask: 'lines' | 'words') {
  return {
    type: 'lines,words,chars',
    mask,
    aria: 'auto' as const,
    autoSplit: true,
    linesClass: 'split-line',
    wordsClass: 'split-word',
    charsClass: 'split-char',
  }
}

// browser DOM에서 SplitText instance를 사용할 수 있게 plugin을 등록한다.
gsap.registerPlugin(SplitText)

/** fonts와 layout이 안정된 뒤 one sentence를 split하고 snapshot을 갱신한다. */
export function useSplitInspectorAnimation() {
  // useGSAP cleanup을 문장과 generated wrapper가 있는 lab으로 제한한다.
  const scope = useRef<HTMLDivElement>(null)
  // SplitText가 직접 바꿀 semantic heading element다.
  const sentenceRef = useRef<HTMLHeadingElement>(null)
  // unmount와 descriptor 변경에서 original HTML로 돌릴 instance다.
  const splitRef = useRef<SplitText | null>(null)
  // one descriptor가 선택할 clipping wrapper type이다.
  const [mask, setMask] = useState<'lines' | 'words'>('lines')
  // 같은 config에서도 explicit rebuild control을 제공한다.
  const [revision, setRevision] = useState(0)
  // generated DOM의 sparse counts와 first wrapper tree를 화면에 보인다.
  const [snapshot, setSnapshot] = useState<SplitSnapshot | null>(null)
  // reduced preference에서는 onSplit stagger를 만들지 않는다.
  const reducedMotion = useReducedMotion()
  // vars, actual create call, inspector와 code panel이 공유하는 config다.
  const descriptor = createSplitDescriptor(mask)

  useGSAP(
    () => {
      // async font readiness 뒤 unmounted lab을 다시 split하지 않게 하는 flag다.
      let active = true
      // current SplitText instance와 autoSplit listener를 원래 문장으로 복구한다.
      const dispose = () => {
        splitRef.current?.revert()
        splitRef.current = null
      }
      // instance arrays에서 실제 wrapper tag/class와 count를 추출한다.
      const inspect = (split: SplitText) => {
        // 각 collection의 first element를 DOM tree line으로 읽는다.
        const nodeLine = (label: string, element: Element | undefined) =>
          element
            ? `${label}: <${element.tagName.toLowerCase()} class="${element.className}">`
            : `${label}: none`
        // aria와 generated collections를 React state로 복사한다.
        setSnapshot({
          chars: split.chars.length,
          words: split.words.length,
          lines: split.lines.length,
          masks: split.masks.length,
          ariaLabel: sentenceRef.current?.getAttribute('aria-label') ?? null,
          tree: [
            `heading: <${sentenceRef.current?.tagName.toLowerCase()} aria-label>`,
            nodeLine('masks[0]', split.masks[0]),
            nodeLine('lines[0]', split.lines[0]),
            nodeLine('words[0]', split.words[0]),
            nodeLine('chars[0]', split.chars[0]),
          ],
        })
      }
      // fonts와 layout을 기다린 다음 autoSplit instance를 만든다.
      const setup = async () => {
        // line measurement 전에 document font loading이 끝날 때까지 기다린다.
        await document.fonts?.ready
        // cleanup 이후에는 target을 다시 바꾸지 않는다.
        const sentence = sentenceRef.current
        if (!active || !sentence) return
        // onSplit은 autoSplit의 새 arrays에서 inspector와 optional animation을 함께 갱신한다.
        const split = SplitText.create(sentence, {
          ...descriptor,
          onSplit: (self) => {
            inspect(self)
            if (reducedMotion) return undefined
            return gsap.from(self.chars, {
              yPercent: 100,
              autoAlpha: 0,
              duration: 0.35,
              stagger: 0.025,
            })
          },
        })
        splitRef.current = split
      }

      void setup()

      // descriptor, revision, motion preference 중 하나가 바뀌면 instance를 restore한다.
      return () => {
        active = false
        dispose()
      }
    },
    // mask/rebuild/motion 모두 fresh split DOM과 stagger policy를 다시 만든다.
    {
      scope,
      dependencies: [descriptor.mask, revision, reducedMotion],
      revertOnUpdate: true,
    },
  )

  // mask control은 descriptor input 하나만 변경한다.
  const selectMask = (nextMask: 'lines' | 'words') => setMask(nextMask)
  // rebuild control은 same descriptor로 fonts/layout-ready create lifecycle을 다시 실행한다.
  const rebuild = () => setRevision((value) => value + 1)

  // display layer에는 descriptor, actual instance snapshot과 controls만 제공한다.
  return {
    scope,
    sentenceRef,
    descriptor,
    snapshot,
    reducedMotion,
    selectMask,
    rebuild,
  }
}
