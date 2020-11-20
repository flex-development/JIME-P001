import { IRTDRepository } from '@app/subdomains/app'
import { ICMSMenu } from './ICMSMenu'

/**
 * @file Subdomain Interfaces - Menu Repository
 * @module subdomains/cms/interfaces/IMenuRepository
 */

export interface IMenuRepository extends IRTDRepository<ICMSMenu> {
  create(data: Partial<ICMSMenu>): Promise<ICMSMenu>
}
