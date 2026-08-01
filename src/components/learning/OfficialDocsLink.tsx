import './OfficialDocsLink.css'

export type OfficialReference = {
  label: string
  href: string
}

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
