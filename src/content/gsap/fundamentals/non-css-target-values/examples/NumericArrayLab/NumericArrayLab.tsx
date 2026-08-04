/** 배열 보간을 조작·관찰·코드로 동시에 확인하는 학습 패널을 조립한다. */
import type { ArrayEase, DestinationShape } from './useNumericArrayAnimation'
import { useNumericArrayAnimation } from './useNumericArrayAnimation'
import './NumericArrayLab.css'

// radio에 노출할 목적지 길이 선택지와 읽기 쉬운 이름이다
const shapeOptions: { value: DestinationShape; label: string }[] = [
  { value: 'equal', label: '같은 길이 (4칸 → 4칸)' },
  { value: 'shorter', label: '짧은 목적지 (4칸 → 2칸)' },
]

// radio에 노출할 ease 후보와 읽기 쉬운 이름이다
const easeOptions: { value: ArrayEase; label: string }[] = [
  { value: 'none', label: 'none (등속)' },
  { value: 'power1.inOut', label: 'power1.inOut' },
]

export function NumericArrayLab() {
  // runtime이 소유한 controls·descriptor·관찰값을 그대로 받아 화면에만 쓴다
  const { scope, shape, setShape, ease, setEase, progress, setProgress, descriptor, rows } = useNumericArrayAnimation()

  // 실행에 쓰인 descriptor 값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `const arr = [${descriptor.startArray.join(', ')}]

const tween = gsap.to(arr, {
  endArray: [${descriptor.endArray.join(', ')}],
  ease: '${descriptor.ease}',
  duration: 1,
  paused: true,
})

// 재생 대신 헤드를 직접 옮깁니다.
tween.progress(${descriptor.progress})

arr // [${rows.map((row) => row.current).join(', ')}]`

  return (
    <section className="numeric-array-lab" aria-labelledby="numeric-array-lab-title">
      <h3 id="numeric-array-lab-title">배열의 각 칸이 어떻게 변하는지 보기</h3>
      <p className="numeric-array-lab__goal">
        progress를 직접 옮겨 각 index가 그 시점에 어떤 값인지 확인하세요. 목적지 길이를 짧게 바꾸면 어느 칸이 멈춰 있는지도 보입니다.
      </p>

      <div className="numeric-array-lab__body" ref={scope}>
        <div className="numeric-array-lab__table-wrap">
          <table className="numeric-array-lab__table">
            <caption>progress {descriptor.progress}에서 각 index의 값</caption>
            <thead>
              <tr>
                <th scope="col">index</th>
                <th scope="col">시작</th>
                <th scope="col">현재</th>
                <th scope="col">목적지</th>
                <th scope="col">상태</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.index}>
                  <th scope="row">{row.index}</th>
                  <td>{row.start}</td>
                  <td>{row.current}</td>
                  <td>{row.end === null ? '없음' : row.end}</td>
                  <td>{row.shared ? '양쪽에 있음 · 움직임' : '목적지에 없음 · 그대로'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <fieldset className="numeric-array-lab__controls">
          <legend>조절할 값</legend>

          <label htmlFor="numeric-array-progress">progress</label>
          <output htmlFor="numeric-array-progress">{progress}</output>
          <input
            id="numeric-array-progress"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
          />

          <div className="numeric-array-lab__radio-group" role="radiogroup" aria-labelledby="numeric-array-shape-label">
            <p id="numeric-array-shape-label">목적지 배열 길이</p>
            {shapeOptions.map((option) => (
              <label key={option.value} htmlFor={`numeric-array-shape-${option.value}`}>
                <input
                  id={`numeric-array-shape-${option.value}`}
                  type="radio"
                  name="numeric-array-shape"
                  value={option.value}
                  checked={shape === option.value}
                  onChange={() => setShape(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className="numeric-array-lab__radio-group" role="radiogroup" aria-labelledby="numeric-array-ease-label">
            <p id="numeric-array-ease-label">ease</p>
            {easeOptions.map((option) => (
              <label key={option.value} htmlFor={`numeric-array-ease-${option.value}`}>
                <input
                  id={`numeric-array-ease-${option.value}`}
                  type="radio"
                  name="numeric-array-ease"
                  value={option.value}
                  checked={ease === option.value}
                  onChange={() => setEase(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <pre className="numeric-array-lab__code">
        <code>{code}</code>
      </pre>

      <div className="numeric-array-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            progress를 옮기면 표의 <strong>현재</strong> 열이 전부 바뀝니다. 배열이 새로 만들어지는 게 아니라{' '}
            <strong>같은 배열의 각 칸이 제자리에서</strong> 바뀝니다. 코드 맨 아래 줄이 그 배열을 그대로 출력한 결과입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            목적지를 <strong>짧은 목적지</strong>로 바꿔 보세요. index 2와 3은 <code>3</code>, <code>4</code>에서 멈춰 있습니다.
            목적지 배열에 그 자리가 없기 때문입니다. ease를 바꾸면 같은 progress인데 현재 값이 달라지는 것도 확인할 수 있습니다.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            공식 문서의 문장은 <strong>"양쪽 배열에 모두 있는 index만 animate된다"</strong>입니다. 짝이 없는 칸은 계산 대상이 아니라
            건드려지지 않고 남습니다. 값이 0으로 초기화되거나 배열에서 빠지는 게 아닙니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            좌표 배열, 색 채널 배열, 그래프 데이터처럼 <strong>숫자 여러 개가 한 묶음</strong>인 값을 한 번에 움직일 때 씁니다. canvas나
            WebGL처럼 DOM이 아닌 곳에 그리는 경우, 배열을 보간해 두고 <code>onUpdate</code>에서 그리는 방식이 자주 쓰입니다.
          </p>
        </article>
      </div>

      <p className="numeric-array-lab__source">
        실행 코드 위치 · <code>examples/NumericArrayLab/useNumericArrayAnimation.ts</code>
      </p>
    </section>
  )
}
