import type { IPolicy, SEOData } from '@flex-development/kustomzcore/types'
import merge from 'lodash/merge'
import GLOBAL_SEO from './global-seo'

/**
 * @file Test Fixture - Policy
 * @module lib/mixins/SEO/tests/fixtures/policy
 */

export const POLICY: IPolicy = {
  body: '',
  created_at: '2020-12-18T15:36:26-05:00',
  handle: 'refund-policy',
  title: 'Refund policy',
  updated_at: '2020-12-18T15:36:26-05:00',
  url: 'https://morenaskustomz.myshopify.com/47047901339/policies/22346334363'
}

export const POLICY_SEO: SEOData = merge(GLOBAL_SEO, {
  description: `${POLICY.title} | Morena's Kustomz`,
  title: POLICY.title
})
