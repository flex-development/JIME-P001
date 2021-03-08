import { ErrorContent } from '@app/components/ErrorContent'
import type { IPageProps as PageProps, PageComponent } from '@app/types'
import {
  ErrorTemplate,
  ErrorTemplateProps
} from '@kustomzdesign/lib/templates/ErrorTemplate'
import type { GetStaticProps, GetStaticPropsResult } from 'next'
import type { ReactElement } from 'react'

/**
 * @file Custom 404 page
 * @module pages/404
 */

/**
 * Renders a `404` error page.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 *
 * @return {ReactElement<ErrorTemplateProps>} 404 page
 */
const NotFound: PageComponent = (): ReactElement<ErrorTemplateProps> => (
  <ErrorTemplate
    code={404}
    message={`Sorry, the page you're looking for does not exist.`}
  >
    <ErrorContent />
  </ErrorTemplate>
)

/**
 * Fetches the data required to render the 404 page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @return {Promise<GetStaticPropsResult<PageProps>>} Promise containing object
 * with page props and settings to statically generate page
 */
export const getStaticProps: GetStaticProps<PageProps> = (): Promise<
  GetStaticPropsResult<PageProps>
> => {
  return Promise.resolve({
    props: { seo: { title: 'Page Not Found' } },
    revalidate: 1
  })
}

export default NotFound
