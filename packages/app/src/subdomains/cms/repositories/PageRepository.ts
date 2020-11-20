import { RTDRepository } from '@app/subdomains/app/models/RTDRepository'
import createError from '@app/subdomains/app/utils/createError'
import { PageTemplateProps, uuid } from '@flex-development/kustomzdesign'
import { AnyObject } from '@flex-development/types'
import { isEmpty } from 'lodash'
import slugify from 'slugify'
import { ICMSPage } from '../interfaces'
import { IPageRepository } from '../interfaces/IPageRepository'
import { CMSPage } from '../models'

/**
 * @file Access the `pages` collection
 * @module subdomains/cms/repositories/PageRepository
 */

export default class PageRepository
  extends RTDRepository<ICMSPage>
  implements IPageRepository {
  /**
   * Creates a new connection to the `pages` collection.
   *
   * @param database - Realtime Database service
   */
  constructor(database: RTDRepository<ICMSPage>['database']) {
    super('pages', CMSPage, database)
  }

  /**
   * Creates a new page.
   *
   * If the page is missing a title, or if an existing page has the same path as
   * {@param data.path}, a 400 error will be thrown.
   *
   * @async
   * @param data - New page data
   * @param data.component - `displayName` of component that renders page
   * @param data.content - Object containing template data or MD(X) string
   * @param data.draft - True if page should be marked as a draft
   * @param data.path - URL path page can be accessed from. If falsy, the path
   * be generated from the page title.
   * @param data.title - Title of page
   * @throws {FeathersErrorJSON}
   */
  async create(data: AnyObject): Promise<ICMSPage> {
    const { component, content, metadata = {}, path, title = '' } = data

    if (isEmpty(path)) data.path = `/${slugify(title).toLowerCase()}`

    const exists: ICMSPage | null = await this.findByPath(data.path)

    if (exists) {
      const error_message = `Page with path "${data.path}" already exists.`
      throw createError(error_message, data, 400)
    }

    if (isEmpty(component)) data.component = 'PageTemplate'

    if (isEmpty(content)) data.content = {} as PageTemplateProps

    return super.create({ ...data, metadata, uuid: uuid() })
  }

  /**
   * Find a page by `path`.
   *
   * @param path - Slug of page to search for
   * @returns Page resource or null if not found
   */
  async findByPath(path: ICMSPage['path']): Promise<ICMSPage | null> {
    const pages = await this.find({ path: { $eq: path } })
    return (pages[0] as ICMSPage) || null
  }

  /**
   * Returns the page with the path {@param path} or throws an error.
   *
   * @param path - Slug of page to search for
   * @returns Page resource
   * @throws {FeathersErrorJSON}
   */
  async getByPath(path: ICMSPage['path']): Promise<ICMSPage> {
    const page = await this.findByPath(path)

    if (!page) {
      const message = `Page with path "${path}" not found.`
      throw createError(message, { path: path || null }, 404)
    }

    return page
  }

  /**
   * Updates a page. An error will be thrown if {@param data.path} matches an
   * existing path in the database.
   *
   * @param id - ID of page to update
   * @param data - Data to update page
   */
  async update(id: ICMSPage['id'], data: AnyObject): Promise<ICMSPage> {
    const { path } = data

    if (path) {
      const path_match: ICMSPage | null = await this.findByPath(path)

      if (path_match && path_match.id !== id) {
        const error_message = `Page with path "${path}" already exists.`
        throw createError(error_message, data, 400)
      }
    }

    return await super.update(id, data)
  }
}
