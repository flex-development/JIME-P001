import { ProfileSnippetAPI } from '@subdomains/cms/config/config'
import { URLField } from '@subdomains/cms/config/extensions'
import { NumberField, TextField } from '@subdomains/cms/config/helpers'
import { IProfileSnippet } from '@subdomains/cms/models'
import { FormOptions } from 'tinacms'

/**
 * @file Form configuration edit profile snippet settings
 * @module subdomains/cms/config/plugins/ProfileSnippetFormPlugin
 */

/**
 * Returns the form configuration to edit the profile snippet in the sidebar.
 *
 * @param label - Label for the form that will appear in the CMS sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @returns Sidebar profile snippet form configuration
 */
export const ProfileSnippetFormPlugin = (
  label = 'Profile Snippet',
  onSubmit?: FormOptions<IProfileSnippet>['onSubmit']
): FormOptions<IProfileSnippet> => {
  const id = 'profile-snippet'

  return {
    __type: 'form',
    fields: [
      NumberField('age', 'Age', undefined, 22),
      URLField(
        'img',
        'Profile Picture',
        undefined,
        'assets/img/morena-transparent.png',
        'assets/img/morena-transparent.png'
      ),
      TextField('location', 'Location', '', '', 'New York'),
      TextField('mood', 'Mood', '', '', 'High 🤪')
    ],
    id,
    label,

    /**
     * Loads the current profile snippet settings from the CMS database.
     *
     * @async
     */
    loadInitialValues: async () => {
      return (await ProfileSnippetAPI.findById()) || ({} as IProfileSnippet)
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
