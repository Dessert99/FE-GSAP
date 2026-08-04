/** iteration이 1부터 세는 회차 번호이고 setter가 회차 사이를 건너뛴다는 것을 예제와 함께 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { RepeatCycleLab } from '../../examples/RepeatCycleLab/RepeatCycleLab'

// 공식 문서에 실린 getter·setter 코드 예제 원문
const officialCall = `//gets current iteration
var progress = myTween.iteration();

//sets iteration the second iteration
myTween.iteration(2);`

export function IterationNumberSection() {
  return (
    <section id="iteration-number" className="repeats-page__section" aria-labelledby="iteration-number-title">
      <SectionHeading
        number="04"
        id="iteration-number"
        title="지금 몇 회차인지 읽고 옮긴다"
        description="반복하는 Tween에게 지금 몇 번째를 지나고 있는지 물어볼 수 있습니다. 같은 메서드로 다른 회차로 건너뛸 수도 있습니다."
      />

      <div className="repeats-page__prose">
        <p>
          <code>iteration()</code>은 공식 문서의 표현으로 <strong>"반복하는 tween의 iteration(현재 몇 번째 회차인지)을 가져오거나
          설정"</strong>합니다.
        </p>
        <p>
          여기서 헷갈리기 쉬운 것이 <strong>번호를 어디서부터 세느냐</strong>입니다. 배열 index처럼 0부터일 것 같지만 아닙니다. 공식
          문서의 문장은 <strong>"iteration은 맨 처음 지나갈 때 1이고, 첫 번째 repeat에서 2가 되고, 그다음 3이 되는 식"</strong>입니다.{' '}
          <strong>1부터 셉니다.</strong>
        </p>
      </div>

      <div className="repeats-page__note">
        <h3>
          <code>repeat</code>는 0부터, <code>iteration</code>은 1부터
        </h3>
        <p>
          두 숫자가 다른 기준을 쓴다는 것이 이 페이지에서 가장 자주 어긋나는 지점입니다. <code>repeat: 2</code>인 Tween은 회차가 3개이고,
          그 회차들의 번호는 <code>1</code>, <code>2</code>, <code>3</code>입니다. <code>0</code>번 회차는 없습니다.
        </p>
      </div>

      <div className="repeats-page__subheading">
        <h3>다른 회차로 건너뛰기</h3>
        <p>인자를 넘기면 읽는 대신 옮깁니다.</p>
      </div>

      <div className="repeats-page__prose">
        <p>
          공식 문서의 설명입니다. <strong>"iteration을 설정하면 tween이 그 iteration으로 이동한다. repeat가 4이고 playhead가 세 번째
          repeat에 있을 때 <code>.iteration(2)</code>를 부르면 tween이 두 번째 iteration으로 되돌아간다."</strong>
        </p>
      </div>

      <pre className="repeats-page__code">
        <code>{officialCall}</code>
      </pre>

      <div className="repeats-page__note repeats-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          <strong>첫째, 1부터 센다는 규칙에 예외가 없습니다.</strong> 반복이 아예 없는 Tween도, <code>duration</code>이 0인 Tween도,{' '}
          <code>gsap.set()</code>이 만든 Tween도 <code>iteration()</code>이 1입니다. 0이 나오는 경우를 찾지 못했습니다.
        </p>
        <p>
          <strong>둘째, 회차 경계 시각은 끝난 회차에 속합니다.</strong> <code>duration: 1, repeat: 2</code>에서 전체 시간 1.0초는 아직
          1회차이고, 1.0001초가 되어서야 2회차입니다. 맨 마지막 끝에서도 번호가 하나 더 올라가지 않고 마지막 회차에 머뭅니다.
        </p>
        <p>
          <strong>셋째, setter는 회차 안의 위치를 유지한 채 점프하고 범위를 넘으면 잘립니다.</strong> <code>repeat: 4</code>에서 전체 시간
          2.5초(3회차의 절반)일 때 <code>iteration(2)</code>를 부르면 1.5초(2회차의 절반)로 갑니다. <code>iteration(99)</code>처럼 없는
          회차를 넘기면 오류 없이 마지막 회차 끝으로 잘립니다.
        </p>
        <p className="repeats-page__provenance">
          측정 방법 · GSAP 3.15.0. 1부터 세는 규칙은 repeat 0·1·2·-1 × yoyo true·false × repeatDelay 0·0.5의 16개 조합과{' '}
          <code>duration: 0</code>, <code>gsap.set()</code>에서 <code>totalTime</code> 0일 때의 <code>iteration()</code>을 모두 읽어
          확인했습니다(전부 1). 경계는 <code>totalTime()</code>을 0.9999·1·1.0001·2.9999·3초로 옮기며 읽었습니다. setter는{' '}
          <code>repeat: 4</code> Tween에서 <code>totalTime(2.5)</code> 뒤 <code>iteration(2)</code>·<code>iteration(99)</code>를 부르고{' '}
          <code>totalTime()</code>을 다시 읽어 각각 1.5초·5초를 얻었습니다.
        </p>
      </div>

      <RepeatCycleLab />
    </section>
  )
}
