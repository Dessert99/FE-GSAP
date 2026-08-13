/** quickTo가 Tween 하나를 재사용하는 방식과 시작값·tween 접근 계약을 실행으로 확인하게 한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { PointerFollowLab } from '../../examples/PointerFollowLab/PointerFollowLab'

// 공식 문서가 게시한 두 mouse follower 데모 — 로컬 예제가 대신하지 않는 원본 자료다
const officialDemos = [
  { label: 'gsap.quickSetter() · Mouse Follower Demo', href: 'https://gsap.com/docs/v3/GSAP/gsap.quickSetter()' },
  { label: 'gsap.quickTo() · Mouse Follower Demo', href: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()' },
]

export function FollowTheInputSection() {
  return (
    <section id="follow-the-input" className="hfu-page__section" aria-labelledby="follow-the-input-title">
      <SectionHeading
        number="05"
        id="follow-the-input"
        title="Tween 하나로 방향만 계속 바꾼다"
        description="quickTo의 핵심은 '새로 만들지 않는다'입니다. 이미 있는 Tween에게 목적지를 바꿔 알려 줄 뿐입니다. 그 장면을 직접 조작해 확인합니다."
      />

      <div className="hfu-page__prose">
        <p>
          공식 문서의 설명은 두 문장입니다. <strong>"함수에 새 숫자를 넘길 때마다 사실상 애니메이션을 다시 시작해 그 새 값으로 방향을
          바꾼다."</strong> 그리고 <strong>"(재사용되는) Tween 인스턴스를 돌려준다."</strong> 괄호 안의 <em>재사용되는</em>이 이
          문단의 전부입니다. 호출은 몇 번을 하든 Tween은 처음 만든 그 하나입니다.
        </p>
        <p>
          공식 Example도 정확히 그 구조입니다. <code>xTo</code>와 <code>yTo</code>를 <strong>이벤트 바깥에서 미리</strong> 만들고,{' '}
          <code>mousemove</code> 안에서는 <strong>함수 호출 두 줄만</strong> 남습니다.
        </p>
      </div>

      <pre className="hfu-page__code">
        <code>{`let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" }),
  yTo = gsap.quickTo("#id", "y", { duration: 0.4, ease: "power3" });

document.querySelector("#container").addEventListener("mousemove", (e) => {
  xTo(e.pageX);
  yTo(e.pageY);
});`}</code>
      </pre>

      <p className="hfu-page__note">
        여기서 <code>x</code>와 <code>y</code>에 <strong>각각 함수를 하나씩</strong> 만든 것을 놓치지 마세요. quickTo는{' '}
        <strong>numeric property 하나</strong>에 묶입니다. 두 축을 움직이려면 함수도 둘입니다.
      </p>

      <PointerFollowLab />

      <div className="hfu-page__subheading">
        <h3>어디에서 출발할지 고르기</h3>
        <p>새 숫자를 넘겼을 때 "어디에서" 그 값으로 향하는지에도 규칙이 있습니다.</p>
      </div>

      <div className="hfu-page__prose">
        <p>
          기본 동작은 이렇습니다. <strong>tween 안에서 현재 progress 시점의 현재 값에서 출발합니다.</strong> 중요한 단서가 하나
          붙습니다. 공식 문서는 <strong>"target의 현재 값을 실제로 확인하지는 않는다"</strong>고 밝히고, 그 이유가{' '}
          <strong>성능을 최대화하려는 의도</strong>라고 적습니다. 즉 quickTo는 자기가 계산해 온 값을 기억할 뿐, 매번 화면을 다시 읽지
          않습니다. 그래서 다른 코드가 그 사이에 같은 property를 건드렸다면 출발점이 어긋날 수 있습니다.
        </p>
        <p>
          그럴 때 <strong>2번째 파라미터로 숫자 시작값을 넘겨 그 기본 동작을 덮어쓸 수 있습니다.</strong> 이 자리에서{' '}
          <code>gsap.getProperty()</code>가 다시 쓸모 있어집니다. 화면의 진짜 현재 값을 읽어 시작값으로 넘기면 되기 때문입니다.
        </p>
      </div>

      <pre className="hfu-page__code">
        <code>{`let xTo = gsap.quickTo("#id", "x", { duration: 0.8 });

xTo(100); // animates to 100 from current value inside the tween at its current progress
xTo(100, 500); // animates to 100 from 500`}</code>
      </pre>

      <div className="hfu-page__subheading">
        <h3>만들어진 Tween에 손대기</h3>
        <p>돌려받은 것은 함수지만, 그 함수는 Tween을 손에 쥐고 있습니다.</p>
      </div>

      <div className="hfu-page__prose">
        <p>
          tween에 접근해야 하면 <strong>결과 함수의 <code>.tween</code> property</strong>를 씁니다. 공식 예제는 그것으로 일시정지를
          겁니다. 그리고 <strong>그것은 일반 Tween 인스턴스이므로 <code>delay()</code>를 제외한 어떤 메서드·property든 활용할 수
          있습니다.</strong> 위 예제의 일시정지 버튼이 바로 이 <code>.tween</code>을 부르고, 화면의 <em>Tween 상태</em>는 그 Tween에서
          다시 읽은 값입니다. Tween이 가진 메서드 전반은{' '}
          <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead 페이지</a>에서 이어서 확인할 수 있습니다.
        </p>
      </div>

      <pre className="hfu-page__code">
        <code>{`let xTo = gsap.quickTo("#id", "x", { duration: 0.8 });

xTo(100); // animate to 100
xTo.tween.pause(); // pause the tween!`}</code>
      </pre>

      <p className="hfu-page__note">
        설치된 GSAP 3.15.0에서는 <code>xTo.tween.pause()</code>로 멈춘 뒤 <code>xTo()</code>에 새 값을 넘기면 다시 재생됩니다. 위
        예제도 새 입력 뒤에 Tween 상태를 다시 읽어 버튼 문구를 갱신합니다. 이 동작은 공식 페이지에 명시되어 있지 않습니다.
      </p>

      <div className="hfu-page__subheading">
        <h3>공식 문서가 게시한 데모</h3>
        <p>두 문서 모두 mouse follower 데모를 싣고 있습니다. 위 예제는 그 데모를 대신하지 않습니다.</p>
      </div>

      <div className="hfu-page__prose">
        <p>
          위 예제는 개념을 <strong>한 축, 한 대상, 한 변화</strong>로 좁혀 놓은 것입니다. 마우스를 두 축으로 따라다니는 완성된 모습은
          공식 데모 쪽이 더 직접적입니다. <code>quickSetter</code> 문서는 즉시 붙는 버전을, <code>quickTo</code> 문서는 부드럽게 따라오는
          버전을 나란히 보여줍니다.
        </p>
        <ul className="hfu-page__list">
          {officialDemos.map((demo) => (
            <li key={demo.label}>
              <a href={demo.href} target="_blank" rel="noopener noreferrer">
                {demo.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
