/** getChildren의 네 인자를 직접 바꿔 가며 중첩 트리에서 무엇이 포함되고 무엇이 빠지는지 관찰하는 학습 패널을 조립한다. */
import {
  boxClassName,
  detailSteps,
  masterSteps,
  nestedTimelineId,
  useChildQueryAnimation,
} from './useChildQueryAnimation'
import { RepoFileLink } from '../../../../../../components/demo/RepoFileLink/RepoFileLink'
import './ChildQueryLab.css'

// 공식 Parameters 절의 네 인자를 이름·타입·기본값·설명 그대로 옮긴다
const parameterRows = [
  {
    name: 'nested',
    type: 'Boolean',
    fallback: 'true',
    detail: '중첩 timeline 안에 있는 tween 그리고/또는 timeline을 돌려줄지 결정합니다. "top level"만 원하면 false로 둡니다.',
  },
  { name: 'tweens', type: 'Boolean', fallback: 'true', detail: '결과에 tween을 포함할지 결정합니다.' },
  { name: 'timelines', type: 'Boolean', fallback: 'true', detail: '결과에 timeline을 포함할지 결정합니다.' },
  {
    name: 'ignoreBeforeTime',
    type: 'Number',
    fallback: '-Infinity',
    detail: 'start time이 이 값보다 작은 child는 모두 무시됩니다.',
  },
]

// 네 번째 인자로 고를 수 있는 값 — null은 인자를 아예 넘기지 않는 상태다
const timeChoices = [null, 0, 0.5, 1, 2, 3, 4]

// 화면의 다섯 box를 만들 순서 — 어떤 tween이 어떤 box를 잡는지 한눈에 잇는다
const boxKeys = ['a', 'b', 'c', 'd', 'e']

/** 재생 헤드 위치와 트리 노드의 시작 시각을 같은 소수 자리로 맞춘다. */
function formatSeconds(value: number) {
  return `${value.toFixed(1)}s`
}

export function ChildQueryLab() {
  // runtime이 소유한 트리·인자·조회 결과·재생 조작을 그대로 받아 화면에만 쓴다
  const { scope, nodes, args, setArgs, resultIndices, progress, reducedMotion, seek, play, pause } =
    useChildQueryAnimation()

  // 실행에 쓰인 네 인자를 그대로 호출 문법으로만 포맷한다 — 의미를 다시 조립하지 않는다
  const callArguments = [String(args.nested), String(args.tweens), String(args.timelines)]
  if (args.ignoreBeforeTime !== null) callArguments.push(String(args.ignoreBeforeTime))

  // 트리를 만든 설정과 방금 실행한 조회를 하나의 코드 블록으로 이어 보여준다
  const code = `const detail = gsap.timeline({ id: '${nestedTimelineId}' })
${detailSteps
  .map((step) => `detail.to('.${boxClassName(step.boxKey)}', { ${step.property}: ${step.to}, duration: ${step.duration}, id: '${step.id}' })`)
  .join('\n')}

const master = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'none' } })
${masterSteps
  .map((step) => `master.to('.${boxClassName(step.boxKey)}', { ${step.property}: ${step.to}, duration: ${step.duration}, id: '${step.id}' })`)
  .join('\n')}

// 완성된 timeline을 child 하나로 집어넣는 순간 구조가 나무가 됩니다.
master.add(detail)

master.getChildren(${callArguments.join(', ')})
// → ${resultIndices.length}개 [ ${resultIndices.map((index) => nodes[index]?.id ?? '?').join(', ')} ]`

  return (
    <section className="child-query-lab" aria-labelledby="child-query-lab-title">
      <h3 id="child-query-lab-title">인자 네 개로 결과 목록을 좁혀 보기</h3>
      <p className="child-query-lab__goal">
        아래 트리는 <strong>tween 3개를 담은 master</strong> 안에 <strong>tween 2개를 담은 timeline 하나</strong>를 넣은 구조입니다. 네
        개의 인자를 바꿀 때마다 <code>getChildren()</code>이 돌려주는 목록이 즉시 다시 계산됩니다. <strong>어떤 노드가 밝아지고 어떤
        노드가 흐려지는지</strong>를 보세요.
      </p>

      <div className="child-query-lab__body" ref={scope}>
        <div className="child-query-lab__stage">
          {boxKeys.map((key) => (
            <div key={key} className={`child-query-lab__box ${boxClassName(key)}`}>
              {key.toUpperCase()}
            </div>
          ))}
          <p className="child-query-lab__playhead">
            <span>재생 헤드</span>
            <output aria-live="off">progress {progress.toFixed(2)}</output>
          </p>
        </div>

        <fieldset className="child-query-lab__controls">
          <legend>getChildren에 넘길 인자</legend>

          <label className="child-query-lab__check">
            <input
              type="checkbox"
              checked={args.nested}
              onChange={(event) => setArgs({ ...args, nested: event.target.checked })}
            />
            <span>
              nested <code>{String(args.nested)}</code>
            </span>
          </label>

          <label className="child-query-lab__check">
            <input
              type="checkbox"
              checked={args.tweens}
              onChange={(event) => setArgs({ ...args, tweens: event.target.checked })}
            />
            <span>
              tweens <code>{String(args.tweens)}</code>
            </span>
          </label>

          <label className="child-query-lab__check">
            <input
              type="checkbox"
              checked={args.timelines}
              onChange={(event) => setArgs({ ...args, timelines: event.target.checked })}
            />
            <span>
              timelines <code>{String(args.timelines)}</code>
            </span>
          </label>

          <label htmlFor="child-query-time">ignoreBeforeTime</label>
          <select
            id="child-query-time"
            value={args.ignoreBeforeTime === null ? 'none' : String(args.ignoreBeforeTime)}
            onChange={(event) =>
              setArgs({ ...args, ignoreBeforeTime: event.target.value === 'none' ? null : Number(event.target.value) })
            }
          >
            {timeChoices.map((choice) => (
              <option key={String(choice)} value={choice === null ? 'none' : String(choice)}>
                {choice === null ? '넘기지 않음 (기본값)' : formatSeconds(choice)}
              </option>
            ))}
          </select>

          <label htmlFor="child-query-progress">재생 헤드 위치</label>
          <input
            id="child-query-progress"
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
          />

          {reducedMotion ? null : (
            <div className="child-query-lab__buttons">
              <button type="button" onClick={play}>
                처음부터 재생
              </button>
              <button type="button" onClick={pause}>
                일시정지
              </button>
            </div>
          )}
        </fieldset>
      </div>

      <p className="child-query-lab__status" role="status">
        지금 인자로 <strong>{resultIndices.length}개</strong>가 돌아왔습니다.
        {reducedMotion ? ' (모션 감소 설정이라 자동 재생 버튼 대신 재생 헤드 slider만 제공합니다.)' : ''}
      </p>

      <div className="child-query-lab__tree-wrap">
        <p className="child-query-lab__tree-caption">
          평탄화한 child 목록 — 밝은 행이 방금 조회에 <strong>포함된</strong> 노드입니다.
        </p>
        <ol className="child-query-lab__tree">
          {nodes.map((node) => {
            // 실제 getChildren 반환 배열에 들어온 node만 밝게 표시한다
            const included = resultIndices.includes(node.index)

            return (
              <li
                key={node.index}
                className={`child-query-lab__node child-query-lab__node--depth${node.depth} ${
                  included ? 'child-query-lab__node--in' : 'child-query-lab__node--out'
                }`}
              >
                <span className="child-query-lab__node-kind">{node.kind}</span>
                <code>{node.id}</code>
                <span className="child-query-lab__node-time">
                  부모 기준 {formatSeconds(node.startTime)} · master 기준 {formatSeconds(node.globalStart)}
                </span>
                <span className="child-query-lab__node-state">{included ? '포함' : '제외'}</span>
              </li>
            )
          })}
        </ol>
      </div>

      <pre className="child-query-lab__code">
        <code>{code}</code>
      </pre>

      <div className="child-query-lab__table-wrap">
        <table className="child-query-lab__params">
          <caption>공식 Parameters 절이 밝힌 네 인자</caption>
          <thead>
            <tr>
              <th scope="col">인자</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">공식 설명</th>
            </tr>
          </thead>
          <tbody>
            {parameterRows.map((row) => (
              <tr key={row.name}>
                <th scope="row">
                  <code>{row.name}</code>
                </th>
                <td>{row.type}</td>
                <td>
                  <code>{row.fallback}</code>
                </td>
                <td>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="child-query-lab__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            인자를 바꾸면 <strong>트리는 그대로인데 결과 목록만</strong> 달라집니다. <code>getChildren()</code>은 구조를 바꾸지 않고{' '}
            <strong>지금 구조를 조건에 맞게 훑어 보여주는 조회</strong>입니다. 여섯 노드가 전부인 트리에서 인자 조합에 따라 0개부터
            6개까지 나옵니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            두 가지를 꼭 확인하세요. 첫째, <code>timelines</code>를 끄고 <code>nested</code>를 켜면{' '}
            <strong>
              <code>{nestedTimelineId}</code>은 사라지는데 그 안의 <code>liftD</code>·<code>liftE</code>는 남습니다.
            </strong>{' '}
            둘째, <code>ignoreBeforeTime</code>을 <code>3.0s</code>로 올리면 <strong>부모 기준 시각이 0인 </strong>
            <code>liftD</code>가 <strong>여전히 남습니다.</strong>
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            <code>timelines: false</code>는 <strong>결과 배열에서 timeline 객체를 빼는 것</strong>이지 탐색을 멈추는 것이 아닙니다. 또{' '}
            <code>ignoreBeforeTime</code>은 <strong>지금 부르고 있는 timeline의 직계 child만</strong> 걸러냅니다. 중첩 안쪽으로 들어갈
            때는 이 값이 함께 전달되지 않아 손자 이하는 시간 필터를 받지 않습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            애니메이션을 조립한 뒤 <strong>"내가 넣은 게 정말 다 들어갔나"</strong>를 확인할 때 <code>getChildren().length</code>를 찍어
            봅니다. 또 중첩 timeline은 건드리지 않고 <strong>말단 tween에만 일괄로 무언가</strong>를 하고 싶을 때{' '}
            <code>getChildren(true, true, false)</code>가 정확히 그 목록을 줍니다.
          </p>
        </article>
      </div>

      <p className="child-query-lab__source">
        실행 코드 위치 · <RepoFileLink path="src/content/gsap/fundamentals/timeline-inspection/examples/ChildQueryLab/useChildQueryAnimation.ts" />
      </p>
    </section>
  )
}
