/** 여덟 공식 페이지가 게시하지 않은 범위와 다른 페이지가 소유한 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 여덟 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않거나 실행으로만 확인한 자리다
const unpublished = [
  'restart()가 paused·reversed 스위치를 어떻게 바꾸는지',
  'reverse()가 실제로 reversed 상태를 어떻게 바꾸는지 — 문장은 있지만 실행과 반대다',
  'reverse()의 음수 from이 실제로 어떻게 환산되는지',
  'paused(false)와 resume()이 무엇이 다른지',
  'timeScale이 0일 때 play()·resume()이 실제로 무엇을 하는지',
  'isActive()에 인자를 넘기면 어떻게 되는지',
  'reversed의 초기값을 vars로 주는 방법 — paused만 게시돼 있다',
  'from·atTime에 Timeline label을 넘겼을 때의 정확한 해석 — 가능하다는 언급만 있다',
]

// 이 페이지가 전제로만 쓰고 설명 소유권은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'Tween을 만드는 방법과 vars 전체 명세', href: '/fundamentals/gsap-to' },
  { label: 'time·progress·seek로 playhead를 읽고 옮기는 좌표계', href: '/fundamentals/tween-playhead' },
  { label: '각 콜백이 정확히 언제 불리는지와 완료를 기다리는 방법', href: '/fundamentals/tween-callbacks-promise' },
  { label: 'delay를 포함한 설정이 어디서 와서 어디까지 적용되는지', href: '/fundamentals/tween-configuration' },
  { label: 'ease 곡선의 의미 — reverse()가 뒤집는 대상', href: '/fundamentals/easing' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="playback-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="playback-page__split">
        <div>
          <div className="playback-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>아래 항목은 여덟 문서에 없거나 실행과 어긋나서 직접 확인했고, 그렇다고 표시해 두었습니다.</p>
          </div>
          <ul className="playback-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="playback-page__subheading">
            <h3>다른 페이지가 소유한 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="playback-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="playback-page__note">
        <p>
          재생을 다루는 메서드가 이 여덟 개뿐인 것은 아닙니다. 재생 <strong>속도</strong>를 바꾸는 <code>timeScale()</code>이나 Tween을{' '}
          <strong>없애는</strong> <code>kill()</code>은 각자 공식 페이지가 따로 있어서 이 페이지가 담당하지 않습니다. 여기서{' '}
          <code>timeScale</code>이 나온 자리는 <code>play()</code>와 <code>resume()</code> 문서가 직접 언급한 부분뿐입니다.
        </p>
        <p>
          Timeline에도 같은 이름의 메서드가 모두 있습니다. 이 페이지가 담당하는 공식 문서는 <strong>Tween 쪽 여덟 페이지뿐</strong>이라,
          Timeline 쪽 명세와 label을 인자로 넘기는 문법은 Timeline 학습 페이지가 따로 다룹니다.
        </p>
      </div>
    </section>
  )
}
