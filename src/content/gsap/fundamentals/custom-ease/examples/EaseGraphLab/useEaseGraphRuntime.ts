/** getSVGData()가 어떤 ease든 지정한 크기의 path 문자열로 바꿔 주는 과정을 눈으로 확인하게 한다. */
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useEffect, useMemo, useState } from 'react'

// CustomEase는 core에 없으므로 곡선을 만들기 전에 한 번 등록한다
gsap.registerPlugin(CustomEase)

/** 그래프로 그려 볼 ease 후보의 식별자 — 앞의 둘은 직접 만든 곡선이고 마지막은 표준 ease다. */
export type GraphEaseId = 'graphHop' | 'graphSmooth' | 'power2.out'

/** getSVGData() 호출 인자와 표시 코드가 공유하는 단일 실행 descriptor다. */
export type GraphDescriptor = {
  easeId: GraphEaseId
  easeData: string | null
  width: number
  height: number
  offset: number
  pathSelector: string
}

/** 공식 Quick Start의 hop 데이터 그대로 — 값이 1까지 올랐다가 0으로 돌아오는 곡선이다. */
const hopData = 'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0'

/** 비교용으로 둔 가장 단순한 S자 곡선이다. */
const smoothData = 'M0,0 C0.5,0 0.5,1 1,1'

/** getSVGData()가 d attribute를 직접 채워 줄 대상 — 공식 예제의 path 옵션과 같은 선택자 형태다. */
const pathSelector = '#ease-graph-lab-path'

/** 이름과 곡선 데이터의 짝 — 표준 ease는 만들 필요가 없어 데이터가 없다. */
const easeData: Record<GraphEaseId, string | null> = {
  graphHop: hopData,
  graphSmooth: smoothData,
  'power2.out': null,
}

// 공식 권장대로 모듈이 로드될 때 곡선을 한 번만 만들어 두고 이후에는 이름으로만 부른다
CustomEase.create('graphHop', hopData)
CustomEase.create('graphSmooth', smoothData)

/** slider·radio 값을 실제 getSVGData 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(easeId: GraphEaseId, width: number, height: number, offset: number): GraphDescriptor {
  return { easeId, easeData: easeData[easeId], width, height, offset, pathSelector }
}

/** ease 그래프 예제의 controls, getSVGData 호출 결과, 뷰포트 크기를 제공한다. */
export function useEaseGraphRuntime() {
  // 어떤 ease를 그래프로 그릴지 고르는 control이다
  const [easeId, setEaseId] = useState<GraphEaseId>('graphHop')
  // 그래프의 가로 크기 — getSVGData가 progress 축을 이 픽셀 수로 펼친다
  const [width, setWidth] = useState(240)
  // 그래프의 세로 크기 — getSVGData가 값 축을 이 픽셀 수로 펼친다
  const [height, setHeight] = useState(160)
  // 그래프를 뷰포트 안쪽으로 밀어 넣는 여백 — getSVGData의 x와 y에 함께 넘긴다
  const [offset, setOffset] = useState(12)
  // getSVGData가 돌려준 d 문자열이며 화면에도 그대로 보여 준다
  const [data, setData] = useState('')
  // controls·getSVGData 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(easeId, width, height, offset), [easeId, width, height, offset])

  useEffect(() => {
    // path 선택자를 함께 넘기면 GSAP이 그 element의 d를 직접 채우고 같은 문자열을 반환값으로도 돌려준다
    setData(
      CustomEase.getSVGData(descriptor.easeId, {
        width: descriptor.width,
        height: descriptor.height,
        x: descriptor.offset,
        y: descriptor.offset,
        path: descriptor.pathSelector,
      }),
    )
  }, [descriptor])

  // TSX가 그래프·컨트롤·코드 패널을 같은 descriptor에서 그리도록 필요한 값만 전달한다
  return {
    easeId,
    setEaseId,
    width,
    setWidth,
    height,
    setHeight,
    offset,
    setOffset,
    descriptor,
    data,
  }
}
