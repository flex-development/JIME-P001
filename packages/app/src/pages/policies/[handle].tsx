import type {
  HandlePageParams as Params,
  IPagePropsPolicy as PageProps,
  NextIncomingMessage,
  NotFound,
  PageComponent
} from '@app/types'
import toJSX from '@app/utils/toJSX'
import kapi from '@kustomzcore/config/axios-kapi'
import type { APIPayload } from '@kustomzcore/types'
import {
  PageTemplate,
  PageTemplateProps as TemplateProps
} from '@kustomzdesign/lib/templates/PageTemplate'
import type {
  GetServerSideProps,
  GetServerSidePropsContext as Context,
  GetServerSidePropsResult
} from 'next'
import type { ReactElement } from 'react'

/**
 * @file Store Policy Page
 * @module pages/policies/[handle]
 */

/**
 * Renders a store policy page.
 *
 * @param {PageProps} props - Page component props
 * @param {TemplateProps} props.template - `PageTemplate` component properties
 * @return {ReactElement<TemplateProps>} Store policy page
 */
const Policy: PageComponent<PageProps> = (
  props: PageProps
): ReactElement<TemplateProps> => {
  return <PageTemplate {...props.template} />
}

/**
 * Fetches the data required to render a store page using the `PageTemplate`
 * component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @async
 * @param {Context<Params>} context - Server side page context
 * @param {Params} context.params - Route parameters if dynamic route
 * @param {NextIncomingMessage} context.req - `HTTP` request object
 * @return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 * @throws {ErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context: Context<Params>
): Promise<GetServerSidePropsResult<PageProps>> => {
  let data: APIPayload.Policy | NotFound = { notFound: true }

  try {
    data = await kapi<APIPayload.Policy>({
      params: { fields: 'body,seo' },
      url: `/policies/${context.params?.handle}`
    })

    return {
      props: {
        seo: data.seo as NonNullable<typeof data.seo>,
        template: { body: await toJSX(data.body) }
      }
    }
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }
}

export default Policy
