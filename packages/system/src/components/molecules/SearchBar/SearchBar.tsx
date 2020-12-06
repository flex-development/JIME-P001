import { ANYTHING } from '@flex-development/json'
import { useSanitizedProps } from '@system/hooks'
import { EventHandlers } from '@system/types'
import { FC, FormEvent } from 'react'
import { useInput } from 'react-hanger'
import { Button, Form, FormProps, Input, InputProps } from '../../atoms'

/**
 * @file Render a search <form>
 * @module components/molecules/SearchBar/SearchBar/SearchBar/impl
 */

export type SearchBarEvent = FormEvent | EventHandlers.Click.Button

export interface SearchBarProps extends FormProps {
  /**
   * Form submission handler. Fires when the users submits the search form or
   * clicks the search button.
   */
  handleSearch?(query: string, event: SearchBarEvent): ANYTHING

  /**
   * Placeholder to display in `Input` component.
   */
  placeholder?: InputProps['placeholder']

  /**
   * Initial search query.
   */
  query?: string
}

/**
 * Renders a `Form` component that allows users to search the store.
 */
export const SearchBar: FC<SearchBarProps> = (props: SearchBarProps) => {
  const {
    handleSearch = (query: string, event: SearchBarEvent) => {
      event.preventDefault()
      console.log('User search query', query)
    },
    placeholder,
    query: initialQuery,
    ...rest
  } = props

  const input = useInput(initialQuery || '')

  rest.onSubmit = (event: FormEvent) => {
    return handleSearch(input.value.replace(' ', '+'), event)
  }

  const sanitized = useSanitizedProps<typeof rest>(rest, 'searchbar')

  return (
    <Form {...sanitized}>
      <Button
        aria-label='Search button'
        className='searchbar-btn'
        icon={{ 'aria-label': 'Search icon', children: 'search' }}
        onClick={(event: EventHandlers.Click.Button) => {
          return handleSearch(input.value, event)
        }}
        name='search'
        variant='ghost'
      />

      <Input
        {...input.eventBind}
        aria-label='Search query'
        className='searchbar-input'
        onChange={input.onChange}
        placeholder={placeholder}
        type='search'
        value={input.value}
      />
    </Form>
  )
}

SearchBar.displayName = 'SearchBar'

SearchBar.defaultProps = {}
