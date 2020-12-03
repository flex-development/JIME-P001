import { Entity } from '@flex-development/kustomzcore'
import { IsUrl } from 'class-validator'
import { IPlaylistSettings } from './IPlaylistSettings'

/**
 * @file Subdomain Model - Playlist Settings
 * @module subdomains/cms/models/PlaylistSettings/impl
 */

export class PlaylistSettings extends Entity implements IPlaylistSettings {
  @IsUrl()
  url: IPlaylistSettings['url']
}
