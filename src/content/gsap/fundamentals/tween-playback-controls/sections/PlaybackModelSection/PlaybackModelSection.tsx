/** 여덟 메서드를 외우기 전에 재생 상태가 스위치 둘과 계산값 하나로 이뤄진다는 멘탈 모델을 먼저 세운다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 두 스위치를 "무엇을 정하는가 / 조상을 보는가 / 처음 값을 어디서 주는가"로 나란히 비교하는 정적 표의 데이터
const switches = [
  {
    id: 'paused',
    label: 'paused',
    question: '지금 시간이 흐르고 있나?',
    onMeans: 'true — 시간이 멈춰 있다',
    offMeans: 'false — 시간이 흐른다',
    ancestors: '보지 않는다. 자기 값만 돌려준다.',
    initial: 'vars에 paused: true를 적는다',
  },
  {
    id: 'reversed',
    label: 'reversed',
    question: '시간이 어느 쪽으로 흐르나?',
    onMeans: 'true — 끝에서 처음 쪽으로',
    offMeans: 'false — 처음에서 끝 쪽으로',
    ancestors: '보지 않는다. yoyo 반복에도 영향받지 않는다.',
    initial: '공식 페이지에 명시 없음',
  },
]

// isActive()가 true가 되는 조건과 false가 되는 조건을 공식 문장 그대로 갈라 놓은 정적 표의 데이터
const activityCases = [
  { id: 'middle', when: 'tween이 진행 중일 때', result: 'active', why: '공식 문장 — "if a tween is in the middle of tweening, it\'s active"' },
  { id: 'on-start', when: 'playhead가 시작 시각 바로 위에 있을 때', result: 'active', why: '아직 렌더되지 않았더라도 active로 친다' },
  { id: 'before', when: '아직 시작하지 않았을 때', result: 'active 아님', why: 'playhead가 time span 밖에 있다' },
  { id: 'after', when: '끝난 뒤', result: 'active 아님', why: 'playhead가 time span을 이미 지나갔다' },
  { id: 'self-paused', when: '자기 자신이 멈춰 있을 때', result: 'active 아님', why: '멈춰 있으면 playhead가 움직이지 않는다' },
  { id: 'ancestor-paused', when: '조상 timeline 중 하나라도 멈춰 있을 때', result: 'active 아님', why: '두 스위치와 달리 isActive()는 조상까지 본다' },
]

export function PlaybackModelSection() {
  return (
    <section id="playback-model" className="playback-page__section" aria-labelledby="playback-model-title">
      <SectionHeading
        number="01"
        id="playback-model"
        title="재생 상태는 스위치 두 개로 정해진다"
        description="메서드 이름을 여덟 개 외우는 대신, 이 메서드들이 무엇을 건드리는지를 먼저 봅니다. 실제로 건드릴 수 있는 것은 스위치 두 개뿐입니다."
      />

      <div className="playback-page__prose">
        <p>
          먼저 용어 셋을 정하겠습니다. <strong>playhead</strong>는 음악 플레이어의 재생 막대처럼 "지금 animation의 몇 초 지점을 보고
          있는가"를 가리키는 표시입니다. <strong>instance</strong>는 <code>gsap.to()</code>가 돌려준 Tween 객체 하나를 말합니다. 공식
          문서가 반환값에 적는 <strong>self</strong>는 "그 Tween 자신"이라는 뜻입니다.
        </p>
        <p>
          Tween 하나의 재생 상태는 스위치 두 개로 정해집니다. <strong>시간이 흐르는가</strong>(<code>paused</code>)와{' '}
          <strong>어느 쪽으로 흐르는가</strong>(<code>reversed</code>)입니다. 여덟 개의 메서드는 결국 이 두 스위치를 바꾸거나, 지금 값을
          물어보거나, 그 김에 playhead를 옮기는 일을 합니다.
        </p>
        <p>
          그리고 스위치가 <strong>아닌</strong> 값이 하나 있습니다. <code>isActive()</code>는 우리가 켜고 끄는 값이 아니라 두 스위치와
          playhead 위치로 <strong>계산되는 결과</strong>입니다. 그래서 이 값만 읽을 수 있고 쓸 수는 없습니다.
        </p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>바꿀 수 있는 스위치 두 개</caption>
          <thead>
            <tr>
              <th scope="col">스위치</th>
              <th scope="col">정하는 것</th>
              <th scope="col">true일 때</th>
              <th scope="col">false일 때</th>
              <th scope="col">조상 timeline을 보나?</th>
              <th scope="col">처음 값 주기</th>
            </tr>
          </thead>
          <tbody>
            {switches.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <code>{item.label}</code>
                </th>
                <td>{item.question}</td>
                <td>{item.onMeans}</td>
                <td>{item.offMeans}</td>
                <td>{item.ancestors}</td>
                <td>{item.initial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__warning">
        <h3>스위치 값과 눈에 보이는 것이 다를 수 있습니다</h3>
        <p>
          공식 문서가 두 스위치 모두에 대해 같은 경고를 답니다. <strong>두 값은 조상 timeline을 고려하지 않습니다.</strong> 그래서 멈추지
          않은 tween도 부모 timeline이 멈춰 있으면 멈춘 것처럼 보이고, 거꾸로 돌지 않는 tween도 부모가 거꾸로 돌면 거꾸로 도는 것처럼
          보입니다. <code>reversed</code> 값은 <code>yoyo</code> 반복에도 영향받지 않습니다.
        </p>
        <p>
          이럴 때 "실제로 지금 움직이고 있나?"를 묻는 것이 <code>isActive()</code>입니다. 두 스위치와 달리{' '}
          <strong>조상 timeline까지 함께 봅니다.</strong>
        </p>
      </div>

      <div className="playback-page__subheading">
        <h3>계산되는 값 하나 — isActive()</h3>
        <p>공식 문서가 active와 active 아님을 가르는 기준을 그대로 옮겨 정리한 표입니다.</p>
      </div>

      <div className="playback-page__table-wrap">
        <table className="playback-page__table">
          <caption>언제 active이고 언제 아닌가</caption>
          <thead>
            <tr>
              <th scope="col">상황</th>
              <th scope="col">isActive()</th>
              <th scope="col">이유</th>
            </tr>
          </thead>
          <tbody>
            {activityCases.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.when}</th>
                <td>{item.result}</td>
                <td>{item.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playback-page__note">
        <h3>멈춘다고 부모에서 빠지지는 않습니다</h3>
        <p>
          공식 문장입니다. animation을 멈춰도 <strong>부모 timeline에서 제거되지는 않지만</strong>, 부모의 <code>duration</code>과{' '}
          <code>totalDuration</code> 계산에는 <strong>포함되지 않게</strong> 됩니다. 멈춘 자식이 부모의 전체 길이를 늘려 놓지 않는다는
          뜻입니다.
        </p>
        <p>
          같은 이유로 <code>progress()</code>나 <code>totalProgress()</code>로는 "지금 실제로 움직이나"를 알 수 없습니다. 공식 문서가
          짚어 두었듯 그 값들은 <strong>멈춤 상태도, 부모 playhead의 위치도 고려하지 않기</strong> 때문입니다. 두 값의 정확한 의미는{' '}
          <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead 페이지</a>가 다룹니다.
        </p>
      </div>

      <div className="playback-page__note playback-page__note--probe">
        <h3>끝까지 재생돼도 멈춤 스위치는 그대로입니다</h3>
        <p>
          공식 문장입니다. <strong>animation이 완료되어도 paused 상태는 바뀌지 않습니다.</strong> 끝났다고 해서 자동으로{' '}
          <code>paused</code>가 <code>true</code>가 되지 않습니다. 그래서 끝난 Tween의 <code>paused()</code>는 여전히{' '}
          <code>false</code>이고, "안 움직이니까 멈춘 상태겠지"라고 읽으면 틀립니다. 끝났는지 알고 싶으면 멈춤 상태가 아니라 진행률을
          봐야 합니다.
        </p>
        <p className="playback-page__provenance">
          이 문장이 양쪽 방향 모두에 적용되는지는 공식 페이지에 적혀 있지 않아 직접 확인했습니다. GSAP 3.15.0에서{' '}
          <code>paused(true)</code>인 채로 끝까지 보내면 <code>paused()</code>는 <code>true</code>로 남고, 재생해서 자연 완료시키면{' '}
          <code>false</code>로 남습니다. 완료는 어느 쪽으로도 값을 건드리지 않습니다.
        </p>
      </div>
    </section>
  )
}
