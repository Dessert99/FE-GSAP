/** Timeline 재생 제어 공식 문서 8개의 기술 item과 실행 확인 item을 로컬 섹션에 연결한다. */

/** source item이 나온 공식 문서와 로컬 근거를 한 행으로 고정한다. */
export type TimelinePlaybackSourceItem = {
  id: string
  officialItem: string
  source: 'is-active' | 'pause' | 'paused' | 'play' | 'restart' | 'resume' | 'reverse' | 'reversed'
  origin: 'official' | 'implementation'
  sectionId: string
}

/** 공식 item 65개와 GSAP 3.15.0 probe 8개를 같은 coverage authority에 보관한다. */
export const timelinePlaybackControlsSourceItems: TimelinePlaybackSourceItem[] = [
  // 01 playback-model — Timeline 하나의 스위치와 조상까지 보는 active 계산
  { id: 'PSD-02', officialItem: 'paused()는 animation의 paused 상태, 즉 현재 멈췄는지를 가져오거나 설정한다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-05', officialItem: 'paused 상태는 조상 timeline을 고려하지 않는다("This does not take into account anscestor timelines." — 공식 철자 오류 보존).', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-06', officialItem: '멈추지 않은 tween도 부모 timeline 또는 조상 timeline이 멈추면 멈춘 것처럼 보일 수 있다("ancenstor" — 공식 철자 오류 보존).', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-07', officialItem: 'animation을 멈춰도 부모 timeline에서 제거되지는 않지만 부모 duration/totalDuration 계산에는 포함되지 않게 된다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-08', officialItem: 'animation이 완료되어도 paused 상태는 바뀌지 않는다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'PSD-10', officialItem: 'vars에 paused: true를 넘겨 초기 paused 상태를 지정할 수 있다.', source: 'paused', origin: 'official', sectionId: 'playback-model' },
  { id: 'RVD-02', officialItem: 'reversed()는 animation의 reversed 상태, 즉 거꾸로 재생해야 하는지를 가져오거나 설정한다.', source: 'reversed', origin: 'official', sectionId: 'playback-model' },
  { id: 'RVD-03', officialItem: 'reversed 값은 yoyo 반복의 영향을 받지 않고 조상 timeline의 reversed 상태도 고려하지 않는다.', source: 'reversed', origin: 'official', sectionId: 'playback-model' },
  { id: 'RVD-04', officialItem: 'reversed가 아닌 tween도 부모 또는 조상 timeline이 reversed면 거꾸로 도는 것처럼 보일 수 있다.', source: 'reversed', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-03', officialItem: 'isActive()는 가상 playhead가 instance의 time span 위를 움직이고 자신과 모든 조상 timeline이 paused가 아닐 때 active임을 나타낸다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-04', officialItem: 'timeline이 진행 중이면 active지만 끝난 뒤나 시작 전에는 active가 아니다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-05', officialItem: '자신 또는 조상 timeline 중 하나라도 paused면 isActive()는 false를 돌려준다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-06', officialItem: 'playhead가 animation 시작 시각 바로 위에 있으면 아직 렌더되지 않았어도 active로 친다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },
  { id: 'ISA-07', officialItem: 'progress()/totalProgress()는 paused 상태나 부모 timeline playhead 위치를 고려하지 않으며 global timeline은 언제나 active로 간주한다.', source: 'is-active', origin: 'official', sectionId: 'playback-model' },

  // 02 playback-commands — 멈춤·정방향 재생·방향 유지 재개와 label 인자
  { id: 'PAU-01', officialItem: 'signature는 pause( atTime:*, suppressEvents:Boolean ) : self 이다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PAU-02', officialItem: 'pause()는 instance를 멈추며 선택적으로 특정 시각으로 점프한 뒤 멈춘다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PAU-03', officialItem: 'atTime은 *이고 기본값 null이며 Timeline에서는 label도 받을 수 있다. 생략하면 현재 playhead 위치에서 멈춘다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PAU-04', officialItem: 'suppressEvents는 Boolean이고 기본값 true이며 atTime으로 옮기는 동안 event와 callback을 실행하지 않는다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PAU-05', officialItem: 'pause()는 chaining을 위해 self를 돌려준다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PAU-06', officialItem: 'atTime을 주면 playhead가 즉시 이동하고 사이 callback은 기본적으로 건너뛴다. 레코드 바늘 비유와 suppressEvents false 선택이 제시된다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PAU-07', officialItem: '공식 예제는 tl.pause(), tl.pause(2), tl.pause(2, false)이며 child가 멈춰도 부모 playhead는 계속 가므로 보통 부모를 멈추라는 note가 있다.', source: 'pause', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-01', officialItem: 'signature는 play( from:*, suppressEvents:Boolean ) : self 이다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-02', officialItem: 'play()는 앞으로 재생하며 from을 생략하면 현재 playhead 위치에서 시작한다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-03', officialItem: 'play()는 instance가 paused도 reversed도 아니게 만든다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-04', officialItem: 'from은 *이고 기본값 null이며 label을 받을 수 있다. Parameters에는 "Time instances"라고 적혀 있고 Details에는 "Timeline instances"라고 적혀 있다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-05', officialItem: 'suppressEvents는 Boolean이고 기본값 true이며 from으로 옮기는 동안 event와 callback을 실행하지 않는다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-06', officialItem: 'play()는 chaining을 위해 self를 돌려준다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-07', officialItem: 'from을 주면 즉시 이동하고 사이 callback은 기본적으로 건너뛴다. 레코드 바늘 비유와 suppressEvents false 선택이 제시된다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-08', officialItem: 'note — play() 호출 시 Timeline timeScale이 정확히 0이면 1로 바뀐다고 적고, 0.001을 먼저 설정하는 패턴을 제시한다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'PLY-09', officialItem: '공식 예제는 tl.play(), tl.play(2), tl.play(2, false) 세 가지이며 마지막 코드에 불필요한 > 문자가 있다.', source: 'play', origin: 'official', sectionId: 'playback-commands' },
  { id: 'RSM-01', officialItem: 'signature는 resume( ) : self 이며 Parameters 절이 없다.', source: 'resume', origin: 'official', sectionId: 'playback-commands' },
  { id: 'RSM-02', officialItem: 'resume()은 정방향 또는 역방향을 바꾸지 않고 재생을 재개한다.', source: 'resume', origin: 'official', sectionId: 'playback-commands' },
  { id: 'RSM-03', officialItem: 'resume()은 chaining을 위해 self를 돌려준다.', source: 'resume', origin: 'official', sectionId: 'playback-commands' },
  { id: 'RSM-04', officialItem: 'note — resume() 호출 시 Timeline timeScale이 정확히 0이면 1로 바뀐다고 적고, 0.001을 먼저 설정하는 패턴을 제시한다.', source: 'resume', origin: 'official', sectionId: 'playback-commands' },

  // 03 restart-and-reverse — 처음부터 정방향 또는 특정 위치부터 역방향
  { id: 'RST-01', officialItem: 'signature는 restart( includeDelay:Boolean, suppressEvents:Boolean ) : self 이다.', source: 'restart', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RST-02', officialItem: 'restart()는 처음으로 되돌린 뒤 앞으로 재생한다.', source: 'restart', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RST-03', officialItem: 'includeDelay는 Boolean이고 기본값 false이며 restart 때 delay를 존중할지 정한다.', source: 'restart', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RST-04', officialItem: 'suppressEvents는 Boolean이고 기본값 true다. 공식 설명은 존재하지 않는 "time parameter"로 옮길 위치를 정한다고 적는다.', source: 'restart', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RST-05', officialItem: 'restart()는 chaining을 위해 self를 돌려준다.', source: 'restart', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RST-06', officialItem: '공식 예제는 tl.restart()와 tl.restart(true, false) 두 가지다.', source: 'restart', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-01', officialItem: 'signature는 reverse( from:*, suppressEvents:Boolean ) : self 이다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-02', officialItem: 'reverse()는 tween ease를 포함해 animation의 모든 측면이 뒤를 향하도록 재생을 뒤집는다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-03', officialItem: 'instance의 time과 totalTime은 0을 향해 되돌아간다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-04', officialItem: '역재생 전에 점프할 시각 또는 label을 지정할 수 있고, 생략하면 현재 playhead 위치에서 시작한다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-05', officialItem: 'reverse()는 instance가 paused도 reversed도 아니게 만든다고 적혀 있다("neither paused nor reversed" — 실행과 반대인 원문 보존).', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-06', officialItem: 'from은 *이고 기본값 null이며 Timeline label도 된다. 끝에서 시작하려면 0, 음수 -1은 끝에서 1초 전이라고 적혀 있다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-07', officialItem: 'suppressEvents는 Boolean이고 기본값 true이며 from으로 옮기는 동안 event와 callback을 실행하지 않는다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-08', officialItem: 'reverse()는 chaining을 위해 self를 돌려준다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-09', officialItem: '맨 끝으로 점프해 역재생하려면 reverse(0)을 쓴다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-10', officialItem: 'instance의 역방향 상태는 reversed()로 확인한다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-11', officialItem: 'from을 주면 즉시 이동하고 사이 callback은 기본적으로 건너뛴다. 레코드 바늘 비유와 suppressEvents false 선택이 제시된다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },
  { id: 'RVS-12', officialItem: '공식 예제는 reverse(), reverse(2), reverse(2, false), reverse(0), reverse(-1), reversed() 분기, reversed(!reversed()) 토글을 보여 준다.', source: 'reverse', origin: 'official', sectionId: 'restart-and-reverse' },

  // 04 state-readout — 같은 이름의 getter/setter와 읽기 전용 isActive
  { id: 'PSD-01', officialItem: 'signature는 paused( value:Boolean ) : [Boolean | self] 이다.', source: 'paused', origin: 'official', sectionId: 'state-readout' },
  { id: 'PSD-03', officialItem: 'value는 Boolean이고 기본값 false다. 생략하면 getter, 넘기면 setter가 되어 instance를 돌려준다.', source: 'paused', origin: 'official', sectionId: 'state-readout' },
  { id: 'PSD-04', officialItem: 'paused()의 반환값은 인자 유무에 따라 Boolean 또는 self다.', source: 'paused', origin: 'official', sectionId: 'state-readout' },
  { id: 'PSD-09', officialItem: '멈춤·재개 명령에는 pause()/resume(), 상태 확인과 토글에는 paused()를 쓰라고 안내한다.', source: 'paused', origin: 'official', sectionId: 'state-readout' },
  { id: 'PSD-11', officialItem: '공식 예제는 tl.paused() 읽기, tl.paused(true) 쓰기, tl.paused(!tl.paused()) 토글과 chaining 패턴이다.', source: 'paused', origin: 'official', sectionId: 'state-readout' },
  { id: 'RVD-01', officialItem: 'signature는 reversed( value:Boolean ) : [Boolean | self] 이다.', source: 'reversed', origin: 'official', sectionId: 'state-readout' },
  { id: 'RVD-05', officialItem: 'value는 Boolean이고 기본값 false다. 생략하면 getter, 넘기면 setter가 되어 instance를 돌려준다.', source: 'reversed', origin: 'official', sectionId: 'state-readout' },
  { id: 'RVD-06', officialItem: 'reversed()의 반환값은 인자 유무에 따라 Boolean 또는 self다.', source: 'reversed', origin: 'official', sectionId: 'state-readout' },
  { id: 'RVD-07', officialItem: 'reversed()는 getter와 setter 역할을 함께 한다.', source: 'reversed', origin: 'official', sectionId: 'state-readout' },
  { id: 'RVD-08', officialItem: '공식 예제는 tl.reversed() 읽기, tl.reversed(true) 쓰기, tl.reversed(!tl.reversed()) 토글이다.', source: 'reversed', origin: 'official', sectionId: 'state-readout' },
  { id: 'ISA-01', officialItem: 'signature는 isActive( ) : Boolean 이며 Parameters 절이 없다.', source: 'is-active', origin: 'official', sectionId: 'state-readout' },
  { id: 'ISA-02', officialItem: 'timeline이 active인지 나타내는 Boolean을 돌려준다.', source: 'is-active', origin: 'official', sectionId: 'state-readout' },
  { id: 'ISA-08', officialItem: '공식 데모는 isActive()로 animation이 active인 동안 방향 전환을 막으며 Timeline 문서인데 설명 대상은 tween과 box다.', source: 'is-active', origin: 'official', sectionId: 'state-readout' },
  // 공식 문서 오류·침묵 지점을 실행으로 확인한 item — 공식 coverage 분모에서는 제외
  { id: 'TLPB-01', officialItem: 'reverse()는 시작·중간·완료 지점 모두에서 paused()=false, reversed()=true, timeScale()=-1로 만들었다. 공식의 "neither reversed"와 반대다.', source: 'reverse', origin: 'implementation', sectionId: 'restart-and-reverse' },
  { id: 'TLPB-02', officialItem: 'duration 3 Timeline에서 reverse(0)은 time 3, reverse(-1)과 reverse(-0.5)는 time 0이었다. 음수는 끝 기준으로 환산되지 않았다.', source: 'reverse', origin: 'implementation', sectionId: 'restart-and-reverse' },
  { id: 'TLPB-03', officialItem: 'timeScale(0)인 Timeline에 play() 또는 resume()을 호출해도 GSAP 3.15.0에서는 timeScale이 0으로 남았다.', source: 'play', origin: 'implementation', sectionId: 'playback-commands' },
  { id: 'TLPB-04', officialItem: 'play("middle"), pause("middle"), reverse("middle")는 모두 label의 time 1로 이동했고 각각 정방향 재생·멈춤·역방향 재생 상태가 됐다.', source: 'play', origin: 'implementation', sectionId: 'playback-commands' },
  { id: 'TLPB-05', officialItem: 'restart()는 정방향·역방향·멈춤 세 출발 상태 모두에서 paused=false, reversed=false, time=0, timeScale=1로 만들었다.', source: 'restart', origin: 'implementation', sectionId: 'restart-and-reverse' },
  { id: 'TLPB-06', officialItem: 'paused(false)와 resume()은 역방향을 유지하지만 play()는 정방향으로 돌린다.', source: 'resume', origin: 'implementation', sectionId: 'playback-commands' },
  { id: 'TLPB-07', officialItem: 'isActive(true)는 인자를 무시하고 Boolean을 돌려주며, setter 둘과 명령 메서드 다섯 개는 Timeline 자신을 돌려준다.', source: 'is-active', origin: 'implementation', sectionId: 'state-readout' },
  { id: 'TLPB-08', officialItem: '세 child Timeline의 time을 0.5초 단위로 옮기면 A→B→C가 차례대로 0→50→100을 기록해 부모 playhead 제어가 children 전체에 전파됐다.', source: 'play', origin: 'implementation', sectionId: 'playback-model' },
]
