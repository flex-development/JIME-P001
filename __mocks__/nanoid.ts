/**
 * @file Mock - nanoid
 * @module mocks/nanoid
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/ai/nanoid
 */

export const nanoid = jest.fn((): string => '123456789012')
