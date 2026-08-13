/** PixiPlugin의 namespace, vars, renderer boundary를 페이지 단위로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { pixiPluginMeta } from './pixi-plugin.meta'
import { PropertiesSection } from './sections/PropertiesSection/PropertiesSection'
import { RendererSection } from './sections/RendererSection/RendererSection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import './PixiPluginPage.css'

/** PixiJS runtime 없이 PixiPlugin의 integration 경계를 설명하는 정적 페이지다. */
export function PixiPluginPage() {
  return (
    <article className="pixi-plugin-page">
      <header>
        <p>{pixiPluginMeta.category}</p>
        <h1>{pixiPluginMeta.title}</h1>
        <p>{pixiPluginMeta.summary}</p>
        {pixiPluginMeta.officialSources.map((source) => (
          <OfficialDocsLink key={source.href} {...source} />
        ))}
      </header>
      <SetupSection />
      <PropertiesSection />
      <RendererSection />
    </article>
  )
}
