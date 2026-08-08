/** one-time align과 후속 utility/helper의 소유권을 명확히 한다. */
import { toHref } from '../../../../../../app/routes'
/** resize와 authoring boundary를 다음 학습으로 연결한다. */
export function BoundarySection() {
  return (
    <section>
      <h2>04 · coordinate와 authoring 경계</h2>
      <p>
        align 계산은 animation 시작 시 한 번만 수행되므로 resize가 path를 바꾸면
        progress를 보존해 tween을 다시 만들어야 합니다. matrix, raw path 변환,
        길이 측정은 뒤의 utility pages가 소유합니다.
      </p>
      <p>
        브라우저에서 path를 직접 편집하는 authoring workflow는 등록된{' '}
        <a href={toHref('/fundamentals/motion-path-helper')}>
          P20 MotionPathHelper
        </a>
        에서 다룹니다.
      </p>
    </section>
  )
}
