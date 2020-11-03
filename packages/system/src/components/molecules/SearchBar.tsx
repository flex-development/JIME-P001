import { useMutatedProps } from '@system/hooks'
import { ANYTHING, Events } from '@system/types'
import React, { FC, FormEvent, useState } from 'react'
import { Button, Form, FormProps, Input, InputProps } from '../atoms'

/**
 * @file Render a search <form>
 * @module components/molecules/SearchBar
 */

/**
 * `Button` click event or `Form` event.
 */
export type SearchBarEvent = FormEvent | Events.Click.Button

/**
 * `SearchBar` component properties.
 */
export interface SearchBarProps extends FormProps {
  /**
   * Placeholder to display in `Input` component.
   */
  placeholder?: InputProps['placeholder']

  /**
   * Initial search query.
   */
  query?: string

  /**
   * Form submission handler. Fires when the users submits the search form or
   * clicks the search button.
   *
   * @param query - User query
   * @param event - `click` event from search button or `<form>` submit event
   */
  search?(query: string, event: SearchBarEvent): ANYTHING
}

/**
 * Renders a `Form` component that allows users to search the store.
 */
export const SearchBar: FC<SearchBarProps> = (props: SearchBarProps) => {
  const {
    placeholder,
    query: initialQuery,
    search = (query: string, event: SearchBarEvent) => {
      event.preventDefault()
      console.log('User search query', query)
    },
    ...rest
  } = props

  rest.onSubmit = (event: FormEvent) => search(query, event)

  const mutated = useMutatedProps<typeof rest>(rest, 'searchbar')

  const [query, setQuery] = useState<string>(initialQuery || '')

  return (
    <Form {...mutated}>
      <Button
        aria-label='Search button'
        className='searchbar-btn'
        icon={{ 'aria-label': 'Search icon', children: 'search' }}
        onClick={(event: Events.Click.Button) => search(query, event)}
        name='search'
        variant='ghost'
      />

      <Input
        aria-label='Search query'
        className='searchbar-input'
        onChange={(event: Events.Change.Input) => setQuery(event.target.value)}
        placeholder={placeholder}
        type='search'
        value={query}
      />
    </Form>
  )
}
