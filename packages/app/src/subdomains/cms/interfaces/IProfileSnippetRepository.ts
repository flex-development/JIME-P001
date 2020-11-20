import { IRTDRepository as IRepo } from '@app/subdomains/app'
import { IProfileSnippet } from './IProfileSnippet'

/**
 * @file Subdomain Interfaces - Profile Snippet Repository
 * @module subdomains/cms/interfaces/IProfileSnippetRepository
 */

export interface IProfileSnippetRepository extends IRepo<IProfileSnippet> {
  id: 'profile-snippet'

  create(data: IProfileSnippet): Promise<IProfileSnippet>
  findById(): Promise<IProfileSnippet | null>
  get(): Promise<IProfileSnippet>
}
