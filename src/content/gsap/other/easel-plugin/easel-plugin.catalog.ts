/** P10 Easel canonical의 특수 property·stage·dependency 기술 item을 고정한다. */
export type EaselSourceItem = {
  id: string
  officialItem: string
  sectionId: string
}
export const easelSourceItems: EaselSourceItem[] = [
  {
    id: 'EASEL-01',
    officialItem:
      'EaselPlugin은 EaselJS ColorFilter/ColorMatrixFilter 관련 saturation, contrast, tint, colorize, brightness, exposure, hue를 tween한다.',
    sectionId: 'display-object-target',
  },
  {
    id: 'EASEL-02',
    officialItem:
      'x와 y 같은 일반 numeric EaselJS property에는 plugin이 필요 없고 special filter/effect에 필요하다.',
    sectionId: 'dom-canvas-boundary',
  },
  {
    id: 'EASEL-03',
    officialItem:
      'plugin은 ColorFilter/ColorMatrixFilter special property와 MovieClip frame만 현재 처리한다.',
    sectionId: 'display-object-target',
  },
  {
    id: 'EASEL-04',
    officialItem:
      'tint, tintAmount, exposure, brightness는 ColorFilter convenience property다.',
    sectionId: 'easel-vars',
  },
  {
    id: 'EASEL-05',
    officialItem:
      'saturation, hue, contrast, colorize, colorizeAmount는 ColorMatrixFilter convenience property다.',
    sectionId: 'easel-vars',
  },
  {
    id: 'EASEL-06',
    officialItem:
      '특수 property는 easel: {} object 안에 감싸야 하며 ColorFilter/ColorMatrixFilter 파일도 load해야 한다.',
    sectionId: 'dependency-cleanup',
  },
  {
    id: 'EASEL-07',
    officialItem:
      'ColorFilter가 동작하려면 target을 cache()해야 하며 individual colorFilter property도 tween할 수 있다.',
    sectionId: 'easel-vars',
  },
  {
    id: 'EASEL-08',
    officialItem:
      'exposure와 brightness는 0~2이며 1 normal, 2 white overexposed, 0 black underexposed다.',
    sectionId: 'easel-vars',
  },
  {
    id: 'EASEL-09',
    officialItem:
      '등록 뒤 gsap.ticker.add(() => stage.update())로 매 tick canvas stage를 draw하고 cleanup에서 ticker callback을 제거한다.',
    sectionId: 'stage-draw-sequence',
  },
]
