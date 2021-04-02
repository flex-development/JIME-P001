import type { APIPayload } from '@kustomzcore/types'
import products from '../products'

/**
 * @file Global Test Fixture - KAPI - /collections/all-products
 * @module tests/fixtures/api/collections/all-products
 */

export default ({
  body_html:
    'Pitchfork listicle typewriter meditation wolf tumeric. Sint green juice gluten-free sustainable, quis culpa umami XOXO cardigan aesthetic. Keytar locavore quinoa mlkshk duis cupidatat pop-up kitsch mollit hella bushwick. Adaptogen non beard ex.',
  collection_id: 228162732187,
  objectID: 'all-products',
  products,
  title: 'All Products'
} as unknown) as APIPayload.Collection
