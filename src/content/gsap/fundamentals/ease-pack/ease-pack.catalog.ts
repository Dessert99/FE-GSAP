/** 공식 세 문서에서 확인한 기술 item 37개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'expo-scale-ease' | 'rough-ease' | 'slow-mo'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** EasePack 세 ease에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const easePackSourceItems: SourceItem[] = [
  { id: 'EXP-03', officialItem: 'object의 scale을 animate하면 linear ease를 써도 속도가 변하는 것처럼 보이는 현상이 있다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'ease-choice' },
  { id: 'EXP-04', officialItem: 'ExpoScaleEase는 easing curve를 그에 맞게 구부려 그 현상을 보정한다. 매끄러운 zoom·scale 애니메이션의 비결이다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'ease-choice' },
  { id: 'RGH-02', officialItem: '대부분의 easing 방정식은 시작값과 끝값 사이를 부드럽고 점진적으로 전환한다.', source: 'rough-ease', origin: 'official', sectionId: 'ease-choice' },
  { id: 'RGH-03', officialItem: 'RoughEase는 그 대신 거칠고 들쭉날쭉한 효과를 쉽게 얻는 방법을 제공한다.', source: 'rough-ease', origin: 'official', sectionId: 'ease-choice' },
  { id: 'RGH-04', officialItem: '원하면 균등 간격의 앞뒤 왕복 움직임도 얻을 수 있다.', source: 'rough-ease', origin: 'official', sectionId: 'ease-choice' },
  { id: 'SLW-02', officialItem: 'SlowMo는 처음에 감속하고, 고를 수 있는 일정 구간 동안 선형으로 움직인 뒤, 끝에서 다시 가속하는 슬로모션 효과를 만드는 설정 가능한 ease다.', source: 'slow-mo', origin: 'official', sectionId: 'ease-choice' },
  { id: 'SLW-03', officialItem: '텍스트를 화면으로 zoom해 들여오고, 사람들이 읽을 만큼 부드럽게 움직인 뒤, 다시 zoom해 내보내는 효과에 좋다.', source: 'slow-mo', origin: 'official', sectionId: 'ease-choice' },

  { id: 'EXP-01', officialItem: 'ExpoScaleEase는 Core에 포함되지 않는다. 이 ease는 EasePack 파일에 있고, 프로젝트에 포함하는 방법은 Installation 페이지에 있다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'easepack-setup' },
  { id: 'EXP-02', officialItem: 'Quick Start의 등록 코드는 gsap.registerPlugin(EasePack)이다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'easepack-setup' },
  { id: 'RGH-01', officialItem: 'RoughEase는 Core에 포함되지 않고 EasePack 파일에 있으며 gsap.registerPlugin(EasePack)으로 등록한다.', source: 'rough-ease', origin: 'official', sectionId: 'easepack-setup' },
  { id: 'SLW-01', officialItem: 'SlowMo는 Core에 포함되지 않고 EasePack 파일에 있으며 gsap.registerPlugin(EasePack)으로 등록한다.', source: 'slow-mo', origin: 'official', sectionId: 'easepack-setup' },

  { id: 'EXP-05', officialItem: 'ExpoScaleEase가 올바른 easing curve를 만들려면 시작 scale 값과 끝 scale 값을 문자열 안에 반드시 넘겨야 한다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'expo-scale' },
  { id: 'EXP-06', officialItem: '3번째 파라미터로 구부릴 ease를 받을 수 있고 기본값은 "none"이다. 예를 들어 "power2.inOut"을 넘길 수 있다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'expo-scale' },
  { id: 'EXP-07', officialItem: 'config()에 넘기는 scale 값은 0이면 안 된다. 0으로는 수학이 성립하지 않으므로 0.01 같은 작은 값을 써도 된다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'expo-scale' },
  { id: 'EXP-08', officialItem: '0.00000001처럼 아주 작은 값은 tween의 큰 부분이 아주 작은 값들을 지나는 데 쓰이므로 이상적이지 않을 수 있다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'expo-scale' },
  { id: 'EXP-09', officialItem: '공식 minimal usage 예제는 gsap.to("#image", { duration: 1, scale: 2, ease: "expoScale(1, 2)" })이며 주석으로 시작 1에서 끝 2를 config에 넘긴다고 적었다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'expo-scale' },
  { id: 'EXP-10', officialItem: '공식 확장 예제는 gsap.fromTo("#image", { scale: 0.5 }, { duration: 1, scale: 3, ease: "expoScale(0.5, 3, power2.inOut)" })이다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'expo-scale' },

  { id: 'RGH-05', officialItem: 'RoughEase는 아래의 선택적 property들로 설정한다.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-06', officialItem: 'clamp — Boolean. true면 point가 끝값을 넘거나 시작값 아래로 떨어지는 것을 막는다. x를 0에서 100으로 tween하면 clamp가 true일 때 모든 random point가 0~100 안에 머물고, false면 도중에 100 위나 0 아래로 튈 수 있다(다만 끝은 항상 100이다). 기본값 false.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-07', officialItem: 'points — Number. ease를 따라 찍을 point 개수이며, 더 자주 또는 덜 자주 덜컹거리게 만든다. 기본값 20.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-08', officialItem: 'randomize — Boolean. 기본적으로 point 배치가 무작위화되어 거칠기가 생기며, false로 두면 point들이 ease를 가로질러 고르게 지그재그한다. taper 값과 함께 쓰면 좋은 효과를 낼 수 있다. 기본값 true.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-09', officialItem: 'strength — Number. point가 template ease에서 얼마나 멀리 벗어날 수 있는지를 조절한다. 0.1처럼 작으면 template에 아주 가깝게, 5처럼 크면 훨씬 큰 변화를 만든다. 기본값 1.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-10', officialItem: 'taper — String("in" | "out" | "both" | "none"). 거칠기의 강도를 끝·시작·양쪽으로 갈수록 가늘어지게 하려면 각각 "out", "in", "both"를 쓴다. 기본값 "none".', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-11', officialItem: 'template — String. 일반적인 안내선처럼 template으로 쓸 ease다. RoughEase는 그 template에서 벗어나는 point를 찍으며, 이것으로 전체 형태에 영향을 줄 수 있다. 기본값 "none".', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-12', officialItem: '공식 기본값 예제는 gsap.from(element, {duration: 1, opacity: 0, ease: "rough"})이다.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },
  { id: 'RGH-13', officialItem: '공식 커스터마이즈 예제는 gsap.to(element, {duration: 2, y: 300, ease: "rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})"})이다.', source: 'rough-ease', origin: 'official', sectionId: 'rough-ease' },

  { id: 'SLW-04', officialItem: 'SlowMo가 없던 시절 애니메이터들은 ease .out tween, ease "none" tween, ease .in tween 3개를 이어 붙여 같은 효과를 내려 했다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-05', officialItem: '그 방식의 문제는 ease들이 서로 부드럽게 이어지지 않아 이음매에서 속도가 갑자기 바뀌는 게 보였다는 점이다. SlowMo는 이 문제를 풀고 양 끝 ease의 강도와 가운데 선형 구간의 비율을 완전히 제어하게 해준다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-06', officialItem: '첫 번째 파라미터 linearRatio는 변화율이 선형(일정한 속도)인 구간의 비율을 정하며 0과 1 사이여야 한다. 0.5면 앞 25%가 ease out, 50%가 선형, 마지막 25%가 ease in이 되고, 0.8이면 80%가 선형이고 양 끝에 10%씩 ease가 남는다. 기본값 0.7.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-07', officialItem: '두 번째 파라미터 power는 양 끝 ease의 강도를 정한다. 1보다 큰 값을 정의하면 가운데 선형 구간이 실제로 뒤집혀 흥미로운 효과를 만든다. 기본값 0.7.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-08', officialItem: '세 번째 파라미터 yoyoMode는 일반 SlowMo tween과 동기화되는 companion tween을 쉽게 만드는 방법을 제공한다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-09', officialItem: '예를 들어 텍스트를 zoom해 들여오고 한동안 선형으로 옮긴 뒤 zoom해 내보내는 SlowMo tween이 있고 그 위치 tween의 시작과 끝에서 alpha를 tween하고 싶다면, 보통은 fade-in과 fade-out tween 2개를 만들고 선형 구간이 시작될 때 fade-in이 끝나고 선형 구간이 끝날 때 fade-out이 시작되도록 duration을 직접 계산해야 한다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-10', officialItem: '이 과정을 훨씬 쉽게 하려면 alpha용 tween을 따로 만들고 같은 duration에 yoyoMode를 true로 설정한 SlowMo ease를 쓰기만 하면 된다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-11', officialItem: '공식 예제는 기본 SlowMo ease(linearRatio 0.7, power 0.7)를 gsap.to(myText, {duration: 5, x: 600, ease: "slow"})로 쓴다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-12', officialItem: '공식 예제는 gsap.to(myText, {duration: 5, x: 600, ease: "slow(0.5, 0.8)"})을 위 줄과 같은 효과이지만 다른 문법이라고 주석으로 적었다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },
  { id: 'SLW-13', officialItem: '공식 예제는 위 위치 tween과 동기화되어 시작에 fade in, 끝에 fade out 하는 opacity tween을 gsap.from(myText, {duration: 5, opacity: 0, ease: "slow(0.5, 0.8, true)"})로 만든다.', source: 'slow-mo', origin: 'official', sectionId: 'slow-mo' },

  { id: 'EXP-11', officialItem: 'ExpoScaleEase 공식 페이지는 Video Explanation(Walkthrough)과 Simple Demo·Complex Demo 두 개의 embedded demo를 제공한다.', source: 'expo-scale-ease', origin: 'official', sectionId: 'boundaries' },

  { id: 'SET-P1', officialItem: 'ESM import에서는 gsap.registerPlugin(EasePack)만으로 세 ease 이름이 등록되지 않는다. EasePack export가 register hook이 없는 평범한 객체이기 때문이며, ease 함수 자체를 넘기면(하나만 넘겨도) 셋 다 등록된다. 공식 문서에는 이 구분이 없다.', source: 'expo-scale-ease', origin: 'implementation', sectionId: 'easepack-setup' },
  { id: 'SET-P2', officialItem: '등록하지 않은 채 ease: "rough"를 쓰면 경고 없이 기본 ease(power1.out)로 조용히 대체된다. 공식 문서에는 이 fallback이 없다.', source: 'rough-ease', origin: 'implementation', sectionId: 'easepack-setup' },
  { id: 'EXP-P1', officialItem: 'expoScale은 scale을 지수로 보간한다. expoScale(1, 2)의 정중앙 scale은 1.5가 아니라 √2 ≈ 1.414다. 공식 문서에는 계산식이 없다.', source: 'expo-scale-ease', origin: 'implementation', sectionId: 'expo-scale' },
  { id: 'EXP-P2', officialItem: '시작 scale과 끝 scale이 같으면 ease가 NaN을 돌려주고 target 값도 NaN이 된다. 공식 문서는 0만 금지한다.', source: 'expo-scale-ease', origin: 'implementation', sectionId: 'expo-scale' },
  { id: 'RGH-P1', officialItem: 'ease 문자열은 해석할 때마다 새로 무작위 배치를 만든다. 같은 rough 문자열을 두 tween에 적어도 흔들림 모양이 서로 다르다(progress 0.3에서 0.2482와 0.4241). 같은 모양이 필요하면 만들어진 ease 함수를 재사용하거나 randomize: false를 쓴다. 공식 문서에는 이 동작이 없다.', source: 'rough-ease', origin: 'implementation', sectionId: 'rough-ease' },
  { id: 'SLW-P1', officialItem: '공식 예제 주석과 달리 "slow"와 "slow(0.5, 0.8)"은 같은 곡선이 아니다. 기본값이 0.7·0.7이므로 progress 0.1에서 각각 0.375와 0.366이다.', source: 'slow-mo', origin: 'implementation', sectionId: 'slow-mo' },
  { id: 'SLW-P2', officialItem: 'linearRatio에 0을 넘기면 0이 무시되고 기본값 0.7이 쓰인다. 공식 문서는 0~1 범위만 말한다.', source: 'slow-mo', origin: 'implementation', sectionId: 'slow-mo' },
  { id: 'SLW-P3', officialItem: 'yoyoMode true인 ease는 0에서 1로 올랐다가 다시 0으로 돌아오는 곡선이다. 그래서 같은 duration의 companion tween이 저절로 fade in·out 된다. 공식 문서는 곡선 모양을 적지 않았다.', source: 'slow-mo', origin: 'implementation', sectionId: 'slow-mo' },
]
