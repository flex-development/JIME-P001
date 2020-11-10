import { FormOptions } from 'tinacms'
import { ICMSPage } from '../../interfaces'
import { PagesAPI } from '../config'
import { TextField } from '../helpers'

/**
 * @file Form configuration to edit the homepage
 * @module subdomains/cms/config/plugins/IndexPageFormPlugin
 * @see https://tinacms.org/docs/modules/cms/config/plugins/forms/
 */

/**
 * Returns the form configuration to edit the homepage.
 *
 * @todo Implement `IndexTemplate` fields
 * @todo Implement `SEOField`
 *
 * @param label - Label for the form that will appear in the sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @returns `IndexTemplate` form configuration
 */
export const IndexPageFormPlugin = (
  label = 'Home',
  onSubmit?: FormOptions<ICMSPage>['onSubmit']
): FormOptions<ICMSPage> => {
  const id = 'index'

  return {
    __type: 'form',
    fields: [TextField('title', 'Title')],
    id,
    label,

    /**
     * Loads the homepage data from the CMS database.
     *
     * @async
     */
    loadInitialValues: async () => {
      const page = await PagesAPI.findByPath('/')
      return (page || {}) as ICMSPage
    },

    /**
     * Logs the form submission or passes it to a submission handler if defined.
     *
     * @async
     */
    onSubmit: async (values, form, callback) => {
      if (!onSubmit) return console.debug(values)
      return onSubmit(values, form, callback)
    }
  }
}
