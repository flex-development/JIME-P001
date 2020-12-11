import { Default as Hero } from '@system/components/organisms/Hero/Hero.stories'
import { Default as PlaylistBar } from '@system/components/organisms/PlaylistBar/PlaylistBar.stories'
import { Default as ShopHeader } from '@system/components/organisms/ShopHeader/ShopHeader.stories'
import { Default as Sidebar } from '@system/components/organisms/Sidebar/Sidebar.stories'
import { Homepage } from '@system/components/templates/IndexTemplate/IndexTemplate.stories'
import { StoryFN } from '@system/types/storybook'
import { ShopLayout, ShopLayoutProps } from './ShopLayout'

/**
 * @file Stories - ShopLayout
 * @module components/templates/ShopLayout/stories
 */

export default {
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
  children: <Homepage {...Homepage.args} />,
  header: ShopHeader.args,
  hero: Hero.args,
  playlistbar: PlaylistBar.args,
  sidebar: Sidebar.args
}
