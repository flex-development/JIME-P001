/**
 * @file Type Declarations - Apple Music
 * @module types/apple-music
 * @see https://www.npmjs.com/package/@types/apple-music-api
 */

export type Artwork = AppleMusicApi.Artwork

export type Playlist = AppleMusicApi.Playlist

export type PlaylistAttributes = NonNullable<Playlist['attributes']>

export type Song = AppleMusicApi.Song

export type SongAttributes = NonNullable<Song['attributes']>
