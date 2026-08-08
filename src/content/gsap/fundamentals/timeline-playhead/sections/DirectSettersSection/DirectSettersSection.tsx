/** 네 getter/setter의 signature와 즉시 이동·callback option을 조작 예제로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { CoordinateScrubLab } from '../../examples/CoordinateScrubLab/CoordinateScrubLab'

// 네 메서드가 공유하는 getter/setter signature를 원문 타입으로 보존한다
const signatures = `progress( value:Number, suppressEvents:Boolean ) : [Number | self]
time( value:Number, suppressEvents:Boolean ) : [Number | self]
totalProgress( value:Number, suppressEvents:Boolean ) : [Number | self]
totalTime( time:Number, suppressEvents:Boolean ) : [Number | self]`

// 공식 코드 블록의 getter와 setter 호출을 빠짐없이 보존한다
const officialCalls = `const progress = tl.progress();
tl.progress(0.25);

const currentTime = tl.time();
tl.time(2);

const totalProgress = tl.totalProgress();
tl.totalProgress(0.25);

const totalTime = tl.totalTime();
tl.totalTime(2);`

export function DirectSettersSection() {
  return (
    <section id="direct-setters" className="timeline-playhead-page__section" aria-labelledby="direct-setters-title">
      <SectionHeading number="02" id="direct-setters" title="setter는 다음 frame을 기다리지 않고 이동한다" description="인자를 빼면 현재 좌표를 읽고, 넣으면 같은 Timeline을 새 위치에 즉시 render한 뒤 self를 돌려줍니다." />
      <pre className="timeline-playhead-page__signature"><code>{signatures}</code></pre>
      <div className="timeline-playhead-page__prose"><p>네 메서드의 첫 인자 기본 표기는 <code>NaN</code>입니다. 생략하면 Number getter, 값을 주면 Timeline 자신인 <code>self</code>를 반환하는 setter라 <code>tl.progress(0.5).play()</code>처럼 chaining할 수 있습니다.</p><p><code>suppressEvents</code>를 <code>true</code>로 주면 새 위치까지 건너가는 동안 event와 callback을 실행하지 않습니다. <code>progress</code>, <code>time</code>, <code>totalTime</code> 공식 기본값은 <code>false</code>입니다. <code>totalProgress</code>의 공식 표와 실행 차이는 05에서 분리합니다.</p></div>
      <pre className="timeline-playhead-page__code"><code>{officialCalls}</code></pre>
      <div className="timeline-playhead-page__warning"><h3>공식 코드의 불필요한 마침표</h3><p><code>time()</code>과 <code>totalTime()</code> 공식 코드 블록은 setter 줄 뒤에 단독 <code>.</code> 문자가 있습니다. 로컬 실행 코드는 문법 오류를 만들지 않되 catalog에는 원문 오류를 남겼습니다.</p></div>
      <CoordinateScrubLab />
    </section>
  )
}
