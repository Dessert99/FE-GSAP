/** 공식 GSAP 자료임을 일관된 새 탭 링크로 표시한다. */
import './OfficialDocsLink.css'

/** 공식 자료 링크가 공통으로 요구하는 표시명과 주소다. */
export type OfficialReference = {
  label: string
  href: string
}

/** 외부 공식 문서 이동임을 텍스트와 접근성 이름으로 함께 알린다. */
export function OfficialDocsLink({ label, href }: OfficialReference) {
  return (
    <a
      className="official-docs-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} 공식 문서 새 탭에서 열기`}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  )
}
