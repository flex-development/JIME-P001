import Providers from 'next-auth/providers'

/**
 * @file NextAuth Providers Configuration
 * @module subdomains/config/providers
 */

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

type ProviderOptions = {
  clientId: string
  clientSecret: string
}

export const GITHUB_PROVIDER = Providers.GitHub({
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  profileUrl: 'https://api.github.com/user'
} as ProviderOptions)

export const AUTH_PROVIDERS = [GITHUB_PROVIDER]
