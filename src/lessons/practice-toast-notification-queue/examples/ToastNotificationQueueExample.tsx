import { useEffect, useRef, useState } from 'react' // toast 배열과 자동 제거 타이머를 관리한다.
import gsap from 'gsap' // toast enter/exit와 stack 재배치를 만든다.
import { useGSAP } from '@gsap/react' // 버튼 핸들러의 tween을 scope cleanup에 묶는다.

type Toast = {
  id: number
  message: string
}

const messages = ['Saved draft', 'Upload finished', 'Invite copied', 'Sync complete']

export function ToastNotificationQueueExample() {
  const container = useRef<HTMLDivElement>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)
  const timers = useRef(new Map<number, number>())
  const previousToastIds = useRef<Set<number>>(new Set())
  const { contextSafe } = useGSAP({ scope: container })

  const removeToast = contextSafe((id: number) => {
    const toast = container.current?.querySelector<HTMLElement>(`[data-toast-id="${id}"]`)
    const timer = timers.current.get(id)

    if (timer) {
      window.clearTimeout(timer)
      timers.current.delete(id)
    }

    if (!toast) {
      setToasts((current) => current.filter((item) => item.id !== id))
      return
    }

    // exit가 끝난 뒤 배열에서 제거한다.
    // 영향: 알림이 갑자기 사라지지 않고, 남은 알림은 React가 다시 배치한다.
    gsap.killTweensOf(toast)
    gsap.to(toast, {
      autoAlpha: 0,
      x: 28,
      height: 0,
      marginTop: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => setToasts((current) => current.filter((item) => item.id !== id)),
    })
  })

  const addToast = contextSafe(() => {
    const id = nextId.current
    nextId.current += 1

    setToasts((current) => [{ id, message: messages[id % messages.length] }, ...current])
    timers.current.set(id, window.setTimeout(() => removeToast(id), 2600))
  })

  useEffect(() => {
    const previousIds = previousToastIds.current
    const addedToast = toasts.find((toast) => !previousIds.has(toast.id))
    const latest = addedToast ? container.current?.querySelector<HTMLElement>(`[data-toast-id="${addedToast.id}"]`) : null
    const items = container.current?.querySelectorAll<HTMLElement>('.toast-queue__item')

    if (latest) {
      gsap.fromTo(latest, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power2.out' })
    }

    if (items?.length) {
      gsap.to(items, { y: 0, duration: 0.18, stagger: 0.03, overwrite: true })
    }

    previousToastIds.current = new Set(toasts.map((toast) => toast.id))
  }, [toasts])

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer))
      timers.current.clear()
    }
  }, [])

  return (
    <div ref={container} className="toast-queue">
      <button type="button" className="demo-button" onClick={addToast}>
        push notification
      </button>
      <div className="toast-queue__stack" aria-live="polite" aria-label="Notification queue">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-queue__item" data-toast-id={toast.id}>
            <strong>{toast.message}</strong>
            <button type="button" onClick={() => removeToast(toast.id)} aria-label={`${toast.message} 닫기`}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
