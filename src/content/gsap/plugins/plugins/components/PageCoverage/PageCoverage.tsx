/** 공식 overview와 로컬 다섯 단계의 대응 상태를 먼저 표시한다. */
import { pluginSourceItems } from "../../plugins.catalog";
import { pluginsCoverage, pluginsSections } from "../../plugins.meta";

/** coverage card에 실제 catalog 수를 표시해 선언 값과 대조한다. */
const officialItemCount = pluginSourceItems.filter(
  (item) => item.origin === "official",
).length;

/** Plugins overview의 source coverage와 섹션 목차를 표시한다. */
export function PageCoverage() {
  return (
    <nav className="plugins-coverage" aria-label="공식 source 대응 범위">
      <div className="plugins-coverage__summary">
        <div>
          <strong>1/{pluginsCoverage.officialSources}</strong>
          <span>공식 source</span>
        </div>
        <div>
          <strong>
            {officialItemCount}/{pluginsCoverage.officialSourceItems}
          </strong>
          <span>공식 기술 item</span>
        </div>
        <p>
          공식 overview의 26개 기술 item을 load → register → vars → 선택 → 경계
          순서로 다시 묶었습니다.
        </p>
      </div>
      <ol>
        {pluginsSections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <span>{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <small>{section.sourceItems}개 source item</small>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
