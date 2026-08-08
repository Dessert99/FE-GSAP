/** PixiPlugin의 namespace, vars, renderer boundary를 페이지 단위로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { pixiPluginMeta } from './pixi-plugin.meta'
import { PropertiesSection } from './sections/PropertiesSection/PropertiesSection'
import { RendererSection } from './sections/RendererSection/RendererSection'
import { SetupSection } from './sections/SetupSection/SetupSection'
import './PixiPluginPage.css'

/** P30은 PixiJS가 없는 환경에서 실행 경계까지 가르치는 정적 integration page다. */
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
        <p>
          <code>{pixiPluginMeta.sourcePath}</code> · 공식 대조일{' '}
          {pixiPluginMeta.reviewedAt}
        </p>
      </header>
      <SetupSection />
      <PropertiesSection />
      <RendererSection />
    </article>
  )
}
