import { createError, Logger, RTDRepository } from '@app/subdomains/app'
import { uuid } from '@flex-development/kustomzdesign'
import { isEmpty } from 'lodash'
import { ICMSMenu } from '../interfaces'
import { CMSMenu } from '../models'

/**
 * @file Access the `menus` collection
 * @module subdomains/cms/repositories/MenuRepository
 */

export default class MenuRepository extends RTDRepository<ICMSMenu> {
  /**
   * Creates a new connection to the `menus` collection.
   *
   * @param database - Realtime Database service
   */
  constructor(database: RTDRepository<ICMSMenu>['database']) {
    super('menus', CMSMenu, database)
  }

  /**
   * Creates a new menu.
   *
   * If the menu is missing a title or an existing menu has the same id as
   * {@param data.id}, a 400 error will be thrown.
   *
   * @async
   * @param data - New menu data
   * @param data.id - Unique menu ID
   * @param data.links - Menu links
   * @param data.title - Title of menu
   * @throws {FeathersErrorJSON}
   */
  async create(data: Partial<ICMSMenu>): Promise<ICMSMenu> {
    const { id = '', title = '' } = data
    let { links = [] } = data

    const exists: ICMSMenu | null = await this.findById(id || '')

    if (exists) {
      const error_message = `Menu with id "${id}" already exists.`
      const error = createError(error_message, data, 400)

      Logger.error({ 'MenuRepository.create': error })
      throw error
    }

    links = links.map(link => ({
      ...link,
      href: isEmpty(link.href) ? '#' : link.href,
      uuid: uuid()
    }))

    return super.create({ id, links, title, uuid: uuid() })
  }
}
