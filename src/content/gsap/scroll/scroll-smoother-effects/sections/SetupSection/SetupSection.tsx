/** existing smoother의 smooth getter/setter와 return boundary를 먼저 정리한다. */
import { toHref } from '../../../../../../app/routes'

/** smooth duration의 의미와 공식 문서·설치 타입 차이를 설명한다. */
export function SetupSection() {
  return (
    <section id="setup" aria-labelledby="scroll-smoother-effects-setup-title">
      <h2 id="scroll-smoother-effects-setup-title">
        01 · smooth는 native scroll을 바꾸지 않고 catch-up 시간을 정합니다
      </h2>
      <p>
        <code>smoother.smooth()</code>은 현재 catch-up seconds를 읽고,
        <code>smoother.smooth(duration)</code>은 새 seconds를 설정합니다.
        duration이 길수록 content의 보이는 위치가 native scroll 위치를 따라오는
        시간이 길어집니다.
      </p>
      <p>
        공식 문서는 setter가 chaining을 위해 self를 준다고 하지만, 설치된
        v3.15 d.ts는 setter를 <code>void</code>로 선언하고 current source는
        numeric duration을 반환합니다. setter result를 다음 call의 receiver로
        쓰지 않는 것이 세 근거와 모두 안전하게 맞습니다.
      </p>
      <p>
        <a href={toHref('/fundamentals/scroll-smoother-create')}>
          ScrollSmoother 생성
        </a>
        이 만든 singleton이 prerequisite입니다. 이 페이지는 create/get을
        호출하지 않아 document scroll과 singleton lifecycle을 건드리지
        않습니다.
      </p>
    </section>
  )
}
