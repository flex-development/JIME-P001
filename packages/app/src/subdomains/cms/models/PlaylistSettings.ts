import { Entity } from '@app/subdomains/app/models/Entity'
import { IsUrl } from 'class-validator'
import { IPlaylistSettings } from '../interfaces'

/**
 * @file Subdomain Models - Playlist Settings
 * @module subdomains/cms/models/Playlist
 */

export class PlaylistSettings extends Entity implements IPlaylistSettings {
  @IsUrl()
  url: string
}
