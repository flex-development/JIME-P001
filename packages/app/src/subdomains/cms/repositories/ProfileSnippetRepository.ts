import { RTDRepository as Repo } from '@app/subdomains/app/models/RTDRepository'
import { IProfileSnippet } from '../interfaces'
import { ProfileSnippet } from '../models'

/**
 * @file Access the `settings` collection
 * @module subdomains/cms/repositories/ProfileSnippetRepository
 *
 * @todo Set id for repository methods
 */

export default class ProfileSnippetRepository extends Repo<IProfileSnippet> {
  /**
   * Creates a new connection to the `settings` collection using the
   * `ProfileSnippet` model.
   *
   * The `id` value for all methods and possible queries will be
   * `profile-snippet`.
   *
   * @param database - Realtime Database service
   */
  constructor(database: Repo<IProfileSnippet>['database']) {
    super('settings', ProfileSnippet, database)
  }
}
