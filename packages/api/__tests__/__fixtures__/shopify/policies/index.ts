import type { IPolicy } from '@flex-development/kustomzcore/types'
import PRIVACY_POLICY from './privacy-policy'
import REFUND_POLICY from './refund-policy'
import SHIPPING_POLICY from './shipping-policy'
import TERMS_OF_SERVICE from './terms-of-service'

/**
 * @file Test Fixture - Policies
 * @module tests/fixtures/shopify/policies
 */

export default [
  PRIVACY_POLICY,
  REFUND_POLICY,
  SHIPPING_POLICY,
  TERMS_OF_SERVICE
] as IPolicy[]
