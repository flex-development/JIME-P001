import { PagesAPI } from '@subdomains/cms/config'
import { ICMSPage, ICMSPageIndex } from '@subdomains/cms/models'
import { FormApi } from 'final-form'
import { omit } from 'lodash'
import { FormOptions } from 'tinacms'

/**
 * @file Form submission handler for IndexPageFormPlugin
 * @module subdomains/cms/utils/handleIndexPageForm/impl
 */

/**
 * Form submission handler for the `IndexPageFormPlugin`.
 *
 * @todo Handle submission errors
 *
 * @async
 * @param page - Updated form values
 * @param form - Form configuration
 * @param error - Error callback function
 * @returns Submission errors, undefined, or void
 */
const handleIndexPageForm = async (
  page: ICMSPageIndex,
  form: FormApi<ICMSPageIndex>,
  error: Parameters<FormOptions<ICMSPageIndex>['onSubmit']>[2]
): Promise<ICMSPage> => {
  page.component = 'IndexTemplate'
  page.content = { ...omit(page.content, ['products', 'reviews']) }
  page.path = '/'

  // Upsert page data
  return await PagesAPI.upsert(page.id, page)
}

export default handleIndexPageForm
