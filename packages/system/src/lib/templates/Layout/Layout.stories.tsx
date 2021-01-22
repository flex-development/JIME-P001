import { SONGS } from '@system-mocks/utils'
import { Default as Hero } from '@system/lib/organisms/Hero/Hero.stories'
import { Default as ShopHeader } from '@system/lib/organisms/ShopHeader/ShopHeader.stories'
import { Default as Sidebar } from '@system/lib/organisms/Sidebar/Sidebar.stories'
import { Homepage } from '@system/lib/templates/IndexTemplate/IndexTemplate.stories'
import { Cart as ShoppingCart } from '../CartTemplate/CartTemplate.stories'
import { Products } from '../CollectionTemplate/CollectionTemplate.stories'
import { NotFound } from '../ErrorTemplate/ErrorTemplate.stories'
import { Markdown } from '../PageTemplate/PageTemplate.stories'
import { RollingTray } from '../ProductTemplate/ProductTemplate.stories'
import { Search as ProductSearch } from '../SearchTemplate/SearchTemplate.stories'
import { Layout } from './Layout'
import type { LayoutProps } from './Layout.props'

/**
 * @file Stories - Layout
 * @module lib/templates/Layout/stories
 */

export default {
  argTypes: {
    header: { control: 'object' },
    hero: { control: 'object' },
    playlistbar: { control: 'object' },
    sidebar: { control: 'object' }
  },
  args: {
    header: ShopHeader.args,
    hero: Hero.args,
    playlistbar: { songs: SONGS },
    sidebar: Sidebar.args
  },
  component: Layout,
  parameters: {
    jest: ['Layout']
  },
  title: 'Library/Templates/Layout'
}

export const Loading: FCS<LayoutProps> = args => <Layout {...args} />

Loading.args = {
  loading: true
}

export const Home: FCS<LayoutProps> = args => <Layout {...args} />

Home.args = {
  children: <Homepage {...Homepage.args} />
}

export const Collection: FCS<LayoutProps> = args => <Layout {...args} />

Collection.args = {
  children: <Products {...Products.args} />
}

export const Product: FCS<LayoutProps> = args => <Layout {...args} />

Product.args = {
  children: <RollingTray {...RollingTray.args} />
}

export const Cart: FCS<LayoutProps> = args => <Layout {...args} />

Cart.args = {
  children: <ShoppingCart {...ShoppingCart.args} />
}

export const Search: FCS<LayoutProps> = args => <Layout {...args} />

Search.args = {
  children: <ProductSearch {...ProductSearch.args} />
}

export const Page: FCS<LayoutProps> = args => <Layout {...args} />

Page.args = {
  children: <Markdown {...Markdown.args} />
}

export const Page404: FCS<LayoutProps> = args => <Layout {...args} />

Page404.storyName = 'Page - 404'
Page404.args = {
  children: <NotFound {...NotFound.args} />
}
