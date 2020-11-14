import { Entity } from '@app/subdomains/app/models/Entity'
import { IsUrl } from 'class-validator'
import { IPlaylist } from '../interfaces'

/**
 * @file Subdomain Models - Playlist Settings
 * @module subdomains/cms/models/Playlist
 */

export class Playlist extends Entity implements IPlaylist {
  @IsUrl()
  url: string
}
