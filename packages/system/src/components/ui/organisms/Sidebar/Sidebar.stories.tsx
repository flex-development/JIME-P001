import { StoryFN } from '@system/types/storybook'
import { Sidebar, SidebarProps } from './Sidebar'

/**
 * @file Stories - Sidebar
 * @module components/ui/organisms/Sidebar/stories
 */

export default {
  args: {
    style: {
      width: '30rem'
    }
  },
  component: Sidebar,
  parameters: {
    jest: ['Sidebar']
  },
  title: 'Library/Organisms/Sidebar'
}

export const Default: StoryFN<SidebarProps> = (args: SidebarProps) => (
  <>
    <Sidebar {...args} />
    <style>
      {`
        @media screen and (max-width: 576px) {
          .sidebar {
            width: 100% !important;
          }
        }
      `}
    </style>
  </>
)

Default.args = {
  menu: [
    { title: 'Home' },
    { title: 'Products' },
    { title: 'About' },
    { title: 'Instagram' }
  ]
}
