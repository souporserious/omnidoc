import webpack from 'webpack'
import { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'
import { resolve } from 'node:path'
import createMdxPlugin from '@next/mdx'
import type { bundledThemes } from 'shiki/bundle/web'

import { getMdxPlugins } from '../mdx-plugins'
import { renumberFilenames } from '../utils/renumber'
import { createRefreshServer } from './create-refresh-server'

type PluginOptions = {
  /** Path to the VS Code compatible theme used for syntax highlighting the `CodeBlock`, `CodeInline`, and `Tokens` components. */
  theme: keyof typeof bundledThemes | (string & {})

  /** The URL of the production site. This is used for generating sitemap and RSS feed URLs. */
  siteUrl?: string

  /** The git source to use for linking to the repository and source files. This is automatically inferred from the git remote URL if not provided. */
  gitSource?: string

  /** The branch to use for linking to the repository and source files. */
  gitBranch?: string

  /** Whether or not to renumber ordered filenames (e.g. 01.getting-started) when adding/removing/modifying MDX files. This only occurs while the development server is running. */
  renumberFilenames?: boolean

  /** Whether or not to add rich highlighted errors in the console when type-checking source code in `CodeBlock`. Note, this may affect framework error boundaries that don't understand color encoding. */
  highlightErrors?: boolean
}

/** A Next.js plugin to configure MDXTS theming, `rehype` and `remark` markdown plugins, and the [Webpack loader](mdxts.dev/packages/loader). */
export function createMdxtsPlugin(pluginOptions: PluginOptions) {
  let refreshServerPort: string | null = null
  let {
    gitSource,
    gitBranch = 'main',
    siteUrl,
    theme,
    renumberFilenames: renumberFilenamesOption = true,
    highlightErrors,
  } = pluginOptions
  const themePath = theme.endsWith('.json')
    ? resolve(process.cwd(), theme)
    : theme

  return function withMdxts(nextConfig: NextConfig = {}) {
    const getWebpackConfig = nextConfig.webpack
    let startedRenumberFilenameWatcher = false

    return async (phase: typeof PHASE_DEVELOPMENT_SERVER) => {
      const plugins = await getMdxPlugins({ gitSource, gitBranch })
      const withMdx = createMdxPlugin({ options: plugins })

      nextConfig.webpack = (config, options) => {
        // add default mdx components before @mdx-js/react
        config.resolve.alias['next-mdx-import-source-file'].splice(
          -1,
          0,
          resolve(__dirname, '../../src/components/MDXComponents.js')
        )

        config.plugins.push(
          // silence ts-morph and jju warnings
          new webpack.ContextReplacementPlugin(
            /\/(@ts-morph\/common|jju)\//,
            (data: { dependencies: Array<{ critical?: boolean }> }) => {
              for (const dependency of data.dependencies) {
                delete dependency.critical
              }
              return data
            }
          ),
          new webpack.IgnorePlugin({
            resourceRegExp: /^perf_hooks$/,
          })
        )

        if (
          !startedRenumberFilenameWatcher &&
          renumberFilenamesOption &&
          options.isServer &&
          options.dev
        ) {
          renumberFilenames()
          startedRenumberFilenameWatcher = true
        }

        config.module.rules.push({
          test: /\.(?:jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: [{ loader: 'mdxts/loader', options: { gitSource, gitBranch } }],
        })

        if (typeof getWebpackConfig === 'function') {
          return getWebpackConfig(config, options)
        }

        return config
      }

      if (nextConfig.env === undefined) {
        nextConfig.env = {}
      }

      nextConfig.env.MDXTS_GIT_SOURCE = gitSource ?? ''
      nextConfig.env.MDXTS_GIT_BRANCH = gitBranch
      nextConfig.env.MDXTS_SITE_URL = siteUrl
      nextConfig.env.MDXTS_THEME_PATH = themePath
      nextConfig.env.MDXTS_HIGHLIGHT_ERRORS = String(highlightErrors)

      if (phase === PHASE_DEVELOPMENT_SERVER) {
        if (refreshServerPort === null) {
          const server = await createRefreshServer()
          const address = server.address()
          if (address === null || typeof address === 'string') {
            throw new Error('Expected server to be listening')
          }
          refreshServerPort = String(address.port)
        }
        nextConfig.env.MDXTS_REFRESH_PORT = refreshServerPort
      }

      if (nextConfig.pageExtensions === undefined) {
        nextConfig.pageExtensions = ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
      }

      nextConfig.experimental = {
        ...nextConfig.experimental,
        serverComponentsExternalPackages: [
          ...(nextConfig.experimental?.serverComponentsExternalPackages ?? []),
          'ts-morph',
        ],
      }

      return withMdx(nextConfig)
    }
  }
}
