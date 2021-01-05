import { ICMSPage } from '@app/subdomains/cms/models'
import { createError } from '@flex-development/kustomzcore'
import { NotFound } from '@subdomains/app'
import { PageRepository as Repo } from '../../repositories'
import { IPageService, PageSession } from './IPageService'

/**
 * @file Subdomain Service - Pages Service
 * @module subdomains/cms/services/PageService/impl
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
   * @param session - CMS user session or null
   * @throws {FeathersErrorJSON}
   */
  async getPage(
    path: ICMSPage['path'],
    session: PageSession
  ): Promise<ICMSPage | NotFound> {
    try {
      const page = await this.getByPath(path)

      if (page.draft && session?.provider !== 'github') {
        throw createError('Page unavailable', { session }, 401)
      }

      return page
    } catch (error) {
      if (error.name === 'NotFound') return { notFound: true }
      throw error
    }
  }
}
