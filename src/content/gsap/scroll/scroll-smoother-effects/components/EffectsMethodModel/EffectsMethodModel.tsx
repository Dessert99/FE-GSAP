/** P37 method descriptor와 static native/rendered model을 같은 값에서 보여 준다. */
import { scrollSmootherEffectsProperties } from '../../scroll-smoother-effects.properties'
import './EffectsMethodModel.css'

/** static code와 figure가 공유하는 한 가지 ScrollSmoother method descriptor다. */
const effectsDescriptor = {
  smoothSeconds: 1.2,
  targets: '[data-speed], [data-lag]',
  speed: 0.85,
  lag: 0.3,
  progress: 0.5,
} as const

/** existing smoother에 적용할 method sequence를 실행하지 않고 정렬해 보여 준다. */
export function EffectsMethodModel() {
  const code = `// P36에서 만든 existing smoother만 사용합니다.
smoother.smooth(${effectsDescriptor.smoothSeconds})

const effectTriggers = smoother.effects('${effectsDescriptor.targets}', {
  speed: ${effectsDescriptor.speed},
  lag: ${effectsDescriptor.lag},
})

const pageProgress = smoother.progress

// reduced motion 또는 effect removal
smoother.smooth(0)
smoother.effects('${effectsDescriptor.targets}', { speed: 1, lag: 0 })

// owned effect trigger만 정리해야 할 때
effectTriggers.forEach((trigger) => trigger.kill())`

  return (
    <section
      id="effects-method-model"
      className="effects-method-model"
      aria-labelledby="effects-method-model-title"
    >
      <div>
        <p className="effects-method-model__eyebrow">
          STATIC MODEL · runtimeSource none
        </p>
        <h2 id="effects-method-model-title">
          03 · native position과 rendered position은 같은 readout이 아닙니다
        </h2>
        <p>
          이 그림은 page가 halfway인 경우를 정적으로 보여 줍니다. native
          scroll은 browser가 소유하고, smoother는 content가 따라오는 보이는
          transform과 effect trigger를 관리합니다. 이 페이지는 host scroll을
          바꾸지 않습니다.
        </p>
      </div>
      <figure className="effects-method-model__figure">
        <figcaption>
          descriptor progress {effectsDescriptor.progress} · native scroll과
          visual catch-up의 역할 분리
        </figcaption>
        <div
          className="effects-method-model__track"
          aria-label="native scroll progress 0.5"
        >
          <span>top · 0</span>
          <span className="effects-method-model__native-marker">
            native · 0.5
          </span>
          <span>bottom · 1</span>
        </div>
        <div
          className="effects-method-model__rendered"
          aria-label="rendered effect schematic"
        >
          <span>content natural position</span>
          <strong
            data-speed={effectsDescriptor.speed}
            data-lag={effectsDescriptor.lag}
          >
            foreground card · data-speed {effectsDescriptor.speed} · data-lag{' '}
            {effectsDescriptor.lag}
          </strong>
          <small>
            illustration only — not a live transform or live progress reader
          </small>
        </div>
      </figure>
      <div className="effects-method-model__code-grid">
        <div>
          <h3>one descriptor → method code</h3>
          <pre>
            <code>{code}</code>
          </pre>
          <p>
            <code>smooth(value)</code>의 current v3.15 source return은
            number이고 d.ts setter는 <code>void</code>입니다. rendered docs의
            chainable setter 설명과 달라서, 여기서는 setter return을 읽지
            않습니다.
          </p>
        </div>
        <div>
          <h3>property reference</h3>
          <dl className="effects-method-model__properties">
            {scrollSmootherEffectsProperties.map((property) => (
              <div key={property.name}>
                <dt>{property.name}</dt>
                <dd>
                  <span>{property.type}</span>
                  <span>{property.defaultValue}</span>
                  <span>{property.acceptedValues}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
