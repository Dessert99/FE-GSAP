/** TextPlugin의 load → register → vars 흐름을 실제 registry 상태로 보여 준다. */
import { useRegistrationDiagnosticAnimation } from "./useRegistrationDiagnosticAnimation";
import "./RegistrationDiagnostic.css";

/** 명시적 registration과 replay를 조작·관찰·코드로 함께 보여 주는 예제다. */
export function RegistrationDiagnostic() {
  // runtime이 소유한 descriptor·실제 registry snapshot·control handler를 화면에 쓴다
  const {
    scope,
    previewRef,
    descriptor,
    snapshot,
    reducedMotion,
    register,
    replay,
  } = useRegistrationDiagnosticAnimation();
  // runtime descriptor와 실제 snapshot을 코드 문법으로만 포맷한다
  const code = `import gsap from 'gsap'
import { ${descriptor.registryName} } from '${descriptor.modulePath}'

gsap.registerPlugin(${descriptor.registryName})

const message = document.querySelector('.registration-diagnostic__message')
if (!message) throw new Error('message element를 찾지 못했습니다.')
const originalText = message.textContent
const tween = gsap.to(message, {
  ${descriptor.varsKey}: '${descriptor.sampleValue}',
  duration: ${reducedMotion ? 0 : 0.8},
})

function cleanup() {
  tween.kill()
  message.textContent = originalText
}`;
  // 실제 registry 결과만 live region에 넣어 연속 animation 값을 낭독하지 않는다
  const status = snapshot.registered
    ? `registry에 ${descriptor.varsKey} key가 등록되었습니다. ${snapshot.action === "replayed" ? "예제를 다시 재생했습니다." : "replay할 수 있습니다."}`
    : `registry에 ${descriptor.varsKey} key가 없습니다. register 버튼을 눌러 연결하세요.`;

  return (
    <section
      className="registration-diagnostic"
      aria-labelledby="registration-diagnostic-title"
    >
      <h3 id="registration-diagnostic-title">등록 상태를 실제로 확인하기</h3>
      <p className="registration-diagnostic__goal">
        목표: TextPlugin의 개별 text option을 배우는 것이 아니라, imported
        plugin이 register된 뒤 vars key를 읽는 순서를 확인합니다.
      </p>
      <div className="registration-diagnostic__body" ref={scope}>
        <div className="registration-diagnostic__steps" aria-label="등록 흐름">
          <p>
            <strong>1. load</strong>
            <code>{descriptor.modulePath}</code>
          </p>
          <p>
            <strong>2. register</strong>
            <code>{descriptor.registryName}</code>
          </p>
          <p>
            <strong>3. vars</strong>
            <code>{descriptor.varsKey}</code>
          </p>
        </div>
        <div className="registration-diagnostic__preview">
          <p ref={previewRef} className="registration-diagnostic__message">등록 전에는 plugin vars를 실행하지 않습니다.</p>
          <div className="registration-diagnostic__controls">
            <button type="button" onClick={register}>
              TextPlugin register
            </button>
            <button
              type="button"
              onClick={replay}
              disabled={!snapshot.registered}
            >
              예제 replay
            </button>
          </div>
          {reducedMotion && (
            <p className="registration-diagnostic__motion-note">
              모션 감소 설정에서는 최종 문장이 즉시 표시됩니다.
            </p>
          )}
        </div>
      </div>
      <p className="registration-diagnostic__status" role="status">
        {status}
      </p>
      <pre className="registration-diagnostic__code">
        <code>{code}</code>
      </pre>
      <div className="registration-diagnostic__panels">
        <article>
          <h4>무엇이 달라졌나요?</h4>
          <p>
            register 전에는 replay 버튼이 비활성화됩니다. 등록 뒤에는 같은
            descriptor의 <code>text</code> key가 Tween에 전달됩니다.
          </p>
        </article>
        <article>
          <h4>무엇을 봐야 하나요?</h4>
          <p>
            화면의 registry status와 코드의 import·register·vars key가 모두 같은
            runtime snapshot을 읽는지 보세요.
          </p>
        </article>
        <article>
          <h4>왜 이렇게 동작하나요?</h4>
          <p>
            GSAP core는 register된 plugin capability를 알고 있어야 해당 vars
            key를 plugin으로 넘길 수 있습니다.
          </p>
        </article>
        <article>
          <h4>실제로 언제 쓰나요?</h4>
          <p>
            Scroll, SVG, UI처럼 별도 plugin을 module로 가져온 뒤 component에서
            animation을 만들기 전에 setup을 점검할 때 같은 순서를 씁니다.
          </p>
        </article>
      </div>
      <p className="registration-diagnostic__source">
        실행 코드 위치 ·{" "}
        <code>
          examples/RegistrationDiagnostic/useRegistrationDiagnosticAnimation.ts
        </code>
      </p>
    </section>
  );
}
