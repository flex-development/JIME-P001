import { ListProps } from '@system/lib/atoms/List'

/**
 * @file Test Fixture - DropdownMenu Items
 * @module lib/molecules/DropdownMenu/tests/fixtures/dropdown-items
 */

export default [
  {
    children: 'Dropdown item 1'
  },
  {
    children: 'Dropdown item 2'
  },
  {
    children: 'Dropdown item 3'
  },
  {
    children: 'Dropdown item 4'
  },
  {
    children: 'Dropdown item 5'
  }
].map(item => ({ ...item, $dropdown: true })) as ListProps['$items']
