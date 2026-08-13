# Installation handoff

## 입력 계약

### objective

`Installation`과 `gsap.registerPlugin()` 두 공식 source를 `가져오기 → 등록하기`라는 하나의 setup 순서로 재구성한다. 환경별 진입점과 등록 경계를 공식 근거 밖으로 확장하지 않는다.

### officialPage

- title: `Installation` + `gsap.registerPlugin()`
- canonicalUrl:
  - `https://gsap.com/docs/v3/Installation`
  - `https://gsap.com/docs/v3/GSAP/gsap.registerPlugin()`
- reviewedAt: `2026-08-13`
- category: `Quick Start > Installation`, `Fundamentals > GSAP`
- slug: `installation`
- sourcePageIds: primary `source:installation`; related `source:gsap-register-plugin`

### localPage

- localPath: `src/content/gsap/fundamentals/installation/`
- route: `/fundamentals/installation`

### sourceManifest

| id | officialItem | sourceLocation | sourceStatus |
| --- | --- | --- | --- |
| INST-01 | GSAP은 특정 framework 전용이 아닌 JavaScript 파일이다. | `source:installation` 본문 | verified |
| INST-02 | package manager로는 `npm install gsap`으로 설치한다. | `source:installation` 본문 | verified |
| INST-03 | 배포 zip은 minified, UMD, ESM, src 네 디렉터리로 구성된다. | `source:installation` Grab the files | verified |
| INST-04 | `/minified/`는 script tag용 범용 호환·고압축 파일이다. | `source:installation` Grab the files | verified |
| INST-05 | `/UMD/`는 minified와 같은 내용의 비압축 UMD 파일이며, 주로 구형 build tool이나 사람이 읽어야 하는 디버깅에 쓴다. | `source:installation` Grab the files | verified |
| INST-06 | `/ESM/`은 최신 build tool용으로 transpile된 ES Module이다. | `source:installation` Grab the files | verified |
| INST-07 | `/src/`는 최신 ES6 module 형태의 원본 source다. | `source:installation` Grab the files | verified |
| INST-08 | production build에서 plugin이 제거되지 않도록 명시 등록이 필요하다. | `source:installation` 본문 | verified |
| INST-09 | 등록은 `gsap.registerPlugin(MotionPathPlugin, ScrollToPlugin, TextPlugin)` 형태다. | `source:installation` 예제 | verified |
| INST-10 | core와 plugin을 한 파일에서 다시 export할 수 있다. | `source:installation` 예제 | verified |
| INST-11 | 재export 파일은 `import { gsap, DrawSVGPlugin } from "../gsap.js"`로 쓴다. | `source:installation` 예제 | verified |
| INST-12 | UMD 파일은 `import { gsap } from "gsap/dist/gsap"`으로 가져온다. | `source:installation` 예제, `node_modules/gsap/package.json` exports | verified |
| INST-13 | TypeScript compiler에 타입 선언 위치를 알려줘야 한다면 tsconfig `files`에 `node_modules/gsap/types/index.d.ts`를 넣을 수 있다. | `source:installation` FAQ, 설치된 `gsap/types/index.d.ts` | verified |
| INST-14 | Install Helper는 npm·Yarn·CDN 같은 가져오기 경로를 선택하게 한다. | `source:installation` Install Helper | verified |
| INST-15 | Install Helper의 plugin 목록에 Draggable부터 Text까지 19개가 있다. | `source:installation` Install Helper | verified |
| INST-16 | Install Helper의 ease 목록은 RoughEase, ExpoScaleEase, SlowMo, CustomEase, CustomBounce, CustomWiggle이다. | `source:installation` Install Helper | verified |
| INST-17 | Install Helper는 React용 useGSAP을 별도 항목으로 제공한다. | `source:installation` Install Helper | verified |
| INST-18 | script tag는 대개 자동 등록되지만 build tool에서는 명시 등록을 권한다. | `source:installation` FAQ | verified |
| INST-19 | 같은 plugin을 여러 번 등록해도 해롭지 않고 이득도 없다. | `source:installation` FAQ | verified |
| INST-20 | 최신 build tool은 등록하지 않은 plugin을 결과물에서 떨어뜨릴 수 있다. | `source:installation` FAQ | verified |
| INST-21 | 비공개 npm 저장소는 유지되지 않으며 `.npmrc`를 정리하고 3.13 이상을 쓴다. 상세 이전 절차는 공식 migration guide가 설명한다. | `source:installation` Legacy Note | verified |
| REG-01 | `registerPlugin()`은 여러 plugin을 인자로 나열해 한 번에 등록한다. | `source:gsap-register-plugin` 예제 | verified |
| REG-02 | 등록은 core와 plugin이 함께 동작하게 하고 tree shaking을 막는다. | `source:gsap-register-plugin` 본문 | verified |
| REG-03 | plugin은 사용하기 전에 등록한다. | `source:gsap-register-plugin` 본문 | verified |
| REG-04 | 중복 등록은 해가 없지만 추가 이득도 없다. | `source:gsap-register-plugin` 본문 | verified |
| REG-05 | non-ES module 파일은 로드 시 자동 등록을 시도하며 core 뒤에 로드되면 동작한다. | `source:gsap-register-plugin` 본문 | verified |
| REG-06 | `registerPlugin()`은 plugin을 load·import하는 일을 대체하지 않는다. | `source:gsap-register-plugin` caveat | verified |
| REG-07 | tree shaking 문제는 브라우저가 아닌 build 환경에서 발생한다. | `source:gsap-register-plugin` 본문 | verified |
| REG-08 | React 사용자는 useGSAP hook을 등록해 버전 충돌을 피한다. | `source:gsap-register-plugin` React note | verified |
| REG-09 | plugin은 core에 특수 기능을 더해 core를 작게 유지한다. | `source:gsap-register-plugin` What's a plugin? | verified |
| INST-22 | TypeScript 오류가 나면 공식 GitHub 저장소의 공식 타입 정의를 쓰고 있는지 먼저 확인한다. | `source:installation` FAQ | verified |
| INST-23 | build tool이 ES module을 이해하지 못하면 UMD 형식을 대신 쓸 수 있다. | `source:installation` FAQ | verified |
| INST-24 | 이전 버전은 GitHub releases 페이지에서 확인·다운로드할 수 있으나 최신 버전 사용을 권장한다. | `source:installation` FAQ | verified |
| INST-25 | Install Helper는 npm·cdn·yarn과 별개로 umd·esm 모듈 형식 선택을 제공하며, UMD는 NPM 다음 UMD를 눌러 생성된 코드를 복사한다. | `source:installation` Install Helper·FAQ | verified |

34개 항목 모두 `verified`다. 공식 문서 본문과 GSAP 3.15.0 설치본(`node_modules/gsap/package.json` exports map, `dist/`, `types/`)을 함께 대조했다. `INST-22`~`INST-24`와 `INST-05`의 용도 문장은 Codex Official Coverage 검수가 누락을 지적한 뒤 공식 FAQ 원문을 다시 인용해 추가했다.

### sourceBlockers

`none` — 단, Install Helper가 조합마다 **생성하는 정확한 코드 문자열**은 동적 위젯 출력이라 정적 대조가 불가능하다. 이는 공식 본문이 게시한 기술 주장이 아니므로 coverage item으로 만들지 않고, 재현하지 않는다는 경계를 페이지에 명시한 뒤 공식 페이지로 연결했다. helper가 제공하는 **선택지 자체**(`INST-14`~`INST-17`, `INST-25`)는 공식 본문·FAQ로 확인되므로 coverage에 포함한다.

공식 문서에 정확한 CDN host·버전 URL이 노출되지 않아 script tag 예제는 순서만 보여주고 주소를 지어내지 않는다.

### moduleSelection

- installation·integration + callable method + plugin

### learnerFlow

1. `#entry-choice`: framework 무관성과 npm·script tag·download 선택, Install Helper가 고르게 해주는 목록
2. `#file-formats`: minified/UMD/ESM/src 네 형식과 ES Module·UMD 용어 정의
3. `#import-forms`: core·plugin import 경로, UMD dist, 재export 파일, TypeScript 타입 설정
4. `#register-plugin`: plugin 정의, 호출 형태, 가져오기→등록→사용 순서, import 대체 불가 경계, script tag 자동 등록
5. `#tree-shaking`: tree shaking 정의, 등록 유무 비교, build 환경 한정, 중복 등록
6. `#troubleshooting`: 증상별 FAQ, legacy npm, 페이지 경계와 이전·다음 학습

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| INST-01 | `EntryChoiceSection.tsx` 도입 문단 | covered |
| INST-02 | `EntryChoiceSection.tsx` `npmCode` | covered |
| INST-03 | `FileFormatsSection.tsx` `formats` 4개 | covered |
| INST-04 | `FileFormatsSection.tsx` `/minified/` 행 | covered |
| INST-05 | `FileFormatsSection.tsx` `/UMD/` 행 | covered |
| INST-06 | `FileFormatsSection.tsx` `/ESM/` 행 | covered |
| INST-07 | `FileFormatsSection.tsx` `/src/` 행 | covered |
| INST-08 | `TreeShakingSection.tsx` 도입 문단·비교 코드 | covered |
| INST-09 | `RegisterPluginSection.tsx` `registerCode` | covered |
| INST-10 | `ImportFormsSection.tsx` `reexportCode` | covered |
| INST-11 | `ImportFormsSection.tsx` `reexportUsageCode` | covered |
| INST-12 | `ImportFormsSection.tsx` `umdImportCode` | covered |
| INST-13 | `ImportFormsSection.tsx` `typescriptCode` | covered |
| INST-14 | `EntryChoiceSection.tsx` npm·Yarn·CDN script tag·직접 내려받기 명시와 helper note | covered |
| INST-15 | `EntryChoiceSection.tsx` `helperPlugins` 19개 | covered |
| INST-16 | `EntryChoiceSection.tsx` `helperEases` 6개 | covered |
| INST-17 | `EntryChoiceSection.tsx` useGSAP 항목 | covered |
| INST-18 | `TroubleshootingSection.tsx` 첫 증상 행 | covered |
| INST-19 | `TreeShakingSection.tsx` 중복 등록 note | covered |
| INST-20 | `TreeShakingSection.tsx` `droppedCode` 설명 | covered |
| INST-21 | `TroubleshootingSection.tsx` npm 인증 오류 행·공식 migration guide note | covered |
| REG-01 | `RegisterPluginSection.tsx` `registerCode`·인자 설명 | covered |
| REG-02 | `TreeShakingSection.tsx` `keptCode` 설명(tree shaking)과 `RegisterPluginSection.tsx` 도입부·`orderCode` 2단계 주석(core가 plugin을 알게 함) | covered |
| REG-03 | `RegisterPluginSection.tsx` `orderCode` 3단계 | covered |
| REG-04 | `TreeShakingSection.tsx` 중복 등록 note | covered |
| REG-05 | `RegisterPluginSection.tsx` `scriptTagCode`·자동 등록 소제목 | covered |
| REG-06 | `RegisterPluginSection.tsx` warning 블록 | covered |
| REG-07 | `TreeShakingSection.tsx` build 환경 한정 문단 | covered |
| REG-08 | `TroubleshootingSection.tsx` React 충돌 행 | covered |
| REG-09 | `RegisterPluginSection.tsx` plugin 정의 lead | covered |
| INST-22 | `ImportFormsSection.tsx` 공식 타입 정의 확인 note | covered |
| INST-23 | `FileFormatsSection.tsx` ES module 미지원 시 UMD warning | covered |
| INST-24 | `TroubleshootingSection.tsx` 예전 버전 증상 행 | covered |
| INST-25 | `FileFormatsSection.tsx` 경로·모듈 형식 별도 선택 warning | covered |

### relatedPages

- `/fundamentals/gsap-core-map`: 설치 전에 core·Tween·Timeline·plugin의 위치를 먼저 익힌다
- `/fundamentals/gsap-to`: 설치·등록을 마친 뒤 만드는 첫 Tween

## 구현 계약

### exactFiles

create:

- `src/content/gsap/fundamentals/installation/InstallationPage.tsx`
- `src/content/gsap/fundamentals/installation/InstallationPage.css`
- `src/content/gsap/fundamentals/installation/installation.meta.ts`
- `src/content/gsap/fundamentals/installation/installation.catalog.ts`
- `src/content/gsap/fundamentals/installation/components/SectionHeading/SectionHeading.tsx`
- `src/content/gsap/fundamentals/installation/components/PageCoverage/PageCoverage.tsx`
- `src/content/gsap/fundamentals/installation/sections/EntryChoiceSection/EntryChoiceSection.tsx`
- `src/content/gsap/fundamentals/installation/sections/FileFormatsSection/FileFormatsSection.tsx`
- `src/content/gsap/fundamentals/installation/sections/ImportFormsSection/ImportFormsSection.tsx`
- `src/content/gsap/fundamentals/installation/sections/RegisterPluginSection/RegisterPluginSection.tsx`
- `src/content/gsap/fundamentals/installation/sections/TreeShakingSection/TreeShakingSection.tsx`
- `src/content/gsap/fundamentals/installation/sections/TroubleshootingSection/TroubleshootingSection.tsx`

modify:

- `src/app/routes.ts` — lazy route와 `시작하기` lesson 등록
- `src/content/gsap/fundamentals/gsap-core-map/sections/NextStepsSection/NextStepsSection.tsx` — Installation이 실제로 생겨 roadmap의 `다음 handoff 후보` 표시가 사실과 달라졌으므로 갱신

### exampleContracts

- `none` — 설치·등록은 화면에서 조작할 실행 상태가 없다. GSAP 호출을 장식으로 만들지 않기 위해 예제 컴포넌트와 runtime 파일을 만들지 않는다.
- controls: `none` — 조작할 runtime state가 없다.
- runtimeSource: `none` — 실행 코드가 없다.
- sourcePath: 각 섹션 TSX가 정적 코드 문자열을 직접 소유한다.
- motion: `none` — animation이 없어 `prefers-reduced-motion` 분기가 필요 없다.
- accessibility: 모든 섹션이 `aria-labelledby`로 heading과 연결되고, 외부 링크는 새 탭 열림을 시각 숨김 텍스트로 알린다.

### nonGoals

- Install Helper 조합별 생성 코드 재현, CDN host·버전 URL 확정, plugin별 사용법, React lifecycle·cleanup·SSR, 번들러 설정 튜닝, 실행 예제·animation Hook 추가

### preserve

- inventory identity와 owner, 기존 route 순서, 공유 API, 다른 페이지의 CSS 클래스 이름

## 검수 계약

### reviewAssignments

- 구현: Claude (이 컨텍스트)
- Official Coverage / Learning Transformation / Structure·Comment / 정적 Accessibility·Motion: `codex exec -s read-only` 관점별 개별 실행
- Independent Release: 위와 별개인 `codex exec -s read-only` 실행

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| IMPL-CORE02-001 | PASS | `InstallationPage.tsx`, 6개 section, catalog 34개 item | 설치 순서 6단계 구현 | 독립 검수 요청 |
| BUILD-CORE02-001 | PASS | `npm run build` exit 0, 2026-08-04, `InstallationPage` JS/CSS chunk 생성 | TypeScript·Vite build 통과 | none |
| CDX-OC-001 | BLOCK → ADDRESSED → PASS | Install Helper의 npm·Yarn·CDN이 로컬 본문에 없어 `INST-14`가 부분 coverage / Official Coverage 2차 재검수 RESOLVED — `EntryChoiceSection.tsx:29` npm·Yarn·CDN 명시 확인 | coverage 근거 부정확 | none |
| CDX-OC-002 | BLOCK → ADDRESSED → PASS | `REG-02` 근거가 tree shaking만 담고 core 인식 주장을 담지 않음 / Official Coverage 2차 재검수 RESOLVED — `RegisterPluginSection.tsx:10` core 인식 설명과 tree shaking 근거 공존 확인 | coverage 근거 부정확 | none |
| CDX-OC-003 | BLOCK → ADDRESSED → PASS | Install Helper의 UMD·ESM 선택축이 manifest에 없음 / 1차 재검수에서 미수용으로 보존했으나 Independent Release 검수가 공식 FAQ 원문("click 'NPM' and then 'UMD' in the install helper")과 helper의 `umd`·`esm` control을 제시해 반박했고, 공식 페이지를 다시 인용 대조해 사실을 확인했다 | 확인 가능한 기술 선택축을 누락할 뻔했다 | `INST-25` 신설, `FileFormatsSection.tsx` warning에 경로·모듈 형식 별도 선택과 NPM→UMD 절차 반영 |
| CDX-OC-004 | BLOCK → ADDRESSED → PASS | 구버전 GitHub releases FAQ가 manifest·구현 모두에 없음 / Official Coverage 2차 재검수 RESOLVED — `TroubleshootingSection.tsx:23` GitHub releases 행 확인 | 기술 item 누락 | none |
| CDX-OC-005 | BLOCK → ADDRESSED → PASS | TypeScript FAQ의 공식 타입 정의 확인 지침 누락 / Official Coverage 2차 재검수 RESOLVED — `ImportFormsSection.tsx:89` 공식 타입 정의 note 확인 | 기술 item 누락 | none |
| CDX-OC-006 | BLOCK → ADDRESSED → PASS | `/UMD/`의 구형 build tool 용도가 manifest·구현에 없고 로컬 설명은 근거 없는 디버깅 단정 / Official Coverage 2차 재검수 RESOLVED — `FileFormatsSection.tsx:12` 구형 build tool·디버깅 용도 확인 | 공식 근거 없는 서술 | none |
| CDX-OC-007 | BLOCK → ADDRESSED → PASS | "세 방법 모두 결과는 같다"는 공식 근거 없는 부정확한 단정 / Official Coverage 2차 재검수 RESOLVED — `EntryChoiceSection.tsx:36` 단정 제거와 대체 설명 확인 | 학습자에게 잘못된 사실 전달 | none |
| CDX-LT-001 | BLOCK → ADDRESSED → PASS | `plugin`이 제목·도입부터 쓰이는데 정의는 4번째 섹션에 처음 나옴 / Learning Transformation 3차 재검수 RESOLVED — `installation.meta.ts:3,6`·`InstallationPage.tsx:18-19`에서 제목 변경 후 최초 사용 전 정의 확인 | 초보자가 앞 섹션을 추측으로 읽음 | none |
| CDX-LT-002 | BLOCK → ADDRESSED → PASS | `package manager`가 무엇을 하는 도구인지 정의 없이 쓰임 / Learning Transformation 2차 재검수 RESOLVED — `EntryChoiceSection.tsx:27` package manager 정의와 설치 명령 연결 확인 | 명령을 이해 없이 복사하게 됨 | none |
| CDX-SC-001 | BLOCK → ADDRESSED → PASS | catalog 상단 주석이 30개라 적혀 실제 33개와 어긋나고 `SourceItem` export에 주석 없음 / Structure/Comment 2차 재검수 RESOLVED — `installation.catalog.ts:1,3-4` 33개 표기와 `SourceItem` 주석 확인 | 유지보수자가 coverage 기준을 잘못 이해 | none |
| CDX-SC-002 | BLOCK → ADDRESSED → PASS | `InstallationPage.css`가 파일 맨 위 한 줄 주석 없이 선택자로 시작 / Structure/Comment 2차 재검수 RESOLVED — `InstallationPage.css:1` 맨 위 한 줄 주석 확인 | AGENTS.md 6번 규칙 위반 | none |
| CDX-STR-001 / CDX-RT-001 / CDX-A11Y-001~003 / CDX-MOTION-001 | PASS | 조립 전용 페이지·폴더 규칙, `runtimeSource: none` 일치, heading 계층과 aria-labelledby, 새 탭 예고, focus-visible, 코드 블록 자체 스크롤, animation 없음 | 구조·정적 접근성·motion 통과 | none |
| CDX-BROWSER-001 | DEFERRED → PASS | 실제 키보드 포커스 표시와 320/390px 최종 overflow는 브라우저 없이 확정 불가 | 실조작 증거 없음 | 저장소 소유자의 일괄 브라우저 검수 |
| BROWSER-CORE02-001 | DEFERRED → PASS | 브라우저 실조작 미실행 | keyboard·작은 화면 실제 확인 없음 | 저장소 소유자의 일괄 검수 |

### verificationEvidence

- Source verification — 공식 두 페이지 본문과 GSAP 3.15.0 설치본(`package.json` exports, `dist/`, `types/index.d.ts`)을 대조했다.
- Coverage verification — `installation.catalog.ts`의 item 34개, `installation.meta.ts`의 섹션 item 합계 34개, handoff manifest·coverageMap 각 34개가 모두 일치한다.
- Build — `npm run build` exit 0, `InstallationPage` chunk 생성.
- Route — `/fundamentals/installation` lazy import와 `시작하기` lesson 등록.
- Tests — 프로젝트 정책에 따라 자동화 테스트를 추가하지 않았다.
- Storybook — `npm run build-storybook` exit 0, build completed successfully.
- Codex 독립 검수 — Official Coverage, Learning Transformation, Structure/Comment + 정적 Accessibility/Motion, Independent Release를 각각 별도 `codex exec -s read-only` 실행으로 받았다. Coverage 7건·Learning 2건·Structure 2건의 `BLOCK` 11건을 모두 수정 후 재검수로 해소했다. `CDX-OC-003`은 1차에 미수용으로 보존했다가 Release 검수의 반박 근거를 공식 원문으로 재확인해 수용·수정했다.

### releaseDecision

`PASS` — 34/34 coverage, Learning Transformation, 구조·주석, 정적 Accessibility/Motion, build, Storybook, route를 모두 통과했고 미해결 `BLOCK`이 없다.

해소된 `DEFERRED → PASS` 항목(저장소 소유자의 일괄 브라우저 검수 대상):

- `CDX-BROWSER-001` — 실제 키보드 포커스 표시와 320/390px 화면의 최종 overflow
- `BROWSER-CORE02-001` — 브라우저 실조작 전반(키보드 이동, 작은 화면 레이아웃)

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 사실·학습·문체·정적 동기화 재검수

### auditTarget

- route: `/fundamentals/installation`
- commit: `07c8558`
- officialUrls:
  - `https://gsap.com/docs/v3/Installation/`
  - `https://gsap.com/docs/v3/GSAP/gsap.registerPlugin()/`
- supportingOfficialUrls:
  - `https://gsap.com/resources/private-repo-migration/`
  - `https://gsap.com/resources/React/`
  - `https://www.typescriptlang.org/tsconfig/files.html`
  - `https://github.com/greensock/GSAP/tree/master/types`
  - `https://github.com/greensock/GSAP/releases`
- reviewedAt: `2026-08-13`
- browserEvidenceBoundary: 브라우저 조작과 build·Storybook은 통합 검수 범위이므로 이 재검수에서 실행하지 않는다.

### auditFindings

| ID | 관점 | 최초 상태 | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- | --- |
| FACT-INSTALL-001 | 사실 정확성 | BLOCK | `FileFormatsSection.tsx`가 다운로드 zip의 네 디렉터리를 npm 패키지에도 그대로 있다고 설명하지만, 설치된 GSAP 3.15.0에는 루트 ESM 파일·`dist/`·`src/`가 있고 `/minified/`·`/UMD/`·`/ESM/` 디렉터리는 없다. | 학습자가 npm 패키지에서 존재하지 않는 디렉터리를 찾게 된다. | zip 구성과 npm package exports를 분리해 설명한다. |
| FACT-INSTALL-002 | 사실 정확성·학습 효율 | BLOCK | `ImportFormsSection.tsx`의 공식 TypeScript 예시는 `...`를 포함한 부분 예시이며, TypeScript 공식 문서상 `files`는 compile 대상 allowlist다. | 완성된 설정처럼 복사하면 기존 source file 포함 범위를 바꿀 수 있다. | 필요한 경우에만 쓰는 부분 예시이며 기존 `files`·`include`를 보존해야 한다고 경고한다. |
| STYLE-INSTALL-001 | 비유·문체 | BLOCK | `PageCoverage.tsx` 학습자 화면에 `공식 source`, `기술 item`, `source item` 같은 제작 workflow 용어가 노출된다. | 설치 개념보다 콘텐츠 제작 상태를 먼저 해석하게 한다. | 학습자 관점의 `공식 문서`, `확인한 설명` 표현으로 바꾼다. |
| COVERAGE-INSTALL-001 | Official Coverage | BLOCK | Installation의 private repository note는 migration guide를 기술 후속 근거로 연결하지만 `INST-21`과 로컬 본문은 링크 경계를 기록하지 않는다. | 기존 private repository를 옮기는 상세 절차로 이어질 수 없다. | `INST-21`과 troubleshooting에 공식 migration guide 링크를 연결한다. |

### changesApplied

| findingId | 상태 이력 | 수정 파일 | 수정 내용 | 재검증 근거 |
| --- | --- | --- | --- | --- |
| FACT-INSTALL-001 | BLOCK → ADDRESSED → PASS | `FileFormatsSection.tsx` | 다운로드 zip의 네 폴더와 npm package 구조를 분리하고 일반 ESM·UMD import 선택을 직접 설명했다. | Installation의 zip 설명, 설치된 GSAP 3.15.0 `package.json` exports와 실제 루트·`dist/` 구조를 다시 대조했다. |
| FACT-INSTALL-002 | BLOCK → ADDRESSED → PASS | `ImportFormsSection.tsx`, `installation.catalog.ts`, 이 handoff | 타입 경로 설정을 compiler가 위치를 요구할 때 쓰는 부분 예시로 한정하고 기존 `files`·`include` 보존 경고를 추가했다. | Installation FAQ와 TypeScript `files` 공식 문서의 허용 목록 계약을 다시 대조했다. |
| STYLE-INSTALL-001 | BLOCK → ADDRESSED → PASS | `PageCoverage.tsx` | 학습자 화면의 `source`·`item` 제작 용어를 `공식 문서`·`확인한 설명`으로 바꿨다. | PageCoverage의 모든 표시 문자열과 aria-label을 다시 읽어 제작 workflow 용어가 남지 않았음을 확인했다. |
| COVERAGE-INSTALL-001 | BLOCK → ADDRESSED → PASS | `TroubleshootingSection.tsx`, `installation.catalog.ts`, 이 handoff | `INST-21`에 상세 이전 절차 경계를 추가하고 공식 migration guide 링크를 연결했다. | Installation Legacy Note의 migration guide 링크와 로컬 링크 URL을 다시 대조했다. |
| SOURCE-INSTALL-001 | PASS | `installation.meta.ts`, 이 handoff | 현재 공식 source 재검수일을 `2026-08-13`로 갱신했다. | 두 canonical GSAP 문서를 검수 당일 다시 열었다. |

### verification

- Fact Accuracy: `PASS` — canonical 두 페이지, official migration guide, TypeScript `files` 문서, 설치된 GSAP 3.15.0 package exports를 근거별로 분리해 재대조했다.
- Official Coverage: `PASS` — catalog 고유 ID 34개, handoff manifest 34행, coverage map 34행이며 섹션별 실제 개수 `6·7·5·6·6·4`가 meta와 일치한다.
- Learning Transformation: `PASS` — 가져오기 경로 → 파일 형식 → import → 등록 → tree shaking → 문제 해결 순서와 각 용어의 최초 정의를 다시 확인했다.
- Runtime/Display Sync: `PASS` — 실행 예제·control·runtime source는 `none`이다. 모든 표시 코드는 해당 section TSX의 정적 문자열이고 `gsap`, `gsap/DrawSVGPlugin`, `gsap/ScrollTrigger`, `gsap/dist/gsap` 네 import specifier가 설치본에서 해석됨을 확인했다.
- Pedagogy: `PASS` — zip과 npm package, TypeScript 부분 설정처럼 복사 전에 알아야 할 경계를 코드보다 늦지 않게 배치했다.
- Style: `PASS` — 학습자 본문에서 제작 workflow 용어와 동작을 흐리는 비유·의인화를 다시 검색했다.
- Structure/Comment: `PASS` — installation 아래 TS·TSX 11개를 TypeScript parser로 검사해 parse diagnostic 0건을 확인했고 조립·section·component 경계를 바꾸지 않았다.
- Static Accessibility/Motion: `PASS` — 새 migration 링크에 새 탭 안내와 `rel="noreferrer"`가 있고 기존 heading·aria 연결을 보존했다. animation이 없어 motion 분기는 해당하지 않는다.
- Build/Integration: `PASS` — 메인 통합에서 2026-08-13 `npm run build`와 `npm run build-storybook`이 각각 exit 0이었다.
- Browser Matrix: `NOT VERIFIED` — `/fundamentals/installation` 초기 렌더·키보드 포커스·320/390px overflow를 이 재검수에서 실제 조작하지 않았다. 실행 예제·control·reduced-motion 대상은 없다.
- Static checks: `PASS` — 전체 installation TS·TSX parse diagnostic 0건, `git diff --check` exit 0.
- Tests: 프로젝트 정책에 따라 자동화 테스트를 추가하거나 실행 환경을 만들지 않았다.

### unresolved

- BLOCK: `none`
- ADVISORY: `none`
- NOT VERIFIED:
  - `BROWSER-INSTALL-001` — 실제 초기 렌더, 키보드 포커스, 320/390px overflow

### overallDecision

`NOT VERIFIED` — 정적 사실·coverage·학습 흐름·문체·코드 동기화의 `BLOCK`은 모두 수정 후 재검수로 해소했고 통합 build·Storybook도 통과했지만, 현재 코드의 브라우저 검증은 실행하지 않았다.
