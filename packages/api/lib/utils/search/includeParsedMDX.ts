import type { SearchOptions } from '../../types'
import allFields from './includeAllFields'

/**
 * @file Implementation - includeParsedMDX
 * @module lib/utils/search/includeParsedMDX
 */

/**
 * Returns true if the `body` or `body_html` fields should be parsed for MDX
 * content.
 *
 * @param options - Search index options
 * @param options.attributesToRetrieve - Gives control over which attributes to
 * retrieve and which not to retrieve
 */
const includeParsedMDX = (options: SearchOptions): boolean => {
  const { attributesToRetrieve: fields = [] } = options

  const exclude = fields.includes('-body') || fields.includes('-body_html')
  const include = fields.includes('body') || fields.includes('body_html')

  return !exclude && (allFields(options) || include)
}

export default includeParsedMDX
