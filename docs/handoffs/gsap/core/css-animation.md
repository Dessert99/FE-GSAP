# CSS animation handoff

## 입력 계약

### objective

CSSPlugin이 CSS 값과 transform을 읽고 쓰는 규칙을 이해해 올바른 property 이름·단위·transform alias·cleanup 방식을 선택하게 한다.

### officialPage

- title: `CSS`
- canonicalUrl: `https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/`
- reviewedAt: `2026-08-13`
- category: `Fundamentals`
- slug: `css-animation`
- sourcePageIds: primary `source:css`

### localPage

- localPath: `src/content/gsap/fundamentals/css-animation/`
- route: `/fundamentals/css-animation`

### sourceManifest

| id | officialItem | sourceStatus |
| --- | --- | --- |
| CSS-S001 | DOM의 거의 모든 CSS-related property를 다루며 전체 property list는 의도적으로 없다. | verified |
| CSS-S002 | 표준 animatable CSS와 다수 비애니메이션 값도 처리한다. | verified |
| CSS-S003 | property 이름은 kebab-case가 아닌 camelCase다. | verified |
| CSS-S004 | color, number, complex string, `height:'auto'`를 받을 수 있다. | verified |
| CSS-S005 | 비보간 값은 시작에 설정하지만 `display:'none'`은 끝에 설정한다. | verified |
| CSS-S006 | 중간값이 유효해야 보간할 수 있다. | verified |
| CSS-S007 | 복잡한 layout 변화는 FLIP 경계다. | verified |
| CSS-S008 | transform string보다 built-in alias가 호환성·성능·신뢰성에 유리하다. | verified |
| CSS-S009 | transform 적용 순서는 translation→scale→rotationX→rotationY→skew→rotationZ로 고정된다. | verified |
| CSS-S010 | arbitrary transform string은 matrix round-trip parsing 부담이 있다. | verified |
| CSS-S011 | 비표준 transform 순서가 꼭 필요한 경우 외에는 alias를 권장한다. | verified |
| CSS-S012 | 공식 quick reference 20행을 보존한다. | verified |
| CSS-S013 | percent 이동, px+%, scale shortcut, relative 값, SVG percent 경계를 보존한다. | verified |
| CSS-S014 | complex string을 보간하고 vendor prefix를 탐지한다. | verified |
| CSS-S015 | x는 px, rotation은 deg가 기본이며 다른 단위는 string으로 쓴다. | verified |
| CSS-S016 | 현재·목표 단위가 달라도 변환할 수 있다. | verified |
| CSS-S017 | 3D surface는 rotationX/Y/Z, z, perspective, transformPerspective다. | verified |
| CSS-S018 | true 3D는 parent perspective 또는 transformPerspective가 필요하다. | verified |
| CSS-S019 | parent perspective와 transformPerspective의 vanishing point 의미가 다르다. | verified |
| CSS-S020 | 3D CSS와 GSAP alias 대응을 보존한다. | verified |
| CSS-S021 | 미지원 browser에서는 3D만 무시되고 2D는 유지된다. | verified |
| CSS-S022 | transform cache는 다른 transform 값을 보존하며 clearProps로 제거한다. | verified |
| CSS-S023 | `parseTransform:true`는 CSS를 다시 parse한다. | verified |
| CSS-S024 | rendering·antialias 품질은 browser 책임이다. | verified |
| CSS-S025 | `force3D:'auto'`는 tween 중 3D를 쓰고 가능하면 2D로 돌아온다. | verified |
| CSS-S026 | 2D transformOrigin 기본값은 `50% 50%`이며 keyword/%/px를 받는다. | verified |
| CSS-S027 | 세 번째 transformOrigin 값은 z-origin 거리다. | verified |
| CSS-S028 | SVG transformOrigin을 일관화하지만 SVG 3D는 지원하지 않는다. | verified |
| CSS-S029 | svgOrigin은 SVG canvas 좌표이며 transformOrigin과 함께 쓸 수 없다. | verified |
| CSS-S030 | smoothOrigin은 SVG origin 변경 jump를 offset으로 막는다. | verified |
| CSS-S031 | directional rotation은 `_cw`, `_ccw`, `_short` suffix를 쓴다. | verified |
| CSS-S032 | 일반 object는 DirectionalRotationPlugin 경계다. | verified |
| CSS-S033 | autoAlpha는 opacity 0에서 hidden, 그 외 inherit를 쓴다. | verified |
| CSS-S034 | visibility hidden·opacity 1 시작도 fade-in을 위해 opacity 0으로 취급한다. | verified |
| CSS-S035 | CSS custom property를 animation할 수 있다. | verified |
| CSS-S036 | clearProps는 완료 때 inline style을 제거한다. | verified |
| CSS-S037 | transform 일부를 clear해도 합쳐진 transform 전체가 제거된다. | verified |
| CSS-S038 | autoRound는 px와 zIndex를 기본 정수화하고 false로 끈다. | verified |
| CSS-S039 | numeric DOM attribute는 AttrPlugin, text는 TextPlugin 경계다. | verified |
| CSS-S040 | CSSPlugin은 Core에 포함되어 별도 등록하지 않는다. | verified |
| CSS-S041 | legacy `css:{}` wrapper는 필요 없다. | verified |
| CSS-S042 | MDN·FLIP·Attr·Text·Snap·DirectionalRotation 관련 경계를 연결한다. | verified |
| CSS-EX001 | mixed vars 공식 예제 | verified |
| CSS-EX002 | xPercent/yPercent alias 공식 예제 | verified |
| CSS-EX003 | default/explicit units 공식 예제 | verified |
| CSS-EX004 | 2D+3D mix 공식 예제 | verified |
| CSS-EX005 | parent perspective와 transformPerspective 공식 예제 | verified |
| CSS-EX006 | transformOrigin 3종 공식 예제 | verified |
| CSS-EX007 | svgOrigin 공식 예제 | verified |
| CSS-EX008 | directional rotation 공식 예제 | verified |
| CSS-EX009 | autoAlpha sequence 공식 예제 | verified |
| CSS-EX010 | clearProps 공식 예제 | verified |

### sourceBlockers

`none`. advisory: autoAlpha prose의 `inherit`를 authority로 삼고 바로 아래 code comment의 `visible` 표현을 사실로 복제하지 않는다.

### moduleSelection

- core 자동 포함 plugin + CSS parsing·transform concept guide + 공식 quick reference
- 전체 CSS property catalog는 만들지 않는다.

### learnerFlow

1. `#plugin-boundary`: CSSPlugin 자동 포함과 대상 경계
2. `#css-values`: 이름·값·보간·단위
3. `#transform-model`: alias와 고정 순서
4. `#three-d`: perspective·force3D·cache
5. `#origins`: transformOrigin·SVG origin·directional rotation
6. `#lifecycle`: autoAlpha·variables·clearProps·autoRound
7. 학습 목차: 여섯 질문 중 필요한 섹션으로 이동

### coverageMap

52개 공식 항목의 식별자와 로컬 근거는 `css-animation.reference.ts`와 아래 표에 보존한다. `PageCoverage.tsx`는 학습자에게 내부 검수 ID를 보이지 않고 여섯 학습 섹션으로 이동하는 목차만 렌더링한다.

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| CSS-S001 | `css-animation.reference.ts:11`, `PluginBoundarySection.tsx` | covered |
| CSS-S002 | `css-animation.reference.ts:12`, `PluginBoundarySection.tsx` | covered |
| CSS-S003 | `css-animation.reference.ts:19`, `CssValuesSection.tsx` | covered |
| CSS-S004 | `css-animation.reference.ts:20`, `CssValuesSection.tsx`, `CssValueParsingExample` | covered |
| CSS-S005 | `css-animation.reference.ts:21`, `PluginBoundarySection.tsx` | covered |
| CSS-S006 | `css-animation.reference.ts:13`, `PluginBoundarySection.tsx` | covered |
| CSS-S007 | `css-animation.reference.ts:14`, `PluginBoundarySection.tsx` | covered |
| CSS-S008 | `css-animation.reference.ts:28`, `TransformModelSection.tsx` | covered |
| CSS-S009 | `css-animation.reference.ts:29`, `TransformOrderExample` | covered |
| CSS-S010 | `css-animation.reference.ts:30`, `TransformModelSection.tsx` | covered |
| CSS-S011 | `css-animation.reference.ts:31`, `TransformModelSection.tsx` | covered |
| CSS-S012 | `css-animation.reference.ts:32,66-87`, `TransformModelSection.tsx` 20행 table | covered |
| CSS-S013 | `css-animation.reference.ts:33`, `TransformModelSection.tsx` | covered |
| CSS-S014 | `css-animation.reference.ts:22`, `CssValueParsingExample` | covered |
| CSS-S015 | `css-animation.reference.ts:23`, `CssValuesSection.tsx` | covered |
| CSS-S016 | `css-animation.reference.ts:24`, `CssValueParsingExample` | covered |
| CSS-S017 | `css-animation.reference.ts:38`, `ThreeDSection.tsx` | covered |
| CSS-S018 | `css-animation.reference.ts:39`, `ThreeDSection.tsx` | covered |
| CSS-S019 | `css-animation.reference.ts:40`, `ThreeDSection.tsx` | covered |
| CSS-S020 | `css-animation.reference.ts:41`, `ThreeDSection.tsx` | covered |
| CSS-S021 | `css-animation.reference.ts:42`, `ThreeDSection.tsx` | covered |
| CSS-S022 | `css-animation.reference.ts:34`, `TransformModelSection.tsx` | covered |
| CSS-S023 | `css-animation.reference.ts:35`, `TransformModelSection.tsx` | covered |
| CSS-S024 | `css-animation.reference.ts:36`, `TransformModelSection.tsx`, `ThreeDSection.tsx` | covered |
| CSS-S025 | `css-animation.reference.ts:43`, `ThreeDSection.tsx` | covered |
| CSS-S026 | `css-animation.reference.ts:46`, `OriginsSection.tsx` | covered |
| CSS-S027 | `css-animation.reference.ts:47`, `OriginsSection.tsx` | covered |
| CSS-S028 | `css-animation.reference.ts:48`, `OriginsSection.tsx` | covered |
| CSS-S029 | `css-animation.reference.ts:49`, `OriginsSection.tsx` | covered |
| CSS-S030 | `css-animation.reference.ts:50`, `OriginsSection.tsx` | covered |
| CSS-S031 | `css-animation.reference.ts:51`, `OriginsSection.tsx` | covered |
| CSS-S032 | `css-animation.reference.ts:52`, `OriginsSection.tsx` | covered |
| CSS-S033 | `css-animation.reference.ts:56`, `CssLifecycleExample` | covered |
| CSS-S034 | `css-animation.reference.ts:57`, `VisibilityCleanupSection.tsx` | covered |
| CSS-S035 | `css-animation.reference.ts:25`, `CssValueParsingExample` | covered |
| CSS-S036 | `css-animation.reference.ts:58`, `CssLifecycleExample` | covered |
| CSS-S037 | `css-animation.reference.ts:59`, `CssLifecycleExample` | covered |
| CSS-S038 | `css-animation.reference.ts:60`, `VisibilityCleanupSection.tsx` | covered |
| CSS-S039 | `css-animation.reference.ts:15`, `PluginBoundarySection.tsx` | covered |
| CSS-S040 | `css-animation.reference.ts:16`, `PluginBoundarySection.tsx` | covered |
| CSS-S041 | `css-animation.reference.ts:17`, `PluginBoundarySection.tsx` | covered |
| CSS-S042 | `css-animation.reference.ts:18`, `PluginBoundarySection.tsx` related links | covered |
| CSS-EX001 | `css-animation.reference.ts:26`, `CssValuesSection.tsx` | covered |
| CSS-EX002 | `css-animation.reference.ts:37`, `TransformModelSection.tsx` | covered |
| CSS-EX003 | `css-animation.reference.ts:27`, `CssValuesSection.tsx`, `CssValueParsingExample` | covered |
| CSS-EX004 | `css-animation.reference.ts:44`, `ThreeDSection.tsx` | covered |
| CSS-EX005 | `css-animation.reference.ts:45`, `ThreeDSection.tsx` | covered |
| CSS-EX006 | `css-animation.reference.ts:53`, `OriginsSection.tsx` | covered |
| CSS-EX007 | `css-animation.reference.ts:54`, `OriginsSection.tsx` | covered |
| CSS-EX008 | `css-animation.reference.ts:55`, `OriginsSection.tsx` | covered |
| CSS-EX009 | `css-animation.reference.ts:61`, `CssLifecycleExample` | covered |
| CSS-EX010 | `css-animation.reference.ts:62`, `CssLifecycleExample` | covered |

### relatedPages

- `/fundamentals/gsap-to`: 공통 Tween vars
- `/fundamentals/non-css-target-values`: attribute·array target
- `/fundamentals/flip-first-last`: layout transition

## 구현 계약

### exactFiles

create:

- `CssAnimationPage.tsx`, `CssAnimationPage.css`, `css-animation.meta.ts`, `css-animation.reference.ts`
- `components/SectionHeading/SectionHeading.tsx`, `components/PageCoverage/PageCoverage.tsx`
- `sections/PluginBoundarySection/PluginBoundarySection.tsx`
- `sections/CssValuesSection/CssValuesSection.tsx`
- `sections/TransformModelSection/TransformModelSection.tsx`
- `sections/ThreeDSection/ThreeDSection.tsx`
- `sections/OriginsSection/OriginsSection.tsx`
- `sections/VisibilityCleanupSection/VisibilityCleanupSection.tsx`
- `examples/CssValueParsingExample/{CssValueParsingExample.tsx,CssValueParsingExample.css,useCssValueParsingAnimation.ts}`
- `examples/TransformOrderExample/{TransformOrderExample.tsx,TransformOrderExample.css,useTransformOrderAnimation.ts}`
- `examples/CssLifecycleExample/{CssLifecycleExample.tsx,CssLifecycleExample.css,useCssLifecycleAnimation.ts}`

modify: 이 handoff evidence. `src/app/routes.ts`는 공유 파일 충돌 방지를 위해 `/root` 통합 범위로 넘겼다.

### exampleContracts

- `CssValueParsingExample`: complex string·unit conversion·CSS variable 중 하나를 선택해 actual vars와 code를 같은 descriptor에서 만든다.
- `TransformOrderExample`: property 선언 순서를 바꾸어도 GSAP transform 적용 순서는 같음을 비교한다.
- `CssLifecycleExample`: autoAlpha·clearProps의 시작/완료 상태와 computed/inline 값을 표시한다.
- 모든 예제는 autoplay 없음, native labels, text result, reduced-motion duration 0을 사용한다.

### nonGoals

- 전체 CSS property catalog, gsap.to special vars 복제, FLIP/Attr/Text 구현, rendering 품질 해결, decorative autoplay

### preserve

- inventory identity, 기존 routes/focus semantics, 기존 page/shared component API, unrelated user changes

## 검수 계약

### reviewAssignments

- Source Curator + Content Architect: `/root/target_sources_arch`
- 구현 후 전문 review와 release: 구현에 참여하지 않은 reviewer

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SC-CORE06-001 | PASS | canonical CSS page 42 claims + 10 code examples | 구현 가능 | 52개 evidence 연결 |
| SC-CORE06-002 | ADVISORY | autoAlpha prose/code comment 표현 차이 | 잘못된 visible 단정 위험 | prose의 inherit 사용 |
| IMPL-CORE06-001 | PASS | `css-animation.reference.ts` 52 ID와 Quick reference 20행, `PageCoverage.tsx` 전체 map | compact official evidence 구현 | independent coverage review 요청 |
| IMPL-CORE06-002 | PASS | 세 page-owned hook이 normalized descriptor→GSAP call→TSX serializer를 공유하고 runKey 0에서 autoplay 차단 | runtime/display·motion 계약 구현 | browser에서 세 control 재검증 |
| IMPL-CORE06-003 | PASS | 여섯 section 분리, page TSX 조립 전용, example 선언·GSAP 단계별 한국어 주석 | structure 계약 구현 | independent structure review 요청 |
| COMMENT-CORE06-001 | ADDRESSED | exported type 6개를 한 줄 한국어 JSDoc으로 수정 후 재검수 PASS | comment gate 통과 | none |
| A11Y-CORE06-001 | ADDRESSED | clearProps x를 shared descriptor에서 120→60으로 줄여 320px 범위 126..244 확보 | small-screen 정적 blocker 해소 | Browser 390px 실조작 필요 |
| MOTION-CORE06-001 | ADDRESSED | 세 runtime이 마지막 replay key를 기억해 reduced-motion dependency 변경에는 baseline만 준비 | 설정 전환 자동재생 차단 | none |
| IR-CORE06-FINAL | PASS | independent reviewer가 52/52, 20행 quick reference, learning/runtime/route/build와 comment·layout·motion 수정을 재검수 | 정적 release gate 통과 | Browser gate만 남음 |
| AUD-CSS-001 | ADDRESSED | 세 code panel은 `.box`를 보였지만 실제 GSAP 호출은 각 page-owned class를 선택 | selector까지 실행·표시 불일치 | `targetClassName`으로 표시 selector 생성 |
| AUD-CSS-002 | ADDRESSED | 학습 화면에 52개 internal ID·source item·coverage 분모와 `공식 문장 우선` 같은 검수 용어 노출 | 학습 흐름을 제작 workflow로 바꾸고 AI 요약처럼 읽힘 | 내부 근거는 reference·handoff에 보존하고 화면은 학습 목차·질문으로 교체 |
| AUD-CSS-003 | PASS | `2026-08-13` CSSPlugin 공식 본문 42개 주장·10개 코드 예제·Quick reference 20행 재대조 | 현재 문서와 사실 일치 | none |
| AUD-CSS-004 | PASS | 세 예제의 control→descriptor→GSAP call→serializer를 모든 mode에서 정적 추적 | selector 수정 후 method·target·vars·duration·ease 일치 | Browser 실조작 별도 필요 |
| AUD-CSS-005 | NOT VERIFIED | 현재 검수에서 브라우저 실조작을 수행하지 않음 | 재생·mode 전환·computed style·focus·responsive 동작 미확인 | 메인 통합 브라우저 검증 |
| AUD-CSS-006 | PASS | 2026-08-13 메인 통합 `npm run build`·`npm run build-storybook` 모두 exit 0 | 현재 수정본의 전역 통합 확인 | none |

### verificationEvidence

- `rg -o "id: 'CSS-(S|EX)[0-9]{3}'" css-animation.reference.ts | wc -l` → `52`
- Quick reference literal row count → `20`
- `2026-08-03 npm run build` → `tsc && vite build`, 최종 189 modules, 확정 5개 route의 page chunk 포함, exit 0
- `2026-08-03 npm run build-storybook` → 327 modules, exit 0; 기존 500 kB size warning만 발생
- `npm run lint -- --max-warnings=0` → package에 lint script가 없어 실행 불가; build의 TypeScript 검사는 통과
- independent review — coverage/learning/runtime/route/build PASS; comment와 320px clearProps overflow 수정 후 재검수 PASS
- local HTTP — 최종 Vite server에서 `/fundamentals/css-animation` `200` 응답 확인
- cross-page review — 세 runtime의 replay-key guard 추가 후 reduced-motion 변경 no-autoplay 재검수 PASS
- Browser 실조작 — `2026-08-04` 저장소 소유자가 브라우저에서 직접 조작하고 PASS로 판정했다. 항목별 상세 기록은 남기지 않아 `2026-08-13` 현재 검수의 근거로는 재사용하지 않음.
- `2026-08-13` 공식 문서 재대조 → 42개 기술 주장·10개 예제·Quick reference 20행 유지, 사실 오류 없음
- `2026-08-13` 예제 정적 matrix → 3개 예제의 모든 mode에서 method·selector·vars·duration·ease 일치
- `2026-08-13 npx tsc --noEmit` → exit 0
- `2026-08-13 git diff --check -- src/content/gsap/fundamentals/css-animation docs/handoffs/gsap/core/css-animation.md` → exit 0
- `2026-08-13` 메인 통합 → `npm run build` exit 0, `npm run build-storybook` exit 0; Browser는 `NOT VERIFIED`

### releaseDecision

`NOT VERIFIED` — `2026-08-13` 공식 재대조·학습 문장·세 예제 정적 동기화와 메인 통합 build·Storybook은 PASS이고 남은 BLOCK은 없다. Browser 실조작은 `NOT VERIFIED`다.
