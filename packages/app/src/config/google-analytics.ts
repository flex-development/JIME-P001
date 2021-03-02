import axios from '@kustomzcore/axios'
import GA from 'ga-measurement-protocol'
import { nanoid } from 'nanoid'

/**
 * @file Google Analytics Configuration
 * @module config/google-analytics
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 */

// Initialize Measure Protocol client
const ga = new GA(process.env.GA_TRACKING_ID || '', axios, '1', true)

// Identifies a particular user, device, or browser instance
ga.setClientId(nanoid())

// Disable tracking if not enabled
if (!process.env.GA_ENABLED) ga.disable()

export default ga
