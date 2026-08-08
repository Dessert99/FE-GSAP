/** Plugins overview를 다섯 개의 짧은 학습 단계로 조립한다. */
import { OfficialDocsLink } from "../../../../components/demo/OfficialDocsLink/OfficialDocsLink";
import { PageCoverage } from "./components/PageCoverage/PageCoverage";
import { BoundariesSection } from "./sections/BoundariesSection/BoundariesSection";
import { LoadRegisterSection } from "./sections/LoadRegisterSection/LoadRegisterSection";
import { PluginFamiliesSection } from "./sections/PluginFamiliesSection/PluginFamiliesSection";
import { PluginMentalModelSection } from "./sections/PluginMentalModelSection/PluginMentalModelSection";
import { VarsExtensionSection } from "./sections/VarsExtensionSection/VarsExtensionSection";
import { pluginsMeta } from "./plugins.meta";
import "./PluginsPage.css";

/** plugin의 load·등록·소유권을 설명하는 페이지 shell이다. */
export function PluginsPage() {
  return (
    <article className="plugins-page">
      <header className="plugins-page__header">
        <p className="plugins-page__eyebrow">{pluginsMeta.category}</p>
        <h1>{pluginsMeta.title}</h1>
        <p className="plugins-page__summary">{pluginsMeta.summary}</p>
        <div className="plugins-page__official-links">
          {pluginsMeta.officialSources.map((source) => (
            <OfficialDocsLink key={source.href} {...source} />
          ))}
        </div>
        <div className="plugins-page__path">
          <span>이 페이지의 코드 위치</span>
          <code>{pluginsMeta.sourcePath}</code>
        </div>
        <p className="plugins-page__reviewed">
          공식 문서 대조일 · {pluginsMeta.reviewedAt}
        </p>
      </header>
      <PageCoverage />
      <PluginMentalModelSection />
      <LoadRegisterSection />
      <VarsExtensionSection />
      <PluginFamiliesSection />
      <BoundariesSection />
    </article>
  );
}
