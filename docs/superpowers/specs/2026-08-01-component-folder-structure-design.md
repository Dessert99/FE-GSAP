# 공용 컴포넌트 폴더 구조 설계

## 목표

공용 컴포넌트를 역할별 영역과 컴포넌트별 폴더로 나눠 구현, 스타일, 테스트, Storybook 스토리를 함께 찾을 수 있게 한다.

## 구조

```text
src/components/
├── demo/
│   ├── DemoPanel/
│   └── OfficialDocsLink/
├── navigation/
│   ├── FloatingToc/
│   └── TrackTabs/
└── storybook.test.ts
```

- 각 컴포넌트 폴더에 해당하는 `.tsx`, `.css`, `.test.tsx`, `.stories.tsx`를 함께 둔다.
- `OfficialDocsLink`는 현재 데모 페이지와 `DemoPanel`에서 사용하는 공식 자료 액션이므로 `demo`에 둔다.
- `FloatingToc`와 `TrackTabs`는 화면 이동을 담당하므로 `navigation`에 둔다.
- 배럴 `index.ts`는 만들지 않고 사용 위치에서 구현 파일을 직접 import한다.

## 검증

- 기존 컴포넌트 테스트와 앱 빌드가 그대로 통과한다.
- Storybook의 분류가 `Components/Demo`, `Components/Navigation`으로 표시된다.
- Storybook 정적 빌드와 카탈로그 계약 테스트가 통과한다.
