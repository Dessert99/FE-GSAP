/** 공식 세 문서에서 확인한 기술 item 28개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'config' | 'defaults' | 'vars'
  /** 공식 문서에 게시된 주장인지, 설치본 구현·실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 설정 출처와 적용 범위에 관한 공식 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const tweenConfigurationSourceItems: SourceItem[] = [
  { id: 'CFG-01', officialItem: 'gsap.config()는 tween과 무관한 전역 engine 설정을 다룬다.', source: 'config', origin: 'official', sectionId: 'two-scopes' },
  { id: 'CFG-02', officialItem: '바꾸려는 설정만 지정하면 되고 생략한 항목은 영향받지 않는다.', source: 'config', origin: 'official', sectionId: 'two-scopes' },
  { id: 'DEF-01', officialItem: 'gsap.defaults()는 모든 tween이 상속할 property를 정한다.', source: 'defaults', origin: 'official', sectionId: 'two-scopes' },
  { id: 'DEF-04', officialItem: 'units·autoSleep·force3D처럼 tween과 무관한 설정은 gsap.config()를 쓴다.', source: 'defaults', origin: 'official', sectionId: 'two-scopes' },
  { id: 'DEF-05', officialItem: '공식 예제는 ease "power2.in"과 duration 1을 defaults로 지정한다.', source: 'defaults', origin: 'official', sectionId: 'two-scopes' },

  { id: 'CFG-03', officialItem: 'autoSleep은 number이고 기본값 120이며 power-down 확인 frame 간격이다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-04', officialItem: 'force3D는 "auto"(기본)·true·false를 받아 3D transform 사용 방식을 정한다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-05', officialItem: '"auto"는 animation 동안 3D를 적용하고 끝나면 2D로 되돌린다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-06', officialItem: 'true는 3D transform을 유지하고 false는 이 동작을 끈다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-07', officialItem: 'nullTargetWarn은 boolean이고 기본 true이며 없는 대상을 tween하면 경고한다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-08', officialItem: 'nullTargetWarn: false로 그 경고를 끈다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-09', officialItem: 'trialWarn은 공식 예제에 등장하지만 별도 설명이 게시돼 있지 않다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-10', officialItem: 'units는 object이며 단위 없는 값에 쓸 기본 CSS 단위를 정한다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-11', officialItem: 'units 기본은 대부분 "px", 회전 계열은 "deg"이고 지정한 property만 바뀐다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-12', officialItem: '공식 예제는 autoSleep 60, force3D false, nullTargetWarn false, trialWarn false, units {left,top,rotation}을 함께 보여준다.', source: 'config', origin: 'official', sectionId: 'config-catalog' },
  { id: 'CFG-13', officialItem: '인자 없이 부르면 현재 config 객체를 돌려준다.', source: 'config', origin: 'implementation', sectionId: 'config-catalog' },

  { id: 'DEF-06', officialItem: '인자 없이 부르면 현재 defaults를 돌려주며, 그 객체는 내부 defaults와 같은 참조다.', source: 'defaults', origin: 'implementation', sectionId: 'defaults-inheritance' },
  { id: 'DEF-07', officialItem: '일부 key만 지정하면 merge되고 지정하지 않은 key는 그대로 남는다.', source: 'defaults', origin: 'implementation', sectionId: 'defaults-inheritance' },
  { id: 'DEF-08', officialItem: '초기 defaults key는 duration, overwrite, delay, ease 네 개이고 duration은 0.5다.', source: 'defaults', origin: 'implementation', sectionId: 'defaults-inheritance' },
  { id: 'DEF-11', officialItem: '상속은 tween을 만드는 순간에 확정되며, 만든 뒤 defaults를 되돌려도 그 tween은 값을 유지한다.', source: 'defaults', origin: 'implementation', sectionId: 'defaults-inheritance' },

  { id: 'DEF-02', officialItem: 'inherit: false인 tween은 defaults를 상속하지 않는다.', source: 'defaults', origin: 'official', sectionId: 'precedence' },
  { id: 'DEF-03', officialItem: '해당 tween이 값을 지정하면 그 값이 default를 이긴다.', source: 'defaults', origin: 'official', sectionId: 'precedence' },
  { id: 'DEF-09', officialItem: '설정은 다시 덮어쓸 때까지 유지되고 자동으로 복원되지 않는다.', source: 'defaults', origin: 'implementation', sectionId: 'precedence' },
  { id: 'DEF-10', officialItem: 'inherit: false는 built-in duration 기본값까지 끊어 duration이 0이 된다.', source: 'defaults', origin: 'implementation', sectionId: 'precedence' },

  { id: 'VARS-01', officialItem: 'Tween.vars는 생성자에 넘긴 configuration 객체이고 타입은 Object다.', source: 'vars', origin: 'official', sectionId: 'vars-record' },
  { id: 'VARS-02', officialItem: '읽을 수 있는 property이며 생성 이후 설정 수단으로 쓰지 않는다.', source: 'vars', origin: 'official', sectionId: 'vars-record' },
  { id: 'VARS-03', officialItem: 'animate할 property와 special property를 함께 담는다.', source: 'vars', origin: 'official', sectionId: 'vars-record' },
  { id: 'VARS-04', officialItem: 'vars 문서는 special property 목록을 나열하며 각 상세는 gsap.to() owner가 소유한다.', source: 'vars', origin: 'official', sectionId: 'vars-record' },
]
