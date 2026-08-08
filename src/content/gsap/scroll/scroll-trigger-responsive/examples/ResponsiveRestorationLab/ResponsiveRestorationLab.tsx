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
  // actual local snapshot/listener/condition cleanup을 먼저 직렬화하고 global API는 static boundary로 구분한다
  const code = `const condition = '${condition}'
const savedStyle = panel.getAttribute('style')
const media = window.matchMedia('${descriptor.legacyQuery}')
media.addEventListener('change', onChange)

if (condition === 'large') {
  panel.style.outline = '3px solid var(--color-accent)'
}

return () => {
  media.removeEventListener('change', onChange)
  savedStyle === null ? panel.removeAttribute('style') : panel.setAttribute('style', savedStyle)
}

// Architecture only — this local simulator does not call global APIs.
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
          <div ref={panelRef} className='responsive-restoration-lab__panel'>
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
        'legacy matchMedia condition이 inactive가 되면 associated trigger와 animation은 revert·kill됩니다.',
        'saveStyles는 internal revert 때 적용할 current inline CSS snapshot을 기록합니다.',
        'reduced motion은 large setup보다 우선하는 animation 없는 condition입니다.',
      ]}
      watchFor={[
        'simulator는 host scroll memory나 global legacy matchMedia registration을 실행하지 않습니다.',
        'clearMatchMedia는 registration만 clear하며 associated trigger/animation cleanup을 대신하지 않습니다.',
        'browser history scroll restoration은 ScrollTrigger recorded memory와 별도 policy입니다.',
      ]}
      explanation={
        <p>
          이 panel은 saveStyles의 inline style snapshot과 condition cleanup을
          local DOM에서만 모사합니다. 실제 application은 core{' '}
          <code>gsap.matchMedia()</code> context와 owned cleanup을 사용하고,
          navigation owner가 필요할 때만 scroll-memory timing을 결정합니다.
        </p>
      }
    />
  )
}
