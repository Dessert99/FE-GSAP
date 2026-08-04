/** config 세 옵션의 타입·기본값·역할을 공식 명세대로 정리하고 scope 예제로 확인시킨다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { ScopeLab } from '../../examples/ScopeLab/ScopeLab'

const configExample = `useGSAP(() => {
  // gsap code here
}, { dependencies: [endX], scope: container, revertOnUpdate: true })`

// 공식 Config Object 절이 밝힌 세 옵션
const options = [
  {
    name: 'dependencies',
    type: 'Array / null',
    defaultValue: '[]',
    detail: '내부 useEffect에 그대로 전달되는 의존성 배열입니다.',
  },
  {
    name: 'scope',
    type: 'React ref',
    defaultValue: '공식 페이지에 명시 없음',
    detail: 'container를 지정하면 훅 안의 모든 GSAP selector text가 그 container의 자손으로 한정됩니다.',
  },
  {
    name: 'revertOnUpdate',
    type: 'Boolean',
    defaultValue: 'false',
    detail: '기본값에서는 의존성이 바뀌어도 GSAP 객체가 revert되지 않고 반환한 cleanup 함수도 실행되지 않습니다.',
  },
]

export function ConfigObjectSection() {
  return (
    <section id="config-object" className="react-gsap-page__section" aria-labelledby="config-object-title">
      <SectionHeading
        number="03"
        id="config-object"
        title="옵션 세 개가 정하는 것"
        description="언제 다시 실행할지, 어디서 찾을지, 다시 실행할 때 이전 것을 치울지. 세 옵션이 각각 하나씩 맡습니다."
      />

      <pre className="react-gsap-page__code">
        <code>{configExample}</code>
      </pre>

      <div className="react-gsap-page__table-wrap">
        <table className="react-gsap-page__rules-table">
          <caption>공식 Config Object 절이 밝힌 세 옵션</caption>
          <thead>
            <tr>
              <th scope="col">옵션</th>
              <th scope="col">타입</th>
              <th scope="col">기본값</th>
              <th scope="col">무엇을 정하나</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option) => (
              <tr key={option.name}>
                <th scope="row">
                  <code>{option.name}</code>
                </th>
                <td>{option.type}</td>
                <td>
                  <code>{option.defaultValue}</code>
                </td>
                <td>{option.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="react-gsap-page__warning">
        <h3>revertOnUpdate의 설명은 거꾸로 읽어야 합니다</h3>
        <p>
          공식 문서는 이 옵션을 <strong>기본값 기준으로</strong> 서술합니다. "의존성이 바뀌어도 revert되지 <strong>않고</strong>{' '}
          cleanup도 실행되지 <strong>않는다</strong>"가 <code>false</code>일 때의 이야기입니다. 그래서 <code>true</code>로 두면 그 반대,
          즉 <strong>의존성이 바뀔 때마다 이전 것을 되돌리고 cleanup을 실행</strong>합니다.
        </p>
        <p>
          이 학습 사이트의 예제는 대부분 <code>revertOnUpdate: true</code>를 씁니다. slider를 움직일 때마다 이전 Tween이 남아 있으면
          같은 대상에 여러 Tween이 겹치기 때문입니다.
        </p>
      </div>

      <ScopeLab />
    </section>
  )
}
