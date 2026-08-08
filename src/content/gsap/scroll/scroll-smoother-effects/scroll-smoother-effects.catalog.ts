/** P37이 소유한 세 canonical을 item-level coverage 기준으로 고정한다. */
export const scrollSmootherEffectsCatalog = [
  {
    id: 'SMOOTHER-144',
    officialItem:
      'effects() applies speed/lag effects, discovers data attributes, returns/manages effect ScrollTriggers, refreshes dynamic values, and supports removal.',
    sectionId: 'effects-lifecycle',
  },
  {
    id: 'SMOOTHER-149',
    officialItem:
      'progress is overall page scroll from top 0 through halfway 0.5 to bottom 1 and animates until onStop during smoothing.',
    sectionId: 'native-rendered-boundary',
  },
  {
    id: 'SMOOTHER-153',
    officialItem:
      'smooth() gets or sets catch-up seconds; rendered return wording, installed type, and current source return differ.',
    sectionId: 'setup',
  },
] as const
