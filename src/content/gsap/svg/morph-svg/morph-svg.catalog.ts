/** 네 canonical source의 page-local coverage를 item 단위로 남긴다. */
export const morphSvgSourceItems = [
  {
    id: 'MORPH-01',
    officialItem:
      'path/polygon/polyline target과 selector·Element·raw path value, compatible geometry, point matching/map/shapeIndex/winding/origin/type/config hooks를 다룬다.',
    source: '#93 MorphSVGPlugin',
    origin: 'official',
  },
  {
    id: 'MORPH-02',
    officialItem:
      'defaultRender은 path update마다 쓰는 global render hook이며 canvas rendering에 쓸 수 있다.',
    source: '#95 defaultRender',
    origin: 'official',
  },
  {
    id: 'MORPH-03',
    officialItem: 'defaultType은 linear/rotational morph의 global default다.',
    source: '#96 defaultType',
    origin: 'official',
  },
  {
    id: 'MORPH-04',
    officialItem:
      'defaultUpdateTarget은 d target update의 global default이며 shape conversion은 DOM element replacement를 할 수 있다.',
    source: '#97 defaultUpdateTarget',
    origin: 'official',
  },
] as const
