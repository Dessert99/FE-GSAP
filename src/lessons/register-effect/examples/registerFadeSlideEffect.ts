import gsap from 'gsap' // GSAP 코어 — registerEffect와 effect 내부 tween을 제공한다

type FadeSlideConfig = {
  y: number // 시작 y 오프셋
  duration: number // 각 대상이 등장하는 시간
  stagger: number // 대상 사이의 시작 간격
}

let isRegistered = false // replay로 예제가 remount되어도 effect를 중복 등록하지 않기 위한 가드

export function registerFadeSlideEffect() {
  if (isRegistered) return

  gsap.registerEffect({
    name: 'fadeSlideIn', // gsap.effects.fadeSlideIn 또는 timeline.fadeSlideIn으로 호출할 이름
    defaults: {
      y: 24, // 호출자가 값을 안 넘겼을 때의 시작 y 오프셋
      duration: 0.45, // 호출자가 값을 안 넘겼을 때의 기본 duration
      stagger: 0.08, // 호출자가 값을 안 넘겼을 때의 기본 stagger
    },
    effect: (targets: gsap.TweenTarget, config: FadeSlideConfig) => {
      // effect는 tween이나 timeline을 반환한다. 반환값이 timeline에 삽입되는 재사용 단위가 된다.
      return gsap.from(targets, {
        y: config.y, // effect config로 받은 시작 y 오프셋
        opacity: 0, // fade와 slide를 함께 묶은 재사용 동작
        duration: config.duration, // effect config로 받은 실행 시간
        stagger: config.stagger, // effect config로 받은 대상 간격
        ease: 'power2.out', // 일반적인 UI 진입에 쓰기 좋은 감속
      })
    },
    extendTimeline: true, // timeline.fadeSlideIn(...) 형태로도 호출할 수 있게 한다
  })

  isRegistered = true
}
