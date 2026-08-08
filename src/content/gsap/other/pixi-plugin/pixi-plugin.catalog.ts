/** P30 canonical을 정확한 두 source item으로 추적한다. */
export const pixiPluginCatalog = [
  {
    id: 'PIXI-01',
    officialItem:
      'PixiPlugin registers with GSAP, maps PixiJS nested transforms, degree rotation, colors, ColorMatrixFilter and BlurFilter helpers, directional rotation, and other Pixi properties.',
    sectionId: 'pixi-properties',
  },
  {
    id: 'PIXI-02',
    officialItem:
      'PixiPlugin.registerPIXI(PIXI: Object) registers the PIXI namespace once; ES module partial namespaces require Container and optionally Sprite and filters.',
    sectionId: 'pixi-setup',
  },
] as const
