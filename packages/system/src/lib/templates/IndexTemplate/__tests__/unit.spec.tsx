import type { RenderResult } from '@testing-library/react'
import { render, screen } from '@testing-library/react'
import { Homepage } from '../IndexTemplate.stories'
import METAFIELDS_OBJ from './__fixtures__/metafields-object'

/**
 * @file Unit Tests - IndexTemplate
 * @module lib/templates/IndexTemplate/tests/unit
 */

describe('unit:IndexTemplate', () => {
  let view = {} as RenderResult

  beforeEach(() => {
    view = render(<Homepage {...Homepage.args} />)
  })

  describe('html', () => {
    it('renders <main> element with class "index-template"', () => {
      expect(view.container.firstChild?.nodeName.toLowerCase()).toBe('main')
      expect(view.container.firstChild).toHaveClass('index-template')
    })
  })

  describe('props', () => {
    describe('page', () => {
      describe('metafields', () => {
        it('about_section_text', () => {
          const text = METAFIELDS_OBJ.about_section_text.value as string

          expect(screen.getByText(text)).toBeInTheDocument()
        })

        it('about_section_title', () => {
          const pattern = METAFIELDS_OBJ.about_section_title.value as string
          const name = new RegExp(pattern, 'i')

          const element = screen.getByRole('heading', { name })

          expect(element).toHaveClass('template-heading')
        })

        it('products_section_text', () => {
          const text = METAFIELDS_OBJ.products_section_text.value as string

          expect(screen.getByText(text)).toBeInTheDocument()
        })

        it('products_section_title', () => {
          const pattern = METAFIELDS_OBJ.products_section_title.value as string
          const name = new RegExp(pattern, 'i')

          const element = screen.getByRole('heading', { name })

          expect(element).toHaveClass('template-heading')
        })

        it('reviews_section_title', () => {
          const pattern = METAFIELDS_OBJ.reviews_section_title.value as string
          const name = new RegExp(pattern, 'i')

          const element = screen.getByRole('heading', { name })

          expect(element).toHaveClass('template-heading')
        })
      })
    })
  })
})
