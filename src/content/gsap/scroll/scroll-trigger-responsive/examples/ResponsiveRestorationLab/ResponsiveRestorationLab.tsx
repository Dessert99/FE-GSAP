/** condition/style snapshot simulator와 static navigation timeline을 같은 descriptor로 조립한다. */
import { InteractiveExample } from '../../../../../../components/demo/InteractiveExample/InteractiveExample'
import { scrollTriggerResponsiveProperties } from '../../scroll-trigger-responsive.properties'
import { useResponsiveRestorationRuntime } from './useResponsiveRestorationRuntime'
import './ResponsiveRestorationLab.css'

/** global ScrollTrigger state를 건드리지 않고 responsive restoration 순서를 가르친다. */
export function ResponsiveRestorationLab() {
  // local simulator가 소유하는 snapshot panel, condition, listener state와 descriptor를 읽는다
  const {
    panelRef,
    selectedCondition,
    setSelectedCondition,
    reapplyCondition,
    reducedMotion,
    condition,
    lifecycle,
    descriptor,
  } = useResponsiveRestorationRuntime()
  // 실제 local snapshot/listener/condition cleanup을 먼저 직렬화하고 global API는 호출하지 않음을 구분한다
  const code = `import { useEffect } from 'react'

const setup = () => {
  const panel = document.querySelector('.responsive-panel')
  if (!panel) throw new Error('panel이 필요합니다.')

  const condition = '${condition}'
  const savedStyle = panel.getAttribute('style')
  const media = window.matchMedia('${descriptor.legacyQuery}')
  const onChange = () => console.log('media condition changed')
  media.addEventListener('change', onChange)

  if (condition === 'large') {
    panel.style.outline = '3px solid var(--color-accent)'
    panel.style.backgroundColor = 'color-mix(in srgb, var(--color-accent) 12%, transparent)'
  }

  return () => {
    media.removeEventListener('change', onChange)
    savedStyle === null ? panel.removeAttribute('style') : panel.setAttribute('style', savedStyle)
  }
}

useEffect(() => {
  const cleanup = setup()
  return cleanup
}, [condition])

// 아래 전역 API는 이 simulator에서 호출하지 않습니다.
// ScrollTrigger.saveStyles(panel)
// gsap.matchMedia().add('${descriptor.coreQuery}', setup)
// ScrollTrigger.clearScrollMemory()`

  return (
    <InteractiveExample
      title='condition cleanup · local style snapshot simulator'
      description='큰 화면 condition을 선택하면 local panel에 inline style을 적용합니다. 작은 화면·reduced motion·unmount는 capture한 style과 listener를 되돌립니다.'
      sourcePath='src/content/gsap/scroll/scroll-trigger-responsive/examples/ResponsiveRestorationLab/useResponsiveRestorationRuntime.ts'
      reducedMotion={reducedMotion}
      onReplay={reapplyCondition}
      replayLabel='현재 condition 다시 적용'
      controls={
        <fieldset>
          <legend>simulated responsive condition</legend>
          <label>
            <input
              type='radio'
              name='responsive-condition'
              checked={selectedCondition === 'large'}
              onChange={() => setSelectedCondition('large')}
            />
            large · {descriptor.legacyQuery}
          </label>
          <label>
            <input
              type='radio'
              name='responsive-condition'
              checked={selectedCondition === 'small'}
              onChange={() => setSelectedCondition('small')}
            />
            small · cleanup path
          </label>
        </fieldset>
      }
      preview={
        <div className='responsive-restoration-lab'>
          <div
            ref={panelRef}
            className='responsive-panel responsive-restoration-lab__panel'
          >
            <p>effective condition: {condition}</p>
            <p>{lifecycle}</p>
            <p>
              {descriptor.savedStyleLabel} → {descriptor.activeStyleLabel}
            </p>
          </div>
          <section aria-labelledby='responsive-navigation-title'>
            <h4 id='responsive-navigation-title'>static navigation timeline</h4>
            <ol>
              {descriptor.navigationSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      }
      code={code}
      propertyDetails={scrollTriggerResponsiveProperties.map(
        ([name, type, defaultValue, acceptedValues]) => ({
          name,
          type,
          defaultValue,
          acceptedValues,
        }),
      )}
      changes={[
        'ScrollTrigger.matchMedia의 media query가 inactive가 되면 연결된 trigger와 animation은 revert·kill됩니다.',
        'saveStyles는 internal revert 때 적용할 current inline CSS snapshot을 기록합니다.',
        'reduced motion은 large setup보다 우선하는 animation 없는 condition입니다.',
      ]}
      watchFor={[
        'simulator는 페이지 scroll memory나 deprecated matchMedia registration을 변경하지 않습니다.',
        'clearMatchMedia는 registration만 clear하며 associated trigger/animation cleanup을 대신하지 않습니다.',
        'browser history scroll restoration은 ScrollTrigger recorded memory와 별도 policy입니다.',
      ]}
      explanation={
        <p>
          이 panel은 saveStyles의 inline style snapshot과 condition cleanup을
          local DOM에서만 모사합니다. 실제 앱은 core{' '}
          <code>gsap.matchMedia()</code> context와 반환된 cleanup을 사용하고,
          navigation 처리 지점에서 필요할 때만 scroll-memory timing을 결정합니다.
        </p>
      }
    />
  )
}
