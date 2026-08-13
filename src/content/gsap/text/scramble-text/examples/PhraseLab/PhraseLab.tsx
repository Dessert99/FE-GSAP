/** phrase descriptor가 actual tween, static phase strip, code, accessible final string을 함께 만든다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { scrambleTextProperties } from '../../scramble-text.properties'
import { usePhraseAnimation } from './usePhraseAnimation'
import './PhraseLab.css'

/** 하나의 phrase에서 ScrambleText의 intermediate와 final meaning을 분리해 비교한다. */
export function PhraseLab() {
  // runtime이 소유한 actual target, normalized descriptor, controls와 replay를 받는다
  const {
    scope,
    phraseRef,
    chars,
    setChars,
    rightToLeft,
    setRightToLeft,
    descriptor,
    reducedMotion,
    replay,
  } = usePhraseAnimation()
  // final text·character set·direction을 static strip에서 같은 descriptor로 읽는다
  const phaseStrip = [
    { label: 'initial', value: 'SOURCE STATUS', note: 'original plain text' },
    {
      label: 'intermediate',
      value: `${descriptor.chars} …`,
      note: `revealDelay ${descriptor.revealDelay}s`,
    },
    {
      label: 'final',
      value: descriptor.text,
      note: descriptor.rightToLeft ? 'right → left' : 'left → right',
    },
  ]
  // runtime이 쓰는 descriptor fields만 current code panel 문법으로 직렬화한다
  const code = `import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

const setup = () => {
  const target = document.querySelector('.phrase-lab__target')
  if (!target) throw new Error('phrase target이 필요합니다.')
  const originalHTML = target.innerHTML
  ${
    reducedMotion
      ? `target.textContent = ${JSON.stringify(descriptor.text)}
  const tween = null`
      : `const tween = gsap.to(target, {
    duration: ${descriptor.duration},
    scrambleText: {
      text: ${JSON.stringify(descriptor.text)},
      chars: ${JSON.stringify(descriptor.chars)},
      speed: ${descriptor.speed},
      delimiter: ${JSON.stringify(descriptor.delimiter)},
      revealDelay: ${descriptor.revealDelay},
      rightToLeft: ${descriptor.rightToLeft},
      tweenLength: ${descriptor.tweenLength},
      newClass: ${JSON.stringify(descriptor.newClass)},
      oldClass: ${JSON.stringify(descriptor.oldClass)},
    },
  })`
  }

  return () => {
    tween?.kill()
    target.innerHTML = originalHTML
  }
}

const cleanup = setup()
// component unmount에서 cleanup()을 호출합니다.`

  // descriptor-driven controls와 preview를 one InteractiveExample frame에 전달한다
  return (
    <section id="phrase-lab">
      <InteractiveExample
        title="한 문장의 중간 문자와 최종 의미"
        description="character set과 reveal direction을 고른 뒤 replay하세요. 움직이는 target은 숨기고 최종 문장은 별도로 제공합니다."
        sourcePath="src/content/gsap/text/scramble-text/examples/PhraseLab/usePhraseAnimation.ts"
        reducedMotion={reducedMotion}
        controls={
          <div className="phrase-lab__controls">
            <label>
              <span>chars</span>
              <select
                value={chars}
                onChange={(event) =>
                  setChars(event.target.value as typeof chars)
                }
              >
                <option value="upperCase">upperCase</option>
                <option value="lowerCase">lowerCase</option>
                <option value="XO">custom XO</option>
              </select>
            </label>
            <label>
              <input
                type="checkbox"
                checked={rightToLeft}
                onChange={(event) => setRightToLeft(event.target.checked)}
              />
              rightToLeft
            </label>
          </div>
        }
        preview={
          <div ref={scope} className="phrase-lab">
            <div className="phrase-lab__target-wrap">
              <span
                ref={phraseRef}
                className="phrase-lab__target"
                aria-hidden="true"
              >
                SOURCE STATUS
              </span>
              <p className="phrase-lab__accessible">
                Final phrase: {descriptor.text}
              </p>
            </div>
            <ol
              className="phrase-lab__phase-strip"
              aria-label="static scramble phases"
            >
              {phaseStrip.map((phase) => (
                <li key={phase.label}>
                  <strong>{phase.label}</strong>
                  <code>{phase.value}</code>
                  <span>{phase.note}</span>
                </li>
              ))}
            </ol>
          </div>
        }
        code={code}
        propertyDetails={[...scrambleTextProperties]}
        changes={[
          'chars는 reveal되지 않은 부분의 random character set을 바꿉니다.',
          'rightToLeft는 same final text의 reveal 순서만 뒤집습니다.',
          'revealDelay는 scramble이 보이는 시간을 만들고 tweenLength는 original/replacement length 차이를 점차 바꿉니다.',
        ]}
        watchFor={[
          'static phase strip은 descriptor의 initial/intermediate/final contract를 보여 주며 live random string을 복제하지 않습니다.',
          'animation target은 aria-hidden이고 옆의 Final phrase가 보조기술에 고정된 최종 문장을 제공합니다.',
          'reduced motion에서는 ScrambleText tween 대신 final text를 바로 씁니다.',
        ]}
        explanation={
          <p>
            ScrambleText는 target의 중간 HTML을 교체 가능한 content로
            다룹니다. 그래서 class option이 span을 만들 수 있는 target과,
            사용자가 읽어야 할 최종 문장을 별도 node로 나누면 무작위 문자를
            반복해서 알리지 않으면서도 결과를 잃지 않습니다.
          </p>
        }
        onReplay={replay}
        replayLabel="현재 phrase 다시 scramble"
      />
    </section>
  )
}
