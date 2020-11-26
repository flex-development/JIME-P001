import { IndexTemplateProps } from '@flex-development/kustomzdesign'
import { FormApi } from 'final-form'
import { FormOptions } from 'tinacms'
import { PagesAPI } from '../config/config'
import { ICMSPageIndex } from '../interfaces'

/**
 * @file Form submission handler for IndexPageFormPlugin
 * @module subdomains/utils/handleIndexPageForm
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
): Promise<void> => {
  page.component = 'IndexTemplate'
  page.path = '/'

  /**
   * FIXES: `Preview data is limited to 2KB currently, reduce how much data
   * you are storing as preview data to continue`.
   *
   * These values also should not to be stored in the database.
   */
  delete (page.content as IndexTemplateProps).products
  delete (page.content as IndexTemplateProps).reviews

  // Upsert page data
  await PagesAPI.upsert(page.id, page)
}

export default handleIndexPageForm
