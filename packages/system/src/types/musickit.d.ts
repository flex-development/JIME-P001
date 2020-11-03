/**
 * @file MusicKitJS Type Declarations
 * @see https://github.com/wsmd/musickit-typescript
 */

export type MusicKitAPI = MusicKit.API

export type MusicKitError = MusicKit.MKError

export type MusicKitMediaItem = MusicKit.MediaItem

export type MusicKitInstance = MusicKit.MusicKitInstance

export type MusicKitPlaybackState =
  'completed'
  | 'ended'
  | 'loading'
  | 'none'
  | 'paused'
  | 'playing'
  | 'seeking'
  | 'stalled'
  | 'stopped'
  | 'waiting'

export type MusicKitPlayer = MusicKit.Player

export type MusicKitQueue = MusicKit.Queue

export type MusicKitSetQueueOptions = MusicKit.SetQueueOptions
