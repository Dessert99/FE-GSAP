/** translation과 rotation이 각자 legal min/max field를 가진다는 경계를 표로 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { draggableBoundsAxisProperties } from '../../draggable-bounds-axis.properties'

export function MinMaxSection() {
  return <section id="min-max" className="draggable-bounds-axis-page__section" aria-labelledby="min-max-title"><SectionHeading number="02" id="min-max" title="mode마다 min/max field가 달라집니다" description="x/y로 움직이면 minX·maxX·minY·maxY를 읽고, rotation bounds라면 minRotation·maxRotation을 읽습니다." /><div className="draggable-bounds-axis-page__table-wrap"><table><thead><tr><th>field</th><th>언제 읽나</th><th>의미</th></tr></thead><tbody>{draggableBoundsAxisProperties.slice(1, 3).map((item) => <tr key={item.name}><th><code>{item.name}</code></th><td>{item.timing}</td><td>{item.acceptedValues}<br />{item.caveat}</td></tr>)}</tbody></table></div><p className="draggable-bounds-axis-page__note">lab은 <code>type: "x,y"</code>이므로 translation 네 값을 inspector로 보여 줍니다. rotation 값은 같은 bounds 계산이 다른 mode에 노출하는 별도 field라서 여기서 실험 대상과 섞지 않습니다.</p></section>
}
