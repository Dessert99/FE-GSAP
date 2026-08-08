/** totalProgress 기본값과 tweenFromTo immediateRender의 공식·실행 차이를 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function OfficialDifferencesSection() {
  return (
    <section id="official-differences" className="timeline-playhead-page__section" aria-labelledby="official-differences-title">
      <SectionHeading number="05" id="official-differences" title="공식 기본값과 설치본 실행을 섞지 않는다" description="문서 문장은 catalog에 그대로 남기고, 다른 실행 결과는 GSAP 버전·측정 방법과 함께 별도 probe로 표시합니다." />
      <div className="timeline-playhead-page__warning"><h3>totalProgress suppressEvents</h3><p><strong>공식:</strong> Parameters 표는 기본값을 <code>true</code>라고 적습니다.</p><p><strong>GSAP 3.15.0 probe:</strong> onStart/onComplete가 있는 duration 2, repeat 1 Timeline에서 <code>totalProgress(1)</code>, <code>totalProgress(1, false)</code>, <code>totalProgress(1, true)</code>를 각각 새 instance에 실행했습니다. 생략과 false는 callback을 실행했고 true만 억제했습니다. 따라서 설치본 생략 호출은 false와 같았습니다.</p></div>
      <div className="timeline-playhead-page__warning"><h3>tweenFromTo immediateRender</h3><p><strong>공식:</strong> 모든 from 계열처럼 기본값이 <code>true</code>라 생성 즉시 from time/label로 점프하며 <code>immediateRender:false</code>로 끈다고 설명합니다.</p><p><strong>GSAP 3.15.0 probe:</strong> Timeline을 0.25초에 둔 뒤 1→2초 control Tween을 만들었습니다. vars 생략과 빈 객체는 반환 직후 0.25초를 유지했고, explicit <code>true</code>만 1초로 동기 이동했으며 explicit <code>false</code>도 0.25초를 유지했습니다.</p></div>
    </section>
  )
}
