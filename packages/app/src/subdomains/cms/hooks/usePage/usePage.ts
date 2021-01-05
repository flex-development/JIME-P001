import { IndexPageFormPlugin } from '@app/subdomains/cms/config'
import { ICMSPage, ICMSPageIndex } from '@app/subdomains/cms/models'
import { handleIndexPageForm } from '@app/subdomains/cms/utils'
import { AnyObject } from '@flex-development/json'
import { merge } from 'lodash'
import { useMemo } from 'react'
import { FormOptions } from 'tinacms'
import { useIndexPageForm } from '../useIndexPageForm'
import { usePagesForm } from '../usePagesForm'

/**
 * @file Retrieve a page from the CMS database
 * @module subdomains/cms/hooks/usePage/impl
 */

/**
 * Initializes the `IndexPageFormPlugin` and `PagesFormPlugin` as CMS forms.
 *
 * If {@param page} is a CMS page, it will be merged with the CMS content from
 * the database. The original data will be returned otherwise.
 *
 * @param page - Page data for current Next.js page component
 * @return CMS page content or empty object if not rendering a CMS page
 */
export const usePage = (page: AnyObject = {}): ICMSPage | AnyObject => {
  // Generate `Index` page form configuration
  const index_config = useMemo<FormOptions<ICMSPageIndex>>(() => {
    const data = page?.path === '/' ? (page as ICMSPageIndex) : undefined
    return IndexPageFormPlugin('Home', data, handleIndexPageForm)
  }, [page])

  // Get data for `Index` page
  const { modified: index } = useIndexPageForm(index_config)

  // Get all pages that use `PagesTemplate`
  const { modified: pages } = usePagesForm()

  // Return original data object if not working with CMS page data
  if (!(page as ICMSPage).component) return page

  // If on homepage, return CMS data merged with original page data
  if ((page as ICMSPage).path === '/') return merge(page, index)

  // If not on homepage, search for the corresponding CMS page data.
  // Data is guaranteed to exist because we weren't redirected to /404 page
  const cms_page = pages.find(({ id }) => id === page.id) as ICMSPage

  // Return CMS data merged with original page data
  return merge(cms_page, page as ICMSPage)
}
