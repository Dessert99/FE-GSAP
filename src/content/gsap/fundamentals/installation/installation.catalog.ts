/** 공식 두 문서에서 확인한 기술 item 34개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'Installation' | 'registerPlugin'
  sectionId: string
}

/** 설치·등록 관련 공식 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const installationSourceItems: SourceItem[] = [
  { id: 'INST-01', officialItem: 'GSAP은 특정 framework 전용이 아닌 JavaScript 파일이다.', source: 'Installation', sectionId: 'entry-choice' },
  { id: 'INST-02', officialItem: 'package manager로는 `npm install gsap`으로 설치한다.', source: 'Installation', sectionId: 'entry-choice' },
  { id: 'INST-14', officialItem: 'Install Helper는 npm·Yarn·CDN 같은 가져오기 경로를 선택하게 한다.', source: 'Installation', sectionId: 'entry-choice' },
  { id: 'INST-15', officialItem: 'Install Helper의 plugin 목록에 Draggable부터 Text까지 19개가 있다.', source: 'Installation', sectionId: 'entry-choice' },
  { id: 'INST-16', officialItem: 'Install Helper의 ease 목록은 RoughEase, ExpoScaleEase, SlowMo, CustomEase, CustomBounce, CustomWiggle이다.', source: 'Installation', sectionId: 'entry-choice' },
  { id: 'INST-17', officialItem: 'Install Helper는 React용 useGSAP을 별도 항목으로 제공한다.', source: 'Installation', sectionId: 'entry-choice' },

  { id: 'INST-03', officialItem: '배포 zip은 minified, UMD, ESM, src 네 디렉터리로 구성된다.', source: 'Installation', sectionId: 'file-formats' },
  { id: 'INST-04', officialItem: '/minified/는 script tag로 넣는 범용 호환·고압축 파일이다.', source: 'Installation', sectionId: 'file-formats' },
  { id: 'INST-05', officialItem: '/UMD/는 minified와 같은 내용의 비압축 UMD 파일로 호환성이 높고, 주로 구형 build tool이나 원본을 읽어야 하는 디버깅에 쓴다.', source: 'Installation', sectionId: 'file-formats' },
  { id: 'INST-23', officialItem: 'build tool이 ES module을 이해하지 못하면 UMD 형식을 대신 쓸 수 있다.', source: 'Installation', sectionId: 'file-formats' },
  { id: 'INST-25', officialItem: 'Install Helper는 npm·cdn·yarn과 별개로 umd·esm 모듈 형식 선택을 제공하며, UMD를 쓰려면 NPM 다음 UMD를 눌러 생성된 코드를 복사한다.', source: 'Installation', sectionId: 'file-formats' },
  { id: 'INST-06', officialItem: '/ESM/은 최신 build tool에 맞게 transpile된 ES Module 파일이다.', source: 'Installation', sectionId: 'file-formats' },
  { id: 'INST-07', officialItem: '/src/는 최신 ES6 module 형태의 원본 source다.', source: 'Installation', sectionId: 'file-formats' },

  { id: 'INST-10', officialItem: 'core와 plugin을 한 파일에서 다시 export해 한 곳에서 가져오게 만들 수 있다.', source: 'Installation', sectionId: 'import-forms' },
  { id: 'INST-11', officialItem: '재export 파일을 만들면 `import { gsap, DrawSVGPlugin } from "../gsap.js"`처럼 함께 가져온다.', source: 'Installation', sectionId: 'import-forms' },
  { id: 'INST-12', officialItem: 'UMD 파일은 `import { gsap } from "gsap/dist/gsap"`으로 가져온다.', source: 'Installation', sectionId: 'import-forms' },
  { id: 'INST-13', officialItem: 'TypeScript는 tsconfig files에 `node_modules/gsap/types/index.d.ts`를 넣어 타입을 인식한다.', source: 'Installation', sectionId: 'import-forms' },
  { id: 'INST-22', officialItem: 'TypeScript 오류가 나면 공식 GitHub 저장소의 공식 타입 정의를 쓰고 있는지 먼저 확인한다.', source: 'Installation', sectionId: 'import-forms' },

  { id: 'INST-09', officialItem: '등록은 `gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)` 형태로 호출한다.', source: 'Installation', sectionId: 'register-plugin' },
  { id: 'REG-01', officialItem: 'registerPlugin()은 여러 plugin을 인자로 나열해 한 번에 등록한다.', source: 'registerPlugin', sectionId: 'register-plugin' },
  { id: 'REG-03', officialItem: 'plugin은 사용하기 전에 등록한다.', source: 'registerPlugin', sectionId: 'register-plugin' },
  { id: 'REG-05', officialItem: 'CDN minified 같은 non-ES module 파일은 로드될 때 스스로 등록을 시도하며, core 뒤에 로드되면 브라우저에서 정상 동작한다.', source: 'registerPlugin', sectionId: 'register-plugin' },
  { id: 'REG-06', officialItem: 'registerPlugin()은 plugin 파일을 load하거나 import하는 일을 대신하지 않는다.', source: 'registerPlugin', sectionId: 'register-plugin' },
  { id: 'REG-09', officialItem: 'plugin은 core에 특수 기능을 더해 core 자체를 작게 유지한다.', source: 'registerPlugin', sectionId: 'register-plugin' },

  { id: 'INST-08', officialItem: 'production build에서 plugin이 제거되지 않도록 명시적으로 등록해야 한다.', source: 'Installation', sectionId: 'tree-shaking' },
  { id: 'INST-19', officialItem: '같은 plugin을 여러 번 등록해도 해롭지 않고 이득도 없다.', source: 'Installation', sectionId: 'tree-shaking' },
  { id: 'INST-20', officialItem: '최신 build tool은 등록하지 않은 plugin을 결과물에서 떨어뜨릴 수 있다.', source: 'Installation', sectionId: 'tree-shaking' },
  { id: 'REG-02', officialItem: '등록은 core와 plugin이 함께 동작하도록 보장하고 tree shaking 문제를 막는다.', source: 'registerPlugin', sectionId: 'tree-shaking' },
  { id: 'REG-04', officialItem: '중복 등록은 해가 없지만 추가 이득도 없다.', source: 'registerPlugin', sectionId: 'tree-shaking' },
  { id: 'REG-07', officialItem: 'tree shaking 문제는 브라우저가 아닌 build 환경에서 발생한다.', source: 'registerPlugin', sectionId: 'tree-shaking' },

  { id: 'INST-18', officialItem: 'script tag로 넣으면 대개 자동 등록되지만 build tool에서는 명시적 등록을 권한다.', source: 'Installation', sectionId: 'troubleshooting' },
  { id: 'INST-21', officialItem: '비공개 npm 저장소는 더 이상 유지되지 않으며 모든 plugin이 npm에 공개됐다. `.npmrc`를 정리하고 3.13 이상을 쓴다.', source: 'Installation', sectionId: 'troubleshooting' },
  { id: 'REG-08', officialItem: 'React 사용자는 useGSAP hook을 등록해 버전 충돌을 피한다.', source: 'registerPlugin', sectionId: 'troubleshooting' },
  { id: 'INST-24', officialItem: '이전 버전은 GitHub releases 페이지에서 확인·다운로드할 수 있으나 최신 버전 사용을 권장한다.', source: 'Installation', sectionId: 'troubleshooting' },
]
