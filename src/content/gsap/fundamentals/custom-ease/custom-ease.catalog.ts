/** 공식 CustomEase 문서에서 확인한 기술 item 29개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'custom-ease'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** CustomEase의 공식 주장과 실행 확인 항목을 handoff가 재현할 수 있게 보존한다. */
export const customEaseSourceItems: SourceItem[] = [
  { id: 'CE-01', officialItem: 'CustomEase는 준비된 easing 선택지의 한계에서 벗어나게 해 주며, Ease Visualizer에서 그리거나 SVG path를 복사해 붙여 넣는 것만으로 상상할 수 있는 어떤 easing 곡선이든 만들 수 있다.', source: 'custom-ease', origin: 'official', sectionId: 'curve-as-function' },
  { id: 'CE-02', officialItem: '"Zero limitations." 제어점(control point)을 원하는 만큼 쓸 수 있다.', source: 'custom-ease', origin: 'official', sectionId: 'curve-as-function' },

  { id: 'CE-03', officialItem: 'Quick Start는 등록 코드로 gsap.registerPlugin(CustomEase) 한 줄을 제시한다.', source: 'custom-ease', origin: 'official', sectionId: 'setup' },
  { id: 'CE-04', officialItem: 'FAQ "Is this included in the GSAP core?" — "No, you must load/import it separately". CustomEase는 core에 포함되지 않으므로 따로 불러와야 한다.', source: 'custom-ease', origin: 'official', sectionId: 'setup' },
  { id: 'CE-05', officialItem: 'FAQ "How do I include CustomEase in my project?" — CDN·NPM·download 등 모든 설치 방법은 installation 페이지에 있고 필요한 코드를 만들어 주는 인터랙티브 헬퍼도 있다. 등록을 잊지 말라고 덧붙인다.', source: 'custom-ease', origin: 'official', sectionId: 'setup' },
  { id: 'CE-06', officialItem: 'FAQ — 개발 중에는 되는데 production build에서 갑자기 멈추면 build tool이 tree shaking으로 plugin을 떨어뜨린 것이고, 등록이 tree shaking으로부터 plugin을 보호한다.', source: 'custom-ease', origin: 'official', sectionId: 'setup' },
  { id: 'CE-07', officialItem: 'FAQ "Is it bad to register a plugin multiple times?" — "No, it\'s perfectly fine. It doesn\'t help anything, nor does it hurt."', source: 'custom-ease', origin: 'official', sectionId: 'setup' },

  { id: 'CE-08', officialItem: '매 tween에 긴 데이터 문자열을 적는 대신 create()로 CustomEase를 한 번 만들고(보통 페이지·앱이 로드되자마자) 기억하기 쉬운 ID("hop", "wiggle" 등)를 붙여 이후 어떤 tween에서든 그 ID로 참조한다.', source: 'custom-ease', origin: 'official', sectionId: 'create-and-reference' },
  { id: 'CE-09', officialItem: '공식 예제 — CustomEase.create("hop", "M0,0 C0,0 0.056,0.442 …") 뒤에 gsap.to(element, { duration: 1, y: -100, ease: "hop" })로 ease를 ID(문자열)로 참조한다.', source: 'custom-ease', origin: 'official', sectionId: 'create-and-reference' },
  { id: 'CE-10', officialItem: 'ease를 미리 만들어 두면 애니메이션 중 최대 성능이 나온다. 내부적으로 모든 점을 계산하고 데이터를 최적화하는 overhead가 있는데 그 작업은 생성 시 한 번만 일어난다.', source: 'custom-ease', origin: 'official', sectionId: 'create-and-reference' },
  { id: 'CE-11', officialItem: 'Naming caveat — ease 이름을 "expo"나 "power1" 같은 표준 ease 이름과 같게 짓는 것은 보통 좋은 생각이 아니다. 그 표준 ease를 덮어써 CustomEase로 대체하게 되기 때문이다.', source: 'custom-ease', origin: 'official', sectionId: 'create-and-reference' },

  { id: 'CE-12', officialItem: 'path 문자열은 보통 normalized 값(0-1)을 쓴다.', source: 'custom-ease', origin: 'official', sectionId: 'path-data' },
  { id: 'CE-13', officialItem: 'cubic bezier 명령("M", "C", "S", "L", "Z")을 쓰는 SVG path data라면 무엇이든 넘길 수 있고 GSAP이 내부적으로 normalize한다.', source: 'custom-ease', origin: 'official', sectionId: 'path-data' },
  { id: 'CE-14', officialItem: 'CustomEase는 cubic-bezier.com에서 얻는 것 같은 숫자 네 개짜리 표준 cubic-bezier() 문자열도 인식한다. 예: ".17,.67,.83,.67".', source: 'custom-ease', origin: 'official', sectionId: 'path-data' },
  { id: 'CE-15', officialItem: '그 네 숫자는 Ease Visualizer 아래쪽 주황색 텍스트 영역에 붙여 넣거나 CustomEase.create("easeName", ".17,.67,.83,.67")처럼 create()에 직접 넘긴다.', source: 'custom-ease', origin: 'official', sectionId: 'path-data' },

  { id: 'CE-16', officialItem: 'Ease Visualizer — 점 추가는 곡선 위 아무 곳에서나 ALT/OPTION-click.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-17', officialItem: 'Ease Visualizer — 점 삭제는 점을 선택한 뒤 키보드 DELETE 키.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-18', officialItem: 'Ease Visualizer — smooth/corner 전환은 anchor point에 ALT/OPTION-click.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-19', officialItem: 'Ease Visualizer — corner anchor에서 ALT-DRAG하면 handle을 꺼낼 수 있다.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-20', officialItem: 'Ease Visualizer — control handle을 ALT/OPTION-drag하면 그 점이 corner(smooth가 아닌) point로 바뀐다.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-21', officialItem: 'Ease Visualizer — 여러 점 선택은 SHIFT를 누른 채 anchor point를 클릭한다(선택 토글).', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-22', officialItem: 'Ease Visualizer — 실행 취소는 CTRL-Z.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-23', officialItem: 'Ease Visualizer — 드래그 중 SHIFT를 누르고 있으면 snapping이 꺼진다.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-24', officialItem: 'Ease Visualizer — 다른 ease를 고른 뒤 "CustomEase"를 누르면 그 ease를 편집할 수 있다.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-25', officialItem: 'Copy/Paste SVG — Ease Visualizer의 "custom" 모드에서 아래쪽 보라색 텍스트(CustomEase 데이터 문자열)를 전부 선택하고 Adobe Illustrator 같은 데서 가져온 SVG path를 붙여 넣는다.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },
  { id: 'CE-26', officialItem: 'Copy/Paste SVG — 그 뒤 다른 곳을 클릭하면 Ease Visualizer가 첫 번째 <path>를 집어 올바른 형식으로 변환한다.', source: 'custom-ease', origin: 'official', sectionId: 'visualizer' },

  { id: 'CE-27', officialItem: 'CustomEase에는 getSVGData() 메서드가 있어, 지정한 크기({width: 500, height: 400, x: 10, y: 50} 형태)로 어떤 ease든 그래프로 그릴 SVG <path> data 문자열을 계산해 준다.', source: 'custom-ease', origin: 'official', sectionId: 'get-svg-data' },
  { id: 'CE-28', officialItem: 'getSVGData()에는 CustomEase 자체나 그것에 연결된 ID를 넘길 수 있고, "power2" 같은 표준 ease도 넘길 수 있다.', source: 'custom-ease', origin: 'official', sectionId: 'get-svg-data' },
  { id: 'CE-29', officialItem: 'vars 객체에 path를 넣어 주면 그 element의 d attribute를 대신 채워 준다. 예: CustomEase.getSVGData("hop", { width: 500, height: 400, path: "#ease" }).', source: 'custom-ease', origin: 'official', sectionId: 'get-svg-data' },

  { id: 'CE-P1', officialItem: 'create()는 만들어진 ease 함수 자체를 반환하며 그 함수를 ease에 직접 넘겨도 문자열 ID와 같은 값이 나온다. gsap.parseEase(id)는 같은 함수를 돌려준다. 공식 문서는 문자열 ID 사용법만 게시한다.', source: 'custom-ease', origin: 'implementation', sectionId: 'create-and-reference' },
  { id: 'CE-P2', officialItem: 'naming caveat는 정확히 같은 이름에만 적용된다. create("power1", …) 뒤에도 "power1.out"은 표준 ease 그대로 동작하고 "power1"만 새 곡선으로 바뀐다.', source: 'custom-ease', origin: 'implementation', sectionId: 'create-and-reference' },
  { id: 'CE-P3', officialItem: 'path의 y 값이 곧 ease의 출력값이다. 공식 "hop" 데이터는 y가 0으로 돌아오며 끝나므로 ease(1)이 0이고, gsap.to(el, { y: -100, ease: "hop" })은 progress 1에서 시작값으로 되돌아온다.', source: 'custom-ease', origin: 'implementation', sectionId: 'path-data' },
  { id: 'CE-P4', officialItem: 'cubic-bezier 값은 숫자 네 개만 넘겨야 한다. "cubic-bezier(...)" 껍데기까지 붙인 문자열은 "malformed path"로 실패한다.', source: 'custom-ease', origin: 'implementation', sectionId: 'path-data' },
  { id: 'CE-P5', officialItem: 'x가 0에서 시작해 1로 끝나지 않는 path data는 0-1로 다시 스케일되며, 이때 y축은 SVG 화면 좌표(아래로 증가)로 해석돼 뒤집힌다.', source: 'custom-ease', origin: 'implementation', sectionId: 'path-data' },
  { id: 'CE-P6', officialItem: 'getSVGData()는 계산한 d 문자열을 반환하고, width·height를 생략하면 100×100을 쓴다. 반환된 좌표는 화면 좌표라 ease 값 0이 y=height, 값 1이 y=0이다.', source: 'custom-ease', origin: 'implementation', sectionId: 'get-svg-data' },
]
