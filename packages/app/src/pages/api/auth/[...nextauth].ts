import {
  GitHubJWT,
  GitHubOAuthProfile,
  GitHubProviderAccount,
  GitHubSession
} from '@app/subdomains/cms/interfaces'
import GitHubService from '@app/subdomains/cms/services/GitHubService'
import { GenericToken } from '@app/subdomains/cms/utils'
import { AUTH_PROVIDERS } from '@app/subdomains/config/providers'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import { Session } from 'next-auth/client'
import { GenericObject } from 'next-auth/_utils'

/**
 * @file Next.js Auth Handler
 * @module pages/api/auth/nextauth
 * @see https://next-auth.js.org/configuration/options
 */

const { GITHUB_PAT, NODE_ENV = 'development', SITE_URL } = process.env

process.env.NEXTAUTH_URL = SITE_URL

const GitHub = new GitHubService()

const options = {
  // Control what happens when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    /**
     * Persists the user's access token and OAuth profile data in a JSON Web
     * Token. The token can be accessed in the `session` callback.
     *
     * @param orignal_token - Decrypted JSON Web Token
     * @param user - User object (only available on sign in)
     * @param account - Provider account (only available on sign in)
     * @param profile - OAuth profile data (only available on sign in)
     * @param isNewUser - True if new user (only available on sign in)
     * @returns JSON Web Token that will be saved
     */
    jwt: async (
      orignal_token: GenericToken,
      user?: GenericObject,
      account?: GitHubProviderAccount,
      profile?: GitHubOAuthProfile
    ): Promise<GitHubJWT | GenericToken> => {
      if (!user) return orignal_token

      const { accessToken, provider } = account as GitHubProviderAccount

      let token = {} as GitHubJWT

      if (provider === 'github') {
        profile = profile as GitHubOAuthProfile
        token = GitHub.createJWT(accessToken, profile)
      }

      return Promise.resolve(token)
    },

    /**
     * Creates a new GitHub or LinkedIn session object.
     *
     * @param session - Session object
     * @param user - GitHub or LinkedIn JWT
     * @returns Session that will be returned to the client
     */
    session: async (
      session: Session,
      user: GitHubJWT
    ): Promise<GitHubSession> => GitHub.createSession(session, user),

    /**
     * Determines if a user is able to sign-in.
     *
     * GitHub login is restricted to repository collaborators.
     *
     * @param user - User object
     * @param account - GitHub provider account
     * @param profile - GitHub OAuth profile
     */
    signIn: async (
      user?: GenericObject,
      account?: GitHubProviderAccount,
      profile?: GitHubOAuthProfile
    ): Promise<boolean | GitHubJWT> => {
      let sign_in = false

      if (account?.provider === 'github') {
        profile = profile as GitHubOAuthProfile
        sign_in = await GitHub.signIn(profile)
      }

      return sign_in
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: NODE_ENV.toLowerCase() !== 'production',

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // JSON Web Tokens can be used for session tokens if enabled.
  jwt: {
    secret: GITHUB_PAT
  },

  // Configure authentication providers
  providers: AUTH_PROVIDERS,

  // Used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: GITHUB_PAT
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  return NextAuth(req, res, (options as unknown) as InitOptions)
}
