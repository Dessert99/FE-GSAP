# 공용 컴포넌트 Storybook 설계

## 목표

`src/components`의 공용 UI를 앱과 분리된 Storybook에서 확인하고 상태별로 조작할 수 있게 한다.

## 구성

- React와 Vite용 Storybook을 최소 구성으로 추가한다.
- `.storybook/preview.ts`에서 `global.css`와 `app.css`를 불러와 앱과 같은 디자인 토큰과 공용 스타일을 적용한다.
- 스토리는 컴포넌트 파일 옆에 두고 `Components/Demo`, `Components/Learning`으로 분류한다.
- Storybook이 생성하는 샘플 컴포넌트와 소개 페이지는 추가하지 않는다.

## 스토리 범위

- `DemoPanel`: 기본 상태와 공식 자료 링크가 있는 상태
- `FloatingToc`: 현재 레슨이 지정된 목차와 열기·닫기 상호작용
- `OfficialDocsLink`: 기본 공식 문서 링크
- `TrackTabs`: 기본·패턴·실무 탭과 현재 트랙 상태

## 검증

- 기존 테스트와 앱 빌드가 유지된다.
- Storybook 정적 빌드가 성공한다.
- 브라우저에서 네 컴포넌트의 스토리와 주요 상호작용을 확인한다.
