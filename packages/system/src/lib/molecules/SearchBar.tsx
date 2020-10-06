import { ANYTHING } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@kustomz/hooks'
import { HTMLButtonClickEvent, HTMLInputChangeEvent } from '@kustomz/types'
import React, { FC, FormEvent, useState } from 'react'
import { Button, Form, FormProps, Input } from '../atoms'

/**
 * @file Render a search <form>
 * @module lib/molecules/SearchBar
 */

/**
 * `Button` click event or `Form` event.
 */
export type SearchBarEvent = FormEvent | HTMLButtonClickEvent

/**
 * `SearchBar` component properties.
 */
export interface SearchBarProps extends FormProps {
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
    query: initialQuery,
    search = (query: string, event: SearchBarEvent) => {
      event.preventDefault()
      console.log('User search query', query)
    },
    ...rest
  } = props

  rest.onSubmit = (event: FormEvent) => search(query, event)

  const mutatedProps = useMutatedProps<typeof rest>(rest, 'searchbar')

  const [query, setQuery] = useState<string>(initialQuery || '')

  return (
    <Form {...mutatedProps}>
      <Button
        aria-label='Search button'
        className='searchbar-btn'
        icon={{ children: 'search' }}
        onClick={(event: HTMLButtonClickEvent) => search(query, event)}
        name='search'
        variant='ghost'
      />

      <Input
        aria-label='Search query'
        className='searchbar-input'
        onChange={(event: HTMLInputChangeEvent) => setQuery(event.target.value)}
        placeholder='ash trays'
        type='search'
        value={query}
      />
    </Form>
  )
}
