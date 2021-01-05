import { IProfileSnippet } from '@app/subdomains/cms/models'
import { IRTDRepository as IRepo } from '@subdomains/firebase'

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
