/** 같은 이름표가 두 번 등장하는 중첩 Timeline을 만들어 두고, getById가 그중 무엇을 돌려주는지 읽어 보여준다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** 조회해 볼 이름표 후보 — 화면의 버튼과 실제 getById 인자가 이 값 하나를 함께 쓴다. */
export type IdCandidate = {
  key: string
  /** getById에 그대로 넘길 값 — 문자열과 숫자를 섞어 두 조회가 다른지 확인한다. */
  value: string | number
  /** 코드 패널에 찍을 리터럴 표기다. */
  literal: string
  hint: string
}

/** 트리 그림과 조회 결과가 같은 child를 가리키도록 평탄화 순서의 index를 열쇠로 쓴다. */
export type LookupNode = {
  index: number
  id: string | number
  kind: 'tween' | 'timeline'
  depth: number
  targetLabel: string
}

/** 조회 한 번의 결과 — 돌려받은 노드와, 이름표가 실제로 몇 개 일치했는지를 함께 남긴다. */
export type LookupResult = {
  candidateKey: string
  /** getById가 돌려준 노드의 index. 못 찾으면 null이다. */
  foundIndex: number | null
  /** 같은 이름표를 가진 노드가 트리에 몇 개 있는지 — 1을 넘으면 "첫 번째"가 어디인지가 문제가 된다. */
  matchCount: number
}

/** tween이 붙잡을 대상 — 재생하지 않는 예제라 DOM 없이 평범한 객체로 둔다. */
const targets = {
  headline: { x: 0 },
  badge: { x: 0 },
  panel: { y: 0 },
  icon: { y: 0 },
}

/** 중첩 timeline에 붙인 이름표다. */
export const nestedTimelineId = 'group'

/** 트리에 두 번 등장시킬 이름표 — 이 예제의 핵심 질문이 걸린 값이다. */
export const duplicatedId = 'fade'

/** 조회해 볼 이름표 여섯 가지 — 중복, 중첩 timeline 자신, 숫자와 문자열, 없는 이름을 모두 담는다. */
export const idCandidates: IdCandidate[] = [
  { key: 'duplicate', value: duplicatedId, literal: `'${duplicatedId}'`, hint: '트리에 두 번 있는 이름표' },
  { key: 'nested', value: nestedTimelineId, literal: `'${nestedTimelineId}'`, hint: '중첩 timeline 자신' },
  { key: 'inner', value: 'inner', literal: "'inner'", hint: '중첩 안쪽에만 있는 이름표' },
  { key: 'number', value: 7, literal: '7', hint: '숫자로 넣은 이름표' },
  { key: 'string', value: '7', literal: "'7'", hint: '같아 보이는 문자열' },
  { key: 'missing', value: 'nope', literal: "'nope'", hint: '트리에 없는 이름표' },
]

/** 평탄화한 child 목록을 화면이 그대로 그릴 수 있는 노드 설명으로 바꾼다. */
function describeTree(master: gsap.core.Timeline, labels: Map<object, string>): LookupNode[] {
  return master.getChildren(true, true, true).map((child, index) => {
    // 중첩 timeline만 getChildren을 가지고 있어 tween과 timeline을 이것으로 가른다
    const isTimeline = 'getChildren' in child
    // tween이면 붙잡은 대상 객체를 이름으로 바꿔 보여준다
    const target = isTimeline ? undefined : (child as gsap.core.Tween).targets<object>()[0]

    return {
      index,
      id: child.vars.id ?? '(id 없음)',
      kind: isTimeline ? 'timeline' : 'tween',
      depth: child.parent === master ? 0 : 1,
      targetLabel: target ? (labels.get(target) ?? '알 수 없음') : '— (timeline은 target이 없습니다)',
    }
  })
}

/** getById 예제의 트리, 이름표 후보, 조회 결과를 제공한다. */
export function useIdLookupRuntime() {
  // 화면을 움직이지 않는 예제지만 useGSAP의 생성·정리 계약을 그대로 쓰기 위해 scope를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // 계속 같은 트리에 물어봐야 의미가 있으므로 만든 master timeline을 보관한다
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  // 조회 결과 instance를 트리의 몇 번째 노드인지로 바꾸기 위해 평탄화 순서를 보관한다
  const flatRef = useRef<(gsap.core.Tween | gsap.core.Timeline)[]>([])
  // 화면에 그릴 트리 노드 목록이다
  const [nodes, setNodes] = useState<LookupNode[]>([])
  // 마지막 조회의 결과 — 누르기 전에는 아직 조회하지 않았음을 null로 구분한다
  const [result, setResult] = useState<LookupResult | null>(null)
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아직 조회하지 않았습니다. 아래 이름표 중 하나를 눌러 보세요.')

  useGSAP(
    () => {
      // 조회 대상이 될 부모 timeline — 재생하지 않는 예제라 처음부터 멈춘 상태로 둔다
      const master = gsap.timeline({ paused: true, defaults: { duration: 1, ease: 'none' } })
      // master와 따로 만들어 두었다가 통째로 집어넣을 중첩 timeline이다
      const group = gsap.timeline({ id: nestedTimelineId })

      // 중복 id의 앞쪽 후보를 master 직계 child로 만든다
      master.to(targets.headline, { x: 120, id: duplicatedId })
      // 숫자와 문자열 id가 엄격 비교로 갈리는 후보를 만든다
      master.to(targets.badge, { x: 120, id: 7 })

      // 중첩 안쪽에 같은 id를 한 번 더 넣어 검색 순서 차이를 드러낸다
      group.to(targets.panel, { y: 40, id: duplicatedId })
      // 중첩 descendant도 id로 찾을 수 있음을 보여 줄 고유 후보를 만든다
      group.to(targets.icon, { y: 40, id: 'inner' })

      // 완성된 timeline을 child 하나로 집어넣어 중첩 구조를 만든다
      master.add(group)

      // 화면에 대상 이름을 그대로 쓰기 위해 객체와 표시 이름을 짝지어 둔다
      const labels = new Map<object, string>(Object.entries(targets).map(([name, object]) => [object, name]))

      timelineRef.current = master
      flatRef.current = master.getChildren(true, true, true)
      setNodes(describeTree(master, labels))
      setResult(null)

      // context 정리 뒤 handler가 사라진 timeline을 다시 조회하지 않게 참조를 비운다
      return () => {
        timelineRef.current = null
        flatRef.current = []
      }
    },
    // 트리 구조는 controls와 무관하므로 한 번만 만든다
    { scope, dependencies: [], revertOnUpdate: true },
  )

  // 고른 이름표로 getById를 한 번 부르고, 같은 이름표가 몇 개였는지도 함께 세어 둔다
  function lookup(candidate: IdCandidate) {
    // 모든 버튼이 같은 master를 조회하도록 생성 때 보관한 참조를 읽는다
    const master = timelineRef.current
    if (!master) return

    // 공식 타입 정의는 id를 string으로만 받지만 실제 비교는 === 라서 숫자도 그대로 넘겨야 한다
    const found = master.getById(candidate.value as string) as gsap.core.Tween | gsap.core.Timeline | undefined
    // 트리 안에 같은 이름표가 몇 개인지 직접 세어 "여러 개일 때 무엇이 돌아왔는지"를 대조한다
    const matchCount = flatRef.current.filter((child) => child.vars.id === candidate.value).length

    setResult({
      candidateKey: candidate.key,
      foundIndex: found ? flatRef.current.indexOf(found) : null,
      matchCount,
    })
    setStatus(
      found
        ? `${candidate.literal} 조회가 노드 하나를 돌려줬습니다. 트리에서 밝아진 행을 확인하세요.`
        : `${candidate.literal} 조회는 undefined를 돌려줬습니다.`,
    )
  }

  // TSX가 트리·버튼·결과 패널·코드 패널을 같은 조회 결과에서 그리도록 필요한 값만 전달한다
  return { scope, nodes, result, status, lookup }
}
