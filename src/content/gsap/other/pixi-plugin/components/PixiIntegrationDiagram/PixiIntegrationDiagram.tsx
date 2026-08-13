/** PixiJS 없는 현재 환경에서 descriptor-derived integration과 cleanup ownership을 보인다. */
import { pixiIntegrationDescriptor } from '../../pixi-plugin.descriptor'
import './PixiIntegrationDiagram.css'

// 한 descriptor를 실제 Pixi integration에서 사용할 코드 형태로만 직렬화한다.
const integrationCode = `import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

async function setupPixi() {
  const app = new PIXI.Application()
  await app.init({ width: 320, height: 180, backgroundAlpha: 0 })
  document.body.appendChild(app.canvas)

  const source = new PIXI.Graphics().circle(24, 24, 24).fill('#7c3aed')
  const texture = app.renderer.generateTexture(source)
  source.destroy()
  const sprite = new PIXI.Sprite(texture)
  app.stage.addChild(sprite)
  const tween = gsap.to(sprite, {
    duration: ${pixiIntegrationDescriptor.duration},
    pixi: ${JSON.stringify(pixiIntegrationDescriptor.vars, null, 2)},
  })

  return () => {
    ${pixiIntegrationDescriptor.cleanup.join('\n    ')}
  }
}

const cleanupPixi = await setupPixi()

// application teardown에서 호출합니다.
function teardownApp() {
  cleanupPixi()
}`

/** namespace → display object → GSAP update → Pixi renderer → owned cleanup을 설명한다. */
export function PixiIntegrationDiagram() {
  return (
    <figure className="pixi-integration-diagram">
      <figcaption>
        아래 코드는 PixiJS가 있는 프로젝트에 적용할 정적 integration
        흐름입니다.
      </figcaption>
      <ol>
        <li>
          <strong>1. namespace</strong>
          <span>
            <code>gsap.registerPlugin(PixiPlugin)</code> 뒤{' '}
            <code>PixiPlugin.registerPIXI(PIXI)</code>를 한 번 호출합니다.
          </span>
        </li>
        <li>
          <strong>2. display object</strong>
          <span>
            Pixi application이 만든{' '}
            <code>{pixiIntegrationDescriptor.target}</code> 를 tween target으로
            둡니다.
          </span>
        </li>
        <li>
          <strong>3. GSAP update</strong>
          <span>
            <code>pixi</code> vars가 position·scale·skew·anchor·pivot·색·filter
            로 번역됩니다.
          </span>
        </li>
        <li>
          <strong>4. renderer update</strong>
          <span>
            Pixi application의 renderer/ticker가 변경된 display object를
            그립니다. PixiPlugin source에는 renderer를 호출하는 단계가 없습니다.
          </span>
        </li>
        <li>
          <strong>5. cleanup</strong>
          <span>
            component가 만든 tween을 kill하고, <code>destroy(true, true)</code>로
            자신이 만든 app·child resource·canvas를 함께 정리합니다.
          </span>
        </li>
      </ol>
      <pre>
        <code>{integrationCode}</code>
      </pre>
      <p>
        이 코드는 현재 PixiJS v8 lifecycle을 기준으로 하며 이 화면에서는 실행하지
        않습니다. 다른 major version에 적용할 때는 <code>init()</code>과{' '}
        <code>destroy()</code> signature를 다시 확인하세요.
      </p>
    </figure>
  )
}
