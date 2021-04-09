import type { APIPayload } from '@core/types'

/**
 * @file Global Test Fixture - KAPI - /pages/about
 * @module tests/fixtures/api/pages/about
 */

export default ({
  body_html:
    '<h1>About</h1>\n<p>Aesthetic succulents yr viral woke, consectetur stumptown keytar slow-carb hot chicken eiusmod biodiesel umami. +1 tacos you probably haven’t heard of them four loko selvage celiac, laboris qui brooklyn fixie succulents blog. Subway tile culpa you probably haven’t heard of them, forage consequat woke cornhole wayfarers meh. Cred bicycle rights vinyl echo park prism non ullamco sriracha gentrify cardigan esse minim succulents commodo ea. Lumbersexual butcher chillwave +1 umami pinterest selfies everyday carry deep v venmo chartreuse incididunt asymmetrical pitchfork fam.</p>\n<h2></h2>',
  id: 72082292891,
  metafield: [
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
  ],
  objectID: 'about',
  seo: {
    description:
      'Morena\'s Kustomz specializes in "pot head" necessities. Shop pre-made ash trays, grinders, and rolling trays, or have them custom made.',
    keywords: 'marijuana,grinders,ash trays,rolling trays,cannabis,weed',
    og: {
      image:
        'https://images.accentuate.io/?image=https%3A%2F%2Fcdn.accentuate.io%2F47047901339%2F1609980100869%2Fmorena.webp%3Fv%3D1611432845736&c_options=',
      'image:alt': "Morena's profile picture",
      'image:height': 1920,
      'image:width': 1920
    },
    title: 'About',
    twitter: {
      card: 'summary',
      image:
        'https://images.accentuate.io/?image=https%3A%2F%2Fcdn.accentuate.io%2F47047901339%2F1609980100869%2Fmorena.webp%3Fv%3D1611432845736&c_options='
    }
  }
} as unknown) as APIPayload.Page
