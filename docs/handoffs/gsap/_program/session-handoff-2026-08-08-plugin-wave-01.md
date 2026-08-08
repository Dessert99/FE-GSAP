# 세션 인수인계 — Plugin 첫 wave 완료 — 2026-08-08

이 문서는 Plugin P01~P03을 병렬로 준비하고 curriculum 순서로 통합한 체크포인트다. 이후 진행 상태는 `current-status.md`를 먼저 읽고, 이 문서는 첫 wave의 source·검증·커밋 증거를 재현할 때 사용한다.

## 체크포인트 범위

- 브랜치: `Dessert99/feat-gsap`
- Plugin 첫 wave 구현 기준 커밋: `3073618`
- 원격 반영: 이 세션은 push하지 않았다.
- Core visible learning pages: **40/40**, canonical sources **159/159**
- Plugin visible learning pages: **3/46**, canonical sources **8/205**
- 전체 visible learning pages: **43/86**, canonical sources **167/364**
- route 순서: Core 40 → P01 `plugins` → P02 `css-rule-plugin` → P03 `draggable-create`
- P01~P03 content 폴더·page handoff·lazy import·lesson 등록이 모두 존재한다.
- P01~P03 handoff의 `releaseDecision`은 모두 `PASS`이며 미해결 `BLOCK`은 없다.

## 완료 커밋

| 작업 | commit | 결과 |
| --- | --- | --- |
| Core lesson 순서 drift | `ba2cc7b850934d77b592315fc8453c876a8ed613` | `reusable-effects`를 `gsap-root-clock` 앞으로 이동 |
| P01 Plugins overview | `6b939ff6261b7622f1a6a92c2f44d8998a30112e` | `/fundamentals/plugins` release |
| P02 CSSRulePlugin | `3949b1fa7c5e8d80a0f2cb9cb519fb3d835279b4` | `/fundamentals/css-rule-plugin` release |
| P03 Draggable create | `3073618aeffe244970996001ccb95cf4965151f8` | `/fundamentals/draggable-create` release |

설계와 실행 계획은 각각 `deb9dad`, `fac3483`에 있다. 페이지 worker는 page-local 폴더와 handoff만 썼고, route·전체 build·Git은 root가 P01→P02→P03 순서로 소유했다.

## 페이지별 source와 구현 증거

| page | canonical | coverage | implementation evidence |
| --- | ---: | --- | --- |
| P01 `plugins` | 1 | 공식 item 26/26 | TextPlugin registry를 실제 browser GSAP registry에서 읽고, registration descriptor가 import·vars·표시 code를 함께 만든다. |
| P02 `css-rule-plugin` | 2 | 공식 item 20/20 + 설치본 source 5/5 | same-origin pseudo rule 하나를 `getRule()`로 찾고, 한 descriptor로 tween·code·declaration readout을 만들며 cleanup에서 원래 `cssText`를 복원한다. |
| P03 `draggable-create` | 5 | 공식 item 60/60 + implementation/type 2/2 | `create()` Config Object 42개를 빠짐없이 catalog에 보존하고, 한 target instance의 create/get/target/vars와 `kill()` cleanup을 한 runtime이 소유한다. |

세 handoff의 `sourceManifest`와 `coverageMap`은 범위 표기가 아니라 각 ID별 행으로 확장했다. root 재검산 결과 P01은 catalog/manifest/coverage 각 26개, P02는 각 25개, P03은 각 62개이며 중복·누락이 없다.

## 마지막 통합 검증 증거

P03까지 route에 등록한 구현 기준 HEAD에서 확인한 결과다.

- `npx tsc --noEmit`: exit 0
- `npm run build`: exit 0, Vite **831 modules**
- 앱 chunks: `PluginsPage`, `CssRulePluginPage`, `DraggableCreatePage` JS/CSS 생성 확인
- `npm run build-storybook`: exit 0, Storybook **969 modules**
- Storybook chunks: 세 Plugin page JS/CSS 생성 확인
- `git diff --check`: exit 0
- cross-page audit: route indices `40 < 41 < 42`, 세 `releaseDecision PASS`, 배포 base를 무시한 내부 링크와 P04~P08 미등록 route 링크 없음

Storybook의 기존 500 kB 초과 chunk warning과 `npm install`의 기존 high-severity audit 2건은 이번 page change에서 생긴 blocker가 아니며 dependency 변경은 범위 밖이었다.

## 보존할 공식/source 경계

### P01 Plugins overview

- vars-key mental model과 local ownership decision은 초보자 흐름이지만 공식 coverage item으로 세지 않는다.
- 설치본 TextPlugin의 registry key는 `text`다. Node에는 browser DOM이 없어 registry 결과를 browser evidence로 승격하지 않았고, 예제는 실제 runtime registry state를 표시한다.
- TextPlugin option semantics는 P01 소유권이 아니다.

### P02 CSSRulePlugin

- 공식 `getRule()` signature는 `selector:String → Object`이고 pseudo-only selector는 array를 반환한다고 적는다.
- 설치본 타입은 `CSSRule`, raw source는 구체 declaration·pseudo-only array·구체 selector miss의 `undefined` 경계를 보인다. local lab의 `CSSStyleDeclaration | null`은 안전한 local 정규화이며 공식 signature가 아니다.
- 공식 deprecation·CSS variable repaint warning·real element 대안을 유지한다.

### P03 Draggable create

- 공식 `get()` 문서는 미연결 target에서 `undefined`를 적지만 설치본 `draggable.d.ts`는 non-null `Draggable`이다. 둘을 하나의 공식 타입으로 합치지 않는다.
- overview의 positional pair는 `"top,left"`, create Config Object는 `"left,top"`으로 표기한다. 둘 다 source 차이로 보존한다.
- Node-only Draggable probe는 DOM core가 준비되지 않아 실패했으므로 runtime evidence로 사용하지 않는다.
- P03은 create/get/target/vars만 깊게 소유한다. 좌표·bounds·lifecycle·gesture·collision/momentum 상세는 P04~P08 경계다.

## Release와 유예 상태

- Plugin P01~P03 handoff: `releaseDecision PASS` 3/3
- Plugin page handoff의 미해결 `BLOCK`: 0
- browser-only `DEFERRED`가 있는 Plugin handoff: 3개
- browser batch에 남긴 항목: keyboard/focus, 실제 reduced-motion 전환, 320/390px layout·overflow, 실제 control/drag 조작
- Core 34개를 합친 page handoff 기준 `DEFERRED` 파일: 37개

이 유예는 `quality-gates.md`가 허용한 browser-only 항목이며 coverage, 타입, build, cleanup 문제를 미룬 것이 아니다.

## 다음 wave identity

| order | page | route | canonical ownership | primary source |
| ---: | --- | --- | ---: | --- |
| P04 | `draggable-coordinates` | `/fundamentals/draggable-coordinates` | 14 | `source:draggable-delta-x` |
| P05 | `draggable-bounds-axis` | `/fundamentals/draggable-bounds-axis` | 12 | `source:draggable-apply-bounds` |
| P06 | `draggable-lifecycle` | `/fundamentals/draggable-lifecycle` | 6 | `source:draggable-disable` |

세 page-local worker를 다시 병렬로 사용할 수 있다. 각 worker의 write scope는 `src/content/gsap/ui/<slug>/`와 해당 handoff 하나뿐이다. root는 P04→P05→P06 순서로 source·coverage·runtime을 재검수하고 route 등록, TypeScript, Vite, Storybook, handoff PASS, page commit을 하나씩 완료한다.

P04~P06은 P01과 P03 등록 route만 prerequisite로 링크한다. P07 Draggable events와 P08 collision/momentum은 아직 미등록이므로 설명상 boundary만 두고 링크하지 않는다.

## 재현 체크

```bash
git status -sb
git rev-list --left-right --count origin/main...HEAD
git log -8 --oneline
rg -l DEFERRED docs/handoffs/gsap/core docs/handoffs/gsap/plugins docs/handoffs/gsap/plugins-uncategorized docs/handoffs/gsap/ui | sort
npx tsc --noEmit
npm run build
npm run build-storybook
```

정적 수량만 믿지 말고 master inventory의 P01~P03 각 행에 대해 content folder, page handoff, lazy import, lesson slug를 함께 대조한다. 다음 세션용 전체 프롬프트와 최신 실행 순서는 `current-status.md`를 사용한다.
