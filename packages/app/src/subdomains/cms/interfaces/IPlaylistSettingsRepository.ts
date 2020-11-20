import { IRTDRepository as IRepo } from '@app/subdomains/app'
import { IPlaylistSettings } from './IPlaylistSettings'

/**
 * @file Subdomain Interfaces - Playlist Settings Repository
 * @module subdomains/cms/interfaces/IPlaylistSettingsRepository
 */

export interface IPlaylistSettingsRepository extends IRepo<IPlaylistSettings> {
  id: 'playlist'

  create(data: PlaylistSettingsData): Promise<IPlaylistSettings>
  findById(): Promise<IPlaylistSettings | null>
  get(): Promise<IPlaylistSettings>
}

/**
 * Data used to create new playlist settings.
 */
export type PlaylistSettingsData = { url: IPlaylistSettings['url'] }
