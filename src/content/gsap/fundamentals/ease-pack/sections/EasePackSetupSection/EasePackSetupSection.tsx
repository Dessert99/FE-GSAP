/** 세 ease가 core에 없다는 사실과, 등록하지 않으면 조용히 다른 ease가 쓰인다는 위험을 함께 다룬다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const officialRegisterCode = `gsap.registerPlugin(EasePack)`

const localRegisterCode = `import gsap from 'gsap'
import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'

// ease 함수 자체를 넘긴다. 하나만 넘겨도 셋 다 등록된다.
gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo)`

export function EasePackSetupSection() {
  return (
    <section id="easepack-setup" className="ease-pack-page__section" aria-labelledby="easepack-setup-title">
      <SectionHeading
        number="02"
        id="easepack-setup"
        title="셋 다 core에 들어 있지 않다"
        description="세 공식 페이지 모두 같은 문장으로 시작합니다. 이 ease는 core에 없고 EasePack 파일에 있습니다. 등록을 빠뜨리면 화면은 움직이는데 곡선만 다른 상태가 됩니다."
      />

      <div className="ease-pack-page__split">
        <div className="ease-pack-page__prose">
          <p>
            <code>gsap.to()</code>의 <code>ease</code>에 <code>'power2.out'</code> 같은 이름을 적을 수 있는 이유는 그 이름이 GSAP에 미리
            등록돼 있기 때문입니다. <code>'rough'</code>, <code>'slow'</code>, <code>'expoScale'</code>은 <strong>등록돼 있지 않습니다.</strong>
          </p>
          <p>
            세 공식 페이지가 공통으로 적은 문장은 이렇습니다. <strong>"Core에 포함되지 않음 — 이 ease는 EasePack 파일에 있다."</strong>{' '}
            프로젝트에 포함하는 방법은 공식 Installation 페이지로 연결합니다.
          </p>
          <p>
            공식 Quick Start가 보여 주는 등록 코드는 오른쪽 한 줄입니다. 설치와 <code>registerPlugin()</code>의 일반 규칙은{' '}
            <a href={toHref('/fundamentals/installation')}>설치와 등록 페이지</a>에서 확인할 수 있습니다.
          </p>
        </div>
        <pre className="ease-pack-page__code">
          <code>{officialRegisterCode}</code>
        </pre>
      </div>

      <div className="ease-pack-page__note ease-pack-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용 · 등록되는 대상</h3>
        <p>
          npm으로 설치해 <code>import</code>로 쓰는 경우, 위의 <code>gsap.registerPlugin(EasePack)</code> 한 줄만으로는{' '}
          <strong>세 이름이 등록되지 않았습니다.</strong> <code>EasePack</code>으로 내보내지는 값이 등록 hook이 없는 평범한 객체이기
          때문입니다. 반면 ease 함수 자체를 넘기면 등록됐고, <strong>셋 중 하나만 넘겨도 셋 다</strong> 등록됐습니다.
        </p>
        <p>
          그래서 이 페이지의 예제 세 개는 모두 아래 코드로 등록합니다. CDN script 태그로 쓸 때는 파일이 로드되는 시점에 자동으로
          등록되므로 공식 한 줄로 충분합니다.
        </p>
        <pre className="ease-pack-page__code">
          <code>{localRegisterCode}</code>
        </pre>
        <p className="ease-pack-page__provenance">
          이 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0 설치본을 직접 실행해 확인한 내용입니다.
        </p>
      </div>

      <div className="ease-pack-page__warning">
        <h3>등록을 빠뜨리면 에러가 아니라 다른 곡선이 됩니다</h3>
        <p>
          등록하지 않은 상태에서 <code>ease: 'rough'</code>를 쓰면 <strong>경고도 에러도 나오지 않습니다.</strong> 대신 GSAP의 기본
          ease(<code>power1.out</code>)가 조용히 쓰입니다. 실행해 보면 x가 0에서 100으로 가는 tween의 progress 0.3 지점 값이{' '}
          <code>51</code>로, 기본 ease를 쓴 tween과 정확히 같았습니다.
        </p>
        <p>
          "흔들리게 만들었는데 그냥 부드럽게 움직인다"면 EasePack import와 등록부터 확인하세요.
        </p>
        <p className="ease-pack-page__provenance">
          이 항목도 공식 페이지에 없습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다.
        </p>
      </div>
    </section>
  )
}
