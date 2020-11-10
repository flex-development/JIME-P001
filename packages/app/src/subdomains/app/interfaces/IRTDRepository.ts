import { NullishPrimitive } from '@flex-development/kustomzdesign/types'
import { ClassType, transformAndValidate } from 'class-transformer-validator'
import { QueryExecutor as QE } from '../models/QueryExecutor'
import { FirebaseAdaptorDatabase, FirebaseAdaptorReference } from '../utils'
import { IEntity } from './IEntity'
import { Query } from './IQueryExecutor'

/**
 * @file Subdomain Interfaces - Firebase RTD Repository
 * @module subdomains/app/interfaces/IRTDRepository
 */

/**
 * A Realtime Database repository is a JSON object located at a database path.
 */
export interface IRTDRepository<E extends IEntity = IEntity> extends QE<E> {
  database: FirebaseAdaptorDatabase
  model: ClassType<E>
  metadata: E | null
  path: string
  root: FirebaseAdaptorReference
  validator: typeof transformAndValidate

  create(data: RTDRepoCreateEntity<E>): Promise<E>
  createBatch(batch: Array<RTDRepoCreateEntity<E>>): Promise<Array<E>>
  delete(id: IEntity['id']): Promise<void>
  deleteBatch(batch: Array<IEntity['id']>, keep?: boolean): Promise<void>
  find(query?: Query<E>): Promise<Array<E | Partial<E>>>
  findById(id: IEntity['id']): Promise<E | null>
  get(id: IEntity['id']): Promise<E>
  normalize(ref: FirebaseAdaptorReference): Promise<RTDRepoJSONValue<E>>
  update(id: IEntity['id'], data: RTDRepoUpdateEntity<E>): Promise<E>
  updateBatch(batch: Array<RTDRepoUpdateEntityBatch<E>>): Promise<Array<E>>
  upsert(id: IEntity['id'], data: RTDRepoUpdateEntity<E>): Promise<E>
  upsertBatch(batch: Array<RTDRepoUpdateEntityBatch<E>>): Promise<Array<E>>
}

/**
 * The `created_at` field should not be attached to create requests.
 */
export type RTDRepoCreateEntity<E> = Partial<Omit<E, 'created_at'>>

/**
 * The `created_at` and `id` fields of an entity cannot be updated.
 */
export type RTDRepoUpdateEntity<E> = Partial<Omit<E, 'created_at' | 'id'>>

/**
 * The `id` field cannot be updated, but the field is necessary when updating a
 * batch of entities.
 */
export type RTDRepoUpdateEntityBatch<E> = RTDRepoUpdateEntity<E> & {
  id: IEntity['id']
}

/**
 * Type of data that can be retrieved when normalizing a find or get request for
 * a repository.
 */
export type RTDRepoJSONValue<E extends IEntity = IEntity> =
  | E
  | E[]
  | NullishPrimitive
  | NullishPrimitive[]
  | RTDRepoRootData<E>

/**
 * Type of data found at root of repository.
 */
export type RTDRepoRootData<E extends IEntity> = Record<E['id'], E>
