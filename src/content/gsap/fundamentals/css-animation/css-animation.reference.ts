/** CSS 공식 페이지의 52개 source item을 compact local evidence로 보존한다. */
export type CssReferenceItem = {
  id: string
  sectionId: 'plugin-boundary' | 'css-values' | 'transform-model' | 'three-d' | 'origins' | 'lifecycle'
  title: string
  summary: string
}

/** 전체 CSS property catalog 대신 공식 주장의 식별자와 학습 위치만 렌더링한다. */
export const cssAnimationReference: CssReferenceItem[] = [
  { id: 'CSS-S001', sectionId: 'plugin-boundary', title: '지원 범위', summary: 'DOM의 거의 모든 CSS-related property를 다루며 전체 목록은 의도적으로 두지 않습니다.' },
  { id: 'CSS-S002', sectionId: 'plugin-boundary', title: 'CSS 대상', summary: '표준 animatable CSS와 여러 비애니메이션 값도 처리합니다.' },
  { id: 'CSS-S006', sectionId: 'plugin-boundary', title: '보간 조건', summary: '시작·중간·끝 값이 모두 유효한 CSS여야 연속적으로 보간합니다.' },
  { id: 'CSS-S007', sectionId: 'plugin-boundary', title: 'layout 경계', summary: '복잡한 layout 변화는 일반 Tween보다 FLIP이 맡습니다.' },
  { id: 'CSS-S039', sectionId: 'plugin-boundary', title: '다른 target', summary: 'numeric DOM attribute는 AttrPlugin, text 교체는 TextPlugin의 범위입니다.' },
  { id: 'CSS-S040', sectionId: 'plugin-boundary', title: '자동 포함', summary: 'CSSPlugin은 GSAP Core에 포함되어 별도 등록하지 않습니다.' },
  { id: 'CSS-S041', sectionId: 'plugin-boundary', title: 'vars 문법', summary: '오래된 css:{} wrapper 없이 property를 vars에 바로 적습니다.' },
  { id: 'CSS-S042', sectionId: 'plugin-boundary', title: '관련 경계', summary: 'MDN·FLIP·Attr·Text·Snap·DirectionalRotation 문서로 상세를 넘깁니다.' },
  { id: 'CSS-S003', sectionId: 'css-values', title: 'property 이름', summary: 'font-size가 아닌 fontSize처럼 camelCase를 사용합니다.' },
  { id: 'CSS-S004', sectionId: 'css-values', title: '값 형태', summary: 'color·number·complex string·height:auto를 받을 수 있습니다.' },
  { id: 'CSS-S005', sectionId: 'css-values', title: '비보간 값 시점', summary: '비보간 값은 시작에 적용하지만 display:none은 끝에 적용합니다.' },
  { id: 'CSS-S014', sectionId: 'css-values', title: 'complex string', summary: '여러 숫자와 색이 섞인 문자열을 보간하고 필요한 vendor prefix를 탐지합니다.' },
  { id: 'CSS-S015', sectionId: 'css-values', title: '기본 단위', summary: 'x의 숫자는 px, rotation의 숫자는 deg이며 다른 단위는 문자열로 씁니다.' },
  { id: 'CSS-S016', sectionId: 'css-values', title: '단위 변환', summary: '현재값과 목표값의 단위가 달라도 GSAP이 변환할 수 있습니다.' },
  { id: 'CSS-S035', sectionId: 'css-values', title: 'CSS variable', summary: '브라우저가 지원하는 CSS custom property도 animation할 수 있습니다.' },
  { id: 'CSS-EX001', sectionId: 'css-values', title: '공식 mixed vars', summary: 'backgroundColor·fontSize·boxShadow·borderRadius·height:auto를 한 vars에서 사용합니다.' },
  { id: 'CSS-EX003', sectionId: 'css-values', title: '공식 unit 예제', summary: 'rotation/x의 기본 단위와 rad/vw 명시 방식을 비교합니다.' },
  { id: 'CSS-S008', sectionId: 'transform-model', title: 'alias 권장', summary: 'transform string보다 built-in alias가 호환성·성능·신뢰성에 유리합니다.' },
  { id: 'CSS-S009', sectionId: 'transform-model', title: '고정 적용 순서', summary: 'translation→scale→rotationX→rotationY→skew→rotationZ 순서로 적용합니다.' },
  { id: 'CSS-S010', sectionId: 'transform-model', title: 'matrix round-trip', summary: '임의 transform string은 브라우저 matrix를 다시 읽고 해석하는 부담이 있습니다.' },
  { id: 'CSS-S011', sectionId: 'transform-model', title: '예외 선택', summary: '비표준 transform 순서가 꼭 필요할 때만 string을 고려합니다.' },
  { id: 'CSS-S012', sectionId: 'transform-model', title: 'Quick reference', summary: '공식 shorthand·공통 property 대응 20행을 아래 표에 보존합니다.' },
  { id: 'CSS-S013', sectionId: 'transform-model', title: 'transform notes', summary: 'percent 이동·px+%·scale shortcut·relative 값·SVG percent 경계를 보존합니다.' },
  { id: 'CSS-S022', sectionId: 'transform-model', title: 'transform cache', summary: '개별 transform 값을 cache해 다른 transform 값을 잃지 않으며 clearProps로 제거합니다.' },
  { id: 'CSS-S023', sectionId: 'transform-model', title: '다시 읽기', summary: 'parseTransform:true로 기록값 대신 CSS transform을 다시 parse합니다.' },
  { id: 'CSS-S024', sectionId: 'transform-model', title: '렌더링 품질', summary: 'transform antialias 품질은 GSAP이 아니라 브라우저 책임입니다.' },
  { id: 'CSS-EX002', sectionId: 'transform-model', title: '공식 percent 예제', summary: 'transform string 대신 xPercent/yPercent alias를 사용합니다.' },
  { id: 'CSS-S017', sectionId: 'three-d', title: '3D surface', summary: 'rotationX/Y/Z·z·perspective·transformPerspective를 다룹니다.' },
  { id: 'CSS-S018', sectionId: 'three-d', title: 'true 3D 조건', summary: 'parent perspective 또는 target transformPerspective가 있어야 깊이가 보입니다.' },
  { id: 'CSS-S019', sectionId: 'three-d', title: '소실점 범위', summary: 'parent perspective는 children이 소실점을 공유하고 transformPerspective는 한 element에만 적용됩니다.' },
  { id: 'CSS-S020', sectionId: 'three-d', title: 'CSS 대응', summary: '3D CSS transform과 GSAP alias의 대응을 보존합니다.' },
  { id: 'CSS-S021', sectionId: 'three-d', title: 'fallback', summary: '3D 미지원 browser에서는 3D만 무시되고 2D transform은 유지됩니다.' },
  { id: 'CSS-S025', sectionId: 'three-d', title: 'force3D', summary: 'auto는 Tween 중 3D를 쓰고 필요 없으면 끝에서 2D로 돌아갑니다.' },
  { id: 'CSS-EX004', sectionId: 'three-d', title: '공식 2D+3D 예제', summary: 'rotationX·scaleX·z를 한 Tween에 섞습니다.' },
  { id: 'CSS-EX005', sectionId: 'three-d', title: '공식 perspective 예제', summary: 'parent perspective와 element transformPerspective의 설정 위치를 비교합니다.' },
  { id: 'CSS-S026', sectionId: 'origins', title: '2D origin', summary: '기본 50% 50%이며 keyword·percent·px를 받습니다.' },
  { id: 'CSS-S027', sectionId: 'origins', title: 'z-origin', summary: '세 번째 transformOrigin 값은 3D 회전축의 z 거리입니다.' },
  { id: 'CSS-S028', sectionId: 'origins', title: 'SVG origin', summary: 'SVG transformOrigin을 브라우저마다 일관화하지만 SVG 3D는 지원하지 않습니다.' },
  { id: 'CSS-S029', sectionId: 'origins', title: 'svgOrigin', summary: 'SVG canvas 좌표를 쓰며 transformOrigin과 동시에 사용할 수 없습니다.' },
  { id: 'CSS-S030', sectionId: 'origins', title: 'smoothOrigin', summary: 'SVG origin 변경 시 jump를 offset으로 막고 per-Tween 또는 default로 조절합니다.' },
  { id: 'CSS-S031', sectionId: 'origins', title: '회전 방향', summary: '_cw·_ccw·_short suffix와 relative prefix로 회전 경로를 고릅니다.' },
  { id: 'CSS-S032', sectionId: 'origins', title: '일반 object 경계', summary: 'CSS가 아닌 일반 object의 방향 회전은 DirectionalRotationPlugin 범위입니다.' },
  { id: 'CSS-EX006', sectionId: 'origins', title: '공식 origin 예제', summary: 'left top·50px 20px·세 번째 -400px origin을 비교합니다.' },
  { id: 'CSS-EX007', sectionId: 'origins', title: '공식 svgOrigin 예제', summary: 'SVG canvas의 250 100 지점을 회전축으로 사용합니다.' },
  { id: 'CSS-EX008', sectionId: 'origins', title: '공식 direction 예제', summary: 'rotation·rotationX·rotationY에 방향 suffix를 적용합니다.' },
  { id: 'CSS-S033', sectionId: 'lifecycle', title: 'autoAlpha', summary: 'opacity 0이면 visibility:hidden, 그 외에는 상속을 지키기 위해 inherit를 씁니다.' },
  { id: 'CSS-S034', sectionId: 'lifecycle', title: '숨김 시작', summary: 'visibility:hidden·opacity:1 시작도 fade-in을 위해 opacity 0으로 취급합니다.' },
  { id: 'CSS-S036', sectionId: 'lifecycle', title: 'clearProps 시점', summary: 'Tween 완료 시 지정 inline style을 제거해 stylesheet 제어권을 돌려줍니다.' },
  { id: 'CSS-S037', sectionId: 'lifecycle', title: 'transform 정리', summary: 'x나 scale 하나를 clear해도 합쳐진 transform 전체가 제거됩니다.' },
  { id: 'CSS-S038', sectionId: 'lifecycle', title: 'autoRound', summary: 'px와 zIndex 중간값은 기본 정수화하며 autoRound:false로 끕니다.' },
  { id: 'CSS-EX009', sectionId: 'lifecycle', title: '공식 autoAlpha sequence', summary: 'fade-out 뒤 hidden, 다음 Tween에서 다시 fade-in합니다.' },
  { id: 'CSS-EX010', sectionId: 'lifecycle', title: '공식 clearProps 예제', summary: 'scale·left·backgroundColor 중 scale와 left의 inline 흔적만 완료 때 지웁니다.' },
]

/** 공식 Quick reference 20행을 property catalog가 아닌 문법 대응표로 보존한다. */
export const cssQuickReference = [
  ['x: 100', 'transform: translateX(100px)'],
  ['y: 100', 'transform: translateY(100px)'],
  ['xPercent: 50', 'transform: translateX(50%)'],
  ['yPercent: 50', 'transform: translateY(50%)'],
  ['scale: 2', 'transform: scale(2)'],
  ['scaleX: 2', 'transform: scaleX(2)'],
  ['scaleY: 2', 'transform: scaleY(2)'],
  ['rotation: 90', 'transform: rotate(90deg)'],
  ['rotation: "1.25rad"', 'transform: rotate(1.25rad)'],
  ['skew: 30', 'transform: skew(30deg)'],
  ['skewX: 30', 'transform: skewX(30deg)'],
  ['skewY: "1.23rad"', 'transform: skewY(1.23rad)'],
  ['transformOrigin: "center 40%"', 'transform-origin: center 40%'],
  ['opacity: 0', 'element opacity 조절'],
  ['autoAlpha: 0', 'opacity + visibility 단축 표현'],
  ['duration: 1', 'animation-duration: 1s'],
  ['repeat: -1', 'animation-iteration-count: infinite'],
  ['repeat: 2', 'animation-iteration-count: 3'],
  ['delay: 2', 'animation-delay: 2s'],
  ['yoyo: true', 'animation-direction: alternate'],
] as const

/** handoff 분모와 실제 reference 배열이 같은지 사람이 읽을 수 있는 이름으로 고정한다. */
export const cssReferenceExpectedCount = 52
