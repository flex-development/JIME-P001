import { Session } from 'next-auth/client'
import { ICMSPage } from './ICMSPage'
import { GitHubSession } from './IGitHubService'
import { IPageRepository } from './IPageRepository'

/**
 * @file Subdomain Services - Page Service
 * @module subdomains/cms/interfaces/IPageService
 */

export interface IPageService extends IPageRepository {
  getPage(path: ICMSPage['path'], session: PageSession): Promise<ICMSPage>
}

export type PageSession = GitHubSession | Session | null
