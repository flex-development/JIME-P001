import '@testing-library/jest-dom/extend-expect'
import { config } from 'dotenv'
import path from 'path'

/**
 * @file Jest Global Setup Configuration
 * @module tests/setup
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 */

// Set test environment variables
config({ path: path.join(__dirname, '..', '.env.test.local') })

// Async callbacks must be invoked within 10 seconds
jest.setTimeout(10000)

// Add stubs for methods not implemented in JSDOM
window.HTMLFormElement.prototype.submit = () => null
window.HTMLMediaElement.prototype.load = () => null
window.HTMLMediaElement.prototype.pause = () => null
window.HTMLMediaElement.prototype.play = () => Promise.resolve()
