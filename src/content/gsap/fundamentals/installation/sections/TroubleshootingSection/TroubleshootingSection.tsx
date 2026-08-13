/** 설치·등록이 실패했을 때 공식 FAQ가 짚는 확인 순서와 다음 학습 경로를 연결한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 FAQ와 legacy 안내에서 확인한 증상별 점검 항목
const checks = [
  {
    symptom: 'script tag로는 되는데 build 후에는 안 됩니다',
    answer:
      'script tag는 plugin이 스스로 등록을 시도하기 때문에 대개 그냥 동작합니다. build tool을 쓰는 프로젝트에서는 자동 등록에 기대지 말고 registerPlugin()을 명시적으로 부르세요.',
  },
  {
    symptom: 'npm install에서 인증 오류가 납니다',
    answer:
      '예전 비공개 npm 저장소는 더 이상 유지되지 않습니다. 모든 plugin이 npm에 공개됐으니 남아 있는 .npmrc 설정을 지우고 3.13 이상 버전을 설치하세요.',
  },
  {
    symptom: 'React에서 버전이 충돌합니다',
    answer:
      'React에서는 useGSAP hook을 등록해 쓰라고 공식 문서가 안내합니다. hook의 생명주기와 정리 방법은 별도 학습 페이지에서 다룹니다.',
  },
  {
    symptom: '예전 버전을 써야 합니다',
    answer:
      '공식 GitHub releases 페이지에서 이전 버전을 확인하고 내려받을 수 있습니다. 다만 공식 문서는 최신 버전 사용을 권합니다.',
  },
]

export function TroubleshootingSection() {
  return (
    <section id="troubleshooting" className="installation-page__section" aria-labelledby="troubleshooting-title">
      <SectionHeading
        number="06"
        id="troubleshooting"
        title="설치가 안 될 때 확인하기"
        description="설치 단계에서 막히는 상황은 대부분 몇 가지로 좁혀집니다. 증상별로 무엇을 먼저 확인할지 정리했습니다."
      />

      <dl className="installation-page__concept-list">
        {checks.map((check) => (
          <div key={check.symptom}>
            <dt>{check.symptom}</dt>
            <dd>{check.answer}</dd>
          </div>
        ))}
      </dl>

      <div className="installation-page__note">
        <p>
          예전 private npm 저장소에서 옮기는 프로젝트라면 패키지별 제거 순서와 Yarn 설정까지 다루는{' '}
          <a href="https://gsap.com/resources/private-repo-migration/" target="_blank" rel="noreferrer">
            공식 migration guide<span className="installation-page__sr-only"> (새 탭에서 열기)</span>
          </a>
          를 이어서 확인하세요.
        </p>
      </div>

      <div className="installation-page__subheading">
        <h3>이 페이지가 다루지 않는 것</h3>
        <p>
          plugin마다의 사용법, React lifecycle과 cleanup, 개별 plugin이 요구하는 추가 설정은 각각의 담당 페이지에서 설명합니다. 여기서는
          '가져오기 → 등록하기'라는 setup 순서까지만 확정합니다.
        </p>
      </div>

      <ol className="installation-page__roadmap">
        <li>
          <span>이전</span>
          <div>
            <a href={toHref('/fundamentals/gsap-core-map')}>GSAP Core 지도</a>
            <p>gsap, Tween, Timeline, plugin이 각각 무엇인지 먼저 확인합니다.</p>
          </div>
        </li>
        <li>
          <span>다음</span>
          <div>
            <a href={toHref('/fundamentals/gsap-to')}>gsap.to()</a>
            <p>설치와 등록을 마쳤다면 첫 Tween을 만들어 봅니다.</p>
          </div>
        </li>
      </ol>
    </section>
  )
}
