import { Endpoints, RequestInterface } from '@octokit/types'
import {
  IAuthService,
  JWT,
  OAuthProfile,
  ProviderAccount,
  ProviderSession
} from '@subdomains/app/interfaces/IAuthService'
import { Session } from 'next-auth/client'

/**
 * @file Subdomain Interface - GitHub Authentication Service
 * @module subdomains/cms/services/AuthGitHubService/interface
 */

export interface IAuthGitHubService extends IAuthService {
  octokit: RequestInterface

  createJWT(
    access_token: string,
    profile: OAuthProfileGitHub
  ): Promise<JWTGitHub>
  createSession(
    session: Session,
    user: JWTGitHub
  ): Promise<ProviderSessionGitHub>
  getUser(
    access_token: string
  ): Promise<Endpoints['GET /user']['response']['data']>
  isCollaborator(username: string): Promise<boolean>
  signIn(
    access_token: string,
    profile: OAuthProfileGitHub
  ): Promise<boolean | JWTGitHub>
}

export interface JWTGitHub extends JWT {
  avatar_url: OAuthProfileGitHub['avatar_url']
  email: OAuthProfileGitHub['email']
  id: OAuthProfileGitHub['id']
  login: OAuthProfileGitHub['login']
  name: OAuthProfileGitHub['name']
  provider: 'github'
}

export interface OAuthProfileGitHub extends OAuthProfile {
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

export interface ProviderAccountGitHub extends ProviderAccount {
  id: number
  provider: 'github'
}

export interface ProviderSessionGitHub extends ProviderSession {
  provider: 'github'
  user: Omit<JWTGitHub, 'access_token' | 'provider'>
}
