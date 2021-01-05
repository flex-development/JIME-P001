import { PagesAPI } from '@app/subdomains/cms/config'
import { CMSPagesDTO, ICMSPage, ICMSPageSlug } from '@app/subdomains/cms/models'
import { FormApi } from 'final-form'
import { isEmpty } from 'lodash'
import { FormOptions } from 'tinacms'

/**
 * @file Form submission handler for PagesFormPlugin
 * @module subdomains/cms/utils/handlePagesForm/impl
 */

/**
 * Form submission handler for the `PagesFormPlugin`. Pages can be created,
 * updated, and removed.
 *
 *
 * @todo Handle submission errors
 *
 * @async
 * @param value - Form value
 * @param value.pages - Updated pages
 * @param form - Form configuration
 * @param error - Error callback function
 * @return Submission errors, undefined, or void
 */
const handlePagesForm = async (
  value: CMSPagesDTO,
  form: FormApi<CMSPagesDTO>,
  error: Parameters<FormOptions<CMSPagesDTO>['onSubmit']>[2]
): Promise<void> => {
  const { pages } = value

  // Get IDs of submitted pages
  const submitted = pages.map(page => page.id)

  // Create or update pages
  await Promise.all(
    pages.map(async (page: ICMSPage) => {
      if (isEmpty(page.id)) {
        page = await PagesAPI.create(page)
        submitted.push(page.id)
      } else {
        await PagesAPI.update(page.id, page)
      }
    })
  )

  // Get all pages using `PageTemplate`
  let basic_pages = (await PagesAPI.find()) as Array<ICMSPageSlug>
  basic_pages = basic_pages.filter(page => page.component === 'PageTemplate')

  // Filter out pages not present in submitted pages array
  const deleted = basic_pages.filter(page => !submitted.includes(page.id))

  // Delete pages that weren't submitted
  await PagesAPI.deleteBatch(deleted.map(page => page.id))
}

export default handlePagesForm
