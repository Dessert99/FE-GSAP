/** 반복 Tween의 playhead를 current cycle과 전체 virtual timeline으로 먼저 정의한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function PlayheadMentalModelSection() {
  return (
    <section className="tween-playhead-page__section" aria-labelledby="playhead-mental-model">
      <SectionHeading number="01" id="playhead-mental-model" title="한 playhead를 두 범위로 읽습니다" description="current cycle은 이번 회차만, total 범위는 repeats와 repeatDelay까지 포함합니다." />
      <p><strong>playhead</strong>는 애니메이션이 현재 가리키는 위치입니다. <strong>cycle</strong>은 Tween이 처음부터 끝까지 한 번 재생되는 구간이고, <strong>repeatDelay</strong>는 다음 cycle을 시작하기 전에 기다리는 시간입니다.</p>
      <div className="tween-playhead-page__timeline" aria-label="한 번 반복해 두 cycle로 재생되는 Tween의 시간축"><span>cycle 1 · 0→2초</span><span>repeatDelay · 1초</span><span>cycle 2 · 0→2초</span></div>
      <p><code>progress()</code>와 <code>time()</code>은 cycle이 바뀌면 다시 시작합니다. <code>totalProgress()</code>와 <code>totalTime()</code>은 전체 virtual playhead를 한 번만 앞으로 읽습니다.</p>
    </section>
  )
}
