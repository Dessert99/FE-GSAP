/** seek()의 position·suppressEvents 계약을 LabelNavigatorLab의 실제 getter와 callback으로 확인한다. */
import { LabelNavigatorLab } from '../../examples/LabelNavigatorLab/LabelNavigatorLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

export function SeekByNameSection() {
  return (
    <section id="seek-by-name" className="labels-page__section" aria-labelledby="seek-by-name-title">
      <SectionHeading number="05" id="seek-by-name" title="이름으로 이동하기" description="seek()은 paused·reversed를 건드리지 않고 숫자·label·상대 position으로 playhead만 옮기며, 이동 경로의 callback 실행 여부를 선택합니다." />
      <pre className="labels-page__signature"><code>{'seek( position:*, suppressEvents:Boolean ) : self'}</code></pre>
      <div className="labels-page__note"><p>공식 설명 앞에는 <code>[override]</code>가 붙어 있습니다. Timeline이 상위 Animation의 seek 정의를 Timeline position 문법에 맞게 재정의한 메서드라는 표시입니다.</p></div>
      <div className="labels-page__table-wrap"><table className="labels-page__table"><caption>공식 Parameters와 Returns</caption><thead><tr><th scope="col">항목</th><th scope="col">계약</th></tr></thead><tbody>
        <tr><th scope="row"><code>position: *</code></th><td>숫자 3, label "myLabel", 끝 기준 "-=2", label 기준 "myLabel+=2"를 받습니다.</td></tr>
        <tr><th scope="row"><code>suppressEvents: Boolean</code></th><td>기본 true. 이동 사이의 event·callback을 실행하지 않습니다.</td></tr>
        <tr><th scope="row">Returns</th><td><code>self</code> — chaining을 쉽게 합니다.</td></tr>
      </tbody></table></div>
      <div className="labels-page__note"><p>공식은 레코드플레이어 바늘을 들어 새 위치에 내려놓는 비유를 씁니다. 기본 true면 사이의 홈을 재생하지 않고, false면 이동 경로의 callback을 통과시킵니다.</p><pre className="labels-page__code"><code>{`timeline.seek(2)
timeline.seek(2, false)
timeline.seek('myLabel')`}</code></pre></div>
      <LabelNavigatorLab />
      <div className="labels-page__note labels-page__note--probe"><h3>즉시 render·상대값 기준·범위 자르기</h3><p>0→100을 4초에 바꾸는 Timeline에서 2초 label로 seek 직후 plain object 값은 50이었습니다. <code>seek('+=1')</code>은 현재 playhead가 아니라 Timeline 끝 기준이고, duration 5에서 99는 5, -3은 0으로 잘렸습니다.</p><p>없는 이름도 끝에 새 label로 생겼습니다. 2.5초 callback을 사이에 두고 0→3초로 seek하면 기본 true에서는 0회, false에서는 1회 실행됐습니다.</p><p className="labels-page__provenance">GSAP 3.15.0에서 self identity·paused/reversed·plain object render 값·callback count·labels를 직접 읽었습니다.</p></div>
      <div className="labels-page__note"><p>position 문자열 상세는 공식이 대화형 timeline과 영상이 있는 Position Parameter 문서로 안내합니다.</p></div>
    </section>
  )
}
