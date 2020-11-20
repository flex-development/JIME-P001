import { AC, IAppProps, ShopLayout } from '@app/subdomains/app'
import '@app/subdomains/app/styles.css'
import {
  CMS_BASE_CONFIG,
  ICMSPage,
  useSignInWithCustomToken
} from '@app/subdomains/cms'
import '@app/subdomains/cms/styles.css'
import '@flex-development/kustomzdesign/theme/theme.scss'
import { Provider as NextAuthProvider, Session } from 'next-auth/client'
import React, { useMemo } from 'react'
import { TinaCMS, TinaProvider } from 'tinacms'

/**
 * @file Next.js Custom App
 * @module pages/app
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

/**
 * Custom app initialization component.
 *
 * Registers the NextAuth and TinaCMS providers. Editors (repository
 * collaborators) can sign in with GitHub to edit marketing site content.
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Page component props from data fetching methods
 * @param param0.pageProps.page - Data for current page
 * @param param0.pageProps.session - Current user session or null
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  const { page, session } = pageProps

  // Grant authenticated user access to database and storage resources
  useSignInWithCustomToken(session?.firebase_token)

  // Get configured TinaCMS instance
  const cms = useMemo(() => new TinaCMS(CMS_BASE_CONFIG), [])

  // True if signed in with GitHub and rendering CMS page
  const preview = session?.provider === 'github' && !!(page as ICMSPage)?.uuid

  return (
    <NextAuthProvider session={(session || {}) as Session}>
      <TinaProvider cms={cms}>
        <ShopLayout page={Component} pageProps={{ ...pageProps, preview }} />
      </TinaProvider>
    </NextAuthProvider>
  )
}

export default App
