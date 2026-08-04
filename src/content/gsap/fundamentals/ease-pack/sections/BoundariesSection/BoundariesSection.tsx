/** 이 페이지가 소유하지 않는 내용과 공식 페이지에 아예 없는 내용을 갈라 다음 학습으로 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 ExpoScaleEase 페이지가 제공하지만 여기서 재현하지 않는 자료
const officialMedia = [
  { label: 'ExpoScaleEase · Video Explanation과 Simple·Complex Demo', href: 'https://gsap.com/docs/v3/Eases/ExpoScaleEase' },
]

// 세 공식 페이지 어디에도 게시되지 않아 이 페이지가 주장하지 않는 것들
const notPublished = [
  '형식 signature, 인자 표, 반환값 절 — 세 페이지 모두 산문과 예제로만 설명한다',
  'ExpoScaleEase의 시작·끝 scale 기본값 — 반드시 넘기라고만 적혀 있다',
  'RoughEase의 points·strength 허용 범위 — 기본값과 예시 숫자만 있다',
  'SlowMo power의 허용 범위 — 1보다 크면 가운데가 뒤집힌다는 설명만 있다',
  '브라우저·버전 지원 표, 성능 비교, ease끼리 조합하는 방법',
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="ease-pack-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="세 공식 페이지의 내용은 여기까지입니다. 나머지는 어느 페이지가 소유하는지, 공식 문서에 아예 없는 것은 무엇인지 갈라 둡니다."
      />

      <div className="ease-pack-page__split">
        <div className="ease-pack-page__prose">
          <h3>다른 페이지가 소유합니다</h3>
          <ul className="ease-pack-page__list">
            <li>
              ease의 기본 개념, Core ease family, 문자열 해석과 이름 등록 — <a href={toHref('/fundamentals/easing')}>Easing 페이지</a>
            </li>
            <li>
              설치 방법과 <code>gsap.registerPlugin()</code>의 일반 규칙 —{' '}
              <a href={toHref('/fundamentals/installation')}>설치와 등록 페이지</a>
            </li>
            <li>
              <code>duration</code>·<code>ease</code>가 vars의 어디에 오는지 —{' '}
              <a href={toHref('/fundamentals/tween-configuration')}>설정은 어디서 오나 페이지</a>
            </li>
            <li>
              <code>gsap.to()</code>·<code>gsap.from()</code>·<code>gsap.fromTo()</code>의 시작·끝 값 계약 —{' '}
              <a href={toHref('/fundamentals/tween-start-end-values')}>Tween 시작·끝 값 페이지</a>
            </li>
          </ul>
        </div>
        <div className="ease-pack-page__prose">
          <h3>공식 페이지에 명시가 없습니다</h3>
          <ul className="ease-pack-page__list">
            {notPublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ease-pack-page__note">
        <h3>공식 페이지가 제공하지만 여기서 재현하지 않은 자료</h3>
        <p>
          ExpoScaleEase 공식 페이지에는 영상 설명(Walkthrough)과 두 개의 embedded demo(Simple Demo, Complex Demo)가 있습니다. 이
          페이지는 그 데모를 복제하지 않고 위 예제로 같은 원리를 확인하게 했습니다. 원본은 아래 링크에서 볼 수 있습니다.
        </p>
        <div className="ease-pack-page__official-links">
          {officialMedia.map((media) => (
            <OfficialDocsLink key={media.href} {...media} />
          ))}
        </div>
      </div>
    </section>
  )
}
