import {
  ProfileSnippetAPI,
  ProfileSnippetFormPlugin
} from '@app/subdomains/cms/config'
import { IProfileSnippet } from '@app/subdomains/cms/models'
import { UseFormScreenPlugin } from '@app/subdomains/cms/utils'
import { useForm, useFormScreenPlugin } from 'tinacms'

/**
 * @file Connect a page to the `ProfileSnippetFormPlugin`
 * @module subdomains/cms/hooks/useProfileSnippetForm/impl
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `ProfileSnippetFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const useProfileSnippetForm = (
  label?: string
): UseFormScreenPlugin<IProfileSnippet, IProfileSnippet> => {
  /**
   * Form submission handler.
   *
   * @param id - ID of page to update
   * @param snippet - Update profile snippet
   */
  const onSubmit = async (snippet: IProfileSnippet) => {
    await ProfileSnippetAPI.upsert(ProfileSnippetFormPlugin().id, snippet)
  }

  // Get form config
  const config = ProfileSnippetFormPlugin(label, onSubmit)

  // Create and register ProfileSnippet form
  const [snippet, form] = useForm<IProfileSnippet>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: snippet }
}
