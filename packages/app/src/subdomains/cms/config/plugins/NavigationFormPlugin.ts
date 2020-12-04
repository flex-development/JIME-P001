import { uuid } from '@flex-development/kustomzdesign/utils'
import { CMSMenusDTO, ICMSMenu } from '@subdomains/cms/models'
import { FormOptions } from 'tinacms'
import { GroupListItemProps } from '../../utils'
import { MenusAPI } from '../config'
import { ClassNameField, IDField, LinkListField } from '../extensions'
import { TextField } from '../helpers'

/**
 * @file Form configuration to edit site menus
 * @module subdomains/cms/config/plugins/NavigationFormPlugin
 */

/**
 * Returns the form configuration that allows CMS admins to update the menus on
 * the marketing site.
 *
 * @param label - Label for the form that will appear in the sidebar
 * @param initialValues - Initial template data
 * @param onSubmit - Function to invoke when the form is saved
 * @returns `NavigationFormPlugin` instance
 */
export const NavigationFormPlugin = (
  label = 'Navigation',
  onSubmit?: FormOptions<CMSMenusDTO>['onSubmit']
): FormOptions<CMSMenusDTO> => {
  const id = 'navigation'

  return {
    __type: 'form',
    fields: [
      {
        component: 'group-list',
        defaultItem: {
          links: [],
          title: 'Menu Title',
          uuid: uuid()
        },
        fields: [
          IDField(
            'Changing this value after it is set may have unintended side effects.'
          ),
          TextField('title', 'Title'),
          LinkListField('links', 'Links', undefined, {
            href: '#',
            title: 'Link Title',
            uuid: uuid()
          }),
          ClassNameField()
        ],
        itemProps: ({ title, uuid }: ICMSMenu): GroupListItemProps => ({
          key: uuid,
          label: title
        }),
        label: 'Menus',
        name: 'menus'
      }
    ],
    id,
    label,

    /**
     * Loads all of the menus from the database.
     *
     * @async
     */
    loadInitialValues: async () => {
      return { menus: (await MenusAPI.find()) as Array<ICMSMenu> }
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
