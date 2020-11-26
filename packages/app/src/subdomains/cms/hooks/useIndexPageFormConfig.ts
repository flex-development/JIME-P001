import { AnyObject } from '@flex-development/types'
import { useMemo } from 'react'
import { FormOptions } from 'tinacms'
import { IndexPageFormPlugin } from '../config'
import { ICMSPageIndex } from '../interfaces'
import onSubmit from '../utils/handleIndexPageForm'

/**
 * @file Get `IndexPageFormPlugin` options
 * @module subdomains/cms/hooks/useIndexPageFormConfig
 */

/**
 * Returns form configuration options for the `IndexPageFormPlugin`.
 *
 * @param page - CMS page data
 * @returns Form config options
 */
export const useIndexPageFormConfig = (
  page: AnyObject = {}
): FormOptions<ICMSPageIndex> => {
  return useMemo<FormOptions<ICMSPageIndex>>(() => {
    const data = page?.path === '/' ? (page as ICMSPageIndex) : undefined
    return IndexPageFormPlugin('Home', data, onSubmit)
  }, [page])
}
