/** 공식 0~1 계약 밖 실행 차이와 splitColor 원문 오류를 덮어쓰지 않고 나란히 보존한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function BoundariesSection() {
  return (
    <section id="boundaries" className="range-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="06"
        id="boundaries"
        title="0~1 밖과 원문 오류를 구분하기"
        description="공식이 보장한 범위와 설치본에서 관찰한 결과를 섞지 않습니다. 안전한 pipeline이 왜 clamp로 시작하는지 확인합니다."
      />

      <div className="range-page__warning range-page__warning--official">
        <h3>공식 원문 오류 · splitColor의 첫 4항 array</h3>
        <p>
          공식 본문은 alpha가 있는 예시를 <code>[255, 0 128, 1]</code>로 적어 두어 0과 128 사이 comma가 빠져 있습니다. 이 문장을
          실행 가능한 코드로 조용히 고치지 않았습니다. 같은 페이지의 실제 예제와 GSAP 3.15.0 실행은 올바른 4항 형태가{' '}
          <code>[red, green, blue, alpha]</code>임을 보여 줍니다.
        </p>
      </div>

      <div className="range-page__probe-grid">
        <article>
          <h3>공식 계약</h3>
          <p><code>interpolate</code> progress는 0~1이고, <code>mapRange</code> 입력은 보통 원래 범위 안에 있다고 적혀 있습니다.</p>
          <p>즉 0~1 밖의 결과 형태는 공식이 보장한 학습 계약이 아닙니다.</p>
        </article>
        <article>
          <h3>GSAP 3.15.0 probe</h3>
          <p><code>normalize(0,100,-50/150)</code> → <code>-0.5/1.5</code>, 0~360 map은 <code>-180/540</code>으로 외삽했습니다.</p>
          <p>color 보간은 channel이 0~255 밖으로 나갔고, 세 지점 array는 -0.5에서 <code>TypeError</code>였습니다.</p>
        </article>
      </div>

      <div className="range-page__note range-page__note--probe">
        <h3>보존한 결론 · normalize와 mapRange는 clamp가 아닙니다</h3>
        <p>
          설치본은 number에 대해 범위 밖 비율을 계산하지만 shape마다 결과가 같다고 일반화할 수 없습니다. 외삽이 명시적 목표가 아니라면{' '}
          <code>clamp → normalize → mapRange/interpolate</code> 순서를 사용하세요. lab도 이 순서를 지켜 color와 array가 항상 공식 progress
          계약 안에서 계산됩니다.
        </p>
      </div>

      <div className="range-page__warning">
        <h3>0폭·역방향 범위도 공식 인자 의미를 따르세요</h3>
        <p>
          probe에서 <code>normalize(5,5,5)</code>와 <code>mapRange(5,5,0,100,5)</code>는 0이었고 역방향 normalize는 계산됐지만,
          <code>clamp(100,0,50)</code>는 100이었습니다. 이는 공식의 minimum/maximum 또는 lower/upper 순서를 벗어난 입력입니다. 우연히
          나온 설치본 결과를 일반 규칙으로 가르치지 않고, 아래끝을 먼저 주는 공식 계약을 유지합니다.
        </p>
      </div>
    </section>
  )
}
