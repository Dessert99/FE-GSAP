/** instance 표면인 target·vars를 실제 생성 descriptor와 함께 검사한다. */
import { InstanceInspectorLab } from '../../examples/InstanceInspectorLab/InstanceInspectorLab'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** instance의 target·vars property가 create 입력과 이어짐을 보여 준다. */
export function TargetVarsSection() {
  return <section id="target-vars" className="draggable-create-page__section" aria-labelledby="target-vars-title"><SectionHeading number="04" id="target-vars" title="target과 vars로 만든 것을 검사한다" description="target은 지금 drag하는 object, vars는 생성 때 전달한 configuration을 읽는 instance property입니다." /><div className="draggable-create-page__prose"><p>instance의 <code>target</code>은 draggable 중인 object를 가리키므로, create에 넘긴 card와 같은 element인지 검사할 수 있습니다. <code>vars</code>는 constructor에 전달한 configuration variables를 저장하므로 type처럼 생성 때 고른 값을 읽을 수 있습니다.</p><p>아래 inspector는 control, <code>Draggable.create()</code> input, 만든 instance, <code>Draggable.get()</code> 결과, 표시 code를 하나의 descriptor와 snapshot에서 만듭니다. display가 별도의 type 문자열을 다시 조립하지 않으므로 실제 실행과 code가 어긋나지 않습니다.</p></div><InstanceInspectorLab /></section>
}
