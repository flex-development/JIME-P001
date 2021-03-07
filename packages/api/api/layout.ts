import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { API_URL } from '../lib/config'
import routeWrapper from '../lib/middleware/routeWrapper'
import MenuService from '../lib/services/MenuService'
import Metafields from '../lib/services/MetafieldService'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file API Endpoint - Get Storefront Layout Data
 * @module api/layout
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req: Req, res: Res) => {
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
    const menu = await new MenuService().get('main-menu', 'links')

    // Get playlist data
    const playlist = await axios({ url: `${API_URL}/playlist` })

    res.json({
      hero: { subtitle: hero_subtitle, title: hero_title },
      playlist,
      sidebar: {
        age: JSON.parse(profile_age as string),
        img: profile_img,
        location: profile_location,
        menu: menu.links,
        mood: profile_mood
      }
    })
  })
}
