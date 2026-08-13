/** nested transform 안의 source point와 target axes를 실제 utility 결과로 보여 준다. */
import { useCoordinateMatrixLab } from './useCoordinateMatrixLab'
import './CoordinateMatrixLab.css'

/** descriptor의 네 호출 결과를 static axes와 표로 비교한다. */
export function CoordinateMatrixLab() {
  // runtime hook은 descriptor와 실제 matrix snapshot을 함께 제공한다
  const { scope, fromRef, toRef, overlayRef, descriptor, snapshot, calculate } =
    useCoordinateMatrixLab()
  // matrix coefficients를 table cell에서 읽을 문자열로 제한한다
  const matrix = (value: typeof snapshot.global) =>
    value
      ? `${value.a.toFixed(2)}, ${value.b.toFixed(2)}, ${value.c.toFixed(2)}, ${value.d.toFixed(2)}, ${value.e.toFixed(2)}, ${value.f.toFixed(2)}`
      : '—'
  // code panel은 runtime descriptor의 네 static call을 문법으로만 보여 준다
  const code = `gsap.registerPlugin(MotionPathPlugin)

const from = document.querySelector('.coordinate-matrix-lab__from')
const to = document.querySelector('.coordinate-matrix-lab__to')
const overlay = document.querySelector('.coordinate-matrix-lab__overlay')
if (!(from instanceof SVGElement) || !(to instanceof SVGElement) || !(overlay instanceof SVGElement)) {
  throw new Error('coordinate lab element를 찾지 못했습니다.')
}

let revealTween = null

function calculate() {
  revealTween?.kill()
  gsap.killTweensOf(overlay)
  const converted = MotionPathPlugin.convertCoordinates(from, to, { x: ${descriptor.point.x}, y: ${descriptor.point.y} })
  const global = MotionPathPlugin.getGlobalMatrix(from)
  const align = MotionPathPlugin.getAlignMatrix(from, to, [${descriptor.fromOrigin}], [${descriptor.toOrigin}])
  const relative = MotionPathPlugin.getRelativePosition(from, to, [${descriptor.fromOrigin}], [${descriptor.toOrigin}])
  overlay.setAttribute('cx', String(converted.x))
  overlay.setAttribute('cy', String(converted.y))
  ${descriptor.travel ? "revealTween = gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 })" : "gsap.set(overlay, { opacity: 1 })"}
  return { converted, global, align, relative }
}

function cleanup() {
  revealTween?.kill()
  gsap.killTweensOf(overlay)
  overlay.removeAttribute('style')
  overlay.removeAttribute('cx')
  overlay.removeAttribute('cy')
  overlay.setAttribute('opacity', '0')
}`
  return (
    <section className="coordinate-matrix-lab">
      <h2>nested transform coordinate lab</h2>
      <div ref={scope}>
        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label="nested transformed source and target axes"
        >
          <g transform="translate(45 35) rotate(-12) scale(1.1)">
            <circle ref={fromRef} className="coordinate-matrix-lab__from" cx="35" cy="35" r="16" />
            <line x1="35" y1="35" x2="65" y2="35" />
          </g>
          <g transform="translate(140 60) rotate(8)">
            <rect ref={toRef} className="coordinate-matrix-lab__to" x="0" y="0" width="120" height="80" fill="none" />
            <line x1="0" y1="40" x2="120" y2="40" />
            <line x1="60" y1="0" x2="60" y2="80" />
            <circle ref={overlayRef} className="coordinate-matrix-lab__overlay" r="5" opacity="0" />
          </g>
        </svg>
      </div>
      <button type="button" onClick={calculate}>
        calculate coordinates
      </button>
      <p aria-live="polite">{snapshot.notice}</p>
      <table>
        <tbody>
          <tr>
            <th>converted point</th>
            <td>
              {snapshot.converted.x.toFixed(1)},{' '}
              {snapshot.converted.y.toFixed(1)}
            </td>
          </tr>
          <tr>
            <th>relative gap</th>
            <td>
              {snapshot.relative.x.toFixed(1)}, {snapshot.relative.y.toFixed(1)}
            </td>
          </tr>
          <tr>
            <th>global matrix</th>
            <td>{matrix(snapshot.global)}</td>
          </tr>
          <tr>
            <th>align matrix</th>
            <td>{matrix(snapshot.align)}</td>
          </tr>
        </tbody>
      </table>
      <pre>
        <code>{code}</code>
      </pre>
      <p>
        공식 rendered signature는 Element 또는 window를 허용하지만 설치 d.ts는
        Element로 좁힙니다. 이 lab은 Element refs만 전달합니다.
      </p>
    </section>
  )
}
