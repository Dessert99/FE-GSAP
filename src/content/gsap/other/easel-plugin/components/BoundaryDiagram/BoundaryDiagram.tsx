/** CreateJS가 없는 현재 환경에서 실행 경계와 descriptor-derived code를 정적으로 보여 준다. */
const code = `import { EaselPlugin } from 'gsap/EaselPlugin'

gsap.registerPlugin(EaselPlugin)
const renderStage = () => stage.update()
gsap.ticker.add(renderStage)

gsap.to(circle, {
  duration: 2,
  scaleX: 0.5,
  scaleY: 0.5,
  easel: { tint: 0x00ff00 },
})

// cleanup
gsap.ticker.remove(renderStage)`
/** DOM/CSS와 canvas display object의 update/draw 책임을 한 diagram에 배치한다. */
export function BoundaryDiagram() {
  return (
    <figure className="easel-diagram">
      <figcaption>
        실행 전제: CreateJS Stage와 display object가 이미 존재해야 합니다.
      </figcaption>
      <ol>
        <li>
          <strong>1. load</strong>
          <span>CreateJS + ColorFilter/ColorMatrixFilter</span>
        </li>
        <li>
          <strong>2. register</strong>
          <span>gsap.registerPlugin(EaselPlugin)</span>
        </li>
        <li>
          <strong>3. update</strong>
          <span>GSAP이 display object와 easel vars를 갱신</span>
        </li>
        <li>
          <strong>4. draw</strong>
          <span>ticker가 stage.update()를 호출해 canvas를 다시 그림</span>
        </li>
        <li>
          <strong>5. cleanup</strong>
          <span>ticker callback 제거 후 app의 stage lifecycle 종료</span>
        </li>
      </ol>
      <pre>
        <code>{code}</code>
      </pre>
      <p>
        이 저장소에는 CreateJS가 없으므로 이 diagram과 code는 실행 결과가 아닌
        필요한 실행 경계를 설명합니다. 실제 canvas의 의미는 Stage draw 뒤에
        화면에 나타나며, 여기서는 textual state로 대체합니다.
      </p>
    </figure>
  )
}
