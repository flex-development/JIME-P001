import { AnyObject } from '@flex-development/json'
import { createError } from '@flex-development/kustomzcore'
import { uuid } from '@flex-development/kustomzdesign'
import { RTDRepository } from '@subdomains/app/models/RTDRepository'
import { CMSPage, ICMSPage } from '@subdomains/cms/models'
import { isEmpty } from 'lodash'
import slugify from 'slugify'
import { IPageRepository } from './IPageRepository'

/**
 * @file Access the `pages` collection
 * @module subdomains/cms/repositories/PageRepository/impl
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
   * The page path will be generated using {@param data.title} if
   * {@param data.path} is null, undefined, or an empty string.
   *
   * A 400 error will be thrown if:
   *
   * - The page is missing a title
   * - The resulting page path is the same as an existing page path
   * - The page description is greater than 150 characters
   *
   * @async
   * @param data - New page data
   * @param data.component - `displayName` of component that renders page
   * @param data.content - Object containing template data or MD(X) string
   * @param data.description - Page description in less than 150 characters
   * @param data.draft - True if page should be marked as a draft
   * @param data.keywords - Comma-delimitted list of SEO keywords
   * @param data.path - URL path page can be accessed from
   * @param data.title - Title of page
   * @throws {FeathersErrorJSON}
   */
  async create(data: AnyObject): Promise<ICMSPage> {
    const {
      component,
      content = {},
      description = '',
      draft,
      keywords = '',
      path,
      title = ''
    } = data

    if (isEmpty(path)) data.path = `/${slugify(title.trim()).toLowerCase()}`

    const exists: ICMSPage | null = await this.findByPath(data.path)

    if (exists) {
      const error_data = { ...data, errors: { path: data.path } }
      const error_message = `Page with path "${data.path}" already exists.`
      throw createError(error_message, error_data, 400)
    }

    if (description.length > 150) {
      const error_data = { ...data, errors: { length: description.length } }
      const error_message = `Page description must be less than 150 characters.`

      throw createError(error_message, error_data, 400)
    }

    return super.create({
      component: isEmpty(component) ? 'PageTemplate' : component,
      content: content || {},
      description,
      draft,
      keywords,
      path: data.path,
      uuid: uuid()
    })
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
