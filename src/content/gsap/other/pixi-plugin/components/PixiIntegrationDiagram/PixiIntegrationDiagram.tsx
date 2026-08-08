/** PixiJS 없는 현재 환경에서 descriptor-derived integration과 cleanup ownership을 보인다. */
import { pixiIntegrationDescriptor } from '../../pixi-plugin.descriptor'
import './PixiIntegrationDiagram.css'

// 한 descriptor를 실제 Pixi integration에서 사용할 코드 형태로만 직렬화한다.
const integrationCode = `import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

const app = new PIXI.Application()
const sprite = new PIXI.Sprite(texture)
const tween = gsap.to(sprite, {
  duration: ${pixiIntegrationDescriptor.duration},
  pixi: ${JSON.stringify(pixiIntegrationDescriptor.vars, null, 2)},
})

// component cleanup owns only this tween and this Pixi application.
${pixiIntegrationDescriptor.cleanup.join('\n')}`

/** namespace → display object → GSAP update → Pixi renderer → owned cleanup을 설명한다. */
export function PixiIntegrationDiagram() {
  return (
    <figure className="pixi-integration-diagram">
      <figcaption>
        이 저장소에는 PixiJS가 없어서 아래 흐름은 실행하지 않는 integration
        blueprint입니다.
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
            component가 만든 tween을 kill하고, 자신이 만든 app을 destroy하며, 그
            app이 붙인 canvas를 함께 정리합니다.
          </span>
        </li>
      </ol>
      <pre>
        <code>{integrationCode}</code>
      </pre>
      <p>
        위 <code>app.destroy()</code>의 구체적인 옵션은 사용하는 PixiJS 버전과
        app 생성 방식이 결정합니다. 이 페이지는 PixiJS dependency나 fake sprite,
        canvas를 만들지 않으므로 실행 결과를 주장하지 않습니다.
      </p>
    </figure>
  )
}
