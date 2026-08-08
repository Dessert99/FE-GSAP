/** read-only timing·CSS type·후속 page ownership을 명시하는 마지막 section이다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** x/y가 global page coordinate가 아닐 수 있음을 보존하고 다음 경계를 적는다. */
export function ReadingBoundarySection() {
  return (
    <section
      id="reading-boundaries"
      className="draggable-coordinates-page__section"
      aria-labelledby="reading-boundaries-title"
    >
      <SectionHeading
        number="05"
        id="reading-boundaries"
        title="읽기 전용 값의 timing과 환경을 확인한다"
        description="x와 y는 type에 따라 transform 또는 inline CSS 값이며, global page 좌표가 아닐 수 있습니다."
      />
      <div className="draggable-coordinates-page__prose">
        <p>
          이 페이지의 좌표 surface는 Draggable instance에서 읽는 값입니다.{' '}
          <code>type: 'x,y'</code>면 x/y는 transform translation이고,{' '}
          <code>type: 'top,left'</code>면 inline CSS 관련 값입니다. 둘 다
          자동으로 global coordinate가 되지 않습니다.
        </p>
        <p>
          lab은 실제 browser pointer 환경에서만 press·drag·release 값을
          얻습니다. 만든 instance는 cleanup에서 <code>kill()</code>하고, frame
          예약도 취소합니다. plugin registration은{' '}
          <a href={toHref('/fundamentals/plugins')}>Plugins overview</a>,
          instance 생성·identity는{' '}
          <a href={toHref('/fundamentals/draggable-create')}>
            Draggable create
          </a>
          에서 복습할 수 있습니다.
        </p>
      </div>
      <div className="draggable-coordinates-page__warning">
        <h3>이 페이지 밖의 범위</h3>
        <p>
          bounds·axis(P05), enable/disable·kill method 상세(P06), gesture
          event(P07), collision·momentum(P08)은 아직 링크하지 않고 text-only
          경계로 남깁니다.
        </p>
      </div>
    </section>
  )
}
