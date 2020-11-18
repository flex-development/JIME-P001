/**
 * @file Type Declarations - MusicKitJS
 * @module lib/musickit
 * @see https://github.com/wsmd/musickit-typescript
 */

export type MusicKitAPI = MusicKit.API

export type MusicKitError = MusicKit.MKError

export type MusicKitMediaItem = MusicKit.MediaItem

export type MusicKitInstance = MusicKit.MusicKitInstance

export type MusicKitPlaybackState =
  | 'completed'
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

export type MusicKitSongAttributes = {
  albumName: string
  artistName: string
  artwork: MusicKit.Artwork
  composerName?: string
  discNumber: number
  durationInMillis: number
  hasLyrics: boolean
  genreNames: Array<string>
  playParams: { id: string; kind: string }
  previews: Array<Record<'url', string>>
  isrc: string
  name: string
  trackNumber: number
  releaseDate: string
  url: string
}

export type MusicKitQueue = MusicKit.Queue

export type MusicKitSetQueueOptions = MusicKit.SetQueueOptions
