import type { ANYTHING } from '@flex-development/json'
import { FormProps } from '@system/lib/atoms/Form'
import { InputProps } from '@system/lib/atoms/Input'
import { FormEvent } from 'react'

/**
 * @file Component Props - SearchBar
 * @module lib/molecules/SearchBar/props
 */

export interface SearchBarProps extends FormProps {
  /**
   * Form submission handler. Fires when the users submits the search form or
   * clicks the search button.
   */
  handleSearch?(query: string, event: FormEvent): ANYTHING

  /**
   * Placeholder to display in `Input` component.
   */
  placeholder?: InputProps['placeholder']

  /**
   * Initial search query.
   */
  query?: string
}
