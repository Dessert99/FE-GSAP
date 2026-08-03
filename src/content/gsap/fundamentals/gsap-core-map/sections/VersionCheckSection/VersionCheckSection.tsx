/** gsap.version의 문자열 타입과 현재 로드된 package를 확인하는 쓰임을 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const versionCode = `import { gsap } from 'gsap'

console.log(gsap.version)
// "3.15.0" 같은 String — 실제 값은 지금 로드된 package를 따릅니다.`

export function VersionCheckSection() {
  return (
    <section id="version-check" className="core-map-page__section" aria-labelledby="version-check-title">
      <SectionHeading number="05" id="version-check" title="로드된 버전 확인하기" description="문서의 예시 숫자를 최신 버전으로 외우지 않고, 현재 실행 환경이 실제로 불러온 버전을 확인합니다." />
      <div className="core-map-page__split">
        <div className="core-map-page__prose">
          <p><code>gsap.version</code>은 현재 사용 중인 GSAP 버전을 나타내는 <code>String</code> property입니다.</p>
          <p>공식 문서에 보이는 버전 숫자는 문자열 형식의 예시입니다. package 충돌이나 문서와 실행 결과가 다른 상황을 조사할 때는 고정 숫자 대신 이 property를 읽습니다.</p>
        </div>
        <pre className="core-map-page__code"><code>{versionCode}</code></pre>
      </div>
    </section>
  )
}
