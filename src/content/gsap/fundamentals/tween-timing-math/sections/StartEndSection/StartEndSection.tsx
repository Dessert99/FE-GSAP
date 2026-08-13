/** 부모 시간축 위의 시작점과 끝점을 공식 예제와 실행으로 확인한 식으로 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 startTime 문서의 코드 예제 원문
const officialStartTimeCode = `//gets current start time
var start = myAnimation.startTime();
//sets the start time
myAnimation.startTime(2);`

// 공식 endTime 문서의 코드 예제 원문 — 숫자 1.5와 1이 이 섹션의 핵심 근거다
const officialEndTimeCode = `var tl = gsap.timeline();//create a 1-second tween
var tween = gsap.to(e, { duration: 1, x: 100 });
//insert the tween at 0.5 seconds into the timeline
tl.add(tween, 0.5);
console.log(tween.endTime()); //1.5
//double the speed of the tween, thus it'll finish in half the normal time
tween.timeScale(2);
console.log(tween.endTime()); //1`

// 두 메서드가 서로 어떻게 다른지를 인자·반환·기본값 축으로 나란히 놓는다
const comparison = [
  {
    id: 'start-time',
    name: 'startTime()',
    signature: 'startTime( value:Number ) : [Number | self]',
    argument: 'value: Number (기본값 NaN)',
    canSet: '있음 — 숫자를 주면 시작 지점을 옮깁니다.',
    means: '부모 timeline 위에서 이 애니메이션이 시작하는 시각. 정의된 delay가 반영된 뒤의 값입니다.',
  },
  {
    id: 'end-time',
    name: 'endTime()',
    signature: 'endTime( includeRepeats:Boolean ) : Number',
    argument: 'includeRepeats: Boolean (기본값 true)',
    canSet: '없음 — 언제나 Number만 돌려줍니다.',
    means: '부모 timeline의 local time 기준으로 이 애니메이션이 끝나는 시각. timeScale이 반영됩니다.',
  },
]

export function StartEndSection() {
  return (
    <section id="start-end" className="timing-page__section" aria-labelledby="start-end-title">
      <SectionHeading
        number="04"
        id="start-end"
        title="부모 시간축 위의 시작점과 끝점"
        description="지금까지의 duration과 totalDuration은 길이였습니다. startTime과 endTime은 길이가 아니라 좌표입니다. 어떤 시계를 기준으로 잰 좌표인지가 이 섹션의 전부입니다."
      />

      <div className="timing-page__prose">
        <p>
          길이만으로는 "언제"를 말할 수 없습니다. 2초짜리 tween이라는 사실은 그것이 <strong>몇 초에 시작하는지</strong> 말해 주지 않기
          때문입니다. 그 좌표를 알려 주는 것이 <code>startTime()</code>과 <code>endTime()</code>입니다.
        </p>
        <p>
          두 값 모두 <strong>부모 timeline을 기준으로</strong> 잰 숫자입니다. 전역 시계 기준이 아닙니다. 이 구분이{' '}
          <a href="#global-time">06 섹션</a>의 출발점이 됩니다.
        </p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>좌표를 알려 주는 두 메서드</caption>
          <thead>
            <tr>
              <th scope="col">메서드</th>
              <th scope="col">공식 signature</th>
              <th scope="col">인자</th>
              <th scope="col">setter</th>
              <th scope="col">무엇을 뜻하는가</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((entry) => (
              <tr key={entry.id}>
                <th scope="row">
                  <code>{entry.name}</code>
                </th>
                <td>
                  <code>{entry.signature}</code>
                </td>
                <td>
                  <code>{entry.argument}</code>
                </td>
                <td>{entry.canSet}</td>
                <td>{entry.means}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timing-page__subheading">
        <h3>startTime: delay가 반영된 뒤의 자리</h3>
        <p>
          공식 문서의 예시는 간단합니다. <strong>tween이 timeline의 정확히 3초 지점에서 시작하면 startTime은 3입니다.</strong>
        </p>
      </div>

      <div className="timing-page__split">
        <div className="timing-page__prose">
          <p>
            정의에 <strong>"정의된 delay가 반영된 뒤"</strong>라는 단서가 붙어 있습니다. 즉 <code>startTime</code>은{' '}
            <code>delay</code>와 다른 값이 아니라, <strong>delay까지 계산이 끝난 최종 좌표</strong>입니다.
          </p>
          <p>
            <code>startTime()</code>은 setter이기도 합니다. 숫자를 넣으면 tween을 부모 시간축의 그 지점으로 옮깁니다.
          </p>
        </div>
        <pre className="timing-page__code">
          <code>{officialStartTimeCode}</code>
        </pre>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>배치 위치와 delay는 더해집니다</h3>
        <p>
          공식은 "delay가 반영된 뒤"라고만 하고 <strong>산수는 적지 않습니다.</strong> 자식을 처음 배치하고 이후 timing 변경을 하지 않은
          아래 probe에서는 단순한 덧셈입니다 —{' '}
          <code>startTime = 배치 위치 + delay</code>.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 <code>parent = gsap.timeline(&#123;paused:true&#125;)</code>에{' '}
          <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:1, delay:D&#125;)</code>를 <code>parent.add(tween, POS)</code>로 넣고{' '}
          <code>tween.startTime()</code>을 읽었습니다. <code>(D=0, POS=2)→2</code>, <code>(D=0.75, POS=2)→2.75</code>,{' '}
          <code>(D=1, POS=0)→1</code>, <code>(D=0.75, POS=0)→0.75</code>. 아래 예제는 배치 위치를 <code>0</code>으로 고정했기 때문에{' '}
          <code>startTime</code>이 곧 <code>delay</code>가 됩니다.
        </p>
      </div>

      <div className="timing-page__subheading">
        <h3>endTime: 공식 예제의 숫자를 따라가기</h3>
        <p>
          공식 <code>endTime()</code> 문서의 예제는 이 섹션에서 가장 중요한 코드입니다. 숫자 두 개만 따라가면 규칙이 전부 드러납니다.
        </p>
      </div>

      <pre className="timing-page__code">
        <code>{officialEndTimeCode}</code>
      </pre>

      <div className="timing-page__prose">
        <p>
          첫 번째 <code>1.5</code>는 쉽습니다. timeline의 <code>0.5</code>초 지점에 <code>1</code>초짜리를 넣었으니{' '}
          <code>0.5 + 1 = 1.5</code>입니다.
        </p>
        <p>
          두 번째 <code>1</code>이 이 예제의 핵심입니다. <code>timeScale(2)</code>로 속도를 두 배 올렸더니 끝나는 시각이{' '}
          <code>1.5</code>에서 <code>1</code>로 당겨졌습니다. 시작 지점 <code>0.5</code>는 그대로이고, 걸리는 시간만{' '}
          <code>1</code>초에서 <code>0.5</code>초로 줄어든 것입니다. 공식 문서가 <strong>"endTime은 timeScale을 반영한다"</strong>고
          적어 둔 게 이 뜻입니다.
        </p>
      </div>

      <div className="timing-page__note">
        <h3>includeRepeats를 false로 주면</h3>
        <p>
          <code>endTime()</code>의 인자는 <strong>기본값이 <code>true</code></strong>입니다. 공식 문서의 문장은{' '}
          <strong>"기본적으로 종료 시각을 계산할 때 반복이 포함되지만, false를 넘겨 그것을 막을 수 있다"</strong>입니다. 즉{' '}
          <code>endTime()</code>은 반복까지 다 끝나는 시각이고 <code>endTime(false)</code>는 <strong>첫 회차만</strong> 끝나는
          시각입니다.
        </p>
      </div>

      <div className="timing-page__note timing-page__note--probe">
        <h3>공식이 적지 않은 식 하나 더</h3>
        <p>
          공식은 timeScale이 반영된다고만 하고 식을 적지 않습니다. 재생 가능한 상태이고 <code>timeScale</code>이 0이 아닌 아래
          probe에서 확인한 식은 이것입니다.
        </p>
        <p>
          <code>endTime(true) = startTime + totalDuration ÷ |timeScale|</code>
          <br />
          <code>endTime(false) = startTime + duration ÷ |timeScale|</code>
        </p>
        <p>
          나눗셈이라는 점이 중요합니다. 배속을 올리면 <strong>길이가 줄어드는 게 아니라 걸리는 시간이 줄어듭니다.</strong> 절댓값을 쓰는
          이유는 <code>timeScale(-1)</code>처럼 음수여도 걸리는 시간은 양수이기 때문입니다.
        </p>
        <p className="timing-page__provenance">
          공식 페이지에 없는 내용입니다. GSAP 3.15.0에서 paused timeline의 1초 지점에 넣은 tween에 대해 설정{' '}
          <code>&#123;duration:2&#125;</code>, <code>&#123;duration:2, repeat:2&#125;</code>,{' '}
          <code>&#123;duration:3, repeat:1, repeatDelay:1&#125;</code> 세 가지와 timeScale{' '}
          <code>0.25 / 0.5 / 1 / 2 / 3</code> 다섯 가지를 조합한 15개 경우에서 <code>endTime()</code>과{' '}
          <code>endTime(false)</code>가 모두 위 식과 일치했습니다. 예를 들어 <code>duration 2, repeat 2, timeScale 0.5</code>는{' '}
          <code>endTime 13</code>(= 1 + 6 ÷ 0.5), <code>endTime(false) 5</code>(= 1 + 2 ÷ 0.5)입니다.
        </p>
      </div>

      <div className="timing-page__warning">
        <h3>startTime이 저절로 움직일 수 있습니다</h3>
        <p>
          공식 <code>startTime()</code> 문서의 주의사항입니다. 부모 timeline의 <code>smoothChildTiming</code> 속성이{' '}
          <code>true</code>이고 실행 도중에 <code>reverse()</code> 호출이나 <code>timeScale()</code> 변경 같은{' '}
          <strong>타이밍에 영향을 주는 변화</strong>가 일어나면, 타이밍이 매끄러워 보이도록 <code>startTime</code>이 자동으로 조정될 수
          있습니다.
        </p>
        <p className="timing-page__provenance">
          여기에 실행으로 확인한 사실을 덧붙입니다. GSAP 3.15.0에서 <code>gsap.timeline()</code>으로 만든 timeline의{' '}
          <code>smoothChildTiming</code> <strong>기본값은 <code>false</code></strong>이고,{' '}
          <code>gsap.globalTimeline</code>만 <code>true</code>입니다. 그래서 직접 만든 timeline에서는 이 자동 조정이 기본적으로
          일어나지 않습니다. 확인 방법은 <code>gsap.timeline(&#123;paused:true&#125;).smoothChildTiming</code>과{' '}
          <code>gsap.globalTimeline.smoothChildTiming</code>을 읽는 것입니다. 실제로 <code>smoothChildTiming: true</code>인
          timeline에서 재생 헤드를 2초로 옮긴 뒤 자식에게 <code>timeScale(2)</code>를 걸면 <code>startTime</code>이{' '}
          <code>1</code>에서 <code>1.5</code>로 움직였고, 기본값 <code>false</code>에서는 <code>1</code> 그대로였습니다.
        </p>
      </div>
    </section>
  )
}
