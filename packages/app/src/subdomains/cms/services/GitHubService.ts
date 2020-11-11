import { createError, Logger } from '@app/subdomains/app'
import { octokit } from '@app/subdomains/config'
import { isString } from 'lodash'
import { Session } from 'next-auth/client'
import { IFirebaseAdminAuthService } from '../interfaces'
import {
  GitHubJWT,
  GitHubOAuthProfile,
  GitHubSession,
  IGitHubService
} from '../interfaces/IGitHubService'
import FirebaseAdminAuthService from './FirebaseAdminAuthService'

/**
 * @file Subdomain Services - GitHub Service
 * @module subdomains/cms/services/GitHubService
 */

const { GITHUB_REPO_FULL_NAME = '' } = process.env

/**
 * Handles all communication with the GitHub API.
 * This service uses Firebase Admin and should be used server-side only.
 *
 * @class GitHubService
 */
export default class GitHubService implements IGitHubService {
  admin: IFirebaseAdminAuthService

  /**
   * Creates a new `GitHubService` instance.
   *
   * @param auth - Firebase Admin service to use instead of default
   */
  constructor(auth?: IFirebaseAdminAuthService['auth']) {
    // Throw internal error if missing environment variable
    if (!isString(GITHUB_REPO_FULL_NAME) || !GITHUB_REPO_FULL_NAME.length) {
      const error = createError('Missing GITHUB_REPO_FULL_NAME')

      Logger.error({ GitHubService: error })
      throw error
    }

    this.admin = new FirebaseAdminAuthService(auth)
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
  createJWT(access_token: string, profile: GitHubOAuthProfile): GitHubJWT {
    const { avatar_url, id, login, name } = profile

    return {
      access_token,
      avatar_url,
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
    profile: GitHubJWT
  ): Promise<GitHubSession> {
    const { access_token, provider, ...rest } = profile

    return {
      access_token,
      expires: session.expires,
      firebase_token: await this.admin.auth.createCustomToken(`${profile.id}`),
      provider,
      user: rest
    }
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
    const { status } = await octokit(endpoint, { owner, repo, username })

    return status === 204
  }

  /**
   * Determines if the current user is able to sign-in with GitHub. GitHub login
   * is restricted to repository collaborators.
   *
   * @async
   * @param profie - GitHub OAuth Profile
   * @param profile.login - GitHub username
   * @returns True if allowed to sign-in with GitHub
   */
  async signIn(profile: GitHubOAuthProfile): Promise<boolean> {
    const { avatar_url, id, login } = profile

    // Check collaborator status
    const collaborator = this.isCollaborator(login)

    // Deny sign-in if not collaborator
    if (!collaborator) return collaborator

    // If user already exists, existing data will be returned (no error)
    await this.admin.createUser(id, login, undefined, avatar_url)
    await this.admin.auth.setCustomUserClaims(`${id}`, { provider: 'github' })

    // Allow sign-in
    return collaborator
  }
}
