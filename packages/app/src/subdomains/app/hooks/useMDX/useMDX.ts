import { FeathersErrorJSON } from '@feathersjs/errors'
import fetcher from '@subdomains/app/utils/transformMDX'
import { TransformOutput } from 'buble'
import pick from 'lodash/pick'
import useSWR from 'swr/use-swr'

/**
 * @file Implementation - useMDX
 * @module subdomains/cms/hooks/useMDX/impl
 */

export type UseMDX = {
  error?: FeathersErrorJSON
  data?: TransformOutput
  isValidating: boolean
}

/**
 * Parses and transform MDX into JavaScript.
 *
 * @param mdx - String containing MDX
 */
export const useMDX = (mdx: Parameters<typeof fetcher>[0]): UseMDX => {
  const res = useSWR<TransformOutput, FeathersErrorJSON>([mdx], fetcher, {
    refreshWhenHidden: true
  })

  return pick(res, ['data', 'error', 'isValidating'])
}
