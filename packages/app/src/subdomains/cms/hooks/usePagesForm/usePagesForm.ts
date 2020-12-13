import { PagesFormPlugin } from '@subdomains/cms/config'
import { CMSPagesDTO, ICMSPageSlug } from '@subdomains/cms/models'
import {
  handlePagesForm as onSubmit,
  UseFormScreenPlugin
} from '@subdomains/cms/utils'
import { useForm, useFormScreenPlugin } from 'tinacms'

/**
 * @file Register a `PagesFormPlugin` instance
 * @module subdomains/cms/hooks/usePagesForm/impl
 * @see https://tinacms.org/docs/plugins/screens/#usescreenplugin
 */

/**
 * Creates and registers a new `PagesFormPlugin` instance.
 *
 * @param label - Label for the form that will appear in the sidebar
 */
export const usePagesForm = (
  label?: string
): UseFormScreenPlugin<CMSPagesDTO, Array<ICMSPageSlug>> => {
  // Get form config
  const config = PagesFormPlugin(label, onSubmit)

  // Create and register Pages form
  const [pages, form] = useForm<CMSPagesDTO>(config)

  // Register form as screen plugin
  useFormScreenPlugin(form)

  return { config, form, modified: pages.pages || [] }
}
