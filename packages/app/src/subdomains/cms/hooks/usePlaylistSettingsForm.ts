import { useForm, useFormScreenPlugin } from 'tinacms'
import { PlaylistAPI } from '../config'
import { PlaylistSettingsFormPlugin } from '../config/plugins'
import { IPlaylistSettings } from '../interfaces'
import { UseFormScreenPlugin } from '../utils'

/**
 * @file Connect to the `PlaylistSettingsFormPlugin`
 * @module subdomains/cms/hooks/usePlaylistSettingsForm
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `PlaylistSettingsFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const usePlaylistSettingsForm = (
  label?: string
): UseFormScreenPlugin<IPlaylistSettings, IPlaylistSettings> => {
  /**
   * Form submission handler.
   *
   * @param id - ID of page to update
   * @param snippet - Update profile snippet
   */
  const onSubmit = async (snippet: IPlaylistSettings) => {
    await PlaylistAPI.upsert(PlaylistSettingsFormPlugin().id, snippet)
  }

  // Get form config
  const config = PlaylistSettingsFormPlugin(label, onSubmit)

  // Create and register Playlist form
  const [snippet, form] = useForm<IPlaylistSettings>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: snippet }
}
