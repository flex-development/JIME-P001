import { NotFound } from '@subdomains/app/utils'
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
  ): Promise<ICMSPage | NotFound>
}

export type PageSession = ProviderSessionGitHub | null
