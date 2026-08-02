# GSAP 공식 문서 학습 페이지 제작 workflow

이 workflow는 특정 작업의 진행표가 아니라 GSAP 공식 문서 기반 페이지와 예제를 만들거나 고칠 때마다 반복하는 지속 규칙이다. 세부 계약은 [페이지 형식](./page-format.md)과 [품질 게이트](./quality-gates.md)를 따른다.

1. **공식 문서 읽기** — 공식 URL과 제목, 대조일, 기술 목차, 시그니처·반환값, 전제 지식·의존성·제외 범위를 source manifest로 고정한다.
2. **페이지 분류** — [선택형 페이지 모듈](./page-format.md#선택형-페이지-모듈) 중 필요한 유형을 고른다. 한 페이지가 여러 유형을 결합할 수 있다.
3. **coverage 작성** — 공식 항목마다 로컬 명세 데이터, 섹션, 예제 또는 명시적 제외 사유를 연결한다. 미대응 항목이 있으면 완료로 취급하지 않는다.
4. **학습 흐름 설계** — 초보자 어휘와 멘탈 모델을 먼저 정의하고, 각 예제를 목표 → 조작 → 관찰 → 작동 원리 → 사용처 → 주의점 순서로 설계한다.
5. **구현** — `docs/project-structure.md`의 페이지·섹션·예제·전용 animation hook 경계를 지킨다. 실행 config와 표시 코드는 같은 runtime state에서 파생한다.
6. **독립 전문 검수** — 구현자가 아닌 검수자들이 공식 coverage, runtime/display 동기화, 교육성, 구조·주석, 접근성·motion, build·통합을 각자 판정한다.
7. **수정** — Integrator가 `BLOCK`을 고치고 영향받은 게이트에 재검수를 요청한다. 새 문제나 미해결 문제가 없을 때까지 반복한다.
8. **최종 승인** — Independent Release Reviewer가 manifest, coverage, 검수 결과, TypeScript·Vite 빌드, Storybook 빌드, 브라우저 증거를 대조해 release 여부를 결정한다.

자동화 테스트 코드와 테스트 실행 환경은 추가하지 않는다.
