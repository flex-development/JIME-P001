import { octokit } from '@app/config/github'
import { createError, Logger } from '@app/subdomains/app'
import { Endpoints, RequestInterface } from '@octokit/types'
import admin from 'firebase-admin'
import { isString } from 'lodash'
import { Session } from 'next-auth/client'
import {
  IAuthGitHubService,
  JWTGitHub,
  OAuthProfileGitHub,
  ProviderSessionGitHub
} from '../interfaces/IAuthGitHubService'
import upsertFirebaseUser from '../utils/upsertFirebaseUser'

/**
 * @file Subdomain Services - GitHub Service
 * @module subdomains/cms/services/AuthGitHubService
 */

const { GITHUB_PAT, GITHUB_REPO_FULL_NAME = '' } = process.env

/**
 * Handles all communication with the GitHub API.
 * This service uses Firebase Admin and should be used server-side only.
 *
 * @class AuthGitHubService
 */
export default class AuthGitHubService implements IAuthGitHubService {
  admin: admin.auth.Auth
  octokit: RequestInterface

  /**
   * Creates a new `AuthGitHubService` instance.
   *
   * @param auth - Firebase Admin authentication service
   * @throws {FeathersErrorJSON}
   */
  constructor(auth: IAuthGitHubService['admin']) {
    // Throw internal error if missing environment variables
    if (!isString(GITHUB_PAT) || !GITHUB_PAT.length) {
      const error = createError('Missing GITHUB_PAT')

      Logger.error({ AuthGitHubService: error })
      throw error
    } else if (
      !isString(GITHUB_REPO_FULL_NAME) ||
      !GITHUB_REPO_FULL_NAME.length
    ) {
      const error = createError('Missing GITHUB_REPO_FULL_NAME')

      Logger.error({ AuthGitHubService: error })
      throw error
    }

    this.admin = auth
    this.octokit = octokit
  }

  /**
   * Create a JWT for a successful sign-in with GitHub.
   *
   * @param access_token - GitHub OAuth access token
   * @param profile - GitHub OAuth profile
   * @param profile.avatar_url - GitHub profile picture URL
   * @param profile.id - GitHub user ID
   * @param profile.login - GitHub username
   * @param profile.name - GitHub display name
   */
  async createJWT(
    access_token: string,
    profile: OAuthProfileGitHub
  ): Promise<JWTGitHub> {
    const { avatar_url, id, login, name } = profile

    // Get public AND private profile information
    const { email } = await this.getUser(access_token)

    return {
      access_token,
      avatar_url,
      email,
      id,
      login,
      name,
      provider: 'github'
    }
  }

  /**
   * Creates a new GitHub session object.
   *
   * @see https://next-auth.js.org/configuration/callbacks#session-callback
   *
   * @param session - Base session object
   * @param user - GitHub JWT
   * @returns Session that will be returned to the client
   */
  async createSession(
    session: Session,
    user: JWTGitHub
  ): Promise<ProviderSessionGitHub> {
    const { access_token, provider, ...rest } = user

    return {
      access_token,
      expires: session.expires,
      firebase_token: await this.admin.createCustomToken(`${user.id}`),
      provider,
      user: rest
    }
  }

  /**
   * Returns the profile of the authenticated user.
   *
   * @async
   * @param access_token - OAuth access token
   * @returns Public and private profile information
   */
  async getUser(
    access_token: string
  ): Promise<Endpoints['GET /user']['response']['data']> {
    const request = {
      headers: { authorization: `Authorization: token ${access_token}` },
      method: 'GET',
      url: '/user'
    }

    return (await this.octokit(request)).data
  }

  /**
   * Returns true {@param username} is the username of a collaborator in our
   * repository.
   *
   * @param username - Username of user to check collaborator status
   * @returns True if user is a repository collaborator, false otherwise
   */
  async isCollaborator(username: string): Promise<boolean> {
    // Get repository owner and name
    const { 0: owner, 1: repo } = GITHUB_REPO_FULL_NAME.split('/')

    // Endpoint to check if user is a repository collaborator
    const endpoint = 'GET /repos/{owner}/{repo}/collaborators/{username}'

    // Check collaborator status
    const { status } = await this.octokit(endpoint, { owner, repo, username })

    return status === 204
  }

  /**
   * Determines if the current user is able to sign-in with GitHub. GitHub login
   * is restricted to repository collaborators.
   *
   *
   * @async
   * @param access_token - OAuth access token
   * @param profie - GitHub OAuth Profile
   * @param profile.login - GitHub username
   * @returns True if allowed to sign-in with GitHub
   */
  async signIn(
    access_token: string,
    profile: OAuthProfileGitHub
  ): Promise<boolean | JWTGitHub> {
    const { avatar_url, id, login } = profile

    // Check collaborator status
    const collaborator = await this.isCollaborator(login)

    // Deny sign-in if not collaborator
    if (!collaborator) return collaborator

    // Get public AND private profile information
    const { email } = await this.getUser(access_token)

    // Upsert Firebase user and grant database / storage permissions
    await upsertFirebaseUser(id, login, email, avatar_url)
    await this.admin.setCustomUserClaims(`${id}`, { collaborator })

    // Allow sign-in
    return this.createJWT(access_token, profile)
  }
}
