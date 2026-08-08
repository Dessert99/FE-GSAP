/** 공식 일곱 문서에서 확인한 기술 item 76개를 로컬 섹션과 1:1로 묶어 coverage 근거로 남긴다. */

/** 어떤 공식 문서의 어떤 주장이 어느 섹션에서 설명되는지를 한 행으로 고정한다. */
export type SourceItem = {
  id: string
  officialItem: string
  source: 'labels' | 'add-label' | 'remove-label' | 'current-label' | 'next-label' | 'previous-label' | 'seek'
  /** 공식 문서에 게시된 주장인지, 설치본 실행으로만 확인한 사실인지 구분한다. */
  origin: 'official' | 'implementation'
  sectionId: string
}

/** label에 관한 기술 주장 전체 목록 — PageCoverage와 각 섹션이 같은 배열을 센다. */
export const timelineLabelsSourceItems: SourceItem[] = [
  // 01 label-map — labels 속성이 무엇을 담고 있는지
  { id: 'LBL-01', officialItem: '선언은 labels : Object 이며 타입은 Object다.', source: 'labels', origin: 'official', sectionId: 'label-map' },
  { id: 'LBL-02', officialItem: 'labels는 timeline에 추가된 label을 저장한다("This stores any labels that have been added to the timeline.").', source: 'labels', origin: 'official', sectionId: 'label-map' },
  { id: 'LBL-03', officialItem: 'timeline.labels로 모든 label이 담긴 객체 전체를 얻을 수 있다.', source: 'labels', origin: 'official', sectionId: 'label-map' },
  { id: 'LBL-04', officialItem: '공식 예제는 timeline을 만들고 addLabel("myLabel", 3)과 addLabel("anotherLabel", 5)로 label 두 개를 붙인다.', source: 'labels', origin: 'official', sectionId: 'label-map' },
  { id: 'LBL-05', officialItem: '공식 예제의 console.log(tl.labels.myLabel)은 3을, console.log(tl.labels.anotherLabel)은 5를 출력한다. 즉 key가 label 이름이고 value가 초 단위 시각이다.', source: 'labels', origin: 'official', sectionId: 'label-map' },

  // 02 add-label — addLabel()의 signature·인자·반환값과 label을 참조하는 곳
  { id: 'ADD-01', officialItem: 'signature는 addLabel( label:String, position:[Number | String] ) : self 이다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-02', officialItem: 'addLabel()은 timeline에 label을 추가해 중요한 위치·시각을 표시하기 쉽게 한다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-03', officialItem: 'label은 String이며 "The name of the label", 즉 label의 이름이다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-04', officialItem: 'position은 [Number | String]이고 기본값은 "+=0"이며 timeline 안 삽입 지점을 정한다. 기본값이면 timeline의 끝이다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-05', officialItem: '아직 존재하지 않는 label을 정의하면 자동으로 timeline 끝에 추가된다("If you define a label that doesn\'t exist yet, it will automatically be added to the end of the timeline").', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-06', officialItem: 'addLabel()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-07', officialItem: '붙인 label은 다른 메서드에서 참조할 수 있다 — seek("myLabel"), add(myTween, "myLabel"), reverse("myLabel")이 공식이 든 예다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },
  { id: 'ADD-08', officialItem: 'timeline.add() 메서드로도 label을 삽입할 수 있다.', source: 'add-label', origin: 'official', sectionId: 'add-label' },

  // 03 label-position — position parameter가 받는 모든 표기
  { id: 'ADD-09', officialItem: '기본적으로 label은 timeline 끝에 붙지만 position parameter로 배치 지점을 정확히 정할 수 있고, 그 문법은 아래 선택지를 가진 유연한 형태다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-10', officialItem: '절대 시각 — timeline 시작점에서 잰 초 단위 숫자다(예: 3). 공식 예제는 tl.addLabel("myLabel", 3)이다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-11', officialItem: 'label 이름("someLabel")을 줄 수 있고, 그 label이 존재하지 않으면 timeline 끝에 추가된다. 공식 예제는 tl.addLabel("myLabel", "someLabel")이다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-12', officialItem: '"<"는 이전 animation의 시작이다. <를 이전 animation의 시작을 가리키는 포인터로 생각하라고 적혀 있다. 공식 예제는 tl.addLabel("myLabel", "<")이다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-13', officialItem: '">"는 이전 animation의 끝이다. >를 이전 animation의 끝을 가리키는 포인터로 생각하라고 적혀 있다. 공식 예제는 tl.addLabel("myLabel", ">")이다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-14', officialItem: '"+="와 "-=" 접두사는 상대값을 뜻한다. "<"나 ">" 뒤에 숫자가 오면 상대값으로 해석되어 "<2"는 "<+=2"와 같다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-15', officialItem: '"+=1"은 timeline 끝에서 1초 뒤이며 틈(gap)을 만든다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-16', officialItem: '"-=1"은 timeline 끝에서 1초 앞이며 겹친다(overlaps).', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-17', officialItem: '"myLabel+=2"는 label "myLabel"에서 2초 뒤다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-18', officialItem: '"<+=3"은 이전 animation의 시작에서 3초 뒤다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-19', officialItem: '"<3"은 "<+=3"과 같다. "<"나 ">" 뒤에서는 "+="가 생략된 것으로 본다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-20', officialItem: '">-0.5"는 이전 animation의 끝에서 0.5초 앞이다. "이전 animation의 끝에 -0.5를 더한 것"이라고 설명한다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-21', officialItem: '백분율 기반 문자열도 쓸 수 있다. "+="나 "-=" 바로 뒤면 삽입되는 animation의 total duration 기준이고, "<"나 ">" 바로 뒤면 이전 animation의 total duration 기준이다. total duration에는 repeat·yoyo가 포함된다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-22', officialItem: '"-=25%"는 삽입되는 animation의 total duration의 25%만큼 timeline 끝과 겹친다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-23', officialItem: '"+=50%"는 삽입되는 animation의 total duration의 50%만큼 timeline 끝을 넘어서며 틈을 만든다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-24', officialItem: '"<25%"는 이전 animation의 시작에서 25% 지점이다. 끝에서 -75%인 ">-75%"와 같다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-25', officialItem: '"<+=25%"는 이전 animation의 시작에서 삽입되는 animation의 total duration의 25%만큼 뒤다. 백분율 기준이 이전 animation인 "<25%"와 다르다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-26', officialItem: '"myLabel+=30%"는 label "myLabel"에서 삽입되는 animation의 total duration의 30%만큼 뒤다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-27', officialItem: '각주 — 백분율 기반 값은 GSAP 3.7.0에서 추가됐다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-28', officialItem: '각주 — "이전 animation"은 가장 최근에 삽입된 animation이지 timeline 끝에 가장 가까운 animation이 아니다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },
  { id: 'ADD-29', officialItem: '공식 페이지에는 Position Parameter 대화형 데모 절이 있고, 대화형 timeline 시각화와 영상이 있는 Understanding the Position Parameter 튜토리얼을 읽으라고 안내한다.', source: 'add-label', origin: 'official', sectionId: 'label-position' },

  // 04 label-navigation — currentLabel() / nextLabel() / previousLabel()
  { id: 'CUR-01', officialItem: 'signature는 currentLabel( value:String ) : [String | self] 이다.', source: 'current-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'CUR-02', officialItem: 'currentLabel()은 현재 시각에 있거나 그보다 앞에 있는 가장 가까운 label을 가져오거나, 넘긴 label로 점프한다. 어느 쪽인지는 인자를 넘겼는지에 달렸다.', source: 'current-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'CUR-03', officialItem: 'value는 String이고 기본값은 null이다.', source: 'current-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'CUR-04', officialItem: '인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter가 되어 chaining을 쉽게 하려고 instance 자신을 돌려준다.', source: 'current-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'CUR-05', officialItem: '반환값은 [String | self]로, 인자를 생략했는지 넘겼는지에 따라 갈린다.', source: 'current-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'CUR-06', officialItem: 'Details는 이 메서드가 getter와 setter 역할을 함께 한다고 명시한다("This method serves as both a getter and setter.").', source: 'current-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-01', officialItem: 'signature는 nextLabel( time:Number ) : String 이다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-02', officialItem: 'nextLabel()은 주어진 time에서 다음 label을 돌려준다. time을 주지 않으면 timeline의 현재 playhead 시각을 쓴다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-03', officialItem: 'time은 Number이며 "다음 label을 구할 기준 시각"이다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-04', officialItem: '반환 타입은 String이고, nextLabel()에 넘긴 시각보다 뒤에 있는 label의 이름이다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-05', officialItem: 'Details는 time parameter보다 뒤에 오는 다음 label을 "있다면(if any)" 돌려준다고 적어 없을 수 있음을 시사한다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-06', officialItem: 'timeline이 reversed여도 결과는 달라지지 않는다. 여기서 "뒤"는 timeline의 local time zone에서 더 나중이라는 뜻이다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-07', officialItem: 'time parameter와 정확히 같은 시각에 있는 label은 무시된다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'NXT-08', officialItem: '공식 코드 예제는 tl.tweenTo(tl.nextLabel()) 이며, tweenTo()와 함께 써서 다음 label로 tween하게 할 수 있다고 설명한다.', source: 'next-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-01', officialItem: 'signature는 previousLabel( time:Number ) : String 이다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-02', officialItem: 'previousLabel()은 주어진 time에서 이전 label을 돌려준다. time을 주지 않으면 timeline의 현재 playhead 시각을 쓴다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-03', officialItem: 'time은 Number이며 "이전 label을 구할 기준 시각"이다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-04', officialItem: '반환 타입은 String이고, previousLabel()에 넘긴 시각보다 앞에 있는 label의 이름이다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-05', officialItem: 'Details는 time parameter보다 앞에 오는 이전 label을 "있다면(if any)" 돌려준다고 적어 없을 수 있음을 시사한다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-06', officialItem: 'timeline이 reversed여도 결과는 달라지지 않는다. 여기서 "앞"은 timeline의 local time zone에서 더 이르다는 뜻이다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-07', officialItem: 'time parameter와 정확히 같은 시각에 있는 label은 무시된다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },
  { id: 'PRV-08', officialItem: '공식 코드 예제는 tl.tweenTo(tl.previousLabel()) 이며, tweenTo()와 함께 써서 이전 label로 되돌아가는 tween을 만들 수 있다고 설명한다.', source: 'previous-label', origin: 'official', sectionId: 'label-navigation' },

  // 05 seek-by-name — seek()
  { id: 'SEK-01', officialItem: 'signature는 seek( position:*, suppressEvents:Boolean ) : self 이다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-02', officialItem: '공식 설명 앞에 [override] 표시가 붙어 있다. Timeline이 상위 정의를 재정의한 메서드라는 뜻이다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-03', officialItem: 'seek()은 paused인지 reversed인지를 건드리지 않고 특정 시각(또는 label)으로 점프한다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-04', officialItem: 'position의 타입은 *이며, 숫자면 절대 위치다. 예를 들어 3은 timeline 시작에서 정확히 3초다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-05', officialItem: 'position이 문자열이면 label일 수 있다(예: "myLabel").', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-06', officialItem: 'position 문자열은 "+=" 또는 "-=" 접두사를 쓴 상대값일 수 있다. "-=2"는 timeline 끝에서 2초 앞이다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-07', officialItem: 'position 문자열은 조합일 수 있다. "myLabel+=2"는 "myLabel"에서 2초 뒤를 가리킨다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-08', officialItem: 'position 설명은 대화형 timeline 시각화와 영상이 있는 Position Parameter 문서를 보라고 안내한다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-09', officialItem: 'suppressEvents는 Boolean이고 기본값은 true다. true면 playhead가 새 위치로 옮겨 갈 때 어떤 event나 callback도 실행되지 않는다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-10', officialItem: 'seek()의 반환값은 self이며 chaining을 쉽게 하기 위한 것이다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-11', officialItem: 'playhead가 있던 자리와 새 시각 사이에 event·callback이 있어도 두 번째 인자 suppressEvents의 기본값이 true라서 실행되지 않는다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-12', officialItem: '레코드플레이어 비유 — 바늘을 들어 다른 자리로 옮긴 뒤 다시 판 위에 놓는 것과 같다고 설명한다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-13', officialItem: '옮겨 가는 동안 event·callback을 억제하고 싶지 않으면 suppressEvents를 false로 주면 된다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },
  { id: 'SEK-14', officialItem: '공식 코드 예제는 tl.seek(2), tl.seek(2, false), tl.seek("myLabel") 세 가지다.', source: 'seek', origin: 'official', sectionId: 'seek-by-name' },

  // 06 remove-label — removeLabel()
  { id: 'REM-01', officialItem: 'signature는 removeLabel( label:String ) : self 이다.', source: 'remove-label', origin: 'official', sectionId: 'remove-label' },
  { id: 'REM-02', officialItem: '설명 문장은 "timeline에서 label을 제거하고 그 label의 시각을 돌려준다"고 적혀 있다.', source: 'remove-label', origin: 'official', sectionId: 'remove-label' },
  { id: 'REM-03', officialItem: 'label은 String이며 "제거할 label의 이름"이다.', source: 'remove-label', origin: 'official', sectionId: 'remove-label' },
  { id: 'REM-04', officialItem: 'Returns 절은 self이며 chaining을 쉽게 하기 위한 것이라고 적혀 있다.', source: 'remove-label', origin: 'official', sectionId: 'remove-label' },
  { id: 'REM-05', officialItem: 'Details는 timeline에서 label을 제거한다고 적고, remove() 메서드로도 같은 일을 할 수 있다고 안내한다.', source: 'remove-label', origin: 'official', sectionId: 'remove-label' },
  { id: 'REM-06', officialItem: '공식 코드 예제는 tl.removeLabel("myLabel"); 이고 주석에 "returns the label time like 1.0"이라고 적혀 있다.', source: 'remove-label', origin: 'official', sectionId: 'remove-label' },

  // 공식 문서가 침묵하거나 실행과 어긋나는 지점 — 분모에 넣지 않고 따로 센다
  { id: 'PB-01', officialItem: 'labels는 프로토타입이 Object.prototype인 평범한 객체다. key는 label 이름(String), value는 초 단위 Number이고, label이 없으면 {}, 없는 key를 읽으면 undefined다.', source: 'labels', origin: 'implementation', sectionId: 'label-map' },
  { id: 'PB-02', officialItem: 'Object.keys(tl.labels) 순서는 시간 순이 아니라 addLabel을 부른 순서다. 5초·1초·3초 순으로 붙이면 키 순서도 그대로 late·early·mid였다.', source: 'labels', origin: 'implementation', sectionId: 'label-map' },
  { id: 'PB-20', officialItem: 'label 시각은 그 label을 소유한 timeline의 local time이다. 부모의 3초 지점에 넣은 child timeline에서 seek("childMark")를 부르면 child.time()은 1이 되고 부모의 time은 0 그대로였다.', source: 'labels', origin: 'implementation', sectionId: 'label-map' },
  { id: 'PB-03', officialItem: 'addLabel()은 실제로 timeline 자신을 돌려준다(=== 비교 true). position 없이 부르면 그 시점의 duration 자리에 붙어, 2초짜리 tween 뒤에서는 2, 1초를 더한 뒤에는 3이었다.', source: 'add-label', origin: 'implementation', sectionId: 'add-label' },
  { id: 'PB-04', officialItem: '같은 이름으로 addLabel을 다시 부르면 key가 늘지 않고 시각만 덮어쓴다. "dup"을 1초에 붙였다가 4초로 다시 붙이니 key는 1개, 값은 4였다.', source: 'add-label', origin: 'implementation', sectionId: 'add-label' },
  { id: 'PB-06', officialItem: 'position에 없는 label 이름을 쓰면 그 이름이 timeline 끝에 실제 label로 새로 생긴다. duration 5에서 addLabel("unknownRef", "noSuchLabelName")을 부르니 labels에 noSuchLabelName:5와 unknownRef:5가 함께 생겼다.', source: 'add-label', origin: 'implementation', sectionId: 'label-position' },
  { id: 'PB-09', officialItem: '백분율 표기는 "+="·"-=" 뒤에서는 label에 적용되지 않는다. duration 4에서 "+=50%"와 "+=50"이 똑같이 54, "-=25%"와 "-=25"가 똑같이 -21이었다. 반면 "<25%"와 ">-75%"는 이전 animation의 4초를 기준으로 정확히 1이었다.', source: 'add-label', origin: 'implementation', sectionId: 'label-position' },
  { id: 'PB-18', officialItem: 'duration 밖 시각에 label을 붙여도 duration()은 늘지 않는다. duration 2인 timeline에 20초 label을 붙여도 duration은 2였고, 그 label로 seek하면 2로 잘렸다.', source: 'add-label', origin: 'implementation', sectionId: 'label-position' },
  { id: 'PB-10', officialItem: 'currentLabel()은 label이 하나도 없거나 playhead가 첫 label보다 앞이면 undefined를 돌려준다. label 시각과 정확히 같은 자리에서는 그 label을 돌려줘 "at or before"가 확인됐다.', source: 'current-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-08', officialItem: 'currentLabel("없는이름")은 에러 없이 그 이름의 label을 timeline 끝에 새로 만들고 그리로 이동한다. 2.5초에서 부르니 time이 5가 되고 labels에 그 이름이 추가됐다. 또 self를 돌려주며 paused·reversed를 바꾸지 않았다.', source: 'current-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-11', officialItem: 'nextLabel()은 뒤에 label이 없으면 undefined를 돌려준다. 마지막 label 위(3초)와 그 뒤(3.5·5초) 모두 undefined였고, 정확히 label 위에서는 그 label을 건너뛰어 다음을 돌려줬다.', source: 'next-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-12', officialItem: 'previousLabel()은 첫 label 위이거나 그보다 앞이면 undefined를 돌려준다. 0초에서 undefined, 0.0001초에서 "intro"였다. 인자를 주면 playhead는 움직이지 않는다.', source: 'previous-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-13', officialItem: 'next·previousLabel은 추가 순서가 아니라 시간 순으로 찾는다. late:5·early:1·mid:3 순으로 붙인 timeline의 2초에서 previousLabel()은 early, nextLabel()은 mid였다.', source: 'next-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-14', officialItem: 'reversed 여부가 결과를 바꾸지 않는다는 공식 문장을 확인했다. 2.5초에서 정방향과 reverse() 뒤 모두 nextLabel()="outro", previousLabel()="hold"로 같았다.', source: 'next-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-19', officialItem: '공식이 권하는 tl.tweenTo(tl.nextLabel())은 nextLabel()이 undefined일 때 에러를 내지 않고 timeline 끝으로 가는 tween을 만든다. duration 4에서 vars.time이 4인 tween이 나왔다.', source: 'next-label', origin: 'implementation', sectionId: 'label-navigation' },
  { id: 'PB-15', officialItem: 'seek()은 self를 돌려주고 paused·reversed를 바꾸지 않는다. 또 점프한 시각의 값을 즉시 렌더해, 0→100을 4초에 걸쳐 바꾸는 timeline에서 seek("half")(2초) 직후 대상 값이 50이었다.', source: 'seek', origin: 'implementation', sectionId: 'seek-by-name' },
  { id: 'PB-16', officialItem: 'seek("+=1")의 기준은 현재 playhead가 아니라 timeline의 끝이다. 0초에서 부르든 1초에서 부르든 결과가 같았다. 범위를 벗어나면 0과 duration으로 잘린다 — duration 5에서 seek(99)는 5, seek(-3)은 0이었다.', source: 'seek', origin: 'implementation', sectionId: 'seek-by-name' },
  { id: 'PB-07', officialItem: 'seek("없는이름")도 에러가 아니라 그 이름의 label을 끝에 만들고 끝으로 이동한다. labels가 3개인 duration 5 timeline에서 seek("noSuchLabel") 뒤 time은 5, labels는 4개가 됐다.', source: 'seek', origin: 'implementation', sectionId: 'seek-by-name' },
  { id: 'PB-17', officialItem: 'suppressEvents를 직접 확인했다. 2.5초의 call()을 사이에 두고 0초에서 "outro"(3초)로 seek하면 기본값에서는 callback이 실행되지 않았고, seek("outro", false)에서는 실행됐다.', source: 'seek', origin: 'implementation', sectionId: 'seek-by-name' },
  { id: 'PB-05', officialItem: 'removeLabel()은 label의 시각이 아니라 timeline 자신을 돌려준다(=== 비교 true). 공식 설명 문장과 코드 주석("returns the label time like 1.0")은 3.15.0 실행과 어긋나고 Returns 절의 self만 일치한다. 없는 label을 지워도 self를 돌려주고 labels는 그대로였다.', source: 'remove-label', origin: 'implementation', sectionId: 'remove-label' },
]
