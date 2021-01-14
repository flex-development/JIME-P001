/// <reference types='buble' />
/// <reference types='next' />
/// <reference types='next/types/global' />

declare module '@mdx-js/mdx' {
  import { AnyObject } from '@flex-development/json/utils/types'

  let sync: (mdxstr: string, options?: AnyObject) => string

  export { sync }
}
