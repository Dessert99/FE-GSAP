# GSAP 학습 페이지 형식

페이지는 공통 계약을 모두 충족하고, 공식 페이지 성격에 맞는 모듈을 하나 이상 선택한다. 공식 페이지가 여러 성격을 가지면 모듈을 결합한다.

## 공통 계약

### Source와 coverage

- `source-coverage.md`에 따라 공식 페이지의 모든 기술 내용을 기록한다.
- source manifest의 각 항목을 로컬 명세, 섹션, 예제 또는 warning에 연결한다.
- 공식 문서가 바뀌면 대조일만 갱신하지 말고 manifest와 coverage mapping을 다시 검토한다.

### 초보자 설명

- `learning-design.md`에 따라 공식 내용을 단순 번역하지 않고 초보자 흐름으로 재구성한다.
- 처음 나오는 용어를 실행 전에 쉬운 문장으로 정의하고, 값·대상·시간·생명주기의 관계를 멘탈 모델로 설명한다.
- 예제는 `목표`, `조작`, `관찰할 변화`, `작동 원리`, `실제 사용처`, `주의점`, `sourcePath`를 갖는다.
- 한 예제는 한 대상과 한 변화에 집중한다. 비교는 같은 대상의 이전·현재 상태를 단계적으로 보여주되, multiple targets나 stagger 자체가 개념의 본질일 때만 다중 대상을 허용한다.

### 폴더와 실행 경계

- 공식 페이지 하나는 `src/content/gsap/<분류>/<slug>/` 하나에 대응한다. 페이지 TSX는 헤더와 섹션 조립만 담당한다.
- 공식 목차의 학습 단위는 `sections/`, 페이지 안에서만 재사용하는 UI는 `components/`, 독립 실행 예제는 `examples/<ExampleName>/`에 둔다.
- 실행 예제에는 `<ExampleName>.tsx`, `<ExampleName>.css`와 예제 성격에 맞는 최소 실행 source를 둔다.
- animation 생명주기는 `use<ExampleName>Animation.ts`, 상태형 비애니메이션 utility는 `use<ExampleName>Runtime.ts`, 순수 호출은 `<ExampleName>.example.ts`를 사용한다. 실행 코드가 없으면 `runtimeSource: none`으로 두고 runtime 파일을 만들지 않는다.
- runtime source는 실제 GSAP 호출, 입력 state, 정규화 config·descriptor, 결과·관찰 상태와 필요한 생명주기를 소유한다.
- 예제 TSX는 controls, preview, runtime state 기반 code serializer, `propertyDetails`, `changes`, `watchFor`, explanation을 소유한다. serializer는 실제 runtime config나 discriminated descriptor 값을 코드 문법으로만 포맷한다.
- `sourcePath`는 Hook으로 고정하지 않는다. 실행 source가 없으면 정적 코드를 소유한 TSX를 가리키거나 `none`과 이유를 기록한다.
- runtime source에는 제목·설명·속성 표·관찰점 같은 학습 패널을 넣지 않는다. `.guide.md` 복제로 실행 경계를 대신하거나 여러 예제를 공용 generic runtime에 합치지 않는다.

## 선택형 페이지 모듈

| 모듈 | 반드시 다룰 내용 |
| --- | --- |
| 개념·가이드 | 해결하는 문제, 핵심 멘탈 모델, 적용 경계, 다음 학습 링크 |
| callable method | 시그니처, 인자별 역할, 반환값, 호출 시점, 실행 예제 |
| class·instance | 생성 방법, 인스턴스 상태·수명, 메서드와 속성, 정리 방법 |
| plugin | 등록·의존성, 대상·환경 제약, 핵심 API, 실패·fallback 경계 |
| property catalog | 속성별 타입·기본값·허용값·특수값, 함께 쓰는 조합, 전체 coverage |
| utility·overload | 오버로드별 입력·출력, 선택 기준, 경계값과 대표 사용처 |
| ease·visualizer | 곡선의 의미, 조절 가능한 값, 시각적 관찰점, 문자열·함수 표현 |
| installation·integration | 설치·등록 순서, 환경별 진입점, SSR·cleanup·번들 경계 |
