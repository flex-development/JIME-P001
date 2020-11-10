import { ICMSMenu } from '@app/subdomains/cms/interfaces/ICMSMenu'
import { MenuRepository } from '@app/subdomains/cms/repositories'
import MockMenusRepoRoot from '../__mocks__/data/menus.mock.json'
import firebaseTestApp from '../__mocks__/firebaseTestApp'
import { loadMenusTestData, removeMenusTestData } from '../__mocks__/utils'

/**
 * @file Unit Tests - MenuRepository
 * @module tests/repositories/MenuRepository
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
