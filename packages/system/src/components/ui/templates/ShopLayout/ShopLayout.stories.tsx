import { Default as Hero } from '@system/components/ui/organisms/Hero/Hero.stories'
import { Default as PlaylistBar } from '@system/components/ui/organisms/PlaylistBar/PlaylistBar.stories'
import { Default as ShopHeader } from '@system/components/ui/organisms/ShopHeader/ShopHeader.stories'
import { Default as Sidebar } from '@system/components/ui/organisms/Sidebar/Sidebar.stories'
import { Homepage } from '@system/components/ui/templates/IndexTemplate/IndexTemplate.stories'
import { StoryFN } from '@system/types/storybook'
import { Cart as ShoppingCart } from '../CartTemplate/CartTemplate.stories'
import { Products } from '../CollectionTemplate/CollectionTemplate.stories'
import { NotFound } from '../ErrorTemplate/ErrorTemplate.stories'
import { Markdown } from '../PageTemplate/PageTemplate.stories'
import { RollingTray } from '../ProductTemplate/ProductTemplate.stories'
import { Search as ProductSearch } from '../SearchTemplate/SearchTemplate.stories'
import { ShopLayout, ShopLayoutProps } from './ShopLayout'

/**
 * @file Stories - ShopLayout
 * @module components/ui/templates/ShopLayout/stories
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
    playlistbar: PlaylistBar.args,
    sidebar: Sidebar.args
  },
  component: ShopLayout,
  parameters: {
    jest: ['ShopLayout']
  },
  title: 'Library/Templates/ShopLayout'
}

export const Home: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Home.args = {
  children: <Homepage {...Homepage.args} />
}

export const Collection: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Collection.args = {
  children: <Products {...Products.args} />
}

export const Product: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Product.args = {
  children: <RollingTray {...RollingTray.args} />
}

export const Cart: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Cart.args = {
  children: <ShoppingCart {...ShoppingCart.args} />
}

export const Search: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Search.args = {
  children: <ProductSearch {...ProductSearch.args} />
}

export const Page: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Page.args = {
  children: <Markdown {...Markdown.args} />
}

export const Page404: StoryFN<ShopLayoutProps> = (args: ShopLayoutProps) => (
  <ShopLayout {...args} />
)

Page404.storyName = 'Page - 404'
Page404.args = {
  children: <NotFound {...NotFound.args} />
}
