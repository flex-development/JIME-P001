/**
 * @file Creates a new secret value
 * @module utils/getCurrentTime
 */

/**
 * Returns the current time as an ISO String.
 */
export const getCurrentTime = (): string => new Date().toISOString()
