/** plugin 파일을 준비하는 일과 core에 연결하는 일을 분리해 설명한다. */
import { toHref } from "../../../../../../app/routes";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

/** load와 register의 순서·역할을 정적 흐름으로 보여 준다. */
export function LoadRegisterSection() {
  return (
    <section
      id="load-register"
      className="plugins-page__section"
      aria-labelledby="load-register-title"
    >
      <SectionHeading
        number="02"
        id="load-register"
        title="load와 register는 다른 단계다"
        description="load는 plugin 파일을 가져오는 일이고, register는 가져온 capability를 GSAP core에 연결하는 일입니다."
      />
      <ol className="plugins-page__flow">
        <li>
          <strong>1. load</strong>
          <span>
            공식 overview처럼 script tag, npm, yarn, tgz 중 현재 환경의 entry를
            고릅니다.
          </span>
        </li>
        <li>
          <strong>2. import</strong>
          <span>
            module 환경에서는 core와 필요한 plugin을 같은 실행 경계에
            준비합니다.
          </span>
        </li>
        <li>
          <strong>3. register</strong>
          <span>
            plugin 파일을 load한 뒤 <code>gsap.registerPlugin(...)</code>으로
            core에 한 번 연결합니다.
          </span>
        </li>
        <li>
          <strong>4. use vars</strong>
          <span>
            그 뒤 Tween의 해당 vars key가 plugin capability로 전달됩니다.
          </span>
        </li>
      </ol>
      <pre className="plugins-page__code">
        <code>{`import gsap from 'gsap'\nimport { TextPlugin } from 'gsap/TextPlugin'\n\ngsap.registerPlugin(TextPlugin)`}</code>
      </pre>
      <p className="plugins-page__note">
        script tag·npm·SSR entry의 구체적인 설치 방식은{" "}
        <a href={toHref("/fundamentals/installation")}>설치와 등록 페이지</a>가
        소유합니다. 여기서는 load가 register보다 먼저여야 한다는 순서만
        고정합니다.
      </p>
    </section>
  );
}
