import '@flex-development/kustomzdesign/index.scss'
import { AC, AppLayout, IAppProps } from '@subdomains/app'
import '@subdomains/app/styles.css'
import { CMS_CONFIG, useCMSAuth } from '@subdomains/cms'
import '@subdomains/cms/styles.css'
import { Provider as NextAuthProvider, Session } from 'next-auth/client'
import { useMemo } from 'react'
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
  // Handle CMS admin user session
  const { session } = useCMSAuth()

  // Get configured CMS instance
  const cms = useMemo<TinaCMS>(() => new TinaCMS(CMS_CONFIG), [])

  return (
    <NextAuthProvider session={(session || {}) as Session}>
      <TinaProvider cms={cms}>
        <AppLayout page={Component} pageProps={pageProps} />
      </TinaProvider>
    </NextAuthProvider>
  )
}

export default App
