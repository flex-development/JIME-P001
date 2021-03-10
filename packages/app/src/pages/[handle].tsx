import type {
  HandlePageParams as Params,
  IPagePropsHandle as PageProps,
  NextIncomingMessage,
  NotFound,
  PageComponent
} from '@app/types'
import toJSX from '@app/utils/toJSX'
import kapi from '@kustomzcore/config/axios-kapi'
import type { GetPageResJSON } from '@kustomzcore/types'
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
 * @file Online Store Page
 * @module pages/[handle]
 */

/**
 * Renders an online store page.
 *
 * @param {PageProps} props - Page component props
 * @param {TemplateProps} props.template - Template component properties
 * @return {ReactElement<TemplateProps>} Online store page
 */
const HandlePage: PageComponent<PageProps> = (
  props: PageProps
): ReactElement<TemplateProps> => {
  return <PageTemplate {...props.template} />
}

/**
 * Fetches the data required to render an online store page.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 * @see https://shopify.dev/docs/admin-api/rest/reference/online-store/page
 *
 * @async
 * @param {Context<Params>} context - Server side page context
 * @param {Params} context.params - Route parameters if dynamic route
 * @param {NextIncomingMessage} context.req - `HTTP` request object
@return {Promise<GetServerSidePropsResult<PageProps>>} Page props
 * @throws {FeathersErrorJSON}
 */
export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context: Context<Params>
): Promise<GetServerSidePropsResult<PageProps>> => {
  let data: GetPageResJSON | NotFound = { notFound: true }

  try {
    data = await kapi<GetPageResJSON>({
      params: { fields: 'body_html,seo' },
      url: `/pages/${context.params?.handle}`
    })

    return {
      props: {
        seo: data.seo as NonNullable<typeof data.seo>,
        template: { body: await toJSX(data.body_html) }
      }
    }
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }
}

export default HandlePage
