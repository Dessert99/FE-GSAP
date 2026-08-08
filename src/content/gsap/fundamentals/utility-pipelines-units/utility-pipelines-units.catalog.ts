/** 네 utility 전용 문서의 공식 주장과 실행으로만 확인한 경계를 item 단위로 보존한다. */

/** source provenance와 로컬 근거를 한 행에서 분리해 coverage 누락을 드러낸다. */
export type UtilityPipelineSourceItem = {
  id: string
  officialItem: string
  source: 'check-prefix' | 'get-unit' | 'pipe' | 'unitize' | 'utility-methods-hub'
  sourceLocation: string
  origin: 'official' | 'upstream-official' | 'implementation'
  sourceStatus: 'verified'
  sectionId: 'pipeline' | 'units' | 'prefix' | 'boundaries'
  localStatus: 'covered'
}

/** 공식 39개와 probe 5개를 같은 배열에서 세되 origin으로 분모를 분리한다. */
export const utilityPipelineSourceItems: UtilityPipelineSourceItem[] = [
  { id: 'PI-01', officialItem: 'pipe 페이지는 반환값을 Function으로 표시한다.', source: 'pipe', sourceLocation: 'Returns : Function', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-02', officialItem: 'pipe()는 여러 함수 호출을 이어 앞 함수의 결과를 다음 함수로 넘긴다.', source: 'pipe', sourceLocation: 'intro paragraph', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-03', officialItem: 'pipe 없이 value1, value2, output으로 반환값을 수동 전달하는 세 줄 예제를 싣는다.', source: 'pipe', sourceLocation: 'first code example · without pipe()', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-04', officialItem: 'func1(func2(func3(input)))처럼 여러 겹으로 감싸는 방식을 awkward라고 표시한다.', source: 'pipe', sourceLocation: 'first code example · multi-level wrapping', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-05', officialItem: 'cleaner with pipe 예제는 생성 변수명을 transfrom이라고 적는다.', source: 'pipe', sourceLocation: 'first code example · cleaner with pipe()', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-06', officialItem: '바로 다음 줄은 transfrom이 아니라 transform(input)을 호출해 식별자가 서로 맞지 않는다.', source: 'pipe', sourceLocation: 'first code example · output line', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-07', officialItem: 'Parameters는 원하는 만큼 함수를 넘길 수 있고 주어진 순서로 호출되며 각 반환값이 다음 함수로 간다고 설명한다.', source: 'pipe', sourceLocation: 'Parameters', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-08', officialItem: 'Tip heading은 재사용 함수를 조합해 강력한 데이터 변환을 만들라고 권한다.', source: 'pipe', sourceLocation: 'Tip heading', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-09', officialItem: 'Tip 본문은 clamp, mapRange, snap, interpolate 등을 pipeline 후보로 든다.', source: 'pipe', sourceLocation: 'Tip paragraph', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-10', officialItem: '공식 transformer 예제의 첫 단계는 입력을 0~100 사이로 clamp한다.', source: 'pipe', sourceLocation: 'transformer code · clamp', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-11', officialItem: '둘째 단계는 0~100을 0~window.innerWidth 범위로 mapRange한다.', source: 'pipe', sourceLocation: 'transformer code · mapRange', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-12', officialItem: '셋째 단계는 20 간격으로 snap하고 transformer(25.874)로 전체 변환을 실행한다.', source: 'pipe', sourceLocation: 'transformer code · snap and call', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },
  { id: 'PI-13', officialItem: 'Video demo heading과 Combining utility Methods 영상이 pipeline 조합을 보충한다.', source: 'pipe', sourceLocation: 'Video demo', origin: 'official', sourceStatus: 'verified', sectionId: 'pipeline', localStatus: 'covered' },

  { id: 'GU-01', officialItem: 'getUnit 페이지는 반환값을 String으로 표시하고 숫자가 먼저, 단위가 뒤에 오는 문자열의 단위를 돌려준다고 요약한다.', source: 'get-unit', sourceLocation: 'Returns : String summary', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'GU-02', officialItem: '본문은 숫자가 먼저이고 단위가 뒤인 문자열 안에서 단위를 분리한다고 다시 설명한다.', source: 'get-unit', sourceLocation: 'intro paragraph', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'GU-03', officialItem: '코드 주석은 CSS 값의 단위를 반환하는 예제라고 밝힌다.', source: 'get-unit', sourceLocation: 'code comment', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'GU-04', officialItem: 'getUnit("50%")의 공식 결과는 "%"다.', source: 'get-unit', sourceLocation: 'code example · percent', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'GU-05', officialItem: 'getUnit("100vw")의 공식 결과는 "vw"다.', source: 'get-unit', sourceLocation: 'code example · viewport unit', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'GU-06', officialItem: 'Parameters의 value는 단위를 얻고 싶은 String이다.', source: 'get-unit', sourceLocation: 'Parameters · value', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },

  { id: 'UN-01', officialItem: 'unitize 페이지는 반환값을 Function으로 표시한다.', source: 'unitize', sourceLocation: 'Returns : Function', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-02', officialItem: 'unitize()는 다른 함수를 감싸 결과에 px나 % 같은 단위를 붙이는 wrapper다.', source: 'unitize', sourceLocation: 'intro paragraph · result unit', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-03', officialItem: '입력에 단위가 있으면 안쪽 함수에 넣기 전에 떼고, 강제 단위가 없으면 같은 단위를 결과에 다시 붙인다.', source: 'unitize', sourceLocation: 'intro paragraph · dynamic unit', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-04', officialItem: '첫 예제는 clamp(0, 100)을 감싸 px를 항상 붙이는 함수를 만든다.', source: 'unitize', sourceLocation: 'Example · forced px setup', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-05', officialItem: '강제 px 함수는 132→100px, "-20%"→0px, 50→50px를 돌려주며 입력 단위가 바뀔 수 있음을 보인다.', source: 'unitize', sourceLocation: 'Example · forced px calls', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-06', officialItem: '단위를 지정하지 않고 wrap(0, 100)을 감싼 함수는 입력의 단위를 사용한다.', source: 'unitize', sourceLocation: 'Example · dynamic unit setup', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-07', officialItem: '동적 단위 함수는 "150px"→50px, "130%"→30%를 돌려준다.', source: 'unitize', sourceLocation: 'Example · dynamic unit calls', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-08', officialItem: 'mapRange(-10, 10, 0, 100)을 감싸 %를 강제하는 예제를 싣는다.', source: 'unitize', sourceLocation: 'Example · forced percent setup', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-09', officialItem: '강제 % 함수는 0→50%, "5px"→75%를 돌려준다.', source: 'unitize', sourceLocation: 'Example · forced percent calls', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-10', officialItem: 'unitize()는 modifier 함수에서 유용하다고 설명한다.', source: 'unitize', sourceLocation: 'Example · modifier comment', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-11', officialItem: 'modifier 예제는 x 입력의 단위를 떼어 wrap에 숫자로 넣고 결과에 px를 붙인다.', source: 'unitize', sourceLocation: 'Example · modifiers.x', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-12', officialItem: '첫 인자 function은 결과에 단위를 붙일 대상 함수다.', source: 'unitize', sourceLocation: 'Parameters · function', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-13', officialItem: '둘째 인자 unit은 선택 String이며, 생략하면 입력의 원래 단위를 동적으로 적용한다.', source: 'unitize', sourceLocation: 'Parameters · unit', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },
  { id: 'UN-14', officialItem: 'Note는 unitize()가 parseFloat()로 입력 단위를 떼고 function에 넘긴다고 명시한다.', source: 'unitize', sourceLocation: 'Note after Parameters', origin: 'official', sourceStatus: 'verified', sectionId: 'units', localStatus: 'covered' },

  { id: 'CP-01', officialItem: 'checkPrefix 페이지는 반환값을 String으로 표시한다.', source: 'check-prefix', sourceLocation: 'Returns : String', origin: 'official', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'CP-02', officialItem: 'CSS property 이름을 주면 필요할 때 브라우저 prefix를 붙인 property 이름을 돌려준다.', source: 'check-prefix', sourceLocation: 'intro paragraph · prefix', origin: 'official', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'CP-03', officialItem: 'prefix가 필요 없으면 원래 property 이름을 돌려준다.', source: 'check-prefix', sourceLocation: 'intro paragraph · original name', origin: 'official', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'CP-04', officialItem: 'property가 존재하지 않으면 undefined를 돌려준다고 본문에 적혀 있어 Returns : String 표기와 충돌한다.', source: 'check-prefix', sourceLocation: 'intro paragraph · unsupported', origin: 'official', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'CP-05', officialItem: 'filter 예제는 브라우저에 따라 filter, WebkitFilter, MozFilter를 돌려줄 수 있다고 설명한다.', source: 'check-prefix', sourceLocation: 'code example', origin: 'official', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'CP-06', officialItem: 'Parameters의 property는 filter 같은 확인 대상 property 이름 String이다.', source: 'check-prefix', sourceLocation: 'Parameters · property', origin: 'official', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },

  { id: 'HP-01', officialItem: '선행 Utility Methods hub의 checkPrefix 설명은 provided를 proved로 잘못 적었다. dedicated checkPrefix 문서의 현재 문장은 provided로 올바르지만 hub 원문 오타를 정정된 것으로 덮어쓰지 않는다.', source: 'utility-methods-hub', sourceLocation: 'Utility Methods > Available Utils > checkPrefix', origin: 'upstream-official', sourceStatus: 'verified', sectionId: 'boundaries', localStatus: 'covered' },
  { id: 'HP-02', officialItem: '선행 Utility Methods hub의 unitize 예제는 unitize(...) 함수 생성 뒤 wrap("150px") 호출 전에 세미콜론이 빠져 있다. dedicated unitize 문서의 현재 예제에는 세미콜론이 있지만 hub 오류를 보존한다.', source: 'utility-methods-hub', sourceLocation: 'Utility Methods > Available Utils > unitize', origin: 'upstream-official', sourceStatus: 'verified', sectionId: 'boundaries', localStatus: 'covered' },

  { id: 'UP-P1', officialItem: 'GSAP 3.15.0에서 지원하지 않는 property의 checkPrefix() 실제 반환은 undefined가 아니라 null이다.', source: 'check-prefix', sourceLocation: 'Node fake-DOM probe', origin: 'implementation', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'UP-P2', officialItem: 'prefix probe에서 일반 property는 원래 이름, prefix만 있는 property는 WebkitMaskImage, 없는 property는 null을 돌려줬다.', source: 'check-prefix', sourceLocation: 'Node fake-DOM probe', origin: 'implementation', sourceStatus: 'verified', sectionId: 'prefix', localStatus: 'covered' },
  { id: 'UP-P3', officialItem: 'official pipe 코드의 transfrom 선언 뒤 transform 호출은 ReferenceError가 나며, 식별자를 transformer로 통일한 의도 실행은 viewport 500에서 25.874→120이다.', source: 'pipe', sourceLocation: 'Node probe', origin: 'implementation', sourceStatus: 'verified', sectionId: 'boundaries', localStatus: 'covered' },
  { id: 'UP-P4', officialItem: 'official이 설명하지 않은 무함수 pipe()는 GSAP 3.15.0에서 입력을 그대로 돌려주는 함수다.', source: 'pipe', sourceLocation: 'Node probe', origin: 'implementation', sourceStatus: 'verified', sectionId: 'boundaries', localStatus: 'covered' },
  { id: 'UP-P5', officialItem: 'official의 숫자 우선 조건 밖에서는 getUnit("42"), getUnit("calc(100% - 2px)"), getUnit(".5em")이 모두 빈 문자열이고 unitize에 "auto"를 넣으면 안쪽 함수가 NaN을 받는다.', source: 'unitize', sourceLocation: 'Node probe with getUnit boundary', origin: 'implementation', sourceStatus: 'verified', sectionId: 'boundaries', localStatus: 'covered' },
]
