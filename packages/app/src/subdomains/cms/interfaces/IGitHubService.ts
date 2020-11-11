import { Session } from 'next-auth/client'
import { SessionBase } from 'next-auth/_utils'
import { IFirebaseAdminAuthService } from './IFirebaseAdminAuthService'

/**
 * @file Subdomain Interfaces - GitHub Service
 * @module subdomains/cms/interfaces/IGitHubService
 *
 * @todo Update documentation
 */

export interface IGitHubService {
  admin: IFirebaseAdminAuthService

  createJWT(access_token: string, profile: GitHubOAuthProfile): GitHubJWT
  createSession(session: Session, profile: GitHubJWT): Promise<GitHubSession>
  isCollaborator(username: string): Promise<boolean>
  signIn(profile: GitHubOAuthProfile): Promise<boolean>
}

export type GitHubJWT = {
  access_token: GitHubProviderAccount['accessToken']
  avatar_url: GitHubOAuthProfile['avatar_url']
  id: GitHubOAuthProfile['id']
  login: GitHubOAuthProfile['login']
  name: GitHubOAuthProfile['name']
  provider: 'github'
}

export type GitHubOAuthProfile = {
  avatar_url: string
  bio: string
  blog: string
  collaborators: number
  company: string
  created_at: string
  disk_usage: number
  email: string | null
  events_url: string
  followers: number
  followers_url: string
  following: number
  following_url: string
  gists_url: string
  gravatar_id: string
  hireable: true
  html_url: string
  id: number
  location: string | null
  login: string
  name: string
  node_id: string
  organizations_url: string
  owned_private_repos: number
  plan: {
    collaborators: number
    name: string
    private_repos: number
    space: number
  }
  private_gists: number
  public_gists: number
  public_repos: number
  received_events_url: string
  repos_url: string
  site_admin: false
  starred_url: string
  subscriptions_url: string
  total_private_repos: number
  twitter_username: string
  two_factor_authentication: false
  type: string
  updated_at: string
  url: string
}

export type GitHubProviderAccount = {
  accessToken: string
  accessTokenExpires: number | null
  id: number | string
  provider: 'github' | 'linkedin' | string
  refreshToken?: string
}

export type GitHubSession = {
  access_token: GitHubJWT['access_token']
  expires: SessionBase['expires']
  firebase_token: string
  provider: 'github'
  user: Omit<GitHubJWT, 'access_token' | 'provider'>
}
