/** labelled timeline과 create instance의 관계를 먼저 고정한다. */
export function CreateInstanceSection() {
  return (
    <section id="create-instance">
      <p>02 · create instance</p>
      <h2>id가 붙은 timeline을 한 inspector에 연결합니다</h2>
      <p>
        Timeline과 child Tween의 <code>id</code>는 animation menu에서 scene을 찾는 이름입니다. 이
        페이지의 lab은 global timeline 대신 <code>gsdevtools-lab-timeline</code>만 inspector에
        연결합니다.
      </p>
      <pre>
        <code>{`gsap.registerPlugin(GSDevTools)
const timeline = gsap.timeline({ id: 'scene', paused: true })
timeline.to('.dot', { x: 160, id: 'enter' })
const tools = GSDevTools.create({ animation: timeline })`}</code>
      </pre>
      <p>
        UI에서 바꾼 in/out, selected animation, timeScale, loop는 같은 domain session에서
        persist합니다. 재현 가능한 lab은 <code>persist: false</code>와 unique <code>id</code>를 써서
        그 상태를 분리합니다.
      </p>
    </section>
  )
}
