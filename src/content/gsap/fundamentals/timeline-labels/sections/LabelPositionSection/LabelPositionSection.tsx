/** addLabel()의 position 문법 전체와 label 자체에는 길이가 없어서 생기는 퍼센트 예외를 보존한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 addLabel() 페이지의 position 표기 15개를 기준점별 한 표로 보존한다
const forms = [
  ['3', 'Timeline 시작에서 3초'], ['"someLabel"', '그 label 시각, 없으면 끝에 새 label 생성'], ['"<"', '가장 최근 animation 시작'], ['">"', '가장 최근 animation 끝'], ['"+=1"', 'Timeline 끝에서 1초 뒤'], ['"-=1"', 'Timeline 끝에서 1초 앞'], ['"myLabel+=2"', 'myLabel에서 2초 뒤'], ['"<+=3"', '최근 animation 시작에서 3초 뒤'], ['"<3"', '"<+=3"과 같음'], ['">-0.5"', '최근 animation 끝에서 0.5초 앞'], ['"-=25%"', '공식: 삽입 대상 total duration의 25% overlap'], ['"+=50%"', '공식: 삽입 대상 total duration의 50% gap'], ['"<25%"', '최근 animation total duration의 25%'], ['"<+=25%"', '공식: 삽입 대상 total duration의 25%'], ['"myLabel+=30%"', '공식: 삽입 대상 total duration의 30%'],
] as const

export function LabelPositionSection() {
  return (
    <section id="label-position" className="labels-page__section" aria-labelledby="label-position-title">
      <SectionHeading number="03" id="label-position" title="이름을 어디에 붙일지 정하기" description="label도 animation과 같은 position 언어를 받지만 길이 0인 이름표라는 점 때문에 퍼센트 상대값에는 실행상 예외가 생깁니다." />
      <div className="labels-page__table-wrap"><table className="labels-page__table"><caption>공식 position 표기 전체</caption><thead><tr><th scope="col">표기</th><th scope="col">공식 설명</th></tr></thead><tbody>{forms.map(([form, meaning]) => <tr key={form}><th scope="row"><code>{form}</code></th><td>{meaning}</td></tr>)}</tbody></table></div>
      <div className="labels-page__note"><p>퍼센트의 total duration에는 repeat·yoyo가 포함되고, 퍼센트 표기는 GSAP 3.7.0에서 추가됐습니다. 여기서 "이전 animation"은 시간상 마지막이 아니라 <strong>가장 최근에 삽입된 animation</strong>입니다.</p></div>
      <div className="labels-page__warning"><h3>label에는 삽입 animation의 total duration이 없습니다</h3><p>공식 표는 animation용 공통 설명을 그대로 싣지만 label은 길이 0인 이름표입니다. GSAP 3.15.0 실행에서 <code>"+=50%"</code>는 퍼센트 50이 숫자 50처럼 해석돼 duration 4의 끝에서 50초 뒤인 <strong>54</strong>, <code>"-=25%"</code>는 <strong>-21</strong>이 됐습니다. 반면 <code>"&lt;25%"</code>와 <code>"&gt;-75%"</code>는 이전 animation 4초를 기준으로 1초였습니다.</p><p>공식과 다르게 적은 의도된 실행 결과입니다. label position에서 삽입 대상 기준 퍼센트는 쓰지 않는 편이 안전합니다.</p></div>
      <div className="labels-page__note labels-page__note--probe"><h3>없는 label 참조와 duration 밖 label</h3><p>duration 5에서 <code>addLabel('unknownRef', 'noSuchLabelName')</code>을 호출하면 두 이름 모두 5초에 생겼습니다. duration 2인 Timeline에 20초 label을 붙여도 duration은 2 그대로이고, 그 이름으로 seek하면 2초로 잘렸습니다.</p><p className="labels-page__provenance">공식은 없는 참조 label을 끝에 만든다고만 적고, label이 duration을 늘리는지 밝히지 않아 labels와 duration·seek 결과를 직접 읽었습니다.</p></div>
      <div className="labels-page__note"><p>공식 페이지는 별도 <strong>Position Parameter Interactive Demo</strong>와 대화형 timeline·영상이 포함된 Understanding the Position Parameter 튜토리얼을 안내합니다.</p></div>
    </section>
  )
}
