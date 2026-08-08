/** GSDevTools config의 공식 type·initial-state 경계를 표로 제공한다. */
export const gsdevtoolsProperties = [
  {
    name: 'animation',
    type: 'String | Animation',
    defaultValue: 'Global Timeline selected',
    acceptedValues: 'timeline, tween, id string',
  },
  {
    name: 'container / css',
    type: 'String | Element / Object | String',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'selector·element / outer div CSS',
  },
  {
    name: 'globalSync / hideGlobalTimeline',
    type: 'Boolean / Boolean',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'root timeline synchronize / remove menu item',
  },
  {
    name: 'id / persist',
    type: 'String / Boolean',
    defaultValue: 'persist: true',
    acceptedValues: 'unique instance id / false disables session persistence',
  },
  {
    name: 'inTime / outTime',
    type: 'Number | String / Time | Label',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'seconds, label, animation id',
  },
  {
    name: 'paused / timeScale / loop',
    type: 'Boolean / Number / Boolean',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: 'initial playback values',
  },
  {
    name: 'minimal / visibility',
    type: 'Boolean / String',
    defaultValue: '공식 페이지에 명시 없음',
    acceptedValues: "minimal true / visibility: 'auto'",
  },
  {
    name: 'keyboard',
    type: 'Boolean',
    defaultValue: 'true',
    acceptedValues: 'only one shortcut-listening instance',
  },
]
