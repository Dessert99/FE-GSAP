/** 음수 time의 문서·설치본 차이와 yoyo·clamp·인접 학습 경계를 정리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function CallbacksBoundariesSection() {
  return (
    <section className="tween-playhead-page__section" aria-labelledby="playhead-boundaries">
      <SectionHeading number="06" id="playhead-boundaries" title="음수 입력과 반복 경계를 확인합니다" description="공식 설명과 설치본 동작이 다른 음수 입력은 피하고, 끝 기준 위치를 양수로 계산합니다." />
      <pre><code>{`const currentTime = tween.time()
tween.time(2) // 현재 cycle의 2초로 이동

const currentTotalTime = tween.totalTime()
tween.totalTime(2) // 전체 반복 기준 2초로 이동

const oneSecondBeforeCycleEnd = tween.duration() - 1
tween.time(oneSecondBeforeCycleEnd) // 이번 cycle 끝에서 1초 앞

const twoSecondsBeforeEnd = tween.totalDuration() - 2
tween.totalTime(twoSecondsBeforeEnd) // 끝에서 2초 앞을 양수로 계산`}</code></pre>
      <ul className="tween-playhead-page__boundary-list">
        <li>현재 공식 문서는 음수 <code>time()</code>과 <code>totalTime()</code>을 끝 기준으로 해석한다고 설명합니다. 그러나 이 저장소의 GSAP 3.15.0에서는 <code>time(-1)</code>과 <code>totalTime(-2)</code>가 모두 0으로 이동했고, totalDuration보다 큰 값은 끝으로 제한됐습니다. 끝에서부터 옮기려면 위 코드처럼 duration 또는 totalDuration에서 거리를 빼 양수 위치를 넘기세요.</li>
        <li>duration 2·repeat 3은 local time 0→2를 네 번, totalTime 0→8로 읽습니다. repeatDelay 1을 더하면 totalTime은 0→11입니다.</li>
        <li><code>yoyo:true</code>에서는 local time 방향이 cycle마다 앞·뒤로 교대합니다.</li>
        <li>play/pause/reverse, repeat/yoyo 설정, duration 계산, callback 교체는 각 주제의 학습 페이지에서 이어집니다.</li>
      </ul>
    </section>
  )
}
