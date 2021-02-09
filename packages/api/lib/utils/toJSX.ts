import { axios } from '@flex-development/kustomzcore'
import { TurndownService } from '../config'

/**
 * @file Implementation - toJSX
 * @module lib/utils/toJSX
 */

/**
 * Returns a JSX code string containing transpiled MDX.
 *
 * @param str - String with MDX content
 */
const toJSX = async (str?: string | Promise<string>): Promise<string> => {
  const html = (await str)?.replace('\n', '<br/>') ?? ''

  const { code } = await axios({
    data: JSON.stringify(TurndownService.turndown(html)),
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: 'https://mdjsx.flexdevelopment.vercel.app'
  })

  return code
}

export default toJSX
