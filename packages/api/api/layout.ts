import type { ShopifyMenu } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelRequest as Req, VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import { API_URL } from '../lib/config'
import { globalMetafields } from '../lib/utils'

/**
 * @file API Endpoint - Get `AppLayout` data
 * @module api/playlist
 */

export default async (req: Req, res: Res): Promise<Res> => {
  try {
    // Fetch global metafields to get profile snippet
    const {
      profile_age: { value: profile_age },
      profile_img: { value: profile_img },
      profile_location: { value: profile_location },
      profile_mood: { value: profile_mood }
    } = await globalMetafields({ fields: 'key,value' })

    // Get main menu data
    const menu = await axios<ShopifyMenu>({ url: `${API_URL}/menus/main-menu` })

    // Get playlist data
    const playlist = await axios({ url: `${API_URL}/playlist` })

    return res.json({
      playlist,
      sidebar: {
        age: JSON.parse(profile_age as string),
        img: profile_img,
        location: profile_location,
        menu: menu.links,
        mood: profile_mood
      }
    })
  } catch (err) {
    const error = err.code ? err : createError(err)

    debug('api/layout')(error)
    return res.status(error.code).json(error)
  }
}
