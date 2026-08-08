/** comma-list property set과 unit type을 연결한다. */
import { velocityTrackerLifecycleProperties } from '../../velocity-tracker-lifecycle.properties'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
/** 한 target에서 x와 rotation이 서로 다른 unit을 갖는 이유를 설명한다. */
export function PropertySetSection() {
  return (
    <section>
      <SectionHeading number="02" title="choose property set" />
      <p>
        이 lab은 하나의 target에서 <code>'x,rotation'</code> comma-list를
        선택합니다. 같은 순서의 <code>'num,deg'</code> type list가 px와 deg의
        해석을 맞춥니다.
      </p>
      <p>
        rendered <code>track()</code> 문서는 tracker 반환을 설명하고, current
        raw/type은 여러 target을 지원하는 tracker array를 반환합니다. 이 lab은
        target 하나만 쓰므로
        <code>const [tracker]</code>로 첫 instance를 받습니다.
      </p>
      <dl>
        {velocityTrackerLifecycleProperties.map((property) => (
          <div key={property.name}>
            <dt>
              <code>{property.name}</code>
            </dt>
            <dd>
              {property.trackerType} · {property.unit} · {property.use}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
