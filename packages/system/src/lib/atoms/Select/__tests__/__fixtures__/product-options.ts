import type { OptionProps } from '../../../Option/Option.props'

/**
 * @file Test Fixture - Product Options
 * @module lib/atoms/Select/tests/fixtures/product-options
 */

export default ([
  {
    'data-available': true,
    label: 'FUNFETTI',
    value: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU2NjQ2MzkwOTA4NDM='
  },
  {
    'data-available': true,
    label: 'JELLY $LIDES',
    value: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjE5NzczMjk0MTk3OQ=='
  },
  {
    'data-available': false,
    label: 'LA $ONRISA',
    value: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNjE5NzczMjk3NDc0Nw=='
  }
] as unknown) as OptionProps[]
