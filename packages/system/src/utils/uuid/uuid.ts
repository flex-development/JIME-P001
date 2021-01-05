import u from 'react-uuid'

/**
 * @file Implementation - uuid
 * @module utils/uuid/impl
 * @see https://www.npmjs.com/package/react-uuid
 */

/**
 * Generates a unique uuid value.
 *
 * @param prefix - String to prepend to uuid
 * @param suffix - String to append to uuid
 */
const uuid = (prefix = '', suffix = ''): string => {
  return `${prefix}${u()}${suffix}`.trim()
}

export default uuid
