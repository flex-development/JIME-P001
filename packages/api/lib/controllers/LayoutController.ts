import type { VercelResponse as Res } from '@vercel/node'
import Menus from '../services/MenuService'
import Metafields from '../services/MetafieldService'
import Playlists from '../services/PlaylistService'
import SEO from '../services/SEOService'
import type { APIRequest as Req } from '../types'

/**
 * @file Implementation - LayoutController
 * @module services/LayoutController
 */

/**
 * Handles all API requests to the `/layout/*` endpoints.
 *
 * @class
 */
class LayoutController {
  /**
   * Fetches the storefront layout data.
   *
   * @async
   * @param {Req} req - API request object
   * @param {Res} res - Server response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  static async getLayoutData(req: Req, res: Res): Promise<void> {
    // Fetch global metafields to get profile snippet
    const {
      hero_subtitle: { value: hero_subtitle },
      hero_title: { value: hero_title },
      profile_age: { value: profile_age },
      profile_img: { value: profile_img },
      profile_location: { value: profile_location },
      profile_mood: { value: profile_mood }
    } = await Metafields.globals({ fields: 'key,value' })

    // Get main menu data
    const menu = await new Menus().get('main-menu', 'links')

    // Get playlist data
    const pf = 'attributes.name,attributes.url,id,relationships.tracks.data'
    const playlist = await Playlists.storePlaylistData(pf)
    const { attributes, id, relationships } = playlist

    res.json({
      hero: { subtitle: hero_subtitle, title: hero_title },
      playlist: {
        attributes,
        id,
        tracks: relationships?.tracks?.data.map(track => track.attributes)
      },
      seo: await SEO.global(),
      sidebar: {
        age: JSON.parse(profile_age as string),
        img: profile_img,
        location: profile_location,
        menu: menu.links,
        mood: profile_mood
      }
    })
  }
}

export default LayoutController
