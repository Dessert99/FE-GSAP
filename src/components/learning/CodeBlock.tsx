import { Highlight, themes } from 'prism-react-renderer'

type Props = {
  code: string
}

// 화면에 보이는 코드 = 실제 실행되는 소스 파일(?raw). 별도 문자열을 복제하지 않아 어긋나지 않는다.
// prism-react-renderer로 TSX 문법을 토큰 단위로 칠해 가독성을 높인다.
export function CodeBlock({ code }: Props) {
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language="tsx">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="code-block" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
