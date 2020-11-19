import { createError, IPageProps, Logger } from '@app/subdomains/app'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { ICMSPage } from '../interfaces'
import { useIndexPageForm } from './useIndexPageForm'
import { usePagesForm } from './usePagesForm'

/**
 * @file Retrieve a page from the CMS database
 * @module subdomains/cms/hooks/usePage
 */

export type UsePage = {
  /**
   * Page data if found.
   */
  data: ICMSPage

  /**
   * Error thrown, if any.
   */
  error: FeathersErrorJSON | null

  /**
   * Path of current page.
   */
  path: string
}

/**
 * Retrieve a page from the CMS database.
 *
 * Draft pages will be accessible if the current user is signed-in with GitHub.
 *
 * @param session - Current user session
 */
export const usePage = (session?: IPageProps['session']): UsePage => {
  // Handle response and error states from fetching page data
  const [data, setData] = useState<UsePage['data']>({} as UsePage['data'])
  const [error, setError] = useState<UsePage['error']>(null)

  // Get homepage data
  const { modified: homepage } = useIndexPageForm()

  // Get pages that use `PagesTemplate`
  const { modified: pages } = usePagesForm()

  // Get pathname and query from router instance
  const { pathname, query } = useRouter()

  // If on homepage, use pathname. Otherwise use slug query from dynamic routing
  const [path] = useState(pathname === '/' ? pathname : `/${query.slug}`)

  // Get homepage data
  useEffect(() => {
    // If not on homepage, do nothing
    if (path !== '/' || !homepage) return

    // Update page state
    setData(homepage)
  }, [homepage, path])

  // Get data for pages that use `PageTemplate`
  useEffect(() => {
    // If pages aren't loaded, or on homepage do nothing
    if (!pages || path === '/') return

    // Find page by path
    const page = pages.find(page => page.path === path)

    // If data for page isn't found
    if (!page) {
      const data = { path }
      const error = createError(`Page with path "${path}" not found`, data, 404)

      Logger.error({ usePage: error })
      setError(error)

      return
    }

    // If page is in draft mode and user isn't logged in with GitHub
    if (page.draft && session?.provider !== 'github') {
      const error = createError('Page unavailable', { page }, 401)
      Logger.error({ usePage: error })
      setError(error)
    }

    // Update page state
    setData(page)
  }, [pages, path, session])

  return { data, error, path }
}
