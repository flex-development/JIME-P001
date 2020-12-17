import { render } from '@testing-library/react'
import { Bootstrap, Material } from './Icon.stories'

/**
 * @file Tests - Icon
 * @module components/ui/atoms/Icon/spec
 */

it('renders a bootstrap icon', () => {
  const { container } = render(<Bootstrap {...Bootstrap.args} />)

  expect(container.firstChild).toHaveAttribute('data-bi')

  expect(container.firstChild).not.toHaveAttribute('data-fa')
  expect(container.firstChild).not.toHaveAttribute('data-material')
})

it('renders a material icon', () => {
  const { container } = render(<Material {...Material.args} />)

  expect(container.firstChild).toHaveAttribute('data-material')

  expect(container.firstChild).not.toHaveAttribute('data-bi')
  expect(container.firstChild).not.toHaveAttribute('data-fa')
})
