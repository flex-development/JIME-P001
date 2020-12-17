import {
  DataArray,
  DataArrayQueryParams,
  IArrayQueryExecutor
} from '@flex-development/json'
import { ICustomer } from '@flex-development/kustomzcore'

/**
 * @file Subdomain Interface - Customer Service
 * @module subdomains/customers/services/CustomerService/interface
 */

export interface ICustomerService extends IArrayQueryExecutor<ICustomer> {
  find(query?: DataArrayQueryParams): Promise<DataArray<ICustomer>>
  findByEmail(email: ICustomer['email']): Promise<ICustomer | null>
  get(id: ICustomer['id']): Promise<ICustomer>
  getByEmail(email: ICustomer['email']): Promise<ICustomer>
}

/**
 * Object representing a response from the Shopify REST API `customers`
 * endpoint.
 */
export type ListCustomersResponse = { customers: Array<ICustomer> }
