/** 실제 코드에서 core와 plugin을 불러오는 import 형태와 TypeScript 타입 인식 설정을 보여준다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const basicImportCode = `import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'`

const umdImportCode = `import { gsap } from 'gsap/dist/gsap'`

const reexportCode = `// gsap.js — core와 plugin을 한 파일에서 모아 다시 내보냅니다.
export * from 'gsap'
export * from 'gsap/DrawSVGPlugin'

import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(DrawSVGPlugin)`

const reexportUsageCode = `// 다른 파일에서는 이 한 줄로 둘 다 가져옵니다.
import { gsap, DrawSVGPlugin } from '../gsap.js'`

const typescriptCode = `{
  "compilerOptions": {
    ...
  },
  "files": [
    "node_modules/gsap/types/index.d.ts"
  ]
}`

export function ImportFormsSection() {
  return (
    <section id="import-forms" className="installation-page__section" aria-labelledby="import-forms-title">
      <SectionHeading
        number="03"
        id="import-forms"
        title="코드에서 실제로 불러오기"
        description="설치가 끝나면 파일이 디스크에 있을 뿐입니다. 코드가 그것을 쓰려면 import 문으로 이름을 가져와야 합니다."
      />

      <div className="installation-page__split">
        <div className="installation-page__prose">
          <p>
            core는 <code>gsap</code>에서, plugin은 <code>gsap/&lt;PluginName&gt;</code>에서 가져옵니다. plugin마다 경로가 따로 있어서 쓰는
            것만 골라 담을 수 있습니다.
          </p>
          <p>
            <code>import</code>를 이해하지 못하는 환경이라면 <code>gsap/dist/</code> 아래의 UMD 파일을 가리킵니다.
          </p>
        </div>
        <div>
          <pre className="installation-page__code">
            <code>{basicImportCode}</code>
          </pre>
          <pre className="installation-page__code installation-page__code--stacked">
            <code>{umdImportCode}</code>
          </pre>
        </div>
      </div>

      <div className="installation-page__subheading">
        <h3>plugin이 많아지면 한 파일로 모으기</h3>
        <p>
          plugin이 늘어나면 화면마다 import와 등록을 반복하게 됩니다. 공식 문서는 core와 plugin을 한 파일에서 다시 내보내고, 등록도
          거기서 한 번만 하는 방법을 안내합니다.
        </p>
      </div>

      <div className="installation-page__split">
        <pre className="installation-page__code">
          <code>{reexportCode}</code>
        </pre>
        <pre className="installation-page__code">
          <code>{reexportUsageCode}</code>
        </pre>
      </div>

      <div className="installation-page__subheading">
        <h3>TypeScript에서 타입 인식시키기</h3>
        <p>
          먼저 공식 GSAP 타입 정의를 쓰는지 확인합니다. 그래도 compiler에 타입 선언 위치를 직접 알려줘야 한다면, 공식 문서는 아래처럼{' '}
          <code>tsconfig.json</code>의 <code>files</code>에 경로를 넣는 방법을 안내합니다.
        </p>
      </div>

      <pre className="installation-page__code installation-page__code--wide">
        <code>{typescriptCode}</code>
      </pre>

      <div className="installation-page__note">
        <p>
          <strong>위 코드는 <code>...</code>로 일부를 생략한 설정 조각입니다.</strong> <code>files</code>는 compiler가 포함할 파일의 허용
          목록이므로, 기존 <code>files</code>나 <code>include</code> 설정을 지우고 그대로 붙여 넣지 마세요. TypeScript 오류가 난다면 공식
          GitHub 저장소의 타입 정의를 쓰고 있는지도 먼저 확인해야 합니다.
        </p>
      </div>
    </section>
  )
}
