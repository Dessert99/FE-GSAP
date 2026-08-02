/** 공식 특수 속성 전체를 학습용 그룹과 동일한 데이터 구조로 관리한다. */
/** 특수 속성 하나를 누락 없이 설명하기 위한 공통 명세다. */
export type SpecialProperty = {
  name: string
  type: string
  defaultValue: string
  acceptedValues: string
  description: string
  useCase: string
  combination: string
  example: string
  exampleAnchor?: string
}

/** 관련 특수 속성을 실제 학습 맥락으로 묶는다. */
export type SpecialPropertyGroup = {
  title: string
  description: string
  properties: SpecialProperty[]
}

/** 공식 gsap.to() 특수 속성 34개의 학습용 원본 데이터다. */
export const specialPropertyGroups: SpecialPropertyGroup[] = [
  {
    title: '시간과 재생 방향',
    description: 'Tween이 언제 시작하고, 얼마나 재생되며, 어느 방향으로 움직일지 정합니다.',
    properties: [
      {
        name: 'delay', type: 'number', defaultValue: '0', acceptedValues: '0 이상의 초',
        description: 'Tween을 만든 뒤 실제 재생을 시작하기 전까지 기다리는 시간입니다.',
        useCase: '여러 요소가 아주 짧은 간격을 두고 나타나게 하거나, 안내 UI를 잠시 뒤에 시작할 때 사용합니다.',
        combination: '단순한 한두 개의 순서는 delay로도 충분하지만, 여러 Tween의 순서는 Timeline이 더 적합합니다.',
        example: "gsap.to('.box', { x: 100, delay: 0.5 })", exampleAnchor: 'playback-options',
      },
      {
        name: 'duration', type: 'number | string | function', defaultValue: '0.5초', acceptedValues: '0 이상의 초 또는 대상별 계산값',
        description: '시작값에서 목표값에 도달하는 데 걸리는 시간입니다.',
        useCase: '버튼 피드백은 짧게, 큰 화면 전환은 길게 만드는 식으로 움직임의 체감 속도를 조절할 때 사용합니다.',
        combination: 'ease와 함께 보면 같은 거리와 시간에서도 속도감이 어떻게 바뀌는지 알 수 있습니다.',
        example: "gsap.to('.box', { x: 100, duration: 1 })", exampleAnchor: 'overview',
      },
      {
        name: 'ease', type: 'string | function', defaultValue: 'power1.out', acceptedValues: '내장 ease 이름·설정 문자열·사용자 함수',
        description: '전체 시간 안에서 값이 변하는 속도 곡선을 정합니다.',
        useCase: '카드가 부드럽게 멈추거나, 배지가 살짝 튕기는 등 인터랙션의 움직임 성격을 정할 때 사용합니다.',
        combination: '역방향 ease는 GSAP 3.15에서 추가된 easeReverse로 정하며, deprecated yoyoEase를 대체합니다.',
        example: "gsap.to('.box', { x: 100, ease: 'back.out(1.7)' })", exampleAnchor: 'overview',
      },
      {
        name: 'easeReverse', type: 'boolean | string | function', defaultValue: 'false', acceptedValues: 'true·ease 이름·ease 함수',
        description: 'playhead가 역방향으로 바뀐 순간부터 남은 거리에 적용할 ease를 정합니다.',
        useCase: '서랍이나 모달을 열 때와 닫을 때 서로 다른 속도감을 주고 싶을 때 사용합니다.',
        combination: 'true면 정방향 ease의 느낌을 역방향에도 유지하고, 문자열이면 역방향 전용 ease를 사용합니다.',
        example: "gsap.to('.box', { x: 200, ease: 'power3.out', easeReverse: true })", exampleAnchor: 'playback-options',
      },
      {
        name: 'paused', type: 'boolean', defaultValue: 'false', acceptedValues: 'true | false',
        description: 'true면 생성 즉시 재생하지 않고 0초 위치에서 기다립니다.',
        useCase: '애니메이션을 미리 만들어 둔 뒤 클릭, 스크롤, 데이터 로딩 완료 시점에 시작할 때 사용합니다.',
        combination: 'Tween을 변수에 저장한 뒤 play()로 시작할 때 사용합니다.',
        example: "const tween = gsap.to('.box', { x: 100, paused: true })", exampleAnchor: 'tween-controls',
      },
      {
        name: 'reversed', type: 'boolean', defaultValue: 'false', acceptedValues: 'true | false',
        description: '처음부터 playhead의 진행 방향을 역방향으로 둡니다.',
        useCase: '열림·닫힘처럼 하나의 Tween을 양방향으로 재사용하면서 처음 방향을 역방향으로 준비할 때 사용합니다.',
        combination: '처음 위치가 0이므로 reversed만 true면 뒤로 갈 시간이 없어 멈춰 보입니다. progress(1) 같은 시작 위치가 필요합니다.',
        example: "gsap.to('.box', { x: 100, reversed: true }).progress(1)", exampleAnchor: 'playback-options',
      },
      {
        name: 'runBackwards', type: 'boolean', defaultValue: 'false', acceptedValues: 'true | false',
        description: '시작값과 종료값을 뒤집어 to()를 from()처럼 실행합니다.',
        useCase: '기존 to() 코드를 유지한 채 목표값에서 현재 상태로 들어오는 효과를 빠르게 만들 때 사용합니다.',
        combination: '시작 상태를 명확히 써야 한다면 의미가 더 직접적인 gsap.from()을 우선 고려합니다.',
        example: "gsap.to('.box', { x: 100, runBackwards: true })", exampleAnchor: 'playback-options',
      },
      {
        name: 'startAt', type: 'object', defaultValue: '지정 안 함', acceptedValues: '초기화할 속성의 vars 객체',
        description: 'Tween이 시작하기 직전에 적용할 명시적인 시작 상태입니다.',
        useCase: '요소를 화면 밖이나 투명한 상태에 먼저 놓고 진입 애니메이션을 시작할 때 사용합니다.',
        combination: '목표값으로 움직이지 않는 속성도 초기화할 수 있으며, 복잡한 시작·끝 구분은 fromTo()가 읽기 쉽습니다.',
        example: "gsap.to('.box', { x: 100, startAt: { x: -100, opacity: 0 } })", exampleAnchor: 'playback-options',
      },
    ],
  },
  {
    title: '반복과 여러 단계',
    description: '한 Tween을 다시 실행하거나 여러 상태를 연속으로 연결합니다.',
    properties: [
      {
        name: 'repeat', type: 'number', defaultValue: '0', acceptedValues: '0 이상의 정수·-1(무한)',
        description: '최초 실행이 끝난 뒤 추가로 재생할 횟수입니다. repeat: 1은 총 2회입니다.',
        useCase: '로딩 표시, 강조 펄스, 주의를 끄는 배지처럼 같은 움직임을 여러 번 재생할 때 사용합니다.',
        combination: 'yoyo를 켜면 회차마다 방향을 바꾸고 repeatDelay로 회차 사이에 쉼을 넣습니다.',
        example: "gsap.to('.box', { x: 100, repeat: -1 })", exampleAnchor: 'repeat-options',
      },
      {
        name: 'repeatDelay', type: 'number', defaultValue: '0', acceptedValues: '0 이상의 초',
        description: '한 회차가 끝난 뒤 다음 반복을 시작하기 전까지 기다리는 시간입니다.',
        useCase: '숨 쉬듯 커지는 효과처럼 반복 사이에 의도적인 쉼을 넣을 때 사용합니다.',
        combination: 'repeat가 0이면 다음 회차가 없으므로 화면에서 효과가 나타나지 않습니다.',
        example: "gsap.to('.box', { x: 100, repeat: 2, repeatDelay: 0.4 })", exampleAnchor: 'repeat-options',
      },
      {
        name: 'repeatRefresh', type: 'boolean', defaultValue: 'false', acceptedValues: 'true | false',
        description: '각 정방향 반복 전에 시작값과 동적 목표값을 다시 계산합니다. yoyo 회차는 새로 계산하지 않습니다.',
        useCase: '배경 입자나 떠다니는 장식 요소의 위치·크기·회전을 반복마다 다시 뽑을 때 사용합니다.',
        combination: 'random(), 상대값, 함수 기반 값처럼 회차마다 결과가 달라져야 하는 값과 함께 사용합니다.',
        example: "gsap.to('.box', { x: 'random(40, 220)', repeat: 3, repeatRefresh: true })", exampleAnchor: 'repeat-refresh',
      },
      {
        name: 'yoyo', type: 'boolean', defaultValue: 'false', acceptedValues: 'true | false',
        description: '반복 회차마다 진행 방향을 번갈아 바꿔 왕복하게 합니다.',
        useCase: '좌우로 흔들리는 아이콘, 왕복하는 인디케이터, 커졌다 작아지는 강조 효과에 사용합니다.',
        combination: 'repeat가 있어야 왕복을 관찰할 수 있습니다.',
        example: "gsap.to('.box', { x: 100, repeat: 1, yoyo: true })", exampleAnchor: 'repeat-options',
      },
      {
        name: 'yoyoEase', type: 'boolean | string | function', defaultValue: 'false', acceptedValues: 'deprecated · true·ease 이름·ease 함수',
        description: 'deprecated된 복귀 회차 ease입니다. truthy 값은 yoyo도 내부적으로 켜며, GSAP 3.15부터 easeReverse가 대체합니다.',
        useCase: '튀어나올 때는 탄력 있게, 돌아갈 때는 부드럽게 만드는 식으로 왕복의 느낌을 다르게 할 때 사용합니다.',
        combination: '기존 코드 coverage용 속성이며, 새 코드는 정방향 ease와 역방향 easeReverse 조합을 사용합니다.',
        example: "gsap.to('.box', { x: 100, repeat: 1, yoyoEase: 'power2.in' })", exampleAnchor: 'repeat-options',
      },
      {
        name: 'keyframes', type: 'object[] | object', defaultValue: '지정 안 함', acceptedValues: 'vars 배열·백분율/속성 기반 keyframes 객체',
        description: '하나의 대상이 지나갈 여러 중간 상태를 한 to() 호출에 순서대로 정의합니다. 이 특수 속성은 to() Tween에서 사용합니다.',
        useCase: '배지가 올라갔다 회전하며 제자리로 오는 것처럼 한 요소가 여러 자세를 차례로 거칠 때 사용합니다.',
        combination: '각 단계의 duration과 delay로 간격과 겹침을 만들 수 있습니다.',
        example: "gsap.to('.box', { keyframes: [{ x: 100 }, { y: 80 }] })", exampleAnchor: 'keyframes',
      },
    ],
  },
  {
    title: '여러 대상과 충돌',
    description: '한 번에 여러 대상을 움직이거나 같은 속성을 바꾸는 Tween 사이의 충돌을 다룹니다.',
    properties: [
      {
        name: 'stagger', type: 'number | function | object', defaultValue: '0', acceptedValues: '간격 초·계산 함수·each/from/grid/ease 등의 객체',
        description: '여러 target의 시작 시각을 서로 다르게 배치합니다.',
        useCase: '목록, 카드, 글자가 한꺼번에 나타나지 않고 순서대로 진입하게 만들 때 사용합니다.',
        combination: '숫자는 배열 순서대로 일정한 간격을 만들고, 객체는 중앙·끝·랜덤 같은 배치 순서를 만듭니다.',
        example: "gsap.to('.dot', { y: 40, stagger: { each: 0.1, from: 'center' } })", exampleAnchor: 'staggers',
      },
      {
        name: 'overwrite', type: 'boolean | "auto"', defaultValue: 'false', acceptedValues: 'false | true | "auto"',
        description: '같은 target을 움직이는 기존 Tween과 새 Tween이 충돌할 때 어느 쪽을 중단할지 정합니다.',
        useCase: '포인터 추적이나 빠른 메뉴 전환처럼 새 입력이 이전 애니메이션을 즉시 대체해야 할 때 사용합니다.',
        combination: 'true는 새 Tween 생성 즉시 기존 Tween 전체를 중단하고, auto는 첫 render에서 활성 중인 충돌 속성만 중단합니다.',
        example: "gsap.to('.box', { x: 200, overwrite: 'auto' })", exampleAnchor: 'overwrite',
      },
    ],
  },
  {
    title: '렌더링과 상속',
    description: '첫 렌더 시점, 브라우저 쓰기 최적화, Timeline 기본값 상속을 제어합니다.',
    properties: [
      {
        name: 'immediateRender', type: 'boolean', defaultValue: 'false (to)', acceptedValues: 'true | false',
        description: 'true면 다음 tick을 기다리지 않고 Tween 생성 시점에 첫 상태를 즉시 렌더합니다.',
        useCase: 'Tween을 만든 직후의 화면 상태를 같은 실행 흐름에서 읽거나, 첫 프레임의 깜빡임을 제어할 때 사용합니다.',
        combination: 'to()의 기본값은 false이며 from()/fromTo()와 ScrollTrigger가 연결된 Tween은 일반적으로 true입니다.',
        example: "gsap.to('.box', { x: 100, immediateRender: true })",
      },
      {
        name: 'lazy', type: 'boolean', defaultValue: 'true', acceptedValues: 'true | false',
        description: '첫 렌더의 DOM 읽기와 쓰기를 현재 tick 끝으로 모아 레이아웃 반복 계산을 줄입니다.',
        useCase: '대부분은 기본값을 유지하고, Tween 생성 직후 변경된 DOM 값을 반드시 측정해야 할 때만 false를 검토합니다.',
        combination: '0초 Tween은 예외이며, 특별한 측정 순서 문제가 없다면 기본값을 유지합니다.',
        example: "gsap.to('.box', { x: 100, lazy: false })",
      },
      {
        name: 'inherit', type: 'boolean', defaultValue: 'true', acceptedValues: 'true | false',
        description: '부모 Timeline에 설정한 defaults를 이 Tween이 물려받을지 정합니다.',
        useCase: 'Timeline 전체는 같은 duration을 쓰되 특정 Tween 하나만 부모 기본값에서 제외할 때 사용합니다.',
        combination: 'inherit: false면 이 Tween은 부모의 duration·ease 기본값을 사용하지 않습니다.',
        example: "timeline.to('.box', { x: 100, inherit: false })",
      },
    ],
  },
  {
    title: '식별과 사용자 데이터',
    description: 'Tween을 다시 찾거나 앱의 데이터를 Tween과 함께 보관합니다.',
    properties: [
      {
        name: 'id', type: 'string', defaultValue: '지정 안 함', acceptedValues: '고유 식별 문자열',
        description: 'gsap.getById()로 Tween을 다시 찾고 GSDevTools에서 구분할 수 있게 합니다.',
        useCase: '다른 모듈에서 특정 애니메이션을 찾아 제어하거나 디버깅 도구에서 이름으로 구분할 때 사용합니다.',
        combination: '앱 전역에서 찾을 필요가 없다면 변수나 ref에 Tween을 보관하는 편이 관계가 더 분명합니다.',
        example: "gsap.to('.box', { x: 100, id: 'hero-enter' })", exampleAnchor: 'tween-controls',
      },
      {
        name: 'data', type: 'unknown', defaultValue: '지정 안 함', acceptedValues: '문자열·객체·참조 등 임의의 값',
        description: 'Tween 인스턴스의 data에 애플리케이션 값을 붙입니다.',
        useCase: '여러 Tween의 콜백에서 어떤 카드나 항목의 애니메이션인지 식별해야 할 때 사용합니다.',
        combination: '콜백 안에서 this.data 또는 저장한 Tween의 data를 읽어 문맥을 전달할 수 있습니다.',
        example: "gsap.to('.box', { x: 100, data: { source: 'hero' } })", exampleAnchor: 'tween-controls',
      },
      {
        name: 'callbackScope', type: 'object', defaultValue: 'Tween 인스턴스', acceptedValues: '콜백의 this로 사용할 객체',
        description: 'onStart, onUpdate, onComplete 등 모든 콜백 내부의 this 값을 한 번에 정합니다.',
        useCase: '일반 함수 콜백 여러 개가 같은 컨트롤러 객체를 this로 사용해야 할 때 사용합니다.',
        combination: '화살표 함수는 자체 this를 사용하지 않으므로 callbackScope를 확인하려면 일반 함수를 사용합니다.',
        example: "gsap.to('.box', { callbackScope: controller, onComplete() { this.done() } })", exampleAnchor: 'callbacks',
      },
    ],
  },
  {
    title: '생명주기 콜백',
    description: 'Tween의 시작, 매 프레임, 반복, 완료, 역방향 완료, 중단 시점에 앱 코드를 연결합니다.',
    properties: [
      {
        name: 'onStart', type: 'function', defaultValue: '지정 안 함', acceptedValues: '콜백 함수',
        description: 'playhead가 0에서 처음 움직이는 순간 호출됩니다. restart하면 다시 호출될 수 있습니다.',
        useCase: '애니메이션이 실제로 시작한 순간 로딩 문구나 진행 상태를 활성화할 때 사용합니다.',
        combination: 'onStartParams로 인자를 전달하고 callbackScope로 this를 정할 수 있습니다.',
        example: "gsap.to('.box', { onStart: handleStart })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onStartParams', type: 'unknown[]', defaultValue: '지정 안 함', acceptedValues: 'onStart에 전달할 값의 배열',
        description: 'onStart를 호출할 때 순서대로 전달할 인자입니다.',
        useCase: '같은 시작 콜백을 여러 Tween에서 재사용하면서 각 Tween의 이름이나 문구를 전달할 때 사용합니다.',
        combination: '함수를 즉시 실행하지 말고 onStart와 인자 배열을 따로 전달합니다.',
        example: "gsap.to('.box', { onStart: log, onStartParams: ['start'] })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onUpdate', type: 'function', defaultValue: '지정 안 함', acceptedValues: '콜백 함수',
        description: 'playhead가 움직이는 매 tick마다 호출됩니다.',
        useCase: '애니메이션 진행률 표시나 GSAP 밖의 렌더러를 현재 위치와 계속 맞출 때 사용합니다.',
        combination: 'DOM 상태를 React state로 매 프레임 복제하기보다 필요한 표시만 직접 갱신합니다.',
        example: "gsap.to('.box', { onUpdate: renderProgress })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onUpdateParams', type: 'unknown[]', defaultValue: '지정 안 함', acceptedValues: 'onUpdate에 전달할 값의 배열',
        description: 'onUpdate 콜백에 고정 인자를 전달합니다.',
        useCase: '같은 진행률 동기화 함수를 여러 미터나 표시 요소에 연결할 때 대상 식별값을 전달합니다.',
        combination: '현재 Tween 값을 읽어야 한다면 콜백 내부에서 저장한 Tween을 참조합니다.',
        example: "gsap.to('.box', { onUpdate: sync, onUpdateParams: ['meter'] })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onRepeat', type: 'function', defaultValue: '지정 안 함', acceptedValues: '콜백 함수',
        description: 'Tween이 새 반복 회차에 들어갈 때마다 호출됩니다.',
        useCase: '현재 반복 횟수를 표시하거나 회차마다 짧은 효과음을 재생할 때 사용합니다.',
        combination: 'repeat가 0이면 호출되지 않습니다.',
        example: "gsap.to('.box', { repeat: 2, onRepeat: count })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onRepeatParams', type: 'unknown[]', defaultValue: '지정 안 함', acceptedValues: 'onRepeat에 전달할 값의 배열',
        description: 'onRepeat 콜백에 고정 인자를 전달합니다.',
        useCase: '여러 반복 Tween이 같은 기록 함수를 쓸 때 어떤 Tween의 회차인지 구분할 값을 전달합니다.',
        combination: '회차 번호는 전달한 값이 아니라 Tween의 iteration() 등 현재 상태로 확인할 수 있습니다.',
        example: "gsap.to('.box', { repeat: 2, onRepeat: log, onRepeatParams: ['repeat'] })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onComplete', type: 'function', defaultValue: '지정 안 함', acceptedValues: '콜백 함수',
        description: '정방향 재생이 마지막 끝점에 도달하면 호출됩니다.',
        useCase: '진입 애니메이션이 끝난 뒤 버튼을 활성화하거나 다음 UI 단계를 시작할 때 사용합니다.',
        combination: '후속 UI 활성화나 상태 동기화처럼 애니메이션 이후 실행할 작업을 연결합니다.',
        example: "gsap.to('.box', { onComplete: showNext })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onCompleteParams', type: 'unknown[]', defaultValue: '지정 안 함', acceptedValues: 'onComplete에 전달할 값의 배열',
        description: 'onComplete 콜백에 고정 인자를 전달합니다.',
        useCase: '공통 완료 함수에 다음 화면 이름이나 완료된 항목 ID를 전달할 때 사용합니다.',
        combination: '배열의 각 값이 콜백의 위치 인자로 전달됩니다.',
        example: "gsap.to('.box', { onComplete: log, onCompleteParams: ['done', 1] })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onReverseComplete', type: 'function', defaultValue: '지정 안 함', acceptedValues: '콜백 함수',
        description: '역방향 재생이 시작점에 도달하면 호출됩니다. yoyo 반복의 복귀와는 구분됩니다.',
        useCase: '닫기 애니메이션이 완전히 끝난 뒤 모달이나 패널을 DOM에서 제거할 때 사용합니다.',
        combination: 'reverse()로 화면을 닫은 뒤 정리할 때 유용합니다.',
        example: "gsap.to('.box', { onReverseComplete: cleanup })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onReverseCompleteParams', type: 'unknown[]', defaultValue: '지정 안 함', acceptedValues: 'onReverseComplete에 전달할 값의 배열',
        description: 'onReverseComplete 콜백에 고정 인자를 전달합니다.',
        useCase: '여러 닫기 애니메이션이 같은 정리 함수를 쓸 때 제거할 항목 정보를 전달합니다.',
        combination: '다른 Params 속성과 같은 방식으로 콜백과 인자를 분리합니다.',
        example: "gsap.to('.box', { onReverseComplete: log, onReverseCompleteParams: ['back'] })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onInterrupt', type: 'function', defaultValue: '지정 안 함', acceptedValues: '콜백 함수',
        description: '완료 전에 kill()되거나 overwrite로 중단될 때 호출됩니다.',
        useCase: '화면 전환이 취소됐을 때 임시 상태나 진행 표시를 정리해야 하는 경우 사용합니다.',
        combination: '정상 완료는 onComplete, 강제 중단은 onInterrupt로 분리해 후처리를 다르게 할 수 있습니다.',
        example: "gsap.to('.box', { onInterrupt: release })", exampleAnchor: 'callbacks',
      },
      {
        name: 'onInterruptParams', type: 'unknown[]', defaultValue: '지정 안 함', acceptedValues: 'onInterrupt에 전달할 값의 배열',
        description: 'onInterrupt 콜백에 고정 인자를 전달합니다.',
        useCase: '중단 처리 함수에 취소된 작업 이름이나 앱이 알고 있는 중단 이유를 전달할 때 사용합니다.',
        combination: '중단 원인을 앱에서 알고 있다면 Params로 함께 기록할 수 있습니다.',
        example: "gsap.to('.box', { onInterrupt: log, onInterruptParams: ['killed'] })", exampleAnchor: 'callbacks',
      },
    ],
  },
]

/** 전체 속성 수와 이름을 공식 문서 범위와 대조할 수 있게 펼친다. */
export const specialProperties = specialPropertyGroups.flatMap(({ properties }) => properties)
