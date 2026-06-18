import { useRef } from 'react' // canvas와 내부 scroller를 직접 제어하기 위해 ref를 둔다.
import gsap from 'gsap' // frame 객체를 스크롤 진행률에 맞춰 tween한다.
import { ScrollTrigger } from 'gsap/ScrollTrigger' // 내부 스크롤 박스의 위치를 canvas frame에 연결한다.
import { useGSAP } from '@gsap/react' // ScrollTrigger와 tween을 실습 생명주기에 맞춰 정리한다.

gsap.registerPlugin(ScrollTrigger) // scrollTrigger 설정을 사용할 수 있게 공식 플러그인을 등록한다.

const frameCount = 28

function drawFrame(canvas: HTMLCanvasElement, frame: number) {
  const context = canvas.getContext('2d')
  if (!context) return

  const width = canvas.width
  const height = canvas.height
  const progress = frame / (frameCount - 1)

  context.clearRect(0, 0, width, height)
  context.fillStyle = '#0f172a'
  context.fillRect(0, 0, width, height)

  context.fillStyle = '#1e293b'
  context.fillRect(42, 38, width - 84, height - 76)

  context.save()
  context.translate(width / 2, height / 2)
  context.rotate(progress * Math.PI * 2)
  context.fillStyle = '#38bdf8'
  context.fillRect(-58, -34, 116, 68)
  context.fillStyle = '#22c55e'
  context.fillRect(22, -24, 44, 48)
  context.restore()

  context.fillStyle = '#94a3b8'
  context.font = '14px ui-monospace, SF Mono, Menlo, monospace'
  context.fillText(`frame ${String(frame + 1).padStart(2, '0')} / ${frameCount}`, 24, height - 22)
}

export function ImageSequenceCanvasExample() {
  // ScrollTrigger의 scroller로 쓸 내부 박스다.
  const container = useRef<HTMLDivElement>(null)
  // 실제 제품 프레임이 그려지는 target이다.
  const canvas = useRef<HTMLCanvasElement>(null)

  useGSAP(
    () => {
      if (!container.current || !canvas.current) return

      const frame = { value: 0 }

      // 첫 렌더링에서 빈 canvas가 보이지 않도록 0번 프레임을 먼저 그린다.
      // 영향: 이미지 로딩 전후를 다루는 실무 코드처럼 시작 화면이 명확하다.
      drawFrame(canvas.current, 0)

      gsap.to(frame, {
        value: frameCount - 1,
        ease: 'none',
        snap: { value: 1 }, // 중간 소수 프레임이 아니라 실제 이미지 index처럼 정수 frame만 사용한다.
        onUpdate: () => {
          if (canvas.current) drawFrame(canvas.current, frame.value)
        },
        scrollTrigger: {
          trigger: '.image-sequence__steps',
          scroller: container.current,
          start: 'top 74%',
          end: 'bottom 28%',
          scrub: true,
        },
      })

      ScrollTrigger.refresh()
    },
    { scope: container },
  )

  return (
    <div ref={container} className="image-sequence" aria-label="Canvas image sequence practice">
      <div className="image-sequence__sticky">
        <canvas ref={canvas} className="image-sequence__canvas" width="420" height="280" />
      </div>
      <div className="image-sequence__steps">
        <p>Scroll inside this panel to rotate the product frame.</p>
        <p>In production, preload image frames and draw the active frame into the same canvas.</p>
        <p>Cleanup matters because stale ScrollTriggers keep writing to an old canvas after route changes.</p>
      </div>
    </div>
  )
}
