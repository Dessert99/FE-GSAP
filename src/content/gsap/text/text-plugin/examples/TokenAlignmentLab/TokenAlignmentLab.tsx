/** one descriptor가 TextPlugin tween, static token alignment, code, stable final meaning을 함께 만든다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { textPluginProperties } from '../../text-plugin.properties'
import { useTokenAlignmentAnimation } from './useTokenAlignmentAnimation'
import './TokenAlignmentLab.css'

// descriptor delimiter와 같은 unit으로 phrase를 static token strip에 나눈다
const splitTokens = (value: string, delimiter: '' | ' ') =>
  delimiter === '' ? Array.from(value) : value.split(delimiter)

/** one phrase의 token alignment와 final replacement content를 비교한다. */
export function TokenAlignmentLab() {
  // runtime이 소유한 target, controls, one descriptor, motion state와 replay를 받는다
  const {
    scope,
    phraseRef,
    delimiterMode,
    setDelimiterMode,
    padSpace,
    setPadSpace,
    descriptor,
    reducedMotion,
    replay,
  } = useTokenAlignmentAnimation()
  // initial/final strings을 descriptor delimiter로 같은 token column에 맞춘다
  const initialTokens = splitTokens(
    'SOURCE TOKEN ALIGNMENT PADDED',
    descriptor.delimiter,
  )
  // final string도 same descriptor delimiter로 분해해 static representation을 만든다
  const finalTokens = splitTokens(descriptor.value, descriptor.delimiter)
  // actual config form 또는 reduced-motion direct final을 current code panel에 직렬화한다
  const code = reducedMotion
    ? `target.textContent = '${descriptor.value}' // reduced motion: direct final`
    : `gsap.to(target, {
  duration: ${descriptor.duration},
  text: {
    value: '${descriptor.value}',
    delimiter: '${descriptor.delimiter}',
    padSpace: ${descriptor.padSpace},
    newClass: '${descriptor.newClass}',
    oldClass: '${descriptor.oldClass}',
    preserveSpaces: ${descriptor.preserveSpaces},
    rtl: ${descriptor.rtl},
    speed: ${descriptor.speed},
    type: '${descriptor.type}',
  },
})`

  // descriptor-driven controls·target·token alignment을 one learning frame에 전달한다
  return (
    <section id="token-alignment-lab">
      <InteractiveExample
        title="one phrase, aligned replacement tokens"
        description="character 또는 word delimiter와 trailing padding을 고른 뒤 replay하세요. intermediate target은 숨기고 final meaning은 stable sibling으로 둡니다."
        sourcePath="src/content/gsap/text/text-plugin/examples/TokenAlignmentLab/useTokenAlignmentAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="token-alignment-lab__controls">
            <label>
              <span>delimiter</span>
              <select
                value={delimiterMode}
                onChange={(event) =>
                  setDelimiterMode(event.target.value as typeof delimiterMode)
                }
              >
                <option value="words">space · words</option>
                <option value="characters">empty string · characters</option>
              </select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={padSpace}
                onChange={(event) => setPadSpace(event.target.checked)}
              />
              padSpace
            </label>
          </div>
        }
        preview={
          <div ref={scope} className="token-alignment-lab">
            <div className="token-alignment-lab__target-wrap">
              <span
                ref={phraseRef}
                className="token-alignment-lab__target"
                aria-hidden="true"
              >
                SOURCE TOKEN ALIGNMENT PADDED
              </span>
              <p className="token-alignment-lab__accessible">
                Final phrase: {descriptor.value}
              </p>
            </div>
            <div
              className="token-alignment-lab__tokens"
              aria-label="static token alignment"
            >
              <div>
                <strong>initial tokens</strong>
                {initialTokens.map((token, index) => (
                  <code key={`${token}-${index}`}>{token || '∅'}</code>
                ))}
              </div>
              <div>
                <strong>final tokens</strong>
                {finalTokens.map((token, index) => (
                  <code key={`${token}-${index}`}>{token || '∅'}</code>
                ))}
              </div>
            </div>
          </div>
        }
        code={code}
        propertyDetails={[...textPluginProperties]}
        changes={[
          'delimiter는 같은 phrase를 character 또는 word token으로 나누는 기준입니다.',
          'padSpace는 shorter replacement 뒤의 collapsed trailing space를 non-breaking HTML space로 유지합니다.',
          'newClass/oldClass는 intermediate replacement와 remaining original token을 span으로 구분합니다.',
        ]}
        watchFor={[
          'token strip은 descriptor에서 계산한 static alignment이며 per-frame text를 live announce하지 않습니다.',
          'target은 aria-hidden이고 Final phrase sibling은 animation 중에도 final meaning을 유지합니다.',
          'reduced motion에서는 TextPlugin tween 대신 final text를 즉시 씁니다.',
        ]}
        explanation={
          <p>
            TextPlugin은 token 앞부분을 new text, 나머지를 old text로 연결해
            intermediate content를 만듭니다. delimiter와 padding은 그 연결
            단위와 남는 공간을 정하고, diff·rtl·speed는 별도 replacement
            policy를 정합니다.
          </p>
        }
        onReplay={replay}
        replayLabel="현재 text 다시 교체"
      />
    </section>
  )
}
