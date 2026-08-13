/** 재생하지 않는 Tween 하나에 id와 data를 적고, 그 값이 instance의 어느 자리에 남는지 읽어 보여준다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

/** data special property에 넣어 볼 값의 종류다 — 공식이 "문자열, 객체 참조, 무엇이든"이라고 적은 범위를 그대로 따른다. */
export type DataChoice = 'none' | 'string' | 'object'

/** controls·GSAP 호출·표시 코드가 공유하는 단일 실행 descriptor다. */
export type RecordDescriptor = {
  id: string
  /** 입력값을 안전한 JavaScript 문자열 리터럴로 직렬화한 id다. */
  idLiteral: string
  dataChoice: DataChoice
  /** vars.data에 실제로 넣는 값이며 none일 때만 undefined다. */
  dataValue: string | { step: number } | undefined
  /** vars에 실제로 실린 data 값 — 코드 패널과 GSAP 호출이 같은 값을 쓴다. */
  dataLiteral: string
}

/** instance에 무엇이 남았는지를 "읽은 식 → 결과" 쌍으로만 기록한다. */
export type RecordReading = {
  expression: string
  result: string
  note: string
}

/** 화면에 쓸 수 있도록 읽어 온 값을 JavaScript 표기에 가깝게 문자열로 바꾼다. */
function show(value: unknown) {
  if (typeof value === 'string') return `'${value}'`
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

/** 선택한 data 종류를 실제 vars에 실을 값으로 바꾼다. */
function resolveData(choice: DataChoice) {
  if (choice === 'string') return 'step-2'
  if (choice === 'object') return { step: 2 }
  return undefined
}

/** 실제 data 값을 코드 패널에 찍을 리터럴 문자열로 바꾼다. */
function resolveDataLiteral(value: string | { step: number } | undefined) {
  if (typeof value === 'string') return JSON.stringify(value)
  if (value) return '{ step: 2 }'
  return '(적지 않음)'
}

/** 기록 예제의 controls, paused Tween, 읽기 결과, 조작 action을 제공한다. */
export function useInstanceRecordRuntime() {
  // 화면을 움직이지 않는 예제지만 useGSAP의 생성·정리 계약을 그대로 쓰기 위해 scope를 둔다
  const scope = useRef<HTMLDivElement>(null)
  // 계속 같은 instance에 물어봐야 의미가 있으므로 만든 Tween을 보관한다
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  // gsap.getById()로 찾을 이름 — vars에 적는 값이자 조회 키다
  const [id, setId] = useState('hero-intro')
  // vars.data에 무엇을 실을지 정한다
  const [dataChoice, setDataChoice] = useState<DataChoice>('string')
  // instance에서 실제로 읽어 온 값만 담는다 — 표시값이 추측이 아니라 관찰이 되게 한다
  const [readings, setReadings] = useState<RecordReading[]>([])
  // 방금 어떤 조작을 했는지 screen reader에도 전달한다
  const [status, setStatus] = useState('아래 값으로 Tween을 만들어 두었습니다. 재생하지 않아도 읽을 수 있습니다.')
  // 선택한 종류를 실제 vars.data 값으로 한 번만 해석한다
  const dataValue = resolveData(dataChoice)
  // 코드 패널과 GSAP 호출이 같은 값을 쓰도록 정규화한다
  const descriptor: RecordDescriptor = {
    id,
    idLiteral: JSON.stringify(id),
    dataChoice,
    dataValue,
    dataLiteral: resolveDataLiteral(dataValue),
  }

  // 지금 이 순간의 instance 상태를 일곱 개의 식으로 직접 읽어 온다
  function readBack(tween: gsap.core.Tween) {
    setReadings([
      {
        expression: 'tween.vars.id',
        result: show(tween.vars.id),
        note: '만들 때 적은 id는 vars 안에 그대로 남습니다.',
      },
      {
        expression: "'id' in tween",
        result: show('id' in tween),
        note: 'instance 자체에는 id라는 속성이 없습니다. 실행으로 확인한 사실입니다.',
      },
      {
        expression: `gsap.getById(${JSON.stringify(String(tween.vars.id))}) === tween`,
        result: show(gsap.getById(String(tween.vars.id)) === tween),
        note: '조회는 instance가 아니라 GSAP이 담당합니다.',
      },
      {
        expression: 'tween.data',
        result: show(tween.data),
        note: 'data는 instance에 직접 붙는 자리입니다.',
      },
      {
        expression: "'data' in tween",
        result: show('data' in tween),
        note: 'data는 값을 넣지 않아도 자리 자체는 항상 있습니다. 실행으로 확인한 사실입니다.',
      },
      {
        expression: 'tween.vars.data',
        result: show(tween.vars.data),
        note: '생성 시 data의 초기값으로 쓴 값이며 나중에 tween.data를 다시 대입해도 따라오지 않습니다.',
      },
      {
        expression: "'scrollTrigger' in tween",
        result: show('scrollTrigger' in tween),
        note: 'ScrollTrigger를 붙이지 않았으므로 속성 자체가 없습니다. 실행으로 확인한 사실입니다.',
      },
    ])
  }

  useGSAP(
    () => {
      // data를 적지 않는 모드에서는 vars 객체에서도 해당 키를 실제로 생략한다
      const dataVars = descriptor.dataChoice === 'none' ? {} : { data: descriptor.dataValue }
      // 화면 대신 숫자 하나를 가진 일반 object를 target으로 삼아 이 예제가 움직임을 만들지 않게 한다
      const tween = gsap.to(
        { v: 0 },
        { v: 1, duration: 0.6, paused: true, id: descriptor.id, ...dataVars },
      )

      tweenRef.current = tween
      readBack(tween)

      // 같은 id가 다음 실행에 남아 조회 결과를 헷갈리게 하지 않도록 이 Tween을 확실히 정리한다
      return () => {
        tween.kill()
        tweenRef.current = null
      }
    },
    // id나 data 종류가 바뀌면 이전 Tween을 버리고 새 값으로 다시 만든다
    { scope, dependencies: [descriptor.id, descriptor.dataChoice], revertOnUpdate: true },
  )

  // 만든 뒤에 instance의 data를 직접 덮어써서 vars.data와 갈라지는 순간을 보여준다
  function overwriteData() {
    const tween = tweenRef.current
    // runtime 준비 전 click은 화면을 바꾸지 않는다
    if (!tween) return

    tween.data = '나중에 넣은 값'
    readBack(tween)
    setStatus('tween.data만 바꿨습니다. 바로 아래 tween.vars.data와 비교해 보세요.')
  }

  // TSX가 controls·읽기 표·코드 패널을 같은 runtime 값에서 그리도록 필요한 값만 전달한다
  return { scope, id, setId, dataChoice, setDataChoice, descriptor, readings, status, overwriteData }
}
