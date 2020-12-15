import { AnyObject } from '@flex-development/json'
import { ICMSPage } from '@subdomains/cms/models'
import { IRTDRepository } from '@subdomains/firebase'

/**
 * @file Subdomain Interfaces - Page Repository
 * @module subdomains/cms/repositories/PageRepository/interface
 */

export interface IPageRepository extends IRTDRepository<ICMSPage> {
  create(data: AnyObject): Promise<ICMSPage>
  findByPath(path: ICMSPage['path']): Promise<ICMSPage | null>
  getByPath(path: ICMSPage['path']): Promise<ICMSPage>
  update(id: ICMSPage['id'], data: AnyObject): Promise<ICMSPage>
}
