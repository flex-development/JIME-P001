import { createError } from '@flex-development/kustomzcore'
import { RTDRepository as Repo } from '@subdomains/app/models/RTDRepository'
import { IPlaylistSettings, PlaylistSettings } from '@subdomains/cms/models'
import {
  IPlaylistSettingsRepository,
  PlaylistSettingsData
} from './IPlaylistSettingsRepository'

/**
 * @file Access `settings/playlist` data
 * @module subdomains/cms/repositories/PlaylistSettingsRepository/impl
 */

export default class PlaylistSettingsRepository
  extends Repo<IPlaylistSettings>
  implements IPlaylistSettingsRepository {
  id: 'playlist'

  /**
   * Creates a new connection to the `settings` collection using the
   * `PlaylistSettings` model.
   *
   * The `id` value for all methods will be set to `playlist`.
   *
   * @param database - Realtime Database service
   */
  constructor(database: Repo<IPlaylistSettings>['database']) {
    super('settings', PlaylistSettings, database)
    this.id = 'playlist'
  }

  /**
   * Creates new playlist settings.
   * If present, the value of {@param data.id} will be set to `playlist`.
   *
   * @param data - New playlist settings
   * @param data.url - URL of Apple Music playlist
   * @returns Playlist settings entity
   * @throws {FeathersErrorJSON}
   */
  async create(data: PlaylistSettingsData): Promise<IPlaylistSettings> {
    if (!data.url.includes('music.apple.com/us/playlist')) {
      const message = 'Only Apple Music playlists can be saved.'
      throw createError(message, { url: data.url || null }, 400)
    }

    return await super.create({ id: this.id, url: data.url })
  }

  /**
   * Removes the current playlist settings.
   *
   * @async
   */
  async delete(id: IPlaylistSettings['id']): Promise<void> {
    id = this.id
    return await super.delete(id)
  }

  /**
   * Returns the current playlist settings, or null if not found.
   *
   * @async
   * @returns Playlist settings entity  or null
   */
  async findById(): Promise<IPlaylistSettings | null> {
    return await super.findById(this.id)
  }

  /**
   * Returns the current playlist settings.
   * Throws an error if the settings are not found.
   *
   * @async
   * @returns Playlist settings entity
   * @throws {FeathersErrorJSON}
   */
  async get(): Promise<IPlaylistSettings> {
    return await super.get(this.id)
  }

  /**
   * Updates the current playlist settings.
   *
   * @async
   * @param id - Settings ID. Will be set to "playlist"
   * @param data - New playlist settings
   * @param data.url - URL of Apple Music playlist
   * @returns Playlist settings entity
   * @throws {FeathersErrorJSON}
   */
  async update(
    id: string,
    data: PlaylistSettingsData
  ): Promise<IPlaylistSettings> {
    if (!data.url.includes('music.apple.com/us/playlist')) {
      const message = 'Only Apple Music playlists can be saved.'
      throw createError(message, { url: data.url || null }, 400)
    }

    id = this.id
    return await super.update(id, data)
  }

  /**
   * Creates or updates playlist settings.
   *
   * @async
   * @param id - Settings ID. Will be set to "playlist"
   * @param data - New playlist settings
   * @param data.url - URL of Apple Music playlist
   * @returns Playlist settings entity
   * @throws {FeathersErrorJSON}
   */
  async upsert(
    id: string,
    data: PlaylistSettingsData
  ): Promise<IPlaylistSettings> {
    id = this.id
    return await super.upsert(id, data)
  }
}
