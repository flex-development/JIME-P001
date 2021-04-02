import { request } from '@flex-development/kustomzcore/config/axios'
import Subject from '..'
import MockShopifyAPI from '../../../mixins/ShopifyAPI'
import PLAYLIST_RESPONSE from './__fixtures__/playlist-response'

/**
 * @file Unit Tests - PlaylistService
 * @module lib/services/PlaylistService/tests/unit
 */

jest.mock('../../../mixins/ShopifyAPI')

const mockRequest = request as jest.MockedFunction<typeof request>

describe('unit:lib/services/PlaylistService', () => {
  describe('.getPlaylist', () => {
    beforeEach(() => {
      mockRequest.mockReturnValue(Promise.resolve(PLAYLIST_RESPONSE))
    })

    it('builds request config using playlist id', async () => {
      const { id } = PLAYLIST_RESPONSE.data[0]

      await Subject.getPlaylist(id)

      expect(mockRequest.mock.calls[1][0]).toMatchObject({
        url: `${Subject.APPLE_MUSIC_API_PLAYLISTS_ENDPOINT}/${id}`
      })
    })

    it('handles fields to retrieve', async () => {
      const { id } = PLAYLIST_RESPONSE.data[0]
      const fields = 'attributes,id'

      const result = await Subject.getPlaylist(id, fields)

      expect(Object.keys(result).length).toBe(fields.split(',').length)
    })
  })

  describe('.playlistId', () => {
    it('parses id from playlist URL', () => {
      const { attributes, id } = PLAYLIST_RESPONSE.data[0]

      expect(Subject.playlistId(attributes?.url as string)).toBe(id)
    })
  })

  describe('.storePlaylist', () => {
    beforeEach(() => {
      mockRequest.mockReturnValue(Promise.resolve(PLAYLIST_RESPONSE))
    })

    it('fetches playlist url', async () => {
      await Subject.storePlaylist()

      expect(MockShopifyAPI.metafieldGlobals).toBeCalledTimes(1)
    })

    it('gets playlist id', async () => {
      const spy = jest.spyOn(Subject, 'playlistId')

      await Subject.storePlaylist()

      expect(spy).toBeCalledTimes(1)
    })

    it('returns store playlist data', async () => {
      const { attributes, id } = PLAYLIST_RESPONSE.data[0]

      const getPlaylist = jest.spyOn(Subject, 'getPlaylist')
      const metafieldGlobals = jest.spyOn(MockShopifyAPI, 'metafieldGlobals')

      metafieldGlobals.mockImplementationOnce(() => {
        return Promise.resolve({ playlist_url: { value: attributes?.url } })
      })

      await Subject.storePlaylist()

      expect(getPlaylist).toBeCalledTimes(1)
      expect(getPlaylist).toBeCalledWith(id, undefined)
    })
  })
})
