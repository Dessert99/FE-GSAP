/** one sentence의 actual SplitText wrapper DOM과 array counts를 표시한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { splitTextCreateProperties } from '../../split-text-create.properties'
import { useSplitInspectorAnimation } from './useSplitInspectorAnimation'
import './SplitInspectorLab.css'

/** SplitText.create 결과를 추측 없이 actual instance arrays로 검사한다. */
export function SplitInspectorLab() {
  // runtime이 만든 stable sentence ref, descriptor와 DOM snapshot을 받는다.
  const {
    scope,
    sentenceRef,
    descriptor,
    snapshot,
    reducedMotion,
    selectMask,
    rebuild,
  } = useSplitInspectorAnimation()
  // runtime create vars와 reduced-motion stagger policy를 code 문법으로만 보여 준다.
  const code = `SplitText.create(sentence, {
  type: '${descriptor.type}',
  mask: '${descriptor.mask}',
  aria: '${descriptor.aria}',
  autoSplit: ${descriptor.autoSplit},
  linesClass: '${descriptor.linesClass}',
  wordsClass: '${descriptor.wordsClass}',
  charsClass: '${descriptor.charsClass}',
  onSplit(self) {
    if (reducedMotion) return
    return gsap.from(self.chars, { yPercent: 100, autoAlpha: 0, stagger: 0.025 })
  },
})`

  return (
    <section id="split-inspector-lab">
      <InteractiveExample
        title="one sentence DOM inspector"
        description="mask type을 고르거나 rebuild하면 fonts-ready target에 actual SplitText.create()가 실행됩니다. count와 tree는 instance arrays에서 읽습니다."
        sourcePath="src/content/gsap/text/split-text-create/examples/SplitInspectorLab/useSplitInspectorAnimation.ts"
        controls={
          <div className="split-inspector-lab__controls">
            <label>
              mask type
              <select
                value={descriptor.mask}
                onChange={(event) =>
                  selectMask(event.target.value as 'lines' | 'words')
                }
              >
                <option value="lines">lines</option>
                <option value="words">words</option>
              </select>
            </label>
            <button type="button" onClick={rebuild}>
              same vars로 rebuild
            </button>
          </div>
        }
        preview={
          <div ref={scope} className="split-inspector-lab">
            <h3 ref={sentenceRef} className="split-inspector-lab__sentence">
              Measure the words, then reveal the idea.
            </h3>
            <p>aria-label: {snapshot?.ariaLabel ?? 'fonts ready 대기 중'}</p>
            <dl>
              <div>
                <dt>chars</dt>
                <dd>{snapshot?.chars ?? 0}</dd>
              </div>
              <div>
                <dt>words</dt>
                <dd>{snapshot?.words ?? 0}</dd>
              </div>
              <div>
                <dt>lines</dt>
                <dd>{snapshot?.lines ?? 0}</dd>
              </div>
              <div>
                <dt>masks</dt>
                <dd>{snapshot?.masks ?? 0}</dd>
              </div>
            </dl>
            <pre aria-label="actual generated wrapper DOM tree">
              <code>{snapshot?.tree.join('\n') ?? 'instance를 만드는 중'}</code>
            </pre>
            {reducedMotion ? (
              <p>
                모션 감소: split은 유지하지만 onSplit stagger를 만들지 않습니다.
              </p>
            ) : null}
          </div>
        }
        code={code}
        propertyDetails={splitTextCreateProperties}
        changes={[
          `type '${descriptor.type}'가 chars·words·lines arrays를 모두 만듭니다.`,
          `mask '${descriptor.mask}'가 masks array와 extra clipping wrapper를 만듭니다.`,
          'aria auto는 semantic heading의 읽을 문장을 유지하고 generated wrapper를 숨깁니다.',
        ]}
        watchFor={[
          'rebuild 뒤 count가 React text parsing이 아니라 actual instance collections에서 왔는지 봅니다.',
          'DOM tree의 first mask/line/word/char wrapper와 class가 descriptor와 맞는지 봅니다.',
          'font 또는 width reflow에서 autoSplit이 fresh wrapper를 만들어도 inspector가 새 arrays를 읽는지 봅니다.',
        ]}
        explanation={
          <p>
            SplitText는 문자열 배열만 반환하지 않고 원래 semantic element 안에
            wrapper DOM을 삽입합니다. 따라서 fonts와 layout이 line boundaries를
            결정하며, framework cleanup에서는 instance <code>revert()</code>로
            원래 HTML을 복구해야 합니다.
          </p>
        }
        onReplay={rebuild}
        replayLabel="현재 vars로 rebuild"
      />
    </section>
  )
}
