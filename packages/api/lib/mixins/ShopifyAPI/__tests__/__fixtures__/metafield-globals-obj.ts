import type { IMetafield } from '@flex-development/kustomzcore/types'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import ARR from './metafield-globals'

/**
 * @file Test Fixture - Object Containing Global Metafields
 * @module lib/mixins/ShopifyAPI/tests/fixtures/metafield-globals-obj
 */

jest.unmock('@flex-development/kustomzcore/utils/objectFromArray')

export default ofa<IMetafield>(ARR, 'key')
