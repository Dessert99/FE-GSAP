/** ScrollSmoother 정적 setup을 singleton 경계와 함께 조립한다. */
import { OfficialDocsLink } from '../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { scrollSmootherCreateMeta } from './scroll-smoother-create.meta'
import { SetupSection } from './sections/SetupSection/SetupSection'
import './ScrollSmootherCreatePage.css'

/** document scroll을 바꾸지 않고 ScrollSmoother root lifecycle을 설명한다. */
export function ScrollSmootherCreatePage() {
  return (
    <article className="scroll-smoother-create-page">
      <header>
        <p>{scrollSmootherCreateMeta.category}</p>
        <h1>{scrollSmootherCreateMeta.title}</h1>
        <p>{scrollSmootherCreateMeta.summary}</p>
        {scrollSmootherCreateMeta.officialSources.map((source) => (
          <OfficialDocsLink key={source.href} {...source} />
        ))}
      </header>
      <SetupSection />
      <section aria-labelledby="scroll-smoother-boundary-title">
        <p>02 · lifecycle 경계</p>
        <h2 id="scroll-smoother-boundary-title">
          create, get, kill의 역할을 나눕니다
        </h2>
        <p>
          root에서는 instance 하나를 만들고 cleanup에서 그 instance를
          <code>kill()</code>합니다. child module은 새 instance를 만들지 않고
          <code>ScrollSmoother.get()</code>으로 이미 만든 instance를 읽습니다.
          <code>create()</code>는 기존 instance가 있으면 그것을 kill한 뒤 새
          instance를 만드므로, 무심코 component mount마다 부르면 안 됩니다.
        </p>
        <p>
          native scroll과 layout 구조가 준비되기 전에는 이 setup을 적용하지
          마세요. wrapper와 content 구조를 먼저 확정해야 합니다.
        </p>
      </section>
    </article>
  )
}
