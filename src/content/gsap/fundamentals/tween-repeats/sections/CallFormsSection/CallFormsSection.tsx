/** 다섯 메서드의 signature·인자·기본값·반환값을 공식 문서에 적힌 그대로 한 표에 모은다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

/** 공식 페이지가 게시한 호출 계약 한 줄 — 게시되지 않은 칸은 추측하지 않고 그대로 밝힌다. */
type CallForm = {
  name: string
  signature: string
  parameter: string
  defaultValue: string
  returns: string
}

// 다섯 공식 페이지의 signature 블록과 Parameters·Returns 절을 그대로 옮긴 것
const callForms: CallForm[] = [
  {
    name: 'repeat()',
    signature: 'repeat( value:Number ) : [Number | self]',
    parameter: 'value · Number',
    defaultValue: '0',
    returns: 'Number 또는 self',
  },
  {
    name: 'repeatDelay()',
    signature: 'repeatDelay( value:Number ) : [Number | self]',
    parameter: 'value · Number',
    defaultValue: 'NaN',
    returns: 'Number 또는 self',
  },
  {
    name: 'yoyo()',
    signature: 'yoyo( value:Boolean ) : [Boolean | self]',
    parameter: 'value · Boolean',
    defaultValue: 'false',
    returns: 'Boolean 또는 self',
  },
  {
    name: 'iteration()',
    signature: 'iteration( ) : [Number | self]',
    parameter: '공식 페이지에 Parameters 절 없음',
    defaultValue: '공식 페이지에 명시 없음',
    returns: 'Number 또는 self',
  },
  {
    name: 'invalidate()',
    signature: 'invalidate( ) : self',
    parameter: '공식 페이지에 Parameters 절 없음',
    defaultValue: '해당 없음 · 인자를 받지 않음',
    returns: 'self',
  },
]

export function CallFormsSection() {
  return (
    <section id="call-forms" className="repeats-page__section" aria-labelledby="call-forms-title">
      <SectionHeading
        number="06"
        id="call-forms"
        title="다섯 메서드의 호출 형식"
        description="앞에서 다룬 다섯 메서드가 공식 문서에 어떤 형태로 적혀 있는지 한자리에 모았습니다. 게시되지 않은 칸은 추측해 채우지 않았습니다."
      />

      <div className="repeats-page__prose">
        <p>
          다섯 메서드 중 넷은 <strong>같은 규칙</strong>을 따릅니다. 공식 문서가 네 페이지에 똑같이 실어 둔 문장입니다 —{' '}
          <strong>"인자를 생략하면 현재 값을 돌려주는 getter이고, 인자를 넘기면 값을 설정하는 setter이며 chaining을 위해 instance 자신을
          돌려준다."</strong>
        </p>
        <p>
          <code>invalidate()</code>만 다릅니다. 읽을 값이 없으므로 getter가 없고 언제나 <strong>self</strong>를 돌려줍니다. 공식 문서는
          그 이유를 <strong>"chaining을 쉽게 하기 위한 것"</strong>이라고 적었습니다.
        </p>
      </div>

      <div className="repeats-page__table-wrap">
        <table className="repeats-page__rules-table">
          <caption>공식 페이지의 signature 블록과 Parameters·Returns 절을 그대로 옮긴 것 · 대조일 2026-08-04</caption>
          <thead>
            <tr>
              <th scope="col">메서드</th>
              <th scope="col">signature</th>
              <th scope="col">인자</th>
              <th scope="col">기본값</th>
              <th scope="col">반환</th>
            </tr>
          </thead>
          <tbody>
            {callForms.map((form) => (
              <tr key={form.name}>
                <th scope="row">
                  <code>{form.name}</code>
                </th>
                <td>
                  <code>{form.signature}</code>
                </td>
                <td>{form.parameter}</td>
                <td>{form.defaultValue}</td>
                <td>{form.returns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="repeats-page__warning">
        <h3>
          <code>iteration()</code>의 signature는 인자를 적어 두지 않았습니다
        </h3>
        <p>
          공식 signature는 <code>iteration( ) : [Number | self]</code>로 괄호 안이 비어 있고 Parameters 절도 없습니다. 그런데 같은
          페이지의 Details는 <strong>"iteration을 설정하면 tween이 그 iteration으로 이동한다"</strong>며 setter 사용법을 설명하고, 코드
          예제도 <code>myTween.iteration(2)</code>를 보여줍니다. 공식 문서 안에서 어긋나는 부분이므로 여기서는{' '}
          <strong>양쪽을 그대로</strong> 옮겼습니다. 인자의 이름·타입·기본값을 지어내지 않았습니다.
        </p>
      </div>

      <div className="repeats-page__note repeats-page__note--probe">
        <h3>공식 문서에 없고 실행으로 확인한 내용</h3>
        <p>
          <code>repeatDelay()</code>의 기본값이 <code>NaN</code>으로 적혀 있지만, 실제로 <code>repeatDelay</code>를 지정하지 않은 Tween에서{' '}
          <code>repeatDelay()</code>를 읽으면 <strong>숫자 0</strong>이 나옵니다. <code>NaN</code>이 아닙니다.{' '}
          <code>Number.isNaN(tween.repeatDelay())</code>도 <code>false</code>입니다.
        </p>
        <p>
          표의 <code>NaN</code>은 공식 문서에 적힌 값이고, 이 문단은 실행값입니다. 값이 설정되지 않았음을 <code>NaN</code>으로 판별하려는
          코드는 동작하지 않습니다.
        </p>
        <p className="repeats-page__provenance">
          측정 방법 · GSAP 3.15.0에서 <code>gsap.to(&#123;v:0&#125;, &#123;v:1, duration:1, paused:true&#125;)</code>를 만들고 인자 없이{' '}
          <code>repeat()</code>·<code>repeatDelay()</code>·<code>yoyo()</code>·<code>iteration()</code>을 읽어 각각{' '}
          <code>0</code>·<code>0</code>·<code>false</code>·<code>1</code>을 얻었습니다.
        </p>
      </div>
    </section>
  )
}
