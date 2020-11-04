import { useMutatedProps } from '@system/hooks'
import { ANYTHING, EventHandlers } from '@system/types'
import React, { FC, FormEvent, useState } from 'react'
import { Button, Form, FormProps, Input, InputProps } from '../atoms'

/**
 * @file Render a search <form>
 * @module components/molecules/SearchBar
 */

/**
 * `Button` click event or `Form` event.
 */
export type SearchBarEvent = FormEvent | EventHandlers.Click.Button

/**
 * `SearchBar` component properties.
 */
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

  rest.onSubmit = (event: FormEvent) => handleSearch(query, event)

  const mutated = useMutatedProps<typeof rest>(rest, 'searchbar')

  const [query, setQuery] = useState<string>(initialQuery || '')

  return (
    <Form {...mutated}>
      <Button
        aria-label='Search button'
        className='searchbar-btn'
        icon={{ 'aria-label': 'Search icon', children: 'search' }}
        onClick={(e: EventHandlers.Click.Button) => handleSearch(query, e)}
        name='search'
        variant='ghost'
      />

      <Input
        aria-label='Search query'
        className='searchbar-input'
        onChange={(e: EventHandlers.Change.Input) => {
          setQuery(e.target.value)
        }}
        placeholder={placeholder}
        type='search'
        value={query}
      />
    </Form>
  )
}

SearchBar.displayName = 'SearchBar'

SearchBar.defaultProps = {}
