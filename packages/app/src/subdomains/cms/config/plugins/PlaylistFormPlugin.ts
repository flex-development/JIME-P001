import { FormOptions } from 'tinacms'
import { IPlaylist } from '../../interfaces'
import { PlaylistAPI } from '../config'
import { URLField } from '../extensions'

/**
 * @file Form configuration edit store playlist settings
 * @module subdomains/cms/config/plugins/PlaylistFormPlugin
 */

/**
 * Returns the form configuration to edit store playlist settings.
 *
 * @param label - Label for the form that will appear in the CMS sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @returns Store playlist settings form configuration
 */
export const PlaylistFormPlugin = (
  label = 'Playlist Settings',
  onSubmit?: FormOptions<IPlaylist>['onSubmit']
): FormOptions<IPlaylist> => {
  const id = 'playlist'

  return {
    __type: 'form',
    fields: [
      URLField(
        'url',
        'Playlist URL',
        'Streamed from Apple Music',
        'https://music.apple.com/us/playlist/bbygrl/pl.u-r2yBBYYCjByaYo'
      )
    ],
    id,
    label,

    /**
     * Loads the current playlist settings from the CMS database.
     *
     * @async
     */
    loadInitialValues: async () => {
      return (await PlaylistAPI.findById(id)) || ({} as IPlaylist)
    },

    /**
     * Logs the form submission or passes it to a submission handler if defined.
     *
     * @async
     */
    onSubmit: async (values, form, callback) => {
      if (!onSubmit) return console.debug(values)
      return onSubmit(values, form, callback)
    }
  }
}