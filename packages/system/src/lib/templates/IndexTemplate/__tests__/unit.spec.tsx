import { render, screen } from '@testing-library/react'
import { Homepage } from '../IndexTemplate.stories'
import METAFIELDS_OBJ from './__fixtures__/metafields-object'

/**
 * @file Unit Tests - IndexTemplate
 * @module lib/templates/IndexTemplate/tests/unit
 */

describe('unit:IndexTemplate', () => {
  describe('html', () => {
    it('renders <main> element with class "index-template"', () => {
      const { container } = render(<Homepage {...Homepage.args} />)

      expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(container.firstChild).toHaveClass('index-template')
    })
  })

  describe('props', () => {
    describe('page', () => {
      describe('metafields', () => {
        it('about_section_text', () => {
          render(<Homepage {...Homepage.args} />)

          const text = METAFIELDS_OBJ.about_section_text.value as string

          expect(screen.getByText(text)).toBeInTheDocument()
        })

        it('about_section_title', () => {
          render(<Homepage {...Homepage.args} />)

          const pattern = METAFIELDS_OBJ.about_section_title.value as string
          const name = new RegExp(pattern, 'i')

          const element = screen.getByRole('heading', { name })

          expect(element).toHaveClass('template-heading')
        })

        it('products_section_text', () => {
          render(<Homepage {...Homepage.args} />)

          const text = METAFIELDS_OBJ.products_section_text.value as string

          expect(screen.getByText(text)).toBeInTheDocument()
        })

        it('products_section_title', () => {
          render(<Homepage {...Homepage.args} />)

          const pattern = METAFIELDS_OBJ.products_section_title.value as string
          const name = new RegExp(pattern, 'i')

          const element = screen.getByRole('heading', { name })

          expect(element).toHaveClass('template-heading')
        })

        it.todo('reviews_section_title')
      })
    })
  })
})
