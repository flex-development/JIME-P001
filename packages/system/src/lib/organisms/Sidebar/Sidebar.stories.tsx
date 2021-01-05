import { Sidebar } from './Sidebar'
import { SidebarProps } from './Sidebar.props'

/**
 * @file Stories - Sidebar
 * @module lib/organisms/Sidebar/stories
 */

export default {
  args: {
    style: {
      width: '25rem'
    }
  },
  component: Sidebar,
  parameters: {
    jest: ['Sidebar']
  },
  title: 'Library/Organisms/Sidebar'
}

export const Default: FCS<SidebarProps> = args => (
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
