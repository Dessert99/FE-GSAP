/** selected physics descriptor와 actual tween result를 한 화면에 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { physicsMotionProperties } from '../../physics-motion.properties'
import { usePhysicsMotionAnimation } from './usePhysicsMotionAnimation'
import './PhysicsMotionLab.css'

/** 발사 벡터와 property별 physics tween을 같은 target에서 비교한다. */
export function PhysicsMotionLab() {
  // runtime이 소유한 descriptor, target ref와 sparse snapshot을 받는다.
  const {
    scope,
    targetRef,
    mode,
    setMode,
    descriptor,
    snapshot,
    reducedMotion,
    replay,
  } = usePhysicsMotionAnimation()
  // current discriminator가 실행한 plugin key만 code panel에 남긴다.
  const code =
    descriptor.mode === 'launch'
      ? `import { gsap } from 'gsap'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

gsap.registerPlugin(Physics2DPlugin)

const setup = () => {
  const target = document.querySelector('.physics-motion-lab__target')
  if (!target) throw new Error('physics target이 필요합니다.')
  let tween
  const context = gsap.context(() => {
    gsap.set(target, { x: 0, y: 0 })
    const onUpdate = () => console.log({ x: gsap.getProperty(target, 'x'), y: gsap.getProperty(target, 'y') })
    tween = gsap.to(target, {
      duration: ${descriptor.duration},
      physics2D: ${JSON.stringify(descriptor.config, null, 2)},
      onUpdate,
    })
  })
  ${reducedMotion ? 'tween?.progress(1).pause()' : ''}
  return () => context.revert()
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`
      : `import { gsap } from 'gsap'
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'

gsap.registerPlugin(PhysicsPropsPlugin)

const setup = () => {
  const target = document.querySelector('.physics-motion-lab__target')
  if (!target) throw new Error('physics target이 필요합니다.')
  let tween
  const context = gsap.context(() => {
    gsap.set(target, { x: 0, y: 0 })
    const onUpdate = () => console.log({ x: gsap.getProperty(target, 'x'), y: gsap.getProperty(target, 'y') })
    tween = gsap.to(target, {
      duration: ${descriptor.duration},
      physicsProps: ${JSON.stringify(descriptor.config, null, 2)},
      onUpdate,
    })
  })
  ${reducedMotion ? 'tween?.progress(1).pause()' : ''}
  return () => context.revert()
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`

  return (
    <section id="physics-motion-lab">
      <InteractiveExample
        title="한 target에서 두 physics 입력 비교"
        description="mode를 고른 뒤 replay하면 같은 target에 선택한 physics plugin tween만 실행됩니다."
        sourcePath="src/content/gsap/other/physics-motion/examples/PhysicsMotionLab/usePhysicsMotionAnimation.ts"
        controls={
          <fieldset className="physics-motion-lab__mode">
            <legend>physics input mode</legend>
            <label>
              <input
                type="radio"
                name="physics-mode"
                checked={mode === 'launch'}
                onChange={() => setMode('launch')}
              />
              launch: velocity + angle + gravity
            </label>
            <label>
              <input
                type="radio"
                name="physics-mode"
                checked={mode === 'properties'}
                onChange={() => setMode('properties')}
              />
              properties: x/y each config
            </label>
          </fieldset>
        }
        preview={
          <div ref={scope} className="physics-motion-lab">
            <div
              className="physics-motion-lab__stage"
              aria-label="physics motion stage"
            >
              <div ref={targetRef} className="physics-motion-lab__target">
                {descriptor.plugin}
              </div>
            </div>
            <p>
              result: x {snapshot.x.toFixed(1)}, y {snapshot.y.toFixed(1)} ·
              final sample: x {descriptor.final.x.toFixed(1)}, y{' '}
              {descriptor.final.y.toFixed(1)}
            </p>
            {reducedMotion ? (
              <p>
                모션 감소: replay는 같은 physics tween을 final progress로 즉시
                표시합니다.
              </p>
            ) : null}
          </div>
        }
        code={code}
        propertyDetails={physicsMotionProperties}
        changes={[
          `${descriptor.plugin}만 실행되고 ${descriptor.mode === 'launch' ? '발사 벡터' : 'x/y property'} config가 code와 tween에 같습니다.`,
          `friction이 포함된 1초 final sample은 x ${descriptor.final.x.toFixed(1)}, y ${descriptor.final.y.toFixed(1)}입니다.`,
          'reduced motion에서는 tween progress를 final로 보내 same calculation을 즉시 표시합니다.',
        ]}
        watchFor={[
          'launch는 angle과 gravity가 합쳐진 두 축 이동을, properties는 x/y의 독립 가속을 보여 주는지 봅니다.',
          'result와 final sample이 tween 완료 뒤 같은 값에 도달하는지 봅니다.',
          'mode를 바꾼 뒤 code panel의 physics key가 하나만 남는지 봅니다.',
        ]}
        explanation={
          <p>
            plugin은 end value를 tween하는 대신 시간마다 velocity와
            acceleration을 적분합니다. 그래서
            <code>ease</code>는 physics property에 적용되지 않으며, friction은
            충돌 계산이 아니라 각 step의 속도를 줄이는 효과입니다.
          </p>
        }
        onReplay={replay}
        replayLabel="선택한 physics 실행"
      />
    </section>
  )
}
