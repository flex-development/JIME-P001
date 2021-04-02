import type { IMetafield } from '@kustomzcore/types'
import objectFromArray from '@kustomzcore/utils/objectFromArray'
import PAGE from '@system/tests/fixtures/api/pages'

/**
 * @file Test Fixture - Metafields Object
 * @module lib/templates/IndexTemplate/tests/fixtures/metafields-object
 */

export default objectFromArray<IMetafield>(PAGE.metafield ?? [], 'key')
