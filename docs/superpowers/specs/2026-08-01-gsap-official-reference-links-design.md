# GSAP 공식 문서 링크 설계

## 목적

웹에서 애니메이션 결과를 확인하다가 관련 GSAP 공식 설명으로 바로 이동할 수 있게 한다. 화면에는 소스 코드를 다시 노출하지 않으며, 링크는 데모보다 시각적으로 앞서지 않는 보조 학습 수단으로 둔다.

## 범위

- `gsap.to()` 페이지 제목에 메서드 공식 문서 링크를 제공한다.
- 현재 여섯 개 예제마다 가장 가까운 GSAP 공식 문서 링크를 제공한다.
- 한 예제가 여러 공식 자료를 필요로 할 수 있으므로 데모는 링크 배열을 받는다.
- 링크는 새 탭에서 열고 외부 링크임을 텍스트와 접근 가능한 이름으로 알린다.
- 공식 문서 링크를 위한 새 아이콘 패키지나 기타 의존성은 추가하지 않는다.

## 구조

### 공용 링크 UI

`src/components/learning/OfficialDocsLink.tsx`가 링크의 마크업, 새 탭 동작, 접근성 속성과 외형을 담당한다.

```ts
export type OfficialReference = {
  label: string
  href: string
}

type OfficialDocsLinkProps = OfficialReference
```

공용 컴포넌트는 GSAP 문서 URL을 추론하거나 조합하지 않는다. 공식 사이트의 경로가 문서 종류별로 다르기 때문에 URL 생성 규칙을 만들면 오히려 깨지기 쉽다.

### 레슨별 링크 데이터

`src/fundamentals/gsap-to/gsap-to.references.ts`가 `gsap.to()` 레슨에서 사용하는 이름과 정확한 URL을 관리한다. 이후 레슨도 자기 폴더 안에 같은 역할의 파일을 두어, 하나의 거대한 전역 링크 목록을 만들지 않는다.

### 데모 연결

`DemoPanel`은 선택적인 `references?: OfficialReference[]`를 받는다. 링크가 없으면 기존 화면과 동일하고, 링크가 있으면 다시 재생 버튼과 함께 헤더의 보조 동작 영역에 표시한다.

데이터 흐름은 다음과 같다.

```text
레슨별 references 파일
  → GsapToPage
    → DemoPanel references
      → OfficialDocsLink
```

## 현재 링크 매핑

| 위치 | 링크 이름 | 공식 문서 |
| --- | --- | --- |
| 페이지 제목 | `gsap.to()` | `https://gsap.com/docs/v3/GSAP/gsap.to%28%29/` |
| 기본 이동 | `x · CSS` | `https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/` |
| 여러 속성 | `CSS 속성` | `https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/` |
| 상대값 | `상대값` | `https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#relative-values` |
| 함수 기반 값 | `함수 기반 값` | `https://gsap.com/docs/v3/GSAP/gsap.to%28%29/#function-based-values` |
| 여러 타깃 | `stagger` | `https://gsap.com/resources/getting-started/Staggers/` |
| 카드 상태 피드백 | `React · useGSAP()` | `https://gsap.com/resources/React/` |

GSAP은 개별 CSS 속성마다 별도 공식 페이지를 제공하지 않으므로 `x`, `rotation`, `scale` 등은 공식 CSS 문서로 연결한다.

## 화면과 반응형

- 링크는 작은 pill 형태로 표시하되 기존 강조색과 테두리 토큰을 재사용한다.
- 데스크톱에서는 공식 문서 링크와 다시 재생 버튼을 한 그룹으로 둔다.
- 좁은 화면에서는 동작 그룹이 줄바꿈되며 데모 설명이나 재생 버튼과 겹치지 않는다.
- 외부 링크 표시는 텍스트 기호 `↗`를 사용하고 스크린 리더에서는 장식으로 숨긴다.

## 테스트

- `OfficialDocsLink`가 전달받은 URL과 라벨을 렌더링하고 안전한 새 탭 속성을 갖는지 확인한다.
- `DemoPanel`이 복수의 공식 자료를 렌더링할 수 있고, 자료가 없을 때 링크 영역을 만들지 않는지 확인한다.
- `GsapToPage`가 페이지 및 여섯 예제에 레슨별 참조 데이터를 연결하는지 확인한다.
- 전체 테스트와 프로덕션 빌드로 기존 재생 및 페이지 렌더링 동작의 회귀가 없는지 확인한다.

## 제외 사항

- 외부 링크의 런타임 상태 검사
- 공식 문서 내용을 앱 안에 복사하거나 요약해서 표시하는 기능
- URL 자동 생성기와 전역 레퍼런스 레지스트리
- 아직 구현되지 않은 다른 GSAP 레슨의 링크 선등록
