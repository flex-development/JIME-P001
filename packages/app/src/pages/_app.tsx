import { AC, IAppProps, ShopLayout } from '@app/subdomains/app'
import { CMS_BASE_CONFIG, useSignInWithCustomToken } from '@app/subdomains/cms'
import '@app/subdomains/cms/styles.css'
import { useMusicKit } from '@app/subdomains/streaming'
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
 * @param param0.pageProps - Initial page props from data fetching methods
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  const { session } = pageProps

  // Grant authenticated user access to database and storage resources
  useSignInWithCustomToken(session?.firebase_token)

  // Get configured TinaCMS instance
  const cms = useMemo(() => new TinaCMS(CMS_BASE_CONFIG), [])

  useMusicKit()

  return (
    <NextAuthProvider session={(session as unknown) as Session}>
      <TinaProvider cms={cms}>
        <ShopLayout page={Component} session={session} />
      </TinaProvider>
    </NextAuthProvider>
  )
}

export default App
