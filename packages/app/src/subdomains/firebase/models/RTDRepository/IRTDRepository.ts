import {
  ArrayQueryExecutor as AQE,
  DataArrayQueryParams,
  NullishPrimitive
} from '@flex-development/json'
import { IEntity } from '@flex-development/kustomzcore'
import {
  FirebaseAdaptorDatabase,
  FirebaseAdaptorReference
} from '@subdomains/firebase'
import { ClassType, transformAndValidate } from 'class-transformer-validator'

/**
 * @file Subdomain Interface  - Firebase RTD Repository
 * @module subdomains/firebase/models/RTDRepository/interface
 */

/**
 * A Realtime Database repository is a JSON object located at a database path.
 */
export interface IRTDRepository<E extends IEntity = IEntity> extends AQE<E> {
  database: FirebaseAdaptorDatabase
  model: ClassType<E>
  metadata: E | null
  path: string
  root: FirebaseAdaptorReference
  validator: typeof transformAndValidate

  create(data: RTDRepoCreate<E>): Promise<E>
  createBatch(batch: Array<RTDRepoCreate<E>>): Promise<E[]>
  delete(id: IEntity['id']): Promise<boolean>
  deleteBatch(batch: Array<IEntity['id']>, keep?: boolean): Promise<boolean[]>
  find(query?: DataArrayQueryParams): Promise<Array<E | Partial<E>>>
  findById(id: IEntity['id']): Promise<E | null>
  get(id: IEntity['id']): Promise<E>
  normalize(ref: FirebaseAdaptorReference): Promise<RTDRepoJSONValue<E>>
  update(id: IEntity['id'], data: RTDRepoUpdate<E>): Promise<E>
  updateBatch(batch: Array<RTDRepoUpdateBatch<E>>): Promise<E[]>
  upsert(id: IEntity['id'], data: RTDRepoUpdate<E>): Promise<E>
  upsertBatch(batch: Array<RTDRepoUpdateBatch<E>>): Promise<E[]>
}

/**
 * The `created_at` field should not be attached to create requests.
 */
export type RTDRepoCreate<E> = Partial<Omit<E, 'created_at'>>

/**
 * The `created_at` and `id` fields of an entity cannot be updated.
 */
export type RTDRepoUpdate<E> = Partial<Omit<E, 'created_at' | 'id'>>

/**
 * The `id` field cannot be updated, but the field is necessary when updating a
 * batch of entities.
 */
export type RTDRepoUpdateBatch<E> = RTDRepoUpdate<E> & {
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
