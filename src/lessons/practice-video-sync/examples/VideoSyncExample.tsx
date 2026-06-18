import { useRef, useState } from 'react' // 진행률 표시와 GSAP target ref를 관리한다.
import gsap from 'gsap' // timeline progress를 영상 시간처럼 갱신한다.
import { useGSAP } from '@gsap/react' // 버튼에서 실행하는 timeline도 cleanup 대상에 묶는다.

const duration = 8

export function VideoSyncExample() {
  // 실무에서는 이 ref로 실제 video.currentTime을 갱신한다.
  const video = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const marker = useRef<HTMLSpanElement>(null)
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const [time, setTime] = useState(0)
  const { contextSafe } = useGSAP(
    () => {
      if (!video.current || !bar.current || !marker.current) return

      const state = { currentTime: 0 }

      timeline.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'none' },
          onUpdate: () => {
            const current = state.currentTime
            const progress = current / duration

            // 실제 영상에서는 여기서 videoElement.currentTime = current를 실행한다.
            // 영향: timeline, progress bar, 영상 seek 위치가 서로 다른 상태로 흩어지지 않는다.
            setTime(Number(current.toFixed(1)))
            gsap.set(bar.current, { scaleX: progress })
            gsap.set(marker.current, { xPercent: progress * 100 })
          },
        })
        .to(state, { currentTime: duration, duration })

      return () => {
        timeline.current?.kill()
        timeline.current = null
      }
    },
    { scope: video },
  )

  const play = contextSafe(() => {
    timeline.current?.play()
  })

  const pause = contextSafe(() => {
    timeline.current?.pause()
  })

  const seek = contextSafe((progress: number) => {
    timeline.current?.pause().progress(progress)
  })

  return (
    <div className="video-sync">
      <div ref={video} className="video-sync__screen" aria-label="Synced video preview">
        <span ref={marker} className="video-sync__marker" />
        <strong>{time.toFixed(1)}s</strong>
      </div>
      <div className="video-sync__progress" aria-hidden="true">
        <span ref={bar} />
      </div>
      <div className="demo-actions">
        <button type="button" className="demo-button" onClick={play}>
          play timeline
        </button>
        <button type="button" className="demo-button" onClick={pause}>
          pause
        </button>
        <button type="button" className="demo-button" onClick={() => seek(0.25)}>
          25%
        </button>
        <button type="button" className="demo-button" onClick={() => seek(0.75)}>
          75%
        </button>
      </div>
    </div>
  )
}
