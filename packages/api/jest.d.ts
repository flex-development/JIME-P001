declare namespace jest {
  type ToBeArrayOptions = {
    length?: number
  }

  type ToBePlainObjectOptions = {
    keys?: string
    keys_length?: number
  }

  type ToBeJSONResponseOptions = {
    array?: ToBeArrayOptions | boolean
    obj?: ToBePlainObjectOptions | boolean
    status?: number
  }

  interface Matchers<R> {
    toBeArray(options?: ToBeArrayOptions): R
    toBeJSONResponse(options?: ToBeJSONResponseOptions): R
    toBePlainObject(options?: ToBePlainObjectOptions): R
    toEachHaveKeys(expected: string): R
    toEachHaveKeysLength(expected: number): R
    toHaveContentType(expected?: RegExp | string): R
    toHaveKeys(expected: string): R
    toHaveKeysLength(expected: number): R
    toHaveStatus(expected: number): R
  }
}
