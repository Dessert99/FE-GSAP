/** shiftChildren()의 세 인자와 경계 포함·음수 좌표·duration 변화까지 한 좌표 이동으로 설명한다. */
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 공식 Parameters와 기본값을 한 행씩 보존한다
const parameters = [
  { id: 'amount', name: 'amount', type: 'Number', fallback: '명시 없음', meaning: '각 child의 startTime을 옮길 초 수(프레임 기반 Timeline이면 frame 수)입니다.' },
  { id: 'labels', name: 'adjustLabels', type: 'Boolean', fallback: 'false', meaning: 'true면 조건에 맞는 label 시각도 함께 옮깁니다.' },
  { id: 'boundary', name: 'ignoreBeforeTime', type: 'Number', fallback: '0', meaning: '이 시각 이상에서 시작하는 child만 옮깁니다. 기본 0은 모든 비음수 child를 뜻합니다.' },
]

export function ShiftChildrenSection() {
  return (
    <section id="shift-children" className="placement-page__section" aria-labelledby="shift-children-title">
      <SectionHeading
        number="05"
        id="shift-children"
        title="이미 놓인 child를 통째로 밀기"
        description="position은 넣는 순간의 자리를 정합니다. shiftChildren()은 이미 들어 있는 child의 startTime을 같은 amount만큼 옮겨 앞이나 중간에 새 sequence를 끼울 공간을 만듭니다."
      />

      <pre className="placement-page__code"><code>{'shiftChildren( amount:Number, adjustLabels:Boolean, ignoreBeforeTime:Number ) : self'}</code></pre>

      <div className="placement-page__table-wrap">
        <table className="placement-page__rules-table">
          <caption>공식 Parameters와 Returns</caption>
          <thead><tr><th scope="col">인자</th><th scope="col">타입</th><th scope="col">기본값</th><th scope="col">역할</th></tr></thead>
          <tbody>
            {parameters.map((entry) => (
              <tr key={entry.id}><th scope="row"><code>{entry.name}</code></th><td><code>{entry.type}</code></td><td><code>{entry.fallback}</code></td><td>{entry.meaning}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="placement-page__note">
        <h3>Returns는 self이고 공식 코드 예제 블록은 없습니다</h3>
        <p>반환값은 체이닝을 쉽게 하기 위한 <code>self</code>입니다. 공식은 호출 예제 대신 <strong>앞에 child를 붙이거나 중간에 끼워 넣을 때 기존 child를 뒤로 밀어 공간을 만든다</strong>는 용도를 설명합니다.</p>
      </div>

      <div className="placement-page__warning">
        <h3>공식 설명 안의 인자 이름이 signature와 다릅니다</h3>
        <p>signature와 Parameters 행의 이름은 <code>ignoreBeforeTime</code>인데, 같은 행의 설명문은 경계를 <code>startAtTime</code>이라고 부릅니다. 별도 인자가 아니라 같은 경계를 가리키는 공식 원문의 명칭 불일치라 둘 다 그대로 보존합니다.</p>
      </div>

      <div className="placement-page__split">
        <div className="placement-page__prose">
          <p><strong>전체를 2초 뒤로</strong></p>
          <pre className="placement-page__code"><code>{`timeline.shiftChildren(2)
// 0, 1, 3초 child → 2, 3, 5초`}</code></pre>
        </div>
        <div className="placement-page__prose">
          <p><strong>2초 이후만 밀고 label도 함께</strong></p>
          <pre className="placement-page__code"><code>{`timeline.shiftChildren(1, true, 2)
// startTime이 2 이상인 child와 label만 +1초`}</code></pre>
        </div>
      </div>

      <div className="placement-page__note placement-page__note--probe">
        <h3>경계값은 포함됩니다</h3>
        <p>공식 문장의 <strong>"at or after"</strong> 그대로, <code>ignoreBeforeTime</code>과 정확히 같은 시각에 시작하는 child도 이동했습니다. <code>adjustLabels: true</code>일 때 label도 같은 포함 경계를 따랐습니다.</p>
        <p className="placement-page__provenance">GSAP 3.15.0에서 0·1·2·3초 child와 label을 만들고 <code>shiftChildren(1, true, 2)</code> 전후의 startTime과 labels를 읽었습니다.</p>
      </div>

      <div className="placement-page__warning">
        <h3>음수로 밀었다가 기본 인자로 되돌리면 일부가 남을 수 있습니다</h3>
        <p><code>shiftChildren(-2)</code>로 startTime이 음수가 된 child는 다음 <code>shiftChildren(2)</code>에서 기본 경계 0보다 앞에 있어 제외됩니다. 되돌리려면 음수 <code>ignoreBeforeTime</code>을 명시해 그 child도 포함해야 합니다.</p>
      </div>

      <div className="placement-page__note placement-page__note--probe">
        <h3>음수 startTime이 있으면 duration은 전체 폭입니다</h3>
        <p>측정한 다섯 fixture에서 Timeline <code>duration()</code>은 <code>max(0, 가장 늦은 endTime) − min(0, 가장 이른 startTime)</code>과 같았습니다. 모든 child가 0초 전에 끝나도 0까지의 폭을 세고, 양쪽 어느 방향으로도 튀어나오지 않으면 일반적인 마지막 endTime과 같습니다.</p>
        <p className="placement-page__provenance">공식 문서가 계산식을 제공하지 않아 GSAP 3.15.0에서 양수 범위·음수 혼합·전부 음수인 다섯 조합의 최소 startTime·최대 endTime·duration을 비교했습니다.</p>
      </div>
    </section>
  )
}
