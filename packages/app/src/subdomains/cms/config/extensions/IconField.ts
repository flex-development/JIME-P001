import { ligatures } from '@flex-development/kustomzdesign'
import { AnyField } from '@tinacms/forms/build/field'

/**
 * @file Select Field Extension - Icon
 * @module subdomains/cms/config/extensions/IconField
 */

/**
 * Extends the TinaCMS Select field plugin.
 *
 * Returns the configuration for an `Icon` ligature selection field.
 *
 * @see https://tinacms.org/docs/plugins/fields/select/
 * @see https://material.io/resources/icons
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const IconField = (
  name = 'icon',
  label = 'Icon',
  description = 'See https://material.io/resources/icons for previews'
): AnyField => ({
  component: 'select',
  description,
  label,
  name,
  options: ligatures.control.options
})

export default IconField
