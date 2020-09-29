import { IFireOrmQueryLine, IOrderByParams } from 'fireorm'

/**
 * Firestore database query.
 *
 * @see {@link https://fireorm.js.org/#/Read_Data?id=complex-queries}
 * @see {@link https://fireorm.js.org/#/Read_Data?id=order-by-and-limit}
 */
export interface DatabaseQuery {
  order?: IOrderByParams
  queries?: IFireOrmQueryLine[]
  limit?: number
  single?: boolean
}
