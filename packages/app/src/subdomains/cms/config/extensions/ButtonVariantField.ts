import { AnyField } from '@tinacms/forms/build/field'

/**
 * @file Button variant selection field
 * @module subdomains/cms/config/extensions/ButtonVariantField
 */

const BUTTON_VARIANTS = [
  'black',
  'danger',
  'dark',
  'darker',
  'ghost',
  'light',
  'primary',
  'secondary',
  'white'
]

const VARIANT_OPTIONS = BUTTON_VARIANTS.map((variant: string) => ({
  label: variant,
  value: variant
}))

/**
 * Extends the TinaCMS Select field plugin. Returns the configuration for a
 * `Button` variant selection field.
 *
 * @see https://tinacms.org/docs/plugins/fields/select/
 *
 * @param name - Equivalent of an input's `name` attribute
 * @param label - Optional label to render above the field input
 * @param description - Optional description that expands on the purpose of the
 * field or prompts a specific action
 */
const ButtonVariantField = (
  name: string,
  label?: string,
  description?: string
): AnyField => ({
  component: 'select',
  description: description || 'Select a button background or outline color',
  label,
  name,
  options: [{ label: 'None', value: (undefined as unknown) as string }].concat(
    VARIANT_OPTIONS
  )
})

export default ButtonVariantField
