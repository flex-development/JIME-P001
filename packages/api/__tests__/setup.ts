import * as matcherscore from '@tests/matchers'
import { config } from 'dotenv'
import path from 'path'
import 'regenerator-runtime'
import vercelconfig from '../vercel.json'
import * as matchers from './matchers'

/**
 * @file Jest Global Setup Configuration
 * @module tests/setup
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 */

// Set test environment variables
config({ path: path.join(__dirname, '..', '.env.test.local') })

// Match test timeout to max execution duration of serverless functions
jest.setTimeout(vercelconfig.functions['api/*.ts'].maxDuration * 1000)

// Add custom matchers
expect.extend({ ...matcherscore, ...matchers })
