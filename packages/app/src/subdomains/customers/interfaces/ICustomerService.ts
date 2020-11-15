import { IQueryExecutor, QEData, Query } from '@app/subdomains/app'
import { ICustomer } from 'shopify-api-node'

/**
 * @file Subdomain Interfaces - Customer Service
 * @module subdomains/customers/interfaces/ICustomerService
 */

export interface ICustomerService extends IQueryExecutor<ICustomer> {
  find(query?: CustomerQuery): Promise<QEData<ICustomer>>
  findByEmail(email: ICustomer['email']): Promise<ICustomer | null>
  get(id: ICustomer['id']): Promise<ICustomer>
  getByEmail(email: ICustomer['email']): Promise<ICustomer>
}

/**
 * Object representing a customer query.
 */
export type CustomerQuery = Query<ICustomer>

/**
 * Object representing a response from the Shopify REST API `customers`
 * endpoint.
 */
export type ListCustomersResponse = { customers: Array<ICustomer> }
