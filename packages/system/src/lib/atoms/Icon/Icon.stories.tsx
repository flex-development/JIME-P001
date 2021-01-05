import { SHOPIFY_POLARIS_ICONS } from '@system/config'
import { Icon } from './Icon'
import { IconProps } from './Icon.props'

/**
 * @file Stories - Icon
 * @module lib/atoms/Icon/stories
 */

export default {
  argTypes: { children: Object.keys(SHOPIFY_POLARIS_ICONS) },
  args: { $fill: 'light' },
  component: Icon,
  parameters: {
    jest: ['Icon']
  },
  title: 'Library/Atoms/Icon'
}

export const Cancel: FCS<IconProps> = args => <Icon {...args} />

Cancel.args = {
  children: 'CancelSmallMinor'
}

export const Dropdown: FCS<IconProps> = args => <Icon {...args} />

Dropdown.args = {
  $fill: 'primary',
  children: 'DropdownMinor'
}

export const Menu: FCS<IconProps> = args => <Icon {...args} />

Menu.args = {
  children: 'MobileHamburgerMajor',
  className: 'd-inline-flex text-lg'
}

export const Pause: FCS<IconProps> = args => <Icon {...args} />

Pause.args = {
  children: 'PauseCircleMajor'
}

export const Person: FCS<IconProps> = args => <Icon {...args} />

Person.args = {
  children: 'CustomersMajor'
}

export const Play: FCS<IconProps> = args => <Icon {...args} />

Play.args = {
  children: 'PlayCircleMajor'
}

export const Search: FCS<IconProps> = args => <Icon {...args} />

Search.args = {
  children: 'SearchMajor'
}

export const SkipNext: FCS<IconProps> = args => <Icon {...args} />

SkipNext.args = {
  children: 'PaginationEndMinor'
}

export const SkipPrevious: FCS<IconProps> = args => <Icon {...args} />

SkipPrevious.args = {
  children: 'PaginationStartMinor'
}
