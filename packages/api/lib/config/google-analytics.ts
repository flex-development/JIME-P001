import { Axios } from '@flex-development/kustomzcore'
import GA from 'ga-measurement-protocol'
import { v4 as uuidv4 } from 'uuid'

/**
 * @file Google Analytics Configuration
 * @module lib/config/google-analytics
 * @see https://github.com/wusuopu/ts-ga-measurement-protocol
 */

// Initialize Measure Protocal client
const ga = new GA(process.env.GA_TRACKING_ID as string, Axios, '1', true)

// Identifies a particular user, device, or browser instance
ga.setClientId(uuidv4())

export default ga
