import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { FormProps } from './Form.props'

/**
 * @file Implementation - Form
 * @module lib/atoms/Form/impl
 */

/**
 * Renders a `<form>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/form
 * - https://developer.mozilla.org/docs/Web/API/HTMLFormElement
 */
export const Form: FREC<FormProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'form'>(props, 'form')

  return <a.form {...sanitized} ref={ref} />
})

Form.displayName = 'Form'

Form.defaultProps = {}
