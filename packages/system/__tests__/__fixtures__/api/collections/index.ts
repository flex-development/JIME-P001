import type { APIPayload } from '@kustomzcore/types'
import ALL_PRODUCTS from './all-products'
import CLOTHING from './clothing'
import STONER_NECESSITIES from './stoner-necessities'

/**
 * @file Global Test Fixture - KAPI - /collections
 * @module tests/fixtures/api/collections
 */

export default [
  STONER_NECESSITIES,
  CLOTHING,
  ALL_PRODUCTS
] as APIPayload.Collection[]
