declare namespace jest {
  type ToBeJSONResponseOptions = {
    array?: jest.ToBeArrayOptions | boolean
    obj?: jest.ToBePlainObjectOptions | boolean
    status?: number
  }

  interface Matchers<R> {
    toBeJSONResponse(options?: ToBeJSONResponseOptions): R
    toHaveContentType(expected?: RegExp | string): R
    toHaveStatus(expected: number): R
  }
}
