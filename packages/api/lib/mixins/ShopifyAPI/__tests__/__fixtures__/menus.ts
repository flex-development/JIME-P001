import type { IMenuResFind } from '@flex-development/kustomzcore/types'

/**
 * @file Test Fixture - Shopify Menus
 * @module tests/fixtures/shopify/menus
 */

export default {
  menus: [
    {
      handle: 'main-menu',
      levels: 1,
      title: 'Main Menu',
      links: [
        {
          title: 'Home',
          href: '/',
          links: []
        },
        {
          title: 'Products',
          href: '/products',
          links: []
        },
        {
          title: 'About',
          href: '/about',
          links: []
        },
        {
          title: 'Instagram',
          href: '/instagram',
          links: []
        }
      ]
    },
    {
      handle: 'footer',
      levels: 0,
      title: 'Footer Menu',
      links: []
    }
  ]
} as IMenuResFind
