import { CMSMenu, ICMSMenu } from '@app/subdomains/cms/models'
import { createError } from '@flex-development/kustomzcore'
import { uuid } from '@flex-development/kustomzdesign'
import { RTDRepository } from '@subdomains/firebase/models/RTDRepository'
import { isEmpty } from 'lodash'
import { IMenuRepository } from './IMenuRepository'

/**
 * @file Access the `menus` collection
 * @module subdomains/cms/repositories/MenuRepository/impl
 */

export default class MenuRepository
  extends RTDRepository<ICMSMenu>
  implements IMenuRepository {
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

    if (await this.findById(id || '')) {
      const error_message = `Menu with id "${id}" already exists.`
      throw createError(error_message, { data }, 400)
    }

    links = links.map(link => ({
      ...link,
      href: isEmpty(link.href) ? '#' : link.href,
      uuid: (() => uuid())()
    }))

    return super.create({ id, links, title, uuid: uuid() })
  }
}
