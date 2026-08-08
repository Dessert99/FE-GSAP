# 세션 인수인계 — Plugin P07~P20 완료 — 2026-08-08

이 문서는 Plugin P07~P20을 병렬로 준비하고 페이지 단위로 검수·통합한 체크포인트다. 최신 진행 상태와 다음 실행 순서는 `current-status.md`를 우선한다.

## 체크포인트 범위

- 브랜치: `Dessert99/feat-gsap`
- 구현 기준 커밋: `e4a93c9` (`motion-path-helper`)
- 원격 반영: 이 세션은 push하지 않았다.
- Core visible learning pages: **40/40**, canonical sources **159/159**
- Plugin visible learning pages: **20/46**, canonical sources **86/205**
- 전체 visible learning pages: **60/86**, canonical sources **245/364**
- route 순서: Core 40 → curriculum P01 `plugins` → … → P20 `motion-path-helper`
- P01~P20 content 폴더·page handoff·lazy import·lesson 등록이 존재하고 모든 handoff의 `releaseDecision`은 `PASS`다.

## 완료 커밋과 통합 증거

| page | commit | canonical | Vite / Storybook modules |
| --- | --- | ---: | ---: |
| 계획 | `bcd3745` | P07~P20 계약 | baseline 876 / 1014 |
| P07 `draggable-events` | `23fc452` | 3 | 891 / 1029 |
| P08 `draggable-collision-momentum` | `19e6d05` | 3 | 908 / 1046 |
| P09 `draw-svg` | `53fc4d0` | 3 | 924 / 1062 |
| P10 `easel-plugin` | `a8d6866` | 1 | 933 / 1071 |
| P11 `flip-first-last` | `053229e` | 4 | 941 / 1079 |
| P12 `flip-fit-absolute` | `b7e330f` | 2 | 956 / 1094 |
| P13 `flip-batch-interrupt` | `1606184` | 3 | 995 / 1133 |
| P14 `gsdevtools` | `116ac6c` | 2 | 967 / 1105 |
| P15 `inertia` | `3f2da46` | 5 | 982 / 1120 |
| P16 `velocity-tracker-lifecycle` | `f18f9af` | 5 | 1010 / 1148 |
| P17 `velocity-tracker-read` | `017e4ab` | 5 | 1021 / 1159 |
| P18 `morph-svg` | `3b9806f` | 4 | 1027 / 1165 |
| P19 `morph-svg-path-data` | `c5ddc1f` | 3 | 1032 / 1170 |
| P20 `motion-path-helper` | `e4a93c9` | 3 | 1042 / 1180 |

P13 수정이 길어 P14·P15를 먼저 통합했으므로 표의 중간 module 수는 curriculum 순서대로 단조 증가하지 않는다. 최종 route 순서와 page ownership은 P01→P20으로 맞다. 각 page 통합에서 `npx tsc --noEmit`, Vite build, Storybook build와 `git diff --check`를 실행했다.

## 구현 중 발견해 바로잡은 핵심 문제

- P11은 React child를 수동 `appendChild`하던 구조를 stable React-owned card와 class mutation으로 바꿨다.
- P12는 실행 때마다 바뀐 inline style을 새 baseline으로 덮어쓰지 않도록 mount 원본을 고정했다.
- P13은 React order state가 Flip의 FIRST state보다 먼저 바뀌던 오류를 없애고, fixed cards의 class order를 `Flip.batch()` 안에서 바꾼다. 실제 `isFlipping()`과 target kill policy를 사용한다.
- P17은 property 전환 때 이전 단위의 velocity snapshot을 지워 label과 값이 섞이지 않게 했다.
- P19는 `convertToPath(..., true)`가 React-owned rect를 교체하지 않도록 React는 stable `<g>`만 소유하고 hook이 그 내부 geometry lifecycle을 전담한다. converted `d` → RawPath → serialized `d`를 실제 반환값으로 연결한다.
- P20은 reduced-motion duration의 실제 전달값과 코드 패널을 맞추고, 편집 중 매번 바뀌는 path data를 `aria-live` 밖으로 분리했다.
- P18·P19의 worker-local TypeScript가 찾지 못한 stale CSS import는 첫 Vite 통합 실패 로그로 확인한 뒤 제거하고 같은 build를 재실행했다.

## 보존할 공식 문서와 설치본 경계

- P07 listener callback의 공식 `this` 설명과 installed implementation 경계를 합치지 않는다.
- P08 `tween`은 raw runtime에서 null 가능하지만 installed d.ts는 non-null로 좁다.
- P09 `getPosition()`은 rendered 반환 설명과 examples/raw/d.ts의 array 형태가 다르다.
- P10은 CreateJS가 설치되지 않아 static-by-design이다. 가짜 canvas runtime이나 새 dependency를 추가하지 않았다.
- P14 GSDevTools는 development dynamic import/create만 하고 production에는 native timeline controls만 남긴다.
- P16 rendered `addProp/removeProp`과 current raw/type `add/remove`, rendered tracker return과 raw/type array return 차이를 그대로 기록한다.
- P17 installed `getByTarget()` miss는 `undefined`지만 공식 문구는 `null`이며, instance `isTracking`은 source에는 있고 d.ts에는 없다.
- P20 공식 `editPath()` 반환은 `PathEditor`지만 installed d.ts는 `MotionPathHelper`로 선언한다.

## Release와 유예 상태

- Plugin P01~P20 handoff: `releaseDecision PASS` 20/20
- Plugin page handoff의 미해결 integration `BLOCK`: 0
- P10은 browser interaction이 없는 static page라 browser `DEFERRED`가 없다.
- 나머지 Plugin 19개와 Core 34개를 합친 실제 browser 유예 page handoff는 53개다.
- 유예 범위는 keyboard/focus, 실제 reduced-motion, 320/390px layout·overflow, 실제 controls/drag/editor operation이다.

## 다음 wave identity

| order | page | route | canonical ownership | primary source |
| ---: | --- | --- | ---: | --- |
| P21 | `motion-path` | `/fundamentals/motion-path` | 1 | `source:motion-path` |
| P22 | `motion-path-data` | `/fundamentals/motion-path-data` | 6 | `source:motion-path-static-points-to-segment` |
| P23 | `motion-path-coordinates` | `/fundamentals/motion-path-coordinates` | 4 | `source:motion-path-static-convert-coordinates` |

P21은 한 follower의 progress/alignment/autoRotate를 소유한다. P22는 animation 없이 points/array/SVG/string/raw conversion pipeline을, P23은 nested transform의 coordinate/matrix 계산을 소유한다. P18~P20의 MorphSVG data와 helper editor lifecycle을 중복하지 않는다.

## 재현 체크

```bash
git status -sb
git rev-list --left-right --count origin/main...HEAD
git log -18 --oneline
npx tsc --noEmit
npm run build
STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook
git diff --check
```

정적 숫자만 믿지 말고 P01~P20 각각의 content folder, page handoff, lazy import, lesson slug와 `releaseDecision PASS`를 함께 대조한다.
