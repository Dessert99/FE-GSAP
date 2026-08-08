/** 세 static utility의 official claims를 exact item count로 남긴다. */
export const morphSvgPathDataSourceItems = [
  {
    id: 'MORPHPATH-01',
    officialItem:
      'convertToPath(shape, swap) accepts element/selector, returns created SVGPathElement array, swaps DOM by default, preserves attributes, and rect rx/ry requires both values.',
    source: '#94',
  },
  {
    id: 'MORPHPATH-02',
    officialItem:
      'rawPathToString(rawPath) returns cubic-bezier d string; RawPath is segment arrays with alternating x/y values and each M begins a segment.',
    source: '#98',
  },
  {
    id: 'MORPHPATH-03',
    officialItem:
      'stringToRawPath(data) parses d string into cubic-bezier RawPath; round-trip counterpart, arbitrary original commands become cubic and malformed input is not validated by docs.',
    source: '#99',
  },
] as const
