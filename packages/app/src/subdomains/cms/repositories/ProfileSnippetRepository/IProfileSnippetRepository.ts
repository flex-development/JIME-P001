import { IRTDRepository as IRepo } from '@subdomains/app'
import { IProfileSnippet } from '@subdomains/cms/models'

/**
 * @file Subdomain Interfaces - Profile Snippet Repository
 * @module subdomains/cms/repositories/ProfileSnippetRepository/interface
 */

export interface IProfileSnippetRepository extends IRepo<IProfileSnippet> {
  id: 'profile-snippet'

  create(data: IProfileSnippet): Promise<IProfileSnippet>
  findById(): Promise<IProfileSnippet | null>
  get(): Promise<IProfileSnippet>
}
