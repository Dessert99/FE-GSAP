/** ScrollSmoother command와 native fragment anchor의 역할을 같은 navigator에서 구분한다. */
import { scrollSmootherControlProperties } from '../../scroll-smoother-control.properties'
import './SectionNavigator.css'

/** native anchor와 ScrollSmoother command를 구별하는 읽기 전용 navigator를 렌더한다. */
export function SectionNavigator() {
  const commands = [
    {
      id: 'state-reads',
      label: '읽기',
      state: 'velocity: px/s · offset: px',
      code: `${scrollSmootherControlProperties.getVelocity}\n${scrollSmootherControlProperties.offset}`,
    },
    {
      id: 'pause-command',
      label: '입력 일시정지',
      state: 'paused: boolean',
      code: `${scrollSmootherControlProperties.pausedGet}\n${scrollSmootherControlProperties.pausedSet}`,
    },
    {
      id: 'scroll-command',
      label: '목적지 이동',
      state: 'scrollTop: px · smooth: boolean',
      code: `const smooth = prefersReducedMotion ? false : true\n${scrollSmootherControlProperties.scrollTo}\n${scrollSmootherControlProperties.scrollTopGet}\n${scrollSmootherControlProperties.scrollTopSetRendered}\n${scrollSmootherControlProperties.scrollTopSetInstalled}`,
    },
    {
      id: 'cleanup',
      label: '정리',
      state: 'instance: disposed',
      code: scrollSmootherControlProperties.kill,
    },
  ] as const

  return (
    <section
      className='section-navigator'
      aria-labelledby='section-navigator-title'
    >
      <p className='section-navigator__eyebrow'>01 · command descriptor</p>
      <h2 id='section-navigator-title'>
        한 descriptor에서 상태와 목적지를 읽습니다
      </h2>
      <p>
        이 navigator는 페이지의 native fragment anchor만 사용합니다. 아래
        signature는 이미 존재하는 smoother instance에 연결할 command 모델이며,
        이 학습 페이지는 host scroll을 만들거나 가로채지 않습니다.
      </p>
      <nav aria-label='ScrollSmoother command sections'>
        <ul className='section-navigator__links'>
          {commands.map((command) => (
            <li key={command.id}>
              <a href={`#${command.id}`}>{command.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='section-navigator__cards'>
        {commands.map((command) => (
          <article key={command.id} className='section-navigator__card'>
            <h3>{command.label}</h3>
            <p>{command.state}</p>
            <pre aria-label={`${command.label} signature`}>
              <code>{command.code}</code>
            </pre>
          </article>
        ))}
      </div>
    </section>
  )
}
