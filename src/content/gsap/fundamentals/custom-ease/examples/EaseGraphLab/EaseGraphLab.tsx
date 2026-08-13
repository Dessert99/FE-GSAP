/** getSVGData()의 인자를 바꿔 가며 반환된 문자열과 그려진 곡선을 함께 확인하는 학습 패널을 조립한다. */
import type { GraphEaseId } from './useEaseGraphRuntime'
import { useEaseGraphRuntime } from './useEaseGraphRuntime'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './EaseGraphLab.css'

// radio에 노출할 ease 후보와 그것이 직접 만든 곡선인지 표준 ease인지 알려 주는 이름이다
const easeOptions: { value: GraphEaseId; label: string }[] = [
  { value: 'graphHop', label: 'graphHop (직접 만든 곡선)' },
  { value: 'graphSmooth', label: 'graphSmooth (직접 만든 곡선)' },
  { value: 'power2.out', label: 'power2.out (표준 ease)' },
]

export function EaseGraphLab() {
  // runtime이 소유한 controls·descriptor·반환 문자열을 그대로 받아 화면에만 쓴다
  const { easeId, setEaseId, width, setWidth, height, setHeight, offset, setOffset, descriptor, data } =
    useEaseGraphRuntime()

  // 여백을 양쪽에 두어 곡선이 잘리지 않도록 뷰포트를 descriptor 값에서 계산한다
  const viewBox = `0 0 ${descriptor.width + descriptor.offset * 2} ${descriptor.height + descriptor.offset * 2}`

  // 실행에 쓰인 descriptor와 반환값을 코드 문법으로만 포맷한다. 의미를 다시 조립하지 않는다
  const code = `${descriptor.easeData ? `// 앱이 로드될 때 한 번만 만듭니다.\nCustomEase.create('${descriptor.easeId}', '${descriptor.easeData}')\n\n` : "// power2.out은 표준 ease라 만들 필요가 없습니다.\n\n"}const d = CustomEase.getSVGData('${descriptor.easeId}', {
  width: ${descriptor.width},
  height: ${descriptor.height},
  x: ${descriptor.offset},
  y: ${descriptor.offset},
  path: '${descriptor.pathSelector}',
})

d // '${data}'`

  return (
    <section className="ease-graph-lab" aria-labelledby="ease-graph-lab-title">
      <h3 id="ease-graph-lab-title">같은 곡선을 원하는 크기의 그래프로 뽑기</h3>
      <p className="ease-graph-lab__goal">
        ease를 하나 고르고 크기를 바꿔 보세요. <code>getSVGData()</code>가 돌려주는 문자열 하나가 어떻게 달라지는지, 그리고 그 문자열이
        곧 화면의 곡선이 되는지 확인하는 것이 목표입니다.
      </p>

      <div className="ease-graph-lab__body">
        <div className="ease-graph-lab__canvas">
          <svg viewBox={viewBox} role="img" aria-labelledby="ease-graph-lab-figure-title">
            <title id="ease-graph-lab-figure-title">
              {`${descriptor.easeId} 곡선을 가로 ${descriptor.width}px, 세로 ${descriptor.height}px 크기로 그린 그래프`}
            </title>
            <rect
              className="ease-graph-lab__frame"
              x={descriptor.offset}
              y={descriptor.offset}
              width={descriptor.width}
              height={descriptor.height}
            />
            <path id="ease-graph-lab-path" className="ease-graph-lab__curve" />
          </svg>
          <p className="ease-graph-lab__legend">
            사각형이 값 0에서 1까지의 범위입니다. <strong>아래 변이 값 0, 위 변이 값 1</strong>입니다.
          </p>
        </div>

        <fieldset className="ease-graph-lab__controls">
          <legend>조절할 값</legend>

          <div className="ease-graph-lab__radio-group" role="radiogroup" aria-labelledby="ease-graph-ease-label">
            <p id="ease-graph-ease-label">그릴 ease</p>
            {easeOptions.map((option) => (
              <label key={option.value} htmlFor={`ease-graph-ease-${option.value}`}>
                <input
                  id={`ease-graph-ease-${option.value}`}
                  type="radio"
                  name="ease-graph-ease"
                  value={option.value}
                  checked={easeId === option.value}
                  onChange={() => setEaseId(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>

          <label htmlFor="ease-graph-width">width</label>
          <output htmlFor="ease-graph-width">{width}px</output>
          <input
            id="ease-graph-width"
            type="range"
            min="120"
            max="360"
            step="20"
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
          />

          <label htmlFor="ease-graph-height">height</label>
          <output htmlFor="ease-graph-height">{height}px</output>
          <input
            id="ease-graph-height"
            type="range"
            min="80"
            max="240"
            step="20"
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
          />

          <label htmlFor="ease-graph-offset">x와 y (여백)</label>
          <output htmlFor="ease-graph-offset">{offset}px</output>
          <input
            id="ease-graph-offset"
            type="range"
            min="0"
            max="24"
            step="4"
            value={offset}
            onChange={(event) => setOffset(Number(event.target.value))}
          />
        </fieldset>
      </div>

      <pre className="ease-graph-lab__code">
        <code>{code}</code>
      </pre>

      <div className="ease-graph-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            크기를 바꾸면 <strong>곡선의 모양은 그대로인데 좌표 숫자만 커지고 작아집니다.</strong> <code>getSVGData()</code>는 곡선을
            바꾸는 함수가 아니라, 이미 있는 곡선을 <strong>내가 정한 픽셀 크기로 옮겨 적어 주는</strong> 함수이기 때문입니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            <code>power2.out</code>을 골라 보세요. 직접 만든 곡선이 아닌 <strong>표준 ease도 그대로 그려집니다.</strong> 공식 문서가
            "CustomEase나 그 ID, 또는 <code>power2</code> 같은 표준 ease도 넘길 수 있다"고 적은 그대로입니다. 반환된 문자열의 첫
            좌표가 사각형의 <strong>왼쪽 아래</strong>라는 것도 확인해 보세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            SVG 화면 좌표는 <strong>y가 아래로 갈수록 커집니다.</strong> 그래서 GSAP 3.15.0에서 실행해 확인해 보니 값 0이{' '}
            <code>y = {descriptor.offset + descriptor.height}</code>, 값 1이 <code>y = {descriptor.offset}</code>으로 나왔습니다. 이 좌표
            방향은 GSAP 3.15.0에서 확인했습니다. 같은 확인에서 <code>width</code>·<code>height</code>를
            생략하면 <strong>100 × 100</strong>이 쓰였습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            디자인 시스템 문서에 우리 팀이 쓰는 ease 곡선을 <strong>그림으로 나란히 보여 줄 때</strong> 씁니다. 곡선을 직접 그리는 코드를
            따로 만들지 않고, 이미 정의된 ease 이름만 넘기면 <code>&lt;path&gt;</code> 하나가 채워집니다.
          </p>
        </article>
      </div>

      <p className="ease-graph-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/custom-ease/examples/EaseGraphLab/useEaseGraphRuntime.ts" />
      </p>
    </section>
  )
}
