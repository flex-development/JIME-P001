declare module 'mdx-scoped-runtime' {
  import { MDXProps } from '../props'

  let MDX: (props: MDXProps) => JSX.Element
  export default MDX
}
