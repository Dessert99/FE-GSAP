/** P16의 five official lifecycle item coverage를 짧게 표시한다. */
import { velocityTrackerLifecycleItems } from '../../velocity-tracker-lifecycle.catalog'
/** canonical item 수를 learner header에서 확인하게 한다. */
export function PageCoverage() {
  return (
    <p>
      {velocityTrackerLifecycleItems.length} official lifecycle items covered
    </p>
  )
}
