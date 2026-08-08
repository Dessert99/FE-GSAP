/** P14가 소유한 GSDevTools 공식 항목과 installed-source 경계를 추적한다. */
export const gsdevtoolsCatalog = [
  {
    id: 'GSDT-01',
    officialItem:
      'GSDevTools는 playback controls·keyboard shortcuts·global synchronization을 제공하는 GSAP animation debugging UI다.',
    sectionId: 'debugging-problem',
  },
  {
    id: 'GSDT-02',
    officialItem:
      'plugin을 import한 뒤 gsap.registerPlugin(GSDevTools)와 GSDevTools.create()로 시작한다.',
    sectionId: 'debugging-problem',
  },
  {
    id: 'GSDT-03',
    officialItem: '기본 instance는 Global Timeline의 모든 animation을 제어한다.',
    sectionId: 'debugging-problem',
  },
  {
    id: 'GSDT-04',
    officialItem:
      '특정 animation을 animation config로 직접 연결하는 편이 global syncing 부담 때문에 권장된다.',
    sectionId: 'debugging-problem',
  },
  {
    id: 'GSDT-05',
    officialItem:
      'Timeline과 Tween에 string id를 주면 animation menu에서 해당 id로 scene을 선택할 수 있다.',
    sectionId: 'create-instance',
  },
  {
    id: 'GSDT-06',
    officialItem:
      'in/out·selected animation·timeScale·loop UI 변경은 refresh 뒤에도 persist하며 config 값이 manual selection을 override한다.',
    sectionId: 'create-instance',
  },
  {
    id: 'GSDT-07',
    officialItem:
      'persist: false는 persistence를 끄고 unique instance id는 session·domain별 저장 상태를 분리한다.',
    sectionId: 'create-instance',
  },
  {
    id: 'GSDT-08',
    officialItem:
      'animation은 String 또는 Animation이며 지정하지 않으면 Global Timeline이 initially selected다.',
    sectionId: 'create-instance',
  },
  {
    id: 'GSDT-09',
    officialItem:
      'container는 String 또는 Element, css는 Object 또는 String으로 outer div를 정한다.',
    sectionId: 'create-instance',
  },
  {
    id: 'GSDT-10',
    officialItem:
      'globalSync: true는 root timeline에 연결하고 hideGlobalTimeline: true는 menu에서 Global Timeline을 제거한다.',
    sectionId: 'config-controls',
  },
  {
    id: 'GSDT-11',
    officialItem: 'inTime/outTime은 seconds·label·animation id를 marker position으로 받는다.',
    sectionId: 'config-controls',
  },
  {
    id: 'GSDT-12',
    officialItem:
      'keyboard은 default true이며 keyboard shortcuts를 listen할 수 있는 instance는 하나뿐이다.',
    sectionId: 'config-controls',
  },
  {
    id: 'GSDT-13',
    officialItem:
      'loop·paused·timeScale은 initial state를 정하고 minimal은 scrubber·play/pause·timeScale만 보여 준다.',
    sectionId: 'config-controls',
  },
  {
    id: 'GSDT-14',
    officialItem:
      'screen width가 600px 미만이면 minimal mode로 자동 전환되고 visibility: auto는 mouse off 약 1초 뒤 controls를 숨긴다.',
    sectionId: 'config-controls',
  },
  {
    id: 'GSDT-15',
    officialItem:
      'keyboard controls는 Space, arrows, L, I, O, H로 play/timeScale/seek/loop/in/out/hide를 조작한다.',
    sectionId: 'config-controls',
  },
  {
    id: 'GSDT-16',
    officialItem:
      'ScrollTrigger-driven animation은 scrollbar와 scrubber가 동시에 control할 수 없어 GSDevTools와 함께 동작하지 않는다.',
    sectionId: 'production-boundary',
  },
  {
    id: 'GSDT-17',
    officialItem: 'infinite repeat가 있으면 Global Timeline duration은 1000 seconds로 cap된다.',
    sectionId: 'production-boundary',
  },
  {
    id: 'GSDT-18',
    officialItem:
      'GSDevTools.create(config:Object)는 new GSDevTools instance를 return하며 multiple instance는 가능하지만 globalSync와 keyboard control은 각각 하나만 가능하다.',
    sectionId: 'production-boundary',
  },
  {
    id: 'GSDT-S01',
    officialItem:
      'installed source는 animation을 넘기지 않으면 globalSync default를 true로, animation을 넘기면 false로 정한다.',
    sectionId: 'create-instance',
  },
  {
    id: 'GSDT-S02',
    officialItem:
      'installed type/source는 instance kill(): void와 create(vars?): GSDevTools를 선언하고 FAQ kill path를 뒷받침한다.',
    sectionId: 'production-boundary',
  },
] as const
