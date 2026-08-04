/** 공식 네 문서에서 확인한 기술 item 50개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'global-timeline' | 'ticker' | 'export-root' | 'update-root'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** root scheduling에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const gsapRootClockSourceItems: SourceItem[] = [
  { id: 'GT-01', officialItem: 'gsap.globalTimeline은 GSAP의 모든 것을 구동하는 root Timeline instance이며, 그래서 모든 animation을 한 번에 다룰 수 있는 강력한 수단이다.', source: 'global-timeline', origin: 'official', sectionId: 'who-drives' },
  { id: 'TK-01', officialItem: 'gsap.ticker는 GSAP 엔진의 심장 박동 같은 것으로, 매 requestAnimationFrame event마다 globalTimeline을 갱신한다.', source: 'ticker', origin: 'official', sectionId: 'who-drives' },
  { id: 'TK-02', officialItem: 'requestAnimationFrame event는 보통 초당 60번쯤 일어난다. 이는 브라우저에 달렸고 시스템 성능에도 좌우된다. 일부 최신 기기는 120hz(초당 120번)로 갱신한다.', source: 'ticker', origin: 'official', sectionId: 'who-drives' },
  { id: 'TK-03', officialItem: 'requestAnimationFrame이 지원되지 않으면 ticker는 자동으로 일반 setTimeout() loop로 되돌아간다.', source: 'ticker', origin: 'official', sectionId: 'who-drives' },

  { id: 'GT-02', officialItem: 'gsap.globalTimeline의 Type은 Timeline이다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-03', officialItem: '.pause()는 global timeline을 일시정지하며 이는 모든(ALL) animation에 영향을 준다. 자기 자신을 반환한다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-04', officialItem: '.play()는 global timeline을 다시 재생하며 이는 모든(ALL) animation에 영향을 준다. 자기 자신을 반환한다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-05', officialItem: '.paused()는 global timeline이 일시정지 상태면 true를, 재생 중이면 false를 반환한다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-06', officialItem: '.timeScale()은 모든(ALL) animation에 영향을 주는 배수인 global time scale을 가져오거나 설정한다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-07', officialItem: 'timeScale()은 개별 tween/timeline의 timeScale()을 실제로 설정하는 것이 아니라, 다른 모든 animation을 담고 있는 root timeline이 재생되는 속도에 영향을 준다. 모든 animation을 한 번에 빠르게 하거나 느리게 하는 훌륭한 방법이다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-08', officialItem: '공식 코드 예제는 gsap.globalTimeline.timeScale(0.5)이 절반 속도, timeScale(2)가 두 배 속도이며, 인자 없이 부르면 현재 global timeScale을 반환한다는 것을 보여준다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-09', officialItem: 'global timeline은 다른 모든 tween과 timeline을 구동하는 데 쓰이므로, 현재 활성 상태인 tween이나 timeline이 있든 없든 gsap.globalTimeline.isActive()는 항상 true를 반환한다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },
  { id: 'GT-10', officialItem: 'gsap.delayedCalls()도 기술적으로는 tween이므로 globalTimeline을 pause()하거나 timeScale()하면 delayedCall에도 영향이 간다.', source: 'global-timeline', origin: 'official', sectionId: 'global-timeline' },

  { id: 'TK-04', officialItem: '매 갱신 뒤 직접 만든 logic을 실행하도록 자신의 listener를 추가할 수 있다(게임 개발자에게 유용하다). listener는 원하는 만큼 추가할 수 있다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-05', officialItem: '기본 예제는 gsap.ticker.add(myFunction)으로 등록하면 그 함수가 core engine 갱신 뒤 매 tick마다 실행되고, gsap.ticker.remove(myFunction)으로 나중에 제거한다는 것을 보여준다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-06', officialItem: 'listener에 넘어가는 첫 parameter time(Number)은 ticker가 시작된 뒤 흐른 총 시간(초)이다. ticker의 시작 시각은 lagSmoothing 때문에 앞으로 밀릴 수 있다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-07', officialItem: 'listener에 넘어가는 deltaTime(Number)은 직전 tick 이후 흐른 밀리초다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-08', officialItem: 'listener에 넘어가는 frame(Number)은 매 tick마다 1씩 증가하는 frame(tick) 번호다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-09', officialItem: 'gsap.ticker.add()의 선택 parameter once(Boolean)를 주면 callback이 한 번만 실행되고 자동으로 제거된다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-10', officialItem: 'gsap.ticker.add()의 선택 parameter prioritize(Boolean)를 주면 callback이 queue의 아래가 아니라 맨 위에 추가되어 현재 queue에 있는 어떤 listener보다 먼저 실행된다. GSAP의 global timeline보다 먼저 실행되게 하고 싶을 때 알맞다. 이 고급 옵션들은 GSAP 3.10.0에서 추가됐다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-11', officialItem: '사용자가 브라우저의 다른 탭으로 전환하면 배터리를 아끼고 CPU 부담을 줄이기 위해 ticker의 갱신이 크게 줄어든다. 브라우저 자신이 requestAnimationFrame event 전달을 줄이기 때문이다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-12', officialItem: 'Ticker properties로 time(Number, ticker 시작 이후 총 초, lagSmoothing으로 시작 시각이 밀릴 수 있음)과 frame(Number, 매 tick마다 증가하는 tick 번호)을 gsap.ticker에서 직접 읽을 수 있다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-13', officialItem: 'ticker를 특정 frame rate로 제한하려면 fps() 메서드를 쓴다. 공식 예제는 gsap.ticker.fps(30)으로 초당 frame을 30으로 제한한다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-14', officialItem: '브라우저의 native requestAnimationFrame(보통 60fps)을 더 빠르게 만드는 것은 불가능하다. gsap.ticker.fps(100)을 부를 수는 있지만 여전히 60fps 근처로 돈다. 반대로 gsap.ticker.fps(30)은 필요할 때 박자를 건너뛰게 만든다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-15', officialItem: 'gsap.ticker.deltaRatio() 메서드는 직전 tick 이후 흐른 시간을 특정 목표 FPS 기준의 비율로 반환한다(3.5.0에서 추가). 예를 들어 deltaRatio(60)을 불렀는데 실제 흐른 시간이 30fps에 가까웠다면 2를 반환해서, frame rate 변동에 맞춰 스스로 조정되는 loop를 쉽게 만들 수 있다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },
  { id: 'TK-16', officialItem: 'deltaRatio의 기본 fps parameter는 60이라 60fps가 아닌 기준을 쓸 때만 인자를 넘기면 된다. 30fps 기준이면 deltaRatio(30)이다. 공식 예제는 obj.x += 3 * gsap.ticker.deltaRatio(60)으로, frame rate가 흔들려도 변화율이 항상 일정하게 유지된다는 것을 보여준다.', source: 'ticker', origin: 'official', sectionId: 'ticker' },

  { id: 'TK-17', officialItem: 'gsap.ticker.lagSmoothing() 메서드는 GSAP의 lag smoothing에 대한 getter이자 setter 역할을 한다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-18', officialItem: '문제 상황은 이렇다 — 바로 시작해야 할 2초짜리 tween이 있는데 CPU가 1초 내내 바빠서 render를 못 하는 경우다. 대부분의 다른 animation engine(일부 브라우저의 CSS animation 포함)은 이를 보정하려고 시작 시각을 앞으로 밀어 준다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-19', officialItem: '시작 시각을 미는 방식에는 큰(major) 단점이 있다. 동기화를 희생한다는 것이다. delay를 망가뜨려서 깔끔하게 stagger하려던 animation이 뭉텅이로 쏟아지게 만들 수 있다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-20', officialItem: 'GSAP은 언제나 완벽한 동기화를 우선하는 엄격한 timing model을 써 왔다. 위 예에서 tween은 초기 1초 lag 뒤에 이미 절반이 진행된 것처럼 render된다. 결국 모든 animation engine은 어떤 식으로든 lag 세금을 낸다 — 엄격한 timing과 동기화를 지키거나, 시작 시각을 밀고 동기화를 잃거나 둘 중 하나다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-21', officialItem: 'gsap.ticker.lagSmoothing()은 양쪽의 장점을 모두 준다. CPU가 밀리면 다음 tick에서 core timing mechanism 자체를 조정하기 때문에 이것이 모든(all) animation에 영향을 주고, 따라서 모든 것이 완벽하게 동기화된 상태로 남는다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-22', officialItem: 'threshold(밀리초)를 정해 두면 그보다 큰 lag이 생길 때마다 engine이 내부 clock을 adjustedLag만큼만 흐른 것처럼 조정한다. gsap의 static 메서드로 부르지만 이 한 번의 조정이 GSAP의 모든 것에 영향을 준다 — tween, timeline, delayedCall이 모두 하나의 timing mechanism으로 구동되기 때문이다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-23', officialItem: 'threshold가 500이고 adjustedLag가 33이면(이것이 기본값이다) 두 tick 사이에 500ms를 넘게 흐를 때만 조정이 일어나고, 그때 33ms만 흐른 것처럼 취급한다. 그래서 CPU가 2초를 통째로 밀려도 animation은 2초를 건너뛰는 대신 다음 render에서 33ms 분량만 움직인다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-24', officialItem: '주의 — 이것은 기기의 성능이나 실제 frame rate에는 아무 영향이 없다. 브라우저가 frame을 흘렸을 때 GSAP이 어떻게 반응하는지에만 영향을 준다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-25', officialItem: '이 기능은 threshold 500ms, adjustedLag 33ms로 이미 기본 활성화돼 있지만 설정을 바꿀 수 있다. 공식 예제 gsap.ticker.lagSmoothing(1000, 16)은 두 tick 사이에 1000ms 이상 흐를 때만 보정하고 그때 16ms만 흐른 것처럼 취급한다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-26', officialItem: '두 값을 10처럼 아주 낮게 잡지 않는 이유는, 그러면 여유가 거의 없어져서 tween이 더 느리게 도는 것처럼 보이기 때문이다. 거의 매 render마다 시간이 앞으로 밀리면 실제로도 느려진 것이 맞다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-27', officialItem: 'delayedCall이 있다면 그것들도 함께 영향을 받는다. 이는 좋은 일로, delayedCall이 engine의 나머지와 완벽히 동기화된다고 믿을 수 있게 해 준다. 다만 브라우저가 심한 부하를 받아 초당 몇 frame만 render한다면 시간이 말 그대로 느려지는 것처럼 보여서 2초짜리 tween(또는 delayedCall)이 실제로는 8초가 걸릴 수도 있다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-28', officialItem: '대부분의 실제 상황에서는 500과 33이라는 기본값이 이상적이다. 브라우저·CPU의 큰 딸꾹질로부터 보호하면서도 frame rate의 작은 변동은 불필요하게 느려지지 않고 통과시킨다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },
  { id: 'TK-29', officialItem: 'lag smoothing을 끄고 싶으면 0으로 설정하면 된다. gsap.ticker.lagSmoothing(0)은 threshold를 아주 큰 값으로 두어 절대 발동하지 않게 하는 것과 같다.', source: 'ticker', origin: 'official', sectionId: 'lag-smoothing' },

  { id: 'GT-11', officialItem: 'globalTimeline을 다룰 때 delayedCall을 빼고 싶다면 gsap.exportRoot()를 확인하라고 공식 globalTimeline 페이지가 안내한다.', source: 'global-timeline', origin: 'official', sectionId: 'export-root' },
  { id: 'ER-01', officialItem: 'gsap.exportRoot()의 Returns는 Timeline이며, root의 tween과 timeline을 담은 새 Timeline instance다.', source: 'export-root', origin: 'official', sectionId: 'export-root' },
  { id: 'ER-02', officialItem: 'root timeline에 있던 모든 tween과 timeline, 그리고 [선택적으로] delayed call을 새 timeline으로 매끄럽게 옮긴다. 그래서 export 뒤에 만드는 tween/timeline에는 영향을 주지 않으면서 전역인 것처럼 보이는 고급 작업을 할 수 있다.', source: 'export-root', origin: 'official', sectionId: 'export-root' },
  { id: 'ER-03', officialItem: '공식 사용 예는 GSAP으로 모든 animation을 처리하는 게임에서, 어느 시점에 전체를 timeScale로 서서히 멈추면서 동시에 새 popup 창을 띄우는 상황이다. 공식 코드 예제는 export 뒤에 만든 tween에는 "이 tween은 export 뒤에 만들어졌기 때문에 영향을 받지 않는다"는 주석을 붙여 둔다.', source: 'export-root', origin: 'official', sectionId: 'export-root' },
  { id: 'ER-04', officialItem: '준비가 되면 timeScale을 다시 1로 tween해서 전체를 되살릴 수 있다. 또는 exportRoot()로 animation을 모아 pause()한 뒤 popup 화면을 띄우고, 그 instance를 resume()하거나 심지어 reverse()할 수도 있다.', source: 'export-root', origin: 'official', sectionId: 'export-root' },
  { id: 'ER-05', officialItem: 'exportRoot()는 원하는 만큼 여러 번 부를 수 있다. 하는 일은 흩어져 있던 tween·timeline·delayedCall을 하나의 timeline으로 감싸고 그 timeline 자신을 root에 올리는 것뿐이라, 다시 exportRoot()하면 그 timeline이 또 다른 timeline에 감싸인다. 원하는 만큼 깊게 중첩할 수 있다.', source: 'export-root', origin: 'official', sectionId: 'export-root' },
  { id: 'ER-06', officialItem: '완료된 tween과 timeline은 자동 garbage collection을 위해 globalTimeline에서 제거된다. 그래서 특정 tween이 끝난 뒤에 exportRoot()를 하면 그 tween은 export에 포함되지 않는다.', source: 'export-root', origin: 'official', sectionId: 'export-root' },

  { id: 'UR-01', officialItem: '보통 GSAP은 requestAnimationFrame loop로 모든 timing을 내부에서 처리하며(rAF를 쓸 수 없으면 setTimeout()으로 되돌아간다), 일부 게임 개발자가 root(global) timeline을 수동으로 갱신할 방법을 요청했고 gsap.updateRoot()가 정확히 그것을 허용한다.', source: 'update-root', origin: 'official', sectionId: 'update-root' },
  { id: 'UR-02', officialItem: '이것은 오직 고급(advanced) 사용자만을 위한 것이다.', source: 'update-root', origin: 'official', sectionId: 'update-root' },
  { id: 'UR-03', officialItem: '먼저 gsap.ticker.remove(gsap.updateRoot)로 GSAP의 ticker를 떼어내야 한다.', source: 'update-root', origin: 'official', sectionId: 'update-root' },
  { id: 'UR-04', officialItem: '그다음 gsap.updateRoot(20)처럼 자신의 custom 시간으로 갱신할 수 있다. 공식 주석은 이 호출이 root 시간을 수동으로 20초로 설정한다고 적는다.', source: 'update-root', origin: 'official', sectionId: 'update-root' },

  { id: 'GT-P1', officialItem: 'globalTimeline은 parent가 null인 Timeline이고 smoothChildTiming과 autoRemoveChildren가 모두 true다. 기본 timeScale()은 1, paused()는 false다. gsap.to()가 만든 Tween의 parent와 gsap.delayedCall()이 돌려주는 Tween의 parent가 모두 globalTimeline이다. 공식 페이지에는 이 부모 관계와 기본값이 적혀 있지 않다.', source: 'global-timeline', origin: 'implementation', sectionId: 'global-timeline' },
  { id: 'GT-P2', officialItem: 'pause()·play()뿐 아니라 timeScale(값) 설정도 globalTimeline 자신을 돌려준다. 공식 페이지는 pause()와 play()에만 "자기 자신을 반환한다"고 적는다.', source: 'global-timeline', origin: 'implementation', sectionId: 'global-timeline' },
  { id: 'GT-P3', officialItem: 'globalTimeline.timeScale(0.5)을 건 뒤 만든 1초짜리 Tween은 wall clock 500ms 뒤 progress 0.251이었고, 그 Tween 자신의 timeScale()은 1로 남아 있었다. 공식 주장(개별 timeScale을 바꾸지 않는다)을 실행으로 확인한 값이다.', source: 'global-timeline', origin: 'implementation', sectionId: 'global-timeline' },
  { id: 'TK-P1', officialItem: '설치본 gsap.ticker의 own key는 time, frame, tick, deltaRatio, wake, sleep, lagSmoothing, fps, add, remove, _listeners다. sleep()·wake()·tick()은 공식 ticker 페이지에 설명이 없다.', source: 'ticker', origin: 'implementation', sectionId: 'ticker' },
  { id: 'TK-P2', officialItem: 'gsap.ticker.fps()와 gsap.ticker.lagSmoothing()은 인자 없이 부르면 undefined를 돌려준다. 설치본에는 현재값을 읽는 getter가 없다. 공식 페이지가 lagSmoothing을 "getter이자 setter"라고 적는 것과 다르다.', source: 'ticker', origin: 'implementation', sectionId: 'ticker' },
  { id: 'TK-P3', officialItem: 'gsap.ticker.add()는 함수를 돌려준다. once: true로 등록하면 돌려주는 wrapper가 넘긴 callback과 다른 참조라서, 한 번 실행되기 전에 직접 제거하려면 반환값을 보관해야 한다. 공식 페이지에는 반환값이 없다.', source: 'ticker', origin: 'implementation', sectionId: 'ticker' },
  { id: 'TK-P4', officialItem: 'prioritize: true로 등록한 listener는 같은 tick에서 tween.time()을 0으로 읽었고 일반 listener는 0.009로 읽었다. 우선 listener가 root 갱신보다 먼저 실행된다는 공식 주장을 실행으로 확인한 값이다.', source: 'ticker', origin: 'implementation', sectionId: 'ticker' },
  { id: 'TK-P5', officialItem: 'requestAnimationFrame이 없는 Node에서는 setTimeout fallback이 초당 약 238회 돌았고 gsap.ticker.fps(30) 뒤에는 29.9회로 떨어졌다. 이 수치는 환경에 종속적이며 브라우저에서는 rAF가 화면 주사율로 상한을 정한다.', source: 'ticker', origin: 'implementation', sectionId: 'ticker' },
  { id: 'ER-P1', officialItem: '인자 없이 부른 exportRoot()는 delayedCall을 옮기지 않고 globalTimeline에 남겨 둔다. 설치본 3.15.0의 시그니처는 exportRoot(vars?: TimelineVars, includeDelayedCalls?: boolean)이며, 공식 페이지에는 시그니처와 Parameters 절이 없다.', source: 'export-root', origin: 'implementation', sectionId: 'export-root' },
  { id: 'UR-P1', officialItem: 'gsap.updateRoot(t)의 t는 누적 증가분이 아니라 root의 절대 시간이다. 반환값은 undefined다. ticker에서 updateRoot를 떼어낸 뒤에는 wall clock 300ms 동안 tween.time()이 0.0000에서 전혀 움직이지 않았다.', source: 'update-root', origin: 'implementation', sectionId: 'update-root' },
]
