import { useForm, useFormScreenPlugin } from 'tinacms'
import { PagesAPI } from '../config/config'
import { IndexPageFormPlugin } from '../config/plugins'
import { ICMSPage } from '../interfaces'
import { UseFormScreenPlugin } from '../utils'

/**
 * @file Connect a page to the `IndexPageFormPlugin`
 * @module subdomains/cms/hooks/useIndexPageForm
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `IndexPageFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const useIndexPageForm = (
  label?: string
): UseFormScreenPlugin<ICMSPage, ICMSPage> => {
  /**
   * Form submission handler.
   *
   * @param id - ID of page to update
   * @param page - Updated homepage
   */
  const onSubmit = async (page: ICMSPage) => {
    page.component = 'IndexTemplate'
    page.path = '/'

    return await PagesAPI.upsert(page.id, page)
  }

  // Get form config
  const config = IndexPageFormPlugin(label, onSubmit)

  // Create and register IndexPage form
  const [page, form] = useForm<ICMSPage>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: page }
}
