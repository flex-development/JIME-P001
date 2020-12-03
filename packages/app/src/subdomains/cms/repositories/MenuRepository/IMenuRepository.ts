import { IRTDRepository } from '@app/subdomains/app'
import { ICMSMenu } from '@app/subdomains/cms/models'

/**
 * @file Subdomain Interface - Menu Repository
 * @module subdomains/cms/repositories/MenuRepository/interface
 */

export interface IMenuRepository extends IRTDRepository<ICMSMenu> {
  create(data: Partial<ICMSMenu>): Promise<ICMSMenu>
}
