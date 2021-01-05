import { ICMSPage } from '@app/subdomains/cms/models'
import { IPageRepository } from '@app/subdomains/cms/repositories'
import { NotFound } from '@subdomains/app/utils'
import { ProviderSessionGitHub } from '../AuthGitHubService/IAuthGitHubService'

/**
 * @file Subdomain Services - Page Service
 * @module subdomains/cms/interfaces/IPageService
 */

export interface IPageService extends IPageRepository {
  getPage(
    path: ICMSPage['path'],
    session: PageSession
  ): Promise<ICMSPage | NotFound>
}

export type PageSession = ProviderSessionGitHub | null
