import webpack from 'webpack'
import { NextConfig } from 'next'
import { resolve } from 'node:path'
import remarkTypography from 'remark-typography'
import createMdxPlugin from '@next/mdx'
import { BUNDLED_THEMES } from 'shiki'

import { remarkPlugin } from '../remark'
import { rehypePlugin } from '../rehype'
import { renumberFilenames } from '../utils/renumber'

type PluginOptions = {
  /** Path to the VS Code compatible theme used for syntax highlighting the Code and Editor components. */
  theme: (typeof BUNDLED_THEMES)[number] | (string & {})

  /** The git source to use for linking to the repository and source files. This is automatically inferred from the git remote URL if not provided. */
  gitSource?: string

  /** The branch to use for linking to the repository and source files. */
  gitBranch?: string
}

/** A Next.js plugin to configure MDXTS theming, `rehype` and `remark` markdown plugins, and the [Webpack loader](mdxts.dev/packages/loader). */
export function createMdxtsPlugin(pluginOptions: PluginOptions) {
  let { gitSource, gitBranch = 'main', theme } = pluginOptions
  const themePath = resolve(process.cwd(), theme)

  return function withMdxts(nextConfig: NextConfig = {}) {
    const getWebpackConfig = nextConfig.webpack
    let startedWatcher = false

    return async () => {
      const [
        remarkGfm,
        remarkGitHub,
        remarkStripBadges,
        remarkSqueezeParagraphs,
        remarkUnwrapImages,
      ] = await Promise.all([
        import('remark-gfm').then((mod) => mod.default),
        import('remark-github').then((mod) => mod.default),
        import('remark-strip-badges').then((mod) => mod.default),
        import('remark-squeeze-paragraphs').then((mod) => mod.default),
        import('remark-unwrap-images').then((mod) => mod.default),
      ])
      const withMdx = createMdxPlugin({
        options: {
          remarkPlugins: [
            remarkGfm,
            gitSource?.includes('github')
              ? [remarkGitHub, { repository: gitSource }]
              : undefined,
            remarkStripBadges,
            remarkSqueezeParagraphs,
            remarkUnwrapImages,
            remarkTypography,
            remarkPlugin,
          ].filter(Boolean) as any,
          rehypePlugins: [rehypePlugin],
        },
      })

      nextConfig.webpack = (config, options) => {
        // add default mdx components before @mdx-js/react
        config.resolve.alias['next-mdx-import-source-file'].splice(
          -1,
          0,
          resolve(__dirname, '../../src/components/MDXComponents.js')
        )

        config.plugins.push(
          // silence ts-morph warnings
          new webpack.ContextReplacementPlugin(
            /\/@ts-morph\/common\//,
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

        if (options.isServer && options.dev && !startedWatcher) {
          renumberFilenames()
          startedWatcher = true
        }

        config.module.rules.push({
          test: /\.(?:jsx?|tsx?|mdx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'mdxts/loader',
              options: {
                themePath: theme.endsWith('.json') ? themePath : theme,
              },
            },
          ],
        })

        config.module.rules.push({
          test: /onig\.wasm$/,
          type: 'asset/resource',
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

      if (nextConfig.pageExtensions === undefined) {
        nextConfig.pageExtensions = ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
      }

      nextConfig.experimental = {
        ...nextConfig.experimental,
        serverComponentsExternalPackages: [
          ...(nextConfig.experimental?.serverComponentsExternalPackages ?? []),
          'esbuild',
          'ts-morph',
        ],
      }

      return withMdx(nextConfig)
    }
  }
}
