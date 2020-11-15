import 'regenerator-runtime'

/**
 * @file Jest Global Setup Configuration
 * @see https://github.com/testing-library/jest-dom
 */

// Set Firestore emulator host
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

// Async callbacks must be invoked within 10 seconds
jest.setTimeout(10000)
