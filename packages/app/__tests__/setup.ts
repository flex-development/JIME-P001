import { config } from 'dotenv'
import path from 'path'
import 'regenerator-runtime'

/**
 * @file Jest Global Setup Configuration
 * @module tests/setup
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 */

// Set test environment variables
config({ path: path.join(__dirname, '..', '.env.test.local') })

// Async callbacks must be invoked within 10 seconds
jest.setTimeout(10000)
