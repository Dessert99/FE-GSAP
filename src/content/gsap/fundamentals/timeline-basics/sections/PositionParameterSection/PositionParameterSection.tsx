/** position 문법 전체를 기준점·상대 단위·실측 startTime으로 묶어 child가 놓이는 자리를 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function PositionParameterSection() {
  return (
    <section id="position-parameter" className="timeline-page__section" aria-labelledby="position-parameter-title">
      <SectionHeading number="05" id="position-parameter" title="세 번째 인자가 놓일 자리를 정한다" description="position은 delay가 아니라 Timeline 안 삽입 좌표입니다. 끝·label·최근 child의 시작과 끝을 기준점으로 선택합니다." />

      <div className="timeline-page__prose">
        <p>공식 문서는 position이 tween·label·callback·pause·중첩 Timeline까지 어디에 삽입할지 정하는 핵심이라고 설명합니다. creator에서는 보통 vars 뒤 마지막 인자이며 생략하면 Timeline 끝입니다.</p>
      </div>

      <div className="timeline-page__table-wrap">
        <table className="timeline-page__table">
          <caption>공식 position 형태와 예제 전체</caption>
          <thead><tr><th scope="col">기준</th><th scope="col">형태</th><th scope="col">뜻</th></tr></thead>
          <tbody>
            <tr><th scope="row">Timeline 시작</th><td><code>3</code></td><td>시작에서 정확히 3초</td></tr>
            <tr><th scope="row">Timeline 끝</th><td><code>{"'+=1', '-=1'"}</code></td><td>끝에서 1초 뒤 gap / 끝보다 1초 앞 overlap</td></tr>
            <tr><th scope="row">label</th><td><code>{"'someLabel', 'someLabel+=2'"}</code></td><td>label 시각 / label에서 2초 뒤, 없는 label은 끝에 생성</td></tr>
            <tr><th scope="row">최근 child 시작</th><td><code>{"'<', '<1', '<-2', '<+=3', '<3'"}</code></td><td>시작 / 시작 뒤 1초 / 시작 앞 2초 / 시작 뒤 3초 두 표기</td></tr>
            <tr><th scope="row">최근 child 끝</th><td><code>{"'>', '>1', '>-2', '>-0.5'"}</code></td><td>끝 / 끝 뒤 1초 / 끝 앞 2초 / 끝 앞 0.5초</td></tr>
            <tr><th scope="row">삽입 child 비율</th><td><code>{"'-=25%', '+=50%', '<+=25%', 'myLabel+=30%'"}</code></td><td><code>+=/-=</code> 뒤 percentage는 지금 삽입하는 child의 total duration 기준</td></tr>
            <tr><th scope="row">최근 child 비율</th><td><code>{"'<25%', '>-75%'"}</code></td><td><code>&lt;/&gt;</code> 바로 뒤 percentage는 최근 child total duration 기준이며 두 예는 같은 위치</td></tr>
          </tbody>
        </table>
      </div>

      <div className="timeline-page__note">
        <h3>퍼센트의 분모가 두 가지입니다</h3>
        <p><code>&quot;&lt;25%&quot;</code>는 이전 child 길이의 25%, <code>&quot;&lt;+=25%&quot;</code>는 지금 삽입하는 child 길이의 25%입니다. total duration에는 repeat와 yoyo가 포함되고 percentage position은 GSAP 3.7.0에 추가됐습니다.</p>
        <p>creator 네 페이지는 이 문법 뒤에 interactive timeline 시각화와 영상이 있는 Position Parameter 글을 꼭 읽으라는 별도 절도 제공합니다.</p>
      </div>

      <div className="timeline-page__warning">
        <h3>previous는 시간상 마지막 child가 아닙니다</h3>
        <p>공식 각주의 previous animation은 <strong>가장 최근에 삽입한 child</strong>입니다. 10초 child 뒤에 1초 child를 0초에 넣고 <code>&quot;&gt;&quot;</code>를 쓰면 실행 결과는 10초가 아니라 최근 삽입 child의 끝인 1초였습니다.</p>
      </div>

      <div className="timeline-page__table-wrap">
        <table className="timeline-page__table">
          <caption>앞선 child 1초 · mark label 0.5초 · 삽입 child 2초 조건의 GSAP 3.15.0 startTime()</caption>
          <thead><tr><th scope="col">position</th><th scope="col">실제 startTime</th><th scope="col">관찰</th></tr></thead>
          <tbody>
            <tr><th scope="row">생략 / <code>&quot;+=0&quot;</code></th><td>1 / 1</td><td>둘 다 현재 끝</td></tr>
            <tr><th scope="row"><code>&quot;&lt;&quot;</code> / <code>&quot;&gt;&quot;</code></th><td>0 / 1</td><td>최근 child 시작 / 끝</td></tr>
            <tr><th scope="row"><code>&quot;&lt;+=3&quot;</code> / <code>&quot;&lt;3&quot;</code></th><td>3 / 3</td><td>두 표기가 같음</td></tr>
            <tr><th scope="row"><code>&quot;&gt;-0.5&quot;</code></th><td>0.5</td><td>최근 child 끝 1에서 0.5 앞</td></tr>
            <tr><th scope="row"><code>&quot;-=25%&quot;</code></th><td>0.5</td><td>삽입 child 2초의 25%만큼 현재 끝보다 앞</td></tr>
            <tr><th scope="row"><code>&quot;&lt;25%&quot;</code> / <code>&quot;&lt;+=25%&quot;</code></th><td>0.25 / 0.5</td><td>이전 child 1초 / 삽입 child 2초 기준</td></tr>
            <tr><th scope="row"><code>&quot;mark+=30%&quot;</code></th><td>1.1</td><td>label 0.5 + 삽입 child 2초의 30%</td></tr>
          </tbody>
        </table>
      </div>

      <div className="timeline-page__note timeline-page__note--probe">
        <h3>Timeline 시작보다 앞에도 놓일 수 있습니다</h3>
        <p><code>&quot;&lt;-2&quot;</code>로 넣은 child의 startTime은 -2였고 Timeline duration은 -2부터 1까지의 폭인 3이 됐습니다. 공식은 음수 표기를 보여 주지만 이 계산 결과는 게시하지 않습니다.</p>
      </div>

      <p className="timeline-page__boundary">to·from·fromTo 페이지는 같은 position 절과 <code>tl.to(...)</code> 예제를 반복합니다. set 페이지는 제목과 예제 호출만 <code>set()</code>으로 바꾸고 나머지 규칙을 그대로 게시합니다.</p>
    </section>
  )
}
