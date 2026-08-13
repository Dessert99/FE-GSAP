/** 일곱 메서드가 공유하는 인자·반환 계약을 한 번만 설명해 이후 섹션이 의미에만 집중하게 한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 다섯 메서드가 공식 문서에서 글자 그대로 같은 인자·반환 절을 갖는다는 것을 한 표로 보인다
const dualMethods = [
  { name: 'delay', signature: 'delay( value:Number ) : [Number | self]' },
  { name: 'duration', signature: 'duration( value:Number ) : [Number | self]' },
  { name: 'totalDuration', signature: 'totalDuration( value:Number ) : [Number | self]' },
  { name: 'startTime', signature: 'startTime( value:Number ) : [Number | self]' },
  { name: 'timeScale', signature: 'timeScale( value:Number ) : [Number | self]' },
]

// 공식 문서가 각 페이지의 Details 절에 실제로 실어 둔 체이닝 예시 원문
const officialChains = [
  { source: 'delay', code: 'myAnimation.delay(2).timeScale(0.5).restart(true);' },
  { source: 'duration', code: 'myAnimation.duration(2).delay(0.5).play(1);' },
]

export function GetterSetterSection() {
  return (
    <section id="getter-setter" className="timing-page__section" aria-labelledby="getter-setter-title">
      <SectionHeading
        number="02"
        id="getter-setter"
        title="다섯 getter/setter의 공통 규칙"
        description="메서드를 하나씩 외울 필요가 없습니다. 다섯 개는 인자·반환 규칙이 글자 그대로 같고, 나머지 둘만 다릅니다. 이 규칙을 여기서 한 번 익히면 나머지 섹션은 의미만 읽으면 됩니다."
      />

      <div className="timing-page__prose">
        <p>
          GSAP의 시간 관련 메서드 대부분은 <strong>getter이자 setter</strong>입니다. 낯선 말 같지만 규칙은 한 줄입니다 —{' '}
          <strong>괄호를 비워 두면 읽고, 숫자를 넣으면 씁니다.</strong>
        </p>
        <p>
          공식 문서가 다섯 페이지에 똑같이 적어 둔 문장은 이것입니다.{' '}
          <strong>
            "인자를 생략하면 현재 값을 돌려주고(getter), 인자를 정의하면 값을 설정한 뒤(setter) 체이닝을 쉽게 하도록 인스턴스 자신을
            돌려준다."
          </strong>
        </p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>인자와 반환값이 글자 그대로 같은 다섯 메서드</caption>
          <thead>
            <tr>
              <th scope="col">메서드</th>
              <th scope="col">공식 signature</th>
              <th scope="col">인자</th>
              <th scope="col">인자를 생략하면</th>
              <th scope="col">인자를 주면</th>
            </tr>
          </thead>
          <tbody>
            {dualMethods.map((method) => (
              <tr key={method.name}>
                <th scope="row">
                  <code>{method.name}</code>
                </th>
                <td>
                  <code>{method.signature}</code>
                </td>
                <td>
                  <code>value: Number</code>
                  <small>기본값 NaN</small>
                </td>
                <td>현재 값(Number)</td>
                <td>인스턴스 자신(self)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timing-page__note">
        <h3>기본값 NaN이 뜻하는 것</h3>
        <p>
          공식 문서는 다섯 페이지 모두 인자의 기본값을 <code>NaN</code>으로 표시하지만, 바로 다음 문장에서{' '}
          <strong>인자를 생략하면 getter가 된다</strong>고 계약을 설명합니다. 따라서 이 표기는 Tween의 <code>delay</code>나{' '}
          <code>duration</code> 자체가 <code>NaN</code>이라는 뜻이 아닙니다. getter로 읽을 때는 숫자를 전달하지 않고 괄호를 비웁니다.
        </p>
      </div>

      <div className="timing-page__subheading">
        <h3>인스턴스를 돌려준다는 것의 쓸모</h3>
        <p>
          setter가 값을 돌려주지 않고 <strong>자기 자신</strong>을 돌려주기 때문에, 점을 찍어 계속 이어 붙일 수 있습니다. 공식 문서가
          직접 실어 둔 두 예시입니다.
        </p>
      </div>

      <div className="timing-page__table-wrap">
        <table className="timing-page__rules-table">
          <caption>공식 문서에 실린 체이닝 예시</caption>
          <thead>
            <tr>
              <th scope="col">출처</th>
              <th scope="col">코드</th>
            </tr>
          </thead>
          <tbody>
            {officialChains.map((chain) => (
              <tr key={chain.source}>
                <th scope="row">
                  <code>{chain.source}()</code>
                </th>
                <td>
                  <code>{chain.code}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="timing-page__warning">
        <h3>나머지 둘은 모양이 다릅니다</h3>
        <p>
          <code>endTime( includeRepeats:Boolean ) : Number</code>는 <strong>setter가 없습니다.</strong> 인자는 값이 아니라 "반복을 셀
          것인가"를 정하는 Boolean이고, 언제나 Number만 돌려줍니다.
        </p>
        <p>
          <code>globalTime( localTime:Number ) : Number</code>도 <strong>setter가 없습니다.</strong> 인자는 설정할 값이 아니라{' '}
          <strong>변환할 입력값</strong>이고, 반환값은 변환 결과인 Number입니다. 두 메서드는 각각{' '}
          <a href="#start-end">04 섹션</a>과 <a href="#global-time">06 섹션</a>에서 자세히 다룹니다.
        </p>
      </div>
    </section>
  )
}
