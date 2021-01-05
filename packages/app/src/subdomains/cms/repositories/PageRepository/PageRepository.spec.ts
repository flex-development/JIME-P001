import { DATASETS } from '@app-mocks/datamaps'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { getMockData, loadMockData } from '@app-mocks/utils'
import { ICMSPage } from '@app/subdomains/cms/models'
import { FeathersErrorJSON } from '@feathersjs/errors'
import PageRepository from './PageRepository'

/**
 * @file Tests - PageRepository
 * @module subdomains/cms/repositories/PageRepository/spec
 */

describe('PageRepository', () => {
  const app = firebaseTestApp(true)
  const database = app.database()

  const REPO: PageRepository = new PageRepository(database)

  const pages = getMockData<ICMSPage>(DATASETS.pages.name)
  const IMAGINARY_PAGE_PATH = 'IMAGINARY_PAGE_PATH'

  describe('#create', () => {
    beforeAll(async () => loadMockData<ICMSPage>(database, DATASETS.pages.name))
    afterAll(async () => database.ref(DATASETS.pages.path).remove())

    it('creates a new page', async () => {
      const data: Partial<ICMSPage> = {
        component: 'PageTemplate',
        content: { body: '' },
        draft: true,
        title: 'A New Page'
      }

      const res = await REPO.create(data)

      expect(res).toMatchObject(data)
    })

    it('throws an error if a page with req.path already exists', async () => {
      let res = {} as FeathersErrorJSON

      try {
        await REPO.create(pages[0])
      } catch (error) {
        res = error
      }

      expect(res.code).toBe(400)
    })
  })

  describe('#findByPath', () => {
    beforeAll(async () => loadMockData<ICMSPage>(database, DATASETS.pages.name))

    it('returns the page', async () => {
      const page = pages[0]
      const res = await REPO.findByPath(page.path)

      expect(res?.id).toBe(page.id)
      expect(res?.path).toBe(page.path)
    })

    it('return nulls if the page is not found', async () => {
      expect(await REPO.findByPath(IMAGINARY_PAGE_PATH)).toBe(null)
    })
  })

  describe('#update', () => {
    beforeAll(async () => loadMockData<ICMSPage>(database, DATASETS.pages.name))

    it('updates a page', async () => {
      const data = { path: '/page-path' }
      const res = await REPO.update(pages[1].id, data)

      expect(res.path).toBe(data.path)
    })

    it('throws an error if a page with req.path already exists', async () => {
      const data = { ...pages[2], path: pages[0].path }
      let res = {} as FeathersErrorJSON

      try {
        await REPO.update(data.id, data)
      } catch (error) {
        res = error
      }

      expect(res.code).toBe(400)
    })

    it('does not throw an error if the page with path req.path is the page being updated', async () => {
      const data = pages[2]
      const res = await REPO.update(data.id, data)

      expect(res).toMatchObject(data)
    })
  })
})
