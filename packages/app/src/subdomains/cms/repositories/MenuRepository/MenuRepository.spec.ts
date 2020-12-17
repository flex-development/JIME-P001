import { DATASETS } from '@app-mocks/datamaps'
import firebaseTestApp from '@app-mocks/firebaseTestApp'
import { getMockData, loadMockData } from '@app-mocks/utils'
import { FeathersErrorJSON } from '@feathersjs/errors'
import { ICMSMenu } from '@subdomains/cms/models'
import MenuRepository from './MenuRepository'

/**
 * @file Tests - MenuRepository
 * @module subdomains/cms/repositories/MenuRepository/spec
 */

describe('MenuRepository', () => {
  const app = firebaseTestApp(true)
  const database = app.database()
  const menus = getMockData<ICMSMenu>(DATASETS.menus.name)

  const REPO: MenuRepository = new MenuRepository(database)

  describe('#create', () => {
    beforeAll(async () => loadMockData<ICMSMenu>(database, DATASETS.menus.name))
    afterAll(async () => database.ref(DATASETS.menus.path).remove())

    it('creates a new menu', async () => {
      const req = { ...menus[0], id: 'menu-id' }
      const res = await REPO.create(req)

      expect(res.id).toBe(req.id)
      expect(res.title).toBe(res.title)
      res.links.forEach((link, i) => expect(link).toMatchObject(req.links[i]))
    })

    it('throws an error if a menu with req.id already exists', async () => {
      let res = {} as FeathersErrorJSON

      try {
        await REPO.create(menus[1])
      } catch (error) {
        res = error
      }

      expect(res.code).toBe(400)
    })
  })
})
