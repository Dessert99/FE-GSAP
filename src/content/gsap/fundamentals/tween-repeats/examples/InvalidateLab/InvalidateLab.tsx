/** 같은 Tween을 다시 재생할 때 시작값이 유지되는지 다시 읽히는지를 조작·기록·코드로 확인하는 학습 패널을 조립한다. */
import { useInvalidateAnimation } from './useInvalidateAnimation'
import './InvalidateLab.css'

export function InvalidateLab() {
  // runtime이 소유한 descriptor·실행 기록·action을 그대로 받아 화면에만 쓴다
  const { scope, descriptor, runs, status, reducedMotion, run, reset } = useInvalidateAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `gsap.set('${descriptor.selector}', { x: 0 })

const tween = gsap.to('${descriptor.selector}', {
  x: '${descriptor.shift}',
  duration: ${descriptor.duration},
  ease: 'none',
  paused: true,
})

function run(kind) {
  // [invalidate() 후 restart()] 버튼만 이전 시작값과 끝값을 지웁니다.
  if (kind === 'invalidate') tween.invalidate()

  // 두 버튼 모두 이번 실행이 실제로 쓰는 시작값과 끝값을 읽습니다.
  tween.progress(0)
  const startX = gsap.getProperty('${descriptor.selector}', 'x')
  tween.progress(1)
  const endX = gsap.getProperty('${descriptor.selector}', 'x')

  ${
    descriptor.reducedMotion
      ? `// 모션 감소 설정에서는 이미 옮긴 끝 위치에 그대로 둡니다.`
      : `// 시작 위치로 되감은 뒤 같은 Tween을 실제로 재생합니다.
  tween.progress(0)
  tween.restart()`
  }
}`

  return (
    <section className="invalidate-lab" aria-labelledby="invalidate-lab-title">
      <h3 id="invalidate-lab-title">같은 Tween을 두 번 재생해 보기</h3>
      <p className="invalidate-lab__goal">
        목적지가 <code>{descriptor.shift}</code>인 Tween 하나가 있습니다. <strong>"지금 위치에서 120만큼 더"</strong>라는 뜻입니다. 두
        버튼을 번갈아 누르면서 아래 기록 표의 <strong>시작 x</strong> 열이 어떻게 달라지는지 보세요.
      </p>

      <div className="invalidate-lab__body" ref={scope}>
        <div className="invalidate-lab__stage">
          <div className="invalidate-lab__track">
            <div className="invalidate-lab__box" />
          </div>
          <p className="invalidate-lab__legend">상자는 트랙 왼쪽 끝에서 시작합니다.</p>
        </div>

        <div className="invalidate-lab__controls">
          <button type="button" onClick={() => run('restart')}>
            restart()만
          </button>
          <button type="button" onClick={() => run('invalidate')}>
            invalidate() 후 restart()
          </button>
          <button type="button" className="invalidate-lab__reset" onClick={reset}>
            처음으로 되돌리기
          </button>
        </div>
      </div>

      <p className="invalidate-lab__status" role="status">
        {status}
        {reducedMotion ? ' (모션 감소 설정이 켜져 있어 이동 없이 결과만 표시합니다.)' : ''}
      </p>

      <div className="invalidate-lab__table-wrap">
        <table className="invalidate-lab__table">
          <caption>실행할 때마다 Tween이 실제로 쓴 값</caption>
          <thead>
            <tr>
              <th scope="col">회</th>
              <th scope="col">누른 버튼</th>
              <th scope="col">시작 x</th>
              <th scope="col">끝 x</th>
            </tr>
          </thead>
          <tbody>
            {runs.length === 0 ? (
              <tr>
                <td colSpan={4}>아직 실행 기록이 없습니다.</td>
              </tr>
            ) : (
              runs.map((row) => (
                <tr key={row.index}>
                  <th scope="row">{row.index}</th>
                  <td>{row.kind === 'invalidate' ? 'invalidate() 후 restart()' : 'restart()만'}</td>
                  <td>{row.startX}</td>
                  <td>{row.endX}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <pre className="invalidate-lab__code">
        <code>{code}</code>
      </pre>

      <div className="invalidate-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            <strong>restart()만</strong> 누르면 몇 번을 눌러도 시작 x가 <code>0</code>입니다. 상자가 왼쪽 끝으로 되돌아갔다가 다시
            갑니다. <strong>invalidate() 후 restart()</strong>를 누르면 시작 x가 <strong>지금 서 있는 자리</strong>로 바뀌고 상자가 거기서
            120만큼 더 갑니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            기록 표의 <strong>시작 x</strong> 열만 보세요. <code>restart()</code>만 쓰면 이 열이 계속 <code>0</code>으로 고정입니다.{' '}
            <code>invalidate()</code>를 한 번 끼워 넣은 순간부터 <code>0 → 120 → 240</code>처럼 올라갑니다. 코드의 목적지 문자열은 한 번도
            바뀌지 않았는데 결과가 달라집니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            Tween은 처음 재생될 때 <code>{descriptor.shift}</code>를 풀어서 <strong>시작 0, 끝 120</strong>이라는 구체적인 숫자로 적어
            둡니다. 그 뒤로는 이 적어 둔 숫자만 씁니다. 공식 문서의 표현으로 <code>invalidate()</code>는{' '}
            <strong>"내부에 기록된 시작·끝 값 같은 초기화 데이터를 지우는"</strong> 일이고, 지워지면 다음 render에서{' '}
            <code>vars</code>를 다시 읽습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            화면 크기가 바뀌어 <strong>목적지 좌표를 다시 재야 할 때</strong>, 또는 <code>random()</code>이나 함수로 적은 목적지를{' '}
            <strong>매번 새로 뽑고 싶을 때</strong> 씁니다. 반복할 때마다 다시 읽고 싶은 것뿐이라면 버튼 대신{' '}
            <code>repeatRefresh: true</code>를 쓰면 됩니다.
          </p>
        </article>
      </div>

      <p className="invalidate-lab__source">
        실행 코드 위치 · <code>examples/InvalidateLab/useInvalidateAnimation.ts</code>
      </p>
    </section>
  )
}
