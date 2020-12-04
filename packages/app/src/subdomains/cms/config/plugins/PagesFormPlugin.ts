import { uuid } from '@flex-development/kustomzdesign/utils'
import { PagesAPI } from '@subdomains/cms/config'
import { CMSPagesDTO, ICMSPage } from '@subdomains/cms/models'
import { GroupListItemProps } from '@subdomains/cms/utils'
import { FormOptions } from 'tinacms'
import {
  MarkdownField,
  TextAreaField,
  TextField,
  ToggleField
} from '../helpers'

/**
 * @file Form configuration to edit site pages
 * @module subdomains/cms/config/plugins/PagesFormPlugin
 * @see https://tina.io/docs/plugins/forms/#form-configuration
 */

/**
 * Returns the form configuration that allows CMS admins to edit the pages that
 * use the `PagesTemplate`.
 *
 * @param label - Label for the form that will appear in the sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @param onChange - Function that runs when the form values are changed
 * @returns `PagesFormPlugin` instance
 */
export const PagesFormPlugin = (
  label = 'Pages',
  onSubmit?: FormOptions<CMSPagesDTO>['onSubmit'],
  onChange?: FormOptions<CMSPagesDTO>['onChange']
): FormOptions<CMSPagesDTO> => {
  const id = 'pages'

  return {
    __type: 'form',
    fields: PagesFormPluginFields,
    id,
    label,

    /**
     * Loads the pages that use the `PagesTemplate`.
     *
     * @async
     */
    loadInitialValues: async () => {
      const query = { component: { $eq: 'PageTemplate' } }
      return { pages: (await PagesAPI.find(query)) as Array<ICMSPage> }
    },

    onChange,

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

export const PagesFormPluginFields = [
  {
    component: 'group-list',
    defaultItem: { title: 'Page Title', uuid: uuid() },
    fields: [
      ToggleField('draft', 'Draft', 'Publish / unpublish page'),
      TextField('title', 'Title', 'Page Title'),
      TextField(
        'path',
        'Slug',
        'URL path page can be accessed from. Will be generated using page title if blank.'
      ),
      TextField(
        'keywords',
        'Keywords',
        'Comma-delimitted list of SEO keywords'
      ),
      TextAreaField(
        'description',
        'Description',
        'SEO description must be less than 150 characters'
      ),
      MarkdownField('content.body', 'Markdown / MDX Content')
    ],
    itemProps: ({ title, uuid }: ICMSPage): GroupListItemProps => ({
      key: uuid,
      label: title
    }),
    label: 'Pages',
    name: 'pages'
  }
]
