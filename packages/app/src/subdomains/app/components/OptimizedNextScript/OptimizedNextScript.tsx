import type { OriginProps } from 'next/document'
import { NextScript } from 'next/document'
import { cloneElement } from 'react'

/**
 * @file Implementation - NextScript
 * @module subdomains/app/components/OptimizedNextScript
 */

export type OptimizedNextScriptProps = OriginProps & {
  mode?: 'async' | 'defer'
}

/**
 * Extends the original `NextScript` class. Provides greater control over how
 * script elements are rendered.
 *
 * This should be used in lieu of `NextScript` within `pages/_document.tsx`.
 *
 * @see https://www.moovweb.com/post/lighthouse6-website-frontend-optimization
 *
 * @class OptimizedNextScript
 * @extends NextScript
 */
export class OptimizedNextScript extends NextScript {
  static defaultProps = {
    mode: 'async'
  }

  constructor(props: OptimizedNextScriptProps) {
    super(props)
    this.state = { mode: props.mode }
  }

  getScripts(files: Parameters<NextScript['getScripts']>[0]): JSX.Element[] {
    // @ts-expect-error can't extend prop types
    const { mode } = this.state

    return super.getScripts(files).map(script => {
      return cloneElement(script, {
        async: mode === 'async' ? true : undefined,
        defer: mode === 'defer' ? true : undefined,
        key: script.props.src
      })
    })
  }
}
