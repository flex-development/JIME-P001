import MockPagesRepoRoot from '@app-mocks/data/pages.mock.json'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { loadPagesTestData, removePagesTestData } from '@app-mocks/utils'
import { ICMSPage } from '@app/subdomains/cms/models'
import PageRepository from './PageRepository'

/**
 * @file Unit Tests - PageRepository
 * @module subdomains/cms/repositories/PageRepository/spec
 */

describe('PageRepository', () => {
  const app = firebaseTestApp(true)
  const pages = Object.values(MockPagesRepoRoot) as Array<ICMSPage>
  const repo: PageRepository = new PageRepository(app.database())

  const IMAGINARY_PAGE_PATH = 'IMAGINARY_PAGE_PATH'

  describe('#create', () => {
    beforeAll(async () => loadPagesTestData(app))
    afterAll(async () => removePagesTestData(app))

    it('creates a new page', async () => {
      const page: Partial<ICMSPage> = {
        component: 'PageTemplate',
        content: { body: '' },
        draft: true,
        title: 'A New Page'
      }

      expect(await repo.create(page)).toMatchObject(page)
    })

    it('throws an error if a page with req.path already exists', async () => {
      await expect(() => repo.create(pages[0])).rejects.toThrow()
    })
  })

  describe('#findByPath', () => {
    beforeAll(async () => loadPagesTestData(app))

    it('returns the page', async () => {
      const page = pages[0]
      const res = await repo.findByPath(page.path)

      expect(res?.id).toBe(page.id)
      expect(res?.path).toBe(page.path)
    })

    it('return nulls if the page is not found', async () => {
      expect(await repo.findByPath(IMAGINARY_PAGE_PATH)).toBe(null)
    })
  })

  describe('#update', () => {
    beforeAll(async () => loadPagesTestData(app))

    it('updates a page', async () => {
      const page: Partial<ICMSPage> = { ...pages[1], path: '/page-path' }
      const res = await repo.update(page.id as string, page)

      expect(res.path).toBe(page.path)
    })

    it('throws an error if a page with req.path already exists', async () => {
      const data = { ...pages[2], path: pages[0].path }

      await expect(() => repo.update(data.id, data)).rejects.toThrow()
    })

    it('does not throw an error if the page with page req.path is the page being updated', async () => {
      const data = { ...pages[2], path: pages[0].path }

      await expect(() => repo.update(data.id, data)).rejects.toThrow()
    })
  })
})
