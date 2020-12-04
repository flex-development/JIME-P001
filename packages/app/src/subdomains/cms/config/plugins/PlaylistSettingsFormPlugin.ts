import { IPlaylistSettings } from '@subdomains/cms/models'
import { FormOptions } from 'tinacms'
import { PlaylistAPI } from '../config'
import { URLField } from '../extensions'

/**
 * @file Form configuration edit store playlist settings
 * @module subdomains/cms/config/plugins/PlaylistSettingsFormPlugin
 */

/**
 * Returns the form configuration to edit store playlist settings.
 *
 * @param label - Label for the form that will appear in the CMS sidebar
 * @param onSubmit - Function to invoke when the form is saved
 * @returns Store playlist settings form configuration
 */
export const PlaylistSettingsFormPlugin = (
  label = 'Playlist Settings',
  onSubmit?: FormOptions<IPlaylistSettings>['onSubmit']
): FormOptions<IPlaylistSettings> => {
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
      return (await PlaylistAPI.findById()) || ({} as IPlaylistSettings)
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
