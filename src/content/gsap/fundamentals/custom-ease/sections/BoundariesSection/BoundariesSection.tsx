/** CustomEase 문서에 없는 경계와 이어서 볼 주제를 구분해 안전한 사용 범위를 남긴다. */
import { toHref } from '../../../../../../app/routes'
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 동작을 명시하지 않아 추측하지 말아야 할 사용 경계다
const unspecifiedBoundaries = [
  '잘못된 path 문자열을 넘겼을 때 어떻게 되는지',
  '만든 ease를 지우거나 다시 정의하는 방법',
  '브라우저·버전 지원 표',
]

// 이 페이지에서 전제로만 쓴 개념을 이어서 학습할 로컬 경로다
const relatedTopics = [
  { label: 'ease의 의미와 문자열 이름 해석', href: '/fundamentals/easing' },
  { label: '설치 방법과 registerPlugin()', href: '/fundamentals/installation' },
  { label: 'gsap.to()의 target과 vars', href: '/fundamentals/gsap-to' },
  { label: 'progress()와 재생 헤드', href: '/fundamentals/tween-playhead' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="custom-ease-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="사용 전에 남은 경계 확인하기"
        description="문서가 동작을 명시하지 않은 영역은 추측하지 말고, 필요한 선행 개념은 연결된 페이지에서 이어서 확인합니다."
      />

      <div className="custom-ease-page__split">
        <div>
          <div className="custom-ease-page__subheading">
            <h3>동작을 단정하지 말아야 할 것</h3>
            <p>다음 항목은 CustomEase 문서에 세부 동작이 명시되지 않았습니다.</p>
          </div>
          <ul className="custom-ease-page__list">
            {unspecifiedBoundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="custom-ease-page__subheading">
            <h3>이어서 볼 주제</h3>
            <p>아래 개념이 낯설면 각 페이지에서 먼저 확인하세요.</p>
          </div>
          <ul className="custom-ease-page__list">
            {relatedTopics.map((topic) => (
              <li key={topic.href}>
                <a href={toHref(topic.href)}>{topic.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="custom-ease-page__note">
        <h3>공식 페이지가 함께 걸어 둔 자료</h3>
        <p>
          CustomEase 문서의 <strong>Demos</strong>에서 완성된 예제를 보고, <strong>Videos</strong>의 Overview와 Using CustomEase in a
          project에서 실제 프로젝트 적용 과정을 이어서 볼 수 있습니다.
        </p>
      </div>

      <div className="custom-ease-page__official-links">
        <OfficialDocsLink label="CustomEase 공식 문서" href="https://gsap.com/docs/v3/Eases/CustomEase/" />
      </div>
    </section>
  )
}
