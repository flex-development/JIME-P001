import { AnyObject, Primitive } from '@flex-development/types'

/**
 * @file Serialize an object or primitive
 * @module subdomains/app/utils/serialize
 */

/**
 * Returns a serialize object.
 *
 * @param data - Object or primitive to serialize
 */
function serialize<T = AnyObject | Primitive>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export default serialize
