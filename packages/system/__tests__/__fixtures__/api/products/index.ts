import type { ProductListingData } from '@kustomzcore/types'
import ASH_TRAY from './ash-tray'
import KUSTOMZ from './kustomz'
import ROLLING_TRAY from './rolling-tray'

/**
 * @file Global Test Fixture - KAPI - /products
 * @module tests/fixtures/api/products
 */

export default [ROLLING_TRAY, KUSTOMZ, ASH_TRAY] as ProductListingData[]
