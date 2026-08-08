/** 하나의 puck과 drop zone으로 overlap·threshold·throw tween을 관찰한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { draggableCollisionMomentumProperties } from '../../draggable-collision-momentum.properties'
import './CollisionMomentumLab.css'
import { useCollisionMomentumAnimation } from './useCollisionMomentumAnimation'

export function CollisionMomentumLab() {
  // runtime descriptor·collision snapshot·control action을 동일한 화면에 연결한다.
  const {
    scope,
    stageRef,
    puckRef,
    dropZoneRef,
    threshold,
    setThreshold,
    inertiaRequested,
    setInertiaRequested,
    descriptor,
    snapshot,
    reducedMotion,
    recheck,
    reset,
  } = useCollisionMomentumAnimation()
  // 실제 runtime descriptor를 새 의미 없이 현재 code panel 문법으로 직렬화한다.
  const thresholdCode =
    typeof descriptor.threshold === 'string' ? `'${descriptor.threshold}'` : descriptor.threshold
  // Draggable vars와 static hitTest call이 같은 descriptor value를 표시한다.
  const code = `gsap.registerPlugin(Draggable, InertiaPlugin)

const draggable = Draggable.create(puck, {
  type: '${descriptor.type}',
  bounds: ${descriptor.boundsLabel},
  inertia: ${descriptor.inertia},
})[0]

const overlaps = Draggable.hitTest(puck, dropZone, ${thresholdCode})`

  return (
    <div ref={scope}>
      <InteractiveExample
        title="puck의 overlap과 release tween inspector"
        description="threshold를 고른 뒤 puck을 drop zone으로 끌어 보세요. inertia를 켜면 release 직후 생성되는 tween과 isThrowing을 같은 snapshot에서 읽습니다."
        sourcePath="src/content/gsap/ui/draggable-collision-momentum/examples/CollisionMomentumLab/useCollisionMomentumAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <label className="interactive-example__control">
              <span className="interactive-example__control-heading">
                <span>hitTest threshold</span>
              </span>
              <select
                value={threshold}
                onChange={(event) =>
                  setThreshold(
                    event.target.value === '50%' ? '50%' : (Number(event.target.value) as 0 | 20),
                  )
                }
              >
                <option value="0">0 · any overlap</option>
                <option value="20">20 · pixel threshold</option>
                <option value="50%">50% · surface area</option>
              </select>
            </label>
            <label className="interactive-example__check">
              <input
                type="checkbox"
                checked={inertiaRequested}
                onChange={(event) => setInertiaRequested(event.target.checked)}
              />
              inertia 요청
            </label>
            <button type="button" onClick={recheck}>
              현재 threshold로 다시 검사
            </button>
            <button type="button" onClick={reset}>
              puck 처음 위치로
            </button>
          </div>
        }
        preview={
          <div className="collision-momentum-lab">
            <p>
              drop zone과 puck은 모두 DOM 사각형입니다. 원·회전 모양처럼 보여도{' '}
              <code>hitTest()</code>는 pixel-perfect shape collision이 아닙니다.
            </p>
            <div ref={stageRef} className="collision-momentum-lab__stage">
              <div
                ref={dropZoneRef}
                className="collision-momentum-lab__drop-zone"
                aria-hidden="true"
              >
                <span>drop zone</span>
              </div>
              <button
                ref={puckRef}
                type="button"
                className="collision-momentum-lab__puck"
                aria-describedby="collision-momentum-puck-help"
              >
                drag puck
              </button>
            </div>
            <p id="collision-momentum-puck-help">
              puck을 drop zone으로 끌고 놓으세요. 이 text snapshot은 overlap과 release 상태를
              읽습니다.
            </p>
            <dl>
              <div>
                <dt>overlap</dt>
                <dd>{snapshot.overlap}</dd>
              </div>
              <div>
                <dt>isThrowing</dt>
                <dd>{String(snapshot.isThrowing)}</dd>
              </div>
              <div>
                <dt>tween</dt>
                <dd>{snapshot.tween}</dd>
              </div>
              <div>
                <dt>duration</dt>
                <dd>{snapshot.duration}</dd>
              </div>
            </dl>
            <p role="status">{snapshot.release}</p>
          </div>
        }
        code={code}
        propertyDetails={draggableCollisionMomentumProperties}
        changes={[
          'threshold 0은 작은 겹침도 true로 보고, 20은 pixel 조건, 50%는 surface-area 조건을 사용합니다.',
          `현재 inertia runtime 값은 ${String(descriptor.inertia)}이며, 모션 감소 설정에서는 release tween 대신 현재 위치에 즉시 정착합니다.`,
          'release마다 tween은 새로 생길 수 있으므로 snapshot은 이전 Tween을 결과로 재사용하지 않습니다.',
        ]}
        watchFor={[
          'puck과 zone이 겹쳐도 선택한 threshold가 커지면 false가 될 수 있는지 봅니다.',
          'inertia가 true이고 빠르게 release했을 때 isThrowing과 tween 생성됨이 같은 release snapshot에 나타나는지 봅니다.',
          'throw가 끝나면 onThrowComplete snapshot이 isThrowing false를 알리는지 봅니다.',
        ]}
        explanation={
          <p>
            <code>hitTest()</code>는 현재 DOM rectangle을 비교하는 Boolean query이고,{' '}
            <code>isThrowing</code>/<code>tween</code>은 inertia release 뒤에 읽는 instance
            state입니다. 이 lab은 collision을 이벤트처럼 저장하지 않고 drag·release callback에서
            다시 읽습니다.
          </p>
        }
        onReplay={reset}
        replayLabel="puck 다시 놓기"
      />
    </div>
  )
}
