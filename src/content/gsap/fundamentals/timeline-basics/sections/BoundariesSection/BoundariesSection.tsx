/** Timeline 클래스가 나열하는 나머지 기능을 빠짐없이 보존하고 상세 소유권은 후속 페이지로 넘긴다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// Timeline 클래스 Methods 표 52개의 인자와 반환 타입을 원문 순서대로 보존한다
const timelineMethods = [
  'add( child:[Tween | Timeline | Label | Callback | Array], position:[Number | String | Label] ) : self',
  'addLabel( label:String, position:[Number | String] ) : self',
  'addPause( position:[String | Number | Label], callback:Function, params:Array ) : self',
  'call( callback:Function, params:Array, position:* ) : self',
  'clear( labels:Boolean ) : self',
  'currentLabel( value:String ) : [String | self]',
  'delay( value:Number ) : [Number | self]',
  'duration( value:Number ) : [Number | self]',
  'endTime( includeRepeats:Boolean ) : [Number | self]',
  'eventCallback( type:String, callback:Function, params:Array ) : [Function | self]',
  'from( target:[ Object | Array | String ], vars:Object, position:[ Number | String ] ) : self',
  'fromTo( target:[ Object | Array | String ], fromVars:Object, toVars:Object, position:[ Number | String ] ) : self',
  'getById( id:String ) : Animation',
  'getChildren( nested:Boolean, tweens:Boolean, timelines:Boolean, ignoreBeforeTime:Number ) : Array',
  'getTweensOf( target:[Object | Selector text | Array], nested:Boolean ) : Array',
  'globalTime( localTime:Number ) : Number',
  'invalidate( ) : self',
  'isActive( ) : Boolean',
  'iteration( value:Number ) : [Number | self]',
  'kill( ) : Timeline',
  'killTweensOf( targets:Selector text | Array | Object, props:String, onlyActive:Boolean ) : Timeline',
  'nextLabel( time:Number ) : String',
  'pause( atTime:*, suppressEvents:Boolean ) : self',
  'paused( value:Boolean ) : [Boolean | self]',
  'play( from:*, suppressEvents:Boolean ) : self',
  'previousLabel( time:Number ) : String',
  'progress( value:Number, suppressEvents:Boolean ) : [Number | self]',
  'recent( ) : [Tween | Timeline | Callback]',
  'remove( value:[Tween | Timeline | Callback | Label] ) : self',
  'removeLabel( label:String ) : self',
  'removePause( position:[Number | Label] ) : self',
  'repeat( value:Number ) : [Number | self]',
  'repeatDelay( value:Number ) : [Number | self]',
  'restart( includeDelay:Boolean, suppressEvents:Boolean ) : self',
  'resume( ) : self',
  'reverse( from:*, suppressEvents:Boolean ) : self',
  'reversed( value:Boolean ) : [Boolean | self]',
  'revert( ) : Self',
  'seek( position:*, suppressEvents:Boolean ) : self',
  'set( target:[ Object | Array | String ], vars:Object, position:[ Number | String ] ) : self',
  'shiftChildren( amount:Number, adjustLabels:Boolean, ignoreBeforeTime:Number ) : self',
  'startTime( value:Number ) : [Number | self]',
  'then( callback:Function ) : Promise',
  'time( value:Number, suppressEvents:Boolean ) : [Number | self]',
  'timeScale( value:Number ) : [Number | self]',
  'to( target:[ Object | Array | String ], vars:Object, position:[ Number | String ] ) : self',
  'totalDuration( value:Number ) : [Number | self]',
  'totalProgress( value:Number, suppressEvents:Boolean ) : [Number | self]',
  'totalTime( time:Number, suppressEvents:Boolean ) : [Number | self]',
  'tweenFromTo( fromPosition:[Number | Label], toPosition:[Number | Label], vars:Object ) : Tween',
  'tweenTo( position:[Number | Label], vars:Object ) : Tween',
  'yoyo( value:Boolean ) : [Boolean | self]',
] as const

export function BoundariesSection() {
  return (
    <section id="boundaries" className="timeline-page__section" aria-labelledby="boundaries-title">
      <SectionHeading number="08" id="boundaries" title="여기서 다루지 않는 것" description="Timeline 클래스는 52개 메서드를 모아 보여 주지만 이 페이지는 생성과 child creator만 깊게 다룹니다." />

      <div className="timeline-page__feature-grid">
        <article><h3>속도와 playhead</h3><p><code>timeScale()</code>로 전체 속도를 바꾸거나 그 값 자체를 tween해 점진적으로 가감속합니다. progress·totalProgress를 읽거나 설정하며 <code>progress(0.5)</code>는 절반으로 이동합니다.</p></article>
        <article><h3>찾기와 정리</h3><p><code>killTweensOf()</code>·<code>getTweensOf()</code>·<code>getChildren()</code>으로 target이나 child를 찾고 제거할 수 있습니다.</p></article>
        <article><h3>반복과 callback</h3><p>repeat·repeatDelay·yoyo로 주기를 만들고 constructor vars의 onComplete·onStart·onUpdate·onRepeat·onReverseComplete로 생애를 관찰합니다.</p></article>
        <article><h3>label</h3><p><code>currentLabel()</code>·<code>nextLabel()</code>·<code>previousLabel()</code>로 숫자 대신 이름 붙인 위치를 찾습니다.</p></article>
      </div>

      <div className="timeline-page__prose">
        <p><code>time()</code>·<code>totalTime()</code>·<code>progress()</code>·<code>totalProgress()</code>를 tween하면 빨리 감기와 되감기를 만들 수 있고, slider를 연결하면 사용자가 Timeline을 앞뒤로 직접 드래그할 수 있습니다.</p>
      </div>

      <div className="timeline-page__methods">
        <h3>Timeline Methods 표 {timelineMethods.length}개 signature</h3>
        <ul>{timelineMethods.map((signature) => <li key={signature}><code>{signature}</code></li>)}</ul>
        <p>공식 클래스 표에서 <code>getById(id:String) : Animation</code> 행만 설명 칸이 비어 있습니다.</p>
      </div>

      <div className="timeline-page__warning">
        <h3>globalTimeline 전체를 제어할 때는 특히 조심합니다</h3>
        <p><code>gsap.globalTimeline.pause()</code>나 <code>timeScale()</code>은 delayedCall을 포함한 앱의 모든 GSAP animation에 영향을 줍니다. 공식은 게임 animation을 1/10 속도로 낮추면서 새 modal만 정상 속도로 둘 때처럼 기존 root animation을 미래 animation과 분리하려면 <code>gsap.exportRoot()</code>를 쓰는 예를 듭니다. 되돌릴 수 없는 전역 조작이라 이 페이지에는 실행 예제를 만들지 않습니다.</p>
      </div>

      <div className="timeline-page__prose">
        <p>공식 sample은 repeat 3·repeatDelay 1·onComplete로 Timeline을 만들고, <code>+=0.5</code> gap·<code>reverse()</code>·spin label·label에서 rotation Tween·<code>play('spin')</code>·nested Timeline 추가까지 한 블록에 보여 줍니다. 이 페이지에서는 그 전체 기능이 한 container에서 조합된다는 사실만 보존합니다.</p>
      </div>

      <ul className="timeline-page__links">
        <li>callback·pause·Promise는 <a href={toHref('/fundamentals/timeline-callbacks-pauses')}>Timeline 함수와 멈춤 예약</a>이 소유합니다.</li>
        <li>공통 Animation 재생 명령은 <a href={toHref('/fundamentals/tween-playback-controls')}>Tween 재생 제어</a>에서 먼저 익힐 수 있습니다.</li>
        <li>time·progress 좌표의 공통 멘탈 모델은 <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead</a>가 소유합니다.</li>
        <li>child 배치·label·검사·Timeline 전용 반복과 타이밍 페이지는 아직 등록 전이라 링크를 만들지 않습니다.</li>
      </ul>
    </section>
  )
}
