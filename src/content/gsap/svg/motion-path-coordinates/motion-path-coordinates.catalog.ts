/** 네 canonical의 technical coverage를 item-level로 보존한다. */
export const motionPathCoordinatesItems = [
  {
    id: 'MPC-01',
    canonical: '#104',
    item: 'convertCoordinates from/to Element|window, optional local point and nested transform conversion',
  },
  {
    id: 'MPC-02',
    canonical: '#104',
    item: 'point argument returns Point2D; omission returns Matrix2D apply converter; d.ts narrows window to Element',
  },
  {
    id: 'MPC-03',
    canonical: '#106',
    item: 'getAlignMatrix from/to, origin array or local point, path toOrigin auto and nested alignment',
  },
  {
    id: 'MPC-04',
    canonical: '#106',
    item: 'Matrix2D a,b,c,d,e,f plus apply; d.ts narrows window to Element',
  },
  {
    id: 'MPC-05',
    canonical: '#107',
    item: 'getGlobalMatrix local-to-viewport Matrix2D, inverse and adjustGOffset',
  },
  {
    id: 'MPC-06',
    canonical: '#111',
    item: 'getRelativePosition transformed gap in from parent coordinates with origin/path auto and Point2D return; d.ts narrows window',
  },
] as const
