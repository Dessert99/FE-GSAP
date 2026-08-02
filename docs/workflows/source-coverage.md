# 공식 내용 coverage 계약

선택한 공식 기술 페이지의 모든 내용을 source item으로 기록하고 로컬 근거에 연결한다.

## Source manifest

페이지의 `<slug>.meta.ts` 또는 handoff에 다음을 기록한다.

- 공식 제목, canonical URL, 마지막 대조일
- 공식 기술 목차
- 본문의 기술 주장과 원리
- 시그니처, 오버로드, 인자, 반환값
- 속성·메서드의 타입, 기본값, 허용값, 특수값
- note, tip, warning, caveat, edge case, 제약
- 공식 코드 예제에서만 드러나는 동작
- 전제 지식과 의존성
- 관련 공식 페이지와 현재 페이지가 설명할 경계

source 확인 상태와 로컬 구현 상태를 분리한다.

```text
id
officialItem
sourceLocation
sourceStatus: verified | blocked-source

sourceItemId
localEvidence[]
localStatus: planned | covered
```

## 제외 범위

광고, 계정, 커뮤니티, 마케팅, 중복 내비게이션 같은 비기술 영역만 제외할 수 있다. 기술 내용은 드물거나 어렵거나 다른 페이지와 겹쳐도 현재 페이지의 설명 경계와 관련 링크를 남긴다.

## 완료 판정

- 모든 기술 item의 `sourceStatus`가 `verified`이고 `localStatus`가 `covered`다.
- 공식 예제의 추가 동작도 별도 item으로 대조한다.
- 공식 사실이 불명확한 item은 추측하지 않고 `sourceStatus: blocked-source`로 둔다.
- `blocked-source`, `planned`, 미대응 item이 있으면 100% coverage 또는 완료로 표시하지 않는다.
