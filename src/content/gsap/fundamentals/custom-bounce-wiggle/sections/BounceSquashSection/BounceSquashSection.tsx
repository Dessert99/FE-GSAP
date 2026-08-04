/** 위치 Tween과 scale Tween을 같은 대상·같은 시각에 겹쳐야 찌그러짐이 맞물린다는 공식 패턴을 설명한다. */
import { toHref } from '../../../../../../app/routes'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'

const officialPairCode = `//do the bounce by affecting the "y" property.
gsap.from(".class", { duration: 2, y: -200, ease: "myBounce" });

//and do the squash/stretch at the same time:
gsap.to(".class", {
  duration: 2,
  scaleX: 1.4,
  scaleY: 0.6,
  ease: "myBounce-squash",
  transformOrigin: "center bottom",
});`

export function BounceSquashSection() {
  return (
    <section id="bounce-squash" className="bounce-wiggle-page__section" aria-labelledby="bounce-squash-title">
      <SectionHeading
        number="04"
        id="bounce-squash"
        title="위치와 찌그러짐을 Tween 두 개로 맞춘다"
        description="곡선이 두 개 만들어졌다는 것은 Tween도 두 개라는 뜻입니다. 대상은 하나이고, 두 Tween이 같은 시각에 함께 흐릅니다."
      />

      <div className="bounce-wiggle-page__split">
        <div className="bounce-wiggle-page__prose">
          <p>
            공식 문서는 이렇게 묻고 바로 답합니다. <strong>"bounce와 squash·stretch를 어떻게 함께 동작시키나요? tween 두 개를
            씁니다. 하나는 위치(y), 다른 하나는 scaleX와 scaleY이며 둘이 동시에 실행됩니다."</strong>
          </p>
          <p>
            중요한 것은 <strong>대상이 둘이 아니라는 점</strong>입니다. 공 하나에 Tween 두 개가 겹칠 뿐입니다. 위치와 크기는 서로
            다른 property라 충돌하지 않고, 두 곡선이 같은 순간을 가리키기 때문에 <strong>바닥에 닿는 시점과 눌리는 시점이 저절로
            맞습니다.</strong>
          </p>
          <p>
            위치 Tween이 <code>gsap.to()</code>가 아니라 <code>gsap.from()</code>인 것도 눈여겨보세요. 공을{' '}
            <strong>위(-200)에서 시작해 지금 자리로 떨어뜨리기</strong> 위해서입니다. 두 생성 방식의 차이는{' '}
            <a href={toHref('/fundamentals/tween-start-end-values')}>Tween 시작·끝 값 페이지</a>가 다룹니다.
          </p>
        </div>
        <pre className="bounce-wiggle-page__code">
          <code>{officialPairCode}</code>
        </pre>
      </div>

      <div className="bounce-wiggle-page__note">
        <h3>
          <code>transformOrigin: "center bottom"</code>이 하는 일
        </h3>
        <p>
          크기를 줄일 때 <strong>어느 점을 고정할지</strong>를 정합니다. 아래 가운데를 고정하면 공이 눌릴 때 바닥에 붙은 채 납작해
          집니다. 기본값(가운데)이면 바닥에서 떠 버립니다. 이 속성의 전체 계약은{' '}
          <a href={toHref('/fundamentals/css-animation')}>CSS animation 페이지</a>가 소유합니다.
        </p>
      </div>

      <div className="bounce-wiggle-page__note bounce-wiggle-page__note--probe">
        <h3>공식 문서에 없는 동작 둘 · squash가 0일 때와 커질 때</h3>
        <p>
          <code>squash</code>의 기본값은 <code>0</code>입니다. 이때는 두 번째 곡선이 <strong>덜 만들어지는 게 아니라 아예 만들어
          지지 않습니다.</strong> <code>gsap.parseEase('myBounce-squash')</code>가 <code>undefined</code>를 돌려줍니다. 값을 1
          이상 주면 그때 생깁니다.
        </p>
        <p>
          <code>squash</code>를 키우면 <strong>곡선이 바닥값 근처에 머무는 구간이 길어집니다.</strong> strength 0.7에서 진행률을
          1000등분해 ease 값이 바닥(1)과 0.001 이내인 지점을 세어 보면 <strong>squash 0은 2.4%, 2는 10.9%, 4는 18.1%</strong>였습니다.
          위 예제의 곡선에서 평평한 구간이 늘어나는 것으로 확인할 수 있습니다.
        </p>
        <p className="bounce-wiggle-page__provenance">
          이 두 항목은 공식 페이지에 게시돼 있지 않습니다. GSAP 3.15.0을 직접 실행해 확인한 내용입니다. 공식 문서는{' '}
          <code>squash</code>의 허용 범위를 밝히지 않으므로, 예제의 0·2·4는 공식 설명에 등장한 값만 골라 둔 학습용 선택지입니다.
        </p>
      </div>
    </section>
  )
}
