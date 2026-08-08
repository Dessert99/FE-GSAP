/** Draggable의 bounds·min/max·axis·layer·resync를 다섯 학습 섹션으로 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { PageCoverage } from './components/PageCoverage/PageCoverage'
import { AutoScrollLayerSection } from './sections/AutoScrollLayerSection/AutoScrollLayerSection'
import { AxisLockSection } from './sections/AxisLockSection/AxisLockSection'
import { BoundsMentalModelSection } from './sections/BoundsMentalModelSection/BoundsMentalModelSection'
import { MinMaxSection } from './sections/MinMaxSection/MinMaxSection'
import { ResyncSection } from './sections/ResyncSection/ResyncSection'
import { draggableBoundsAxisMeta } from './draggable-bounds-axis.meta'
import './DraggableBoundsAxisPage.css'

export function DraggableBoundsAxisPage() {
  return <article className="draggable-bounds-axis-page"><header className="draggable-bounds-axis-page__header"><p>{draggableBoundsAxisMeta.category}</p><h1>{draggableBoundsAxisMeta.title}</h1><p>{draggableBoundsAxisMeta.summary}</p><div>{draggableBoundsAxisMeta.officialSources.map((source) => <OfficialDocsLink key={source.href} {...source} />)}</div><code>{draggableBoundsAxisMeta.sourcePath}</code></header><PageCoverage /><BoundsMentalModelSection /><MinMaxSection /><AxisLockSection /><AutoScrollLayerSection /><ResyncSection /></article>
}
