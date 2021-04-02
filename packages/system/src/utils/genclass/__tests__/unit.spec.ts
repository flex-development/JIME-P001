import genclass from '..'

/**
 * @file Unit Tests - genclass
 * @module utils/genclass/tests/unit
 */

describe('unit:genclass', () => {
  it('returns an empty string if breakpoint value is falsy', () => {
    const class_prefix = 'col'

    expect(genclass(class_prefix)).toEqual('')
    expect(genclass(class_prefix, null, 'md')).toEqual('')
    expect(genclass(class_prefix, false, 'sm')).toEqual('')
  })

  it('generates utility class', () => {
    expect(genclass('flex', 'row')).toEqual('flex-row')
  })

  it('generates responsive utility class', () => {
    expect(genclass('mb', 0, 'sm')).toEqual('sm:mb-0')
  })
})
