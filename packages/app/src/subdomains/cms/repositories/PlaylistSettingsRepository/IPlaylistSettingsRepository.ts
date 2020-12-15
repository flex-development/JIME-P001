import { IPlaylistSettings } from '@subdomains/cms/models'
import { IRTDRepository as IRepo } from '@subdomains/firebase'

/**
 * @file Subdomain Interfaces - Playlist Settings Repository
 * @module subdomains/cms/repositories/PlaylistSettingsRepository/interface
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
