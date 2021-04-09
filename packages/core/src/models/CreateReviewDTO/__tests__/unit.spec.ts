import { OBJECT } from '@kapi/tests/fixtures/judgeme/reviews'
import CUSTOMERS from '@kapi/tests/fixtures/shopify/customers'
import PRODUCTS from '@kapi/tests/fixtures/shopify/products'
import { request } from '@kustomzcore/config/axios'
import type {
  CustomErrorParams,
  JudgeMeReviewCreateDataDTO as ICreateReviewDTO,
  ZodSafeParseError
} from '@kustomzcore/types'
import { ReviewRating } from '@kustomzcore/types/reviews'
import type { AxiosRequestConfig } from 'axios'
import faker from 'faker'
import Subject from '..'

/**
 * @file Unit Tests - CreateReviewDTO
 * @module models/CreateReviewDTO/tests/unit
 */

jest.mock('@kustomzcore/config/axios')

const mockRequest = request as jest.MockedFunction<typeof request>

describe('unit:models/CreateReviewDTO', () => {
  const body = '👍🏾 👍🏾 👍🏾'
  const email = OBJECT.reviewer.email
  const id = PRODUCTS[0].product_id

  const DTO: ICreateReviewDTO = { body, email, id }

  beforeAll(() => {
    mockRequest.mockImplementation(async ({ url }: AxiosRequestConfig) => {
      if (url === '/customers.json') return { customers: CUSTOMERS }

      if (url === '/products') {
        return PRODUCTS.map(p => ({
          objectID: p.handle,
          product_id: p.product_id
        }))
      }

      return null
    })
  })

  describe('#body', () => {
    describe('pass', () => {
      it('1 character', async () => {
        const dto: ICreateReviewDTO = { ...DTO, body: faker.datatype.string(1) }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('5000 characters', async () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          body: faker.datatype.string(5000)
        }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('between 1 and 5000 characters', async () => {
        expect((await Subject.safeParseAsync(DTO)).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('greater than 5000 characters', async () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          body: faker.datatype.string(5001)
        }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toMatch(new RegExp('5000 characters or fewer'))
        expect(issue.path[0]).toBe('body')
      })

      it('less than 1 character', async () => {
        const dto: ICreateReviewDTO = { ...DTO, body: faker.datatype.string(0) }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toMatch(new RegExp('at least 1 character'))
        expect(issue.path[0]).toBe('body')
      })

      it('undefined', async () => {
        const dto = { ...DTO, body: undefined }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('body')
      })
    })
  })

  describe('#email', () => {
    describe('pass', () => {
      it('valid email address', async () => {
        expect((await Subject.safeParseAsync(DTO)).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('customer not found', async () => {
        const dto = { ...DTO, email: faker.internet.exampleEmail() }

        const emessage = `Customer with email "${dto.email}" does not exist`
        const eparams = { email: dto.email }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toBe(emessage)
        expect((issue as CustomErrorParams).params).toMatchObject(eparams)
        expect(issue.path[0]).toBe('email')
      })
    })
  })

  describe('#id', () => {
    describe('pass', () => {
      it('number', async () => {
        expect((await Subject.safeParseAsync(DTO)).success).toBeTruthy()
      })

      it('string', async () => {
        const dto = { ...DTO, id: `${DTO.id}` }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('product not found', async () => {
        const dto = { ...DTO, id: faker.datatype.number(13) }

        const emessage = `Product with id "${dto.id}" does not exist`
        const eparams = { id: dto.id }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toBe(emessage)
        expect((issue as CustomErrorParams).params).toMatchObject(eparams)
        expect(issue.path[0]).toBe('id')
      })
    })
  })

  describe('#ip_addr', () => {
    describe('pass', () => {
      it('string', async () => {
        const dto: ICreateReviewDTO = { ...DTO, ip_addr: faker.internet.ip() }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('undefined', async () => {
        const dto: ICreateReviewDTO = { ...DTO, ip_addr: undefined }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('invalid type', async () => {
        const dto = ({ ...DTO, ip_addr: -1 } as unknown) as ICreateReviewDTO

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('ip_addr')
      })
    })
  })

  describe('#rating', () => {
    describe('pass', () => {
      it('between 1 and 5', async () => {
        const dto: ICreateReviewDTO = { ...DTO, rating: ReviewRating.THREE }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('undefined', async () => {
        const dto: ICreateReviewDTO = { ...DTO, rating: undefined }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('out of range', async () => {
        const dto: ICreateReviewDTO = { ...DTO, rating: 0 }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('rating')
      })
    })
  })

  describe('#title', () => {
    describe('pass', () => {
      it('0 characters', async () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(0)
        }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('100 characters', async () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(100)
        }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('between 0 and 100 characters', async () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(DTO.body.length)
        }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('null', async () => {
        const dto: ICreateReviewDTO = { ...DTO, title: null }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })

      it('undefined', async () => {
        const dto: ICreateReviewDTO = { ...DTO, title: undefined }

        expect((await Subject.safeParseAsync(dto)).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('greater than 100 characters', async () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(101)
        }

        const parsed = (await Subject.safeParseAsync(dto)) as ZodSafeParseError
        const { error, success } = parsed

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toMatch(new RegExp('100 characters or fewer'))
        expect(issue.path[0]).toBe('title')
      })
    })
  })
})
