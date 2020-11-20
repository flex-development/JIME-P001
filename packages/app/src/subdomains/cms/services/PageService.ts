import { createError } from '@app/subdomains/app'
import { ICMSPage } from '../interfaces'
import { IPageService, PageSession } from '../interfaces/IPageService'
import Repo from '../repositories/PageRepository'

/**
 * @file Subdomain Services - Pages Service
 * @module subdomains/cms/services/PageService
 */

export default class PageService extends Repo implements IPageService {
  /**
   * Returns a page in draft mode if the user is signed-in with GitHub.
   *
   * If the user is not signed-in, a `401` error will be thrown. If the page is
   * not in draft mode, the data will be returned anyway.
   *
   * @async
   * @param path - Page of path to get
   * @param session - Current user session or null
   * @throws {FeathersErrorJSON}
   */
  async getPage(
    path: ICMSPage['path'],
    session: PageSession
  ): Promise<ICMSPage> {
    const page = await this.getByPath(path)

    if (page.draft && session?.provider !== 'github') {
      throw createError('Page unavailable', { session }, 401)
    }

    return page
  }
}
