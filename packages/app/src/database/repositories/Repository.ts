import { getCurrentTime } from '@app/utils'
import { IEntity } from '@flex-development/kustomtypez'
import { omit } from 'lodash'
import {
  add,
  all,
  collection,
  get,
  remove,
  subcollection,
  update,
  upset
} from 'typesaurus'
import { AddModel } from 'typesaurus/add'
import { Collection } from 'typesaurus/collection'
import { Doc } from 'typesaurus/doc'
import { UpdateModel } from 'typesaurus/update'
import { UpsetModel } from 'typesaurus/upset'

/**
 * @file Base repository class
 * @module database/repositories/Repository
 */

export interface IRepository<T extends IEntity = IEntity> {
  create(data: AddModel<T>): Promise<T>
  find(): Promise<Array<T>>
  get(id: T['id']): Promise<T | null>
  update(id: T['id'], data: UpdateModel<T | Partial<T>>): Promise<T>
  upsert(id: T['id'], data: UpsetModel<T>): Promise<T>
  delete(id: T['id']): Promise<string>
}

/* eslint-disable prettier/prettier */

export default class Repository<
  T extends IEntity = IEntity,
  S extends IEntity = IEntity
> implements IRepository<T> {
  /* eslint-enable prettier/prettier */

  /**
   * Collection or subollection object.
   *
   * @see https://typesaurus.com/modules/_collection_index_.html#collection-1
   * @see https://typesaurus.com/modules/_subcollection_index_.html#subcollection-1
   */
  protected collection: Collection<T>

  /**
   * Firestore collection path.
   */
  path: string

  /**
   * Creates a new repository.
   *
   * @param path - Firestore collection or subcollection path
   * @param parent - Parent collection name if subcollection
   */
  constructor(path: string, parent?: string) {
    if (parent) {
      const sub = subcollection<S, T>(path, collection<T>(parent))
      this.collection = (sub as unknown) as Collection<T>
    } else {
      this.collection = collection<T>(path)
    }

    this.path = path
  }

  /**
   * Retrieves the document data.
   *
   * @param doc - Document to retrieve model data from
   */
  protected documentData(doc: Doc<T>): T {
    return doc.data
  }

  /**
   * Creates a new repository entity.
   * If an `id` isn't passed, it will be generated automatically.
   *
   * @param data - Data to insert into repository
   * @returns New entity data
   */
  async create(data: AddModel<T>): Promise<T> {
    const entity = { ...data, created_at: getCurrentTime() }

    const { id } = await add<T>(this.collection, entity)

    // ! Can't use `this.update` because it will remove the id field
    if (!data.id) await update(this.collection, id, { ...entity, id })

    return (await this.get(id)) as T
  }

  /**
   * Retrieves all repository data.
   *
   * @todo Implement query and pagination helpers
   *
   * @returns Repository data
   */
  async find(): Promise<Array<T>> {
    const docs = await all<T>(this.collection)

    if (!docs.length) return []

    return docs.map(doc => this.documentData(doc))
  }

  /**
   * Retrieve an entity by `id`.
   *
   * @param id - ID of document to find
   * @returns Entity data or null
   */
  async get(id: T['id']): Promise<T | null> {
    const doc = await get<T>(this.collection, id)

    if (!doc) return doc

    return this.documentData(doc)
  }

  /**
   * Update an entity. Partial updates accepted, but the `created_at` and `id`
   * fields will be removed if present in the update data.
   *
   * @param id - ID of entity to update
   * @param data - Data to update entity with
   * @returns Updated entity
   */
  async update(id: T['id'], data: UpdateModel<T | Partial<T>>): Promise<T> {
    const safe_data = omit<typeof data>(data, ['created_at', 'id'])

    await update(this.collection, id, safe_data as UpdateModel<T>)

    return (await this.get(id)) as T
  }

  /**
   * Creates a new entity if an entity with the same `id` doesn't exist.
   * Otherwise, the entity will be updated.
   *
   * @param id - ID of entity to create or update
   */
  async upsert(id: T['id'], data: UpsetModel<T>): Promise<T> {
    await upset<T>(this.collection, id, { ...data, id })
    return (await this.get(id)) as T
  }

  /**
   * Delete an entity.
   *
   * @param id - ID of entity to delete
   * @returns ID of deleted entity
   */
  async delete(id: T['id']): Promise<string> {
    await remove(this.collection, id)
    return id
  }
}
