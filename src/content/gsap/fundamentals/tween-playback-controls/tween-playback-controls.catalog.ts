/** 공식 여덟 문서에서 확인한 기술 item 66개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'is-active' | 'pause' | 'paused' | 'play' | 'restart' | 'resume' | 'reverse' | 'reversed'
  /** 공식 문서에 게시된 주장인지, 현재 GSAP 실행으로 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 재생 제어에 관한 기술 주장 전체 목록 — handoff와 각 섹션이 같은 배열을 근거로 삼는다. */
export const tweenPlaybackControlsSourceItems: SourceItem[] = [
  // 01 playback-model — paused·reversed의 의미와 isActive()가 무엇을 계산하는지
  { id: 'PSD-02', officialItem: "paused()는 animation의 paused 상태, 즉 지금 멈춰 있는지 여부를 가져오거나 설정한다.", source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-05', officialItem: 'paused 상태는 조상 timeline을 고려하지 않는다("This does not take into account anscestor timelines." — 원문 오타 포함).', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-06', officialItem: '그래서 멈추지 않은 tween도 부모 timeline(또는 조상 timeline)이 멈춰 있으면 멈춘 것처럼 보일 수 있다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-07', officialItem: 'animation을 멈춰도 부모 timeline에서 제거되지는 않지만, 부모의 duration/totalDuration 계산에는 포함되지 않게 된다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-08', officialItem: 'animation이 완료되어도 paused 상태는 바뀌지 않는다("When an animation completes, it does NOT alter its paused state.").', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-10', officialItem: 'vars에 paused: true를 넘겨 초기 paused 상태를 지정할 수 있다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'RVD-02', officialItem: "reversed()는 animation의 reversed 상태, 즉 거꾸로 재생해야 하는지 여부를 가져오거나 설정한다.", source: 'reversed', origin: 'official', sectionId: 'playback-model' },
  { id: 'RVD-03', officialItem: 'reversed 값은 yoyo 반복의 영향을 받지 않으며 조상 timeline의 reversed 상태도 고려하지 않는다.', source: 'reversed', origin: 'official', sectionId: 'playback-model' },
  { id: 'RVD-04', officialItem: '그래서 reversed가 아닌 tween도 부모 timeline(또는 조상 timeline)이 reversed면 거꾸로 도는 것처럼 보일 수 있다.', source: 'reversed', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-03', officialItem: 'isActive()는 가상 playhead가 이 instance의 time span 위를 실제로 지나가는 중이고, 자신도 조상 timeline도 paused가 아닐 때 active임을 나타낸다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-04', officialItem: 'tween이 진행 중이면 active이지만, 끝난 뒤(또는 시작 전)에는 active가 아니다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-05', officialItem: '자신이 paused이거나 paused인 timeline 안에 있으면(또는 조상 timeline 중 하나라도 paused면) isActive()는 false를 돌려준다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-06', officialItem: 'playhead가 animation의 시작 시각 바로 위에 있으면 아직 렌더되지 않았더라도 "active"로 친다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-07', officialItem: 'progress()나 totalProgress()를 볼 수도 있지만 그 값들은 paused 상태와 부모 timeline playhead의 위치를 고려하지 않는다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },

  // 02 stop-and-go — pause() / play() / resume()
  { id: 'PAU-01', officialItem: 'signature는 pause( atTime:Number, suppressEvents:Boolean ) : self 이다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PAU-02', officialItem: 'pause()는 instance를 멈추며, 선택적으로 특정 시각으로 점프한 뒤 멈춘다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PAU-03', officialItem: 'atTime은 Number이고 기본값은 null이며, 멈추기 전에 점프할 시각이다. 지정하지 않으면 playhead가 있는 자리에서 그대로 멈춘다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PAU-04', officialItem: 'suppressEvents는 Boolean이고 기본값은 true이며, true면 playhead가 atTime으로 옮겨 갈 때 어떤 event나 callback도 실행되지 않는다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PAU-05', officialItem: 'pause()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PAU-06', officialItem: '첫 인자는 timeline instance라면 label일 수도 있다. playhead는 즉시 그리로 옮겨 가고, 기존 위치와 새 위치 사이의 event·callback은 기본값 suppressEvents가 true라 실행되지 않는다. 레코드플레이어 바늘을 들어 다른 자리에 놓는 것과 같으며, 억제하고 싶지 않으면 suppressEvents를 false로 준다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PAU-07', officialItem: '공식 코드 예제는 myAnimation.pause(), myAnimation.pause(2), myAnimation.pause(2, false) 세 가지다.', source: 'pause', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-01', officialItem: 'signature는 play( from:Number, suppressEvents:Boolean ) : self 이다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-02', officialItem: 'play()는 앞으로 재생을 시작하며, 선택적으로 특정 시각부터 시작한다. 기본적으로는 playhead가 있는 자리부터 재생한다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-03', officialItem: 'play()는 instance가 paused도 reversed도 아니게 만든다("This also ensures that the instance is neither paused nor reversed.").', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-04', officialItem: 'from은 Number이고 기본값은 null이며, 재생을 시작할 시각이다. 지정하지 않으면 playhead가 있는 자리부터 재생한다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-05', officialItem: 'suppressEvents는 Boolean이고 기본값은 true이며, true면 playhead가 from으로 옮겨 갈 때 어떤 event나 callback도 실행되지 않는다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-06', officialItem: 'play()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-07', officialItem: 'from을 주면 playhead가 즉시 그리로 옮겨 가고 사이의 event·callback은 실행되지 않는다. 레코드플레이어 바늘 비유가 붙어 있으며, 억제하고 싶지 않으면 suppressEvents를 false로 준다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-08', officialItem: 'tip — play()를 부를 때 Tween의 timeScale이 정확히 0이면 1로 바뀐다(그러지 않으면 재생되지 않으므로). 0에서부터 올리고 싶으면 play() 전에 myAnimation.timeScale(myAnimation.timeScale() || 0.001)처럼 아주 작은 값을 준다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'PLY-09', officialItem: '공식 코드 예제는 myAnimation.play(), myAnimation.play(2), myAnimation.play(2, false) 세 가지다.', source: 'play', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'RSM-01', officialItem: 'signature는 resume( ) : self 이며 Parameters 절이 없다.', source: 'resume', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'RSM-02', officialItem: 'resume()은 방향(앞으로 또는 거꾸로)을 바꾸지 않고 재생을 재개한다.', source: 'resume', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'RSM-03', officialItem: 'resume()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'resume', origin: 'official', sectionId: 'stop-and-go' },
  { id: 'RSM-04', officialItem: 'note — resume()을 부를 때 Tween의 timeScale이 정확히 0이면 1로 바뀐다. 0에서부터 올리고 싶으면 myAnimation.timeScale(myAnimation.timeScale() || 0.001).resume()처럼 아주 작은 값을 먼저 준다.', source: 'resume', origin: 'official', sectionId: 'stop-and-go' },

  // 03 restart-from-start — restart()
  { id: 'RST-01', officialItem: 'signature는 restart( includeDelay:Boolean, suppressEvents:Boolean ) : self 이다.', source: 'restart', origin: 'official', sectionId: 'restart-from-start' },
  { id: 'RST-02', officialItem: 'restart()는 처음으로 되돌린 뒤 앞으로 재생을 시작한다.', source: 'restart', origin: 'official', sectionId: 'restart-from-start' },
  { id: 'RST-03', officialItem: 'includeDelay는 Boolean이고 기본값은 false이며 delay를 존중할지 정한다. delay가 1초인 tween에서 restart()는 즉시 시작하지만 restart(true)는 1초를 더 기다린다.', source: 'restart', origin: 'official', sectionId: 'restart-from-start' },
  { id: 'RST-04', officialItem: 'suppressEvents는 Boolean이고 기본값은 true이며, true면 playhead가 새 위치로 옮겨 갈 때 event나 callback이 실행되지 않는다(원문은 이 자리를 "time 파라미터"라고 적지만 restart의 인자 이름에는 time이 없다).', source: 'restart', origin: 'official', sectionId: 'restart-from-start' },
  { id: 'RST-05', officialItem: 'restart()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'restart', origin: 'official', sectionId: 'restart-from-start' },
  { id: 'RST-06', officialItem: '공식 코드 예제는 myAnimation.restart()와 myAnimation.restart(true, false) 두 가지다.', source: 'restart', origin: 'official', sectionId: 'restart-from-start' },

  // 04 reverse-direction — reverse()
  { id: 'RVS-01', officialItem: 'signature는 reverse( from:*, suppressEvents:Boolean ) : self 이다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-02', officialItem: 'reverse()는 tween의 ease를 포함해 animation의 모든 측면이 거꾸로 향하도록 재생을 뒤집는다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-03', officialItem: '그래서 instance의 time과 totalTime도 0을 향해 되돌아간다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-04', officialItem: '되감기 전에 점프할 시각을 지정할 수 있다. 지정하지 않으면 playhead가 있는 자리부터 거꾸로 재생한다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-05', officialItem: 'reverse()를 부르면 instance가 paused도 reversed도 아니게 된다고 적혀 있다("Calling reverse() also ensures that the instance is neither paused nor reversed.").', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-06', officialItem: 'from의 타입은 *이고 기본값은 null이며 Timeline이면 label일 수도 있다. 맨 끝에서 시작하려면 0을 쓰고, 음수는 끝을 기준으로 하여 -1은 끝에서 1초 전이라고 적혀 있다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-07', officialItem: 'suppressEvents는 Boolean이고 기본값은 true이며, true면 playhead가 from으로 옮겨 갈 때 event나 callback이 실행되지 않는다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-08', officialItem: 'reverse()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-09', officialItem: 'animation의 맨 끝으로 점프해 거기서 거꾸로 재생하려면 from에 0을 쓴다(reverse(0)).', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-10', officialItem: 'instance가 reversed인지 확인하려면 reversed() 메서드를 쓴다(if (myAnimation.reversed()) {...}).', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-11', officialItem: 'from을 주면 playhead가 즉시 그리로 옮겨 가고 사이의 event·callback은 실행되지 않는다. 레코드플레이어 바늘 비유가 붙어 있으며, 억제하고 싶지 않으면 suppressEvents를 false로 준다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },
  { id: 'RVS-12', officialItem: '공식 코드 예제는 reverse(), reverse(2), reverse(2, false), reverse(0), reverse(-1), reversed()로 분기해 play()/reverse()를 고르는 형태, 그리고 같은 일을 짧게 쓴 myAnimation.reversed(!myAnimation.reversed()) 이다.', source: 'reverse', origin: 'official', sectionId: 'reverse-direction' },

  // 05 state-getters — 같은 이름의 getter/setter와 읽기 전용 isActive()
  { id: 'PSD-01', officialItem: 'signature는 paused( value:Boolean ) : [Boolean | self] 이다.', source: 'paused', origin: 'official', sectionId: 'state-getters' },
  { id: 'PSD-03', officialItem: 'value는 Boolean이고 기본값은 false이며, 생략하면 현재 값을 돌려주는 getter, 넘기면 값을 설정하고 chaining을 위해 instance 자신을 돌려주는 setter가 된다.', source: 'paused', origin: 'official', sectionId: 'state-getters' },
  { id: 'PSD-04', officialItem: 'paused()의 반환값은 [Boolean | self]로, 인자를 생략했는지 넘겼는지에 따라 갈린다.', source: 'paused', origin: 'official', sectionId: 'state-getters' },
  { id: 'PSD-09', officialItem: '대부분의 경우 멈출 때는 pause(), 재개할 때는 resume()이 가장 쉽다. 다만 현재 상태를 확인하려면 반드시 paused()를 써야 하고, myAnimation.paused( !myAnimation.paused() ) 같은 토글에도 유용하다.', source: 'paused', origin: 'official', sectionId: 'state-getters' },
  { id: 'PSD-11', officialItem: '공식 코드 예제는 읽기(var paused = myAnimation.paused()), 쓰기(myAnimation.paused(true)), 토글(myAnimation.paused(!myAnimation.paused()))이며, chaining 예시로 myAnimation.paused(true).delay(2).timeScale(0.5)를 든다.', source: 'paused', origin: 'official', sectionId: 'state-getters' },
  { id: 'RVD-01', officialItem: 'signature는 reversed( value:Boolean ) : [Boolean | self] 이다.', source: 'reversed', origin: 'official', sectionId: 'state-getters' },
  { id: 'RVD-05', officialItem: 'value는 Boolean이고 기본값은 false이며, 생략하면 getter, 넘기면 setter가 되어 instance 자신을 돌려준다.', source: 'reversed', origin: 'official', sectionId: 'state-getters' },
  { id: 'RVD-06', officialItem: 'reversed()의 반환값은 [Boolean | self]로, 인자를 생략했는지 넘겼는지에 따라 갈린다.', source: 'reversed', origin: 'official', sectionId: 'state-getters' },
  { id: 'RVD-07', officialItem: 'reversed()는 getter와 setter 역할을 함께 한다고 공식 문서가 명시한다.', source: 'reversed', origin: 'official', sectionId: 'state-getters' },
  { id: 'RVD-08', officialItem: '공식 코드 예제는 읽기(var rev = myAnimation.reversed()), 쓰기(myAnimation.reversed(true)), 토글(myAnimation.reversed(!myAnimation.reversed()))이다.', source: 'reversed', origin: 'official', sectionId: 'state-getters' },
  { id: 'ISA-01', officialItem: 'signature는 isActive( ) : Boolean 이며 Parameters 절이 없다.', source: 'is-active', origin: 'official', sectionId: 'state-getters' },
  { id: 'ISA-02', officialItem: 'tween이 active면 true를, 아니면 false를 돌려준다.', source: 'is-active', origin: 'official', sectionId: 'state-getters' },
  { id: 'ISA-08', officialItem: '공식 데모는 isActive()로 재생 중에는 방향을 바꾸지 못하게 막는다. 상자가 움직이는 동안 방향 전환 버튼을 반복해서 눌러도 클릭이 무시된다.', source: 'is-active', origin: 'official', sectionId: 'state-getters' },
  { id: 'ISA-09', officialItem: '지금 active한 모든 GSAP tween의 배열을 얻으려면 gsap.globalTimeline.getChildren().filter(tween => tween.isActive())를 쓴다.', source: 'is-active', origin: 'official', sectionId: 'state-getters' },

  // 공식 문서가 침묵하거나 실행과 어긋나는 지점 — 분모에 넣지 않고 따로 센다
  { id: 'PB-01', officialItem: 'reverse()는 실제로 reversed()를 true로 만든다. 시작·중간·완료 세 지점 모두에서 호출 직후 paused()=false, reversed()=true, timeScale()=-1이었다. 공식 문장의 "neither paused nor reversed" 중 paused 부분만 실행과 일치한다.', source: 'reverse', origin: 'implementation', sectionId: 'reverse-direction' },
  { id: 'PB-02', officialItem: 'reverse(0)은 끝으로 가지만 음수 from은 끝 기준이 아니다. duration 2에서 reverse(0)은 time 2, reverse(-1)과 reverse(-0.5)는 모두 time 0이었다. 공식이 적은 "-1은 끝에서 1초 전"은 재현되지 않았다.', source: 'reverse', origin: 'implementation', sectionId: 'reverse-direction' },
  { id: 'PB-05', officialItem: 'timeScale이 0일 때 play()/resume()이 1로 바꾼다는 공식 tip은 3.15.0에서 재현되지 않았다. 대부분의 경로는 timeScale 0이 유지됐고, timeScale(0) 뒤 방향을 뒤로 바꿨다가 play()를 부른 경로도 1이 아니라 1e-8이 됐다.', source: 'play', origin: 'implementation', sectionId: 'stop-and-go' },
]
