import { ServerSide404 } from '@app/subdomains/app/utils'
import { ICMSPage } from '@app/subdomains/cms/models'
import { IPageRepository } from '@app/subdomains/cms/repositories'
import { ProviderSessionGitHub } from '../AuthGitHubService/IAuthGitHubService'

/**
 * @file Subdomain Services - Page Service
 * @module subdomains/cms/interfaces/IPageService
 */

export interface IPageService extends IPageRepository {
  getPage(
    path: ICMSPage['path'],
    session: PageSession
  ): Promise<ICMSPage | ServerSide404>
}

export type PageSession = ProviderSessionGitHub | null
