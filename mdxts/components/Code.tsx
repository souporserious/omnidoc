import React, { cache } from 'react'
import { readFile } from 'node:fs/promises'
import { getHighlighter } from './highlighter'
import { project } from './project'

export type CodeProps = {
  /** Code snippet to be highlighted. */
  value?: string

  /** Name of the file. */
  filename?: string

  /** Language of the code snippet. */
  language?: string

  /** VS Code-based theme for highlighting. */
  theme?: Parameters<typeof getHighlighter>[0]['theme']
}

const loadTypeDeclarations = cache(async () => {
  const typeDeclarations = JSON.parse(
    await readFile(`.next/static/mdxts/types.json`, 'utf8')
  )

  typeDeclarations.forEach(({ path, code }) => {
    project.createSourceFile(path, code, { overwrite: true })
  })
})

let filenameId = 0

/** Renders a code block with syntax highlighting. */
export async function Code({
  value,
  filename: filenameProp,
  language = 'bash',
  theme,
  ...props
}: CodeProps) {
  const filename = filenameProp || `index-${filenameId++}.tsx`
  const highlighter = await getHighlighter({ theme })
  let diagnostics = []

  if (['js', 'jsx', 'ts', 'tsx', 'mdx'].includes(language)) {
    await loadTypeDeclarations()

    diagnostics = project
      .createSourceFile(filename, value)
      .getPreEmitDiagnostics()
  }

  const tokens = highlighter(value, language, diagnostics)

  return (
    <pre
      style={{
        gridArea: '1 / 1',
        fontSize: 14,
        lineHeight: '20px',
        padding: 0,
        margin: 0,
      }}
      {...props}
    >
      {tokens.map((line, lineIndex) => {
        return (
          <div key={lineIndex} style={{ height: 20 }}>
            {line.map((token, tokenIndex) => {
              return (
                <span
                  key={tokenIndex}
                  style={{
                    ...token.fontStyle,
                    color: token.color,
                    textDecoration: token.hasError
                      ? 'red wavy underline'
                      : 'none',
                  }}
                >
                  {token.content}
                </span>
              )
            })}
          </div>
        )
      })}
    </pre>
  )
}
