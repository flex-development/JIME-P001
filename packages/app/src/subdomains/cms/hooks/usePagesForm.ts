import { isEmpty } from 'lodash'
import { FormOptions, useForm, useFormScreenPlugin } from 'tinacms'
import { PagesAPI } from '../config/config'
import { PagesFormPlugin } from '../config/plugins'
import { CMSPagesDTO, ICMSPage } from '../interfaces'
import { UseFormScreenPlugin } from '../utils'

/**
 * @file Register a `PagesFormPlugin` instance
 * @module hooks/usePagesForm
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `PagesFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const usePagesForm = (
  label?: string
): UseFormScreenPlugin<CMSPagesDTO, Array<ICMSPage>> => {
  /**
   * Form submission handler. Pages can be created, updated, and removed.
   *
   * @param param0 - Form value
   * @param param0.pages - Updated pages
   */
  const onSubmit: FormOptions<CMSPagesDTO>['onSubmit'] = async ({ pages }) => {
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
    let basic_pages = (await PagesAPI.find()) as Array<ICMSPage>
    basic_pages = basic_pages.filter(page => page.component === 'PageTemplate')

    // Filter out pages not present in submitted pages array
    const deleted = basic_pages.filter(page => !submitted.includes(page.id))

    // Delete pages that weren't submitted
    await PagesAPI.deleteBatch(deleted.map(page => page.id))
  }

  // Get form config
  const config = PagesFormPlugin(label, onSubmit)

  // Create and register Pages form
  const [pages, form] = useForm<CMSPagesDTO>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: pages.pages }
}
