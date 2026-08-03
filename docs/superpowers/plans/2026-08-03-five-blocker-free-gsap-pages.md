# Blocker-free GSAP 학습 페이지 5개 구현 계획

1. inventory 순서로 source manifest와 blocker를 확정한다. → 검증: 다섯 handoff에 stable ID, canonical URL, coverage target이 있다.
2. 각 페이지의 learner flow와 전용 example contract를 고정한다. → 검증: runtime/display ownership, 접근성, reduced-motion 경계가 기록된다.
3. 페이지별 폴더와 route를 외과적으로 추가한다. → 검증: page TSX는 조립만 하고 section/example/runtime이 분리된다.
4. 페이지 하나가 끝날 때마다 type/build와 diff를 확인하고 commit한다. → 검증: unrelated untracked inventory가 commit에 포함되지 않는다.
5. 전체 Vite·Storybook·Browser 검증과 독립 review를 수행한다. → 검증: handoff finding과 releaseDecision에 실제 evidence가 남는다.
