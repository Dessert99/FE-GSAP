/** editable path, actual editor DOM readout, synchronized descriptor code를 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { motionPathHelperProperties } from '../../motion-path-helper.properties'
import './MotionPathHelperLab.css'
import { useMotionPathHelperAnimation } from './useMotionPathHelperAnimation'

/** P20 helper lifecycle과 path data output을 한 lab으로 연결한다. */
export function MotionPathHelperLab() {
  // helper lifecycle이 공급하는 DOM refs, descriptor, actual readout을 한 화면에 묶는다.
  const {
    pathRef,
    editorContainerRef,
    followerRef,
    descriptor,
    pathData,
    editorDomPresent,
    reducedMotion,
    killEditor,
    recreateEditor,
    focusEditorPath,
  } = useMotionPathHelperAnimation()
  // runtime과 같은 selectors·readout·실제 cleanup 경계를 포함해 독립 실행 가능하게 표시한다.
  const code = `gsap.registerPlugin(MotionPathPlugin, MotionPathHelper)
const path = document.querySelector('.motion-path-helper-lab path')
const follower = document.querySelector('.motion-path-helper-lab__follower')
const container = document.querySelector('.motion-path-helper-lab')
if (!path || !follower || !container) throw new Error('MotionPathHelper lab DOM을 찾지 못했습니다.')
path.setAttribute('d', ${JSON.stringify(descriptor.pathData)})
const helper = MotionPathHelper.create(follower, {
  path,
  container,
  pathColor: '${descriptor.pathColor}',
  pathWidth: ${descriptor.pathWidth},
  selected: ${descriptor.selected},
  duration: ${descriptor.duration},
  ease: '${descriptor.ease}',
  onUpdate: () => console.log(path.getAttribute('d') || ''),
})
${reducedMotion ? 'helper.animation?.pause(0)\n' : ''}// edit anchors/handles, then read path.getAttribute('d')

function cleanup() {
  helper.kill()
}`

  return (
    <section id="editor-lifecycle">
      <InteractiveExample
        title="editable path editor lifecycle"
        description="SVG path를 focus한 뒤 official keyboard editing을 시도하고, kill/recreate로 temporary editor DOM 상태와 path output을 확인하세요."
        sourcePath="src/content/gsap/svg/motion-path-helper/examples/MotionPathHelperLab/useMotionPathHelperAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="interactive-example__control-list">
            <button type="button" onClick={focusEditorPath}>
              focus editable path
            </button>
            <button type="button" onClick={killEditor}>
              editor kill
            </button>
            <button type="button" onClick={recreateEditor}>
              editor recreate
            </button>
          </div>
        }
        preview={
          <div className="motion-path-helper-lab" ref={editorContainerRef}>
            <svg viewBox="0 0 240 150" aria-label="editable motion path">
              <path
                ref={pathRef}
                d={descriptor.pathData}
                fill="none"
                stroke={descriptor.pathColor}
                strokeWidth={descriptor.pathWidth}
                tabIndex={0}
              />
            </svg>
            <div
              ref={followerRef}
              className="motion-path-helper-lab__follower"
              tabIndex={0}
            >
              follow
            </div>
            <p role="status">
              temporary editor DOM (Copy button/path-editor group):{' '}
              {String(editorDomPresent)}
            </p>
            <p>
              path data: <code>{pathData}</code>
            </p>
          </div>
        }
        code={code}
        propertyDetails={motionPathHelperProperties}
        changes={[
          'create는 descriptor path와 options로 editor와 follower preview를 만듭니다.',
          'kill은 helper controls와 Copy button을 제거한 뒤 readout을 false로 갱신합니다.',
          'recreate는 동일 descriptor로 새 helper instance를 만듭니다.',
        ]}
        watchFor={[
          'anchor/handle 편집 뒤 path data가 바뀌는지 봅니다.',
          'kill 뒤 Copy button readout이 false인지 봅니다.',
          'reduced motion에서 follower가 0 position에 정착하는지 봅니다.',
        ]}
        explanation={
          <p>
            Helper는 production path renderer가 아니라 browser editor입니다.
            path data를 복사해 application motionPath에 사용하고 editor
            instance는 반드시 <code>kill()</code>합니다.
          </p>
        }
        onReplay={recreateEditor}
        replayLabel="editor recreate"
      />
    </section>
  )
}
