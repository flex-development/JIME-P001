import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { API_URL } from '../lib/config'
import { initPathLogger } from '../lib/middleware'
import MenuService from '../lib/services/MenuService'
import type { APIRequest as Req } from '../lib/types'
import { formatError, metafieldsGlobal } from '../lib/utils'

/**
 * @file API Endpoint - Get `AppLayout` data
 * @module api/layout
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  try {
    // Fetch global metafields to get profile snippet
    const {
      hero_subtitle: { value: hero_subtitle },
      hero_title: { value: hero_title },
      profile_age: { value: profile_age },
      profile_img: { value: profile_img },
      profile_location: { value: profile_location },
      profile_mood: { value: profile_mood }
    } = await metafieldsGlobal({ fields: 'key,value' })

    // Get main menu data
    const menu = await MenuService.get('main-menu', 'links')

    // Get playlist data
    const playlist = await axios({ url: `${API_URL}/playlist` })

    return res.json({
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
  } catch (err) {
    const error = formatError(err)

    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
