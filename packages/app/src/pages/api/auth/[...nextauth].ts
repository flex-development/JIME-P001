import { AUTH_PROVIDERS } from '@app/config/providers'
import { GenericToken } from '@app/subdomains/cms'
import {
  AuthGitHubService,
  JWTGitHub,
  OAuthProfileGitHub,
  ProviderAccountGitHub,
  ProviderSessionGitHub
} from '@app/subdomains/cms/services/AuthGitHubService'
import { auth } from '@app/subdomains/firebase/config/admin'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import { Session as SessionClientSide } from 'next-auth/client'
import { GenericObject } from 'next-auth/_utils'

/**
 * @file Next.js Auth Handler
 * @module pages/api/auth/nextauth
 * @see https://next-auth.js.org/configuration/options
 */

process.env.NEXTAUTH_URL = process.env.SITE_URL

const GitHubAuth = new AuthGitHubService(auth)

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
     * @return JSON Web Token that will be saved
     */
    jwt: async (
      orignal_token: GenericToken,
      user?: GenericObject,
      account?: ProviderAccountGitHub,
      profile?: OAuthProfileGitHub
    ): Promise<GenericToken | JWTGitHub> => {
      if (!user) return orignal_token

      const { accessToken, provider } = account as ProviderAccountGitHub

      let token = {} as JWTGitHub | JWTGitHub

      if (provider === 'github') {
        profile = profile as OAuthProfileGitHub
        token = await GitHubAuth.createJWT(accessToken, profile)
      }

      return Promise.resolve(token)
    },

    /**
     * Creates a new default or GitHub session object.
     *
     * @param session - Session object
     * @param user - GitHub JWT
     * @return Session that will be returned to the client
     */
    session: async (
      session: SessionClientSide,
      user: JWTGitHub
    ): Promise<ProviderSessionGitHub | SessionClientSide> => {
      const { provider } = user

      if (provider === 'github') {
        user = user as JWTGitHub
        return GitHubAuth.createSession(session, user)
      }

      return session
    },

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
      account?: ProviderAccountGitHub,
      profile?: OAuthProfileGitHub
    ): Promise<boolean | JWTGitHub> => {
      let sign_in: boolean | JWTGitHub = false

      if (account?.provider === 'github') {
        profile = profile as OAuthProfileGitHub
        sign_in = await GitHubAuth.signIn(account.accessToken, profile)
      }

      return sign_in
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV?.toLowerCase() !== 'production',

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // JSON Web Tokens can be used for session tokens if enabled.
  jwt: {
    secret: process.env.GITHUB_PAT
  },

  // Configure authentication providers
  providers: AUTH_PROVIDERS,

  // Used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.GITHUB_PAT
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  return NextAuth(req, res, (options as unknown) as InitOptions)
}
