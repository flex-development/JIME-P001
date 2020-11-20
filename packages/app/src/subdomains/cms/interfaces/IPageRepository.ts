import { IRTDRepository } from '@app/subdomains/app'
import { AnyObject } from '@flex-development/types'
import { ICMSPage } from './ICMSPage'

/**
 * @file Subdomain Interfaces - Page Repository
 * @module subdomains/cms/interfaces/IPageRepository
 */

export interface IPageRepository extends IRTDRepository<ICMSPage> {
  create(data: AnyObject): Promise<ICMSPage>
  findByPath(path: ICMSPage['path']): Promise<ICMSPage | null>
  getByPath(path: ICMSPage['path']): Promise<ICMSPage>
  update(id: ICMSPage['id'], data: AnyObject): Promise<ICMSPage>
}
