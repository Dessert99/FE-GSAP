/** 공식 source item별 검증·로컬 근거·대응 상태를 학습 본문 뒤 부록으로 공개한다. */
import { gsapToPageMeta, gsapToReviewStatus, officialCoverageItems, officialPageSections } from '../../gsap-to.meta'
import './PageCoverageSection.css'

export function PageCoverageSection() {
  const coveredItems = officialCoverageItems.filter(({ localStatus }) => localStatus === 'covered')
  const plannedItems = officialCoverageItems.filter(({ localStatus }) => localStatus === 'planned')
  const allEvidenceMapped = officialCoverageItems.every(({ sourceStatus, localStatus, localEvidence }) => sourceStatus === 'verified' && localStatus === 'covered' && localEvidence.length > 0)

  return (
    <section id="official-coverage" className="page-coverage" aria-labelledby="official-coverage-title">
      <header className="page-coverage__header">
        <p className="page-coverage__eyebrow">Official coverage appendix</p>
        <h2 id="official-coverage-title">공식 문서 대응 근거</h2>
        <p>여기서는 구현 근거가 연결됐는지만 보여 줍니다. 브라우저에서 사람이 직접 조작해야 확인되는 항목은 소유자 일괄 검수로 미뤄 둔 상태입니다.</p>
      </header>

      <dl className="page-coverage__source">
        <div><dt>sourcePageId</dt><dd><code>{gsapToPageMeta.sourcePageId}</code></dd></div>
        <div><dt>source revision</dt><dd>{gsapToPageMeta.sourceRevision}</dd></div>
        <div><dt>공식 문서 대조일</dt><dd>{gsapToPageMeta.reviewedAt}</dd></div>
        <div><dt>구현 근거 연결</dt><dd data-status={allEvidenceMapped ? 'covered' : 'planned'}>{coveredItems.length}/{officialCoverageItems.length} mapped</dd></div>
        <div><dt>자기 검증</dt><dd data-status="covered">{gsapToReviewStatus.selfVerification}</dd></div>
        <div><dt>브라우저 검증</dt><dd data-status="pending">{gsapToReviewStatus.browserVerification}</dd></div>
      </dl>

      <p className="page-coverage__release-note" data-status="deferred"><strong>Release {gsapToReviewStatus.releaseDecision}</strong><span>{gsapToReviewStatus.releaseReason}</span></p>

      <nav className="page-coverage__outline" aria-label="공식 목차와 로컬 학습 섹션">
        <h3>공식 목차에서 찾기</h3>
        <ol>
          {officialPageSections.map((section, index) => (
            <li key={`${section.title}-${section.anchor}`}>
              <a href={`#${section.anchor}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{section.title}</strong><small>{section.localTitle}</small></a>
            </li>
          ))}
        </ol>
      </nav>

      <details className="page-coverage__items" open={!allEvidenceMapped}>
        <summary>55개 item 구현 근거 보기 <span>{coveredItems.length} mapped · {plannedItems.length} unmapped · release {gsapToReviewStatus.releaseDecision}</span></summary>
        <ol>
          {officialCoverageItems.map((item) => (
            <li key={item.sourceItemId}>
              <div className="page-coverage__item-title">
                <strong>{item.officialItem}</strong>
                <i data-status={item.localStatus}>{item.localStatus === 'covered' ? '근거 연결' : '연결 대기'}</i>
              </div>
              <code>{item.sourceItemId}</code>
              <p>공식 위치 · {item.sourceLocation}</p>
              <p>로컬 근거 · {item.localEvidence.join(' · ')}</p>
            </li>
          ))}
        </ol>
      </details>
    </section>
  )
}
