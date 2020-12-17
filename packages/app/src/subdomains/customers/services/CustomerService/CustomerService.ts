import { axiosShopify } from '@app/config/axios'
import {
  ArrayQueryExecutor,
  DataArray,
  DataArrayQueryParams
} from '@flex-development/json'
import { createError, ICustomer, Logger } from '@flex-development/kustomzcore'
import { ICustomerService, ListCustomersResponse } from './ICustomerService'

/**
 * @file Subdomain Services - Customers
 * @module subdomains/customers/services/CustomerService/impl
 * @see https://shopify.dev/docs/admin-api/rest/reference/customers/customer
 */

export default class CustomerService
  extends ArrayQueryExecutor<ICustomer>
  implements ICustomerService {
  /**
   * Returns an array of `ICustomer` objects.
   * Data can be sorted, filtered, and paginated using {@param query}.
   *
   * @async
   * @param query - Query parameters
   * @param query.$limit - Maximum number of items to return. To return data
   * from the end of the array, pass a negative value
   * @param query.$select - Pick which fields to include in the result
   * @param query.$skip - Skip the specified number of results
   * @param query.$sort - Property to sort by mapped and order (1 asc, -1 des)
   * @param query[foo] - Object containing queries for specified property
   * @param query[foo].$eq - Matches values that are equal to a specified value
   * @param query[foo].$gt - Matches values where value > query.$gt
   * @param query[foo].$gte - Matches values where value >= query.$gte
   * @param query[foo].$in - Matches any of the values specified in an array
   * @param query[foo].$lt - Matches values where value < query.$lt
   * @param query[foo].$lte - Matches values where value <= query.$lte
   * @param query[foo].$ne - Matches all values where value !== query.$ne
   * @param query[foo].$nin - Matches none of the values specified in an array
   * @returns Array of customer resource objects
   */
  async find(query?: DataArrayQueryParams): Promise<DataArray<ICustomer>> {
    const config: Parameters<typeof axiosShopify>[0] = {
      method: 'get',
      url: 'customers'
    }

    const { customers } = await axiosShopify<ListCustomersResponse>(config)

    return this.query(customers, query)
  }

  /**
   * Find a customer by email address.
   *
   * @param email - Email address of customer to find
   * @returns Customer object or null
   */
  async findByEmail(email: ICustomer['email']): Promise<ICustomer | null> {
    const query: DataArrayQueryParams = { email: { $eq: email } }
    const customers = await this.find(query)

    return (customers[0] as ICustomer) || null
  }

  /**
   * Get a customer by ID.
   * Throws an error if the customer isn't found.
   *
   * @param id - ID of customer to get
   * @returns Customer object
   * @throws {FeathersErrorJSON}
   */
  async get(id: ICustomer['id']): Promise<ICustomer> {
    const query: DataArrayQueryParams = { id: { $eq: id } }
    const customers = await this.find(query)

    if (!customers.length) {
      const data = { errors: { id } }
      const error = createError(`Customer with id ${id} not found`, data, 404)

      Logger.error({ 'CustomerService.get': error })
      throw error
    }

    return customers[0] as ICustomer
  }

  /**
   * Get a customer by email address.
   * Throws an error if the customer isn't found.
   *
   * @param email - Email address of customer to get
   * @returns Customer object
   * @throws {FeathersErrorJSON}
   */
  async getByEmail(email: ICustomer['email']): Promise<ICustomer> {
    const customer = await this.findByEmail(email)

    if (!customer) {
      const data = { errors: { email } }
      const message = `Customer with email ${email} not found`

      const error = createError(message, data, 404)

      Logger.error({ 'CustomerService.getByEmail': error })
      throw error
    }

    return customer
  }
}
