/** 다섯 utility가 한 입력을 서로 다른 책임으로 바꾸는 순서를 먼저 세운다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 처음 보는 학습자가 함수 이름보다 질문으로 순서를 기억하도록 만든 네 단계다
const pipelineSteps = [
  { name: 'clamp', question: '입력이 허용 범위 밖인가?', input: '-50 ~ 150', output: '0 ~ 100', role: '경계 밖을 잘라 다음 계산을 안전하게 만든다.' },
  { name: 'normalize', question: '전체 중 어디쯤인가?', input: '0 ~ 100', output: '0 ~ 1', role: '단위를 버리고 상대 위치인 progress만 남긴다.' },
  { name: 'mapRange', question: '같은 위치를 어떤 숫자 범위로 옮길까?', input: '0 ~ 1', output: '0 ~ 360', role: '상대 위치를 회전각·거리 같은 새 숫자로 바꾼다.' },
  { name: 'interpolate', question: '두 값 사이의 실제 모습은 무엇인가?', input: '0 ~ 1', output: '값 하나', role: '숫자뿐 아니라 색·문자열·배열·객체 사이 값을 만든다.' },
]

export function PipelineModelSection() {
  return (
    <section id="pipeline-model" className="range-page__section" aria-labelledby="pipeline-model-title">
      <SectionHeading
        number="01"
        id="pipeline-model"
        title="자르기 → 비율 → 새 범위 → 값"
        description="함수 이름을 외우기 전에 각 단계가 어떤 질문에 답하는지 구분합니다. 같은 숫자를 다루지만 책임은 서로 다릅니다."
      />

      <div className="range-page__pipeline" aria-label="값 변환 pipeline">
        {pipelineSteps.map((step, index) => (
          <article key={step.name}>
            <span>{index + 1}</span>
            <code>{step.name}</code>
            <strong>{step.question}</strong>
            <small>{step.input} → {step.output}</small>
            <p>{step.role}</p>
          </article>
        ))}
      </div>

      <div className="range-page__split">
        <div className="range-page__prose">
          <h3>clamp는 옮기지 않고 자릅니다</h3>
          <p>
            <code>clamp(0, 100, 150)</code>은 <code>100</code>입니다. 150이 범위에서 어느 위치였는지 계산하지 않고, 허용된 가장 가까운
            끝에 붙입니다. 다음 계산이 0~100만 받을 수 있을 때 쓰는 안전문입니다.
          </p>
        </div>
        <div className="range-page__prose">
          <h3>normalize와 mapRange는 상대 위치를 보존합니다</h3>
          <p>
            0~100의 25는 전체의 25% 지점입니다. <code>normalize</code>는 이를 <code>0.25</code>로 만들고, <code>mapRange</code>는 같은
            지점을 0~360의 <code>90</code>으로 옮깁니다. 값은 달라도 위치 정보는 같습니다.
          </p>
          <p>공식 mapRange 사용 예도 폭 200px slider의 위치를 0~window.innerWidth 이동에 같은 비율로 대응시키는 경우입니다.</p>
        </div>
      </div>

      <div className="range-page__note">
        <h3>왜 0~1 progress를 가운데 두나요?</h3>
        <p>
          입력이 pointer px인지 sensor 수치인지와 출력이 degree인지 color인지 분리할 수 있기 때문입니다. 공식 <code>interpolate</code>
          예제도 <code>clamp → normalize → interpolate</code> 순서로 색을 만들고, 네 숫자 utility 문서는 재사용 함수를 <code>pipe</code>로
          잇는 같은 멘탈 모델을 반복합니다.
        </p>
      </div>

      <div className="range-page__call-grid">
        <article>
          <h3>clamp·mapRange·normalize 문서의 공식 pipeline</h3>
          <pre><code>{`const transformer = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.mapRange(0, 100, 0, window.innerWidth),
  gsap.utils.snap(20),
)
transformer(25.874)`}</code></pre>
          <p>세 문서는 이 예제와 “Combining utility Methods” 영상을 반복합니다. snap의 전체 계약은 후속 페이지가 소유합니다.</p>
        </article>
        <article>
          <h3>interpolate 문서의 공식 colorizer</h3>
          <pre><code>{`const colorizer = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.normalize(0, 100),
  gsap.utils.interpolate('red', 'blue'),
)
colorizer(25.874)`}</code></pre>
          <p>숫자 범위를 0~1로 통일하면 마지막 함수가 number가 아닌 color를 반환해도 앞 단계는 바뀌지 않습니다.</p>
        </article>
      </div>
    </section>
  )
}
