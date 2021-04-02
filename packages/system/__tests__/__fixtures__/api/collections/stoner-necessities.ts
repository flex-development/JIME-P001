import type { APIPayload } from '@kustomzcore/types'
import products from '../products'

/**
 * @file Global Test Fixture - KAPI - /collections/stoner-necessities
 * @module tests/fixtures/api/collections/stoner-necessities
 */

export default ({
  body_html: '',
  collection_id: 239230582939,
  objectID: 'stoner-necessities',
  products,
  title: 'Stoner Necessities'
} as unknown) as APIPayload.Collection
