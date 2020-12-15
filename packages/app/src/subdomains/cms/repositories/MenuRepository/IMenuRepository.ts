import { ICMSMenu } from '@subdomains/cms/models'
import { IRTDRepository } from '@subdomains/firebase'

/**
 * @file Subdomain Interface - Menu Repository
 * @module subdomains/cms/repositories/MenuRepository/interface
 */

export interface IMenuRepository extends IRTDRepository<ICMSMenu> {
  create(data: Partial<ICMSMenu>): Promise<ICMSMenu>
}
