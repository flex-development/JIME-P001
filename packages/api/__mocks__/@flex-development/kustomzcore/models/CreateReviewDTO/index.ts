import type {
  ICustomer,
  NumberString
} from '@flex-development/kustomzcore/types'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import PRODUCTS from '@kapi/tests/fixtures/shopify/products'
import { number, object, string, union } from 'zod'

/**
 * @file Mock - @flex-development/kustomzcore/models/CreateReviewDTO
 * @module mocks/flex-development/kustomzcore/models/CreateReviewDTO
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 */

const mockName = '@flex-development/kustomzcore/models/CreateReviewDTO'

const { default: DTO, EmailError, ProductError } = jest.requireActual(mockName)

const mockNUMBER = number()
const mockSTRING = string()

const mockRefineEmail = async (email: ICustomer['email']): Promise<boolean> => {
  return !!CUSTOMERS.find(customer => customer.email === email)
}

const mockRefineID = async (id: NumberString): Promise<boolean> => {
  const $id = typeof id === 'string' ? JSON.parse(id) : id
  return !!PRODUCTS.find(product => product.product_id === $id)
}

const MockPartialDTO = object({
  email: mockSTRING.email().refine(mockRefineEmail, EmailError),
  id: union([mockNUMBER.positive(), mockSTRING]).refine(
    mockRefineID,
    ProductError
  )
})

export default DTO.merge(MockPartialDTO)
