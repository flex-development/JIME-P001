/**
 * @file Type Declarations - Database
 * @module lib/database
 */

export interface IEntity {
  /**
   * Number of milliseconds between 1 January 1970 00:00:00 UTC and the date the
   * entity was created.
   */
  readonly created_at: number

  /**
   * Unique entity ID.
   */
  readonly id: string
}
