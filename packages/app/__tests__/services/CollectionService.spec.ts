import { ICollectionService } from '@app/subdomains/products/interfaces/ICollectionService'
import CollectionService from '@app/subdomains/products/services/CollectionService'
import { AnyObject } from '@flex-development/kustomzdesign/types'

/**
 * @file Unit Tests - CollectionService
 * @module tests/services/CollectionService
 */

describe('CollectionService', () => {
  let Collections: ICollectionService | AnyObject = {}

  it('initializes a new service instance', () => {
    Collections = new CollectionService()

    expect(Collections.shopify).toBeDefined()
  })
})
