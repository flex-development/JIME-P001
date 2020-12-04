import { database } from '@app/config/firebase'
import { AnyObject } from '@flex-development/json'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'
import { Plugin, TinaCMSConfig } from 'tinacms'
import {
  MenuRepository,
  PageRepository,
  PlaylistSettingsRepository,
  ProfileSnippetRepository
} from '../repositories'

/**
 * @file TinaCMS Configurtion
 * @module subdomains/cms/config/config
 */

export const MenusAPI = new MenuRepository(database)
export const PagesAPI = new PageRepository(database)
export const PlaylistAPI = new PlaylistSettingsRepository(database)
export const ProfileSnippetAPI = new ProfileSnippetRepository(database)

/**
 * Object containing APIs to be registered to the CMS. These APIs allow the CMS
 * to interact with our database and storage repositories.
 *
 * @see https://tinacms.org/docs/apis/
 */
export const CMS_APIS: Record<string, AnyObject> = Object.freeze({
  menus: MenusAPI,
  pages: PagesAPI,
  playlists: PlaylistAPI,
  snippets: ProfileSnippetAPI
})

/**
 * Array of plugins to be added to the CMS object.
 *
 * @see https://tinacms.org/docs/plugins/
 */
export const CMS_PLUGINS: Plugin[] = [MarkdownFieldPlugin]

/**
 * Base TinaCMS configuration object.
 */
export const CMS_BASE_CONFIG: TinaCMSConfig = Object.freeze({
  apis: CMS_APIS,
  plugins: CMS_PLUGINS,
  sidebar: false,
  toolbar: true
})
