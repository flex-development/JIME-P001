import react_uuid from 'react-uuid'

/**
 * @file Create a uuid
 * @module utils/uuid
 * @see https://www.npmjs.com/package/react-uuid
 */

/**
 * Generates a uniquie uuid value.
 *
 * @param prefix - String to prepend to uuid
 * @param suffix - String to append to uuid
 */
const uuid = (prefix = '', suffix = ''): string => {
  return `${prefix}${react_uuid()}${suffix}`.trim()
}

export default uuid
