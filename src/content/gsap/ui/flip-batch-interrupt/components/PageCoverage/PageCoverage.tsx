/** P13 official item coverage 분모를 표시한다. */
import { flipBatchInterruptItems } from '../../flip-batch-interrupt.catalog'
/** official과 implementation item을 분리해 요약한다. */
export function PageCoverage() {
  return (
    <p>
      {flipBatchInterruptItems.filter((x) => x.origin === 'official').length}{' '}
      official items ·{' '}
      {
        flipBatchInterruptItems.filter((x) => x.origin === 'implementation')
          .length
      }{' '}
      implementation check
    </p>
  )
}
