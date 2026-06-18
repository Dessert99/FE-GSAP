import { useRef, useState } from 'react' // 필드 값, 오류 상태, focus target을 관리한다.
import { flushSync } from 'react-dom' // 오류 DOM을 만든 직후 GSAP이 메시지를 읽게 한다.
import gsap from 'gsap' // shake와 오류 메시지 enter 모션을 만든다.
import { useGSAP } from '@gsap/react' // submit 핸들러에서 만든 tween도 cleanup한다.

export function FormValidationMotionExample() {
  const form = useRef<HTMLFormElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<string[]>([])
  const { contextSafe } = useGSAP({ scope: form })

  const submit = contextSafe((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = [
      values.email.includes('@') ? '' : 'email',
      values.password.length >= 6 ? '' : 'password',
    ].filter(Boolean)

    flushSync(() => setErrors(nextErrors))

    if (nextErrors.length === 0) {
      gsap.fromTo('.form-motion__success', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.24 })
      return
    }

    const firstInvalid = nextErrors[0] === 'email' ? email.current : password.current
    const invalidRows = nextErrors.map((name) => form.current?.querySelector(`[data-field="${name}"]`)).filter(Boolean)
    const messages = form.current ? gsap.utils.toArray<HTMLElement>('.form-motion__error', form.current) : []

    // shake는 잘못된 행에만 적용한다.
    // 영향: 전체 form을 흔드는 것보다 사용자가 수정할 위치를 더 빨리 찾는다.
    gsap.fromTo(invalidRows, { x: -8 }, { x: 0, duration: 0.36, ease: 'elastic.out(1, 0.35)', overwrite: true })
    gsap.from(messages, { autoAlpha: 0, y: -6, duration: 0.2, stagger: 0.04, overwrite: true })
    firstInvalid?.focus()
  })

  return (
    <form ref={form} className="form-motion" onSubmit={submit} noValidate>
      <label className="form-motion__row" data-field="email">
        <span>Email</span>
        <input
          ref={email}
          value={values.email}
          aria-invalid={errors.includes('email')}
          aria-describedby={errors.includes('email') ? 'form-motion-email-error' : undefined}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          placeholder="name@example.com"
        />
        {errors.includes('email') ? (
          <em id="form-motion-email-error" className="form-motion__error">
            이메일에는 @가 필요합니다.
          </em>
        ) : null}
      </label>
      <label className="form-motion__row" data-field="password">
        <span>Password</span>
        <input
          ref={password}
          value={values.password}
          type="password"
          aria-invalid={errors.includes('password')}
          aria-describedby={errors.includes('password') ? 'form-motion-password-error' : undefined}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          placeholder="6자 이상"
        />
        {errors.includes('password') ? (
          <em id="form-motion-password-error" className="form-motion__error">
            비밀번호는 6자 이상이어야 합니다.
          </em>
        ) : null}
      </label>
      <button type="submit" className="demo-button">
        validate
      </button>
      {errors.length === 0 && values.email && values.password.length >= 6 ? <strong className="form-motion__success">Ready to submit</strong> : null}
    </form>
  )
}
