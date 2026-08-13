/** 변수에 담지 않은 Tween과 담아 둔 Tween의 수명을 갈라 보여주고, 폐기 뒤에 무엇이 남는지 실행 사실로 채운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 문서가 "나중에 제어하려면 변수에 담으라"며 보여주는 예제 원문
const controlExample = `let tween = gsap.to(".class", { rotation: 360, duration: 5, ease: "elastic" });

//now we can control it!
tween.pause();
tween.seek(2);
tween.progress(0.5);
tween.play();`

// 두 갈래 수명을 한눈에 대조하는 정적 흐름 데이터 — 인터랙션보다 표가 직접적이다
const lifecycles = [
  {
    id: 'fire-and-forget',
    label: '변수에 담지 않음',
    code: 'gsap.to(".box", { x: 100 })',
    steps: ['만들어진다', '기본적으로 즉시 재생된다', '끝난다', '스스로 폐기한다'],
    cleanup: '완료되면 GSAP이 자동으로 폐기합니다.',
    control: '반환값으로 직접 제어할 변수는 없습니다.',
  },
  {
    id: 'kept',
    label: '변수에 담음',
    code: 'let tween = gsap.to(".box", { x: 100 })',
    steps: ['만들어진다', '기본적으로 즉시 재생된다', '끝난 뒤에도 변수로 접근할 수 있다'],
    cleanup: '애플리케이션이 변수 참조를 관리합니다.',
    control: '멈추고, 되감고, 다시 재생할 수 있습니다.',
  },
]

export function InstanceLifecycleSection() {
  return (
    <section id="instance-lifecycle" className="instance-page__section" aria-labelledby="instance-lifecycle-title">
      <SectionHeading
        number="02"
        id="instance-lifecycle"
        title="변수에 담지 않으면 어떻게 되나"
        description="Tween이 객체라면 어딘가에 쌓이지 않을까 걱정될 수 있습니다. 공식 문서는 이 질문에 명확히 답합니다."
      />

      <div className="instance-page__note">
        <h3>그냥 불러도 됩니다</h3>
        <p>
          공식 Quick Start는 나중에 직접 제어하지 않을 Tween은 변수에 담을 필요가 없다고 안내합니다. Tween은 기본적으로 즉시
          재생되며(<code>delay</code>나 <code>paused</code>로 바꿀 수 있음), 완료되면 자동으로 폐기됩니다.
        </p>
        <p>
          여기서 중요한 단어가 둘 있습니다. <strong>즉시 재생</strong> — 만드는 것 자체가 시작 신호입니다. 그리고{' '}
          <strong>스스로 폐기</strong> — 다 쓴 Tween을 지우는 코드를 우리가 쓸 필요는 없습니다.
        </p>
      </div>

      <div className="instance-page__table-wrap">
        <table className="instance-page__basic-table">
          <caption>같은 호출, 두 갈래 수명</caption>
          <thead>
            <tr>
              <th scope="col">방식</th>
              <th scope="col">쓰는 모양</th>
              <th scope="col">지나가는 단계</th>
              <th scope="col">나중에 제어</th>
              <th scope="col">치울 것</th>
            </tr>
          </thead>
          <tbody>
            {lifecycles.map((lifecycle) => (
              <tr key={lifecycle.id}>
                <th scope="row">{lifecycle.label}</th>
                <td>
                  <code>{lifecycle.code}</code>
                </td>
                <td>{lifecycle.steps.join(' → ')}</td>
                <td>{lifecycle.control}</td>
                <td>{lifecycle.cleanup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="instance-page__split">
        <div className="instance-page__prose">
          <p>
            나중에 반환된 Tween을 직접 제어하려면 공식 문서의 예제처럼 <strong>Tween instance를 변수에 할당</strong>합니다.
          </p>
          <p>
            오른쪽이 공식 예제입니다. 한 번 담아 둔 <code>tween</code> 변수에 대고 멈추고, 2초 지점으로 건너뛰고, 절반 지점으로 옮기고,
            다시 재생합니다. 같은 instance의 메서드를 이어서 호출하는 방식입니다.
          </p>
        </div>
        <pre className="instance-page__code">
          <code>{controlExample}</code>
        </pre>
      </div>

      <div className="instance-page__note instance-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p className="instance-page__provenance">
          아래는 공식 문서에 적혀 있지 않습니다. GSAP 3.15.0을 Node에서 직접 실행해 확인한 결과입니다.
        </p>
        <p>
          <strong>"스스로 폐기한다"는 말이 애플리케이션의 변수까지 비운다는 뜻은 아닙니다.</strong> 이 probe에서는 완료 지점으로 옮긴
          Tween의 <code>targets()</code>, <code>data</code>, <code>vars</code>를 변수로 계속 읽을 수 있었고, <code>gsap.getById()</code>도
          같은 Tween을 돌려줬습니다. 변수 참조의 수명은 애플리케이션이 관리합니다.
        </p>
        <p>
          다만 <code>kill()</code>을 직접 부르면 달라집니다. 그때도 <code>targets()</code>·<code>data</code>·<code>vars</code>는 남지만{' '}
          <code>gsap.getById()</code>는 <code>undefined</code>를 돌려줍니다. <strong>읽을 수 있는 것과 GSAP이 관리하는 것은 다릅니다.</strong>
        </p>
      </div>
    </section>
  )
}
