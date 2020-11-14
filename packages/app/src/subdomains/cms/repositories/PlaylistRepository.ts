import { RTDRepository as Repo } from '@app/subdomains/app/models/RTDRepository'
import { IPlaylist } from '../interfaces'
import { Playlist } from '../models'

/**
 * @file Access `settings/playlist` data
 * @module subdomains/cms/repositories/PlaylistRepository
 *
 * @todo Set id for repository methods
 */

export default class PlaylistRepository extends Repo<IPlaylist> {
  /**
   * Creates a new connection to the `settings` collection using the
   * `Playlist` model.
   *
   * The `id` value for all methods and possible queries will be `playlist`.
   *
   * @param database - Realtime Database service
   */
  constructor(database: Repo<IPlaylist>['database']) {
    super('settings', Playlist, database)
  }
}
