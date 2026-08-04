/** 두 공식 페이지가 링크로만 남긴 자료와 이 페이지가 소유하지 않는 영역을 정리한다. */
import { OfficialDocsLink } from '../../../../../../components/demo/OfficialDocsLink/OfficialDocsLink'
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const swarmCode = `// 공식 문서가 예로 든 조합 — 같은 대상의 x와 y에 무작위 wiggle 두 개
gsap.to('.dot', { x: 40, ease: 'wiggle({type:random, wiggles:12})', duration: 3 })
gsap.to('.dot', { y: 40, ease: 'wiggle({type:random, wiggles:9})', duration: 3 })`

/** 공식 두 페이지가 본문 대신 embed·링크로만 남긴 자료다. */
const linkedResources = [
  {
    source: 'CustomBounce',
    label: 'Ease walkthrough',
    detail: 'Description 아래에 붙은 영상 자료입니다. 본문 텍스트가 아니라 embed라 문서에서 내용을 확인할 수 없습니다.',
  },
  {
    source: 'CustomBounce',
    label: 'Demos',
    detail: '"CustomBounce demos" CodePen 모음으로 연결됩니다.',
  },
  {
    source: 'CustomWiggle',
    label: 'Ease walkthrough',
    detail: 'Description 아래에 붙은 영상 자료입니다. CustomBounce와 같은 자리에 있습니다.',
  },
  {
    source: 'CustomWiggle',
    label: 'Demo · CustomWiggle Types',
    detail:
      '다섯 type을 보여 주는 인터랙티브 demo가 embed돼 있고, type 설명이 이 demo를 가리킵니다. 그래서 이 페이지는 type의 모양을 문서가 아니라 실행으로 확인했습니다.',
  },
  {
    source: 'CustomWiggle',
    label: 'Demo collection',
    detail: '"CustomWiggle demos" CodePen 모음으로 연결됩니다.',
  },
]

export function BoundariesSection() {
  return (
    <section id="boundaries" className="bounce-wiggle-page__section" aria-labelledby="boundaries-title">
      <SectionHeading
        number="08"
        id="boundaries"
        title="여기서 다루지 않는 것"
        description="공식 문서가 링크로만 남긴 자료와, 다른 페이지가 소유한 개념을 구분해 둡니다."
      />

      <div className="bounce-wiggle-page__subheading">
        <h3>rotation 말고 다른 property에도 씁니다</h3>
      </div>

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            지금까지의 예제는 모두 <code>rotation</code>을 썼지만, 공식 문서는 분명히 밝힙니다.{' '}
            <strong>"흔들림은 rotation 전용이 아니다. 어떤 property에도 쓸 수 있다."</strong>
          </p>
          <p>
            공식 문서가 든 예가 <strong>swarm(벌레 떼) 효과</strong>입니다. <code>"x"</code>와 <code>"y"</code>에 무작위 wiggle
            tween 두 개만 걸면 대상이 제자리에서 어지럽게 떠다니는 것처럼 보입니다.
          </p>
          <p>
            이 페이지의 예제에서는 이 조합을 실행하지 않습니다. 한 화면에서 <strong>하나의 변화</strong>만 보는 편이 곡선과 값의
            관계를 이해하기 쉽기 때문입니다. 원리는 같으니 오른쪽 형태를 그대로 옮겨 쓰면 됩니다.
          </p>
        </div>
        <pre className="bounce-wiggle-page__code">
          <code>{swarmCode}</code>
        </pre>
      </div>

      <div className="bounce-wiggle-page__subheading">
        <h3>공식 문서가 링크와 embed로만 남긴 자료</h3>
      </div>

      <div className="bounce-wiggle-page__table-wrap">
        <table className="bounce-wiggle-page__options-table">
          <caption>본문 텍스트가 아니라 별도 자료로 연결된 항목 · 이 페이지는 내용을 옮기지 않습니다</caption>
          <thead>
            <tr>
              <th scope="col">공식 문서</th>
              <th scope="col">자료</th>
              <th scope="col">설명</th>
            </tr>
          </thead>
          <tbody>
            {linkedResources.map((item) => (
              <tr key={`${item.source}-${item.label}`}>
                <th scope="row">{item.source}</th>
                <td>{item.label}</td>
                <td>{item.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bounce-wiggle-page__note">
        <h3>다른 페이지가 소유한 개념</h3>
        <ul className="bounce-wiggle-page__list">
          <li>
            <a href={toHref('/fundamentals/installation')}>GSAP 가져오기와 등록하기</a> — import 경로와{' '}
            <code>registerPlugin()</code>의 시점·규칙. 이 페이지는 두 generator가 CustomEase를 필요로 한다는 사실만 다룹니다.
          </li>
          <li>
            <a href={toHref('/fundamentals/easing')}>Easing</a> — ease의 정의, 내장 ease 목록, 곡선을 읽는 법. 내장{' '}
            <code>"bounce"</code>의 계약도 여기가 소유합니다.
          </li>
          <li>
            <a href={toHref('/fundamentals/tween-start-end-values')}>Tween 시작·끝 값</a> — 공식 bounce 예제가 쓴{' '}
            <code>gsap.from()</code>의 의미.
          </li>
          <li>
            <a href={toHref('/fundamentals/css-animation')}>CSS animation</a> — <code>y</code>, <code>rotation</code>,{' '}
            <code>scaleX</code>, <code>transformOrigin</code>의 전체 동작.
          </li>
          <li>
            <a href={toHref('/fundamentals/tween-playhead')}>Tween playhead</a> — 두 예제의 progress 조작에 쓴{' '}
            <code>progress()</code>의 정확한 계약.
          </li>
        </ul>
      </div>

      <div className="bounce-wiggle-page__note">
        <h3>공식 문서가 아예 적지 않은 것</h3>
        <p>
          두 페이지 어디에도 <strong>등록 해제 방법, 잘못된 설정값을 줬을 때의 동작, SSR 환경에서의 동작,{' '}
          <code>squash</code>·<code>wiggles</code>·고급 ease의 허용 범위</strong>가 없습니다. 이 페이지는 그 자리를 추측으로 채우지
          않았습니다. 필요하면 직접 실행해 확인하고, 확인한 사실은 위 예제들처럼 <strong>공식 주장과 구분해서</strong> 적는 것이
          안전합니다.
        </p>
      </div>

      <div className="bounce-wiggle-page__official">
        <span>원문 확인</span>
        <OfficialDocsLink label="CustomBounce" href="https://gsap.com/docs/v3/Eases/CustomBounce" />
        <OfficialDocsLink label="CustomWiggle" href="https://gsap.com/docs/v3/Eases/CustomWiggle" />
      </div>
    </section>
  )
}
