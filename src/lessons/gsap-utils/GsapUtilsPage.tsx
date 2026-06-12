import { LessonLayout } from '../../components/learning/LessonLayout'
import { ExamplePanel } from '../../components/learning/ExamplePanel'
import { SelectorToArrayExample } from './examples/SelectorToArrayExample'
import selectorToArraySource from './examples/SelectorToArrayExample.tsx?raw'
import { RangeMappingExample } from './examples/RangeMappingExample'
import rangeMappingSource from './examples/RangeMappingExample.tsx?raw'
import { SnapInterpolateExample } from './examples/SnapInterpolateExample'
import snapInterpolateSource from './examples/SnapInterpolateExample.tsx?raw'
import { WrapYoyoExample } from './examples/WrapYoyoExample'
import wrapYoyoSource from './examples/WrapYoyoExample.tsx?raw'
import { DistributeRandomExample } from './examples/DistributeRandomExample'
import distributeRandomSource from './examples/DistributeRandomExample.tsx?raw'
import { PipeUnitizeExample } from './examples/PipeUnitizeExample'
import pipeUnitizeSource from './examples/PipeUnitizeExample.tsx?raw'

export function GsapUtilsPage() {
  return (
    <LessonLayout
      title="gsap.utils"
      description="gsap.utils는 값을 선택, 변환, 제한, 분배하는 작은 헬퍼 모음이다. 트윈 vars 안의 함수값, 이벤트 좌표 보정, 반복 UI 분배처럼 애니메이션 주변 계산을 단순하게 만든다."
    >
      <ExamplePanel
        title="selector와 toArray"
        description="selector는 검색 범위를 특정 DOM 안으로 제한하고, toArray는 셀렉터·요소·유사 배열을 실제 배열로 바꾼다. React 예제에서는 ref scope와 함께 자주 쓴다."
        code={selectorToArraySource}
      >
        <SelectorToArrayExample />
      </ExamplePanel>
      <ExamplePanel
        title="clamp, normalize, mapRange"
        description="clamp는 범위를 제한하고, normalize는 0~1 진행률로 바꾸며, mapRange는 다른 출력 범위로 변환한다. 스크롤·마우스 값을 애니메이션 값으로 바꿀 때 기본 조합이다."
        code={rangeMappingSource}
      >
        <RangeMappingExample />
      </ExamplePanel>
      <ExamplePanel
        title="snap과 interpolate"
        description="snap은 가까운 단계로 값을 붙이고, interpolate는 진행률에 맞춰 숫자·색·배열 값을 보간한다. 단계형 UI와 상태 간 전환에 유용하다."
        code={snapInterpolateSource}
      >
        <SnapInterpolateExample />
      </ExamplePanel>
      <ExamplePanel
        title="wrap과 wrapYoyo"
        description="wrap은 값 목록을 처음부터 반복하고, wrapYoyo는 끝에 닿으면 반대 방향으로 되돌아간다. 반복 아이템에 색상·방향 패턴을 줄 때 쓴다."
        code={wrapYoyoSource}
      >
        <WrapYoyoExample />
      </ExamplePanel>
      <ExamplePanel
        title="distribute와 random"
        description="distribute는 대상 인덱스와 전체 개수에 따라 값을 분배하고, random은 범위나 배열에서 값을 뽑는다. 그리드·입자형 배치에 쓰기 쉽다."
        code={distributeRandomSource}
      >
        <DistributeRandomExample />
      </ExamplePanel>
      <ExamplePanel
        title="pipe와 unitize"
        description="pipe는 여러 변환 함수를 한 흐름으로 묶고, unitize는 숫자 결과에 단위를 붙인다. 입력값 보정 파이프라인을 재사용할 때 유용하다."
        code={pipeUnitizeSource}
      >
        <PipeUnitizeExample />
      </ExamplePanel>
    </LessonLayout>
  )
}
