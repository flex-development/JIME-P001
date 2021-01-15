/// <reference types='buble' />
/// <reference types='next' />
/// <reference types='next/types/global' />

declare module '@mdx-js/mdx' {
  import { AnyObject } from '@flex-development/json/utils/types'

  let sync: (mdxstr: string, options?: AnyObject) => string

  export { sync }
}

declare module 'critical' {
  import { AnyObject, ANYTHING } from '@flex-development/json/utils/types'

  type Result = {
    css: string
    html: string
    uncritical?: string
  }

  let generate: (
    options: AnyObject,
    cb?: (err: Error, res: Result) => ANYTHING
  ) => Promise<Result> | ReturnType<typeof cb>

  export { Result, generate }
}
