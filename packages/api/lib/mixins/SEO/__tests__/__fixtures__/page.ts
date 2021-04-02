import type {
  IMetafield,
  IPage,
  SEOData
} from '@flex-development/kustomzcore/types'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import merge from 'lodash/merge'
import GLOBAL_SEO from './global-seo'

/**
 * @file Test Fixture - Page
 * @module lib/mixins/SEO/tests/fixtures/page
 */

jest.unmock('@flex-development/kustomzcore/utils/objectFromArray')

export const PAGE: IPage = {
  admin_graphql_api_id: 'gid://shopify/OnlineStorePage/72082292891',
  author: null,
  body_html:
    '<h1>About</h1>\n<p>Aesthetic succulents yr viral woke, consectetur stumptown keytar slow-carb hot chicken eiusmod biodiesel umami. +1 tacos you probably haven’t heard of them four loko selvage celiac, laboris qui brooklyn fixie succulents blog. Subway tile culpa you probably haven’t heard of them, forage consequat woke cornhole wayfarers meh. Cred bicycle rights vinyl echo park prism non ullamco sriracha gentrify cardigan esse minim succulents commodo ea. Lumbersexual butcher chillwave +1 umami pinterest selfies everyday carry deep v venmo chartreuse incididunt asymmetrical pitchfork fam.</p>\n<h2></h2>',
  created_at: '2021-01-04T19:55:12-05:00',
  handle: 'about',
  id: 72082292891,
  published_at: '2021-01-04T19:55:12-05:00',
  shop_id: 47047901339,
  template_suffix: '',
  title: 'About',
  updated_at: '2021-03-14T20:57:42-04:00'
}

export const PAGE_METAFIELDS: IMetafield[] = [
  {
    admin_graphql_api_id: 'gid://shopify/Metafield/15718073434267',
    created_at: '2021-01-04T19:55:12-05:00',
    description: null,
    id: 15718073434267,
    key: 'title_tag',
    namespace: 'global',
    owner_id: 72082292891,
    owner_resource: 'page',
    updated_at: '2021-01-04T19:55:12-05:00',
    value: 'About',
    value_type: 'string'
  },
  {
    admin_graphql_api_id: 'gid://shopify/Metafield/15718073467035',
    created_at: '2021-01-04T19:55:12-05:00',
    description: null,
    id: 15718073467035,
    key: 'description_tag',
    namespace: 'global',
    owner_id: 72082292891,
    owner_resource: 'page',
    updated_at: '2021-01-04T19:55:12-05:00',
    value:
      'Morena\'s Kustomz specializes in "pot head" necessities. Shop pre-made ash trays, grinders, and rolling trays, or have them custom made.',
    value_type: 'string'
  },
  {
    admin_graphql_api_id: 'gid://shopify/Metafield/18884859723931',
    created_at: '2021-03-14T20:57:42-04:00',
    description: null,
    id: 18884859723931,
    key: 'keywords',
    namespace: 'global',
    owner_id: 72082292891,
    owner_resource: 'page',
    updated_at: '2021-03-14T20:57:42-04:00',
    value: 'ash trays, grinders, rolling trays, weed',
    value_type: 'string'
  }
]

export const PAGE_METAFIELDS_OBJ = ofa(PAGE_METAFIELDS, 'key')

export const PAGE_SEO: SEOData = merge(GLOBAL_SEO, {
  description: PAGE_METAFIELDS_OBJ.description_tag?.value ?? null,
  keywords: 'ash trays,grinders,rolling trays,weed',
  title: PAGE.title
})
