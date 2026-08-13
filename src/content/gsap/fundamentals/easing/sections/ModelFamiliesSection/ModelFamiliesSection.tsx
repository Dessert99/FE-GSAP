/** progress→value 모델과 Core ease family를 첫 실행 예제에 연결한다. */
import { EaseCurveExplorer } from '../../examples/EaseCurveExplorer/EaseCurveExplorer'
import { coreEaseFamilies } from '../../easing.catalog'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function ModelFamiliesSection() {
  return (
    <section className="easing-page__section" aria-labelledby="easing-model">
      <SectionHeading number="01" id="easing-model" title="ease는 시간을 값으로 번역합니다" description="같은 duration과 거리에서도 progress를 어떤 value로 바꾸는지에 따라 속도감이 달라집니다." />
      <div className="easing-page__callout"><code>value = ease(progress)</code><p><code>progress</code>는 0에서 1까지 흐르는 시간 비율이고, 반환 <code>value</code>가 현재 property에 적용될 비율입니다. elastic처럼 0~1을 잠시 벗어나는 ease도 있습니다.</p></div>
      <p><code>family</code>는 curve의 기본 모양을 묶은 이름입니다. <code>none</code>과 <code>power0</code>는 같은 linear curve입니다. <code>.in</code>은 느리게 시작해 빨라지고, <code>.out</code>은 빠르게 시작해 느려지며, <code>.inOut</code>은 시작과 끝을 모두 느리게 만듭니다.</p>
      <ul className="easing-page__token-list">{coreEaseFamilies.map((ease) => <li key={ease}><code>{ease}</code></li>)}</ul>
      <EaseCurveExplorer />
      <p className="easing-page__boundary">공식 visualizer는 Alt/Option으로 point 추가·smooth/corner 전환·handle 조절, Shift로 multi-select, Delete로 삭제, Ctrl-Z로 undo를 지원합니다. 이 페이지는 편집기를 복제하지 않고 curve를 읽는 법만 다룹니다.</p>
    </section>
  )
}
