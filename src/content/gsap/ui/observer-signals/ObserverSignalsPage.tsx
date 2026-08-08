/** P26의 official signal inventory와 실제 signal lab을 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../app/routes'
import { ObserverSignalLab } from './examples/ObserverSignalLab/ObserverSignalLab'
import { observerSignalsCatalog } from './observer-signals.catalog'
import { observerSignalsMeta } from './observer-signals.meta'
import './ObserverSignalsPage.css'

/** Observer signal의 시간 기준을 시작·현재·변화량으로 분리해 소개한다. */
export function ObserverSignalsPage() {
  return (
    <article className="observer-signals-page">
      <header>
        <p>{observerSignalsMeta.category}</p>
        <h1>{observerSignalsMeta.title}</h1>
        <p>{observerSignalsMeta.summary}</p>
        <div className="observer-signals-page__links">
          {observerSignalsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <p>{observerSignalsCatalog.length} official signal items covered</p>
      </header>

      <section aria-labelledby="observer-signal-prerequisite">
        <h2 id="observer-signal-prerequisite">
          먼저 하나의 instance를 만듭니다
        </h2>
        <p>
          signal은 새 plugin이 아니라 이미 만들어진 Observer instance에서 읽는
          값입니다. 먼저{' '}
          <a href={toHref('/fundamentals/observer-create')}>
            P25 Observer 만들기와 찾기
          </a>
          에서 target과 watched input을 정한 뒤 이 페이지에서 same instance의
          값을 비교하세요.
        </p>
      </section>

      <section aria-labelledby="observer-signal-timing">
        <h2 id="observer-signal-timing">
          좌표·변화량·속도는 같은 숫자가 아닙니다
        </h2>
        <div className="observer-signals-page__timing-grid">
          <div>
            <h3>press baseline</h3>
            <p>
              <code>startX/startY</code>는 touch 또는 pointer press 순간의
              viewport client coordinate입니다.
            </p>
          </div>
          <div>
            <h3>current coordinate</h3>
            <p>
              <code>x/y</code>는 가장 최근 touch 또는 pointer event의 viewport
              client coordinate입니다.
            </p>
          </div>
          <div>
            <h3>callback delta</h3>
            <p>
              <code>deltaX/deltaY</code>는 마지막 callback 이후의 pixel
              변화입니다. 시작 좌표가 아닙니다.
            </p>
          </div>
          <div>
            <h3>velocity</h3>
            <p>
              <code>velocityX/velocityY</code>는 watched input에서 읽는 signed
              pixels per second입니다.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="observer-signal-source">
        <h2 id="observer-signal-source">
          event와 device capability도 따로 읽습니다
        </h2>
        <p>
          <code>event</code>는 가장 최근 watched input event입니다. 반면{' '}
          <code>Observer.isTouch</code>는 event마다 바뀌는 signal이 아니라
          0·1·2로 읽는 static capability classification입니다. wheel은 delta와
          velocity를 만들 수 있지만, <code>x/y</code>의 touch·pointer client
          coordinate를 대신하지 않습니다.
        </p>
        <ul>
          {observerSignalsCatalog.map((item) => (
            <li key={item.id}>
              <code>{item.id}</code> — {item.officialItem}
            </li>
          ))}
        </ul>
      </section>

      <ObserverSignalLab />

      <section aria-labelledby="observer-signal-boundary">
        <h2 id="observer-signal-boundary">이 페이지가 소유하지 않는 경계</h2>
        <p>
          press가 dragging으로 전환되는 state는 P27, enable·disable·kill
          lifecycle은 P28이 소유합니다. 이 페이지에서는 한 owned Observer의
          signal을 읽고 unmount에서 그 instance를 kill하는 cleanup 전제만
          사용합니다.
        </p>
      </section>
    </article>
  )
}
