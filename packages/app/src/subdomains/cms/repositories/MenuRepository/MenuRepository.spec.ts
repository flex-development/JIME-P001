import MockMenusRepoRoot from '@app-mocks/data/menus.mock.json'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { loadMenusTestData, removeMenusTestData } from '@app-mocks/utils'
import { ICMSMenu } from '@app/subdomains/cms/models'
import MenuRepository from './MenuRepository'

/**
 * @file Unit Tests - MenuRepository
 * @module subdomains/cms/repositories/MenuRepository/spec
 */

describe('MenuRepository', () => {
  const app = firebaseTestApp(true)
  const menus = Object.values(MockMenusRepoRoot) as Array<ICMSMenu>
  const repo: MenuRepository = new MenuRepository(app.database())

  describe('#create', () => {
    beforeAll(async () => loadMenusTestData(app))
    afterAll(async () => removeMenusTestData(app))

    it('creates a new menu', async () => {
      const req = { ...menus[0], id: 'menu-id' }
      const res = await repo.create(req)

      expect(res.id).toBe(req.id)
      expect(res.title).toBe(res.title)
      res.links.forEach((link, i) => expect(link).toMatchObject(req.links[i]))
    })

    it('throws an error if a menu with req.id already exists', async () => {
      await expect(() => repo.create(menus[1])).rejects.toThrow()
    })
  })
})
