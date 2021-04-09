import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject, ANYTHING } from '@flex-development/json'
import type { AxiosRequestConfig } from 'axios'
import type { ZodError } from 'zod'

/**
 * @file Type Definitions - Errors
 * @module types/errors
 */

/**
 * JSON representation of an Axios error.
 */
export type AxiosErrorJSON = {
  message: string
  name: string

  // Axios
  config: AxiosRequestConfig
  code: string

  // Microsoft
  description?: string
  number?: number

  // Mozilla
  columnNumber?: number
  fileName: string
  lineNumber?: number
  stack?: string
}

/**
 * Error names mapped to classNames.
 */
export enum ErrorClassName {
  BadRequest = 'bad-request',
  NotAuthenticated = 'not-authenticated',
  PaymentError = 'payment-error',
  Forbidden = 'forbidden',
  NotFound = 'not-found',
  MethodNotAllowed = 'method-not-allowed',
  NotAcceptable = 'not-acceptable',
  Timeout = 'timeout',
  Conflict = 'conflict',
  Gone = 'gone',
  LengthRequired = 'length-required',
  Unprocessable = 'unprocessable',
  TooManyRequests = 'too-many-requests',
  GeneralError = 'general-error',
  NotImplemented = 'not-implemeneted',
  BadGateway = 'bad-gateway',
  Unavailable = 'unavailable'
}

/**
 * JSON object representing an error.
 */
export interface ErrorJSON extends FeathersErrorJSON {
  className: ErrorClassName
  code: ErrorStatusCode
  data: AnyObject
  errors?: AnyObject | ANYTHING[]
  name: keyof typeof ErrorStatusCode
}

/**
 * Error status codes.
 */
export enum ErrorStatusCode {
  BadRequest = 400,
  NotAuthenticated = 401,
  PaymentError = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  Timeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  Unprocessable = 422,
  TooManyRequests = 429,
  GeneralError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  Unavailable = 503
}

/**
 * Shape of a Next.js Error object.
 */
export type NextError = Error & { statusCode?: number }

/**
 * Error response from `.safeParse`.
 */
export type ZodSafeParseError<T = ANYTHING> = {
  success: false
  error: ZodError<T>
}

/**
 * Sucess response from `.safeParse`.
 */
export type ZodSafeParseSuccess<D = ANYTHING> = {
  success: true
  data: D
}

// 3P error models
export type {
  DynamicError,
  ErrorMessage,
  FeathersErrorJSON
} from '@feathersjs/errors'
export type { AxiosError } from 'axios'
export { ZodIssueCode } from 'zod'
export type { ZodIssue } from 'zod'

/* eslint-disable prettier/prettier */
