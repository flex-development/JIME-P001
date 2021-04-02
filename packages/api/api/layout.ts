import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../lib/middleware/routeWrapper'
import SEO from '../lib/mixins/SEO'
import ShopifyAPI from '../lib/mixins/ShopifyAPI'
import MenuService from '../lib/services/MenuService'
import PlaylistService from '../lib/services/PlaylistService'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file API Endpoint - Get Storefront Layout Data
 * @module api/layout
 */

/**
 * Returns the storefront layout data.
 *
 * @async
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: Req, res: Res): Promise<void> => {
  // Fetch global metafields to get profile snippet
  const {
    hero_subtitle: { value: hero_subtitle },
    hero_title: { value: hero_title },
    profile_age: { value: profile_age },
    profile_img: { value: profile_img },
    profile_location: { value: profile_location },
    profile_mood: { value: profile_mood }
  } = await ShopifyAPI.metafieldGlobals({ fields: 'key,value' })

  // Get main menu data
  const menu = await new MenuService().get('main-menu', 'links')

  // Get playlist data
  const pf = 'attributes.name,attributes.url,id,relationships.tracks.data'
  const playlist = await PlaylistService.storePlaylist(pf)
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

  return
}

/**
 * Route handler.
 *
 * @async
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: Req, res: Res): Promise<void> => {
  return routeWrapper<Req, Res>(req, res, next)
}
