import { AC, IAppProps, ShopLayout } from '@app/subdomains/app'
import '@app/subdomains/app/styles.css'
import { CMS_BASE_CONFIG, useSignInWithCustomToken } from '@app/subdomains/cms'
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
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  // Grant authenticated user access to database and storage resources
  useSignInWithCustomToken(pageProps.session?.firebase_token)

  // Get configured TinaCMS instance
  const cms = useMemo(() => new TinaCMS(CMS_BASE_CONFIG), [])

  return (
    <NextAuthProvider session={(pageProps.session || {}) as Session}>
      <TinaProvider cms={cms}>
        <ShopLayout page={Component} pageProps={pageProps} />
      </TinaProvider>
    </NextAuthProvider>
  )
}

export default App
