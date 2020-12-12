import { render } from '@testing-library/react'
import { Nav } from './Nav'

/**
 * @file Unit Tests - Nav
 * @module components/atoms/Nav/spec
 */

it('renders <nav class="nav" />', () => {
  const { container } = render(<Nav />)

  expect(container.firstChild).toHaveClass('nav')
})

it('renders <nav class="nav nav-fill" />', () => {
  const { container } = render(<Nav fill />)

  expect(container.firstChild).toHaveClass('nav-fill')
})

it('renders <nav class="nav nav-pills" />', () => {
  const { container } = render(<Nav pills />)

  expect(container.firstChild).toHaveClass('nav-pills')
})

it('renders <nav class="nav nav-tabs" />', () => {
  const { container } = render(<Nav tabs />)

  expect(container.firstChild).toHaveClass('nav-tabs')
})
