declare module 'mdx-scoped-runtime' {
  import { MDXProps } from '../utils'

  let MDX: (props: MDXProps) => JSX.Element
  export default MDX
}
