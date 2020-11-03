/// <reference types='mdx-js__react' />

declare module 'mdx-scoped-runtime' {
  import { FC, ReactNode } from 'react'
  import { AnyObject } from '../utils'

  interface MDXProps extends MDXProviderProps {
    children?: ReactNode
    components?: MDXProviderComponents
    scope?: Record<string, FC<AnyObject>> | AnyObject
  }

  let MDX: (props: MDXProps) => JSX.Element
  export default MDX
}
