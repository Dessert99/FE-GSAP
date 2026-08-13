# Timeline cleanup handoff

## 입력 계약

### objective

Timeline 내부 내용을 정리하는 여섯 선택을 하나의 object graph에서 비교하고, container·child·label/event callback·target style 중 무엇이 사라지고 무엇이 남는지 판단하게 한다.

### officialPage

- title: Timeline.autoRemoveChildren + Timeline.clear() + Timeline.kill() + Timeline.killTweensOf() + Timeline.remove() + Timeline.revert()
- canonicalUrl:
  - https://gsap.com/docs/v3/GSAP/Timeline/autoRemoveChildren
  - https://gsap.com/docs/v3/GSAP/Timeline/clear()
  - https://gsap.com/docs/v3/GSAP/Timeline/kill()
  - https://gsap.com/docs/v3/GSAP/Timeline/killTweensOf()
  - https://gsap.com/docs/v3/GSAP/Timeline/remove()
  - https://gsap.com/docs/v3/GSAP/Timeline/revert()
- reviewedAt: 2026-08-08
- category: Fundamentals > Timeline
- slug: timeline-cleanup
- sourcePageIds: primary source:timeline-auto-remove-children; related source:timeline-clear, source:timeline-kill, source:timeline-kill-tweens-of, source:timeline-remove, source:timeline-revert

Source Curator가 master-page-inventory의 core:30 소유권과 위 여섯 canonical을 구현 전에 확정했다.

### localPage

- localPath: src/content/gsap/fundamentals/timeline-cleanup/
- route: /fundamentals/timeline-cleanup

Content Architect가 curriculum page 30의 CM + CI + PC, “무엇을 보존하는가”라는 질문, 단일 fixture 전후 snapshot 표현을 구현 전에 확정했다.

### sourceManifest

timeline-cleanup.catalog.ts가 공식 item 39개와 GSAP 3.15.0 probe 6개의 전체 문장·source·section 귀속 authority다.

| source | 공식 item | sourceStatus |
| --- | ---: | --- |
| source:timeline-auto-remove-children | 3 | verified |
| source:timeline-clear | 6 | verified |
| source:timeline-kill | 6 | verified |
| source:timeline-kill-tweens-of | 8 | verified |
| source:timeline-remove | 6 | verified |
| source:timeline-revert | 10 | verified |
| 합계 | 39 | verified |

| sourceItemIds | sourceLocation | sourceStatus |
| --- | --- | --- |
| AR-01~03 | autoRemoveChildren signature·Details·기본값/globalTimeline 예외 | verified |
| CL-01~06 | clear signature·Parameters·Returns·Details | verified |
| KL-01~06 | kill signature·Returns·Details·경고·공식 예제 | verified |
| KT-01~08 | killTweensOf signature·Parameters 3개·Returns·Details·예제 2개 | verified |
| RM-01~06 | remove signature·Parameters·Returns·Details·예제 2개 | verified |
| RV-01~10 | revert added version·signature·Returns·Details·The problem·The solution | verified |

대조 1회차는 공식 렌더 문서에서 각 페이지의 heading, signature, Parameters, Returns, Details, code example을 직접 읽었다. 대조 2회차는 curl로 같은 canonical의 raw HTML을 다시 받아 main/theme-doc-markdown 구간의 heading·parameter·code token을 표적 추출했다. 여섯 페이지 모두 title과 canonical도 raw meta에서 재확인했다.

### sourceBlockers

none.

- 공식 Timeline.kill() 문서는 signature kill() : Timeline과 Returns Timeline Self를 게시한다.
- GSAP 3.15.0 Node 실행에서 Timeline.kill()의 실제 반환은 undefined다. 공식 오류를 고쳐 쓰지 않고 KL-01·KL-03과 TC-P4로 양쪽을 보존한다.
- 공식 문서는 remove/clear/kill 뒤 held reference 내부 graph, autoRemoveChildren 뒤 부모 seek 결과를 밝히지 않는다. 이 사실은 공식 item이 아니라 probe item으로만 쓴다.
- revert는 숫자 0이 아니라 animation이 기록한 시작 상태를 복원한다. 기존 세션의 공식 침묵 항목을 다시 측정해 TC-P5로 보존한다.

### moduleSelection

- concept/guide — 여섯 API를 이름이 아니라 container·child graph·target state 보존 질문으로 재배열한다.
- callable method — remove, clear, killTweensOf, kill, revert의 signature·인자·반환·호출 시점을 보존한다.
- class/instance — Timeline의 부모 연결, held reference, child 수, label, event callback, 폐기 수명을 설명한다.
- property catalog — autoRemoveChildren의 Boolean 계약, 기본값과 globalTimeline 예외를 보존한다.

### learnerFlow

1. container, child graph, target state 세 층을 정의한다.
2. remove와 clear가 Timeline을 남기는 구조 편집임을 비교한다.
3. killTweensOf의 target → property → onlyActive 범위를 좁힌다.
4. kill과 revert가 모두 폐기하지만 target 복원 여부가 다름을 확인한다.
5. autoRemoveChildren의 완료 배출과 부모 seek/reverse 대가를 확인한다.
6. Timeline mutation과 context/React lifecycle cleanup의 경계를 연결한다.

### coverageMap

| sourceItemId | localEvidence | localStatus |
| --- | --- | --- |
| RM-01 | RemoveClearSection methodRows | covered |
| RM-02 | RemoveClearSection remove 첫 문단 | covered |
| RM-03 | RemoveClearSection methodRows와 remove 첫 문단 | covered |
| RM-04 | RemoveClearSection remove 둘째 문단 | covered |
| RM-05 | RemoveClearSection 공식 단일 예제 문장 | covered |
| RM-06 | RemoveClearSection 공식 배열 예제 문장 | covered |
| CL-01 | RemoveClearSection methodRows | covered |
| CL-02 | RemoveClearSection clear 첫 문단 | covered |
| CL-03 | RemoveClearSection clear 첫 문단과 lab labels control | covered |
| CL-04 | RemoveClearSection methodRows와 lab 반환 행 | covered |
| CL-05 | RemoveClearSection event callback 문단과 lab snapshot | covered |
| CL-06 | RemoveClearSection eventCallback null 문장 | covered |
| KT-01 | KillTweensSection Parameters 표와 code | covered |
| KT-02 | KillTweensSection 도입·범위 설명 | covered |
| KT-03 | KillTweensSection Parameters targets 행 | covered |
| KT-04 | KillTweensSection Parameters props 행과 lab property control | covered |
| KT-05 | KillTweensSection Parameters onlyActive 행과 lab checkbox | covered |
| KT-06 | KillTweensSection 마지막 note와 lab 반환 행 | covered |
| KT-07 | KillTweensSection 첫 code 줄 | covered |
| KT-08 | KillTweensSection 둘째 code 줄 | covered |
| KL-01 | KillRevertSection 공식/실행 차이 warning | covered |
| KL-02 | KillRevertSection kill 첫 문단 | covered |
| KL-03 | KillRevertSection 공식/실행 차이 warning | covered |
| KL-04 | KillRevertSection kill 첫 문단 | covered |
| KL-05 | KillRevertSection pause 대안 | covered |
| KL-06 | KillRevertSection kill 공식 code | covered |
| RV-01 | KillRevertSection revert 첫 문단 | covered |
| RV-02 | KillRevertSection revert 설명과 code | covered |
| RV-03 | KillRevertSection revert 첫 문단·lab snapshot | covered |
| RV-04 | KillRevertSection 반환 warning·lab 반환 행 | covered |
| RV-05 | KillRevertSection progress(0) 문제 첫 문장 | covered |
| RV-06 | KillRevertSection 문제 서사와 revert code | covered |
| RV-07 | KillRevertSection progress(0) 문제 첫 문단 | covered |
| RV-08 | KillRevertSection media query 문장 | covered |
| RV-09 | KillRevertSection progress(0)과 revert 역할 구분 | covered |
| RV-10 | KillRevertSection GSAP 3.11 설명과 code | covered |
| AR-01 | AutoRemoveSection 공식 계약 | covered |
| AR-02 | AutoRemoveSection 공식 계약과 lab auto mode | covered |
| AR-03 | AutoRemoveSection 일반/global 기본값 문장 | covered |
| TC-P1 | RemoveClearSection warning·CleanupScopeLab 전후 snapshot | covered (probe) |
| TC-P2 | KillTweensSection property 일부 설명 | covered (probe) |
| TC-P3 | KillTweensSection onlyActive 설명 | covered (probe) |
| TC-P4 | KillRevertSection 공식/실행 차이 warning·lab 실제 반환 | covered (probe) |
| TC-P5 | KillRevertSection 시작값 note·lab kill/revert snapshot | covered (probe) |
| TC-P6 | AutoRemoveSection 실행 대가·lab auto mode | covered (probe) |

TC-P1~TC-P6은 공식 item 분모 39에 포함하지 않는다.

### relatedPages

- timeline-inspection — cleanup 전후 object graph 조회를 소유한다.
- find-stop-animations — 잃어버린 Tween 참조를 전역에서 찾고 멈추는 흐름을 소유한다.
- gsap-context — UI 영역 전체의 되돌리기와 정리를 소유한다.
- react-use-gsap — React lifecycle cleanup을 소유한다.

## 구현 계약

### exactFiles

create:

- src/content/gsap/fundamentals/timeline-cleanup/TimelineCleanupPage.tsx
- src/content/gsap/fundamentals/timeline-cleanup/TimelineCleanupPage.css
- src/content/gsap/fundamentals/timeline-cleanup/timeline-cleanup.meta.ts
- src/content/gsap/fundamentals/timeline-cleanup/timeline-cleanup.catalog.ts
- src/content/gsap/fundamentals/timeline-cleanup/components/PageCoverage/PageCoverage.tsx
- src/content/gsap/fundamentals/timeline-cleanup/components/SectionHeading/SectionHeading.tsx
- src/content/gsap/fundamentals/timeline-cleanup/sections/PreserveScopeSection/PreserveScopeSection.tsx
- src/content/gsap/fundamentals/timeline-cleanup/sections/RemoveClearSection/RemoveClearSection.tsx
- src/content/gsap/fundamentals/timeline-cleanup/sections/KillTweensSection/KillTweensSection.tsx
- src/content/gsap/fundamentals/timeline-cleanup/sections/KillRevertSection/KillRevertSection.tsx
- src/content/gsap/fundamentals/timeline-cleanup/sections/AutoRemoveSection/AutoRemoveSection.tsx
- src/content/gsap/fundamentals/timeline-cleanup/sections/BoundariesSection/BoundariesSection.tsx
- src/content/gsap/fundamentals/timeline-cleanup/examples/CleanupScopeLab/CleanupScopeLab.tsx
- src/content/gsap/fundamentals/timeline-cleanup/examples/CleanupScopeLab/CleanupScopeLab.css
- src/content/gsap/fundamentals/timeline-cleanup/examples/CleanupScopeLab/useCleanupScopeAnimation.ts
- docs/handoffs/gsap/core/timeline-cleanup.md

modify:

- src/app/routes.ts — lazy page import와 `/fundamentals/timeline-cleanup` lesson을 등록한다.

### exampleContracts

#### CleanupScopeLab

- goal: 같은 Timeline fixture에 cleanup 하나씩 적용하고 container, child, label/event callback, target 값·inline style의 전후를 한 snapshot으로 비교한다.
- question: 이 cleanup을 실행하면 무엇이 사라지고 무엇이 남나요?
- representation: target 하나 + 여섯 mode radio + mode별 최소 control + 실제 GSAP 전후 표 + 실행 코드 패널.
- controls: cleanup radio 6개, clear labels checkbox, killTweensOf property select와 onlyActive checkbox, 실행 button, reset button.
- runtimeSource: useCleanupScopeAnimation.ts
- sourcePath: examples/CleanupScopeLab/useCleanupScopeAnimation.ts
- runtimeOwnership: hook이 selector, cleanup mode, 공식 인자, paused parent/Timeline/Tween, 실제 cleanup 분기, 반환 identity, DOM/Timeline 전후 snapshot을 소유한다.
- displayOwnership: TSX가 descriptor를 호출 문법으로만 직렬화하고 native controls, target preview, snapshot table, 네 학습 패널을 그린다. TSX는 gsap을 import하거나 결과를 재계산하지 않는다.
- accessibility: native radio·checkbox·select·button, fieldset/legend, table caption과 row/column headers, 이산 status 한 개, target은 장식이라 aria-hidden.
- motion: none — 자동 재생·CSS transition이 없고 paused Timeline을 사용자 click에서 즉시 render한다. prefers-reduced-motion에서도 같은 정적 snapshot을 제공한다.

### nonGoals

- 전역 gsap.killTweensOf()의 registry 범위를 다시 소유하지 않는다.
- gsap.context(), useGSAP() cleanup, matchMedia lifecycle을 다시 설명하지 않는다.
- Timeline playback, playhead, label 탐색, inspection query를 다시 소유하지 않는다.
- 자동화 테스트 코드나 테스트 환경을 추가하지 않는다.

### preserve

- Timeline.kill() 공식 반환 오류와 GSAP 3.15.0 실제 undefined를 둘 다 유지한다.
- revert()는 0이 아니라 animation이 기록한 시작값을 복원한다는 실행 차이를 유지한다.
- 일반 Timeline autoRemoveChildren 기본 false와 globalTimeline true 예외를 유지한다.
- clear()는 child callback은 제거하지만 Timeline event callback은 보존한다는 구분을 유지한다.
- runtime descriptor·GSAP 호출·snapshot과 표시 코드의 단일 source를 유지한다.

## 검증 계약

### probeEvidence

Node 22.21.0 + GSAP 3.15.0에서 동일 fixture를 직접 실행했다.

- 공통 시작 snapshot: children 2(Tween+callback), label scene, x 80, opacity 0.625, event callback 유지.
- remove: children 2→1, animated child 분리, parent/label/target 값 유지, return self.
- clear(true): children 0, labels 0, event callback·target 값 유지, return self.
- clear(false): children 0, label scene·event callback·target 값 유지, return self.
- killTweensOf(target, x, false) 뒤 progress 1: Tween child 유지, x 80 고정, opacity 1까지 진행, return self.
- killTweensOf(target, all, false) 뒤 progress 1: Tween child 제거, x 80·opacity 0.625 고정, return self.
- onlyActive true 뒤 progress 1: paused Timeline의 Tween은 유지되어 x 160·opacity 1까지 진행.
- kill: 부모에서 분리, held reference의 children 2와 target 중간값 유지, 실제 return undefined.
- revert: 부모에서 분리, stylesheet 시작 x 0·opacity 0.25와 inline style 없음으로 복원, return self.
- autoRemoveChildren:true: 완료 뒤 children 0, parent seek 0 뒤 target은 x 160·opacity 1 완료값 유지.

### verifiedPerspectives

- Official Coverage
- Learning Transformation
- Runtime/Display Sync
- Pedagogy
- Structure/Comment
- Accessibility/Motion static
- Cross-page Consistency
- Build/Integration

### findings

| ID | status | evidence | impact | requiredAction |
| --- | --- | --- | --- | --- |
| SRC-TC-001 | PASS | 렌더 문서 + raw HTML 2회 대조, catalog 공식 39행 | 여섯 canonical 100% coverage | none |
| LEARN-TC-001 | PASS | 결정표 → 단일 snapshot → 네 cleanup 묶음 → 경계 흐름 | 단순 번역 대신 보존 범위 멘탈 모델 제공 | none |
| SYNC-TC-001 | PASS | useCleanupScopeAnimation이 descriptor·실행·snapshot 소유, TSX는 formatter만 소유 | runtime/display 분리 및 동기화 | none |
| PED-TC-001 | PASS | container·child graph·target state 선행 정의와 조작 전 관찰 안내 | 초보자 질문·관찰·원리·사용처 충족 | none |
| STRUCT-TC-001 | PASS | page/section/example/runtime 경계와 examples 선언·실행 단계 한국어 주석 정적 감사 | 구조·주석 계약 충족 | none |
| A11Y-TC-001 | PASS | native controls, label/legend/caption/header, 이산 status, 자동 모션 없음 | 정적 접근성·motion 계약 충족 | none |
| A11Y-TC-002 | DEFERRED → PASS | 소유자 일괄 브라우저 검수 정책 | 키보드 포커스·320/390px layout·실제 control 조작 확인 대기 | route 등록 뒤 브라우저 검수 |
| CROSS-TC-001 | PASS | 관련 네 route가 routes.ts에 등록됨을 정적 확인, 소유권 문장 분리 | 미등록 내부 링크 없음 | none |
| BUILD-TC-001 | PASS | timeline-cleanup 파일만 지정한 strict TypeScript 검사 exit 0 | 전용 폴더 타입 건전성 확인 | none |
| REVIEW-TC-001 | PASS | Critical 0, Important 2건(killTweensOf 관찰·handoff 상태)과 Minor 1건(실행 단계 주석) 반영 | 독립 감사 완료 | none |
| BUILD-TC-002 | PASS | route 등록 뒤 root app·Storybook build exit 0 | 통합 검증 완료 | none |

### verificationEvidence

- 공식 source 수: 6 / 6.
- catalog 공식 행: 39.
- catalog probe 행: 6.
- meta section sourceItems 합: 39.
- meta officialSourceItems 분모: 39.
- duplicate source item ID: 0.
- timeline-cleanup 전용 strict TypeScript 검사: PASS.
- TSX의 gsap import: 0; GSAP import는 useCleanupScopeAnimation.ts 하나뿐.
- role=status: 이산 실행·reset 상태 한 개; 매 frame live 값 없음.
- 자동 재생: 없음.
- scope 외 수정: route 등록 외 없음.
- build: 저장소 root `npm run build` exit 0, `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` exit 0.
- review: killTweensOf 뒤 progress 1 snapshot으로 x만/all/onlyActive 결과를 각각 구별하고 handoff 전후 값을 실제 fixture와 일치시켰다.

### releaseDecision

`PASS` — 기존 browser-only finding은 2026-08-13 소유자 승인으로 종료했다.

### browserReviewClosure

- status: `PASS`
- approvedAt: `2026-08-13` (Asia/Seoul)
- approvalBasis: 저장소 소유자가 기존 browser-only finding을 완료로 간주하도록 승인했다.
- evidenceBoundary: 실제 브라우저 실조작 증거는 별도로 생성하지 않았으며, 이 `PASS`는 소유자 승인에 따른 문서상 종료다.

## 2026-08-13 재감사

- `SRC-TC2` — **PASS**: autoRemoveChildren·clear·kill·killTweensOf·remove·revert 공식 페이지를 다시 조회했다.
- `RDS-TC2` — **PASS**: CleanupScopeLab의 action descriptor·반환 관찰·코드 분기를 정적으로 대조해 BLOCK 없음.
- `PED-TC2` — **ADDRESSED**: 첫 화면의 `source`·`실행 probe`를 정리 방법별 핵심 동작과 직접 확인한 경계로 바꿨다.
- `BROWSER-TC2` — **DEFERRED**: 실제 control·키보드·반응형·motion 조작은 수행하지 않았다.
- Storybook: `N/A` — c309e13에서 의도적으로 삭제됐다.
- releaseDecision: `PASS with DEFERRED` — 정적 BLOCK은 없고 브라우저 관점만 `DEFERRED`다.

## 2026-08-13 최종 교차검토

- `RDS-TC3` — **PASS**: CleanupScope 표시 코드에 scope·target 조회, null guard와 종료 시 parent/inline style cleanup을 포함해 재검증했다.
- Static BLOCK: 없음. Browser: 사용자 승인 전 실조작을 수행하지 않아 `DEFERRED`. Storybook: c309e13에서 삭제되어 `N/A`.
- overallDecision: `NOT VERIFIED`
- releaseDecision: `NOT VERIFIED`
