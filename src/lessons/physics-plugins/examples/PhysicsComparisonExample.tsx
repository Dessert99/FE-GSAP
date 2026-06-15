import { useRef } from 'react' // DOM 요소를 가리키는 ref를 만드는 React 훅
import gsap from 'gsap' // GSAP 코어 — Physics 플러그인이 확장한 tween 속성을 실행한다
import { Physics2DPlugin } from 'gsap/Physics2DPlugin' // x/y를 속도·각도·중력으로 계산하는 플러그인
import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin' // 개별 numeric 속성에 속도·가속도·마찰을 적용하는 플러그인
import { useGSAP } from '@gsap/react' // React에서 GSAP 실행과 cleanup을 묶어주는 훅

gsap.registerPlugin(Physics2DPlugin, PhysicsPropsPlugin) // physics2D와 physicsProps 속성을 쓰기 전에 등록한다

export function PhysicsComparisonExample() {
  // 이 예제의 루트 DOM을 가리킨다. useGSAP의 scope로 넘겨 정리 범위를 한정한다.
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.physics-ball--arc',
        { x: 0, y: 84 },
        {
          physics2D: {
            velocity: 230, // 시작 속도
            angle: -62, // 위쪽으로 발사되는 각도
            gravity: 420, // 시간이 지날수록 아래로 당기는 힘
          },
          duration: 1.6,
          ease: 'none', // 위치 계산은 플러그인이 하므로 easing은 넣지 않는다
        },
      )

      gsap.fromTo(
        '.physics-ball--props',
        { x: 0, rotation: 0 },
        {
          physicsProps: {
            x: { velocity: 260, acceleration: -120 }, // x는 점점 감속한다
            rotation: { velocity: 460, friction: 0.28 }, // 회전은 마찰로 서서히 줄어든다
          },
          duration: 1.6,
          ease: 'none',
        },
      )
    },
    { scope: container }, // selector와 tween 정리 범위를 이 예제 안으로 제한한다
  )

  return (
    <div ref={container} className="physics-demo">
      <div className="physics-row">
        <span className="tween-lanes__label">physics2D</span>
        <div className="physics-stage">
          {/* velocity, angle, gravity가 x/y 위치를 함께 계산한다 */}
          <div className="physics-ball physics-ball--arc" />
        </div>
      </div>
      <div className="physics-row">
        <span className="tween-lanes__label">physicsProps</span>
        <div className="physics-stage">
          {/* x와 rotation이 각각 다른 물리 파라미터로 움직인다 */}
          <div className="physics-ball physics-ball--props" />
        </div>
      </div>
    </div>
  )
}
