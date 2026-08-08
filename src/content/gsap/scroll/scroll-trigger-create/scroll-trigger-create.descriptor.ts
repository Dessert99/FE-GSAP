/** local scroller와 코드 패널이 함께 쓰는 ScrollTrigger 생성 값을 고정한다. */
export type ScrollTriggerConstructionDescriptor = {
  start: string
  end: string
  toggleActions: string
  scrub: boolean
  pin: boolean
  snap: false
  markers: true
  defaults: {
    toggleActions: string
  }
  config: {
    limitCallbacks: true
  }
}

/** 모션 감소에서는 native local scroll은 유지하고 scrub·pin 이동만 끈다. */
export function getScrollTriggerConstructionDescriptor(
  reducedMotion: boolean,
): ScrollTriggerConstructionDescriptor {
  return {
    start: 'top 70%',
    end: 'bottom 30%',
    toggleActions: 'play pause resume reset',
    scrub: !reducedMotion,
    pin: !reducedMotion,
    snap: false,
    markers: true,
    defaults: { toggleActions: 'play none none none' },
    config: { limitCallbacks: true },
  }
}
