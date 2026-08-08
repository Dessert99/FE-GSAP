/** lab descriptor가 사용하는 Inertia surface를 표 형식으로 고정한다. */
export const inertiaProperties = [
  {
    name: 'velocity',
    type: 'number | "auto"',
    use: '초당 시작 속도 또는 tracker 읽기',
  },
  { name: 'resistance', type: 'number', use: '감속 저항' },
  {
    name: 'duration',
    type: 'number | { min, max }',
    use: '자동 duration의 제한',
  },
  { name: 'min / max', type: 'number', use: '최종 resting range' },
  {
    name: 'end',
    type: 'number | number[] | function',
    use: 'exact 또는 snap destination',
  },
] as const
