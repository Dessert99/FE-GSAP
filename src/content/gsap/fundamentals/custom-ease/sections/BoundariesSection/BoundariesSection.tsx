/** 공식 CustomEase 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 CustomEase 페이지가 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'create()의 formal signature 블록, 인자 표, 반환값 절 — 페이지에 없습니다.',
  'getSVGData()의 기본값 표와 반환값 절 — 페이지에 없습니다.',
  '잘못된 path 문자열을 넘겼을 때 어떻게 되는지',
  '만든 ease를 지우거나 다시 정의하는 방법',
  '브라우저·버전 지원 표',
  'CustomBounce, CustomWiggle 같은 형제 plugin과의 관계',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
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
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="custom-ease-page__split">
        <div>
          <div className="custom-ease-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>CustomEase 문서는 설명과 예제 중심이라 형식적인 명세 절이 없습니다. 아래 항목은 문서에 아예 없습니다.</p>
          </div>
          <ul className="custom-ease-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="custom-ease-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="custom-ease-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="custom-ease-page__note">
        <h3>공식 페이지가 함께 걸어 둔 자료</h3>
        <p>
          공식 CustomEase 문서에는 기술 설명 외에 <strong>Demos</strong>(CustomEase demos 모음)와 <strong>Videos</strong>(Overview,
          Using CustomEase in a project) 두 섹션이 링크로만 들어 있습니다. 기술 주장이 아니라 참고 자료라서 이 페이지의 source item에는
          세지 않았고, 대신 공식 문서를 직접 열어 보도록 아래 링크를 남깁니다.
        </p>
      </div>

      <div className="custom-ease-page__official-links">
        <OfficialDocsLink label="CustomEase 공식 문서" href="https://gsap.com/docs/v3/Eases/CustomEase" />
      </div>
    </section>
  )
}
