/** 한 갈래에 속한 utility들을 두 공식 문서의 설명·예제·소유 레슨과 함께 같은 표로 보여준다. */
import { toHref } from '../../../../../../app/routes'
import type { UtilityFamily } from '../../gsap-utils.utilities'
import { utilityEntries } from '../../gsap-utils.utilities'

type Props = {
  family: UtilityFamily
  caption: string
}

export function UtilityFamilyTable({ family, caption }: Props) {
  // 17개 전체 목록에서 이 갈래에 속한 행만 골라 쓴다 — 개수를 따로 적지 않고 목록에서 센다
  const entries = utilityEntries.filter((entry) => entry.family === family)

  return (
    <div className="utils-page__table-wrap">
      <table className="utils-page__basic-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">gsap.utils 문서가 말하는 것</th>
            <th scope="col">Utility Methods 문서가 말하는 것</th>
            <th scope="col">전체 계약을 배우는 곳</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.name}>
              <th scope="row">
                <a href={entry.href} target="_blank" rel="noopener noreferrer">
                  <code>{entry.name}</code>
                </a>
              </th>
              <td>
                {entry.gsapUtilsSummary}
                {entry.officialExample ? (
                  <small>
                    공식 예제 · <code>{entry.officialExample}</code>
                  </small>
                ) : (
                  <small>공식 표에 예제 없음</small>
                )}
              </td>
              <td>{entry.utilityMethodsSummary}</td>
              <td>{entry.ownerRoute ? <a href={toHref(entry.ownerRoute)}>{entry.owner}</a> : entry.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
