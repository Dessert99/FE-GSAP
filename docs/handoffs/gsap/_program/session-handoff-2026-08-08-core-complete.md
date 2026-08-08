# 세션 인수인계 — Core 40페이지 완료 체크포인트 — 2026-08-08

이 문서는 Core curriculum 완료 시점의 불변 체크포인트다. 이후 진행 상태는 `current-status.md`를 먼저 읽고, 이 문서는 완료 증거와 안전 규칙을 재현할 때 사용한다.

## 체크포인트 범위

- 브랜치: `Dessert99/feat-gsap`
- Core 구현 기준 커밋: `4e26141`
- Core visible learning pages: **40/40**
- Core canonical technical sources: **159/159**
- Plugin visible learning pages: **0/46**
- Plugin-owned canonical sources: **0/205**
- 전체 visible learning pages: **40/86**
- master inventory의 core 40개에 대해 content 폴더·core handoff·lazy import·lesson 등록을 전수 검산했다.
- 40개 lazy import의 파일·export·binding이 모두 일치하고, 중복·누락·초과 slug는 없다.

## Core 25~40 완료 커밋

커리큘럼 순서이며 Git 시간순과는 다르다. `modifiers-snap-wrap`은 나머지 15페이지보다 먼저 커밋됐다.

| Core | slug | commit |
| ---: | --- | --- |
| 25 | `timeline-callbacks-pauses` | `136de86d40ba65c2a6540b4bce460ddf887b5861` |
| 26 | `timeline-basics` | `cb0baf127d4f415135547f11bc65b6d240a273bf` |
| 27 | `timeline-child-placement` | `461a22d925fc302e85a079f48e413106fffdbf9d` |
| 28 | `timeline-labels` | `56b61e52ec735afeaf72cb9eef23ade53660f180` |
| 29 | `timeline-inspection` | `7e34372f5b0b063a550e88dad228b41e70a428d3` |
| 30 | `timeline-cleanup` | `1696e55990ab4de57d2fda44523a299d2346be88` |
| 31 | `timeline-playback-controls` | `7edada680061df907c1dde62d61c2f5f80c65507` |
| 32 | `timeline-playhead` | `5efcad6ccbc144dcd337c7d91122f593530fd3ee` |
| 33 | `timeline-timing-math` | `abda35f550b2ac0683cf620d435fbd9110922b76` |
| 34 | `timeline-repeats` | `5c80ea40bc3d961f93fc7b266bf39e4c899f0be5` |
| 35 | `gsap-utils` | `e3cd2c1a67d9e1ecc44a95757a7ad8aaa23ec832` |
| 36 | `range-interpolation` | `bbdfc4ec88495f29f75c0bbb2717c29c742c5a26` |
| 37 | `utility-pipelines-units` | `4f533024bcca13db6a1f577a63ae193ec248f92b` |
| 38 | `utility-collections-random` | `acbb8b31201e3c74d899de9fb3124194b8c8edd8` |
| 39 | `utility-distribute` | `4e261412f5afa4b766e501c9e817a2b2705e9f3d` |
| 40 | `modifiers-snap-wrap` | `42fe9ca399ecb0d503601ab94b2a799b62e4fd62` |

각 커밋은 해당 content 폴더, page handoff와 `src/app/routes.ts` 등록을 포함한다. page-level handoff의 최종 `releaseDecision`은 16/16 `PASS`다.

## 마지막 통합 검증 증거

Core 39 `utility-distribute`를 route에 등록한 상태에서 실행한 결과다.

- `npx tsc --noEmit`: exit 0
- `npm run build`: exit 0, Vite **782 modules**
- 앱 chunks: `UtilityDistributePage-B_QQIMMh.js`, `UtilityDistributePage-BjPMfFsK.css`
- `npm run build-storybook`: exit 0, Storybook **920 modules**
- Storybook chunks: `UtilityDistributePage-CAmznMjb.js`, `UtilityDistributePage-BjPMfFsK.css`
- `git diff --check`: exit 0
- 프로그램 handoff 갱신 중 현재 HEAD에서도 세 build 명령을 재실행해 같은 module 수와 exit 0을 확인했다.

새 세션은 현재 HEAD에서 세 명령을 다시 실행하고 module count와 hash가 달라지면 새 결과를 `current-status.md`에 기록한다.

## Release와 유예 상태

- Core 40개 page handoff: `releaseDecision PASS` 40/40
- `DEFERRED` 문자열이 남은 Core handoff: 34개
- Core 25~40 finding: `PASS 153`, `PASS-STATIC 1`, `DEFERRED 19`, `ADVISORY 5`, `BLOCK 0`
- Core 32 `timeline-playhead`는 browser 실조작 네 항목을 각각 분리했고, 나머지 Core 25~40은 페이지마다 하나의 묶음 `DEFERRED`를 둔다.
- `DEFERRED`는 키보드·실제 reduced-motion 전환·320/390px·control 실조작에만 사용한다. 정적 접근성, coverage, runtime/display, build 문제를 이 상태로 미루면 안 된다.

브라우저 유예는 전체 학습 페이지 제작 뒤 소유자가 일괄 검수하기로 한 `quality-gates.md`의 명시적 규칙이다. 새 Plugin 페이지도 실제 browser backend가 없으면 같은 네 항목만 `DEFERRED`로 둘 수 있다.

## 완료 뒤 발견한 프로그램 수준 drift

### OPEN-CORE-ORDER-001

- 상태: `OPEN`
- 근거: master inventory는 core:20 `reusable-effects`, core:24 `gsap-root-clock`이지만 `src/app/routes.ts` lesson 배열은 두 위치가 뒤바뀌어 있다.
- 영향: route와 page binding은 정상이나 curriculum navigation 순서가 authority와 다르다.
- 다음 조치: Plugin P01 전에 루트 에이전트가 두 lesson entry 순서만 외과적으로 고치고 TypeScript·Vite·Storybook을 실행해 별도 커밋한다.

### ADVISORY-DOC-ID-001

- 상태: `ADVISORY`
- 근거: `timeline-callbacks-pauses.md`와 `timeline-child-placement.md`가 `A11Y-TCP-001`을 각각 사용한다.
- 영향: page-local finding은 식별 가능하지만 전역 검색에서 ID가 충돌한다.
- 다음 조치: 두 handoff를 함께 정리하는 문서 작업에서 한쪽 prefix를 명확한 page prefix로 바꾼다.

## 계속 보존할 안전 규칙

`session-handoff-2026-08-08.md`의 아래 두 절은 과거 진행률이 낡았어도 계속 유효하다.

1. **이 작업에서 실제로 사고가 났던 지점** 9개
2. **공식 문서 자체의 오류 — 되돌리지 마라**

핵심은 다음과 같다.

- 공식 source 요약 한 번으로 coverage를 확정하지 않는다.
- probe에는 버전·입력·target 수·측정법·관찰 결과를 함께 적는다.
- 비결정적 값은 실제 실행과 표시를 위해 두 번 파싱하지 않는다.
- meta section 합계, catalog official 행 수와 공식 분모를 함께 센다.
- 존재하지 않는 import와 미등록 route 링크를 build 전에 찾는다.
- 매 frame 값은 live region에 넣지 않는다.
- 전역 GSAP 상태는 모든 종료 경로에서 원복하며 되돌릴 수 없으면 실행 예제를 만들지 않는다.
- 공식 문서 오류와 공식이 침묵한 실행 차이는 learner evidence에서 공식/probe로 분리한다.

## Core 25~40 공식 오류·실행 차이 인덱스

이 표는 새 세션이 보존 대상을 빠르게 찾기 위한 색인이다. 정확한 source item, 문구와 probe 조건의 authority는 각 page handoff와 catalog다.

| Core | page | 되돌리면 안 되는 내용 |
| ---: | --- | --- |
| 25 | `timeline-callbacks-pauses` | `removePause()` 공식/타입 반환 `self`와 GSAP 3.15.0 실제 `undefined`를 분리한다. |
| 26 | `timeline-basics` | 공통 예제 주석 opacity 0.5/코드 0, `set()`의 두 동치 설명, 일반 Timeline `smoothChildTiming:false`/globalTimeline `true`와 공식 116/probe 9를 유지한다. |
| 27 | `timeline-child-placement` | `shiftChildren()` 인자 이름 `ignoreBeforeTime`/`startAtTime`, normal/global smooth 차이, 음수 child 폭과 position·label probe를 공식 주장으로 승격하지 않는다. |
| 28 | `timeline-labels` | `removeLabel()` 공식 label-time 문장과 실제 `self`, label 퍼센트 position 설명과 실행값 54/-21, 없는 이름이 끝에 새 label을 만드는 동작을 분리한다. |
| 29 | `timeline-inspection` | `getChildren` 공식 주석 3/실행 4, `ignoreBeforeTime` -Infinity/-1e8, `getById` first/last match, `getTweensOf` nested/onlyActive 차이를 유지한다. |
| 30 | `timeline-cleanup` | Timeline `kill()` 공식 반환과 실제 `undefined`, `revert()`가 기록한 시작값을 복원하는 동작, kill 후 held graph와 autoRemove 후 부모 seek 결과를 probe로 분리한다. |
| 31 | `timeline-playback-controls` | `Time instances`/`Timeline instances`, 불필요한 `>`, 없는 `time parameter`, reverse 설명 모순과 `reverse(-1)` 실제 0, `anscestor`/`ancenstor`, tween/box 오기, play/resume 뒤 timeScale 0 유지를 보존한다. |
| 32 | `timeline-playhead` | `totalProgress()` 공식 suppressEvents default true/생략 실행 false, `tweenFromTo()` 공식 immediateRender true/생략·명시 실행 차이, 코드 마침표와 Timeline 문서의 `tween` 표현을 보존한다. |
| 33 | `timeline-timing-math` | repeat -1 `10000000000`, normal/global smooth 차이, paused `endTime()` timeScale 예외, 공식 `[Number \| self]`와 실제 Number-only getter, `globalTime()` 공식 등식/실행 차이와 타입 부재를 유지한다. |
| 34 | `timeline-repeats` | Timeline `repeatDelay` 0/Tween 문서 NaN, Timeline `iteration(value:Number)`/예전 Tween 빈 signature, repeat -1 `10000000000`, yoyo child 역순/reversed false와 parent invalidate 전파를 유지한다. |
| 35 | `gsap-utils` | `unitize` 세미콜론 누락, `checkPrefix`의 `proved`, wrapYoyo 예제의 잘못된 `wrap` 함수명과 두 hub의 다른 wrap 설명을 실행 가능한 의도와 분리한다. |
| 36 | `range-interpolation` | `splitColor` 예제 `[255, 0 128, 1]` comma 누락과 실제 `[255,0,128,1]` 의도를 분리하고 범위 밖·0폭·역방향 결과를 probe로만 둔다. |
| 37 | `utility-pipelines-units` | upstream 세미콜론/`proved`, dedicated `checkPrefix`의 공식 undefined/실제 null, `pipe`의 `transfrom`/`transform` ReferenceError, 빈 pipe identity와 숫자 전제 밖 getUnit/unitize 결과를 official/probe로 분리한다. |
| 38 | `utility-collections-random` | `shuffle` same identity, 두 random reusable overload의 function 반환, `toArray(single)` 동일 객체는 공식이 침묵한 GSAP 3.15.0 probe로만 둔다. |
| 39 | `utility-distribute` | `there 100`, `the there`, `your understand` 원문 오류와 amount 0.01/실제 0.010101, 빈 config, amount+each, random, axis 결과를 공식/probe로 분리한다. |
| 40 | `modifiers-snap-wrap` | 같은 `wrapYoyo` 호출의 공식 red/green 모순과 실제 green, snap radius 밖 원값·2D 객체, wrap/wrapYoyo 최댓값과 음수 index 결과를 유지한다. |

## 다음 단계 identity

Plugin curriculum의 시작점은 `plugin:P01`이다.

- visible slug: `plugins`
- route: `/fundamentals/plugins`
- title: `Plugins: loading, registration, and ownership`
- primary: `source:plugins-overview`
- canonical: `https://gsap.com/docs/v3/Plugins/`
- owned canonical: `plugin:#17` 하나
- prerequisites: `gsap.to()`, JavaScript imports, core Installation, `gsap.registerPlugin()`
- local path decision: `src/content/gsap/plugins/plugins/`
- handoff decision: `docs/handoffs/gsap/plugins/plugins.md`

source catalog의 `plugins-overview` 후보 identity보다 master inventory와 plugin curriculum의 N:1 visible learning identity가 우선한다.

## 병렬 실행 경계

- page worker는 하나의 slug 전용 content 폴더와 handoff만 쓴다.
- root/integrator만 routes, 프로그램 문서, 공유 UI·CSS, build, staging과 commit을 소유한다.
- 같은 shared workspace에서 worker가 미완성 TS import를 작성하는 동안 root는 전체 build를 실행하지 않는다.
- worker가 대상 compile 가능한 체크포인트에서 source 쓰기를 멈춘 뒤 root가 curriculum 순서로 한 페이지씩 route 등록·두 build·handoff PASS·commit한다.
- 첫 wave는 P01·P02·P03을 최대 3 worker가 page-local로 병렬 준비할 수 있지만 integration과 commit은 반드시 P01→P02→P03 순서다.

복사용 전체 프롬프트와 상세 순서는 `current-status.md`를 사용한다.

## 재현 체크

새 세션은 최소한 다음을 확인한다.

```bash
git status --short
git log -5 --oneline
rg -rl DEFERRED docs/handoffs/gsap/core | sort
npx tsc --noEmit
npm run build
npm run build-storybook
```

Core 대응 스크립트는 master inventory의 core 40개 slug마다 content 폴더, core handoff, lazy import와 lesson 등록을 확인해야 한다. 단순 파일 수나 build 성공만으로 40/40을 선언하지 않는다.
