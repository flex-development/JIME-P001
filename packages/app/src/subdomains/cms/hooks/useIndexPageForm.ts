import { isEmpty } from 'lodash'
import { FormOptions, useForm, useFormScreenPlugin } from 'tinacms'
import { ICMSPageIndex } from '../interfaces'
import { UseFormScreenPlugin } from '../utils'

/**
 * @file Connect a page to the `IndexPageFormPlugin`
 * @module subdomains/cms/hooks/useIndexPageForm
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `IndexPageFormPlugin` instance.
 *
 * @param config - Form configuration
 * @returns Form API, config, and values
 */
export const useIndexPageForm = (
  config: FormOptions<ICMSPageIndex>
): UseFormScreenPlugin<ICMSPageIndex, ICMSPageIndex> => {
  // Add label to form if missing one
  if (isEmpty(config.label)) config.label = 'Home'

  // Create form and watch values
  const [page, form] = useForm<ICMSPageIndex>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: page }
}
