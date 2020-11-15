import { IProductService } from '@app/subdomains/products/interfaces/IProductService'
import ProductService from '@app/subdomains/products/services/ProductService'
import { AnyObject } from '@flex-development/kustomzdesign/types'

/**
 * @file Unit Tests - ProductService
 * @module tests/services/ProductService
 */

describe('ProductService', () => {
  let Products: IProductService | AnyObject = {}

  it('initializes a new service instance', () => {
    Products = new ProductService()

    expect(Products.shopify).toBeDefined()
  })
})
