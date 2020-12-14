import { FIREBASE_WEB_CONFIG } from '@flex-development/kustomzcore'
import localforage from 'localforage'

/**
 * @file LocalForage Configuration
 * @module config/localforage
 * @see https://github.com/localForage/localForage
 */

localforage.config({ name: `${FIREBASE_WEB_CONFIG.projectId}-local` })

export default localforage
