import {
  ArrayQueryExecutor,
  DataArrayQueryParams
} from '@flex-development/json'
import { IEntity } from '@flex-development/kustomzcore'
import {
  createError,
  FirebaseAdaptorDatabase,
  FirebaseAdaptorReference
} from '@subdomains/app/utils'
import { ClassType, transformAndValidate } from 'class-transformer-validator'
import { getFromContainer } from 'class-validator'
import { isEmpty, merge, omit } from 'lodash'
import {
  IRTDRepository,
  RTDRepoCreateEntity,
  RTDRepoJSONValue,
  RTDRepoRootData as RepoRootData,
  RTDRepoUpdateEntity,
  RTDRepoUpdateEntityBatch
} from './IRTDRepository'

/**
 * @file Firebase RTD Repository Model
 * @module subdomains/app/models/RTDRepository/impl
 * @see https://firebase.google.com/docs/database
 */

/**
 * Repository model for the Firebase Realtime Database. A Realtime Database
 * repository is a JSON object located at a database path.
 *
 * @class RTDRepository
 * @implements IRTDRepository
 * @extends ArrayQueryExecutor
 */
export default class RTDRepository<E extends IEntity = IEntity>
  extends ArrayQueryExecutor<E>
  implements IRTDRepository<E> {
  /**
   * Firebase or Firebase Admin Realtime Database service.
   *
   * @see https://firebase.google.com/docs/reference/js/firebase.database
   * @see https://firebase.google.com/docs/reference/admin/node/admin.database
   */
  database: FirebaseAdaptorDatabase

  /**
   * Validation metadata, or null if `model` doesn't include validation
   * decorators.
   */
  metadata: E | null = null

  /**
   * Repository entity model.
   */
  model: ClassType<E>

  /**
   * Database path where repository is initialized.
   */
  path: string

  /**
   * Reference to root of repository.
   */
  root: FirebaseAdaptorReference

  /**
   * Function to transform and validate a JSON object as an entity `model`.
   *
   * @see https://github.com/MichalLytek/class-transformer-validator
   */
  validator = transformAndValidate

  /**
   * Creates a new repository instance.
   *
   * @param path - Database path where repository should be initialized
   * @param model - Entity model class
   * @param database - Realtime Database service to use instead of default
   * @throws {Error} If database path is an empty value
   */
  constructor(
    path: string,
    model: RTDRepository<E>['model'],
    database: RTDRepository<E>['database']
  ) {
    super()

    if (isEmpty(path)) throw new Error('Database initialization path required.')

    this.database = database
    this.model = model
    this.path = path
    this.root = this.database.ref().child(this.path)

    const metadata = getFromContainer<E>(this.model)

    if (!Object.values(metadata).every(v => v === undefined)) {
      this.metadata = metadata
    }
  }

  /**
   * Returns a timestamp as the number of milliseconds between 1 January 1970
   * 00:00:00 UTC and today's date.
   *
   * @returns {string} Timestamp in milliseconds
   */
  static timestamp(): number {
    return new Date().valueOf()
  }

  /**
   * Creates a new entity in the repository.
   *
   * If {@param data.id} is an empty value, it will be generated automatically.
   * The entry will also be timestamped.
   *
   * @async
   * @param data - Entity data
   * @param data.id - Unique entity ID
   * @returns Newly created data
   * @throws {ValidationError}
   */
  async create(data: RTDRepoCreateEntity<E>): Promise<E> {
    // Timestamp database entry
    let entity = { ...data, created_at: new Date().valueOf() } as E

    // Copy reference to root of repository
    let ref = this.root

    // Generate random ID
    if (!entity.id) entity = { ...entity, id: ref.push().key }

    // Get reference to entity db location
    ref = this.root.child(entity.id)

    // Validate data and create new entity
    if (this.metadata) entity = await this.validator(this.model, entity)

    await ref.set(entity)

    // Guarenteed to be an entity because data was just added
    return (await this.get(entity.id)) as E
  }

  /**
   * Creates a batch of entities.
   *
   * @async
   * @param data - Array of entities to insert into repo
   * @returns Array of newly created entities
   */
  async createBatch(batch: RTDRepoCreateEntity<E>[]): Promise<E[]> {
    return await Promise.all(batch.map(async data => this.create(data)))
  }

  /**
   * Removes an entity from the repository.
   *
   * @async
   * @param id - ID of entity to find
   * @returns ID of deleted entity
   */
  async delete(id: IEntity['id']): Promise<void> {
    // Prevent root of repository from being deleted
    if (isEmpty(id)) throw new Error('ID required to delete entity.')

    // Check if entity exists before deleting
    const data = await this.get(id)

    // Delete entity if it exists
    if (data?.id) await this.root.child(data.id).remove()
  }

  /**
   * Deletes a batch of entities.
   *
   * @async
   * @param ids - Array of IDs indicating entities to delete from repo
   * @param keep - If true, remove entries that are NOT in {@param ids}
   * @returns Empty promise
   */
  async deleteBatch(batch: E['id'][], keep = false): Promise<void> {
    if (keep) {
      const entities = (await this.find()) as Array<E>
      const new_batch: string[] = []

      entities.forEach(entity => {
        if (!batch.includes(entity.id)) new_batch.push(entity.id)
      })

      batch = new_batch
    }

    await Promise.all(batch.map(async id => this.delete(id)))
  }

  /**
   * Returns all of the entities in the repository. Data can be sorted,
   * filtered, and paginated using {@param query}.
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
   * @returns Array of entities
   */
  async find(query?: DataArrayQueryParams): Promise<Array<E | Partial<E>>> {
    // Get root repository data
    const root = (await this.normalize(this.root)) as RepoRootData<E>

    // Run queries
    return this.query(Object.values<E>(root || {}), query)
  }

  /**
   * Finds a single entity by ID. Returns null if the entity isn't found.
   *
   * @async
   * @param id - ID of entity to find
   * @returns Entity or null
   * @throws {FeathersErrorJSON}
   */
  async findById(id: IEntity['id']): Promise<E | null> {
    const entities = await this.find({ id: { $eq: id } })
    return (entities[0] as E) || null
  }

  /**
   * Finds a single entity by ID. Throws an error if the entity doesn't exist.
   *
   * @async
   * @param id - ID of entity to retrieve
   * @returns Entity
   * @throws {FeathersErrorJSON}
   */
  async get(id: IEntity['id']): Promise<E> {
    const data = (await this.normalize(this.root.child(id))) as E | null

    if (!data) {
      const message = `Entity with id "${id}" not found.`
      throw createError(message, { errors: { id } }, 404)
    }

    return data
  }

  /**
   * Returns a snapshot value.
   *
   * @param ref - Reference to get snapshot value from
   * @returns JSON data
   */
  async normalize(ref: FirebaseAdaptorReference): Promise<RTDRepoJSONValue<E>> {
    return JSON.parse(JSON.stringify((await ref.once('value')).val()))
  }

  /**
   * Updates an entity.
   *
   * Partial updates are accepted, but the `created_at` and `id` fields
   * can not be updated using the Repository API. These fields will be removed
   * if present in {@param data}.
   *
   * @async
   * @param id - ID of entity to update
   * @param data - Data to update entity with
   * @returns Updated entity
   * @throws {FeathersErrorJSON} If entity to update doesn't exist
   */
  async update(id: IEntity['id'], data: RTDRepoUpdateEntity<E>): Promise<E> {
    // Check if entity exists before attempting to perform update
    const existing = await this.get(id)

    // Remove IEntity base properties and merge existing data with update data
    data = merge(existing, omit(data, ['created_at', 'id']))

    // Validate data
    if (this.metadata) data = await this.validator(this.model, data)

    // Perform update
    await this.root.child(id).update(data)

    // Guarenteed to be an entity because data was just added
    return (await this.get(id)) as E
  }

  /**
   * Updates a batch of entities.
   *
   * @async
   * @param batch - Array of entities to update
   * @returns Array of updated entities
   */
  async updateBatch(batch: RTDRepoUpdateEntityBatch<E>[]): Promise<E[]> {
    return await Promise.all(batch.map(async e => this.update(e.id, e)))
  }

  /**
   * Creates a new entity if an entity with the id {@param id} doesn't exist.
   * If the entity does exist, it will be updated.
   *
   * @async
   * @param id - ID of entity to create or update
   * @param data - Data to create or update entity
   * @returns New or updated entity
   */
  async upsert(id: IEntity['id'], data: RTDRepoUpdateEntity<E>): Promise<E> {
    let entity = {} as E

    if (await this.findById(id)) {
      entity = await this.update(id, data)
    } else {
      entity = await this.create({ ...data, id } as RTDRepoCreateEntity<E>)
    }

    return entity
  }

  /**
   * Upserts a batch of entities.
   *
   * @async
   * @param batch - Array of entities to upsert
   * @returns Array of upserted entities
   */
  async upsertBatch(batch: RTDRepoUpdateEntityBatch<E>[]): Promise<E[]> {
    return await Promise.all(batch.map(async e => this.upsert(e.id, e)))
  }
}
