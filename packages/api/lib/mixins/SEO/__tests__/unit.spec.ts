import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import join from 'lodash/join'
import Subject from '..'
import {
  COLLECTION_LISTING as COLLECTION,
  COLLECTION_LISTING,
  COLLECTION_LISTING_PRODUCTS as COLLECTION_PRODUCTS,
  COLLECTION_LISTING_SEO as COLLECTION_SEO
} from './__fixtures__/collection-listing'
import GLOBAL_SEO from './__fixtures__/global-seo'
import {
  PAGE_METAFIELDS,
  PAGE_METAFIELDS_OBJ,
  PAGE_SEO
} from './__fixtures__/page'
import { POLICY, POLICY_SEO } from './__fixtures__/policy'
import {
  PRODUCT_LISTING,
  PRODUCT_LISTING_NO_VARIANTS_SEO,
  PRODUCT_LISTING_SEO,
  PRODUCT_LISTING_VARIANT
} from './__fixtures__/product-listing'

/**
 * @file Unit Tests - SEO Mixin
 * @module lib/mixins/SEO/tests/unit
 */

jest.mock('../../ShopifyAPI')

const mockOFA = ofa as jest.MockedFunction<typeof ofa>

describe('unit:lib/mixins/SEO', () => {
  describe('.collection', () => {
    it('returns seo data for collection listing', async () => {
      const spy = jest.spyOn(Subject, 'global')

      spy.mockReturnValue(Promise.resolve(GLOBAL_SEO))

      const seo = await Subject.collection(COLLECTION, COLLECTION_PRODUCTS)

      expect(seo).toMatchObject(COLLECTION_SEO)
    })
  })

  describe('.formatKeywords', () => {
    describe('handles array', () => {
      it('typeof args[0] === "array"', () => {
        const keywords = ['foo']

        const res = Subject.formatKeywords(keywords)

        expect(res).toBe(keywords[0])
      })

      it('typeof args[n] === "array"', () => {
        const keywords = ['key', ['foo', 'word']]

        const res = Subject.formatKeywords(keywords)

        expect(res).toBe(`${keywords[0]},${keywords[1][0]},${keywords[1][1]}`)
      })
    })

    it('removes duplicate values', () => {
      const keywords = ['key', 'key']

      const res = Subject.formatKeywords(...keywords)

      expect(res).toBe(keywords[0])
    })

    it('removes empty strings, falsy values, and non-string values', () => {
      const keywords = ['', 1, false, null, true, undefined, {}]

      const res = Subject.formatKeywords(...keywords)

      expect(res).toBe('')
    })

    it('returns string containing SEO keywords', () => {
      const keywords = ['key', 'word']

      const res = Subject.formatKeywords(...keywords)

      expect(res).toBe(`${keywords[0]},${keywords[1]}`)
    })

    it('typeof args[n] === formatted keywords string', () => {
      const keywords = 'key,word'
      const keywords_split = keywords.split(',')

      const res = Subject.formatKeywords(keywords)

      expect(res).toBe(`${keywords_split[0]},${keywords_split[1]}`)
    })
  })

  describe('.global', () => {
    it('returns global seo data', async () => {
      const seo = await Subject.global()

      expect(seo).toMatchObject(GLOBAL_SEO)
    })
  })

  describe('.includeSEO', () => {
    const fields = join(Object.keys(COLLECTION_LISTING), ',')

    it('returns false', () => {
      expect(Subject.includeSEO(fields)).toBeFalsy()
    })

    describe('returns true', () => {
      it('fields.includes("*")', () => {
        expect(Subject.includeSEO('*')).toBeTruthy()
      })

      it('fields.includes("seo")', () => {
        expect(Subject.includeSEO(`${fields},seo`)).toBeTruthy()
      })
    })
  })

  describe('.page', () => {
    it('returns seo data for page', async () => {
      const spy = jest.spyOn(Subject, 'global')

      spy.mockReturnValue(Promise.resolve(GLOBAL_SEO))
      mockOFA.mockReturnValue(PAGE_METAFIELDS_OBJ)

      const seo = await Subject.page(PAGE_METAFIELDS)

      expect(seo).toMatchObject(PAGE_SEO)
    })
  })

  describe('.policy', () => {
    it('returns seo data for policy', async () => {
      const spy = jest.spyOn(Subject, 'global')

      spy.mockReturnValue(Promise.resolve(GLOBAL_SEO))

      const seo = await Subject.policy(POLICY)

      expect(seo).toMatchObject(POLICY_SEO)
    })
  })

  describe('.product', () => {
    it('returns seo data for product listing with variants', async () => {
      const { sku } = PRODUCT_LISTING_VARIANT
      const seo = await Subject.product(PRODUCT_LISTING, sku)

      expect(seo).toMatchObject(PRODUCT_LISTING_SEO)
    })

    it('returns seo data for product listing without variants', async () => {
      const seo = await Subject.product({ ...PRODUCT_LISTING, variants: [] })

      expect(seo).toMatchObject(PRODUCT_LISTING_NO_VARIANTS_SEO)
    })
  })
})
