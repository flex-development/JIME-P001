import { useSanitizedProps } from '@system/hooks'
import { Form, FormProps, Input } from '@system/lib/atoms'
import { FC, FormEvent } from 'react'
import { useInput } from 'react-hanger'
import { SearchBarProps } from './SearchBar.props'

/**
 * @file Implementation - SearchBar
 * @module lib/molecules/SearchBar/impl
 */

/**
 * Allows the user to search the store.
 * Renders a `Form` component with the class `search-bar`.
 */
export const SearchBar: FC<SearchBarProps> & {
  INPUT_LABEL: string
} = props => {
  const {
    handleSearch = (query: string, event: FormEvent) => {
      event.preventDefault()
      console.log('User search query', query)
    },
    placeholder,
    query: initialQuery,
    ...rest
  } = props

  // Get component properties
  const sanitized = useSanitizedProps<'form', FormProps>(rest, 'search-bar')

  // Handle search bar input value state
  const input = useInput(initialQuery || '')

  return (
    <Form
      {...sanitized}
      onSubmit={(event: FormEvent) => {
        return handleSearch(input.value.replace(' ', '+'), event)
      }}
    >
      <Input
        {...input.eventBind}
        aria-label={SearchBar.INPUT_LABEL}
        className='search-bar-control'
        onChange={input.onChange}
        placeholder={placeholder}
        type='search'
        value={input.value}
      />
    </Form>
  )
}

SearchBar.displayName = 'SearchBar'

SearchBar.INPUT_LABEL = 'Search query'

SearchBar.defaultProps = {}
