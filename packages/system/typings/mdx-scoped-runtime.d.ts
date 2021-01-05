declare module 'mdx-scoped-runtime' {
  import { MDXProps } from '..src/types/props'

  let MDX: (props: MDXProps) => JSX.Element
  export default MDX
}
