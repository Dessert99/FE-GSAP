/** 값의 종류에 따라 vars의 어느 자리에 적어야 하는지를 먼저 판단하게 한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

// 세 채널을 target 모양·목적지 모양·결정적 주의점으로 나란히 비교하는 정적 표의 데이터
const channels = [
  {
    id: 'css',
    label: 'CSS property',
    target: 'DOM element',
    destination: 'vars 맨 바깥에 그대로',
    example: "gsap.to('.box', { x: 200, opacity: 0 })",
    caution: 'CSS 값과 transform은 별도 페이지에서 설명합니다.',
    owner: null,
  },
  {
    id: 'attribute',
    label: 'DOM·SVG attribute',
    target: 'DOM·SVG element',
    destination: 'attr: { 이름: 값 } 안에',
    example: "gsap.to('#rect', { attr: { width: 100 } })",
    caution: 'CSS 관련 property를 attr 안에 넣으면 안 됩니다.',
    owner: 'Attributes',
  },
  {
    id: 'array',
    label: '숫자 배열의 각 칸',
    target: '숫자 배열 자체',
    destination: 'endArray: [값, ...]에',
    example: 'gsap.to(arr, { endArray: [5, 6, 7] })',
    caution: '길이가 다르면 양쪽에 다 있는 index만 움직입니다.',
    owner: 'EndArray',
  },
]

export function ValueChannelSection() {
  return (
    <section id="value-channel" className="non-css-page__section" aria-labelledby="value-channel-title">
      <SectionHeading
        number="01"
        id="value-channel"
        title="값이 갈 곳을 먼저 고른다"
        description="GSAP에서 무언가를 움직이려면 목표값을 vars 객체에 적습니다. 그런데 값의 종류에 따라 적는 자리가 다릅니다. 이 자리를 이 페이지에서는 채널이라고 부릅니다."
      />

      <div className="non-css-page__prose">
        <p>
          먼저 용어 하나만 정하겠습니다. <strong>채널</strong>은 GSAP이 매 프레임 값을 써 넣는 자리입니다. CSS 스타일에 쓸 수도 있고,
          element의 attribute에 쓸 수도 있고, 배열의 특정 칸에 쓸 수도 있습니다. 시간이 흐르는 방식은 셋 다 똑같고,{' '}
          <strong>결과를 어디에 적느냐만 다릅니다.</strong>
        </p>
        <p>
          채널을 고르는 기준은 간단합니다. <strong>움직이려는 값이 지금 어디에 들어 있는지</strong> 보면 됩니다. 화면 스타일에 있으면
          CSS, element 태그의 속성에 있으면 attribute, JavaScript 배열 안에 있으면 배열 칸입니다.
        </p>
      </div>

      <div className="non-css-page__note">
        <h3>둘 다 이미 들어 있습니다</h3>
        <p>
          attribute를 담당하는 <strong>AttrPlugin</strong>과 배열을 담당하는 <strong>EndArrayPlugin</strong>은 공식 문서가 말하는{' '}
          <em>internal plugin</em>입니다. GSAP core에 자동으로 포함되어 있어서 <code>gsap.registerPlugin()</code>으로 따로 등록할 필요가
          없습니다. 별도 설치도, import 한 줄도 필요 없습니다. 그냥 <code>attr</code>이나 <code>endArray</code>를 적으면 동작합니다.
        </p>
      </div>

      <div className="non-css-page__table-wrap">
        <table className="non-css-page__channel-table">
          <caption>움직이려는 값의 위치로 채널 고르기</caption>
          <thead>
            <tr>
              <th scope="col">값의 종류</th>
              <th scope="col">target에 넘기는 것</th>
              <th scope="col">목표값을 적는 자리</th>
              <th scope="col">가장 짧은 형태</th>
              <th scope="col">먼저 알아야 할 것</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((channel) => (
              <tr key={channel.id}>
                <th scope="row">
                  {channel.label}
                  {channel.owner ? <small>{channel.owner} 문서</small> : <small>비교용</small>}
                </th>
                <td>{channel.target}</td>
                <td>
                  <code>{channel.destination}</code>
                </td>
                <td>
                  <code>{channel.example}</code>
                </td>
                <td>{channel.caution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="non-css-page__note">
        가운데 행과 아래 행이 이 페이지의 내용입니다. 맨 위 CSS 행은 <strong>비교용</strong>입니다. CSS 값과 transform이 실제로
        어떻게 처리되는지는 <a href={toHref('/fundamentals/css-animation')}>CSS animation 페이지</a>에서 확인할 수 있습니다.
      </p>
    </section>
  )
}
