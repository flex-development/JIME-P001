import { AC, IAppProps } from '@app/subdomains/app'
import { CMS_BASE_CONFIG } from '@app/subdomains/cms/config'
import '@app/subdomains/cms/styles.css'
import React, { useMemo } from 'react'
import { TinaCMS, TinaProvider } from 'tinacms'

/**
 * @file Next.js Custom App
 * @module pages/app
 * @see https://nextjs.org/docs/advanced-features/custom-app
 *
 * @todo Import global stylesheet
 */

/**
 * Custom app initialization component.
 *
 * Registers the NextAuth and TinaCMS providers. Editors (repository
 * collaborators) can sign in with GitHub to edit marketing site content.
 *
 * @todo Register NextAuth provider
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Initial page props from data fetching methods
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  // Get configured TinaCMS instance
  const cms = useMemo(() => new TinaCMS(CMS_BASE_CONFIG), [])

  return (
    <TinaProvider cms={cms}>
      <Component {...pageProps} />
    </TinaProvider>
  )
}

export default App
