import { useForm, useFormScreenPlugin } from 'tinacms'
import { PlaylistAPI } from '../config'
import { PlaylistFormPlugin } from '../config/plugins'
import { IPlaylist } from '../interfaces'
import { UseFormScreenPlugin } from '../utils'

/**
 * @file Connect a page to the `PlaylistFormPlugin`
 * @module hooks/usePlaylistForm
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `PlaylistFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const usePlaylistForm = (
  label?: string
): UseFormScreenPlugin<IPlaylist, IPlaylist> => {
  /**
   * Form submission handler.
   *
   * @param id - ID of page to update
   * @param snippet - Update profile snippet
   */
  const onSubmit = async (snippet: IPlaylist) => {
    await PlaylistAPI.upsert(PlaylistFormPlugin().id, snippet)
  }

  // Get form config
  const config = PlaylistFormPlugin(label, onSubmit)

  // Create and register Playlist form
  const [snippet, form] = useForm<IPlaylist>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: snippet }
}
