/** PixiPlugin이 nested PixiJS state를 다루는 vars와 version 경계를 정리한다. */
/** transform·색·filter의 역할을 같은 display object 관점에서 설명한다. */
export function PropertiesSection() {
  return (
    <section id="pixi-properties">
      <h2>02 · nested transform과 filter를 하나의 pixi vars 객체로 적습니다</h2>
      <p>
        PixiJS는 <code>position.x</code>, <code>scale.y</code>,{' '}
        <code>skew.x</code>처럼 하위 객체에 값을 둡니다. PixiPlugin은 이를
        <code>x</code>, <code>scaleY</code>, <code>skewX</code> 같은{' '}
        <code>pixi</code> vars로 연결합니다. <code>rotation</code>은 PixiJS
        내부의 radian 대신 degree로 쓸 수 있습니다.
      </p>
      <table>
        <caption>
          installed PixiPlugin type declaration의 지원 vars 묶음
        </caption>
        <thead>
          <tr>
            <th scope="col">묶음</th>
            <th scope="col">vars</th>
            <th scope="col">학습 경계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">위치·크기</th>
            <td>
              x, y, position, positionX/Y, scale, scaleX/Y, width, height,
              zIndex, tilePosition, tilePositionX/Y, tileScale, tileScaleX/Y,
              tileX/Y
            </td>
            <td>하위 position/scale/tile 객체의 축을 편하게 지정합니다.</td>
          </tr>
          <tr>
            <th scope="row">회전·기준점</th>
            <td>
              rotation, angle, skew, skewX/Y, anchor, anchorX/Y, pivot, pivotX/Y
            </td>
            <td>
              rotation은 degree이며 <code>_cw</code>, <code>_ccw</code>,{' '}
              <code>_short</code> suffix로 방향을 지정할 수 있습니다.
            </td>
          </tr>
          <tr>
            <th scope="row">색·가시성</th>
            <td>tint, lineColor, fillColor, strokeColor, alpha, autoAlpha</td>
            <td>CSS식 색 문자열, 0x 색, relative HSL을 받을 수 있습니다.</td>
          </tr>
          <tr>
            <th scope="row">ColorMatrixFilter</th>
            <td>
              colorMatrixFilter, saturation, brightness, contrast, hue,
              colorize, colorizeAmount, combineCMF, matrix, resolution
            </td>
            <td>plugin이 ColorMatrixFilter를 이용하는 helper입니다.</td>
          </tr>
          <tr>
            <th scope="row">BlurFilter</th>
            <td>blur, blurX, blurY, blurPadding</td>
            <td>plugin이 BlurFilter를 준비해 해당 값을 tween합니다.</td>
          </tr>
        </tbody>
      </table>
      <p>
        이 표는 허용 property의 폐쇄 목록이 아닙니다. 공식 문서는 PixiPlugin이
        거의 모든 다른 Pixi property도 다룰 수 있다고 설명합니다. 사용 중인
        Pixi/GSAP 조합은 별도로 확인하세요. 공식 문서상 directional rotation은
        GSAP 3.2에 추가되었고, installed 3.15.0 source에는 Pixi 4 및 Pixi 8+
        호환 분기가 보입니다. 이 페이지는 그 사실을 전체 version support
        matrix로 확대 해석하지 않습니다.
      </p>
    </section>
  )
}
