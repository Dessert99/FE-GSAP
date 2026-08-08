/** P21의 #101 technical item coverage 분모를 표시한다. */
import { motionPathItems } from '../../motion-path.catalog'
/** official parent source를 세부 item으로 분해한 수를 보여 준다. */
export function PageCoverage() {
  return <p>#101 · {motionPathItems.length} technical items covered</p>
}
