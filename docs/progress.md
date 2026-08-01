# 진행 현황

이 문서는 [프로젝트 계획](./project-plan.md)을 기준으로 실제 구현 상태만 추적한다.

## 현재 상태

- 마지막 업데이트: 2026-08-01
- 완료: 새 3트랙 구조, 클라이언트 route 전환, 고정형 원형 목차, 웹 코드 표시 제거, CSS 책임 분리, Vitest 환경, 첫 `gsap.to()` 수직 슬라이스, 예제별 GSAP 공식 문서 링크, 프로젝트 구조 문서와 필수 참조 연결, 공용 컴포넌트 Storybook
- 진행 중: `gsap.to()` 기본 문법의 공식 API와 상황별 예제 범위 확장
- 다음: `gsap.to()` 예제 매트릭스를 완료한 뒤 `gsap.from()` 시작

## 앱 기반

- [x] Vite + React + TypeScript + GSAP 실행 환경
- [x] Vitest + React Testing Library 테스트 환경
- [x] `기본` / `패턴` / `실무` 상단 트랙 탭
- [x] route 단위 lazy loading
- [x] 고정형 원형 목차
- [x] 목차 선택 후 자동 접기
- [x] 목차 원형 버튼·바깥 클릭·`Escape` 닫기
- [x] 다시 재생 시 데모 영역만 remount
- [x] 공식 자료 공용 링크 UI와 레슨별 URL 관리
- [x] 전역·앱·공통 컴포넌트·레슨 CSS 분리
- [x] `?raw`·`CodeBlock`·`prism-react-renderer` 제거
- [x] Storybook React·Vite 실행 환경
- [x] `DemoPanel`·`FloatingToc`·`OfficialDocsLink`·`TrackTabs` 스토리

## 기본 트랙

### `gsap.to()`

- [x] 공식 API 항목과 상황별 예제 섹션 분리
- [x] 기본 이동
- [x] 여러 속성 동시 변경
- [x] 상대값
- [x] 함수 기반 값
- [x] 여러 타깃과 `stagger`
- [x] 이벤트 기반 카드 상태 피드백과 `contextSafe`
- [x] 메서드와 여섯 예제의 관련 GSAP 공식 문서 연결
- [ ] 나머지 공식 옵션과 값 형태 매트릭스 정리
- [ ] 자주 만나는 상황별 예제 확장

### 다음 레슨

- [ ] `gsap.from()`
- [ ] `gsap.fromTo()`
- [ ] `gsap.set()`
- [ ] tween 핵심 옵션
- [ ] 값 표현과 transform
- [ ] ease
- [ ] timeline
- [ ] callbacks와 keyframes
- [ ] stagger
- [ ] utilities와 helpers
- [ ] ScrollTrigger
- [ ] interaction 플러그인
- [ ] SVG와 text 플러그인
- [ ] 고급 플러그인과 접근성

## 패턴 트랙

- [ ] 첫 조합 패턴 설계
- [ ] 연속 입력과 애니메이션 중단
- [ ] 반응형 timeline과 reduced motion
- [ ] 상태 전환과 cleanup

## 실무 트랙

- [ ] 첫 페이지 또는 컴포넌트 설계
- [ ] 반응형·키보드·포커스·reduced motion 검증 기준 확정

## 검증 현황

- [x] `npm test` — 7개 테스트 파일, 15개 테스트 통과
- [x] `npm run build` — TypeScript 및 Vite 프로덕션 빌드 성공
- [x] `npm run build-storybook` — Storybook 10.5.5 정적 빌드 성공
- [x] Storybook 인덱스 검증 — 공용 컴포넌트 4개, 스토리 9개 등록
- [ ] Storybook 브라우저 시각 검증 — 현재 세션에 연결 가능한 브라우저 없음
- [ ] 데스크톱 브라우저 시각 검증 — 현재 세션에 연결 가능한 브라우저 없음
- [ ] 모바일 브라우저 시각 검증 — 현재 세션에 연결 가능한 브라우저 없음
