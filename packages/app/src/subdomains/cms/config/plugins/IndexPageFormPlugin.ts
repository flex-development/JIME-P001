import { ICMSPageIndex } from '@app/subdomains/cms/models'
import { isFunction } from 'lodash'
import { FormOptions } from 'tinacms'
import { InitialFormValues } from '../../utils/types'
import { PagesAPI } from '../config'
import { NumberField, TextAreaField, TextField } from '../helpers'

/**
 * @file Form configuration to edit the homepage
 * @module subdomains/cms/config/plugins/IndexPageFormPlugin
 * @see https://tina.io/docs/plugins/forms/#form-configuration
 */

/**
 * Returns the form configuration to edit the homepage.
 *
 * @param label - Label for the form that will appear in the sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @param initialValues - Object containing the initial form state or a function
 * to load the initial form state asynchronously
 * @param onChange - Function that runs when the form values are changed
 * @returns `IndexTemplate` form configuration
 */
export const IndexPageFormPlugin = (
  label = 'Home',
  initialValues?: InitialFormValues<ICMSPageIndex>,
  onSubmit?: FormOptions<ICMSPageIndex>['onSubmit'],
  onChange?: FormOptions<ICMSPageIndex>['onChange']
): FormOptions<ICMSPageIndex> => {
  const id = 'index'

  let loadInitialValues: FormOptions<ICMSPageIndex>['loadInitialValues']

  if (!initialValues) {
    loadInitialValues = async () => {
      const page = await PagesAPI.findByPath('/')
      return (page || {}) as ICMSPageIndex
    }
    initialValues = undefined
  } else if (isFunction(initialValues)) {
    loadInitialValues = initialValues
    initialValues = undefined
  }

  return {
    __type: 'form',
    fields: IndexPageFormPluginFields,
    id,
    initialValues,
    label,
    loadInitialValues,
    onChange,
    onSubmit: async (values, form, error) => {
      if (!onSubmit) return console.debug({ IndexPageFormPlugin: values })
      return onSubmit(values, form, error)
    }
  }
}

export const IndexPageFormPluginFields = [
  TextField('title', 'Title'),
  {
    component: 'group',
    description: 'Page content settings',
    fields: [
      TextField('about_section_title', 'About Section Title', '', '', 'About'),
      TextAreaField('about_section_text', 'About Section Text'),
      TextField(
        'products_section_title',
        'Products Section Title',
        '',
        '',
        'Products'
      ),
      TextAreaField('products_section_text', 'Products Section Text'),
      NumberField(
        'max_products',
        'Max Products',
        'Maximum number of products to display in Products section',
        3
      ),
      TextField(
        'product_reviews_title',
        'Product Reviews Section Title',
        '',
        '',
        'Reviews'
      ),
      NumberField(
        'max_reviews',
        'Max Reviews',
        'Maximum number of reviews to display in Product Reviews section',
        3
      )
    ],
    label: 'Content',
    name: 'content'
  }
]
