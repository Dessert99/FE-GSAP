/** pipe의 실제 한 번 실행에서 중간값·최종값·표시 코드를 함께 만든다. */
import { useState } from 'react'
import gsap from 'gsap'

// pipeline을 조절하는 유일한 입력과 공식 예제에서 가져온 세 단계 설정이다
const PIPELINE_CONFIG = { inputMin: 0, inputMax: 100, outputMin: 0, outputMax: 360, increment: 20 } as const

/** 한 단계가 받은 값과 내보낸 값을 화면 표가 그대로 읽는 기록이다. */
export type PipelineReading = {
  name: string
  input: number
  output: number
}

/** controls·실제 호출·코드 패널이 공유하는 한 번 실행 결과다. */
export type PipelineSnapshot = {
  input: number
  readings: PipelineReading[]
  output: number
  code: string
}

/** 빈칸과 숫자가 아닌 입력에서도 pipeline이 재현 가능한 기본값을 쓰게 한다. */
function normalizeInput(rawValue: string) {
  // input 문자열을 계산 가능한 숫자로 바꾼다
  const parsed = Number(rawValue)

  // 잘못된 입력은 공식 예제 입력 25.874로 되돌려 표와 실행을 비우지 않는다
  return rawValue.trim() !== '' && Number.isFinite(parsed) ? parsed : 25.874
}

/** 입력 하나를 실제 pipe에 한 번 넣고 그 호출에서 지나간 값만 snapshot으로 남긴다. */
export function createPipelineSnapshot(input: number): PipelineSnapshot {
  // 각 단계가 실제로 받은 값과 돌려준 값을 순서대로 모은다
  const readings: PipelineReading[] = []
  // 숫자 함수를 감싸 실제 pipe 호출이 지나갈 때만 중간값을 기록한다
  const record = (name: string, transform: (value: number) => number) => (value: number) => {
    // 현재 단계가 실제로 계산한 출력이다
    const output = transform(value)
    readings.push({ name, input: value, output })
    return output
  }
  // 첫 단계는 범위 밖 입력을 0~100으로 제한한다
  const clamp = record('clamp(0, 100)', gsap.utils.clamp(PIPELINE_CONFIG.inputMin, PIPELINE_CONFIG.inputMax))
  // 둘째 단계는 제한한 0~100을 CSS 각도 0~360으로 옮긴다
  const map = record('mapRange(0, 100, 0, 360)', gsap.utils.mapRange(PIPELINE_CONFIG.inputMin, PIPELINE_CONFIG.inputMax, PIPELINE_CONFIG.outputMin, PIPELINE_CONFIG.outputMax))
  // 셋째 단계는 결과를 20 간격에 붙인다
  const snap = record('snap(20)', gsap.utils.snap(PIPELINE_CONFIG.increment))
  // 세 함수의 출력과 입력이 number로 맞는 왼쪽→오른쪽 pipeline을 만든다
  const transform = gsap.utils.pipe(clamp, map, snap)
  // 중간값 표와 최종값이 갈라지지 않도록 완성된 pipeline을 정확히 한 번 실행한다
  const output = transform(input)
  // 실제 호출에 쓴 같은 설정을 코드 문법으로만 직렬화한다
  const code = `const transform = gsap.utils.pipe(\n  gsap.utils.clamp(${PIPELINE_CONFIG.inputMin}, ${PIPELINE_CONFIG.inputMax}),\n  gsap.utils.mapRange(${PIPELINE_CONFIG.inputMin}, ${PIPELINE_CONFIG.inputMax}, ${PIPELINE_CONFIG.outputMin}, ${PIPELINE_CONFIG.outputMax}),\n  gsap.utils.snap(${PIPELINE_CONFIG.increment}),\n)\n\ntransform(${input}) // ${output}`

  return { input, readings, output, code }
}

/** pipeline 입력 state와 그 입력으로 만든 단일 실행 snapshot을 UI에 제공한다. */
export function usePipelineLabRuntime() {
  // 학습자가 pipeline 앞에 넣을 raw 숫자 문자열이다
  const [rawValue, setRawValue] = useState('25.874')
  // 입력을 실제 utility가 받을 유한한 숫자로 한 번 정규화한다
  const input = normalizeInput(rawValue)
  // 표·결과·코드 패널이 공유할 한 번 실행 snapshot을 만든다
  const snapshot = createPipelineSnapshot(input)

  return { rawValue, setRawValue, snapshot }
}
