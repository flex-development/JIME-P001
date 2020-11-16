import { config } from 'dotenv'
import path from 'path'
import 'regenerator-runtime'

/**
 * @file Jest Global Setup Configuration
 * @see https://github.com/testing-library/jest-dom
 */

// Set test environment variables
config({ path: path.join(__dirname, '.env.test.local') })

// Set Firestore emulator host
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

// Async callbacks must be invoked within 10 seconds
jest.setTimeout(10000)
