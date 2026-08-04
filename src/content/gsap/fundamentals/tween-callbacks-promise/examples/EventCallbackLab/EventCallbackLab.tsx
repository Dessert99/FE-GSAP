/** getter 반환·덮어쓰기·삭제를 버튼으로 조작하며 관찰하는 학습 패널을 조립한다. */
import { useEventCallbackRuntime } from './useEventCallbackRuntime'
import './EventCallbackLab.css'

export function EventCallbackLab() {
  // runtime이 소유한 관찰값과 조작 action을 그대로 받아 화면에만 쓴다
  const { scope, eventType, observation, status, apply, run } = useEventCallbackRuntime()

  // 실행에 쓰인 event type과 현재 등록 상태를 코드 문법으로만 포맷한다
  const code = `// 지금 등록된 콜백을 읽습니다 (인자 하나 = getter)
tween.eventCallback('${eventType}')
// → ${observation.getterResult}

// 콜백을 겁니다 (인자 둘 = setter, tween 자신을 돌려줍니다)
tween.eventCallback('${eventType}', myFunction)

// 콜백을 지웁니다
tween.eventCallback('${eventType}', null)`

  return (
    <section className="event-callback-lab" aria-labelledby="event-callback-lab-title">
      <h3 id="event-callback-lab-title">콜백을 걸고 읽고 지워 보기</h3>
      <p className="event-callback-lab__goal">
        하나의 Tween에 <code>{eventType}</code> 콜백을 걸었다 지웠다 하면서, getter가 무엇을 돌려주는지와 실제로 몇 번 불리는지를
        확인하세요.
      </p>

      <div className="event-callback-lab__body" ref={scope}>
        <dl className="event-callback-lab__observation">
          <div>
            <dt id="ecl-getter">getter가 돌려준 값</dt>
            <dd>
              <output aria-labelledby="ecl-getter">{observation.getterResult}</output>
            </dd>
          </div>
          <div>
            <dt id="ecl-registered">지금 걸려 있는 함수</dt>
            <dd>
              <output aria-labelledby="ecl-registered">{observation.registeredLabel}</output>
            </dd>
          </div>
          <div>
            <dt id="ecl-count">콜백이 불린 횟수</dt>
            <dd>
              <output aria-labelledby="ecl-count">{observation.fireCount}회</output>
            </dd>
          </div>
          <div>
            <dt id="ecl-last">마지막으로 불린 함수</dt>
            <dd>
              <output aria-labelledby="ecl-last">{observation.lastFired}</output>
            </dd>
          </div>
        </dl>

        <fieldset className="event-callback-lab__controls">
          <legend>조작</legend>
          <button type="button" onClick={() => apply('set')}>
            첫 번째 함수 걸기
          </button>
          <button type="button" onClick={() => apply('replace')}>
            두 번째 함수로 덮어쓰기
          </button>
          <button type="button" onClick={() => apply('clear')}>
            null로 지우기
          </button>
          <button type="button" onClick={run}>
            재생해서 완료시키기
          </button>
        </fieldset>
      </div>

      <p className="event-callback-lab__status" role="status">
        {status}
      </p>

      <pre className="event-callback-lab__code">
        <code>{code}</code>
      </pre>

      <div className="event-callback-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            콜백을 걸면 getter가 <code>undefined</code>에서 <code>function</code>으로 바뀝니다. 지우면 다시{' '}
            <code>undefined</code>로 돌아갑니다. 같은 메서드 이름인데 인자 개수만으로 읽기와 쓰기가 갈립니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <strong>덮어쓰기</strong>를 누른 뒤 재생해 보세요. 호출 횟수는 <strong>1만 늘어납니다.</strong> 두 함수가 모두 불리는 게
            아니라 나중 것만 남습니다. 지운 뒤 재생하면 횟수가 아예 늘지 않습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서가 밝힌 대로 <strong>event type 하나에 콜백은 하나</strong>입니다. GSAP은 목록이 아니라 자리 하나를 들고 있어서, 새
            값을 넣으면 이전 값이 그 자리에서 밀려납니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            재사용하는 animation 하나를 상황에 따라 다르게 끝맺을 때 씁니다. 모달을 닫는 animation은 같은데 닫힌 뒤 할 일이 화면마다
            다르다면, Tween을 다시 만들지 않고 <code>onComplete</code>만 갈아 끼우면 됩니다.
          </p>
        </article>
      </div>

      <p className="event-callback-lab__source">
        실행 코드 위치 · <code>examples/EventCallbackLab/useEventCallbackRuntime.ts</code>
      </p>
    </section>
  )
}
