import { useRef } from 'react' // SVG, 텍스트, 상태 문구를 실제 DOM ref로 잡는다.
import gsap from 'gsap' // 여러 플러그인을 하나의 timeline으로 묶는다.
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin' // SVG path의 stroke 표시 구간을 tween한다.
import { MotionPathPlugin } from 'gsap/MotionPathPlugin' // 점을 SVG path 좌표를 따라 이동시킨다.
import { SplitText } from 'gsap/SplitText' // 헤드라인을 문자 단위로 나눠 stagger를 걸 수 있게 한다.
import { TextPlugin } from 'gsap/TextPlugin' // 상태 문구 자체를 단계적으로 교체한다.
import { useGSAP } from '@gsap/react' // SplitText revert와 timeline cleanup을 React lifecycle에 맞춘다.

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, SplitText, TextPlugin)

export function SvgTextMotionExample() {
  // 이 영역 안에서만 SVG와 텍스트 모션을 실행한다.
  const container = useRef<HTMLDivElement>(null)
  // DrawSVGPlugin이 stroke를 그릴 실제 path다.
  const path = useRef<SVGPathElement>(null)
  // MotionPathPlugin이 path 위로 움직일 점이다.
  const dot = useRef<SVGCircleElement>(null)
  // SplitText가 시각용 문자 span으로 나눌 헤드라인이다.
  const title = useRef<HTMLHeadingElement>(null)
  // TextPlugin이 읽을 수 있는 상태 문장으로 바꿀 대상이다.
  const status = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!path.current || !dot.current || !title.current || !status.current) return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // reduced motion에서는 시퀀스를 생략하지만 최종 텍스트와 라인은 유지한다.
        // 영향: 애니메이션 없이도 섹션의 의미를 그대로 읽을 수 있다.
        gsap.set(path.current, { drawSVG: '100%' })
        status.current.textContent = 'Brand system is ready.'
        return
      }

      const split = SplitText.create(title.current, {
        type: 'words,chars', // 단어/문자 배열을 만들어 헤드라인 강조를 세밀하게 제어한다.
        wordsClass: 'svg-text-motion__word',
        charsClass: 'svg-text-motion__char',
        aria: 'auto', // 시각용 분할 DOM을 만들면서 스크린리더용 원문을 유지한다.
      })

      gsap.set(path.current, { drawSVG: '0%' })
      gsap.set(dot.current, { autoAlpha: 0 })

      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

      timeline
        .to(path.current, {
          drawSVG: '100%', // 브랜드 라인을 처음부터 끝까지 그리며 섹션의 시선을 만든다.
          duration: 1.1,
        })
        .to(
          dot.current,
          {
            autoAlpha: 1,
            motionPath: {
              path: path.current, // 방금 그린 path를 같은 좌표계의 이동 경로로 재사용한다.
              align: path.current,
              alignOrigin: [0.5, 0.5],
            },
            duration: 1.1,
            ease: 'none',
          },
          '<',
        )
        .from(
          split.chars,
          {
            yPercent: 120, // 각 문자가 아래에서 올라오며 제목을 읽는 순서를 만든다.
            opacity: 0,
            duration: 0.42,
            stagger: 0.025,
            ease: 'back.out(1.7)',
          },
          '-=0.35',
        )
        .to(status.current, {
          text: {
            value: 'Brand system is ready.', // 시퀀스 마지막 상태를 문장으로 명확히 알려준다.
            delimiter: ' ',
            preserveSpaces: true,
          },
          duration: 0.9,
          ease: 'none',
        })

      return () => {
        split.revert()
      }
    },
    { scope: container },
  )

  return (
    <section ref={container} className="svg-text-motion" aria-label="SVG and text motion section">
      <svg className="svg-text-motion__mark" viewBox="0 0 360 160" role="img" aria-label="Motion path brand line">
        <path ref={path} d="M24 112 C72 24 136 24 176 92 S282 148 336 42" />
        <circle ref={dot} r="7" />
      </svg>
      <div className="svg-text-motion__content">
        <span>Motion Brand</span>
        <h3 ref={title}>Shape every interaction</h3>
        <p ref={status}>Drawing brand system...</p>
      </div>
    </section>
  )
}
