import { ServerSide404 } from '@subdomains/app/utils'
import { ICMSPage } from '@subdomains/cms/models'
import { IPageRepository } from '@subdomains/cms/repositories'
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
