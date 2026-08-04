/** 공식 두 문서에서 확인한 기술 item 41개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'custom-bounce' | 'custom-wiggle'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 두 ease generator에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const customBounceWiggleSourceItems: SourceItem[] = [
  { id: 'CB-02', officialItem: 'GSAP에는 늘 쓰이던 "bounce" ease가 있지만 얼마나 "bouncy"한지 커스터마이즈하는 내장 방법이 없다.', source: 'custom-bounce', origin: 'official', sectionId: 'ease-generator' },
  { id: 'CB-03', officialItem: 'bounce ease는 squash가 일어나는 동안 바닥에 잠깐 붙어 있어야 하는데 "bounce"는 그런 커스터마이즈를 제공하지 않는다.', source: 'custom-bounce', origin: 'official', sectionId: 'ease-generator' },
  { id: 'CB-04', officialItem: 'squash/stretch에 대응하는 scaleX/scaleY ease를 만들 방법이 없었다. CustomEase가 이를 해결했지만 bounce와 점이 맞물리게 손으로 그리는 것은 여전히 매우 어렵다.', source: 'custom-bounce', origin: 'official', sectionId: 'ease-generator' },
  { id: 'CB-05', officialItem: 'parameter 몇 개만 주면 CustomEase를 둘 다 만들어 준다 — 하나는 bounce용, 하나는 (선택적으로) squash/stretch용이다.', source: 'custom-bounce', origin: 'official', sectionId: 'ease-generator' },
  { id: 'CB-06', officialItem: 'CustomBounce는 넘긴 변수를 바탕으로 내부에서 CustomEase를 만드는 wrapper라고 생각하면 된다.', source: 'custom-bounce', origin: 'official', sectionId: 'ease-generator' },
  { id: 'CW-03', officialItem: 'CustomWiggle은 wiggle의 양(amount)과 type을 설정하게 해 준다.', source: 'custom-wiggle', origin: 'official', sectionId: 'ease-generator' },
  { id: 'CW-12', officialItem: 'ease는 tween에 넘긴 각 property 값을 향한 움직임의 비율(ratio)만 제어한다.', source: 'custom-wiggle', origin: 'official', sectionId: 'ease-generator' },

  { id: 'CB-01', officialItem: 'Quick Start의 등록 호출은 gsap.registerPlugin(CustomEase, CustomBounce)다.', source: 'custom-bounce', origin: 'official', sectionId: 'setup' },
  { id: 'CB-07', officialItem: 'CustomBounce는 CustomEase를 extend하며 CustomEase를 프로젝트에 반드시 포함해야 한다.', source: 'custom-bounce', origin: 'official', sectionId: 'setup' },
  { id: 'CW-01', officialItem: 'Quick Start의 등록 호출은 gsap.registerPlugin(CustomEase, CustomWiggle)다.', source: 'custom-wiggle', origin: 'official', sectionId: 'setup' },
  { id: 'CW-02', officialItem: 'CustomWiggle은 CustomEase를 extend하며 CustomEase도 프로젝트에 반드시 포함해야 한다.', source: 'custom-wiggle', origin: 'official', sectionId: 'setup' },

  { id: 'CB-08', officialItem: 'strength는 Number이며 0과 1 사이에서 얼마나 "bouncy"한지 결정한다. 0.9는 0.3보다 훨씬 많이 튕긴다. 기본값 0.7.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-design' },
  { id: 'CB-09', officialItem: 'endAtStart는 Boolean이며 true면 ease가 시작한 자리로 되돌아와 끝나서, 바닥에 있던 물체가 뛰어올랐다가 다시 튕겨 멈추는 효과를 만든다. 기본값 false.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-design' },
  { id: 'CB-10', officialItem: 'squash는 Number이며 squash가 얼마나 지속될지(bounce 사이의 간격, "붙어 있는" 것처럼 보이는 구간)를 제어한다. 보통 2가 적당하고, 예로 4는 나머지 ease 대비 squash를 더 길게 만든다. 기본값 0.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-design' },
  { id: 'CB-11', officialItem: 'squashID는 String이며 squash ease에 붙일 ID다. 기본값은 bounce의 ID 뒤에 "-squash"를 붙인 것이고, CustomBounce.create("hop", {strength: 0.6, squash: 2})는 "hop-squash"가 된다.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-design' },
  { id: 'CB-13', officialItem: '공식 예제는 CustomBounce.create("myBounce", { strength: 0.6, squash: 3, squashID: "myBounce-squash" })로 이름을 만든다.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-design' },
  { id: 'CB-19', officialItem: 'GSAP의 축약 문자열 ease 형식도 쓸 수 있다 — ease: "bounce(0.5)"와 ease: "bounce({strength:0.5, endAtStart:true})".', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-design' },

  { id: 'CB-12', officialItem: 'bounce와 squash/stretch를 함께 쓰려면 tween 두 개를 쓴다. 하나는 위치(y), 다른 하나는 scaleX와 scaleY이며 둘이 동시에 실행된다.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-squash' },
  { id: 'CB-14', officialItem: '위치 bounce는 gsap.from(".class", { duration: 2, y: -200, ease: "myBounce" })로 "y" property에 적용한다.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-squash' },
  { id: 'CB-15', officialItem: 'squash/stretch는 gsap.to(".class", { duration: 2, scaleX: 1.4, scaleY: 0.6, ease: "myBounce-squash", transformOrigin: "center bottom" })로 동시에 실행한다.', source: 'custom-bounce', origin: 'official', sectionId: 'bounce-squash' },

  { id: 'CB-16', officialItem: 'CustomBounce는 CustomEase의 method도 공유한다. 그 method는 어떤 ease든 정의한 크기({width: 500, height: 400, x: 10, y: 50} 형태)로 시각화하는 SVG <path> data 문자열을 계산한다.', source: 'custom-bounce', origin: 'official', sectionId: 'curve-graph' },
  { id: 'CB-17', officialItem: 'CustomEase 인스턴스, 그와 연결된 ID, 심지어 Power2.easeOut 같은 표준 ease도 넘길 수 있다.', source: 'custom-bounce', origin: 'official', sectionId: 'curve-graph' },
  { id: 'CB-18', officialItem: 'vars에 path를 넣으면 그 element의 d attribute를 대신 채워 준다. 예: CustomEase.getSVGData("myBounce", { width: 500, height: 400, path: "#ease" }).', source: 'custom-bounce', origin: 'official', sectionId: 'curve-graph' },

  { id: 'CW-04', officialItem: '공식 최소 예제는 CustomWiggle.create("myWiggle", {wiggles: 6})로 6회 진동 wiggle을 만들며, 주석이 기본 type은 "easeOut"임을 밝힌다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-05', officialItem: 'gsap.to(".class", {duration: 2, rotation: 30, ease: "myWiggle"})에서 rotation은 30까지 갔다가 반대 방향으로도 똑같이 움직여 시작한 곳에서 끝난다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-06', officialItem: 'wiggles는 Integer이며 앞뒤로 오가는 진동(oscillation) 횟수다. 기본값 10.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-07', officialItem: 'type은 String("easeOut" | "easeInOut" | "anticipate" | "uniform" | "random")이며 wiggle의 종류(스타일)다. 기본값 "easeOut".', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-11', officialItem: 'wiggle의 세기(얼마나 멀리 가는지)는 tween property 값 자체로 조절한다. rotation:30은 rotation:10보다 강하다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-13', officialItem: '공식 sample은 CustomWiggle.create("funWiggle", {wiggles: 10, type: "anticipate"})로 10회 anticipation ease를 만들고 같은 이름을 rotation tween에 쓴다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-14', officialItem: 'CustomWiggle이 로드돼 있으면 GSAP 문자열 ease 형식 ease: "wiggle(15)"를 쓸 수 있다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },
  { id: 'CW-15', officialItem: '고급 문자열 형식은 ease: "wiggle({type:anticipate, wiggles:8})"다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-design' },

  { id: 'CW-08', officialItem: 'amplitudeEase는 Ease이며 amplitude(ease visualizer의 y축) 모양을 고급 제어한다. tween 전체에서 amplitude가 1에서 0으로 진행하는 방식을 정의한다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-advanced' },
  { id: 'CW-09', officialItem: 'timingEase는 Ease이며 파형이 시간(ease visualizer의 x축)에 따라 어떻게 그려지는지를 고급 제어한다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-advanced' },
  { id: 'CW-10', officialItem: 'amplitudeEase나 timingEase를 정의하면 type을 override한다. 5개 type은 두 ease 조합의 편의 preset이라고 생각하면 된다.', source: 'custom-wiggle', origin: 'official', sectionId: 'wiggle-advanced' },

  { id: 'CW-16', officialItem: 'wiggle은 "rotation" 전용이 아니라 어떤 property에도 쓸 수 있다.', source: 'custom-wiggle', origin: 'official', sectionId: 'boundaries' },
  { id: 'CW-17', officialItem: '예를 들어 "x"와 "y"에 무작위 wiggle tween 두 개만 써서 swarm 효과를 만들 수 있다.', source: 'custom-wiggle', origin: 'official', sectionId: 'boundaries' },
  { id: 'CW-18', officialItem: 'CustomWiggle 페이지는 Description 아래에 "Ease walkthrough" 영상 자료를 연결한다.', source: 'custom-wiggle', origin: 'official', sectionId: 'boundaries' },
  { id: 'CW-19', officialItem: 'CustomWiggle 페이지의 Demo 섹션은 "CustomWiggle Types"라는 제목의 인터랙티브 demo를 embed하며, type 설명이 그 demo를 가리킨다.', source: 'custom-wiggle', origin: 'official', sectionId: 'boundaries' },
  { id: 'CW-20', officialItem: 'CustomWiggle 페이지의 Demo collection 섹션은 "CustomWiggle demos" CodePen 모음을 연결한다.', source: 'custom-wiggle', origin: 'official', sectionId: 'boundaries' },
  { id: 'CB-20', officialItem: 'CustomBounce 페이지는 Description 아래에 "Ease walkthrough" 영상 자료를 연결한다.', source: 'custom-bounce', origin: 'official', sectionId: 'boundaries' },
  { id: 'CB-21', officialItem: 'CustomBounce 페이지의 Demos 섹션은 "CustomBounce demos" CodePen 모음을 연결한다.', source: 'custom-bounce', origin: 'official', sectionId: 'boundaries' },

  { id: 'CB-P1', officialItem: 'CustomBounce.create()는 만들어진 ease 함수를 그대로 반환하며, 그 함수는 gsap.parseEase(id)로 얻는 것과 같은 참조다. 공식 문서에는 반환값 명시가 없다.', source: 'custom-bounce', origin: 'implementation', sectionId: 'bounce-design' },
  { id: 'CB-P2', officialItem: 'strength가 커질수록 곡선의 방향 전환 횟수가 늘어난다. 0~1 구간을 200등분해 세면 0.3은 6회, 0.7은 14회, 0.9는 22회다.', source: 'custom-bounce', origin: 'implementation', sectionId: 'bounce-design' },
  { id: 'CB-P3', officialItem: 'endAtStart: true면 ease(1)이 0이 되고 false면 ease(1)은 1이다. 두 경우 모두 ease(0)은 0이다.', source: 'custom-bounce', origin: 'implementation', sectionId: 'bounce-design' },
  { id: 'CB-P4', officialItem: 'squash가 기본값 0이면 companion squash ease 자체가 만들어지지 않아 gsap.parseEase("<id>-squash")가 undefined다. squash를 1 이상 주면 그때 생긴다.', source: 'custom-bounce', origin: 'implementation', sectionId: 'bounce-squash' },
  { id: 'CB-P5', officialItem: 'squash 값이 커질수록 곡선이 바닥(ease 값 1) 근처에 머무는 progress 구간이 길어진다. strength 0.7에서 progress를 1000등분해 ease 값이 1과 0.001 이내인 비율을 세면 squash 0은 2.4%, 2는 10.9%, 4는 18.1%다.', source: 'custom-bounce', origin: 'implementation', sectionId: 'bounce-squash' },
  { id: 'CW-P1', officialItem: 'wiggles: N이면 곡선의 방향 전환이 N번 일어난다. 단 type "random"은 예외로, wiggles 6에서도 전환이 2번뿐이었다. 다섯 type 모두 ease(0)과 ease(1)이 0이라 시작값으로 돌아온다.', source: 'custom-wiggle', origin: 'implementation', sectionId: 'wiggle-design' },
  { id: 'CW-P2', officialItem: '다섯 type은 진폭이 시간에 따라 줄어드는 방식이 다르다. wiggles 6에서 구간별 최대 진폭은 easeOut 0.99·0.98·0.71·0.37, easeInOut 0.44·0.90·0.97·0.43, anticipate 0.75·0.99·0.90·0.08, uniform 1.00·1.00·1.00·1.00이다.', source: 'custom-wiggle', origin: 'implementation', sectionId: 'wiggle-design' },
  { id: 'CW-P3', officialItem: 'type: "random"은 같은 config로 다시 create()해도 곡선이 달라진다. 공식 문서는 seed나 재현성을 명시하지 않는다.', source: 'custom-wiggle', origin: 'implementation', sectionId: 'wiggle-design' },
  { id: 'CW-P4', officialItem: '이미 쓴 이름으로 다시 create()하면 그 이름의 ease가 새 곡선으로 교체된다. 공식 문서는 중복 이름 처리를 명시하지 않는다.', source: 'custom-wiggle', origin: 'implementation', sectionId: 'setup' },
]
