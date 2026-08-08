/** CSSOM lookup 실패를 실행으로 유발하지 않고 원인·확인·안전한 다음 행동으로 분리한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const failures = [
  { case: 'selector를 찾지 못함', reason: 'selector가 실제 rule과 정확히 일치하지 않거나 stylesheet에 없다.', check: 'getRule() 결과를 tween 전에 확인한다.', action: '구체 selector와 stylesheet rule을 다시 대조하고 tween을 만들지 않는다.' },
  { case: '다른 origin stylesheet', reason: 'browser가 CSSOM rule 읽기를 제한할 수 있다.', check: '개발자 도구에서 stylesheet origin과 CORS 설정을 확인한다.', action: 'runtime에서 우회 접근을 시도하지 말고 same-origin rule 또는 다른 표현을 고른다.' },
  { case: 'media query 안의 rule', reason: '공식 문서가 접근하거나 tween하지 못할 수 있다고 경고한다.', check: '현재 조건에서 rule을 읽을 수 있는지 먼저 확인한다.', action: '실행 예제는 일반 same-origin rule로 제한하고 fallback UI를 유지한다.' },
] as const

export function FailureMatrixSection() {
  return (
    <section id="failure-matrix" className="css-rule-plugin-page__section" aria-labelledby="failure-matrix-title">
      <SectionHeading number="04" id="failure-matrix" title="찾지 못하거나 읽지 못하는 경계를 먼저 봅니다" description="CSSRulePlugin은 browser의 stylesheet CSSOM을 읽습니다. 예제는 위험한 실패를 일부러 일으키지 않고, 실패 전 확인할 조건을 정적으로 보여 줍니다." />
      <div className="css-rule-plugin-page__table-wrap"><table className="css-rule-plugin-page__table"><thead><tr><th scope="col">상황</th><th scope="col">왜</th><th scope="col">먼저 확인</th><th scope="col">다음 행동</th></tr></thead><tbody>{failures.map((failure) => <tr key={failure.case}><th scope="row">{failure.case}</th><td>{failure.reason}</td><td>{failure.check}</td><td>{failure.action}</td></tr>)}</tbody></table></div>
      <div className="css-rule-plugin-page__warning"><strong>공식 문서의 범위:</strong> media query 안의 style은 “may not be accessible or tweenable”입니다. 모든 media query rule이 항상 실패한다고 일반화하지 않습니다.</div>
    </section>
  )
}
