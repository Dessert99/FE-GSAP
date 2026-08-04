/** 네 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 네 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'gsap.exportRoot()의 시그니처와 인자 이름 — 공식 페이지에 시그니처 줄도 Parameters 절도 없다',
  'gsap.updateRoot()의 시그니처·인자·반환값 — 공식 페이지에 코드 두 줄만 있다',
  'gsap.ticker.sleep()·wake()·tick()의 용도 — 설치본에는 있지만 공식 ticker 페이지에 설명이 없다',
  'gsap.ticker.add()의 반환값 — 공식 페이지에 반환값 설명이 없다',
  'once와 prioritize의 기본값 — 공식 페이지가 Boolean이라고만 적는다',
  'globalTimeline을 pause()한 상태에서 새로 만든 animation이 어떻게 되는지 — 공식 페이지에 명시 없음',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'GSAP Core에 무엇이 들어 있는지의 전체 지도', href: '/fundamentals/gsap-core-map' },
  { label: 'Tween 하나를 재생·정지·seek하는 방법과 개별 timeScale()', href: '/fundamentals/tween-playhead' },
  { label: 'duration·delay·ease 같은 설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
  { label: 'gsap.to()의 vars 전체 명세', href: '/fundamentals/gsap-to' },
]

// 이 페이지가 경계만 긋고 넘기는 개념들 — 아직 학습 페이지가 없다
const laterPages = [
  'gsap.timeline()으로 직접 Timeline을 만들고 자식을 배치하는 방법',
  'gsap.delayedCall()의 전체 명세와 취소 방법',
  'Timeline의 pause()·play()·timeScale() 명세 — 여기서는 globalTimeline에 걸리는 효과만 다뤘다',
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="root-clock-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="root-clock-page__split">
        <div>
          <div className="root-clock-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 항목은 네 문서에 없습니다. 일부는 직접 실행해 확인했고, 그렇다고 표시해 두었습니다.</p>
          </div>
          <ul className="root-clock-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="root-clock-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="root-clock-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="root-clock-page__subheading">
        <h3>이 페이지가 경계만 긋고 넘긴 것</h3>
        <p>여기서는 root와의 관계를 설명하는 데 필요한 만큼만 언급했습니다.</p>
      </div>

      <ul className="root-clock-page__list">
        {laterPages.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="root-clock-page__note">
        <p>
          실행으로만 확인한 항목에는 전부 <strong>측정 방법과 재현 조건</strong>을 함께 적어 두었습니다. 특히 초당 tick 횟수 같은
          수치는 <strong>Node 환경에서 잰 값</strong>이라 브라우저에서 그대로 재현되지 않습니다. 브라우저에서는{' '}
          <code>requestAnimationFrame</code>이 화면 주사율로 상한을 정하기 때문입니다.
        </p>
      </div>
    </section>
  )
}
