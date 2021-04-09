declare namespace jest {
  type ToBeArrayOptions = {
    length?: number
  }

  type ToBePlainObjectOptions = {
    keys?: string
    keys_length?: number
  }

  interface Matchers<R> {
    toBeArray(options?: ToBeArrayOptions): R
    toBePlainObject(options?: ToBePlainObjectOptions): R
    toEachHaveKeys(expected: string): R
    toEachHaveKeysLength(expected: number): R
    toHaveKeys(expected: string): R
    toHaveKeysLength(expected: number): R
  }
}
