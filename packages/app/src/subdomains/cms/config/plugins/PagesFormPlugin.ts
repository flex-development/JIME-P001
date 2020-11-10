import { uuid } from '@flex-development/kustomzdesign/utils'
import { FormOptions } from 'tinacms'
import { CMSPagesDTO, ICMSPage } from '../../interfaces'
import { GroupListItemProps } from '../../utils'
import { PagesAPI } from '../config'
import { MarkdownField, TextField, ToggleField } from '../helpers'

/**
 * @file Form configuration to edit site pages
 * @module subdomains/cms/config/plugins/PagesFormPlugin
 * @see https://tinacms.org/docs/modules/cms/config/plugins/forms/
 */

/**
 * Returns the form configuration that allows CMS admins to edit the pages that
 * use the `PagesTemplate`.
 *
 * @todo Implement `SEOField`
 *
 * @param label - Label for the form that will appear in the sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @returns `PagesFormPlugin` instance
 */
export const PagesFormPlugin = (
  label = 'Pages',
  onSubmit?: FormOptions<CMSPagesDTO>['onSubmit']
): FormOptions<CMSPagesDTO> => {
  const id = 'pages'

  return {
    __type: 'form',
    fields: [
      {
        component: 'group-list',
        defaultItem: {
          title: 'Page Title',
          uuid: uuid()
        },
        fields: [
          ToggleField('draft', 'Draft', 'Publish / unpublish page'),
          TextField('title', 'Title', 'Page Title'),
          TextField('path', 'Slug', 'URL path page can be accessed from'),
          MarkdownField('content.body', 'Markdown / MDX Content')
        ],
        itemProps: ({ title, uuid }: ICMSPage): GroupListItemProps => ({
          key: uuid,
          label: title
        }),
        label: 'Pages',
        name: id
      }
    ],
    id,
    label,

    /**
     * Loads the pages that use the `PagesTemplate`.
     *
     * @async
     */
    loadInitialValues: async () => {
      const pages = (await PagesAPI.find()) as Array<ICMSPage>
      return { pages: pages.filter(page => page.component === 'PageTemplate') }
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
