/** plugin registration과 active PIXI namespace가 만나는 순서를 설명한다. */
import { PixiIntegrationDiagram } from '../../components/PixiIntegrationDiagram/PixiIntegrationDiagram'

/** ES module namespace를 PixiPlugin에 전달해야 하는 이유를 가르친다. */
export function SetupSection() {
  return (
    <section id="pixi-setup">
      <h2>01 · plugin과 PixiJS namespace를 모두 등록합니다</h2>
      <p>
        PixiPlugin은 GSAP에 등록하고, 이어서 active <code>PIXI</code>{' '}
        namespace를 전달해야 Pixi class와 filter를 찾을 수 있습니다. 전역{' '}
        <code>window.PIXI</code>가 없는 build/ES module 환경에서는{' '}
        <code>registerPIXI()</code>가 그 참조를 제공합니다.
      </p>
      <p>
        전체 PixiJS namespace를 import하면 그대로 전달합니다. 개별 module을
        전달할 때는 <code>Container</code>가 필수이고 textured object에는{' '}
        <code>Sprite</code>, <code>ColorMatrixFilter</code> 또는{' '}
        <code>BlurFilter</code>를 tween할 때는 filters 관련 class가 필요합니다.
      </p>
      <PixiIntegrationDiagram />
    </section>
  )
}
