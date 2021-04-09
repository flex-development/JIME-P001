import type {
  JudgeMeReviewCreateDataDTO as ICreateReviewDTO,
  ZodSafeParseError
} from '@kustomzcore/types'
import { ReviewRating } from '@kustomzcore/types/reviews'
import faker from 'faker'
import Subject from '..'

/**
 * @file Unit Tests - CreateReviewDTO
 * @module models/CreateReviewDTO/tests/unit
 */

describe('unit:models/CreateReviewDTO', () => {
  const body = '👍🏾 👍🏾 👍🏾'
  const email = faker.internet.exampleEmail()
  const id = faker.datatype.number(13)

  const DTO: ICreateReviewDTO = { body, email, id }

  describe('#body', () => {
    describe('pass', () => {
      it('1 character', () => {
        const dto: ICreateReviewDTO = { ...DTO, body: faker.datatype.string(1) }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('5000 characters', () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          body: faker.datatype.string(5000)
        }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('between 1 and 5000 characters', () => {
        expect(Subject.safeParse(DTO).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('greater than 5000 characters', () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          body: faker.datatype.string(5001)
        }

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError
        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toMatch(new RegExp('5000 characters or fewer'))
        expect(issue.path[0]).toBe('body')
      })

      it('less than 1 character', () => {
        const dto: ICreateReviewDTO = { ...DTO, body: faker.datatype.string(0) }

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError
        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toMatch(new RegExp('at least 1 character'))
        expect(issue.path[0]).toBe('body')
      })

      it('undefined', () => {
        const dto = { ...DTO, body: undefined }

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError
        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('body')
      })
    })
  })

  describe('#email', () => {
    describe('pass', () => {
      it('valid email address', () => {
        expect(Subject.safeParse(DTO).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('invalid email address', () => {
        const dto = { ...DTO, email: '' }

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError

        expect(error).toBeDefined()
        expect(success).toBeFalsy()
      })
    })
  })

  describe('#id', () => {
    describe('pass', () => {
      it('number', () => {
        expect(Subject.safeParse(DTO).success).toBeTruthy()
      })

      it('string', () => {
        const dto = { ...DTO, id: `${DTO.id}` }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('invalid type', () => {
        const dto = ({ ...DTO, id: undefined } as unknown) as ICreateReviewDTO

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError
        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('id')
      })
    })
  })

  describe('#ip_addr', () => {
    describe('pass', () => {
      it('string', () => {
        const dto: ICreateReviewDTO = { ...DTO, ip_addr: faker.internet.ip() }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('undefined', () => {
        const dto: ICreateReviewDTO = { ...DTO, ip_addr: undefined }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('invalid type', () => {
        const dto = ({ ...DTO, ip_addr: -1 } as unknown) as ICreateReviewDTO

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError
        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('ip_addr')
      })
    })
  })

  describe('#rating', () => {
    describe('pass', () => {
      it('between 1 and 5', () => {
        const dto: ICreateReviewDTO = { ...DTO, rating: ReviewRating.THREE }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('undefined', () => {
        const dto: ICreateReviewDTO = { ...DTO, rating: undefined }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('out of range', () => {
        const dto: ICreateReviewDTO = { ...DTO, rating: 0 }

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError
        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.path[0]).toBe('rating')
      })
    })
  })

  describe('#title', () => {
    describe('pass', () => {
      it('0 characters', () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(0)
        }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('100 characters', () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(100)
        }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('between 0 and 100 characters', () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(DTO.body.length)
        }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('null', () => {
        const dto: ICreateReviewDTO = { ...DTO, title: null }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })

      it('undefined', () => {
        const dto: ICreateReviewDTO = { ...DTO, title: undefined }

        expect(Subject.safeParse(dto).success).toBeTruthy()
      })
    })

    describe('fail', () => {
      it('greater than 100 characters', () => {
        const dto: ICreateReviewDTO = {
          ...DTO,
          title: faker.datatype.string(101)
        }

        const { error, success } = Subject.safeParse(dto) as ZodSafeParseError

        expect(error).toBeDefined()
        expect(success).toBeFalsy()

        const issue = error.issues[0]

        expect(issue.message).toMatch(new RegExp('100 characters or fewer'))
        expect(issue.path[0]).toBe('title')
      })
    })
  })
})
