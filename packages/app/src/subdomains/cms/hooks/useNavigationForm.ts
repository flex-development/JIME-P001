import { FormOptions, useForm, useFormScreenPlugin } from 'tinacms'
import { MenusAPI } from '../config/config'
import { NavigationFormPlugin } from '../config/plugins'
import { CMSMenusDTO, ICMSMenu } from '../interfaces'
import { UseFormScreenPlugin } from '../utils'

/**
 * @file Register a `NavigationFormPlugin` instance
 * @module subdomains/cms/hooks/useNavigationForm
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `NavigationFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const useNavigationForm = (
  label?: string
): UseFormScreenPlugin<CMSMenusDTO, Array<ICMSMenu>> => {
  /**
   * Form submission handler. Menus can be created, updated, and removed.
   *
   * Menu IDs can be updated, but may cause side effects. Existing menus may be
   * overwritten if a menu with the same ID is created.
   *
   * @param param0 - Form value
   * @param param0.menus - Updated menus
   */
  const onSubmit: FormOptions<CMSMenusDTO>['onSubmit'] = async ({ menus }) => {
    // Delete menus that weren't submitted
    await MenusAPI.deleteBatch(
      menus.map(menu => menu.id),
      true
    )

    // Upsert menus
    await Promise.all(
      menus.map(async (menu: ICMSMenu) => {
        await MenusAPI.upsert(menu.id || '', menu)
      })
    )
  }

  // Get form config
  const config = NavigationFormPlugin(label, onSubmit)

  // Create and register Navigation form
  const [navigation, form] = useForm<CMSMenusDTO>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: navigation.menus }
}
