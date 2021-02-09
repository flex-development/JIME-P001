import { axios } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { API_URL } from '../lib/config'
import {
  handleAPIError,
  initPathLogger,
  trackAPIEvent,
  trackAPIRequest
} from '../lib/middleware'
import MenuService from '../lib/services/MenuService'
import type { APIRequest as Req } from '../lib/types'
import { metafieldsGlobal } from '../lib/utils'

/**
 * @file API Endpoint - Get `AppLayout` data
 * @module api/layout
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

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
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await trackAPIEvent(req, '/layout')
  return res.end()
}
