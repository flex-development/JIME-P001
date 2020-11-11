import { IPageProps } from '@app/subdomains/app'
import { useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { useCMS } from 'tinacms'
import { useMenus, UseMenus } from './useMenus'
import { usePage, UsePage } from './usePage'

/**
 * @file Get cms content
 * @module hooks/useCMSData
 */

export type UseCMSData = {
  menus: UseMenus
  page: UsePage
  title: string
}

/**
 * Returns an object containing the menus used on the site, global metadata, and
 * the data for the current page being viewed.
 *
 * The current user session will be accessed to determine if the CMS should be
 * enabled. If the user is signed in with GitHub, the CMS will be enabled.
 *
 * @todo Implement `useMetadataForm`
 * @todo Merge global site metadata and page metadata
 */
export const useCMSData = (): UseCMSData => {
  // Get CMS instance
  const cms = useCMS()

  // Get user session to determine if CMS should be enabled
  const [session] = useSession() as [IPageProps['session'], boolean]

  // Get site navigation
  const menus = useMenus()

  // Get data for current page
  const page = usePage(session)

  // Get page title
  const [title, setTitle] = useState("Morena's Kustomz")

  // Update page title when error is encountered
  useEffect(() => {
    const { data, error } = page

    setTitle(error ? `${error.code}: ${error.message}` : data.title)
    if (error) cms.disable()
  }, [cms, page, setTitle])

  // If user is logged in with GitHub, enable CMS
  useEffect(() => {
    if (session?.provider === 'github') cms.enable()
    return () => cms.disable()
  }, [cms, page, session])

  return { menus, page, title }
}
