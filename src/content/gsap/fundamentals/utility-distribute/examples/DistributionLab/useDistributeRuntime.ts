/** distribute() 실행 descriptor·숫자 셀·직렬화 코드를 하나의 snapshot으로 만든다. */
import { useMemo, useState } from 'react'
import { gsap } from 'gsap'

/** 실습에서 한 줄과 2차원 배치를 전환하는 선택지다. */
export type DistributionLayout = 'row' | 'grid'
/** 총량과 고정 간격 중 어느 질문으로 값을 정할지 구분한다. */
export type DistributionSpacing = 'amount' | 'each'
/** 실습이 제공하는 결정적 시작점만 좁혀 random 재계산을 막는다. */
export type DistributionFrom = 'start' | 'center' | 'end' | 'edges'
/** grid 거리를 전체·가로·세로 중 어디에서 측정할지 고른다. */
export type DistributionAxis = 'both' | 'x' | 'y'
/** 공식 기본 ease와 곡선 비교값을 제공한다. */
export type DistributionEase = 'none' | 'power1.inOut'
/** 실제 distribute() 호출에 들어가는 정규화된 설정이다. */
export type DistributionDescriptor = {
  layout: DistributionLayout
  count: number
  columns: number
  base: number
  spacing: DistributionSpacing
  distance: number
  from: DistributionFrom
  axis: DistributionAxis
  ease: DistributionEase
  config: gsap.utils.DistributeConfig
}
/** 반환 함수의 세 입력을 함께 보존하는 가상 target이다. */
export type DistributionTarget = { id: string }
/** 한 cell의 위치와 계산 결과를 화면이 그대로 소비하게 한다. */
export type DistributionCell = {
  id: string
  index: number
  row: number
  column: number
  value: number
  heat: number
}
/** control·cell·code가 같은 계산을 읽는 단일 관찰값이다. */
export type DistributionSnapshot = {
  descriptor: DistributionDescriptor
  cells: DistributionCell[]
  minimum: number
  maximum: number
  code: string
}

// 소수 출력이 부동소수점 잡음 대신 배분 규칙을 보여 주도록 자릿수를 제한한다
const roundValue = (value: number) => Number(value.toFixed(3))

// 실제 config와 동일한 key만 JS object 문자열로 직렬화한다
const serializeConfig = (config: gsap.utils.DistributeConfig) => {
  // 화면에 표시할 설정 줄을 실행 descriptor에서 직접 만든다
  const lines = Object.entries(config).map(([key, value]) => {
    // 문자열과 tuple이 올바른 JavaScript literal로 보이게 한다
    const literal = typeof value === 'string' ? `'${value}'` : JSON.stringify(value)
    return `  ${key}: ${literal},`
  })
  return `const descriptor = {\n${lines.join('\n')}\n}\n\nconst targets = Array.from({ length: TARGET_COUNT }, (_, index) => ({\n  id: \`cell-\${index}\`,\n}))\nconst distributor = gsap.utils.distribute(descriptor)\n\nconst values = targets.map((target, index) =>\n  distributor(index, target, targets),\n)`
}

// 단 하나의 descriptor에서 distributor, 숫자 cells, code를 순서대로 만든다
const createSnapshot = (descriptor: DistributionDescriptor): DistributionSnapshot => {
  // 반환 함수를 만드는 실제 GSAP 호출이다
  const distributor = gsap.utils.distribute(descriptor.config)
  // index·target·array 세 입력을 모두 전달할 안정적인 대상 목록이다
  const targets: DistributionTarget[] = Array.from({ length: descriptor.count }, (_, index) => ({ id: `cell-${index}` }))
  // 화면 셀은 반환 함수가 계산한 숫자를 한 번만 저장한다
  const measuredCells = targets.map((target, index) => ({
    id: target.id,
    index,
    row: Math.floor(index / descriptor.columns),
    column: index % descriptor.columns,
    value: roundValue(distributor(index, target, targets)),
  }))
  // heat 색을 같은 숫자 범위에 맞추기 위한 최소값이다
  const minimum = Math.min(...measuredCells.map((cell) => cell.value))
  // heat 색을 같은 숫자 범위에 맞추기 위한 최대값이다
  const maximum = Math.max(...measuredCells.map((cell) => cell.value))
  // 값이 모두 같을 때도 유효한 0 비율을 만드는 범위다
  const range = maximum - minimum
  // 계산을 다시 하지 않고 저장된 value에만 색 비율을 덧붙인다
  const cells = measuredCells.map((cell) => ({ ...cell, heat: range === 0 ? 0 : (cell.value - minimum) / range }))
  return { descriptor, cells, minimum, maximum, code: serializeConfig(descriptor.config).replace('TARGET_COUNT', String(descriptor.count)) }
}

/** controls가 바뀔 때 하나의 descriptor와 snapshot만 새로 만든다. */
export function useDistributeRuntime() {
  // 한 줄 규칙을 본 뒤 같은 계산을 grid로 확장한다
  const [layout, setLayout] = useState<DistributionLayout>('row')
  // 총량과 칸 사이 간격 질문을 전환한다
  const [spacing, setSpacing] = useState<DistributionSpacing>('amount')
  // base에 더할 총량 또는 간격을 한 control로 조절한다
  const [distance, setDistance] = useState(100)
  // 거리 계산이 시작되는 배열·grid 위치를 고른다
  const [from, setFrom] = useState<DistributionFrom>('center')
  // grid에서 2차원 거리 또는 한 축만 비교한다
  const [axis, setAxis] = useState<DistributionAxis>('both')
  // 거리 비율을 그대로 쓰거나 곡선으로 바꾼다
  const [ease, setEase] = useState<DistributionEase>('none')
  // controls를 실제 GSAP config로 정규화하는 유일한 descriptor다
  const descriptor = useMemo<DistributionDescriptor>(() => {
    // grid는 3행 4열, row는 9칸으로 학습 순서를 고정한다
    const count = layout === 'grid' ? 12 : 9
    // row도 CSS와 좌표 계산이 같은 column 수를 공유한다
    const columns = layout === 'grid' ? 4 : 9
    // amount와 each 가운데 선택한 한 key만 실제 config에 넣는다
    const spacingConfig = spacing === 'amount' ? { amount: distance } : { each: distance }
    // flat row에는 grid와 axis를 보내지 않아 공식의 두 좌표계를 분리한다
    const geometryConfig = layout === 'grid' ? { grid: [3, 4] as [number, number], ...(axis === 'both' ? {} : { axis }) } : {}
    // 화면과 GSAP 호출이 함께 소비하는 설정 객체다
    const config: gsap.utils.DistributeConfig = { base: 0, ...spacingConfig, from, ...geometryConfig, ease }
    return { layout, count, columns, base: 0, spacing, distance, from, axis, ease, config }
  }, [axis, distance, ease, from, layout, spacing])
  // 셀 숫자와 code 패널이 동일 실행 결과를 참조하는 단일 snapshot이다
  const snapshot = useMemo(() => createSnapshot(descriptor), [descriptor])
  // 소비처는 control과 같은 snapshot만 받아 별도 GSAP 계산을 하지 않는다
  return { layout, setLayout, spacing, setSpacing, distance, setDistance, from, setFrom, axis, setAxis, ease, setEase, snapshot }
}
