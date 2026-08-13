/** 일곱 공식 페이지가 게시하지 않은 범위와 다른 페이지에서 설명하는 개념을 명시해 추측을 막는다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 일곱 canonical이 실제로 게시하지 않은 항목 — 이 페이지가 답을 주지 않는다고 밝히는 자리다
const unpublished = [
  'delay·duration·totalDuration·startTime·timeScale의 실제 기본값. 인자 기본값 NaN만 게시돼 있고, 속성 자체의 기본값 표는 없습니다.',
  '값을 설정했을 때 다른 값이 어떻게 따라 바뀌는지. 어느 페이지도 setter의 부작용을 적어 두지 않았습니다.',
  'repeat이 -1일 때 totalDuration이 무엇을 돌려주는지',
  'smoothChildTiming의 기본값과 자동 조정이 실제로 일어나는 조건',
  'endTime·globalTime의 계산식',
  '브라우저·버전 지원 표. 일곱 페이지 모두 없습니다.',
]

// 이 페이지가 전제로만 쓰고 자세한 설명은 다른 페이지에 있는 개념들
const otherOwners = [
  { label: 'gsap.to()의 target과 vars 전체', href: '/fundamentals/gsap-to' },
  { label: 'duration·delay·repeat을 vars에 적는 방법', href: '/fundamentals/tween-configuration' },
  { label: 'progress()와 재생 헤드 조작', href: '/fundamentals/tween-playhead' },
  { label: 'ease 곡선이 시간을 값으로 바꾸는 방식', href: '/fundamentals/easing' },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="timing-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="07"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 적어 두지 않은 것을 추측해 채우지 않았습니다. 대신 직접 실행해 확인한 것은 확인했다고 밝혀 두었습니다. 무엇을 모르는지 아는 것도 학습의 일부입니다."
      />

      <div className="timing-page__split">
        <div>
          <div className="timing-page__subheading">
            <h3>공식 페이지에 게시되지 않은 것</h3>
            <p>
              일곱 페이지는 모두 짧습니다. 아래 항목은 문서에 아예 없습니다. 이 중 일부는 이 페이지에서{' '}
              <strong>실행으로 확인해</strong> 점선 상자로 따로 표시했습니다.
            </p>
          </div>
          <ul className="timing-page__list">
            {unpublished.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="timing-page__subheading">
            <h3>다른 페이지에서 설명하는 개념</h3>
            <p>이 페이지는 아래 내용을 전제로만 사용했습니다.</p>
          </div>
          <ul className="timing-page__list">
            {otherOwners.map((owner) => (
              <li key={owner.href}>
                <a href={toHref(owner.href)}>{owner.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>점선 상자를 어떻게 읽어야 하나요</h3>
        <p>
          이 페이지에서 <strong>점선 테두리</strong>가 쳐진 상자는 전부 공식 문서에 없는 내용입니다. GSAP{' '}
          <strong>3.15.0</strong>을 직접 실행해 확인했고, 어떤 설정에서 어떤 호출로 얻은 숫자인지 상자 안에 함께 적어 두었습니다.
        </p>
        <p>
          공식 문서의 주장과 달리 <strong>버전이 올라가면 바뀔 수 있는 내용</strong>입니다. 특히{' '}
          <code>repeat: -1</code>일 때의 <code>10000000000</code>이나 <code>smoothChildTiming</code>의 기본값처럼 내부 구현에 가까운
          값은 그대로 의존하기보다 이 페이지에 적힌 확인 방법으로 직접 다시 재 보는 편이 안전합니다.
        </p>
      </div>

      <div className="timing-page__note">
        <h3>Timeline 쪽 메서드는 다루지 않았습니다</h3>
        <p>
          이 페이지의 일곱 공식 문서는 전부 <strong>Tween</strong>의 메서드 페이지입니다. Timeline에도 같은 이름의 메서드가 있지만 그
          문서들은 별개이고, 이 페이지의 담당 범위가 아닙니다. 예제에서 timeline을 쓴 것은{' '}
          <strong>Tween이 놓일 부모가 필요했기 때문</strong>이지 timeline 자체를 설명하기 위해서가 아닙니다.
        </p>
      </div>
    </section>
  )
}
