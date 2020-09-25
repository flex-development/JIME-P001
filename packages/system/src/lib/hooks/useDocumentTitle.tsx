import { useEffect, useState } from 'react'

/**
 * @file Set the page title
 * @module hooks/useDocumentTitle
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usestate}
 */

/**
 * Updates the page title.
 *
 * @param newTitle - New document title
 */
export const useDocumentTitle = (newTitle: string): string => {
  const [title] = useState(newTitle)

  useEffect(() => {
    document.title = title
  }, [title])

  return title
}
