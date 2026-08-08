/** 고정된 fixture timeline에 position 표기 하나로 child를 넣고 실제 startTime을 읽어 표기별 자리를 관찰한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../../../../../../components/demo/InteractiveExample/useReducedMotion'

/** 공식 position 표의 표기 하나 — GSAP에 넘길 실제 값과 코드 패널에 찍을 문법 표기를 함께 갖는다. */
export type PositionForm = {
  id: string
  /** add()의 두 번째 인자로 그대로 넘어가는 값 — 절대 시간만 Number이고 나머지는 String이다. */
  value: number | string
  /** 표시 코드에 찍을 문법 그대로의 표기 — 문자열 표기는 따옴표까지 포함한다. */
  code: string
}

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type PlacementDescriptor = {
  form: PositionForm
  /** 삽입되는 child의 추가 반복 횟수 — 퍼센트 표기의 기준 길이를 바꾸는 유일한 입력이다. */
  insertedRepeat: number
}

/** GSAP getter가 실제로 돌려준 값만 모은 관찰 결과다 — 화면의 숫자는 전부 여기서 나온다. */
export type PlacementReadout = {
  insertedStart: number
  insertedEnd: number
  insertedTotalDuration: number
  previousStart: number
  previousEnd: number
  previousTotalDuration: number
  labelTime: number
  timelineEndBeforeInsert: number
  timelineDuration: number
}

/** 시간축 그림의 한 칸 — 기준이 되는 이전 animation인지 방금 넣은 child인지와 부모 기준 시각 범위를 갖는다. */
export type PlacementSegment = {
  id: string
  kind: 'previous' | 'inserted'
  label: string
  start: number
  end: number
}

/** 공식 position 표에 등장하는 열다섯 표기 전부 — 이 배열이 곧 controls의 선택지이자 실행 입력이다. */
export const positionFormOptions: PositionForm[] = [
  { id: 'absolute', value: 3, code: '3' },
  { id: 'label', value: 'myLabel', code: '"myLabel"' },
  { id: 'previous-start', value: '<', code: '"<"' },
  { id: 'previous-end', value: '>', code: '">"' },
  { id: 'end-plus', value: '+=1', code: '"+=1"' },
  { id: 'end-minus', value: '-=1', code: '"-=1"' },
  { id: 'label-plus', value: 'myLabel+=2', code: '"myLabel+=2"' },
  { id: 'previous-start-plus', value: '<+=3', code: '"<+=3"' },
  { id: 'previous-start-number', value: '<3', code: '"<3"' },
  { id: 'previous-end-minus', value: '>-0.5', code: '">-0.5"' },
  { id: 'end-minus-percent', value: '-=25%', code: '"-=25%"' },
  { id: 'end-plus-percent', value: '+=50%', code: '"+=50%"' },
  { id: 'previous-start-percent', value: '<25%', code: '"<25%"' },
  { id: 'previous-start-plus-percent', value: '<+=25%', code: '"<+=25%"' },
  { id: 'label-plus-percent', value: 'myLabel+=30%', code: '"myLabel+=30%"' },
]

/** 기준이 되는 이전 animation의 길이 — 삽입 child의 길이와 다르게 잡아야 퍼센트 기준 차이가 드러난다. */
const previousDuration = 2

/** 이전 animation을 놓는 자리 — 0으로 고정해야 "<"가 가리키는 지점이 0으로 단순해진다. */
const previousPosition = 0

/** 이름 붙은 시각 — label 기준 표기 세 개가 이 값을 기준으로 계산된다. */
const labelName = 'myLabel'

/** label을 놓는 자리 — timeline의 끝(2초)과도 이전 animation의 시작(0초)과도 다른 1초로 둔다. */
const labelPosition = 1

/** 삽입되는 child의 한 회차 길이 — repeat과 곱해져 퍼센트 표기의 기준 길이가 된다. */
const insertedDuration = 2

/** 소수점이 길게 늘어져 표가 흔들리지 않도록 표시용으로만 자른다. */
function round(value: number) {
  return Math.round(value * 1000) / 1000
}

/** 두 control 값을 실제 gsap 호출 인자 형태로 한 번에 정규화한다. */
function createDescriptor(form: PositionForm, insertedRepeat: number): PlacementDescriptor {
  return { form, insertedRepeat }
}

/** GSAP이 돌려준 값만으로 시간축의 칸을 만든다 — 길이를 새로 추정하지 않는다. */
function createSegments(readout: PlacementReadout): PlacementSegment[] {
  return [
    {
      id: 'previous',
      kind: 'previous',
      label: '이전 animation',
      start: readout.previousStart,
      end: readout.previousEnd,
    },
    {
      id: 'inserted',
      kind: 'inserted',
      label: '방금 넣은 child',
      start: readout.insertedStart,
      end: readout.insertedEnd,
    },
  ]
}

/** position 표기 예제의 controls, paused fixture timeline, 배치 결과 좌표, 시간축 칸을 제공한다. */
export function usePositionSyntaxRuntime() {
  // 이 예제 밖의 DOM을 건드리지 않도록 useGSAP 범위를 제한한다
  const scope = useRef<HTMLDivElement>(null)
  // 지금 실행할 position 표기 — 이 예제가 답하는 질문 전체가 이 하나의 선택에 달려 있다
  const [formId, setFormId] = useState(positionFormOptions[0].id)
  // 삽입 child의 추가 반복 — 켜면 total duration이 2에서 4로 늘어 퍼센트 기준이 바뀐다
  const [insertedRepeat, setInsertedRepeat] = useState(0)
  // 방금 읽어 온 좌표 — 화면의 모든 숫자가 이 관찰값에서 나온다
  const [readout, setReadout] = useState<PlacementReadout | null>(null)
  // 시간축 막대에 장식용 transition을 걸어도 되는지 판단한다
  const reducedMotion = useReducedMotion()
  // 선택한 id를 실제 표기 객체로 되돌린다 — 없는 id는 첫 표기로 흡수한다
  const form = useMemo(
    () => positionFormOptions.find((option) => option.id === formId) ?? positionFormOptions[0],
    [formId],
  )
  // controls·GSAP 호출·serializer가 공유할 단일 descriptor다
  const descriptor = useMemo(() => createDescriptor(form, insertedRepeat), [form, insertedRepeat])

  useGSAP(
    () => {
      // fixture timeline은 멈춘 채로 둔다 — 아무것도 재생되지 않아야 좌표만 관찰할 수 있다
      const timeline = gsap.timeline({ paused: true })
      // 기준이 되는 이전 animation을 먼저 넣는다 — "<"와 ">"가 가리킬 대상이 이것이다
      const previous = gsap.to({ v: 0 }, { v: 1, duration: previousDuration })
      timeline.add(previous, previousPosition)
      // 이름 붙은 시각을 하나 만들어 label 기준 표기가 실제로 계산되게 한다
      timeline.addLabel(labelName, labelPosition)
      // child를 넣기 직전의 timeline 끝 — "+=" 와 "-=" 가 기준으로 삼는 값이다
      const timelineEndBeforeInsert = timeline.duration()
      // 퍼센트 표기의 기준 길이를 바꾸기 위해 반복 횟수만 다르게 준 삽입 대상이다
      const inserted = gsap.to({ v: 0 }, { v: 1, duration: insertedDuration, repeat: descriptor.insertedRepeat })
      // 선택한 표기 하나로 child를 배치한다 — 이 줄이 이 예제의 전부다
      timeline.add(inserted, descriptor.form.value)
      // 배치가 끝난 뒤 좌표를 그대로 읽는다 — 어떤 숫자도 직접 계산하지 않는다
      setReadout({
        insertedStart: inserted.startTime(),
        insertedEnd: inserted.endTime(),
        insertedTotalDuration: inserted.totalDuration(),
        previousStart: previous.startTime(),
        previousEnd: previous.endTime(),
        previousTotalDuration: previous.totalDuration(),
        labelTime: timeline.labels[labelName],
        timelineEndBeforeInsert,
        timelineDuration: timeline.duration(),
      })
      // 관찰이 끝난 timeline은 다음 실행 전에 정리한다
      return () => {
        timeline.kill()
      }
    },
    // 표기나 반복 중 하나만 바뀌어도 fixture를 처음부터 다시 만들어 결과를 결정적으로 만든다
    { scope, dependencies: [descriptor], revertOnUpdate: true },
  )

  // 읽어 온 좌표에서만 시간축 칸을 만든다 — 관찰값이 없으면 그릴 것도 없다
  const segments = useMemo(() => (readout ? createSegments(readout) : []), [readout])

  // TSX가 controls·시간축·표·코드 패널을 같은 관찰값에서 그리도록 필요한 값만 전달한다
  return {
    scope,
    formId,
    setFormId,
    insertedRepeat,
    setInsertedRepeat,
    descriptor,
    readout,
    segments,
    reducedMotion,
    round,
    labelName,
    labelPosition,
    previousDuration,
    previousPosition,
    insertedDuration,
  }
}
