import { IProfileSnippet, ProfileSnippet } from '@subdomains/cms/models'
import { RTDRepository as Repo } from '@subdomains/firebase/models/RTDRepository'
import { IProfileSnippetRepository } from './IProfileSnippetRepository'

/**
 * @file Access `settings/profile-snippet` data
 * @module subdomains/cms/repositories/ProfileSnippetRepository/impl
 */

export default class ProfileSnippetRepository
  extends Repo<IProfileSnippet>
  implements IProfileSnippetRepository {
  id: 'profile-snippet'

  /**
   * Creates a new connection to the `settings` collection using the
   * `ProfileSnippet` model.
   *
   * The `id` value for all methods will be set to `profile-snippet`.
   *
   * @param database - Realtime Database service
   */
  constructor(database: Repo<IProfileSnippet>['database']) {
    super('settings', ProfileSnippet, database)
    this.id = 'profile-snippet'
  }

  /**
   * Creates new profile snippet settings.
   * If present, the value of {@param data.id} will be set to `profile-snippet`.
   *
   * @param data - New profile snippet settings
   * @param data.age - Profile age
   * @param data.img - Profile image URL
   * @param data.location - Profile location
   * @param data.mood - Profile mood
   * @returns Profile snippet settings entity
   */
  async create(data: IProfileSnippet): Promise<IProfileSnippet> {
    return await super.create({ ...data, id: this.id })
  }

  /**
   * Removes the current profile snippet settings.
   *
   * @async
   */
  async delete(id: IProfileSnippet['id']): Promise<void> {
    id = this.id
    return await super.delete(id)
  }

  /**
   * Returns the current profile snippet settings, or null if not found.
   *
   * @async
   * @returns Profile snippet settings entity  or null
   */
  async findById(): Promise<IProfileSnippet | null> {
    return await super.findById(this.id)
  }

  /**
   * Returns the current profile snippet settings.
   * Throws an error if the settings are not found.
   *
   * @async
   * @returns Profile snippet settings entity
   * @throws {FeathersErrorJSON}
   */
  async get(): Promise<IProfileSnippet> {
    return await super.get(this.id)
  }

  /**
   * Updates the current profile snippet settings.
   *
   * @async
   * @param id - Settings ID. Will be set to "profile-snippet"
   * @param data - New profile snippet settings
   * @param data.age - Profile age
   * @param data.img - Profile image URL
   * @param data.location - Profile location
   * @param data.mood - Profile mood
   * @returns Profile snippet settings entity
   * @throws {FeathersErrorJSON}
   */
  async update(id: string, data: IProfileSnippet): Promise<IProfileSnippet> {
    id = this.id
    return await super.update(id, data)
  }

  /**
   * Creates or updates profile snippet settings.
   *
   * @async
   * @param id - Settings ID. Will be set to "profile-snippet"
   * @param data - New profile snippet settings
   * @param data.age - Profile age
   * @param data.img - Profile image URL
   * @param data.location - Profile location
   * @param data.mood - Profile mood
   * @returns Profile snippet settings entity
   * @throws {FeathersErrorJSON}
   */
  async upsert(id: string, data: IProfileSnippet): Promise<IProfileSnippet> {
    id = this.id
    return await super.upsert(id, data)
  }
}
