/** 두 generator가 CustomEase를 확장하므로 항상 함께 등록해야 한다는 의존 관계를 고정한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const bounceRegisterCode = `gsap.registerPlugin(CustomEase, CustomBounce)`

const wiggleRegisterCode = `gsap.registerPlugin(CustomEase, CustomWiggle)`

const projectImportCode = `import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { CustomBounce } from 'gsap/CustomBounce'
import { CustomWiggle } from 'gsap/CustomWiggle'

gsap.registerPlugin(CustomEase, CustomBounce, CustomWiggle)`

export function SetupSection() {
  return (
    <section id="setup" className="bounce-wiggle-page__section" aria-labelledby="setup-title">
      <SectionHeading
        number="02"
        id="setup"
        title="CustomEase를 항상 같이 등록한다"
        description="두 plugin 모두 혼자서는 동작하지 않습니다. 곡선을 실제로 저장하고 이름을 붙이는 일은 CustomEase가 하기 때문입니다."
      />

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            공식 문서는 두 plugin을 같은 문장으로 설명합니다. CustomBounce는{' '}
            <strong>"CustomEase를 extend하며 CustomEase를 프로젝트에 반드시 포함해야 한다"</strong>고 적혀 있고, CustomWiggle도{' '}
            <strong>"CustomEase를 extend한다(그것도 프로젝트에 반드시 포함해야 한다)"</strong>고 적혀 있습니다.
          </p>
          <p>
            그래서 공식 Quick Start의 등록 호출에도 <strong>언제나 두 이름이 함께</strong> 들어갑니다. generator만 등록하면 곡선을
            저장할 곳이 없습니다.
          </p>
        </div>
        <div>
          <pre className="bounce-wiggle-page__code">
            <code>{bounceRegisterCode}</code>
          </pre>
          <pre className="bounce-wiggle-page__code">
            <code>{wiggleRegisterCode}</code>
          </pre>
        </div>
      </div>

      <div className="bounce-wiggle-page__subheading">
        <h3>이 프로젝트에서 실제로 쓰는 형태</h3>
      </div>

      <div className="bounce-wiggle-page__split">
        <pre className="bounce-wiggle-page__code">
          <code>{projectImportCode}</code>
        </pre>
        <div className="bounce-wiggle-page__prose">
          <p>
            공식 Quick Start의 설치 안내는 탭으로 바뀌는 영역이라 문서 본문에서 <strong>import 경로를 그대로 확인할 수
            없었습니다.</strong> 위 코드는 이 저장소에 설치된 <code>gsap</code> 3.15.0에서 확인한 경로입니다.
          </p>
          <p>
            등록을 언제 어디서 해야 하는지, 왜 필요한지는 이 페이지가 소유하지 않습니다.{' '}
            <a href={toHref('/fundamentals/installation')}>GSAP 가져오기와 등록하기 페이지</a>가 다룹니다.
          </p>
        </div>
      </div>

      <div className="bounce-wiggle-page__note bounce-wiggle-page__note--probe">
        <h3>공식 문서에 없는 동작 하나 · 같은 이름을 다시 쓰면</h3>
        <p>
          곡선에 붙이는 이름은 GSAP 안의 <strong>전역 이름</strong>입니다. 이미 쓴 이름으로 다시 <code>create()</code>하면{' '}
          <strong>그 이름의 곡선이 새 곡선으로 조용히 교체됩니다.</strong> 오류도, 경고도 없습니다.
        </p>
        <p>
          이 페이지의 두 예제도 설정을 바꿀 때마다 같은 이름으로 다시 만듭니다. 그래서 이름이 무한히 늘어나지 않습니다. 반대로,
          서로 다른 곡선을 동시에 쓰고 싶다면 <strong>이름을 반드시 다르게</strong> 지어야 합니다.
        </p>
        <p className="bounce-wiggle-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 공식 문서는{' '}
          <code>create()</code>의 반환값, 중복 이름 처리, 등록 해제 방법을 어디에도 적지 않았습니다.
        </p>
      </div>
    </section>
  )
}
