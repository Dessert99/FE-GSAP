/** 코드 패널이 가리키는 실행 source 경로를 실제 GitHub 파일 주소와 한 쌍으로 보여 준다. */
import './RepoFileLink.css'

// path가 저장소 루트 기준이라 그대로 이어 붙이면 기본 브랜치의 실제 파일 주소가 된다
const REPO_FILE_BASE_URL = 'https://github.com/Dessert99/FE-GSAP/blob/main'

type Props = {
  path: string
}

/** 경로 표시와 새 탭 이동을 한 컴포넌트로 묶어 모든 예제가 같은 형태를 갖게 한다. */
export function RepoFileLink({ path }: Props) {
  return (
    <span className="repo-file-link">
      <code>{path}</code>
      <a
        className="repo-file-link__anchor"
        href={`${REPO_FILE_BASE_URL}/${path}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${path} 파일을 GitHub에서 새 탭으로 열기`}
      >
        이동하기
        <span aria-hidden="true">→</span>
      </a>
    </span>
  )
}
