import { request } from '@core/config/axios'
import TurndownService from 'turndown'

/**
 * @file Implementation - toJSX
 * @module utils/toJSX
 */

/**
 * Returns a JSX code string containing transpiled MDX.
 *
 * @param {string} str - String with MDX content
 * @return {Promise<string>} Promise containing JSX code
 */
const toJSX = async (str?: string | Promise<string>): Promise<string> => {
  const html = (await str)?.replace('\n', '<br/>') ?? ''

  const { code } = await request({
    data: JSON.stringify(new TurndownService().turndown(html)),
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    url: 'https://mdjsx.flexdevelopment.vercel.app'
  })

  return code
}

export default toJSX
