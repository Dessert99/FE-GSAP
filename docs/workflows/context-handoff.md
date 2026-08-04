# GSAP 페이지 컨텍스트 handoff

각 공식 페이지는 아래 필드를 같은 이름으로 남겨 다른 컨텍스트가 대화 기억 없이 작업을 재현하게 한다.

## 입력 계약

```text
objective
officialPage: title, canonicalUrl, reviewedAt, category, slug
localPage: localPath, route
sourceManifest[]: id, officialItem, sourceLocation, sourceStatus
sourceBlockers[]
moduleSelection[]
learnerFlow[]
coverageMap[]: sourceItemId, localEvidence, localStatus
relatedPages[]
```

## 구현 계약

```text
exactFiles: create[], modify[]
exampleContracts[]: name, goal, question, representation, controls,
  runtimeSource, sourcePath, runtimeOwnership, displayOwnership,
  accessibility, motion
nonGoals[]
preserve[]
```

## 검증 계약

```text
verifiedPerspectives[]
findings[]: ID, status, evidence, impact, requiredAction
verificationEvidence[]
releaseDecision: PASS | BLOCK
```

정적 설명처럼 해당하지 않는 `controls`, `runtimeSource`, `sourcePath`, `motion`은 생략하지 말고 `none`과 이유를 기록한다.

Source Curator가 `officialPage`를, Content Architect가 `localPage`와 `moduleSelection`을 구현 전에 확정한다. 이어받는 컨텍스트는 category, slug, localPath, route를 새로 정하지 않는다.

자유 형식 요약으로 필드를 대체하지 않는다. 이어받는 컨텍스트는 handoff와 저장소 source를 먼저 대조하고, 불일치가 있으면 구현보다 source와 coverage를 우선 수정한다.
