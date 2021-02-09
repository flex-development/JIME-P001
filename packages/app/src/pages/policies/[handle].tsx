import kapi from '@app/config/axios-kapi'
import { PageTemplate } from '@components/templates/PageTemplate'
import type { GetPolicyResJSON } from '@kapi/types'
import { SEO } from '@subdomains/app/components/SEO'
import type {
  HandlePageParams,
  IPagePropsPolicy as PageProps,
  NotFound,
  PageComponent
} from '@subdomains/app/types'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

/**
 * @file Store Policy Page
 * @module pages/policies/[handle]
 */

/**
 * Renders a store policy page.
 *
 * @param props - Page component props
 * @param props.seo - `SEO` component properties
 * @param props.template - `PageTemplate` component properties
 */
const Policy: PageComponent<PageProps> = ({ seo, template }) => (
  <>
    <SEO {...seo} />
    <PageTemplate {...template} />
  </>
)

/**
 * Fetches the data required to render a store page using the `PageTemplate`
 * component.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @async
 * @param context - Server side page context
 * @param context.params - Route parameters if dynamic route
 * @param context.req - `HTTP` request object
 */
export const getServerSideProps: GetServerSideProps<
  PageProps,
  HandlePageParams
> = async (context: GetServerSidePropsContext<HandlePageParams>) => {
  let data: GetPolicyResJSON | NotFound = { notFound: true }

  try {
    data = await kapi<GetPolicyResJSON>({
      params: { fields: 'body,seo' },
      url: `/policies/${context.params?.handle}`
    })
  } catch (error) {
    if (error.code === 404) return data as NotFound
    throw error
  }

  return {
    props: {
      seo: data.seo as NonNullable<typeof data.seo>,
      template: { body: data.body }
    }
  }
}

export default Policy
